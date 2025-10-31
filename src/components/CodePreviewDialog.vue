<template>
  <el-dialog
    :visible="visible"
    title="代码预览"
    width="90%"
    top="5vh"
    custom-class="code-preview-dialog"
    @close="handleClose"
  >
    <div class="dialog-content">
      <!-- 工具栏 -->
      <div class="toolbar">
        <div class="toolbar-left">
          <el-tag type="info" size="small">
            {{ metadata.method === 'ai' ? 'AI 生成' : '模板生成' }}
          </el-tag>
          <span class="metadata-item">
            <i class="el-icon-document" />
            {{ metadata.template }}
          </span>
          <span class="metadata-item">
            <i class="el-icon-s-operation" />
            {{ metadata.componentCount }} 个组件
          </span>
          <span class="metadata-item">
            <i class="el-icon-time" />
            {{ formatTime(metadata.timestamp) }}
          </span>
        </div>
        <div class="toolbar-right">
          <el-button
            size="small"
            icon="el-icon-document-copy"
            @click="handleCopy"
          >
            复制代码
          </el-button>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-download"
            @click="handleDownload"
          >
            下载文件
          </el-button>
        </div>
      </div>

      <!-- 标签页：代码和 Prompt -->
      <el-tabs v-model="activeTab" class="code-tabs">
        <el-tab-pane label="生成的代码" name="code">
          <div class="code-container">
            <pre><code ref="codeBlock" class="language-vue">{{ code }}</code></pre>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="AI Prompt" name="prompt" v-if="prompt">
          <div class="code-container">
            <pre><code ref="promptBlock" class="language-markdown">{{ prompt }}</code></pre>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <template #footer>
      <el-button @click="handleClose">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { downloadCode } from '@/services/codeGenerator'

export default {
  name: 'CodePreviewDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    code: {
      type: String,
      default: ''
    },
    prompt: {
      type: String,
      default: ''
    },
    metadata: {
      type: Object,
      default: () => ({
        method: 'template',
        template: '',
        componentCount: 0,
        timestamp: ''
      })
    },
    filename: {
      type: String,
      default: 'GeneratedPage.vue'
    }
  },
  emits: ['update:visible', 'close'],
  setup(props, { emit }) {
    const activeTab = ref('code')
    const codeBlock = ref(null)
    const promptBlock = ref(null)
    
    // 格式化时间
    const formatTime = (timestamp) => {
      if (!timestamp) return ''
      const date = new Date(timestamp)
      return date.toLocaleString('zh-CN')
    }
    
    // 复制代码
    const handleCopy = async () => {
      try {
        const textToCopy = activeTab.value === 'code' ? props.code : props.prompt
        await navigator.clipboard.writeText(textToCopy)
        ElMessage.success('已复制到剪贴板')
      } catch (error) {
        console.error('Copy failed:', error)
        ElMessage.error('复制失败')
      }
    }
    
    // 下载文件
    const handleDownload = () => {
      downloadCode(props.code, props.filename)
      ElMessage.success('下载成功')
    }
    
    // 关闭对话框
    const handleClose = () => {
      emit('update:visible', false)
      emit('close')
    }
    
    // 监听代码变化，应用语法高亮（如果需要）
    watch(() => props.visible, (newVal) => {
      if (newVal) {
        activeTab.value = 'code'
        // TODO: 可以在这里集成 Prism.js 或 highlight.js 进行语法高亮
      }
    })
    
    return {
      activeTab,
      codeBlock,
      promptBlock,
      formatTime,
      handleCopy,
      handleDownload,
      handleClose
    }
  }
}
</script>

<style scoped>
.code-preview-dialog :deep(.el-dialog__body) {
  padding: 0;
  max-height: calc(90vh - 150px);
  overflow: hidden;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  height: calc(90vh - 150px);
}

/* 工具栏 */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.metadata-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #606266;
}

.metadata-item i {
  color: #909399;
}

/* 代码标签页 */
.code-tabs {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.code-tabs :deep(.el-tabs__header) {
  margin: 0;
  padding: 0 16px;
  background: #ffffff;
}

.code-tabs :deep(.el-tabs__content) {
  flex: 1;
  overflow: hidden;
  padding: 0;
}

.code-tabs :deep(.el-tab-pane) {
  height: 100%;
  overflow: auto;
}

/* 代码容器 */
.code-container {
  height: 100%;
  overflow: auto;
  background: #282c34;
}

.code-container pre {
  margin: 0;
  padding: 16px;
  height: 100%;
  overflow: auto;
}

.code-container code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #abb2bf;
  white-space: pre;
  word-break: break-all;
  word-wrap: break-word;
}

/* 滚动条 */
.code-container::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.code-container::-webkit-scrollbar-thumb {
  background: #4b5263;
  border-radius: 5px;
}

.code-container::-webkit-scrollbar-thumb:hover {
  background: #5c6370;
}

.code-container::-webkit-scrollbar-track {
  background: #282c34;
}
</style>

