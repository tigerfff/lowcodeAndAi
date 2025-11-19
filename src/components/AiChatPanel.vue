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
          type="text"
          :disabled="chatMessages.length === 0 || sending"
          @click="handleClear"
        >
          清空对话
        </el-button>
      </div>
    </div>

    <el-scrollbar ref="messageScroll" class="flex-1 overflow-hidden px-6 py-6">
      <div class="space-y-6">
        <div
          v-if="chatMessages.length === 0"
          class="flex h-64 flex-col items-center justify-center text-sm text-gray-400"
        >
          <i class="el-icon-chat-dot-square mb-4" style="font-size: 48px"></i>
          <p class="mb-1">开始输入问题，AI 将帮助你生成代码或分析需求</p>
          <p>例如：“根据当前 API 帮我生成表格列配置”</p>
        </div>

        <template v-else>
          <div
            v-for="(message, index) in chatMessages"
            :key="message.createdAt + '-' + index"
            :class="['flex w-full', message.role === 'user' ? 'justify-end' : 'justify-start']"
          >
            <div class="max-w-[70%] space-y-2">
              <div
                v-if="message.attachments && message.attachments.length"
                class="flex flex-wrap gap-2"
              >
                <div
                  v-for="file in message.attachments"
                  :key="file.uid || file.dataUrl || file.url"
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
                v-if="message.text"
                :class="[
                  'rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm whitespace-pre-wrap break-words',
                  message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800',
                ]"
              >
                {{ message.text }}
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
          v-if="pendingAttachments.length"
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
              size="mini"
              circle
              icon="el-icon-close"
              @click="removeAttachment(file.uid)"
            ></el-button>
          </div>
        </div>
        <div class="flex items-center justify-between text-xs text-gray-400">
          <div class="flex items-center gap-3">
            <el-button
              type="text"
              icon="el-icon-picture"
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
            <span class="text-gray-500">当前模型：{{ aiConfig.model }}</span>
          </div>
          <div class="flex items-center gap-2">
            <el-button type="text" @click="$emit('request-ai-config')">模型设置</el-button>
            <el-button
              type="primary"
              :loading="sending"
              :disabled="(!draftMessage.trim() && pendingAttachments.length === 0) || sending"
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

<script>
import { Message } from 'element-ui'
import { mapActions, mapState } from 'vuex'
import { sendChatMessages } from '../services/aiService'

export default {
  name: 'AiChatPanel',
  data() {
    return {
      draftMessage: '',
      sending: false,
      pendingAttachments: [],
      modelValue: '',
    }
  },
  computed: {
    ...mapState('editor', ['chatMessages', 'aiConfig', 'selectedTemplate', 'slots', 'apiConfigs']),
  },
  watch: {
    chatMessages: {
      handler() {
        this.$nextTick(() => {
          const wrap = this.$refs.messageScroll && this.$refs.messageScroll.wrap
          if (wrap) {
            wrap.scrollTo({ top: wrap.scrollHeight, behavior: 'smooth' })
          }
        })
      },
      deep: true,
    },
    'aiConfig.model'(val) {
      if (!this.sending) {
        this.modelValue = val || ''
      }
    },
  },
  created() {
    this.modelValue = this.aiConfig.model || ''
  },
  methods: {
    ...mapActions('editor', ['appendChatMessage', 'clearChatMessages']),
    formatTimestamp(timestamp) {
      if (!timestamp) return ''
      const date = new Date(timestamp)
      return `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`
    },
    handleClear() {
      this.clearChatMessages()
      this.pendingAttachments = []
    },
    triggerImageSelect() {
      this.$refs.fileInput && this.$refs.fileInput.click()
    },
    handleFileSelect(event) {
      const files = Array.from(event.target.files || [])
      if (!files.length) return
      files.forEach(file => {
        if (!file.type.startsWith('image/')) {
          Message.error('仅支持图片格式')
          return
        }
        const reader = new FileReader()
        reader.onload = () => {
          this.pendingAttachments.push({
            uid: `${file.name}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            name: file.name,
            type: file.type,
            dataUrl: reader.result,
          })
        }
        reader.readAsDataURL(file)
      })
      event.target.value = ''
    },
    removeAttachment(uid) {
      this.pendingAttachments = this.pendingAttachments.filter(file => file.uid !== uid)
    },
    handleModelBlur() {
      const trimmed = (this.modelValue || '').trim()
      if (trimmed && trimmed !== this.aiConfig.model) {
        this.$store.dispatch('editor/updateAiConfig', { model: trimmed })
      } else if (!trimmed && this.aiConfig.model) {
        this.modelValue = this.aiConfig.model
      }
    },
    handleModelCommit() {
      this.handleModelBlur()
    },
    async handleSend() {
      const text = this.draftMessage.trim()
      if (!text && this.pendingAttachments.length === 0) return

      if (!this.aiConfig.baseUrl || !this.aiConfig.apiKey) {
        Message.error('请先配置 AI 模型（Base URL + API Key）')
        this.$emit('request-ai-config')
        return
      }

      const attachmentsSnapshot = this.pendingAttachments.map(file => ({ ...file }))

      this.appendChatMessage({
        role: 'user',
        text,
        attachments: attachmentsSnapshot,
        createdAt: Date.now(),
      })

      this.draftMessage = ''
      this.pendingAttachments = []
      this.sending = true

      try {
        const systemPrompt = `你是一名资深的前端工程师，擅长基于 Vue2 + Element UI 体系进行页面设计和代码生成。当前模板：${
          this.selectedTemplate?.label || '通用页面'
        }；组件数量：${
          (this.slots.searchArea?.length || 0) +
          (this.slots.actionArea?.length || 0) +
          (this.slots.tableColumns?.length || 0)
        }；API 数量：${this.apiConfigs.length}`

        const messages = [
          {
            role: 'system',
            content: [{ type: 'text', text: systemPrompt }],
          },
          ...this.chatMessages.map(message => this.convertMessageToPayload(message)),
        ]

        const reply = await sendChatMessages({
          messages,
          aiConfig: { ...this.aiConfig, model: this.modelValue || this.aiConfig.model },
        })

        let replyText = ''
        if (Array.isArray(reply)) {
          replyText = reply
            .map(item => (typeof item === 'string' ? item : item?.text || item?.content || ''))
            .filter(Boolean)
            .join('\n')
        } else if (typeof reply === 'string') {
          replyText = reply
        } else if (reply && typeof reply === 'object') {
          replyText = JSON.stringify(reply)
        }

        this.appendChatMessage({
          role: 'assistant',
          text: replyText,
          attachments: [],
          createdAt: Date.now(),
        })
      } catch (error) {
        Message.error(error.message || '对话请求失败，请稍后重试')
      } finally {
        this.sending = false
      }
    },
    convertMessageToPayload(message) {
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
      }
      if (message.text) {
        parts.push({
          type: 'text',
          text: message.text,
        })
      }
      if (parts.length === 0) {
        parts.push({ type: 'text', text: '' })
      }
      return {
        role: message.role,
        content: parts,
      }
    },
  },
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
