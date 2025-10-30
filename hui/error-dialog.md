# ErrorDialog 错误码弹窗

## 安装

```bash
$ npm i @hui-pro/error-dialog -D
# 或者
$ yarn add @hui-pro/error-dialog --dev
```

## 引入

```js
import ErrorDialog from '@hui-pro/error-dialog';
import '@hui-pro/error-dialog/theme/index.scss';
Vue.use(ErrorDialog);
```

## 基础用法

<template>
  <code-box title="基础用法">
    <el-button type="primary" @click="basicErrorDialog">错误码弹窗</el-button>
  </code-box>
</template>

```html
<script>
  export default {
    methods: {
      basicErrorDialog() {
        this.$systemError({
          title: '系统错误',
          errorCode: '0x11900001',
          traceCode: '9688cddof74949461b9f96bcd5f562ca3d',
          onClose: () => {
            console.log('onClose');
          }
        });
      }
    }
  };
</script>
```

## 依次弹出错误码弹窗

<template>
  <code-box title="基础用法" description="适用于多个错误依次弹出，后进先出">
    <el-button type="primary" @click="multiErrorDialog">依次弹出</el-button>
  </code-box>
</template>

```html
<script>
  export default {
    methods: {
      multiErrorDialog() {
        this.$systemError.cover = false;
        this.$systemError({
          title: '系统错误',
          errorCode: '0x11900001',
          traceCode: '9688cddof74949461b9f96bcd5f562ca3d'
        });
        this.$systemError({
          title: '系统错误2',
          errorCode: '0x11900001',
          traceCode: '9688cddof74949461b9f96bcd5f562ca3d'
        });
        this.$systemError({
          title: '系统错误3',
          errorCode: '0x11900001',
          traceCode: '9688cddof74949461b9f96bcd5f562ca3d'
        });
      }
    }
  };
</script>
```

<script>
  import versions from 'docs/.vuepress/src/version.json';
  import Vue from 'vue';
  import ErrorDialog from '@hui-pro/error-dialog';
  Vue.use(ErrorDialog);
  export default {
    data() {
      return {
        versions
      }
    },
    methods: {
      basicErrorDialog() {
        this.$systemError({
          title: '系统错误',
          errorCode: '0x11900001',
          traceCode: '9688cddof74949461b9f96bcd5f562ca3d',
          onClose: () => {
            // console.log('onClose')
          }
        });
      },
      multiErrorDialog() {
        this.$systemError.cover = false;
        this.$systemError({
          title: '系统错误',
          errorCode: '0x11900001',
          traceCode: '9688cddof74949461b9f96bcd5f562ca3d'
        });
        this.$systemError({
          title: '系统错误2',
          errorCode: '0x11900001',
          traceCode: '9688cddof74949461b9f96bcd5f562ca3d'
        });
        this.$systemError({
          title: '系统错误3',
          errorCode: '0x11900001',
          traceCode: '9688cddof74949461b9f96bcd5f562ca3d'
        });
      }
    }
  }
</script>

## API

### Attributes

| 参数                              | 说明                  | 类型     | 可选值 | 默认值   |
| --------------------------------- | --------------------- | -------- | ------ | -------- |
| title                             | 错误码标题            | Object   | -      | 系统错误 |
| errorCode                         | 错误码                | String   | -      | 'null'   |
| traceCode                         | 调用链码              | String   | -      | 'null'   |
| onClose <Badge text="1.16.1+" />  | Dialog 关闭的回调     | Function | —      | —        |
| onOpen <Badge text="1.16.1+" />   | Dialog 打开的回调     | Function | —      | —        |
| onClosed <Badge text="1.16.1+" /> | Dialog 完全关闭的回调 | Function | —      | —        |
| onOpened <Badge text="1.16.1+" /> | Dialog 完全打开的回调 | Function | —      | —        |

### Instance Attributes

| 参数  | 说明                                               | 类型    | 可选值 | 默认值 |
| ----- | -------------------------------------------------- | ------- | ------ | ------ |
| cover | 是否为覆盖模式，即后面的错误弹窗覆盖前面的错误弹窗 | Boolean | -      | true   |
