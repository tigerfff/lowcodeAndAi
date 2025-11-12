<template>
  <div class="ai-chat-panel flex h-full flex-col rounded-lg bg-white shadow-sm">
    <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">AI 对话助手</h3>
        <p class="text-xs text-gray-500">与当前模型即时交流，获取代码指导或问题解答</p>
      </div>
      <div class="flex items-center gap-2">
        <el-button
          size="small"
          text
          type="primary"
          :disabled="editorStore.chatMessages.length === 0 || sending"
          @click="handleClear"
        >
          清空对话
        </el-button>
      </div>
    </div>

    <el-scrollbar ref="messageScroll" class="flex-1 overflow-hidden px-6 py-6">
      <div class="space-y-6">
        <div
          v-if="editorStore.chatMessages.length === 0"
          class="flex h-64 flex-col items-center justify-center text-sm text-gray-400"
        >
          <el-icon :size="48" class="mb-4 text-gray-300">
            <ChatLineRound />
          </el-icon>
          <p class="mb-1">开始输入问题，AI 将帮助你生成代码或分析需求</p>
          <p>例如：“根据当前 API 帮我生成表格列配置”</p>
        </div>

        <template v-else>
          <div
            v-for="(message, index) in editorStore.chatMessages"
            :key="message.createdAt + index"
            :class="['flex w-full', message.role === 'user' ? 'justify-end' : 'justify-start']"
          >
            <div class="max-w-[70%] space-y-2">
              <div
                v-if="
                  (message.attachments && message.attachments.length > 0) ||
                  (message.images && message.images.length > 0)
                "
                :class="[
                  'flex flex-wrap gap-2',
                  message.role === 'user' ? 'justify-end' : 'justify-start',
                ]"
              >
                <div
                  v-for="file in message.attachments || message.images"
                  :key="file.uid || file.url || file.dataUrl"
                  class="attachment-thumb overflow-hidden rounded-lg border border-gray-200"
                >
                  <img
                    :src="file.dataUrl || file.url"
                    :alt="file.name || 'image'"
                    class="h-32 w-32 object-cover"
                  />
                </div>
              </div>
              <div
                v-if="message.text || message.content"
                :class="[
                  'rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm',
                  message.role === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800',
                ]"
              >
                <div class="whitespace-pre-wrap break-words">
                  {{ message.text || message.content }}
                </div>
              </div>
              <div class="mt-1 text-right text-xs text-gray-400">
                {{ formatTimestamp(message.createdAt) }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </el-scrollbar>

    <div class="border-t border-gray-100 px-6 py-4">
      <el-form @submit.prevent>
        <el-form-item class="mb-2">
          <el-input
            v-model="draftMessage"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6 }"
            maxlength="1000"
            show-word-limit
            placeholder="向 AI 描述你的问题或需求..."
            @keydown.enter.exact.prevent="handleSend"
          />
        </el-form-item>
        <div
          v-if="pendingAttachments.length > 0"
          class="mb-3 flex flex-wrap gap-2 text-xs text-gray-500"
        >
          <div
            v-for="file in pendingAttachments"
            :key="file.uid"
            class="relative overflow-hidden rounded-lg border border-gray-200"
          >
            <img :src="file.dataUrl" :alt="file.name" class="h-20 w-20 object-cover" />
            <el-button
              class="attachment-remove"
              type="danger"
              size="small"
              circle
              @click="removeAttachment(file.uid)"
            >
              ×
            </el-button>
          </div>
        </div>
        <div class="flex items-center justify-between text-xs text-gray-400">
          <div class="flex items-center gap-3">
            <el-button
              text
              type="primary"
              :icon="Picture"
              :disabled="sending"
              @click="triggerImageSelect"
            >
              上传图片
            </el-button>
            <el-tooltip
              effect="dark"
              placement="top"
              content="可直接输入模型名称，例如 qwen3-vl-plus"
            >
              <el-input
                v-model="modelValue"
                placeholder="输入模型 ID，如 qwen3-vl-plus"
                class="w-56"
                size="small"
                clearable
                @blur="handleModelBlur"
                @keyup.enter="handleModelCommit"
              />
            </el-tooltip>
            <span class="text-gray-500">当前模型：{{ editorStore.aiConfig.model }}</span>
          </div>
          <div class="flex items-center gap-2">
            <el-button text type="primary" @click="emit('request-ai-config')"> 模型设置 </el-button>
            <el-button
              type="primary"
              :loading="sending"
              :disabled="
                (draftMessage.trim().length === 0 && pendingAttachments.length === 0) || sending
              "
              @click="handleSend"
            >
              发送
            </el-button>
          </div>
        </div>
      </el-form>
    </div>
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      multiple
      class="hidden"
      @change="handleFileSelect"
    />
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { ChatLineRound, Picture } from '@element-plus/icons-vue'
import { useEditorStore } from '../stores/editorStore'
import { sendChatMessages } from '../services/aiService'

const emit = defineEmits(['request-ai-config'])

const editorStore = useEditorStore()
const draftMessage = ref('')
const sending = ref(false)
const messageScroll = ref(null)
const pendingAttachments = ref([])
const fileInput = ref(null)
const modelValue = ref(editorStore.aiConfig.model || '')

const systemPrompt = computed(() => {
  const templateLabel = editorStore.selectedTemplate?.label || '通用页面'
  const apiCount = editorStore.apiConfigs.length
  return `你是一名资深的前端工程师，擅长基于 Vue3 + Element Plus + hui-pro 体系进行页面设计和代码生成。

当前项目背景：
- 页面模板：${templateLabel}
- 已配置组件数量：${editorStore.slots.searchArea.length + editorStore.slots.actionArea.length + editorStore.slots.tableColumns.length}
- API 接口数量：${apiCount}

请结合这些信息提供专业、实用的建议或代码示例。必要时可以使用列表、代码块等格式化输出，但要保持回答简洁明确。`
})

watch(
  () => editorStore.chatMessages.length,
  async () => {
    await nextTick()
    scrollToBottom()
  }
)

watch(
  () => editorStore.aiConfig.model,
  newModel => {
    if (newModel !== modelValue.value) {
      modelValue.value = newModel || ''
    }
  }
)

function scrollToBottom() {
  const wrap = messageScroll.value?.wrapRef
  if (wrap) {
    wrap.scrollTo({ top: wrap.scrollHeight, behavior: 'smooth' })
  }
}

function formatTimestamp(timestamp) {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`
}

async function handleSend() {
  const text = draftMessage.value.trim()
  if (!text && pendingAttachments.value.length === 0) return

  if (!editorStore.aiConfig.baseUrl || !editorStore.aiConfig.apiKey) {
    ElMessage.error('请先配置 AI 模型（Base URL + API Key）')
    emit('request-ai-config')
    return
  }

  const attachmentsSnapshot = pendingAttachments.value.map(file => ({ ...file }))

  const userMessage = {
    role: 'user',
    text,
    attachments: attachmentsSnapshot,
    createdAt: Date.now(),
  }

  editorStore.appendChatMessage(userMessage)
  draftMessage.value = ''
  pendingAttachments.value = []
  sending.value = true

  try {
    const messages = [
      { role: 'system', content: [{ type: 'text', text: systemPrompt.value }] },
      ...editorStore.chatMessages.map(convertMessageToPayload),
    ]

    const reply = await sendChatMessages({
      messages,
      aiConfig: editorStore.aiConfig,
    })

    let replyText = ''
    if (Array.isArray(reply)) {
      replyText = reply
        .map(item => {
          if (typeof item === 'string') return item
          if (item && typeof item === 'object') {
            return item.text || item.content || ''
          }
          return ''
        })
        .filter(Boolean)
        .join('\n')
    } else if (typeof reply === 'string') {
      replyText = reply
    } else if (reply && typeof reply === 'object') {
      try {
        replyText = JSON.stringify(reply)
      } catch {
        replyText = '[无法解析的响应]'
      }
    }

    editorStore.appendChatMessage({
      role: 'assistant',
      text: replyText,
      createdAt: Date.now(),
    })
  } catch (error) {
    ElMessage.error(error.message || '对话请求失败，请稍后重试')
  } finally {
    sending.value = false
  }
}

function handleClear() {
  editorStore.clearChatMessages()
  pendingAttachments.value = []
}

function handleModelBlur() {
  const trimmed = modelValue.value.trim()
  if (trimmed && trimmed !== editorStore.aiConfig.model) {
    editorStore.updateAiConfig({ model: trimmed })
  } else if (!trimmed && editorStore.aiConfig.model) {
    modelValue.value = editorStore.aiConfig.model
  }
}

function handleModelCommit() {
  handleModelBlur()
}

function triggerImageSelect() {
  fileInput.value?.click()
}

function handleFileSelect(event) {
  const files = Array.from(event.target.files || [])
  if (files.length === 0) return

  files.forEach(file => {
    if (!file.type.startsWith('image/')) {
      ElMessage.error('仅支持图片格式')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      pendingAttachments.value.push({
        uid: `${file.name}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name: file.name,
        type: file.type,
        dataUrl: reader.result,
      })
    }
    reader.readAsDataURL(file)
  })

  event.target.value = ''
}

function removeAttachment(uid) {
  pendingAttachments.value = pendingAttachments.value.filter(file => file.uid !== uid)
}

function convertMessageToPayload(message) {
  const parts = []
  if (message.attachments && message.attachments.length > 0) {
    message.attachments.forEach(file => {
      parts.push({
        type: 'image_url',
        image_url: {
          url: file.dataUrl || file.url,
        },
      })
    })
  } else if (message.images && message.images.length > 0) {
    message.images.forEach(file => {
      parts.push({
        type: 'image_url',
        image_url: {
          url: file.dataUrl || file.url,
        },
      })
    })
  }

  const textContent = message.text || message.content
  if (textContent) {
    parts.push({
      type: 'text',
      text: textContent,
    })
  }

  if (parts.length === 0) {
    parts.push({
      type: 'text',
      text: '',
    })
  }

  return {
    role: message.role,
    content: parts,
  }
}
</script>

<style scoped>
.ai-chat-panel {
  min-height: 100%;
}

.ai-chat-panel :deep(.el-textarea__inner) {
  font-size: 0.875rem;
}

.attachment-thumb img {
  display: block;
}

.attachment-remove {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  padding: 0;
}
</style>
