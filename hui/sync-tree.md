# SyncTree 异步树

<template>
  <author-info 
    :version="versions['sync-tree']"
    author="徐子龙"
  />
</template>

## 异步树使用须知

1. 异步树是为了解决大数据量下树节点展示和操作问题，它根据isc项目实际应用场景设计（[交互设计文档](http://10.1.14.29/%E6%B5%B7%E8%B1%9A%E5%B9%B3%E5%8F%B0_%E5%BC%82%E6%AD%A5%E6%A0%91%E5%8F%8A%E7%A9%BF%E6%A2%AD%E6%A1%86%E6%96%B9%E6%A1%88/index.html#g=1&p=%E6%A0%91%E5%BD%A2%E6%8E%A7%E4%BB%B6)）需要一定后台数据的支持。无法支持所有需求，异步树组件对此一般也不再会进行大幅度的调整和改动；
2. 单选异步树和多选异步树可能存在不同的数据方式，在以往版本中，单选异步树我们要求后台分页返回数据，多选异步树要求后台一次返回所有数据；
3. 与HUI的树不同，异步树联动勾选仅支持父联动子（子节点的勾选与去勾选不会影响父节点），且没有半选的概念；
4. 异步树要实现分页效果，它的数据节点格式如下：
```json
{
  "lastPage": false,
  "rows": [
    { "id": "1", "name": "节点1", "open": true },
    { "id": "2", "name": "节点2", "open": true },
    { "id": "3", "name": "节点3", "open": true }
  ]
}
```
其中`lastPage`为`false`时，代表存在下一页数据，则节点末会出现......的符号可点击展开。`open`属性代表节点加载后是否自动展开。`rows`这个字段是写死的，其余字段均可在组件中配置。

5. 异步树的性能不是无限的，在页面已加载和展示的数据太多时，还是会出现性能问题。
6. 如果引用后出现不显示数据或是数据无限加载的问题，请检查传入的根节点数据是否有问题。

## 安装

```bash
$ npm i @hui-pro/sync-tree -D
# 或者
$ yarn add @hui-pro/sync-tree --dev
```

## 引入

```js
import syncTree from '@hui-pro/sync-tree';
import '@hui-pro/sync-tree/theme/index.scss';
Vue.use(syncTree);
```

## 单选异步树

<template>
  <code-box title="单选异步树" description="单选树结构，每次展开子节点或点击“加载更多”会从后台服务器分页拿取数据。查询节点时后台一次返回所有查询到的数据。">
    <div class="sync-tree-box">
      <sync-tree
        move
        move-area="all"
        :map="map"
        :page-size="20"
        :node-limit="50"
        :set-tree-data="setSingleTreeData"
        :set-search-data="setSearchData"
      ></sync-tree>
    </div>
  </code-box>
</template>

```vue
<template>
  <div style="width: 320px;">
    <sync-tree
      :map="map"
      :pageSize="20"
      :node-limit="50"
      :set-tree-data="setTreeData"
      :set-search-data="setSearchData"
    ></sync-tree>
  </div>
</template>

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

## 多选异步树

<template>
  <code-box title="多选异步树" description="多选树结构，后台服务器一次返回所有数据，展开子节点或点击“加载更多”时控件会自动进行处理。查询节点时后台一次返回所有查询到的数据。">
    <div class="sync-tree-box">
      <sync-tree
        ref="syncTree2"
        show-checkbox
        :map="map"
        type="hierarchical"
        :highlight-current="false"
        :page-size="20"
        :node-limit="50"
        :set-tree-data="setHeirarTreeData"
        :set-search-data="setSearchData"
      ></sync-tree>
    </div>
  </code-box>
</template>

```vue
<template>
  <div style="width: 320px;">
    <sync-tree
      :map="map"
      :highlight-current="false"
      type="sync"
      :pageSize="20"
      :node-limit="50"
      :set-tree-data="setTreeData"
      :set-search-data="setSearchData"
    ></sync-tree>
  </div>
</template>

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
        userData: []
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
            _data.forEach(item => {
              if (item.id === '1-1') {
                item.chkDisabled = true
              }
            })
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

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| map | 映射关系（和HUI-tree上的props属性相同） | Object | - | {children: "children", label: "name", isLeaf: "leaf", icon: "iconSkin", disabled: "chkDisabled", selectable: "selectable"} |
| type <Badge text="1.3.3+" /> | 类型 | String | async:异步（后台分页）；sync：同步（前端分页）；mixed:混合；hierarchical：分层（父子后台分页，同级前端分页） | async |
| page-size | 每页数据量 | Number | - | 100 |
| node-key | tree上的node-key | String | - | id |
| parent-key | tree上的parent-key | String | - | pId |
| search-text | 搜索框的文字，可加`.sync`修饰符 | String | - | - |
| node-type-values <Badge text="1.3.3+" />  | 节点nodeType对应的值 | Object | - | { singleNode: 'singleNode', subTree: 'subTree' } |
| root-parent-key <Badge text="1.3.3+" /> | 根节点父节点对应的值（默认父节点Id为null,'0','-1'算根节点） | String/Number | - | null |
| loading | 是否处于加载状态 | Boolean | - | false |
| set-tree-data | 设置树节点数据（return一个promise对象），必填 | Function | - | 见demo |
| set-search-data | 设置搜索时树节点数据（return一个promise对象），必填 | Function | - | 见demo |
| current-node-key | 默认选中的节点的key | String | - | - |
| node-limit | 展示节点的数量限制 | Number | - | 1000 |
| node-limit-alert | 展示节点数量限制上限的提示 | String| - | 当前查看数据量较大，流畅度会有所下降，建议使用搜索。 |
| search-limit | 搜索节点的数量限制 | Number| - | 500 |
| search-limit-alert | 搜索节点数量限制上限的提示 | String | - | 搜索结果过多，仅展示前500条，建议缩小搜索范围。 |
| search-input-text | 搜索框中placeholder的提示 | String | - | 搜索 |
| search-maxlength | 搜索框中输入长度限制 | Number | - | - |
| v-node-key <Badge type="warn" text="2.0.0-beta.6已弃用" /> | 虚拟节点的标识 | String | - | $loadmore |
| v-node-title <Badge type="warn" text="2.0.0-beta.6已弃用" /> | 虚拟节点的title文字 | String | - | 更多 |
| vnode-key <Badge text="2.0.0-beta.6+" /> | 虚拟节点的标识 | String | - | $loadmore |
| vnode-title <Badge text="2.0.0-beta.6+" /> | 虚拟节点的title文字 | String | - | 更多 |
| key-highlight | 是否开启搜索关键字高亮 | Boolean | - | true |
| show-checkbox | 是否显示勾选框 | Boolean | - | false |
| check-strictly | 是否父子不联动 | Boolean | - | false |
| hide-node-title | 不显示节点上的title | Boolean | - | false |
| auto-load | 是否初始化的时候自动加载树 | Boolean | - | true |
| expand-on-click-node | 是否在点击节点的时候展开或者收缩节点， 默认值为 false，只有点箭头图标的时候才会展开或者收缩节点。 | Boolean | - | false |
| expand-on-dbclick-node | 是否在双击节点的时候展开或者收缩节点， 默认值为 true。 | Boolean | - | true |
| default-select-current | 是否默认选中节点（不传current-node-key将默认选中根节点） | Boolean | - | true |
| highlight-current | 是否高亮当前选中节点 | Boolean | - | true |
| default-icon  |   默认图标    | String                 | -                | -  |
| linked-expand-key | 联动展开的节点（会在树初始化的时候，自动展开该节点所在的所有父级节点，需要父级节点已经传给前端（混合类型或同步类型）才能生效） | String | - | - |
| accordion <Badge text="1.3.3+" /> | 是否开启手风琴 | Boolean | - | false |
| disabledInherit <Badge text="1.3.3+" /> | 是否继承禁用状态（继承禁用即为：父节点未加载子节点，操作父节点勾选并pullNodes后，展开加载子节点，此时子节点默认会继承父节点的禁用状态） | Boolean | - | true |
| showSearchInput <Badge text="1.17.1+" /> | 是否显示搜索框 | Boolean | - | true |
| disabled-with-checked <Badge text="2.0.0beta.4+" /> | 禁用和勾选是否并存 | Boolean | - | false |
| move | 移动节点 | Boolean | - | false |
| move-area | 节点可拖拽的区域，outter 表示节点只有拖拽到树区域以外才会响应 | string | all/outter | outter |
| before-drag | 移动前回调（和HUI相同） | Function | - | null |
| before-drop | 移动释放前回调（和HUI相同） | Function | - | null |
| has-original-checked | 是否含有初始化勾选的节点（data中有数据的checked为true）（为了优化性能） | Boolean | - | true |
| before-click | 点击前的回调 | Function | - | null |
| before-search | 点击搜索之前回调（return false就不再执行搜索） | Function | - | null |
| after-search | 点击搜索之后回调 | Function | - | null |
| after-loadmore | 完成加载更多之后的回调 | Function | - | null |
| after-load | 每次加载完数据之后的回调（包括展开和点击加载更多） | Function | - | null |
| check-on-click-node | 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。 | Boolean | - | false |

### 方法
| 方法 | 说明 | 参数 |
|------|------|------|
| refresh | 重新渲染异步树组件 | callback:渲染完第一层节点后的回调函数 |
| setSelected | 设置某个节点的选中状态 | (key/data, selected, deep) 接收三个参数，1. 选中节点的 key 或者 data 2. boolean 类型，节点是否选中 |
| setChecked | 通过 key / data 设置某个节点的勾选状态，使用此方法必须设置 node-key 属性 | (key/data, checked, deep) 接收三个参数，1. 勾选节点的 key 或者 data 2. boolean 类型，节点是否勾选 3. boolean 类型，是否设置子节点 ，默认为 false |
| getCheckedNodes | 获取勾选的节点（仅为已经渲染的节点） | - |
| getAllChecked | 获取勾选的所有节点（包括没有渲染的节点） | - |
| pullNodes | 抽取节点。return一个被抽取的nodes集合 | (keys)接收一个参数，keys代表节点key的数组集合，如果keys传的话，代表手动抽取传入的节点。 |
| pullAllLoadedNodes <Badge text="1.3.3+" /> | 抽取所有加载过的节点（仅分层模式下） | 返回一个被抽取节点的集合 |
| pushNodes | 还原被抽取的节点 | (keys)接收一个参数，keys代表节点key的数组集合 |
| getHandleChecked <Badge text="1.3.3+" /> | 获取操作过的节点（仅分层模式下） | 返回一个对象，包含新勾选节点和去勾选节点的两个数组 |
| getAllRenderNodes <Badge text="1.3.3+" /> | 获取所有渲染过的节点 | 返回一个节点的list数组 |
| getAllLoadedDataWithHierar <Badge text="1.3.3+" /> | 获取已经加载过的节点（仅分层模式下） | 返回一个节点的list数组 |
| search <Badge text="2.0.0+" /> | 手动触发搜索 | 接受一个参数（搜索框文字），若不传将自动使用搜索框当前文字，若传了赋值给搜索框文字 |

### Events
| 事件 | 说明 | 回调参数 |
|------|------|------|
| init-select | 节点初始化选择事件 | 共两个参数，依次为：当前节点的数据，当前节点的 Node 对象。 |
| node-click | 节点点击事件 | 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。 |
| current-change | 当前选中节点变化时触发的事件 | 共两个参数，依次为：当前节点的数据，当前节点的 Node 对象 |
| check-change | 节点选中状态发生变化时的回调 | 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点 |
| node-expand | 节点展开事件 | 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。 |
| node-collapse | 节点关闭事件 | 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。 |
| node-drag | 节点移动前事件 | 共四个参数，依次为：事件event对象，传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。 |
| node-drop | 节点移动释放事件 | 共六个参数，依次为：事件event对象，传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、目标节点targetNode、位置position、节点组件本身。 |
| node-drag-move | 节点移动中事件 | 共四个参数，依次为：事件event对象，传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。 |
| node-mouseenter | 鼠标移入节点事件 | 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、mouseenter 事件对象。 |
| node-mouseleave | 鼠标移出节点事件 | 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、mouseleave 事件对象。 |
| clear-search-tree | 树搜索框清除事件 | - |
| on-scrolling-x | 横向滚动时触发事件,参数返回滚动距离和已滚动百分比（百分比为 1 则表示滚动到尽头） | {scrollLeft, percentX } |
| on-scrolling-y | 纵向滚动时触发事件,参数返回滚动距离和已滚动百分比（百分比为 1 则表示滚动到尽头） | {scrollTop, percentY } |
| on-scrolling | 滚动时触发事件,参数返回滚动距离和已滚动百分比（百分比为 1 则表示滚动到尽头） | {scrollLeft, scrollTop, percentX, percentY } |


## 1.3.3修改内容说明

### 主要内容
1. 是否勾选与加载模式解耦。`showCheckbox`设置节点是否存在勾选；`type`设置加载模式。现在的加载模式有`async`异步、`sync`同步、`mixed`混合、`hierarchical`分层4种。
2. 支持自定义根节点的父节点。之前是`null`、`'0'`、`'-1'`3种值，现在支持可使用`rootParentKey`属性设置任意值。
3. 支持自定义虚拟节点的标识。虚拟节点······以前标识是`$loadmore`，现在可使用`vNodeKey`属性自定义。
4. 更好的支持树`props`映射关系的自定义。以前`chkDisabled`等字段是代码里写死的，现在可以用`map`属性自定义。
5. 抛出新的方法：`getAllRenderNodes`获取所有渲染过的节点，`getAllLoadedDataWithHierar`分层模式下获取所有加载过的节点

### 迁移文档
#### 说明
**重构后的异步树兼容之前的所有属性、方法和事件**，如果你的项目中不想采用新的分层方案，只需要设置`type`属性即可（单选的值为`async`，多选的值为`sync`）。   
2.0中哪怕什么都不改，性能也能提升一倍左右。

```html
<!-- 老方案 -->
<sync-tree
  show-checkbox
  :map="map"
  :set-tree-data="setHeirarTreeData"
  :set-search-data="setSearchData"
></sync-tree>

<!-- 新方案 -->
<sync-tree
  show-checkbox
  :map="map"
  type="sync"
  :set-tree-data="setHeirarTreeData"
  :set-search-data="setSearchData"
></sync-tree>
```

#### 以下步骤针对的是采用分层模式的设计方案

##### 前端部分
1. 安装最新异步树控件
```bash
$ npm i @hui-pro/sync-tree@latest
```

2. 设置属性`type="hierarchical"`、`accordion=true`
```html
<sync-tree
  ref="syncTree"
  show-checkbox
  :map="map"
  type="hierarchical"
  accordion
  :set-tree-data="setHeirarTreeData"
  :set-search-data="setSearchData"
></sync-tree>
```

3. 点击保存时，调用`getHandleChecked`获取数据。  
   注意，这是一个json对象，其中包括`add`和`del`两个值，分别代表本次操作勾选的节点和去勾选的节点。请根据业务需要自行处理。

4. 处理保存的数据。
   现在传给后台的不再是一个逗号`,`分隔的字符串，而是一个list数组，你需要通过`data.map()`方法将数据提取出来，示例代码如下。
```js
const data = this.$refs.syncTree.getHandleChecked();
const { add, del } = data;

const addData = add.map(item => ({
  id: item.id,
  nodeType: item.nodeType
}));
console.log(addData);
// [
//   { id: '1', nodeType: 'singleNode' },
//   { id: '2', nodeType: 'subTree' }
// ]

this.save(addData);
```

##### 后台对接
后台存储的数据不再是全量的勾选数据，而是一个增量勾选的数据集合，数据中不包括没有从后台加载出的节点，后续需要自己计算。