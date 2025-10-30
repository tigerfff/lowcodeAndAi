# SyncTreeSelect 异步树选择

<template>
  <author-info
    :version="versions['sync-tree-select']"
    author="徐子龙"
  />
</template>

## 安装

```bash
$ npm i @hui-pro/sync-tree-select -D
# 或者
$ yarn add @hui-pro/sync-tree-select --dev
```

## 引入

```js
import syncTreeSelect from '@hui-pro/sync-tree-select';
import '@hui-pro/sync-tree-select/theme/index.scss';
Vue.use(syncTreeSelect);
```

## 说明

::: warning

异步树选择`sync-tree-select`和树选择`tree-select`使用上有所不同

:::

`sync-tree-select`内的树组件采用的是`sync-tree`组件，虽然也是基于HUI的`el-tree`基础之上封装，但是使用起来有很多不同，详情看[异步树API](/zh/widget/data/sync-tree.html)。这里列几点主要的不同：

### 1. `sync-tree-select`不支持选择模式的切换

在`tree-select`中可以通过`check-model`属性来选择模式，特别是当子节点全部勾选时仅展示父节点的支持特性。但是`sync-tree-select`中由于节点异步加载导致的未知性，我们仅能支持获取勾选的所有节点。

### 2. `sync-tree-select`树数据获取与展示

异步选择树采用的`set-tree-data`数据获取属性和`sync-tree`组件一样，请直接查看[异步树API](/zh/widget/data/sync-tree.html)

### 3. `sync-tree-select`回显问题

理论上异步树选择没法支持回显，这是因为初始化渲染之后，由于对应的节点还没有请求获取到导致没法显示。

这也是我们头疼的问题。为此组件提供了一个不太优雅的解决方案。如果你的项目中要用到回显，请按如下方式操作：
* 设置属性`show-return`为`true`；
* 单选时，v-model绑定值由`string`类型改为`object`，多选时，v-mdeol绑定值由字符串数组改为对象数组。对象需要有数据名称（name）和数据标识（id），示例格式如下
```js
// 不回显
var single = '001'
var multi = ['001', '002']

// 回显
var single = { name: '节点一', id: '001' }
var multi = [
  { name: '节点一', id: '001' },
  { name: '节点二', id: '002' }
]

// 至于数据名称（name）怎么获取，让后台提供吧。
```

### 4. 关于性能

异步树本身就是为了解决树组件带来的性能问题，但是为了很多功能的正常运行，`sync-tree-select`牺牲了不少性能，在需求允许的情况下，以下方式可以提升组件性能。

* 不需要回显的时候`show-return`置为false；
* 设置`delay-check`为true，这样会在隐藏pop弹框的时候再计算勾选节点；
* 和异步树一样，`type`使用`async`或`hierarchical`；
* 需求允许的情况下，使用`showSearchInput`隐藏搜索。（或者在使用过程中少用搜索功能）

### 5. 其它

组件有些功能细节并没有加，有些也因为性能原因特意被我们隐去了。如果有需要补充的功能请提issues。（如果超出了异步树`sync-tree`的支持范围，这里也一定不会支持的）


## 基础用法

<template>
  <code-box title="基础用法" description="点击选择框弹窗下拉树列表。需要使用`v-model`绑定数据。">
    <div style="width: 240px;">
      <h-sync-tree-select
        clearable
        :map="map"
        :page-size="20"
        :node-limit="50"
        :set-tree-data="setSingleTreeData"
        :set-search-data="setSearchData"
        v-model="singleData"
      >
      </h-sync-tree-select>
    </div>
  </code-box>
</template>

```html
<h-sync-tree-select
  clearable
  :map="map"
  :page-size="20"
  :node-limit="50"
  :set-tree-data="setTreeData"
  :set-search-data="setSearchData"
  v-model="singleData"
>
</h-sync-tree-select>

<script>
import api from '@/api/api'
export default {
  data () {
    return {
      singleData: '',
      map: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf',
        icon: 'iconSkin'
      }
    }
  },
  methods: {
    setTreeData ({parentId, pageNo, pageSize, keyWord}) {
      return new Promise(async(resolve, reject) => {
        try {
          let {data} = await api.fetchUnitTree({pId: parentId, pageNo, pageSize})
          resolve(data)
        } catch (err) {
          console.error(err)
        }
      })
    },
    setSearchData (keyWord) {
      return new Promise(async(resolve, reject) => {
        try {
          let {data} = await api.fetchSearchTree({keyWord})
          resolve(data)
        } catch (err) {
          console.error(err)
        }
      })
    }
  }
}
</script>
```

## 显示节点完整的路径

<template>
  <code-box title="显示节点完整的路径" description="单选时，设置属性`show-path`为`true`可以显示节点完整的路径。不支持回显。">
    <h-sync-tree-select
      clearable
      show-path
      :map="map"
      :page-size="20"
      :node-limit="50"
      :set-tree-data="setSingleTreeData"
      :set-search-data="setSearchData"
      v-model="singleData"
      style="width: 240px;"
    >
    </h-sync-tree-select>
  </code-box>
</template>

```html
<h-sync-tree-select
  clearable
  show-path
  :map="map"
  :page-size="20"
  :node-limit="50"
  :set-tree-data="setTreeData"
  :set-search-data="setSearchData"
  v-model="singleData"
  style="width: 240px;"
>
</h-sync-tree-select>

<script>
import api from '@/api/api'
export default {
  data () {
    return {
      singleData: '',
      map: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf',
        icon: 'iconSkin'
      }
    }
  },
  methods: {
    setTreeData ({parentId, pageNo, pageSize, keyWord}) {
      return new Promise(async(resolve, reject) => {
        try {
          let {data} = await api.fetchUnitTree({pId: parentId, pageNo, pageSize})
          resolve(data)
        } catch (err) {
          console.error(err)
        }
      })
    },
    setSearchData (keyWord) {
      return new Promise(async(resolve, reject) => {
        try {
          let {data} = await api.fetchSearchTree({keyWord})
          resolve(data)
        } catch (err) {
          console.error(err)
        }
      })
    }
  }
}
</script>
```

## 节点多选

<template>
  <code-box title="节点多选" description="设置`show-checkbox`为`true`可勾选多个节点">
    <h-sync-tree-select
      clearable
      show-return
      show-checkbox
      :map="map"
      :page-size="20"
      :node-limit="50"
      :set-tree-data="setSingleTreeData"
      :set-search-data="setSearchData"
      v-model="values"
      style="width: 320px;"
    >
    </h-sync-tree-select>
  </code-box>
</template>

```html
<h-sync-tree-select
  clearable
  show-return
  show-checkbox
  :map="map"
  :page-size="20"
  :node-limit="50"
  :set-tree-data="setSingleTreeData"
  :set-search-data="setSearchData"
  v-model="values"
  style="width: 320px;"
>
</h-sync-tree-select>

<script>
import api from '@/api/api'
  export default {
    data() {
      return {
        map: {
          children: 'children',
          label: 'name',
          isLeaf: 'leaf',
          icon: 'iconSkin'
        }
      }
    },
    methods: {
      setTreeData ({parentId, pageNo, pageSize, keyWord}) {
        return new Promise(async(resolve, reject) => {
          try {
            let {data} = await api.fetchRealTree()
            resolve(data)
          } catch (err) {
            console.error(err)
          }
        })
      },
      setSearchData (keyWord) {
        return new Promise(async(resolve, reject) => {
          try {
            let {data} = await api.fetchSearchTree({keyWord})
            resolve(data)
          } catch (err) {
            console.error(err)
          }
        })
      }
    }
  }
</script>
```

<script>
  const versions = require('docs/.vuepress/src/version.json');
  // 以下js内容和md上显示的是不同的
  // 以下主要为模拟数据，同时集成单选和多选的方法而专门写的
  // 使用还是以md上显示的使用为主
  export default {
    data() {
      return {
        versions,
        map: {
          children: 'children',
          label: 'name',
          isLeaf: 'leaf',
          icon: 'iconSkin'
        },
        dataCache: [],
        userData: [],
        values: [],
        singleData: ''
      }
    },
    created () {
      this.createSingleNodes()
    },
    methods: {
      pullNodes() {
        this.$refs.syncTree2.pullNodes();
      },
      pullNodesByKeys() {
        this.$refs.syncTree2.pullNodes(['root000000', '1-1', '1-1-1', '1-1-2']);
      },
      pushNodes() {
        this.$refs.syncTree2.pushNodes();
      },
      pullNodesByKeys() {
        this.$refs.syncTree2.pushNodes(['1-1-2']);
      },
      getAllChecked () {
        this.userData = this.$refs.syncTree2.getAllChecked().map(item => item.id)
      },
      setSearchData (keyWord) {
        return new Promise(resolve => {
          const data = this.dataCache.filter(item => item.id === 'root000000' || item.level !== 3 || (item.leaf && item.name.indexOf(keyWord) !== -1))
          resolve(
            JSON.parse(JSON.stringify(data))
          )
        })
      },
      setCheckTreeData ({parentId, pageNo, pageSize, keyWord}) {
        return new Promise(resolve => {
          // this.dataCache[0].checked = true
          // this.dataCache[2].checked = true
          // this.dataCache[22].checked = true
          // this.dataCache[23].checked = true
          const data = JSON.parse(JSON.stringify(this.dataCache))
          // data.forEach(item => {
          //   item.checked = true
          // })
          resolve(data)
        })
      },
      setHeirarTreeData ({parentId, pageNo, pageSize, keyWord}) {
        return new Promise(resolve => {
          if (!parentId) {
            resolve({
              rows: [this.dataCache.find(item => item.id === 'root000000')],
              lastPage: true
            })
          } else {
            let _data = this.dataCache.filter(item => item.pId === parentId)
            resolve({
              rows: JSON.parse(JSON.stringify(_data)),
              lastPage: true
            })
          }
        })
      },
      setSingleTreeData ({parentId, pageNo, pageSize, keyWord}) {
        return new Promise(resolve => {
          if (!parentId) {
            resolve({
              rows: [this.dataCache.find(item => item.id === 'root000000')],
              lastPage: true
            })
          } else {
            let _data = this.dataCache.filter(item => item.pId === parentId)
            let rows = _data.slice((pageNo - 1) * pageSize, pageNo * pageSize)
            resolve({
              rows: JSON.parse(JSON.stringify(rows)),
              lastPage: _data[0].level !== 3 ? true : pageNo * pageSize >= 100
            })
          }
        })
      },
      createSingleNodes () {
        this.dataCache = []
        this.dataCache.push(this.createNode({root: true}))
        for (let j = 1; j < 4; j++) {
          this.dataCache.push(this.createNode({pId: 'root000000', id: '' + j, num: j, level: 1}))
          this.dataCache.push(this.createNode({pId: '' + j, id: j + '-1', num: j, level: 2}))
          for (let i = 0; i < 100; i++) {
            let node = this.createNode({pId: j + '-1', id: j + '-1-' + (i + 1), leaf: true, num: i + 1, level: 3})
            this.dataCache.push(node)
          }
        }
      },
      createNode (option) {
        let node = {
          id: option.root ? 'root000000' : (option.id ? option.id : setID()),
          pId: option.pId ? option.pId : null,
          checked: false,
          chkDisabled: false,
          open: !!option.root,
          iconSkin: 'h-icon-home',
          leaf: !!option.leaf,
          level: option.level || ''
        }
        if (option.root) {
          node.name = '默认根区域'
        } else if (option.num && option.level) {
          node.name = '节点' + option.num + '-' + option.level
        } else {
          node.name = '节点' + Math.floor(Math.random() * 1000)
        }
        return node
      },
      singleTreeData () {
        return new Promise((resolve) => {
          let list = []
        })
      }
    }
  }
</script>

## API

sync-tree-select树选择组件引入的HUI-Pro的`sync-tree`组件，树相关的属性、方法和事件均于其配置一致。

### Attributes

| 参数                   | 说明                                                                                            | 类型                      | 可选值              | 默认值    |
| -------------------- | --------------------------------------------------------------------------------------------- | ----------------------- | ---------------- | ------ |
| value                | 可用`v-model`绑定，单选为`String`或是`Number`，多选为`Array`（单选回显时，使用`Object`）                          | String/Number/Array/Object     | -                | -      |
| placeholder          | 选框内的占位符文字                                                                                     | String                  | -                | 请选择    |
| multiple-nowrap      | 多选时选中项过多，超过一行时不进行换行，多出来的内容截断处理                                                                | Boolean                 | -                | false  |
| collapse-tags        | 多选时是否将选中值按文字的形式展示                                                           | Boolean                 | -                | false  |
| show-path            | 是否展示路径（仅单选时有效）                                                                                | Boolean                 | -                | false  |
| default-icon            |                       默认图标                                                         | String                 | -                | -  |
| popper-append-to-body | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false            | Boolean       | — | true  |
| disabled             | 是否禁用                                                                                          | Boolean                 | -                | false  |
| clearable            | 是否可清空                                                                                            | Boolean                 | -                | true  |
| loading         | 树是否处于加载状态                                                                                     | Boolean                 | -                | false  |
| show-return         | 是否需要数据回显（不需要回显时请设置为`false`，性能更佳）                                          | Boolean                 | -                | false  |
| delay-check         | 是否当隐藏pop弹框的时候再计算和显示勾选的节点（设置为`true`性能更佳）                     | Boolean                 | -                | false  |
| show-checkbox | 是否显示勾选框 | Boolean | - | false |
| map | 映射关系（和HUI-tree上的props属性相同） | Object | - | {children: "children", label: "name", isLeaf: "leaf", icon: "iconSkin", disabled: "chkDisabled", selectable: "selectable"} |
| type | 类型 | String | async:异步（后台分页）；sync：同步（前端分页）；mixed:混合；hierarchical：分层（父子后台分页，同级前端分页） | async |
| node-key | tree上的node-key | String | - | id |
| parent-key | tree上的parent-key | String | - | pId |
| root-parent-key | 根节点父节点对应的值（默认父节点Id为null,'0','-1'算根节点） | String/Number | - | null |
| check-strictly       | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法。          | Boolean                 | -                | false  |
| page-size | 每页数据量 | Number | - | 100 |
| set-tree-data | 设置树节点数据（return一个promise对象），必填 | Function | - | 见demo |
| set-search-data | 设置搜索时树节点数据（return一个promise对象），必填 | Function | - | 见demo |
| vnode-title | 虚拟节点的title文字 | String | - | 更多 |
| search-text | 搜索框的文字 | String | - | - |
| node-limit-alert | 展示节点数量限制上限的提示 | String| - | 当前查看数据量较大，流畅度会有所下降，建议使用搜索。 |
| search-limit-alert | 搜索节点数量限制上限的提示 | String | - | 搜索结果过多，仅展示前500条，建议缩小搜索范围。 |
| search-input-text | 搜索框中placeholder的提示 | String | - | 搜索 |
| search-maxlength | 搜索框中输入长度限制 | Number | - | - |
| showSearchInput | 是否显示搜索框 | Boolean | - | true |
| hide-popper-after-selected | 是否在选中节点后隐藏弹出框（仅单选有效）            | Boolean       | — | false  |
| prefix-icon | 前缀图标            | String       | — | -  |
| render-content | 树节点的渲染函数            | Function       | — | -  |
| popperClass | popper弹出框的className            | String       | — | -  |

### 方法
| 方法 | 说明 | 参数 |
|------|------|------|
| setValue | 根据绑定的`value`属性值重置选中的数据 | - |
| getNode             | 根据 data 或者 key 拿到 Tree 组件中的 node                                                | (data) 要获得 node 的 key 或者 data                                                                                                                  |
| expandNode          | 展开节点                                                                            | (data) 要展开节点 的 key 或者 data                                                                                                                     |
| collapseNode        | 收起节点                                                                            | (data) 要收起节点 的 key 或者 data                                                                                                                     |
| remove              | 删除 Tree 中的节点，可以是数组                                                              | (data) 要删除的节点的 data、key 或者 node                                                                                                                |
| append              | 为 Tree 中的一个节点追加子节点，可以是数组                                                        | (data, parentNode) 1. 要追加的子节点的 data 2. 子节点的 parent 的 data、key 或者 node                                                                          |
| insertBefore        | 为 Tree 的一个节点的前面增加一个节点                                                           | (data, refNode) 1. 要增加的节点的 data 2. 要增加的节点的后一个节点的 data、key 或者 node                                                                              |
| insertAfter         | 为 Tree 的一个节点的后面增加一个节点                                                           | (data, refNode) 1. 要增加的节点的 data 2. 要增加的节点的前一个节点的 data、key 或者 node                                                                              |

### Events
| 事件 | 说明 | 回调参数 |
|------|------|------|
| show             | 下拉框出现的事件回调          | -                                                                                                                 |
| hide             | 下拉框收起的事件回调          | -                                                                                                                 |
| node-click       | 节点被点击时的回调           | 共四个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身和click事件对象。                                                 |
| check            | 当复选框被点击的时候触发        | 共两个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性 |
| current-change   | 当前选中节点变化时触发的事件      | 共两个参数，依次为：当前节点的数据，当前节点的 Node 对象                                                                                   |
| node-expand      | 节点被展开时触发的事件         | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。                                                           |
| node-collapse    | 节点被关闭时触发的事件         | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。                                                           |
| clear    | 可清空时用户点击清空按钮时触发         | ——                                                           |
| clear-search-tree    | 树搜索框清除事件         | ——                                                           |