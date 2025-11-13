<template>
  <div class="template-selector">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900">选择页面模板</h2>
      <p class="mt-1 text-sm text-gray-500">
        选择一个页面模板开始设计,模板定义了页面的基本结构和可用组件槽位
      </p>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <el-icon class="is-loading mr-2">
        <Loading />
      </el-icon>
      <span class="text-gray-500">加载模板中...</span>
    </div>

    <!-- 模板列表 -->
    <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      <div
        v-for="template in templates"
        :key="template.id"
        class="group min-w-0 cursor-pointer rounded-lg border-2 p-6 transition-all duration-200"
        :class="{
          'border-primary bg-blue-50 shadow-md': editorStore.selectedTemplate?.id === template.id,
          'border-gray-200 hover:border-primary hover:shadow-md':
            editorStore.selectedTemplate?.id !== template.id,
        }"
        @click="selectTemplate(template)"
      >
        <!-- 图标和标题 -->
        <div class="mb-4 flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white"
            >
              <el-icon :size="24">
                <Document />
              </el-icon>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">
                {{ template.label }}
              </h3>
              <p class="text-xs text-gray-500">v{{ template.version }}</p>
            </div>
          </div>
          <el-icon
            v-if="editorStore.selectedTemplate?.id === template.id"
            :size="20"
            class="text-primary"
          >
            <CircleCheck />
          </el-icon>
        </div>

        <!-- 描述 -->
        <p class="mb-4 min-w-0 break-words text-sm text-gray-600">
          {{ template.description }}
        </p>

        <!-- Slots 信息 -->
        <div class="mb-4 space-y-2">
          <div v-if="template.slots?.searchArea" class="flex items-center gap-2 text-xs">
            <el-tag size="small" type="info">搜索区</el-tag>
            <span class="text-gray-500">
              最多 {{ template.slots.searchArea.maxCount || '-' }} 个组件
            </span>
          </div>
          <div v-if="template.slots?.actionArea" class="flex items-center gap-2 text-xs">
            <el-tag size="small" type="warning">操作区</el-tag>
            <span class="text-gray-500">
              最多 {{ template.slots.actionArea.maxCount || '-' }} 个按钮
            </span>
          </div>
          <div v-if="template.slots?.tableColumns" class="flex items-center gap-2 text-xs">
            <el-tag size="small" type="success">表格列</el-tag>
            <span class="text-gray-500">动态配置</span>
          </div>
        </div>

        <!-- 底部标签 -->
        <div class="flex flex-wrap gap-2">
          <el-tag
            v-for="task in template.aiTasks?.slice(0, 2)"
            :key="task"
            size="small"
            effect="plain"
            class="text-xs"
          >
            {{ task }}
          </el-tag>
          <el-tag v-if="template.aiTasks?.length > 2" size="small" effect="plain">
            +{{ template.aiTasks.length - 2 }}
          </el-tag>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <el-empty v-if="!loading && templates.length === 0" description="暂无可用模板" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Document, CircleCheck, Loading } from '@element-plus/icons-vue'
import { useEditorStore } from '../stores/editorStore'
import { getAllTemplates } from '../services/templateManager'

const editorStore = useEditorStore()
const loading = ref(false)
const templates = ref([])

/**
 * 加载模板
 */
async function loadTemplates() {
  loading.value = true
  try {
    templates.value = await getAllTemplates()
    autoSelectTemplate()
  } catch (error) {
    console.error('Failed to load templates:', error)
    ElMessage.error('加载模板失败')
  } finally {
    loading.value = false
  }
}

function autoSelectTemplate() {
  if (!templates.value || templates.value.length === 0) return

  const savedId = editorStore.selectedTemplateId
  const target =
    (savedId && templates.value.find(template => template.id === savedId)) || templates.value[0]

  if (target && editorStore.selectedTemplate?.id !== target.id) {
    selectTemplate(target, { silent: true })
  }
}

/**
 * 选择模板
 */
function selectTemplate(template, { silent = false } = {}) {
  editorStore.selectTemplate(template)
  if (!silent) {
    ElMessage.success(`已选择模板: ${template.label}`)
  }
}

onMounted(() => {
  loadTemplates()
})
</script>
