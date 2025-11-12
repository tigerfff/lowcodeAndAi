<template>
  <div class="editor-page flex h-full flex-col bg-gray-50">
    <header class="border-b border-gray-200 bg-white shadow-sm">
      <div class="flex items-center justify-between px-8 py-4">
        <div class="flex items-center gap-3">
          <el-icon :size="32" class="text-primary">
            <MagicStick />
          </el-icon>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">智能页面代码生成工具</h1>
            <p class="text-sm text-gray-500">
              极简交互 + AI 智能推断，全部流程都在这一个工作台里完成
            </p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <el-button :icon="Download" @click="handleExportConfig">导出配置</el-button>
          <el-button :icon="Upload" @click="handleImportConfig">导入配置</el-button>
          <el-button :icon="RefreshLeft" type="warning" @click="handleReset">重置</el-button>
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
          <div class="space-y-3">
            <el-button block :icon="Document" type="primary" @click="templateDrawerVisible = true">
              选择模板
            </el-button>
            <el-button block :icon="Setting" type="default" @click="componentDrawerVisible = true">
              组件配置
            </el-button>
            <el-button block :icon="Connection" type="default" @click="apiDrawerVisible = true">
              API 配置
            </el-button>
            <el-button block :icon="Cpu" type="default" @click="openModelDialog">
              模型设置
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
              <div class="flex flex-wrap items-center gap-3">
                <el-tag v-if="editorStore.selectedTemplate" type="success">
                  模板：{{ editorStore.selectedTemplate.label }}
                </el-tag>
                <el-tag v-if="editorStore.pageInfo.pageName" type="info">
                  页面：{{ editorStore.pageInfo.pageName }}
                </el-tag>
                <el-tag v-if="editorStore.apiConfigs.length" type="warning">
                  API × {{ editorStore.apiConfigs.length }}
                </el-tag>
                <el-tag type="primary">模型：{{ editorStore.aiConfig.model }}</el-tag>
              </div>

              <div class="flex items-center gap-2">
                <el-button text type="primary" @click="componentDrawerVisible = true">
                  快速编辑组件
                </el-button>
                <el-button text type="primary" @click="apiDrawerVisible = true">
                  查看 API
                </el-button>
                <el-button text type="primary" @click="openModelDialog"> 切换模型 </el-button>
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
      v-model="templateDrawerVisible"
      size="480px"
      title="选择页面模板"
      :close-on-click-modal="false"
    >
      <TemplateSelector />
    </el-drawer>

    <el-drawer
      v-model="componentDrawerVisible"
      size="560px"
      title="组件配置"
      :close-on-click-modal="false"
    >
      <ComponentConfig />
    </el-drawer>

    <el-drawer
      v-model="apiDrawerVisible"
      size="520px"
      title="API 配置"
      :close-on-click-modal="false"
    >
      <ApiConfig />
    </el-drawer>

    <el-dialog
      v-model="modelDialogVisible"
      width="460px"
      title="AI 模型设置"
      :close-on-click-modal="false"
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

    <el-dialog v-model="importDialogVisible" title="导入配置" width="600px">
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

<script setup>
import { computed, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  MagicStick,
  Document,
  Setting,
  Connection,
  Cpu,
  Download,
  Upload,
  RefreshLeft,
} from '@element-plus/icons-vue'
import { useEditorStore } from '../stores/editorStore'
import TemplateSelector from '../components/TemplateSelector.vue'
import ComponentConfig from '../components/ComponentConfig.vue'
import ApiConfig from '../components/ApiConfig.vue'
import CodeGenerator from '../components/CodeGenerator.vue'
import AiChatPanel from '../components/AiChatPanel.vue'

const editorStore = useEditorStore()

const templateDrawerVisible = ref(false)
const componentDrawerVisible = ref(false)
const apiDrawerVisible = ref(false)
const modelDialogVisible = ref(false)
const activeMainTab = ref('code')

const importDialogVisible = ref(false)
const importConfigText = ref('')

const totalComponentCount = computed(() => {
  const searchCount = editorStore.slots.searchArea?.length || 0
  const actionCount = editorStore.slots.actionArea?.length || 0
  const tableCount = editorStore.slots.tableColumns?.length || 0
  return searchCount + actionCount + tableCount
})

function openModelDialog() {
  modelDialogVisible.value = true
}

function handleSaveModelConfig() {
  editorStore.updateAiConfig({ ...editorStore.aiConfig })
  ElMessage.success('AI 模型配置已保存')
  modelDialogVisible.value = false
}

function handleExportConfig() {
  const config = editorStore.exportConfig()
  const jsonStr = JSON.stringify(config, null, 2)

  const blob = new Blob([jsonStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `page-config-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)

  ElMessage.success('配置已导出')
}

function handleImportConfig() {
  importConfigText.value = ''
  importDialogVisible.value = true
}

async function confirmImportConfig() {
  try {
    const config = JSON.parse(importConfigText.value)
    await editorStore.importConfig(config)
    importDialogVisible.value = false
    ElMessage.success('配置已导入')
  } catch (error) {
    ElMessage.error('配置格式错误: ' + error.message)
  }
}

function handleReset() {
  ElMessageBox.confirm('确定要重置所有配置吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      editorStore.reset()
      ElMessage.success('已重置')
    })
    .catch(() => {})
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
