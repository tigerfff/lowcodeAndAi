/**
 * 模板管理器
 * 负责加载、解析和管理页面模板
 */

// 使用 Vite 的 import.meta.glob 自动发现所有模板
// 约定：所有模板必须放在 /templates/{templateId}/template.json
const templateModules = import.meta.glob('/templates/*/template.json')

/**
 * 加载所有可用模板（内部方法）
 * @returns {Promise<Array>} 模板列表
 */
async function loadAllTemplates() {
  try {
    console.log('🔍 开始自动扫描模板...')

    const templates = []

    // 遍历所有发现的模板文件
    for (const path in templateModules) {
      try {
        // 从路径中提取模板 ID：/templates/standard-list/template.json -> standard-list
        const match = path.match(/\/templates\/([^/]+)\/template\.json$/)
        const templateId = match ? match[1] : null

        if (!templateId) {
          console.warn(`⚠️ 无法从路径解析模板 ID: ${path}`)
          continue
        }

        // 动态导入模板配置 
        const module = await templateModules[path]()
        const config = module.default || module

        // 验证模板配置
        if (!config || typeof config !== 'object') {
          console.error(`❌ 模板配置无效: ${templateId}`)
          continue
        }

        // 确保模板有 id 字段，如果没有则使用从路径解析的 id
        if (!config.id) {
          config.id = templateId
        }

        // 验证 id 是否与目录名一致
        if (config.id !== templateId) {
          console.warn(`⚠️ 模板 ID 不一致: 配置中为 "${config.id}"，目录为 "${templateId}"`)
        }

        console.log(`✅ 已加载模板: ${config.id} (${config.label || '无标签'})`)
        templates.push(config)
      } catch (error) {
        console.error(`❌ 加载模板失败: ${path}`, error)
      }
    }

    // 按模板 ID 排序
    templates.sort((a, b) => {
      if (a.id < b.id) return -1
      if (a.id > b.id) return 1
      return 0
    })

    console.log(`📦 共发现 ${templates.length} 个模板`)
    return templates
  } catch (error) {
    console.error('❌ 扫描模板失败:', error)
    return []
  }
}

// 模板缓存
let cachedTemplates = null

/**
 * 清除模板缓存，强制重新加载
 */
export function clearTemplateCache() {
  cachedTemplates = null
  console.log('🔄 模板缓存已清除')
}

/**
 * 获取所有可用模板（带缓存）
 * @param {boolean} forceReload - 是否强制重新加载
 * @returns {Promise<Array>} 模板列表
 */
export async function getTemplates(forceReload = false) {
  if (!forceReload && cachedTemplates) {
    return cachedTemplates
  }

  cachedTemplates = await loadAllTemplates()
  return cachedTemplates
}

/**
 * 根据ID获取模板
 * @param {string} templateId - 模板ID
 * @returns {Promise<Object|null>} 模板对象
 */
export async function getTemplateById(templateId) {
  const templates = await getTemplates()
  return templates.find(t => t.id === templateId) || null
}

/**
 * 根据分类获取模板
 * @param {string} category - 分类名称
 * @returns {Promise<Array>} 模板列表
 */
export async function getTemplatesByCategory(category) {
  const templates = await getTemplates()
  return templates.filter(t => t.category === category)
}

/**
 * 获取模板统计信息
 * @returns {Promise<Object>} 统计信息
 */
export async function getTemplateStats() {
  const templates = await getTemplates()

  const stats = {
    total: templates.length,
    byCategory: {},
    ids: templates.map(t => t.id),
  }

  templates.forEach(t => {
    const category = t.category || 'uncategorized'
    stats.byCategory[category] = (stats.byCategory[category] || 0) + 1
  })

  return stats
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
  if (!template.slots) {
    return []
  }
  const slots = Array.isArray(template.slots)
    ? template.slots
    : Object.entries(template.slots).map(([name, meta]) => ({
        name,
        ...meta,
      }))

  return slots.filter(slot => {
    if (!slot.name && typeof slot.label === 'string') {
      return slot.label === componentName
    }
    const { component } = parseSlotPath(slot.name || '')
    return component === componentName
  })
}

/**
 * 获取所有模板（向后兼容的别名）
 * @returns {Promise<Array>} 模板列表
 */
export async function getAllTemplates() {
  return getTemplates()
}
