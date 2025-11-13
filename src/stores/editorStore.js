import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getAllTemplates } from '../services/templateManager'

/**
 * 编辑器状态管理
 * 管理整个代码生成流程的状态
 */
export const useEditorStore = defineStore('editor', () => {
  // ========== 状态 ==========

  // 当前步骤 (1: 选择模板, 2: 选择组件, 3: 配置API, 4: 生成代码)
  const currentStep = ref(1)

  // 选中的模板
  const selectedTemplate = ref(null)
  const selectedTemplateId = ref(null)

  // 页面基本信息
  const pageInfo = ref({
    pageName: '',
    title: '',
    breadcrumb: [],
  })

  // 组件配置 (按 slot 分组)
  const slots = ref({
    searchArea: [], // 搜索区组件
    actionArea: [], // 操作区组件
    tableColumns: [], // 表格列配置
  })

  // API 配置（支持多个 API）
  const apiConfigs = ref([])

  // AI 模型配置
  const aiConfig = ref({
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    apiKey: '',
    model: 'qwen-max',
    temperature: 0.2,
    maxTokens: 4000,
  })

  // 生成的代码
  const generatedCode = ref('')

  // 对话消息
  const chatMessages = ref([])

  // 自定义提示词
  const customPrompt = ref('')

  // 加载状态
  const loading = ref(false)

  // ========== 计算属性 ==========

  // 是否可以进入下一步
  const canProceed = computed(() => {
    switch (currentStep.value) {
      case 1: // 选择模板
        return !!selectedTemplate.value
      case 2: // 选择组件
        return pageInfo.value.pageName.length > 0
      case 3: // 配置 API
        return apiConfigs.value.length > 0 && aiConfig.value.baseUrl && aiConfig.value.apiKey
      case 4: // 生成代码
        return generatedCode.value.length > 0
      default:
        return false
    }
  })

  // 步骤标题
  const stepTitle = computed(() => {
    const titles = {
      1: '选择模板',
      2: '配置组件',
      3: '配置 API',
      4: '生成代码',
    }
    return titles[currentStep.value] || ''
  })

  // 是否有搜索区组件
  const hasSearchComponents = computed(() => {
    return slots.value.searchArea && slots.value.searchArea.length > 0
  })

  // 是否有操作区组件
  const hasActionComponents = computed(() => {
    return slots.value.actionArea && slots.value.actionArea.length > 0
  })

  // 是否有表格列
  const hasTableColumns = computed(() => {
    return slots.value.tableColumns && slots.value.tableColumns.length > 0
  })

  // ========== 方法 ==========

  /**
   * 选择模板
   */
  function selectTemplate(template) {
    selectedTemplate.value = template
    selectedTemplateId.value = template?.id || null
    if (template?.id) {
      try {
        localStorage.setItem('ai-code-gen-selected-template', template.id)
      } catch (error) {
        console.error('Failed to save selected template:', error)
      }
    } else {
      try {
        localStorage.removeItem('ai-code-gen-selected-template')
      } catch (error) {
        console.error('Failed to clear template cache:', error)
      }
    }
    // 初始化 slots 结构
    if (template.slots) {
      Object.keys(template.slots).forEach(key => {
        if (!slots.value[key]) {
          slots.value[key] = []
        }
      })
    }
  }

  /**
   * 更新页面信息
   */
  function updatePageInfo(info) {
    pageInfo.value = { ...pageInfo.value, ...info }
  }

  /**
   * 添加组件到指定 slot
   */
  function addComponent(slotName, component) {
    if (!slots.value[slotName]) {
      slots.value[slotName] = []
    }

    // 生成唯一 ID
    const id = component.id || `${slotName}_${component.component}_${Date.now()}`

    const componentConfig = {
      id,
      component: component.component,
      label: component.label || '',
      model: component.model || '',
      props: component.props || {},
      events: component.events || {},
      wrapperProps: component.wrapperProps || {},
      defaultValue: component.defaultValue || '',
      order: slots.value[slotName].length + 1,
    }

    slots.value[slotName].push(componentConfig)

    // 自动识别需要的 API
    identifyRequiredApis(component)
  }

  /**
   * 移除组件
   */
  function removeComponent(slotName, componentId) {
    if (!slots.value[slotName]) return

    const index = slots.value[slotName].findIndex(c => c.id === componentId)
    if (index > -1) {
      slots.value[slotName].splice(index, 1)
    }
  }

  /**
   * 更新组件配置
   */
  function updateComponent(slotName, componentId, updates) {
    if (!slots.value[slotName]) return

    const index = slots.value[slotName].findIndex(c => c.id === componentId)
    if (index > -1) {
      slots.value[slotName][index] = {
        ...slots.value[slotName][index],
        ...updates,
      }
    }
  }

  /**
   * 调整组件顺序
   */
  function reorderComponents(slotName, newOrder) {
    if (!slots.value[slotName]) return
    slots.value[slotName] = newOrder
  }

  /**
   * 添加 API 配置
   */
  function addApiConfig(api = null) {
    const newApi = api || {
      id: `api_${Date.now()}`,
      name: '',
      url: '',
      method: 'POST',
      requestExample: '',
      responseExample: '',
      description: '',
      order: apiConfigs.value.length + 1,
    }
    apiConfigs.value.push(newApi)
  }

  /**
   * 移除 API 配置
   */
  function removeApiConfig(apiId) {
    const index = apiConfigs.value.findIndex(api => api.id === apiId)
    if (index > -1) {
      apiConfigs.value.splice(index, 1)
    }
  }

  /**
   * 更新 API 配置
   */
  function updateApiConfig(apiId, updates) {
    const index = apiConfigs.value.findIndex(api => api.id === apiId)
    if (index > -1) {
      apiConfigs.value[index] = {
        ...apiConfigs.value[index],
        ...updates,
      }
    }
  }

  /**
   * 更新 AI 配置
   */
  function updateAiConfig(config) {
    aiConfig.value = { ...aiConfig.value, ...config }
    // 保存到 localStorage
    try {
      localStorage.setItem('ai-code-gen-ai-config', JSON.stringify(aiConfig.value))
    } catch (error) {
      console.error('Failed to save AI config:', error)
    }
  }

  /**
   * 从 localStorage 加载 AI 配置
   */
  function loadAiConfig() {
    try {
      const saved = localStorage.getItem('ai-code-gen-ai-config')
      if (saved) {
        const config = JSON.parse(saved)
        aiConfig.value = { ...aiConfig.value, ...config }
      }
    } catch (error) {
      console.error('Failed to load AI config:', error)
    }
  }

function loadTemplatePreference() {
  try {
    const savedTemplateId = localStorage.getItem('ai-code-gen-selected-template')
    if (savedTemplateId) {
      selectedTemplateId.value = savedTemplateId
    }
  } catch (error) {
    console.error('Failed to load saved template id:', error)
  }
}

async function ensureTemplateSelected() {
  if (selectedTemplate.value?.id) return
  try {
    const templateList = await getAllTemplates()
    if (!Array.isArray(templateList) || templateList.length === 0) return
    const savedId = selectedTemplateId.value
    const target =
      (savedId && templateList.find(template => template.id === savedId)) ||
      templateList[0]
    if (target) {
      selectTemplate(target)
    }
  } catch (error) {
    console.error('Failed to ensure template selection:', error)
  }
}

function normalizeComponent(slotName, item, index) {
  if (!item || typeof item !== 'object') return null
  const defaultComponentMap = {
    searchArea: 'el-input',
    actionArea: 'el-button',
    tableColumns: 'el-table-column',
  }
  const componentName = item.component || defaultComponentMap[slotName] || 'el-input'
  const id =
    item.id ||
    `${slotName}_${componentName}_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`
  const normalized = {
    id,
    component: componentName,
    label: item.label || item.text || item.title || '',
    model: item.model || '',
    props: item.props ? { ...item.props } : {},
    events: item.events ? { ...item.events } : {},
    wrapperProps: item.wrapperProps ? { ...item.wrapperProps } : {},
    defaultValue: item.defaultValue ?? '',
    customRender: item.customRender,
    order: index + 1,
  }
  if (item.text) {
    normalized.text = item.text
  }
  return normalized
}

function normalizeSlotComponents(slotName, list) {
  if (!Array.isArray(list)) return []
  return list
    .map((item, index) => normalizeComponent(slotName, item, index))
    .filter(Boolean)
}

function setApiConfigsFromSuggestion(configs) {
  if (!Array.isArray(configs)) return
  apiConfigs.value = configs.map((api, index) => {
    const requestExample =
      typeof api.requestExample === 'string'
        ? api.requestExample
        : api.requestExample
        ? JSON.stringify(api.requestExample, null, 2)
        : ''
    const responseExample =
      typeof api.responseExample === 'string'
        ? api.responseExample
        : api.responseExample
        ? JSON.stringify(api.responseExample, null, 2)
        : ''
    return {
      id: api.id || `api_${Date.now()}_${index}`,
      name: api.name || api.title || `API ${index + 1}`,
      url: api.url || '',
      method: api.method || 'GET',
      requestExample,
      responseExample,
      description: api.description || '',
      order: index + 1,
    }
  })
}

function applyComponentSuggestion(payload) {
  if (!payload || typeof payload !== 'object') return
  const source = payload.slots || payload
  const nextSlots = {
    searchArea: normalizeSlotComponents(
      'searchArea',
      source.searchArea || source.search || []
    ),
    actionArea: normalizeSlotComponents(
      'actionArea',
      source.actionArea || source.actions || []
    ),
    tableColumns: normalizeSlotComponents(
      'tableColumns',
      source.tableColumns || source.columns || []
    ),
  }
  slots.value = nextSlots

  if (payload.pageInfo && typeof payload.pageInfo === 'object') {
    pageInfo.value = { ...pageInfo.value, ...payload.pageInfo }
  }

  if (Array.isArray(payload.apiConfigs)) {
    setApiConfigsFromSuggestion(payload.apiConfigs)
  }
}

  /**
   * 更新生成的代码
   */
  function setGeneratedCode(code) {
    generatedCode.value = code
  }

  /**
   * 追加聊天消息
   */
  function appendChatMessage(message) {
    chatMessages.value.push({
      role: message.role,
      text: message.text || message.content || '',
      attachments: message.attachments ? [...message.attachments] : [],
      createdAt: message.createdAt || Date.now(),
    })
  }

  /**
   * 设置聊天记录
   */
  function setChatMessages(messages) {
    chatMessages.value = messages.map(msg => ({
      role: msg.role,
      text: msg.text || msg.content || '',
      attachments: msg.attachments ? [...msg.attachments] : [],
      createdAt: msg.createdAt || Date.now(),
    }))
  }

  /**
   * 清空聊天记录
   */
  function clearChatMessages() {
    chatMessages.value = []
  }

  /**
   * 更新自定义提示词
   */
  function setCustomPrompt(promptText) {
    customPrompt.value = promptText
  }

  /**
   * 前往下一步
   */
  function nextStep() {
    if (currentStep.value < 4 && canProceed.value) {
      currentStep.value++
    }
  }

  /**
   * 返回上一步
   */
  function prevStep() {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  /**
   * 跳转到指定步骤
   */
  function goToStep(step) {
    if (step >= 1 && step <= 4) {
      currentStep.value = step
    }
  }

  /**
   * 重置所有状态
   */
  function reset() {
    currentStep.value = 1
    selectedTemplate.value = null
    selectedTemplateId.value = null
    pageInfo.value = {
      pageName: '',
      title: '',
      breadcrumb: [],
    }
    slots.value = {
      searchArea: [],
      actionArea: [],
      tableColumns: [],
    }
    apiConfigs.value = []
    generatedCode.value = ''
    loading.value = false
    chatMessages.value = []
    customPrompt.value = ''
    try {
      localStorage.removeItem('ai-code-gen-selected-template')
    } catch (error) {
      console.error('Failed to clear saved template id:', error)
    }
  }

  /**
   * 导出配置 (用于保存和导入)
   */
  function exportConfig() {
    return {
      templateId: selectedTemplate.value?.id,
      pageInfo: pageInfo.value,
      slots: slots.value,
      apiConfigs: apiConfigs.value,
      customPrompt: customPrompt.value,
    }
  }

  /**
   * 导入配置
   */
  async function importConfig(config) {
    // 需要先加载模板
    // 这里假设有一个 templateManager 可以获取模板
    if (config.templateId) {
      selectedTemplateId.value = config.templateId
      // const template = await getTemplateById(config.templateId)
      // if (template) {
      //   selectTemplate(template)
      // }
      try {
        localStorage.setItem('ai-code-gen-selected-template', config.templateId)
      } catch (error) {
        console.error('Failed to persist template id from config:', error)
      }
    }

    if (config.pageInfo) {
      pageInfo.value = config.pageInfo
    }

    if (config.slots) {
      slots.value = config.slots
    }

    if (config.apiConfigs) {
      apiConfigs.value = config.apiConfigs
    }

    if (typeof config.customPrompt === 'string') {
      customPrompt.value = config.customPrompt
    }
  }

  // 初始化时加载配置
  loadAiConfig()
  loadTemplatePreference()
  ensureTemplateSelected()

  return {
    // 状态
    currentStep,
    selectedTemplate,
    selectedTemplateId,
    pageInfo,
    slots,
    apiConfigs,
    aiConfig,
    generatedCode,
    loading,
    chatMessages,
    customPrompt,

    // 计算属性
    canProceed,
    stepTitle,
    hasSearchComponents,
    hasActionComponents,
    hasTableColumns,

    // 方法
    selectTemplate,
    updatePageInfo,
    addComponent,
    removeComponent,
    updateComponent,
    reorderComponents,
    addApiConfig,
    removeApiConfig,
    updateApiConfig,
    updateAiConfig,
    loadAiConfig,
    ensureTemplateSelected,
    setGeneratedCode,
    appendChatMessage,
    setChatMessages,
    clearChatMessages,
    setCustomPrompt,
    nextStep,
    prevStep,
    goToStep,
    reset,
    exportConfig,
    importConfig,
    applyComponentSuggestion,
    setApiConfigsFromSuggestion,
  }
})
