# Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

## 基础用法

在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

<template>
  <code-box title="基本用法" description="使用`content`属性来决定`hover`时的提示信息。由`placement`属性决定展示效果：`placement`属性值为：`方向-对齐位置`；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。如`placement='left-end'`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。">
  <div class="box">
    <div class="top">
      <el-tooltip class="item" content="Top Left 提示文字,Top Left 提示文字,Top Left 提示文字" placement="top-start">
        <el-button>上左</el-button>
      </el-tooltip>
      <el-tooltip class="item" content="Top Center 提示文字,Top Center 提示文字,Top Center 提示文字" placement="top">
        <el-button>上边</el-button>
      </el-tooltip>
      <el-tooltip class="item" content="Top Right 提示文字" placement="top-end">
        <el-button>上右</el-button>
      </el-tooltip>
    </div>
    <div class="left">
      <el-tooltip class="item" content="Left Top 提示文字" placement="left-start">
        <el-button>左上</el-button>
      </el-tooltip>
      <el-tooltip class="item" content="Left Center 提示文字" placement="left">
        <el-button>左边</el-button>
      </el-tooltip>
      <el-tooltip class="item" content="Left Bottom 提示文字,Left Bottom 提示文字,Left Bottom 提示文字" placement="left-end">
        <el-button>左下</el-button>
      </el-tooltip>
    </div>
    <div class="right">
      <el-tooltip class="item" content="Right Top 提示文字" placement="right-start">
        <el-button>右上</el-button>
      </el-tooltip>
      <el-tooltip class="item" content="Right Center 提示文字" placement="right">
        <el-button>右边</el-button>
      </el-tooltip>
      <el-tooltip class="item" content="Right Bottom 提示文字" placement="right-end">
        <el-button>右下</el-button>
      </el-tooltip>
    </div>
    <div class="bottom">
      <el-tooltip class="item" content="Bottom Left 提示文字" placement="bottom-start">
        <el-button>下左</el-button>
      </el-tooltip>
      <el-tooltip class="item" content="Bottom Center 提示文字" placement="bottom">
        <el-button>下边</el-button>
      </el-tooltip>
      <el-tooltip class="item" content="Bottom Right 提示文字" placement="bottom-end">
        <el-button>下右</el-button>
      </el-tooltip>
    </div>
  </div>
  </code-box>
</template>

<script>
  export default {
    data() {
      return {
        disabled: false
      };
    }
  };
</script>

<style lang="scss">
  .demo-tooltip {
    .el-tooltip + .el-tooltip {
      margin-left: 15px;
    }
    .box {
      width: 400px;

      .top {
        text-align: center;
      }

      .left {
        float: left;
        width: 60px;
      }

      .right {
        float: right;
        width: 60px;
      }

      .bottom {
        clear: both;
        text-align: center;
      }

      .item {
        margin: 4px;
        padding: 0;
      }

      .left .el-tooltip__popper,
      .right .el-tooltip__popper {
        padding: 8px 10px;
      }
      .el-tooltip {
        margin-left: 0;
      }
    }
  }
</style>

```html
<div class="box">
  <div class="top">
    <el-tooltip
      class="item"
      content="Top Left 提示文字,Top Left 提示文字,Top Left 提示文字"
      placement="top-start"
    >
      <el-button>上左</el-button>
    </el-tooltip>
    <el-tooltip
      class="item"
      content="Top Center 提示文字,Top Center 提示文字,Top Center 提示文字"
      placement="top"
    >
      <el-button>上边</el-button>
    </el-tooltip>
    <el-tooltip class="item" content="Top Right 提示文字" placement="top-end">
      <el-button>上右</el-button>
    </el-tooltip>
  </div>
  <div class="left">
    <el-tooltip class="item" content="Left Top 提示文字" placement="left-start">
      <el-button>左上</el-button>
    </el-tooltip>
    <el-tooltip class="item" content="Left Center 提示文字" placement="left">
      <el-button>左边</el-button>
    </el-tooltip>
    <el-tooltip
      class="item"
      content="Left Bottom 提示文字,Left Bottom 提示文字,Left Bottom 提示文字"
      placement="left-end"
    >
      <el-button>左下</el-button>
    </el-tooltip>
  </div>
  <div class="right">
    <el-tooltip
      class="item"
      content="Right Top 提示文字"
      placement="right-start"
    >
      <el-button>右上</el-button>
    </el-tooltip>
    <el-tooltip class="item" content="Right Center 提示文字" placement="right">
      <el-button>右边</el-button>
    </el-tooltip>
    <el-tooltip
      class="item"
      content="Right Bottom 提示文字"
      placement="right-end"
    >
      <el-button>右下</el-button>
    </el-tooltip>
  </div>
  <div class="bottom">
    <el-tooltip
      class="item"
      content="Bottom Left 提示文字"
      placement="bottom-start"
    >
      <el-button>下左</el-button>
    </el-tooltip>
    <el-tooltip
      class="item"
      content="Bottom Center 提示文字"
      placement="bottom"
    >
      <el-button>下边</el-button>
    </el-tooltip>
    <el-tooltip
      class="item"
      content="Bottom Right 提示文字"
      placement="bottom-end"
    >
      <el-button>下右</el-button>
    </el-tooltip>
  </div>
</div>
```

## 更多 Content

展示多行文本或者是设置文本内容的格式

<template>
  <code-box
    title="Content"
    description="用具名 slot 分发`content`，替代`tooltip`中的`content`属性。">
    <el-tooltip placement="top">
      <div slot="content">多行信息<br/>第二行信息</div>
      <el-button>Top center</el-button>
    </el-tooltip>
    <el-tooltip content="禁用文本" placement="top">
      <span>
        <el-button icon="h-icon-enable" disabled>启用</el-button>
      </span>
    </el-tooltip>
  </code-box>
</template>

```html
<el-tooltip placement="top">
  <div slot="content">
    多行信息
    <br />
    第二行信息
  </div>
  <el-button>Top center</el-button>
</el-tooltip>
<el-tooltip content="禁用文本" placement="top">
  <span>
    <el-button icon="h-icon-enable" disabled>启用</el-button>
  </span>
</el-tooltip>
```

:::tip

tooltip 内不支持 router-link 组件，请使用 vm.\$router.push 代替。

tooltip 内不支持 disabled form 元素，请在 disabled form 元素外层添加一层包裹元素。并注意由此引发的 dom 结构不同带来的样式问题。

:::

## 高级扩展

除了这些基本设置外，还有一些属性可以让使用者更好的定制自己的效果：

`transition` 属性可以定制显隐的动画效果，默认为`fade-in-linear`。
如果需要关闭 `tooltip` 功能，`disabled` 属性可以满足这个需求，它接受一个`Boolean`，设置为`true`即可。

事实上，这是基于 [Vue-popper](https://github.com/element-component/vue-popper) 的扩展，你可以自定义任意 Vue-popper 中允许定义的字段。
当然 Tooltip 组件实际上十分强大，文末的 API 文档会做一一说明。

## API

### Attributes

| 参数             | 说明                                                                                                 | 类型    | 可选值                                                                                                    | 默认值                            |
| ---------------- | ---------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------- | --------------------------------- |
| content          | 显示的内容，也可以通过 `slot#content` 传入 DOM                                                       | String  | —                                                                                                         | —                                 |
| placement        | Tooltip 的出现位置                                                                                   | String  | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom                            |
| value(v-model)   | 状态是否可见                                                                                         | Boolean | —                                                                                                         | false                             |
| disabled         | Tooltip 是否可用                                                                                     | Boolean | —                                                                                                         | false                             |
| debounceClosable | Tooltip 是否延时关闭（关闭后，离开内容激活区，将无法选中 tip 中内容，不过可以配合enterable一起使用） | Boolean | —                                                                                                         | false                             |
| offset           | 出现位置的偏移量                                                                                     | Number  | —                                                                                                         | 0                                 |
| transition       | 定义渐变动画                                                                                         | String  | —                                                                                                         | el-fade-in-linear                 |
| visible-arrow    | 是否显示 Tooltip 箭头，更多参数可见[Vue-popper](https://github.com/element-component/vue-popper)     | Boolean | —                                                                                                         | true                              |
| popper-options   | [popper.js](https://popper.js.org/documentation.html) 的参数                                         | Object  | 参考 [popper.js](https://popper.js.org/documentation.html) 文档                                           | { boundariesElement: 'viewport' } |
| open-delay       | 延迟出现，单位毫秒                                                                                   | Number  | —                                                                                                         | 0                                 |
| manual           | 手动控制模式，设置为 true 后，mouseenter 和 mouseleave 事件将不会生效                                | Boolean | —                                                                                                         | false                             |
| popper-class     | 为 Tooltip 的 popper 添加类名                                                                        | String  | —                                                                                                         | —                                 |
| enterable        | 鼠标是否可进入到 tooltip 中，需要搭配debounceClosable一起使用                                        | Boolean | —                                                                                                         | false                             |
