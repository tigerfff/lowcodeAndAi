/**
 * 代码生成器
 * 基于 Handlebars 模板引擎生成 Vue2 SFC
 */

import Handlebars from 'handlebars'
// Prettier 在浏览器环境有兼容性问题，暂时不使用
// import prettier from 'prettier'

// 注册 Handlebars helpers
Handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context, null, 2)
})

Handlebars.registerHelper('pascalCase', function(str) {
  return str.replace(/(?:^|-)(\w)/g, (_, c) => c ? c.toUpperCase() : '')
})

Handlebars.registerHelper('camelCase', function(str) {
  const pascal = str.replace(/(?:^|-)(\w)/g, (_, c) => c ? c.toUpperCase() : '')
  return pascal.charAt(0).toLowerCase() + pascal.slice(1)
})

Handlebars.registerHelper('kebabCase', function(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')  // 在驼峰之间添加连字符
    .replace(/\s+/g, '-')                  // 空格替换为连字符
    .toLowerCase()                          // 全部小写
})

Handlebars.registerHelper('eq', function(a, b) {
  return a === b
})

Handlebars.registerHelper('startsWith', function(str, prefix) {
  return typeof str === 'string' && str.startsWith(prefix)
})

/**
 * 加载模板文件
 * @param {string} templateId - 模板 ID
 * @returns {Promise<string>} 模板内容
 */
async function loadTemplate(templateId) {
  try {
    const response = await fetch(`/templates/${templateId}/page.vue.hbs`)
    if (!response.ok) {
      throw new Error(`Failed to load template: ${templateId}`)
    }
    return await response.text()
  } catch (error) {
    console.error('Load template error:', error)
    throw error
  }
}

/**
 * 构造渲染上下文
 * @param {Object} config - 页面配置
 * @returns {Object} Handlebars 上下文
 */
function buildContext(config) {
  const {
    templateId,
    pageName,
    breadcrumb = [],
    dataMapping,
    columns = [],
    searchFields = [],
    api = {}
  } = config

  // 过滤显示的列
  const visibleColumns = columns.filter(col => col.visible !== false)

  // 处理数据映射路径
  const dataPathExpression = generateDataPathExpression(dataMapping.dataPath)
  const totalPathExpression = generateDataPathExpression(dataMapping.totalPath)

  // 处理搜索字段
  const processedSearchFields = searchFields.map(field => ({
    ...field,
    hasOptions: field.type === 'select' && field.options && field.options.length > 0
  }))

  // 检查是否有 select 类型的搜索字段
  const hasSelectOptions = processedSearchFields.some(f => f.hasOptions)

  // 提取 select 选项
  const selectOptions = processedSearchFields
    .filter(f => f.hasOptions)
    .map(f => ({
      varName: `${f.prop}Options`,
      options: f.options
    }))

  // API 配置
  const apiConfig = {
    mode: api.mode || 'todo',
    importPath: api.modulePath || '',
    methodName: api.methodName || '',
    url: api.url || '',
    method: api.method || 'POST'
  }

  return {
    templateId,
    pageName,
    pascalCase: pascalCaseName(pageName),
    breadcrumb,
    dataMapping: {
      dataPath: dataMapping.dataPath,
      totalPath: dataMapping.totalPath,
      dataPathExpression,
      totalPathExpression,
      pageNoField: dataMapping.pageNoField || 'pageNo',
      pageSizeField: dataMapping.pageSizeField || 'pageSize'
    },
    columns: visibleColumns,
    searchFields: processedSearchFields,
    hasSearchFields: searchFields.length > 0,
    hasSelectOptions,
    selectOptions,
    api: apiConfig
  }
}

/**
 * 生成数据路径表达式
 * @param {string} path - 点分隔路径
 * @returns {string} JavaScript 表达式
 */
function generateDataPathExpression(path) {
  if (!path) return ''
  
  // 移除 'data.' 前缀（如果存在）
  if (path.startsWith('data.')) {
    path = path.substring(5)
  }
  
  // 转换为访问表达式
  return `data.${path}`
}

/**
 * 转换为 PascalCase
 * @param {string} str - 输入字符串
 * @returns {string} PascalCase 字符串
 */
function pascalCaseName(str) {
  return str.replace(/(?:^|-)(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

/**
 * 生成 Vue2 SFC 代码
 * @param {Object} config - 页面配置
 * @returns {Promise<string>} 生成的代码
 */
export async function generateCode(config) {
  try {
    // 1. 加载模板
    const templateContent = await loadTemplate(config.templateId || 'standard-list')
    
    // 2. 编译模板
    const template = Handlebars.compile(templateContent)
    
    // 3. 构造上下文
    const context = buildContext(config)
    
    // 4. 渲染代码
    const code = template(context)
    
    // 5. 格式化代码
    const formattedCode = await formatCode(code)
    
    return formattedCode
  } catch (error) {
    console.error('Code generation error:', error)
    throw error
  }
}

/**
 * 格式化代码
 * @param {string} code - 原始代码
 * @returns {Promise<string>} 格式化后的代码
 */
export async function formatCode(code) {
  try {
    // Prettier 在浏览器环境可能无法正常工作
    // 暂时返回原样，用户可以手动格式化
    return code
    
    // 如果想使用 Prettier，需要动态导入并配置：
    // const { format } = await import('prettier/standalone')
    // const vuePlugin = await import('prettier/parser-html')
    // return format(code, {
    //   parser: 'vue',
    //   plugins: [vuePlugin],
    //   semi: false,
    //   singleQuote: true
    // })
  } catch (error) {
    console.warn('Code formatting failed, returning unformatted code:', error)
    return code
  }
}

/**
 * 生成 API 服务代码（可选）
 * @param {Object} config - 页面配置
 * @returns {string} API 服务代码
 */
export function generateApiService(config) {
  const { pageName, api, dataMapping } = config
  
  if (!api || api.mode === 'todo') {
    return null
  }

  const functionName = `get${pascalCaseName(pageName)}List`
  
  return `/**
 * ${pageName} API
 */
import request from '@/utils/request'

/**
 * 获取${pageName}列表
 * @param {Object} params - 查询参数
 * @returns {Promise}
 */
export function ${functionName}(params) {
  return request({
    url: '${api.url}',
    method: '${api.method}',
    ${api.method === 'GET' ? 'params' : 'data'}: params
  })
}
`
}

/**
 * 生成路由配置代码（可选）
 * @param {Object} config - 页面配置
 * @returns {string} 路由配置代码
 */
export function generateRouteConfig(config) {
  const { pageName, breadcrumb } = config
  const componentName = pascalCaseName(pageName)
  const routePath = pageName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')
  
  return `{
  path: '/${routePath}',
  name: '${componentName}',
  component: () => import('@/views/${componentName}.vue'),
  meta: {
    title: '${breadcrumb[breadcrumb.length - 1] || pageName}',
    breadcrumb: ${JSON.stringify(breadcrumb)}
  }
}`
}

export default {
  generateCode,
  formatCode,
  generateApiService,
  generateRouteConfig
}
