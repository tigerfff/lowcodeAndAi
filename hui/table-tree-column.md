# TableTreeColumn 树形表格列

<template>
  <author-info
    :version="versions['table-tree-column']"
    author="开发人员早已离职，目前无人维护且不再升级，请谨慎选择"
  />
</template>

::: warning 注意

树形表格列控件目前不支持树控件的控制逻辑（父子节点的联动等），暂时没有重构计划，请谨慎选择。

这里欢迎小伙伴自己实现一个树形表格，并给我们提 pull request。

:::

## 安装

```bash
$ npm i @hui-pro/table-tree-column -D
# 或者
$ yarn add @hui-pro/table-tree-column --dev
```

## 引入

```js
import tableTreeColumn from '@hui-pro/table-tree-column';
import '@hui-pro/table-tree-column/theme/index.scss';
Vue.use(tableTreeColumn);
```

## 基础用法

<template>
  <code-box title="基础用法" description="结合 `HUI` 的表格控件实现的树形表格">
    <el-table :data="data" row-key="id"  @selection-change="selectChange">
      <el-table-column prop="id" type="selection" width="55"></el-table-column>
      <h-table-tree-column 
        prop="label" 
        label="label"
        :expand-on-click-node="true"
        :show-overflow-title="true"
      ></h-table-tree-column>
      <el-table-column prop="description" label="description"></el-table-column>
    </el-table>
  </code-box>
</template>

```html
<el-table
  :data="data"
  row-key="id"
  @selection-change="selectChange"
>
  <el-table-column prop="id" type="selection" width="55"></el-table-column>
  <h-table-tree-column
    prop="label"
    label="label"
    :expand-on-click-node="true"
    :show-overflow-title="true"
  ></h-table-tree-column>
  <el-table-column prop="description" label="description"></el-table-column>
</el-table>

<script>
  export default {
    methods: {
      nodeExpand(expandeStatus, row) {
        alert('expand-click');
        console.log(row, expandeStatus);
      },
      selectChange(selection) {
        console.log(selection);
      }
    },
    data() {
      return {
        // Demo 仅展示部分数据
        data: [
          {
            id: 1,
            label: 'System11111111111111111111111',
            parent_id: null,
            url: null,
            depth: 0,
            child_num: 1,
            description: 'System Manager',
            children: [
              {
                id: 2,
                label: 'base base basebase',
                parent_id: 1,
                url: null,
                depth: 1,
                child_num: 3,
                description: 'Base Manager',
                children: [
                  {
                    id: 3,
                    label: 'Menus base base basev',
                    parent_id: 2,
                    url: '/menus',
                    depth: 2,
                    child_num: 0,
                    description: 'menu manager'
                  },
                  {
                    id: 4,
                    label: 'Roles',
                    parent_id: 2,
                    url: '/roles',
                    depth: 2,
                    child_num: 0,
                    description: 'Role Manager'
                  },
                  {
                    id: 5,
                    label: 'Users',
                    parent_id: 2,
                    url: '/users',
                    depth: 2,
                    child_num: 0,
                    description: 'User Manager'
                  }
                ]
              }
            ]
          }
        ]
      };
    }
  };
</script>
```

## 异步加载

<template>
  <code-box title="异步加载" description="结合 `HUI` 的表格控件实现的树形表格">
    <el-table :data="data2" row-key="id" @expand-click = "nodeExpand"  @selection-change="selectChange">
      <el-table-column prop="id" type="selection" width="55" v-if="showCheckbox"></el-table-column>
      <h-table-tree-column
        prop="label"
        label="label"
        :expand-on-click-node="true"
        :show-overflow-title="true"
        :expand-async="true"
        :get-children="getChildren"
      ></h-table-tree-column>
      <el-table-column prop="description" label="description"></el-table-column>
    </el-table>
    <div style="padding-top:8px">
        <el-button @click="()=>{this.showCheckbox=!this.showCheckbox}">隐藏复选框</el-button>
        <a target="_blank" href="http://hui.dev.hikhub.net/zh/data/table.html"> 查看HUI 2.0 Table 用法  -></a>
    </div>
  </code-box>
</template>

```html
<el-table
  :data="data"
  row-key="id"
  @expand-click="nodeExpand"
  @selection-change="selectChange"
>
  <el-table-column
    prop="id"
    type="selection"
    width="55"
    v-if="showCheckbox"
  ></el-table-column>
  <h-table-tree-column
    prop="label"
    label="label"
    :expand-on-click-node="true"
    :show-overflow-title="true"
    :expand-async="true"
    :get-children="getChildren"
  ></h-table-tree-column>
  <el-table-column prop="description" label="description"></el-table-column>
</el-table>

<script>
  export default {
    methods: {
      nodeExpand(expandeStatus, row) {
        alert('expand-click');
        console.log(row, expandeStatus);
      },
      selectChange(selection) {
        // console.log(selection);
      },
      //getChildren 仅为示例，请自行填充异步请求
      getChildren(row, callback) {
        console.log(row);
        setTimeout(() => {
          let children = [
            {
              id: 2,
              label: 'base base basebase',
              parent_id: 1,
              url: null,
              depth: 1,
              child_num: 3,
              description: 'Base Manager',
              children: [
                {
                  id: 3,
                  label: 'Menus base base basev',
                  parent_id: 2,
                  url: '/menus',
                  depth: 2,
                  child_num: 0,
                  description: 'menu manager'
                },
                {
                  id: 4,
                  label: 'Roles',
                  parent_id: 2,
                  url: '/roles',
                  depth: 2,
                  child_num: 0,
                  description: 'Role Manager'
                },
                {
                  id: 5,
                  label: 'Users',
                  parent_id: 2,
                  url: '/users',
                  depth: 2,
                  child_num: 0,
                  description: 'User Manager'
                }
              ]
            }
          ];
          callback(children);
        }, 500);
      }
    },
    data() {
      return {
        showCheckbox: true,
        // 如果初始化要展示部分子节点，请先构建好带有要展开的子节点的数据结构
        data: [
          {
            id: 1,
            label: 'System11111111111111111111111',
            parent_id: null,
            url: null,
            depth: 0,
            child_num: 1,
            description: 'System Manager',
            icon: 'h-icon-picture',
            children: []
          },
          {
            id: 10,
            label: 'Bussiness',
            parent_id: null,
            url: null,
            depth: 0,
            child_num: 2,
            description: 'Bussiness Manager',
            expanded: true,
            children: []
          }
        ]
      };
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
        showCheckbox : true,
        data:[{
           'id': 1,
           'label': 'System11111111111111111111111',
           'parent_id': null,
           'url': null,
           'depth': 0,
           'child_num': 1,
           'description': 'System Manager',
           'children': [{
             'id': 2,
             'label': 'base base basebase',
             'parent_id': 1,
             'url': null,
             'depth': 1,
             'child_num': 3,
             'description': 'Base Manager',
             'children': [{
               'id': 3,
               'label': 'Menus base base basev',
               'parent_id': 2,
               'url': '/menus',
               'depth': 2,
               'child_num': 0,
               'description': 'menu manager'
             }, {
               'id': 4,
               'label': 'Roles',
               'parent_id': 2,
               'url': '/roles',
               'depth': 2,
               'child_num': 0,
               'description': 'Role Manager'
             }, {
               'id': 5,
               'label': 'Users',
               'parent_id': 2,
               'url': '/users',
               'depth': 2,
               'child_num': 0,
               'description': 'User Manager'
             }]
           }]
         }, {
           'id': 6,
           'label': 'Customs2222222',
           'parent_id': null,
           'url': null,
           'depth': 0,
           'child_num': 2,
           'description': 'Custom Manager',
           'children': [{
             'id': 7,
             'label': 'CustomList22222222222222',
             'parent_id': 6,
             'url': '/customs',
             'depth': 1,
             'child_num': 0,
             'description': 'CustomList'
           }]
         }, {
           'id': 8,
           'label': 'Templates3333333333',
           'parent_id': null,
           'url': null,
           'depth': 0,
           'child_num': 1,
           'description': 'Template Manager',
           'children': [{
             'id': 9,
             'label': 'TemplateList',
             'parent_id': 8,
             'url': '/doc_templates',
             'depth': 1,
             'child_num': 0,
             'description': 'Template Manager'
           }]
         }, {
           'id': 10,
           'label': 'Bussiness',
           'parent_id': null,
           'url': null,
           'depth': 0,
           'child_num': 2,
           'description': 'Bussiness Manager',
           'expanded': true,
           'children': [{
             'id': 11,
             'label': 'BussinessList',
             'parent_id': 10,
             'url': null,
             'depth': 1,
             'child_num': 2,
             'description': 'BussinessList',
             'children': [{
               'id': 12,
               'label': 'Currencies',
               'parent_id': 11,
               'url': '/currencies',
               'depth': 2,
               'child_num': 0,
               'description': 'Currencies'
             }, {
               'id': 13,
               'label': 'Dealtypes',
               'parent_id': 11,
               'url': '/dealtypes',
               'depth': 2,
               'child_num': 0,
               'description': 'Dealtypes'
             }]
           }, {
             'id': 14,
             'label': 'Products',
             'parent_id': 10,
             'url': null,
             'depth': 1,
             'child_num': 2,
             'description': 'Products',
             'children': [{
               'id': 15,
               'label': 'ProductTypes',
               'parent_id': 14,
               'url': '/productTypes',
               'depth': 2,
               'child_num': 0,
               'description': 'ProductTypes'
             }, {
               'id': 16,
               'label': 'ProductList',
               'parent_id': 14,
               'url': '/products',
               'depth': 2,
               'child_num': 0,
               'description': 'ProductList'
             }]
           }]
         }],
        data2: [{
          'id': 1,
          'label': 'System11111111111111111111111',
          'parent_id': null,
          'url': null,
          'depth': 0,
          'child_num': 1,
          'description': 'System Manager',
          'icon':'h-icon-picture',
          'children': []
        }, {
          'id': 10,
          'label': 'Bussiness',
          'parent_id': null,
          'url': null,
          'depth': 0,
          'child_num': 2,
          'description': 'Bussiness Manager',
          'expanded': true,
          'children': []
          }]
      }
    },
    methods: {
      nodeExpand (expandeStatus,row) {
        alert('expand-click');
        console.log(row,expandeStatus);
      },
      selectChange(selection){
        // console.log(selection);
      },
      getChildren(row,callback){
        console.log(row);
        setTimeout(()=>{
          let children = [];
          switch(row.id){
            case 1:
              children = [{
                'id': 2,
                'label': 'base base basebase',
                'parent_id': 1,
                'url': null,
                'depth': 1,
                'child_num': 3,
                'description': 'Base Manager',
                'children': [{
                  'id': 3,
                  'label': 'Menus base base basev',
                  'parent_id': 2,
                  'url': '/menus',
                  'depth': 2,
                  'child_num': 0,
                  'description': 'menu manager'
                }, {
                  'id': 4,
                  'label': 'Roles',
                  'parent_id': 2,
                  'url': '/roles',
                  'depth': 2,
                  'child_num': 0,
                  'description': 'Role Manager'
                }, {
                  'id': 5,
                  'label': 'Users',
                  'parent_id': 2,
                  'url': '/users',
                  'depth': 2,
                  'child_num': 0,
                  'description': 'User Manager'
                }]
              }]
              break;
            case 10:
              children=[{
                'id': 11,
                'label': 'BussinessList',
                'parent_id': 10,
                'url': null,
                'depth': 1,
                'child_num': 2,
                'description': 'BussinessList',
                'children': [{
                  'id': 12,
                  'label': 'Currencies',
                  'parent_id': 11,
                  'url': '/currencies',
                  'depth': 2,
                  'child_num': 0,
                  'description': 'Currencies'
                }, {
                  'id': 13,
                  'label': 'Dealtypes',
                  'parent_id': 11,
                  'url': '/dealtypes',
                  'depth': 2,
                  'child_num': 0,
                  'description': 'Dealtypes'
                }]
              }, {
                'id': 14,
                'label': 'Products',
                'parent_id': 10,
                'url': null,
                'depth': 1,
                'child_num': 2,
                'description': 'Products',
                'children': [{
                  'id': 15,
                  'label': 'ProductTypes',
                  'parent_id': 14,
                  'url': '/productTypes',
                  'depth': 2,
                  'child_num': 0,
                  'description': 'ProductTypes'
                }, {
                  'id': 16,
                  'label': 'ProductList',
                  'parent_id': 14,
                  'url': '/products',
                  'depth': 2,
                  'child_num': 0,
                  'description': 'ProductList'
                }]
              }]
              break;
          }
        callback(children)
        },500)
      }
    }
  }
</script>

## API

### Attributes

在 `el-table-column` 的属性上拓展了以下属性

| 参数                                          | 说明                                               | 类型     | 可选值 | 默认值    |
| --------------------------------------------- | -------------------------------------------------- | -------- | ------ | --------- |
| tree-key                                      | 树节点唯一标识符                                   | string   | —      | id        |
| child-num-key                                 | 子节点个数的键名                                   | string   | —      | child_num |
| parent-key                                    | 关联父节点的键名                                   | string   | —      | parent_id |
| child-key                                     | 子节点集合的键名                                   | string   | —      | children  |
| level-key                                     | 当前节点层级的键名                                 | string   | —      | depth     |
| expand-key                                    | 节点是否展开的键名                                 | string   | —      | expanded  |
| formatter                                     | 树节点自定义格式                                   | function | —      | -         |
| expand-on-click-node                          | 是否点击节点展开折叠                               | boolean  | —      | true      |
| expand-async                                  | 展开数据是否异步                                   | boolean  | —      | false     |
| get-children                                  | 获取字节点的函数(当 expand-async 为 true 时才有效) | Function | —      | —         |
| constant-expand-async <Badge text="1.3.0+" /> | 展开时，是否实时进行异步加载数据                   | Boolean  | —      | false     |

### table 中添加事件 expand-click

| 事件名       | 说明                                            | 参数               |
| ------------ | ----------------------------------------------- | ------------------ |
| expand-click | row 是该列数据，expandStatus 是否展开的状态标志 | (expandStatus,row) |
