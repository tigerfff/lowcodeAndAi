<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <el-icon><component :is="icon" /></el-icon>
          <span class="font-semibold">{{ title }}</span>
          <el-tag v-if="maxCount" size="small" type="info">
            {{ slotComponents.length }} / {{ maxCount }}
          </el-tag>
        </div>
        <el-button
          :icon="Plus"
          :disabled="maxCount && slotComponents.length >= maxCount"
          size="small"
          @click="handleAddComponent"
        >
          添加组件
        </el-button>
      </div>
    </template>

    <!-- 组件列表 -->
    <div v-if="slotComponents.length > 0" class="space-y-3">
      <div
        v-for="(component, index) in slotComponents"
        :key="component.id"
        class="flex items-center gap-3 rounded-lg border border-gray-200 p-3 hover:border-primary"
      >
        <el-icon class="text-gray-400"><Grid /></el-icon>
        <div class="flex-1">
          <div class="font-medium text-gray-900">
            {{ getComponentLabel(component.component) }}
          </div>
          <div class="text-xs text-gray-500">{{ component.component }}</div>
        </div>
        <el-button :icon="Delete" size="small" text @click="handleRemoveComponent(component.id)">
          删除
        </el-button>
      </div>
    </div>

    <!-- 空状态 -->
    <el-empty v-else description="暂无组件,点击上方按钮添加" :image-size="80" />
  </el-card>
</template>

<script>
import { ElMessageBox } from 'element-plus'
import { Search, Operation, Grid, Plus, Delete } from '@element-plus/icons-vue'
import { mapStores } from 'pinia'
import { useEditorStore } from '../stores/editorStore'
import { getComponentByName } from '../services/componentLibrary'

export default {
  name: 'ComponentSlot',
  components: {
    Search,
    Operation,
    Grid,
    Plus,
    Delete,
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
      default: 'Grid',
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
    ...mapStores(useEditorStore),
    slotComponents() {
      return this.editorStore.slots[this.slotName] || []
    },
  },
  methods: {
    handleAddComponent() {
      if (this.openComponentSelector) {
        this.openComponentSelector(this.slotName, this.allowedComponents)
      }
    },
    handleRemoveComponent(componentId) {
      ElMessageBox.confirm('确定要删除这个组件吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.editorStore.removeComponent(this.slotName, componentId)
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
