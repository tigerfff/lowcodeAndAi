/**
 * 代码生成器
 * 负责根据配置生成 Vue2 SFC 代码，包括 AI Prompt 构造
 */

import { getTemplateById } from './templateManager.js'
import { getComponentByName } from './componentLibrary.js'

/**
 * 生成完整的 Vue2 SFC 代码
 * @param {Object} config - 页面配置
 * @param {Object} options - 生成选项
 * @returns {Promise<Object>} 生成结果 { code, prompt, metadata }
 */
export async function generateCode(config, options = {}) {
  try {
    const { template, pageInfo, components, globalAiPrompt } = config
    
    // 1. 生成 AI Prompt
    const prompt = await buildAIPrompt(config)
    
    // 2. 如果启用 AI，则调用 AI 生成
    if (options.useAI) {
      const aiCode = await generateWithAI(prompt, config)
      if (aiCode) {
        return {
          success: true,
          code: aiCode,
          prompt,
          method: 'ai',
          metadata: {
            template: template?.id,
            componentCount: countComponents(components),
            timestamp: new Date().toISOString()
          }
        }
      }
    }
    
    // 3. 降级：使用模板生成
    const templateCode = await generateWithTemplate(config)
    
    return {
      success: true,
      code: templateCode,
      prompt,
      method: 'template',
      metadata: {
        template: template?.id,
        componentCount: countComponents(components),
        timestamp: new Date().toISOString()
      }
    }
  } catch (error) {
    console.error('Code generation failed:', error)
    return {
      success: false,
      error: error.message,
      code: null,
      prompt: null
    }
  }
}

/**
 * 构建 AI Prompt
 * @param {Object} config - 页面配置
 * @returns {Promise<string>} AI Prompt
 */
export async function buildAIPrompt(config) {
  const { template, pageInfo, components, globalAiPrompt } = config
  
  let prompt = `# Vue2 页面代码生成任务

## 基本信息
- 组件名称: ${pageInfo.name || 'GeneratedPage'}
- 页面标题: ${pageInfo.title || '未命名页面'}
- 面包屑: ${pageInfo.breadcrumb.join(' > ') || '无'}
- 模板: ${template?.label || '标准列表页'}

## 全局业务逻辑
${globalAiPrompt || '无特殊业务逻辑'}

## 模板结构
模板使用 hui-pro 组件库的智能容器组件：
- h-page-container: 页面容器
- h-page-header: 页面头部（含面包屑、标题）
- h-page-content: 页面内容区
- h-page-search: 搜索区（自适应布局，支持高低频切换）
- h-page-table: 表格区（固定表头、分页）

`
  
  // 添加搜索区组件配置
  if (components.searchArea && components.searchArea.length > 0) {
    prompt += `\n## 搜索区组件 (${components.searchArea.length}个)\n\n`
    
    for (const comp of components.searchArea) {
      const componentMeta = await getComponentByName(comp.component)
      prompt += `### ${comp.props.label || comp.component}\n`
      prompt += `- 组件类型: ${comp.component}\n`
      prompt += `- 字段名: ${comp.props.prop}\n`
      prompt += `- 包装器: ${comp.wrapper || '无'}\n`
      
      // 属性
      prompt += `- 属性配置:\n`
      for (const [key, value] of Object.entries(comp.props)) {
        if (key !== 'prop' && key !== 'label') {
          prompt += `  - ${key}: ${JSON.stringify(value)}\n`
        }
      }
      
      // 接口绑定
      if (comp.apiBindings && comp.apiBindings.length > 0) {
        prompt += `- 接口绑定 (${comp.apiBindings.length}个):\n`
        for (let i = 0; i < comp.apiBindings.length; i++) {
          const api = comp.apiBindings[i]
          prompt += `  ${i + 1}. ${api.purpose || '未指定用途'}\n`
          prompt += `     - URL: ${api.url}\n`
          prompt += `     - 方法: ${api.method}\n`
          prompt += `     - 触发时机: ${api.trigger}\n`
          if (api.transform) {
            prompt += `     - 数据转换: ${api.transform}\n`
          }
        }
      }
      
      // AI 提示词
      if (comp.aiPrompt) {
        prompt += `- AI 提示: ${comp.aiPrompt}\n`
      }
      
      prompt += '\n'
    }
  }
  
  // 添加操作按钮配置
  if (components.actionArea && components.actionArea.length > 0) {
    prompt += `\n## 操作按钮 (${components.actionArea.length}个)\n\n`
    
    for (const comp of components.actionArea) {
      prompt += `### ${comp.props.text || comp.component}\n`
      prompt += `- 组件类型: ${comp.component}\n`
      prompt += `- 按钮文本: ${comp.props.text}\n`
      prompt += `- 按钮类型: ${comp.props.type}\n`
      
      // 接口绑定
      if (comp.apiBindings && comp.apiBindings.length > 0) {
        prompt += `- 接口绑定:\n`
        for (const api of comp.apiBindings) {
          prompt += `  - ${api.purpose}: ${api.method} ${api.url}\n`
        }
      }
      
      // AI 提示词
      if (comp.aiPrompt) {
        prompt += `- AI 提示: ${comp.aiPrompt}\n`
      }
      
      prompt += '\n'
    }
  }
  
  // 添加表格配置
  if (components.tableArea) {
    prompt += `\n## 表格配置\n\n`
    prompt += `- 使用 h-page-table 组件（自动处理固定表头、滚动条、分页）\n`
    prompt += `- 表格数据通过接口获取\n\n`
  }
  
  // 代码生成要求
  prompt += `\n## 代码生成要求

### Template 部分
1. 使用 hui-pro 组件库的智能容器组件
2. h-page-search 内的搜索项使用 h-page-search-item 包装
3. 搜索区末尾添加"查询"和"重置"按钮
4. 表格使用 el-table，数据绑定到 tableData
5. 分页组件使用 el-pagination

### Script 部分
1. 使用 Vue2 Options API 语法
2. data() 返回：
   - searchForm: 搜索表单数据对象（包含所有搜索字段）
   - tableData: 表格数据数组
   - pagination: 分页信息 { current: 1, pageSize: 10, total: 0 }
   - loading: 加载状态
3. methods 包含：
   - handleSearch(): 处理搜索，重置到第一页
   - handleReset(): 重置搜索表单
   - fetchData(): 获取表格数据（根据接口配置）
   - handleSizeChange(size): 每页条数改变
   - handleCurrentChange(page): 当前页改变
   - 其他根据组件配置生成的方法
4. mounted() 钩子：调用 fetchData() 初始化数据

### 接口调用
1. 根据组件的 apiBindings 配置生成相应的接口调用代码
2. 使用 axios 或 this.$http 发送请求
3. 处理接口返回数据，根据 transform 配置进行数据转换
4. 搜索条件需要根据配置转换为接口参数格式

### 样式部分
1. 使用 scoped 样式
2. 保持简洁，依赖 hui-pro 组件的内置样式

请生成完整的 Vue2 SFC 代码（包含 <template>、<script>、<style> 三部分）。
`
  
  return prompt
}

/**
 * 使用 AI 生成代码
 * @param {string} prompt - AI Prompt
 * @param {Object} config - 页面配置
 * @returns {Promise<string|null>} 生成的代码
 */
async function generateWithAI(prompt, config) {
  try {
    // TODO: 接入 AI 服务
    // 这里应该调用 AI API（如 OpenAI、Claude 等）
    // 目前返回 null，表示 AI 未实现，会降级到模板生成
    
    console.log('AI generation not implemented yet, falling back to template')
    return null
    
    // 示例代码（需要配置 AI API）:
    // const response = await fetch('/api/ai/generate', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ prompt, config })
    // })
    // const result = await response.json()
    // return result.code
  } catch (error) {
    console.error('AI generation error:', error)
    return null
  }
}

/**
 * 使用模板生成代码
 * @param {Object} config - 页面配置
 * @returns {Promise<string>} 生成的代码
 */
async function generateWithTemplate(config) {
  const { template, pageInfo, components } = config
  
  // 生成 template 部分
  const templateHTML = generateTemplateSection(template, pageInfo, components)
  
  // 生成 script 部分
  const scriptContent = generateScriptSection(pageInfo, components)
  
  // 生成 style 部分
  const styleContent = generateStyleSection()
  
  return `<template>
${templateHTML}
</template>

<script>
${scriptContent}
</script>

<style scoped>
${styleContent}
</style>`
}

/**
 * 生成 template 部分
 */
function generateTemplateSection(template, pageInfo, components) {
  let html = `  <h-page-container>
    <h-page-header
      slot="pageHeader"
      :breadcrumb="${JSON.stringify(pageInfo.breadcrumb)}"
      title="${pageInfo.title || '页面标题'}"
    />
    
    <h-page-content>\n`
  
  // 搜索区
  if (components.searchArea && components.searchArea.length > 0) {
    html += `      <h-page-search
        :model="searchForm"
        :column="3"
        show-high-frequency
      >\n`
    
    // 搜索项
    for (const comp of components.searchArea) {
      html += `        <h-page-search-item
          prop="${comp.props.prop}"
          label="${comp.props.label}"
        >
          <${comp.component}
            v-model="searchForm.${comp.props.prop}"
            placeholder="${comp.props.placeholder || '请输入'}"
            ${comp.props.clearable ? 'clearable' : ''}
          ${comp.component === 'el-input' ? '/' : ''}>\n`
      
      // 如果是 el-select，添加选项
      if (comp.component === 'el-select') {
        html += `            <el-option label="选项1" value="1" />
            <el-option label="选项2" value="2" />
          </${comp.component}>\n`
      } else if (comp.component !== 'el-input') {
        html += `          </${comp.component}>\n`
      }
      
      html += `        </h-page-search-item>\n`
    }
    
    // 搜索按钮
    html += `        <template slot="pageSearchAction">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </template>
      </h-page-search>\n\n`
  }
  
  // 操作按钮区
  if (components.actionArea && components.actionArea.length > 0) {
    html += `      <div style="margin-bottom: 16px;">\n`
    for (const comp of components.actionArea) {
      html += `        <el-button
          type="${comp.props.type || 'primary'}"
          size="small"
          @click="handle${capitalize(comp.props.text || 'Action')}"
        >
          ${comp.props.text || '按钮'}
        </el-button>\n`
    }
    html += `      </div>\n\n`
  }
  
  // 表格区
  html += `      <h-page-table>
        <el-table
          :data="tableData"
          border
          v-loading="loading"
        >
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="status" label="状态" width="100" />
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <el-pagination
          slot="pagination"
          :current-page="pagination.current"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          layout="total, prev, pager, next, sizes"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </h-page-table>
    </h-page-content>
  </h-page-container>`
  
  return html
}

/**
 * 生成 script 部分
 */
function generateScriptSection(pageInfo, components) {
  // 生成 searchForm 初始数据
  const searchFormFields = components.searchArea?.map(comp => 
    `    ${comp.props.prop}: ''`
  ).join(',\n') || '    // 无搜索字段'
  
  // 生成方法
  let methods = `    handleSearch() {
      this.pagination.current = 1
      this.fetchData()
    },
    
    handleReset() {
      this.searchForm = {
${components.searchArea?.map(comp => `        ${comp.props.prop}: ''`).join(',\n') || ''}
      }
      this.handleSearch()
    },
    
    async fetchData() {
      this.loading = true
      try {
        // TODO: 调用接口获取数据
        // const { data } = await this.$http.get('/api/list', {
        //   params: {
        //     ...this.searchForm,
        //     page: this.pagination.current,
        //     pageSize: this.pagination.pageSize
        //   }
        // })
        // this.tableData = data.list
        // this.pagination.total = data.total
        
        // 模拟数据
        this.tableData = []
        this.pagination.total = 0
      } catch (error) {
        this.$message.error('获取数据失败')
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.fetchData()
    },
    
    handleCurrentChange(page) {
      this.pagination.current = page
      this.fetchData()
    },
    
    handleEdit(row) {
      this.$message.info('编辑功能待实现')
      console.log('Edit row:', row)
    },
    
    handleDelete(row) {
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
      }).catch(() => {})
    }`
  
  // 添加操作按钮的方法
  if (components.actionArea && components.actionArea.length > 0) {
    for (const comp of components.actionArea) {
      const methodName = `handle${capitalize(comp.props.text || 'Action')}`
      methods += `,\n    \n    ${methodName}() {
      this.$message.info('${comp.props.text || '按钮'}功能待实现')
      // TODO: 实现具体业务逻辑
    }`
    }
  }
  
  return `export default {
  name: '${pageInfo.name || 'GeneratedPage'}',
  
  data() {
    return {
      // 搜索表单
      searchForm: {
${searchFormFields}
      },
      
      // 表格数据
      tableData: [],
      
      // 分页信息
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      
      // 加载状态
      loading: false
    }
  },
  
  mounted() {
    this.fetchData()
  },
  
  methods: {
${methods}
  }
}`
}

/**
 * 生成 style 部分
 */
function generateStyleSection() {
  return `/* 页面样式 */
/* hui-pro 组件已提供完整样式，无需额外添加 */`
}

/**
 * 统计组件数量
 */
function countComponents(components) {
  let count = 0
  if (components.searchArea) count += components.searchArea.length
  if (components.actionArea) count += components.actionArea.length
  if (components.tableArea) count += 1
  return count
}

/**
 * 首字母大写
 */
function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 下载代码文件
 * @param {string} code - 代码内容
 * @param {string} filename - 文件名
 */
export function downloadCode(code, filename) {
  const blob = new Blob([code], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

