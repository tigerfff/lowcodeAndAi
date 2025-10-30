# ImgSnippets 图片工具集

## 安装

```bash
$ npm i @hui-pro/img-snippets -D
# 或者
$ yarn add @hui-pro/img-snippets --dev
```

## 引入

```js
import Vue from 'vue';
import ImgSnippets from '@hui-pro/img-snippets';
import '@hui-pro/img-snippets/theme/index.scss';
Vue.use(ImgSnippets);
```

<h2>
  <a href="#zoom-attributes" aria-hidden="true">缩放控件</a>
</h2>

<template>
  <code-box title="缩放控件" description="用于图片缩放">
    <h-img-snippets-zoom @zoom-out="zoomOut" @zoom-in="zoomIn" :scale="scale" />
    <span>{{ text }}</span>
  </code-box>
</template>

```html
<template>
  <h-img-snippets-zoom @zoomOut="zoom-out" @zoomIn="zoom-in" :scale="scale" />
</template>
<script>
  export default {
    methods: {
      zoomIn() {
        this.text = '放大';
      },
      zoomOut() {
        this.text = '缩小';
      }
    },
    data() {
      return {
        scale: 1,
        text: '放大'
      };
    }
  };
</script>
```

<h2>
  <a href="#rect-attributes" aria-hidden="true">图片矩形框</a>
</h2>

<template>
  <code-box title="缩放控件" description="用于图片缩放">
    <div style="height:30px;position:relative">
      <h-img-snippets-rect
        :rect="{
            width: 0.2,
            height: 1,
            top: 0,
            left: 0
        }"
      />
    </div>
  </code-box>
</template>

```html
<template>
  <div style="height:30px;position:relative">
    <h-img-snippets-rect
      :rect="{
            width: 0.2,
            height: 1,
            top: 0,
            left: 0
        }"
    />
  </div>
</template>
```

<h2>
  <a href="#btngroup-attributes" aria-hidden="true">图片按钮组</a>
</h2>

<template>
  <code-box title="图片按钮组" description="用于图片操作按钮区域布局">
    <div style="height:30px">
      <el-row class="h-demo-block-line" :gutter="16">
        <el-col :span="4">
          <span class="demonstration">light</span>
        </el-col>
        <el-col :span="20">
          <h-img-snippets-btn-group theme="light">
            <el-button icon="h-icon-search">操作一</el-button>
            <el-button icon="h-icon-search">操作二</el-button>
            <el-button icon="h-icon-search">操作三</el-button>
          </h-img-snippets-btn-group>
        </el-col>
      </el-row>
      <el-row class="h-demo-block-line" :gutter="16">
        <el-col :span="4">
          <span class="demonstration">light-gray</span>
        </el-col>
        <el-col :span="20">
          <h-img-snippets-btn-group theme="light-gray">
            <el-button icon="h-icon-search">操作一</el-button>
            <el-button icon="h-icon-search">操作二</el-button>
            <el-button icon="h-icon-search">操作三</el-button>
          </h-img-snippets-btn-group>
        </el-col>
      </el-row>
      <el-row class="h-demo-block-line" :gutter="16">
        <el-col :span="4">
          <span class="demonstration">transparent</span>
        </el-col>
        <el-col :span="20" style="background-color:#262626">
          <h-img-snippets-btn-group theme="transparent">
            <el-button icon="h-icon-search">操作一</el-button>
            <el-button icon="h-icon-search">操作二</el-button>
            <el-button icon="h-icon-search">操作三</el-button>
          </h-img-snippets-btn-group>
        </el-col>
      </el-row>
    </div>
  </code-box>
</template>

```html
<template>
  <div style="height:30px">
    <el-row class="h-demo-block-line" :gutter="16">
      <el-col :span="4">
        <span class="demonstration">light</span>
      </el-col>
      <el-col :span="20">
        <h-img-snippets-btn-group theme="light">
          <el-button icon="h-icon-search">操作一</el-button>
          <el-button icon="h-icon-search">操作二</el-button>
          <el-button icon="h-icon-search">操作三</el-button>
        </h-img-snippets-btn-group>
      </el-col>
    </el-row>
    <el-row class="h-demo-block-line" :gutter="16">
      <el-col :span="4">
        <span class="demonstration">light-gray</span>
      </el-col>
      <el-col :span="20">
        <h-img-snippets-btn-group theme="light-gray">
          <el-button icon="h-icon-search">操作一</el-button>
          <el-button icon="h-icon-search">操作二</el-button>
          <el-button icon="h-icon-search">操作三</el-button>
        </h-img-snippets-btn-group>
      </el-col>
    </el-row>
    <el-row class="h-demo-block-line" :gutter="16">
      <el-col :span="4">
        <span class="demonstration">transparent</span>
      </el-col>
      <el-col :span="20" style="background-color:#262626">
        <h-img-snippets-btn-group theme="transparent">
          <el-button icon="h-icon-search">操作一</el-button>
          <el-button icon="h-icon-search">操作二</el-button>
          <el-button icon="h-icon-search">操作三</el-button>
        </h-img-snippets-btn-group>
      </el-col>
    </el-row>
  </div>
</template>
```

<h2>
  <a href="#uploadbtn-attributes" aria-hidden="true">图片上传按钮</a>
</h2>

<template>
  <code-box title="图片按钮组" description="用于图片操作按钮区域布局">
    <el-row :gutter="16">
      <el-col :span="4">
        <h-img-snippets-upload-btn />
      </el-col>
      <el-col :span="4">
        <h-img-snippets-upload-btn @reset="handleReset" @delete="handleDelete">
          <h-img-snippets-thumbnail
            v-if="showThumbnail"
            imgUrl="/hui-pro/images/home-image-blue.png"
            :rect="{
              width: 0.5,
              height: 0.5,
              top: 0.2,
              left: 0.2
            }"
            bg="gray"
          />
          <h-empty size="xs" v-else>
            <template #img>
              <h-empty-default-image />
            </template>
          </h-empty>
        </h-img-snippets-upload-btn>
      </el-col>
      <el-col :span="4">
        <h-img-snippets-upload-btn>
          <h-img-snippets-thumbnail
            imgUrl="/hui-pro/images/home-image-blue.png"
            :rect="{
              width: 0.5,
              height: 0.5,
              top: 0.2,
              left: 0.2
            }"
            bg="gray"
          />
          <template #btnGroup>
            <i class="h-icon-add" />
            <i class="h-icon-delete" />
          </template>
        </h-img-snippets-upload-btn>
      </el-col>
    </el-row>
  </code-box>
</template>

```html
<template>
  <el-row :gutter="16">
    <el-col :span="4">
      <h-img-snippets-upload-btn />
    </el-col>
    <el-col :span="4">
      <h-img-snippets-upload-btn @reset="handleReset" @delete="handleDelete">
        <h-img-snippets-thumbnail
          v-if="showThumbnail"
          imgUrl="/hui-pro/images/home-image-blue.png"
          :rect="{
              width: 0.5,
              height: 0.5,
              top: 0.2,
              left: 0.2
            }"
          bg="gray"
        />
        <h-empty size="xs" v-else>
          <template #img>
            <h-empty-default-image />
          </template>
        </h-empty>
      </h-img-snippets-upload-btn>
    </el-col>
    <el-col :span="4">
      <h-img-snippets-upload-btn>
        <h-img-snippets-thumbnail
          imgUrl="/hui-pro/images/home-image-blue.png"
          :rect="{
              width: 0.5,
              height: 0.5,
              top: 0.2,
              left: 0.2
            }"
          bg="gray"
        />
        <template #btnGroup>
          <i class="h-icon-add" />
          <i class="h-icon-delete" />
        </template>
      </h-img-snippets-upload-btn>
    </el-col>
  </el-row>
</template>
```

<h2>
  <a href="#thumbnail-attributes" aria-hidden="true">缩略图裁剪</a>
</h2>

<template>
  <code-box
    title="缩略图裁剪"
    description="用于根据矩形框位置显示缩略小图（抠图）"
  >
    <el-row :gutter="16">
      <el-col :span="4">
        <h-img-snippets-thumbnail
          class="h-demo-thumbnail"
          imgUrl="/hui-pro/images/home-image-blue.png"
          mode="contain"
          :rect="{
            width: 0.4,
            height: 0.6,
            top: 0.2,
            left: 0.2
          }"
        />
      </el-col>
      <el-col :span="4">
        <h-img-snippets-thumbnail
          class="h-demo-thumbnail"
          imgUrl="https://www.baidu.com/img/bd_logo1.png"
          :rect="{
            width: 0.5,
            height: 1,
            top: 0.2,
            left: 0.2
          }"
          original
        />
      </el-col>
    </el-row>
  </code-box>
</template>

```html
<template>
  <el-row :gutter="16">
    <el-col :span="4">
      <h-img-snippets-thumbnail
        class="h-demo-thumbnail"
        imgUrl="/hui-pro/images/home-image-blue.png"
        mode="contain"
        :rect="{
            width: 0.4,
            height: 0.6,
            top: 0.2,
            left: 0.2
          }"
      />
    </el-col>
    <el-col :span="4">
      <h-img-snippets-thumbnail
        class="h-demo-thumbnail"
        imgUrl="https://www.baidu.com/img/bd_logo1.png"
        :rect="{
            width: 0.5,
            height: 1,
            top: 0.2,
            left: 0.2
          }"
        original
      />
    </el-col>
  </el-row>
</template>
```

<script>
  const versions = require('docs/.vuepress/src/version.json');

  export default {
    methods: {
      zoomIn(type) {
        this.text = '放大';
      },
      zoomOut(type) {
        this.text = '缩小';
      },
      handleReset() {
        this.showThumbnail = true;
      },
      handleDelete() {
        this.showThumbnail = false;
      }
    },
    data() {
      return {
        versions,
        scale: 1,
        text: '放大',
        showThumbnail: true
      };
    }
  };
</script>

<style lang="scss" scoped>
  .h-demo-block-line {
    height: 104px;
  }
  .h-demo-thumbnail {
    width: 120px;
    height: 120px;
  }
</style>

## API

::: tip
Thumbnail 继承 ImgView，支持 ImgView 所有属性（original 模式除外）
:::

### Zoom Attributes

| 参数      | 说明         | 类型   | 默认值 | 可选值 |
| --------- | ------------ | ------ | ------ | ------ |
| **scale** | 缩放比例 0-1 | Number | 1      | -      |

### Zoom Event

| 事件名   | 说明     | 值  |
| -------- | -------- | --- |
| zoom-out | 缩小回调 | -   |
| zoom-in  | 放大回调 | -   |

### Rect Attributes

| 参数       | 说明                             | 类型   | 默认值           | 可选值 |
| ---------- | -------------------------------- | ------ | ---------------- | ------ |
| **rect**   | 矩形数据,`width,height,left,top` | Object | -                | -      |
| rect-props | 数据 key 值别名                  | Object | 对应 rect key 名 | -      |
| limit-data | 限定数据                         | Object | -                | -      |

### Rect limitData Attributes

| 参数             | 说明                              | 类型   | 默认值 | 可选值 |
| ---------------- | --------------------------------- | ------ | ------ | ------ |
| hide-slot-width  | slot 内容显示最小尺寸，即小于隐藏 | Number | 24     | -      |
| hide-slot-height | slot 内容显示最小尺寸，即小于隐藏 | Number | 24     | -      |

### Rect rect

| 参数   | 说明         | 类型   | 默认值 | 可选值 |
| ------ | ------------ | ------ | ------ | ------ |
| width  | 矩形宽       | Number | 0      | -      |
| height | 矩形高       | Number | 0      | -      |
| top    | 矩形顶部距离 | Number | 0      | -      |
| left   | 矩形左侧距离 | Number | 0      | -      |

### BtnGroup Attributes

| 参数  | 说明 | 类型         | 默认值 | 可选值                               |
| ----- | ---- | ------------ | ------ | ------------------------------------ |
| theme | 主题 | Fixed:String | -      | 'light', 'light-gray', 'transparent' |

### UploadBtn Attributes

| 参数   | 说明     | 类型   | 默认值 | 可选值 |
| ------ | -------- | ------ | ------ | ------ |
| text   | 按钮文本 | String | '上传' | -      |
| width  | 宽度     | Number | 104    | -      |
| height | 高度     | Number | 104    | -      |

### UploadBtn Slots

| 插槽名称                         | 说明                                                       |
| -------------------------------- | ---------------------------------------------------------- |
| defaule                          | 有插槽为显示插槽内容及悬浮操作遮罩模式，无插槽显示上传图标 |
| btnGroup <Badge text="1.8.1+" /> | 自定义按钮组插槽                                           |

### UploadBtn Event

| 事件名 | 说明         | 值  |
| ------ | ------------ | --- |
| reset  | 重置按钮回调 | -   |
| delete | 删除按钮回调 | -   |

### Thumbnail Attributes

| 参数                          | 说明                                                   | 类型    | 默认值                 | 可选值 |
| ----------------------------- | ------------------------------------------------------ | ------- | ---------------------- | ------ |
| **img-url**                   | 背景图 URL                                             | String  | -                      | -      |
| **rect**                      | 矩形数据,`width,height,left,top`                       | Object  | -                      | -      |
| rect-props                    | 数据 key 值别名                                        | Object  | 对应 rect key 名       | -      |
| original                      | 以底图形式预览，缩略图不进行裁剪                       | Boolean | false                  | -      |
| size <Badge text="1.16.2+" /> | 缩略图尺寸，默认计算 wrapper，当视图不可见时需设置宽高 | Object  | { width: 0, height: 0} | -      |

::: tip
Thumbnail 默认以裁剪形式处理预览的小图，得到的小图可以更加灵活的处理其他交互，但此方式不支持 `跨域` 访问图片。若图片存在 `跨域` ，建议优先通过服务端配置解决跨域 ，若仍然 `跨域` 可使用 `original` 方式预览。

注：`original` 方式无法使用 `ImgView API` 只支持 `fit` 模式。
:::

### Thumbnail extends Attributes

- [ImgView API](/zh/widget/image/img-view.html#api)

### Thumbnail rewrite

| 重写参数  | 默认值 |
| --------- | ------ |
| emptySize | 'xs'   |
