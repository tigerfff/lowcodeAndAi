<template>
  <div class="component-config">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900">配置页面组件</h2>
      <p class="mt-1 text-sm text-gray-500">选择需要的组件并配置基本信息,AI 将自动推断其他属性</p>
    </div>

    <!-- 页面基本信息 -->
    <el-card class="mb-6" shadow="never">
      <template #header>
        <div class="flex items-center gap-2">
          <el-icon><InfoFilled /></el-icon>
          <span class="font-semibold">页面基本信息</span>
        </div>
      </template>

      <el-form :model="editorStore.pageInfo" label-width="100px">
        <el-form-item label="页面名称" required>
          <el-input
            v-model="editorStore.pageInfo.pageName"
            placeholder="如: UserList (用于生成组件名)"
          />
        </el-form-item>
        <el-form-item label="页面标题">
          <el-input v-model="editorStore.pageInfo.title" placeholder="如: 用户列表" />
        </el-form-item>
        <el-form-item label="面包屑">
          <el-select
            v-model="editorStore.pageInfo.breadcrumb"
            multiple
            filterable
            allow-create
            placeholder="输入并回车添加面包屑项"
            class="w-full"
          />
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 组件配置区域 -->
    <div class="space-y-6">
      <!-- 搜索区 -->
      <ComponentSlot
        v-if="editorStore.selectedTemplate?.slots?.searchArea"
        slot-name="searchArea"
        title="搜索区组件"
        icon="Search"
        :max-count="editorStore.selectedTemplate.slots.searchArea.maxCount"
        :allowed-components="editorStore.selectedTemplate.slots.searchArea.allowedComponents"
      />

      <!-- 操作区 -->
      <ComponentSlot
        v-if="editorStore.selectedTemplate?.slots?.actionArea"
        slot-name="actionArea"
        title="操作区按钮"
        icon="Operation"
        :max-count="editorStore.selectedTemplate.slots.actionArea.maxCount"
        :allowed-components="editorStore.selectedTemplate.slots.actionArea.allowedComponents"
      />

      <!-- 表格列 -->
      <ComponentSlot
        v-if="editorStore.selectedTemplate?.slots?.tableColumns"
        slot-name="tableColumns"
        title="表格列配置"
        icon="Grid"
        :allowed-components="editorStore.selectedTemplate.slots.tableColumns.allowedComponents"
      />
    </div>

    <!-- 组件选择器对话框 -->
    <ComponentSelector
      v-model:visible="componentSelectorVisible"
      :slot-name="currentSlotName"
      :allowed-components="currentAllowedComponents"
      @select="handleSelectComponent"
    />
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { InfoFilled } from '@element-plus/icons-vue'
import { useEditorStore } from '../stores/editorStore'
import ComponentSlot from './ComponentSlot.vue'
import ComponentSelector from './ComponentSelector.vue'

export default {
  name: 'ComponentConfig',
  components: {
    InfoFilled,
    ComponentSlot,
    ComponentSelector,
  },
  data() {
    return {
      componentSelectorVisible: false,
      currentSlotName: '',
      currentAllowedComponents: [],
    }
  },
  computed: {
    ...mapStores(useEditorStore),
  },
  methods: {
    openComponentSelector(slotName, allowedComponents) {
      this.currentSlotName = slotName
      this.currentAllowedComponents = allowedComponents || []
      this.componentSelectorVisible = true
    },
    handleSelectComponent(component) {
      this.editorStore.addComponent(this.currentSlotName, component)
      this.componentSelectorVisible = false
    },
  },
  provide() {
    return {
      openComponentSelector: this.openComponentSelector,
    }
  },
}
</script>
