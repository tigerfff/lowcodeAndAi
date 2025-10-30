# AI 低代码本地出码工具

基于 Vue3 + Vite + TailwindCSS 的智能代码生成工具，通过典型页面模板 + AI 数据映射推断，自动生成 Vue2 + hui 组件库的页面代码。

## 核心特性

- ✅ **典型模板驱动**：预设页面模板（标准列表页、表单页等），布局固定，用户只选不改
- ✅ **AI 数据推断**：AI 仅推断数据映射（表格列、分页参数、搜索字段等），不推断布局
- ✅ **零配置生成**：仅需提供 API 文档或响应样例，自动推断完整配置
- ✅ **确认面板微调**：低置信度项可视化确认，支持手动调整
- ✅ **三重校验**：JSON Schema + 语法检查 + iframe 干跑测试
- ✅ **一键导出**：生成符合团队规范的 Vue2 代码，直接复制使用

## 技术栈

- **框架**：Vue3 + Vite（纯 JavaScript，无 TypeScript）
- **样式**：TailwindCSS
- **代码质量**：ESLint + Prettier + Husky + lint-staged
- **预览隔离**：iframe 沙箱（Vue2 + hui 组件库）
- **AI 集成**：多供应商支持（OpenAI、Claude、通义千问等）

## 项目结构

```
ai-code/
├── src/
│   ├── components/      # 可复用组件
│   ├── views/           # 页面视图
│   ├── stores/          # 状态管理（Pinia）
│   ├── utils/           # 工具函数
│   └── services/        # 服务层
├── templates/           # 典型页面模板
│   ├── standard-list/   # 标准列表页模板
│   ├── form-basic/      # 基础表单页模板
│   └── detail-view/     # 详情查看页模板
├── manifests/           # 组件清单
│   └── hui-components.json
├── config/              # 配置文件
│   └── ai.example.json  # AI 供应商配置示例
├── hui/                 # hui 组件库文档（用于提取元数据）
└── docs/                # 产品与技术文档

```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件，配置 AI 供应商信息：

```env
VITE_AI_PROVIDER=openai
VITE_AI_API_KEY=your_api_key_here
VITE_AI_BASE_URL=https://api.openai.com/v1
VITE_AI_MODEL=gpt-4o-mini
```

### 3. 启动开发服务器

```bash
npm run dev
```

### 4. 使用流程

1. 选择典型页面模板（如"标准列表页"）
2. 粘贴 API 响应样例 JSON（必需）、请求参数示例 JSON（可选）
3. （可选）上传页面截图辅助推断
4. AI 自动推断数据映射，生成配置 JSON
5. 在确认面板微调低置信度项
6. 一键生成 Vue2 代码并复制

## 开发脚本

```bash
npm run dev       # 启动开发服务器
npm run build     # 构建生产版本
npm run preview   # 预览生产构建
npm run lint      # ESLint 检查并修复
npm run format    # Prettier 格式化代码
```

## MVP 里程碑

### M1（P0）- 核心功能

- [X] 项目脚手架与配置
- [X] 3 个典型页面模板（标准列表页、基础表单页、详情查看页）
- [ ] hui 组件元数据提取与清单生成
- [ ] API 选择器（粘贴样例响应优先）
- [ ] AI 推断器（数据映射：columns、dataPath、pagination、searchFields）
- [ ] 确认面板（数据映射微调、置信度标注）
- [ ] 出码器（基于模板渲染完整 SFC）+ 三重校验
- [ ] iframe 预览（Vue2 + hui 组件库）

### M2（P1）- 扩展功能

- [ ] 2 个扩展模板（左树右表页、多 Tab 列表页）
- [ ] 字典联动（远程 options 接口）
- [ ] 枚举字段的 Tag 映射自动推断
- [ ] 历史记录与版本对比
- [ ] 生成报告增强

### M3（P2）- 高级功能

- [ ] 模板自定义与导入
- [ ] 图片辅助推断
- [ ] 多接口组合
- [ ] 代码优化建议
- [ ] service.js 与 router 配置生成

## 文档

- [产品文档](./产品文档.md) - 产品需求与功能说明
- [技术方案](./技术方案.md) - 详细技术设计文档

## 许可证

MIT
