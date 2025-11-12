<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <el-icon><component :is="icon" /></el-icon>
          <span class="font-semibold">{{ title }}</span>
          <el-tag v-if="maxCount" size="small" type="info">
            {{ components.length }} / {{ maxCount }}
          </el-tag>
        </div>
        <el-button
          :icon="Plus"
          :disabled="maxCount && components.length >= maxCount"
          size="small"
          @click="handleAddComponent"
        >
          添加组件
        </el-button>
      </div>
    </template>

    <!-- 组件列表 -->
    <div v-if="components.length > 0" class="space-y-3">
      <div
        v-for="(component, index) in components"
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

<script setup>
import { computed, inject } from 'vue'
import { Search, Operation, Grid, Plus, Delete } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { useEditorStore } from '../stores/editorStore'
import { getComponentByName } from '../services/componentLibrary'

const props = defineProps({
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
})

const editorStore = useEditorStore()
const openComponentSelector = inject('openComponentSelector')

// 当前 slot 的组件列表
const components = computed(() => {
  return editorStore.slots[props.slotName] || []
})

/**
 * 添加组件
 */
function handleAddComponent() {
  openComponentSelector(props.slotName, props.allowedComponents)
}

/**
 * 移除组件
 */
function handleRemoveComponent(componentId) {
  ElMessageBox.confirm('确定要删除这个组件吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      editorStore.removeComponent(props.slotName, componentId)
    })
    .catch(() => {})
}

/**
 * 获取组件显示名称
 */
function getComponentLabel(componentName) {
  const component = getComponentByName(componentName)
  return component?.label || componentName
}
</script>
