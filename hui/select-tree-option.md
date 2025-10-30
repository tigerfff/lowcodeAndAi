# SelectTreeOption 树对象选择

<template>
  <author-info
    :version="versions['select-tree-option']"
    author="张凤49"
    ux="苗任越"
    ui="江佳欢"
    standard="http://10.33.43.73/BBG_UED/BUI_Design/bscs/v2.0/issues/55"
    reviewed
  />
</template>

## 安装

```bash
$ npm i @hui-pro/select-tree-option -D
# 或者
$ yarn add @hui-pro/select-tree-option --dev
```

## 引入

```js
import selectTreeOption from '@hui-pro/select-tree-option';
import '@hui-pro/select-tree-option/theme/index.scss';
Vue.use(selectTreeOption);
```

## 多选用法

<template>
  <code-box title="基础用法" description="通过插槽,插入自定义的树组件,在树组件选中节点或点击节点等事件中处理多选数据的更新；右侧列表数据请传入属性option-data，必填项（内部用于数据绑定处理）">
    <h-select-tree-option :containChild="false" @panel-change="panelChange" @tree-search="treeSearch" :option-data="optionData" v-model="value">
      <template slot="tree">
        <el-tree :data="data" node-key="label"
        :current-node-key="currentNodeKey" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </template>
    </h-select-tree-option>
  </code-box>
</template>

```html
<h-select-tree-option
  @tree-search="treeSearch"
  :option-data="optionData"
  v-model="value"
>
  <template slot="tree">
    <el-tree
      :data="data"
      node-key="label"
      :current-node-key="currentNodeKey"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>
  </template>
</h-select-tree-option>
<script>
  export default {
    data() {
      return {
        currentNodeKey: '',
        optionData: [],
        value: {
          values: [],
          datas: []
        },
        data: [
          {
            label: '一级 1',
            children: [
              { label: '二级 1-1', children: [{ label: '三级 1-1-1' }] }
            ]
          },
          {
            label: '一级 2',
            children: [
              { label: '二级 2-1', children: [{ label: '三级 2-1-1' }] },
              { label: '二级 2-2', children: [{ label: '三级 2-2-1' }] }
            ]
          },
          {
            label: '一级 3',
            children: [
              { label: '二级 3-1', children: [{ label: '三级 3-1-1' }] },
              { label: '二级 3-2', children: [{ label: '三级 3-2-1' }] }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        num: 10
      };
    },
    mounted() {
      this.handleNodeClick(this.data[0]);
      this.currentNodeKey = this.data[0].label;
    },
    watch: {
      value(val) {
        console.log(val);
      }
    },
    methods: {
      // value为搜索的文本，containChildren表示是否包含下级节点值
      treeSearch(value, containChildren) {
        console.log(value);
        console.log(containChildren);
      },
      handleNodeClick(data) {
        let data2 = [];
        for (let i = 0; i < this.num; i++) {
          data2.push({
            name: data.label + '-' + i,
            value: data.label + '-' + i
          });
        }
        this.optionData = data2;
        this.num = this.num === 10 ? 20 : 10;
      }
    }
  };
</script>
```

## 多选限制个数

<template>
  <code-box title="个数限制" description="通过设置maxSelect值，来限制最多可选的个数(与全选的功能不可并存)。">
    <h-select-tree-option :maxSelect="5" @tree-search="treeSearch" :option-data="optionData" v-model="value2">
      <template slot="tree">
        <el-tree :data="data" node-key="label" :current-node-key="currentNodeKey" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </template>
    </h-select-tree-option>
  </code-box>
</template>

```html
<h-select-tree-option
  @tree-search="treeSearch"
  :maxSelect="5"
  :option-data="optionData"
  v-model="value2"
>
  <template slot="tree">
    <el-tree
      :data="data"
      node-key="label"
      :current-node-key="currentNodeKey"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>
  </template>
</h-select-tree-option>

<script>
  export default {
    data() {
      return {
        currentNodeKey: '',
        optionData: [],
        value2: {
          values: ['一级 1-2'],
          datas: [{ name: '一级 1-2', value: '一级 1-2' }]
        },
        data: [
          {
            label: '一级 1',
            children: [
              { label: '二级 1-1', children: [{ label: '三级 1-1-1' }] }
            ]
          },
          {
            label: '一级 2',
            children: [
              { label: '二级 2-1', children: [{ label: '三级 2-1-1' }] },
              { label: '二级 2-2', children: [{ label: '三级 2-2-1' }] }
            ]
          },
          {
            label: '一级 3',
            children: [
              { label: '二级 3-1', children: [{ label: '三级 3-1-1' }] },
              { label: '二级 3-2', children: [{ label: '三级 3-2-1' }] }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        num: 10
      };
    },
    mounted() {
      this.handleNodeClick(this.data[0]);
      this.currentNodeKey = this.data[0].label;
    },
    watch: {
      value(val) {
        console.log(val);
      }
    },
    methods: {
      // value为搜索的文本，containChildren表示是否包含下级节点值
      treeSearch(value, containChildren) {
        console.log(value);
        console.log(containChildren);
      },
      handleNodeClick(data) {
        let data2 = [];
        for (let i = 0; i < this.num; i++) {
          data2.push({
            name: data.label + '-' + i,
            value: data.label + '-' + i
          });
        }
        this.optionData = data2;
        this.num = this.num === 10 ? 20 : 10;
      }
    }
  };
</script>
```

## 无确定取消按钮

<template>
  <code-box title="无确定取消按钮" description="通过设置hasFooter值，来去除确定面板。单选和复选选择即生效">
    <h-select-tree-option @tree-search="treeSearch" :option-data="optionData" v-model="value3" :hasFooter="false">
      <template slot="tree">
        <el-tree :data="data" node-key="label" :current-node-key="currentNodeKey" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </template>
    </h-select-tree-option>
  </code-box>
</template>

```html
<h-select-tree-option
  @tree-search="treeSearch"
  :option-data="optionData"
  v-model="value3"
  :hasFooter="false"
>
  <template slot="tree">
    <el-tree
      :data="data"
      node-key="label"
      :current-node-key="currentNodeKey"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>
  </template>
</h-select-tree-option>

<script>
  export default {
    data() {
      return {
        currentNodeKey: '',
        optionData: [],
        value3: {
          values: [],
          datas: []
        },
        data: [
          {
            label: '一级 1',
            children: [
              { label: '二级 1-1', children: [{ label: '三级 1-1-1' }] }
            ]
          },
          {
            label: '一级 2',
            children: [
              { label: '二级 2-1', children: [{ label: '三级 2-1-1' }] },
              { label: '二级 2-2', children: [{ label: '三级 2-2-1' }] }
            ]
          },
          {
            label: '一级 3',
            children: [
              { label: '二级 3-1', children: [{ label: '三级 3-1-1' }] },
              { label: '二级 3-2', children: [{ label: '三级 3-2-1' }] }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        num: 10
      };
    },
    mounted() {
      this.handleNodeClick(this.data[0]);
      this.currentNodeKey = this.data[0].label;
    },
    watch: {
      value(val) {
        console.log(val);
      }
    },
    methods: {
      // value为搜索的文本，containChildren表示是否包含下级节点值
      treeSearch(value, containChildren) {
        console.log(value);
        console.log(containChildren);
      },
      handleNodeClick(data) {
        let data2 = [];
        for (let i = 0; i < this.num; i++) {
          data2.push({
            name: data.label + '-' + i,
            value: data.label + '-' + i
          });
        }
        this.optionData = data2;
        this.num = this.num === 10 ? 20 : 10;
      }
    }
  };
</script>
```

## 自定义选项

<template>
  <code-box title="自定义选项" description="通过插槽option插入h-select-tree-option-item标签,其中提供了scope.disabled和scope.optionText值，disabled是用于是否可选择（内部根据maxSelect计算得到），optionText为选项搜索的文本，用于搜索文本高亮，需要外部执行定义。配合h-highlight使用，自定义的内容中文本请用h-highlight包裹。h-select-tree-option-item标签中的属性请查看最后的文档">
    <h-select-tree-option :maxSelect="3" @tree-search="treeSearch" :option-data="optionData2" v-model="value1" :hasFooter="false">
      <template slot="tree">
        <el-tree :data="data" node-key="label" :current-node-key="currentNodeKey" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </template>
      <template slot-scope="scope" slot="option">
        <h-select-tree-option-item
            v-for="(item, index) in optionData2"
            :data="item"
            type="checkbox"
            :disabled="scope.disabled"
            :key="index"
            :option-text="scope.optionText"
          >
            <template>
              <h-highlight :highlight-key="scope.optionText" >
                {{item.name}}
              </h-highlight>
            </template>
          </h-select-tree-option-item>
      </template>
    </h-select-tree-option>
  </code-box>
</template>

```html
<h-select-tree-option
  @tree-search="treeSearch"
  :option-data="optionData2"
  v-model="value1"
  :hasFooter="false"
>
  <template slot="tree">
    <el-tree
      :data="data"
      node-key="label"
      :current-node-key="currentNodeKey"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>
  </template>
  <template slot-scope="scope" slot="option">
    <h-select-tree-option-item
      v-for="(item, index) in optionData2"
      :data="item"
      type="checkbox"
      :disabled="scope.disabled"
      :key="index"
      :option-text="scope.optionText"
    >
      <template>
        <h-highlight :highlight-key="scope.optionText">
          {{item.name}}
        </h-highlight>
      </template>
    </h-select-tree-option-item>
  </template>
</h-select-tree-option>

<script>
  export default {
    data() {
      return {
        currentNodeKey: '',
        optionData2: [],
        value3: {
          values: [],
          datas: []
        },
        data: [
          {
            label: '一级 1',
            children: [
              { label: '二级 1-1', children: [{ label: '三级 1-1-1' }] }
            ]
          },
          {
            label: '一级 2',
            children: [
              { label: '二级 2-1', children: [{ label: '三级 2-1-1' }] },
              { label: '二级 2-2', children: [{ label: '三级 2-2-1' }] }
            ]
          },
          {
            label: '一级 3',
            children: [
              { label: '二级 3-1', children: [{ label: '三级 3-1-1' }] },
              { label: '二级 3-2', children: [{ label: '三级 3-2-1' }] }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        num: 10
      };
    },
    mounted() {
      this.handleNodeClick(this.data[0]);
      this.currentNodeKey = this.data[0].label;
    },
    watch: {
      value(val) {
        console.log(val);
      }
    },
    methods: {
      // value为搜索的文本，containChildren表示是否包含下级节点值
      treeSearch(value, containChildren) {
        console.log(value);
        console.log(containChildren);
      },
      handleNodeClick(data) {
        let data2 = [];
        for (let i = 0; i < this.num; i++) {
          data2.push({
            name: '文本请用h-hightlight包裹' + '-' + i,
            value: data.label + '-' + i
          });
        }
        this.optionData2 = data2;
        this.num = this.num === 10 ? 20 : 10;
      }
    }
  };
</script>
```

## 单选

<template>
  <code-box title="基础用法" description="使用type为radio来做单选">
    <h-select-tree-option :hasFooter="false" @tree-search="treeSearch" type="radio" :option-data="optionData" v-model="value4">
      <template slot="tree">
        <el-tree :data="data" node-key="label" :current-node-key="currentNodeKey" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </template>
    </h-select-tree-option>
  </code-box>
</template>

```html
<h-select-tree-option
  :hasFooter="false"
  @tree-search="treeSearch"
  type="radio"
  :option-data="optionData"
  v-model="value4"
>
  <template slot="tree">
    <el-tree
      :data="data"
      node-key="label"
      :current-node-key="currentNodeKey"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>
  </template>
</h-select-tree-option>
<script>
  export default {
    data() {
      return {
        currentNodeKey: '',
        optionData: [],
        value4: {
          values: '一级 1-0',
          datas: { name: '一级 1-0', value: '一级 1-0' }
        },
        data: [
          {
            label: '一级 1',
            children: [
              { label: '二级 1-1', children: [{ label: '三级 1-1-1' }] }
            ]
          },
          {
            label: '一级 2',
            children: [
              { label: '二级 2-1', children: [{ label: '三级 2-1-1' }] },
              { label: '二级 2-2', children: [{ label: '三级 2-2-1' }] }
            ]
          },
          {
            label: '一级 3',
            children: [
              { label: '二级 3-1', children: [{ label: '三级 3-1-1' }] },
              { label: '二级 3-2', children: [{ label: '三级 3-2-1' }] }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        num: 10
      };
    },
    mounted() {
      this.handleNodeClick(this.data[0]);
      this.currentNodeKey = this.data[0].label;
    },
    watch: {
      value(val) {
        console.log(val);
      }
    },
    methods: {
      // value为搜索的文本，containChildren表示是否包含下级节点值
      treeSearch(value, containChildren) {
        console.log(value);
        console.log(containChildren);
      },
      handleNodeClick(data) {
        let data2 = [];
        for (let i = 0; i < this.num; i++) {
          data2.push({
            name: data.label + '-' + i,
            value: data.label + '-' + i
          });
        }
        this.optionData = data2;
        this.num = this.num === 10 ? 20 : 10;
      }
    }
  };
</script>
```

## 使用宽面板

<template>
  <code-box title="基础用法" description="通过插槽,插入自定义的树组件,在树组件选中节点或点击节点等事件中处理多选数据的更新；右侧列表数据请传入属性option-data，必填项（内部用于数据绑定处理）">
    <h-select-tree-option @tree-search="treeSearch" isBroad :option-data="optionData" v-model="value6">
      <template slot="tree">
        <el-tree :data="data" node-key="label" :current-node-key="currentNodeKey" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </template>
    </h-select-tree-option>
  </code-box>
</template>

```html
<h-select-tree-option
  @tree-search="treeSearch"
  isBroad
  :option-data="optionData"
  v-model="value6"
>
  <template slot="tree">
    <el-tree
      :data="data"
      node-key="label"
      :current-node-key="currentNodeKey"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>
  </template>
</h-select-tree-option>
<script>
  export default {
    data() {
      return {
        currentNodeKey: '',
        optionData: [],
        value6: {
          values: [],
          datas: []
        },
        data: [
          {
            label: '一级 1',
            children: [
              { label: '二级 1-1', children: [{ label: '三级 1-1-1' }] }
            ]
          },
          {
            label: '一级 2',
            children: [
              { label: '二级 2-1', children: [{ label: '三级 2-1-1' }] },
              { label: '二级 2-2', children: [{ label: '三级 2-2-1' }] }
            ]
          },
          {
            label: '一级 3',
            children: [
              { label: '二级 3-1', children: [{ label: '三级 3-1-1' }] },
              { label: '二级 3-2', children: [{ label: '三级 3-2-1' }] }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        num: 10
      };
    },
    mounted() {
      this.handleNodeClick(this.data[0]);
      this.currentNodeKey = this.data[0].label;
    },
    methods: {
      // value为搜索的文本，containChildren表示是否包含下级节点值
      treeSearch(value, containChildren) {
        console.log(value);
        console.log(containChildren);
      },
      handleNodeClick(data) {
        let data2 = [];
        for (let i = 0; i < this.num; i++) {
          data2.push({
            name: data.label + '-' + i,
            value: data.label + '-' + i
          });
        }
        this.optionData = data2;
        this.num = this.num === 10 ? 20 : 10;
      }
    }
  };
</script>
```

## 在包含下级前增加内容

<template>
  <code-box title="基础用法" description="通过插槽,插入自定义的树组件,在树组件选中节点或点击节点等事件中处理多选数据的更新；右侧列表数据请传入属性option-data，必填项（内部用于数据绑定处理）">
    <h-select-tree-option @tree-search="treeSearch" :option-data="optionData" v-model="value7">
      <template slot="tree">
        <el-tree :data="data" node-key="label" :current-node-key="currentNodeKey" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </template>
      <template slot="before-has-contain">
        <el-checkbox
          v-model="hasother"
          @change="hasotherChange"
        >
          包含其他
        </el-checkbox>
      </template>
    </h-select-tree-option>
  </code-box>
</template>

```html
<h-select-tree-option
  @tree-search="treeSearch"
  :option-data="optionData"
  v-model="value7"
>
  <template slot="tree">
    <el-tree
      :data="data"
      node-key="label"
      :current-node-key="currentNodeKey"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>
  </template>
  <template slot="before-has-contain">
    <el-checkbox v-model="hasother" @change="hasotherChange">
      包含其他
    </el-checkbox>
  </template>
</h-select-tree-option>
<script>
  export default {
    data() {
      return {
        currentNodeKey: '',
        optionData: [],
        value7: {
          values: [],
          datas: []
        },
        data: [
          {
            label: '一级 1',
            children: [
              { label: '二级 1-1', children: [{ label: '三级 1-1-1' }] }
            ]
          },
          {
            label: '一级 2',
            children: [
              { label: '二级 2-1', children: [{ label: '三级 2-1-1' }] },
              { label: '二级 2-2', children: [{ label: '三级 2-2-1' }] }
            ]
          },
          {
            label: '一级 3',
            children: [
              { label: '二级 3-1', children: [{ label: '三级 3-1-1' }] },
              { label: '二级 3-2', children: [{ label: '三级 3-2-1' }] }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        num: 10
      };
    },
    mounted() {
      this.handleNodeClick(this.data[0]);
      this.currentNodeKey = this.data[0].label;
    },
    methods: {
      // value为搜索的文本，containChildren表示是否包含下级节点值
      treeSearch(value, containChildren) {
        console.log(value);
        console.log(containChildren);
      },
      handleNodeClick(data) {
        let data2 = [];
        for (let i = 0; i < this.num; i++) {
          data2.push({
            name: data.label + '-' + i,
            value: data.label + '-' + i
          });
        }
        this.optionData = data2;
        this.num = this.num === 10 ? 20 : 10;
      }
    }
  };
</script>
```

## 仅展示面板

<template>
  <code-box title="仅展示面板" description="通过设置onlyShowPanel值，来显示仅展示面板">
    <h-select-tree-option onlyShowPanel border :hasFooter="false" @tree-search="treeSearch" :option-data="optionData" v-model="value8">
      <template slot="tree">
        <el-tree :data="data" node-key="label" :current-node-key="currentNodeKey" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </template>
    </h-select-tree-option>
  </code-box>
</template>

```html
<h-select-tree-option
  onlyShowPanel
  border
  :hasFooter="false"
  @tree-search="treeSearch"
  :option-data="optionData"
  v-model="value8"
>
  <template slot="tree">
    <el-tree
      :data="data"
      node-key="label"
      :current-node-key="currentNodeKey"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>
  </template>
</h-select-tree-option>
<script>
  export default {
    data() {
      return {
        currentNodeKey: '',
        optionData: [],
        value8: {
          values: [],
          datas: []
        },
        data: [
          {
            label: '一级 1',
            children: [
              { label: '二级 1-1', children: [{ label: '三级 1-1-1' }] }
            ]
          },
          {
            label: '一级 2',
            children: [
              { label: '二级 2-1', children: [{ label: '三级 2-1-1' }] },
              { label: '二级 2-2', children: [{ label: '三级 2-2-1' }] }
            ]
          },
          {
            label: '一级 3',
            children: [
              { label: '二级 3-1', children: [{ label: '三级 3-1-1' }] },
              { label: '二级 3-2', children: [{ label: '三级 3-2-1' }] }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        num: 10
      };
    },
    mounted() {
      this.handleNodeClick(this.data[0]);
      this.currentNodeKey = this.data[0].label;
    },
    watch: {
      value(val) {
        console.log(val);
      }
    },
    methods: {
      // value为搜索的文本，containChildren表示是否包含下级节点值
      treeSearch(value, containChildren) {
        console.log(value);
        console.log(containChildren);
      },
      handleNodeClick(data) {
        let data2 = [];
        for (let i = 0; i < this.num; i++) {
          data2.push({
            name: data.label + '-' + i,
            value: data.label + '-' + i
          });
        }
        this.optionData = data2;
        this.num = this.num === 10 ? 20 : 10;
      }
    }
  };
</script>
```

## 分页加载

<template>
  <code-box title="分页加载" description="通过slot插槽，分页采用hui的迷你分页">
    <h-select-tree-option isBroad @tree-search="treeSearch" :option-data="optionData" v-model="value6">
      <template slot="tree">
          <el-tree
            :data="data"
            node-key="label"
            :current-node-key="currentNodeKey"
            :props="defaultProps"
            @node-click="handleNodeClick"
          ></el-tree>
        </template>
        <template slot="pagination">
          <el-pagination
            small
            layout="first, prev, miniPager, next, last"
            :total="50">
          </el-pagination>
        </template>
    </h-select-tree-option>
  </code-box>
</template>

```html
<h-select-tree-option
  isBroad
  @tree-search="treeSearch"
  :option-data="optionData"
  v-model="value6"
>
  <template slot="tree">
    <el-tree
      :data="data"
      node-key="label"
      :current-node-key="currentNodeKey"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>
  </template>
  <template slot="pagination">
    <el-pagination
      small
      layout="first, prev, miniPager, next, last"
      :total="50"
    ></el-pagination>
  </template>
</h-select-tree-option>
```

<!-- ## 滚动分页加载（后端返回所有数据，前端滚动分页渲染）
<template>
  <code-box title="滚动分页加载" description="后端返回所有数据，前端滚动分页渲染（如果需要后端分页加载，请自己使用scroll滚动事件，自己实现）">
    <h-select-tree-option scrollLoad border @tree-search="treeSearch" :option-data="optionData" v-model="value9">
      <template slot="tree">
        <el-tree :data="data" node-key="label" :current-node-key="currentNodeKey" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </template>
    </h-select-tree-option>
  </code-box>
</template> -->

<script>
  const versions = require('docs/.vuepress/src/version.json');
  export default {
    data() {
      return {
        versions,
        optionData: [],
        optionData2: [],
        currentNodeKey: '',
        hasother: false,
        value: {
          values: [],
          datas: []
        },
        value1: {
          values: [],
          datas: []
        },
        value3: {
          values: [],
          datas: []
        },
        value2: {
          values: ['一级 1-2'],
          datas: [{name: '一级 1-2', value: '一级 1-2'}]
        },
        value4: {
          values: '一级 1-0',
          datas: {name: '一级 1-0', value: '一级 1-0'}
        },
        value6: {
          values: [],
          datas: []
        },
        value7: {
          values: [],
          datas: []
        },
        value8: {
          values: [],
          datas: []
        },
        value9: {
          values: [],
          datas: []
        },
        data: [{
          label: 'val 1',
          children: [
            { label: 'val2 1-1', children: [{ label: 'val2 1-1-1' }] }
          ]
        }, {
          label: 'val11 2',
          children: [
            { label: 'val33 2-1', children: [{ label: 'val33 2-1-1' }] },
            { label: 'val33 2-2', children: [{ label: 'val33 2-2-1' }] }
          ] }, {
          label: 'val222 3',
          children: [
            { label: 'val333 3-1', children: [{ label: 'val333 3-1-1' }] },
            { label: 'val333 3-2', children: [{ label: 'val333 3-2-1' }] }
          ]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        num: 10,
        hasother: false,
        i: 0
      }
    },
    mounted () {
      this.handleNodeClick(this.data[0])
      this.currentNodeKey = this.data[0].label
    },
    watch: {
      value (val) {
        console.log(val)
      },
      value4 (val) {
        console.log(val)
      },
      value3 (val) {
        console.log(val)
      }
    },
    methods: {
      optionDisabledFn (row) {
        let x = ['val 1-0', 'val 1-1']
        if (row === 'all') {
          return false
        }
        return x.includes(row.value)
        // console.log(row)
        // if (row === 'all') {
        //   return true
        // }
        // return true
        // return row.value === 'val 1-0'
      },
      panelChange (val) {
        console.log(val)
      },
      hasotherChange (val) {
        console.log(val)
      },
      treeSearch (value, containChildren) {
        console.log(value)
        console.log(containChildren)
      },
      hasotherChange (val) {
        console.log(val)
      },
      handleNodeClick(data) {
        let data2 = []
        let data3 = []
        for(let i = 0; i< this.num; i++) {
          data2.push({
            name: data.label + '生生死死生生死死生生死死ssssss-' + i,
            value: data.label + '-' + i
          })
        }
        this.optionData = data2
        console.log(this.optionData)
        for(let i = 0; i< this.num; i++) {
          data3.push({
            name: '文本请用h-hightlight包裹' + '-' + i,
            value: data.label + '-' + i
          })
        }
        this.optionData2 = data3
        // this.num = this.num === 10 ? 20: 10
      }
    }
  }
</script>

### Attributes

| 参数                                  | 说明                                                                       | 类型          | 可选值              | 默认值                        |
| ------------------------------------- | -------------------------------------------------------------------------- | ------------- | ------------------- | ----------------------------- |
| textMap                               | 用于替换控件本身的文案。该参数，需要引用者，完成多语言翻译。键值为控件引用的 多语言翻译 key 值，如 'h.selectTreeOption.cancel'| Object |   | {}     |
| type                                  | 复选还是单选                                                               | String        | 'checkbox', 'radio' | 'checkbox'                    |
| max-select                            | 当复选时，可以限制最大的个数（默认使用该功能时，全选按钮将失效，不可并存） | number        |                     | 0                             |
| border                                | 面板是否有边框,用于面板单独使用                                            | Boolean       |                     | false                         |
| has-header                            | 面板是否包含头部                                                           | Boolean       |                     | true                          |
| has-contain                           | 是否包含 下级节点复选框                                                    | Boolean       |                     | true                          |
| has-showNum                           | 是否包含 计数文本展示                                                      | Boolean       |                     | true                          |
| has-footer                            | 面板是否包含底部                                                           | Boolean       |                     | true                          |
| has-tree-search                       | 是否包含树搜索框                                                           | Boolean       |                     | true                          |
| has-option-search                     | 是否包含选项搜索框                                                         | Boolean       |                     | true                          |
| has-check-all                         | 复选框时，是否包含全选                                                     | Boolean       |                     | true                          |
| check-all-name                        | 全选名称                                                                   | String        |                     | '全选'                        |
| option-data                           | 选项的列表。数组子元素，必须至少含有 `option` 中两个 `key` 值，以及 `id` 三个字段 | Array         |                     | []                            |
| option                                | 选项的默认配置，name 字段是展示的，value 是选中的值                        | Object        |                     | {name: 'name',value: 'value'} |
| option-search-fn                      | 选项搜索函数，如果传入该函数，那么内部将不在做过滤处理                     | Function      |                     | (val) 搜索值                  |
| clearable                             | 是否可清空数据                                                             | Boolean       |                     | true                          |
| input-placeholder                     | 输入框的 Placeholder                                                       | String        |                     | 请选择                        |
| tree-placeholder                      | 树的搜索框 Placeholder                                                     | String        |                     | 搜索                          |
| option-placeholder                    | 选项的搜索框 Placeholder                                                   | String        |                     | 搜索                          |
| loading                               | 下拉面板 loading                                                           | Boolean       |                     | false                         |
| option-disabled-fn                    | 选项置灰的函数，需要 return true 或 false                                  | Function      |                     | null                          |
| option-search-fn                      | 选项搜索函数                                                               | Function      | (text)过滤字段      | null                          |
| contain-child <Badge text="1.4.1+" /> | 包含下级节点的值，支持 .sync 修饰符 (.sync<Badge text="1.11.1+" />)                                        | Boolean       |                     | true                          |
| custom-class <Badge text="1.4.2+" />  | 设置下拉面板 class                                                         | Array, String |                     | 无                            |
| leftInputMaxLength <Badge text="1.14.1+" />     | 左侧input框最大输入长度限制  | Number       |                     | - |
| rightInputMaxLength <Badge text="1.14.1+" />     | 右侧input框最大输入长度限制  | Number       |                     | - |
| disabled <Badge text="1.14.4+" />     | 不可选择  | boolean       |                     | false |
| show-all-tags <Badge text="2.0.0-beta.7+" />     | 是否展示所有标签，而不是用数字折叠表示  | boolean       |                     | false |

### Event

| 方法                 | 说明                         | 回调参数                                                 |
| -------------------- | ---------------------------- | -------------------------------------------------------- |
| save-click           | 确定事件                     | ------                                                   |
| cancel-click         | 取消事件                     | ------                                                   |
| tree-search          | 树搜索事件                   | (treeText, containChildren) 搜索文本和是否包含下级节点值 |
| has-contain-children | 是否包含下级节点 change 事件 | (value)                                                  |
| option-scroll-y      | 选项滚动 y 事件              | {scrollTop, percentY }                                   |
| panel-change         | 面板打开关闭事件             | (flag) 当前是打开还是关闭                                |
| remove-single         | 单个删除事件             | {id} 删除项的id值                                |
| remove-all         | 清空事件             |  ------                                                         |

### Tree Select Slot

| name                               | 说明                                                                                |
| ---------------------------------- | ----------------------------------------------------------------------------------- |
| before-has-contain                 | 在包含下级前面添加内容                                                              |
| after-has-contain                  | 在包含下级后面添加内容                                                              |
| tree                               | 放树的内容                                                                          |
| option                             | 用于放置自定义选项的插槽                                                            |
| headerLeft <Badge text="1.3.5+" /> | 头部左侧插槽; scope 中含有缓存 cacheValue，就是还没点击确定前的数据，有需要可以使用 |
| pagination <Badge text="1.5.1+" /> | 分页插槽                                                                            |

### h-select-tree-option-item Attributes

| 参数       | 说明                                                | 类型    | 可选值             | 默认值                        |
| ---------- | --------------------------------------------------- | ------- | ------------------ | ----------------------------- |
| type       | 类型,复选框或单选框                                 | String  | 'checkbox','radio' | 'checkbox'                    |
| option     | 选项的默认配置，name 字段是展示的，value 是选中的值 | Object  |                    | {name: 'name',value: 'value'} |
| data       | 当前 item 项内容，用于内部计算                      | Object  |                    |                               |
| optionText | 搜索文本，用于搜索文案高亮显示                      | String  |                    | ''                            |
| disabled   | 是否禁用，配合多选限制个数的时候使用                | Boolean |                    | false                         |
| radioDisabled   | 是否禁用，配合单选时候使用                    | Boolean |                    | false                         |
