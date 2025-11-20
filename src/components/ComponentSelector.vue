<template>
  <el-dialog
    :visible.sync="internalVisible"
    title="选择组件"
    width="800px"
    :append-to-body="true"
    :modal-append-to-body="true"
    class="component-selector-dialog"
  >
    <div class="component-selector">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索组件..."
        prefix-icon="el-icon-search"
        clearable
        class="mb-4"
      />

      <el-tabs v-model="activeCategory">
        <el-tab-pane label="全部" name="all" />
        <el-tab-pane label="基础组件" name="base" />
        <el-tab-pane label="业务组件" name="business" />
        <el-tab-pane label="自定义组件" name="custom" />
      </el-tabs>

      <div class="component-list-container">
        <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
          <!-- 自定义组件 tab 显示"添加自定义组件"卡片 -->
          <div
            v-if="activeCategory === 'custom'"
            class="component-card add-custom-component cursor-pointer rounded-lg border-2 border-dashed border-primary p-4 transition-all hover:border-primary hover:shadow-md hover:bg-primary-light"
            @click="showAddCustomComponentDialog"
          >
            <div class="flex flex-col items-center justify-center" style="min-height: 100px">
              <i class="el-icon-plus text-primary" style="font-size: 32px"></i>
              <h4 class="mt-2 font-semibold text-primary">添加自定义组件</h4>
              <p class="mt-1 text-xs text-gray-500">粘贴组件代码</p>
            </div>
          </div>

          <!-- 组件列表 -->
          <div
            v-for="component in filteredComponents"
            :key="component.name || component.id"
            class="component-card cursor-pointer rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-primary hover:shadow-md"
            @click="selectComponent(component)"
          >
            <div class="mb-2 flex items-center gap-2">
              <i
                :class="getComponentIcon(component.category)"
                class="text-primary"
                style="font-size: 20px"
              ></i>
              <h4 class="font-semibold text-gray-900">{{ component.label }}</h4>
            </div>
            <p class="mb-2 text-xs text-gray-500">{{ component.name }}</p>
            <p class="text-sm text-gray-600">{{ component.description }}</p>
            <el-tag
              v-if="component.category === 'business'"
              size="small"
              type="warning"
              class="mt-2"
            >
              业务组件
            </el-tag>
            <el-tag v-if="component.category === 'custom'" size="small" type="success" class="mt-2">
              自定义
            </el-tag>
            <!-- 自定义组件显示删除按钮 -->
            <el-button
              v-if="component.category === 'custom'"
              type="text"
              icon="el-icon-delete"
              size="small"
              class="delete-custom-btn"
              @click.stop="handleDeleteCustomComponent(component.id)"
            >
              删除
            </el-button>
          </div>
        </div>

        <el-empty
          v-if="filteredComponents.length === 0 && activeCategory !== 'custom'"
          description="没有找到匹配的组件"
        />
        <el-empty
          v-if="filteredComponents.length === 0 && activeCategory === 'custom'"
          description="暂无自定义组件"
        />
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getAllComponents, clearComponentCache } from '../services/componentLibrary'

export default {
  name: 'ComponentSelector',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    slotName: {
      type: String,
      default: '',
    },
    allowedComponents: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      internalVisible: this.visible,
      searchKeyword: '',
      activeCategory: 'all',
      componentList: [],
    }
  },
  computed: {
    customComponents() {
      return this.$store.state.editor.customComponents || []
    },
    allComponents() {
      // 合并系统组件和自定义组件
      return [...this.componentList, ...this.customComponents]
    },
    filteredComponents() {
      let result = this.allComponents

      console.log('🔍 组件选择器过滤:', {
        total: this.allComponents.length,
        systemComponents: this.componentList.length,
        customComponents: this.customComponents.length,
        allowedComponents: this.allowedComponents.length,
        category: this.activeCategory,
        searchKeyword: this.searchKeyword,
      })

      if (this.allowedComponents.length > 0 && this.activeCategory !== 'custom') {
        const beforeFilter = result.length
        result = result.filter(component => this.allowedComponents.includes(component.name))
        console.log('✅ 按 allowedComponents 过滤:', beforeFilter, '->', result.length)
        console.log('📋 允许的组件名:', this.allowedComponents.slice(0, 10).join(', '), '...')
        console.log(
          '📦 匹配的组件:',
          result
            .map(c => c.name)
            .slice(0, 10)
            .join(', '),
          '...'
        )
      }

      if (this.activeCategory !== 'all') {
        const beforeFilter = result.length
        result = result.filter(component => component.category === this.activeCategory)
        console.log(
          '✅ 按分类过滤:',
          beforeFilter,
          '->',
          result.length,
          '(分类:',
          this.activeCategory,
          ')'
        )
      }

      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase()
        const beforeFilter = result.length
        result = result.filter(component => {
          const nameMatch = component.name.toLowerCase().includes(keyword)
          const labelMatch = component.label.toLowerCase().includes(keyword)
          const descMatch =
            component.description && component.description.toLowerCase().includes(keyword)
          return nameMatch || labelMatch || descMatch
        })
        console.log(
          '✅ 按关键词过滤:',
          beforeFilter,
          '->',
          result.length,
          '(关键词:',
          this.searchKeyword,
          ')'
        )
      }

      console.log('🎯 最终结果:', result.length, '个组件')
      return result
    },
  },
  watch: {
    visible(val) {
      this.internalVisible = val
      // 每次打开时重新加载组件
      if (val) {
        this.loadComponents()
      }
    },
    internalVisible(val) {
      this.$emit('update:visible', val)
    },
  },
  mounted() {
    this.loadComponents()
  },
  methods: {
    async loadComponents() {
      // 清除缓存，强制重新加载
      clearComponentCache()
      this.componentList = await getAllComponents()
      console.log('📦 组件选择器加载了', this.componentList.length, '个组件')
    },
    showAddCustomComponentDialog() {
      this.$emit('add-custom-component')
    },
    handleDeleteCustomComponent(id) {
      this.$confirm('确定要删除这个自定义组件吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$store.dispatch('editor/deleteCustomComponent', id)
          this.$message.success('删除成功')
        })
        .catch(() => {
          // 用户取消删除
        })
    },
    selectComponent(component) {
      this.$emit('select', {
        component: component.name,
        label: component.label,
        props: component.defaultProps || {},
      })
    },
    getComponentIcon(category) {
      const icons = {
        base: 'el-icon-edit',
        business: 'el-icon-s-operation',
        search: 'el-icon-search',
      }
      return icons[category] || 'el-icon-grid'
    },
  },
}
</script>

<style scoped>
.add-custom-component {
  background-color: #f9fafb;
}

.add-custom-component:hover {
  background-color: #ecf5ff !important;
}

.component-card {
  position: relative;
}

.delete-custom-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;
  padding: 4px 8px;
  color: #f56c6c;
}

.delete-custom-btn:hover {
  color: #f56c6c;
  background-color: #fef0f0;
}
</style>

<style scoped>
.component-selector {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.component-list-container {
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;
}

/* 自定义滚动条样式 */
.component-list-container::-webkit-scrollbar {
  width: 6px;
}

.component-list-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.component-list-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.component-list-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.component-card {
  min-height: 120px;
}

/* 确保 dialog 内容区域有合适的高度 */
.component-selector-dialog /deep/ .el-dialog__body {
  max-height: 70vh;
  overflow: hidden;
  padding: 20px;
}
</style>
