# 智能页面代码生成工具

<div align="center">

**极简交互 + AI 智能推断，快速生成高质量 Vue2 代码（hui2.43.2 + hui-pro）**

[![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![Element Plus](https://img.shields.io/badge/Element%20Plus-2.x-409eff.svg)](https://element-plus.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

</div>

## ✨ 特性

- 🎯 **极简交互**: 只需 4 步，3-5 分钟生成完整页面代码
- 🤖 **AI 智能生成**: 通过 HTTP 调用 AI 模型生成完整代码
- 📦 **模板参考**: 基于 Handlebars 模板作为代码结构参考
- 🎨 **组件库扩展**: 支持基础组件和业务组件，可自定义扩展
- ✅ **高质量代码**: 生成的代码符合 Vue2 + hui2.43.2 + hui-pro 规范
- 🔄 **Fallback 保障**: AI 失败时自动切换到模板生成
- 💾 **配置导入导出**: 支持配置保存和复用

## 🚀 快速开始

### 环境要求

- Node.js >= 16
- npm >= 8

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 开始使用

### 构建生产版本

```bash
npm run build
```

## 📖 使用指南

### 四步生成代码

#### Step 1: 选择模板

从模板库选择页面类型:
- 📋 标准列表页: 搜索 + 表格 + 分页
- 🔍 复杂筛选页: 多条件筛选 + 复杂选择器 (即将推出)
- ⚙️ 表单配置页: 动态表单 + 侧边栏弹窗 (即将推出)

#### Step 2: 配置组件

- 填写页面基本信息 (页面名称、标题、面包屑)
- 在各个区域添加所需组件:
  - **搜索区**: 输入框、下拉选择、日期选择器等
  - **操作区**: 操作按钮
  - **表格列**: 动态配置表格列

#### Step 3: 配置 API

- 添加多个 API 配置（点击"添加 API 接口"）
- 填写接口名称、地址、方法
- 粘贴请求参数示例和响应示例（JSON 格式）
- 配置 AI 模型（Base URL + API Key）

#### Step 4: 生成代码

- 点击"开始生成"
- AI 调用外部模型生成完整代码
- 复制或下载生成的 Vue2 代码（hui2.43.2 + hui-pro）

## 🏗️ 技术架构

### 技术栈

**开发工具**:
- **前端框架**: Vue 3 + Composition API
- **UI 组件库**: Element Plus
- **样式方案**: Tailwind CSS 4.x
- **状态管理**: Pinia
- **构建工具**: Vite
- **代码规范**: ESLint + Prettier

**生成代码**:
- **前端框架**: Vue 2 + Options API
- **UI 组件库**: hui2.43.2 + hui-pro
- **模板引擎**: Handlebars（作为参考和 fallback）
- **AI 调用**: HTTP 请求外部 AI 模型

### 项目结构

```
ai-code/
├── src/
│   ├── components/          # UI 组件
│   │   ├── TemplateSelector.vue      # 模板选择器
│   │   ├── ComponentConfig.vue       # 组件配置
│   │   ├── ComponentSlot.vue         # 组件槽位
│   │   ├── ComponentSelector.vue     # 组件选择器对话框
│   │   ├── ApiConfig.vue             # API 配置
│   │   ├── CodeGenerator.vue         # 代码生成器
│   │   └── CodePreviewDialog.vue     # 代码预览对话框
│   ├── services/            # 核心服务
│   │   ├── templateManager.js        # 模板管理器
│   │   ├── componentLibrary.js       # 组件库管理器
│   │   ├── configManager.js          # 配置管理器
│   │   └── codeGenerator.js          # 代码生成器
│   ├── stores/              # 状态管理
│   │   └── editorStore.js            # 编辑器状态
│   ├── views/               # 页面
│   │   └── Editor.vue                # 主编辑器页面
│   └── main.js              # 入口文件
├── templates/               # 模板库
│   └── standard-list/       # 标准列表页模板
│       ├── template.json             # 模板定义
│       ├── page.vue.hbs              # Handlebars 模板
│       └── preview.png               # 预览图
├── docs/                    # 文档
│   ├── 产品文档.md
│   ├── 开发文档.md
│   └── 快速开始.md
└── package.json
```

## 🎯 核心概念

### 模板 (Template)

模板定义页面的基本结构和可用组件槽位:

```json
{
  "id": "standard-list",
  "label": "标准列表页",
  "slots": {
    "searchArea": {
      "label": "搜索区",
      "maxCount": 8,
      "allowedComponents": ["el-input", "el-select", "el-date-picker"]
    },
    "actionArea": {
      "label": "操作区",
      "maxCount": 6,
      "allowedComponents": ["el-button"]
    }
  }
}
```

### 组件库 (Component Library)

组件库定义可用组件及其元数据:

```javascript
{
  name: 'el-input',
  label: '输入框',
  category: 'base',
  defaultProps: {
    placeholder: '请输入',
    clearable: true
  }
}
```

### AI 智能生成 (AI Code Generation)

**配置 AI 模型**:
- Base URL: AI 模型的 HTTP 接口地址
- API Key: 访问密钥
- 模型选择: gpt-4, claude-3-opus, 等

**AI 生成流程**:
1. 收集用户配置（模板、组件、API JSON）
2. 构建完整 Prompt（包含模板参考、组件元数据）
3. 调用 AI 模型 HTTP 接口
4. AI 返回完整 .vue 代码
5. 验证代码（格式、语法、完整性）
6. 失败时 fallback 到 Handlebars 模板

### Handlebars 模板

使用 Handlebars 模板生成代码:

```handlebars
<template>
  <h-page-search>
    {{#each searchArea}}
    <h-page-search-item :label="{{label}}" :prop="{{model}}">
      <{{component}} v-model="filters.{{model}}" />
    </h-page-search-item>
    {{/each}}
  </h-page-search>
</template>
```

## 🛠️ 开发指南

### 添加新模板

1. 在 `templates/` 目录创建新文件夹
2. 创建 `template.json` (模板定义)
3. 创建 `page.vue.hbs` (Handlebars 模板)
4. 在 `templateManager.js` 中注册模板

### 添加新组件

1. 在 `componentLibrary.js` 中添加组件定义
2. 定义组件元数据 (名称、分类、默认属性)
3. AI 即可自动识别和使用

### 自定义 Handlebars Helper

在 `codeGenerator.js` 中注册:

```javascript
Handlebars.registerHelper('myHelper', (value) => {
  return value.toUpperCase()
})
```

## 📝 脚本命令

```bash
# 开发
npm run dev              # 启动开发服务器
npm run build            # 构建生产版本
npm run preview          # 预览生产构建

# 代码质量
npm run lint             # ESLint 检查
npm run format           # Prettier 格式化

# 测试
npm test                 # 运行测试
npm run test:ui          # 测试 UI

# 验证
npm run validate:components    # 验证组件定义
npm run validate:templates     # 验证模板定义
npm run validate:all           # 验证所有配置
```

## 📚 文档

- [产品文档](./docs/产品文档.md) - 产品功能和使用流程
- [开发文档](./docs/开发文档.md) - 技术架构和开发指南
- [快速开始](./docs/快速开始.md) - 快速上手指南

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议!

## 📄 许可证

[MIT](LICENSE)

---

<div align="center">
Made with ❤️ by AI Code Generator Team
</div>
