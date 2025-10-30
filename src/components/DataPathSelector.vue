<template>
  <div class="data-path-selector">
    <el-form label-width="120px">
      <!-- 数据路径 -->
      <el-form-item label="数据数组路径" required>
        <div class="path-input-group">
          <el-input
            v-model="localDataMapping.dataPath"
            placeholder="data.rows"
            @change="handleChange"
          >
            <template #prepend>response.</template>
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
          <div class="alternatives-title">备选路径（点击选择）：</div>
          <el-tag
            v-for="(alt, idx) in dataPathAlternatives"
            :key="idx"
            size="small"
            class="alt-tag"
            @click="selectDataPath(alt.path)"
          >
            {{ alt.path }} ({{ alt.length }} 条)
          </el-tag>
        </div>
      </el-form-item>

      <!-- 总数路径 -->
      <el-form-item label="总数字段路径">
        <div class="path-input-group">
          <el-input
            v-model="localDataMapping.totalPath"
            placeholder="data.total"
            @change="handleChange"
          >
            <template #prepend>response.</template>
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
          <div class="alternatives-title">备选路径（点击选择）：</div>
          <el-tag
            v-for="(alt, idx) in totalPathAlternatives"
            :key="idx"
            size="small"
            class="alt-tag"
            @click="selectTotalPath(alt.path)"
          >
            {{ alt.path }} (值: {{ alt.value }})
          </el-tag>
        </div>
      </el-form-item>

      <!-- 分页参数映射 -->
      <el-divider content-position="left">分页参数映射</el-divider>

      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="页码参数" required>
            <el-input
              v-model="localDataMapping.pageNoField"
              placeholder="pageNo"
              @change="handleChange"
            />
            <div class="field-tip">请求参数中的页码字段名</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="每页条数参数" required>
            <el-input
              v-model="localDataMapping.pageSizeField"
              placeholder="pageSize"
              @change="handleChange"
            />
            <div class="field-tip">请求参数中的每页条数字段名</div>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 常见分页参数快速选择 -->
      <el-form-item label="快速选择">
        <el-button-group>
          <el-button
            size="small"
            @click="applyPaginationPreset('pageNo', 'pageSize')"
          >
            pageNo / pageSize
          </el-button>
          <el-button
            size="small"
            @click="applyPaginationPreset('page', 'size')"
          >
            page / size
          </el-button>
          <el-button
            size="small"
            @click="applyPaginationPreset('current', 'limit')"
          >
            current / limit
          </el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'DataPathSelector',
  
  props: {
    dataMapping: {
      type: Object,
      required: true
    },
    dataPathAlternatives: {
      type: Array,
      default: () => []
    },
    totalPathAlternatives: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      localDataMapping: {
        dataPath: '',
        totalPath: '',
        pageNoField: 'pageNo',
        pageSizeField: 'pageSize'
      },
      showDataAlternatives: false,
      showTotalAlternatives: false
    }
  },

  computed: {
    hasDataAlternatives() {
      return this.dataPathAlternatives && this.dataPathAlternatives.length > 0
    },
    hasTotalAlternatives() {
      return this.totalPathAlternatives && this.totalPathAlternatives.length > 0
    }
  },

  watch: {
    dataMapping: {
      handler(val) {
        if (val) {
          this.localDataMapping = { ...val }
        }
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    selectDataPath(path) {
      this.localDataMapping.dataPath = path
      this.showDataAlternatives = false
      this.handleChange()
    },

    selectTotalPath(path) {
      this.localDataMapping.totalPath = path
      this.showTotalAlternatives = false
      this.handleChange()
    },

    applyPaginationPreset(pageNo, pageSize) {
      this.localDataMapping.pageNoField = pageNo
      this.localDataMapping.pageSizeField = pageSize
      this.handleChange()
    },

    handleChange() {
      this.$emit('update:dataMapping', this.localDataMapping)
    }
  }
}
</script>

<style scoped>
.data-path-selector {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
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
  background: #f5f7fa;
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

.field-tip {
  margin-top: 4px;
  font-size: 12px;
  color: #909399;
}

.el-button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>

