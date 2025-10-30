# TimeQuarter 季度选择器

<template>
  <author-info
    :version="versions['time-quarter']"
    author="唐丽萍6"
    ux="苗任越"
    ui="江佳欢"
    standard="http://10.33.43.73/BBG_UED/BUI_Design/bscs/v2.0/issues/52"
    reviewed
  />
</template>

## 安装

```bash
$ npm i @hui-pro/time-quarter -D
# 或者
$ yarn add @hui-pro/time-quarter --dev
```

## 引入

```js
import TimeQuarter from '@hui-pro/time-quarter';
import '@hui-pro/time-quarter/theme/index.scss';
Vue.use(TimeQuarter);
```

## 可传入 date 类型

<template>
  <code-box title="基础用法" description="传入数组区间">
    <h-time-quarter v-model="date"/>
  </code-box>
</template>

```html
<h-time-quarter v-model="date" />

<script>
  export default {
    data() {
      return {
        date: [new Date(), new Date()]
      };
    }
  };
</script>
```

## 可传入字符串类型

<template>
  <code-box title="基础用法" description="传入数组区间">
    <h-time-quarter v-model="date2"/>
  </code-box>
</template>

```html
<h-time-quarter v-model="date" />

<script>
  export default {
    data() {
      return {
        date2: ['2019-04-01', '2019-06-30']
      };
    }
  };
</script>
```

## 可设置置灰

<template>
  <code-box title="基础用法" description="传入disabled-fn函数">
    <h-time-quarter v-model="date3" :disabled-fn="disabledFn"/>
  </code-box>
</template>

```html
<h-time-quarter v-model="date3" :disabled-fn="disabledFn" />

<script>
  export default {
    data() {
      return {
        date3: [new Date(), new Date()]
      };
    },
    methods: {
      disabledFn(time) {
        return time.getTime() > Date.now();
      }
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
        date: [new Date(), new Date],
        date2: ['2019-04-01', '2019-06-30'],
        date3: [new Date(), new Date]
      }
    },
    watch: {
      date (val) {
        console.log('val1', val)
      },
      date2 (val) {
        console.log('val2', val)
      }
    },
    methods: {
      disabledFn (time) {
        console.log(time.getTime() > Date.now())
        return time.getTime() > Date.now()
      }
    }
  }
</script>

## API

### Attributes

| 参数        | 说明     | 类型     | 可选值 | 默认值 |
| ----------- | -------- | -------- | ------ | ------ |
| disabled-fn | 置灰函数 | Function | ---    | ---    |
| custom-class | 下拉框类名| |  | |
