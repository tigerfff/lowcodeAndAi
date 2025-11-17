<template>
  <el-dialog
    :visible.sync="internalVisible"
    title="在线预览"
    width="95%"
    top="2vh"
    class="live-preview-dialog"
  >
    <div class="live-preview-container">
      <div class="split-container">
        <div class="code-panel" :style="{ width: splitPosition + '%' }">
          <div class="panel-header">
            <div class="flex items-center gap-2">
              <i class="el-icon-document"></i>
              <span class="font-semibold">代码</span>
              <el-tag size="small" type="info">{{ lineCount }} 行</el-tag>
            </div>
            <div class="flex gap-2">
              <el-button icon="el-icon-document-copy" size="small" @click="handleCopy">
                复制
              </el-button>
              <el-button icon="el-icon-download" size="small" @click="handleDownload">
                下载
              </el-button>
            </div>
          </div>
          <div class="code-content">
            <pre class="code-preview"><code>{{ code }}</code></pre>
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
            <div v-if="compiling" class="preview-loading">
              <i class="el-icon-loading"></i>
              <p>正在编译代码...</p>
            </div>
            <div v-else-if="error" class="preview-error">
              <i class="el-icon-warning"></i>
              <h3>编译错误</h3>
              <pre>{{ error }}</pre>
            </div>
            <iframe
              v-else
              ref="previewFrame"
              class="preview-frame"
              frameborder="0"
              sandbox="allow-scripts allow-same-origin allow-forms"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { Message } from 'element-ui'
import { buildPreviewHTML, compileVueSFC } from '../utils/vueSFCCompiler'

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
  emits: ['update:visible'],
  data() {
    return {
      internalVisible: this.visible,
      splitPosition: 50,
      compiling: false,
      error: null,
      previewHTML: '',
      isResizing: false,
    }
  },
  computed: {
    lineCount() {
      return this.code ? this.code.split('\n').length : 0
    },
  },
  watch: {
    visible(val) {
      this.internalVisible = val
      if (val && this.code) {
        this.$nextTick(() => {
          this.compileAndPreview()
        })
      }
    },
    internalVisible(val) {
      this.$emit('update:visible', val)
    },
    code() {
      if (this.internalVisible && this.code) {
        this.debouncedCompile()
      }
    },
  },
  created() {
    // 防抖编译
    let timer = null
    this.debouncedCompile = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.compileAndPreview()
      }, 500)
    }
  },
  mounted() {
    // 绑定全局事件监听器
    document.addEventListener('mousemove', this.handleResize)
    document.addEventListener('mouseup', this.stopResize)
  },
  beforeDestroy() {
    // 清理事件监听器
    document.removeEventListener('mousemove', this.handleResize)
    document.removeEventListener('mouseup', this.stopResize)
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
    async compileAndPreview() {
      if (!this.code || !this.code.trim()) {
        return
      }

      this.compiling = true
      this.error = null

      try {
        // 获取基础 URL（用于资源路径）
        // 确保以 / 结尾
        let baseUrl = window.location.origin + window.location.pathname
        if (!baseUrl.endsWith('/')) {
          baseUrl += '/'
        }

        console.log('开始编译，baseUrl:', baseUrl)
        console.log('代码长度:', this.code.length)

        // 编译并构建预览 HTML
        const compiled = compileVueSFC(this.code)
        console.log('编译结果:', compiled)
        if (!compiled.success) {
          throw new Error(compiled.error || '编译失败')
        }
        console.log('生成的完整脚本:')
        console.log(compiled.script)

        const html = await buildPreviewHTML(this.code, { baseUrl })

        console.log('HTML 生成成功，长度:', html.length)
        this.previewHTML = html

        // 注入到 iframe - 使用 srcdoc 属性
        // 等待编译状态更新后再设置 iframe 内容
        this.$nextTick(() => {
          // 再次等待，确保 iframe 已经渲染
          this.$nextTick(() => {
            if (this.$refs.previewFrame) {
              const iframe = this.$refs.previewFrame
              console.log('设置 iframe srcdoc，HTML 长度:', html.length)
              // 使用 srcdoc 属性，这是更可靠的方式
              iframe.srcdoc = html

              // 监听 iframe 加载完成
              iframe.onload = () => {
                console.log('iframe 加载完成')
              }
            } else {
              console.warn('previewFrame ref not found')
            }
          })
        })
      } catch (error) {
        console.error('预览编译失败:', error)
        this.error = error.message || '编译失败'
        Message.error('预览编译失败: ' + this.error)
      } finally {
        this.compiling = false
      }
    },
    handleRefresh() {
      this.compileAndPreview()
    },
    async handleCopy() {
      try {
        await navigator.clipboard.writeText(this.code)
        Message.success('代码已复制到剪贴板')
      } catch {
        Message.error('复制失败')
      }
    },
    handleDownload() {
      const blob = new Blob([this.code], { type: 'text/plain' })
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

.code-preview {
  margin: 0;
  padding: 16px;
  background: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  overflow: auto;
  height: 100%;
}

.preview-frame {
  width: 100%;
  height: 100%;
  border: none;
  background: #fff;
}

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
