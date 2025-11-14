<template>
  <el-dialog
    :model-value="visible"
    title="代码预览"
    width="90%"
    top="5vh"
    @update:model-value="$emit('update:visible', $event)"
  >
    <div class="code-preview-dialog">
      <!-- 工具栏 -->
      <div class="mb-4 flex items-center justify-between rounded-lg bg-gray-100 p-3">
        <div class="flex items-center gap-3">
          <el-tag>{{ fileName }}</el-tag>
          <el-tag type="info">{{ lineCount }} 行</el-tag>
          <el-tag type="success">{{ fileSizeFormatted }}</el-tag>
        </div>
        <div class="flex gap-2">
          <el-button :icon="CopyDocument" size="small" @click="handleCopy"> 复制 </el-button>
          <el-button :icon="Download" size="small" @click="handleDownload"> 下载 </el-button>
        </div>
      </div>

      <!-- 代码区域 -->
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
import { ElMessage } from 'element-plus'
import { CopyDocument, Download } from '@element-plus/icons-vue'

export default {
  name: 'CodePreviewDialog',
  components: {
    CopyDocument,
    Download,
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
  methods: {
    async handleCopy() {
      try {
        await navigator.clipboard.writeText(this.code)
        ElMessage.success('代码已复制到剪贴板')
      } catch (error) {
        ElMessage.error('复制失败')
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
      ElMessage.success('文件已下载')
    },
  },
}
</script>

<style scoped>
.code-preview-dialog :deep(.el-dialog__body) {
  padding: 20px;
}
</style>
