# Popover 弹出框

## 基本用法

Popover 的属性与 Tooltip 很类似，它们都是基于`Vue-popper`开发的，因此对于重复属性，请参考 Tooltip 的文档，在此文档中不做详尽解释。

<template>
  <code-box
    title="基本用法"
    description="设置索引`ref`，在按钮中，我们注册了自定义指令`v-popover`，指向索引ID。`trigger`属性用于设置何时触发 Popover ，提供三种触发方式：`hover`, `click` 和 `focus`。第二种用法通过 `slot` 指定 reference。"
  >
    <el-popover
      ref="popover1"
      placement="top-start"
      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    ></el-popover>
    <el-popover
      ref="popover2"
      placement="bottom"
      title="标题"
      width="200"
      trigger="click"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    ></el-popover>
    <el-button v-popover:popover1>hover 激活</el-button>
    <el-button v-popover:popover2>click 激活</el-button>
    <el-popover
      placement="right"
      title="标题"
      width="200"
      trigger="focus"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <el-button slot="reference">focus 激活</el-button>
    </el-popover>
    <el-popover
      placement="bottom"
      title="标题"
      width="200"
      trigger="manual"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
      v-model="visible"
    >
      <el-button slot="reference" @click="visible = !visible">
        手动激活
      </el-button>
    </el-popover>
    <el-popover
      placement="right"
      title="showHtml"
      width="200"
      trigger="focus"
      :showHtml="true"
      content="<a href='http://www.baidu.com'>使用showHtml使content支持html渲染</a>"
    >
      <el-button slot="reference">showHtml</el-button>
    </el-popover>
  </code-box>
</template>

```html
<el-popover
  ref="popover1"
  placement="top-start"
  title="标题"
  width="200"
  trigger="hover"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
></el-popover>
<el-popover
  ref="popover2"
  placement="bottom"
  title="标题"
  width="200"
  trigger="click"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
></el-popover>
<el-button v-popover:popover1>hover 激活</el-button>
<el-button v-popover:popover2>click 激活</el-button>
<el-popover
  placement="right"
  title="标题"
  width="200"
  trigger="focus"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
>
  <el-button slot="reference">focus 激活</el-button>
</el-popover>
<el-popover
  placement="bottom"
  title="标题"
  width="200"
  trigger="manual"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  v-model="visible"
>
  <el-button slot="reference" @click="visible = !visible">
    手动激活
  </el-button>
</el-popover>
<el-popover
  placement="right"
  title="showHtml"
  width="200"
  trigger="focus"
  :showHtml="true"
  content="<a href='http://www.baidu.com'>使用showHtml使content支持html渲染</a>"
>
  <el-button slot="reference">showHtml</el-button>
</el-popover>
```

::: tip

使用 `v-popover` 指令，需将 `el-popover` 标签放置触发节点上方，使其值与 popover `ref` 相对应，并保证 `ref` 值唯一。

:::

## 嵌套信息

可以在 Popover 中嵌套多种类型信息，以下为嵌套表格的例子。

<template>
  <code-box
    title="嵌套信息"
    description="利用分发取代`content`属性">
    <el-popover
      ref="popover4"
      placement="right"
      width="400"
      trigger="click">
      <el-table :data="gridData"  force-scroll="horizontal"
      class="under-table">
        <el-table-column prop="date" width="100" label="日期"></el-table-column>
        <el-table-column prop="name" width="90" label="姓名"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </el-popover>
    <el-button v-popover:popover4>click 激活</el-button>
  </code-box>
</template>

```html
<el-popover ref="popover4" placement="right" width="400" trigger="click">
  <el-table :data="gridData" force-scroll="horizontal">
    <el-table-column prop="date" width="100" label="日期"></el-table-column>
    <el-table-column prop="name" width="90" label="姓名"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
  </el-table>
</el-popover>

<el-button v-popover:popover4>click 激活</el-button>

<script>
  export default {
    data() {
      return {
        gridData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '金沙江路1518弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '金沙江路1518弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '金沙江路1518弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '金沙江路1518弄'
          }
        ]
      };
    }
  };
</script>
```

## 嵌套操作

当然，你还可以嵌套操作，这相比 Dialog 更为轻量。

<template>
  <code-box
    title="嵌套操作"
    description="相比 Dialog 更为轻量，可以结合多个控件进行浮窗显示">
    <el-popover
      placement="top"
      trigger="hover"
      :popper-class="`el-popover__for-input el-popover__for-input-form`"
      width="160">
      <p>hover就可以生效了</p>
      <el-input slot="reference" />
    </el-popover>
    <el-popover
      ref="popover5"
      placement="top"
      width="160"
      v-model="visible2">
      <p class="popover-text">这是一段内容这是一段内容确定删除吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button type="link" size="mini" @click="visible2 = false">确定</el-button>
        <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
      </div>
      <el-button slot="reference">删除</el-button>
    </el-popover>
  </code-box>
</template>

```html
<el-popover
  placement="top"
  trigger="hover"
  title="嵌套操作"
  width="160">
  <p>hover就可以生效了</p>
  <el-input slot="reference" />
</el-popover>
<el-popover
  ref="popover5"
  placement="top"
  width="160"
  v-model="visible2">
  <p class="popover-text">这是一段内容这是一段内容确定删除吗？</p>
  <div style="text-align: right; margin: 0">
    <el-button type="link" size="mini" @click="visible2 = false">确定</el-button>
    <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
  </div>
  <el-button slot="reference">删除</el-button>
</el-popover>

<script>
  export default {
    data() {
      return {
        visible2: false
      };
    }
  };
</script>
```

## API

### Attributes

| 参数                                   | 说明                                                                                             | 类型           | 可选值                                                                                                    | 默认值                                                  |
| -------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| trigger                                | 触发方式                                                                                         | String         | click/focus/hover/manual                                                                                  | click                                                   |
| title                                  | 标题                                                                                             | String         | —                                                                                                         | —                                                       |
| content                                | 显示的内容，也可以通过 `slot` 传入 DOM                                                           | String         | —                                                                                                         | —                                                       |
| content-delay <Badge text="2.0.13+" /> | 内容延迟加载，单位为毫秒                                                                         | Number         | —                                                                                                         | —                                                       |
| width                                  | 宽度                                                                                             | String, Number | —                                                                                                         | 最小宽度 150px                                          |
| maxWidth                               | 最大宽度                                                                                         | String, Number | —                                                                                                         | —                                                       |
| placement                              | 出现位置                                                                                         | String         | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom                                                  |
| disabled                               | Popover 是否可用                                                                                 | Boolean        | —                                                                                                         | false                                                   |
| value(v-model)                         | 状态是否可见                                                                                     | Boolean        | —                                                                                                         | false                                                   |
| offset                                 | 出现位置的偏移量                                                                                 | Number         | —                                                                                                         | 0                                                       |
| transition                             | 定义渐变动画                                                                                     | String         | —                                                                                                         | fade-in-linear                                          |
| visible-arrow                          | 是否显示 Tooltip 箭头，更多参数可见[Vue-popper](https://github.com/element-component/vue-popper) | Boolean        | —                                                                                                         | true                                                    |
| popper-options                         | [popper.js](https://popper.js.org/documentation.html) 的参数                                     | Object         | 参考 [popper.js](https://popper.js.org/documentation.html) 文档                                           | `{ boundariesElement: 'body', gpuAcceleration: false }` |
| popper-class                           | 为 popper 添加类名                                                                               | String         | —                                                                                                         | —                                                       |
| open-delay                             | 触发方式为 hover 时的显示延迟，单位为毫秒                                                        | Number         | —                                                                                                         | —                                                       |
| show-html                              | 针对 content 内容生效，可以支持 content 内容以 html 方式渲染                                     | Boolean        | —                                                                                                         | false                                                   |

### Slot

| 参数      | 说明                          |
| --------- | ----------------------------- |
| —         | Popover 内嵌 HTML 文本        |
| reference | 触发 Popover 显示的 HTML 元素 |

### Events

| 事件名称 | 说明       | 回调参数 |
| -------- | ---------- | -------- |
| show     | 显示时触发 | —        |
| hide     | 隐藏时触发 | —        |

<script>
  export default {
    data() {
      return {
        visible: false,
        visible2: false,
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '金沙江路1518弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '金沙江路1518弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '金沙江路1518弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '金沙江路1518弄'
        }],
        gridData2: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          $info: true
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          $positive: true
        }],
        gridData3: [{
          tag: '家',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          tag: '公司',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          tag: '公司',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          tag: '家',
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          tag: '公司',
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          tag: '家',
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          tag: '公司',
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        singleSelection: {},
        multipleSelection: [],
        model: ''
      };
    },

    watch: {
      singleSelection(val) {
        console.log('selection: ', val);
      },

      multipleSelection(val) {
        console.log('selection: ', val);
      }
    },

    events: {
      handleClick(row) {
        console.log('you clicked ', row);
      }
    }
  };
</script>

<style lang="scss">
.demo-popover {
  .el-popover + .el-popover {
    margin-left: 10px;
  }
  .el-input {
    width: 360px;
  }
  .el-button {
    margin-left: 10px;
  }
  .el-popover .el-table {
    height: 200px;
  }
  .el-popover table {
    margin: 0 auto !important;
  }
}
.under-table table {
  margin: 0 auto !important;
}
.popover-text {
  margin-top: 0;
}
</style>
