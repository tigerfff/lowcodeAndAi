# Alert 警告

用于页面中展示重要的提示信息。

## 全局/局部提示

<template>
  <code-box title="全局/局部提示" description="可关闭和不可关闭的提示">
    <el-alert title="成功提示的文案" type="success" simple show-icon></el-alert>
    <el-alert title="消息提示的文案" type="info" simple show-icon></el-alert>
    <el-alert title="警告提示的文案" type="warning" simple show-icon :closable="false"></el-alert>
    <el-alert title="错误提示的文案" type="error" simple show-icon :closable="false"></el-alert>
  </code-box>
</template>

``` html
  <el-alert title="成功提示的文案" type="success" simple show-icon></el-alert>
  <el-alert title="消息提示的文案" type="info" simple show-icon></el-alert>
  <el-alert title="警告提示的文案" type="warning" simple show-icon :closable="false"></el-alert>
  <el-alert title="错误提示的文案" type="error" simple show-icon :closable="false"></el-alert>
```

## 全站提示

<template>
  <code-box title="全站提示" description="使用 `center` 属性让文字水平居中。">
    <el-alert title="成功提示的文案" type="success" center :closable="false"></el-alert>
    <el-alert title="消息提示的文案" type="info" center :closable="false"></el-alert>
    <el-alert title="警告提示的文案" type="warning" center :closable="false"></el-alert>
    <el-alert title="错误提示的文案" type="error" center :closable="false"></el-alert>
  </code-box>
</template>

``` html
  <el-alert title="成功提示的文案" type="success" center :closable="false"></el-alert>
  <el-alert title="消息提示的文案" type="info" center :closable="false"></el-alert>
  <el-alert title="警告提示的文案" type="warning" center :closable="false"></el-alert>
  <el-alert title="错误提示的文案" type="error" center :closable="false"></el-alert>
```

## 自定义标题

<template>
  <code-box title="自定义标题" description="使用 `slot` 插入自定义的标题。">
    <el-alert type="error" center :closable="false">
      <span slot="title">
        系统部分授权将于2019-03-26 23:59:59过期，请联系管理员，详情请查看<a href="#" class="link">运行管理中心系统</a>
      </span>
    </el-alert>
  </code-box>
</template>

``` html
  <el-alert type="error" center :closable="false">
    <span slot="title" simple>系统部分授权将于2019-03-26 23:59:59过期，请联系管理员，详情请查看<a href="#" class="link">运行管理中心</a>。</span>
  </el-alert>
```

<style lang="scss">
.demo-alert {
  .el-alert {
    margin: 20px 0 0;
    &:first-child {
      margin: 0;
    }
    .link{
      color: #fff;
      text-decoration: underline !important;
      margin: 0 5px;
      &:hover{
         font-weight:bold;
      }
    }
  }
}
</style>

<script>
  export default {
    methods: {
      hello() {
        alert('Hello World!');
      }
    }
  }
</script>

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 标题 | string | — | — |
| type | 主题 | string | success/warning/info/error | info |
| description | 辅助性文字。也可通过默认 slot 传入 | string | — | — |
| simple | 是否启用简单模式 | boolean | — | false |
| closable | 是否可关闭 | boolean | — | true |
| center <Badge text="2.0+"/> | 是否居中显示文本 | boolean | — | false |
| close-text | 关闭按钮自定义文本 | string | — | — |
| close-icon | 自定义关闭按钮图标 | String | — | — |
| show-icon | 是否显示图标 | boolean | — | false |
| icon | 自定义图标 | String | — | — |

### Slot

| Name | Description |
|------|--------|
| title <Badge text="2.0+"/> | 标题的内容 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭alert时触发的事件 | — |
