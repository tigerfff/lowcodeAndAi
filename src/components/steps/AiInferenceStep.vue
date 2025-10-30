<template>
  <div class="ai-inference-step">
    <div class="step-header">
      <h2>AI 智能推断</h2>
      <p>正在分析数据结构并推断页面配置...</p>
    </div>

    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="8" animated />
    </div>

    <div v-else-if="result" class="result-container">
      <el-alert
        :type="confidence >= 0.8 ? 'success' : 'warning'"
        :title="`推断完成，置信度: ${(confidence * 100).toFixed(0)}%`"
        :description="confidence >= 0.8 ? 'AI 推断结果可用，请继续下一步' : '部分推断结果置信度较低，建议在下一步手动调整'"
        show-icon
        :closable="false"
      />

      <div class="result-summary">
        <h3>推断结果</h3>
        <el-row :gutter="16">
          <el-col :span="8">
            <div class="summary-card">
              <div class="card-value">{{ result.columns?.length || 0 }}</div>
              <div class="card-label">表格列</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="summary-card">
              <div class="card-value">{{ result.searchFields?.length || 0 }}</div>
              <div class="card-label">搜索字段</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="summary-card">
              <div class="card-value">{{ result.dataMapping ? '✅' : '❌' }}</div>
              <div class="card-label">数据映射</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="action-buttons">
        <el-button @click="handlePrevious">⬅️ 上一步</el-button>
        <el-button type="primary" @click="handleContinue">继续下一步 ➡️</el-button>
      </div>
    </div>

    <div v-else class="start-inference">
      <el-button type="primary" size="large" @click="handleStart">
        🚀 开始 AI 推断
      </el-button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useGeneratorStore } from '@/stores/useGeneratorStore'
import { inferPageConfig } from '@/services/ai-inference'
import { ElMessage } from 'element-plus'

export default {
  name: 'AiInferenceStep',
  
  emits: ['next', 'previous'],
  
  setup(props, { emit }) {
    const store = useGeneratorStore()
    const loading = ref(false)
    const result = ref(null)
    const confidence = ref(0)
    
    const handleStart = async () => {
      loading.value = true
      
      try {
        const config = {
          templateId: store.selectedTemplate?.id,
          apiInput: store.apiInput,
          parseResult: store.apiParseResult
        }
        
        const inferenceResult = await inferPageConfig(config)
        
        result.value = inferenceResult.config
        confidence.value = inferenceResult.confidence || 0
        
        if (confidence.value >= 0.8) {
          ElMessage.success('AI 推断完成')
        } else {
          ElMessage.warning('AI 推断完成，但部分结果可能需要调整')
        }
      } catch (error) {
        console.error('AI inference error:', error)
        ElMessage.error('AI 推断失败：' + error.message)
      } finally {
        loading.value = false
      }
    }
    
    const handleContinue = () => {
      if (result.value) {
        emit('next', result.value, confidence.value)
      }
    }
    
    const handlePrevious = () => {
      emit('previous')
    }
    
    return {
      loading,
      result,
      confidence,
      handleStart,
      handleContinue,
      handlePrevious
    }
  }
}
</script>

<style scoped>
.ai-inference-step {
  background: #fff;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.step-header {
  margin-bottom: 32px;
}

.step-header h2 {
  margin: 0 0 8px 0;
  font-size: 24px;
  color: #303133;
}

.step-header p {
  margin: 0;
  color: #909399;
  font-size: 14px;
}

.loading-container,
.start-inference {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.result-container {
  space-y: 16px;
}

.result-container > * + * {
  margin-top: 16px;
}

.result-summary {
  margin-top: 24px;
}

.result-summary h3 {
  margin: 0 0 16px 0;
  font-size: 16px;
  color: #303133;
}

.summary-card {
  text-align: center;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}

.card-value {
  font-size: 32px;
  font-weight: 600;
  color: #409eff;
  margin-bottom: 8px;
}

.card-label {
  font-size: 14px;
  color: #909399;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
}
</style>

