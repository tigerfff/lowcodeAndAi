<template>
  <div class="column-config-table">
    <div class="table-header">
      <h3>表格列配置</h3>
      <el-button size="small" type="primary" @click="handleAddColumn">
        
        添加列
      </el-button>
    </div>

    <el-table
      :data="localColumns"
      border
      row-key="prop"
      @row-click="handleRowClick"
    >
      <!-- 拖拽手柄 -->
      <el-table-column width="50" align="center">
        <template #default="{ row, $index }">
          <span class="drag-handle" @mousedown="handleDragStart($index)">☰</span>
        </template>
      </el-table-column>

      <!-- 显示/隐藏 -->
      <el-table-column label="显示" width="70" align="center">
        <template #default="{ row }">
          <el-switch
            v-model="row.visible"
            @change="handleChange"
          />
        </template>
      </el-table-column>

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

      <!-- 显示标题 -->
      <el-table-column label="显示标题" width="150">
        <template #default="{ row }">
          <el-input
            v-model="row.label"
            size="small"
            @change="handleChange"
          />
        </template>
      </el-table-column>

      <!-- 列类型 -->
      <el-table-column label="类型" width="130">
        <template #default="{ row }">
          <el-select
            v-model="row.type"
            size="small"
            @change="handleChange"
          >
            <el-option label="文本" value="text" />
            <el-option label="日期时间" value="datetime" />
            <el-option label="标签" value="tag" />
          </el-select>
        </template>
      </el-table-column>

      <!-- 列宽度 -->
      <el-table-column label="宽度" width="100">
        <template #default="{ row }">
          <el-input
            v-model="row.width"
            size="small"
            placeholder="自适应"
            @change="handleChange"
          />
        </template>
      </el-table-column>

      <!-- 状态映射（仅 tag 类型） -->
      <el-table-column label="状态映射" min-width="120">
        <template #default="{ row }">
          <el-button
            v-if="row.type === 'tag'"
            size="mini"
            type="text"
            @click="handleEditMapping(row, $index)"
          >
            {{ row.mapping ? '已配置' : '未配置' }}
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
            @click.stop="handleDeleteColumn($index)"
          >
            删除
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 状态映射编辑对话框 -->
    <el-dialog
      title="编辑状态映射"
      v-model="mappingDialogVisible"
      width="600px"
    >
      <div v-if="editingColumn" class="mapping-editor">
        <div class="mapping-info">
          <p>字段名：<strong>{{ editingColumn.prop }}</strong></p>
          <p class="tip">
            💡 为不同的值配置显示标签和标签类型
          </p>
        </div>

        <el-table :data="mappingList" border size="small">
          <el-table-column label="值" width="120">
            <template #default="{ row }">
              <el-input v-model="row.value" size="small" />
            </template>
          </el-table-column>
          <el-table-column label="显示标签" width="150">
            <template #default="{ row }">
              <el-input v-model="row.label" size="small" />
            </template>
          </el-table-column>
          <el-table-column label="标签类型" width="150">
            <template #default="{ row }">
              <el-select v-model="row.tagType" size="small">
                <el-option label="成功" value="success" />
                <el-option label="警告" value="warning" />
                <el-option label="危险" value="danger" />
                <el-option label="信息" value="info" />
                <el-option label="主要" value="primary" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template #default="{ row }">
              <el-button
                type="text"
                size="small"
                @click="removeMappingItem($index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="mapping-actions">
          <el-button size="small" @click="addMappingItem">
            
            添加映射
          </el-button>
        </div>
      </div>

      <template #footer>
        <el-button @click="mappingDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSaveMapping">确定</el-button>
      </div>
    </el-dialog>

    <!-- 添加列对话框 -->
    <el-dialog
      title="添加列"
      v-model="addColumnDialogVisible"
      width="500px"
    >
      <el-form :model="newColumn" label-width="100px">
        <el-form-item label="字段名" required>
          <el-input v-model="newColumn.prop" placeholder="例如: userName" />
        </el-form-item>
        <el-form-item label="显示标题" required>
          <el-input v-model="newColumn.label" placeholder="例如: 用户名称" />
        </el-form-item>
        <el-form-item label="列类型">
          <el-select v-model="newColumn.type">
            <el-option label="文本" value="text" />
            <el-option label="日期时间" value="datetime" />
            <el-option label="标签" value="tag" />
          </el-select>
        </el-form-item>
        <el-form-item label="列宽度">
          <el-input v-model="newColumn.width" placeholder="留空为自适应" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addColumnDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmAddColumn">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ColumnConfigTable',
  
  props: {
    columns: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      localColumns: [],
      mappingDialogVisible: false,
      editingColumn: null,
      editingColumnIndex: -1,
      mappingList: [],
      addColumnDialogVisible: false,
      newColumn: {
        prop: '',
        label: '',
        type: 'text',
        width: ''
      },
      dragStartIndex: -1,
      dragOverIndex: -1
    }
  },

  watch: {
    columns: {
      handler(val) {
        this.localColumns = val.map(col => ({
          ...col,
          visible: col.visible !== false // 默认显示
        }))
      },
      immediate: true,
      deep: true
    }
  },

  mounted() {
    this.initDragDrop()
  },

  methods: {
    initDragDrop() {
      // 拖拽功能在实际项目中建议使用 sortablejs 库
      // 这里提供简化实现
    },

    handleDragStart(index) {
      this.dragStartIndex = index
    },

    handleRowClick(row, column, event) {
      // 处理行点击
    },

    handleChange() {
      this.$emit('update:columns', this.localColumns)
    },

    handleAddColumn() {
      this.newColumn = {
        prop: '',
        label: '',
        type: 'text',
        width: ''
      }
      this.addColumnDialogVisible = true
    },

    handleConfirmAddColumn() {
      if (!this.newColumn.prop || !this.newColumn.label) {
        this.$message.warning('字段名和显示标题不能为空')
        return
      }

      // 检查字段名是否重复
      if (this.localColumns.some(col => col.prop === this.newColumn.prop)) {
        this.$message.error('字段名已存在')
        return
      }

      this.localColumns.push({
        ...this.newColumn,
        visible: true,
        confidence: 1.0 // 手动添加的列置信度为 1.0
      })

      this.addColumnDialogVisible = false
      this.handleChange()
      this.$message.success('添加成功')
    },

    handleDeleteColumn(index) {
      this.$confirm('确定删除该列配置？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.localColumns.splice(index, 1)
        this.handleChange()
        this.$message.success('删除成功')
      }).catch(() => {})
    },

    handleEditMapping(column, index) {
      this.editingColumn = column
      this.editingColumnIndex = index

      // 将 mapping 对象转换为数组
      if (column.mapping) {
        this.mappingList = Object.keys(column.mapping).map(key => ({
          value: key,
          label: column.mapping[key].label,
          tagType: column.mapping[key].type || 'info'
        }))
      } else {
        this.mappingList = []
      }

      this.mappingDialogVisible = true
    },

    addMappingItem() {
      this.mappingList.push({
        value: '',
        label: '',
        tagType: 'info'
      })
    },

    removeMappingItem(index) {
      this.mappingList.splice(index, 1)
    },

    handleSaveMapping() {
      // 将数组转换回 mapping 对象
      const mapping = {}
      this.mappingList.forEach(item => {
        if (item.value) {
          mapping[item.value] = {
            label: item.label || item.value,
            type: item.tagType
          }
        }
      })

      this.localColumns[this.editingColumnIndex].mapping = mapping
      this.mappingDialogVisible = false
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
.column-config-table {
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

.drag-handle {
  cursor: move;
  color: #909399;
  font-size: 18px;
}

.drag-handle:hover {
  color: #409eff;
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

.mapping-editor {
  padding: 0 16px;
}

.mapping-info {
  margin-bottom: 16px;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 4px;
}

.mapping-info p {
  margin: 8px 0;
  font-size: 14px;
  color: #606266;
}

.mapping-info strong {
  color: #303133;
}

.mapping-info .tip {
  font-size: 12px;
  color: #909399;
}

.mapping-actions {
  margin-top: 12px;
  text-align: center;
}
</style>

