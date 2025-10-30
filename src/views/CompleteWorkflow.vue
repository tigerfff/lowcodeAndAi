<template>
  <div class="complete-workflow">
    <div class="workflow-header">
      <h1>🚀 完整工作流程</h1>
      <p>从 API 数据到 Vue2 代码的一站式生成</p>
    </div>

    <!-- 步骤指示器 -->
    <el-steps :active="currentStep" finish-status="success" align-center>
      <el-step title="输入 API" description="粘贴响应和请求参数" />
      <el-step title="解析数据" description="识别字段和路径" />
      <el-step title="AI 推断" description="生成页面配置" />
      <el-step title="确认配置" description="调整和优化" />
      <el-step title="生成代码" description="输出 Vue2 SFC" />
    </el-steps>

    <!-- 步骤 0: API 输入 -->
    <div v-if="currentStep === 0" class="step-content">
      <ApiInputPanel
        @parse="handleParse"
        @clear="handleClear"
      />
      <div class="step-actions">
        <el-button type="primary" :disabled="!parseResult" @click="nextStep">
          下一步：解析数据
        </el-button>
      </div>
    </div>

    <!-- 步骤 1: 解析结果 -->
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

    <!-- 步骤 2: AI 推断 -->
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

    <!-- 步骤 3: 配置确认 -->
    <div v-if="currentStep === 3" class="step-content">
      <ConfigConfirmPanel
        :config="pageConfig"
        :parse-result="parseResult"
        @validate="handleValidate"
        @generate="handleGenerate"
      />
      <div class="step-actions">
        <el-button @click="prevStep">上一步</el-button>
      </div>
    </div>

    <!-- 步骤 4: 代码生成结果 -->
    <div v-if="currentStep === 4" class="step-content">
      <div class="result-panel">
        <el-alert
          :type="generationResult.success ? 'success' : 'error'"
          :title="generationResult.success ? '✅ 代码生成成功' : '❌ 代码生成失败'"
          :closable="false"
          show-icon
        >
          <div v-if="generationResult.message">{{ generationResult.message }}</div>
        </el-alert>

        <!-- 校验结果 -->
        <el-card v-if="validationResult" class="validation-card">
          <div slot="header">
            <span>代码校验结果</span>
          </div>
          <div v-if="validationResult.valid" class="validation-success">
            <i class="el-icon-success"></i>
            <span>代码校验通过，可以安全使用</span>
          </div>
          <div v-else class="validation-errors">
            <div class="error-title">
              <i class="el-icon-warning"></i>
              <span>发现 {{ validationResult.errors.length }} 个错误</span>
            </div>
            <ul>
              <li v-for="(error, index) in validationResult.errors" :key="index">
                {{ error }}
              </li>
            </ul>
          </div>
          <div v-if="validationResult.warnings && validationResult.warnings.length > 0" class="validation-warnings">
            <div class="warning-title">
              <i class="el-icon-info"></i>
              <span>{{ validationResult.warnings.length }} 个警告</span>
            </div>
            <ul>
              <li v-for="(warning, index) in validationResult.warnings" :key="index">
                {{ warning }}
              </li>
            </ul>
          </div>
        </el-card>

        <!-- 生成的代码 -->
        <el-tabs v-if="generatedCode" v-model="codeTab" type="border-card">
          <el-tab-pane label="Vue 组件代码" name="component">
            <div class="code-actions">
              <el-button size="small" @click="copyCode">
                <i class="el-icon-document-copy"></i>
                复制代码
              </el-button>
              <el-button size="small" @click="downloadCode">
                <i class="el-icon-download"></i>
                下载文件
              </el-button>
            </div>
            <pre class="code-display">{{ generatedCode }}</pre>
          </el-tab-pane>

          <el-tab-pane v-if="generatedApiService" label="API 服务代码" name="api">
            <div class="code-actions">
              <el-button size="small" @click="copyApiService">
                <i class="el-icon-document-copy"></i>
                复制代码
              </el-button>
            </div>
            <pre class="code-display">{{ generatedApiService }}</pre>
          </el-tab-pane>

          <el-tab-pane v-if="generatedRoute" label="路由配置" name="route">
            <div class="code-actions">
              <el-button size="small" @click="copyRoute">
                <i class="el-icon-document-copy"></i>
                复制代码
              </el-button>
            </div>
            <pre class="code-display">{{ generatedRoute }}</pre>
          </el-tab-pane>
        </el-tabs>

        <div class="result-actions">
          <el-button @click="resetWorkflow">重新开始</el-button>
          <el-button type="primary" @click="currentStep = 3">
            返回配置
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiInputPanel from '../components/ApiInputPanel.vue'
import ApiParseResult from '../components/ApiParseResult.vue'
import ConfigConfirmPanel from '../components/ConfigConfirmPanel.vue'
import { parseApiData } from '../utils/apiParser.js'
import { localInference, aiInference } from '../services/ai-inference.js'
import { saveAIConfig } from '../services/ai-provider.js'
import { validatePageConfig } from '../utils/configValidator.js'
import { generateCode, generateApiService, generateRouteConfig } from '../services/code-generator.js'
import { validateCode, generateValidationReport } from '../services/code-validator.js'

export default {
  name: 'CompleteWorkflow',
  
  components: {
    ApiInputPanel,
    ApiParseResult,
    ConfigConfirmPanel
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
      generatedCode: '',
      generatedApiService: '',
      generatedRoute: '',
      validationResult: null,
      generationResult: {
        success: false,
        message: ''
      },
      codeTab: 'component'
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
      this.generatedCode = ''
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
        this.$message.success('页面配置生成成功')
        this.nextStep()
      } catch (error) {
        this.$message.error('推断失败：' + error.message)
        console.error(error)
      } finally {
        this.inferring = false
      }
    },

    async handleValidate(config) {
      try {
        const result = await validatePageConfig(config)
        
        if (result.valid) {
          this.$message.success('配置校验通过')
        } else {
          this.$message.error('配置校验失败')
        }

        // 显示校验结果
        this.$alert(
          result.valid ? '配置校验通过，可以生成代码' : 
            `发现 ${result.errors.length} 个错误：\n${result.errors.map(e => e.message).join('\n')}`,
          '校验结果',
          {
            type: result.valid ? 'success' : 'error'
          }
        )
      } catch (error) {
        this.$message.error('校验失败：' + error.message)
      }
    },

    async handleGenerate(config) {
      try {
        // 1. 校验配置
        const configValidation = await validatePageConfig(config)
        if (!configValidation.valid) {
          this.$message.error('配置校验失败，请先修正错误')
          return
        }

        // 2. 生成代码
        this.generatedCode = await generateCode(config)
        this.generatedApiService = generateApiService(config)
        this.generatedRoute = generateRouteConfig(config)

        // 3. 校验生成的代码
        this.validationResult = validateCode(this.generatedCode)

        // 4. 设置结果
        this.generationResult = {
          success: true,
          message: this.validationResult.valid ? 
            '代码生成成功并通过校验' : 
            '代码生成成功但存在警告，请检查'
        }

        this.$message.success('代码生成成功')
        this.nextStep()
      } catch (error) {
        this.generationResult = {
          success: false,
          message: error.message
        }
        this.$message.error('代码生成失败：' + error.message)
        console.error(error)
      }
    },

    copyCode() {
      this.copyToClipboard(this.generatedCode, '组件代码')
    },

    copyApiService() {
      this.copyToClipboard(this.generatedApiService, 'API 服务代码')
    },

    copyRoute() {
      this.copyToClipboard(this.generatedRoute, '路由配置')
    },

    copyToClipboard(text, name) {
      navigator.clipboard.writeText(text).then(() => {
        this.$message.success(`${name}已复制到剪贴板`)
      }).catch(() => {
        this.$message.error('复制失败，请手动复制')
      })
    },

    downloadCode() {
      const fileName = `${this.pageConfig.pageName}.vue`
      const blob = new Blob([this.generatedCode], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      a.click()
      URL.revokeObjectURL(url)
      this.$message.success('文件已下载')
    },

    resetWorkflow() {
      this.$confirm('确定重新开始？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.currentStep = 0
        this.parseResult = null
        this.pageConfig = null
        this.generatedCode = ''
        this.generatedApiService = ''
        this.generatedRoute = ''
        this.validationResult = null
        this.generationResult = { success: false, message: '' }
      }).catch(() => {})
    },

    nextStep() {
      if (this.currentStep < 4) {
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
.complete-workflow {
  padding: 24px;
  min-height: 100vh;
  background: #f5f7fa;
}

.workflow-header {
  margin-bottom: 32px;
  text-align: center;
}

.workflow-header h1 {
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 600;
  color: #303133;
}

.workflow-header p {
  margin: 0;
  font-size: 16px;
  color: #909399;
}

.el-steps {
  margin-bottom: 40px;
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

.inference-panel {
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

.result-panel {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
}

.validation-card {
  margin: 20px 0;
}

.validation-success {
  display: flex;
  align-items: center;
  color: #67c23a;
  font-size: 16px;
}

.validation-success i {
  margin-right: 8px;
  font-size: 24px;
}

.validation-errors {
  color: #f56c6c;
}

.error-title {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}

.error-title i {
  margin-right: 8px;
  font-size: 20px;
}

.validation-errors ul {
  margin: 0;
  padding-left: 24px;
}

.validation-errors li {
  margin-bottom: 8px;
}

.validation-warnings {
  margin-top: 16px;
  color: #e6a23c;
}

.warning-title {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}

.warning-title i {
  margin-right: 6px;
}

.validation-warnings ul {
  margin: 0;
  padding-left: 24px;
  font-size: 13px;
}

.code-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 12px;
}

.code-display {
  margin: 0;
  padding: 16px;
  background: #282c34;
  color: #abb2bf;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  max-height: 600px;
  overflow: auto;
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

