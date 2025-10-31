<template>
  <div class="config-confirm-step">
    <div v-if="!config" class="no-data">
      <el-alert type="warning" :closable="false" show-icon>
        <template #title>
          <span>未找到配置数据，请返回上一步</span>
        </template>
      </el-alert>
      <div class="actions">
        <el-button @click="handlePrevious">返回上一步</el-button>
      </div>
    </div>
    
    <ConfigConfirmPanel 
      v-else
      :config="config"
      :parse-result="parseResult"
      @generate="handleGenerate"
      @previous="handlePrevious" 
    />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useGeneratorStore } from '@/stores/useGeneratorStore'
import ConfigConfirmPanel from '@/components/ConfigConfirmPanel.vue'
import { generateCode } from '@/services/code-generator'
import { ElMessage } from 'element-plus'

export default {
  name: 'ConfigConfirmStep',
  
  components: {
    ConfigConfirmPanel
  },
  
  emits: ['next', 'previous'],
  
  setup(props, { emit }) {
    const store = useGeneratorStore()
    
    const config = computed(() => store.inferredConfig)
    const parseResult = computed(() => store.apiParseResult)
    
    const handleNext = (data) => {
      emit('next', data)
    }
    
    const handlePrevious = () => {
      emit('previous')
    }
    
    const handleGenerate = async (data) => {
      try {
        console.log('Generating code with config:', data)
        
        // 先确认配置
        store.confirmConfig(data)
        
        // 生成代码
        const code = await generateCode(data)
        console.log('Generated code length:', code.length)
        
        store.setGeneratedCode(code)
        
        console.log('Store generatedCode:', store.generatedCode)
        
        ElMessage.success('代码生成成功')
        
        // 进入下一步
        emit('next', data)
      } catch (error) {
        console.error('Generate code error:', error)
        ElMessage.error('代码生成失败：' + error.message)
      }
    }
    
    return {
      config,
      parseResult,
      handleNext,
      handlePrevious,
      handleGenerate
    }
  }
}
</script>

<style scoped>
.config-confirm-step {
  background: #fff;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.no-data {
  padding: 40px 0;
  text-align: center;
}

.no-data .actions {
  margin-top: 24px;
}
</style>

