<template>
  <div class="api-parse-step">
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="5" animated />
    </div>
    
    <div v-else-if="parseError" class="error-container">
      <el-alert type="error" :title="parseError" :closable="false" />
      <div class="actions">
        <el-button @click="handlePrevious">⬅️ 返回</el-button>
        <el-button type="primary" @click="handleRetry">重试</el-button>
      </div>
    </div>
    
    <api-parse-result 
      v-else
      :parse-result="parseResult"
      @confirm="handleConfirm" 
    />
    
    <div v-if="parseResult && !loading" class="actions">
      <el-button @click="handlePrevious">⬅️ 上一步</el-button>
      <el-button type="primary" @click="handleContinue">继续下一步 ➡️</el-button>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useGeneratorStore } from '@/stores/useGeneratorStore'
import { parseApiData } from '@/utils/apiParser'
import ApiParseResult from '@/components/ApiParseResult.vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'ApiParseStep',
  
  components: {
    ApiParseResult
  },
  
  emits: ['next', 'previous'],
  
  setup(props, { emit }) {
    const store = useGeneratorStore()
    const loading = ref(false)
    const parseResult = ref(null)
    const parseError = ref(null)
    
    const handleParse = async () => {
      loading.value = true
      parseError.value = null
      
      try {
        const responseData = JSON.parse(store.apiInput.responseJson)
        const requestData = store.apiInput.requestJson 
          ? JSON.parse(store.apiInput.requestJson) 
          : null
        
        const result = await parseApiData(responseData, requestData)
        parseResult.value = result
        
        ElMessage.success('API 数据解析成功')
      } catch (error) {
        console.error('Parse error:', error)
        parseError.value = error.message || 'API 数据解析失败'
        ElMessage.error('API 数据解析失败：' + error.message)
      } finally {
        loading.value = false
      }
    }
    
    const handleContinue = () => {
      if (parseResult.value) {
        handleConfirm(parseResult.value)
      }
    }
    
    const handleConfirm = (data) => {
      emit('next', data)
    }
    
    const handlePrevious = () => {
      emit('previous')
    }
    
    const handleRetry = () => {
      handleParse()
    }
    
    onMounted(() => {
      // 如果有 API 输入但还没有解析结果，自动触发解析
      if (store.apiInput.responseJson && !store.apiParseResult) {
        handleParse()
      } else if (store.apiParseResult) {
        // 如果已有解析结果，直接使用
        parseResult.value = store.apiParseResult
      }
    })
    
    return {
      loading,
      parseResult,
      parseError,
      handleConfirm,
      handlePrevious,
      handleRetry,
      handleContinue
    }
  }
}
</script>

<style scoped>
.api-parse-step {
  background: #fff;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.loading-container {
  padding: 40px 0;
}

.error-container {
  padding: 40px 0;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #ebeef5;
}
</style>
