# Drawer 抽屉

## 安装

```bash
$ npm i @hui-pro/drawer -D
# 或者
$ yarn add @hui-pro/drawer --dev
```

## 引入

```js
import Drawer from '@hui-pro/drawer';
import '@hui-pro/drawer/theme/index.scss';
Vue.use(Drawer);
```

## 说明

::: warning 说明
直接使用会使项目在IE浏览器下无法打开，那是因为代码中使用了hui下的部分源码

要解决这个问题，可以在项目的`vue.config.js`中的`transpileDependencies`里加上`hui/src`
:::

## 基础用法

<template>
  <code-box title="基础用法">
    <div class='demo-wrapper'>
      <el-button @click="drawer = true">打开抽屉</el-button>
      <h-drawer
        title="我是标题"
        :visible.sync="drawer"
      ></h-drawer>
    </div>
  </code-box>
</template>

```html
<el-button @click="drawer = true">打开抽屉</el-button>
<h-drawer
  title="我是标题"
  show-close
  :visible.sync="drawer"
></h-drawer>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  }
}
</script>
```

<script>
export default {
  data () {
    return {
      drawer: false
    }
  }
}
</script>

## API

### Attributes

| 参数       | 说明     | 类型   | 可选值   | 默认值   |
| ---------- | -------- | ------ | -------- | -------- |
| append-to-body | Drawer 自身是否插入至 body 元素上。嵌套的 Drawer 必须指定该属性并赋值为 true | boolean | - | false |
| before-close | 关闭前的回调，会暂停 Drawer 的关闭 | function(done)，done 用于关闭 Drawer | - | - |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Drawer | boolean | - | true |
| custom-class | Drawer 的自定义类名 | string | - | - |
| destroy-on-close | 控制是否在关闭 Drawer 之后将子元素全部销毁 | boolean | - | false |
| modal | 是否需要遮罩层 | boolean | - | true |
| modal-append-to-body | 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Drawer 的父元素上 | boolean | - | true |
| direction | Drawer 打开的方向 | Direction | rtl / ltr / ttb / btt | rtl |
| show-close | 是否显示关闭按钮 | boolean | - | true |
| size | Drawer 窗体的大小, 当使用 number 类型时, 以像素为单位, 当使用 string 类型时, 请传入 'x%', 否则便会以 number 类型解释 | number / string | - | '30%' |
| title | Drawer 的标题，也可通过具名 slot （见下表）传入 | string | - | - |
| visible | 是否显示 Drawer，支持 .sync 修饰符 | boolean | - | false |
| wrapperClosable | 点击遮罩层是否可以关闭 Drawer | boolean | - | true |
| withHeader | 控制是否显示 header 栏, 默认为 true, 当此项为 false 时, title attribute 和 title slot 均不生效 | boolean | - | true |

### Slot

| name        | 说明     |
| ----------- | -------- |
| - | Drawer 的内容 |
| title | Drawer 标题区的内容 |

### Methods

| name        | 说明     |
| ----------- | -------- |
| closeDrawer | 用于关闭 Drawer, 该方法会调用传入的 before-close 方法 |


### Event

| 事件名    | 说明                       | 值     |
| ------ | -------------------------- | ------ |
| open | Drawer 打开的回调 | - |
| opened | Drawer 打开动画结束时的回调 | - |
| close | Drawer 关闭的回调 | - |
| closed | Drawer 关闭动画结束时的回调 | - |
