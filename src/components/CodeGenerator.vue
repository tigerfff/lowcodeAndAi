<template>
  <div class="code-generator">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900">生成代码</h2>
      <p class="mt-1 text-sm text-gray-500">AI 将自动推断配置并生成高质量的 Vue 代码</p>
    </div>

    <el-card v-if="!generatedCode && !generating" shadow="never" class="mb-6">
      <div class="text-center py-12">
        <i class="el-icon-document-add text-gray-300 mb-4" style="font-size: 64px"></i>
        <p class="text-gray-500 mb-6">点击下方按钮开始生成代码</p>
        <el-button type="primary" size="large" icon="el-icon-magic-stick" @click="handleGenerate">
          开始生成
        </el-button>
      </div>
    </el-card>

    <el-card v-if="generating" shadow="never" class="mb-6">
      <div class="text-center py-12">
        <i class="el-icon-loading text-blue-500 mb-4" style="font-size: 64px"></i>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">AI 正在生成代码...</h3>
        <div class="space-y-2 text-sm text-gray-600">
          <p v-for="(status, index) in generationStatus" :key="index">
            <i
              :class="[status.done ? 'el-icon-circle-check text-green-500' : 'el-icon-loading']"
              class="mr-1"
            ></i>
            {{ status.text }}
          </p>
        </div>
      </div>
    </el-card>

    <el-card v-if="generatedCode" shadow="never">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i class="el-icon-circle-check text-green-500"></i>
            <span class="font-semibold">代码生成成功</span>
          </div>
          <div class="flex gap-2">
            <el-button icon="el-icon-view" @click="showLivePreview = true"> 在线预览 </el-button>
            <el-button icon="el-icon-document" @click="showPreviewDialog = true"> 查看代码 </el-button>
            <el-button icon="el-icon-document-copy" @click="handleCopyCode"> 复制代码 </el-button>
            <el-button icon="el-icon-download" @click="handleDownloadCode"> 下载文件 </el-button>
            <el-button icon="el-icon-refresh" type="warning" @click="handleRegenerate">
              重新生成
            </el-button>
          </div>
        </div>
      </template>

      <div class="space-y-4">
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

        <el-collapse>
          <el-collapse-item v-if="generationResult?.prompt" title="查看 AI 提示词" name="prompt">
            <div class="mb-3 flex items-center justify-between text-xs text-gray-500">
              <span>这是本次 AI 调用使用的完整提示词</span>
              <el-button
                size="small"
                type="text"
                icon="el-icon-document-copy"
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
            ><code>{{ generatedCode }}</code></pre>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>

    <CodePreviewDialog v-model="showPreviewDialog" :code="generatedCode" />
    <LivePreviewDialog v-model="showLivePreview" :code="generatedCode" />

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

<script>
import { Message } from 'element-ui'
import { mapActions, mapState } from 'vuex'
import { generateCode } from '../services/codeGenerator'
import CodePreviewDialog from './CodePreviewDialog.vue'
import LivePreviewDialog from './LivePreviewDialog.vue'

export default {
  name: 'CodeGenerator',
  components: {
    CodePreviewDialog,
    LivePreviewDialog,
  },
  emits: ['request-ai-config'],
  data() {
    return {
      generating: false,
      showPreviewDialog: false,
      showLivePreview: false,
      generationStatus: [],
      generationResult: null,
    }
  },
  computed: {
    ...mapState('editor', [
      'generatedCode',
      'slots',
      'apiConfigs',
      'customPrompt',
      'aiConfig',
      'pageInfo',
      'selectedTemplate',
    ]),
    codeStats() {
      const code = this.generatedCode
      return {
        lines: code ? code.split('\n').length : 0,
        components:
          (this.slots.searchArea?.length || 0) +
          (this.slots.actionArea?.length || 0) +
          (this.slots.tableColumns?.length || 0),
        apis: this.apiConfigs?.length || 0,
      }
    },
    customPromptText: {
      get() {
        return this.customPrompt
      },
      set(val) {
        this.setCustomPrompt(val)
      },
    },
  },
  methods: {
    ...mapActions('editor', ['setGeneratedCode', 'setCustomPrompt']),
    async handleGenerate() {
      if (!this.aiConfig.baseUrl || !this.aiConfig.apiKey) {
        Message.error('请先配置 AI 模型（Base URL + API Key）')
        this.$emit('request-ai-config')
        return
      }

      if (!this.selectedTemplate?.id) {
        Message.error('请先选择页面模板')
        return
      }

      this.generating = true
      this.generationResult = null
      this.generationStatus = [
        { text: '正在构建 AI Prompt...', done: false },
        { text: '正在调用 AI 模型生成代码...', done: false },
        { text: '正在验证代码...', done: false },
      ]

      try {
        this.generationStatus[0].done = true
        await new Promise(resolve => setTimeout(resolve, 300))

        const config = {
          templateId: this.selectedTemplate.id,
          pageName: this.pageInfo.pageName,
          description: this.pageInfo.title,
          pageInfo: this.pageInfo,
          breadcrumb: this.pageInfo.breadcrumb,
          apiConfigs: this.apiConfigs,
          aiConfig: this.aiConfig,
          slots: this.slots,
          customPrompt: this.customPromptText,
          pagination: {
            enabled: true,
            pageNoField: 'pageNo',
            pageSizeField: 'pageSize',
            pageSizes: [10, 20, 50, 100],
          },
        }

        const result = await generateCode(config, { useAI: true })
        this.generationStatus[1].done = true
        await new Promise(resolve => setTimeout(resolve, 300))

        this.generationStatus[2].done = true
        this.generationResult = result

        if (result.success) {
          this.setGeneratedCode(result.code)

          if (result.method === 'ai') {
            Message.success({ message: '✨ AI 代码生成成功！', duration: 3000 })
          } else if (result.method === 'template') {
            Message.warning({ message: '⚠️ 使用模板生成（AI 生成失败）', duration: 3000 })
          }

          if (result.validation && result.validation.issues.length > 0) {
            const warnings = result.validation.issues.filter(issue => issue.type === 'warning')
            if (warnings.length > 0) {
              console.warn('Code validation warnings:', warnings)
            }
          }
        } else {
          throw new Error(result.error)
        }
      } catch (error) {
        console.error('Code generation failed:', error)
        Message.error({
          message: '❌ 代码生成失败: ' + error.message,
          duration: 5000,
        })
      } finally {
        this.generating = false
      }
    },
    handleRegenerate() {
      this.setGeneratedCode('')
      this.handleGenerate()
    },
    async handleCopyCode() {
      try {
        await navigator.clipboard.writeText(this.generatedCode)
        Message.success('代码已复制到剪贴板')
      } catch (error) {
        console.error('Copy code failed:', error)
        Message.error('复制失败')
      }
    },
    async handleCopyPrompt() {
      if (!this.generationResult?.prompt) return
      try {
        await navigator.clipboard.writeText(this.generationResult.prompt)
        Message.success('提示词已复制')
      } catch (error) {
        console.error('Copy prompt failed:', error)
        Message.error('复制失败')
      }
    },
    handleDownloadCode() {
      const blob = new Blob([this.generatedCode], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${this.pageInfo.pageName || 'Page'}.vue`
      a.click()
      URL.revokeObjectURL(url)
      Message.success('代码已下载')
    },
  },
}
</script>

<style scoped>
.prompt-preview {
  font-family: 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace;
}
</style>
