<template>
  <el-dialog
    :visible.sync="internalVisible"
    title="代码预览"
    width="90%"
    top="5vh"
    :append-to-body="true"
  >
    <div class="code-preview-dialog">
      <div class="mb-4 flex items-center justify-between rounded-lg bg-gray-100 p-3">
        <div class="flex items-center gap-3">
          <el-tag>{{ fileName }}</el-tag>
          <el-tag type="info">{{ lineCount }} 行</el-tag>
          <el-tag type="success">{{ fileSizeFormatted }}</el-tag>
        </div>
        <div class="flex gap-2">
          <el-button icon="el-icon-document-copy" size="small" @click="handleCopy">
            复制
          </el-button>
          <el-button icon="el-icon-download" size="small" @click="handleDownload"> 下载 </el-button>
        </div>
      </div>

      <div class="code-container">
        <pre
          class="code-preview rounded-lg bg-gray-900 p-4 text-sm text-gray-100 overflow-auto"
          style="max-height: 70vh"
        ><code>{{ code }}</code></pre>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { Message } from 'element-ui'

export default {
  name: 'CodePreviewDialog',
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
    }
  },
  computed: {
    lineCount() {
      return this.code ? this.code.split('\n').length : 0
    },
    fileSize() {
      return new Blob([this.code]).size
    },
    fileSizeFormatted() {
      if (this.fileSize < 1024) {
        return `${this.fileSize} B`
      }
      if (this.fileSize < 1024 * 1024) {
        return `${(this.fileSize / 1024).toFixed(2)} KB`
      }
      return `${(this.fileSize / (1024 * 1024)).toFixed(2)} MB`
    },
  },
  watch: {
    visible(val) {
      this.internalVisible = val
    },
    internalVisible(val) {
      this.$emit('update:visible', val)
    },
  },
  methods: {
    async handleCopy() {
      try {
        await navigator.clipboard.writeText(this.code)
        Message.success('代码已复制到剪贴板')
      } catch (error) {
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
.code-preview-dialog :deep(.el-dialog__body) {
  padding: 20px;
}
</style>
