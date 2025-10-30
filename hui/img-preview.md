# ImgPreview 图片大图

## 安装

```bash
$ npm i @hui-pro/img-preview -D
# 或者
$ yarn add @hui-pro/img-preview --dev
```

## 引入

```js
import Vue from 'vue';
import ImgPreview from '@hui-pro/img-preview';
import '@hui-pro/img-preview/theme/index.scss';
Vue.use(ImgPreview);
```

## 基础用法

<template>
  <code-box title="基础用法" description="图片查看">
    <el-button type="default" @click="preview('basic')">
      预览
    </el-button>
    <h-img-preview ref="basic" :data="urls" :visible.sync="basic" />
    <el-button type="default" @click="preview('single')">
      单图预览
    </el-button>
    <h-img-preview ref="single" :data="urls2" :visible.sync="single" mask-closable />
  </code-box>
</template>

```html
<template>
  <el-button type="default" @click="preview('basic')">
    预览
  </el-button>
  <h-img-preview ref="basic" :data="urls" :visible.sync="basic" />
  <el-button type="default" @click="preview('single')">
    单图预览
  </el-button>
  <h-img-preview ref="single" :data="urls2" :visible.sync="single" mask-closable />
</template>

<script>
  export default {
    data() {
      return {
        urls: [
          require('./assets/img/img-carousel/1.jpg'),
          require('./assets/img/img-carousel/2.jpg')
        ],
        urls2: [require('./assets/img/img-carousel/1.jpg')]
      };
    },
    methods: {
      preview(ref) {
        this[ref] = true;
      }
    }
  };
</script>
```

## 自定义内容

<template>
  <code-box title="自定义内容" description="自定义内容">
    <el-button type="default" @click="preview('custom')">
      自定义内容
    </el-button>
    <h-img-preview ref="custom" :data="urls2" :visible.sync="custom">
      <template slot="top">
        <h4 class="h-img-preview__title">
          🌟 标题
        </h4>
        <h4 class="h-img-preview__description">
          🎨 描述 1 | 🎲 描述 2
        </h4>
      </template>
      <template slot="btnGroup">
        <el-button icon="h-icon-search">
          操作一
        </el-button>
        <el-button icon="h-icon-search">
          操作二
        </el-button>
        <el-button icon="h-icon-search">
          操作三
        </el-button>
      </template>
    </h-img-preview>
  </code-box>
</template>

```html
<template>
  <el-button type="default" @click="preview('custom')">
    自定义内容
  </el-button>
  <h-img-preview ref="custom" :data="urls2" :visible.sync="custom">
    <template slot="top">
      <h4 class="h-img-preview__title">
        🌟 标题
      </h4>
      <h4 class="h-img-preview__description">
        🎨 描述 1 | 🎲 描述 2
      </h4>
    </template>
    <template slot="btnGroup">
      <el-button icon="h-icon-search">
        操作一
      </el-button>
      <el-button icon="h-icon-search">
        操作二
      </el-button>
      <el-button icon="h-icon-search">
        操作三
      </el-button>
    </template>
  </h-img-preview>
</template>

<script>
  // 参考基础用法
</script>
```

## 完整示例

<template>
  <code-box title="基础用法" description="图片查看">
    <el-button type="primary" @click="preview('dark')">
      dark 预览
    </el-button>
    <el-button type="default" @click="preview('light')">
      light 预览
    </el-button>
    <h-img-preview
      ref="dark"
      :visible.sync="dark"
      :data="urls"
      :currentIndex="1"
      :viewData.sync="viewData"
      show-album
    >
      <template slot="top" slot-scope="scope">
        <h4 class="h-img-preview__title">
          🌟 {{ scope.item.title }}
        </h4>
        <h4 class="h-img-preview__description">
          🎲 {{ scope.item.description }}
        </h4>
      </template>
      <template slot="btnGroup" slot-scope="data">
        <el-button icon="h-icon-search" @click="prev">
          上一个
        </el-button>
        <el-button icon="h-icon-search" @click="next">
          下一个
        </el-button>
        <h-img-snippets-zoom
          @zoom-out="zoomOut"
          @zoom-in="zoomIn"
         :scale="viewData.ratio"
        />
        <el-button icon="h-icon-search" @click="reset">
          适当尺寸
        </el-button>
        <el-button icon="h-icon-search" @click="selected(0)">
          首页
        </el-button>
        <el-button icon="h-icon-search" @click="selected(8)">
          第八个
        </el-button>
        <el-button icon="h-icon-search" @click="selected(urls.length - 1)">
          尾页
        </el-button>
      </template>
    </h-img-preview>
    <h-img-preview
      ref="light"
      theme="light"
      :visible.sync="light"
      :data="urls"
      :currentIndex="1"
      :viewData.sync="viewData"
      show-album
    >
      <template slot="top" slot-scope="scope">
        <h4 class="h-img-preview__title">
          🌟 {{ scope.item.title }}
        </h4>
        <h4 class="h-img-preview__description">
          🎲 {{ scope.item.description }}
        </h4>
      </template>
      <template slot="btnGroup" slot-scope="data">
        <el-button icon="h-icon-search" @click="prev">
          上一个
        </el-button>
        <el-button icon="h-icon-search" @click="next">
          下一个
        </el-button>
        <h-img-snippets-zoom
          @zoom-out="zoomOut"
          @zoom-in="zoomIn"
          :scale="viewData.ratio"
        />
        <el-button icon="h-icon-search" @click="reset">
          适当尺寸
        </el-button>
        <el-button icon="h-icon-search" @click="selected(0)">
          首页
        </el-button>
        <el-button icon="h-icon-search" @click="selected(8)">
          第八个
        </el-button>
        <el-button icon="h-icon-search" @click="selected(urls.length - 1)">
          尾页
        </el-button>
      </template>
    </h-img-preview>
  </code-box>
</template>

```html
<template>
  <el-button type="primary" @click="preview('dark')">
    dark 预览
  </el-button>
  <el-button type="default" @click="preview('light')">
    light 预览
  </el-button>
  <h-img-preview
    ref="dark"
    :visible.sync="dark"
    :data="urls"
    :currentIndex="1"
    :viewData.sync="viewData"
    show-album
  >
    <template slot="top" slot-scope="scope">
      <h4 class="h-img-preview__title">
        🌟 {{ scope.item.title }}
      </h4>
      <h4 class="h-img-preview__description">
        🎲 {{ scope.item.description }}
      </h4>
    </template>
    <template slot="btnGroup" slot-scope="data">
      <el-button icon="h-icon-search" @click="prev">
        上一个
      </el-button>
      <el-button icon="h-icon-search" @click="next">
        下一个
      </el-button>
      <h-img-snippets-zoom
        @zoom-out="zoomOut"
        @zoom-in="zoomIn"
        :scale="viewData.ratio"
      />
      <el-button icon="h-icon-search" @click="reset">
        适当尺寸
      </el-button>
      <el-button icon="h-icon-search" @click="selected(0)">
        首页
      </el-button>
      <el-button icon="h-icon-search" @click="selected(8)">
        第八个
      </el-button>
      <el-button icon="h-icon-search" @click="selected(urls.length - 1)">
        尾页
      </el-button>
    </template>
  </h-img-preview>
  <h-img-preview
    ref="light"
    theme="light"
    :visible.sync="light"
    :data="urls"
    :currentIndex="1"
    :viewData.sync="viewData"
    show-album
  >
    <template slot="top" slot-scope="scope">
      <h4 class="h-img-preview__title">
        🌟 {{ scope.item.title }}
      </h4>
      <h4 class="h-img-preview__description">
        🎲 {{ scope.item.description }}
      </h4>
    </template>
    <template slot="btnGroup" slot-scope="data">
      <el-button icon="h-icon-search" @click="prev">
        上一个
      </el-button>
      <el-button icon="h-icon-search" @click="next">
        下一个
      </el-button>
      <h-img-snippets-zoom
        @zoom-out="zoomOut"
        @zoom-in="zoomIn"
        :scale="viewData.ratio"
      />
      <el-button icon="h-icon-search" @click="reset">
        适当尺寸
      </el-button>
      <el-button icon="h-icon-search" @click="selected(0)">
        首页
      </el-button>
      <el-button icon="h-icon-search" @click="selected(8)">
        第八个
      </el-button>
      <el-button icon="h-icon-search" @click="selected(urls.length - 1)">
        尾页
      </el-button>
    </template>
  </h-img-preview>
</template>

<script>
  import Vue from 'vue';
  import ImgPreview from '@hui-pro/img-preview';
  import '@hui-pro/img-preview/theme/index.scss';
  Vue.use(ImgPreview);
  export default {
    data() {
      return {
        basic: false,
        single: false,
        custom: false,
        dark: false,
        light: false,
        urls: [
          require('./assets/img/img-carousel/1.jpg'),
          // ...
          require('./assets/img/img-carousel/27.jpg')
        ],
        urls2: [require('./assets/img/img-carousel/10.jpg')],
        ref: null,
        viewData
      };
    },
    created() {
      this.urls = this.urls.map((item, index) => {
        return {
          url: item,
          title: `图片标题 ${index}`,
          description: `图片描述 ${index}`
        };
      });
      this.urls2 = this.urls2.map((item, index) => {
        return {
          url: item,
          title: `图片标题 ${index}`,
          description: `图片描述 ${index}`
        };
      });
    },
    methods: {
      preview(ref) {
        this.ref = ref;
        this[ref] = true;
      },
      prev() {
        this.$refs[this.ref].$prev();
      },
      next() {
        this.$refs[this.ref].$next();
      },
      selected(index) {
        this.$refs[this.ref].$selected(index);
      },
      handleOnChange(item, index) {
        this.reset();
      },
      zoomIn(type) {
        this.$refs[this.ref].$zoomIn();
      },
      zoomOut(type) {
        this.$refs[this.ref].$zoomOut();
      },
      reset() {
        this.$refs[this.ref].$resetImgView();
      }
    }
  };
</script>
```

## 大数据渲染

<template>
  <code-box title="基础用法" description="5000条数据">
    <el-button type="default" @click="preview('largeData')">
      大数据图片预览
    </el-button>
    <h-img-preview
      ref="largeData"
      show-album
      :data="urls3"
      :visible.sync="largeData"
    >
      <template slot="top" slot-scope="scope">
        <h4 class="h-img-preview__title">
          🌟 {{ scope.item.title }}
        </h4>
        <h4 class="h-img-preview__description">
          🎲 {{ scope.item.description }}
        </h4>
      </template>
    </h-img-preview>
  </code-box>
</template>

```html
<el-button type="default" @click="preview('largeData')">
  大数据图片预览
</el-button>
<h-img-preview
  ref="largeData"
  show-album
  :data="urls3"
  :visible.sync="largeData"
>
  <template slot="top" slot-scope="scope">
    <h4 class="h-img-preview__title">
      🌟 {{ scope.item.title }}
    </h4>
    <h4 class="h-img-preview__description">
      🎲 {{ scope.item.description }}
    </h4>
  </template>
</h-img-preview>
```

::: tip
卡顿原因分析：

一、首次打开：控件为了在未打开时不影响页面渲染，采用的是首次打开渲染 dom，后续采用`show`,`hide`形式切换，所以首次渲染数据较大会出现少许卡顿。

二、切换卡顿：图片系列采用可视区域渲染，为了保证滑动动画流畅，预加载左右两侧图片。大图保持在 2-3 个 dom 区域，缩略图则是页面宽度能放下的数量 2-3 倍。由于 http 请求队列有上限，所以页面阻塞主要原因在图片请求过多，返回速度较慢有关。控件已做最优处理，渲染能力有限。

建议：从交互上，或数据过滤上规避大量数据。图片服务器开启缓存，浏览器开启缓存。
:::

<style>
  .h-img-preview__title,
  .h-img-preview__description {
    padding-left: 0;
  }
  .contain {
    display: flex;
    height: 100%;
    flex-flow:row nowrap;
    align-items: stretch;
    justify-content: space-between;
  }
  .cell {
    flex: 1 1 auto;
    padding: 8px;
    background: transparent;
  }
  .cell-compare {
    width: 20%;
    flex: 0 0 auto;
    padding-right: 0;
    background: transparent;
  }
</style>

<script>
  const versions = require('docs/.vuepress/src/version.json');

  export default {
    data() {
      return {
        versions,
        basic: false,
        single: false,
        custom: false,
        dark: false,
        light: false,
        largeData: false,
        imgList: [
          require('./assets/img/img-carousel/1.jpg'),
          require('./assets/img/img-carousel/2.jpg'),
          require('./assets/img/img-carousel/3.jpg'),
          require('./assets/img/img-carousel/5.jpg'),
          require('./assets/img/img-carousel/6.jpg'),
          require('./assets/img/img-carousel/7.jpg'),
          require('./assets/img/img-carousel/8.jpg'),
          require('./assets/img/img-carousel/9.jpg'),
          require('./assets/img/img-carousel/10.jpg'),
          require('./assets/img/img-carousel/11.jpg'),
          require('./assets/img/img-carousel/12.jpg'),
          require('./assets/img/img-carousel/13.jpg'),
          require('./assets/img/img-carousel/14.jpg'),
          require('./assets/img/img-carousel/15.jpg'),
          require('./assets/img/img-carousel/16.jpg'),
          require('./assets/img/img-carousel/17.jpg'),
          require('./assets/img/img-carousel/18.jpg'),
          require('./assets/img/img-carousel/19.jpg'),
          require('./assets/img/img-carousel/20.jpg'),
          require('./assets/img/img-carousel/21.jpg'),
          require('./assets/img/img-carousel/22.jpg'),
          require('./assets/img/img-carousel/23.jpg'),
          require('./assets/img/img-carousel/24.jpg'),
          require('./assets/img/img-carousel/25.jpg'),
          require('./assets/img/img-carousel/26.jpg'),
          require('./assets/img/img-carousel/27.jpg')
        ],
        urls2: [require('./assets/img/img-carousel/10.jpg')],
        urls3: [],
        ref: null,
        currentIndex: 0,
        albumProps: {
          mode: 'fit'
        },
        viewData: {}
      };
    },
    created() {
      this.urls = this.imgList.map((item, index) => {
        return {
          url: item,
          title: `图片标题 ${index}`,
          description: `图片描述 ${index}`
        };
      });
      this.urls2 = [
        {
          url: require('./assets/img/img-carousel/10.jpg'),
          title: `图片标题`,
          description: `图片描述`
        }
      ];
      const getRandomNum = () => {
        return Math.floor(Math.random() * 300 + 1);
      };
      for (let index = 0; index < 5000; index++) {
        const width = getRandomNum();
        const height = getRandomNum();
        this.urls3.push({
          url: `http://dummyimage.com/${width}x${height}`,
          title: `${width}x${height}`,
          description: `第 ${index + 1} 张`
        });
      }
    },
    methods: {
      preview(ref) {
        this.ref = ref;
        this.currentIndex = 5;
        this[ref] = true;
      },
      prev() {
        this.$refs[this.ref].$prev();
      },
      next() {
        this.$refs[this.ref].$next();
      },
      selected(index) {
        this.$refs[this.ref].$selected(index);
      },
      handleOnChange(item, index) {
        this.item = item;
        this.reset();
      },
      handleOnClose() {
        // this.$message('已关闭');
      },
      zoomIn(type) {
        this.$refs[this.ref].$zoomIn();
      },
      zoomOut(type) {
        this.$refs[this.ref].$zoomOut();
      },
      reset() {
        this.$refs[this.ref].$resetImgView();
      }
    }
  };
</script>

## API

### Attributes

| 参数               | 说明                                 | 类型         | 默认值 | 可选值                                                 |
| ------------------ | ------------------------------------ | ------------ | ------ | ------------------------------------------------------ |
| **data**           | 数据                                 | Array        | \[]    | -                                                      |
| data-props         | 数据 key 值别名                      | Object       | -      | 对应 data key 名                                       |
| visible            | 是否显示 preview，支持 .sync 修饰符  | Boolean      | false  | -                                                      |
| theme              | 主题                                 | Fixed:String | -      | 'light', 'dark'                                        |
| show-album         | 是否显示缩略图相册                   | Boolean      | false  | -                                                      |
| current-index      | 当前项索引                           | Number       | 0      | -                                                      |
| auto-reset         | 关闭预览是否自动重置预览状态         | Boolean      | true   | -                                                      |
| img-carousel-props | 大图 img-carousel 参数               | Object       | -      | 参考 [ImgView API](/zh/widget/image/img-view.html#api) |
| album-props        | 缩略图 album 参数                    | Object       | -      | 参考 [ImgView API](/zh/widget/image/img-view.html#api) |
| mask-closable      | 是否可以点击遮罩关闭，仅支持单图预览 | Boolean      | -      | -                                                      |

::: tip

img-carousel-props、album-props 支持所有 img-carousel、album 属性

例：

```html
<h-img-preview
  ref="basic"
  :data="urls"
  :visible.sync="basic"
  :img-carousel-props="{
    noTransition: true
  }"
/>
```

注：属性名需写成驼峰形式

:::

### ImgCarouselProps Rewrite Attributes

| 参数            | 原默认值 | 现默认值 |
| --------------- | -------- | -------- |
| single-hide-btn | false    | true     |

### AlbumProps Rewrite Attributes

| 参数          | 原默认值 | 现默认值 |
| ------------- | -------- | -------- |
| always-center | false    | true     |

### data

| key  | 说明 | 可选值           | 默认值 |
| ---- | ---- | ---------------- | ------ |
| type | 类型 | 0：图片，1：视频 | 0      |

### dataProps

| key   | 说明                      | 可选值 | 默认值 |
| ----- | ------------------------- | ------ | ------ |
| title | 图片 title                | -      | title  |
| type  | 图片类型                  | -      | type   |
| url   | 图片 src 地址 或 视频地址 | -      | url    |
| key   | 唯一标识                  | -      | key    |

### Event

| 事件名   | 说明                              | 参数 |
| -------- | --------------------------------- | ---- |
| \$open   | 显示控件，可使用`visible`属性控制 | -    |
| \$close  | 关闭控件，可使用`visible`属性控制 | -    |
| \$update | 更新控件视图                      | -    |

::: tip
控件使用插槽时更新视图需手动执行\$update
:::

### Ref Event

| 事件名    | 说明           | 值                                                                     |
| --------- | -------------- | ---------------------------------------------------------------------- |
| on-change | 选中项变化回调 | 数据项                                                                 |
| on-zoom   | 缩放回调       | `scale` 当前缩放比例<br>`translateX` 横向偏移<br>`translateY` 纵向偏移 |
| on-open   | 打开回调       | -                                                                      |
| on-opened | 完全打开回调   | -                                                                      |
| on-close  | 关闭回调       | -                                                                      |
| on-closed | 完全关闭回调   | -                                                                      |

### Ref extends ImgCarousel Event

| 事件名     | 说明       | 参数             |
| ---------- | ---------- | ---------------- |
| \$prevPage | 上一页     | -                |
| \$nextPage | 下一页     | -                |
| \$prev     | 上一个     | -                |
| \$next     | 下一个     | -                |
| \$selected | 选中某一项 | index:选中项索引 |

### Ref extends ImgView Event

::: tip
仅对图片生效,即 type：0
:::

| 事件名         | 说明     | 参数 |
| -------------- | -------- | ---- |
| \$zoomIn       | 放大     | -    |
| \$zoomOut      | 缩小     | -    |
| \$reset        | 重置     | -    |
| \$resetImgView | 重置视图 | -    |

### Slots

| 插槽名称 | 说明           |
| -------- | -------------- |
| top      | 顶部自定义内容 |
| btnGroup | 操作按钮组     |

### extends ImgCarousel Slots

| 插槽名称        | 说明                                                                  |
| --------------- | --------------------------------------------------------------------- |
| imgCarouselItem | [imgCarousel](/zh/widget/image/img-carousel.html#自定义内容) 自定义项 |

### extends Album Slots

| 插槽名称  | 说明                                                         |
| --------- | ------------------------------------------------------------ |
| albumItem | [albumItem](/zh/widget/image/album.html#自定义内容) 自定义项 |
