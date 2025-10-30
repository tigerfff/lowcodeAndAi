# Helper 插件助手

## 安装

```bash
$ npm i @hui-pro/helper -D
# 或者
$ yarn add @hui-pro/helper --dev
```

## 引入

```js
import Helper from '@hui-pro/helper';
```

<template>
  <code-box title="基础用法" description="插件助手">
    <el-button type="default" @click="start">
      启动
    </el-button>
  </code-box>
</template>

```html
<template>
  <el-button type="default" @click="start">启动</el-button>
</template>
<script>
  import Helper from '@hui-pro/helper';
  import { Message, MessageBox } from 'hui';
  export default {
    methods: {
      start() {
        const helper = new Helper(); //new Helper({ wsPort:XXX });
        helper
          .startApp('commentcmd')
          .then(res => {
            // 成功
            Message('连接成功');
          })
          .catch(err => {
            // 失败
            MessageBox.confirm('检测到未安装插件助手，请点击下载。', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'question'
            })
              .then(() => {
                Message('前往下载');
              })
              .catch(() => {
                Message('取消下载');
              });
          });
      }
    }
  };
</script>
```

<script>
  const versions = require('docs/.vuepress/src/version.json');
  import Helper from '@hui-pro/helper';
  import { Message, MessageBox } from 'hui';
  export default {
    data() {
      return {
        versions
      }
    },
    methods: {
      start() {
        const helper = new Helper(); //new Helper({ wsPort:XXX });
        helper
          .startApp('commentcmd')
          .then(res => {
            // 成功
            Message('连接成功');
          })
          .catch(err => {
            // 失败
            MessageBox.confirm('检测到未安装插件助手，请点击下载。', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'question'
            })
              .then(() => {
                Message('前往下载');
              })
              .catch(() => {
                Message('取消下载');
              });
          });
      }
    }
  };
</script>

## API

### Attributes

| 参数     | 说明         | 类型   | 可选值 | 默认值 |
| -------- | ------------ | ------ | ------ | ------ |
| ws-port  | ws 连接端口  | Number | -      | 18000  |
| wss-port | wss 连接端口 | Number | -      | 18001  |
