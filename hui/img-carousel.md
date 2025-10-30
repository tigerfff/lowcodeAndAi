# ImgCarousel 多图切换

</template>

## 安装

```bash
$ npm i @hui-pro/img-carousel -D
# 或者
yarn add @hui-pro/img-carousel --dev
```

## 引入

```js
import ImgCarousel from '@hui-pro/img-carousel';
import '@hui-pro/img-carousel/theme/index.scss';
Vue.use(ImgCarousel);
```

## 基础用法

<template>
  <code-box title="基础用法" description="纯图片展示">
    <div>
      <h-img-carousel class="h-demo-carousel" :data="urls" bg="gray" />
    </div>
  </code-box>
</template>

```html
<h-img-carousel :data="urls" />
<script>
  export default {
    data() {
      return {
        urls: [
          {
            url: require('./assets/img/img-carousel/1.jpg'),
            title: '图片1'
          },
          {
            url: require('./assets/img/img-carousel/2.jpg'),
            title: '图片2'
          }
        ]
      };
    }
  };
</script>
```

## 皮肤

<template>
  <code-box title="皮肤">
    <div>
      <div class="h-demo-title">皮肤:</div>
      <el-radio-group class="h-btn-group" v-model="theme">
        <el-radio label="light">light</el-radio>
        <el-radio label="light-gray">light-gray</el-radio>
        <el-radio label="dark">dark</el-radio>
        <el-radio label="transparent">transparent</el-radio>
      </el-radio-group>
      <h-img-carousel class="h-demo-carousel" :data="urls" :theme="theme" />
    </div>
  </code-box>
</template>

```html
<template>
  <div>
    <div class="h-demo-title">皮肤:</div>
    <el-radio-group class="h-btn-group" v-model="theme">
      <el-radio label="light">light</el-radio>
      <el-radio label="light-gray">light-gray</el-radio>
      <el-radio label="dark">dark</el-radio>
      <el-radio label="transparent">transparent</el-radio>
    </el-radio-group>
    <h-img-carousel class="h-demo-carousel" :data="urls" :theme="theme" />
  </div>
</template>
```

## 多类型

<template>
  <code-box title="多类型" description="type:0 代表图片，type:1 代表视频">
    <div class="h-demo-carousel">
      <h-img-carousel theme="light-gray" :data="dataWithVideo" />
    </div>
  </code-box>
</template>

```html
<template>
  <div class="h-demo-carousel">
    <h-img-carousel theme="light-gray" :data="dataWithVideo" />
  </div>
</template>
<script>
  import videoUrl from './assets/video/movie.ogg';
  export default {
    data() {
      return {
        urls: [
          {
            type: 0,
            url: require('./assets/img/img-carousel/1.jpg'),
            title: '图片'
          },
          {
            type: 1,
            url: videoUrl,
            title: '视频'
          }
        ],
        dataWithVideo: []
      };
    }
  };
</script>
```

## 事件

<template>
  <code-box title="事件" description="通过事件控制">
    <div class="h-demo-carousel">
      <h-img-carousel
        ref="carousel"
        :data="dataWithVideo"
        :view-data.sync="viewData"
        :current-index.sync="currentIndex"
        no-transition
      />
    </div>
    <h-img-snippets-btn-group theme="light-gray">
      <el-button icon="h-icon-search" @click="prev">
        上一个
      </el-button>
      <el-button icon="h-icon-search" @click="next">
        下一个
      </el-button>
      <h-img-snippets-zoom @zoom-out="zoomOut" @zoom-in="zoomIn" :scale="viewData.ratio" />
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
      <el-button icon="h-icon-search" @click="setNull">
        空数据
      </el-button>
      <el-button icon="h-icon-search" @click="resetData">
        重置数据
      </el-button>
    </h-img-snippets-btn-group>
    <h-album
      theme="light-gray"
      ref="album"
      :data="dataWithVideo"
      :current-index.sync="currentIndex"
      always-center
    />
  </code-box>
</template>

```html
<template>
  <code-box title="事件" description="通过事件控制">
    <div class="h-demo-carousel">
      <h-img-carousel
        ref="carousel"
        :data="dataWithVideo"
        :view-data.sync="viewData"
        :current-index.sync="currentIndex"
        no-transition
      />
    </div>
    <h-img-snippets-btn-group theme="light-gray">
      <el-button icon="h-icon-search" @click="prev">上一个</el-button>
      <el-button icon="h-icon-search" @click="next">下一个</el-button>
      <h-img-snippets-zoom
        @zoom-out="zoomOut"
        @zoom-in="zoomIn"
        :scale="viewData.ratio"
      />
      <el-button icon="h-icon-search" @click="reset">适当尺寸</el-button>
      <el-button icon="h-icon-search" @click="selected(0)">首页</el-button>
      <el-button icon="h-icon-search" @click="selected(8)">第八个</el-button>
      <el-button icon="h-icon-search" @click="selected(urls.length - 1)">
        尾页
      </el-button>
      <el-button icon="h-icon-search" @click="setNull">空数据</el-button>
      <el-button icon="h-icon-search" @click="resetData">重置数据</el-button>
    </h-img-snippets-btn-group>
    <h-album
      theme="light-gray"
      ref="album"
      :data="dataWithVideo"
      :current-index.sync="currentIndex"
      always-center
    />
  </code-box>
</template>

<script>
  import Vue from 'vue';
  import Album from '@hui-pro/album';
  import ImgCarousel from '@hui-pro/img-carousel';
  import '@hui-pro/album/theme/index.scss';
  import '@hui-pro/img-carousel/theme/index.scss';
  import videoUrl from './assets/video/movie.ogg';
  Vue.use(Album);
  Vue.use(ImgCarousel);
  export default {
    data() {
      return {
        urls: [
          {
            url: require('./assets/img/img-carousel/1.jpg'),
            title: '图片1'
          },
          {
            url: require('./assets/img/img-carousel/2.jpg'),
            title: '图片2'
          }
        ],
        dataWithVideo: [],
        scale: 1,
        viewData: {},
        currentIndex: 0
      };
    },
    methods: {
      prev() {
        this.$refs.carousel.$prev();
      },
      next() {
        this.$refs.carousel.$next();
      },
      selected(index) {
        this.$refs.carousel.$selected(index);
        this.$refs.album.$selected(index);
      },
      handleOnPrev(item) {
        this.$refs.album.$prev();
      },
      handleOnNext(item) {
        this.$refs.album.$next();
      },
      zoomIn(type) {
        this.$refs.carousel.$zoomIn();
      },
      zoomOut(type) {
        this.$refs.carousel.$zoomOut();
      },
      reset() {
        this.$refs.carousel.$resetImgView();
        this.scale = 1;
      }
    }
  };
</script>
```

## 自定义内容

<template>
  <code-box title="自定义内容" description="通过`slot-scope`获取控件内部数据，`scope`名可根据开发者业务随意命名，其数据与`data`中当前项`item`数据一致，开发者可根据业务需求任意修改自定义项内容">
    <div class="h-demo-carousel">
      <h-img-carousel :data="urls">
        <template slot="prev">
          <button type="button" class="h-img-carousel__prev">
            上一页
          </button>
        </template>
        <template slot="next">
          <button type="button" class="h-img-carousel__next">
            下一页
          </button>
        </template>
        <template slot="item" slot-scope="scope">
          <div class="h-demo-custom">
            <h-img-view
              :src="scope.item.url"
              :title="scope.item.title"
              class="h-demo-img-view"
              mode="contain"
              no-transition
            />
            <h-img-view
              :src="homeImageBlue"
              class="h-demo-img-view"
              mode="contain"
              no-transition
            />
          </div>
        </template>
      </h-img-carousel>
    </div>
  </code-box>
</template>

```html
<template>
  <div class="h-demo-carousel">
    <h-img-carousel :data="urls">
      <template slot="prev">
        <button type="button" class="h-img-carousel__prev">上一页</button>
      </template>
      <template slot="next">
        <button type="button" class="h-img-carousel__next">下一页</button>
      </template>
      <template slot="item" slot-scope="scope">
        <div class="h-demo-custom">
          <h-img-view
            :src="scope.item.url"
            :title="scope.item.title"
            class="h-demo-img-view"
            mode="contain"
            no-transition
          />
          <h-img-view
            src="/hui-pro/images/home-image-blue.png"
            class="h-demo-img-view"
            mode="contain"
            no-transition
          />
        </div>
      </template>
    </h-img-carousel>
  </div>
</template>

<style lang="scss" scoped>
  .h-demo-custom {
    display: flex;
    height: 100%;
    padding: 0 80px;
    .h-demo-img-view {
      width: 50%;
    }
  }
</style>
```

<style lang="scss" scoped>
  .h-demo-carousel {
    position: relative;
    height: 450px;
  }
  .h-demo-custom {
    display: flex;
    height: 100%;
    padding: 0 80px;
    .h-demo-img-view {
      width: 50%;
    }
  }
</style>

<script>
  const versions = require('docs/.vuepress/src/version.json');
  const homeImageBlue = require('docs/.vuepress/public/images/home-image-blue.png');
  import videoUrl from './assets/video/movie.ogg';
  import { deepClone } from '@hui-pro/utils';
  export default {
    data() {
      return {
        versions,
        urls: [
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
        dataWithVideo: [],
        scale: 1,
        theme: 'light',
        viewData: {},
        currentIndex: 0,
        homeImageBlue
      };
    },
    created() {
      // 把纯url数组转换成Object数组，url作为Object的属性
      this.urls = this.urls.map(item => {
        return {
          type: 0,
          url: item,
          title: '图片'
        };
      });
      // 构造带有视频的数据
      this.resetData();
    },
    methods: {
      prev() {
        this.$refs.carousel.$prev();
      },
      next() {
        this.$refs.carousel.$next();
      },
      selected(index) {
        this.$refs.carousel.$selected(index);
        this.$refs.album.$selected(index);
      },
      handleOnPrev(item) {
        this.$refs.album.$prev();
      },
      handleOnNext(item) {
        this.$refs.album.$next();
      },
      handleOnChange(item, index) {
        this.$refs.carousel.$selected(index);
      },
      onZoom(opts) {
        this.scale = opts.scale;
      },
      zoomIn(type) {
        this.$refs.carousel.$zoomIn();
      },
      zoomOut(type) {
        this.$refs.carousel.$zoomOut();
      },
      reset() {
        this.$refs.carousel.$resetImgView();
        this.scale = 1;
      },
      setNull() {
        this.dataWithVideo = [];
      },
      resetData() {
        const videoObj1 = {
          type: 1,
          url: videoUrl,
          title: '视频'
        };
        const videoObj2 = {
          type: 1,
          url: videoUrl,
          title: '视频'
        };
        this.dataWithVideo = deepClone(this.urls);
        this.dataWithVideo.splice(1, 1, videoObj1);
        this.dataWithVideo.splice(2, 1, videoObj2);
      }
    }
  };
</script>

## API

::: tip

ImgCarousel 继承 ImgView，支持 ImgView 所有属性

:::

### Attributes

| 参数                                   | 说明                              | 类型         | 默认值           | 可选值                                       |
| -------------------------------------- | --------------------------------- | ------------ | ---------------- | -------------------------------------------- |
| **data**                               | 数据                              | Array        | \[]              | -                                            |
| data-props                             | 数据 key 值别名                   | Object       | 对应 data key 名 | -                                            |
| current-index                          | 当前项索引，支持 `sync` 修饰符    | Number       | 0                | -                                            |
| theme                                  | 主题                              | Fixed:String | 'light'          | 'light', 'light-gray', 'dark', 'transparent' |
| single-hide-btn                        | 当只有一页时是否隐藏左右两侧按钮  | Boolean      | false            | -                                            |
| no-transition                          | 是否取消过渡动画                  | Boolean      | false            | -                                            |
| before-change <Badge text="1.14.1+" /> | change 触发前钩子，返回 `Promise` | Function     | -                | -                                            |

### extends Attributes

- [ImgView API](/zh/widget/image/img-view.html#api)

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

| 事件名     | 说明                                                         | 值                                                                     |
| ---------- | ------------------------------------------------------------ | ---------------------------------------------------------------------- |
| on-change  | 选中项变化回调                                               | 数据项                                                                 |
| on-changed | 动画完成后回调，可在此阶段获取 DOM 结构，以及 \$reset 等操作 | 数据项                                                                 |
| on-zoom    | 缩放回调                                                     | `scale` 当前缩放比例<br>`translateX` 横向偏移<br>`translateY` 纵向偏移 |

### Ref Event

| 事件名         | 说明             | 参数             |
| -------------- | ---------------- | ---------------- |
| \$prevPage     | 上一页           | -                |
| \$nextPage     | 下一页           | -                |
| \$prev         | 上一个           | -                |
| \$next         | 下一个           | -                |
| \$selected     | 选中某一项       | index:选中项索引 |
| \$resetImgView | 重置视图         | -                |
| \$getItemRef   | 获取当前视图 ref | -                |

### Ref extends ImgView Event

::: tip

仅对图片生效,即 type：0

:::

- [ImgView API](/zh/widget/image/img-view.html#api)

### Slots

| 插槽名称                      | 说明       | scope |
| ----------------------------- | ---------- | ----- |
| item                          | 自定义项   | item  |
| prev <Badge text="1.16.1+" /> | 前一页按钮 | -     |
| next <Badge text="1.16.1+" /> | 下一页按钮 | -     |
