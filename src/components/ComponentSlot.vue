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
            {{ getComponentLabel(component.component) }}
          </div>
          <div class="text-xs text-gray-500">{{ component.component }}</div>
        </div>
        <el-button icon="el-icon-delete" size="small" type="text" @click="handleRemoveComponent(component.id)">
          删除
        </el-button>
      </div>
    </div>

    <el-empty v-else description="暂无组件,点击上方按钮添加" :image-size="80" />
  </el-card>
</template>

<script>
import { MessageBox } from 'element-ui'
import { mapActions } from 'vuex'
import { getComponentByName } from '../services/componentLibrary'

export default {
  name: 'ComponentSlot',
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
    slotComponents() {
      const slots = this.$store.state.editor.slots || {}
      return slots[this.slotName] || []
    },
  },
  methods: {
    ...mapActions('editor', ['removeComponent']),
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
      const component = getComponentByName(componentName)
      return component?.label || componentName
    },
  },
}
</script>
