<template>
  <el-dialog
    :visible="visible"
    title="接口绑定配置"
    width="800px"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="100px"
      size="small"
    >
      <el-form-item label="接口用途" prop="purpose">
        <el-input
          v-model="formData.purpose"
          placeholder="如：获取下拉选项、提交表单、导出数据等"
        />
        <div class="form-tip">描述这个接口的用途，帮助 AI 理解</div>
      </el-form-item>

      <el-form-item label="请求地址" prop="url">
        <el-input
          v-model="formData.url"
          placeholder="/api/xxx"
        />
      </el-form-item>

      <el-form-item label="请求方法" prop="method">
        <el-select v-model="formData.method" style="width: 100%;">
          <el-option label="GET" value="GET" />
          <el-option label="POST" value="POST" />
          <el-option label="PUT" value="PUT" />
          <el-option label="DELETE" value="DELETE" />
        </el-select>
      </el-form-item>

      <el-form-item label="触发时机" prop="trigger">
        <el-select v-model="formData.trigger" style="width: 100%;">
          <el-option label="组件挂载时" value="mounted" />
          <el-option label="用户点击时" value="click" />
          <el-option label="值改变时" value="change" />
          <el-option label="表单提交时" value="submit" />
          <el-option label="手动触发" value="manual" />
        </el-select>
      </el-form-item>

      <el-form-item label="请求参数">
        <el-input
          v-model="formData.params"
          type="textarea"
          :rows="3"
          placeholder="JSON 格式，如：{ &quot;key&quot;: &quot;value&quot; }"
        />
        <div class="form-tip">留空表示无固定参数，由 AI 根据上下文推断</div>
      </el-form-item>

      <el-form-item label="数据转换">
        <el-input
          v-model="formData.transform"
          type="textarea"
          :rows="3"
          placeholder="描述如何转换返回的数据，如：取 data.list 作为选项数据"
        />
        <div class="form-tip">
          告诉 AI 如何处理接口返回的数据<br>
          示例：<br>
          - "将返回的 data.options 转换为 [{label, value}] 格式"<br>
          - "提取 data.list，每项的 name 作为显示文本，id 作为值"
        </div>
      </el-form-item>

      <el-form-item label="错误处理">
        <el-input
          v-model="formData.errorHandler"
          type="textarea"
          :rows="2"
          placeholder="描述错误时的处理方式，如：提示用户、重试、使用默认值等"
        />
      </el-form-item>

      <el-divider />

      <el-form-item label="完整示例">
        <div class="example-section">
          <el-alert
            type="info"
            :closable="false"
            show-icon
          >
            <template #title>
              <div class="example-content">
                <p><strong>用途：</strong>获取用户列表的下拉选项</p>
                <p><strong>URL：</strong>/api/users/options</p>
                <p><strong>方法：</strong>GET</p>
                <p><strong>触发：</strong>组件挂载时</p>
                <p><strong>转换：</strong>将返回的 data.users 转换为选项，username 作为 label，id 作为 value</p>
              </div>
            </template>
          </el-alert>
        </div>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'ApiBindingDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: null
    }
  },
  emits: ['update:visible', 'confirm', 'close'],
  setup(props, { emit }) {
    const formRef = ref(null)
    
    const defaultFormData = {
      purpose: '',
      url: '',
      method: 'GET',
      trigger: 'mounted',
      params: '',
      transform: '',
      errorHandler: ''
    }
    
    const formData = ref({ ...defaultFormData })
    
    // 监听数据变化，初始化表单
    watch(() => props.visible, (newVal) => {
      if (newVal) {
        if (props.data) {
          formData.value = { ...defaultFormData, ...props.data }
        } else {
          formData.value = { ...defaultFormData }
        }
      }
    })
    
    // 确认
    const handleConfirm = () => {
      // 验证
      if (!formData.value.purpose) {
        ElMessage.warning('请填写接口用途')
        return
      }
      if (!formData.value.url) {
        ElMessage.warning('请填写请求地址')
        return
      }
      
      emit('confirm', { ...formData.value })
      emit('update:visible', false)
    }
    
    // 关闭
    const handleClose = () => {
      emit('update:visible', false)
      emit('close')
    }
    
    return {
      formRef,
      formData,
      handleConfirm,
      handleClose
    }
  }
}
</script>

<style scoped>
.form-tip {
  font-size: 12px;
  color: #909399;
  line-height: 1.5;
  margin-top: 4px;
}

.example-section {
  width: 100%;
}

.example-content p {
  margin: 6px 0;
  font-size: 13px;
  line-height: 1.6;
}
</style>

