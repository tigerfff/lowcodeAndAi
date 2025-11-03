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
          <el-button
            icon="el-icon-monitor"
            :class="{ active: deviceMode === 'desktop' }"
            @click="deviceMode = 'desktop'"
          >
            桌面
          </el-button>
          <el-button
            icon="el-icon-mobile-phone"
            :class="{ active: deviceMode === 'mobile' }"
            @click="deviceMode = 'mobile'"
          >
            移动
          </el-button>
        </el-button-group>
        <el-button size="small" icon="el-icon-refresh" @click="handleRefresh"> 刷新 </el-button>
      </div>
    </div>

    <!-- 预览容器 -->
    <div class="preview-container" :class="{ 'device-mobile': deviceMode === 'mobile' }">
      <div v-if="loading" class="preview-loading">
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

      <!-- 未选择模板提示 -->
      <div v-if="!editorStore.selectedTemplate" class="preview-empty">
        <i class="el-icon-document" />
        <p>请先在顶部选择一个模板</p>
        <p class="tip">选择模板后即可开始设计页面</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
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
      console.log('🎬 Preview iframe loaded')
      console.log('🎬 Current selectedTemplate:', editorStore.selectedTemplate)

      // 向 iframe 发送初始配置
      if (editorStore.selectedTemplate) {
        console.log('🎬 Sending initial config')
        updatePreview()
      } else {
        console.warn('⚠️ No template selected on iframe load')
      }
    }

    // 更新预览
    const updatePreview = () => {
      if (!previewIframe.value) {
        console.warn('⚠️ previewIframe not ready')
        return
      }

      console.log('📤 Updating preview...')
      console.log('selectedTemplate:', editorStore.selectedTemplate)
      console.log('previewLayout:', editorStore.selectedTemplate?.previewLayout)

      try {
        // 序列化配置，移除不可克隆的对象（如函数）
        const config = JSON.parse(
          JSON.stringify({
            pageInfo: editorStore.pageConfig.pageInfo,
            components: editorStore.pageConfig.components,
            templateLayout: editorStore.selectedTemplate?.previewLayout || null, // 👈 添加模板布局
            template: editorStore.selectedTemplate
              ? {
                  id: editorStore.selectedTemplate.id,
                  label: editorStore.selectedTemplate.label,
                }
              : null,
          })
        )

        console.log('📤 Sending config to iframe:', config)
        console.log('📤 templateLayout being sent:', config.templateLayout)

        // 通过 postMessage 发送配置到 iframe
        previewIframe.value.contentWindow?.postMessage(
          {
            type: 'update-preview',
            config,
          },
          '*'
        )
      } catch (error) {
        console.error('Failed to update preview:', error)
      }
    }

    // 刷新预览
    const handleRefresh = () => {
      loading.value = true
      previewIframe.value?.contentWindow?.location.reload()
    }

    // 拖拽悬停
    const handleDragOver = event => {
      event.preventDefault()
      event.dataTransfer.dropEffect = 'copy'
    }

    // 拖拽放置
    const handleDrop = event => {
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
        ElMessage.success(`已添加 ${componentData.label}`)
      } catch (error) {
        console.error('放置组件失败:', error)
        ElMessage.error('添加组件失败')
      }
    }

    // 处理从 iframe 拖拽放置的组件
    const handleDropFromIframe = data => {
      const { zone, component } = data

      console.log('从 iframe 接收到组件:', component, '目标区域:', zone)

      // 根据 zone 确定添加到哪个区域
      let targetArea
      if (zone === 'search') {
        targetArea = 'searchArea'
      } else if (zone === 'table') {
        targetArea = 'actionArea' // 表格区的按钮
      } else {
        targetArea = 'searchArea' // 默认
      }

      // 生成唯一 ID
      const componentId = `${component.name}_${Date.now()}`

      // 构建组件配置，确保包含所有必需属性
      const componentConfig = {
        id: componentId,
        component: component.name,
        wrapper: component.wrapper || null, // 👈 保存 wrapper
        wrapperProps: component.wrapperProps || [], // 👈 保存 wrapperProps
        props: {
          ...component.defaultProps,
          label: component.label || component.defaultProps?.label,
          value: '', // 为 el-select 等组件添加默认 value
          prop: component.defaultProps?.prop || `field_${Date.now()}`,
        },
        apiBindings: [], // 初始化 apiBindings 数组
      }

      // 添加到对应区域
      editorStore.pageConfig.components[targetArea].push(componentConfig)

      // 更新预览
      updatePreview()

      console.log('组件已添加到', targetArea, componentConfig)
    }

    // 监听来自 iframe 的消息
    const handleMessage = event => {
      const { type, data } = event.data

      switch (type) {
        case 'drop-component':
          // 处理从 iframe 拖拽放置的组件
          handleDropFromIframe(data)
          break
        case 'select-component':
          // 选中组件
          editorStore.selectComponent(data.componentId)
          break
        case 'iframe-ready':
          // iframe 加载完成，发送初始配置
          console.log('Iframe ready, sending initial config')
          // 只有在有模板时才发送配置，否则 iframe 会显示"请选择模板"
          if (editorStore.selectedTemplate) {
            updatePreview()
          }
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

    // 监听模板变化，自动更新预览
    watch(
      () => editorStore.selectedTemplate,
      newTemplate => {
        console.log('🔄 Template changed:', newTemplate)
        console.log('🔄 loading:', loading.value)
        if (newTemplate && !loading.value) {
          // 只有在 iframe 加载完成后才更新
          console.log('🔄 Triggering updatePreview from watch')
          updatePreview()
        } else if (!newTemplate) {
          console.warn('⚠️ Template is null')
        } else if (loading.value) {
          console.warn('⚠️ Iframe still loading, will update after load')
        }
      },
      { deep: true, immediate: false }
    )

    // 监听组件配置变化，自动更新预览
    watch(
      () => editorStore.pageConfig.components,
      () => {
        updatePreview()
      },
      { deep: true }
    )

    return {
      editorStore,
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
      updatePreview,
    }
  },
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
