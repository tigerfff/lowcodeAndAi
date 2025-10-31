/**
 * 配置管理器
 * 负责页面配置的导入、导出、验证和版本管理
 */

/**
 * 配置版本
 */
export const CONFIG_VERSION = '1.0.0'

/**
 * 验证配置格式
 * @param {Object} config - 配置对象
 * @returns {Object} 验证结果 { valid: boolean, errors: Array }
 */
export function validateConfig(config) {
  const errors = []

  // 检查版本
  if (!config.version) {
    errors.push('配置缺少版本号')
  }

  // 检查模板
  if (!config.template) {
    errors.push('配置缺少模板信息')
  } else {
    if (!config.template.id) {
      errors.push('模板缺少 ID')
    }
  }

  // 检查页面信息
  if (!config.pageInfo) {
    errors.push('配置缺少页面信息')
  } else {
    if (!config.pageInfo.name) {
      errors.push('页面信息缺少组件名称')
    }
    if (!Array.isArray(config.pageInfo.breadcrumb)) {
      errors.push('面包屑必须是数组')
    }
  }

  // 检查组件配置
  if (!config.components) {
    errors.push('配置缺少组件信息')
  } else {
    // 检查搜索区组件
    if (!Array.isArray(config.components.searchArea)) {
      errors.push('搜索区组件必须是数组')
    } else {
      config.components.searchArea.forEach((comp, index) => {
        const compErrors = validateComponent(comp)
        if (!compErrors.valid) {
          errors.push(`搜索区组件 ${index + 1}: ${compErrors.errors.join(', ')}`)
        }
      })
    }

    // 检查操作区组件
    if (!Array.isArray(config.components.actionArea)) {
      errors.push('操作区组件必须是数组')
    } else {
      config.components.actionArea.forEach((comp, index) => {
        const compErrors = validateComponent(comp)
        if (!compErrors.valid) {
          errors.push(`操作区组件 ${index + 1}: ${compErrors.errors.join(', ')}`)
        }
      })
    }
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * 验证组件配置
 * @param {Object} component - 组件配置
 * @returns {Object} 验证结果 { valid: boolean, errors: Array }
 */
export function validateComponent(component) {
  const errors = []

  if (!component.id) {
    errors.push('组件缺少 ID')
  }

  if (!component.component) {
    errors.push('组件缺少类型')
  }

  if (!component.props || typeof component.props !== 'object') {
    errors.push('组件缺少 props 配置')
  }

  if (component.apiBindings && !Array.isArray(component.apiBindings)) {
    errors.push('接口绑定必须是数组')
  }

  // 验证接口绑定
  if (component.apiBindings) {
    component.apiBindings.forEach((api, index) => {
      if (!api.url) {
        errors.push(`接口 ${index + 1} 缺少 URL`)
      }
      if (!api.method) {
        errors.push(`接口 ${index + 1} 缺少请求方法`)
      }
    })
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * 导出配置
 * @param {Object} config - 配置对象
 * @param {string} format - 导出格式 ('json' | 'file')
 * @returns {string|Blob} 配置字符串或文件 Blob
 */
export function exportConfig(config, format = 'json') {
  const configWithVersion = {
    version: CONFIG_VERSION,
    exportTime: new Date().toISOString(),
    ...config
  }

  const configString = JSON.stringify(configWithVersion, null, 2)

  if (format === 'file') {
    return new Blob([configString], { type: 'application/json' })
  }

  return configString
}

/**
 * 导入配置
 * @param {string|Object} data - 配置数据（JSON 字符串或对象）
 * @returns {Promise<Object>} 解析后的配置对象
 */
export async function importConfig(data) {
  try {
    let config

    // 处理字符串
    if (typeof data === 'string') {
      config = JSON.parse(data)
    } else {
      config = data
    }

    // 验证配置
    const validation = validateConfig(config)
    if (!validation.valid) {
      throw new Error(`配置验证失败: ${validation.errors.join(', ')}`)
    }

    // 版本迁移（如果需要）
    const migratedConfig = await migrateConfig(config)

    return migratedConfig
  } catch (error) {
    console.error('Import config failed:', error)
    throw new Error(`导入配置失败: ${error.message}`)
  }
}

/**
 * 从文件导入配置
 * @param {File} file - 配置文件
 * @returns {Promise<Object>} 解析后的配置对象
 */
export async function importConfigFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = async (e) => {
      try {
        const config = await importConfig(e.target.result)
        resolve(config)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error('文件读取失败'))
    }

    reader.readAsText(file)
  })
}

/**
 * 配置版本迁移
 * @param {Object} config - 配置对象
 * @returns {Promise<Object>} 迁移后的配置
 */
async function migrateConfig(config) {
  const currentVersion = config.version || '0.0.0'

  // 版本比较和迁移逻辑
  if (compareVersions(currentVersion, '1.0.0') < 0) {
    // 从旧版本迁移到 1.0.0
    config = migrate_0_to_1(config)
  }

  // 更新版本号
  config.version = CONFIG_VERSION

  return config
}

/**
 * 从 0.x 迁移到 1.0
 * @param {Object} config - 旧配置
 * @returns {Object} 新配置
 */
function migrate_0_to_1(config) {
  // 添加默认字段
  if (!config.pageInfo) {
    config.pageInfo = {
      name: 'GeneratedPage',
      title: '页面标题',
      breadcrumb: []
    }
  }

  if (!config.components) {
    config.components = {
      searchArea: [],
      tableArea: null,
      actionArea: []
    }
  }

  if (!config.globalAiPrompt) {
    config.globalAiPrompt = ''
  }

  return config
}

/**
 * 比较版本号
 * @param {string} v1 - 版本1
 * @param {string} v2 - 版本2
 * @returns {number} -1: v1 < v2, 0: v1 === v2, 1: v1 > v2
 */
function compareVersions(v1, v2) {
  const parts1 = v1.split('.').map(Number)
  const parts2 = v2.split('.').map(Number)

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const p1 = parts1[i] || 0
    const p2 = parts2[i] || 0

    if (p1 < p2) return -1
    if (p1 > p2) return 1
  }

  return 0
}

/**
 * 创建默认配置
 * @param {Object} template - 模板对象
 * @returns {Object} 默认配置
 */
export function createDefaultConfig(template) {
  return {
    version: CONFIG_VERSION,
    template: template ? {
      id: template.id,
      label: template.label
    } : null,
    pageInfo: {
      name: '',
      title: '',
      breadcrumb: []
    },
    components: {
      searchArea: [],
      tableArea: null,
      actionArea: []
    },
    globalAiPrompt: ''
  }
}

/**
 * 深度克隆配置
 * @param {Object} config - 配置对象
 * @returns {Object} 克隆后的配置
 */
export function cloneConfig(config) {
  return JSON.parse(JSON.stringify(config))
}

/**
 * 合并配置
 * @param {Object} target - 目标配置
 * @param {Object} source - 源配置
 * @returns {Object} 合并后的配置
 */
export function mergeConfig(target, source) {
  return {
    ...target,
    ...source,
    pageInfo: {
      ...target.pageInfo,
      ...source.pageInfo
    },
    components: {
      ...target.components,
      ...source.components
    }
  }
}

/**
 * 比较两个配置是否相同
 * @param {Object} config1 - 配置1
 * @param {Object} config2 - 配置2
 * @returns {boolean} 是否相同
 */
export function isConfigEqual(config1, config2) {
  return JSON.stringify(config1) === JSON.stringify(config2)
}

/**
 * 获取配置摘要
 * @param {Object} config - 配置对象
 * @returns {Object} 配置摘要
 */
export function getConfigSummary(config) {
  const searchCount = config.components?.searchArea?.length || 0
  const actionCount = config.components?.actionArea?.length || 0
  const hasTable = !!config.components?.tableArea

  return {
    name: config.pageInfo?.name || '未命名',
    title: config.pageInfo?.title || '未命名页面',
    template: config.template?.label || '未知模板',
    componentCount: searchCount + actionCount + (hasTable ? 1 : 0),
    searchCount,
    actionCount,
    hasTable,
    hasGlobalPrompt: !!config.globalAiPrompt
  }
}

