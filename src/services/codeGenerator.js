/**
 * 代码生成器
 * 负责根据配置生成 Vue3 SFC 代码，支持 Handlebars 模板渲染和 AI 集成
 */

import Handlebars from 'handlebars'
import { getTemplateById } from './templateManager.js'
import { callAIGenerate } from './aiService.js'
import { utilsList } from '../config/utilsList'
import { validatorsList } from '../config/validatorsList'

// 注册 Handlebars Helpers
Handlebars.registerHelper('kebabCase', str => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
})

Handlebars.registerHelper('pascalCase', str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

Handlebars.registerHelper('camelCase', str => {
  return str.charAt(0).toLowerCase() + str.slice(1)
})

Handlebars.registerHelper('eq', (a, b) => a === b)

Handlebars.registerHelper('json', context => {
  return JSON.stringify(context)
})

Handlebars.registerHelper('startsWith', (str, prefix) => {
  return str && str.startsWith(prefix)
})

/**
 * 生成完整的 Vue2 SFC 代码
 * @param {Object} config - 页面配置
 * @param {Object} options - 生成选项
 * @returns {Promise<Object>} 生成结果
 */
export async function generateCode(config, options = {}) {
  try {
    console.log('🚀 Starting code generation...', config)

    // 1. 加载模板定义
    const template = await getTemplateById(config.templateId)
    if (!template) {
      throw new Error(`Template not found: ${config.templateId}`)
    }

    // 2. 构建 AI Prompt
    const prompt = await buildAIPrompt(config, template)

    let code = null
    let method = 'template'
    let aiError = null

    // 3. 优先使用 AI 生成
    if (options.useAI && config.aiConfig) {
      try {
        console.log('🤖 Attempting AI generation...')
        code = await callAIGenerate({
          prompt,
          aiConfig: config.aiConfig,
        })
        method = 'ai'
        console.log('✅ AI generation successful')
      } catch (error) {
        console.warn('⚠️ AI generation failed, will fallback to template:', error)
        aiError = error.message
      }
    }

    // 4. Fallback: 使用 Handlebars 模板生成代码
    if (!code) {
      console.log('📋 Using Handlebars template fallback...')
      code = await generateWithTemplate(config, template)
      method = 'template'
    }

    // 5. 验证生成的代码
    const validation = validateCode(code)
    if (!validation.valid) {
      console.warn('⚠️ Code validation warnings:', validation.issues)
    }

    return {
      success: true,
      code,
      prompt,
      method,
      aiError,
      validation,
      metadata: {
        templateId: config.templateId,
        pageName: config.pageName,
        componentCount: countComponents(config.slots),
        apiCount: config.apiConfigs?.length || 0,
        timestamp: new Date().toISOString(),
      },
    }
  } catch (error) {
    console.error('❌ Code generation failed:', error)
    return {
      success: false,
      error: error.message,
      code: null,
      prompt: null,
    }
  }
}

/**
 * 使用 Handlebars 模板生成代码
 * @param {Object} config - 页面配置
 * @param {Object} template - 模板定义
 * @returns {Promise<string>} 生成的代码
 */
async function generateWithTemplate(config, template) {
  try {
    // 1. 读取 Handlebars 模板文件
    const templatePath = `/templates/${template.id}/page.vue.hbs`
    const response = await fetch(templatePath)
    if (!response.ok) {
      throw new Error(`Failed to load template file: ${templatePath}`)
    }
    const templateSource = await response.text()

    // 2. 编译模板
    const compiledTemplate = Handlebars.compile(templateSource)

    // 3. 准备模板数据 - 将 slots 转换为 searchFields/columns 格式
    const searchFields = (config.slots?.searchArea || []).map(comp => {
      // 推断组件类型
      let type = 'input'
      if (comp.component === 'el-select') type = 'select'
      else if (comp.component === 'el-date-picker') {
        // 根据 props 判断具体类型
        if (comp.props?.type === 'daterange') type = 'daterange'
        else if (comp.props?.type === 'datetime') type = 'datetime'
        else type = 'date'
      }

      return {
        prop: comp.model || comp.id || 'field',
        label: comp.label || '字段',
        type,
        placeholder: comp.props?.placeholder || '',
        defaultValue: comp.defaultValue || '',
        options: comp.props?.options || null,
      }
    })

    const columns = (config.slots?.tableColumns || []).map(col => ({
      prop: col.props?.prop || 'field',
      label: col.props?.label || '列',
      width: col.props?.width || null,
      minWidth: col.props?.minWidth || null,
      formatter: col.props?.formatter || null,
      customRender: col.customRender || null,
    }))

    // 检查是否有下拉选项需要提取
    const selectOptions = []
    let hasSelectOptions = false
    searchFields.forEach(field => {
      if (field.type === 'select' && field.options && field.options.static) {
        hasSelectOptions = true
        selectOptions.push({
          varName: `${field.prop}Options`,
          options: field.options.static,
        })
        // 更新 options 引用
        field.options = {
          varName: `${field.prop}Options`,
          valueKey: field.options.valueKey || 'value',
          labelKey: field.options.labelKey || 'label',
        }
      }
    })

    const templateData = {
      // 基本信息
      pageName: config.pageName,
      description: config.description || '',
      breadcrumb: config.breadcrumb || [],

      // API 配置
      api: config.api || {},

      // 搜索字段
      searchFields,
      hasSelectOptions,
      selectOptions,

      // 表格列
      columns,

      // 操作列（可选）
      operationColumn: config.operationColumn || null,

      // 数据映射配置
      dataMapping: config.dataMapping || {
        dataPath: 'data.rows',
        totalPath: 'data.total',
        pageNoField: 'pageNo',
        pageSizeField: 'pageSize',
      },
    }

    // 4. 渲染模板
    const code = compiledTemplate(templateData)

    console.log('✅ Template rendered successfully')
    return code
  } catch (error) {
    console.error('Template rendering error:', error)
    throw new Error(`Template rendering failed: ${error.message}`)
  }
}

/**
 * 构建 AI Prompt
 * @param {Object} config - 页面配置
 * @param {Object} template - 模板定义
 * @returns {Promise<string>} AI Prompt
 */
async function buildAIPrompt(config, template) {
  const templatePath = `/templates/${template.id}/page.vue.hbs`
  const examplePath = `/templates/${template.id}/list.vue`

  let templateSource = ''
  let exampleSource = ''

  try {
    const response = await fetch(templatePath)
    if (response.ok) {
      templateSource = await response.text()
    }
  } catch (error) {
    console.warn('Failed to load template for prompt:', error)
  }

  try {
    const response = await fetch(examplePath)
    if (response.ok) {
      exampleSource = await response.text()
    }
  } catch (error) {
    console.warn('Failed to load example page for prompt:', error)
  }

  let prompt = `# Vue2 页面代码生成任务

## 一、基础信息
- 页面名称: ${config.pageName || 'GeneratedPage'}
- 页面描述: ${config.description || config.pageInfo?.title || '未提供'}
- 面包屑: ${config.breadcrumb?.join(' > ') || (config.pageInfo?.breadcrumb || []).join(' > ') || '无'}
- 模板类型: ${template.label} (${template.id})

## 二、模板说明
${template.description || ''}

模板布局结构：
- h-page-container: 页面容器
  - h-page-header: 页面头部（面包屑）
  - h-page-content: 页面内容
    - h-page-search: 搜索区（可选）
    - h-page-action: 操作区（可选）
    - h-page-table: 表格区（包含分页）
`

  if (exampleSource) {
    prompt += `
## 三、参考示例页面（推荐模仿结构与写法）
\`\`\`vue
${exampleSource}
\`\`\`
`
  } else if (templateSource) {
    prompt += `
## 三、模板结构参考（Handlebars 模板）
\`\`\`vue
${templateSource}
\`\`\`
`
  }

  prompt += `
**重要：请严格参考上述结构和风格！**
`

  // 添加组件配置信息
  if (config.slots) {
    prompt += `\n## 四、组件配置\n\n`

    // 构建组件映射表（用于解析提示词中的@mention）
    const componentMaps = {}

    // 动态遍历所有 slot
    Object.entries(config.slots || {}).forEach(([slotName, components]) => {
      if (!Array.isArray(components) || components.length === 0) return

      // 从模板元数据获取 slot 显示名称
      const slotMeta = template.slots?.[slotName] || {}
      const slotLabel = slotMeta.label || slotName

      prompt += `### ${slotLabel} (${components.length}个)\n\n`
      const slotMap = {}

      components.forEach((comp, index) => {
        const friendlyName = comp.friendlyName || comp.label || comp.text || `组件${index + 1}`
        prompt += `${index + 1}. ${friendlyName} (${comp.component})`
        prompt += ` - ID: ${comp.id}`
        if (comp.label) prompt += ` - 标签: ${comp.label}`
        if (comp.text) prompt += ` - 文字: ${comp.text}`
        if (comp.model) prompt += ` - 字段: ${comp.model}`
        if (comp.props && Object.keys(comp.props).length > 0) {
          prompt += ` - 属性: ${JSON.stringify(comp.props)}`
        }
        prompt += '\n'

        // 构建映射表
        slotMap[friendlyName] = {
          id: comp.id,
          component: comp.component,
          model: comp.model,
          label: comp.label,
          text: comp.text,
          props: comp.props,
        }
      })
      componentMaps[slotName] = slotMap
      prompt += '\n'

      // 添加 slot 提示词
      if (config.slotPrompts && config.slotPrompts[slotName]) {
        prompt += `**${slotLabel}提示词:**\n${config.slotPrompts[slotName]}\n\n`
        prompt += `**提示词中的组件引用映射:**\n`
        Object.keys(slotMap).forEach(name => {
          const comp = slotMap[name]
          const shortId = comp.id ? comp.id.split('_').slice(-1)[0] : ''
          prompt += `- @${name}${shortId ? '#' + shortId : ''} → ${comp.component} (id: ${comp.id}${comp.model ? ', model: ' + comp.model : ''})\n`
        })
        prompt += '\n'
      }
    })

    // 添加组件联动说明
    if (config.slotPrompts && Object.values(config.slotPrompts).some(p => p && p.trim())) {
      prompt += `\n### 组件联动规则说明\n\n`
      prompt += `在提示词中使用 @组件名 来引用组件。AI需要根据提示词中的描述，生成相应的条件渲染逻辑（v-if/v-show）。\n\n`
      prompt += `例如：\n`
      prompt += `- 提示词："当 @部门选择器 选择'总部'时，显示 @子部门选择器"\n`
      prompt += `- 生成代码：<el-select v-if="filters.department === '总部'" ... />\n\n`
    }
  }

  // 添加 API 配置（多个）
  if (config.apiConfigs && config.apiConfigs.length > 0) {
    prompt += `\n## 五、API 接口配置\n\n`
    config.apiConfigs.forEach((api, index) => {
      prompt += `### API ${index + 1}: ${api.name || 'API'}\n`
      prompt += `- 接口地址: ${api.method} ${api.url}\n`
      if (api.description) {
        prompt += `- 用途: ${api.description}\n`
      }
      if (api.requestExample) {
        prompt += `\n**请求参数示例:**\n\`\`\`json\n${api.requestExample}\n\`\`\`\n`
      }
      if (api.responseExample) {
        prompt += `\n**响应示例:**\n\`\`\`json\n${api.responseExample}\n\`\`\`\n`
      }
      prompt += '\n'
    })
  }

  // 添加自定义组件信息
  if (config.customComponents && config.customComponents.length > 0) {
    prompt += `\n## 五.二、自定义组件\n\n`
    prompt += `以下是用户定义的自定义组件，在生成代码时需要使用这些组件：\n\n`

    config.customComponents.forEach((customComp, index) => {
      prompt += `### ${index + 1}. ${customComp.label || customComp.name}\n\n`
      prompt += `- 组件名: ${customComp.name}\n`
      prompt += `- 导入路径: ${customComp.importPath || `@/components/${customComp.name}.vue`}\n`
      if (customComp.description) {
        prompt += `- 描述: ${customComp.description}\n`
      }

      if (customComp.props && customComp.props.length > 0) {
        prompt += `- Props:\n`
        customComp.props.forEach(prop => {
          let propDesc = `  - ${prop.name}`
          if (prop.type) propDesc += ` (${prop.type})`
          if (prop.required) propDesc += ` [必填]`
          if (prop.default !== undefined) propDesc += ` 默认值: ${prop.default}`
          prompt += propDesc + '\n'
        })
      }

      if (customComp.events && customComp.events.length > 0) {
        prompt += `- Events: ${customComp.events.join(', ')}\n`
      }

      if (customComp.code) {
        prompt += `\n**组件源码:**\n\`\`\`vue\n${customComp.code}\n\`\`\`\n`
      }

      prompt += '\n'
    })

    prompt += `**注意事项:**\n`
    prompt += `- 使用自定义组件时，需要在 <script> 中导入并注册\n`
    prompt += `- 导入示例: import CustomComponent from '@/components/CustomComponent.vue'\n`
    prompt += `- 注册示例: components: { CustomComponent }\n\n`
  }

  // 提取提示词中引用的工具函数和校验规则
  const referencedUtils = new Set()
  const referencedValidators = new Set()

  if (config.slotPrompts) {
    Object.values(config.slotPrompts).forEach(prompt => {
      if (prompt && typeof prompt === 'string') {
        // 提取 $xxx 工具函数引用
        const utilMatches = prompt.match(/\$([a-zA-Z_][a-zA-Z0-9_]*)/g)
        if (utilMatches) {
          utilMatches.forEach(match => {
            const utilName = match.substring(1) // 移除 $
            referencedUtils.add(utilName)
          })
        }

        // 提取 !xxx 校验规则引用
        const validatorMatches = prompt.match(/!([a-zA-Z_][a-zA-Z0-9_]*)/g)
        if (validatorMatches) {
          validatorMatches.forEach(match => {
            const validatorName = match.substring(1) // 移除 !
            referencedValidators.add(validatorName)
          })
        }
      }
    })
  }

  // 添加工具函数和校验规则说明
  if (referencedUtils.size > 0 || referencedValidators.size > 0) {
    prompt += `\n## 五.三、工具函数和校验规则\n\n`
    prompt += `在提示词中使用了以下工具函数和校验规则，需要在生成的代码中正确使用：\n\n`

    // 工具函数
    if (referencedUtils.size > 0) {
      prompt += `### 工具函数（Utils）\n\n`
      prompt += `工具函数通过 \`__previewUtils\` 全局对象访问，使用方式：\n`
      prompt += `- 在 methods 中：\`this.__previewUtils.函数名(参数)\`\n`
      prompt += `- 在 template 中：需要先在 computed 或 methods 中封装\n\n`
      prompt += `已引用的工具函数：\n\n`

      referencedUtils.forEach(utilName => {
        const utilInfo = utilsList.find(u => u.name === utilName)
        if (utilInfo) {
          prompt += `**$${utilInfo.name}** - ${utilInfo.label}\n`
          prompt += `- 描述: ${utilInfo.description}\n`
          prompt += `- 用法: ${utilInfo.usage}\n`
          if (utilInfo.params && utilInfo.params.length > 0) {
            prompt += `- 参数: ${utilInfo.params.join(', ')}\n`
          }
          prompt += `- 调用示例: \`this.__previewUtils.${utilInfo.name}(...)\`\n\n`
        } else {
          prompt += `**$${utilName}** - （配置中未找到详细信息）\n\n`
        }
      })
    }

    // 校验规则
    if (referencedValidators.size > 0) {
      prompt += `### 校验规则（Validators）\n\n`
      prompt += `校验规则通过 \`__previewValidators\` 全局对象访问，使用方式：\n`
      prompt += `- 对于规则对象：\`rules: [this.__previewValidators.required()]\`\n`
      prompt += `- 对于验证函数：\`rules: [{ validator: this.__previewValidators.phone }]\`\n\n`
      prompt += `已引用的校验规则：\n\n`

      referencedValidators.forEach(validatorName => {
        const validatorInfo = validatorsList.find(v => v.name === validatorName)
        if (validatorInfo) {
          prompt += `**!${validatorInfo.name}** - ${validatorInfo.label}\n`
          prompt += `- 描述: ${validatorInfo.description}\n`
          prompt += `- 用法: ${validatorInfo.usage}\n`
          prompt += `- 分类: ${validatorInfo.category}\n`

          // 根据校验规则类型提供使用示例
          if (['required', 'minLength', 'maxLength', 'lengthRange'].includes(validatorName)) {
            prompt += `- 使用示例: \`rules: [this.__previewValidators.${validatorName}()]\`\n\n`
          } else {
            prompt += `- 使用示例: \`rules: [{ validator: this.__previewValidators.${validatorName}, trigger: 'blur' }]\`\n\n`
          }
        } else {
          prompt += `**!${validatorName}** - （配置中未找到详细信息）\n\n`
        }
      })

      prompt += `**注意事项:**\n`
      prompt += `- 校验规则必须绑定到 el-form-item 的 :rules 属性\n`
      prompt += `- el-form 需要设置 :model 和 :rules\n`
      prompt += `- 需要给表单项设置 prop 属性\n\n`
    }
  }

  prompt += `\n## 六、生成要求

### 技术规范
- Vue 2 Options API（使用 <script>，不使用 <script setup>）
- 使用 hui2.43.2 基础组件（el-input, el-select, el-button, el-table, etc）
- 使用 hui-pro 页面组件（h-page-container, h-page-search, h-page-table, etc）
- 使用 data() 返回数据
- 使用 methods 定义方法
- 使用 mounted() 生命周期

### 代码生成任务
1. **根据 API JSON 示例推断：**
   - 搜索组件的字段名、标签、占位符、默认值
   - 表格列的字段名、标签、宽度
   - 数据映射路径（data.rows, data.total 等）
   - 分页参数字段名（pageNo, pageSize 等）

2. **生成完整代码：**
   - 完整的 <template> 部分（严格参考 Handlebars 模板结构）
   - 完整的 <script> 部分（包含 data, methods, mounted）
   - 完整的 <style scoped> 部分

3. **功能实现：**
   - 页面加载时自动调用查询接口
   - 搜索按钮触发查询，重置分页到第一页
   - 重置按钮清空搜索条件并查询
   - 分页器变化时自动查询
   - 表格数据为空时显示空状态

### 输出格式
**直接输出完整的 .vue 单文件组件代码，不要有任何额外的解释或说明！**
`

  if (config.customPrompt) {
    prompt += `\n## 七、额外提示
\n${config.customPrompt}\n`
  }

  return prompt
}

/**
 * 统计组件数量
 * @param {Object} slots - Slots 配置
 * @returns {number} 组件总数
 */
function countComponents(slots) {
  if (!slots) return 0
  let count = 0
  for (const components of Object.values(slots)) {
    if (Array.isArray(components)) {
      count += components.length
    }
  }
  return count
}

/**
 * 格式化代码 (可选)
 * @param {string} code - 原始代码
 * @returns {string} 格式化后的代码
 */
export function formatCode(code) {
  // TODO: 集成 Prettier 或其他代码格式化工具
  return code
}

/**
 * 验证生成的代码
 * @param {string} code - 生成的代码
 * @returns {Object} 验证结果
 */
export function validateCode(code) {
  const issues = []

  // 1. 基本验证
  if (!code || code.trim().length === 0) {
    issues.push({ type: 'error', message: '代码为空' })
    return { valid: false, issues }
  }

  // 2. 格式验证
  if (!code.includes('<template>')) {
    issues.push({ type: 'error', message: '缺少 <template> 部分' })
  } else if (!code.includes('</template>')) {
    issues.push({ type: 'error', message: '<template> 标签未闭合' })
  }

  if (!code.includes('<script')) {
    issues.push({ type: 'error', message: '缺少 <script> 部分' })
  } else if (!code.includes('</script>')) {
    issues.push({ type: 'error', message: '<script> 标签未闭合' })
  }

  // 3. Vue2 Options API 验证
  if (code.includes('<script')) {
    if (!code.includes('export default')) {
      issues.push({ type: 'error', message: '缺少 export default' })
    }

    if (!code.includes('data()') && !code.includes('data ()')) {
      issues.push({ type: 'warning', message: '建议使用 data() 定义数据' })
    }

    if (!code.includes('methods:') && !code.includes('methods :')) {
      issues.push({ type: 'warning', message: '建议使用 methods 定义方法' })
    }

    // 检查是否误用了 setup
    if (code.includes('setup(') || code.includes('<script setup')) {
      issues.push({
        type: 'error',
        message: '代码使用了 Vue3 Composition API，应使用 Vue2 Options API',
      })
    }
  }

  // 4. 组件库验证
  if (code.includes('<template>')) {
    const templateContent = code.substring(code.indexOf('<template>'), code.indexOf('</template>'))

    // 检查是否使用了 hui-pro 组件
    const hasHuiPro = templateContent.includes('h-page-') || templateContent.includes('<h-page')
    if (!hasHuiPro) {
      issues.push({ type: 'warning', message: '未使用 hui-pro 页面组件' })
    }

    // 检查是否使用了基础组件
    const hasElComponents =
      templateContent.includes('el-input') ||
      templateContent.includes('el-select') ||
      templateContent.includes('el-button') ||
      templateContent.includes('el-table')
    if (!hasElComponents) {
      issues.push({ type: 'warning', message: '未使用 hui2.43.2 基础组件' })
    }
  }

  // 5. 语法错误检查（简单）
  const openBraces = (code.match(/{/g) || []).length
  const closeBraces = (code.match(/}/g) || []).length
  if (openBraces !== closeBraces) {
    issues.push({ type: 'warning', message: '花括号不匹配，可能存在语法错误' })
  }

  return {
    valid: issues.filter(i => i.type === 'error').length === 0,
    issues,
  }
}
