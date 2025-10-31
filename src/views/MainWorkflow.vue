<template>
  <div class="main-workflow">
    <!-- 顶部步骤导航 -->
    <div class="workflow-header">
      <el-steps :active="currentStep" finish-status="success" align-center>
        <el-step
          v-for="(step, index) in steps"
          :key="index"
          :title="step"
          :status="getStepStatus(index)"
        />
      </el-steps>
    </div>

    <!-- 主要内容区域 -->
    <div class="workflow-content">
      <!-- 步骤 0: 选择模板 -->
      <template-step
        v-if="currentStep === 0"
        @select="handleTemplateSelect"
      />

      <!-- 步骤 1: 配置 API -->
      <api-input-step
        v-if="currentStep === 1"
        @next="handleApiInputNext"
      />

      <!-- 步骤 2: 解析数据 -->
      <api-parse-step
        v-if="currentStep === 2"
        @next="handleApiParseNext"
        @previous="handlePrevious"
      />

      <!-- 步骤 3: AI 推断 -->
      <ai-inference-step
        v-if="currentStep === 3"
        @next="handleInferenceNext"
        @previous="handlePrevious"
      />

      <!-- 步骤 4: 确认配置 -->
      <config-confirm-step
        v-if="currentStep === 4"
        @generate="handleGenerate"
        @previous="handlePrevious"
      />

      <!-- 步骤 5: 预览生成 -->
      <preview-generate-step
        v-if="currentStep === 5"
        @previous="handlePrevious"
        @reset="handleReset"
      />
    </div>

    <!-- 底部操作栏 -->
    <div class="workflow-footer">
      <div class="footer-left">
        <el-button v-if="currentStep > 0" @click="handlePrevious">
          <span>⬅️</span>
          上一步
        </el-button>
      </div>

      <div class="footer-right">
        <el-button @click="handleReset">
          <span>🔄</span>
          重新开始
        </el-button>
        <el-button
          type="primary"
          :disabled="!canGoNext"
          @click="handleNext"
        >
          下一步
          <span>➡️</span>
        </el-button>
      </div>
    </div>

    <!-- 错误提示 -->
    <el-dialog
      v-model="errorDialogVisible"
      title="错误"
      width="500px"
    >
      <div class="error-dialog">
        <ul>
          <li v-for="(error, index) in errors" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
      <template #footer>
        <el-button @click="errorDialogVisible = false">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { computed, ref, watch, onMounted } from 'vue'
import { useGeneratorStore } from '@/stores/useGeneratorStore'
import TemplateStep from '@/components/steps/TemplateStep.vue'
import ApiInputStep from '@/components/steps/ApiInputStep.vue'
import ApiParseStep from '@/components/steps/ApiParseStep.vue'
import AiInferenceStep from '@/components/steps/AiInferenceStep.vue'
import ConfigConfirmStep from '@/components/steps/ConfigConfirmStep.vue'
import PreviewGenerateStep from '@/components/steps/PreviewGenerateStep.vue'

export default {
  name: 'MainWorkflow',
  
  components: {
    TemplateStep,
    ApiInputStep,
    ApiParseStep,
    AiInferenceStep,
    ConfigConfirmStep,
    PreviewGenerateStep
  },

  setup() {
    const store = useGeneratorStore()
    const errorDialogVisible = ref(false)

    const currentStep = computed(() => store.currentStep)
    const steps = computed(() => store.steps)
    const canGoNext = computed(() => store.canGoNext)
    const errors = computed(() => store.errors)

    // 监听错误
    watch(() => store.errors, (newErrors) => {
      if (newErrors.length > 0) {
        errorDialogVisible.value = true
      }
    })

    const getStepStatus = (index) => {
      if (index < currentStep.value) {
        return 'success'
      } else if (index === currentStep.value) {
        return 'process'
      } else {
        return 'wait'
      }
    }

    const handleTemplateSelect = (template) => {
      store.selectTemplate(template)
      store.nextStep()
    }

    const handleApiInputNext = (data) => {
      store.setApiInput(data.responseJson, data.requestJson)
      store.nextStep()
    }

    const handleApiParseNext = (parseResult) => {
      store.setApiParseResult(parseResult)
      store.nextStep()
    }

    const handleInferenceNext = (config, confidence) => {
      store.setInferredConfig(config, confidence)
      store.nextStep()
    }

    const handleConfirmNext = (config) => {
      store.confirmConfig(config)
      store.nextStep()
    }
    
    const handleGenerate = async (data) => {
      // ConfigConfirmStep 已经处理了代码生成
      // 这里只需要进入下一步
      store.confirmConfig(data)
      store.nextStep()
    }

    const handleNext = () => {
      if (store.canGoNext) {
        store.nextStep()
      }
    }

    const handlePrevious = () => {
      store.prevStep()
    }

    const handleReset = () => {
      if (confirm('确定要重新开始吗？当前进度将被清除。')) {
        store.reset()
      }
    }

    // 初始化加载模板列表
    onMounted(() => {
      store.loadTemplates()
    })

    return {
      currentStep,
      steps,
      canGoNext,
      errors,
      errorDialogVisible,
      getStepStatus,
      handleTemplateSelect,
      handleApiInputNext,
      handleApiParseNext,
      handleInferenceNext,
      handleConfirmNext,
      handleGenerate,
      handleNext,
      handlePrevious,
      handleReset
    }
  }
}
</script>

<style scoped>
.main-workflow {
  min-height: 100vh;
  background: #f5f7fa;
}

.workflow-header {
  background: #fff;
  padding: 32px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.workflow-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px 100px;
}

.workflow-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 16px 24px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.footer-left,
.footer-right {
  display: flex;
  gap: 12px;
}

.error-dialog ul {
  margin: 0;
  padding-left: 20px;
}

.error-dialog li {
  margin-bottom: 8px;
  color: #f56c6c;
}
</style>

