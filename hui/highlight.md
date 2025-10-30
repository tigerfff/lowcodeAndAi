# HighLight 文本高亮

<template>
  <author-info
    :version="versions['highlight']"
    author="范卓华"
  />
</template>

## 安装

```bash
$ npm i @hui-pro/highlight -D
# 或者
$ yarn add @hui-pro/highlight --dev
```

## 引入

```js
import highlight from '@hui-pro/highlight';
import '@hui-pro/highlight/theme/index.scss';
Vue.use(highlight);
```

## 基础用法

<template>
  <code-box title="基础用法" description="通过设置 `highlight-key` 可以为高亮显示指定文本，颜色默认为主题色。 高亮请不要用 - 和 | 字符作为查找">
    <h-highlight :highlight-key="searchText">There were injuries alleged in three cases in 2015, and a fourth incident in September, according to the safety recall report. After meeting with US regulators in October, the firm decided to issue a voluntary recall.</h-highlight>
  </code-box>
</template>

```html
<h-highlight :highlight-key="searchText">
  There were injuries alleged in three cases in 2015, and a fourth incident in
  September, according to the safety recall report. After meeting with US
  regulators in October, the firm decided to issue a voluntary recall.
</h-highlight>

<script>
  export default {
    data() {
      return {
        searchText: 'in'
      };
    }
  };
</script>
```

<script>
  const versions = require('docs/.vuepress/src/version.json');
  export default {
    data() {
      return {
        versions,
        searchText: 'in'
      }
    }
  }
</script>

## API

### Attributes

| 参数          | 说明                   | 类型          | 可选值 | 默认值 |
| ------------- | ---------------------- | ------------- | ------ | ------ |
| highlight-key | 高亮字符               | String/Number | -      | -      |
| color         | 高亮颜色，默认为主题色 | String        | -      | -      |
