/**
 * AI 推断服务
 * 负责调用 AI 生成页面配置 JSON
 */

import { callAI, extractJSON } from './ai-provider.js'
import { generateInitialInferencePrompt, generateCorrectionPrompt, generatePartialInferencePrompt } from './prompt-templates.js'

/**
 * 推断列配置
 * @param {Array} fields - 字段列表
 * @param {Array} dataSample - 数据样例
 * @returns {Array} 列配置数组
 */
function inferColumns(fields, dataSample) {
  return fields.map(field => {
    const column = {
      prop: field.key,
      label: inferLabel(field.key),
      type: inferColumnType(field.key, field.sample),
      confidence: 0.8
    }
    
    // ID 类字段固定宽度
    if (/^(id|.*Id)$/i.test(field.key)) {
      column.width = '80'
      column.confidence = 0.95
    }
    
    // 状态类字段添加 mapping
    if (column.type === 'tag') {
      column.mapping = inferStatusMapping(field.key, field.sample, dataSample)
      column.confidence = 0.75 // 枚举映射需要用户确认
    }
    
    return column
  })
}

/**
 * 推断字段标签
 * @param {string} fieldName - 字段名
 * @returns {string} 显示标签
 */
function inferLabel(fieldName) {
  // 常见字段映射
  const commonLabels = {
    id: 'ID',
    userId: '用户ID',
    userName: '用户名称',
    name: '名称',
    title: '标题',
    phone: '电话',
    email: '邮箱',
    status: '状态',
    type: '类型',
    category: '分类',
    createTime: '创建时间',
    createdAt: '创建时间',
    updateTime: '更新时间',
    updatedAt: '更新时间',
    isActive: '是否启用',
    isDeleted: '是否删除',
    remark: '备注',
    description: '描述',
    amount: '金额',
    price: '价格',
    quantity: '数量',
    address: '地址'
  }
  
  if (commonLabels[fieldName]) {
    return commonLabels[fieldName]
  }
  
  // 驼峰命名转换
  // userId -> 用户 ID
  // createTime -> 创建时间
  let label = fieldName.replace(/([A-Z])/g, ' $1').trim()
  
  // 简单的中文化尝试（基于常见后缀）
  label = label.replace(/\bId$/i, 'ID')
  label = label.replace(/\bTime$/i, '时间')
  label = label.replace(/\bAt$/i, '时间')
  label = label.replace(/\bName$/i, '名称')
  label = label.replace(/\bCode$/i, '编码')
  label = label.replace(/\bNo$/i, '编号')
  
  return label || fieldName
}

/**
 * 推断列类型
 * @param {string} fieldName - 字段名
 * @param {*} sample - 样例值
 * @returns {string} 列类型 (text | datetime | tag)
 */
function inferColumnType(fieldName, sample) {
  const name = fieldName.toLowerCase()
  
  // 日期时间类型
  if (name.includes('time') || name.includes('date') || name.endsWith('at')) {
    return 'datetime'
  }
  
  // 检查样例值是否为日期格式
  if (typeof sample === 'string') {
    // YYYY-MM-DD HH:mm:ss
    if (/^\d{4}-\d{2}-\d{2}/.test(sample)) {
      return 'datetime'
    }
    // 时间戳
    if (/^\d{13}$/.test(sample)) {
      return 'datetime'
    }
  }
  
  // 状态/类型字段
  if (name.includes('status') || name.includes('type') || name.includes('category') || name.startsWith('is')) {
    return 'tag'
  }
  
  return 'text'
}

/**
 * 推断状态映射
 * @param {string} fieldName - 字段名
 * @param {*} sample - 样例值
 * @param {Array} dataSample - 数据样例（用于收集所有可能的值）
 * @returns {Object} 状态映射对象
 */
function inferStatusMapping(fieldName, sample, dataSample) {
  const mapping = {}
  
  // 从数据样例中收集所有可能的值
  const values = new Set()
  dataSample.forEach(item => {
    if (item[fieldName] !== null && item[fieldName] !== undefined) {
      values.add(item[fieldName])
    }
  })
  
  // 常见状态映射
  const statusMappings = {
    active: { label: '启用', type: 'success' },
    inactive: { label: '停用', type: 'info' },
    enabled: { label: '启用', type: 'success' },
    disabled: { label: '停用', type: 'info' },
    pending: { label: '待处理', type: 'warning' },
    processing: { label: '处理中', type: 'primary' },
    completed: { label: '已完成', type: 'success' },
    failed: { label: '失败', type: 'danger' },
    success: { label: '成功', type: 'success' },
    error: { label: '错误', type: 'danger' },
    true: { label: '是', type: 'success' },
    false: { label: '否', type: 'info' },
    1: { label: '是', type: 'success' },
    0: { label: '否', type: 'info' }
  }
  
  values.forEach(value => {
    const key = String(value).toLowerCase()
    if (statusMappings[key]) {
      mapping[value] = statusMappings[key]
    } else {
      // 默认映射
      mapping[value] = {
        label: String(value),
        type: 'info'
      }
    }
  })
  
  return mapping
}

/**
 * 推断搜索字段配置
 * @param {Array} searchFields - 搜索字段列表（从 API 解析结果）
 * @param {Array} dataSample - 数据样例
 * @returns {Array} 搜索字段配置数组
 */
function inferSearchFields(searchFields, dataSample) {
  if (!searchFields || searchFields.length === 0) {
    return []
  }
  
  return searchFields.map(field => {
    const searchField = {
      prop: field.prop,
      label: inferLabel(field.prop),
      type: field.type, // 已由 apiParser 推断
      defaultValue: field.defaultValue,
      confidence: 0.85
    }
    
    // 如果是 select 类型，生成 options
    if (field.type === 'select') {
      searchField.options = inferSelectOptions(field.prop, field.defaultValue, dataSample)
      searchField.confidence = 0.75 // 选项需要用户确认
    }
    
    return searchField
  })
}

/**
 * 推断下拉选项
 * @param {string} fieldName - 字段名
 * @param {*} defaultValue - 默认值
 * @param {Array} dataSample - 数据样例
 * @returns {Array} 选项数组
 */
function inferSelectOptions(fieldName, defaultValue, dataSample) {
  const options = [{ label: '全部', value: '' }]
  
  // 从数据样例中收集所有可能的值
  const values = new Set()
  dataSample.forEach(item => {
    if (item[fieldName] !== null && item[fieldName] !== undefined) {
      values.add(item[fieldName])
    }
  })
  
  // 常见状态选项
  const commonOptions = {
    status: [
      { label: '启用', value: 'active' },
      { label: '停用', value: 'inactive' }
    ],
    type: [
      { label: '类型1', value: '1' },
      { label: '类型2', value: '2' }
    ],
    isActive: [
      { label: '是', value: true },
      { label: '否', value: false }
    ]
  }
  
  if (commonOptions[fieldName]) {
    return [{ label: '全部', value: '' }, ...commonOptions[fieldName]]
  }
  
  // 根据收集的值生成选项
  values.forEach(value => {
    options.push({
      label: inferLabel(String(value)),
      value: value
    })
  })
  
  // 如果没有收集到值，返回默认选项
  if (options.length === 1) {
    options.push({ label: '选项1', value: '1' })
    options.push({ label: '选项2', value: '2' })
  }
  
  return options
}

/**
 * 本地推断（不调用 AI）
 * 用于快速生成基础配置或在无 AI 配置时作为降级方案
 * @param {Object} parseResult - API 解析结果
 * @param {string} templateId - 模板 ID
 * @returns {Object} 页面配置 JSON
 */
export function localInference(parseResult, templateId = 'standard-list') {
  const columns = inferColumns(parseResult.fields, parseResult.dataSample)
  const searchFields = inferSearchFields(parseResult.searchFields, parseResult.dataSample)
  
  return {
    templateId,
    pageName: 'GeneratedPage',
    breadcrumb: ['首页', '列表页'],
    dataMapping: {
      dataPath: parseResult.dataPath,
      totalPath: parseResult.totalPath,
      pageNoField: parseResult.pagination.pageNoField,
      pageSizeField: parseResult.pagination.pageSizeField
    },
    searchFields,
    columns
  }
}

/**
 * AI 推断（调用 AI 生成配置）
 * @param {Object} parseResult - API 解析结果
 * @param {string} templateId - 模板 ID
 * @param {Object} options - AI 配置选项
 * @returns {Promise<Object>} 页面配置 JSON
 */
export async function aiInference(parseResult, templateId = 'standard-list', options = {}) {
  try {
    // 生成 Prompt
    const prompt = generateInitialInferencePrompt({
      parseResult,
      templateId
    })
    
    // 调用 AI
    const response = await callAI(prompt, options)
    
    // 提取 JSON
    const config = extractJSON(response)
    
    // 验证必填字段
    if (!config.columns || !Array.isArray(config.columns)) {
      throw new Error('AI response missing "columns" array')
    }
    
    // 补充缺失的字段
    config.templateId = templateId
    config.pageName = config.pageName || 'GeneratedPage'
    config.breadcrumb = config.breadcrumb || ['首页', '列表页']
    
    // 确保 dataMapping 存在
    if (!config.dataMapping) {
      config.dataMapping = {
        dataPath: parseResult.dataPath,
        totalPath: parseResult.totalPath,
        pageNoField: parseResult.pagination.pageNoField,
        pageSizeField: parseResult.pagination.pageSizeField
      }
    }
    
    return config
  } catch (error) {
    console.error('AI inference failed:', error)
    
    // 降级到本地推断
    console.warn('Falling back to local inference...')
    return localInference(parseResult, templateId)
  }
}

/**
 * 修正配置（根据用户反馈）
 * @param {Object} currentConfig - 当前配置
 * @param {string} userFeedback - 用户反馈
 * @param {Object} options - AI 配置选项
 * @returns {Promise<Object>} 修正后的配置 JSON
 */
export async function correctConfig(currentConfig, userFeedback, options = {}) {
  const prompt = generateCorrectionPrompt({
    currentConfig,
    userFeedback
  })
  
  const response = await callAI(prompt, options)
  return extractJSON(response)
}

/**
 * 局部推断（推断单个字段）
 * @param {string} field - 字段名
 * @param {*} sample - 样例值
 * @param {string} inferType - 推断类型
 * @param {Object} options - AI 配置选项
 * @returns {Promise<Object>} 推断结果
 */
export async function partialInference(field, sample, inferType, options = {}) {
  const prompt = generatePartialInferencePrompt({
    field,
    sample,
    inferType
  })
  
  const response = await callAI(prompt, options)
  return extractJSON(response)
}

/**
 * 推断页面配置（统一入口函数）
 * @param {Object} config - 配置对象 { templateId, apiInput, parseResult }
 * @returns {Promise<Object>} 推断结果 { config, confidence }
 */
export async function inferPageConfig(config) {
  const { templateId, apiInput, parseResult } = config
  
  try {
    // 如果没有解析结果，返回空配置
    if (!parseResult) {
      return {
        config: {
          templateId: templateId || 'standard-list',
          pageName: 'GeneratedPage',
          breadcrumb: ['首页', '列表页'],
          dataMapping: {},
          searchFields: [],
          columns: []
        },
        confidence: 0
      }
    }
    
    // 使用本地推断生成基础配置
    const inferredConfig = localInference(parseResult, templateId)
    
    // 计算整体置信度
    const confidences = [
      ...inferredConfig.columns.map(col => col.confidence || 0.8),
      ...inferredConfig.searchFields.map(field => field.confidence || 0.8)
    ]
    const avgConfidence = confidences.length > 0
      ? confidences.reduce((sum, c) => sum + c, 0) / confidences.length
      : 0.8
    
    return {
      config: inferredConfig,
      confidence: avgConfidence
    }
  } catch (error) {
    console.error('Inference error:', error)
    // 返回空配置
    return {
      config: {
        templateId: templateId || 'standard-list',
        pageName: 'GeneratedPage',
        breadcrumb: ['首页', '列表页'],
        dataMapping: {},
        searchFields: [],
        columns: []
      },
      confidence: 0
    }
  }
}

export default {
  localInference,
  aiInference,
  correctConfig,
  partialInference,
  inferPageConfig
}

