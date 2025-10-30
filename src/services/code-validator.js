/**
 * 代码校验服务
 * 包括 Vue 模板校验和基本语法检查
 */

import { parse, compileTemplate } from '@vue/compiler-sfc'

/**
 * 校验 Vue 模板语法
 * @param {string} code - Vue SFC 代码
 * @returns {Object} { valid: boolean, errors: Array, warnings: Array }
 */
export function validateVueTemplate(code) {
  try {
    // 使用 parse 解析 SFC
    const parsed = parse(code, {
      filename: 'component.vue'
    })

    const errors = []
    const warnings = []

    // 检查是否有 template
    if (!parsed.descriptor.template) {
      return {
        valid: false,
        errors: ['未找到 <template> 标签'],
        warnings: []
      }
    }

    // 尝试编译 template
    try {
      const compiled = compileTemplate({
        source: parsed.descriptor.template.content,
        filename: 'component.vue',
        id: 'test-component'
      })

      // 检查编译错误
      if (compiled.errors && compiled.errors.length > 0) {
        compiled.errors.forEach(err => {
          errors.push(typeof err === 'string' ? err : err.message)
        })
      }
    } catch (compileError) {
      errors.push(`模板编译失败: ${compileError.message}`)
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    }
  } catch (error) {
    return {
      valid: false,
      errors: [`解析失败: ${error.message}`],
      warnings: []
    }
  }
}

/**
 * 校验 Vue SFC 结构
 * @param {string} code - Vue SFC 代码
 * @returns {Object} { valid: boolean, errors: Array }
 */
export function validateVueSFC(code) {
  const errors = []

  // 检查必需的标签
  if (!/<template>/.test(code)) {
    errors.push('缺少 <template> 标签')
  }

  if (!/<script>/.test(code)) {
    errors.push('缺少 <script> 标签')
  }

  // 检查标签闭合
  const templateCount = (code.match(/<template>/g) || []).length
  const templateCloseCount = (code.match(/<\/template>/g) || []).length
  if (templateCount !== templateCloseCount) {
    errors.push('<template> 标签未正确闭合')
  }

  const scriptCount = (code.match(/<script>/g) || []).length
  const scriptCloseCount = (code.match(/<\/script>/g) || []).length
  if (scriptCount !== scriptCloseCount) {
    errors.push('<script> 标签未正确闭合')
  }

  // 检查 export default
  if (!code.includes('export default')) {
    errors.push('缺少 export default')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * 基本的 JavaScript 语法检查
 * @param {string} code - JavaScript 代码
 * @returns {Object} { valid: boolean, errors: Array }
 */
export function validateJavaScript(code) {
  const errors = []

  try {
    // 提取 script 部分
    const scriptMatch = code.match(/<script>([\s\S]*?)<\/script>/)
    if (!scriptMatch) {
      return { valid: true, errors: [] }
    }

    const scriptContent = scriptMatch[1]

    // 基本的语法检查
    // 检查常见错误

    // 1. 检查未闭合的括号
    const openBraces = (scriptContent.match(/\{/g) || []).length
    const closeBraces = (scriptContent.match(/\}/g) || []).length
    if (openBraces !== closeBraces) {
      errors.push(`大括号不匹配: ${openBraces} 个 '{' vs ${closeBraces} 个 '}'`)
    }

    const openParens = (scriptContent.match(/\(/g) || []).length
    const closeParens = (scriptContent.match(/\)/g) || []).length
    if (openParens !== closeParens) {
      errors.push(`圆括号不匹配: ${openParens} 个 '(' vs ${closeParens} 个 ')'`)
    }

    const openBrackets = (scriptContent.match(/\[/g) || []).length
    const closeBrackets = (scriptContent.match(/\]/g) || []).length
    if (openBrackets !== closeBrackets) {
      errors.push(`方括号不匹配: ${openBrackets} 个 '[' vs ${closeBrackets} 个 ']'`)
    }

    // 2. 检查基本的 Vue 组件结构
    if (!scriptContent.includes('export default')) {
      errors.push('缺少 export default')
    }

    // 3. 尝试使用 Function 构造函数检查语法（简单检查）
    try {
      // 移除 import 语句（它们在浏览器中无法执行）
      const codeWithoutImports = scriptContent.replace(/import\s+.*?from\s+['"].*?['"]/g, '')
      // 移除 export 语句
      const codeWithoutExports = codeWithoutImports.replace(/export\s+(default\s+)?/g, '')
      
      // 尝试解析（不执行）
      new Function(codeWithoutExports)
    } catch (e) {
      // 忽略某些预期的错误
      if (!e.message.includes('Unexpected identifier') && 
          !e.message.includes('Unexpected token')) {
        errors.push(`语法错误: ${e.message}`)
      }
    }

  } catch (error) {
    errors.push(`JavaScript 检查失败: ${error.message}`)
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * 完整的代码校验
 * @param {string} code - Vue SFC 代码
 * @returns {Object} { valid: boolean, errors: Array, warnings: Array }
 */
export function validateCode(code) {
  const results = {
    valid: true,
    errors: [],
    warnings: []
  }

  // 1. SFC 结构校验
  const sfcValidation = validateVueSFC(code)
  if (!sfcValidation.valid) {
    results.valid = false
    results.errors.push(...sfcValidation.errors)
    // 如果结构有问题，不继续后续校验
    return results
  }

  // 2. Vue 模板校验
  const templateValidation = validateVueTemplate(code)
  if (!templateValidation.valid) {
    results.valid = false
    results.errors.push(...templateValidation.errors)
  }
  results.warnings.push(...templateValidation.warnings)

  // 3. JavaScript 语法校验
  const jsValidation = validateJavaScript(code)
  if (!jsValidation.valid) {
    results.valid = false
    results.errors.push(...jsValidation.errors)
  }

  return results
}

/**
 * 生成校验报告
 * @param {Object} validation - 校验结果
 * @returns {string} 格式化的报告
 */
export function generateValidationReport(validation) {
  let report = ''

  if (validation.valid) {
    report += '✅ 代码校验通过\n\n'
  } else {
    report += '❌ 代码校验失败\n\n'
  }

  if (validation.errors && validation.errors.length > 0) {
    report += '错误：\n'
    validation.errors.forEach((error, index) => {
      report += `${index + 1}. ${error}\n`
    })
    report += '\n'
  }

  if (validation.warnings && validation.warnings.length > 0) {
    report += '警告：\n'
    validation.warnings.forEach((warning, index) => {
      report += `${index + 1}. ${warning}\n`
    })
  }

  return report
}

export default {
  validateVueTemplate,
  validateVueSFC,
  validateJavaScript,
  validateCode,
  generateValidationReport
}

