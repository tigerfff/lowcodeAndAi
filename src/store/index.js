import Vue from 'vue'
import Vuex from 'vuex'
import { getAllTemplates } from '../services/templateManager'

Vue.use(Vuex)

const defaultState = () => ({
  currentStep: 1,
  selectedTemplate: null,
  selectedTemplateId: null,
  pageInfo: {
    pageName: '',
    title: '',
    breadcrumb: [],
  },
  slots: {
    searchArea: [],
    actionArea: [],
    tableColumns: [],
  },
  apiConfigs: [],
  aiConfig: {
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    apiKey: '',
    model: 'qwen-max',
    temperature: 0.2,
    maxTokens: 4000,
  },
  generatedCode: '',
  chatMessages: [],
  customPrompt: '',
  loading: false,
})

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

const editorModule = {
  namespaced: true,
  state: defaultState(),
  getters: {
    canProceed(state) {
      switch (state.currentStep) {
        case 1:
          return !!state.selectedTemplate
        case 2:
          return state.pageInfo.pageName.length > 0
        case 3:
          return (
            state.apiConfigs.length > 0 &&
            state.aiConfig.baseUrl &&
            state.aiConfig.apiKey
          )
        case 4:
          return state.generatedCode.length > 0
        default:
          return false
      }
    },
    stepTitle(state) {
      const titles = {
        1: '选择模板',
        2: '配置组件',
        3: '配置 API',
        4: '生成代码',
      }
      return titles[state.currentStep] || ''
    },
    hasSearchComponents(state) {
      return state.slots.searchArea && state.slots.searchArea.length > 0
    },
    hasActionComponents(state) {
      return state.slots.actionArea && state.slots.actionArea.length > 0
    },
    hasTableColumns(state) {
      return state.slots.tableColumns && state.slots.tableColumns.length > 0
    },
  },
  mutations: {
    SET_CURRENT_STEP(state, value) {
      state.currentStep = value
    },
    SET_SELECTED_TEMPLATE(state, template) {
      state.selectedTemplate = template
    },
    SET_SELECTED_TEMPLATE_ID(state, id) {
      state.selectedTemplateId = id
    },
    SET_PAGE_INFO(state, info) {
      state.pageInfo = { ...state.pageInfo, ...info }
    },
    SET_SLOTS(state, slots) {
      state.slots = slots
    },
    ADD_SLOT_COMPONENT(state, { slotName, component }) {
      if (!state.slots[slotName]) {
        Vue.set(state.slots, slotName, [])
      }
      state.slots[slotName].push(component)
    },
    UPDATE_SLOT_COMPONENT(state, { slotName, componentId, updates }) {
      const list = state.slots[slotName]
      if (!Array.isArray(list)) return
      const index = list.findIndex(item => item.id === componentId)
      if (index === -1) return
      const updated = { ...list[index], ...updates }
      Vue.set(list, index, updated)
    },
    REMOVE_SLOT_COMPONENT(state, { slotName, componentId }) {
      const list = state.slots[slotName]
      if (!Array.isArray(list)) return
      const index = list.findIndex(item => item.id === componentId)
      if (index === -1) return
      list.splice(index, 1)
    },
    REORDER_SLOT_COMPONENTS(state, { slotName, newOrder }) {
      Vue.set(state.slots, slotName, newOrder)
    },
    SET_API_CONFIGS(state, configs) {
      state.apiConfigs = configs
    },
    ADD_API_CONFIG(state, config) {
      state.apiConfigs.push(config)
    },
    UPDATE_API_CONFIG(state, { apiId, updates }) {
      const index = state.apiConfigs.findIndex(api => api.id === apiId)
      if (index === -1) return
      const updated = { ...state.apiConfigs[index], ...updates }
      Vue.set(state.apiConfigs, index, updated)
    },
    REMOVE_API_CONFIG(state, apiId) {
      const index = state.apiConfigs.findIndex(api => api.id === apiId)
      if (index === -1) return
      state.apiConfigs.splice(index, 1)
    },
    SET_AI_CONFIG(state, config) {
      state.aiConfig = { ...state.aiConfig, ...config }
    },
    SET_GENERATED_CODE(state, code) {
      state.generatedCode = code
    },
    PUSH_CHAT_MESSAGE(state, message) {
      state.chatMessages.push(message)
    },
    SET_CHAT_MESSAGES(state, messages) {
      state.chatMessages = messages
    },
    CLEAR_CHAT_MESSAGES(state) {
      state.chatMessages = []
    },
    SET_CUSTOM_PROMPT(state, prompt) {
      state.customPrompt = prompt
    },
    SET_LOADING(state, value) {
      state.loading = value
    },
    RESET_STATE(state) {
      Object.assign(state, defaultState())
    },
  },
  actions: {
    selectTemplate({ commit }, template) {
      commit('SET_SELECTED_TEMPLATE', template)
      const templateId = template?.id || null
      commit('SET_SELECTED_TEMPLATE_ID', templateId)
      if (templateId) {
        try {
          localStorage.setItem('ai-code-gen-selected-template', templateId)
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
      if (template && template.slots) {
        const slots = { ...defaultState().slots }
        Object.keys(template.slots).forEach(key => {
          slots[key] = []
        })
        commit('SET_SLOTS', {
          searchArea: slots.searchArea,
          actionArea: slots.actionArea,
          tableColumns: slots.tableColumns,
        })
      }
    },
    updatePageInfo({ commit }, info) {
      commit('SET_PAGE_INFO', info)
    },
    addComponent({ state, commit }, { slotName, component }) {
      if (!state.slots[slotName]) {
        commit('SET_SLOTS', {
          ...state.slots,
          [slotName]: [],
        })
      }
      const normalized =
        component && component.id
          ? component
          : normalizeComponent(slotName, component, state.slots[slotName].length)
      if (normalized) {
        commit('ADD_SLOT_COMPONENT', { slotName, component: normalized })
      }
    },
    removeComponent({ commit }, payload) {
      commit('REMOVE_SLOT_COMPONENT', payload)
    },
    updateComponent({ commit }, payload) {
      commit('UPDATE_SLOT_COMPONENT', payload)
    },
    reorderComponents({ commit }, payload) {
      commit('REORDER_SLOT_COMPONENTS', payload)
    },
    addApiConfig({ state, commit }, api) {
      const newApi =
        api || {
          id: `api_${Date.now()}`,
          name: '',
          url: '',
          method: 'POST',
          requestExample: '',
          responseExample: '',
          description: '',
          order: state.apiConfigs.length + 1,
        }
      commit('ADD_API_CONFIG', newApi)
    },
    removeApiConfig({ commit }, apiId) {
      commit('REMOVE_API_CONFIG', apiId)
    },
    updateApiConfig({ commit }, payload) {
      commit('UPDATE_API_CONFIG', payload)
    },
    updateAiConfig({ commit, state }, config) {
      commit('SET_AI_CONFIG', config)
      try {
        localStorage.setItem('ai-code-gen-ai-config', JSON.stringify(state.aiConfig))
      } catch (error) {
        console.error('Failed to save AI config:', error)
      }
    },
    loadAiConfig({ commit }) {
      try {
        const saved = localStorage.getItem('ai-code-gen-ai-config')
        if (saved) {
          const config = JSON.parse(saved)
          commit('SET_AI_CONFIG', config)
        }
      } catch (error) {
        console.error('Failed to load AI config:', error)
      }
    },
    loadTemplatePreference({ commit }) {
      try {
        const savedTemplateId = localStorage.getItem('ai-code-gen-selected-template')
        if (savedTemplateId) {
          commit('SET_SELECTED_TEMPLATE_ID', savedTemplateId)
        }
      } catch (error) {
        console.error('Failed to load saved template id:', error)
      }
    },
    async ensureTemplateSelected({ state, dispatch }) {
      if (state.selectedTemplate?.id) return
      try {
        const templateList = await getAllTemplates()
        if (!Array.isArray(templateList) || templateList.length === 0) return
        const savedId = state.selectedTemplateId
        const target =
          (savedId && templateList.find(template => template.id === savedId)) ||
          templateList[0]
        if (target) {
          dispatch('selectTemplate', target)
        }
      } catch (error) {
        console.error('Failed to ensure template selection:', error)
      }
    },
    setGeneratedCode({ commit }, code) {
      commit('SET_GENERATED_CODE', code)
    },
    appendChatMessage({ commit }, message) {
      commit('PUSH_CHAT_MESSAGE', {
        role: message.role,
        text: message.text || message.content || '',
        attachments: message.attachments ? [...message.attachments] : [],
        createdAt: message.createdAt || Date.now(),
      })
    },
    setChatMessages({ commit }, messages) {
      commit(
        'SET_CHAT_MESSAGES',
        messages.map(msg => ({
          role: msg.role,
          text: msg.text || msg.content || '',
          attachments: msg.attachments ? [...msg.attachments] : [],
          createdAt: msg.createdAt || Date.now(),
        }))
      )
    },
    clearChatMessages({ commit }) {
      commit('CLEAR_CHAT_MESSAGES')
    },
    setCustomPrompt({ commit }, prompt) {
      commit('SET_CUSTOM_PROMPT', prompt)
    },
    nextStep({ state, commit, getters }) {
      if (state.currentStep < 4 && getters.canProceed) {
        commit('SET_CURRENT_STEP', state.currentStep + 1)
      }
    },
    prevStep({ state, commit }) {
      if (state.currentStep > 1) {
        commit('SET_CURRENT_STEP', state.currentStep - 1)
      }
    },
    goToStep({ commit }, step) {
      if (step >= 1 && step <= 4) {
        commit('SET_CURRENT_STEP', step)
      }
    },
    reset({ commit }) {
      commit('RESET_STATE')
      try {
        localStorage.removeItem('ai-code-gen-selected-template')
      } catch (error) {
        console.error('Failed to clear saved template id:', error)
      }
    },
    exportConfig({ state }) {
      return {
        templateId: state.selectedTemplate?.id,
        pageInfo: state.pageInfo,
        slots: state.slots,
        apiConfigs: state.apiConfigs,
        customPrompt: state.customPrompt,
      }
    },
    importConfig({ commit, dispatch }, config) {
      if (config.templateId) {
        commit('SET_SELECTED_TEMPLATE_ID', config.templateId)
        try {
          localStorage.setItem('ai-code-gen-selected-template', config.templateId)
        } catch (error) {
          console.error('Failed to persist template id from config:', error)
        }
      }
      if (config.pageInfo) {
        commit('SET_PAGE_INFO', config.pageInfo)
      }
      if (config.slots) {
        commit('SET_SLOTS', config.slots)
      }
      if (config.apiConfigs) {
        commit('SET_API_CONFIGS', config.apiConfigs)
      }
      if (typeof config.customPrompt === 'string') {
        commit('SET_CUSTOM_PROMPT', config.customPrompt)
      }
      dispatch('ensureTemplateSelected')
    },
    setApiConfigsFromSuggestion({ commit }, configs) {
      const mapped = Array.isArray(configs)
        ? configs.map((api, index) => {
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
        : []
      commit('SET_API_CONFIGS', mapped)
    },
    applyComponentSuggestion({ commit, dispatch }, payload) {
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
      commit('SET_SLOTS', nextSlots)

      if (payload.pageInfo && typeof payload.pageInfo === 'object') {
        commit('SET_PAGE_INFO', payload.pageInfo)
      }

      if (Array.isArray(payload.apiConfigs)) {
        dispatch('setApiConfigsFromSuggestion', payload.apiConfigs)
      }
    },
  },
}

const store = new Vuex.Store({
  modules: {
    editor: editorModule,
  },
})

store.dispatch('editor/loadAiConfig')
store.dispatch('editor/loadTemplatePreference')
store.dispatch('editor/ensureTemplateSelected')

export default store

