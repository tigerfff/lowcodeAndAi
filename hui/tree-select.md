# TreeSelect 树选择

<template>
  <author-info
    :version="versions['tree-select']"
    author="徐子龙"
    ux="王海鸥"
    ui="杨丹妮"
    standard="http://10.33.43.73/huidesign/bscs/issues/248"
    reviewed
  />
</template>

## 安装

```bash
$ npm i @hui-pro/tree-select -D
# 或者
$ yarn add @hui-pro/tree-select --dev
```

## 引入

```js
import treeSelect from '@hui-pro/tree-select';
import '@hui-pro/tree-select/theme/index.scss';
Vue.use(treeSelect);
```

## 基础用法

<template>
  <code-box title="基础用法" description="点击选择框弹窗下拉树列表。需要使用`v-model`绑定数据。">
    <div style="width: 240px;">
      <h-tree-select
        :treeData="baseData"
        v-model="singleData"
      >
      </h-tree-select>
    </div>
  </code-box>
</template>

```html
<h-tree-select
  :treeData="baseData"
  v-model="singleData"
>
</h-tree-select>

<script>
export default {
  data () {
    return {
      baseData: [
        { id: 1, label: '一级 1', children: [
          { id: 4, label: '二级 1-1', children: [
            { id: 9, label: '三级 1-1-1' },
            { id: 10, label: '三级 1-1-2' }
          ]}
        ] },
        { id: 2, label: '一级 2', children: [
          { id: 5, label: '二级 2-1' },
          { id: 6, label: '二级 2-2' }
        ] },
        { id: 3, label: '一级 3', children: [
          { id: 7, label: '二级 3-1' },
          { id: 8, label: '二级 3-2' }
        ] }
      ],
      singleData: ''
    }
  }
}
</script>
```

## 显示节点完整的路径

<template>
  <code-box title="显示节点完整的路径" description="单选时，设置属性`show-path`为`true`可以显示节点完整的路径。">
    <h-tree-select
      :treeData="baseData"
      showPath
      v-model="singleData2"
    >
    </h-tree-select>
  </code-box>
</template>

```html
<h-tree-select
  :treeData="baseData"
  showPath
  v-model="singleData2"
>
</h-tree-select>

<script>
export default {
  data () {
    return {
      baseData: [
        { id: 1, label: '一级 1', children: [
          { id: 4, label: '二级 1-1', children: [
            { id: 9, label: '三级 1-1-1' },
            { id: 10, label: '三级 1-1-2' }
          ]}
        ] },
        { id: 2, label: '一级 2', children: [
          { id: 5, label: '二级 2-1' },
          { id: 6, label: '二级 2-2' }
        ] },
        { id: 3, label: '一级 3', children: [
          { id: 7, label: '二级 3-1' },
          { id: 8, label: '二级 3-2' }
        ] }
      ],
      singleData2: 9
    }
  }
}
</script>
```

## 节点多选

<template>
  <code-box title="节点多选" description="设置`show-checkbox`为`true`可勾选多个节点">
    <h-tree-select
      :treeData="baseData"
      show-checkbox
      v-model="initData"
      @clear="clear"
      @tree-search-input="treeSearchInput"
    >
    </h-tree-select>
  </code-box>
</template>

```html
<h-tree-select
  :treeData="baseData"
  show-checkbox
  v-model="initData"
>
</h-tree-select>

<script>
export default {
  data () {
    return {
      baseData: [
        { id: 1, label: '一级 1', children: [
          { id: 4, label: '二级 1-1', children: [
            { id: 9, label: '三级 1-1-1' },
            { id: 10, label: '三级 1-1-2' }
          ]}
        ] },
        { id: 2, label: '一级 2', children: [
          { id: 5, label: '二级 2-1' },
          { id: 6, label: '二级 2-2' }
        ] },
        { id: 3, label: '一级 3', children: [
          { id: 7, label: '二级 3-1' },
          { id: 8, label: '二级 3-2' }
        ] }
      ],
      initData: [5, 9]
    }
  }
}
</script>
```

## 即时搜索

<template>
  <code-box title="即时搜索" description="设置`filter`为`true`可以即时搜索。（本质上是调用`el-tree`的filter节点过滤功能）">
    <h-tree-select
      :treeData="baseData"
      show-checkbox
      filter
      v-model="initData2"
    >
    </h-tree-select>
  </code-box>
</template>

```html
<h-tree-select
  :treeData="baseData"
  show-checkbox
  filter
  v-model="initData2"
>
</h-tree-select>

<script>
export default {
  data () {
    return {
      baseData: [
        { id: 1, label: '一级 1', children: [
          { id: 4, label: '二级 1-1', children: [
            { id: 9, label: '三级 1-1-1' },
            { id: 10, label: '三级 1-1-2' }
          ]}
        ] },
        { id: 2, label: '一级 2', children: [
          { id: 5, label: '二级 2-1' },
          { id: 6, label: '二级 2-2' }
        ] },
        { id: 3, label: '一级 3', children: [
          { id: 7, label: '二级 3-1' },
          { id: 8, label: '二级 3-2' }
        ] }
      ],
      initData2: '9'
    }
  }
}
</script>
```

## 动态获取树数据

<template>
  <code-box title="动态获取树节点" description="业务中往往`treeData`数据异步获取。在数据获取完成并且渲染完成（`nextTick`）后，需要手动调用组件方法`setValue`才能实现组件的回显">
    <h-tree-select
      ref="asyncTree"
      :treeData="emptyData"
      show-checkbox
      :treeLoading="treeLoading"
      v-model="initData"
    >
    </h-tree-select>
    <div style="margin-top: 16px;">
      <el-button @click="getTreeData">获取树数据</el-button>
    </div>
  </code-box>
</template>

```html
<h-tree-select
  ref="asyncTree"
  :treeData="emptyData"
  show-checkbox
  :treeLoading="treeLoading"
  v-model="initData"
>
</h-tree-select>
<div style="margin-top: 16px;">
  <el-button @click="getTreeData">获取树数据</el-button>
</div>

<script>
export default {
  data () {
    return {
      baseData: [
        { id: 1, label: '一级 1', children: [
          { id: 4, label: '二级 1-1', children: [
            { id: 9, label: '三级 1-1-1' },
            { id: 10, label: '三级 1-1-2' }
          ]}
        ] },
        { id: 2, label: '一级 2', children: [
          { id: 5, label: '二级 2-1' },
          { id: 6, label: '二级 2-2' }
        ] },
        { id: 3, label: '一级 3', children: [
          { id: 7, label: '二级 3-1' },
          { id: 8, label: '二级 3-2' }
        ] }
      ],
      initData: [5, 9],
      emptyData: [],
      treeLoading: false
    }
  },
  methods: {
    getTreeData () {
      this.treeLoading = true;
      setTimeout(() => {
        this.treeLoading = false;
        this.emptyData = this.baseData
        this.$nextTick(() => {
          this.$refs.asyncTree.setValue()
        })
      }, 3000)
    }
  }
}
</script>
```

<script>
const versions = require('docs/.vuepress/src/version.json');
export default {
  data () {
    return {
      isShow: false,
      versions,
      baseData: [
        { id: 1, label: '一级 1', children: [
          { id: 4, label: '二级 1-1', children: [
            { id: 9, label: '三级 1-1-1' },
            { id: 10, label: '三级 1-1-2' }
          ]}
        ] },
        { id: 2, label: '一级 2', children: [
          { id: 5, label: '二级 2-1' },
          { id: 6, label: '二级 2-2' }
        ] },
        { id: 3, label: '一级 3', children: [
          { id: 7, label: '二级 3-1' },
          { id: 8, label: '二级 3-2' }
        ] }
      ],
      singleData: '',
      singleData2: 9,
      initData: [5, 9],
      initData2: [],
      emptyData: [],
      treeLoading: false
    }
  },
  methods: {
    getTreeData () {
      this.treeLoading = true;
      setTimeout(() => {
        this.treeLoading = false;
        this.emptyData = this.baseData
        this.$nextTick(() => {
          this.$refs.asyncTree.setValue()
        })
      }, 3000)
    },
    treeSearchInput (val) {
      console.log(val)
    },
    clear () {
      console.log('clear')
    }
  }
}
</script>

<style>
.demo-tree-select .h-tree-select {
  /* width: 240px; */
}
</style>

## API

tree-select树选择组件引入的HUI的树组件，树相关的属性、方法和事件均于HUI配置一致。

### Attributes

| 参数                   | 说明                                                                                            | 类型                      | 可选值              | 默认值    |
| -------------------- | --------------------------------------------------------------------------------------------- | ----------------------- | ---------------- | ------ |
| value                | 可用`v-model`绑定，单选为`String`或是`Number`，多选为`Array`                                                | String/Number/Array     | -                | -      |
| show-path            | 是否展示路径                                                                                | Boolean                 | -                | false  |
| show-checkbox        | 是否为多选（是否展示勾选框）                                                                                | Boolean                 | -                | false  |
| check-model          | 勾选模式（仅在父子联动模式下有效）。<br>parent: 当子节点全部勾选时，仅展示父节点；<br>child: 当子节点全部勾选时，仅展示子节点；<br>all: 展示全部勾选的节点 | String                  | parent/child/all | parent |
| show-search          | 是否展示搜索框                                                                                       | Boolean                 | -                | false  |
| on-icon-click        | 点击树上方搜索框内icon按钮的钩子函数（参数：1-事件event，2-搜索框内的值）                                                 | Function                | -                | -      |
| placeholder          | 选框内的占位符文字                                                                                     | String                  | -                | 请选择    |
| search-placeholder   | 搜索框内的占位符文字                                                                                    | String                  | -                | 搜索     |
| tree-loading         | 树是否处于加载状态                                                                                     | Boolean                 | -                | false  |
| clearable            | 是否可清空                                                                                            | Boolean                 | -                | true  |
| default-expand-all        | 是否默认展开所有节点                                                                                    | boolean                 | -                | false  |
| expand-checked-node        | 是否自动展开勾选的节点                                                                       | boolean                 | -                | true  |
| check-strictly       | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法。                                                                 | Boolean                 | -                | false  |
| filter               | 是否为即时搜索                                                                                       | Boolean                 | -                | false  |
| disabled             | 是否禁用                                                                                          | Boolean                 | -                | false  |
| multiple-nowrap      | 多选时选中项过多，超过一行时不进行换行，多出来的内容截断处理                                                                | Boolean                 | -                | false  |
| collapse-tags        | 多选时是否将选中值按文字的形式展示                                                           | Boolean                 | -                | false  |
| tree-data            | 树结构的数据                                                                                        | Array                   | -                | []    |
| empty-text           | 内容为空的时候展示的文本                                                                                  | String                  | -                | 暂无数据   |
| node-key             | 每个树节点用来作为唯一标识的属性，整颗树应该是唯一的                                                                    | String                  | -                | id     |
| parent-key           | 配合simpleData和node-key使用，完成简单数据的展现，定义为父节点的key                                                  | String                  | -                | -      |
| props                | 同HUI（tree树组件）的props配置                                                                         | Object                  | -                | -      |
| render-content       | 树节点的内容区的渲染 Function                                                                           | Function(h, { node })   | -                | -      |
| default-icon         | 默认图标                                                                                          | String                  | -                | -      |
| simple-data          | 使用同级的数据结构，使用子节点parent-key和父节点node-key对应来展现层级                                                  | boolean                 | -                | false  |
| check-on-click-node | 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。                                          | boolean                 | -                | false  |
| expand-on-click-node | 是否在点击节点的时候展开或者收缩节点， 默认值为 false，只有点箭头图标的时候才会展开或者收缩节点。                                          | boolean                 | -                | false  |
| filter-node-method | 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏            | Function(value, data, node)       | — | —  |
| popper-class | 下拉框的类名            | string       | — | —  |
| popper-append-to-body | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false            | Boolean       | — | true  |
| hide-popper-after-selected | 是否在选中节点后隐藏弹出框（仅单选有效）            | Boolean       | — | false  |
| keep-search-text | 是否在收起面板的时候保留搜索文字            | Boolean       | — | false  |
| before-click | 用于捕获单击节点之前的事件回调函数，返回 Boolean 或 Promise，为 false 表示无法进行单击操作            | function(data, node)       | — | -  |

::: warning 注意

TreeSelect多选时原则上不支持异步树获取，因为在联动勾选的时候存在很多问题。如果你存在异步勾选下拉树，可以参考源码自己实现，也欢迎pr.

:::

### 方法

| 方法名                 | 说明                                                                              | 参数                                                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| setValue            | 根据绑定的`value`属性值重置选中的数据                                                          | -                                                                                                                                              |
| getCheckedNodes     | 若节点可被勾选（即 `show-checkbox` 为 `true`），则返回目前被选中的节点所组成的数组                           | (leafOnly, checkedOnly) 接收两个参数，1. boolean 类型的参数，若为 `true` 则仅返回被勾选的叶子节点，默认值为 `false` 2. boolean 类型的参数，若为 `false` 则一起返回半选状态的节点，默认值为 `true`       |
| getCheckedKeys      | 若节点可被勾选（即 `show-checkbox` 为 `true`），则返回目前被勾选节点的key值所组成的数组，使用此方法必须设置 node-key 属性 | (leafOnly, checkedOnly) 接收两个参数，1. boolean 类型的参数，若为 `true` 则仅返回被勾选的叶子节点的 keys，默认值为 `false` 2. boolean 类型的参数，若为 `false` 则一起返回半选状态的节点，默认值为 `true` |
| getSelectedNode     | 返回当前点击的节点                                                                       | -                                                                                                                                              |
| getSelectedKey      | 返回当前点击节点的Key值，使用此方法必须设置 node-key 属性                                             | -                                                                                                                                              |
| getHalfCheckedNodes | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前半选中的节点所组成的数组                           | -                                                                                                                                              |
| getHalfCheckedKeys  | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前半选中的节点的 key 所组成的数组                     | -                                                                                                                                              |
| getNode             | 根据 data 或者 key 拿到 Tree 组件中的 node                                                | (data) 要获得 node 的 key 或者 data                                                                                                                  |
| expandNode          | 展开节点                                                                            | (data) 要展开节点 的 key 或者 data                                                                                                                     |
| collapseNode        | 收起节点                                                                            | (data) 要收起节点 的 key 或者 data                                                                                                                     |
| remove              | 删除 Tree 中的节点，可以是数组                                                              | (data) 要删除的节点的 data、key 或者 node                                                                                                                |
| append              | 为 Tree 中的一个节点追加子节点，可以是数组                                                        | (data, parentNode) 1. 要追加的子节点的 data 2. 子节点的 parent 的 data、key 或者 node                                                                          |
| insertBefore        | 为 Tree 的一个节点的前面增加一个节点                                                           | (data, refNode) 1. 要增加的节点的 data 2. 要增加的节点的后一个节点的 data、key 或者 node                                                                              |
| insertAfter         | 为 Tree 的一个节点的后面增加一个节点                                                           | (data, refNode) 1. 要增加的节点的 data 2. 要增加的节点的前一个节点的 data、key 或者 node                                                                              |
| reload              | 重新加载树节点，可以是数组，仅在 lazy 为 true 的情况下可用                                             | (data) 要重新加载节点的 data、key 或者 node                                                                                                               |
| setTreeSearch       | 手动设置搜索的key                                             | (value) 要设置的key                  |

### Events

| 事件名称             | 说明                  | 回调参数                                                                                                              |
| ---------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| show             | 下拉框出现的事件回调          | -                                                                                                                 |
| hide             | 下拉框收起的事件回调          | -                                                                                                                 |
| node-click       | 节点被点击时的回调           | 共四个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身和click事件对象。                                                 |
| node-dbclick     | 节点被双击时的回调           | 共四个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身和dbclick事件对象。                                               |
| node-contextmenu | 当某一节点被鼠标右键点击时会触发该事件 | 共四个参数，依次为：event、传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。                                                     |
| check-change     | 节点选中状态发生变化时的回调      | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点                                                    |
| check            | 当复选框被点击的时候触发        | 共两个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性 |
| current-change   | 当前选中节点变化时触发的事件      | 共两个参数，依次为：当前节点的数据，当前节点的 Node 对象                                                                                   |
| node-expand      | 节点被展开时触发的事件         | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。                                                           |
| node-collapse    | 节点被关闭时触发的事件         | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。                                                           |
| clear    | 可清空时用户点击清空按钮时触发         | ——                                                           |
| tree-search-input    | 搜索框中值输入（改变）时触发         | 共一个，搜索框中的值                                                           |