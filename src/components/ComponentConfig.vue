<template>
  <div class="component-config" style="padding: 8px">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900">配置页面组件</h2>
      <p class="mt-1 text-sm text-gray-500">选择需要的组件并配置基本信息，AI 将自动推断其他属性</p>
    </div>

    <el-card class="mb-6" shadow="never">
      <template #header>
        <div class="flex items-center gap-2">
          <i class="el-icon-info"></i>
          <span class="font-semibold">页面基本信息</span>
        </div>
      </template>

      <el-form label-width="100px">
        <el-form-item label="页面名称" required>
          <el-input v-model="pageName" placeholder="如: UserList (用于生成组件名)" />
        </el-form-item>
        <el-form-item label="页面标题">
          <el-input v-model="pageTitle" placeholder="如: 用户列表" />
        </el-form-item>
        <el-form-item label="面包屑">
          <el-select
            v-model="pageBreadcrumb"
            multiple
            filterable
            allow-create
            placeholder="输入并回车添加面包屑项"
            class="w-full"
          />
        </el-form-item>
      </el-form>
    </el-card>

    <div class="space-y-6">
      <ComponentSlot
        v-if="selectedTemplate?.slots?.searchArea"
        slot-name="searchArea"
        title="搜索区组件"
        icon="el-icon-search"
        :max-count="selectedTemplate.slots.searchArea.maxCount"
        :allowed-components="selectedTemplate.slots.searchArea.allowedComponents"
      />

      <ComponentSlot
        v-if="selectedTemplate?.slots?.actionArea"
        slot-name="actionArea"
        title="操作区按钮"
        icon="el-icon-s-operation"
        :max-count="selectedTemplate.slots.actionArea.maxCount"
        :allowed-components="selectedTemplate.slots.actionArea.allowedComponents"
      />

      <ComponentSlot
        v-if="selectedTemplate?.slots?.tableColumns"
        slot-name="tableColumns"
        title="表格列配置"
        icon="el-icon-grid"
        :allowed-components="selectedTemplate.slots.tableColumns.allowedComponents"
      />
    </div>

    <ComponentSelector
      :visible.sync="componentSelectorVisible"
      :slot-name="currentSlotName"
      :allowed-components="currentAllowedComponents"
      @select="handleSelectComponent"
      @add-custom-component="handleAddCustomComponent"
    />

    <AddCustomComponentDialog :visible.sync="addCustomComponentDialogVisible" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ComponentSlot from './ComponentSlot.vue'
import ComponentSelector from './ComponentSelector.vue'
import AddCustomComponentDialog from './AddCustomComponentDialog.vue'

export default {
  name: 'ComponentConfig',
  components: {
    ComponentSlot,
    ComponentSelector,
    AddCustomComponentDialog,
  },
  data() {
    return {
      componentSelectorVisible: false,
      currentSlotName: '',
      currentAllowedComponents: [],
      addCustomComponentDialogVisible: false,
    }
  },
  computed: {
    ...mapState('editor', ['selectedTemplate', 'pageInfo']),
    pageName: {
      get() {
        return this.pageInfo.pageName
      },
      set(val) {
        this.updatePageInfo({ pageName: val })
      },
    },
    pageTitle: {
      get() {
        return this.pageInfo.title
      },
      set(val) {
        this.updatePageInfo({ title: val })
      },
    },
    pageBreadcrumb: {
      get() {
        return this.pageInfo.breadcrumb
      },
      set(val) {
        this.updatePageInfo({ breadcrumb: val })
      },
    },
  },
  methods: {
    ...mapActions('editor', ['updatePageInfo', 'addComponent']),
    openComponentSelector(slotName, allowedComponents) {
      this.currentSlotName = slotName
      this.currentAllowedComponents = allowedComponents || []
      this.componentSelectorVisible = true
    },
    handleSelectComponent(component) {
      this.addComponent({ slotName: this.currentSlotName, component })
      this.componentSelectorVisible = false
    },
    handleAddCustomComponent() {
      this.addCustomComponentDialogVisible = true
    },
  },
  provide() {
    return {
      openComponentSelector: this.openComponentSelector,
    }
  },
}
</script>
