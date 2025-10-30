# Breakpoint 断点

## 安装

```bash
$ npm i @hui-pro/breakpoint -D
# 或者
$ yarn add @hui-pro/breakpoint --dev
```

## 引入

```js
import Breakpoint from '@hui-pro/breakpoint';
import '@hui-pro/breakpoint/theme/index.scss';
Vue.use(Breakpoint);
```

## 基础用法

<template>
  <code-box title="基础用法" description="监听区域大小变化，返回对应断点">
    <h-breakpoint ref="breakpoint" class="h-demo-breakpoint" @on-change="handelChange">
      view
    </h-breakpoint>
  </code-box>
</template>

```html
<h-breakpoint @on-change="handelChange">
  view
</h-breakpoint>

<script>
  import Breakpoint from '@hui-pro/breakpoint';
  Vue.use(function(Vue) {
    Vue.use(Breakpoint);
  });
  export default {
    data() {
      return {
        size: 'md'
      };
    },
    methods: {
      handelChange(val) {
        this.size = val;
      }
    }
  };
</script>
```

<style lang="scss" scoped>
  .h-demo-breakpoint {
    height: 20px;
  }
</style>

<script>
  const versions = require('docs/.vuepress/src/version.json');
  export default {
    data() {
      return {
        versions,
        size: 'md'
      };
    },
    methods: {
      handelChange(val) {
        this.size = val;
      }
    }
  };
</script>

## API

### Attributes

| 参数       | 说明     | 类型   | 可选值   | 默认值   |
| ---------- | -------- | ------ | -------- | -------- |
| breakpoint | 断点     | Object | 详见下表 | 详见下表 |
| throttle   | 节流间隔 | Number | -        | 160      |

:::tip

- 数值代表 `>=` 的关系
- 目前共 6 个断点 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'
- 小于 `xs` 为 `xxs`。
- 一维为宽度断点。
- 支持断层，即某一断点不设置。

例：

- width: 480px => xs
- width: 300px => xxs
- width: 992px => lg
- width: 1920px => xxl

:::

### 一维

```js
const breakpoint = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600
};
```

### 二维

> 参考 [empty](/zh/widget/other/empty.html#fit-模式适配规则)

```js
const breakpoint = {
  xs: {
    width: 180,
    height: 180
  },
  sm: {
    width: 240,
    height: 240
  },
  md: {
    width: 256,
    height: 400
  },
  lg: {
    width: 1080,
    height: 400
  },
  xl: {
    width: 1920,
    height: 554
  }
};
```

### Event

| 事件名    | 说明                       | 值     |
| --------- | -------------------------- | ------ |
| on-change | 断点变化触发（初始化触发） | 断点值 |

### Ref Event

| 事件名    | 说明     | 参数 |
| --------- | -------- | ---- |
| \$getSize | 获取断点 | -    |
