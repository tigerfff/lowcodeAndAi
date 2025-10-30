/**
 * 页面配置 JSON 校验工具
 */

import Ajv from 'ajv'

let ajv = null
let pageConfigSchema = null

/**
 * 初始化 AJV 和 Schema
 */
async function initValidator() {
  if (ajv) return
  
  ajv = new Ajv({ allErrors: true })
  
  // 加载 Schema
  try {
    const response = await fetch('/manifests/page-config.schema.json')
    pageConfigSchema = await response.json()
  } catch (error) {
    console.error('Failed to load page config schema:', error)
    throw error
  }
}

/**
 * 校验页面配置 JSON
 * @param {Object} config - 页面配置对象
 * @returns {Object} { valid: boolean, errors: Array }
 */
export async function validatePageConfig(config) {
  await initValidator()
  
  const validate = ajv.compile(pageConfigSchema)
  const valid = validate(config)
  
  if (!valid) {
    return {
      valid: false,
      errors: validate.errors.map(err => ({
        path: err.instancePath || err.dataPath,
        message: err.message,
        params: err.params
      }))
    }
  }
  
  // 额外的业务校验
  const businessErrors = []
  
  // 检查 columns 中的 prop 是否唯一
  if (config.columns) {
    const props = config.columns.map(col => col.prop)
    const duplicates = props.filter((prop, index) => props.indexOf(prop) !== index)
    if (duplicates.length > 0) {
      businessErrors.push({
        path: '/columns',
        message: `Duplicate column props: ${duplicates.join(', ')}`
      })
    }
  }
  
  // 检查 tag 类型的列是否有 mapping
  if (config.columns) {
    config.columns.forEach((col, index) => {
      if (col.type === 'tag' && !col.mapping) {
        businessErrors.push({
          path: `/columns/${index}`,
          message: `Column "${col.prop}" with type "tag" must have mapping`
        })
      }
    })
  }
  
  // 检查 select 类型的搜索字段是否有 options
  if (config.searchFields) {
    config.searchFields.forEach((field, index) => {
      if (field.type === 'select' && (!field.options || field.options.length === 0)) {
        businessErrors.push({
          path: `/searchFields/${index}`,
          message: `Search field "${field.prop}" with type "select" must have options`
        })
      }
    })
  }
  
  // 检查置信度低于 0.8 的项
  const lowConfidenceItems = []
  
  if (config.columns) {
    config.columns.forEach((col, index) => {
      if (col.confidence && col.confidence < 0.8) {
        lowConfidenceItems.push({
          type: 'column',
          path: `/columns/${index}`,
          prop: col.prop,
          confidence: col.confidence
        })
      }
    })
  }
  
  if (config.searchFields) {
    config.searchFields.forEach((field, index) => {
      if (field.confidence && field.confidence < 0.8) {
        lowConfidenceItems.push({
          type: 'searchField',
          path: `/searchFields/${index}`,
          prop: field.prop,
          confidence: field.confidence
        })
      }
    })
  }
  
  if (businessErrors.length > 0) {
    return {
      valid: false,
      errors: businessErrors,
      lowConfidenceItems
    }
  }
  
  return {
    valid: true,
    errors: [],
    lowConfidenceItems
  }
}

/**
 * 格式化错误信息（用于展示）
 * @param {Array} errors - 错误数组
 * @returns {string} 格式化后的错误信息
 */
export function formatValidationErrors(errors) {
  if (!errors || errors.length === 0) {
    return ''
  }
  
  return errors.map(err => {
    return `${err.path}: ${err.message}`
  }).join('\n')
}

/**
 * 检查置信度
 * @param {Object} config - 页面配置对象
 * @param {number} threshold - 置信度阈值（默认 0.8）
 * @returns {Array} 低置信度项列表
 */
export function checkConfidence(config, threshold = 0.8) {
  const lowConfidenceItems = []
  
  if (config.columns) {
    config.columns.forEach((col, index) => {
      if (!col.confidence || col.confidence < threshold) {
        lowConfidenceItems.push({
          type: 'column',
          index,
          prop: col.prop,
          label: col.label,
          confidence: col.confidence || 0
        })
      }
    })
  }
  
  if (config.searchFields) {
    config.searchFields.forEach((field, index) => {
      if (!field.confidence || field.confidence < threshold) {
        lowConfidenceItems.push({
          type: 'searchField',
          index,
          prop: field.prop,
          label: field.label,
          confidence: field.confidence || 0
        })
      }
    })
  }
  
  return lowConfidenceItems
}

export default {
  validatePageConfig,
  formatValidationErrors,
  checkConfidence
}

