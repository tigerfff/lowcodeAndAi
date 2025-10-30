# TargetImgUpload 上传目标图片

## 安装

```bash
$ npm i @hui-pro/target-img-upload -D
# 或者
yarn add @hui-pro/target-img-upload --dev
```

## 引入

```js
import Vue from 'vue';
import TargetImgUpload from '@hui-pro/target-img-upload';
import '@hui-pro/target-img-upload/theme/index.scss';
Vue.use(TargetImgUpload);
```

<!-- /isearch-web/image/uploadImage.do -->
<!-- /isearch-web/image/findTargetFromPicture.do -->

## 基础用法

<template>
  <code-box title="上传目标图片" description="通过事件触发上传图片功能，上传完自动扫描目标结果">
    <h-target-img-upload
      class="h-demo-tiu-wrapper"
      upload-api="http://supernova.hikvision.com.cn:4000/mock/309/imgUpload"
      :scan="scan"
      :dataProps="dataProps"
      @on-confirm="onConfirm"
      @on-error="onError"
    >
      <h-img-snippets-upload-btn text="自动扫描" />
    </h-target-img-upload>
    <h-target-img-upload
      class="h-demo-tiu-wrapper"
      upload-api="http://supernova.hikvision.com.cn:4000/mock/309/imgUpload"
      :scan="scanManual"
      :dataProps="dataProps"
      @on-confirm="onConfirm"
    >
      <h-img-snippets-upload-btn text="手动框选" />
    </h-target-img-upload>
  </code-box>
</template>

```html
<template>
  <h-target-img-upload
    upload-api="http://supernova.hikvision.com.cn:4000/mock/309/imgUpload"
    :scan="scan"
    :dataProps="dataProps"
    :types="[
      'face',
      {
        type: 'sideFace',
        tag: true
      },
      'body',
      {
        type: 'back',
        tag: true
      },
      'vehicle'
    ]"
    @on-confirm="onConfirm"
    @on-error="onError"
  >
    <h-img-snippets-upload-btn text="上传" />
  </h-target-img-upload>
</template>

<script>
  import TargetImgUpload from '@hui-pro/target-img-upload';
  export default {
    methods: {
      onConfirm(data) {
        console.log(data);
      },
      onError(err) {
        console.log(err);
      },
      scan({ url, imgSize }) {
        return new Promise((resolve, reject) => {
          axios
            .post('/XXX/XXX.do', {
              url: url
            })
            .then(res => {
              resolve(res.data.data);
            })
            .catch(err => {
              reject(err);
            });
        });
      }
    },
    data() {
      return {
        data: [
          {
            url: '/hui-pro/images/home-image-blue.png',
            rectData: {
              face: null,
              human: [
                {
                  rect: {
                    height: 0.068333,
                    width: 0.026042,
                    x: 0.177083,
                    y: 0.145
                  }
                }
              ]
            }
          }
        ],
        dataProps: {
          face: {
            rect: {
              key: 'recommendFaceRect'
            }
          },
          body: {
            key: 'human'
          }
        },
        limitData: {
          total: 5
        }
      };
    }
  };
</script>
```

## 带回传数据

<template>
  <code-box title="上传目标图片" description="通回传数据显示历史图片列表，切换选择目标">
    <h-target-img-upload
      class="h-demo-tiu-wrapper"
      upload-api="http://supernova.hikvision.com.cn:4000/mock/309/imgUpload"
      :scan="scan"
      :data="data"
      :dataProps="dataProps"
      @on-confirm="onConfirm"
    >
      <h-img-snippets-upload-btn text="上传" />
    </h-target-img-upload>
  </code-box>
</template>

```js
// 参考基础用法，confirm返回数据直接回传即可

data: [
  {
    url: '/hui-pro/images/upload-img-2.jpg',
    rectData: scanData
  }
];
```

## 手动查询

<template>
  <code-box title="手动查询" description="通过一张图片，跳过上传步骤进行扫描">
    <el-button type="default" @click="upload">
      目标查询
    </el-button>
  </code-box>
</template>

```html
<el-button type="default" @click="upload">
  目标查询
</el-button>
<script>
  const versions = require('docs/.vuepress/src/version.json');
  export default {
    methods: {
      upload() {
        const instance = TargetImgUpload.create({
          scan: this.scan,
          dataProps: this.dataProps,
          slots: {
            confirmText: '查询'
          }
        });
        instance.$scan('/hui-pro/images/upload-img.jpg');
        instance.$on('on-confirm', this.onConfirm);
      },
      onConfirm(data) {
        console.log(data);
      },
      scan({ url, imgSize }) {
        return new Promise((resolve, reject) => {
          axios
            .post('/XXX/XXX.do', {
              url: url
            })
            .then(res => {
              resolve(res.data.data);
            })
            .catch(err => {
              reject(err);
            });
        });
      }
    },
    data() {
      return {
        versions,
        dataProps: {
          face: {
            rect: {
              key: 'recommendFaceRect'
            }
          },
          body: {
            key: 'human'
          }
        }
      };
    }
  };
</script>
```

<script>
  const versions = require('docs/.vuepress/src/version.json');
  import TargetImgUpload from '@hui-pro/target-img-upload';
  import axios from 'axios';
  import scanData from './data/target-img-upload/scan-data.js';
  export default {
    methods: {
      upload() {
        const instance = TargetImgUpload.create({
          scan: this.scan,
          data: this.data,
          dataProps: this.dataProps,
          slots: {
            confirmText: '查询'
          }
        });
        instance.$scan('/hui-pro/images/upload-img.jpg');
        instance.$on('on-confirm',(data)=>{
          // console.log(data)
        });
      },
      onConfirm(data) {
        // console.log(data);
      },
      onError(err) {
        console.dir(err);
      },
      scan({ url, imgSize }) {
        return new Promise((resolve, reject) => {
          axios
            .post(
              'http://supernova.hikvision.com.cn:4000/mock/309/findTargetFromPicture',
              {
                url: url
              }
            )
            .then(res => {
              resolve(res.data.data);
            })
            .catch(err => {
              reject(err);
            });
        });
      },
      scanManual({ url, imgSize }) {
        return new Promise((resolve, reject) => {
          axios
            .post(
              'http://supernova.hikvision.com.cn:4000/mock/309/findTargetFromPicture',
              {
                url: url,
                test: 1
              }
            )
            .then(res => {
              resolve(res.data.data);
            })
            .catch(err => {
              reject(err);
            });
        });
      }
    },
    data() {
      return {
        versions,
        data: [
          {
            url: '/hui-pro/images/upload-img-2.jpg',
            rectData: scanData
          }
        ],
        dataProps: {
          face: {
            rect: {
              key: 'recommendFaceRect'
            }
          },
          body: {
            key: 'human'
          }
        },
        limitData: {
          total: 5
        }
      };
    }
  };
</script>

<style lang="scss" scoped>
  .h-demo-block-line {
    height: 104px;
  }
  .h-demo-tiu-wrapper {
    display: inline-block;
    margin-right: 8px;
  }
</style>

## API

### Attributes

| 参数               | 说明                                                                      | 类型     | 可选值                    | 默认值                      |
| ------------------ | ------------------------------------------------------------------------- | -------- | ------------------------- | --------------------------- |
| **upload-api**     | 上传图片接口                                                              | String   | -                         | '/'                         |
| **scan**           | 扫描目标函数，返回 Promise                                                | Function | -                         | -                           |
| upload-data        | 上传图片接口参数                                                          | Object   | -                         | -                           |
| upload-headers     | 上传图片接口 headers                                                      | Object   | -                         | -                           |
| data-props         | 数据 key 值别名                                                           | Object   | -                         | 对应 data key 名            |
| limit-data         | 控件限制条件                                                              | Object   | -                         | -                           |
| types              | 类型                                                                      | Array    | 'face', 'body', 'vehicle' | ['face', 'body', 'vehicle'] |
| data               | 上传图片回传数据                                                          | Array    | -                         | []                          |
| uploadApiFormatter | 格式化上传图片接口返回值                                                  | Function | -                         | () => res.data              |
| beforeConfirm      | confirm 前触发前钩子，返回 Promise，resolve 关闭弹窗，reject 保持弹窗状态 | Function | -                         | -                           |

### data Attributes

| 参数         | 说明                       | 类型   | 可选值 | 默认值 |
| ------------ | -------------------------- | ------ | ------ | ------ |
| **url**      | 图片底图 url               | String | -      | -      |
| **rectData** | 框选数据，参考 `dataProps` | Object | -      | -      |

### types Attributes <Badge text="1.20.0+" />

::: tip

types 项支持`string`,`object` 类型，`object` 参数如下：

:::

| 参数     | 说明              | 类型    | 可选值                                        | 默认值 |
| -------- | ----------------- | ------- | --------------------------------------------- | ------ |
| **type** | 图片类型          | String  | 'face', 'body', 'vehicle', 'sideFace', 'back' | -      |
| tag      | 是否显示 new 标签 | Boolean | -                                             | false  |

::: tip

rectData 中 \$\$isManual 代表是否为手动框选，\$\$active 代表当前框是否激活状态

:::

### dataProps

<template>
  <code-box title="数据自定义key" description="由于数据比较复杂，采用js文档形式">
      数据共分为三种类型，face: 人脸、body: 人体、vehicle: 车辆。<br />
      每种类型含有一个 rect 矩形框，由width: 宽、height: 高、left: 水平位置、top: 垂直位置决定其位置。<br />
  </code-box>
</template>

```js
{
  face: {
    key: 'face',
    rect: {
      key: 'rect',
      height: 'height',
      width: 'width',
      left: 'x',
      top: 'y'
    }
  },
  body: {
    key: 'body',
    rect: {
      key: 'rect',
      height: 'height',
      width: 'width',
      left: 'x',
      top: 'y'
    }
  },
  vehicle: {
    key: 'vehicle',
    rect: {
      key: 'rect',
      height: 'height',
      width: 'width',
      left: 'x',
      top: 'y'
    },
    plateRect: {
      key: 'plateRect',
      height: 'height',
      width: 'width',
      left: 'x',
      top: 'y'
    },
    plateNum: {
      key: 'plateNum'
    },
    plateType: {
      key: 'plateType'
    },
    plateColor: {
      key: 'plateColor'
    }
  }
};
```

### limitProps

| 参数            | 说明                       | 类型   | 可选值                      | 默认值                        |
| --------------- | -------------------------- | ------ | --------------------------- | ----------------------------- |
| img             | 限制上传图片规格，同步校验 | Object | -                           | -                             |
| img.types       | 图片类型                   | Array  | "jpg", "jpeg", "png", "bmp" | ["jpg", "jpeg", "png", "bmp"] |
| img.minSize     | 图片最小尺寸，单位 px      | Object | -                           | 48 \* 48                      |
| img.maxSize     | 图片最大尺寸，单位 px      | Object | -                           | 4000 \* 4000                  |
| img.minFileSize | 文件空间最小值，单位 b     | Number | -                           | 128                           |
| img.maxFileSize | 文件空间最大值，单位 b     | Number | -                           | 8388608                       |
| total           | 上传目标最大数             | Number | -                           | 5                             |

<template>
  <code-box title="限制数据条件" description="由于数据比较复杂，采用js文档形式">
      限制图片尺寸，文件大小，文件类型，以及目标上限等条件。
  </code-box>
</template>

```js
{
  img: {
    types: ['jpg', 'jpeg', 'png', 'bmp'],
    minSize: {
      width: 48,
      height: 48
    },
    maxSize: {
      width: 4000,
      height: 4000
    },
    minFileSize: 128, // b
    maxFileSize: 8388608 // 8M
  },
  total: 5
}
```

### Event

| 事件名     | 说明                       | 值             |
| ---------- | -------------------------- | -------------- |
| on-confirm | 确认回调，返回选取数据数组 | 参考 data 格式 |
| on-success | 图片加载成功回调           | res, file      |
| on-error   | 图片加载失败回调           | err            |

### Slots

| 插槽名称    | 说明           |
| ----------- | -------------- |
| default     | 上传按钮       |
| confirmText | 自定义确认按钮 |
| cancelText  | 自定义取消按钮 |
