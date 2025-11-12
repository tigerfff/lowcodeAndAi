<template>
  <div class="api-config">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900">配置 API 接口</h2>
      <p class="mt-1 text-sm text-gray-500">填写接口信息，支持粘贴请求/响应 JSON 示例</p>
    </div>

    <!-- API 列表 -->
    <div class="mb-6 space-y-4">
      <el-button type="primary" :icon="Plus" @click="handleAddApi"> 添加 API 接口想· </el-button>

      <div v-if="editorStore.apiConfigs.length === 0" class="text-center py-12">
        <el-empty description="还没有配置 API，请点击上方按钮添加" />
      </div>

      <!-- API 卡片列表 -->
      <el-collapse v-model="activeApis" class="space-y-4">
        <el-collapse-item
          v-for="(api, index) in editorStore.apiConfigs"
          :key="api.id"
          :name="api.id"
        >
          <template #title>
            <div class="flex items-center justify-between w-full pr-4">
              <div class="flex items-center gap-2">
                <el-icon class="text-primary"><Document /></el-icon>
                <span class="font-semibold">
                  {{ api.name || `API ${index + 1}` }}
                </span>
                <el-tag v-if="api.url" size="small" type="success">
                  {{ api.method }} {{ api.url }}
                </el-tag>
              </div>
              <el-button
                type="danger"
                size="small"
                :icon="Delete"
                circle
                @click.stop="handleRemoveApi(api.id)"
              />
            </div>
          </template>

          <el-form :model="api" label-width="120px" class="px-4">
            <el-form-item label="接口名称" required>
              <el-input
                :model-value="api.name"
                placeholder="用户列表查询"
                @update:model-value="val => updateApi(api.id, { name: val })"
              />
            </el-form-item>

            <el-form-item label="接口地址" required>
              <el-input
                :model-value="api.url"
                placeholder="/api/users/list"
                @update:model-value="val => updateApi(api.id, { url: val })"
              />
            </el-form-item>

            <el-form-item label="请求方法">
              <el-select
                :model-value="api.method"
                class="w-full"
                @update:model-value="val => updateApi(api.id, { method: val })"
              >
                <el-option label="GET" value="GET" />
                <el-option label="POST" value="POST" />
                <el-option label="PUT" value="PUT" />
                <el-option label="DELETE" value="DELETE" />
              </el-select>
            </el-form-item>

            <el-form-item label="请求参数示例">
              <el-input
                :model-value="api.requestExample"
                type="textarea"
                :rows="6"
                placeholder='{ "pageNo": 1, "pageSize": 20, "userName": "" }'
                @update:model-value="val => updateApi(api.id, { requestExample: val })"
                @blur="() => validateJson(api.id, 'requestExample')"
              />
              <div v-if="api._requestError" class="mt-1 text-sm text-red-500">
                {{ api._requestError }}
              </div>
            </el-form-item>

            <el-form-item label="响应示例" required>
              <el-input
                :model-value="api.responseExample"
                type="textarea"
                :rows="8"
                placeholder='{ "data": { "rows": [...], "total": 100 } }'
                @update:model-value="val => updateApi(api.id, { responseExample: val })"
                @blur="() => validateJson(api.id, 'responseExample')"
              />
              <div v-if="api._responseError" class="mt-1 text-sm text-red-500">
                {{ api._responseError }}
              </div>
            </el-form-item>

            <el-form-item label="用途说明">
              <el-input
                :model-value="api.description"
                type="textarea"
                :rows="2"
                placeholder="用于查询用户列表，支持分页和条件筛选"
                @update:model-value="val => updateApi(api.id, { description: val })"
              />
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Delete, Document } from '@element-plus/icons-vue'
import { useEditorStore } from '../stores/editorStore'

const editorStore = useEditorStore()
const activeApis = ref([])

/**
 * 添加 API
 */
function handleAddApi() {
  editorStore.addApiConfig()
  // 自动展开新添加的 API
  const lastApi = editorStore.apiConfigs[editorStore.apiConfigs.length - 1]
  if (lastApi) {
    activeApis.value.push(lastApi.id)
  }
}

/**
 * 移除 API
 */
function handleRemoveApi(apiId) {
  editorStore.removeApiConfig(apiId)
  ElMessage.success('已删除 API 配置')
}

/**
 * 更新 API
 */
function updateApi(apiId, updates) {
  editorStore.updateApiConfig(apiId, updates)
}

/**
 * 验证 JSON 格式
 */
function validateJson(apiId, field) {
  const api = editorStore.apiConfigs.find(a => a.id === apiId)
  if (!api) return

  const value = api[field]
  if (!value || value.trim() === '') {
    // 清空错误
    updateApi(apiId, { [`_${field.replace('Example', '')}Error`]: '' })
    return
  }

  try {
    JSON.parse(value)
    // 清空错误
    updateApi(apiId, { [`_${field.replace('Example', '')}Error`]: '' })
  } catch (error) {
    // 显示错误
    updateApi(apiId, {
      [`_${field.replace('Example', '')}Error`]: `JSON 格式错误: ${error.message}`,
    })
  }
}
</script>

<style scoped>
.api-config {
  max-width: 900px;
}

:deep(.el-collapse-item__header) {
  padding: 16px;
  background-color: #f9fafb;
  border-radius: 8px;
}

:deep(.el-collapse-item__content) {
  padding: 0;
}

:deep(.el-form-item) {
  margin-bottom: 24px;
}
</style>
