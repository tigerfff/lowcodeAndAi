# VehiclePlateTag 车辆牌照标签

<template>
  <author-info
    :version="versions['vehicle-plate-tag']"
    author="叶波"
    ux="刘俊森"
    ui="刘俊森、曾芬"
    standard="http://ga-gitlab.hikvision.com/PBG_UX/Design_Guideline_GUI_Senior/issues/65"
    reviewed
  />
</template>

## 安装

```bash
$ npm i @hui-pro/vehicle-plate-tag -D
# 或者
yarn add @hui-pro/vehicle-plate-tag --dev
```

## 引入

```js
import VehiclePlateTag from '@hui-pro/vehicle-plate-tag';
import '@hui-pro/vehicle-plate-tag/theme/index.scss';
Vue.use(VehiclePlateTag);
```

## 基本用法

<template>
  <code-box>
    <h-vehicle-plate-tag color="blue" value="浙A59191" />
    <h-vehicle-plate-tag color="yellow" value="浙A59191" />
    <h-vehicle-plate-tag color="white" value="浙A59191" />
    <h-vehicle-plate-tag color="black" value="浙A59191" />
    <h-vehicle-plate-tag color="green" value="浙A59191" />
    <h-vehicle-plate-tag color="newgreen" value="浙A591917" />
    <h-vehicle-plate-tag color="yellowgreen" value="浙A591918" />
    <h-vehicle-plate-tag color="other" value="浙A59191" />
  </code-box>
</template>

```html
<template>
  <h-vehicle-plate-tag color="blue" value="浙A59191" />
  <h-vehicle-plate-tag color="yellow" value="浙A59191" />
  <h-vehicle-plate-tag color="white" value="浙A59191" />
  <h-vehicle-plate-tag color="black" value="浙A59191" />
  <h-vehicle-plate-tag color="green" value="浙A59191" />
  <h-vehicle-plate-tag color="newgreen" value="浙A591917" />
  <h-vehicle-plate-tag color="yellowgreen" value="浙A591918" />
  <h-vehicle-plate-tag color="other" value="浙A59191" />
</template>
```

## 自定义内容

<template>
  <code-box>
    <h-vehicle-plate-tag color="blue">
      浙A59191
    </h-vehicle-plate-tag>
    <h-vehicle-plate-tag color="black">
      浙A59191
      <span style="color:#fa3239">领</span>
    </h-vehicle-plate-tag>
  </code-box>
</template>

```html
<h-vehicle-plate-tag color="blue">
  浙A59191
</h-vehicle-plate-tag>
<h-vehicle-plate-tag color="black">
  浙A59191
  <span style="color:#fa3239">领</span>
</h-vehicle-plate-tag>
```

<script>
  const versions = require('docs/.vuepress/src/version.json');
  export default {
    data() {
      return {
        versions
      }
    }
  }
</script>

## API

### Attributes

| 参数  | 说明     | 类型   | 可选值                                                   | 默认值 |
| ----- | -------- | ------ | -------------------------------------------------------- | ------ |
| value | 车牌号码 | String | -                                                        | -      |
| color | 车牌颜色 | String | blue/yellow/white/black/green/newgreen/yellowgreen/other | blue   |

### Slots

| 插槽名称                         | 说明       |
| -------------------------------- | ---------- |
| default <Badge text="1.11.2+" /> | 自定义内容 |
