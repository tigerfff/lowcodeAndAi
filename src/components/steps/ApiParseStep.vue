<template>
  <div class="api-parse-step">
    <api-parse-result @confirm="handleConfirm" />
    
    <div class="actions">
      <el-button @click="handlePrevious">⬅️ 上一步</el-button>
    </div>
  </div>
</template>

<script>
import apiParseResult from '@/components/ApiParseResult.vue'

export default {
  name: 'ApiParseStep',
  
  components: {
    apiParseResult
  },
  
  emits: ['next', 'previous'],
  
  methods: {
    handleConfirm(data) {
      this.$emit('next', data)
    },
    
    handlePrevious() {
      this.$emit('previous')
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

.actions {
  display: flex;
  justify-content: flex-start;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #ebeef5;
}
</style>
