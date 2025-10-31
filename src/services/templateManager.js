/**
 * 模板管理器
 * 负责加载、解析和管理页面模板
 */

/**
 * 获取所有可用模板
 * @returns {Promise<Array>} 模板列表
 */
export async function getAllTemplates() {
  try {
    // 从 templates 目录加载所有模板配置
    const templates = [
      {
        id: 'standard-list',
        label: '标准列表页',
        description: '搜索区 + 表格 + 分页',
        preview: '/templates/standard-list/preview.png',
        category: 'list',
        slots: [
          {
            name: 'h-page-search.default',
            label: '搜索区',
            description: '放置搜索组件',
            accepts: ['search']
          },
          {
            name: 'h-page-search.pageSearchAction',
            label: '搜索操作区',
            description: '放置搜索按钮',
            accepts: ['action']
          },
          {
            name: 'h-page-content.default',
            label: '主内容区',
            description: '放置表格和其他内容',
            accepts: ['table', 'custom']
          }
        ],
        structure: {
          root: 'h-page-container',
          children: [
            {
              component: 'h-page-header',
              props: { showBreadcrumb: true, showBackButton: false }
            },
            {
              component: 'h-page-content',
              children: [
                {
                  component: 'h-page-search',
                  props: { showHighFrequency: true, column: 3 },
                  slots: ['default', 'pageSearchAction']
                },
                {
                  component: 'h-page-table',
                  props: { fixedHeight: true },
                  children: [
                    { component: 'el-table', slot: 'default' },
                    { component: 'el-pagination', slot: 'pagination' }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        id: 'left-tree-right-table',
        label: '左树右表',
        description: '左侧树形 + 右侧表格',
        preview: '/templates/left-tree-right-table/preview.png',
        category: 'list',
        slots: [
          {
            name: 'left-tree',
            label: '左侧树形',
            description: '放置树形组件',
            accepts: ['tree']
          },
          {
            name: 'h-page-search.default',
            label: '搜索区',
            description: '放置搜索组件',
            accepts: ['search']
          },
          {
            name: 'right-table',
            label: '右侧表格',
            description: '放置表格组件',
            accepts: ['table']
          }
        ],
        structure: {
          root: 'h-page-container',
          children: [
            {
              component: 'h-page-header',
              props: { showBreadcrumb: true }
            },
            {
              component: 'h-page-content',
              props: { layout: 'flex' },
              children: [
                {
                  component: 'div',
                  class: 'left-panel',
                  style: 'width: 300px; margin-right: 16px;',
                  children: [
                    { component: 'el-tree', slot: 'left-tree' }
                  ]
                },
                {
                  component: 'div',
                  class: 'right-panel',
                  style: 'flex: 1;',
                  children: [
                    {
                      component: 'h-page-search',
                      slots: ['default']
                    },
                    {
                      component: 'h-page-table',
                      children: [
                        { component: 'el-table', slot: 'default' },
                        { component: 'el-pagination', slot: 'pagination' }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        id: 'top-tab-bottom-list',
        label: '多Tab列表',
        description: 'Tab切换 + 列表',
        preview: '/templates/top-tab-bottom-list/preview.png',
        category: 'list',
        slots: [
          {
            name: 'tabs',
            label: 'Tab页签',
            description: 'Tab选项配置',
            accepts: ['tab']
          },
          {
            name: 'h-page-search.default',
            label: '搜索区',
            description: '放置搜索组件',
            accepts: ['search']
          },
          {
            name: 'tab-content',
            label: 'Tab内容',
            description: '每个Tab的内容区',
            accepts: ['table', 'custom']
          }
        ],
        structure: {
          root: 'h-page-container',
          children: [
            {
              component: 'h-page-header',
              props: { showBreadcrumb: true }
            },
            {
              component: 'h-page-content',
              children: [
                {
                  component: 'el-tabs',
                  props: { type: 'card' },
                  slot: 'tabs',
                  children: [
                    {
                      component: 'el-tab-pane',
                      props: { label: 'Tab 1', name: 'tab1' },
                      children: [
                        {
                          component: 'h-page-search',
                          slots: ['default']
                        },
                        {
                          component: 'h-page-table',
                          children: [
                            { component: 'el-table', slot: 'default' },
                            { component: 'el-pagination', slot: 'pagination' }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    ]
    
    return templates
  } catch (error) {
    console.error('Failed to load templates:', error)
    return []
  }
}

/**
 * 根据ID获取模板
 * @param {string} templateId - 模板ID
 * @returns {Promise<Object|null>} 模板对象
 */
export async function getTemplateById(templateId) {
  const templates = await getAllTemplates()
  return templates.find(t => t.id === templateId) || null
}

/**
 * 根据分类获取模板
 * @param {string} category - 分类名称
 * @returns {Promise<Array>} 模板列表
 */
export async function getTemplatesByCategory(category) {
  const templates = await getAllTemplates()
  return templates.filter(t => t.category === category)
}

/**
 * 验证模板配置
 * @param {Object} template - 模板对象
 * @returns {boolean} 是否有效
 */
export function validateTemplate(template) {
  if (!template || typeof template !== 'object') {
    return false
  }
  
  // 必需字段
  const requiredFields = ['id', 'label', 'structure', 'slots']
  for (const field of requiredFields) {
    if (!template[field]) {
      console.error(`Template missing required field: ${field}`)
      return false
    }
  }
  
  // 验证 slots
  if (!Array.isArray(template.slots) || template.slots.length === 0) {
    console.error('Template must have at least one slot')
    return false
  }
  
  // 验证 structure
  if (!template.structure.root) {
    console.error('Template structure must have a root component')
    return false
  }
  
  return true
}

/**
 * 生成模板的 Vue 代码框架
 * @param {Object} template - 模板对象
 * @param {Object} config - 页面配置
 * @returns {string} Vue SFC 代码
 */
export function generateTemplateCode(template, config) {
  // 这个函数将在 codeGenerator.js 中实现更完整的版本
  // 这里只提供一个简化版本
  
  const { pageInfo } = config
  
  return `<template>
  <${template.structure.root}>
    <!-- 模板: ${template.label} -->
    <!-- TODO: 根据配置生成具体内容 -->
  </${template.structure.root}>
</template>

<script>
export default {
  name: '${pageInfo.name || 'GeneratedPage'}',
  data() {
    return {
      // TODO: 根据配置生成数据
    }
  },
  methods: {
    // TODO: 根据配置生成方法
  }
}
</script>

<style scoped>
/* TODO: 根据配置生成样式 */
</style>`
}

/**
 * 解析模板 slot 路径
 * @param {string} slotPath - slot路径，如 'h-page-search.default'
 * @returns {Object} 解析结果 { component, slot }
 */
export function parseSlotPath(slotPath) {
  const parts = slotPath.split('.')
  return {
    component: parts[0],
    slot: parts[1] || 'default'
  }
}

/**
 * 获取模板中指定组件的所有 slot
 * @param {Object} template - 模板对象
 * @param {string} componentName - 组件名称
 * @returns {Array} slot 列表
 */
export function getSlotsForComponent(template, componentName) {
  return template.slots.filter(slot => {
    const { component } = parseSlotPath(slot.name)
    return component === componentName
  })
}

