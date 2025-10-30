# SearchPagination 搜索分页

## 安装

```bash
$ npm i @hui-pro/search-pagination -D
# 或者
$ yarn add @hui-pro/search-pagination --dev
```

## 引入

```js
import SearchPagination from '@hui-pro/search-pagination';
Vue.use(SearchPagination);
```

## 基础用法

<template>
  <code-box title="基础用法" description="简洁模式">
    <h-search-pagination :total="200" />
  </code-box>
</template>

```html
<h-search-pagination :total="200" />
```

## 完整示例

<template>
  <code-box title="基础用法" description="基础用法">
    <div>
      <h-search-pagination
        :total="2000"
        :current-page="1"
        :page-size="10"
        :page-sizes="[10, 20, 30, 50, 100]"
        layout="total, sizes, ->, prev, search, next"
      />
    </div>
  </code-box>
</template>

```html
<h-search-pagination
  :total="2000"
  :current-page="1"
  :page-size="10"
  :page-sizes="[10, 20, 30, 50, 100]"
  layout="total, sizes, ->, prev, search, next"
/>
```

<script>
  const versions = require('docs/.vuepress/src/version.json');
  export default {
    data() {
      return {
        versions
      }
    },
    methods:{}
  }
</script>

## API

### Attributes

| 参数         | 说明                                     | 类型          | 可选值                                           | 默认值               |
| ------------ | ---------------------------------------- | ------------- | ------------------------------------------------ | -------------------- |
| current-page | 当前页数，支持 .sync 修饰符              | Number        | —                                                | 1                    |
| page-size    | 每页显示条目个数，支持 .sync 修饰符      | Number        | —                                                | 10                   |
| total        | 总条目数                                 | Number        | —                                                | 0                    |
| pager-count  | 页码按钮的数量，当总页数超过该值时会折叠 | Number        | 大于等于 5 且小于等于 21 的奇数                  | 7                    |
| layout       | 组件布局，子组件名用逗号分隔             | String        | `total`, `sizes`, `prev`, `search`, `next`, `->` | 'prev, search, next' |
| page-sizes   | 每页显示个数选择器的选项设置             | Array[Number] | —                                                | [10, 20, 30, 40, 50] |
| disabled     | 是否禁用                                 | boolean       | —                                                | false                |
| small        | 是否使用小型分页样式                     | Boolean       | —                                                | false                |

### Events

| 参数           | 说明                     | 回调参数                                          |
| -------------- | ------------------------ | ------------------------------------------------- |
| size-change    | pageSize 改变时会触发    | 每页条数`size`，改变前每页条数`oldSize`           |
| current-change | currentPage 改变时会触发 | 当前页`currentPage`，改变前的页数`oldCurrentPage` |
