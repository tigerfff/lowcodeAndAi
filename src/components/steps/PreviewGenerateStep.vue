<template>
  <div class="preview-generate-step">
    <div class="step-header">
      <h2>预览与代码生成</h2>
      <p>预览生成的页面，复制代码到你的项目中</p>
    </div>

    <div class="content-grid">
      <!-- 左侧：代码预览 -->
      <div class="code-section">
        <div class="section-header">
          <h3>📋 生成的代码</h3>
          <div class="header-actions">
            <el-button size="small" @click="handleCopyCode">
              <span>📋</span>
              复制代码
            </el-button>
            <el-button size="small" @click="handleDownloadCode">
              <span>💾</span>
              下载
            </el-button>
          </div>
        </div>
        <el-input
          v-model="generatedCode"
          type="textarea"
          :rows="25"
          readonly
          class="code-editor"
        />
      </div>

      <!-- 右侧：页面预览 -->
      <div class="preview-section">
        <div class="section-header">
          <h3>👁️ 页面预览</h3>
        </div>
        <PreviewPanel
          :generated-code="generatedCode"
          :config="config"
          :mock-data="mockData"
        />
      </div>
    </div>

    <div class="action-buttons">
      <el-button @click="handlePrevious">⬅️ 上一步</el-button>
      <el-button @click="handleReset">🔄 重新开始</el-button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useGeneratorStore } from '@/stores/useGeneratorStore'
import PreviewPanel from '@/components/PreviewPanel.vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'PreviewGenerateStep',
  
  components: {
    PreviewPanel
  },
  
  emits: ['previous', 'reset'],
  
  setup(props, { emit }) {
    const store = useGeneratorStore()
    
    const generatedCode = computed(() => store.generatedCode)
    const config = computed(() => store.confirmedConfig)
    const mockData = computed(() => store.apiParseResult?.mockData || null)
    
    const handleCopyCode = () => {
      if (generatedCode.value) {
        navigator.clipboard.writeText(generatedCode.value)
        ElMessage.success('代码已复制到剪贴板')
      }
    }
    
    const handleDownloadCode = () => {
      if (generatedCode.value) {
        const blob = new Blob([generatedCode.value], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${store.selectedTemplate?.id || 'page'}.vue`
        a.click()
        URL.revokeObjectURL(url)
        ElMessage.success('代码已下载')
      }
    }
    
    const handlePrevious = () => {
      emit('previous')
    }
    
    const handleReset = () => {
      emit('reset')
    }
    
    return {
      generatedCode,
      config,
      mockData,
      handleCopyCode,
      handleDownloadCode,
      handlePrevious,
      handleReset
    }
  }
}
</script>

<style scoped>
.preview-generate-step {
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

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.code-editor {
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 13px;
}

.code-section {
  min-height: 600px;
}

.preview-section {
  min-height: 600px;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
}
</style>

