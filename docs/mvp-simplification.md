# MVP 简化说明 - API 输入方式调整

## 📋 变更原因

根据实际使用场景，**MVP 版本专注于粘贴方式**，简化实现复杂度，快速验证核心功能。

## ✅ 保留的功能

### API 输入方式（MVP）

**方式 1：粘贴响应样例 JSON** ⭐ **主要方式**
- 用户直接粘贴完整的 API 响应 JSON
- 工具自动解析数据结构
- 识别数据路径、字段列表等

**方式 2：粘贴请求参数示例 JSON** （可选）
- 用户粘贴 API 请求参数 JSON
- 用于识别分页参数和搜索字段
- 帮助 AI 推断搜索字段配置

## ❌ 移除的功能（后续版本扩展）

### 暂时移除
- ~~OpenAPI 文档文件上传~~
- ~~OpenAPI URL 输入~~
- ~~内部文档平台对接~~

**原因**：
1. 简化实现，聚焦核心功能验证
2. 粘贴方式最简单直接，用户体验好
3. 内部文档平台对接需要额外开发工作

## 📝 技术文档调整

### 已更新的文件

1. **产品文档.md**
   - 用户流程：`关联接口文档（粘贴 API 响应样例 JSON、请求参数示例 JSON）`
   - 零配置推断：`只关联接口文档（粘贴响应示例）`

2. **技术方案.md**
   - API 选择器与解析：明确标注"MVP 版本专注于粘贴方式"
   - 添加说明：暂时不包含 OpenAPI 文档解析和对内部文档平台的对接功能

3. **todoList.md**
   - 任务 2.1.1：`API 输入组件：粘贴响应样例 JSON + 粘贴请求参数示例 JSON`

4. **README.md**
   - 使用流程：明确标注粘贴 JSON 方式

## 🎯 MVP 输入界面设计

```vue
<template>
  <div class="api-input-panel">
    <h3>📋 提供接口信息</h3>
    
    <!-- 响应样例（必需）-->
    <el-form-item label="API 响应样例" required>
      <el-input
        type="textarea"
        v-model="responseJson"
        placeholder="粘贴完整的 API 响应 JSON..."
        :rows="15"
      />
      <div class="hint">提示：从浏览器开发者工具或 Postman 复制响应内容</div>
    </el-form-item>
    
    <!-- 请求参数（可选）-->
    <el-form-item label="API 请求参数" optional>
      <el-input
        type="textarea"
        v-model="requestJson"
        placeholder="粘贴请求参数 JSON（可选）..."
        :rows="8"
      />
      <div class="hint">提示：用于识别分页参数和搜索字段</div>
    </el-form-item>
    
    <!-- 操作按钮 -->
    <div class="actions">
      <el-button type="primary" @click="parseAndNext">解析并继续</el-button>
      <el-button @click="clear">清空</el-button>
    </div>
  </div>
</template>
```

## 🔄 后续版本扩展计划

### M2（P1）可以加入
- OpenAPI 文档文件上传支持
- OpenAPI 规范的解析器

### M3（P2）可以加入
- 内部文档平台对接
- 自动拉取接口文档
- 文档缓存和版本管理

## 💡 用户使用建议

### 如何准备响应样例？

1. **从浏览器开发者工具**
   ```
   Network → 选择接口 → Response → 右键 Copy Response
   ```

2. **从 Postman**
   ```
   选择接口 → Send → 下方 Response → 右键 Copy
   ```

3. **从接口文档**
   ```
   复制文档中的响应示例
   ```

### 建议的响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "rows": [
      {
        "userName": "张三",
        "phone": "13800138000",
        "email": "zhangsan@example.com",
        "status": "1",
        "createTime": "2024-01-01 10:00:00"
      }
    ],
    "total": 100
  }
}
```

**要求**：
- 包含至少一条数据
- 包含总数字段
- JSON 格式正确

## ✅ 验证清单

- [x] 产品文档已更新
- [x] 技术方案已更新
- [x] TODO 列表已更新
- [x] README 已更新
- [x] 输入界面设计已简化

## 📌 注意事项

1. **数据结构识别**仍然支持多种常见格式（data.rows、data.items 等）
2. **分页参数识别**仍然支持多种变体（pageNo/pageSize、current/size 等）
3. **只是输入方式简化了**，解析逻辑不受影响
4. 后续版本可以无缝加入 OpenAPI 支持

