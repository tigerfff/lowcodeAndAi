<template>
  <div class="config-confirm-panel">
    <div class="panel-header">
      <h3>📝 配置确认与调整</h3>
      <p>请确认 AI 推断的配置，可以手动调整</p>
    </div>

    <!-- 低置信度警告 -->
    <el-alert
      v-if="lowConfidenceItems.length > 0"
      type="warning"
      :closable="false"
      show-icon
      class="confidence-alert"
    >
      <template #title>
        <strong>检测到 {{ lowConfidenceItems.length }} 个低置信度项</strong>
      </template>
      <div>以下配置项的置信度较低（< 80%），建议重点检查：</div>
      <ul class="low-confidence-list">
        <li v-for="item in lowConfidenceItems" :key="item.path">
          <el-tag size="mini" :type="getConfidenceType(item.confidence)">
            {{ (item.confidence * 100).toFixed(0) }}%
          </el-tag>
          {{ item.type === 'column' ? '表格列' : '搜索字段' }}: 
          <strong>{{ item.label || item.prop }}</strong>
        </li>
      </ul>
    </el-alert>

    <el-tabs v-model="activeTab" type="border-card">
      <!-- Tab 1: 表格列配置 -->
      <el-tab-pane label="表格列配置" name="columns">
        <div class="tab-header">
          <span>共 {{ localConfig.columns.length }} 列</span>
          <el-button size="small" type="primary" @click="addColumn">
            + 添加列
          </el-button>
        </div>

        <el-table
          :data="localConfig.columns"
          row-key="prop"
          border
          class="draggable-table"
        >
          <el-table-column label="拖拽" width="60" align="center">
            <template #default>
              <span class="drag-handle">☰</span>
            </template>
          </el-table-column>

          <el-table-column label="显示" width="60" align="center">
            <template #default="{ row }">
              <el-checkbox v-model="row.visible" />
            </template>
          </el-table-column>

          <el-table-column label="字段名" width="150">
            <template #default="{ row }">
              <el-input
                v-model="row.prop"
                size="small"
                placeholder="字段名"
              />
            </template>
          </el-table-column>

          <el-table-column label="显示标题" width="150">
            <template #default="{ row }">
              <el-input
                v-model="row.label"
                size="small"
                :class="{'low-confidence-input': isLowConfidence(row)}"
                placeholder="显示标题"
              />
            </template>
          </el-table-column>

          <el-table-column label="类型" width="120">
            <template #default="{ row }">
              <el-select v-model="row.type" size="small">
                <el-option label="文本" value="text" />
                <el-option label="日期时间" value="datetime" />
                <el-option label="标签" value="tag" />
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="宽度" width="100">
            <template #default="{ row }">
              <el-input
                v-model="row.width"
                size="small"
                placeholder="auto"
              />
            </template>
          </el-table-column>

          <el-table-column label="置信度" width="100" align="center">
            <template #default="{ row }">
              <el-tooltip
                v-if="row.confidence"
                :content="`置信度: ${(row.confidence * 100).toFixed(1)}%`"
                placement="top"
              >
                <el-tag
                  size="small"
                  :type="getConfidenceType(row.confidence)"
                >
                  {{ (row.confidence * 100).toFixed(0) }}%
                </el-tag>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ row, $index }">
              <el-button
                v-if="row.type === 'tag'"
                type="text"
                size="small"
                @click="editMapping($index)"
              >
                编辑映射
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="removeColumn($index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- Tab 2: 搜索字段配置 -->
      <el-tab-pane label="搜索字段配置" name="search">
        <div class="tab-header">
          <span>共 {{ localConfig.searchFields.length }} 个搜索字段</span>
          <el-button size="small" type="primary" @click="addSearchField">
            + 添加搜索字段
          </el-button>
        </div>

        <el-table :data="localConfig.searchFields" border>
          <el-table-column label="字段名" width="150">
            <template #default="{ row }">
              <el-input
                v-model="row.prop"
                size="small"
                placeholder="字段名"
              />
            </template>
          </el-table-column>

          <el-table-column label="显示标签" width="150">
            <template #default="{ row }">
              <el-input
                v-model="row.label"
                size="small"
                :class="{'low-confidence-input': isLowConfidence(row)}"
                placeholder="显示标签"
              />
            </template>
          </el-table-column>

          <el-table-column label="组件类型" width="130">
            <template #default="{ row }">
              <el-select v-model="row.type" size="small">
                <el-option label="输入框" value="input" />
                <el-option label="下拉选择" value="select" />
                <el-option label="日期" value="date" />
                <el-option label="日期范围" value="daterange" />
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="默认值" width="120">
            <template #default="{ row }">
              <el-input
                v-model="row.defaultValue"
                size="small"
                placeholder="默认值"
              />
            </template>
          </el-table-column>

          <el-table-column label="置信度" width="100" align="center">
            <template #default="{ row }">
              <el-tooltip
                v-if="row.confidence"
                :content="`置信度: ${(row.confidence * 100).toFixed(1)}%`"
                placement="top"
              >
                <el-tag
                  size="small"
                  :type="getConfidenceType(row.confidence)"
                >
                  {{ (row.confidence * 100).toFixed(0) }}%
                </el-tag>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="200" fixed="right">
            <template #default="{ row, $index }">
              <el-button
                v-if="row.type === 'select'"
                type="text"
                size="small"
                @click="editOptions($index)"
              >
                编辑选项
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="removeSearchField($index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- Tab 3: 数据路径配置 -->
      <el-tab-pane label="数据路径配置" name="dataMapping">
        <el-form label-width="140px">
          <el-form-item label="数据数组路径">
            <el-select
              v-model="localConfig.dataMapping.dataPath"
              placeholder="选择或输入数据路径"
              allow-create
              filterable
            >
              <el-option
                v-for="path in dataPathOptions"
                :key="path.path"
                :label="`${path.path} (${path.length} 条)`"
                :value="path.path"
              />
            </el-select>
            <div class="form-tip">
              响应数据中列表数据的路径，如: data.rows
            </div>
          </el-form-item>

          <el-form-item label="总数字段路径">
            <el-select
              v-model="localConfig.dataMapping.totalPath"
              placeholder="选择或输入总数路径"
              allow-create
              filterable
              clearable
            >
              <el-option
                v-for="path in totalPathOptions"
                :key="path.path"
                :label="`${path.path} (值: ${path.value})`"
                :value="path.path"
              />
            </el-select>
            <div class="form-tip">
              响应数据中总条数的路径，如: data.total
            </div>
          </el-form-item>

          <el-form-item label="页码参数名">
            <el-input
              v-model="localConfig.dataMapping.pageNoField"
              placeholder="pageNo"
            />
            <div class="form-tip">
              请求时页码参数的字段名
            </div>
          </el-form-item>

          <el-form-item label="每页条数参数名">
            <el-input
              v-model="localConfig.dataMapping.pageSizeField"
              placeholder="pageSize"
            />
            <div class="form-tip">
              请求时每页条数参数的字段名
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- Tab 4: 页面基本信息 -->
      <el-tab-pane label="页面信息" name="basic">
        <el-form label-width="140px">
          <el-form-item label="页面组件名">
            <el-input
              v-model="localConfig.pageName"
              placeholder="GeneratedPage"
            />
            <div class="form-tip">
              Vue 组件名称，使用 PascalCase 命名，如: UserList
            </div>
          </el-form-item>

          <el-form-item label="面包屑导航">
            <el-tag
              v-for="(item, index) in localConfig.breadcrumb"
              :key="index"
              closable
              @close="removeBreadcrumb(index)"
            >
              {{ item }}
            </el-tag>
            <el-input
              v-if="showBreadcrumbInput"
              v-model="newBreadcrumb"
              size="small"
              style="width: 120px; margin-left: 10px"
              @keyup.enter="addBreadcrumb"
              @blur="addBreadcrumb"
            />
            <el-button
              v-else
              size="small"
              style="margin-left: 10px"
              @click="showBreadcrumbInput = true"
            >
              + 添加
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <!-- 操作按钮 -->
    <div class="panel-actions">
      <el-button @click="handleReset">重置</el-button>
      <el-button type="success" :loading="validating" @click="handleValidate">
        ✓ 校验配置
      </el-button>
      <el-button type="primary" :loading="generating" @click="handleGenerate">
        📄 生成代码
      </el-button>
    </div>

    <!-- 编辑状态映射对话框 -->
    <el-dialog
      title="编辑状态映射"
      v-model="mappingDialogVisible"
      width="600px"
    >
      <el-form label-width="100px">
        <el-form-item
          v-for="(value, key) in editingMapping"
          :key="key"
          :label="`值: ${key}`"
        >
          <el-row :gutter="10">
            <el-col :span="12">
              <el-input v-model="value.label" placeholder="显示标签" />
            </el-col>
            <el-col :span="12">
              <el-select v-model="value.type" placeholder="标签类型">
                <el-option label="成功 (绿)" value="success" />
                <el-option label="警告 (橙)" value="warning" />
                <el-option label="危险 (红)" value="danger" />
                <el-option label="信息 (灰)" value="info" />
                <el-option label="主要 (蓝)" value="primary" />
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="mappingDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveMapping">确定</el-button>
      </template>
    </el-dialog>

    <!-- 编辑选项对话框 -->
    <el-dialog
      title="编辑下拉选项"
      v-model="optionsDialogVisible"
      width="600px"
    >
      <el-button size="small" type="primary" @click="addOption">
        + 添加选项
      </el-button>
      <el-table :data="editingOptions" border style="margin-top: 10px">
        <el-table-column label="显示文本" width="250">
          <template #default="{ row }">
            <el-input v-model="row.label" placeholder="显示文本" />
          </template>
        </el-table-column>
        <el-table-column label="值">
          <template #default="{ row }">
            <el-input v-model="row.value" placeholder="值" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template #default="{ $index }">
            <el-button
              type="text"
              size="small"
              @click="removeOption($index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <el-button @click="optionsDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveOptions">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import { checkConfidence } from '../utils/configValidator.js'

export default {
  name: 'ConfigConfirmPanel',
  
  props: {
    config: {
      type: Object,
      required: true
    },
    parseResult: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      localConfig: null,
      activeTab: 'columns',
      validating: false,
      generating: false,
      mappingDialogVisible: false,
      optionsDialogVisible: false,
      editingMapping: {},
      editingOptions: [],
      editingIndex: -1,
      showBreadcrumbInput: false,
      newBreadcrumb: '',
      sortableInstance: null
    }
  },

  computed: {
    lowConfidenceItems() {
      if (!this.localConfig) return []
      return checkConfidence(this.localConfig, 0.8)
    },

    dataPathOptions() {
      if (!this.parseResult || !this.parseResult.dataPathAlternatives) {
        return []
      }
      return [
        {
          path: this.parseResult.dataPath,
          length: this.parseResult.dataSample?.length || 0
        },
        ...this.parseResult.dataPathAlternatives
      ]
    },

    totalPathOptions() {
      if (!this.parseResult || !this.parseResult.totalPathAlternatives) {
        return []
      }
      const options = []
      if (this.parseResult.totalPath) {
        options.push({
          path: this.parseResult.totalPath,
          value: '当前'
        })
      }
      return [...options, ...this.parseResult.totalPathAlternatives]
    }
  },

  watch: {
    config: {
      handler(val) {
        if (val) {
          this.localConfig = JSON.parse(JSON.stringify(val))
          // 确保所有列都有 visible 属性
          if (this.localConfig.columns) {
            this.localConfig.columns.forEach(col => {
              if (col.visible === undefined) {
                col.visible = true
              }
            })
          }
        }
      },
      immediate: true,
      deep: true
    }
  },

  mounted() {
    this.initDraggable()
  },

  beforeUnmount() {
    if (this.sortableInstance) {
      this.sortableInstance.destroy()
    }
  },

  methods: {
    initDraggable() {
      this.$nextTick(() => {
        const el = this.$el.querySelector('.draggable-table .el-table__body-wrapper tbody')
        if (el) {
          this.sortableInstance = Sortable.create(el, {
            handle: '.drag-handle',
            animation: 150,
            onEnd: (evt) => {
              const { oldIndex, newIndex } = evt
              const columns = this.localConfig.columns
              const movedItem = columns.splice(oldIndex, 1)[0]
              columns.splice(newIndex, 0, movedItem)
            }
          })
        }
      })
    },

    isLowConfidence(item) {
      return item.confidence && item.confidence < 0.8
    },

    getConfidenceType(confidence) {
      if (confidence >= 0.9) return 'success'
      if (confidence >= 0.8) return ''
      if (confidence >= 0.7) return 'warning'
      return 'danger'
    },

    addColumn() {
      this.localConfig.columns.push({
        prop: '',
        label: '',
        type: 'text',
        visible: true,
        confidence: 1.0
      })
    },

    removeColumn(index) {
      this.localConfig.columns.splice(index, 1)
    },

    editMapping(index) {
      const column = this.localConfig.columns[index]
      this.editingMapping = column.mapping ? JSON.parse(JSON.stringify(column.mapping)) : {}
      this.editingIndex = index
      this.mappingDialogVisible = true
    },

    saveMapping() {
      this.localConfig.columns[this.editingIndex].mapping = this.editingMapping
      this.mappingDialogVisible = false
    },

    addSearchField() {
      this.localConfig.searchFields.push({
        prop: '',
        label: '',
        type: 'input',
        defaultValue: '',
        confidence: 1.0
      })
    },

    removeSearchField(index) {
      this.localConfig.searchFields.splice(index, 1)
    },

    editOptions(index) {
      const field = this.localConfig.searchFields[index]
      this.editingOptions = field.options ? JSON.parse(JSON.stringify(field.options)) : []
      this.editingIndex = index
      this.optionsDialogVisible = true
    },

    addOption() {
      this.editingOptions.push({
        label: '',
        value: ''
      })
    },

    removeOption(index) {
      this.editingOptions.splice(index, 1)
    },

    saveOptions() {
      this.localConfig.searchFields[this.editingIndex].options = this.editingOptions
      this.optionsDialogVisible = false
    },

    addBreadcrumb() {
      if (this.newBreadcrumb.trim()) {
        this.localConfig.breadcrumb.push(this.newBreadcrumb.trim())
        this.newBreadcrumb = ''
      }
      this.showBreadcrumbInput = false
    },

    removeBreadcrumb(index) {
      this.localConfig.breadcrumb.splice(index, 1)
    },

    handleReset() {
      this.$confirm('确定重置所有修改？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.localConfig = JSON.parse(JSON.stringify(this.config))
        this.$message.success('已重置')
      }).catch(() => {})
    },

    async handleValidate() {
      this.validating = true
      try {
        this.$emit('validate', this.localConfig)
      } finally {
        this.validating = false
      }
    },

    async handleGenerate() {
      this.generating = true
      try {
        this.$emit('generate', this.localConfig)
      } finally {
        setTimeout(() => {
          this.generating = false
        }, 500)
      }
    }
  }
}
</script>

<style scoped>
.config-confirm-panel {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
}

.panel-header {
  margin-bottom: 20px;
}

.panel-header h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.panel-header p {
  margin: 0;
  font-size: 14px;
  color: #909399;
}

.confidence-alert {
  margin-bottom: 20px;
}

.low-confidence-list {
  margin: 10px 0 0 20px;
  padding: 0;
}

.low-confidence-list li {
  margin-bottom: 5px;
  color: #606266;
}

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ebeef5;
}

.drag-handle {
  cursor: move;
  color: #909399;
  font-size: 18px;
}

.drag-handle:hover {
  color: #409eff;
}

.low-confidence-input :deep(.el-input__inner) {
  border-color: #e6a23c;
  background-color: #fdf6ec;
}

.form-tip {
  margin-top: 5px;
  font-size: 12px;
  color: #909399;
  line-height: 1.5;
}

.panel-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e4e7ed;
}
</style>

