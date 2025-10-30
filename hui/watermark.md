# Watermark 水印

## 安装

```bash
$ npm i @hui-pro/watermark -D
# 或者
$ yarn add @hui-pro/watermark --dev
```

## 引入

```js
import Watermark from '@hui-pro/watermark';
import '@hui-pro/watermark/theme/index.scss';
Vue.use(Watermark);
```

## 基础用法

<template>
  <code-box title="基础用法">
    <h-watermark class="watermark-wrapper">
      <img src="/hui-pro/images/home-image-blue.png" alt="" />
      <template #chunk>
        <div>
          <div>用户名：测试水印</div>
          <div>时间：2019-10-18 10:26:00</div>
          <div>ip地址：127.0.0.1</div>
        </div>
      </template>
    </h-watermark>
  </code-box>
</template>

```html
<h-watermark class="watermark-wrapper">
  <img src="/hui-pro/images/home-image-blue.png" alt="" />
  <template #chunk>
    <div>
      <div>用户名：测试水印</div>
      <div>时间：2019-10-18 10:26:00</div>
      <div>ip地址：127.0.0.1</div>
    </div>
  </template>
</h-watermark>

<style lang="scss" scoped>
  .watermark-wrapper {
    height: 600px;
  }
</style>
```

## 图片水印&自定义样式

<template>
  <code-box title="基础用法">
    <h-watermark ref='test' class="watermark-wrapper" theme="custom">
      <img src="/hui-pro/images/home-image-blue.png" alt="" />
      <template #chunk>
        <div class="watermark-chunk">
          <img :src="logo" alt="" />
        </div>
      </template>
    </h-watermark>
  </code-box>
</template>

```html
<h-watermark class="watermark-wrapper">
  <img src="/hui-pro/images/home-image-blue.png" alt="" />
  <template #chunk>
    <div class="watermark-chunk">
      <img :src="logo" alt="" />
    </div>
  </template>
</h-watermark>

<style lang="scss" scoped>
  .watermark-wrapper {
    height: 600px;
  }
  .watermark-chunk {
    display: flex;
    width: 300px;
    height: 300px;
    align-items: center;
    justify-content: center;
    transform: rotate(-25deg);
  }
</style>

<script>
  import logo from './assets/img/hik-logo.png';
  export default {
    data() {
      return {
        logo
      };
    }
  };
</script>
```

<style lang='scss' scoped>
.watermark-wrapper {
  height: 600px;
}
.watermark-chunk {
  display:flex;
  width:300px;
  height:300px;
  align-items: center;
  justify-content: center;
  transform: rotate(-25deg);
}
</style>

<script>
  import versions from 'docs/.vuepress/src/version.json';
  import logo from './assets/img/hik-logo.png';
  export default {
    data() {
      return {
        versions,
        logo
      }
    }
  }
</script>

## API

::: warning
1.18.0+ 移除 size 属性
:::

### Attributes

| 参数                           | 说明                                                           | 类型   | 可选值            | 默认值  |
| ------------------------------ | -------------------------------------------------------------- | ------ | ----------------- | ------- |
| theme <Badge text="1.18.1+" /> | 水印样式，自定义样式设置`custom`后直接编写`chunk` CSS 样式即可 | String | 'light', 'custom' | default |

### Ref Event

| 事件名   | 说明     | 参数 |
| -------- | -------- | ---- |
| \$update | 刷新水印 | -    |

### Slots

| 插槽名称 | 说明           |
| -------- | -------------- |
| chunk    | 自定义水印内容 |

:::tip

- 自定义图片不支持跨域
- 默认样式

```css
.h-watermark__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.12);
  transform: rotate(-25deg);
}
```

- 水印默认是没有 z-index，若想实现水印部分遮挡，内容增加 z-index 即可。

:::
