<template>
  <div class="ai-inference-demo">
    <div class="demo-header">
      <h1>AI 推断器 - 完整演示</h1>
      <p>从 API 数据到页面配置的完整流程</p>
    </div>

    <!-- 步骤指示器 -->
    <el-steps :active="currentStep" finish-status="success" align-center>
      <el-step title="输入 API" description="粘贴响应和请求参数" />
      <el-step title="解析数据" description="识别字段和路径" />
      <el-step title="AI 推断" description="生成页面配置" />
      <el-step title="配置确认" description="查看和调整" />
    </el-steps>

    <!-- 步骤 1: API 输入 -->
    <div v-if="currentStep === 0" class="step-content">
      <ApiInputPanel
        @parse="handleParse"
        @clear="handleClear"
      />
      <div class="step-actions">
        <el-button type="primary" :disabled="!parseResult" @click="nextStep">
          下一步
        </el-button>
      </div>
    </div>

    <!-- 步骤 2: 解析结果 -->
    <div v-if="currentStep === 1" class="step-content">
      <ApiParseResult
        :parse-result="parseResult"
        @update="handleResultUpdate"
        @reset="prevStep"
        @confirm="handleParseConfirm"
      />
      <div class="step-actions">
        <el-button @click="prevStep">上一步</el-button>
        <el-button type="primary" @click="nextStep">
          下一步：AI 推断
        </el-button>
      </div>
    </div>

    <!-- 步骤 3: AI 推断 -->
    <div v-if="currentStep === 2" class="step-content">
      <div class="inference-panel">
        <el-card>
          <div slot="header">
            <span>AI 推断配置</span>
          </div>

          <el-form label-width="120px">
            <el-form-item label="推断方式">
              <el-radio-group v-model="inferenceMode">
                <el-radio label="local">本地推断（快速，无需 AI）</el-radio>
                <el-radio label="ai">AI 推断（智能，需配置 API Key）</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item v-if="inferenceMode === 'ai'" label="AI Provider">
              <el-select v-model="aiProvider">
                <el-option label="OpenAI" value="openai" />
                <el-option label="Anthropic (Claude)" value="anthropic" />
                <el-option label="Custom API" value="custom" />
              </el-select>
            </el-form-item>

            <el-form-item v-if="inferenceMode === 'ai'" label="API Key">
              <el-input
                v-model="apiKey"
                type="password"
                placeholder="请输入 API Key"
                show-password
              />
              <div class="form-tip">
                💡 API Key 仅保存在浏览器本地，不会上传到服务器
              </div>
            </el-form-item>
          </el-form>

          <div class="inference-actions">
            <el-button @click="prevStep">上一步</el-button>
            <el-button
              type="primary"
              :loading="inferring"
              @click="handleInference"
            >
              <i class="el-icon-magic-stick"></i>
              开始推断
            </el-button>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 步骤 4: 配置确认 -->
    <div v-if="currentStep === 3" class="step-content">
      <div class="config-panel">
        <el-alert
          v-if="lowConfidenceItems.length > 0"
          type="warning"
          :closable="false"
          show-icon
          title="检测到低置信度项"
        >
          <div>以下配置项的置信度较低（< 0.8），建议检查确认：</div>
          <ul>
            <li v-for="item in lowConfidenceItems" :key="item.path">
              {{ item.type === 'column' ? '表格列' : '搜索字段' }}:
              {{ item.prop }} - {{ item.label }}
              (置信度: {{ (item.confidence * 100).toFixed(0) }}%)
            </li>
          </ul>
        </el-alert>

        <el-tabs v-model="activeTab">
          <!-- 表格列配置 -->
          <el-tab-pane label="表格列配置" name="columns">
            <el-table :data="pageConfig.columns" border>
              <el-table-column prop="prop" label="字段名" width="150" />
              <el-table-column prop="label" label="显示标题" width="150">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.label" size="small" />
                </template>
              </el-table-column>
              <el-table-column prop="type" label="类型" width="120">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.type" size="small">
                    <el-option label="文本" value="text" />
                    <el-option label="日期时间" value="datetime" />
                    <el-option label="标签" value="tag" />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="width" label="宽度" width="100">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.width" size="small" />
                </template>
              </el-table-column>
              <el-table-column prop="confidence" label="置信度" width="100">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.confidence >= 0.8 ? 'success' : 'warning'"
                    size="small"
                  >
                    {{ (scope.row.confidence * 100).toFixed(0) }}%
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="removeColumn(scope.$index)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <!-- 搜索字段配置 -->
          <el-tab-pane label="搜索字段配置" name="search">
            <el-table :data="pageConfig.searchFields" border>
              <el-table-column prop="prop" label="字段名" width="150" />
              <el-table-column prop="label" label="显示标签" width="150">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.label" size="small" />
                </template>
              </el-table-column>
              <el-table-column prop="type" label="组件类型" width="120">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.type" size="small">
                    <el-option label="输入框" value="input" />
                    <el-option label="下拉选择" value="select" />
                    <el-option label="日期" value="date" />
                    <el-option label="日期范围" value="daterange" />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="confidence" label="置信度" width="100">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.confidence >= 0.8 ? 'success' : 'warning'"
                    size="small"
                  >
                    {{ (scope.row.confidence * 100).toFixed(0) }}%
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="removeSearchField(scope.$index)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <!-- 完整配置 JSON -->
          <el-tab-pane label="完整配置" name="json">
            <pre class="config-json">{{ formatJson(pageConfig) }}</pre>
          </el-tab-pane>
        </el-tabs>

        <div class="config-actions">
          <el-button @click="prevStep">上一步</el-button>
          <el-button type="success" @click="handleValidate">
            <i class="el-icon-check"></i>
            校验配置
          </el-button>
          <el-button type="primary" @click="handleCopyConfig">
            <i class="el-icon-document-copy"></i>
            复制配置
          </el-button>
        </div>
      </div>
    </div>

    <!-- 校验结果对话框 -->
    <el-dialog
      title="配置校验结果"
      :visible.sync="validationDialogVisible"
      width="600px"
    >
      <div v-if="validationResult.valid" class="validation-success">
        <i class="el-icon-success"></i>
        <h3>配置校验通过！</h3>
        <p>该配置符合规范，可以用于生成代码。</p>
        <div v-if="validationResult.lowConfidenceItems && validationResult.lowConfidenceItems.length > 0">
          <el-divider></el-divider>
          <div class="low-confidence-warning">
            <i class="el-icon-warning"></i>
            检测到 {{ validationResult.lowConfidenceItems.length }} 个低置信度项，建议复查
          </div>
        </div>
      </div>
      <div v-else class="validation-errors">
        <i class="el-icon-error"></i>
        <h3>配置存在以下错误：</h3>
        <ul>
          <li v-for="(error, index) in validationResult.errors" :key="index">
            {{ error.path }}: {{ error.message }}
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ApiInputPanel from '../components/ApiInputPanel.vue'
import ApiParseResult from '../components/ApiParseResult.vue'
import { parseApiData } from '../utils/apiParser.js'
import { localInference, aiInference } from '../services/ai-inference.js'
import { validatePageConfig, checkConfidence } from '../utils/configValidator.js'
import { saveAIConfig } from '../services/ai-provider.js'

export default {
  name: 'AIInferenceDemo',
  
  components: {
    ApiInputPanel,
    ApiParseResult
  },

  data() {
    return {
      currentStep: 0,
      parseResult: null,
      inferenceMode: 'local',
      aiProvider: 'openai',
      apiKey: '',
      inferring: false,
      pageConfig: null,
      lowConfidenceItems: [],
      activeTab: 'columns',
      validationDialogVisible: false,
      validationResult: {}
    }
  },

  methods: {
    async handleParse({ response, request }) {
      try {
        const result = parseApiData(response, request)
        this.parseResult = result
        this.$message.success('API 数据解析成功')
      } catch (error) {
        this.$message.error('解析失败：' + error.message)
      }
    },

    handleClear() {
      this.parseResult = null
      this.pageConfig = null
      this.currentStep = 0
    },

    handleResultUpdate(updatedResult) {
      this.parseResult = { ...this.parseResult, ...updatedResult }
    },

    handleParseConfirm(result) {
      this.parseResult = result
      this.nextStep()
    },

    async handleInference() {
      if (this.inferenceMode === 'ai' && !this.apiKey) {
        this.$message.warning('请先配置 API Key')
        return
      }

      this.inferring = true

      try {
        // 保存 AI 配置
        if (this.inferenceMode === 'ai') {
          const config = {
            provider: this.aiProvider,
            [this.aiProvider]: {
              apiKey: this.apiKey
            }
          }
          saveAIConfig(config)
        }

        // 执行推断
        let config
        if (this.inferenceMode === 'local') {
          config = localInference(this.parseResult)
        } else {
          config = await aiInference(this.parseResult, 'standard-list', {
            provider: this.aiProvider
          })
        }

        this.pageConfig = config
        this.lowConfidenceItems = checkConfidence(config)

        this.$message.success('页面配置生成成功')
        this.nextStep()
      } catch (error) {
        this.$message.error('推断失败：' + error.message)
        console.error(error)
      } finally {
        this.inferring = false
      }
    },

    async handleValidate() {
      try {
        const result = await validatePageConfig(this.pageConfig)
        this.validationResult = result
        this.validationDialogVisible = true

        if (result.valid) {
          this.$message.success('配置校验通过')
        } else {
          this.$message.error('配置校验失败')
        }
      } catch (error) {
        this.$message.error('校验失败：' + error.message)
      }
    },

    handleCopyConfig() {
      const text = this.formatJson(this.pageConfig)
      navigator.clipboard.writeText(text).then(() => {
        this.$message.success('配置已复制到剪贴板')
      }).catch(() => {
        this.$message.error('复制失败，请手动复制')
      })
    },

    removeColumn(index) {
      this.pageConfig.columns.splice(index, 1)
    },

    removeSearchField(index) {
      this.pageConfig.searchFields.splice(index, 1)
    },

    formatJson(data) {
      return JSON.stringify(data, null, 2)
    },

    nextStep() {
      if (this.currentStep < 3) {
        this.currentStep++
      }
    },

    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--
      }
    }
  }
}
</script>

<style scoped>
.ai-inference-demo {
  padding: 24px;
  min-height: 100vh;
  background: #f5f7fa;
}

.demo-header {
  margin-bottom: 32px;
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

.el-steps {
  margin-bottom: 32px;
}

.step-content {
  margin-top: 32px;
}

.step-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
}

.inference-panel,
.config-panel {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
}

.form-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #909399;
}

.inference-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.config-json {
  margin: 0;
  padding: 16px;
  background: #f5f7fa;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  max-height: 600px;
  overflow: auto;
}

.config-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e4e7ed;
}

.validation-success {
  text-align: center;
  padding: 24px;
}

.validation-success i {
  font-size: 64px;
  color: #67c23a;
}

.validation-success h3 {
  margin: 16px 0 8px 0;
  color: #303133;
}

.validation-success p {
  margin: 0;
  color: #606266;
}

.low-confidence-warning {
  padding: 12px;
  background: #fdf6ec;
  border: 1px solid #f5dab1;
  border-radius: 4px;
  color: #e6a23c;
  text-align: left;
}

.low-confidence-warning i {
  margin-right: 8px;
  font-size: 16px;
}

.validation-errors {
  padding: 24px;
}

.validation-errors i {
  font-size: 64px;
  color: #f56c6c;
}

.validation-errors h3 {
  margin: 16px 0;
  color: #303133;
}

.validation-errors ul {
  margin: 0;
  padding-left: 24px;
  color: #606266;
}

.validation-errors li {
  margin-bottom: 8px;
}
</style>

