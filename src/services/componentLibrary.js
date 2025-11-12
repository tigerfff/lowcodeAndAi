/**
 * 组件库管理器
 * 负责加载、管理 hui 和 Element UI 组件元数据
 */

/**
 * 获取所有可用组件
 * @returns {Promise<Object>} 按分类组织的组件列表
 */
export async function getAllComponents() {
  try {
    // 从 manifests 目录加载组件清单
    // 目前使用硬编码数据，后续可以从 hui-components.json 加载
    const components = {
      search: [
        {
          name: 'el-input',
          label: '输入框',
          description: '文本输入',
          icon: 'el-icon-edit',
          category: 'search',
          wrapper: 'h-page-search-item',
          defaultProps: {
            prop: '',
            label: '字段名',
            placeholder: '请输入',
            clearable: true,
          },
          props: [
            {
              name: 'prop',
              label: '字段名',
              type: 'string',
              required: true,
              description: '绑定的数据字段名',
            },
            {
              name: 'label',
              label: '标签',
              type: 'string',
              required: true,
              description: '显示的标签文本',
            },
            {
              name: 'placeholder',
              label: '占位符',
              type: 'string',
              default: '请输入',
              description: '输入框占位文本',
            },
            {
              name: 'clearable',
              label: '可清空',
              type: 'boolean',
              default: true,
              description: '是否显示清空按钮',
            },
            {
              name: 'disabled',
              label: '禁用',
              type: 'boolean',
              default: false,
              description: '是否禁用',
            },
          ],
          events: ['input', 'change', 'blur', 'focus', 'clear'],
        },
        {
          name: 'el-select',
          label: '下拉选择',
          description: '单选/多选',
          icon: 'el-icon-arrow-down',
          category: 'search',
          wrapper: 'h-page-search-item',
          defaultProps: {
            prop: '',
            label: '字段名',
            placeholder: '请选择',
            clearable: true,
            multiple: false,
          },
          props: [
            {
              name: 'prop',
              label: '字段名',
              type: 'string',
              required: true,
            },
            {
              name: 'label',
              label: '标签',
              type: 'string',
              required: true,
            },
            {
              name: 'placeholder',
              label: '占位符',
              type: 'string',
              default: '请选择',
            },
            {
              name: 'clearable',
              label: '可清空',
              type: 'boolean',
              default: true,
            },
            {
              name: 'multiple',
              label: '多选',
              type: 'boolean',
              default: false,
              description: '是否支持多选',
            },
            {
              name: 'filterable',
              label: '可搜索',
              type: 'boolean',
              default: false,
              description: '是否支持搜索',
            },
          ],
          events: ['change', 'visible-change', 'remove-tag', 'clear'],
          needsOptions: true, // 标记此组件需要配置选项数据
        },
        {
          name: 'el-date-picker',
          label: '日期选择',
          description: '日期/日期范围',
          icon: 'el-icon-date',
          category: 'search',
          wrapper: 'h-page-search-item',
          defaultProps: {
            prop: '',
            label: '字段名',
            type: 'daterange',
            'value-format': 'yyyy-MM-dd',
            'range-separator': '至',
            'start-placeholder': '开始日期',
            'end-placeholder': '结束日期',
          },
          props: [
            {
              name: 'prop',
              label: '字段名',
              type: 'string',
              required: true,
            },
            {
              name: 'label',
              label: '标签',
              type: 'string',
              required: true,
            },
            {
              name: 'type',
              label: '类型',
              type: 'select',
              options: ['date', 'daterange', 'datetime', 'datetimerange', 'month', 'year'],
              default: 'daterange',
              description: '日期选择器类型',
            },
            {
              name: 'value-format',
              label: '值格式',
              type: 'string',
              default: 'yyyy-MM-dd',
              description: '绑定值的格式',
            },
          ],
          events: ['change', 'blur', 'focus'],
        },
        {
          name: 'el-cascader',
          label: '级联选择',
          description: '多级联动',
          icon: 'el-icon-connection',
          category: 'search',
          wrapper: 'h-page-search-item',
          defaultProps: {
            prop: '',
            label: '字段名',
            placeholder: '请选择',
            clearable: true,
          },
          props: [
            {
              name: 'prop',
              label: '字段名',
              type: 'string',
              required: true,
            },
            {
              name: 'label',
              label: '标签',
              type: 'string',
              required: true,
            },
            {
              name: 'placeholder',
              label: '占位符',
              type: 'string',
              default: '请选择',
            },
            {
              name: 'clearable',
              label: '可清空',
              type: 'boolean',
              default: true,
            },
          ],
          events: ['change', 'expand-change', 'blur', 'focus'],
          needsOptions: true,
        },
        {
          name: 'el-input-number',
          label: '数字输入',
          description: '数字输入框',
          icon: 'el-icon-edit',
          category: 'search',
          wrapper: 'h-page-search-item',
          defaultProps: {
            prop: '',
            label: '字段名',
            placeholder: '请输入数字',
            min: 0,
            max: 999999,
          },
          props: [
            {
              name: 'prop',
              label: '字段名',
              type: 'string',
              required: true,
            },
            {
              name: 'label',
              label: '标签',
              type: 'string',
              required: true,
            },
            {
              name: 'min',
              label: '最小值',
              type: 'number',
              default: 0,
            },
            {
              name: 'max',
              label: '最大值',
              type: 'number',
              default: 999999,
            },
            {
              name: 'step',
              label: '步长',
              type: 'number',
              default: 1,
            },
          ],
          events: ['change', 'blur', 'focus'],
        },
      ],
      table: [
        {
          name: 'el-table',
          label: '表格',
          description: '数据表格',
          icon: 'el-icon-s-grid',
          category: 'table',
          wrapper: null,
          defaultProps: {
            data: [],
            border: true,
            stripe: false,
            size: 'small',
          },
          props: [
            {
              name: 'border',
              label: '边框',
              type: 'boolean',
              default: true,
              description: '是否带有纵向边框',
            },
            {
              name: 'stripe',
              label: '斑马纹',
              type: 'boolean',
              default: false,
              description: '是否为斑马纹表格',
            },
            {
              name: 'size',
              label: '尺寸',
              type: 'select',
              options: ['medium', 'small', 'mini'],
              default: 'small',
              description: '表格的尺寸',
            },
            {
              name: 'showHeader',
              label: '显示表头',
              type: 'boolean',
              default: true,
              description: '是否显示表头',
            },
            {
              name: 'height',
              label: '高度',
              type: 'string',
              description: 'Table 的高度，默认为自动高度',
            },
            {
              name: 'maxHeight',
              label: '最大高度',
              type: 'string',
              description: 'Table 的最大高度',
            },
          ],
          slots: ['default', 'append'],
        },
        {
          name: 'el-table-column',
          label: '表格列',
          description: '添加表格列',
          icon: 'el-icon-s-grid',
          category: 'table',
          wrapper: null,
          defaultProps: {
            prop: '',
            label: '列名',
            width: '',
            sortable: false,
          },
          props: [
            {
              name: 'prop',
              label: '字段名',
              type: 'string',
              required: true,
            },
            {
              name: 'label',
              label: '列名',
              type: 'string',
              required: true,
            },
            {
              name: 'width',
              label: '列宽',
              type: 'string',
              description: '固定宽度，如 "120"',
            },
            {
              name: 'sortable',
              label: '可排序',
              type: 'boolean',
              default: false,
            },
            {
              name: 'fixed',
              label: '固定列',
              type: 'select',
              options: ['', 'left', 'right'],
              default: '',
              description: '固定列的位置',
            },
          ],
          slots: ['default', 'header'],
        },
      ],
      action: [
        {
          name: 'el-button',
          label: '按钮',
          description: '操作按钮',
          icon: 'el-icon-s-promotion',
          category: 'action',
          wrapper: null,
          defaultProps: {
            type: 'primary',
            text: '按钮',
            size: 'small',
          },
          props: [
            {
              name: 'type',
              label: '类型',
              type: 'select',
              options: ['primary', 'success', 'warning', 'danger', 'info', 'text'],
              default: 'primary',
            },
            {
              name: 'text',
              label: '按钮文本',
              type: 'string',
              required: true,
              default: '按钮',
            },
            {
              name: 'size',
              label: '尺寸',
              type: 'select',
              options: ['large', 'default', 'small', 'mini'],
              default: 'small',
            },
            {
              name: 'icon',
              label: '图标',
              type: 'string',
              description: 'Element 图标类名',
            },
            {
              name: 'disabled',
              label: '禁用',
              type: 'boolean',
              default: false,
            },
          ],
          events: ['click'],
        },
      ],
    }

    // 将对象转换为扁平数组
    const allComponents = [...components.search, ...components.table, ...components.action]

    return allComponents
  } catch (error) {
    console.error('Failed to load components:', error)
    return []
  }
}

/**
 * 根据名称获取组件信息
 * @param {string} componentName - 组件名称
 * @returns {Promise<Object|null>} 组件信息
 */
export async function getComponentByName(componentName) {
  const allComponents = await getAllComponents()
  return allComponents.find(c => c.name === componentName) || null
}

/**
 * 根据分类获取组件
 * @param {string} category - 分类名称
 * @returns {Promise<Array>} 组件列表
 */
export async function getComponentsByCategory(category) {
  const allComponents = await getAllComponents()
  return allComponents.filter(c => c.category === category)
}

/**
 * 搜索组件
 * @param {string} keyword - 搜索关键词
 * @returns {Promise<Array>} 搜索结果
 */
export async function searchComponents(keyword) {
  const allComponents = await getAllComponents()
  const lowerKeyword = keyword.toLowerCase()

  return allComponents.filter(
    comp =>
      comp.label.toLowerCase().includes(lowerKeyword) ||
      comp.description.toLowerCase().includes(lowerKeyword) ||
      comp.name.toLowerCase().includes(lowerKeyword)
  )
}

/**
 * 验证组件配置
 * @param {Object} componentConfig - 组件配置
 * @returns {Object} 验证结果 { valid: boolean, errors: Array }
 */
export async function validateComponentConfig(componentConfig) {
  const errors = []

  // 检查是否有组件名
  if (!componentConfig.component) {
    errors.push('组件名称不能为空')
    return { valid: false, errors }
  }

  // 获取组件元数据
  const componentMeta = await getComponentByName(componentConfig.component)
  if (!componentMeta) {
    errors.push(`未找到组件: ${componentConfig.component}`)
    return { valid: false, errors }
  }

  // 检查必需属性
  const requiredProps = componentMeta.props?.filter(p => p.required) || []
  for (const prop of requiredProps) {
    if (!componentConfig.props || !componentConfig.props[prop.name]) {
      errors.push(`缺少必需属性: ${prop.label || prop.name}`)
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * 获取组件的默认配置
 * @param {string} componentName - 组件名称
 * @returns {Promise<Object>} 默认配置
 */
export async function getDefaultConfig(componentName) {
  const component = await getComponentByName(componentName)

  if (!component) {
    return null
  }

  return {
    component: componentName,
    wrapper: component.wrapper,
    props: { ...component.defaultProps },
    apiBindings: [],
    aiPrompt: null,
  }
}
