/**
 * Prompt 模板系统
 * 用于生成不同场景下的 AI 提示词
 */

/**
 * 生成初稿推断的 Prompt
 * @param {Object} context - 上下文信息
 * @param {Object} context.parseResult - API 解析结果
 * @param {string} context.templateId - 模板 ID
 * @returns {string} Prompt 文本
 */
export function generateInitialInferencePrompt(context) {
  const { parseResult, templateId = 'standard-list' } = context
  
  return `你是一个专业的前端页面配置生成助手。请根据以下 API 数据结构，生成一个 Vue2 列表页面的配置 JSON。

## 上下文信息

**模板类型**: ${templateId}（标准列表页，包含搜索、表格、分页）

**API 响应数据路径**: ${parseResult.dataPath}
**总数字段路径**: ${parseResult.totalPath || '无'}
**分页参数**: pageNo=${parseResult.pagination.pageNoField}, pageSize=${parseResult.pagination.pageSizeField}

**数据样例**（前 2 条）:
\`\`\`json
${JSON.stringify(parseResult.dataSample.slice(0, 2), null, 2)}
\`\`\`

**识别到的字段**:
${parseResult.fields.map(f => `- ${f.key} (${f.type}): ${JSON.stringify(f.sample)}`).join('\n')}

${parseResult.searchFields && parseResult.searchFields.length > 0 ? `
**搜索字段**（从请求参数识别）:
${parseResult.searchFields.map(f => `- ${f.prop} (${f.type}), 默认值: ${JSON.stringify(f.defaultValue)}`).join('\n')}
` : ''}

## 任务要求

请生成一个完整的页面配置 JSON，包含以下部分：

### 1. 表格列配置 (columns)
- 为每个字段生成列配置
- **prop**: 字段名（必须与数据字段一致）
- **label**: 显示标题（根据字段名语义转换，例如 userId→"用户ID"、createTime→"创建时间"）
- **type**: 列类型，可选值：
  - "text": 普通文本（默认）
  - "datetime": 日期时间（字段名包含 time/date/at 结尾）
  - "tag": 标签/徽章（状态、类型等枚举字段）
- **width**: 列宽度（可选，ID 类字段建议 "80"，其他自适应可省略）
- **confidence**: 置信度（0-1，你对这个推断的确定程度）

如果字段是枚举类型（如 status），需要添加 **mapping** 配置：
\`\`\`json
{
  "prop": "status",
  "label": "状态",
  "type": "tag",
  "mapping": {
    "active": {"label": "启用", "type": "success"},
    "inactive": {"label": "停用", "type": "info"}
  },
  "confidence": 0.8
}
\`\`\`

### 2. 搜索字段配置 (searchFields)
${parseResult.searchFields && parseResult.searchFields.length > 0 ? `
基于已识别的搜索字段，为每个生成配置：
- **prop**: 字段名
- **label**: 显示标签
- **type**: 组件类型，可选值：
  - "input": 文本输入框
  - "select": 下拉选择（枚举字段）
  - "date": 日期选择
  - "daterange": 日期范围
- **defaultValue**: 默认值
- **confidence**: 置信度

如果是 select 类型，需要提供 **options** 数组：
\`\`\`json
{
  "prop": "status",
  "label": "状态",
  "type": "select",
  "options": [
    {"label": "全部", "value": ""},
    {"label": "启用", "value": "active"},
    {"label": "停用", "value": "inactive"}
  ],
  "defaultValue": "",
  "confidence": 0.75
}
\`\`\`
` : '（无搜索字段）'}

### 3. 数据映射 (dataMapping)
- **dataPath**: "${parseResult.dataPath}"（已识别）
- **totalPath**: "${parseResult.totalPath || ''}"（已识别）
- **pageNoField**: "${parseResult.pagination.pageNoField}"（已识别）
- **pageSizeField**: "${parseResult.pagination.pageSizeField}"（已识别）

## 输出要求

1. **仅输出 JSON**，不要包含任何解释文字或 markdown 代码块标记
2. JSON 结构必须包含：\`columns\`、\`searchFields\`、\`dataMapping\`
3. 所有字段必须添加 \`confidence\` 属性（0-1）
4. 置信度评估标准：
   - 0.9-1.0: 字段名语义清晰，类型明确
   - 0.7-0.89: 字段名较清晰，类型基于常见模式推断
   - 0.5-0.69: 字段名不清晰或类型难以判断
   - <0.5: 需要用户确认

请直接输出 JSON：`
}

/**
 * 生成修正推断的 Prompt
 * @param {Object} context - 上下文信息
 * @param {Object} context.currentConfig - 当前配置
 * @param {string} context.userFeedback - 用户反馈
 * @returns {string} Prompt 文本
 */
export function generateCorrectionPrompt(context) {
  const { currentConfig, userFeedback } = context
  
  return `你是一个专业的前端页面配置修正助手。用户对当前配置提出了修正需求。

## 当前配置
\`\`\`json
${JSON.stringify(currentConfig, null, 2)}
\`\`\`

## 用户反馈
${userFeedback}

## 任务要求

请根据用户反馈，修正配置 JSON，保持其他部分不变。

## 输出要求

1. **仅输出完整的修正后的 JSON**，不要包含任何解释
2. 保持 JSON 结构与原配置一致
3. 更新相关字段的 \`confidence\` 值（用户确认的项应为 1.0）

请直接输出修正后的完整 JSON：`
}

/**
 * 生成局部推断的 Prompt（例如仅推断某一列的类型）
 * @param {Object} context - 上下文信息
 * @param {string} context.field - 字段名
 * @param {*} context.sample - 样例值
 * @param {string} context.inferType - 推断类型 (columnType | searchType | options)
 * @returns {string} Prompt 文本
 */
export function generatePartialInferencePrompt(context) {
  const { field, sample, inferType } = context
  
  if (inferType === 'columnType') {
    return `请推断字段 "${field}" 的列类型。

样例值: ${JSON.stringify(sample)}

可选类型:
- text: 普通文本
- datetime: 日期时间
- tag: 标签/徽章（状态、类型等）

请仅输出 JSON 格式: {"type": "xxx", "confidence": 0.xx}

如果是 tag 类型，还需要提供 mapping，例如：
{"type": "tag", "mapping": {"active": {"label": "启用", "type": "success"}}, "confidence": 0.8}`
  }
  
  if (inferType === 'searchType') {
    return `请推断搜索字段 "${field}" 的组件类型。

可选类型:
- input: 文本输入框
- select: 下拉选择
- date: 日期选择
- daterange: 日期范围

请仅输出 JSON 格式: {"type": "xxx", "confidence": 0.xx}`
  }
  
  if (inferType === 'options') {
    return `请为枚举字段 "${field}" 生成下拉选项。

样例值: ${JSON.stringify(sample)}

请仅输出 JSON 格式: {"options": [{"label": "xxx", "value": "xxx"}], "confidence": 0.xx}`
  }
  
  return ''
}

/**
 * 生成字段标题推断的 Prompt
 * @param {string} fieldName - 字段名
 * @returns {string} Prompt 文本
 */
export function generateLabelInferencePrompt(fieldName) {
  return `请将字段名 "${fieldName}" 转换为合适的中文显示标签。

规则：
- userId → "用户ID"
- userName → "用户名称"
- createTime → "创建时间"
- updatedAt → "更新时间"
- status → "状态"
- isActive → "是否启用"

请仅输出 JSON 格式: {"label": "xxx", "confidence": 0.xx}`
}

export default {
  generateInitialInferencePrompt,
  generateCorrectionPrompt,
  generatePartialInferencePrompt,
  generateLabelInferencePrompt
}

