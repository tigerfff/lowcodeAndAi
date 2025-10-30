<template>
  <div class="template-step">
    <div class="step-header">
      <h2>选择页面模板</h2>
      <p>选择一个符合你需求的页面模板开始</p>
    </div>

    <div class="template-list">
      <div
        v-for="template in templates"
        :key="template.id"
        class="template-card"
        :class="{ active: selectedTemplate?.id === template.id }"
        @click="handleSelect(template)"
      >
        <div class="template-icon">{{ template.icon || '📄' }}</div>
        <div class="template-info">
          <h3>{{ template.name }}</h3>
          <p>{{ template.description }}</p>
          <div class="template-tags">
            <span class="tag">{{ template.category }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="templates.length === 0" class="empty-state">
      <p>暂无可用模板</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useGeneratorStore } from '@/stores/useGeneratorStore'

export default {
  name: 'TemplateStep',
  
  emits: ['select'],
  
  setup(props, { emit }) {
    const store = useGeneratorStore()
    
    const templates = computed(() => store.availableTemplates)
    const selectedTemplate = computed(() => store.selectedTemplate)
    
    const handleSelect = (template) => {
      emit('select', template)
    }
    
    return {
      templates,
      selectedTemplate,
      handleSelect
    }
  }
}
</script>

<style scoped>
.template-step {
  background: #fff;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.step-header {
  margin-bottom: 32px;
}

.step-header h2 {
  margin: 0 0 8px 0;
  font-size: 24px;
  color: #303133;
}

.step-header p {
  margin: 0;
  color: #909399;
  font-size: 14px;
}

.template-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.template-card {
  border: 2px solid #dcdfe6;
  border-radius: 8px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.template-card:hover {
  border-color: #409eff;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
}

.template-card.active {
  border-color: #409eff;
  background: #ecf5ff;
}

.template-icon {
  font-size: 48px;
  flex-shrink: 0;
}

.template-info {
  flex: 1;
}

.template-info h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #303133;
}

.template-info p {
  margin: 0 0 12px 0;
  color: #606266;
  font-size: 14px;
  line-height: 1.5;
}

.template-tags {
  display: flex;
  gap: 8px;
}

.tag {
  padding: 4px 12px;
  background: #f0f9ff;
  color: #409eff;
  border-radius: 4px;
  font-size: 12px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #909399;
}
</style>

