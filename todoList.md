### MVP 开发 Todo List

#### 阶段 0：准备与验证

- [ ] 0.1 验证 hui 本地包可用（无需 npm）
  - [ ] 0.1.1 以 UMD 方式在预览 iframe 中加载本地包
    - 选择文件路径：`/Users/leehom/Documents/hik/ai-code/hui2.43.2/lib/` 与 `/Users/leehom/Documents/hik/ai-code/hui2.43.2/theme/`
    - 在 `public/preview.html` 引入：
      - `<link rel="stylesheet" href="/hui2.43.2/theme/index.css">`
      - `<script src="/hui2.43.2/lib/hui.min.js"></script>`（或实际 UMD 文件名）
    - 校验：`window.HUI` 存在，且能全局注册并渲染一个最小示例
  - [ ] 0.1.2 若无 UMD 构建，则为工具主应用配置本地 ESModule 别名
    - alias：`'@hui' -> '/Users/leehom/Documents/hik/ai-code/hui2.43.2/src'` 或 `lib`
    - 说明：仅用于工具主应用；预览 iframe 仍建议使用 UMD 注入以隔离运行时
  - [ ] 0.1.3 最小可运行页验证
    - 在 iframe 中渲染 `h-page-container` + 一个简单组件（如 `el-button` 或 `el-form`）
    - 截图保存到 `docs/preview-checks/step0-1.png`
- [ ] 0.2 核心组件文档评估（限定 5 个）
  - [ ] 0.2.1 检查以下文档是否具备 Attributes/Events/Slot 表格：
    - `hui/form.md`, `hui/table.md`, `hui/input.md`, `hui/select.md`, `hui/breadcrumb.md`
  - [ ] 0.2.2 输出“核心组件文档规范性报告”（Markdown 简表：是否存在/是否完整/备注）
  - [ ] 0.2.3 选定 1 个真实列表 API 作为后续判定样例，记录请求/响应示例
- [ ] 0.3 核心组件清单（限定 5 个）
  - [ ] 0.3.1 列表与用途说明：
    - form（表单容器/校验）
    - table（数据展示）
    - input（文本输入）
    - select（下拉选择）
    - breadcrumb（面包屑/导航）

#### 阶段 1：基础设施搭建

- [ ] 1.1 工具项目脚手架
  - [ ] 1.1.1 初始化 Vue3 + Vite 项目，配置 Tailwind 或 Uno（其一）
  - [ ] 1.1.2 目录结构搭建：`src/{components,views,stores,utils,services}`, `templates`, `manifests`, `config`
  - [ ] 1.1.3 配置 ESLint + Prettier + husky/lint-staged；新增 `.env.example`
- [ ] 1.2 hui 组件元数据（M1 手动提取）
  - [ ] 1.2.1 定义 `hui-components.schema.json`（name/category/requiredProps/commonProps/events/slots/vModel/备注）
  - [ ] 1.2.2 从 `hui/h-pagedTable.md` 提取元数据（标注函数式映射要求）
  - [ ] 1.2.3 提取其余 P0 组件（至少 14 个）并合并到 `manifests/hui-components.json`
  - [ ] 1.2.4 编写 `scripts/validate-components.js` 脚本并通过校验
- [ ] 1.3 第一个典型页面模板：standard-list
  - [ ] 1.3.1 编写 `templates/standard-list/template.json`（layout.fixed, aiTasks, dataflows, componentDefaults）
  - [ ] 1.3.2 编写 `templates/standard-list/page.vue.hbs`（完整 SFC 模板 + 变量注入点）
  - [ ] 1.3.3 准备 `templates/standard-list/preview.png`
  - [ ] 1.3.4 模板完整性校验脚本并通过

#### 阶段 2：核心功能开发

- [ ] 2.1 API 选择器与解析
  - [ ] 2.1.1 API 输入组件（粘贴样例 JSON / URL 上传 OpenAPI）
  - [ ] 2.1.2 JSON 解析：递归识别数据数组路径与总数路径（按 dataflows 优先级）
  - [ ] 2.1.3 分页参数识别：从请求参数识别 page/pageSize（支持 current/size 变体）
  - [ ] 2.1.4 UI 展示识别结果并支持手动修正
- [ ] 2.2 AI 推断器（仅数据映射）
  - [ ] 2.2.1 `config/ai.example.json` + `services/ai-provider.js`（统一适配层）
  - [ ] 2.2.2 Prompt 模板：生成初稿/修正/局部推断（强调仅输出数据映射 JSON）
  - [ ] 2.2.3 列推断：字段名→标题、类型（text/datetime/tag）、宽度
  - [ ] 2.2.4 数据路径映射：生成 `(json) => ...` 表达式（data/total/pageCount）
  - [ ] 2.2.5 搜索字段推断：从请求参数提取，枚举识别为 select 并产出 options
  - [ ] 2.2.6 置信度标注：所有项附 `confidence`，<0.8 视为低置信
  - [ ] 2.2.7 输出 Schema 校验通过的页面配置 JSON
- [ ] 2.3 确认面板（数据微调）
  - [ ] 2.3.1 列配置表格：字段名/标题/类型/宽度/显隐/顺序（支持拖拽）
  - [ ] 2.3.2 数据路径选择器：展示候选路径 + 手动输入
  - [ ] 2.3.3 搜索字段配置：新增/删除/类型/选项来源
  - [ ] 2.3.4 低置信度高亮与提示
  - [ ] 2.3.5 一键生成按钮（状态管理）
- [ ] 2.4 出码器（模板渲染）
  - [ ] 2.4.1 集成 Handlebars，创建 `services/code-generator.js`
  - [ ] 2.4.2 上下文构造：pageName/breadcrumb/api/表达式/columns/searchFields/defaults
  - [ ] 2.4.3 渲染生成完整 Vue2 SFC
  - [ ] 2.4.4 用 Prettier 格式化输出
- [ ] 2.5 代码校验
  - [ ] 2.5.1 页面配置 JSON Schema 校验（必填/类型）
  - [ ] 2.5.2 `vue-template-compiler` 语法校验
  - [ ] 2.5.3 ESLint 检查（可选）

#### 阶段 3：预览与集成

- [ ] 3.1 iframe 预览沙箱
  - [ ] 3.1.1 创建 iframe 容器与 CSP 配置
  - [ ] 3.1.2 `public/preview.html`：加载 Vue2 + hui（CDN/UMD），全局注册组件
  - [ ] 3.1.3 postMessage 注入 SFC 并挂载
  - [ ] 3.1.4 注入 Mock 数据与请求拦截
  - [ ] 3.1.5 干跑断言：表格≥1行、分页可切、无错误
- [ ] 3.2 主流程串联
  - [ ] 3.2.1 Pinia 状态：template/api/pageConfig/generatedCode/previewStatus
  - [ ] 3.2.2 步骤导航：选模板 → 配 API → 确认数据 → 预览/生成
  - [ ] 3.2.3 统一错误处理与提示（AI/解析/校验/渲染）
  - [ ] 3.2.4 端到端测试（3-5 个真实 API 样例）

#### 阶段 4：优化与发布

- [ ] 4.1 体验优化
  - [ ] 4.1.1 首次引导与 Tooltip
  - [ ] 4.1.2 加载/骨架屏
  - [ ] 4.1.3 内置示例模板与样例 API
- [ ] 4.2 文档与部署
  - [ ] 4.2.1 README、用户手册、FAQ
  - [ ] 4.2.2 构建优化与环境变量
  - [ ] 4.2.3 内网/测试环境部署验证

#### 里程碑校验点

- [ ] M1 基础设施完成
  - [ ] `hui-components.json` ≥ 15 组件且通过 Schema
  - [ ] `standard-list` 模板渲染一次成功
- [ ] M2 核心功能完成
  - [ ] API 解析正确识别数据/总数路径与分页参数
  - [ ] AI 生成的页面配置 JSON 通过 Schema 校验
  - [ ] 确认面板可微调并导出有效配置
  - [ ] 出码器生成 SFC 并通过语法校验
- [ ] M3 预览与集成完成
  - [ ] iframe 预览 + 干跑断言通过
  - [ ] 主流程端到端跑通（≥3 个真实 API）
- [ ] M4 MVP 发布
  - [ ] 文档齐全、构建成功、部署可用
