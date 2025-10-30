<template>
  <div class="preview-panel">
    <div class="preview-header">
      <h3>👁️ 代码预览</h3>
      <div class="preview-actions">
        <el-button size="small" @click="handleRefresh">
          <span>🔄</span>
          刷新预览
        </el-button>
        <el-button size="small" @click="handleExport">
          <span>📦</span>
          全屏预览
        </el-button>
      </div>
    </div>

    <div class="preview-container">
      <div v-if="!generatedCode" class="preview-placeholder">
        <div class="placeholder-content">
          <span class="placeholder-icon">👈</span>
          <p>请先生成代码</p>
        </div>
      </div>

      <iframe
        v-else
        ref="previewFrame"
        class="preview-frame"
        sandbox="allow-scripts allow-same-origin"
        @load="handleIframeLoad"
      ></iframe>

      <div v-if="loading" class="preview-loading">
        <div class="loading-spinner"></div>
        <p>正在加载预览...</p>
      </div>
    </div>

    <div v-if="previewStatus" class="preview-status">
      <el-alert
        :type="previewStatus.type"
        :title="previewStatus.title"
        :description="previewStatus.description"
        :closable="false"
        show-icon
      />
    </div>
  </div>
</template>

<script>
import { injectSFCToIframe, setupIframeMessageListener, createPreviewURL, buildPreviewHTML } from '@/services/preview-service'
import { ElMessage } from 'element-plus'

export default {
  name: 'PreviewPanel',
  
  props: {
    generatedCode: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: null
    },
    mockData: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      loading: false,
      previewStatus: null,
      cleanupMessageListener: null
    }
  },

  watch: {
    generatedCode: {
      handler(newCode) {
        if (newCode) {
          this.loadPreview()
        }
      },
      immediate: true
    }
  },

  mounted() {
    this.setupMessageListener()
  },

  beforeUnmount() {
    if (this.cleanupMessageListener) {
      this.cleanupMessageListener()
    }
  },

  methods: {
    async loadPreview() {
      if (!this.generatedCode) return

      this.loading = true
      this.previewStatus = null

      try {
        const iframe = this.$refs.previewFrame
        if (!iframe) {
          throw new Error('Iframe not found')
        }

        // 注入 SFC 到 iframe
        injectSFCToIframe(iframe, this.generatedCode, this.mockData)
        
      } catch (error) {
        console.error('Preview load error:', error)
        this.previewStatus = {
          type: 'error',
          title: '预览加载失败',
          description: error.message
        }
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 1000)
      }
    },

    setupMessageListener() {
      this.cleanupMessageListener = setupIframeMessageListener((data) => {
        if (data.type === 'preview-ready') {
          this.previewStatus = {
            type: 'success',
            title: '预览加载成功',
            description: '组件已成功渲染'
          }
        } else if (data.type === 'preview-error') {
          this.previewStatus = {
            type: 'error',
            title: '预览运行错误',
            description: data.message
          }
        }
      })
    },

    handleIframeLoad() {
      console.log('Iframe loaded')
    },

    handleRefresh() {
      this.loadPreview()
    },

    async handleExport() {
      // 在新窗口打开完整预览
      if (this.generatedCode) {
        try {
          const url = createPreviewURL(this.generatedCode, this.mockData)
          window.open(url, '_blank')
        } catch (error) {
          console.error('Export error:', error)
          ElMessage.error('导出失败：' + error.message)
        }
      }
    }
  }
}
</script>

<style scoped>
.preview-panel {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.preview-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.preview-actions {
  display: flex;
  gap: 8px;
}

.preview-container {
  position: relative;
  min-height: 600px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
}

.preview-frame {
  width: 100%;
  height: 600px;
  border: none;
  background: #fff;
}

.preview-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 600px;
  background: #fafafa;
}

.placeholder-content {
  text-align: center;
}

.placeholder-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
}

.placeholder-content p {
  margin: 0;
  color: #909399;
  font-size: 14px;
}

.preview-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  z-index: 10;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e4e7ed;
  border-top-color: #409eff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.preview-loading p {
  margin-top: 16px;
  color: #606266;
  font-size: 14px;
}

.preview-status {
  margin-top: 16px;
}
</style>

