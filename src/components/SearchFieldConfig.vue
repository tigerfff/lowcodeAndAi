<template>
  <div class="search-field-config">
    <div class="table-header">
      <h3>搜索字段配置</h3>
      <el-button size="small" type="primary" @click="handleAddField">
        
        添加搜索字段
      </el-button>
    </div>

    <el-table :data="localSearchFields" border>
      <!-- 字段名 -->
      <el-table-column label="字段名" width="150">
        <template #default="{ row }">
          <div class="field-name">
            {{ row.prop }}
            <el-tag
              v-if="row.confidence && row.confidence < 0.8"
              type="warning"
              size="mini"
              class="confidence-tag"
            >
              低置信度
            </el-tag>
          </div>
        </template>
      </el-table-column>

      <!-- 显示标签 -->
      <el-table-column label="显示标签" width="150">
        <template #default="{ row }">
          <el-input
            v-model="row.label"
            size="small"
            @change="handleChange"
          />
        </template>
      </el-table-column>

      <!-- 组件类型 -->
      <el-table-column label="组件类型" width="130">
        <template #default="{ row }">
          <el-select
            v-model="row.type"
            size="small"
            @change="handleTypeChange(row)"
          >
            <el-option label="输入框" value="input" />
            <el-option label="下拉选择" value="select" />
            <el-option label="日期" value="date" />
            <el-option label="日期范围" value="daterange" />
          </el-select>
        </template>
      </el-table-column>

      <!-- 默认值 -->
      <el-table-column label="默认值" width="150">
        <template #default="{ row }">
          <el-input
            v-model="row.defaultValue"
            size="small"
            @change="handleChange"
          />
        </template>
      </el-table-column>

      <!-- 选项配置（仅 select 类型） -->
      <el-table-column label="选项配置" min-width="120">
        <template #default="{ row }">
          <el-button
            v-if="row.type === 'select'"
            size="mini"
            type="text"
            @click="handleEditOptions(row, $index)"
          >
            
            {{ row.options && row.options.length > 0 ? `${row.options.length} 个选项` : '未配置' }}
          </el-button>
          <span v-else class="not-applicable">-</span>
        </template>
      </el-table-column>

      <!-- 置信度 -->
      <el-table-column label="置信度" width="100" align="center">
        <template #default="{ row }">
          <el-tag
            v-if="row.confidence"
            :type="getConfidenceType(row.confidence)"
            size="small"
          >
            {{ (row.confidence * 100).toFixed(0) }}%
          </el-tag>
          <span v-else>-</span>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="100" align="center" fixed="right">
        <template #default="{ row }">
          <el-button
            type="text"
            size="small"
            @click="handleDeleteField($index)"
          >
            删除
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 选项编辑对话框 -->
    <el-dialog
      title="编辑选项"
      v-model="optionsDialogVisible"
      width="600px"
    >
      <div v-if="editingField" class="options-editor">
        <div class="options-info">
          <p>字段名：<strong>{{ editingField.prop }}</strong></p>
          <p class="tip">
            💡 配置下拉选择框的选项列表
          </p>
        </div>

        <el-table :data="optionsList" border size="small">
          <el-table-column label="显示标签" width="200">
            <template #default="{ row }">
              <el-input v-model="row.label" size="small" placeholder="例如：全部" />
            </template>
          </el-table-column>
          <el-table-column label="值" width="200">
            <template #default="{ row }">
              <el-input v-model="row.value" size="small" placeholder="例如：空字符串" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template #default="{ row }">
              <el-button
                type="text"
                size="small"
                @click="removeOptionItem($index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="options-actions">
          <el-button size="small" @click="addOptionItem">
            
            添加选项
          </el-button>
          <el-button size="small" @click="loadCommonOptions">
            🧙
            加载常用选项
          </el-button>
        </div>
      </div>

      <template #footer>
        <el-button @click="optionsDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSaveOptions">确定</el-button>
      </div>
    </el-dialog>

    <!-- 添加字段对话框 -->
    <el-dialog
      title="添加搜索字段"
      v-model="addFieldDialogVisible"
      width="500px"
    >
      <el-form :model="newField" label-width="100px">
        <el-form-item label="字段名" required>
          <el-input v-model="newField.prop" placeholder="例如: userName" />
        </el-form-item>
        <el-form-item label="显示标签" required>
          <el-input v-model="newField.label" placeholder="例如: 用户名称" />
        </el-form-item>
        <el-form-item label="组件类型">
          <el-select v-model="newField.type">
            <el-option label="输入框" value="input" />
            <el-option label="下拉选择" value="select" />
            <el-option label="日期" value="date" />
            <el-option label="日期范围" value="daterange" />
          </el-select>
        </el-form-item>
        <el-form-item label="默认值">
          <el-input v-model="newField.defaultValue" placeholder="留空表示无默认值" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addFieldDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmAddField">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SearchFieldConfig',
  
  props: {
    searchFields: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      localSearchFields: [],
      optionsDialogVisible: false,
      editingField: null,
      editingFieldIndex: -1,
      optionsList: [],
      addFieldDialogVisible: false,
      newField: {
        prop: '',
        label: '',
        type: 'input',
        defaultValue: ''
      }
    }
  },

  watch: {
    searchFields: {
      handler(val) {
        this.localSearchFields = JSON.parse(JSON.stringify(val))
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    handleChange() {
      this.$emit('update:searchFields', this.localSearchFields)
    },

    handleTypeChange(field) {
      // 如果切换到 select 类型但没有 options，初始化一个空数组
      if (field.type === 'select' && !field.options) {
        field.options = []
      }
      this.handleChange()
    },

    handleAddField() {
      this.newField = {
        prop: '',
        label: '',
        type: 'input',
        defaultValue: ''
      }
      this.addFieldDialogVisible = true
    },

    handleConfirmAddField() {
      if (!this.newField.prop || !this.newField.label) {
        this.$message.warning('字段名和显示标签不能为空')
        return
      }

      // 检查字段名是否重复
      if (this.localSearchFields.some(f => f.prop === this.newField.prop)) {
        this.$message.error('字段名已存在')
        return
      }

      const field = {
        ...this.newField,
        confidence: 1.0 // 手动添加的字段置信度为 1.0
      }

      // 如果是 select 类型，初始化 options
      if (field.type === 'select') {
        field.options = []
      }

      this.localSearchFields.push(field)
      this.addFieldDialogVisible = false
      this.handleChange()
      this.$message.success('添加成功')
    },

    handleDeleteField(index) {
      this.$confirm('确定删除该搜索字段？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.localSearchFields.splice(index, 1)
        this.handleChange()
        this.$message.success('删除成功')
      }).catch(() => {})
    },

    handleEditOptions(field, index) {
      this.editingField = field
      this.editingFieldIndex = index

      // 初始化选项列表
      if (field.options && field.options.length > 0) {
        this.optionsList = JSON.parse(JSON.stringify(field.options))
      } else {
        this.optionsList = [
          { label: '全部', value: '' }
        ]
      }

      this.optionsDialogVisible = true
    },

    addOptionItem() {
      this.optionsList.push({
        label: '',
        value: ''
      })
    },

    removeOptionItem(index) {
      this.optionsList.splice(index, 1)
    },

    loadCommonOptions() {
      const fieldName = this.editingField.prop.toLowerCase()
      let commonOptions = []

      if (fieldName.includes('status')) {
        commonOptions = [
          { label: '全部', value: '' },
          { label: '启用', value: 'active' },
          { label: '停用', value: 'inactive' }
        ]
      } else if (fieldName.includes('type')) {
        commonOptions = [
          { label: '全部', value: '' },
          { label: '类型1', value: '1' },
          { label: '类型2', value: '2' }
        ]
      } else {
        this.$message.info('该字段暂无预设选项')
        return
      }

      this.optionsList = commonOptions
      this.$message.success('已加载常用选项')
    },

    handleSaveOptions() {
      // 过滤掉空的选项
      const validOptions = this.optionsList.filter(opt => opt.label && opt.value !== undefined)

      this.localSearchFields[this.editingFieldIndex].options = validOptions
      this.optionsDialogVisible = false
      this.handleChange()
      this.$message.success('保存成功')
    },

    getConfidenceType(confidence) {
      if (confidence >= 0.9) return 'success'
      if (confidence >= 0.8) return 'primary'
      if (confidence >= 0.6) return 'warning'
      return 'danger'
    }
  }
}
</script>

<style scoped>
.search-field-config {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.table-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.field-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.confidence-tag {
  flex-shrink: 0;
}

.not-applicable {
  color: #c0c4cc;
}

.options-editor {
  padding: 0 16px;
}

.options-info {
  margin-bottom: 16px;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 4px;
}

.options-info p {
  margin: 8px 0;
  font-size: 14px;
  color: #606266;
}

.options-info strong {
  color: #303133;
}

.options-info .tip {
  font-size: 12px;
  color: #909399;
}

.options-actions {
  margin-top: 12px;
  display: flex;
  gap: 12px;
  justify-content: center;
}
</style>

