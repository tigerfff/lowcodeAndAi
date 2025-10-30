<template>
  <div class="api-input-panel">
    <div class="panel-header">
      <h3>📡 关联接口文档</h3>
      <p class="description">粘贴 API 响应样例和请求参数（可选）用于自动推断数据映射</p>
    </div>

    <div class="input-section">
      <div class="section-title">
        <span class="required">*</span>
        <span>API 响应样例 JSON</span>
        <el-tooltip content="粘贴一个真实的 API 响应 JSON，用于识别数据结构和字段" placement="top">
          ?
        </el-tooltip>
      </div>
      <el-input
        v-model="responseJson"
        type="textarea"
        :rows="12"
        placeholder='示例：
{
  "code": 0,
  "data": {
    "rows": [
      { "id": 1, "name": "张三", "status": "active" }
    ],
    "total": 100
  }
}'
        @blur="handleResponseBlur"
      />
      <div v-if="responseError" class="error-message">
        ⚠️
        {{ responseError }}
      </div>
      <div v-if="responseValid" class="success-message">
        ✓
        JSON 格式正确
      </div>
    </div>

    <div class="input-section">
      <div class="section-title">
        <span>请求参数示例 JSON（可选）</span>
        <el-tooltip content="粘贴请求参数示例，用于识别分页参数名称（如 page/pageSize）" placement="top">
          ?
        </el-tooltip>
      </div>
      <el-input
        v-model="requestJson"
        type="textarea"
        :rows="8"
        placeholder='示例（可选）：
{
  "pageNo": 1,
  "pageSize": 20,
  "keyword": "",
  "status": "active"
}'
        @blur="handleRequestBlur"
      />
      <div v-if="requestError" class="error-message">
        ⚠️
        {{ requestError }}
      </div>
      <div v-if="requestValid" class="success-message">
        ✓
        JSON 格式正确
      </div>
    </div>

    <div class="actions">
      <el-button @click="handleClear">清空</el-button>
      <el-button 
        type="primary" 
        :disabled="!canParse"
        :loading="parsing"
        @click="handleParse"
      >
        🧙
        解析并推断
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApiInputPanel',
  
  props: {
    initialResponse: {
      type: String,
      default: ''
    },
    initialRequest: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      responseJson: this.initialResponse,
      requestJson: this.initialRequest,
      responseError: '',
      requestError: '',
      responseValid: false,
      requestValid: false,
      parsing: false
    }
  },

  computed: {
    canParse() {
      return this.responseJson.trim() && this.responseValid && !this.responseError
    }
  },

  watch: {
    initialResponse(val) {
      this.responseJson = val
    },
    initialRequest(val) {
      this.requestJson = val
    }
  },

  methods: {
    handleResponseBlur() {
      this.validateJson('response')
    },

    handleRequestBlur() {
      if (this.requestJson.trim()) {
        this.validateJson('request')
      } else {
        this.requestError = ''
        this.requestValid = false
      }
    },

    validateJson(type) {
      const text = type === 'response' ? this.responseJson : this.requestJson
      
      if (!text.trim()) {
        if (type === 'response') {
          this.responseError = '响应 JSON 不能为空'
          this.responseValid = false
        }
        return false
      }

      try {
        const parsed = JSON.parse(text)
        if (typeof parsed !== 'object' || parsed === null) {
          throw new Error('必须是 JSON 对象')
        }

        if (type === 'response') {
          this.responseError = ''
          this.responseValid = true
        } else {
          this.requestError = ''
          this.requestValid = true
        }
        return true
      } catch (error) {
        const errorMsg = `JSON 格式错误: ${error.message}`
        if (type === 'response') {
          this.responseError = errorMsg
          this.responseValid = false
        } else {
          this.requestError = errorMsg
          this.requestValid = false
        }
        return false
      }
    },

    handleClear() {
      this.$confirm('确定清空所有输入内容？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.responseJson = ''
        this.requestJson = ''
        this.responseError = ''
        this.requestError = ''
        this.responseValid = false
        this.requestValid = false
        this.$emit('clear')
      }).catch(() => {})
    },

    async handleParse() {
      // 最后一次验证
      if (!this.validateJson('response')) {
        this.$message.error('请先修正响应 JSON 的格式错误')
        return
      }

      if (this.requestJson.trim() && !this.validateJson('request')) {
        this.$message.error('请先修正请求参数 JSON 的格式错误')
        return
      }

      this.parsing = true

      try {
        const responseData = JSON.parse(this.responseJson)
        const requestData = this.requestJson.trim() ? JSON.parse(this.requestJson) : null

        // 触发解析事件
        this.$emit('parse', {
          response: responseData,
          request: requestData
        })

        this.$message.success('JSON 解析成功，正在推断数据映射...')
      } catch (error) {
        this.$message.error('解析失败：' + error.message)
      } finally {
        setTimeout(() => {
          this.parsing = false
        }, 500)
      }
    }
  }
}
</script>

<style scoped>
.api-input-panel {
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.panel-header {
  margin-bottom: 24px;
}

.panel-header h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.panel-header .description {
  margin: 0;
  font-size: 14px;
  color: #909399;
}

.input-section {
  margin-bottom: 24px;
}

.section-title {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #606266;
}

.section-title .required {
  color: #f56c6c;
  margin-right: 4px;
}

.section-title i {
  margin-left: 6px;
  color: #909399;
  cursor: help;
  font-size: 16px;
}

.error-message {
  margin-top: 8px;
  padding: 8px 12px;
  background: #fef0f0;
  border: 1px solid #fde2e2;
  border-radius: 4px;
  color: #f56c6c;
  font-size: 13px;
  display: flex;
  align-items: center;
}

.error-message i {
  margin-right: 6px;
  font-size: 14px;
}

.success-message {
  margin-top: 8px;
  padding: 8px 12px;
  background: #f0f9ff;
  border: 1px solid #c6e2ff;
  border-radius: 4px;
  color: #409eff;
  font-size: 13px;
  display: flex;
  align-items: center;
}

.success-message i {
  margin-right: 6px;
  font-size: 14px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid #ebeef5;
}

.el-textarea >>> .el-textarea__inner {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
}
</style>

