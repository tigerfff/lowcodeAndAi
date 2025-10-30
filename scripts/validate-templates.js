import fs from 'fs'
import path from 'path'
import Ajv from 'ajv'

const TEMPLATES_DIR = './templates'

// 模板元数据 Schema
const templateSchema = {
  type: 'object',
  required: ['id', 'label', 'description', 'version', 'layout', 'aiTasks', 'dataflows', 'componentDefaults'],
  properties: {
    id: { type: 'string', pattern: '^[a-z0-9-]+$' },
    label: { type: 'string' },
    description: { type: 'string' },
    preview: { type: 'string' },
    version: { type: 'string', pattern: '^\\d+\\.\\d+\\.\\d+$' },
    author: { type: 'string' },
    layout: {
      type: 'object',
      required: ['structure', 'template', 'components'],
      properties: {
        structure: { type: 'string', enum: ['fixed', 'flexible'] },
        template: { type: 'string', pattern: '\\.hbs$' },
        description: { type: 'string' },
        components: { type: 'object' }
      }
    },
    aiTasks: {
      type: 'array',
      minItems: 1,
      items: { type: 'string' }
    },
    dataflows: { type: 'object' },
    componentDefaults: { type: 'object' },
    configSchema: { type: 'object' },
    examples: { type: 'array' }
  }
}

console.log('🔍 开始验证模板...\n')

// 1. 扫描 templates 目录
let templateDirs = []
try {
  const items = fs.readdirSync(TEMPLATES_DIR)
  templateDirs = items.filter(item => {
    const fullPath = path.join(TEMPLATES_DIR, item)
    return fs.statSync(fullPath).isDirectory()
  })
} catch (error) {
  console.error(`❌ 无法读取 templates 目录: ${error.message}`)
  process.exit(1)
}

if (templateDirs.length === 0) {
  console.error('❌ templates 目录下没有找到任何模板')
  process.exit(1)
}

console.log(`📁 找到 ${templateDirs.length} 个模板目录: ${templateDirs.join(', ')}\n`)

let hasError = false
const ajv = new Ajv()
const validate = ajv.compile(templateSchema)

// 2. 验证每个模板
for (const templateDir of templateDirs) {
  const templatePath = path.join(TEMPLATES_DIR, templateDir)
  console.log(`📦 验证模板: ${templateDir}`)
  console.log(`   路径: ${templatePath}`)

  // 2.1 检查必需文件
  const requiredFiles = ['template.json', 'README.md']
  const templateJsonPath = path.join(templatePath, 'template.json')
  const readmePath = path.join(templatePath, 'README.md')

  let allFilesExist = true
  for (const file of requiredFiles) {
    const filePath = path.join(templatePath, file)
    if (!fs.existsSync(filePath)) {
      console.error(`   ❌ 缺少必需文件: ${file}`)
      hasError = true
      allFilesExist = false
    } else {
      console.log(`   ✅ 文件存在: ${file}`)
    }
  }

  if (!allFilesExist) {
    console.log('')
    continue
  }

  // 2.2 验证 template.json
  let templateData
  try {
    const content = fs.readFileSync(templateJsonPath, 'utf-8')
    templateData = JSON.parse(content)
    console.log('   ✅ template.json 格式正确')
  } catch (error) {
    console.error(`   ❌ template.json 解析失败: ${error.message}`)
    hasError = true
    console.log('')
    continue
  }

  // 2.3 Schema 验证
  const valid = validate(templateData)
  if (!valid) {
    console.error('   ❌ template.json Schema 校验失败:')
    validate.errors.forEach(error => {
      console.error(`      - ${error.instancePath}: ${error.message}`)
    })
    hasError = true
    console.log('')
    continue
  }
  console.log('   ✅ Schema 验证通过')

  // 2.4 检查模板文件
  const templateFile = path.join(templatePath, templateData.layout.template)
  if (!fs.existsSync(templateFile)) {
    console.error(`   ❌ 模板文件不存在: ${templateData.layout.template}`)
    hasError = true
  } else {
    console.log(`   ✅ 模板文件存在: ${templateData.layout.template}`)

    // 检查模板文件内容
    const templateContent = fs.readFileSync(templateFile, 'utf-8')
    
    // 检查是否包含基本的 Handlebars 语法
    const hasHandlebars = templateContent.includes('{{') && templateContent.includes('}}')
    if (!hasHandlebars) {
      console.warn(`   ⚠️  模板文件可能不包含 Handlebars 语法`)
    } else {
      console.log('   ✅ 模板包含 Handlebars 语法')
    }

    // 检查是否是 Vue SFC 格式
    const hasTemplate = templateContent.includes('<template>')
    const hasScript = templateContent.includes('<script>')
    if (!hasTemplate || !hasScript) {
      console.warn(`   ⚠️  模板文件可能不是完整的 Vue SFC 格式`)
    } else {
      console.log('   ✅ 模板是 Vue SFC 格式')
    }
  }

  // 2.5 检查 id 是否与目录名一致
  if (templateData.id !== templateDir) {
    console.error(`   ❌ 模板 id (${templateData.id}) 与目录名 (${templateDir}) 不一致`)
    hasError = true
  } else {
    console.log(`   ✅ 模板 id 与目录名一致`)
  }

  // 2.6 检查 aiTasks 是否足够详细
  if (templateData.aiTasks.length < 3) {
    console.warn(`   ⚠️  aiTasks 数量较少 (${templateData.aiTasks.length})，建议至少定义 3 个任务`)
  } else {
    console.log(`   ✅ aiTasks 定义完整 (${templateData.aiTasks.length} 个任务)`)
  }

  // 2.7 检查 dataflows 是否包含关键配置
  if (!templateData.dataflows.pagination) {
    console.warn('   ⚠️  dataflows 缺少 pagination 配置')
  }
  if (!templateData.dataflows.response) {
    console.warn('   ⚠️  dataflows 缺少 response 配置')
  }
  if (templateData.dataflows.pagination && templateData.dataflows.response) {
    console.log('   ✅ dataflows 配置完整')
  }

  // 2.8 检查 componentDefaults 是否使用已知组件
  const knownComponents = [
    'h-page-container', 'h-page-header', 'h-page-content',
    'h-page-search', 'h-page-action', 'h-page-table',
    'el-table', 'el-form', 'el-pagination'
  ]
  const defaultComponents = Object.keys(templateData.componentDefaults || {})
  const unknownComponents = defaultComponents.filter(c => !knownComponents.includes(c))
  if (unknownComponents.length > 0) {
    console.warn(`   ⚠️  componentDefaults 包含未知组件: ${unknownComponents.join(', ')}`)
  } else if (defaultComponents.length > 0) {
    console.log(`   ✅ componentDefaults 使用已知组件 (${defaultComponents.length} 个)`)
  }

  // 2.9 检查 README.md 内容
  const readmeContent = fs.readFileSync(readmePath, 'utf-8')
  const readmeChecks = [
    { pattern: /##.*概述/, name: '概述章节' },
    { pattern: /##.*结构/, name: '结构说明' },
    { pattern: /##.*配置/, name: '配置示例' },
    { pattern: /```json/i, name: 'JSON 代码示例' }
  ]

  let readmeComplete = true
  for (const check of readmeChecks) {
    if (!check.pattern.test(readmeContent)) {
      console.warn(`   ⚠️  README.md 缺少: ${check.name}`)
      readmeComplete = false
    }
  }
  if (readmeComplete) {
    console.log('   ✅ README.md 内容完整')
  }

  console.log('')
}

// 3. 统计信息
console.log('📊 验证统计:')
console.log(`   - 总模板数: ${templateDirs.length}`)

if (hasError) {
  console.log('\n❌ 验证失败，请修复上述错误')
  process.exit(1)
} else {
  console.log('\n✅ 所有模板验证通过!')
}

