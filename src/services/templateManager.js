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
    // 从 templates 目录动态加载所有模板配置
    const templateConfigs = [
      {
        id: 'standard-list',
        path: '/templates/standard-list/template.json',
      },
      // 其他模板可以在这里添加
    ]

    const templates = await Promise.all(
      templateConfigs.map(async ({ id, path }) => {
        try {
          const response = await fetch(path)
          const config = await response.json()
          console.log(`✅ Loaded template ${id}:`, config)
          return config
        } catch (error) {
          console.error(`❌ Failed to load template ${id}:`, error)
          return null
        }
      })
    )

    return templates.filter(t => t !== null)
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
  const requiredFields = ['id', 'label']
  for (const field of requiredFields) {
    if (!template[field]) {
      console.error(`Template missing required field: ${field}`)
      return false
    }
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
  <div>
    <!-- 模板: ${template.label} -->
    <!-- TODO: 根据配置生成具体内容 -->
  </div>
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
    slot: parts[1] || 'default',
  }
}

/**
 * 获取模板中指定组件的所有 slot
 * @param {Object} template - 模板对象
 * @param {string} componentName - 组件名称
 * @returns {Array} slot 列表
 */
export function getSlotsForComponent(template, componentName) {
  if (!template.slots || !Array.isArray(template.slots)) {
    return []
  }
  return template.slots.filter(slot => {
    const { component } = parseSlotPath(slot.name)
    return component === componentName
  })
}
