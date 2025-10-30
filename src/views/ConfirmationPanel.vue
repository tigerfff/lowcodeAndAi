<template>
  <div class="confirmation-panel">
    <div class="panel-header">
      <h1>配置确认与代码生成</h1>
      <p>检查并调整AI推断的配置，然后生成Vue2代码</p>
    </div>

    <!-- 低置信度警告 -->
    <el-alert
      v-if="lowConfidenceItems.length > 0"
      type="warning"
      :closable="false"
      show-icon
      class="low-confidence-alert"
    >
      <template slot="title">
        <strong>⚠️ 检测到 {{ lowConfidenceItems.length }} 个低置信度配置项</strong>
      </template>
      <div class="low-confidence-details">
        <p>以下配置项的置信度较低（< 80%），建议仔细检查并确认：</p>
        <ul>
          <li v-for="(item, index) in lowConfidenceItems" :key="index">
            <el-tag :type="getConfidenceTagType(item.confidence)" size="small">
              {{ (item.confidence * 100).toFixed(0) }}%
            </el-tag>
            <span class="item-type">{{ item.type === 'column' ? '表格列' : '搜索字段' }}</span>
            <strong>{{ item.prop }}</strong>
            <span class="item-label">- {{ item.label }}</span>
          </li>
        </ul>
      </div>
    </el-alert>

    <!-- 配置选项卡 -->
    <el-tabs v-model="activeTab" class="config-tabs">
      <!-- 数据路径配置 -->
      <el-tab-pane label="数据路径" name="dataPath">
        <DataPathSelector
          :data-mapping.sync="pageConfig.dataMapping"
          :data-path-alternatives="parseResult.dataPathAlternatives || []"
          :total-path-alternatives="parseResult.totalPathAlternatives || []"
        />
      </el-tab-pane>

      <!-- 表格列配置 -->
      <el-tab-pane name="columns">
        <span slot="label">
          表格列配置
          <el-badge
            v-if="getLowConfidenceCount('column') > 0"
            :value="getLowConfidenceCount('column')"
            class="tab-badge"
          />
        </span>
        <ColumnConfigTable
          :columns.sync="pageConfig.columns"
        />
      </el-tab-pane>

      <!-- 搜索字段配置 -->
      <el-tab-pane name="search">
        <span slot="label">
          搜索字段配置
          <el-badge
            v-if="getLowConfidenceCount('searchField') > 0"
            :value="getLowConfidenceCount('searchField')"
            class="tab-badge"
          />
        </span>
        <SearchFieldConfig
          :search-fields.sync="pageConfig.searchFields"
        />
      </el-tab-pane>

      <!-- 完整配置预览 -->
      <el-tab-pane label="配置预览" name="preview">
        <div class="config-preview">
          <div class="preview-header">
            <h3>完整配置 JSON</h3>
            <el-button size="small" @click="copyConfig">
              <i class="el-icon-document-copy"></i>
              复制
            </el-button>
          </div>
          <pre class="config-json">{{ formatJson(pageConfig) }}</pre>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 操作按钮 -->
    <div class="action-bar">
      <div class="action-left">
        <el-button @click="handleBack">
          <i class="el-icon-back"></i>
          返回上一步
        </el-button>
      </div>
      <div class="action-right">
        <el-button @click="handleValidate">
          <i class="el-icon-check"></i>
          校验配置
        </el-button>
        <el-button
          type="primary"
          :loading="generating"
          @click="handleGenerate"
        >
          <i class="el-icon-magic-stick"></i>
          生成代码
        </el-button>
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
        <h3>✅ 配置校验通过！</h3>
        <p>该配置符合规范，可以用于生成代码。</p>
      </div>
      <div v-else class="validation-errors">
        <i class="el-icon-error"></i>
        <h3>❌ 配置存在以下错误：</h3>
        <ul>
          <li v-for="(error, index) in validationResult.errors" :key="index">
            <strong>[{{ error.path || '配置' }}]</strong> {{ error.message }}
          </li>
        </ul>
      </div>
      <div slot="footer">
        <el-button @click="validationDialogVisible = false">关闭</el-button>
        <el-button
          v-if="validationResult.valid"
          type="primary"
          @click="handleValidateAndGenerate"
        >
          继续生成代码
        </el-button>
      </div>
    </el-dialog>

    <!-- 代码生成结果对话框 -->
    <el-dialog
      title="代码生成成功"
      :visible.sync="codeDialogVisible"
      width="80%"
      top="5vh"
      :close-on-click-modal="false"
    >
      <el-tabs v-model="codeTab">
        <el-tab-pane label="Vue 组件" name="vue">
          <div class="code-header">
            <span class="filename">{{ generatedCode.vue.filename }}</span>
            <el-button size="small" @click="copyCode('vue')">
              <i class="el-icon-document-copy"></i>
              复制代码
            </el-button>
          </div>
          <pre class="code-content">{{ generatedCode.vue.code }}</pre>
        </el-tab-pane>

        <el-tab-pane v-if="generatedCode.service" label="API Service" name="service">
          <div class="code-header">
            <span class="filename">{{ generatedCode.service.filename }}</span>
            <el-button size="small" @click="copyCode('service')">
              <i class="el-icon-document-copy"></i>
              复制代码
            </el-button>
          </div>
          <pre class="code-content">{{ generatedCode.service.code }}</pre>
        </el-tab-pane>

        <el-tab-pane label="路由配置" name="router">
          <div class="code-header">
            <span class="filename">{{ generatedCode.router.filename }}</span>
            <el-button size="small" @click="copyCode('router')">
              <i class="el-icon-document-copy"></i>
              复制代码
            </el-button>
          </div>
          <pre class="code-content">{{ generatedCode.router.code }}</pre>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer">
        <el-button @click="handleDownloadAll">
          <i class="el-icon-download"></i>
          下载所有文件
        </el-button>
        <el-button type="primary" @click="codeDialogVisible = false">
          完成
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ColumnConfigTable from '../components/ColumnConfigTable.vue'
import DataPathSelector from '../components/DataPathSelector.vue'
import SearchFieldConfig from '../components/SearchFieldConfig.vue'
import { validatePageConfig, checkConfidence } from '../utils/configValidator.js'
import { generateCodeBundle } from '../services/code-generator.js'
import { comprehensiveValidation } from '../utils/codeValidator.js'

export default {
  name: 'ConfirmationPanel',
  
  components: {
    ColumnConfigTable,
    DataPathSelector,
    SearchFieldConfig
  },

  props: {
    initialConfig: {
      type: Object,
      required: true
    },
    parseResult: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      pageConfig: {},
      activeTab: 'dataPath',
      lowConfidenceItems: [],
      validationDialogVisible: false,
      validationResult: {},
      generating: false,
      codeDialogVisible: false,
      codeTab: 'vue',
      generatedCode: {
        vue: { filename: '', code: '' },
        service: null,
        router: { filename: '', code: '' }
      }
    }
  },

  watch: {
    initialConfig: {
      handler(val) {
        if (val) {
          this.pageConfig = JSON.parse(JSON.stringify(val))
          this.updateLowConfidenceItems()
        }
      },
      immediate: true,
      deep: true
    },
    'pageConfig.columns': {
      handler() {
        this.updateLowConfidenceItems()
      },
      deep: true
    },
    'pageConfig.searchFields': {
      handler() {
        this.updateLowConfidenceItems()
      },
      deep: true
    }
  },

  methods: {
    updateLowConfidenceItems() {
      this.lowConfidenceItems = checkConfidence(this.pageConfig, 0.8)
    },

    getLowConfidenceCount(type) {
      return this.lowConfidenceItems.filter(item => item.type === type).length
    },

    getConfidenceTagType(confidence) {
      if (confidence >= 0.7) return 'warning'
      if (confidence >= 0.5) return 'danger'
      return 'danger'
    },

    formatJson(data) {
      return JSON.stringify(data, null, 2)
    },

    copyConfig() {
      const text = this.formatJson(this.pageConfig)
      navigator.clipboard.writeText(text).then(() => {
        this.$message.success('配置已复制到剪贴板')
      }).catch(() => {
        this.$message.error('复制失败，请手动复制')
      })
    },

    copyCode(type) {
      const code = this.generatedCode[type]?.code
      if (!code) return

      navigator.clipboard.writeText(code).then(() => {
        this.$message.success('代码已复制到剪贴板')
      }).catch(() => {
        this.$message.error('复制失败，请手动复制')
      })
    },

    handleBack() {
      this.$emit('back')
    },

    async handleValidate() {
      try {
        const result = await validatePageConfig(this.pageConfig)
        this.validationResult = result
        this.validationDialogVisible = true

        if (result.valid) {
          this.$message.success('配置校验通过')
        } else {
          this.$message.error('配置校验失败，请修正错误')
        }
      } catch (error) {
        this.$message.error('校验失败：' + error.message)
      }
    },

    async handleValidateAndGenerate() {
      this.validationDialogVisible = false
      await this.handleGenerate()
    },

    async handleGenerate() {
      // 先校验
      try {
        const validation = await validatePageConfig(this.pageConfig)
        if (!validation.valid) {
          this.$message.error('配置校验失败，请先修正错误')
          this.validationResult = validation
          this.validationDialogVisible = true
          return
        }
      } catch (error) {
        this.$message.error('配置校验失败：' + error.message)
        return
      }

      // 生成代码
      this.generating = true
      try {
        const codeBundle = await generateCodeBundle(this.pageConfig)
        
        // 代码校验
        const codeValidation = await comprehensiveValidation(
          this.pageConfig,
          codeBundle.vue.code
        )

        if (!codeValidation.overall.valid) {
          this.$message.warning('代码生成完成，但存在一些警告')
          console.warn('Code validation warnings:', codeValidation.overall.warnings)
        } else {
          this.$message.success('代码生成成功')
        }

        this.generatedCode = codeBundle
        this.codeDialogVisible = true
        this.codeTab = 'vue'

        this.$emit('generated', codeBundle)
      } catch (error) {
        this.$message.error('代码生成失败：' + error.message)
        console.error('Code generation error:', error)
      } finally {
        this.generating = false
      }
    },

    handleDownloadAll() {
      const files = []

      if (this.generatedCode.vue) {
        files.push(this.generatedCode.vue)
      }
      if (this.generatedCode.service) {
        files.push(this.generatedCode.service)
      }
      if (this.generatedCode.router) {
        files.push(this.generatedCode.router)
      }

      files.forEach(file => {
        this.downloadFile(file.filename, file.code)
      })

      this.$message.success(`已下载 ${files.length} 个文件`)
    },

    downloadFile(filename, content) {
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
    }
  }
}
</script>

<style scoped>
.confirmation-panel {
  padding: 24px;
  min-height: 100vh;
  background: #f5f7fa;
}

.panel-header {
  margin-bottom: 24px;
  text-align: center;
}

.panel-header h1 {
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 600;
  color: #303133;
}

.panel-header p {
  margin: 0;
  font-size: 14px;
  color: #909399;
}

.low-confidence-alert {
  margin-bottom: 24px;
}

.low-confidence-details {
  margin-top: 12px;
}

.low-confidence-details p {
  margin: 0 0 8px 0;
  font-size: 14px;
}

.low-confidence-details ul {
  margin: 0;
  padding-left: 24px;
}

.low-confidence-details li {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-type {
  color: #909399;
  font-size: 12px;
}

.item-label {
  color: #606266;
}

.config-tabs {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
}

.tab-badge {
  margin-left: 8px;
}

.config-preview {
  padding: 20px;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.preview-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
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

.action-bar {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.action-right {
  display: flex;
  gap: 12px;
}

.validation-success,
.validation-errors {
  text-align: center;
  padding: 24px;
}

.validation-success i {
  font-size: 64px;
  color: #67c23a;
}

.validation-errors i {
  font-size: 64px;
  color: #f56c6c;
}

.validation-success h3,
.validation-errors h3 {
  margin: 16px 0;
}

.validation-errors ul {
  text-align: left;
  margin: 0;
  padding-left: 24px;
}

.validation-errors li {
  margin-bottom: 8px;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px 12px;
  background: #f5f7fa;
  border-radius: 4px;
}

.filename {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

.code-content {
  margin: 0;
  padding: 16px;
  background: #f5f7fa;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  max-height: 60vh;
  overflow: auto;
}
</style>

