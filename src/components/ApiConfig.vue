<template>
  <div class="api-config">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900">配置 API 接口</h2>
      <p class="mt-1 text-sm text-gray-500">填写接口信息，支持粘贴请求/响应 JSON 示例</p>
    </div>

    <!-- API 列表 -->
    <div class="mb-6 space-y-4">
      <el-button type="primary" icon="el-icon-plus" @click="handleAddApi">
        添加 API 接口
      </el-button>

      <div v-if="apiConfigs.length === 0" class="text-center py-12">
        <el-empty description="还没有配置 API，请点击上方按钮添加" />
      </div>

      <!-- API 卡片列表 -->
      <el-collapse v-model="activeApis" class="space-y-4">
        <el-collapse-item v-for="(api, index) in apiConfigs" :key="api.id" :name="api.id">
          <template #title>
            <div class="flex items-center justify-between w-full pr-4">
              <div class="flex items-center gap-2">
                <i class="el-icon-document text-primary"></i>
                <span class="font-semibold">
                  {{ api.name || `API ${index + 1}` }}
                </span>
                <el-tag v-if="api.url" size="small" type="success" class="max-w-xs truncate">
                  {{ api.method }} {{ api.url }}
                </el-tag>
              </div>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
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

<script>
import { Message } from 'element-ui'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ApiConfig',
  data() {
    return {
      activeApis: [],
    }
  },
  computed: {
    ...mapState('editor', ['apiConfigs']),
  },
  methods: {
    ...mapActions('editor', ['addApiConfig', 'removeApiConfig', 'updateApiConfig']),
    handleAddApi() {
      this.addApiConfig()
      const lastApi = this.apiConfigs[this.apiConfigs.length - 1]
      if (lastApi) {
        this.activeApis.push(lastApi.id)
      }
    },
    handleRemoveApi(apiId) {
      this.removeApiConfig(apiId)
      Message.success('已删除 API 配置')
    },
    updateApi(apiId, updates) {
      this.updateApiConfig({ apiId, updates })
    },
    validateJson(apiId, field) {
      const api = this.apiConfigs.find(a => a.id === apiId)
      if (!api) return

      const value = api[field]
      if (!value || value.trim() === '') {
        this.updateApi(apiId, { [`_${field.replace('Example', '')}Error`]: '' })
        return
      }

      try {
        JSON.parse(value)
        this.updateApi(apiId, { [`_${field.replace('Example', '')}Error`]: '' })
      } catch (error) {
        this.updateApi(apiId, {
          [`_${field.replace('Example', '')}Error`]: `JSON 格式错误: ${error.message}`,
        })
      }
    },
  },
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
