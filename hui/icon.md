# Icon 图标

## 基础用法

提供了一套常用的图标集合。

<template>
  <code-box title="提供了一套常用的图标集合" description="直接通过设置类名为 `h-icon-iconName` 来使用即可">
    <i class="h-icon-edit"></i>
    <i class="h-icon-delete"></i>
    <i class="h-icon-add"></i>
    <el-button type="primary" icon="h-icon-search">搜索</el-button>
  </code-box>
</template>

``` html
<i class="h-icon-edit"></i>
<i class="h-icon-delete"></i>
<i class="h-icon-add"></i>
<el-button type="primary" icon="h-icon-search">搜索</el-button>
```

## Common 图标
<template>
  <code-box title="Common 图标" description="通用图标">
    <ul class="icon-list">
      <li v-for="name in icons" :key="name">
        <span>
        <i :class="name"></i>
        {{name}}
        </span>
      </li>
    </ul>
  </code-box>
</template>

``` html
<i class="h-icon-edit"></i>
```

## Info 图标
<template>
  <code-box title="Info 图标" description="信息图标">
    <ul class="icon-list">
      <li v-for="name in infoIcons" :key="name">
        <span>
        <i :class="name"></i>
        {{name}}
        </span>
      </li>
    </ul>
  </code-box>
</template>

``` html
<i class="h-icon-info_liveview"></i>
```

## feedback 图标

<template>
  <code-box title="feedback 图标" description="反馈图标">
    <ul class="icon-list">
      <li v-for="name in feekbackIcons" :key="name">
        <span>
        <h-feedback-icon :icon-name="name" />
        {{name}}
        </span>
      </li>
    </ul>
  </code-box>
</template>

``` html
<h-feedback-icon icon-name="feedback_success_lg" />
<!-- 或者 -->
<h-feedback-icon icon-name="h-icon-feedback_success_lg" />
```

<script>
  var iconList = require('docs/.vuepress/public/data/icon.json');
  var infoIcons = require('docs/.vuepress/public/data/icon_info.json');
  var feekbackIcons = require('docs/.vuepress/public/data/icon_feedback.json');
  export default {
    data() {
      return {
        icons: iconList,
        infoIcons,
        feekbackIcons
      };
    }
  }
</script>

<style lang="scss" scoped>
  .demo-icon {
    .code-box-demo > i {
      font-size: 24px;
      color: #444;
      margin: 0 20px;
      vertical-align: middle;
    }
    .icon-list i {
      display: block;
      font-size: 24px;
      margin-bottom: 15px;
      color: #444;
      &[class^='h-icon-feedback'],
      &[class*=' h-icon-feedback'] {
        width: 24px;
        margin-left: auto;
        margin-right: auto;
      }
    }
    .icon-list span {
      display: inline-block;
      line-height: normal;
      vertical-align: middle;
      font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',SimSun,sans-serif;
      color: #444;
    }
    .code-box-demo > button {
      margin: 0 20px;
    }
    .icon-list {
      overflow: hidden;
      list-style: none;
      padding: 0 !important;
      border: solid 1px #eaeefb;
      border-radius: 4px;
    }
    .icon-list li {
      float: left;
      width: 16.66%;
      text-align: center;
      height: 120px;
      line-height: 120px;
      color: #444;
      font-size: 13px;
      transition: color .15s linear;

      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      margin-right: -1px;
      margin-bottom: -1px;
      box-sizing: content-box;
    }
  }
</style>
