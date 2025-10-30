# Breadcrumb 面包屑

显示当前页面的路径，快速返回之前的任意页面。

## 基础用法

<template>
  <code-box title="基本用法" description="在`el-breadcrumb`中使用`el-breadcrumb-item`标签表示从首页开始的每一级。Element 提供了一个`separator`属性，在`el-breadcrumb`标签中设置它来决定分隔符，它只能是字符串，默认为斜杠图标 `>` 即 `h-icon-angle_right_sm`。且 separator 优先级低于 separatorClass">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :item-click="itemClick">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">活动管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">活动列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </code-box>
</template>

```html
<el-breadcrumb separator="/">
  <el-breadcrumb-item :item-click="itemClick">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/' }">活动管理</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/' }">活动列表</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/' }">活动详情</el-breadcrumb-item>
</el-breadcrumb>
<script>
export default{
  methods: {
    itemClick(){
      console.log(11)
    }
  }
}
</script>
```

## 无跳转路径

<template>
  <code-box title="无跳转路径" description="没有 `to` 参数时，面包屑的点击样式与正常状态保持一致">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </code-box>
</template>

```html
<el-breadcrumb separator="/">
  <el-breadcrumb-item>首页</el-breadcrumb-item>
  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
</el-breadcrumb>
```

## 图标分隔

除了使用分隔符作为面包屑之间的分隔，也可以使用图标 class 进行分隔。目前，在 `HUI2.0` 中，取消了文字分隔，全部以图标作为面包屑中导航的分隔符。但为了保持一致，`separator` 属性没有删除。但已经不起作用，使用的时候，多多注意一下。

<template>
  <code-box title="使用图标作为分隔符" description="这里的 demo 使用了最右边图标作为分隔示例，同时，设置的 / 分隔符失效">
    <el-breadcrumb separator="/" separatorClass="h-icon-angle_line_right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </code-box>
</template>

```html
<el-breadcrumb separator="/" separatorClass="h-icon-angle_line_right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
</el-breadcrumb>
```

## 省略导航

选择 `dropdown` 隐藏类型时，子元素需使用 `el-breadcrumb-sub-item` 来包裹。省略的部分，使用 `el-breadcrumb-sub-item` 做封装，其基本用法与 `el-breadcrumb-item` 一致。

<template>
  <code-box title="省略导航" description="">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item type="dropdown">
        <el-breadcrumb-sub-item :to="{ path: '/' }">活动a管理</el-breadcrumb-sub-item>
        <el-breadcrumb-sub-item>活动管理</el-breadcrumb-sub-item>
        <el-breadcrumb-sub-item :to="{ path: '/' }">活动管理</el-breadcrumb-sub-item>
      </el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </code-box>
</template>

```html
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
  <el-breadcrumb-item type="dropdown">
    <el-breadcrumb-sub-item :to="{ path: '/' }">
      活动a管理
    </el-breadcrumb-sub-item>
    <el-breadcrumb-sub-item>活动管理</el-breadcrumb-sub-item>
    <el-breadcrumb-sub-item :to="{ path: '/' }">
      活动管理
    </el-breadcrumb-sub-item>
  </el-breadcrumb-item>
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
</el-breadcrumb>
```

## 省略展示

使用 `tooltip` 包含隐藏的部分。省略部分的另一种方式，省略部分在触发显示后，以面包屑的形式呈现。

<template>
  <code-box title="省略展示" description="">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item type="tooltip">
          <el-breadcrumb-sub-item>活动b管理</el-breadcrumb-sub-item>
          <el-breadcrumb-sub-item>活动管理</el-breadcrumb-sub-item>
          <el-breadcrumb-sub-item>活动管理</el-breadcrumb-sub-item>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </code-box>
</template>

```html
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
  <el-breadcrumb-item type="tooltip">
    <el-breadcrumb-sub-item>活动b管理</el-breadcrumb-sub-item>
    <el-breadcrumb-sub-item>活动管理</el-breadcrumb-sub-item>
    <el-breadcrumb-sub-item>活动管理</el-breadcrumb-sub-item>
  </el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/' }">活动详情</el-breadcrumb-item>
</el-breadcrumb>
```

<script>
export default{
  methods: {
    itemClick(){
      console.log(11)
    }
  }
}
</script>

## API

### Breadcrumb Attributes

| 参数                                   | 说明                                            | 类型   | 可选值 | 默认值  |
| -------------------------------------- | ----------------------------------------------- | ------ | ------ | ------- |
| separator                              | 分隔符                                          | string | —      | 斜杠'/' |
| separator-class <Badge text="2.0+"/>   | 分隔图标。设置值后，`separator` 失效            | string | -      |
| item-max-width <Badge text="2.0.33+"/> | 面包屑子项最大宽度，会被子项的 `max-width` 覆盖 | string | -      |

### Breadcrumb Item Attributes

| 参数                                  | 说明                                                               | 类型          | 可选值          | 默认值 |
| ------------------------------------- | ------------------------------------------------------------------ | ------------- | --------------- | ------ |
| to                                    | 路由跳转对象，同 `vue-router` 的 `to`                              | string/object | —               | —      |
| item-click                            | item 点击事件，先执行 item，但不会影响 to 的跳转                   | Function      | —               | —      |
| replace                               | 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录 | boolean       | —               | false  |
| type <Badge text="2.0+"/>             | 新增,用于设置隐藏元素的展示形式                                    | string        | tooltip/popover | -      |
| max-width <Badge text="2.0.33+"/>     | 最大宽度                                                           | string        | -               |
| sub-max-width <Badge text="2.0.33+"/> | 被收起的面包屑子项最大宽度，会被收起子项的 `max-width` 覆盖        | string        | -               |

### Breadcrumb Sub Item Attributes

| 参数                              | 说明                                  | 类型          | 可选值 | 默认值 |
| --------------------------------- | ------------------------------------- | ------------- | ------ | ------ |
| to                                | 路由跳转对象，同 `vue-router` 的 `to` | string/object | —      | —      |
| max-width <Badge text="2.0.33+"/> | 最大宽度                              | string        | -      |
