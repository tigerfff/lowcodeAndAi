<template>
  <div class="editor-container">
    <!-- 顶部工具栏 -->
    <div class="editor-header">
      <div class="header-left">
        <el-select
          v-model="selectedTemplateId"
          placeholder="选择模板"
          class="template-selector"
          @change="handleTemplateChange"
        >
          <el-option
            v-for="tpl in templates"
            :key="tpl.id"
            :label="tpl.label"
            :value="tpl.id"
          />
        </el-select>
      </div>

      <div class="header-center">
        <el-button-group>
          <el-button icon="el-icon-refresh-left" :disabled="!canUndo" @click="handleUndo">
            撤销
          </el-button>
          <el-button icon="el-icon-refresh-right" :disabled="!canRedo" @click="handleRedo">
            重做
          </el-button>
        </el-button-group>
      </div>

      <div class="header-right">
        <el-button icon="el-icon-view" @click="handlePreview">
          预览
        </el-button>
        <el-button type="primary" icon="el-icon-document" @click="handleGenerate">
          生成代码
        </el-button>
        <el-button icon="el-icon-download" @click="handleSave">
          保存配置
        </el-button>
      </div>
    </div>

    <!-- 主编辑区域 - 三栏布局 -->
    <div class="editor-main">
      <!-- 左侧：组件库 -->
      <div class="editor-left">
        <ComponentLibrary />
      </div>

      <!-- 中间：实时预览 -->
      <div class="editor-center">
        <PreviewPanel />
      </div>

      <!-- 右侧：属性配置 -->
      <div class="editor-right">
        <ConfigPanel />
      </div>
    </div>

    <!-- 代码预览对话框 -->
    <CodePreviewDialog
      v-model:visible="codePreviewVisible"
      :code="generatedCode"
      :prompt="generatedPrompt"
      :metadata="generatedMetadata"
      :filename="generatedFilename"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useEditorStore } from '@/stores/editorStore'
import ComponentLibrary from '@/components/ComponentLibrary.vue'
import PreviewPanel from '@/components/PreviewPanel.vue'
import ConfigPanel from '@/components/ConfigPanel.vue'
import CodePreviewDialog from '@/components/CodePreviewDialog.vue'
import { getAllTemplates, getTemplateById } from '@/services/templateManager'
import { generateCode } from '@/services/codeGenerator'

export default {
  name: 'Editor',
  components: {
    ComponentLibrary,
    PreviewPanel,
    ConfigPanel,
    CodePreviewDialog
  },
  setup() {
    const editorStore = useEditorStore()

    // 模板列表
    const templates = ref([])

    // 选中的模板
    const selectedTemplateId = ref('')

    // 代码预览对话框
    const codePreviewVisible = ref(false)
    const generatedCode = ref('')
    const generatedPrompt = ref('')
    const generatedMetadata = ref({})
    const generatedFilename = ref('GeneratedPage.vue')

    // 撤销/重做状态
    const canUndo = computed(() => editorStore.canUndo)
    const canRedo = computed(() => editorStore.canRedo)

    // 初始化
    onMounted(async () => {
      // 加载模板列表
      templates.value = await getAllTemplates()
      if (templates.value.length > 0) {
        selectedTemplateId.value = templates.value[0].id
        await handleTemplateChange(selectedTemplateId.value)
      }
    })

    // 处理模板切换
    const handleTemplateChange = async (templateId) => {
      const template = await getTemplateById(templateId)
      if (template) {
        editorStore.selectTemplate(template)
        ElMessage.success(`已切换到模板：${template.label}`)
      }
    }

    // 撤销
    const handleUndo = () => {
      editorStore.undo()
      ElMessage.success('已撤销')
    }

    // 重做
    const handleRedo = () => {
      editorStore.redo()
      ElMessage.success('已重做')
    }

    // 预览
    const handlePreview = () => {
      window.open('/preview-iframe.html', '_blank')
    }

    // 生成代码
    const handleGenerate = async () => {
      const loading = ElMessage({
        message: '正在生成代码...',
        type: 'info',
        duration: 0
      })

      try {
        const config = editorStore.exportConfig()
        const result = await generateCode(config, { useAI: false })

        loading.close()

        if (result.success) {
          generatedCode.value = result.code
          generatedPrompt.value = result.prompt
          generatedMetadata.value = result.metadata
          generatedFilename.value = `${config.pageInfo.name || 'GeneratedPage'}.vue`
          codePreviewVisible.value = true

          ElMessage.success('代码生成成功')
        } else {
          ElMessage.error(`生成失败：${result.error}`)
        }
      } catch (error) {
        loading.close()
        console.error('Generate error:', error)
        ElMessage.error('生成代码时发生错误')
      }
    }

    // 保存配置
    const handleSave = () => {
      const config = editorStore.exportConfig()
      const blob = new Blob([JSON.stringify(config, null, 2)], {
        type: 'application/json'
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${config.pageInfo.name || 'config'}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      ElMessage.success('配置已保存')
    }

    return {
      templates,
      selectedTemplateId,
      canUndo,
      canRedo,
      codePreviewVisible,
      generatedCode,
      generatedPrompt,
      generatedMetadata,
      generatedFilename,
      handleTemplateChange,
      handleUndo,
      handleRedo,
      handlePreview,
      handleGenerate,
      handleSave
    }
  }
}
</script>

<style scoped>
.editor-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  overflow: hidden;
}

/* 顶部工具栏 */
.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.header-left,
.header-center,
.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.template-selector {
  width: 200px;
}

/* 主编辑区域 - 三栏布局 */
.editor-main {
  flex: 1;
  display: grid;
  grid-template-columns: 260px 1fr 380px;
  gap: 0;
  overflow: hidden;
  min-height: 0; /* 重要：解决 grid 子元素溢出问题 */
}

/* 左侧：组件库 */
.editor-left {
  background: #ffffff;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 中间：预览区 */
.editor-center {
  background: #f0f2f5;
  position: relative;
  overflow: hidden;
}

/* 右侧：配置面板 */
.editor-right {
  background: #ffffff;
  border-left: 1px solid #e0e0e0;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 滚动条样式 */
.editor-left::-webkit-scrollbar,
.editor-right::-webkit-scrollbar {
  width: 6px;
}

.editor-left::-webkit-scrollbar-thumb,
.editor-right::-webkit-scrollbar-thumb {
  background: #d0d0d0;
  border-radius: 3px;
}

.editor-left::-webkit-scrollbar-thumb:hover,
.editor-right::-webkit-scrollbar-thumb:hover {
  background: #b0b0b0;
}

/* 响应式适配 */
@media (max-width: 1440px) {
  .editor-main {
    grid-template-columns: 240px 1fr 360px;
  }
}

@media (max-width: 1280px) {
  .editor-main {
    grid-template-columns: 220px 1fr 340px;
  }
}
</style>

