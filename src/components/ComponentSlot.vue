<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i :class="icon" style="font-size: 18px;"></i>
          <span class="font-semibold">{{ title }}</span>
          <el-tag v-if="maxCount" size="small" type="info">
            {{ slotComponents.length }} / {{ maxCount }}
          </el-tag>
        </div>
        <el-button
          icon="el-icon-plus"
          :disabled="maxCount && slotComponents.length >= maxCount"
          size="small"
          @click="handleAddComponent"
        >
          添加组件
        </el-button>
      </div>
    </template>

    <div v-if="slotComponents.length > 0" class="space-y-3">
      <div
        v-for="component in slotComponents"
        :key="component.id"
        class="flex items-center gap-3 rounded-lg border border-gray-200 p-3 hover:border-primary"
      >
        <i class="el-icon-grid text-gray-400"></i>
        <div class="flex-1">
          <div class="font-medium text-gray-900">
            {{ component.friendlyName || getComponentLabel(component.component) }}
          </div>
          <div class="text-xs text-gray-500">
            {{ component.component }}
            <span v-if="component.id" class="ml-2 text-gray-400">(id: {{ component.id.split('_').slice(-1)[0] }})</span>
          </div>
        </div>
        <el-button icon="el-icon-delete" size="small" type="text" @click="handleRemoveComponent(component.id)">
          删除
        </el-button>
      </div>
    </div>

    <el-empty v-else description="暂无组件,点击上方按钮添加" :image-size="80" />

    <!-- Slot 提示词输入 -->
    <div class="mt-4">
      <div class="mb-2 flex items-center gap-2">
        <i class="el-icon-edit-outline text-gray-500"></i>
        <span class="text-sm font-medium text-gray-700">Slot 提示词</span>
        <el-tooltip content="输入 @ 可以快速引用组件，描述组件间的联动关系" placement="top">
          <i class="el-icon-question text-gray-400 cursor-help"></i>
        </el-tooltip>
      </div>
      <MentionTextarea
        :value="slotPrompt"
        :placeholder="slotPromptPlaceholder"
        :mention-items="slotComponents"
        @input="handlePromptInput"
      />
    </div>
  </el-card>
</template>

<script>
import { MessageBox } from 'element-ui'
import { mapActions, mapState } from 'vuex'
import { getComponentByName } from '../services/componentLibrary'
import MentionTextarea from './MentionTextarea.vue'

export default {
  name: 'ComponentSlot',
  components: {
    MentionTextarea,
  },
  inject: ['openComponentSelector'],
  props: {
    slotName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'el-icon-grid',
    },
    maxCount: {
      type: Number,
      default: null,
    },
    allowedComponents: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState('editor', ['slotPrompts']),
    slotComponents() {
      const slots = this.$store.state.editor.slots || {}
      return slots[this.slotName] || []
    },
    slotPrompt: {
      get() {
        return this.slotPrompts[this.slotName] || ''
      },
      set(value) {
        this.updateSlotPrompt({ slotName: this.slotName, prompt: value })
      },
    },
    slotPromptPlaceholder() {
      return `输入提示词，描述 ${this.title} 中组件的联动关系。例如：当 @部门选择器 选择“总部”时，显示 @子部门选择器`
    },
  },
  data() {
    return {
      componentLabels: {},
    }
  },
  mounted() {
    this.loadComponentLabels()
  },
  watch: {
    slotComponents() {
      this.loadComponentLabels()
    },
  },
  methods: {
    ...mapActions('editor', ['removeComponent', 'updateSlotPrompt']),
    handlePromptInput(value) {
      this.updateSlotPrompt({ slotName: this.slotName, prompt: value })
    },
    async loadComponentLabels() {
      // 为每个组件加载标签
      for (const comp of this.slotComponents) {
        if (!this.componentLabels[comp.component]) {
          const componentInfo = await getComponentByName(comp.component)
          if (componentInfo) {
            this.$set(this.componentLabels, comp.component, componentInfo.label)
          }
        }
      }
    },
    handleAddComponent() {
      if (this.openComponentSelector) {
        this.openComponentSelector(this.slotName, this.allowedComponents)
      }
    },
    handleRemoveComponent(componentId) {
      MessageBox.confirm('确定要删除这个组件吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.removeComponent({ slotName: this.slotName, componentId })
        })
        .catch(() => {})
    },
    getComponentLabel(componentName) {
      return this.componentLabels[componentName] || componentName
    },
  },
}
</script>
