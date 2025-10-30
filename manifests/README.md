# Manifests

组件清单目录

## 文件说明

- **hui-components.json** - hui 组件库元数据
  - 从 `hui/*.md` 文档提取
  - 包含组件名称、props、events、slots、v-model 规则等

## 元数据字段

```json
{
  "name": "组件名",
  "category": "layout|form|list|input|display",
  "description": "组件说明",
  "requiredProps": ["必填属性"],
  "commonProps": { "prop": "defaultValue" },
  "events": ["事件名"],
  "vModel": { "prop": "value", "event": "input" } | null,
  "slots": { "slotName": "说明" }
}
```

