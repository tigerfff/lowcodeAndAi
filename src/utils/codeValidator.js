/**
 * 代码校验工具
 * 负责校验生成的 Vue2 SFC 代码
 */

import { compile } from 'vue-template-compiler'

/**
 * 校验 Vue 模板语法
 * @param {string} template - Vue 模板字符串
 * @returns {Object} { valid: boolean, errors: Array }
 */
export function validateVueTemplate(template) {
  try {
    const compiled = compile(template, {
      outputSourceRange: true,
      whitespace: 'preserve'
    })

    if (compiled.errors && compiled.errors.length > 0) {
      return {
        valid: false,
        errors: compiled.errors.map(err => ({
          message: typeof err === 'string' ? err : err.msg,
          type: 'template-error'
        }))
      }
    }

    if (compiled.tips && compiled.tips.length > 0) {
      return {
        valid: true,
        errors: [],
        warnings: compiled.tips.map(tip => ({
          message: tip,
          type: 'template-tip'
        }))
      }
    }

    return {
      valid: true,
      errors: [],
      warnings: []
    }
  } catch (error) {
    return {
      valid: false,
      errors: [{
        message: error.message,
        type: 'compile-error'
      }]
    }
  }
}

/**
 * 从 SFC 代码中提取 template 部分
 * @param {string} sfc - Vue SFC 代码
 * @returns {string} template 内容
 */
function extractTemplate(sfc) {
  const templateMatch = sfc.match(/<template>([\s\S]*?)<\/template>/)
  return templateMatch ? templateMatch[1].trim() : ''
}

/**
 * 从 SFC 代码中提取 script 部分
 * @param {string} sfc - Vue SFC 代码
 * @returns {string} script 内容
 */
function extractScript(sfc) {
  const scriptMatch = sfc.match(/<script>([\s\S]*?)<\/script>/)
  return scriptMatch ? scriptMatch[1].trim() : ''
}

/**
 * 校验 SFC 代码
 * @param {string} sfcCode - Vue SFC 代码
 * @returns {Object} 校验结果
 */
export function validateSFC(sfcCode) {
  const errors = []
  const warnings = []

  // 检查 SFC 基本结构
  if (!sfcCode.includes('<template>')) {
    errors.push({
      message: 'Missing <template> section',
      type: 'structure-error'
    })
  }

  if (!sfcCode.includes('<script>')) {
    errors.push({
      message: 'Missing <script> section',
      type: 'structure-error'
    })
  }

  // 提取并校验 template
  const template = extractTemplate(sfcCode)
  if (template) {
    const templateResult = validateVueTemplate(template)
    if (!templateResult.valid) {
      errors.push(...templateResult.errors)
    }
    if (templateResult.warnings && templateResult.warnings.length > 0) {
      warnings.push(...templateResult.warnings)
    }
  }

  // 基本的 script 校验
  const script = extractScript(sfcCode)
  if (script) {
    // 检查是否有 export default
    if (!script.includes('export default')) {
      errors.push({
        message: 'Missing export default in script',
        type: 'script-error'
      })
    }

    // 检查常见的语法错误（简化版）
    const bracketBalance = checkBracketBalance(script)
    if (!bracketBalance.valid) {
      errors.push({
        message: `Unbalanced ${bracketBalance.type}: ${bracketBalance.message}`,
        type: 'syntax-error'
      })
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * 检查括号平衡
 * @param {string} code - 代码字符串
 * @returns {Object} 校验结果
 */
function checkBracketBalance(code) {
  const pairs = {
    '{': '}',
    '[': ']',
    '(': ')'
  }

  const stack = []
  const opening = Object.keys(pairs)
  const closing = Object.values(pairs)

  // 移除字符串和注释中的括号（简化版）
  const cleanCode = code
    .replace(/'[^']*'/g, '')
    .replace(/"[^"]*"/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')

  for (let i = 0; i < cleanCode.length; i++) {
    const char = cleanCode[i]

    if (opening.includes(char)) {
      stack.push(char)
    } else if (closing.includes(char)) {
      const last = stack.pop()
      if (!last || pairs[last] !== char) {
        return {
          valid: false,
          type: 'bracket',
          message: `Unexpected closing bracket '${char}' at position ${i}`
        }
      }
    }
  }

  if (stack.length > 0) {
    return {
      valid: false,
      type: 'bracket',
      message: `Unclosed opening bracket '${stack[stack.length - 1]}'`
    }
  }

  return { valid: true }
}

/**
 * 格式化校验错误信息
 * @param {Array} errors - 错误数组
 * @returns {string} 格式化后的错误信息
 */
export function formatValidationErrors(errors) {
  if (!errors || errors.length === 0) {
    return ''
  }

  return errors.map((err, index) => {
    return `${index + 1}. [${err.type}] ${err.message}`
  }).join('\n')
}

/**
 * 综合校验（配置 + 代码）
 * @param {Object} pageConfig - 页面配置
 * @param {string} sfcCode - 生成的 SFC 代码
 * @returns {Object} 综合校验结果
 */
export async function comprehensiveValidation(pageConfig, sfcCode) {
  const results = {
    config: { valid: true, errors: [] },
    code: { valid: true, errors: [], warnings: [] },
    overall: { valid: true, errors: [], warnings: [] }
  }

  // 1. 配置校验
  try {
    const { validatePageConfig } = await import('./configValidator.js')
    results.config = await validatePageConfig(pageConfig)
  } catch (error) {
    results.config = {
      valid: false,
      errors: [{ message: `Config validation failed: ${error.message}` }]
    }
  }

  // 2. 代码校验
  if (sfcCode) {
    results.code = validateSFC(sfcCode)
  }

  // 3. 综合结果
  results.overall.valid = results.config.valid && results.code.valid
  results.overall.errors = [
    ...results.config.errors.map(err => ({ ...err, source: 'config' })),
    ...results.code.errors.map(err => ({ ...err, source: 'code' }))
  ]
  results.overall.warnings = [
    ...(results.config.lowConfidenceItems || []).map(item => ({
      message: `Low confidence (${(item.confidence * 100).toFixed(0)}%): ${item.type} - ${item.prop}`,
      type: 'confidence-warning',
      source: 'config'
    })),
    ...(results.code.warnings || []).map(warn => ({ ...warn, source: 'code' }))
  ]

  return results
}

export default {
  validateVueTemplate,
  validateSFC,
  formatValidationErrors,
  comprehensiveValidation
}

