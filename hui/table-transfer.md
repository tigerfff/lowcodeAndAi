# TableTransfer 表格穿梭框

<template>
  <author-info
    :version="versions['table-transfer']"
    author="相霄3"
  />
</template>

:::warning
这个穿梭框实现及其复杂，存在性能问题，设计端没有很好的解决方案，所以选这个控件的时候请谨慎

详见讨论链接<http://iris.hikvision.com.cn/hui-vue/hui-vue-pro/issues/259>
:::

## 安装

```bash
$ npm i @hui-pro/table-transfer -D
# 或者
$ yarn add @hui-pro/table-transfer --dev
```

## 引入

```js
import tableTransfer from '@hui-pro/table-transfer';
import '@hui-pro/table-transfer/theme/index.scss';
Vue.use(tableTransfer);
```

## 表格内容穿梭

<template>
  <code-box title="表格内容穿梭" description="右侧列表数据需要回显时，数据中需要包含这些数据的所属组织字段。配合`belongField`使用，右侧的`5-system`移动回去就消失，因为他的`belongArea`不等于`root`<br /> 左侧为虚拟滚动配置项：`left-enable-virtual-scroll`、`right-enable-virtual-scroll` <br /> 左侧如果还需要加tree需要单独实现，可以参考`lego`中的`demo`">
    <div style="height:522px;">
      <h-table-transfer
        ref="tableTransfer"
        :left-table-data="leftData"
        :right-table-data="rightData"
        tree-node-id="root"
        left-enable-virtual-scroll
        right-enable-virtual-scroll
        row-key="id"
        :name-key="['label', 'description']"
        :load-num="50"
        >
        <el-button slot="leftAddition" type="link" style="float: right">额外按钮</el-button>
        <el-button slot="rightAddition" type="link" style="float: right">额外按钮</el-button>
        <template slot="leftTableColumn">
          <el-table-column label="label" prop="label" show-overflow-title></el-table-column>
          <el-table-column label="description" prop="description" show-overflow-title></el-table-column>
          <el-table-column
            prop="description"
            label="主体编号">
            <template slot-scope="scope">
              <i class="h-icon-circle_info"></i>
            </template>
          </el-table-column>
        </template>
        <template slot="rightTableColumn">
          <el-table-column label="label" prop="label" show-overflow-title></el-table-column>
          <el-table-column label="description" prop="description" show-overflow-title></el-table-column>
        </template>
      </h-table-transfer>
    </div>
  </code-box>
</template>

```html
<template>
  <div style="height:522px;">
    <h-table-transfer
      ref="tableTransfer"
      :left-table-data="leftData"
      :right-table-data="rightData"
      tree-node-id="root"
      left-enable-virtual-scroll
      right-enable-virtual-scroll
      row-key="id"
      :name-key="['label', 'description']"
      :load-num="50"
      >
      <el-button slot="leftAddition" type="link" style="float: right">额外按钮</el-button>
      <el-button slot="rightAddition" type="link" style="float: right">额外按钮</el-button>
      <template slot="leftTableColumn">
        <el-table-column label="label" prop="label" show-overflow-title></el-table-column>
        <el-table-column label="description" prop="description" show-overflow-title></el-table-column>
        <el-table-column
          prop="description"
          label="主体编号">
          <template slot-scope="scope">
            <i class="h-icon-circle_info"></i>
          </template>
        </el-table-column>
      </template>
      <template slot="rightTableColumn">
        <el-table-column label="label" prop="label" show-overflow-title></el-table-column>
        <el-table-column label="description" prop="description" show-overflow-title></el-table-column>
      </template>
    </h-table-transfer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        leftData: [],
        rightData: [
          {
            'id': '1-1',
            'label': '4-base',
            'belongArea': 'root',
            'description': 'System Manager'
          },{
            'id': '2-1',
            'label': '5-System',
            'belongArea': 'notbelongroot',
            'description': '无法移动回去'
          }
        ],
        tableTreeLeft: [],
        tableTreeRight: []
      };
    },

    created() {
      for (let i = 0; i < 500; i++) {
        this.bigTestData.push({
          id: i,
          label: `${i}-System`,
          belongArea: 'root',
          description: `System Manager ${i}`
        });
      }
    },

    mounted() {
      this.leftData = this.bigTestData;
    }
  };
</script>
```

## 表格内容穿梭，搜索区域自定义

<template>
  <code-box title="表格内容穿梭，搜索区域自定义" description="通过 `leftSearchBar` `rightSearchBar` 插槽加对应的代码">
    <div style="height:522px;">
      <h-table-transfer
        ref="tableTransfer"
        :left-table-data="leftData"
        :right-table-data="rightData"
        :left-filter-handler="leftFilterHandler"
        :right-filter-handler="rightFilterHandler"
        tree-node-id="root"
        row-key="id"
        :name-key="['label', 'description']"
        :is-show-check-box="true"
        :load-num="50"
        >
        <template slot="leftSearchBar" slot-scope="scope">
          <el-input
            placeholder="请输入内容"
            v-model="leftTableSearchKeyword"
            :on-icon-click="scope.leftFilter"
            @keyup.enter.native="scope.leftFilter"
            :clear-icon-click="scope.leftClearFilter"
            clearable
            suffix-icon="h-icon-search"
          >
            <el-select style="width: 120px" v-model="leftTableSearchType" slot="prepend" placeholder="请选择">
              <el-option label="label" value="1"></el-option>
              <el-option label="description" value="2"></el-option>
            </el-select>
          </el-input>
        </template>
        <template slot="leftTableColumn">
          <el-table-column label="label" prop="label" :show-overflow-title="true"></el-table-column>
          <el-table-column label="description" prop="description" :show-overflow-title="true"></el-table-column>
          <el-table-column
            prop="description"
            label="主体编号">
            <template slot-scope="scope">
              <i class="h-icon-circle_info"></i>
            </template>
          </el-table-column>
        </template>
        <template slot="rightSearchBar" slot-scope="scope">
          <el-input
            placeholder="请输入内容"
            v-model="rightTableSearchKeyword"
            :on-icon-click="scope.rightFilter"
            @keyup.enter.native="scope.rightFilter"
            :clear-icon-click="scope.rightClearFilter"
            clearable
            suffix-icon="h-icon-search"
          >
            <el-select style="width: 120px" v-model="rightTableSearchType" slot="prepend" placeholder="请选择">
              <el-option label="label" value="1"></el-option>
              <el-option label="description" value="2"></el-option>
            </el-select>
          </el-input>
        </template>
        <template slot="rightTableColumn">
          <el-table-column label="label" prop="label" :show-overflow-title="true"></el-table-column>
          <el-table-column label="description" prop="description" :show-overflow-title="true"></el-table-column>
        </template>
      </h-table-transfer>
    </div>
  </code-box>
</template>

```html
<template>
  <div style="height:522px;">
    <h-table-transfer
      ref="tableTransfer"
      :left-table-data="leftData"
      :right-table-data="rightData"
      :left-filter-handler="leftFilterHandler"
      :right-filter-handler="rightFilterHandler"
      tree-node-id="root"
      row-key="id"
      :name-key="['label', 'description']"
      :is-show-check-box="true"
      :load-num="50"
    >
      <template slot="leftSearchBar" slot-scope="scope">
        <el-input
          placeholder="请输入内容"
          v-model="leftTableSearchKeyword"
          :on-icon-click="scope.leftFilter"
          @keyup.enter.native="scope.leftFilter"
          :clear-icon-click="scope.leftClearFilter"
          clearable
          suffix-icon="h-icon-search"
        >
          <el-select
            style="width: 120px"
            v-model="leftTableSearchType"
            slot="prepend"
            placeholder="请选择"
          >
            <el-option label="label" value="1"></el-option>
            <el-option label="description" value="2"></el-option>
          </el-select>
        </el-input>
      </template>
      <template slot="leftTableColumn">
        <el-table-column
          label="label"
          prop="label"
          :show-overflow-title="true"
        ></el-table-column>
        <el-table-column
          label="description"
          prop="description"
          :show-overflow-title="true"
        ></el-table-column>
        <el-table-column prop="description" label="主体编号">
          <template slot-scope="scope">
            <i class="h-icon-circle_info"></i>
          </template>
        </el-table-column>
      </template>
      <template slot="rightSearchBar" slot-scope="scope">
        <el-input
          placeholder="请输入内容"
          v-model="rightTableSearchKeyword"
          :on-icon-click="scope.rightFilter"
          @keyup.enter.native="scope.rightFilter"
          :clear-icon-click="scope.rightClearFilter"
          clearable
          suffix-icon="h-icon-search"
        >
          <el-select
            style="width: 120px"
            v-model="rightTableSearchType"
            slot="prepend"
            placeholder="请选择"
          >
            <el-option label="label" value="1"></el-option>
            <el-option label="description" value="2"></el-option>
          </el-select>
        </el-input>
      </template>
      <template slot="rightTableColumn">
        <el-table-column
          label="label"
          prop="label"
          :show-overflow-title="true"
        ></el-table-column>
        <el-table-column
          label="description"
          prop="description"
          :show-overflow-title="true"
        ></el-table-column>
      </template>
    </h-table-transfer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        leftData: [],
        rightData: [
          {
            'id': '1-1',
            'label': '4-base',
            'belongArea': 'root',
            'description': 'System Manager'
          },{
            'id': '2-1',
            'label': '5-System',
            'belongArea': 'notbelongroot',
            'description': '无法移动回去'
          }
        ],
        tableTreeLeft: [],
        tableTreeRight: [],
        leftTableSearchKeyword: '',
        leftTableSearchType: '1',
        rightTableSearchKeyword: '',
        rightTableSearchType: '1'
      };
    },

    created() {
      for (let i = 0; i < 500; i++) {
        this.bigTestData.push({
          id: i,
          label: `${i}-System`,
          belongArea: 'root',
          description: `System Manager ${i}`
        });
      }
    },

    mounted() {
      this.leftData = this.bigTestData;
    },
    methods: {
      // 穿梭框中左侧搜索表格数据的处理方法
      leftFilterHandler(item) {
        if (this.leftTableSearchType === '1') {
          return item.label.includes(this.leftTableSearchKeyword);
        }
        if (this.leftTableSearchType === '2') {
          return item.description.includes(this.leftTableSearchKeyword);
        }
      },
      // 穿梭框中右侧搜索表格数据的处理方法
      rightFilterHandler(item) {
        if (this.rightTableSearchType === '1') {
          return item.label.includes(this.rightTableSearchKeyword);
        }
        if (this.rightTableSearchType === '2') {
          return item.description.includes(this.rightTableSearchKeyword);
        }
      }
    }
  };
</script>
```

## 树表格内容穿梭

<template>
  <code-box title="树表格内容穿梭" description="穿梭框可以结合树形表格列控件 `h-table-tree-column` 一起使用<br/> 无法使用虚拟滚动，数据层级也仅支持2级">
    <div style="height:522px;">
      <h-table-transfer
        ref="tableTransfer"
        :left-table-data="tableTreeLeft"
        :right-table-data="tableTreeRight"
        row-key="indexCode"
        parent-key="parentIndexCode"
        :name-key="['label', 'parentLabel']"
        tree-node-id="root"
        :is-table-tree="true"
        :is-show-check-box="true"
        @select-change="selectChange"
        @left-table-search="leftTableSearch"
        :load-num="20"
        >
        <template slot="leftTableColumn">
          <h-table-tree-column
            prop="label"
            label="label"
            tree-key="indexCode"
            parent-key="parentIndexCode"
            :expand-on-click-node="false"
            :checkedDatas="checkedDatas"
            :show-overflow-title="true"
            class-name="test"
          ></h-table-tree-column>
          <el-table-column label="description" prop="description" :show-overflow-title="true"></el-table-column>
        </template>
        <template slot="rightTableColumn">
          <el-table-column label="label" prop="label" :show-overflow-title="true"></el-table-column>
          <el-table-column label="descript1111ion" prop="description" :show-overflow-title="true"></el-table-column>
        </template>
        <template slot="empty">
          <p>自定义无数据展示</p>
        </template>
      </h-table-transfer>
    </div>
  </code-box>
</template>

```html
<template>
  <div style="height:522px;">
    <h-table-transfer
      ref="tableTransfer"
      :left-table-data="tableTreeLeft"
      :right-table-data="tableTreeRight"
      row-key="indexCode"
      parent-key="parentIndexCode"
      :name-key="['label', 'parentLabel']"
      tree-node-id="root"
      :is-table-tree="true"
      :is-show-check-box="true"
      :load-num="20"
    >
      <template slot="leftTableColumn">
        <h-table-tree-column
          prop="label"
          label="label"
          tree-key="indexCode"
          parent-key="parentIndexCode"
          :expand-on-click-node="false"
          :show-overflow-title="true"
          class-name="test"
        ></h-table-tree-column>
        <el-table-column
          label="description"
          prop="description"
          :show-overflow-title="true"
        ></el-table-column>
      </template>
      <template slot="rightTableColumn">
        <el-table-column
          label="label"
          prop="label"
          :show-overflow-title="true"
        ></el-table-column>
        <el-table-column
          label="description"
          prop="description"
          :show-overflow-title="true"
        ></el-table-column>
      </template>
      <template slot="empty">
        <p>自定义无数据展示</p>
      </template>
    </h-table-transfer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableTreeLeft: []
      };
    },

    created() {
      for (let i = 0; i < 100; i++) {
        this.bigTestData2.push({
          indexCode: `no-${i}-item`,
          parentIndexCode: 'root',
          leaf: false,
          parentLabel: `${i}-System-${i}`,
          label: `${i}-System-${i}`,
          description: `System Manager ${i}`
        });
      }
      this.bigTestData2.forEach((item, index) => {
        for (let j = 0; j < 2; j++) {
          this.bigTestData2.push({
            indexCode: `${index}-${j}`,
            parentIndexCode: `no-${i}-item`,
            leaf: true,
            parentLabel: `${index}-System-${index}`,
            label: `${index}-${j}-System`,
            description: `System Manager ${index}-${j}`
          });
        }
      });
    },

    mounted() {
      this.tableTreeLeft = bigTestData2;
    }
  };
</script>
```

<script>
const versions = require('docs/.vuepress/src/version.json');
export default {
  data () {
    return {
      versions,
      // 这个字段是控制树列表的选择状态的
      checkedDatas: [],
      bigTestData: [],
      bigTestData2: [],
      leftData: [],
      rightData: [{
        'id': '1-1',
        'label': '4-base',
        'belongArea': 'root',
        'description': 'System Manager'
      },{
        'id': '2-1',
        'label': '5-System',
        'belongArea': 'notbelongroot',
        'description': '无法移动回去'
      }],
      tableTreeLeft: [],
      tableTreeRight: [],
      leftTableSearchKeyword: '',
      leftTableSearchType: '1',
      rightTableSearchKeyword: '',
      rightTableSearchType: '1'
    }
  },

  created () {
    for (let i = 0; i < 500; i++) {
      this.bigTestData.push({
        id: i,
        label: `${i}-System`,
        belongArea: 'root',
        description: `System Manager ${i}`
      })
    }

    for (let i = 0; i < 100; i++) {
      this.bigTestData2.push({
        indexCode: `no-${i}-item`,
        parentIndexCode: 'root',
        leaf: false,
        parentLabel: `${i}-System-${i}`,
        label: `${i}-System-${i}`,
        description: `System Manager ${i}`
      })
    }
    this.bigTestData2.forEach((item, index) => {
      for (let j = 0; j < 2; j++) {
        this.bigTestData2.push({
          indexCode: `${index}-${j}`,
          parentIndexCode: `no-${index}-item`,
          leaf: true,
          parentLabel: `${index}-System-${index}`,
          label: `${index}-${j}-System`,
          description: `System Manager ${index}-${j}`
        })
      }
    })
    this.leftData = this.bigTestData
    this.tableTreeLeft = this.bigTestData2
  },

  mounted () {
    this.leftData = this.bigTestData
    this.tableTreeLeft = this.bigTestData2
  },
  methods: {
    // 这个需要单独控制一下
    selectChange(selections){
      this.checkedDatas = selections
    },
    leftTableSearch() {
      this.checkedDatas = []
    },
    // 穿梭框中左侧搜索表格数据的处理方法
    leftFilterHandler (item) {
      if (this.leftTableSearchType === '1') {
        return item.label.includes(this.leftTableSearchKeyword)
      }
      if (this.leftTableSearchType === '2') {
        return item.description.includes(this.leftTableSearchKeyword)
      }
    },
    // 穿梭框中右侧搜索表格数据的处理方法
    rightFilterHandler (item) {
      if (this.rightTableSearchType === '1') {
        return item.label.includes(this.rightTableSearchKeyword)
      }
      if (this.rightTableSearchType === '2') {
        return item.description.includes(this.rightTableSearchKeyword)
      }
    }
  }
}
</script>

### 常见问题

**1. 从左侧移到右侧没有问题，但是从左侧移到右侧报错。**

> 1. 左侧存在组织树或者区域树时，穿梭框从左侧移到右侧时，内部会通过 belongArea（没有设置 belongField 的情况下）判断移动的节点是否属于当前左侧树选中的组织或者区域，如果属于才会显示在右侧的列表中，不属于的会移过去，但是不会显示。
>
> 2. 右侧节点数据中需要包含该节点所属的区域或者组织的数组（一般情况下是节点的 id）

**2. 需求中有包含下级的功能，在勾选包含下级的情况下，右侧数据移到左侧时，左侧没有显示移动的节点。**

> 在这种情况下，右侧列表的数据中的所属组织或者区域的字段需要是一个包含该节点的所有父节点的数组，这样向左移动时，只要是移动节点中的所属组织或者区域的数据包含当前选中的组织或者区域，那么都能移过去并且显示。

**3. 什么情况下不需要传入`belongArea`。**

> 如果只是单个穿梭框的情况下（没有回显的需求），可以不传入该字段。控件内部会默认将`treeNodeId`字段作为该字段的值。所以`treeNodeId`是必传字段，但是对具体的值没有什么要求。

**4. 直接修改`leftTableDate`和`rightTableData`值为什么没有生效。**

> 为了不受对象引用造成影响，控件内部在接收到上面两个参数之后，会完全拷贝一份，所以如果想修改这两个参数需要重新赋值。不推荐利用对象的引用关系直接修改数据，这样会使数据的变化变的很难跟踪。

> 可以通过两次赋值来实现这个功能。具体原理可以参考 [issues](http://iris.hikvision.com.cn/hui-vue/hui-vue/-/issues/812#note_118573)

**5. 为什么要前端做搜索。可以改成后台搜索吗？**

> 控件中的一些交互，比如：全选，移到左侧之后，右侧需要消失等交互，如果是后台搜素就无法实现。

如果存在真的数据量特别大的情况时，可以改成后台搜索，但是会存在一定限制。下面是海豚中使用的折中方式：

- 后台永远只返回给前端 前 1000 条数据，用户可以通过精确搜索来获得其它想要的数据
- 搜索由在前端搜索改为在后台搜索（因为前端仅能在获得的所有数据中搜）；
- 穿梭框右侧数据超过 1000 条时，就不能再执行从左往右穿梭的操作（但是可以从右往左穿回来）。换句话说，每次仅能保存至多 1999 条数据，如果有 2000 条数据，需要保存后重新进入页面执行第二次操作。

**6. 树穿梭框的选中问题。**

> 为了不受对象引用造成影响，在树列表展开和收起的情况下开发要做一定的业务处理，才可能保证选中值没有问题，具体可以看本页的demo

### TableTransfer 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| is-table-tree | 用于标记是否是表格树 | Boolean | true/false | false |
| load-num | 一页展示展示的条数（能避免页面一次性渲染大量ＤＯＭ的问题，但是数据量过大导致的性能的问题还是无法避免） | Number |  | 1000 |
| big-data-mode | 是否是大数据模式，这个适用于数据量非常大的业务场景，开启之后，已选数量和总数会被影藏掉，数据总条数可以自定义，配合后台搜索，来避免数据量过大，页面卡死的情况 | Boolean |  | false |
| left-table-data | 左侧表格数据 | Array |  | [] |
| right-table-data | 右侧表格数据 | Array |  | [] |
| tree-node-id | 如果穿梭框左侧还有树，该字段用于描述列表中的根节点与左侧树的父子关系 | String |  |  |
| row-key | 每一条数据唯一id的key | String |  | id |
| btn-type | 左右移按钮的大小，small对应的按钮宽度是32px；normal对应的按钮宽度是40px；big对应的按钮宽度是48px；text对应的是按钮有文字显示； | String | small/normal/big/text | normal |
| parent-key | 父节点Id的key | String |  | pId |
| name-key | 搜索名称的key，传入array时，支持多列内容搜索。注意：array的第一个值或string必须为列表的第一列的prop | String, Array |  |  |
| cache-right-data | 右侧列表作为独立的数据源，与左侧表格选中无关，只和外部传入有关 | Boolean |  | true |
| is-show-check-box | 是否显示左侧表格右上角checkbox | Boolean |  | false |
| check-text | 左侧表格右上角checkbox的文字信息 | String |  | 包含下级人员 |
| belong-field | 节点所属组织（区域）的字段，右侧列表如果有回显的数据时，需要配置该字段 | String |  | belongArea |
| left-table-title | 待添加表格标题 | String |  | 待添加 |
| left-table-input-ph | 待添加表格搜索的placeholder | String |  | 搜索... |
| left-table-loading-text | 待添加表格loading文字 | String |  | 正在加载数据... |
| left-table-empty-text | 待添加表格数据为空时显示的文字 | String |  | 暂无数据 |
| right-table-title | 已添加表格标题  | String |  | 已添加 |
| right-table-input-ph | 已添加表格搜索的placeholder | String |  | 搜索... |
| right-table-empty-text | 已添加表格数据为空时显示的文字 | String |  | 请选择需要添加的数据 |
| left-filter-handler | 左侧使用自定义搜索区域时，过滤规则，参数为列表中的一项数据对象 | Function |  | 内置默认过滤规则 |
| right-filter-handler | 右侧使用自定义搜索区域时，过滤规则，参数为列表中的一项数据对象 | Function |  | 内置默认过滤规则 |
| move-right-action | 当数据向右侧移动时，触发的事件，该方法需要返回一个promise，resolve时继续右移操作，reject时终止操作 | checkedRows, leftTableData, rightTableData |
| move-left-action | 当数据向左侧移动时，触发的事件，该方法需要返回一个promise，resolve时继续左移操作，reject时终止操作 | moveLeftData, leftTableData, rightTableData |
| move-to-left-button-flag | 控制左按钮状态是否可用(根据特殊业务需求,控制按钮状态) | Function | 内置默认过滤规则 |return true |
| move-to-right-button-flag | 控制右按钮状态是否可用(根据特殊业务需求,控制按钮状态) | Function | 内置默认过滤规则 | return true |
| left-enable-virtual-scroll | 左侧虚拟滚动（样式有点问题） | Boolean |  | false |
| right-enable-virtual-scroll | 右侧虚拟滚动 | Boolean |  | false |

###  table-tree-column 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| checkedDatas | 左侧选中的数据，在树列表状态下需要传入，详见常见问题6 | Array | - | [] |

> 这里写的不是很全

###  TableTransfer 事件

| 参数      | 说明          | 返回值      |
|---------- |-------------- |----------|
| check-changed | 左侧表格右上角checkbox勾选发生变化时触发 | value, event |
| right-table-filter-change | 当左侧表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。 | value, event |
| right-table-filter-change | 当右侧表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。 | value, event |
| move-right | 点击右移按钮时触发 | leftTableData, rightTableData |
| move-left | 点击左移按钮时触发 | leftTableData, rightTableData |
| left-table-sort-change | 当左侧表格的排序条件发生变化的时候会触发该事件 | value, { column, prop, order } |
| right-table-sort-change | 当右侧表格的排序条件发生变化的时候会触发该事件 | value, { column, prop, order } |
| select-change | 左侧选中节点变化抛出的事件 | Array，选中数据 |
| right-select-change | 右侧选中节点变化抛出的事件 | Array，选中数据 |
| expand-click | 树表格父节点展开收起触发的事件 | expanded, row |

###  TableTransfer ref 事件

| 参数      | 说明          | 返回值      |
|---------- |-------------- |----------|
| getCacheData | 用于获取左右列表的数据 | {leftTableCacheData, rightTableCacheData} |
