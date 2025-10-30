# ImgView 图片预览

## 安装

```bash
$ npm i @hui-pro/img-view -D
# 或者
$ yarn add @hui-pro/img-view --dev
```

## 引入

```js
import Vue from 'vue';
import ImgView from '@hui-pro/img-view';
import '@hui-pro/img-view/theme/index.scss';
Vue.use(ImgView);
```

## 基础用法

<template>
  <code-box title="基础用法" description="图片预览底层控件">
    <div class="h-demo-title">图片实际尺寸大于区域: {{ switchImg ? '是' : '否' }}</div>
    <el-switch v-model="switchImg" />
    <div class="h-demo-title">类型:</div>
    <el-radio-group v-model="type">
      <el-radio label="adjust">adjust</el-radio>
      <el-radio label="fill">fill</el-radio>
      <el-radio label="contain">contain</el-radio>
      <el-radio label="cover">cover</el-radio>
      <el-radio label="none">none</el-radio>
      <el-radio label="scale-down">scale-down</el-radio>
    </el-radio-group>
    <div class="h-demo-title">背景:</div>
    <el-radio-group v-model="bg">
      <el-radio label="white">white</el-radio>
      <el-radio label="gray">gray</el-radio>
      <el-radio label="transparent">transparent</el-radio>
    </el-radio-group>
    <el-row :gutter="16">
      <el-col :span="12">
        <div class="h-demo-title" v-text="type" />
        <h-img-view class="demo-img" :src="src" :bg="bg" :mode="type" />
      </el-col>
    </el-row>
  </code-box>
</template>

```html
<template>
  <div class="h-demo-title">类型:</div>
  <el-radio-group v-model="type">
    <el-radio label="adjust">adjust</el-radio>
    <el-radio label="fill">fill</el-radio>
    <el-radio label="contain">contain</el-radio>
    <el-radio label="cover">cover</el-radio>
    <el-radio label="none">none</el-radio>
    <el-radio label="scale-down">scale-down</el-radio>
  </el-radio-group>
  <div class="h-demo-title">背景:</div>
  <el-radio-group v-model="bg">
    <el-radio label="white">white</el-radio>
    <el-radio label="gray">gray</el-radio>
    <el-radio label="transparent">transparent</el-radio>
  </el-radio-group>
  <el-row :gutter="16">
    <el-col :span="12">
      <div class="h-demo-title" v-text="type" />
      <h-img-view class="demo-img" :src="src" :bg="bg" :mode="type" />
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        src: '/hui-pro/images/home-image-blue.png',
        type: 'contain',
        bg: 'transparent'
      };
    }
  };
</script>
```

## 自定义拓展

<template>
  <code-box
    title="自定义拓展"
    description="用于自定义拓展附加在图片上层的内容，常用于绘制，水印等"
  >
    <el-row :gutter="16">
      <el-col :span="12">
        <h-img-view class="demo-img" :src="src" mode="adjust" cursor="grab">
          <h-img-snippets-rect
            :rect="{
              width: 0.5,
              height: 0.5,
              top: 0.25,
              left: 0.25
            }"
          />
        </h-img-view>
      </el-col>
      <el-col :span="12">
        <div class="demo-img-wrapper">
          <h-img-view class="demo-img" :src="src" mode="contain" />
          <div class="demo-img-bottom">
            自定义图片信息
          </div>
        </div>
      </el-col>
    </el-row>
  </code-box>
</template>

```html
<style lang="scss" scoped>
  @import '~@hui-pro/theme/index.scss';
  .demo-img {
    width: 100%;
    height: 350px;
  }
  .demo-img-wrapper {
    position: relative;
  }
  .demo-img-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    padding: 0 8px;
    background: rgba(0, 0, 0, 0.4);
    color: $--color-white;
    line-height: 40px;
  }
</style>

<template>
  <el-row :gutter="16">
    <el-col :span="12">
      <h-img-view class="demo-img" :src="src" mode="adjust" cursor="grab">
        <h-img-snippets-rect
          :rect="{
            width: 0.5,
            height: 0.5,
            top: 0.25,
            left: 0.25
          }"
        />
      </h-img-view>
    </el-col>
    <el-col :span="12">
      <div class="demo-img-wrapper">
        <h-img-view class="demo-img" :src="src" mode="contain" />
        <div class="demo-img-bottom">
          自定义图片信息
        </div>
      </div>
    </el-col>
  </el-row>
</template>
```

## 事件

<template>
  <code-box title="事件" description="通过事件控制图片预览">
    <el-row :gutter="16">
      <el-col :span="12">
        <p>
          <h-img-snippets-zoom
            @zoom-out="zoomOut"
            @zoom-in="zoomIn"
            :scale="viewData.ratio"
          />
          <el-button type="default" @click="reset">
            适当尺寸
          </el-button>
          <el-button type="default" @click="resetOriginal">
            原始尺寸
          </el-button>
        </p>
        <h-img-view
          ref="view"
          :view-data.sync="viewData"
          class="demo-img"
          @on-zoom="onZoom"
          :src="big"
        />
      </el-col>
    </el-row>
  </code-box>
</template>

```html
<template>
  <el-row :gutter="16">
    <el-col :span="12">
      <p>
        <h-img-snippets-zoom
          @zoom-out="zoomOut"
          @zoom-in="zoomIn"
          :scale="viewData.ratio"
        />
        <el-button type="default" @click="reset">
          适当尺寸
        </el-button>
        <el-button type="default" @click="resetOriginal">
          原始尺寸
        </el-button>
      </p>
      <h-img-view
        ref="view"
        :view-data.sync="viewData"
        class="demo-img"
        @on-zoom="onZoom"
        src="/hui-pro/images/big.jpg"
      />
    </el-col>
  </el-row>
</template>

<script>
  export default {
    methods: {
      onZoom(opts) {
        this.scale = opts.scale;
      },
      reset() {
        this.$refs.view.$resetView();
      },
      resetOriginal() {
        this.$refs.view.$resetView(true);
      },
      zoomIn(type) {
        this.$refs.view.$zoomIn();
      },
      zoomOut(type) {
        this.$refs.view.$zoomOut();
      }
    },
    data() {
      return {
        scale: 1
      };
    }
  };
</script>
```

<style lang="scss" scoped>
  @import '~@hui-pro/theme/index.scss';
  .demo-img {
    width: 100%;
    height: 350px;
  }
  .demo-img-wrapper {
    position: relative;
  }
  .demo-img-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    padding: 0 8px;
    background: rgba(0, 0, 0, 0.4);
    color: $--color-white;
    line-height: 40px;
  }
</style>

<script>
  const versions = require('docs/.vuepress/src/version.json');
  const big = require('docs/.vuepress/public/images/big.jpg');
  const indexLogo = require('docs/.vuepress/public/images/index_logo.png');

  export default {
    methods: {
      onZoom(opts) {
        this.scale = opts.scale;
      },
      reset() {
        this.$refs.view.$resetView();
      },
      resetOriginal() {
        this.$refs.view.$resetView(true);
      },
      zoomIn(type) {
        this.$refs.view.$zoomIn();
      },
      zoomOut(type) {
        this.$refs.view.$zoomOut();
      }
    },
    computed: {
      src() {
        if (this.switchImg) {
          return big;
        } else {
          return indexLogo;
        }
      }
    },
    data() {
      return {
        versions,
        type: 'contain',
        bg: 'transparent',
        scale: 1,
        viewData: {},
        switchImg: false,
        big
      };
    }
  };
</script>

## API

:::warning

为了与 css object-fit 属性名保持一致，原 `fit` 更名为 `scale-down`

:::

### Attributes

| 参数          | 说明                 | 类型         | 默认值        | 可选值                                                                                                        |
| ------------- | -------------------- | ------------ | ------------- | ------------------------------------------------------------------------------------------------------------- |
| **src**       | 图片 url             | String       | -             | -                                                                                                             |
| title         | 图片 title           | String       | -             | -                                                                                                             |
| bg            | 区域背景             | Fixed:String | 'transparent' | 'white', 'gray', 'transparent'                                                                                |
| mode          | 预览模式，详见下表   | Fixed:String | 'adjust'      | 'adjust', 'fill', 'cover', 'contain', 'none' <Badge text="1.14.4+" /> , 'scale-down' <Badge text="1.14.4+" /> |
| cursor        | 光标的类型           | String       | 'default'     | -                                                                                                             |
| no-transition | 是否取消过渡动画     | Boolean      | false         | -                                                                                                             |
| lock          | 阻止`adjust`模式行为 | Boolean      | false         | -                                                                                                             |
| empty-size    | 设置缺省图大小       | String       | 'fit'         | 'lg', 'md', 'sm', 'xs', 'fit'                                                                                 |
| lazyload      | 是否为懒加载模式     | Boolean      | false         | -                                                                                                             |

### mode

| 类型       | 说明                                                                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| adjust     | 可自由操作（拖拽/缩放），初始状态`scale-down`                                                                                                           |
| contain    | 被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。 整个对象在填充盒子的同时保留其长宽比，因此如果宽高比与框的宽高比不匹配，该对象将被添加留白。 |
| cover      | 被替换的内容在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框。                                    |
| fill       | 被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框。                            |
| none       | 被替换的内容将保持其原有的尺寸。                                                                                                                        |
| scale-down | 内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。                                                               |

### mode#adjust Attributes

| 参数      | 说明                            | 类型   | 默认值 | 可选值 |
| --------- | ------------------------------- | ------ | ------ | ------ |
| radix     | 缩放颗粒度 `每次递增或递减比例` | Number | -      | 0.1    |
| max       | 缩放最大限制                    | Number | -      | 8      |
| min       | 缩放最小限制                    | Number | -      | 0.1    |
| view-data | 缩放参数，支持 `sync` 修饰符    | Object | -      | -      |

### mode#adjust#viewData Attributes

| 事件名     | 说明             | 默认值 |
| ---------- | ---------------- | ------ |
| scale      | 视图缩放比例     | 1      |
| ratio      | 图片实际缩放比例 | 1      |
| translateX | 横向偏移         | 0      |
| translateY | 纵向偏移         | 0      |
| transition | 是否过渡         | false  |

::: tip

当使用懒加载模式时 `imgView` 默认为休眠状态，需使用者自行根据视图情况激活

:::

```js
<h-img-view ref='imgView' src='/hui-pro/images/home-image-blue.png' :lazyload="lazyload" />;

// 手动激活
this.$refs.imgView.$emit('visible', true); // true 激活 false
// or 关闭懒加载模式
lazyload = false
```

### Event

| 事件名     | 说明                           | 值  |
| ---------- | ------------------------------ | --- |
| on-zoom    | 缩放回调                       | -   |
| on-success | 图片成功回调                   | -   |
| on-error   | 图片失败回调                   | -   |
| mounted    | 视图渲染完毕回调，返回当前控件 |

### Ref Event

| 事件名    | 说明 | 参数 |
| --------- | ---- | ---- |
| \$zoomIn  | 放大 | -    |
| \$zoomOut | 缩小 | -    |
| \$reset   | 重置 | -    |

### Slots

| 插槽名称           | 说明             |
| ------------------ | ---------------- |
| default            | 图片叠加内容     |
| defaultPlaceholder | 图片加载中占位   |
| errorPlaceholder   | 图片加载失败占位 |
