# Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

## 线形进度条 — 百分比外显

<template>
  <code-box
    description="`percentage`属性用于设置进度条的百分比, `status`属性赋值'exception'可以将进度条设置为'异常'状态, `color`属性用于设置进度条的颜色, 若要设置进度条为圆角请将`stroke-linecap`赋值为'round'">
    <el-progress :percentage="0"></el-progress>
    <el-progress :percentage="100"></el-progress>
    <el-progress :percentage="50" status="exception" status-text="异常"></el-progress>
  </code-box>
</template>

```vue
<template>
    <el-progress :percentage="0"></el-progress>
    <el-progress :percentage="100"></el-progress>
    <el-progress :percentage="50" status="exception" status-text="异常"></el-progress>
</template>
```

## 线形进度条 — 垂直布局 <Badge text="2.0+"/>

<template>
  <code-box
    description="通过设置`vertical-align`属性可以改变线形进度条的布局">
    <el-progress :percentage="100" vertical-align></el-progress>
    <el-progress :percentage="50" status="exception"  status-text="异常" vertical-align></el-progress>
  </code-box>
</template>

```vue
<template>
  <el-progress :percentage="100" vertical-align></el-progress>
  <el-progress :percentage="50" status="exception"  status-text="异常" vertical-align></el-progress>
</template>
```

<!-- ## 线形进度条 — 百分比内显

百分比不占用额外控件，适用于文件上传等场景。

<template>
  <code-box
    description="`stroke-width`可以设置进度条的线宽, 并可通过`text-inside`属性将进度条描述置于进度条内部">
    <el-progress :text-inside="true" :stroke-width="18" :percentage="0"></el-progress>
    <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
    <el-progress :text-inside="true" :stroke-width="18" :percentage="100"></el-progress>
    <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
  </code-box>
</template>

```vue
<template>
  <el-progress :text-inside="true" :stroke-width="18" :percentage="0"></el-progress>
  <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
  <el-progress :text-inside="true" :stroke-width="18" :percentage="100"></el-progress>
  <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
</template>
``` -->
## 线形进度条 — 小型进度条 <Badge text="2.0+"/>
<template>
  <code-box
    description="使用小型进度条需要设置`small`属性, 暂时只支持<b>线形非内显进度条</b>">
    <el-progress small :percentage="50"></el-progress>
    <el-progress small :percentage="70" status="exception"><span slot="text">失败</span></el-progress>
  </code-box>
</template>

```vue
<template>
    <el-progress small :percentage="50"></el-progress>
    <el-progress small :percentage="70" status="exception"><span slot="text">失败</span></el-progress>
</template>
```

## 环形进度条

<template>
  <code-box
    description="设置`type`属性为circle可以使用环形进度条">
    <el-progress type="circle" :percentage="10"></el-progress>
    <el-progress type="circle" :percentage="100"></el-progress>
    <el-progress type="circle" :percentage="50" status="exception"></el-progress>
    <el-progress type="circle" :percentage="25" stroke-linecap="round">
      <span slot="text">text</span>
    </el-progress>
  </code-box>
</template>

```vue
<template>
    <el-progress type="circle" :percentage="10"></el-progress>
    <el-progress type="circle" :percentage="100"></el-progress>
    <el-progress type="circle" :percentage="50" status="exception"></el-progress>
    <el-progress type="circle" :percentage="25" stroke-linecap="round">
      <span slot="text">text</span>
    </el-progress>
<template/>>
```

## 自定义内容显示 <Badge text="2.0+"/>

<template>
  <code-box
    description="如果要自定义显示内容, 请使用`text slot`">
    <el-progress :percentage="80" class="custom-progress">
      <span slot="text" title="内容很长的文字内容很长的文字内容很长的文字">内容很长的文字内容很长的文字内容很长的文字</span>
    </el-progress>
    <el-progress :percentage="50" :stroke-width="strokeWidth" status="exception" vertical-align>
      <span slot="text" title="slot title">自定义内容</span>
    </el-progress>
  </code-box>
</template>

```vue
<template>
  <el-progress :percentage="80" class="custom-progress">
    <span slot="text" title="内容很长的文字内容很长的文字内容很长的文字">内容很长的文字内容很长的文字内容很长的文字</span>
  </el-progress>
  <el-progress :percentage="50" :stroke-width="strokeWidth" status="exception" vertical-align>
    <span slot="text" title="slot title">自定义内容</span>
  </el-progress>
</template>

```
## 动态进度条 <Badge text="2.0+"/>

在无法获取加载时长的情况下，使用动态进度条样式，直至加载完成，进度条消失，显示加载后的内容

<template>
  <code-box
    description="设置`dynamic`属性来使用动态进度条">
    <el-progress dynamic :duration="2"></el-progress>
  </code-box>
</template>

```vue
<template>
    <el-progress dynamic :duration="2"></el-progress>
</template>

```

<script>
  export default {
    data () {
      return {
        strokeWidth: 12
      }
    }
  };
</script>

<style lang="scss">
  .demo-progress {
    .el-progress--line {
      margin-bottom: 15px;
      width: 400px;
    }
  }
</style>

## API

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| percentage  | 百分比 | number  | 0-100 | 0 |
| type  | 进度条类型    | string   | line/circle | line |
| stroke-width  | 普通进度条的高度（环形圆环的内宽度），单位 px  | number   | — | 12 |
| stroke-linecap <Badge text="2.0+"/>	  | 进度条采用圆角或方角 | string | square/round | square |
| text-inside  | 将进度条描述置于进度条内部（只在 type='line' 时可用） | Boolean  | — | false |
| color <Badge text="2.0+"/> |进度条背景色（会覆盖 status 状态颜色） | string  | — | — |
| background <Badge text="2.16+"/> |可覆盖background颜色，实现渐变的等效果 | string  | — | — |
| vertical-align <Badge text="2.0+"/>	  | 进度条文字是否显示在进度条的下方(只在 type=line 时可用)| boolean | — | false |
| status  | 进度条当前状态    | string   | exception/success | — |
| status-text <Badge text="2.0+"/> | 配合status使用, 进度条状态图标后的文字部分   | string   | — | — |
| width  | 环形进度条画布宽度（只在 type='circle' 时可用）  | number | — | 160 |
| show-text	  | 是否显示进度条文字内容 | boolean | — | true |
| small	<Badge text="2.0+"/>  | 使用小型进度条, 暂时只支持线形非内显进度条 | boolean | — | false |
| dynamic	<Badge text="2.0+"/>  | 使用动态进度条（只在 type='line' 时可用） | boolean | — | false |
| duration	<Badge text="2.0+"/>  | 设置动态进度条一次的播放时间，即 animation-duration ，单位为秒 | number | — | 1.5 |


### Slot
| name | 说明 |
|------|--------|
| text <Badge text="2.0+"/>| 进度条的文字部分 |
