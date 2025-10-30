import fs from 'fs'
import Ajv from 'ajv'

// 1. 加载 Schema 和数据
const schema = JSON.parse(
  fs.readFileSync('./manifests/hui-components.schema.json', 'utf-8')
)
const components = JSON.parse(
  fs.readFileSync('./manifests/hui-components.json', 'utf-8')
)

// 2. JSON Schema 校验
const ajv = new Ajv()
const validate = ajv.compile(schema)
const valid = validate(components)

if (!valid) {
  console.error('❌ Schema 校验失败:')
  console.error(JSON.stringify(validate.errors, null, 2))
  process.exit(1)
}

console.log('✅ Schema 校验通过')

// 3. 必需组件检查 (P0 核心组件)
const requiredComponents = [
  // 布局组件（最重要）
  'h-page-container',
  'h-page-content',
  'h-page-header',
  'h-page-action',
  'h-page-search',
  'h-page-search-item',
  'h-page-sidebar',
  'h-page-table',
  'h-page-content-table',
  'h-layout',
  // 列表组件
  'h-paged-table',
  'el-table',
  'el-table-column',
  'el-pagination',
  // 表单组件
  'el-form',
  'el-form-item',
  'el-input',
  'el-select',
  'el-option',
  'el-button',
  // 数据组件
  'el-tree'
]

const componentNames = components.components.map((c) => c.name)
const missing = requiredComponents.filter(
  (name) => !componentNames.includes(name)
)

if (missing.length > 0) {
  console.error('❌ 缺少必需组件:')
  console.error(missing.join(', '))
  process.exit(1)
}

console.log('✅ 必需组件检查通过')

// 4. 特殊标注检查
const specialChecks = [
  {
    name: 'h-page-container',
    checks: [
      {
        field: 'specialNote',
        contains: '最外层容器',
        desc: '必须说明作为最外层容器使用'
      },
      {
        field: 'slots',
        hasKey: 'pageHeader',
        desc: '必须定义 pageHeader 插槽'
      }
    ]
  },
  {
    name: 'h-page-header',
    checks: [
      {
        field: 'specialNote',
        contains: "slot='pageHeader'",
        desc: "必须说明需要通过 slot='pageHeader' 使用"
      },
      {
        field: 'dependencies',
        includes: 'h-page-container',
        desc: '必须声明依赖 h-page-container'
      }
    ]
  },
  {
    name: 'h-page-search',
    checks: [
      {
        field: 'requiredProps',
        includes: 'model',
        desc: '必须声明 model 为必需属性'
      },
      {
        field: 'dependencies',
        includes: 'h-page-search-item',
        desc: '必须声明依赖 h-page-search-item'
      }
    ]
  },
  {
    name: 'h-paged-table',
    checks: [
      {
        field: 'specialNote',
        contains: '函数式映射',
        desc: '必须说明支持函数式映射数据路径'
      },
      {
        field: 'requiredProps',
        includes: 'data',
        desc: '必须声明 data 为必需属性'
      },
      {
        field: 'requiredProps',
        includes: 'total',
        desc: '必须声明 total 为必需属性'
      }
    ]
  },
  {
    name: 'el-table',
    checks: [
      {
        field: 'specialNote',
        contains: 'force-scroll',
        desc: '必须说明 force-scroll 属性的作用'
      },
      {
        field: 'usageConstraints',
        includes: '如需分页功能，请使用 h-paged-table',
        desc: '必须说明不再支持内置分页'
      }
    ]
  }
]

let hasError = false

specialChecks.forEach((check) => {
  const component = components.components.find((c) => c.name === check.name)
  if (!component) {
    console.error(`❌ 未找到组件: ${check.name}`)
    hasError = true
    return
  }

  check.checks.forEach((rule) => {
    let passed = false

    if (rule.contains) {
      // 检查字段是否包含指定文本
      const value = component[rule.field]
      if (typeof value === 'string') {
        passed = value.includes(rule.contains)
      } else if (Array.isArray(value)) {
        passed = value.some((item) => item.includes(rule.contains))
      }
    } else if (rule.hasKey) {
      // 检查对象是否有指定 key
      const value = component[rule.field]
      passed = value && typeof value === 'object' && rule.hasKey in value
    } else if (rule.includes) {
      // 检查数组是否包含指定元素
      const value = component[rule.field]
      passed = Array.isArray(value) && value.includes(rule.includes)
    }

    if (!passed) {
      console.error(`❌ ${check.name}: ${rule.desc}`)
      hasError = true
    }
  })
})

if (hasError) {
  console.error('\n❌ 特殊标注检查失败')
  process.exit(1)
}

console.log('✅ 特殊标注检查通过')

// 5. 统计信息
console.log('\n📊 统计信息:')
console.log(`  - 总组件数: ${components.components.length}`)

const byCategory = {}
components.components.forEach((c) => {
  byCategory[c.category] = (byCategory[c.category] || 0) + 1
})

console.log('  - 分类统计:')
Object.entries(byCategory).forEach(([category, count]) => {
  console.log(`    * ${category}: ${count}`)
})

const withVModel = components.components.filter((c) => c.vModel).length
console.log(`  - 支持 v-model: ${withVModel}`)

const withSlots = components.components.filter(
  (c) => c.slots && Object.keys(c.slots).length > 0
).length
console.log(`  - 有插槽定义: ${withSlots}`)

const withMethods = components.components.filter(
  (c) => c.methods && c.methods.length > 0
).length
console.log(`  - 有暴露方法: ${withMethods}`)

console.log('\n✅ 所有校验通过!')

