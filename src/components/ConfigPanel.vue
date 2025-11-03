<template>
  <div class="config-panel">
    <!-- Tab 切换 -->
    <el-tabs v-model="activeTab" class="config-tabs">
      <!-- 组件配置 -->
      <el-tab-pane label="组件配置" name="component">
        <div class="tab-content">
          <div v-if="selectedComponent" class="component-config">
            <!-- 组件信息 -->
            <div class="config-section">
              <div class="section-title">
                <i class="el-icon-s-operation" />
                <span>组件信息</span>
              </div>
              <div class="section-content">
                <el-form label-position="top" size="small">
                  <el-form-item label="组件类型">
                    <el-input :value="selectedComponent.component" disabled />
                  </el-form-item>
                  <el-form-item label="组件ID">
                    <el-input :value="selectedComponent.id" disabled />
                  </el-form-item>
                </el-form>
              </div>
            </div>

            <!-- Wrapper 配置 -->
            <div class="config-section">
              <div class="section-title">
                <i class="el-icon-box" />
                <span>包裹容器</span>
              </div>
              <div class="section-content">
                <el-form label-position="top" size="small">
                  <el-form-item label="Wrapper 组件">
                    <el-select
                      v-model="selectedComponent.wrapper"
                      placeholder="选择包裹容器（可选）"
                      clearable
                      size="small"
                    >
                      <el-option
                        v-for="wrapper in availableWrappers"
                        :key="wrapper.value"
                        :label="wrapper.label"
                        :value="wrapper.value"
                      >
                        <span>{{ wrapper.label }}</span>
                        <span style="color: #8492a6; font-size: 12px; margin-left: 8px">
                          {{ wrapper.description }}
                        </span>
                      </el-option>
                    </el-select>
                    <div class="form-item-tip">
                      Wrapper 会自动包裹组件，如 h-page-search-item 包裹表单控件
                    </div>
                  </el-form-item>
                </el-form>
              </div>
            </div>

            <!-- 基础属性 -->
            <div class="config-section">
              <div class="section-title">
                <i class="el-icon-edit" />
                <span>基础属性</span>
              </div>
              <div class="section-content">
                <el-form label-position="top" size="small">
                  <!-- 动态渲染属性 -->
                  <template v-if="selectedComponentDef && selectedComponentDef.props">
                    <el-form-item
                      v-for="prop in selectedComponentDef.props"
                      :key="prop.name"
                      :label="prop.label"
                      :required="prop.required"
                    >
                      <!-- 字符串类型 -->
                      <el-input
                        v-if="prop.type === 'string'"
                        v-model="selectedComponent.props[prop.name]"
                        :placeholder="prop.description"
                      />
                      <!-- 布尔类型 -->
                      <el-switch
                        v-else-if="prop.type === 'boolean'"
                        v-model="selectedComponent.props[prop.name]"
                      />
                      <!-- 选择类型 -->
                      <el-select
                        v-else-if="prop.type === 'select'"
                        v-model="selectedComponent.props[prop.name]"
                        :placeholder="prop.description"
                      >
                        <el-option
                          v-for="option in prop.options"
                          :key="option"
                          :label="option || '(空)'"
                          :value="option"
                        />
                      </el-select>
                      <!-- 其他类型 -->
                      <el-input
                        v-else
                        v-model="selectedComponent.props[prop.name]"
                        :placeholder="prop.description"
                      />
                    </el-form-item>
                  </template>

                  <!-- 如果没有定义，显示通用属性 -->
                  <template v-else>
                    <el-form-item label="属性配置">
                      <el-alert type="info" :closable="false" show-icon>
                        该组件暂无配置项定义
                      </el-alert>
                    </el-form-item>
                  </template>
                </el-form>
              </div>
            </div>

            <!-- 接口绑定 -->
            <div class="config-section">
              <div class="section-title">
                <i class="el-icon-connection" />
                <span>接口绑定</span>
                <el-button type="text" size="mini" icon="el-icon-plus" @click="handleAddApiBinding">
                  添加接口
                </el-button>
              </div>
              <div class="section-content">
                <div
                  v-if="
                    !selectedComponent.apiBindings || selectedComponent.apiBindings.length === 0
                  "
                  class="empty-tip"
                >
                  暂无接口绑定，点击"添加接口"进行配置
                </div>
                <div v-else class="api-binding-list">
                  <div
                    v-for="(binding, index) in selectedComponent.apiBindings"
                    :key="index"
                    class="api-binding-item"
                    @click="handleEditApiBinding(binding, index)"
                  >
                    <div class="binding-header">
                      <span>接口 {{ index + 1 }}</span>
                      <div>
                        <el-button
                          type="text"
                          size="mini"
                          icon="el-icon-edit"
                          @click.stop="handleEditApiBinding(binding, index)"
                        >
                          编辑
                        </el-button>
                        <el-button
                          type="text"
                          size="mini"
                          icon="el-icon-delete"
                          @click.stop="handleRemoveApiBinding(index)"
                        >
                          删除
                        </el-button>
                      </div>
                    </div>
                    <div class="binding-content">
                      <p><strong>URL:</strong> {{ binding.url || '未配置' }}</p>
                      <p><strong>用途:</strong> {{ binding.purpose || '未配置' }}</p>
                      <p><strong>触发:</strong> {{ binding.trigger || '未配置' }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- AI 提示词 -->
            <div class="config-section">
              <div class="section-title">
                <i class="el-icon-chat-dot-round" />
                <span>AI 提示词</span>
              </div>
              <div class="section-content">
                <el-input
                  v-model="selectedComponent.aiPrompt"
                  type="textarea"
                  :rows="3"
                  placeholder="为这个组件添加 AI 提示词，帮助 AI 理解业务逻辑..."
                />
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="config-actions">
              <el-button size="small" @click="handleCopy">复制组件</el-button>
              <el-button size="small" type="danger" @click="handleDelete">删除组件</el-button>
            </div>
          </div>

          <!-- 未选中组件 -->
          <div v-else class="no-selection">
            <i class="el-icon-mouse" />
            <p>点击预览区的组件进行配置</p>
          </div>
        </div>
      </el-tab-pane>

      <!-- 接口管理 -->
      <el-tab-pane label="接口管理" name="api">
        <div class="tab-content">
          <div class="empty-tip">
            <i class="el-icon-connection" />
            <p>接口管理功能开发中...</p>
          </div>
        </div>
      </el-tab-pane>

      <!-- 页面设置 -->
      <el-tab-pane label="页面设置" name="page">
        <div class="tab-content">
          <div class="config-section">
            <div class="section-title">
              <i class="el-icon-document" />
              <span>页面信息</span>
            </div>
            <div class="section-content">
              <el-form label-position="top" size="small">
                <el-form-item label="组件名称">
                  <el-input v-model="pageInfo.name" placeholder="如：UserList" />
                </el-form-item>
                <el-form-item label="页面标题">
                  <el-input v-model="pageInfo.title" placeholder="如：用户管理" />
                </el-form-item>
                <el-form-item label="面包屑">
                  <el-tag
                    v-for="(item, index) in pageInfo.breadcrumb"
                    :key="index"
                    closable
                    size="small"
                    style="margin-right: 8px; margin-bottom: 8px"
                    @close="handleRemoveBreadcrumb(index)"
                  >
                    {{ item }}
                  </el-tag>
                  <el-input
                    v-if="showBreadcrumbInput"
                    v-model="newBreadcrumb"
                    size="small"
                    style="width: 120px"
                    @blur="handleAddBreadcrumb"
                    @keyup.enter="handleAddBreadcrumb"
                  />
                  <el-button
                    v-else
                    size="small"
                    icon="el-icon-plus"
                    @click="showBreadcrumbInput = true"
                  >
                    添加
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>

          <!-- 全局 AI 提示词 -->
          <div class="config-section">
            <div class="section-title">
              <i class="el-icon-chat-dot-round" />
              <span>全局 AI 提示词</span>
            </div>
            <div class="section-content">
              <el-input
                v-model="globalAiPrompt"
                type="textarea"
                :rows="6"
                placeholder="描述整个页面的业务逻辑、特殊规则等..."
              />
              <div class="tip">提示：全局提示词会帮助 AI 更好地理解整个页面的业务逻辑</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 接口绑定对话框 -->
    <ApiBindingDialog
      v-model:visible="apiBindingDialogVisible"
      :data="currentApiBindingData"
      @confirm="handleApiBindingConfirm"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useEditorStore } from '@/stores/editorStore'
import { ElMessage, ElMessageBox } from 'element-plus'
import ApiBindingDialog from './ApiBindingDialog.vue'
import { getAllComponents } from '@/services/componentLibrary'

export default {
  name: 'ConfigPanel',
  components: {
    ApiBindingDialog,
  },
  setup() {
    const editorStore = useEditorStore()

    // 当前激活的 Tab
    const activeTab = ref('component')

    // 可用的 Wrapper 组件列表
    const availableWrappers = ref([
      {
        value: 'h-page-search-item',
        label: 'h-page-search-item',
        description: '搜索项包裹器',
      },
      {
        value: 'el-form-item',
        label: 'el-form-item',
        description: '表单项包裹器',
      },
      {
        value: 'div',
        label: 'div',
        description: '普通 div 容器',
      },
    ])

    // 组件库配置
    const componentLibrary = ref({})

    // 选中的组件
    const selectedComponent = computed(() => editorStore.selectedComponent)

    // 选中组件的配置定义
    const selectedComponentDef = computed(() => {
      if (!selectedComponent.value) return null

      // 查找组件定义
      const allComponents = [
        ...(componentLibrary.value.search || []),
        ...(componentLibrary.value.table || []),
        ...(componentLibrary.value.action || []),
      ]
      return allComponents.find(c => c.name === selectedComponent.value.component)
    })

    // 页面信息
    const pageInfo = computed(() => editorStore.pageConfig.pageInfo)

    // 全局 AI 提示词
    const globalAiPrompt = computed({
      get: () => editorStore.pageConfig.globalAiPrompt,
      set: val => {
        editorStore.pageConfig.globalAiPrompt = val
      },
    })

    // 面包屑输入
    const showBreadcrumbInput = ref(false)
    const newBreadcrumb = ref('')

    // 接口绑定对话框
    const apiBindingDialogVisible = ref(false)
    const currentApiBindingData = ref(null)
    const currentApiBindingIndex = ref(-1)

    // 添加接口绑定
    const handleAddApiBinding = () => {
      currentApiBindingData.value = null
      currentApiBindingIndex.value = -1
      apiBindingDialogVisible.value = true
    }

    // 编辑接口绑定
    const handleEditApiBinding = (binding, index) => {
      currentApiBindingData.value = { ...binding }
      currentApiBindingIndex.value = index
      apiBindingDialogVisible.value = true
    }

    // 删除接口绑定
    const handleRemoveApiBinding = index => {
      selectedComponent.value.apiBindings.splice(index, 1)
      ElMessage.success('已删除接口绑定')
    }

    // 确认接口绑定
    const handleApiBindingConfirm = data => {
      if (currentApiBindingIndex.value >= 0) {
        // 编辑现有绑定
        selectedComponent.value.apiBindings[currentApiBindingIndex.value] = data
        ElMessage.success('接口绑定已更新')
      } else {
        // 添加新绑定
        if (!selectedComponent.value.apiBindings) {
          selectedComponent.value.apiBindings = []
        }
        selectedComponent.value.apiBindings.push(data)
        ElMessage.success('接口绑定已添加')
      }
      editorStore.saveHistory()
    }

    // 复制组件
    const handleCopy = () => {
      ElMessage.info('复制组件功能开发中...')
      // TODO: 实现组件复制
    }

    // 删除组件
    const handleDelete = () => {
      ElMessageBox.confirm('确定要删除这个组件吗？', '提示', {
        type: 'warning',
      })
        .then(() => {
          editorStore.removeComponent(selectedComponent.value.id)
          ElMessage.success('已删除组件')
        })
        .catch(() => {})
    }

    // 添加面包屑
    const handleAddBreadcrumb = () => {
      if (newBreadcrumb.value.trim()) {
        pageInfo.value.breadcrumb.push(newBreadcrumb.value.trim())
        newBreadcrumb.value = ''
      }
      showBreadcrumbInput.value = false
    }

    // 删除面包屑
    const handleRemoveBreadcrumb = index => {
      pageInfo.value.breadcrumb.splice(index, 1)
    }

    // 加载组件库配置
    onMounted(async () => {
      componentLibrary.value = await getAllComponents()
      console.log('Component library loaded:', componentLibrary.value)
    })

    return {
      activeTab,
      availableWrappers,
      selectedComponent,
      selectedComponentDef,
      pageInfo,
      globalAiPrompt,
      showBreadcrumbInput,
      newBreadcrumb,
      apiBindingDialogVisible,
      currentApiBindingData,
      handleAddApiBinding,
      handleEditApiBinding,
      handleRemoveApiBinding,
      handleApiBindingConfirm,
      handleCopy,
      handleDelete,
      handleAddBreadcrumb,
      handleRemoveBreadcrumb,
    }
  },
}
</script>

<style scoped>
.config-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Tab 样式 */
.config-tabs {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.config-tabs :deep(.el-tabs__header) {
  margin: 0;
  padding: 0 16px;
  border-bottom: 1px solid #e0e0e0;
}

.config-tabs :deep(.el-tabs__content) {
  flex: 1;
  overflow: hidden;
}

.config-tabs :deep(.el-tab-pane) {
  height: 100%;
  overflow-y: auto;
}

/* Tab 内容 */
.tab-content {
  padding: 16px;
  height: 100%;
}

/* 配置区块 */
.config-section {
  margin-bottom: 24px;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.section-title i {
  margin-right: 6px;
  color: #409eff;
}

.section-content {
  padding: 12px;
  background: #fafafa;
  border-radius: 6px;
}

.form-item-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
  line-height: 1.5;
}

/* 未选中状态 */
.no-selection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #909399;
}

.no-selection i {
  font-size: 48px;
  margin-bottom: 12px;
  color: #c0c4cc;
}

.no-selection p {
  font-size: 14px;
}

/* 空提示 */
.empty-tip {
  text-align: center;
  padding: 32px;
  color: #909399;
  font-size: 13px;
}

.empty-tip i {
  font-size: 32px;
  display: block;
  margin-bottom: 8px;
  color: #c0c4cc;
}

/* 接口绑定列表 */
.api-binding-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.api-binding-item {
  padding: 12px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.binding-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 13px;
}

.binding-content p {
  margin: 4px 0;
  font-size: 12px;
  color: #606266;
}

/* 操作按钮 */
.config-actions {
  display: flex;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid #e0e0e0;
}

.config-actions .el-button {
  flex: 1;
}

/* 提示文本 */
.tip {
  margin-top: 8px;
  font-size: 12px;
  color: #909399;
  line-height: 1.5;
}
</style>
