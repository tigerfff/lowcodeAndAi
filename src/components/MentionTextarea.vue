<template>
  <div class="mention-textarea-wrapper" :style="{ position: 'relative' }">
    <textarea
      ref="textarea"
      :value="value"
      class="mention-textarea"
      :placeholder="placeholder"
      @input="handleInput"
      @keydown="handleKeydown"
      @blur="handleBlur"
      @focus="handleFocus"
      @scroll="handleScroll"
    ></textarea>

    <!-- Mention 下拉菜单 -->
    <div v-if="showMentionMenu" class="mention-menu" :style="mentionMenuStyle">
      <!-- 菜单标题 -->
      <div class="mention-menu-header">
        <span class="mention-menu-icon">{{ mentionTypeIcon }}</span>
        <span class="mention-menu-title">{{ mentionTypeTitle }}</span>
      </div>

      <!-- 菜单项列表 -->
      <div
        v-for="(item, index) in filteredMentionItems"
        :key="item.name || item.id"
        :class="['mention-menu-item', { active: index === selectedMentionIndex }]"
        @click="selectMentionItem(item)"
        @mouseenter="selectedMentionIndex = index"
      >
        <!-- 组件类型 -->
        <template v-if="mentionType === 'component'">
          <div class="mention-item-name">
            {{ item.friendlyName }}
            <span v-if="item.id" class="mention-item-id">#{{ getShortId(item.id) }}</span>
          </div>
          <div class="mention-item-desc">{{ item.component }}</div>
        </template>

        <!-- 工具函数类型 -->
        <template v-else-if="mentionType === 'util'">
          <div class="mention-item-name">
            <span class="mention-item-prefix">$</span>{{ item.name }}
          </div>
          <div class="mention-item-desc">{{ item.description }}</div>
        </template>

        <!-- 校验规则类型 -->
        <template v-else-if="mentionType === 'validator'">
          <div class="mention-item-name">
            <span class="mention-item-prefix">!</span>{{ item.name }}
          </div>
          <div class="mention-item-desc">{{ item.description }}</div>
        </template>
      </div>

      <div v-if="filteredMentionItems.length === 0" class="mention-menu-empty">
        没有匹配的{{ mentionTypeTitle }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MentionTextarea',
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    // 组件列表（@）
    mentionItems: {
      type: Array,
      default: () => [],
    },
    // 工具函数列表（$）
    utilsItems: {
      type: Array,
      default: () => [],
    },
    // 校验规则列表（!）
    validatorsItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showMentionMenu: false,
      mentionMenuStyle: {},
      selectedMentionIndex: 0,
      mentionQuery: '',
      mentionStartPos: 0,
      mentionType: 'component', // 'component' | 'util' | 'validator'
      triggerChar: '@', // '@' | '$' | '!'
    }
  },
  computed: {
    /**
     * 当前 mention 类型的所有项
     */
    currentMentionItems() {
      switch (this.mentionType) {
        case 'component':
          return this.mentionItems
        case 'util':
          return this.utilsItems
        case 'validator':
          return this.validatorsItems
        default:
          return []
      }
    },

    /**
     * 过滤后的 mention 项
     */
    filteredMentionItems() {
      if (!this.mentionQuery) {
        return this.currentMentionItems
      }

      const query = this.mentionQuery.toLowerCase()

      return this.currentMentionItems.filter(item => {
        if (this.mentionType === 'component') {
          return (
            item.friendlyName?.toLowerCase().includes(query) ||
            item.component?.toLowerCase().includes(query)
          )
        } else {
          // util 或 validator
          return (
            item.name?.toLowerCase().includes(query) ||
            item.label?.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query)
          )
        }
      })
    },

    /**
     * Mention 类型的图标
     */
    mentionTypeIcon() {
      switch (this.mentionType) {
        case 'component':
          return '🔹'
        case 'util':
          return '🛠️'
        case 'validator':
          return '✅'
        default:
          return ''
      }
    },

    /**
     * Mention 类型的标题
     */
    mentionTypeTitle() {
      switch (this.mentionType) {
        case 'component':
          return '组件'
        case 'util':
          return '工具函数'
        case 'validator':
          return '校验规则'
        default:
          return ''
      }
    },
  },
  methods: {
    /**
     * 检测触发字符（@, $, !）
     */
    detectTriggerChar(textBeforeCursor) {
      const triggers = [
        { char: '@', type: 'component' },
        { char: '$', type: 'util' },
        { char: '!', type: 'validator' },
      ]

      // 找到最后一个触发字符
      let lastTrigger = null
      let lastIndex = -1

      triggers.forEach(trigger => {
        const index = textBeforeCursor.lastIndexOf(trigger.char)
        if (index > lastIndex) {
          lastIndex = index
          lastTrigger = trigger
        }
      })

      return lastTrigger ? { ...lastTrigger, index: lastIndex } : null
    },

    handleInput(event) {
      const value = event.target.value
      const cursorPos = event.target.selectionStart
      const textBeforeCursor = value.substring(0, cursorPos)

      // 检测触发字符
      const trigger = this.detectTriggerChar(textBeforeCursor)

      if (trigger) {
        // 检查触发字符后面是否有空格或换行，如果有则关闭菜单
        const textAfterTrigger = textBeforeCursor.substring(trigger.index + 1)
        if (textAfterTrigger.includes(' ') || textAfterTrigger.includes('\n')) {
          this.showMentionMenu = false
        } else {
          // 显示 mention 菜单
          this.triggerChar = trigger.char
          this.mentionType = trigger.type
          this.mentionQuery = textAfterTrigger
          this.mentionStartPos = trigger.index
          this.showMentionMenu = true
          this.selectedMentionIndex = 0
          this.updateMentionMenuPosition(event.target, cursorPos)
        }
      } else {
        this.showMentionMenu = false
      }

      this.$emit('input', value)
    },

    handleKeydown(event) {
      if (this.showMentionMenu) {
        if (event.key === 'ArrowDown') {
          event.preventDefault()
          this.selectedMentionIndex = Math.min(
            this.selectedMentionIndex + 1,
            this.filteredMentionItems.length - 1
          )
        } else if (event.key === 'ArrowUp') {
          event.preventDefault()
          this.selectedMentionIndex = Math.max(this.selectedMentionIndex - 1, 0)
        } else if (event.key === 'Enter' || event.key === 'Tab') {
          event.preventDefault()
          if (this.filteredMentionItems.length > 0) {
            this.selectMentionItem(this.filteredMentionItems[this.selectedMentionIndex])
          }
        } else if (event.key === 'Escape') {
          this.showMentionMenu = false
        }
      }
    },

    handleBlur() {
      // 延迟关闭，以便点击菜单项时能触发
      setTimeout(() => {
        this.showMentionMenu = false
      }, 200)
    },

    handleFocus() {
      // 如果光标位置有触发字符，显示菜单
      const textarea = this.$refs.textarea
      if (textarea) {
        const cursorPos = textarea.selectionStart
        const textBeforeCursor = this.value.substring(0, cursorPos)
        const trigger = this.detectTriggerChar(textBeforeCursor)

        if (trigger) {
          const textAfterTrigger = textBeforeCursor.substring(trigger.index + 1)
          if (!textAfterTrigger.includes(' ') && !textAfterTrigger.includes('\n')) {
            this.triggerChar = trigger.char
            this.mentionType = trigger.type
            this.mentionQuery = textAfterTrigger
            this.mentionStartPos = trigger.index
            this.showMentionMenu = true
            this.selectedMentionIndex = 0
            this.$nextTick(() => {
              this.updateMentionMenuPosition(textarea, cursorPos)
            })
          }
        }
      }
    },

    handleScroll() {
      // 滚动时更新菜单位置
      if (this.showMentionMenu) {
        const textarea = this.$refs.textarea
        if (textarea) {
          const cursorPos = textarea.selectionStart
          this.updateMentionMenuPosition(textarea, cursorPos)
        }
      }
    },

    updateMentionMenuPosition(textarea, cursorPos) {
      // 计算触发字符的位置
      const textBeforeCursor = this.value.substring(0, cursorPos)
      const trigger = this.detectTriggerChar(textBeforeCursor)
      if (!trigger) return

      // 获取 textarea 的位置和样式
      const rect = textarea.getBoundingClientRect()
      const style = window.getComputedStyle(textarea)
      const paddingLeft = parseFloat(style.paddingLeft) || 12
      const paddingTop = parseFloat(style.paddingTop) || 8
      const lineHeight = parseFloat(style.lineHeight) || 20
      const fontSize = parseFloat(style.fontSize) || 14
      const charWidth = fontSize * 0.6 // 估算字符宽度

      // 计算行号和列号
      const textUpToCursor = textBeforeCursor.substring(0, trigger.index)
      const lines = textUpToCursor.split('\n')
      const currentLine = lines.length - 1
      const lineText = lines[currentLine] || ''

      // 计算位置
      const top = rect.top + paddingTop + (currentLine + 1) * lineHeight - textarea.scrollTop + 5
      const left = rect.left + paddingLeft + lineText.length * charWidth - textarea.scrollLeft + 5

      this.mentionMenuStyle = {
        position: 'fixed',
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 1000,
      }
    },

    selectMentionItem(item) {
      const textarea = this.$refs.textarea
      if (!textarea) return

      const value = this.value
      const cursorPos = textarea.selectionStart
      const textBeforeCursor = value.substring(0, cursorPos)
      const textAfterCursor = value.substring(cursorPos)

      // 找到触发字符的位置
      const trigger = this.detectTriggerChar(textBeforeCursor)
      if (!trigger) return

      const textBeforeTrigger = value.substring(0, trigger.index)

      // 根据类型生成不同的插入文本
      let mentionText = ''
      if (this.mentionType === 'component') {
        // 组件：@组件名#ID
        mentionText = item.id
          ? `${item.friendlyName}#${this.getShortId(item.id)}`
          : item.friendlyName
      } else if (this.mentionType === 'util') {
        // 工具函数：$函数名
        mentionText = item.name
      } else if (this.mentionType === 'validator') {
        // 校验规则：!规则名
        mentionText = item.name
      }

      const newValue = `${textBeforeTrigger}${this.triggerChar}${mentionText} ${textAfterCursor}`

      this.showMentionMenu = false
      this.$emit('input', newValue)

      // 设置光标位置
      this.$nextTick(() => {
        const newCursorPos = trigger.index + mentionText.length + 2 // +2 for trigger and ' '
        textarea.setSelectionRange(newCursorPos, newCursorPos)
        textarea.focus()
      })
    },
    getShortId(id) {
      if (!id || typeof id !== 'string') return ''
      const parts = id.split('_')
      return parts[parts.length - 1]
    },
  },
}
</script>

<style scoped>
.mention-textarea-wrapper {
  position: relative;
}

.mention-textarea {
  width: 100%;
  min-height: 80px;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  font-family: inherit;
}

.mention-textarea:focus {
  outline: none;
  border-color: #409eff;
}

.mention-menu {
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  max-height: 280px;
  overflow-y: auto;
  min-width: 240px;
  margin-top: 4px;
}

.mention-menu-header {
  padding: 8px 12px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  color: #606266;
  font-size: 13px;
  position: sticky;
  top: 0;
  z-index: 1;
}

.mention-menu-icon {
  font-size: 16px;
}

.mention-menu-title {
  font-size: 13px;
}

.mention-menu-item {
  padding: 10px 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-bottom: 1px solid #f5f5f5;
}

.mention-menu-item:last-child {
  border-bottom: none;
}

.mention-menu-item:hover,
.mention-menu-item.active {
  background-color: #f5f7fa;
}

.mention-item-name {
  font-weight: 500;
  color: #303133;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.mention-item-prefix {
  font-weight: 600;
  color: #409eff;
  font-size: 15px;
}

.mention-item-id {
  font-size: 12px;
  color: #909399;
  font-weight: normal;
  margin-left: 4px;
}

.mention-item-desc {
  font-size: 12px;
  color: #909399;
  line-height: 1.4;
}

.mention-menu-empty {
  padding: 20px 12px;
  color: #909399;
  font-size: 14px;
  text-align: center;
}

/* 自定义滚动条 */
.mention-menu::-webkit-scrollbar {
  width: 6px;
}

.mention-menu::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.mention-menu::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.mention-menu::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
