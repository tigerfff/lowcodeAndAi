# Scrollbar 滚动条

模拟实现的滚动条，以取代浏览器原生滚动条

## 外部容器高度、宽度固定

<template>
  <code-box
    title="外部容器高度、宽度固定"
    description="要使用 Scrollbar 组件，只需要在实际内容区外增加`el-scrollbar`标签,最终在实际内容区(这里指`li`)外增加两层div,外层为wrap，内层view。`wrap-class`用于设置外层wrap的class,默认为`el-scrollbar__wrap`;`view-class`用于设置内层view的class,默认为`el-scrollbar__view`;`tag`用于设置view层的标签，默认为`div`。使用时保证wrap层的大小与外部容器大小一致。"
  >
    <el-scrollbar wrap-class="demo-scrollbar-wrap">
      <ul class="items">
        <li>Radio单选框</li>
        <li>Checkbox多选框</li>
        <li>Input输入框</li>
        <li>InputNumber计数器</li>
        <li>Select选择器</li>
        <li>Cascader级联选择器</li>
        <li>Switch开关</li>
        <li>Slider滑块</li>
        <li>TimePicker时间选择器</li>
        <li>DatePicker日期选择器</li>
        <li>DateTimePicker日期时间选择器</li>
        <li>Upload上传</li>
      </ul>
    </el-scrollbar>
  </code-box>
</template>

```vue
<el-scrollbar wrap-class="demo-scrollbar-wrap">
  <ul class="items">
    <li>Radio单选框</li>
    <li>Checkbox多选框</li>
    <li>Input输入框</li>
    <li>InputNumber计数器</li>
    <li>Select选择器</li>
    <li>Cascader级联选择器</li>
    <li>Switch开关</li>
    <li>Slider滑块</li>
    <li>TimePicker时间选择器</li>
    <li>DatePicker日期选择器</li>
    <li>DateTimePicker日期时间选择器</li>
    <li>Upload上传</li>
  </ul>
</el-scrollbar>

<style>
.demo-scrollbar-wrap {
  height: 200px;
}
.items {
  width: 1500px;
}
</style>
```

## 外部容器高度、宽度不固定

<template>
  <code-box
    title="外部容器高度、宽度不固定"
    description="如果外层没有容器,或者外部容器高度、宽度不固定,可以设置wrap的高度、宽度,或者最大高度、最小高度。"
  >
    <el-scrollbar wrap-class="demo-scrollbar-wrap-2">
      <ul>
        <li>Radio单选框</li>
        <li>Checkbox多选框</li>
        <li>Input输入框</li>
        <li>InputNumber计数器</li>
        <li>Select选择器</li>
        <li>Cascader级联选择器</li>
        <li>Switch开关</li>
        <li>Slider滑块</li>
        <li>TimePicker时间选择器</li>
        <li>DatePicker日期选择器</li>
        <li>DateTimePicker日期时间选择器</li>
        <li>Upload上传</li>
      </ul>
    </el-scrollbar>
  </code-box>
</template>

```vue
<el-scrollbar wrap-class="demo-scrollbar-wrap-2">
  <ul>
    <li>Radio单选框</li>
    <li>Checkbox多选框</li>
    <li>Input输入框</li>
    <li>InputNumber计数器</li>
    <li>Select选择器</li>
    <li>Cascader级联选择器</li>
    <li>Switch开关</li>
    <li>Slider滑块</li>
    <li>TimePicker时间选择器</li>
    <li>DatePicker日期选择器</li>
    <li>DateTimePicker日期时间选择器</li>
    <li>Upload上传</li>
  </ul>
</el-scrollbar>

<style>
.demo-scrollbar-wrap-2 {
  max-height: 200px;
}
</style>
```

## 锚点定位

<template>
  <code-box title="内容巨多时，滚动条自动限制bar具有最小高度，从而方便交互操作">
    <el-scrollbar
      overflow-y="scroll"
      wrap-class="demo-scrollbar-wrap"
      ref="scrollbar"
    >
      <ul>
        <li v-for="(d,i) in huge" :key="i">{{d}}</li>
      </ul>
    </el-scrollbar>
    <p>调整内容至距离顶部X(px)位置:</p>
    <el-input
      v-model="xtop"
      style="width: 180px;"
      placeholder="请输入内容"
    ></el-input>
    <el-button @click="setScroll">调整滚动条</el-button>
  </code-box>
</template>

```vue
<el-scrollbar
  overflow-y="scroll"
  wrap-class="demo-scrollbar-wrap"
  ref="scrollbar"
>
  <ul>
    <li v-for="(d,i) in huge" :key="i">{{d}}</li>
  </ul>
</el-scrollbar>

<script>
export default {
  data() {
    return {
      huge: [],
      xtop: 0
    };
  },
  methods: {
    setScroll() {
      this.$refs.scrollbar.setScroll(this.xtop);
    }
  },
  mounted() {
    var data = [];
    for (var i = 0; i < 100; i++) {
      data.push('100条数据');
    }
    this.huge = data;
  }
};
</script>
```

<script>
    export default {
        data() {
            return {
                huge: [],
                xtop:0
            }
        },
        methods : {
            setScroll(){
                this.$refs.scrollbar.setScroll(this.xtop)
            }
        },
        mounted(){
            var data = [];
            for(var i=0;i<100;i++){
                data.push('100条数据')
            };
            this.huge = data;
        }
    }
</script>

<style lang="scss">
  .demo-scrollbar {
    ul,
    ul li{
        list-style: none;
        padding: 0;
        margin: 0
    }
    .el-scrollbar{
      border:1px solid #dedede;
    }
    .items{
      width: 1500px;
    }
    .demo-scrollbar-wrap {
      height: 200px;
    }
    ul{
      padding: 8px;
    }
    li {
        height:30px;
    }
    .demo-scrollbar-wrap-2 {
        max-height: 200px;
    }
  }
</style>

### Scrollbar Attributes

| 参数                                               | 说明                                                     | 类型      | 可选值                                | 默认值                    |
| ------------------------------------------------ | ------------------------------------------------------ | ------- | ---------------------------------- | ---------------------- |
| tag                                              | 设置 view 层的标签                                           | String  | —                                  | "div"                  |
| viewClass                                        | 设置滚动条外层 view 的 class                                   | String  | —                                  | "el-scrollbar\_\_view" |
| viewStyle                                        | 设置滚动条外层 view 的样式                                       | Object  | —                                  | —                      |
| wrapStyle                                        | 设置滚动条外层 wrap 的样式                                       | Object  | —                                  | —                      |
| wrapClass                                        | 设置滚动条外层 wrap 的 class                                   | String  | —                                  | "el-scrollbar\_\_wrap" |
| size                                             | 滚动条纵向时的宽度和横向时的高度，单位 px，注：实际占位多出 8px                    | Number  | —                                  | 4                      |
| noresize                                         | 是否不监听 container 尺寸变化，如果 container 尺寸不会发生变化，最好设置它可以优化性能 | Boolean | —                                  | false                  |
| color                                            | 滚动条颜色，支持 16 进制颜色、rgb 和 rgba                            | String  | —                                  | rgba(0,0,0,.1)         |
| opacity                                          | 滚动条透明度                                                 | Number  | —                                  | 1                      |
| pieceColor                                       | 轨道颜色，支持 16 进制颜色、rgb 和 rgba                             | String  | —                                  | 默认透明即同容器背景色            |
| pieceOpacity                                     | 轨道透明度                                                  | Number  | —                                  | 1                      |
| minLength <Badge text="2.0+"/>                   | 滚动条滑块最小长度，单位 px                                        | Number  | —                                  | 24                     |
| overflow <Badge text="2.0+"/>                    | 当内容溢出元素框时发生的事情                                         | String  | 'auto','scroll','hidden','visible' | 'auto'                 |
| overflowX <Badge text="2.0+"/>                   | 当水平内容溢出元素框时发生的事情                                       | String  | 'auto','scroll','hidden','visible' | 'auto'                 |
| overflowY <Badge text="2.0+"/>                   | 当垂直内容溢出元素框时发生的事情                                       | String  | 'auto','scroll','hidden','visible' | 'auto'                 |
| extrusion <Badge text="2.0+"/>                   | 设置滚动条是否占据内容区区域                                         | Boolean | -                                  | false                  |
| ~~always-show~~<Badge text="移除" type="warning"/> | 始终显示滚动条还是鼠标移入才显示                                       | Boolean | —                                  | false                  |
| ~~isSmall~~<Badge text="移除" type="warning"/>     | 设置细滚动条                                                 | Boolean | —                                  | false                  |

### Scrollbar Overflow  <Badge text="2.0+"/>

| 参数      | 说明                        |
| ------- | ------------------------- |
| auto    | 如果内容被修剪，显示滚动条             |
| scroll  | 内容会被修剪，滚动条常驻              |
| hidden  | 内容会被修剪，并且其余内容是不可见的，不显示滚动条 |
| visible | 内容不会被修剪，会呈现在元素框之外，不显示滚动条  |

### Scrollbar Methods

| 参数        | 说明                                                  | 参数        |
| --------- | --------------------------------------------------- | --------- |
| setScroll | 设置滚动条坐标，传入坐标 x 和坐标 y（单位 px），如果小于 0 或者不传则不起作用，默认都是-1; duration设置滚动条滚动的速率，默认为120 | top, left, duration|

### Scrollbar Events

| 事件名称           | 说明                                         | 回调参数                                         |
| -------------- | ------------------------------------------ | -------------------------------------------- |
| on-scrolling-x | 横向滚动时触发事件,参数返回滚动距离和已滚动百分比（百分比为 1 则表示滚动到尽头） | {scrollLeft, percentX }                      |
| on-scrolling-y | 纵向滚动时触发事件,参数返回滚动距离和已滚动百分比（百分比为 1 则表示滚动到尽头） | {scrollTop, percentY }                       |
| on-scrolling   | 滚动时触发事件,参数返回滚动距离和已滚动百分比（百分比为 1 则表示滚动到尽头）   | {scrollLeft, scrollTop, percentX, percentY } |
| on-scrollbar-x   | 滚动条容器缩放过程中横向滚动条出现、消失的监听事件；当出现时，返回参数true，当消失时，返回参数false   | isShow |
| on-scrollbar-y   | 滚动条容器缩放过程中纵向滚动条出现、消失的监听事件；当出现时，返回参数true，当消失时，返回参数false   | isShow |
