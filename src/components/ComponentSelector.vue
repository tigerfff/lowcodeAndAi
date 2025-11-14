<template>
  <el-dialog
    :model-value="visible"
    title="选择组件"
    width="800px"
    @update:model-value="$emit('update:visible', $event)"
  >
    <div class="component-selector">
      <!-- 搜索框 -->
      <el-input
        v-model="searchKeyword"
        placeholder="搜索组件..."
        :prefix-icon="Search"
        clearable
        class="mb-4"
      />

      <!-- 组件分类 -->
      <el-tabs v-model="activeCategory">
        <el-tab-pane label="全部" name="all" />
        <el-tab-pane label="基础组件" name="base" />
        <el-tab-pane label="业务组件" name="business" />
      </el-tabs>

      <!-- 组件网格 -->
      <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
        <div
          v-for="component in filteredComponents"
          :key="component.name"
          class="component-card cursor-pointer rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-primary hover:shadow-md"
          @click="selectComponent(component)"
        >
          <div class="mb-2 flex items-center gap-2">
            <el-icon :size="20" class="text-primary">
              <component :is="getComponentIcon(component.category)" />
            </el-icon>
            <h4 class="font-semibold text-gray-900">{{ component.label }}</h4>
          </div>
          <p class="mb-2 text-xs text-gray-500">{{ component.name }}</p>
          <p class="text-sm text-gray-600">{{ component.description }}</p>
          <el-tag v-if="component.category === 'business'" size="small" type="warning" class="mt-2">
            业务组件
          </el-tag>
        </div>
      </div>

      <!-- 空状态 -->
      <el-empty v-if="filteredComponents.length === 0" description="没有找到匹配的组件" />
    </div>
  </el-dialog>
</template>

<script>
import { getAllComponents } from '../services/componentLibrary'
import { Search, Edit, Operation, Grid } from '@element-plus/icons-vue'

export default {
  name: 'ComponentSelector',
  components: {
    Search,
    Edit,
    Operation,
    Grid,
  },
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
  emits: ['update:visible', 'select'],
  data() {
    return {
      searchKeyword: '',
      activeCategory: 'all',
      componentList: [],
    }
  },
  computed: {
    filteredComponents() {
      let result = this.componentList

      if (this.allowedComponents.length > 0) {
        result = result.filter(component => this.allowedComponents.includes(component.name))
      }

      if (this.activeCategory !== 'all') {
        result = result.filter(component => component.category === this.activeCategory)
      }

      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase()
        result = result.filter(component => {
          const nameMatch = component.name.toLowerCase().includes(keyword)
          const labelMatch = component.label.toLowerCase().includes(keyword)
          const descMatch =
            component.description && component.description.toLowerCase().includes(keyword)
          return nameMatch || labelMatch || descMatch
        })
      }

      return result
    },
  },
  mounted() {
    this.loadComponents()
  },
  methods: {
    async loadComponents() {
      this.componentList = await getAllComponents()
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
        base: Edit,
        business: Operation,
        search: Search,
      }
      return icons[category] || Grid
    },
  },
}
</script>
