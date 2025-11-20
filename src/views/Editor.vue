<template>
  <div class="editor-page flex h-full flex-col bg-gray-50">
    <header class="border-b border-gray-200 bg-white shadow-sm">
      <div class="flex flex-wrap items-center justify-between gap-4 px-8 py-4">
        <div class="flex flex-wrap items-center gap-3">
          <el-button type="primary" icon="el-icon-document" @click="templateDrawerVisible = true">
            选择模板
          </el-button>
          <el-button icon="el-icon-picture" @click="openImageDialog">图片解析</el-button>
        </div>
        <div class="flex items-center gap-3">
          <el-button icon="el-icon-download" @click="handleExportConfig">导出配置</el-button>
          <el-button icon="el-icon-upload" @click="handleImportConfig">导入配置</el-button>
          <el-button icon="el-icon-setting" @click="openModelDialog">模型设置</el-button>
          <el-button icon="el-icon-refresh-left" type="warning" @click="handleReset">
            重置
          </el-button>
        </div>
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <aside
        class="workspace-sidebar flex w-72 flex-col border-r border-gray-200 bg-white shadow-sm"
      >
        <div class="border-b border-gray-100 px-6 py-5">
          <div class="text-xs font-semibold uppercase tracking-wide text-gray-400">工作概览</div>
          <div class="mt-4 space-y-3 text-sm text-gray-600">
            <div class="flex items-center justify-between">
              <span class="text-gray-500">模板</span>
              <template v-if="editorStore.selectedTemplate">
                <el-tag size="small" type="success">
                  {{ editorStore.selectedTemplate.label }}
                </el-tag>
              </template>
              <span v-else class="text-gray-400">未选择</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-500">组件</span>
              <el-tag size="small" type="info">
                {{ totalComponentCount }}
              </el-tag>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-500">API</span>
              <template v-if="editorStore.apiConfigs.length">
                <el-tag size="small" type="warning">
                  {{ editorStore.apiConfigs.length }}
                </el-tag>
              </template>
              <span v-else class="text-gray-400">未配置</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-500">模型</span>
              <el-tag size="small" type="primary">
                {{ editorStore.aiConfig.model }}
              </el-tag>
            </div>
          </div>
        </div>

        <div class="flex-1 overflow-auto px-6 py-6">
          <div class="flex">
            <el-button
              style="margin-bottom: 0"
              block
              icon="el-icon-setting"
              type="default"
              @click="componentDrawerVisible = true"
            >
              组件配置
            </el-button>
            <el-button block icon="el-icon-link" type="default" @click="apiDrawerVisible = true">
              API 配置
            </el-button>
          </div>

          <div class="mt-8 space-y-3 text-sm text-gray-500">
            <div class="font-semibold text-gray-600">快速提示</div>
            <ul class="space-y-2">
              <li>• 抽屉内完成配置，关闭即生效</li>
              <li>• 主视图可以随时在出码和对话间切换</li>
              <li>• AI 配置会保存在本地浏览器</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-100 px-6 py-5 text-xs text-gray-400">
          构建完成后可直接复制或下载生成代码
        </div>
      </aside>

      <main class="flex-1 overflow-hidden">
        <div class="flex h-full flex-col">
          <div class="border-b border-gray-200 bg-white px-8 py-4">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span v-if="editorStore.selectedTemplate">
                  模板：{{ editorStore.selectedTemplate.label }}
                </span>
                <span v-if="editorStore.pageInfo.pageName">
                  页面：{{ editorStore.pageInfo.pageName }}
                </span>
                <span v-if="editorStore.apiConfigs.length">
                  API × {{ editorStore.apiConfigs.length }}
                </span>
                <span>模型：{{ editorStore.aiConfig.model }}</span>
              </div>

              <div class="flex items-center gap-2">
                <el-button type="text" @click="componentDrawerVisible = true">
                  快速编辑组件
                </el-button>
                <el-button type="text" @click="apiDrawerVisible = true">查看 API</el-button>
                <el-button type="text" @click="openModelDialog">切换模型</el-button>
              </div>
            </div>
          </div>

          <div class="flex-1 overflow-hidden px-8 py-6">
            <el-tabs v-model="activeMainTab" class="ai-workbench h-full" type="border-card">
              <el-tab-pane name="code" label="AI 出码">
                <div class="h-full overflow-auto">
                  <CodeGenerator @request-ai-config="openModelDialog" />
                </div>
              </el-tab-pane>
              <el-tab-pane name="chat" label="AI 对话">
                <div class="h-full overflow-hidden">
                  <AiChatPanel @request-ai-config="openModelDialog" />
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </main>
    </div>

    <el-drawer
      :visible="templateDrawerVisible"
      size="480px"
      title="选择页面模板"
      :close-on-click-modal="false"
      @close="templateDrawerVisible = false"
    >
      <TemplateSelector />
    </el-drawer>

    <el-drawer
      :visible="componentDrawerVisible"
      size="560px"
      title="组件配置"
      :close-on-click-modal="false"
      @close="componentDrawerVisible = false"
    >
      <ComponentConfig />
    </el-drawer>

    <el-drawer
      :visible="apiDrawerVisible"
      size="520px"
      title="API 配置"
      :close-on-click-modal="false"
      @close="apiDrawerVisible = false"
    >
      <ApiConfig />
    </el-drawer>

    <el-dialog
      :visible="imageDialogVisible"
      width="520px"
      title="图片解析"
      :close-on-click-modal="false"
      :append-to-body="true"
      @close="handleImageDialogClose"
    >
      <div class="space-y-4">
        <div>
          <div class="mb-2 text-sm font-medium text-gray-700">上传页面截图</div>
          <el-upload
            class="image-analyzer-upload"
            action=""
            :auto-upload="false"
            list-type="picture-card"
            accept="image/*"
            :limit="1"
            :file-list="imageFileList"
            :before-upload="handleImageBeforeUpload"
            :on-change="handleImageChange"
            :on-remove="handleImageRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <div class="mt-1 text-xs text-gray-500">支持 PNG / JPG / WEBP，建议尺寸不超过 5MB。</div>
        </div>
        <el-input
          v-model="imageDescription"
          type="textarea"
          :rows="3"
          placeholder="描述界面结构或关键要素（可选）"
        />
        <el-input
          v-model="imageExtraPrompt"
          type="textarea"
          :rows="2"
          placeholder="额外提示词，例如特殊字段或业务规则（可选）"
        />
        <el-select
          v-model="imageModel"
          class="w-full"
          filterable
          allow-create
          clearable
          placeholder="选择或输入用于解析图片的模型 ID"
        >
          <el-option
            v-for="model in commonModelOptions"
            :key="model"
            :label="model"
            :value="model"
          />
        </el-select>
      </div>
      <template #footer>
        <div class="flex items-center justify-between text-xs text-gray-500">
          <span>生成的 JSON 会填充到组件配置，应用前可自行调整。</span>
          <div class="space-x-2">
            <el-button :disabled="imageLoading" @click="imageDialogVisible = false">
              取消
            </el-button>
            <el-button
              type="primary"
              :loading="imageLoading"
              :disabled="!canAnalyzeImage"
              @click="handleAnalyzeImage"
            >
              开始分析
            </el-button>
          </div>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      :visible="modelDialogVisible"
      width="460px"
      title="AI 模型设置"
      :close-on-click-modal="false"
      :append-to-body="true"
      @close="modelDialogVisible = false"
    >
      <el-form :model="editorStore.aiConfig" label-width="110px" class="space-y-1">
        <el-form-item label="Base URL" required>
          <el-input
            v-model="editorStore.aiConfig.baseUrl"
            placeholder="https://dashscope.aliyuncs.com/compatible-mode/v1"
          />
        </el-form-item>
        <el-form-item label="API Key" required>
          <el-input
            v-model="editorStore.aiConfig.apiKey"
            type="password"
            show-password
            placeholder="sk-xxxxxxxxxxxxxxxx"
          />
        </el-form-item>
        <el-form-item label="模型">
          <el-select
            v-model="editorStore.aiConfig.model"
            class="w-full"
            filterable
            allow-create
            default-first-option
            clearable
            placeholder="输入或选择模型 ID，例如 qwen3-vl-plus"
          >
            <el-option-group label="常用模型">
              <el-option label="qwen3-vl-plus" value="qwen3-vl-plus" />
              <el-option label="qwen-max" value="qwen-max" />
              <el-option label="gpt-4" value="gpt-4" />
              <el-option label="claude-3-5-sonnet-latest" value="claude-3-5-sonnet-latest" />
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="Temperature">
          <el-slider
            v-model="editorStore.aiConfig.temperature"
            :min="0"
            :max="1"
            :step="0.1"
            show-input
          />
        </el-form-item>
        <el-form-item label="Max Tokens">
          <el-input-number
            v-model="editorStore.aiConfig.maxTokens"
            :min="1000"
            :max="8000"
            :step="500"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="flex items-center justify-between text-xs text-gray-500">
          <span>配置会保存到浏览器本地</span>
          <div class="space-x-2">
            <el-button @click="modelDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleSaveModelConfig">保存</el-button>
          </div>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      :visible="importDialogVisible"
      title="导入配置"
      width="600px"
      @close="importDialogVisible = false"
    >
      <el-input
        v-model="importConfigText"
        type="textarea"
        :rows="15"
        placeholder="请粘贴配置 JSON..."
      />
      <template #footer>
        <el-button @click="importDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmImportConfig">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import { mapActions } from 'vuex'
import TemplateSelector from '../components/TemplateSelector.vue'
import ComponentConfig from '../components/ComponentConfig.vue'
import ApiConfig from '../components/ApiConfig.vue'
import CodeGenerator from '../components/CodeGenerator.vue'
import AiChatPanel from '../components/AiChatPanel.vue'
import { sendChatMessages } from '../services/aiService'

export default {
  name: 'EditorView',
  components: {
    TemplateSelector,
    ComponentConfig,
    ApiConfig,
    CodeGenerator,
    AiChatPanel,
  },
  data() {
    return {
      templateDrawerVisible: false,
      componentDrawerVisible: false,
      apiDrawerVisible: false,
      modelDialogVisible: false,
      activeMainTab: 'code',
      importDialogVisible: false,
      importConfigText: '',
      imageDialogVisible: false,
      imageFileList: [],
      imageBase64: '',
      imageDescription: '',
      imageExtraPrompt: '',
      imageModel: '',
      imageLoading: false,
      commonModelOptions: ['qwen3-vl-plus', 'qwen-max', 'gpt-4', 'claude-3-5-sonnet-latest'],
    }
  },
  computed: {
    editorStore() {
      return this.$store.state.editor
    },
    totalComponentCount() {
      const searchCount = this.editorStore.slots.searchArea?.length || 0
      const actionCount = this.editorStore.slots.actionArea?.length || 0
      const tableCount = this.editorStore.slots.tableColumns?.length || 0
      return searchCount + actionCount + tableCount
    },
    canAnalyzeImage() {
      return !!this.imageBase64 && this.imageFileList.length > 0 && !this.imageLoading
    },
  },
  watch: {
    'editorStore.aiConfig.model'(newModel) {
      if (!this.imageDialogVisible) {
        this.imageModel = newModel || ''
      }
    },
  },
  created() {
    this.imageModel = this.editorStore.aiConfig.model || ''
    this.ensureTemplateSelectedAction()
  },
  methods: {
    ...mapActions('editor', {
      updateAiConfigAction: 'updateAiConfig',
      exportConfigAction: 'exportConfig',
      importConfigAction: 'importConfig',
      resetAction: 'reset',
      applySuggestionAction: 'applyComponentSuggestion',
      ensureTemplateSelectedAction: 'ensureTemplateSelected',
    }),
    openModelDialog() {
      this.modelDialogVisible = true
    },
    handleSaveModelConfig() {
      this.updateAiConfigAction({ ...this.editorStore.aiConfig })
      Message.success('AI 模型配置已保存')
      this.modelDialogVisible = false
    },
    async handleExportConfig() {
      const config = await this.exportConfigAction()
      const jsonStr = JSON.stringify(config, null, 2)
      const blob = new Blob([jsonStr], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `page-config-${Date.now()}.json`
      a.click()
      URL.revokeObjectURL(url)
      Message.success('配置已导出')
    },
    handleImportConfig() {
      this.importConfigText = ''
      this.importDialogVisible = true
    },
    async confirmImportConfig() {
      try {
        const config = JSON.parse(this.importConfigText)
        await this.importConfigAction(config)
        this.importDialogVisible = false
        Message.success('配置已导入')
      } catch (error) {
        Message.error('配置格式错误: ' + error.message)
      }
    },
    handleReset() {
      MessageBox.confirm('确定要重置所有配置吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.resetAction()
          Message.success('已重置')
        })
        .catch(() => {})
    },
    openImageDialog() {
      this.resetImageDialogState()
      this.imageModel = this.editorStore.aiConfig.model || ''
      this.imageDialogVisible = true
    },
    handleImageDialogClose() {
      this.imageDialogVisible = false
      if (!this.imageLoading) {
        this.resetImageDialogState()
      }
    },
    resetImageDialogState() {
      this.imageFileList = []
      this.imageBase64 = ''
      this.imageDescription = ''
      this.imageExtraPrompt = ''
      this.imageLoading = false
    },
    setImageDataUrl(dataUrl, file) {
      if (!dataUrl) return
      this.imageBase64 = dataUrl
      this.imageFileList = [
        {
          name: file?.name || `image-${Date.now()}`,
          url: dataUrl,
          status: 'ready',
        },
      ]
    },
    handleImageBeforeUpload(file) {
      if (!file.type.startsWith('image/')) {
        Message.error('仅支持上传图片文件')
        return false
      }
      const reader = new FileReader()
      reader.onload = () => {
        let dataUrl = ''
        if (typeof reader.result === 'string') {
          dataUrl = reader.result
        } else if (reader.result instanceof ArrayBuffer) {
          const bytes = new Uint8Array(reader.result)
          let binary = ''
          bytes.forEach(b => {
            binary += String.fromCharCode(b)
          })
          dataUrl = `data:${file.type};base64,${btoa(binary)}`
        }
        if (!dataUrl) {
          Message.error('图片读取失败，请重试')
          return
        }
        this.setImageDataUrl(dataUrl, file)
      }
      reader.readAsDataURL(file)
      return false
    },
    handleImageChange(file) {
      const rawFile = file?.raw
      if (!rawFile) return
      const reader = new FileReader()
      reader.onload = () => {
        const dataUrl = typeof reader.result === 'string' ? reader.result : ''
        if (!dataUrl) {
          Message.error('图片读取失败，请重试')
          return
        }
        this.setImageDataUrl(dataUrl, rawFile)
      }
      reader.readAsDataURL(rawFile)
    },
    handleImageRemove() {
      this.imageFileList = []
      this.imageBase64 = ''
    },
    extractJsonFromResponse(text) {
      if (!text || typeof text !== 'string') {
        throw new Error('AI 没有返回有效内容')
      }
      let cleaned = text.trim()
      if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
      }
      const firstBrace = cleaned.indexOf('{')
      const lastBrace = cleaned.lastIndexOf('}')
      if (firstBrace === -1 || lastBrace === -1) {
        throw new Error('未解析到 JSON 结构')
      }
      cleaned = cleaned.slice(firstBrace, lastBrace + 1)
      return JSON.parse(cleaned)
    },
    async handleAnalyzeImage() {
      if (!this.imageBase64) {
        Message.error('请先上传页面截图')
        return
      }
      if (!this.editorStore.aiConfig.baseUrl || !this.editorStore.aiConfig.apiKey) {
        Message.error('请先配置 AI 模型（Base URL + API Key）')
        this.openModelDialog()
        return
      }
      const chosenModel = (this.imageModel || this.editorStore.aiConfig.model || '').trim()
      if (!chosenModel) {
        Message.error('请指定用于解析图片的模型')
        return
      }

      const templateLabel = this.editorStore.selectedTemplate?.label || '标准列表页'
      const structureGuide = `你是一个界面组件识别助手。请根据上传的页面截图和描述，推断 ${templateLabel} 模板所需的搜索区、操作区和表格列组件配置。

输出必须是合法的 JSON，且不要返回任何额外解释。
推荐的 JSON 结构：
{
  "pageInfo": {
    "pageName": "可选，字符串",
    "title": "可选，字符串",
    "breadcrumb": ["可选", "面包屑路径"]
  },
  "slots": {
    "searchArea": [
      {
        "component": "el-input",
        "label": "搜索项名称",
        "model": "字段名",
        "props": {
          "placeholder": "占位提示"
        }
      }
    ],
    "actionArea": [
      {
        "component": "el-button",
        "text": "按钮文案",
        "props": {
          "type": "primary"
        }
      }
    ],
    "tableColumns": [
      {
        "component": "el-table-column",
        "props": {
          "prop": "字段名",
          "label": "列名称",
          "minWidth": 120
        }
      }
    ]
  },
  "apiConfigs": [
    {
      "name": "可选",
      "url": "/api/example",
      "method": "POST",
      "requestExample": {},
      "responseExample": {}
    }
  ]
}
如果无法判断某个字段，请留空字符串或使用 null，并确保返回合法 JSON。`

      const userSegments = []
      if (this.imageDescription.trim()) {
        userSegments.push(`界面描述：${this.imageDescription.trim()}`)
      }
      if (this.imageExtraPrompt.trim()) {
        userSegments.push(`额外提示：${this.imageExtraPrompt.trim()}`)
      }
      if (this.editorStore.customPrompt) {
        userSegments.push(`全局提示：${this.editorStore.customPrompt}`)
      }
      userSegments.push('请结合上述截图生成 JSON。')

      const messages = [
        {
          role: 'system',
          content: [{ type: 'text', text: structureGuide }],
        },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: this.imageBase64,
                detail: 'high',
              },
            },
            {
              type: 'text',
              text: userSegments.join('\n\n'),
            },
          ],
        },
      ]

      this.imageLoading = true
      try {
        const reply = await sendChatMessages({
          messages,
          aiConfig: { ...this.editorStore.aiConfig, model: chosenModel },
        })
        const suggestion = this.extractJsonFromResponse(reply)
        this.applySuggestionAction(suggestion)
        Message.success('已根据图片生成组件配置，请到组件配置中查看并调整')
        this.imageDialogVisible = false
        this.resetImageDialogState()
      } catch (error) {
        console.error('Image analysis failed:', error)
        Message.error(error.message || '图片解析失败，请稍后重试')
      } finally {
        this.imageLoading = false
      }
    },
  },
}
</script>

<style scoped>
.workspace-sidebar {
  min-width: 18rem;
}

.ai-workbench :deep(.el-tabs__content) {
  height: calc(100% - 40px);
}

.ai-workbench :deep(.el-tab-pane) {
  height: 100%;
  overflow: hidden;
}
</style>
