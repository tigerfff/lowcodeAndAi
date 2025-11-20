<template>
  <div class="template-selector">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900">选择页面模板</h2>
      <p class="mt-1 text-sm text-gray-500">
        选择一个页面模板开始设计，模板定义了页面的基本结构和可用组件槽位
      </p>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <i class="el-icon-loading mr-2"></i>
      <span class="text-gray-500">加载模板中...</span>
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="template in templates"
        :key="template.id"
        class="group cursor-pointer rounded-lg border-2 p-3 transition-all duration-200 flex items-center gap-4"
        :class="cardClass(template)"
        @click="handleSelect(template)"
      >
        <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <i class="el-icon-document" style="font-size: 20px"></i>
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <h3 class="text-base font-semibold text-gray-900 truncate">
              {{ template.label }}
            </h3>
            <span class="text-xs text-gray-400">v{{ template.version }}</span>
          </div>
          <p class="text-xs text-gray-500 truncate">
            {{ template.description }}
          </p>
        </div>

        <div class="flex items-center gap-1.5 flex-shrink-0">
          <el-tag v-if="template.slots?.searchArea" size="mini" type="info">搜索</el-tag>
          <el-tag v-if="template.slots?.actionArea" size="mini" type="warning">操作</el-tag>
          <el-tag v-if="template.slots?.tableColumns" size="mini" type="success">表格</el-tag>
          <el-tag v-if="slotCount(template) > 3" size="mini" effect="plain">
            +{{ slotCount(template) - 3 }}
          </el-tag>
        </div>

        <i
          v-if="selectedTemplate?.id === template.id"
          class="el-icon-circle-check text-blue-500 flex-shrink-0"
          style="font-size: 20px"
        ></i>
      </div>
    </div>

    <el-empty v-if="!loading && templates.length === 0" description="暂无可用模板" />
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { mapState, mapActions } from 'vuex'
import { getAllTemplates } from '../services/templateManager'

export default {
  name: 'TemplateSelector',
  data() {
    return {
      loading: false,
      templates: [],
    }
  },
  computed: {
    ...mapState('editor', ['selectedTemplate']),
  },
  created() {
    this.loadTemplates()
  },
  methods: {
    ...mapActions('editor', ['selectTemplate']),
    async loadTemplates() {
      this.loading = true
      try {
        this.templates = await getAllTemplates()
      } catch (error) {
        console.error('Failed to load templates:', error)
        Message.error('加载模板失败')
      } finally {
        this.loading = false
      }
    },
    handleSelect(template) {
      this.selectTemplate(template)
      Message.success(`已选择模板: ${template.label}`)
    },
    cardClass(template) {
      return this.selectedTemplate?.id === template.id
        ? 'border-primary bg-blue-50 shadow-md'
        : 'border-gray-200 hover:border-primary hover:shadow-md'
    },
    slotCount(template) {
      return Object.keys(template.slots || {}).length
    },
  },
}
</script>

