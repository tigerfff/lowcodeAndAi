# ImgCropper 图片裁切

<template>
  <author-info
    :version="versions['img-cropper']"
    author="姜炎6"
    ux="白楠"
    ui="江佳欢"
    standard="http://iris.hikvision.com.cn/BBG_UED/BUI_Design/bscs/v2.0/issues/67"
    reviewed
  />
</template>

## 安装

```bash
$ npm i @hui-pro/img-cropper -D
# 或者
$ yarn add @hui-pro/img-cropper --dev
```

## 引入

```js
import imgCropper from '@hui-pro/img-cropper';
import '@hui-pro/img-cropper/theme/index.scss';
Vue.use(imgCropper);
```

## 基础用法

<template>
  <code-box title="基础用法" description="传入图片地址，可以是url也可以是base64">
    <el-button @click="showImgCropper">开始裁切</el-button>
    <div v-if="previewVisible" class="preview-wrapper">
      <img :src="cropInfo.base64"/>
    </div>
    <h-img-cropper :visible.sync="cropperVisible" 
                   :url="imgUrl" :size="{width: `${corpperWidth}`, height: `${corpperHeight}`}" @crop-complete="cropCompleteHandler"></h-img-cropper>
  </code-box>
</template>

```html
<el-button @click="showImgCropper">开始裁切</el-button>
<div v-if="previewVisible" class="preview-wrapper">
  <img :src="cropInfo.base64"/>
</div>
<h-img-cropper
  :visible.sync="cropperVisible"
  :url="imgUrl"
  :size="{width: `${corpperWidth}`, height: `${corpperHeight}`}"
  @crop-complete="cropCompleteHandler"
></h-img-cropper>
<script>
  export default {
    data() {
      return {
        imgUrl: require('./assets/img/img-carousel/14.jpg'),
        corpperWidth: 300,
        corpperHeight: 300,
        cropperVisible: false,
        previewVisible: false,
        // 如果还需要用到其他属性，那么请在初始化时，先声明，以确保双向绑定效果正常
        cropInfo: {
          base64: ''
        }
      };
    },
    methods: {
      showImgCropper() {
        this.cropperVisible = true;
      },
      cropCompleteHandler(cropInfo) {
        console.log(cropInfo);
        this.cropInfo = cropInfo;
        this.previewVisible = true;
      }
    }
  };
</script>
```

## 手动上传图片剪裁

<template>
  <code-box title="手动上传图片" description="选择一个本地图片，并剪裁">
    <el-upload
      class="upload-demo"
      ref="upload"
      action=""
      :on-change="onChangeHandler"
      :show-file-list="false"
      :auto-upload="false">
      <el-button slot="trigger">选取文件</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div v-if="previewVisible2" class="preview-wrapper">
      <img :src="cropInfo2.base64"/>
    </div>
    <h-img-cropper :visible.sync="cropperVisible2" 
                   :url="imgUrl2" :size="{width: `${corpperWidth}`, height: `${corpperHeight}`}" @crop-complete="cropCompleteHandler2"></h-img-cropper>
  </code-box>
</template>

```html
<el-upload
      class="upload-demo"
      ref="upload"
      action=""
      :on-change="onChangeHandler"
      :show-file-list="false"
      :auto-upload="false">
      <el-button slot="trigger">选取文件</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div v-if="previewVisible" class="preview-wrapper">
      <img :src="cropInfo.base64"/>
    </div>
    <h-img-cropper :visible.sync="cropperVisible" 
                   :url="imgUrl" :size="{width: `${corpperWidth}`, height: `${corpperHeight}`}" @crop-complete="cropCompleteHandler"></h-img-cropper>
<script>
  export default {
    data() {
      return {
        imgUrl: '',
        corpperWidth: 300,
        corpperHeight: 300,
        cropperVisible: false,
        previewVisible: false,
        // 如果还需要用到其他属性，那么请在初始化时，先声明，以确保双向绑定效果正常
        cropInfo: {
          base64: ''
        }
      };
    },
    methods: {
      cropCompleteHandler(cropInfo) {
        this.cropInfo = cropInfo;
        this.previewVisible = true;
      },
      onChangeHandler(file) {
        this.imgUrl = file.url;
        this.cropperVisible = true;
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
        imgUrl: require('./assets/img/img-carousel/14.jpg'),
        imgUrl2: require('./assets/img/img-carousel/14.jpg'),
        corpperWidth: 450,
        corpperHeight: 300,
        cropperVisible: false,
        previewVisible: false,
        cropperVisible2: false,
        previewVisible2: false,
        cropInfo: null,
        cropInfo2: null
      }
    },
    methods: {
      showImgCropper() {
        this.cropperVisible = true
      },
      cropCompleteHandler(cropInfo) {
        console.log(cropInfo)
        this.cropInfo = cropInfo
        this.previewVisible = true
      },
      cropCompleteHandler2(cropInfo) {
        console.log(cropInfo)
        this.cropInfo2 = cropInfo
        this.previewVisible2 = true
      },
      onChangeHandler (file) {
        console.log(file)
        this.imgUrl2 = file.url
        this.cropperVisible2 = true
      }
    }
  }
</script>

## API

### 属性

| 参数            | 说明           | 类型    | 可选值                                     | 默认值                    |
| --------------- | -------------- | ------- | ------------------------------------------ | ------------------------- |
| url             | 传入的图片数据 | String  | url 可以是普通的 url 地址，也可以是 base64 | -                         |
| visible | 控件可见性     | Boolean | 这里可用.sync 实现双向绑定                 | false                     |
| size            | 剪裁区域大小   | Object  | {width, height}                            | {width: 300, height: 300} |

### 事件

| 参数          | 说明                               | 参数类型 | 参数内容   |
| ------------- | ---------------------------------- | -------- | ---------- |
| crop-complete | 确认剪裁事件，会返回当前的剪裁信息 | Object   | 见下方表格 |

### crop-complete 事件参数结构

| key              | 说明                                               | 类型   | 值  |
| ---------------- | -------------------------------------------------- | ------ | --- |
| naturalImgWidth  | 图片的原有宽度                                     | Number | -   |
| naturalImgHeight | 图片的原有高度                                     | Number | -   |
| imgWidth         | 图片的调整后宽度                                   | Number | -   |
| imgHeight        | 图片的调整后高度                                   | Number | -   |
| scale            | 图片调整后相对于原始尺寸的缩放比例                 | Number | -   |
| transform        | 用于展示预览图的 transform 样式，可直接用于 css 中 | String | -   |
| x                | 剪裁起始点 x 轴坐标(左上角为 0,0)                  | Number | -   |
| y                | 剪裁起始点 y 轴坐标(左上角为 0,0)                  | Number | -   |
| cropWidth        | 剪裁框宽度                                         | Number | -   |
| cropHeight       | 剪裁框高度                                         | Number | -   |
| base64           | 剪裁后的base64图片                                  | String | -   |

