# Ellipsis 文本自动省略号

<template>
  <author-info
    :version="versions['ellipsis']"
    author="陈冠彬"
  />
</template>

## 安装

```bash
$ npm i @hui-pro/ellipsis -D
# 或者
$ yarn add @hui-pro/ellipsis --dev
```

## 引入

```js
import ellipsis from '@hui-pro/ellipsis';
import '@hui-pro/ellipsis/theme/index.scss';
Vue.use(ellipsis);
```

## 指令形式

<template>
  <code-box title="指令形式" description="不会改变原有的 HTML 结构，可以使用修饰符 block、nonFull">
    <span v-ellipsis>There were injuries alleged in three cases in 2015, and a fourth incident in September, according to the safety recall report. After meeting with US regulators in October, the firm decided to issue a voluntary recall.</span>
  </code-box>
</template>

```html
<span v-ellipsis>
  There were injuries alleged in three cases in 2015, and a fourth incident in
  September, according to the safety recall report. After meeting with US
  regulators in October, the firm decided to issue a voluntary recall.
</span>
```

## 控件形式

<template>
  <code-box title="控件形式" description="会改变原有的 HTML 结构，可以使用全部属性">
    <h-ellipsis>There were injuries alleged in three cases in 2015, and a fourth incident in September, according to the safety recall report. After meeting with US regulators in October, the firm decided to issue a voluntary recall.</h-ellipsis>
  </code-box>
</template>

```html
<h-ellipsis>
  There were injuries alleged in three cases in 2015, and a fourth incident in
  September, according to the safety recall report. After meeting with US
  regulators in October, the firm decided to issue a voluntary recall.
</h-ellipsis>
```

<script>
  const versions = require('docs/.vuepress/src/version.json');
  export default {
    data() {
      return {
        versions
      }
    }
  }
</script>

## API

### Attributes

| 参数     | 说明                                                                                                      | 类型                | 可选值 | 默认值 |
| -------- | --------------------------------------------------------------------------------------------------------- | ------------------- | ------ | ------ |
| tag      | 文本标签，默认为 div，可以进行替换                                                                        | String              | -      | div    |
| clazz    | 标签的样式类，替代 class（目前无法同时使用 clazz 和 :clazz）                                              | String/Array/Object | -      | -      |
| block    | 设为 true，则文本样式设置为 display: 'block';（同 `v-ellipsis` 指令中的 `block` 修饰符）                  | Boolean             | -      | false  |
| non-full | 设为 true，则文本样式设置为 width: 'auto'; max-width="100%";（同 `v-ellipsis` 指令中的 `nonFull` 修饰符） | Boolean             | -      | false  |
| title    | 文本过长出现省略号时的提示信息                                                                            | String              | -      | -      |
