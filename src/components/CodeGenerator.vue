<template>
  <div class="code-generator">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900">生成代码</h2>
      <p class="mt-1 text-sm text-gray-500">AI 将自动推断配置并生成高质量的 Vue3 代码</p>
    </div>

    <!-- 生成状态 -->
    <el-card v-if="!editorStore.generatedCode && !generating" shadow="never" class="mb-6">
      <div class="text-center py-12">
        <el-icon :size="64" class="text-gray-300 mb-4">
          <DocumentAdd />
        </el-icon>
        <p class="text-gray-500 mb-6">点击下方按钮开始生成代码</p>
        <el-button type="primary" size="large" :icon="MagicStick" @click="handleGenerate">
          开始生成
        </el-button>
      </div>
    </el-card>

    <!-- 生成中 -->
    <el-card v-if="generating" shadow="never" class="mb-6">
      <div class="text-center py-12">
        <el-icon :size="64" class="is-loading text-primary mb-4">
          <Loading />
        </el-icon>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">AI 正在生成代码...</h3>
        <div class="space-y-2 text-sm text-gray-600">
          <p v-for="(status, index) in generationStatus" :key="index">
            <el-icon class="mr-1">
              <component :is="status.done ? 'CircleCheck' : 'Loading'" />
            </el-icon>
            {{ status.text }}
          </p>
        </div>
      </div>
    </el-card>

    <!-- 代码预览 -->
    <el-card v-if="editorStore.generatedCode" shadow="never">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <el-icon class="text-success"><CircleCheck /></el-icon>
            <span class="font-semibold">代码生成成功</span>
          </div>
          <div class="flex gap-2">
            <el-button :icon="View" @click="showPreviewDialog = true"> 预览 </el-button>
            <el-button :icon="CopyDocument" @click="handleCopyCode"> 复制代码 </el-button>
            <el-button :icon="Download" @click="handleDownloadCode"> 下载文件 </el-button>
            <el-button :icon="Refresh" type="warning" @click="handleRegenerate">
              重新生成
            </el-button>
          </div>
        </div>
      </template>

      <!-- 代码摘要 -->
      <div class="space-y-4">
        <!-- 生成结果信息 -->
        <el-alert
          v-if="generationResult"
          :type="generationResult.method === 'ai' ? 'success' : 'warning'"
          :closable="false"
          show-icon
        >
          <template #title>
            <div class="flex items-center justify-between">
              <span v-if="generationResult.method === 'ai'">
                ✨ 使用 AI 生成（{{ generationResult.metadata?.timestamp }}）
              </span>
              <span v-else> 📋 使用模板生成（AI 调用失败） </span>
              <el-tag v-if="generationResult.validation?.valid" type="success" size="small">
                代码验证通过
              </el-tag>
            </div>
          </template>
          <div v-if="generationResult.aiError" class="mt-2 text-sm">
            AI 错误: {{ generationResult.aiError }}
          </div>
          <div v-if="generationResult.validation?.issues.length > 0" class="mt-2">
            <div class="text-sm font-semibold mb-1">验证提示:</div>
            <ul class="text-sm space-y-1">
              <li
                v-for="(issue, index) in generationResult.validation.issues"
                :key="index"
                :class="{
                  'text-red-600': issue.type === 'error',
                  'text-orange-600': issue.type === 'warning',
                }"
              >
                {{ issue.type === 'error' ? '❌' : '⚠️' }} {{ issue.message }}
              </li>
            </ul>
          </div>
        </el-alert>

        <div class="grid grid-cols-3 gap-4">
          <div class="rounded-lg bg-blue-50 p-4 text-center">
            <div class="text-2xl font-bold text-blue-600">
              {{ codeStats.lines }}
            </div>
            <div class="text-sm text-gray-600">代码行数</div>
          </div>
          <div class="rounded-lg bg-green-50 p-4 text-center">
            <div class="text-2xl font-bold text-green-600">
              {{ codeStats.components }}
            </div>
            <div class="text-sm text-gray-600">组件数量</div>
          </div>
          <div class="rounded-lg bg-purple-50 p-4 text-center">
            <div class="text-2xl font-bold text-purple-600">
              {{ codeStats.apis }}
            </div>
            <div class="text-sm text-gray-600">API 接口</div>
          </div>
        </div>

        <!-- 代码预览(折叠) -->
        <el-collapse>
          <el-collapse-item v-if="generationResult?.prompt" title="查看 AI 提示词" name="prompt">
            <div class="mb-3 flex items-center justify-between text-xs text-gray-500">
              <span>这是本次 AI 调用使用的完整提示词</span>
              <el-button
                size="small"
                type="primary"
                :icon="CopyDocument"
                link
                @click="handleCopyPrompt"
              >
                复制提示词
              </el-button>
            </div>
            <pre
              class="prompt-preview max-h-96 overflow-auto rounded-lg bg-gray-900 p-4 text-xs leading-relaxed text-gray-100"
            ><code>{{ generationResult.prompt }}</code></pre>
          </el-collapse-item>
          <el-collapse-item title="查看代码" name="code">
            <pre
              class="code-preview rounded-lg bg-gray-900 p-4 text-gray-100 overflow-auto max-h-96"
            ><code>{{ editorStore.generatedCode }}</code></pre>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>

    <!-- 代码预览对话框 -->
    <CodePreviewDialog v-model:visible="showPreviewDialog" :code="editorStore.generatedCode" />
    <el-card shadow="never" class="mt-6">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="font-semibold text-gray-700">附加提示词</span>
          <el-tag size="small" type="info">可选</el-tag>
        </div>
      </template>
      <el-input
        v-model="customPromptText"
        type="textarea"
        :rows="4"
        maxlength="1000"
        show-word-limit
        placeholder="输入你想额外告诉 AI 的需求，例如代码风格、命名规范或特殊业务规则。"
      />
      <div class="mt-2 text-xs text-gray-500">
        这些提示会拼接到系统构建的 Prompt 末尾，用于指导 AI 生成更符合预期的代码。
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import {
  DocumentAdd,
  MagicStick,
  Loading,
  CircleCheck,
  View,
  CopyDocument,
  Download,
  Refresh,
} from '@element-plus/icons-vue'
import { useEditorStore } from '../stores/editorStore'
import { generateCode } from '../services/codeGenerator'
import CodePreviewDialog from './CodePreviewDialog.vue'

const emit = defineEmits(['request-ai-config'])

const editorStore = useEditorStore()
const generating = ref(false)
const showPreviewDialog = ref(false)
const generationStatus = ref([])

const generationResult = ref(null)

const customPromptText = computed({
  get: () => editorStore.customPrompt,
  set: val => editorStore.setCustomPrompt(val),
})

// 代码统计
const codeStats = computed(() => {
  const code = editorStore.generatedCode
  return {
    lines: code ? code.split('\n').length : 0,
    components:
      (editorStore.slots.searchArea?.length || 0) +
      (editorStore.slots.actionArea?.length || 0) +
      (editorStore.slots.tableColumns?.length || 0),
    apis: editorStore.apiConfigs?.length || 0,
  }
})

/**
 * 生成代码
 */
async function handleGenerate() {
  // 检查 AI 配置
  if (!editorStore.aiConfig.baseUrl || !editorStore.aiConfig.apiKey) {
    ElMessage.error('请先配置 AI 模型（Base URL + API Key）')
    emit('request-ai-config')
    return
  }

  if (!editorStore.selectedTemplate?.id) {
    ElMessage.error('请先选择页面模板')
    return
  }

  generating.value = true
  generationResult.value = null
  generationStatus.value = [
    { text: '正在构建 AI Prompt...', done: false },
    { text: '正在调用 AI 模型生成代码...', done: false },
    { text: '正在验证代码...', done: false },
  ]

  try {
    // Step 1: 构建 Prompt
    generationStatus.value[0].done = true
    await new Promise(resolve => setTimeout(resolve, 300))

    // 构建配置
    const config = {
      templateId: editorStore.selectedTemplate.id,
      pageName: editorStore.pageInfo.pageName,
      description: editorStore.pageInfo.title,
      pageInfo: editorStore.pageInfo,
      breadcrumb: editorStore.pageInfo.breadcrumb,
      apiConfigs: editorStore.apiConfigs,
      aiConfig: editorStore.aiConfig,
      slots: editorStore.slots,
      customPrompt: customPromptText.value,
      pagination: {
        enabled: true,
        pageNoField: 'pageNo',
        pageSizeField: 'pageSize',
        pageSizes: [10, 20, 50, 100],
      },
    }

    // Step 2: 生成代码
    const result = await generateCode(config, { useAI: true })
    generationStatus.value[1].done = true
    await new Promise(resolve => setTimeout(resolve, 300))

    // Step 3: 验证代码
    generationStatus.value[2].done = true
    generationResult.value = result

    if (result.success) {
      editorStore.setGeneratedCode(result.code)

      // 显示生成结果
      if (result.method === 'ai') {
        ElMessage.success({
          message: '✨ AI 代码生成成功！',
          duration: 3000,
        })
      } else if (result.method === 'template') {
        ElMessage.warning({
          message: '⚠️ 使用模板生成（AI 生成失败）',
          duration: 3000,
        })
      }

      // 显示验证警告
      if (result.validation && result.validation.issues.length > 0) {
        const warnings = result.validation.issues.filter(i => i.type === 'warning')
        if (warnings.length > 0) {
          console.warn('Code validation warnings:', warnings)
        }
      }
    } else {
      throw new Error(result.error)
    }
  } catch (error) {
    console.error('Code generation failed:', error)
    ElMessage.error({
      message: '❌ 代码生成失败: ' + error.message,
      duration: 5000,
    })
  } finally {
    generating.value = false
  }
}

/**
 * 重新生成
 */
function handleRegenerate() {
  editorStore.setGeneratedCode('')
  handleGenerate()
}

/**
 * 复制代码
 */
async function handleCopyCode() {
  try {
    await navigator.clipboard.writeText(editorStore.generatedCode)
    ElMessage.success('代码已复制到剪贴板')
  } catch (error) {
    console.error('Copy code failed:', error)
    ElMessage.error('复制失败')
  }
}

/**
 * 复制提示词
 */
async function handleCopyPrompt() {
  if (!generationResult.value?.prompt) {
    return
  }
  try {
    await navigator.clipboard.writeText(generationResult.value.prompt)
    ElMessage.success('提示词已复制')
  } catch (error) {
    console.error('Copy prompt failed:', error)
    ElMessage.error('复制失败')
  }
}

/**
 * 下载代码
 */
function handleDownloadCode() {
  const blob = new Blob([editorStore.generatedCode], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${editorStore.pageInfo.pageName || 'Page'}.vue`
  a.click()
  URL.revokeObjectURL(url)
  ElMessage.success('代码已下载')
}
</script>

<style scoped>
.prompt-preview {
  font-family: 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace;
}
</style>
