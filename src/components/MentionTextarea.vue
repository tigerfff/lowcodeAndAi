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
    
    <!-- @mention 下拉菜单 -->
    <div
      v-if="showMentionMenu"
      class="mention-menu"
      :style="mentionMenuStyle"
    >
      <div
        v-for="(item, index) in filteredMentionItems"
        :key="item.id"
        :class="['mention-menu-item', { active: index === selectedMentionIndex }]"
        @click="selectMentionItem(item)"
        @mouseenter="selectedMentionIndex = index"
      >
        <div class="mention-item-name">
          {{ item.friendlyName }}
          <span v-if="item.id" class="mention-item-id">#{{ getShortId(item.id) }}</span>
        </div>
        <div class="mention-item-type">{{ item.component }}</div>
      </div>
      <div v-if="filteredMentionItems.length === 0" class="mention-menu-empty">
        没有匹配的组件
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
    mentionItems: {
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
    }
  },
  computed: {
    filteredMentionItems() {
      if (!this.mentionQuery) {
        return this.mentionItems
      }
      const query = this.mentionQuery.toLowerCase()
      return this.mentionItems.filter(item => {
        return (
          item.friendlyName.toLowerCase().includes(query) ||
          item.component.toLowerCase().includes(query)
        )
      })
    },
  },
  methods: {
    handleInput(event) {
      const value = event.target.value
      const cursorPos = event.target.selectionStart
      
      // 检查是否输入了 @
      const textBeforeCursor = value.substring(0, cursorPos)
      const lastAtIndex = textBeforeCursor.lastIndexOf('@')
      
      if (lastAtIndex !== -1) {
        // 检查 @ 后面是否有空格或换行，如果有则关闭菜单
        const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1)
        if (textAfterAt.includes(' ') || textAfterAt.includes('\n')) {
          this.showMentionMenu = false
        } else {
          // 显示 @mention 菜单
          this.mentionQuery = textAfterAt
          this.mentionStartPos = lastAtIndex
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
      // 如果光标位置有 @，显示菜单
      const textarea = this.$refs.textarea
      if (textarea) {
        const cursorPos = textarea.selectionStart
        const textBeforeCursor = this.value.substring(0, cursorPos)
        const lastAtIndex = textBeforeCursor.lastIndexOf('@')
        
        if (lastAtIndex !== -1) {
          const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1)
          if (!textAfterAt.includes(' ') && !textAfterAt.includes('\n')) {
            this.mentionQuery = textAfterAt
            this.mentionStartPos = lastAtIndex
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
      // 计算 @ 符号的位置
      const textBeforeCursor = this.value.substring(0, cursorPos)
      const lastAtIndex = textBeforeCursor.lastIndexOf('@')
      
      // 获取 textarea 的位置和样式
      const rect = textarea.getBoundingClientRect()
      const style = window.getComputedStyle(textarea)
      const paddingLeft = parseFloat(style.paddingLeft) || 12
      const paddingTop = parseFloat(style.paddingTop) || 8
      const lineHeight = parseFloat(style.lineHeight) || 20
      const fontSize = parseFloat(style.fontSize) || 14
      const charWidth = fontSize * 0.6 // 估算字符宽度
      
      // 计算行号和列号
      const textUpToCursor = textBeforeCursor.substring(0, lastAtIndex)
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
      
      // 找到 @ 的位置
      const lastAtIndex = textBeforeCursor.lastIndexOf('@')
      const textBeforeAt = value.substring(0, lastAtIndex)
      const mentionLabel = item.id ? `${item.friendlyName}#${this.getShortId(item.id)}` : item.friendlyName
      const newValue = `${textBeforeAt}@${mentionLabel} ${textAfterCursor}`
      
      this.showMentionMenu = false
      this.$emit('input', newValue)
      
      // 设置光标位置
      this.$nextTick(() => {
        const newCursorPos = lastAtIndex + mentionLabel.length + 2 // +2 for '@' and ' '
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
  max-height: 200px;
  overflow-y: auto;
  min-width: 200px;
  margin-top: 4px;
}

.mention-menu-item {
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mention-menu-item:hover,
.mention-menu-item.active {
  background-color: #f5f7fa;
}

.mention-item-name {
  font-weight: 500;
  color: #303133;
  font-size: 14px;
}

.mention-item-type {
  font-size: 12px;
  color: #909399;
}

.mention-menu-empty {
  padding: 8px 12px;
  color: #909399;
  font-size: 14px;
  text-align: center;
}
</style>

