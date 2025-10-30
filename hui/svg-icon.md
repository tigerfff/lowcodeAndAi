# SVG 图标

## v2.1 非兼容性更新

::: tip SVG 改造通知
从 HUI v2.1 版本开始，SVG 图标进行了非兼容性更新，将 SVG 图标从 HUI 解耦，若要使用 SVG 图标，将要额外依赖控件 `@hui/svg-icon`。

具体使用方式参考 [@hui/svg-icon 用法](#hui-svg-icon-用法)

设计思路可以参考 U+ 文章 [HUI v2.1 SVG 图标改造](http://uplus.hikvision.com.cn/#community/article?id=7190c469-dac0-4313-a16f-715743dfecd8)
:::

## 预定义图标

<template>
  <code-box title="预定义图标" description="使用 svg-icon 提供的预定义图标，在 <h-svg-icon> 中包裹图标控件即可。">
    <h-svg-icon>
      <svg-box-camera />
    </h-svg-icon>
    <h-svg-icon>
      <svg-box-camera />
      <svg-state-cascade />
    </h-svg-icon>
    <h-svg-icon>
      <svg-box-camera />
      <svg-state-no-longitude-and-latitude />
    </h-svg-icon>
    <h-svg-icon>
      <svg-box-camera />
      <svg-state-cascade />
      <svg-state-no-longitude-and-latitude />
    </h-svg-icon>
  </code-box>
</template>

``` html
<h-svg-icon>
  <svg-box-camera />
</h-svg-icon>
<h-svg-icon>
  <svg-box-camera />
  <svg-state-cascade />
</h-svg-icon>
<h-svg-icon>
  <svg-box-camera />
  <svg-state-no-longitude-and-latitude />
</h-svg-icon>
<h-svg-icon>
  <svg-box-camera />
  <svg-state-cascade />
  <svg-state-no-longitude-and-latitude />
</h-svg-icon>
```

<!-- ## 离线状态

<template>
  <code-box title="离线状态" description="通过 `offline` 可以设置图标为离线状态。">
    <h-svg-icon offline>
      <svg-box-camera />
    </h-svg-icon>
    <h-svg-icon offline>
      <svg-box-camera />
      <svg-state-cascade />
    </h-svg-icon>
    <h-svg-icon offline>
      <svg-box-camera />
      <svg-state-no-longitude-and-latitude />
    </h-svg-icon>
    <h-svg-icon offline>
      <svg-box-camera />
      <svg-state-cascade />
      <svg-state-no-longitude-and-latitude />
    </h-svg-icon>
  </code-box>
</template>

``` html
<h-svg-icon offline>
  <svg-box-camera />
</h-svg-icon>
<h-svg-icon offline>
  <svg-box-camera />
  <svg-state-cascade />
</h-svg-icon>
<h-svg-icon offline>
  <svg-box-camera />
  <svg-state-no-longitude-and-latitude />
</h-svg-icon>
<h-svg-icon offline>
  <svg-box-camera />
  <svg-state-cascade />
  <svg-state-no-longitude-and-latitude />
</h-svg-icon>
``` -->

## 修改颜色

<template>
  <code-box title="修改颜色" description="通过 `colors` 可以修改图标颜色。">
    <h-svg-icon>
      <svg-box-camera color="#2196f3" />
    </h-svg-icon>
    <h-svg-icon>
      <svg-box-camera color="#6f7e91" />
      <svg-state-cascade color="#e72528" />
    </h-svg-icon>
    <h-svg-icon>
      <svg-box-camera color="#2196f3" />
      <svg-state-no-longitude-and-latitude />
    </h-svg-icon>
    <h-svg-icon>
      <svg-box-camera color="#e72528" />
      <svg-state-cascade color="#ff952c" />
      <svg-state-no-longitude-and-latitude color="#2196f3" />
    </h-svg-icon>
  </code-box>
</template>

``` html
<h-svg-icon>
  <svg-box-camera color="#2196f3" />
</h-svg-icon>
<h-svg-icon>
  <svg-box-camera color="#6f7e91" />
  <svg-state-cascade color="#e72528" />
</h-svg-icon>
<h-svg-icon>
  <svg-box-camera color="#2196f3" />
  <svg-state-no-longitude-and-latitude />
</h-svg-icon>
<h-svg-icon>
  <svg-box-camera color="#e72528" />
  <svg-state-cascade color="#ff952c" />
  <svg-state-no-longitude-and-latitude color="#2196f3" />
</h-svg-icon>
```

## 外部引入图标

<template>
  <code-box title="外部引入图标" description="通过 `require` 的形式加载图标。">
    <h-svg-icon :svgs="svgs11" />
    <h-svg-icon :svgs="svgs12" />
  </code-box>
</template>

``` html
<h-svg-icon :svgs="svgs11" />
<h-svg-icon :svgs="svgs12" />
<script>
export default {
  data() {
    return {
      svgs11: require('../../assets/svg/tree_main_organization.svg'),
      svgs12: [
        require('../../assets/svg/tree_main_organization.svg'),
        require('../../assets/svg/tree_state_cascade.svg')
      ]
    };
  }
}
</script>
```

::: tip 外部引入图标 webpack 配置
当需要使用外部引入的 svg 时，需要在 webpack 中做如下配置(以 vue-cli3 脚手架为例)：
- 将外部引入 svg 的文件夹路径排除用 `file-loader` 加载
- 将外部引入 svg 的文件夹路径设置为用 `raw-loader` 加载
:::

```js
// 外部引入 svg 的文件路径下的 svg 因为需要加载源码，所以不能用 file-loader
webpackConfig.module
  .rule('svg')
  .exclude
  .add(path.resolve(__dirname, `${path}`)) // ${path} 为外部引入 svg 的文件夹路径
  .end()
  .use('file-loader')
  .end();

// 外部引入 svg 的文件路径用 raw-loader 读取 SVG 源代码
webpackConfig.module.rule("svgicon")
  .test(/\.(svg)(\?.*)?$/)
  .include
  .add(path.resolve(__dirname, `${path}`)) // ${path} 外部引入 svg 的文件夹路径
  .end()
  .use("raw-loader")
  .loader("raw-loader")
  .end()
```

::: warning 注意
需要保证外部引入的多个 svg 图标 `<path>` 标签上的 `id` 不能重复，若重复了会导致多个图形都会重复图标的问题。
:::

## @hui/svg-icon 用法

### 安装

```bash
npm install @hui/svg-icon
```

### main.js 中引入

分为按需引入和全量引入

`按需引入：`

```js
import { SvgAccessControl, SvgStateAlarm } from '@hui/svg-icon'
Vue.component(SvgAccessControl.name, SvgAccessControl);
Vue.component(SvgStateAlarm.name, SvgStateAlarm);
```

`全量引入：`

```js
import icons from '@hui/svg-icon'
for (let icon of icons) {
  Vue.component(icon.name, icon);
}
```

### vue 文件中引入

vue 文件中只能 `按需引入：`

```js
import { SvgAccessControl, SvgStateAlarm } from '@hui/svg-icon'
export default {
  name: 'app',
  components: { SvgAccessControl, SvgStateAlarm }
}
```

### 样式文件引入

```js
import '@hui/svg-icon/lib/svg-icon.css'
```

## 主形图标（@hui/svg-icon）
<template>
  <code-box title="主形图标" description="SVG 主形图标">
    <ul class="svg-icon-list">
      <template v-for="icon in icons">
        <li :key="icon.name" v-if="!icon.name.includes('SvgState')">
          <component :is="icon" />
          <span class="svg-icon-name">{{camelcase2Line(icon.name)}}</span>
        </li>
      </template>
    </ul>
  </code-box>
</template>

``` html
<svg-box-camera />
```

## 辅形图标（@hui/svg-icon）
<template>
  <code-box title="辅形图标" description="SVG 辅形图标">
    <ul class="svg-icon-list">
      <template v-for="icon in icons">
        <li :key="icon.name" v-if="icon.name.includes('SvgState')">
          <component :is="icon" />
          <span class="svg-icon-name">{{camelcase2Line(icon.name)}}</span>
        </li>
      </template>
    </ul>
  </code-box>
</template>

``` html
<svg-state-cascade />
```

## 动态图标
<template>
  <code-box title="动态图标" description="SVG 动态图标">
    <h-svg-icon>
      <component :is="dynamicIcon" />
    </h-svg-icon>
  </code-box>
</template>

``` html
<h-svg-icon>
  <component :is="dynamicIcon" />
</h-svg-icon>
<script>
export default {
  data() {
    return {
      dynamicIcon: 'svg-camera'
    };
  }
}
</script>
```

<script>
  import svgIcons from '@hui/svg-icon'
  export default {
    data() {
      return {
        icons: svgIcons,
        svgs11: require('../../assets/svg/tree_main_organization.svg'),
        svgs12: [require('../../assets/svg/tree_main_organization.svg'), require('../../assets/svg/tree_state_cascade.svg')],
        dynamicIcon: 'svg-camera'
      };
    },
    methods: {
      camelcase2Line (str) {
        return str.replace(/([A-Z])/g,"-$1").toLowerCase().substr(1);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .demo-svg-icon {
    .h-svg-icon-wrapper,
    svg {
      margin-right: 12px;
    }
    .svg-icon-list {
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      padding: 0 8px;
      overflow: hidden;
      list-style: none;
      li {
        width: 50%;
        line-height: 40px;
      }
      .svg-icon-name {
        position: relative;
        top: -2px;
      }
    }
  }
</style>

## API

### h-svg-icon Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| svgs | 图标名或者图标引用 | String/Array | - | - |
| size | 图标尺寸 | [Number/string] | - | 24 |
| offline | 是否为离线状态 | Boolean | - | false |
| active | 是否为激活状态（给树图标使用） | Boolean | - | false |
| colors | 图标的颜色 | String/Array | - | - |
| classes | 图标的样式类 | String/Array | - | - |

### @hui/svg-icon Attribute
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| size | 图标尺寸 | String | - | '24px' |
| color | 图标的颜色 | String | - | - |
