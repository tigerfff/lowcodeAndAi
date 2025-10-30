# PageButtonGroup 按钮组

## 基础用法
<template>
  <code-box title="基础用法" description="在按钮组里的按钮整体超出容器宽度时，会将按钮文本隐藏，仅展示图标。">
    <p>正常情况：</p>
    <h-page-button-group>
      <el-button type="iconButton" icon="h-icon-add">添加</el-button>
      <el-button type="iconButton" icon="h-icon-delete">删除</el-button>
      <el-button type="iconButton" icon="h-icon-enable">启用</el-button>
      <el-button type="iconButton" icon="h-icon-disable">禁用</el-button>
      <el-button type="iconButton" icon="h-icon-import">导入</el-button>
      <el-button type="iconButton" icon="h-icon-export">导出</el-button>
    </h-page-button-group>
    <p>超长情况：</p>
    <h-page-button-group>
      <el-button type="iconButton" icon="h-icon-add">一个很长的添加按钮</el-button>
      <el-button type="iconButton" icon="h-icon-delete">一个很长的删除按钮</el-button>
      <el-button type="iconButton" icon="h-icon-enable">一个很长的启用按钮</el-button>
      <el-button type="iconButton" icon="h-icon-disable">一个很长的禁用按钮</el-button>
      <el-button type="iconButton" icon="h-icon-import">一个很长的导入按钮</el-button>
      <el-button type="iconButton" icon="h-icon-export">一个很长的导出按钮</el-button>
    </h-page-button-group>
  </code-box>
</template>

```html
<p>正常情况：</p>
<h-page-button-group>
  <el-button type="iconButton" icon="h-icon-add">添加</el-button>
  <el-button type="iconButton" icon="h-icon-delete">删除</el-button>
  <el-button type="iconButton" icon="h-icon-enable">启用</el-button>
  <el-button type="iconButton" icon="h-icon-disable">禁用</el-button>
  <el-button type="iconButton" icon="h-icon-import">导入</el-button>
  <el-button type="iconButton" icon="h-icon-export">导出</el-button>
</h-page-button-group>
<p>超长情况：</p>
<h-page-button-group>
  <el-button type="iconButton" icon="h-icon-add">一个很长的添加按钮</el-button>
  <el-button type="iconButton" icon="h-icon-delete">一个很长的删除按钮</el-button>
  <el-button type="iconButton" icon="h-icon-enable">一个很长的启用按钮</el-button>
  <el-button type="iconButton" icon="h-icon-disable">一个很长的禁用按钮</el-button>
  <el-button type="iconButton" icon="h-icon-import">一个很长的导入按钮</el-button>
  <el-button type="iconButton" icon="h-icon-export">一个很长的导出按钮</el-button>
</h-page-button-group>
```

## API

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| max-width | 按钮组最大宽度 | String | - | - |
| btn-max-width | 按钮最大宽度 | String/Number | - | - |

### Events
| 事件 | 说明 | 回调参数 |
|------|------|------|
| fold | 按钮折叠事件 | - |
| unfold | 按钮展开事件 | - |
