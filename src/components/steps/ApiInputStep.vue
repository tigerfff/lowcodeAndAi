<template>
  <div class="api-input-step">
    <ApiInputPanel @parse="handleParse" />
  </div>
</template>

<script>
import ApiInputPanel from '@/components/ApiInputPanel.vue'

export default {
  name: 'ApiInputStep',
  
  components: {
    ApiInputPanel
  },
  
  emits: ['next'],
  
  methods: {
    handleParse(data) {
      // 转换数据格式
      this.$emit('next', {
        responseJson: JSON.stringify(data.response, null, 2),
        requestJson: data.request ? JSON.stringify(data.request, null, 2) : ''
      })
    }
  }
}
</script>

<style scoped>
.api-input-step {
  background: #fff;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>

