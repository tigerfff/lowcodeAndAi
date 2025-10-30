import { defineStore } from 'pinia'

/**
 * 代码生成器全局状态管理
 */
export const useGeneratorStore = defineStore('generator', {
  state: () => ({
    // 当前步骤
    currentStep: 0,
    steps: ['选择模板', '配置API', '解析数据', 'AI推断', '确认配置', '预览生成'],
    
    // 模板选择
    selectedTemplate: null,
    availableTemplates: [],
    
    // API 配置
    apiInput: {
      responseJson: '',
      requestJson: ''
    },
    apiParseResult: null,
    
    // AI 推断结果
    inferredConfig: null,
    confidence: null,
    
    // 确认后的配置
    confirmedConfig: null,
    
    // 生成的代码
    generatedCode: '',
    previewStatus: null,
    
    // 错误信息
    errors: [],
    warnings: []
  }),

  getters: {
    // 当前步骤描述
    currentStepLabel: (state) => state.steps[state.currentStep] || '',
    
    // 是否可以进入下一步
    canGoNext: (state) => {
      switch (state.currentStep) {
        case 0: // 选择模板
          return state.selectedTemplate !== null
        case 1: // 配置 API
          return state.apiInput.responseJson.trim() !== ''
        case 2: // 解析数据
          return state.apiParseResult !== null
        case 3: // AI 推断
          return state.inferredConfig !== null
        case 4: // 确认配置
          return state.confirmedConfig !== null
        default:
          return true
      }
    },
    
    // 是否可以预览
    canPreview: (state) => state.generatedCode !== '',
    
    // 是否有错误
    hasErrors: (state) => state.errors.length > 0,
    
    // 是否有警告
    hasWarnings: (state) => state.warnings.length > 0
  },

  actions: {
    // 设置当前步骤
    setCurrentStep(step) {
      if (step >= 0 && step < this.steps.length) {
        this.currentStep = step
      }
    },

    // 下一步
    nextStep() {
      if (this.canGoNext && this.currentStep < this.steps.length - 1) {
        this.currentStep++
      }
    },

    // 上一步
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--
      }
    },

    // 跳转到指定步骤
    goToStep(step) {
      if (step >= 0 && step < this.steps.length) {
        this.currentStep = step
      }
    },

    // 选择模板
    selectTemplate(template) {
      this.selectedTemplate = template
      // 重置后续步骤
      this.resetAfterStep(0)
    },

    // 设置 API 输入
    setApiInput(responseJson, requestJson = '') {
      this.apiInput = {
        responseJson,
        requestJson
      }
      // 重置后续步骤
      this.resetAfterStep(1)
    },

    // 设置解析结果
    setApiParseResult(parseResult) {
      this.apiParseResult = parseResult
      // 重置后续步骤
      this.resetAfterStep(2)
    },

    // 设置 AI 推断结果
    setInferredConfig(config, confidence) {
      this.inferredConfig = config
      this.confidence = confidence
      // 重置后续步骤
      this.resetAfterStep(3)
    },

    // 确认配置
    confirmConfig(config) {
      this.confirmedConfig = config
      // 重置后续步骤
      this.resetAfterStep(4)
    },

    // 设置生成的代码
    setGeneratedCode(code) {
      this.generatedCode = code
    },

    // 设置预览状态
    setPreviewStatus(status) {
      this.previewStatus = status
    },

    // 添加错误
    addError(error) {
      this.errors.push(error)
    },

    // 清除错误
    clearErrors() {
      this.errors = []
    },

    // 添加警告
    addWarning(warning) {
      this.warnings.push(warning)
    },

    // 清除警告
    clearWarnings() {
      this.warnings = []
    },

    // 从指定步骤开始重置后续所有步骤
    resetAfterStep(step) {
      if (step < 2) {
        this.apiParseResult = null
      }
      if (step < 3) {
        this.inferredConfig = null
        this.confidence = null
      }
      if (step < 4) {
        this.confirmedConfig = null
      }
      if (step < 5) {
        this.generatedCode = ''
        this.previewStatus = null
      }
    },

    // 重置所有状态
    reset() {
      this.currentStep = 0
      this.selectedTemplate = null
      this.apiInput = {
        responseJson: '',
        requestJson: ''
      }
      this.apiParseResult = null
      this.inferredConfig = null
      this.confidence = null
      this.confirmedConfig = null
      this.generatedCode = ''
      this.previewStatus = null
      this.errors = []
      this.warnings = []
    },

    // 加载可用模板列表
    async loadTemplates() {
      // MVP 版本：直接使用默认模板
      this.availableTemplates = [
        {
          id: 'standard-list',
          name: '标准列表页',
          description: '包含搜索、表格、分页的典型列表页面',
          category: 'list',
          icon: '📊'
        }
      ]
      
      // 未来可以改为从 API 加载
      // try {
      //   const response = await fetch('/api/templates')
      //   this.availableTemplates = await response.json()
      // } catch (error) {
      //   console.error('Failed to load templates:', error)
      // }
    }
  }
})

