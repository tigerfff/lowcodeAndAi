<template>
  <el-dialog
    :visible.sync="internalVisible"
    title="在线预览"
    width="95%"
    top="2vh"
    :append-to-body="true"
    class="live-preview-dialog"
  >
    <div class="live-preview-container">
      <div class="split-container">
        <div class="code-panel" :style="{ width: splitPosition + '%' }">
          <div class="panel-header">
            <div class="flex items-center gap-2">
              <i class="el-icon-edit"></i>
              <span class="font-semibold">代码编辑</span>
              <el-tag size="small" type="info">{{ lineCount }} 行</el-tag>
              <el-tag v-if="isModified" size="small" type="warning">已修改</el-tag>
            </div>
            <div class="flex gap-2">
              <el-button icon="el-icon-refresh-left" size="small" @click="handleReset">
                重置
              </el-button>
              <el-button icon="el-icon-document-copy" size="small" @click="handleCopy">
                复制
              </el-button>
              <el-button icon="el-icon-download" size="small" @click="handleDownload">
                下载
              </el-button>
            </div>
          </div>
          <div class="code-content">
            <textarea
              v-model="editableCode"
              class="code-editor"
              spellcheck="false"
              @input="handleCodeChange"
            ></textarea>
          </div>
        </div>
        <div class="split-divider" @mousedown="startResize"></div>
        <div class="preview-panel" :style="{ width: 100 - splitPosition + '%' }">
          <div class="panel-header">
            <div class="flex items-center gap-2">
              <i class="el-icon-view"></i>
              <span class="font-semibold">预览</span>
              <el-tag v-if="compiling" size="small" type="warning">编译中...</el-tag>
              <el-tag v-else-if="error" size="small" type="danger">编译失败</el-tag>
              <el-tag v-else size="small" type="success">运行中</el-tag>
            </div>
            <div class="flex gap-2">
              <el-button icon="el-icon-refresh" size="small" @click="handleRefresh">刷新</el-button>
            </div>
          </div>
          <div class="preview-content">
            <!-- Loading 遮罩层 -->
            <div v-if="compiling" class="preview-loading-overlay">
              <i class="el-icon-loading"></i>
              <p>正在编译代码...</p>
            </div>
            <!-- 错误遮罩层 -->
            <div v-if="error" class="preview-error-overlay">
              <i class="el-icon-warning"></i>
              <h3>编译错误</h3>
              <pre>{{ error }}</pre>
            </div>
            <!-- iframe 始终存在 -->
            <iframe
              ref="previewFrame"
              src="/preview-env/index.html"
              class="preview-frame"
              frameborder="0"
              sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
              @load="handleIframeLoad"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { Message } from 'element-ui'
import { mapState } from 'vuex'

export default {
  name: 'LivePreviewDialog',
  model: {
    prop: 'visible',
    event: 'update:visible',
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
      default: '',
    },
    fileName: {
      type: String,
      default: 'Page.vue',
    },
  },
  data() {
    return {
      internalVisible: this.visible,
      splitPosition: 50,
      compiling: false,
      error: null,
      isResizing: false,
      editableCode: '', // 可编辑的代码
      previewReady: false, // 预览环境是否就绪
      readyTimeout: null, // 就绪超时定时器
      maxReadyWaitTime: 15000, // 最大等待时间（15秒）
    }
  },
  computed: {
    ...mapState('editor', ['customComponents']),
    lineCount() {
      return this.editableCode ? this.editableCode.split('\n').length : 0
    },
    isModified() {
      return this.editableCode !== this.code
    },
  },
  watch: {
    visible(val) {
      this.internalVisible = val
      if (val && this.code) {
        console.log('👁️ 预览对话框打开')
        console.log('代码长度:', this.code.length)
        // 初始化可编辑代码
        this.editableCode = this.code
        this.error = null
        this.compiling = true
        // 设置超时保护
        this.startReadyTimeout()
        // 等待 iframe 加载并就绪后再发送代码
        this.$nextTick(() => {
          console.log('$nextTick 执行')
          console.log('previewFrame ref:', this.$refs.previewFrame)
          this.waitForPreviewReady()
        })
      }
    },
    internalVisible(val) {
      this.$emit('update:visible', val)
      if (!val) {
        // 关闭时清理
        console.log('🚪 预览对话框关闭')
        this.previewReady = false
        this.clearReadyTimeout()
      }
    },
    code(newCode) {
      // 当外部代码更新时，如果没有本地修改，同步更新
      if (!this.isModified) {
        this.editableCode = newCode
      }
    },
  },
  created() {
    // 防抖发送代码
    let timer = null
    this.debouncedSendCode = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.sendCodeToPreview()
      }, 500)
    }

    // 监听来自预览环境的消息
    window.addEventListener('message', this.handlePreviewMessage)
  },
  mounted() {
    console.log('🎬 LivePreviewDialog mounted')
    // 绑定全局事件监听器
    document.addEventListener('mousemove', this.handleResize)
    document.addEventListener('mouseup', this.stopResize)
  },
  beforeDestroy() {
    console.log('💀 LivePreviewDialog beforeDestroy')
    // 清理消息监听
    window.removeEventListener('message', this.handlePreviewMessage)
    // 清理事件监听器
    document.removeEventListener('mousemove', this.handleResize)
    document.removeEventListener('mouseup', this.stopResize)
    // 清理超时计时器
    if (this.readyTimeout) {
      clearTimeout(this.readyTimeout)
    }
  },
  methods: {
    startResize(e) {
      this.isResizing = true
      e.preventDefault()
    },
    handleResize(e) {
      if (!this.isResizing) return

      const container = this.$el?.querySelector('.split-container')
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const mouseX = e.clientX - containerRect.left
      const percentage = (mouseX / containerRect.width) * 100

      // 限制在 20% 到 80% 之间
      this.splitPosition = Math.max(20, Math.min(80, percentage))
    },
    stopResize() {
      this.isResizing = false
    },
    handleCodeChange() {
      // 代码改变时触发防抖发送
      if (this.previewReady) {
        this.debouncedSendCode()
      }
    },
    handleReset() {
      // 重置为原始代码
      this.editableCode = this.code
      this.sendCodeToPreview()
      Message.success('代码已重置')
    },
    handleRefresh() {
      // 重新发送代码
      this.sendCodeToPreview()
    },
    /**
     * iframe 加载完成
     */
    handleIframeLoad() {
      console.log('✅ iframe DOM 加载完成')
      console.log('iframe src:', this.$refs.previewFrame?.src)
      console.log('iframe contentWindow:', this.$refs.previewFrame?.contentWindow)

      // 尝试访问 iframe 内部
      try {
        const iframeDoc =
          this.$refs.previewFrame?.contentDocument ||
          this.$refs.previewFrame?.contentWindow?.document
        console.log('iframe document:', iframeDoc)
        console.log('iframe document.readyState:', iframeDoc?.readyState)
        console.log('iframe document.title:', iframeDoc?.title)
      } catch (e) {
        console.error('❌ 无法访问 iframe 内部（可能是跨域）:', e)
      }

      // iframe 加载完成后，等待预览环境发送 PREVIEW_READY 消息
      // 如果已经有代码，等待就绪后发送
      if (this.editableCode) {
        this.waitForPreviewReady()
      }
    },
    /**
     * 开始超时计时
     */
    startReadyTimeout() {
      this.clearReadyTimeout()
      console.log(`⏱️ 开始等待预览环境就绪（最多 ${this.maxReadyWaitTime / 1000} 秒）`)
      this.readyTimeout = setTimeout(() => {
        if (!this.previewReady) {
          console.error('❌ 预览环境初始化超时')
          this.error = '预览环境加载超时，请检查网络连接或刷新页面重试'
          this.compiling = false
          Message.error('预览环境加载超时')
        }
      }, this.maxReadyWaitTime)
    },
    /**
     * 清除超时计时
     */
    clearReadyTimeout() {
      if (this.readyTimeout) {
        clearTimeout(this.readyTimeout)
        this.readyTimeout = null
      }
    },
    /**
     * 等待预览环境就绪
     */
    waitForPreviewReady() {
      // 如果已经就绪，直接发送
      if (this.previewReady) {
        this.$nextTick(() => {
          this.sendCodeToPreview()
        })
        return
      }

      // 否则等待就绪消息
      const checkReady = () => {
        if (this.previewReady) {
          this.$nextTick(() => {
            this.sendCodeToPreview()
          })
        } else {
          setTimeout(checkReady, 100)
        }
      }
      checkReady()
    },
    /**
     * 发送代码到预览环境
     */
    sendCodeToPreview(retryCount = 0) {
      if (!this.editableCode || !this.editableCode.trim()) {
        return
      }

      // 检查 iframe 是否就绪
      const iframe = this.$refs.previewFrame
      if (!iframe || !iframe.contentWindow) {
        // 如果重试次数少于 10 次，等待后重试（增加重试次数）
        if (retryCount < 10) {
          console.log(`预览 iframe 未就绪，等待重试 (${retryCount + 1}/10)...`)
          setTimeout(() => {
            this.sendCodeToPreview(retryCount + 1)
          }, 300)
          return
        } else {
          console.warn('预览 iframe 未就绪，已重试 10 次')
          this.error = '预览环境加载超时，请刷新重试'
          this.compiling = false
          Message.error('预览环境加载超时，请刷新页面重试')
          return
        }
      }

      // 检查 contentWindow 是否可访问
      try {
        // 尝试访问 contentWindow，如果跨域会抛出错误
        if (!iframe.contentWindow.postMessage) {
          throw new Error('iframe contentWindow 不可访问')
        }
      } catch (error) {
        console.error('iframe 访问错误:', error)
        if (retryCount < 5) {
          setTimeout(() => {
            this.sendCodeToPreview(retryCount + 1)
          }, 300)
          return
        } else {
          this.error = '预览环境加载失败，可能是跨域问题'
          this.compiling = false
          Message.error('预览环境加载失败')
          return
        }
      }

      this.compiling = true
      this.error = null

      console.log('📤 发送代码到预览环境')

      try {
        iframe.contentWindow.postMessage(
          {
            type: 'RENDER_CODE',
            code: this.editableCode,
            customComponents: this.customComponents || [],
          },
          '*'
        )
        console.log('✅ 代码已发送到预览环境')
      } catch (error) {
        console.error('发送代码失败:', error)
        this.error = error.message
        this.compiling = false
        Message.error('发送代码失败: ' + error.message)
      }
    },
    /**
     * 处理来自预览环境的消息
     */
    handlePreviewMessage(event) {
      const data = event.data

      if (!data || !data.type) return

      console.log('📩 收到预览环境消息:', data.type, data)

      switch (data.type) {
        case 'IFRAME_LOADING':
          console.log('🔵 iframe HTML 开始加载')
          break
        case 'PREVIEW_READY':
          console.log('📩 收到 PREVIEW_READY 消息')
          this.previewReady = true
          this.clearReadyTimeout() // 清除超时计时
          console.log('✅ 预览环境已就绪')
          // 预览环境就绪后，如果有代码且 iframe 已加载，发送代码
          if (this.editableCode) {
            this.$nextTick(() => {
              this.sendCodeToPreview()
            })
          } else {
            this.compiling = false
          }
          break

        case 'RENDER_SUCCESS':
          this.compiling = false
          this.error = null
          console.log('✅ 渲染成功')
          break

        case 'RENDER_ERROR':
          this.compiling = false
          this.error = data.error || '渲染失败'
          console.error('❌ 渲染失败:', data.error)
          Message.error('预览失败: ' + this.error)
          break
      }
    },
    async handleCopy() {
      try {
        await navigator.clipboard.writeText(this.editableCode)
        Message.success('代码已复制到剪贴板')
      } catch {
        Message.error('复制失败')
      }
    },
    handleDownload() {
      const blob = new Blob([this.editableCode], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = this.fileName
      a.click()
      URL.revokeObjectURL(url)
      Message.success('文件已下载')
    },
  },
}
</script>

<style scoped>
.live-preview-dialog :deep(.el-dialog__body) {
  padding: 0;
  height: 90vh;
}

.live-preview-container {
  height: 90vh;
  display: flex;
  flex-direction: column;
}

.split-container {
  display: flex;
  height: 100%;
  position: relative;
}

.code-panel,
.preview-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  overflow: hidden;
}

.split-divider {
  width: 4px;
  background: #e4e7ed;
  cursor: col-resize;
  position: relative;
  flex-shrink: 0;
  transition: background 0.2s;
}

.split-divider:hover {
  background: #409eff;
}

.split-divider::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #dcdfe6;
  transform: translateX(-50%);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e4e7ed;
  background: #f5f7fa;
}

.code-content,
.preview-content {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.code-editor {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 16px;
  background: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  border: none;
  outline: none;
  resize: none;
  white-space: pre;
  overflow-wrap: normal;
  overflow-x: auto;
  tab-size: 2;
}

.code-editor::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.code-editor::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.code-editor::-webkit-scrollbar-thumb {
  background: #424242;
  border-radius: 5px;
}

.code-editor::-webkit-scrollbar-thumb:hover {
  background: #4e4e4e;
}

.preview-frame {
  width: 100%;
  height: 100%;
  border: none;
  background: #fff;
}

.preview-loading-overlay,
.preview-error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  z-index: 10;
}

.preview-loading-overlay {
  color: #409eff;
}

.preview-error-overlay {
  color: #f56c6c;
}

.preview-loading-overlay i {
  font-size: 48px;
  margin-bottom: 16px;
  animation: rotating 2s linear infinite;
}

.preview-error-overlay i {
  font-size: 48px;
  margin-bottom: 16px;
}

.preview-error-overlay h3 {
  margin: 16px 0;
}

/* 保留旧类名以防其他地方使用 */
.preview-loading,
.preview-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px;
  text-align: center;
  color: #909399;
}

.preview-loading i {
  font-size: 48px;
  color: #409eff;
  margin-bottom: 16px;
  animation: rotating 2s linear infinite;
}

.preview-error i {
  font-size: 48px;
  color: #f56c6c;
  margin-bottom: 16px;
}

.preview-error h3 {
  margin: 16px 0;
  color: #f56c6c;
}

.preview-error pre {
  text-align: left;
  background: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  max-width: 100%;
  overflow: auto;
  color: #f56c6c;
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
