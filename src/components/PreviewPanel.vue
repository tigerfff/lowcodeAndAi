<template>
  <div class="preview-panel">
    <!-- 预览工具栏 -->
    <div class="preview-toolbar">
      <div class="toolbar-left">
        <span class="toolbar-title">实时预览</span>
        <el-tag size="small" type="info">{{ templateName }}</el-tag>
      </div>
      <div class="toolbar-right">
        <el-button-group size="small">
          <el-button icon="el-icon-monitor" :class="{ active: deviceMode === 'desktop' }" @click="deviceMode = 'desktop'">
            桌面
          </el-button>
          <el-button icon="el-icon-mobile-phone" :class="{ active: deviceMode === 'mobile' }" @click="deviceMode = 'mobile'">
            移动
          </el-button>
        </el-button-group>
        <el-button size="small" icon="el-icon-refresh" @click="handleRefresh">
          刷新
        </el-button>
      </div>
    </div>

    <!-- 预览容器 -->
    <div class="preview-container" :class="{ 'device-mobile': deviceMode === 'mobile' }">
      <div class="preview-loading" v-if="loading">
        <i class="el-icon-loading" />
        <span>加载中...</span>
      </div>
      
      <!-- iframe 预览 -->
      <iframe
        ref="previewIframe"
        class="preview-iframe"
        :src="iframeUrl"
        frameborder="0"
        @load="handleIframeLoad"
      />
      
      <!-- 拖拽放置区域提示 -->
      <div
        v-if="!hasComponents"
        class="preview-empty"
        @dragover.prevent="handleDragOver"
        @drop="handleDrop"
      >
        <i class="el-icon-plus" />
        <p>从左侧拖拽组件到这里</p>
        <p class="tip">选择模板后，可以拖拽组件到对应的 slot 区域</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useEditorStore } from '@/stores/editorStore'

export default {
  name: 'PreviewPanel',
  setup() {
    const editorStore = useEditorStore()
    
    // 预览 iframe 引用
    const previewIframe = ref(null)
    
    // 设备模式
    const deviceMode = ref('desktop')
    
    // 加载状态
    const loading = ref(true)
    
    // iframe URL（临时使用空白页，后续需要创建 preview-iframe.html）
    const iframeUrl = ref('/preview-iframe.html')
    
    // 模板名称
    const templateName = computed(() => {
      return editorStore.selectedTemplate?.label || '未选择模板'
    })
    
    // 是否有组件
    const hasComponents = computed(() => {
      const { searchArea, actionArea, tableArea } = editorStore.pageConfig.components
      return searchArea.length > 0 || actionArea.length > 0 || tableArea !== null
    })
    
    // iframe 加载完成
    const handleIframeLoad = () => {
      loading.value = false
      console.log('Preview iframe loaded')
      
      // 向 iframe 发送初始配置
      updatePreview()
    }
    
    // 更新预览
    const updatePreview = () => {
      if (!previewIframe.value) return
      
      const config = {
        template: editorStore.selectedTemplate,
        components: editorStore.pageConfig.components
      }
      
      // 通过 postMessage 发送配置到 iframe
      previewIframe.value.contentWindow?.postMessage({
        type: 'update-preview',
        config
      }, '*')
    }
    
    // 刷新预览
    const handleRefresh = () => {
      loading.value = true
      previewIframe.value?.contentWindow?.location.reload()
    }
    
    // 拖拽悬停
    const handleDragOver = (event) => {
      event.preventDefault()
      event.dataTransfer.dropEffect = 'copy'
    }
    
    // 拖拽放置
    const handleDrop = (event) => {
      event.preventDefault()
      
      try {
        const componentData = JSON.parse(event.dataTransfer.getData('component'))
        console.log('放置组件:', componentData)
        
        // 添加组件到配置
        // 默认添加到搜索区（实际应该根据拖拽目标位置判断）
        const slotPath = 'h-page-search.default'
        editorStore.addComponent(slotPath, componentData)
        
        // 更新预览
        updatePreview()
        
        // 提示
        this.$message.success(`已添加 ${componentData.label}`)
      } catch (error) {
        console.error('放置组件失败:', error)
        this.$message.error('添加组件失败')
      }
    }
    
    // 监听来自 iframe 的消息
    const handleMessage = (event) => {
      const { type, data } = event.data
      
      switch (type) {
        case 'select-component':
          // 选中组件
          editorStore.selectComponent(data.componentId)
          break
        case 'log':
          // iframe 日志
          console.log('[Preview]', ...data.args)
          break
      }
    }
    
    onMounted(() => {
      window.addEventListener('message', handleMessage)
    })
    
    onBeforeUnmount(() => {
      window.removeEventListener('message', handleMessage)
    })
    
    return {
      previewIframe,
      deviceMode,
      loading,
      iframeUrl,
      templateName,
      hasComponents,
      handleIframeLoad,
      handleRefresh,
      handleDragOver,
      handleDrop,
      updatePreview
    }
  }
}
</script>

<style scoped>
.preview-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}

/* 预览工具栏 */
.preview-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #ffffff;
  border-bottom: 1px solid #e0e0e0;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toolbar-title {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.toolbar-right .el-button.active {
  background: #ecf5ff;
  color: #409eff;
  border-color: #c6e2ff;
}

/* 预览容器 */
.preview-container {
  flex: 1;
  position: relative;
  padding: 20px;
  overflow: hidden;
  transition: all 0.3s;
}

.preview-container.device-mobile {
  padding: 20px 80px;
}

/* 加载状态 */
.preview-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #909399;
  z-index: 10;
}

.preview-loading i {
  font-size: 32px;
  margin-bottom: 8px;
  display: block;
}

.preview-loading span {
  font-size: 14px;
}

/* iframe */
.preview-iframe {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* 空状态 */
.preview-empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #909399;
  z-index: 5;
  padding: 40px;
  border: 2px dashed #d0d0d0;
  border-radius: 8px;
  background: #fafafa;
  transition: all 0.2s;
}

.preview-empty:hover {
  border-color: #409eff;
  background: #f0f9ff;
}

.preview-empty i {
  font-size: 48px;
  color: #c0c4cc;
  display: block;
  margin-bottom: 12px;
}

.preview-empty p {
  font-size: 14px;
  margin: 8px 0;
}

.preview-empty .tip {
  font-size: 12px;
  color: #c0c4cc;
}
</style>

