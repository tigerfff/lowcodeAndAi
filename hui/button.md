# Button 按钮

常用的操作按钮

## 基础用法

<template>
  <code-box title="基础用法" description="Button 组件默认提供9种主题，由`type`属性来定义，默认为`default`">
    <el-button type="primary">主要按钮</el-button>
    <el-button type="default">白色次按钮</el-button>
    <el-button type="primary" :radius="true">圆角按钮</el-button>
    <el-button type="text">文字按钮</el-button>
    <el-button type="link">文字链接</el-button>
  </code-box>
</template>

```vue
<el-button type="primary">主要按钮</el-button>
<el-button type="default">白色次按钮</el-button>
<el-button type="primary" :radius="true">圆角按钮</el-button>
<el-button type="text">文字按钮</el-button>
<el-button type="link">文字链接</el-button>
```

## 禁用状态

<template>
  <code-box title="按钮不可用状态" description="Button 组件默认提供9种主题，由`type`属性来定义，默认为`default`">
    <el-button type="primary" :disabled="true">主要按钮</el-button>
    <el-button :disabled="true">白色次按钮</el-button>
    <el-button type="success" :disabled="true">成功按钮</el-button>
    <el-button icon="h-icon-search" :disabled="true" />
    <el-button type="text" :disabled="true">文字按钮</el-button>
    <el-button type="link" :disabled="true">文字链接</el-button>
    <el-button icon="h-icon-edit" :disabled="true">图标按钮</el-button>
  </code-box>
</template>

```vue
<el-button type="primary" :disabled="true">主要按钮</el-button>
<el-button :disabled="true">白色次按钮</el-button>
<el-button type="success" :disabled="true">成功按钮</el-button>
<el-button icon="h-icon-search" :disabled="true" />
<el-button type="text" :disabled="true">文字按钮</el-button>
<el-button type="link" :disabled="true">文字链接</el-button>
<el-button icon="h-icon-edit" :disabled="true">图标按钮</el-button>
```

## 图标按钮

<template>
  <code-box
    title="带图标的按钮可增强辨识度(有文字)或节省空间(无文字)"
    description="设置`icon`属性即可，`icon-border`为有边框的图标按钮，`icon、border只支持mini`"
  >
    <p>default:</p>
    <div>
      <el-button icon="h-icon-search" />
      <el-button icon="h-icon-search">Search</el-button>
      <el-button icon="h-icon-search" type="primary">Search</el-button>
    </div>
    <p>mini:</p>
    <div>
      <el-button icon="h-icon-search" size="mini" />
      <el-button icon="h-icon-search" size="mini">Search</el-button>
      <el-button icon="h-icon-search" type="primary" size="mini">Search</el-button>
    </div>
  </code-box>
</template>

```vue
<el-button icon="h-icon-search" />
<el-button icon="h-icon-search">Search</el-button>
<el-button icon="h-icon-search" type="primary">Search</el-button>

<el-button icon="h-icon-search" size="mini" />
<el-button icon="h-icon-search" size="mini">Search</el-button>
<el-button icon="h-icon-search" type="primary" size="mini">Search</el-button>
```

<!-- 暂不开放 -->

<!-- ## 按钮组

<template>
  <code-box title="以按钮组的方式出现，常用于多项类似操作" description="使用`<el-button-group>`标签来嵌套你的按钮">
    <el-button-group>
      <el-button type="primary" icon="h-icon-help">钮组的方式出现，常用于多项类似操作</el-button>
      <el-button type="primary" icon="h-icon-search"></el-button>
      <el-button type="primary" icon="h-icon-lock"></el-button>
    </el-button-group>
  </code-box>
</template>

```vue
    <el-button type="primary" icon="h-icon-help">钮组的方式出现，常用于多项类似操作</el-button>
    <el-button type="primary" icon="h-icon-search"></el-button>
    <el-button type="primary" icon="h-icon-lock"></el-button>
``` -->

## 加载中

<template>
  <code-box title="点击按钮后进行数据加载操作，在按钮上显示加载状态" description="要设置为 loading 状态，只要设置`loading`属性为`true`即可">
    <el-button type="primary" :loading="true">加载中</el-button>
    <el-button type="text" :loading="true">文字按钮</el-button>
  </code-box>
</template>

```vue
<el-button type="primary" :loading="true">加载中</el-button>
<el-button type="text" :loading="true">文字按钮</el-button>
```

## 不同尺寸

<template>
  <code-box title="Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸" description="额外的尺寸：`large`、`small`、`mini`，通过设置`size`属性来配置它们">
    <el-button type="primary" size="large">large</el-button>
    <el-button type="primary">default</el-button>
    <el-button type="primary" size="small">small</el-button>
    <el-button type="primary" size="mini">mini</el-button>
  </code-box>
</template>

```vue
<el-button type="primary" size="large">large</el-button>
<el-button type="primary">default</el-button>
<el-button type="primary" size="small">small</el-button>
<el-button type="primary" size="mini">mini</el-button>
```

## 有颜色倾向

<template>
  <code-box title="不同的颜色倾向代表不同的提示" description="朴素按钮同样设置了不同的`type`属性对应的样式（可选值同上），默认为`info`设置`plain`属性，它接受一个`Boolean`注意，在该情况下，`type`虽然可以为`text`，但是是没有意义的，会显示为`text button`的样式">
    <div class="block">
      <span class="demonstration">默认显示颜色</span>
      <span class="buttonWrapper">
        <el-button type="success" >成功按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
        <el-button type="info">信息按钮</el-button>
      </span>
    </div>
  </code-box>
</template>

```vue
<div class="block">
  <span class="demonstration">默认显示颜色</span>
  <span class="buttonWrapper">
    <el-button type="success" >成功按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
    <el-button type="info">信息按钮</el-button>
  </span>
</div>
```

## API

### Attributes

| 参数        | 说明                                         | 类型    | 可选值                                              | 默认值                                |
| ----------- | -------------------------------------------- | ------- | --------------------------------------------------- | ------------------------------------- |
| size        | 尺寸                                         | string  | large,small,mini                                    | —                                     |
| type        | 类型                                         | string  | primary,success,warning,danger,info,text,link,ghost |                                       |
| plain       | 是否朴素按钮                                 | Boolean | —                                                   | false                                 |
| radius      | 是否圆角按钮                                 | Boolean | —                                                   | false                                 |
| loading     | 是否加载中状态                               | Boolean | —                                                   | false                                 |
| disabled    | 是否禁用状态                                 | boolean | —                                                   | false                                 |
| icon        | 图标，已有的图标库中的图标名或引入新的图标库 | string  | —                                                   | —                                     |
| icon-border | 提供给有边框写法 icon                        | string  | —                                                   | —                                     |
| min-width   | button 最小宽度                              | Number  | —                                                   | 96px                                  |
| max-width   | button 最大宽度                              | Number  | —                                                   | 普通按钮默认 192px,图标按钮默认 256px |
| autofocus   | 是否默认聚焦                                 | boolean | —                                                   | false                                 |
| native-type | 原生 type 属性                               | string  | button,submit,reset                                 | button                                |

<style scoped>
  /* @import 'bootstrap/css/bootstrap.min.css'; */
  .code-box-demo {
    .el-row {
      margin-bottom: 8px;
    }
    .el-button + .el-button {
      margin-left: 8px;
    }
    .el-button-group {
      margin-bottom: 20px;

      .el-button + .el-button {
        margin-left: 0;
      }

      & + .el-button-group {
        margin-left: 8px;
      }
    }
  }

  .code-box-demo .intro-block {
    padding: 0;
  }

  .code-box-demo .block {
    padding: 30px 24px;
    overflow: hidden;
    border-bottom: solid 1px #EFF2F6;
    &:last-child {
      border-bottom: none;
    }
  }

  .code-box-demo .demonstration {
    font-size: 14px;
    color: #8492a6;
    line-height: 44px;
  }

  .code-box-demo .buttonWrapper {
    float: right;
    margin-right: 20px;
  }
</style>
