<template>
  <el-dialog
    :visible.sync="internalVisible"
    title="添加自定义组件"
    width="800px"
    :append-to-body="true"
    :modal-append-to-body="true"
    @close="handleClose"
  >
    <div class="add-custom-component-dialog">
      <!-- 步骤指示 -->
      <el-steps :active="currentStep" finish-status="success" class="mb-4">
        <el-step title="粘贴代码" />
        <el-step title="解析信息" />
        <el-step title="完成" />
      </el-steps>

      <!-- 步骤1：粘贴代码 -->
      <div v-show="currentStep === 0" class="step-content">
        <div class="mb-3">
          <el-alert
            title="请粘贴完整的 Vue 单文件组件代码"
            type="info"
            :closable="false"
            show-icon
          >
            <template slot="default">
              <p>示例格式：</p>
              <pre class="example-code">&lt;template&gt;...&lt;/template&gt;
&lt;script&gt;...&lt;/script&gt;
&lt;style&gt;...&lt;/style&gt;</pre>
            </template>
          </el-alert>
        </div>

        <el-input
          v-model="componentCode"
          type="textarea"
          :rows="15"
          placeholder="粘贴你的 Vue 组件代码..."
          class="code-input"
        />

        <!-- 验证错误 -->
        <div v-if="validationErrors.length > 0" class="mt-3">
          <el-alert
            v-for="(error, index) in validationErrors"
            :key="index"
            :title="error"
            type="error"
            :closable="false"
            class="mb-2"
          />
        </div>

        <!-- 验证警告 -->
        <div v-if="validationWarnings.length > 0" class="mt-3">
          <el-alert
            v-for="(warning, index) in validationWarnings"
            :key="index"
            :title="warning"
            type="warning"
            :closable="false"
            class="mb-2"
          />
        </div>
      </div>

      <!-- 步骤2：解析信息 -->
      <div v-show="currentStep === 1" class="step-content">
        <el-form :model="componentInfo" label-width="100px">
          <el-form-item label="组件名称">
            <el-input v-model="componentInfo.name" placeholder="例如: MyCustomButton" />
          </el-form-item>

          <el-form-item label="组件标签">
            <el-input v-model="componentInfo.label" placeholder="例如: 自定义按钮" />
          </el-form-item>

          <el-form-item label="组件描述">
            <el-input
              v-model="componentInfo.description"
              type="textarea"
              :rows="3"
              placeholder="简要描述组件的功能和用途"
            />
          </el-form-item>

          <el-form-item label="Props">
            <el-tag
              v-for="prop in parsedInfo.props"
              :key="prop.name"
              size="small"
              class="mr-2 mb-2"
            >
              {{ prop.name }}
              <span v-if="prop.type" class="text-gray-500"> ({{ prop.type }})</span>
            </el-tag>
            <span v-if="parsedInfo.props.length === 0" class="text-gray-400">无</span>
          </el-form-item>

          <el-form-item label="Events">
            <el-tag
              v-for="event in parsedInfo.events"
              :key="event"
              type="success"
              size="small"
              class="mr-2 mb-2"
            >
              {{ event }}
            </el-tag>
            <span v-if="parsedInfo.events.length === 0" class="text-gray-400">无</span>
          </el-form-item>

          <el-form-item label="Methods">
            <el-tag
              v-for="method in parsedInfo.methods"
              :key="method"
              type="info"
              size="small"
              class="mr-2 mb-2"
            >
              {{ method }}
            </el-tag>
            <span v-if="parsedInfo.methods.length === 0" class="text-gray-400">无</span>
          </el-form-item>
        </el-form>
      </div>

      <!-- 步骤3：完成 -->
      <div v-show="currentStep === 2" class="step-content">
        <el-result icon="success" title="组件添加成功">
          <template slot="subTitle">
            <p>已成功添加自定义组件 <strong>{{ componentInfo.label }}</strong></p>
            <p class="text-gray-500">你现在可以在组件选择器中使用它了</p>
          </template>
        </el-result>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div slot="footer">
      <el-button v-if="currentStep > 0 && currentStep < 2" @click="handlePrevStep">
        上一步
      </el-button>
      <el-button @click="handleClose">
        {{ currentStep === 2 ? '关闭' : '取消' }}
      </el-button>
      <el-button
        v-if="currentStep === 0"
        type="primary"
        :disabled="!componentCode.trim()"
        @click="handleParseCode"
      >
        解析代码
      </el-button>
      <el-button
        v-if="currentStep === 1"
        type="primary"
        :disabled="!canSubmit"
        @click="handleSubmit"
      >
        确认添加
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  parseVueComponent,
  validateVueComponent,
  generateComponentDescription,
  suggestImportPath,
} from '../utils/vueComponentParser'

export default {
  name: 'AddCustomComponentDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      internalVisible: this.visible,
      currentStep: 0,
      componentCode: '',
      componentInfo: {
        name: '',
        label: '',
        description: '',
      },
      parsedInfo: {
        template: '',
        script: '',
        style: '',
        name: '',
        props: [],
        events: [],
        methods: [],
      },
      validationErrors: [],
      validationWarnings: [],
    }
  },
  computed: {
    canSubmit() {
      return this.componentInfo.name && this.componentInfo.label
    },
  },
  watch: {
    visible(val) {
      this.internalVisible = val
      if (val) {
        this.resetDialog()
      }
    },
    internalVisible(val) {
      this.$emit('update:visible', val)
    },
  },
  methods: {
    resetDialog() {
      this.currentStep = 0
      this.componentCode = ''
      this.componentInfo = {
        name: '',
        label: '',
        description: '',
      }
      this.parsedInfo = {
        template: '',
        script: '',
        style: '',
        name: '',
        props: [],
        events: [],
        methods: [],
      }
      this.validationErrors = []
      this.validationWarnings = []
    },
    handleParseCode() {
      // 验证代码
      const validation = validateVueComponent(this.componentCode)
      this.validationErrors = validation.errors
      this.validationWarnings = validation.warnings

      if (!validation.valid) {
        this.$message.error('组件代码格式不正确，请检查错误提示')
        return
      }

      // 解析代码
      const parsed = parseVueComponent(this.componentCode)

      if (!parsed.valid) {
        this.$message.error('解析组件失败: ' + (parsed.error || '未知错误'))
        return
      }

      // 保存解析结果
      this.parsedInfo = parsed

      // 自动填充组件信息
      this.componentInfo.name = parsed.name || 'CustomComponent'
      this.componentInfo.label = parsed.name || '自定义组件'
      this.componentInfo.description = generateComponentDescription(parsed)

      // 进入下一步
      this.currentStep = 1
      this.$message.success('代码解析成功')
    },
    handlePrevStep() {
      if (this.currentStep > 0) {
        this.currentStep--
      }
    },
    async handleSubmit() {
      try {
        // 构建自定义组件对象
        const customComponent = {
          category: 'custom',
          name: this.componentInfo.name,
          label: this.componentInfo.label,
          description: this.componentInfo.description,
          code: this.componentCode,
          importPath: suggestImportPath(this.componentInfo.name),
          props: this.parsedInfo.props,
          events: this.parsedInfo.events,
          methods: this.parsedInfo.methods,
          defaultProps: {},
        }

        // 添加到 store
        await this.$store.dispatch('editor/addCustomComponent', customComponent)

        // 进入完成步骤
        this.currentStep = 2
        this.$message.success('自定义组件添加成功')

        // 2秒后自动关闭
        setTimeout(() => {
          this.handleClose()
        }, 2000)
      } catch (error) {
        console.error('添加自定义组件失败:', error)
        this.$message.error('添加失败: ' + error.message)
      }
    },
    handleClose() {
      this.internalVisible = false
      this.resetDialog()
    },
  },
}
</script>

<style scoped>
.add-custom-component-dialog {
  min-height: 400px;
}

.step-content {
  min-height: 350px;
}

.code-input /deep/ textarea {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
  font-size: 13px;
  line-height: 1.5;
}

.example-code {
  margin-top: 8px;
  padding: 8px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 12px;
  color: #606266;
}

.el-tag {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>

