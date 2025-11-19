/**
 * Vue 组件代码解析工具
 * 用于从 Vue SFC 代码中提取组件信息
 */

/**
 * 解析 Vue 单文件组件
 * @param {string} code - Vue SFC 代码
 * @returns {Object} 解析结果
 */
export function parseVueComponent(code) {
  try {
    const result = {
      template: '',
      script: '',
      style: '',
      name: '',
      props: [],
      events: [],
      methods: [],
      valid: false,
    }

    // 提取 template
    const templateMatch = code.match(/<template>([\s\S]*?)<\/template>/i)
    if (templateMatch) {
      result.template = templateMatch[1].trim()
    }

    // 提取 script
    const scriptMatch = code.match(/<script[^>]*>([\s\S]*?)<\/script>/i)
    if (scriptMatch) {
      result.script = scriptMatch[1].trim()
      
      // 从 script 中提取更多信息
      const scriptInfo = parseScriptContent(result.script)
      result.name = scriptInfo.name
      result.props = scriptInfo.props
      result.events = scriptInfo.events
      result.methods = scriptInfo.methods
    }

    // 提取 style
    const styleMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/i)
    if (styleMatch) {
      result.style = styleMatch[1].trim()
    }

    // 验证组件是否有效
    result.valid = !!result.template && !!result.script

    return result
  } catch (error) {
    console.error('Parse Vue component failed:', error)
    return {
      valid: false,
      error: error.message,
    }
  }
}

/**
 * 从 script 内容中提取信息
 * @param {string} scriptContent - script 标签内容
 * @returns {Object} 提取的信息
 */
function parseScriptContent(scriptContent) {
  const result = {
    name: '',
    props: [],
    events: [],
    methods: [],
  }

  // 提取组件名
  result.name = extractComponentName(scriptContent)

  // 提取 props
  result.props = extractProps(scriptContent)

  // 提取 events（从 $emit 中提取）
  result.events = extractEvents(scriptContent)

  // 提取 methods
  result.methods = extractMethods(scriptContent)

  return result
}

/**
 * 提取组件名
 * @param {string} scriptContent - script 内容
 * @returns {string} 组件名
 */
function extractComponentName(scriptContent) {
  // 从 name: 'ComponentName' 提取
  const nameMatch = scriptContent.match(/name\s*:\s*['"]([^'"]+)['"]/m)
  if (nameMatch) {
    return nameMatch[1]
  }

  // 默认返回
  return 'CustomComponent'
}

/**
 * 提取 props
 * @param {string} scriptContent - script 内容
 * @returns {Array} props 列表
 */
function extractProps(scriptContent) {
  const props = []

  // 匹配 props: ['a', 'b'] 或 props: { a: {}, b: {} }
  const propsMatch = scriptContent.match(/props\s*:\s*(\[[\s\S]*?\]|\{[\s\S]*?\})/m)

  if (propsMatch) {
    const propsStr = propsMatch[1]

    // 数组形式: ['value', 'options']
    if (propsStr.startsWith('[')) {
      const arrayProps = propsStr.match(/'([^']+)'|"([^"]+)"/g)
      if (arrayProps) {
        arrayProps.forEach(p => {
          const propName = p.replace(/['"]/g, '')
          props.push({
            name: propName,
            type: 'any',
            required: false,
            default: undefined,
          })
        })
      }
    }
    // 对象形式: { value: {}, options: {} }
    else {
      // 提取所有属性名
      const objectProps = propsStr.match(/(\w+)\s*:\s*\{/g)
      if (objectProps) {
        objectProps.forEach(p => {
          const propName = p.replace(/\s*:\s*\{/, '').trim()
          
          // 尝试提取该 prop 的详细信息
          const propDetailRegex = new RegExp(`${propName}\\s*:\\s*\\{([\\s\\S]*?)\\}`, 'm')
          const propDetailMatch = propsStr.match(propDetailRegex)
          
          let type = 'any'
          let required = false
          let defaultValue = undefined
          
          if (propDetailMatch) {
            const propDetail = propDetailMatch[1]
            
            // 提取 type
            const typeMatch = propDetail.match(/type\s*:\s*(\w+)/m)
            if (typeMatch) {
              type = typeMatch[1].toLowerCase()
            }
            
            // 提取 required
            const requiredMatch = propDetail.match(/required\s*:\s*(true|false)/m)
            if (requiredMatch) {
              required = requiredMatch[1] === 'true'
            }
            
            // 提取 default
            const defaultMatch = propDetail.match(/default\s*:\s*([^,\n]+)/m)
            if (defaultMatch) {
              defaultValue = defaultMatch[1].trim()
            }
          }
          
          props.push({
            name: propName,
            type,
            required,
            default: defaultValue,
          })
        })
      }
    }
  }

  return props
}

/**
 * 提取 events（从 $emit 调用中提取）
 * @param {string} scriptContent - script 内容
 * @returns {Array} events 列表
 */
function extractEvents(scriptContent) {
  const events = new Set()

  // 匹配 this.$emit('eventName') 或 $emit('eventName')
  const emitMatches = scriptContent.matchAll(/\$emit\s*\(\s*['"]([^'"]+)['"]/g)

  for (const match of emitMatches) {
    events.add(match[1])
  }

  return Array.from(events)
}

/**
 * 提取 methods
 * @param {string} scriptContent - script 内容
 * @returns {Array} methods 列表
 */
function extractMethods(scriptContent) {
  const methods = []

  // 匹配 methods: { methodName() {}, ... }
  const methodsMatch = scriptContent.match(/methods\s*:\s*\{([\s\S]*?)\n\s*\}/m)

  if (methodsMatch) {
    const methodsStr = methodsMatch[1]
    
    // 匹配方法名
    const methodMatches = methodsStr.matchAll(/(\w+)\s*\(/g)
    
    for (const match of methodMatches) {
      methods.push(match[1])
    }
  }

  return methods
}

/**
 * 验证 Vue 组件代码
 * @param {string} code - Vue SFC 代码
 * @returns {Object} 验证结果
 */
export function validateVueComponent(code) {
  const result = {
    valid: false,
    errors: [],
    warnings: [],
  }

  if (!code || !code.trim()) {
    result.errors.push('组件代码不能为空')
    return result
  }

  // 检查是否包含 template
  if (!/<template>/i.test(code)) {
    result.errors.push('缺少 <template> 标签')
  }

  // 检查是否包含 script
  if (!/<script/i.test(code)) {
    result.errors.push('缺少 <script> 标签')
  }

  // 检查是否包含 export default
  if (/<script/i.test(code) && !/export\s+default/i.test(code)) {
    result.warnings.push('建议使用 export default 导出组件')
  }

  // 检查括号是否匹配
  const openBrackets = (code.match(/\{/g) || []).length
  const closeBrackets = (code.match(/\}/g) || []).length
  if (openBrackets !== closeBrackets) {
    result.errors.push('花括号不匹配')
  }

  result.valid = result.errors.length === 0

  return result
}

/**
 * 生成组件的描述信息
 * @param {Object} parsedComponent - 解析后的组件信息
 * @returns {string} 描述信息
 */
export function generateComponentDescription(parsedComponent) {
  const lines = []

  lines.push(`组件名称: ${parsedComponent.name}`)

  if (parsedComponent.props.length > 0) {
    lines.push(`Props: ${parsedComponent.props.map(p => p.name).join(', ')}`)
  }

  if (parsedComponent.events.length > 0) {
    lines.push(`Events: ${parsedComponent.events.join(', ')}`)
  }

  if (parsedComponent.methods.length > 0) {
    lines.push(`Methods: ${parsedComponent.methods.join(', ')}`)
  }

  return lines.join('\n')
}

/**
 * 从组件代码中提取导入路径建议
 * @param {string} componentName - 组件名
 * @returns {string} 建议的导入路径
 */
export function suggestImportPath(componentName) {
  // 将 PascalCase 转换为 kebab-case
  const kebabName = componentName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
  
  return `@/components/${componentName}.vue`
}

