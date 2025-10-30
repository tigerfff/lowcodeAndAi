<template>
  <div class="config-confirm-step">
    <ConfigConfirmPanel @next="handleNext" @previous="handlePrevious" />
  </div>
</template>

<script>
import ConfigConfirmPanel from '@/components/ConfigConfirmPanel.vue'

export default {
  name: 'ConfigConfirmStep',
  
  components: {
    ConfigConfirmPanel
  },
  
  emits: ['next', 'previous'],
  
  methods: {
    handleNext(data) {
      this.$emit('next', data)
    },
    
    handlePrevious() {
      this.$emit('previous')
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
</style>

