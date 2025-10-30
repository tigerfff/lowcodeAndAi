<template>
  <div class="api-parse-result">
    <div class="result-header">
      <h3>🔍 解析结果</h3>
      <el-tag v-if="parseResult" type="success" size="small">
        <i class="el-icon-success"></i>
        解析成功
      </el-tag>
    </div>

    <el-alert
      v-if="!parseResult"
      type="info"
      :closable="false"
      show-icon
    >
      请先在左侧粘贴 API 响应数据并点击"解析并推断"
    </el-alert>

    <div v-if="parseResult" class="result-content">
      <!-- 数据路径 -->
      <div class="result-section">
        <div class="section-header">
          <span class="section-title">📊 数据数组路径</span>
          <el-tooltip content="指向响应中包含列表数据的数组字段" placement="top">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </div>
        <div class="path-input-group">
          <el-input
            v-model="localResult.dataPath"
            placeholder="data.rows"
            @change="handleDataChange"
          >
            <template slot="prepend">response.</template>
          </el-input>
          <el-button
            v-if="hasDataAlternatives"
            size="small"
            @click="showDataAlternatives = !showDataAlternatives"
          >
            {{ showDataAlternatives ? '收起' : '查看备选' }}
          </el-button>
        </div>
        
        <!-- 备选路径 -->
        <div v-if="showDataAlternatives && hasDataAlternatives" class="alternatives">
          <div class="alternatives-title">备选路径：</div>
          <el-tag
            v-for="(alt, idx) in parseResult.dataPathAlternatives"
            :key="idx"
            size="small"
            class="alt-tag"
            @click="selectDataPath(alt.path)"
          >
            {{ alt.path }} ({{ alt.length }} 条)
          </el-tag>
        </div>
        
        <!-- 数据预览 -->
        <div class="data-preview">
          <div class="preview-title">数据样例：</div>
          <pre class="preview-code">{{ formatJson(parseResult.dataSample.slice(0, 2)) }}</pre>
        </div>
      </div>

      <!-- 总数路径 -->
      <div class="result-section">
        <div class="section-header">
          <span class="section-title">🔢 总数字段路径</span>
          <el-tooltip content="指向响应中的数据总条数字段" placement="top">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </div>
        <div class="path-input-group">
          <el-input
            v-model="localResult.totalPath"
            placeholder="data.total"
            @change="handleDataChange"
          >
            <template slot="prepend">response.</template>
          </el-input>
          <el-button
            v-if="hasTotalAlternatives"
            size="small"
            @click="showTotalAlternatives = !showTotalAlternatives"
          >
            {{ showTotalAlternatives ? '收起' : '查看备选' }}
          </el-button>
        </div>
        
        <!-- 备选路径 -->
        <div v-if="showTotalAlternatives && hasTotalAlternatives" class="alternatives">
          <div class="alternatives-title">备选路径：</div>
          <el-tag
            v-for="(alt, idx) in parseResult.totalPathAlternatives"
            :key="idx"
            size="small"
            class="alt-tag"
            @click="selectTotalPath(alt.path)"
          >
            {{ alt.path }} (值: {{ alt.value }})
          </el-tag>
        </div>
      </div>

      <!-- 分页参数 -->
      <div class="result-section">
        <div class="section-header">
          <span class="section-title">📄 分页参数映射</span>
          <el-tooltip content="请求时使用的分页参数字段名" placement="top">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </div>
        <el-row :gutter="16">
          <el-col :span="12">
            <div class="param-item">
              <label>页码参数：</label>
              <el-input
                v-model="localResult.pagination.pageNoField"
                size="small"
                placeholder="pageNo"
                @change="handleDataChange"
              />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="param-item">
              <label>每页条数参数：</label>
              <el-input
                v-model="localResult.pagination.pageSizeField"
                size="small"
                placeholder="pageSize"
                @change="handleDataChange"
              />
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 识别的字段 -->
      <div class="result-section">
        <div class="section-header">
          <span class="section-title">📝 识别的数据字段</span>
          <span class="field-count">({{ parseResult.fields.length }} 个字段)</span>
        </div>
        <el-table
          :data="parseResult.fields"
          size="small"
          border
          max-height="300"
        >
          <el-table-column prop="key" label="字段名" width="150" />
          <el-table-column prop="type" label="类型" width="100">
            <template slot-scope="scope">
              <el-tag size="mini" :type="getTypeTagType(scope.row.type)">
                {{ scope.row.type }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sample" label="样例值">
            <template slot-scope="scope">
              <span class="sample-value">{{ formatSampleValue(scope.row.sample) }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-tip">
          💡 这些字段将用于自动生成表格列和搜索条件
        </div>
      </div>

      <!-- 推断的搜索字段 -->
      <div v-if="parseResult.searchFields && parseResult.searchFields.length > 0" class="result-section">
        <div class="section-header">
          <span class="section-title">🔎 推断的搜索条件</span>
          <span class="field-count">({{ parseResult.searchFields.length }} 个)</span>
        </div>
        <el-table
          :data="parseResult.searchFields"
          size="small"
          border
        >
          <el-table-column prop="prop" label="字段名" width="150" />
          <el-table-column prop="type" label="组件类型" width="120">
            <template slot-scope="scope">
              <el-tag size="mini" type="primary">
                {{ scope.row.type }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="defaultValue" label="默认值">
            <template slot-scope="scope">
              <span class="sample-value">{{ formatSampleValue(scope.row.defaultValue) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 操作按钮 -->
      <div class="result-actions">
        <el-button @click="handleReset">重新解析</el-button>
        <el-button type="primary" @click="handleConfirm">
          <i class="el-icon-check"></i>
          确认并继续
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApiParseResult',
  
  props: {
    parseResult: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      localResult: null,
      showDataAlternatives: false,
      showTotalAlternatives: false
    }
  },

  computed: {
    hasDataAlternatives() {
      return this.parseResult?.dataPathAlternatives?.length > 0
    },
    hasTotalAlternatives() {
      return this.parseResult?.totalPathAlternatives?.length > 0
    }
  },

  watch: {
    parseResult: {
      handler(val) {
        if (val) {
          this.localResult = JSON.parse(JSON.stringify(val))
        }
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    formatJson(data) {
      return JSON.stringify(data, null, 2)
    },

    formatSampleValue(value) {
      if (value === null) return 'null'
      if (value === undefined) return 'undefined'
      if (value === '') return '(空字符串)'
      if (typeof value === 'object') {
        return JSON.stringify(value)
      }
      return String(value)
    },

    getTypeTagType(type) {
      const typeMap = {
        string: 'success',
        number: 'warning',
        boolean: 'info',
        object: 'danger',
        array: 'primary'
      }
      return typeMap[type] || ''
    },

    selectDataPath(path) {
      this.localResult.dataPath = path
      this.showDataAlternatives = false
      this.handleDataChange()
    },

    selectTotalPath(path) {
      this.localResult.totalPath = path
      this.showTotalAlternatives = false
      this.handleDataChange()
    },

    handleDataChange() {
      this.$emit('update', this.localResult)
    },

    handleReset() {
      this.$emit('reset')
    },

    handleConfirm() {
      // 验证必填项
      if (!this.localResult.dataPath) {
        this.$message.warning('请设置数据数组路径')
        return
      }

      this.$emit('confirm', this.localResult)
    }
  }
}
</script>

<style scoped>
.api-parse-result {
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.result-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.result-content {
  margin-top: 20px;
}

.result-section {
  margin-bottom: 24px;
  padding: 16px;
  background: #fafafa;
  border-radius: 6px;
  border: 1px solid #e4e7ed;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

.field-count {
  margin-left: 8px;
  font-size: 12px;
  color: #909399;
}

.section-header i {
  margin-left: 6px;
  color: #909399;
  cursor: help;
  font-size: 16px;
}

.path-input-group {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.path-input-group .el-input {
  flex: 1;
}

.alternatives {
  margin-top: 12px;
  padding: 12px;
  background: #fff;
  border-radius: 4px;
  border: 1px dashed #dcdfe6;
}

.alternatives-title {
  font-size: 12px;
  color: #909399;
  margin-bottom: 8px;
}

.alt-tag {
  margin-right: 8px;
  margin-bottom: 8px;
  cursor: pointer;
}

.alt-tag:hover {
  opacity: 0.8;
}

.data-preview {
  margin-top: 12px;
}

.preview-title {
  font-size: 12px;
  color: #909399;
  margin-bottom: 6px;
}

.preview-code {
  margin: 0;
  padding: 12px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.6;
  color: #303133;
  max-height: 200px;
  overflow: auto;
}

.param-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.param-item label {
  font-size: 13px;
  color: #606266;
}

.table-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #909399;
  padding-left: 4px;
}

.sample-value {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 12px;
  color: #606266;
}

.result-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e4e7ed;
}
</style>

