import { defineStore } from 'pinia'

/**
 * 编辑器状态管理
 */
export const useEditorStore = defineStore('editor', {
  state: () => ({
    // 当前选中的模板
    selectedTemplate: null,
    
    // 所有可用模板
    availableTemplates: [],
    
    // 当前选中的组件ID
    selectedComponentId: null,
    
    // 页面配置
    pageConfig: {
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
    },
    
    // 模板静态组件的配置（用户编辑后的状态）
    templateStaticComponents: {},  // { [componentId]: { component, props, ... } }
    
    // 历史记录（用于撤销/重做）
    history: [],
    historyIndex: -1,
    maxHistorySize: 50
  }),
  
  getters: {
    // 是否可以撤销
    canUndo: (state) => state.historyIndex > 0,
    
    // 是否可以重做
    canRedo: (state) => state.historyIndex < state.history.length - 1,
    
    // 当前选中的组件配置
    selectedComponent: (state) => {
      if (!state.selectedComponentId) return null
      
      // 在 searchArea 中查找
      const searchComp = state.pageConfig.components.searchArea.find(
        c => c.id === state.selectedComponentId
      )
      if (searchComp) return searchComp
      
      // 在 tableArea 中查找
      if (state.pageConfig.components.tableArea?.id === state.selectedComponentId) {
        return state.pageConfig.components.tableArea
      }
      
      // 在 actionArea 中查找
      const actionComp = state.pageConfig.components.actionArea.find(
        c => c.id === state.selectedComponentId
      )
      if (actionComp) return actionComp
      
      // 在静态模板组件中查找
      const staticComp = state.templateStaticComponents[state.selectedComponentId]
      if (staticComp) return staticComp
      
      return null
    }
  },
  
  actions: {
    /**
     * 选择模板
     */
    selectTemplate(template) {
      this.selectedTemplate = template
      this.pageConfig.pageInfo.name = template.id
      // 初始化静态组件配置
      this.initStaticComponents(template)
      this.saveHistory()
    },
    
    /**
     * 初始化静态组件配置
     */
    initStaticComponents(template) {
      if (!template || !template.previewLayout) return
      
      // 递归收集所有需要可编辑的静态组件
      const collectStaticComponents = (node, path = '') => {
        const componentId = node.componentId || this.generateComponentId(node, path)
        
        // 判断是否需要可编辑（el-table, el-pagination 等）
        const editableComponents = ['el-table', 'el-pagination', 'el-table-column']
        if (editableComponents.includes(node.component)) {
          // 初始化配置
          if (!this.templateStaticComponents[componentId]) {
            this.templateStaticComponents[componentId] = {
              id: componentId,
              component: node.component,
              props: { ...node.props },
              type: 'static',
              apiBindings: []
            }
          }
        }
        
        // 递归处理子节点
        if (node.children && Array.isArray(node.children)) {
          node.children.forEach((child, index) => {
            const childPath = node.componentId ? `${node.componentId}.${child.component}` : `${path}.${child.component}`
            collectStaticComponents(child, childPath)
          })
        }
      }
      
      collectStaticComponents(template.previewLayout.root)
    },
    
    /**
     * 生成组件 ID
     */
    generateComponentId(node, parentPath = '') {
      if (node.componentId) return node.componentId
      const prefix = parentPath ? `${parentPath}.` : ''
      return `${prefix}${node.component}`
    },
    
    /**
     * 添加组件到指定 slot
     */
    addComponent(slotPath, componentData) {
      const componentId = `comp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      const component = {
        id: componentId,
        slot: slotPath,
        component: componentData.name,
        wrapper: componentData.wrapper,
        order: 0,
        props: { ...componentData.defaultProps },
        apiBindings: [],
        aiPrompt: null
      }
      
      // 根据 slotPath 添加到对应区域
      if (slotPath.includes('search')) {
        component.order = this.pageConfig.components.searchArea.length + 1
        this.pageConfig.components.searchArea.push(component)
      } else if (slotPath.includes('action')) {
        component.order = this.pageConfig.components.actionArea.length + 1
        this.pageConfig.components.actionArea.push(component)
      }
      
      this.selectedComponentId = componentId
      this.saveHistory()
      
      return componentId
    },
    
    /**
     * 更新组件配置
     */
    updateComponent(componentId, updates) {
      const component = this.selectedComponent
      if (component && component.id === componentId) {
        Object.assign(component, updates)
        this.saveHistory()
      }
    },
    
    /**
     * 更新静态组件配置
     */
    updateStaticComponent(componentId, updates) {
      if (this.templateStaticComponents[componentId]) {
        Object.assign(this.templateStaticComponents[componentId], updates)
        this.saveHistory()
      }
    },
    
    /**
     * 删除组件
     */
    removeComponent(componentId) {
      // 从 searchArea 删除
      const searchIndex = this.pageConfig.components.searchArea.findIndex(
        c => c.id === componentId
      )
      if (searchIndex !== -1) {
        this.pageConfig.components.searchArea.splice(searchIndex, 1)
        this.selectedComponentId = null
        this.saveHistory()
        return
      }
      
      // 从 actionArea 删除
      const actionIndex = this.pageConfig.components.actionArea.findIndex(
        c => c.id === componentId
      )
      if (actionIndex !== -1) {
        this.pageConfig.components.actionArea.splice(actionIndex, 1)
        this.selectedComponentId = null
        this.saveHistory()
        return
      }
    },
    
    /**
     * 选中组件
     */
    selectComponent(componentId) {
      this.selectedComponentId = componentId
    },
    
    /**
     * 取消选中
     */
    unselectComponent() {
      this.selectedComponentId = null
    },
    
    /**
     * 保存历史记录
     */
    saveHistory() {
      // 删除当前位置之后的历史
      if (this.historyIndex < this.history.length - 1) {
        this.history.splice(this.historyIndex + 1)
      }
      
      // 添加新的历史记录
      this.history.push(JSON.parse(JSON.stringify(this.pageConfig)))
      
      // 限制历史记录数量
      if (this.history.length > this.maxHistorySize) {
        this.history.shift()
      } else {
        this.historyIndex++
      }
    },
    
    /**
     * 撤销
     */
    undo() {
      if (this.canUndo) {
        this.historyIndex--
        this.pageConfig = JSON.parse(JSON.stringify(this.history[this.historyIndex]))
      }
    },
    
    /**
     * 重做
     */
    redo() {
      if (this.canRedo) {
        this.historyIndex++
        this.pageConfig = JSON.parse(JSON.stringify(this.history[this.historyIndex]))
      }
    },
    
    /**
     * 导出配置
     */
    exportConfig() {
      return {
        version: '1.0',
        template: this.selectedTemplate,
        ...this.pageConfig
      }
    },
    
    /**
     * 导入配置
     */
    importConfig(config) {
      if (config.template) {
        this.selectedTemplate = config.template
      }
      if (config.pageInfo) {
        this.pageConfig.pageInfo = config.pageInfo
      }
      if (config.components) {
        this.pageConfig.components = config.components
      }
      if (config.globalAiPrompt) {
        this.pageConfig.globalAiPrompt = config.globalAiPrompt
      }
      this.saveHistory()
    },
    
    /**
     * 重置编辑器
     */
    reset() {
      this.selectedTemplate = null
      this.selectedComponentId = null
      this.pageConfig = {
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
      this.templateStaticComponents = {}
      this.history = []
      this.historyIndex = -1
    }
  }
})

