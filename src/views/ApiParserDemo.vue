<template>
  <div class="api-parser-demo">
    <div class="demo-header">
      <h1>API 选择器与解析器 - 演示页面</h1>
      <p>粘贴 API 响应和请求参数，自动解析数据映射</p>
    </div>

    <el-row :gutter="24">
      <el-col :span="12">
        <ApiInputPanel
          :initial-response="sampleResponse"
          :initial-request="sampleRequest"
          @parse="handleParse"
          @clear="handleClear"
        />
      </el-col>
      <el-col :span="12">
        <ApiParseResult
          :parse-result="parseResult"
          @update="handleResultUpdate"
          @reset="handleReset"
          @confirm="handleConfirm"
        />
      </el-col>
    </el-row>

    <!-- 最终结果展示 -->
    <div v-if="confirmedResult" class="confirmed-result">
      <el-divider content-position="left">
        <i class="el-icon-document"></i>
        最终配置结果
      </el-divider>
      <el-alert type="success" :closable="false" show-icon>
        <template slot="title">
          ✅ 配置已确认！以下是生成的页面配置 JSON
        </template>
      </el-alert>
      <pre class="result-json">{{ formatJson(confirmedResult) }}</pre>
      <div class="result-actions">
        <el-button type="primary" @click="copyToClipboard">
          <i class="el-icon-document-copy"></i>
          复制 JSON
        </el-button>
        <el-button @click="downloadJson">
          <i class="el-icon-download"></i>
          下载 JSON
        </el-button>
      </div>
    </div>

    <!-- 快速填充按钮 -->
    <div class="quick-fill">
      <el-divider content-position="left">快速测试</el-divider>
      <el-button size="small" @click="fillSample1">填充示例 1（标准分页）</el-button>
      <el-button size="small" @click="fillSample2">填充示例 2（嵌套数据）</el-button>
      <el-button size="small" @click="fillSample3">填充示例 3（复杂结构）</el-button>
    </div>
  </div>
</template>

<script>
import ApiInputPanel from '../components/ApiInputPanel.vue'
import ApiParseResult from '../components/ApiParseResult.vue'
import { parseApiData } from '../utils/apiParser.js'

export default {
  name: 'ApiParserDemo',
  
  components: {
    ApiInputPanel,
    ApiParseResult
  },

  data() {
    return {
      sampleResponse: '',
      sampleRequest: '',
      parseResult: null,
      confirmedResult: null
    }
  },

  methods: {
    async handleParse({ response, request }) {
      try {
        const result = parseApiData(response, request)
        this.parseResult = result
        console.log('解析结果：', result)
      } catch (error) {
        this.$message.error('解析失败：' + error.message)
        console.error('解析错误：', error)
      }
    },

    handleClear() {
      this.parseResult = null
      this.confirmedResult = null
      this.sampleResponse = ''
      this.sampleRequest = ''
    },

    handleResultUpdate(updatedResult) {
      this.parseResult = { ...this.parseResult, ...updatedResult }
    },

    handleReset() {
      this.parseResult = null
      this.confirmedResult = null
    },

    handleConfirm(result) {
      this.confirmedResult = {
        templateId: 'standard-list',
        pageName: 'GeneratedPage',
        dataMapping: {
          dataPath: result.dataPath,
          totalPath: result.totalPath,
          pageNoField: result.pagination.pageNoField,
          pageSizeField: result.pagination.pageSizeField
        },
        fields: result.fields,
        searchFields: result.searchFields || []
      }
      
      this.$message.success('配置确认成功！')
    },

    formatJson(data) {
      return JSON.stringify(data, null, 2)
    },

    copyToClipboard() {
      const text = this.formatJson(this.confirmedResult)
      navigator.clipboard.writeText(text).then(() => {
        this.$message.success('已复制到剪贴板')
      }).catch(() => {
        this.$message.error('复制失败，请手动复制')
      })
    },

    downloadJson() {
      const text = this.formatJson(this.confirmedResult)
      const blob = new Blob([text], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'page-config.json'
      a.click()
      URL.revokeObjectURL(url)
    },

    // 测试样例
    fillSample1() {
      this.sampleResponse = JSON.stringify({
        code: 0,
        message: 'success',
        data: {
          rows: [
            { id: 1, userName: '张三', phone: '13800138000', status: 'active', createTime: '2024-01-01 10:00:00' },
            { id: 2, userName: '李四', phone: '13900139000', status: 'inactive', createTime: '2024-01-02 11:00:00' }
          ],
          total: 100
        }
      }, null, 2)
      
      this.sampleRequest = JSON.stringify({
        pageNo: 1,
        pageSize: 20,
        userName: '',
        status: ''
      }, null, 2)
    },

    fillSample2() {
      this.sampleResponse = JSON.stringify({
        success: true,
        result: {
          list: [
            { customerId: 101, customerName: '客户A', level: 'VIP', amount: 50000 },
            { customerId: 102, customerName: '客户B', level: 'Normal', amount: 20000 }
          ],
          totalCount: 50
        }
      }, null, 2)
      
      this.sampleRequest = JSON.stringify({
        current: 1,
        size: 10,
        customerName: '',
        level: ''
      }, null, 2)
    },

    fillSample3() {
      this.sampleResponse = JSON.stringify({
        code: 200,
        data: {
          pagination: {
            items: [
              { orderId: 'O001', productName: '商品1', price: 99.9, qty: 2, orderStatus: 'paid' },
              { orderId: 'O002', productName: '商品2', price: 199.8, qty: 1, orderStatus: 'pending' }
            ],
            total: 200,
            page: 1,
            pageSize: 10
          }
        }
      }, null, 2)
      
      this.sampleRequest = JSON.stringify({
        page: 1,
        limit: 10,
        orderId: '',
        orderStatus: '',
        startDate: '',
        endDate: ''
      }, null, 2)
    }
  }
}
</script>

<style scoped>
.api-parser-demo {
  padding: 24px;
  min-height: 100vh;
  background: #f5f7fa;
}

.demo-header {
  margin-bottom: 24px;
  text-align: center;
}

.demo-header h1 {
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 600;
  color: #303133;
}

.demo-header p {
  margin: 0;
  font-size: 14px;
  color: #909399;
}

.confirmed-result {
  margin-top: 32px;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.result-json {
  margin: 16px 0;
  padding: 16px;
  background: #f5f7fa;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #303133;
  max-height: 400px;
  overflow: auto;
}

.result-actions {
  display: flex;
  gap: 12px;
}

.quick-fill {
  margin-top: 24px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.quick-fill .el-button {
  margin-right: 12px;
  margin-bottom: 8px;
}
</style>

