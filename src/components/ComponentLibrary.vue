<template>
  <div class="component-library">
    <!-- 搜索框 -->
    <div class="library-search">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索组件..."
        prefix-icon="el-icon-search"
        clearable
        size="small"
      />
    </div>

    <!-- 组件分类 -->
    <el-collapse v-model="activeCategories" class="library-collapse">
      <!-- 搜索组件 -->
      <el-collapse-item name="search" title="🔍 搜索组件">
        <div class="component-list">
          <div
            v-for="comp in filteredComponents.search"
            :key="comp.name"
            class="component-item"
            draggable="true"
            @dragstart="handleDragStart($event, comp)"
            @dragend="handleDragEnd"
          >
            <i :class="comp.icon || 'el-icon-s-operation'" class="component-icon" />
            <div class="component-info">
              <div class="component-name">{{ comp.label }}</div>
              <div class="component-desc">{{ comp.description }}</div>
            </div>
          </div>
        </div>
      </el-collapse-item>

      <!-- 表格组件 -->
      <el-collapse-item name="table" title="📊 表格组件">
        <div class="component-list">
          <div
            v-for="comp in filteredComponents.table"
            :key="comp.name"
            class="component-item"
            draggable="true"
            @dragstart="handleDragStart($event, comp)"
            @dragend="handleDragEnd"
          >
            <i :class="comp.icon || 'el-icon-s-grid'" class="component-icon" />
            <div class="component-info">
              <div class="component-name">{{ comp.label }}</div>
              <div class="component-desc">{{ comp.description }}</div>
            </div>
          </div>
        </div>
      </el-collapse-item>

      <!-- 操作组件 -->
      <el-collapse-item name="action" title="🔘 操作组件">
        <div class="component-list">
          <div
            v-for="comp in filteredComponents.action"
            :key="comp.name"
            class="component-item"
            draggable="true"
            @dragstart="handleDragStart($event, comp)"
            @dragend="handleDragEnd"
          >
            <i :class="comp.icon || 'el-icon-s-promotion'" class="component-icon" />
            <div class="component-info">
              <div class="component-name">{{ comp.label }}</div>
              <div class="component-desc">{{ comp.description }}</div>
            </div>
          </div>
        </div>
      </el-collapse-item>

      <!-- 自定义组件 -->
      <el-collapse-item name="custom" title="🎨 自定义组件">
        <div class="component-list">
          <div class="component-empty">
            <i class="el-icon-plus" />
            <span>注册自定义组件</span>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'ComponentLibrary',
  setup() {
    // 搜索关键词
    const searchKeyword = ref('')
    
    // 展开的分类
    const activeCategories = ref(['search', 'table', 'action'])
    
    // 组件库数据（临时，后续从 componentLibrary service 加载）
    const components = {
      search: [
        {
          name: 'el-input',
          label: '输入框',
          description: '文本输入',
          icon: 'el-icon-edit',
          wrapper: 'h-page-search-item',
          defaultProps: {
            prop: '',
            label: '字段名',
            placeholder: '请输入',
            clearable: true
          }
        },
        {
          name: 'el-select',
          label: '下拉选择',
          description: '单选/多选',
          icon: 'el-icon-arrow-down',
          wrapper: 'h-page-search-item',
          defaultProps: {
            prop: '',
            label: '字段名',
            placeholder: '请选择',
            clearable: true
          }
        },
        {
          name: 'el-date-picker',
          label: '日期选择',
          description: '日期/日期范围',
          icon: 'el-icon-date',
          wrapper: 'h-page-search-item',
          defaultProps: {
            prop: '',
            label: '字段名',
            type: 'daterange',
            'value-format': 'yyyy-MM-dd'
          }
        },
        {
          name: 'el-cascader',
          label: '级联选择',
          description: '多级联动',
          icon: 'el-icon-connection',
          wrapper: 'h-page-search-item',
          defaultProps: {
            prop: '',
            label: '字段名',
            placeholder: '请选择'
          }
        }
      ],
      table: [
        {
          name: 'el-table-column',
          label: '表格列',
          description: '添加表格列',
          icon: 'el-icon-s-grid',
          wrapper: null,
          defaultProps: {
            prop: '',
            label: '列名',
            width: ''
          }
        }
      ],
      action: [
        {
          name: 'el-button',
          label: '按钮',
          description: '操作按钮',
          icon: 'el-icon-s-promotion',
          wrapper: null,
          defaultProps: {
            type: 'primary',
            text: '按钮'
          }
        }
      ]
    }
    
    // 过滤后的组件
    const filteredComponents = computed(() => {
      const keyword = searchKeyword.value.toLowerCase()
      if (!keyword) return components
      
      const result = {}
      for (const category in components) {
        result[category] = components[category].filter(
          comp => comp.label.toLowerCase().includes(keyword) ||
                 comp.description.toLowerCase().includes(keyword)
        )
      }
      return result
    })
    
    // 拖拽开始
    const handleDragStart = (event, component) => {
      // 设置拖拽数据
      event.dataTransfer.effectAllowed = 'copy'
      event.dataTransfer.setData('component', JSON.stringify(component))
      
      // 添加拖拽样式
      event.target.classList.add('dragging')
      
      console.log('开始拖拽组件:', component.label)
    }
    
    // 拖拽结束
    const handleDragEnd = (event) => {
      event.target.classList.remove('dragging')
    }
    
    return {
      searchKeyword,
      activeCategories,
      filteredComponents,
      handleDragStart,
      handleDragEnd
    }
  }
}
</script>

<style scoped>
.component-library {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 搜索框 */
.library-search {
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
}

/* 折叠面板 */
.library-collapse {
  flex: 1;
  overflow-y: auto;
  border: none;
}

.library-collapse :deep(.el-collapse-item__header) {
  padding-left: 16px;
  font-weight: 500;
  color: #303133;
}

.library-collapse :deep(.el-collapse-item__content) {
  padding: 0;
}

/* 组件列表 */
.component-list {
  padding: 8px;
}

.component-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  margin-bottom: 8px;
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: grab;
  transition: all 0.2s;
}

.component-item:hover {
  background: #f0f0f0;
  border-color: #409eff;
  box-shadow: 0 2px 4px rgba(64, 158, 255, 0.1);
}

.component-item:active {
  cursor: grabbing;
}

.component-item.dragging {
  opacity: 0.5;
  cursor: grabbing;
}

.component-icon {
  font-size: 20px;
  color: #409eff;
  margin-right: 12px;
  flex-shrink: 0;
}

.component-info {
  flex: 1;
  min-width: 0;
}

.component-name {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 2px;
}

.component-desc {
  font-size: 12px;
  color: #909399;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 空状态 */
.component-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  color: #909399;
  cursor: pointer;
  transition: color 0.2s;
}

.component-empty:hover {
  color: #409eff;
}

.component-empty i {
  font-size: 32px;
  margin-bottom: 8px;
}

.component-empty span {
  font-size: 13px;
}
</style>

