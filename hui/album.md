# Album 相册

## 安装

```bash
$ npm i @hui-pro/album -D
# 或者
yarn add @hui-pro/album --dev
```

## 引入

```js
import Vue from 'vue';
import Album from '@hui-pro/album';
import '@hui-pro/album/theme/index.scss';
Vue.use(Album);
```

## 基础用法

<template>
  <code-box title="基础用法" description="相册控件">
    <el-row class="h-demo-block-line" :gutter="16">
      <el-col :span="4">
        <span class="demonstration">左端对齐</span>
      </el-col>
      <el-col :span="20">
        <h-album :data="data" singleHideBtn />
      </el-col>
    </el-row>
    <el-row class="h-demo-block-line" :gutter="16">
      <el-col :span="4">
        <span class="demonstration">居中对齐</span>
      </el-col>
      <el-col :span="20">
        <h-album :data="data" alwaysCenter />
      </el-col>
    </el-row>
  </code-box>
</template>

```html
<template>
  <el-row class="h-demo-block-line" :gutter="16">
    <el-col :span="4">
      <span class="demonstration">左端对齐</span>
    </el-col>
    <el-col :span="20">
      <h-album :data="data" />
    </el-col>
  </el-row>
  <el-row class="h-demo-block-line" :gutter="16">
    <el-col :span="4">
      <span class="demonstration">居中对齐</span>
    </el-col>
    <el-col :span="20">
      <h-album :data="data" alwaysCenter />
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        data: []
      };
    },
    created() {
      for (let index = 0; index < 30; index++) {
        this.data.push({
          title: 'title',
          url: '/hui-pro/images/home-image-blue.png',
          key: index
        });
      }
    }
  };
</script>
```

## 皮肤

<template>
  <code-box title="基础用法" description="相册控件">
    <el-row class="h-demo-block-line" :gutter="16">
      <el-col :span="4">
        <span class="demonstration">light</span>
      </el-col>
      <el-col :span="20">
        <h-album :data="data" theme="light" />
      </el-col>
    </el-row>
    <el-row class="h-demo-block-line" :gutter="16">
      <el-col :span="4">
        <span class="demonstration">light-gray</span>
      </el-col>
      <el-col :span="20">
        <h-album :data="data" theme="light-gray" />
      </el-col>
    </el-row>
    <el-row class="h-demo-block-line" :gutter="16">
      <el-col :span="4">
        <span class="demonstration">dark</span>
      </el-col>
      <el-col :span="20">
        <h-album :data="data" theme="dark" style="background:#262626" />
      </el-col>
    </el-row>
  </code-box>
</template>

```html
<template>
  <el-row class="h-demo-block-line" :gutter="16">
    <el-col :span="4">
      <span class="demonstration">light</span>
    </el-col>
    <el-col :span="20">
      <h-album :data="data" theme="light" />
    </el-col>
  </el-row>
  <el-row class="h-demo-block-line" :gutter="16">
    <el-col :span="4">
      <span class="demonstration">light-gray</span>
    </el-col>
    <el-col :span="20">
      <h-album :data="data" theme="light-gray" />
    </el-col>
  </el-row>
  <el-row class="h-demo-block-line" :gutter="16">
    <el-col :span="4">
      <span class="demonstration">dark</span>
    </el-col>
    <el-col :span="20">
      <h-album :data="data" theme="dark" />
    </el-col>
  </el-row>
</template>
```

## 事件

<template>
  <code-box title="基础用法" description="相册控件">
    <p>
      <el-button type="default" @click="selected">
        第一项
      </el-button>
      <el-button type="default" @click="prevPage">
        上一页
      </el-button>
      <el-button type="default" @click="nextPage">
        下一页
      </el-button>
      <el-button type="default" @click="prev">
        上一个
      </el-button>
      <el-button type="default" @click="next">
        下一个
      </el-button>
      <el-button type="default" @click="reset">
        重置
      </el-button>
      <span class="h-demo-key" v-text="key" />
    </p>
    <h-album :data="data" theme="light" ref="album" :currentIndex="16" @on-change="handleOnChange" :before-change="beforeChange" />
  </code-box>
</template>

```html
<template>
  <p>
    <el-button type="default" @click="selected">第一项</el-button>
    <el-button type="default" @click="prevPage">上一页</el-button>
    <el-button type="default" @click="nextPage">下一页</el-button>
    <el-button type="default" @click="prev">上一个</el-button>
    <el-button type="default" @click="next">下一个</el-button>
    <el-button type="default" @click="reset">重置</el-button>
    <span class="h-demo-key" v-text="key" />
  </p>
  <h-album
    :data="data"
    theme="light"
    ref="album"
    :currentIndex="16"
    @on-change="handleOnChange"
  />
</template>

<script>
  export default {
    data() {
      return {
        data: [],
        key: 16
      };
    },
    created() {
      for (let index = 0; index < 30; index++) {
        this.data.push({
          title: `${index}`,
          url: '/hui-pro/images/home-image-blue.png',
          key: index
        });
      }
    },
    methods: {
      prevPage() {
        this.$refs.album.$prevPage();
      },
      nextPage() {
        this.$refs.album.$nextPage();
      },
      prev() {
        this.$refs.album.$prev();
      },
      next() {
        this.$refs.album.$next();
      },
      selected() {
        this.$refs.album.$selected(0);
      },
      handleOnChange(item) {
        this.key = item.key;
      },
      reset() {
        this.$refs.album.$reset();
      }
    }
  };
</script>
```

## 自定义内容

<template>
  <code-box
    title="自定义内容"
    description="通过`slot-scope`获取控件内部数据，`scope`名可根据开发者业务随意命名，其数据与`data`中当前项`item`数据一致，开发者可根据业务需求任意修改自定义项内容，默认自带active框，如果特殊需求可自行覆盖取消默认active"
  >
    <h-album :data="data" theme="light">
      <template slot="prev" slot-scope="{ disabled }">
        <button type="button" :disabled="disabled">
          上一页
        </button>
      </template>
      <template slot="item" slot-scope="{ item, active }">
        <h-img-view :src="item.url" :title="item.title" mode="contain" />
        <div class="h-demo-album-title">{{ item.title }} {{ active }}</div>
      </template>
      <template slot="next" slot-scope="{ disabled }">
        <button type="button" :disabled="disabled">
          下一页
        </button>
      </template>
    </h-album>
  </code-box>
</template>

```html
<template>
  <h-album :data="data" theme="light">
    <template slot="prev" slot-scope="{ disabled }">
      <button type="button" :disabled="disabled">上一页</button>
    </template>
    <template slot="item" slot-scope="{ item, active }">
      <h-img-view :src="item.url" :title="item.title" mode="contain" />
      <div class="h-demo-album-title">{{ item.title }} {{ active }}</div>
    </template>
    <template slot="next" slot-scope="{ disabled }">
      <button type="button" :disabled="disabled">下一页</button>
    </template>
  </h-album>
</template>

<style lang="scss" scoped>
  .h-demo-album-title {
    position: absolute;
    bottom: 0;
  }
</style>
```

<style lang="scss" scoped>
  .h-demo-block-line {
    height: 130px;
  }
  .h-demo-key {
    margin-left: 8px;
  }
  .h-demo-album-title{
    position: absolute;
    bottom: 0;
  }
</style>

<script>
  const versions = require('docs/.vuepress/src/version.json');
  const homeImageBlue = require('docs/.vuepress/public/images/home-image-blue.png');
  export default {
    data() {
      return {
        versions,
        data: [],
        key: 16
      };
    },
    created() {
      for (let index = 0; index < 30; index++) {
        this.data.push({
          title: `${index}`,
          url: homeImageBlue,
          key: index
        });
      }
    },
    methods: {
      prevPage() {
        this.$refs.album.$prevPage();
      },
      nextPage() {
        this.$refs.album.$nextPage();
      },
      prev() {
        this.$refs.album.$prev();
      },
      next() {
        this.$refs.album.$next();
      },
      selected() {
        this.$refs.album.$selected(0);
      },
      handleOnChange(item) {
        this.key = item.key;
      },
      reset() {
        this.$refs.album.$reset();
      },
      beforeChange() {
        return new Promise((resolve) => {
          resolve();
        });
      }
    }
  };
</script>

## API

::: tip

Album 继承 ImgView，支持 ImgView 所有属性

:::

### Attributes

| 参数                                     | 说明                              | 类型         | 可选值                        | 默认值           |
| ---------------------------------------- | --------------------------------- | ------------ | ----------------------------- | ---------------- |
| **data**                                 | 数据                              | Array        | \[]                           | -                |
| data-props                               | 数据 key 值别名                   | Object       | -                             | 对应 data key 名 |
| theme                                    | 主题                              | Fixed:String | 'light', 'light-gray', 'dark' | -                |
| current-index                            | 当前项索引，支持 `sync` 修饰符    | Number       | 0                             | -                |
| img-size                                 | 缩略图尺寸                        | Object       | { width: 72, height: 72 }     | -                |
| always-center                            | 始终保持居中对齐                  | Boolean      | false                         | -                |
| shadow                                   | 是否显示蒙层                      | Boolean      | true                          | -                |
| before-change                            | change 触发前钩子，返回 `Promise` | Function     | -                             | -                |
| single-hide-btn <Badge text="1.16.2+" /> | 当只有一页时是否隐藏左右两侧按钮  | Boolean      | false                         | -                |

### Rewrite Attributes

| 参数       | 原默认值 | 现默认值 |
| ---------- | -------- | -------- |
| empty-size | 'fit'    | 'xs'     |
| mode       | 'adjust' | 'cover'  |
| lazyload   | false    | true     |

::: tip

为提高加载性能，`lazyload` 默认是开启的。开启后当图片首次加载或加载过慢时会出现短暂占位图闪烁，若想提高视觉体验可将 `lazyload` 关闭，来达到图片预加载效果。利弊使用者自行把控。

:::

### extends Attributes

- [ImgView API](/zh/widget/image/img-view.html#api)

### dataProps

| key   | 说明                      | 可选值 | 默认值 |
| ----- | ------------------------- | ------ | ------ |
| title | 图片 title                | -      | title  |
| type  | 图片类型                  | -      | type   |
| url   | 图片 src 地址 或 视频地址 | -      | url    |
| key   | 唯一标识                  | -      | key    |

### Event

| 事件名    | 说明           | 值     |
| --------- | -------------- | ------ |
| on-change | 选中项变化回调 | 数据项 |

### Ref Event

| 事件名     | 说明       | 参数             |
| ---------- | ---------- | ---------------- |
| \$prevPage | 上一页     | -                |
| \$nextPage | 下一页     | -                |
| \$prev     | 上一个     | -                |
| \$next     | 下一个     | -                |
| \$selected | 选中某一项 | index:选中项索引 |
| \$reset    | 重置控件   | -                |

### Slots

| 插槽名称                      | 说明       | scope       |
| ----------------------------- | ---------- | ----------- |
| item                          | 自定义项   | item,active |
| prev <Badge text="1.16.2+" /> | 前一页按钮 | disabled    |
| next <Badge text="1.16.2+" /> | 下一页按钮 | disabled    |
