<template>
  <el-dialog
    :visible.sync="internalVisible"
    title="选择组件"
    width="800px"
    append-to-body
    :modal-append-to-body="true"
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
      </el-tabs>

      <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
        <div
          v-for="component in filteredComponents"
          :key="component.name"
          class="component-card cursor-pointer rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-primary hover:shadow-md"
          @click="selectComponent(component)"
        >
          <div class="mb-2 flex items-center gap-2">
            <i :class="getComponentIcon(component.category)" class="text-primary" style="font-size: 20px;"></i>
            <h4 class="font-semibold text-gray-900">{{ component.label }}</h4>
          </div>
          <p class="mb-2 text-xs text-gray-500">{{ component.name }}</p>
          <p class="text-sm text-gray-600">{{ component.description }}</p>
          <el-tag v-if="component.category === 'business'" size="small" type="warning" class="mt-2">
            业务组件
          </el-tag>
        </div>
      </div>

      <el-empty v-if="filteredComponents.length === 0" description="没有找到匹配的组件" />
    </div>
  </el-dialog>
</template>

<script>
import { getAllComponents } from '../services/componentLibrary'

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
  emits: ['update:visible', 'select'],
  data() {
    return {
      internalVisible: this.visible,
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
  watch: {
    visible(val) {
      this.internalVisible = val
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
        base: 'el-icon-edit',
        business: 'el-icon-s-operation',
        search: 'el-icon-search',
      }
      return icons[category] || 'el-icon-grid'
    },
  },
}
</script>
