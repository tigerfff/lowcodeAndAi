# ColorTag 颜色标签

<template>
  <author-info
    :version="versions['color-tag']"
    author="叶波"
    ux="刘俊森"
    ui="刘俊森、曾芬"
    standard="http://ga-gitlab.hikvision.com/PBG_UX/Design_Guideline_GUI_Senior/issues/65"
    reviewed
  />
</template>

## 安装

```bash
$ npm i @hui-pro/color-tag -D
# 或者
$ yarn add @hui-pro/color-tag --dev
```

## 引入

```js
import colorTag from '@hui-pro/color-tag';
import '@hui-pro/color-tag/theme/index.scss';
Vue.use(colorTag);
```

## 标注颜色标签(h-color-tag)

<template>
  <code-box  title="标注颜色标签" description="表示颜色选项集合">
    <div>
      <h-color-tag color="success">绿色</h-color-tag>
      <h-color-tag color="danger">红色</h-color-tag>
      <h-color-tag color="warning">橙色</h-color-tag>
      <h-color-tag color="info">蓝色</h-color-tag>
      <h-color-tag color="remind">黄色</h-color-tag>
      <h-color-tag color="white">白色</h-color-tag>
      <h-color-tag color="unknown">未知</h-color-tag>
      <h-color-tag color="#003399">其他</h-color-tag>
    </div>
    <div>
      <h-color-tag color="success" is-button>绿色</h-color-tag>
      <h-color-tag color="danger" is-button>红色</h-color-tag>
      <h-color-tag color="warning" is-button>橙色</h-color-tag>
      <h-color-tag color="info" is-button>蓝色</h-color-tag>
      <h-color-tag color="remind" is-button>黄色</h-color-tag>
      <h-color-tag color="white" is-button>白色</h-color-tag>
      <h-color-tag color="unknown" is-button>未知</h-color-tag>
      <h-color-tag color="#003399" is-button>其他</h-color-tag>
    </div>
  </code-box>
</template>

```html
<template>
  <div>
    <div>
      <h-color-tag color="success">绿色</h-color-tag>
      <h-color-tag color="danger">红色</h-color-tag>
      <h-color-tag color="warning">橙色</h-color-tag>
      <h-color-tag color="info">蓝色</h-color-tag>
      <h-color-tag color="remind">黄色</h-color-tag>
      <h-color-tag color="white">白色</h-color-tag>
      <h-color-tag color="unknown">未知</h-color-tag>
      <h-color-tag color="#003399">其他</h-color-tag>
    </div>
    <div>
      <h-color-tag color="success" is-button>绿色</h-color-tag>
      <h-color-tag color="danger" is-button>红色</h-color-tag>
      <h-color-tag color="warning" is-button>橙色</h-color-tag>
      <h-color-tag color="info" is-button>蓝色</h-color-tag>
      <h-color-tag color="remind" is-button>黄色</h-color-tag>
      <h-color-tag color="white" is-button>白色</h-color-tag>
      <h-color-tag color="unknown" is-button>未知</h-color-tag>
      <h-color-tag color="#003399" is-button>其他</h-color-tag>
    </div>
  </div>
</template>
```

## 选中颜色标签(h-color-tag-select)

<template>
  <code-box title="选中颜色标签" description="包装任意控件，表示该组件选中状态，通常为按钮组件被包装比较常见">
    <div>
      <h-color-tag-select :actived="actived" color="info"  @click="clickHander">
        <el-button icon="h-icon-search">Search</el-button>
      </h-color-tag-select>
      <h-color-tag-select :actived="actived" color="info"  @click="clickHander">
        <el-button size="mini">两行结构的新武警车</el-button>
      </h-color-tag-select>
      <h-color-tag-select :actived="actived" color="success"  @click="clickHander">
        <el-button icon="h-icon-search" size="mini">Search</el-button>
      </h-color-tag-select>
      <h-color-tag-select :actived="actived" color="danger"  @click="clickHander">
        <el-button icon="h-icon-search" size="mini">Search</el-button>
      </h-color-tag-select>
      <h-color-tag-select :actived="actived" color="warning"  @click="clickHander">
        <el-button icon="h-icon-search" size="mini">Search</el-button>
      </h-color-tag-select>
      <h-color-tag-select :actived="actived" color="remind"  @click="clickHander">
        <el-button icon="h-icon-search" size="mini">Search</el-button>
      </h-color-tag-select>
    </div>
  </code-box>
</template>

<script>
  export default {
    data(){
      return {
        actived: true
      }
    },
    methods: {
      clickHander(){
        this.actived=!this.actived;
      }
    }
  }
</script>

```html
<template>
  <div>
    <h-color-tag-select :actived="actived" color="info" @click="clickHander">
      <el-button icon="h-icon-search">Search</el-button>
    </h-color-tag-select>
    <h-color-tag-select :actived="actived" color="info" @click="clickHander">
      <el-button size="mini">两行结构的新武警车</el-button>
    </h-color-tag-select>
    <h-color-tag-select :actived="actived" color="success" @click="clickHander">
      <el-button icon="h-icon-search" size="mini">Search</el-button>
    </h-color-tag-select>
    <h-color-tag-select :actived="actived" color="danger" @click="clickHander">
      <el-button icon="h-icon-search" size="mini">Search</el-button>
    </h-color-tag-select>
    <h-color-tag-select :actived="actived" color="warning" @click="clickHander">
      <el-button icon="h-icon-search" size="mini">Search</el-button>
    </h-color-tag-select>
    <h-color-tag-select :actived="actived" color="remind" @click="clickHander">
      <el-button icon="h-icon-search" size="mini">Search</el-button>
    </h-color-tag-select>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        actived: true
      };
    },
    methods: {
      clickHander() {
        this.actived = !this.actived;
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
        actived: true
      }
    },
    methods: {
      clickHander(){
        this.actived=!this.actived;
      }
    }
  }
</script>

## ColorTag API

### 属性

| 参数      | 说明           | 类型    | 可选值                                                         | 默认值 |
| --------- | -------------- | ------- | -------------------------------------------------------------- | ------ |
| color     | 标签颜色       | String  | unknown/white/info/success/warning/danger/remind/16 进制颜色值 | info   |
| is-button | 是否是操作按钮 | Boolean | true/false                                                     | false  |

### 事件

| 参数  | 说明     | 回调参数 |
| ----- | -------- | -------- |
| click | 点击事件 | Event    |

## ColorTagSelect API

### 属性

| 参数    | 说明           | 类型    | 可选值                             | 默认值 |
| ------- | -------------- | ------- | ---------------------------------- | ------ |
| color   | 标签颜色       | String  | info/success/warning/danger/remind | info   |
| actived | 默认是否被激活 | Boolean | true/false                         | false  |

### 事件

| 参数  | 说明     | 回调参数 |
| ----- | -------- | -------- |
| click | 点击事件 | Event    |
