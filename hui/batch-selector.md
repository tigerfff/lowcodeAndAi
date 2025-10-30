# BatchSelector 批量选择

<template>
  <author-info
    :version="versions['batch-selector']"
    author="张凤49"
    ux="苗任越"
    ui="鲁欣如"
    standard="http://10.33.43.73/BBG_UED/BUI_Design/bscs/bscsapp/issues/76#note_30740"
    reviewed
  />
</template>

## 安装

```bash
$ npm i @hui-pro/batch-selector -D
# 或者
$ yarn add @hui-pro/batch-selector --dev
```

## 引入

```js
import BatchSelector from '@hui-pro/batch-selector';
import '@hui-pro/batch-selector/theme/index.scss';
Vue.use(BatchSelector);
```

## 内容不定宽

<template>
  <code-box title="基础用法" description="内容的宽度不定">
    <h-batch-selector :defaultParams="defaultParams" v-model="list">
      <template slot="description">
        这里添加补充描述
      </template>
    </h-batch-selector>
  </code-box>
</template>

```html
<h-batch-selector :defaultParams="defaultParams" v-model="list">
  <template slot="description">
    这里添加补充描述
  </template>
</h-batch-selector>

<script>
  export default {
    data() {
      return {
        defaultParams: {
          name: 'label', // 展示的名称
          id: 'id' // 唯一标示id
        },
        list: []
      };
    },
    created() {
      for (let i = 0; i < 100; i++) {
        this.list.push({
          label: i,
          id: i
        });
      }
    }
  };
</script>
```

## 内容定宽

<template>
  <code-box title="基础用法" description="内容宽度定宽">
    <h-batch-selector :labelWidth='96' :defaultParams="defaultParams" v-model="list2">
      <template slot="description">
        这里添加补充描述
      </template>
    </h-batch-selector>
  </code-box>
</template>

```html
<h-batch-selector
  :labelWidth="96"
  :defaultParams="defaultParams"
  v-model="list2"
>
  <template slot="description">
    这里添加补充描述
  </template>
</h-batch-selector>

<script>
  export default {
    data() {
      return {
        defaultParams: {
          name: 'label', // 展示的名称
          id: 'id' // 唯一标示id
        },
        list: []
      };
    },
    created() {
      for (let i = 0; i < 100; i++) {
        this.list2.push({
          label: i,
          id: i
        });
      }
    }
  };
</script>
```

## 内容列表

<template>
  <code-box title="基础用法" description="内容为列表展示；通过插槽插入hui的table和pagination（由于列表和分页hui已存在，这边故不做封装）">
     <h-batch-selector :maxNum="100" :labelWidth='96' :defaultParams="defaultParams" v-model="tableList">
        <template slot="batchTable">
          <el-table
            :data="tableList"
            max-height="250"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="设备名称">
            </el-table-column>
            <el-table-column
              prop="state"
              label="设备状态">
            </el-table-column>
            <el-table-column
              prop="IP"
              label="IP">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button icon="h-icon-edit" size="mini"></el-button>
                <el-button icon="h-icon-delete" size="mini" @click="remove(scope.row.id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
            <el-pagination
              class="selectd-pagination-container"
              small
              layout="prev, pager, next"
              :total="50">
            </el-pagination>
        </template>
        <template slot="description">
          补充说明，这边分页没进行联动，数据是假的
        </template>
      </h-batch-selector>
  </code-box>
</template>

```html
<h-batch-selector
  :maxNum="100"
  :labelWidth="96"
  :defaultParams="defaultParams"
  v-model="tableList"
>
  <template slot="batchTable">
    <el-table :data="tableList" max-height="250" style="width: 100%">
      <el-table-column prop="name" label="设备名称"></el-table-column>
      <el-table-column prop="state" label="设备状态"></el-table-column>
      <el-table-column prop="IP" label="IP"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button icon="h-icon-edit" size="mini"></el-button>
          <el-button
            icon="h-icon-delete"
            size="mini"
            @click="remove(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="selectd-pagination-container"
      small
      layout="prev, pager, next"
      :total="50"
    ></el-pagination>
  </template>
  <template slot="description">
    补充说明，这边分页没进行联动，数据是假的
  </template>
</h-batch-selector>

<script>
  export default {
    name: 'form-normal',
    props: {
      breadcrumbObj: {
        type: Object,
        debufult: {}
      }
    },
    data() {
      return {
        defaultParams: {
          name: 'label', // 展示的名称
          id: 'id' // 唯一标示id
        },
        tableList: []
      };
    },
    created() {
      for (let i = 0; i < 20; i++) {
        this.tableList.push({
          id: i,
          name: i,
          state: '离线',
          IP: '10.10.10.11'
        });
      }
    },
    methods: {
      remove(id) {
        this.tableList = this.tableList.filter(item => {
          return id !== item.id;
        });
      }
    }
  };
</script>
```
## 自定义添加按钮

<template>
  <code-box title="基础用法" description="内容的宽度不定">
    <h-batch-selector :defaultParams="defaultParams" v-model="list">
      <template slot="add">
        <el-button type="primary">主要按钮</el-button>
      </template>
      <template slot="description">
        这里添加补充描述
      </template>
    </h-batch-selector>
  </code-box>
</template>


```html
<h-batch-selector :defaultParams="defaultParams" v-model="list">
  <template slot="add">
    <el-button type="primary">主要按钮</el-button>
  </template>
  <template slot="description">
    这里添加补充描述
  </template>
</h-batch-selector>

<script>
  export default {
    data() {
      return {
        defaultParams: {
          name: 'label', // 展示的名称
          id: 'id' // 唯一标示id
        },
        list: []
      };
    },
    created() {
      for (let i = 0; i < 100; i++) {
        this.list.push({
          label: i,
          id: i
        });
      }
    }
  };
</script>
```

<script>
const versions = require('docs/.vuepress/src/version.json');
export default {
  name: 'form-normal',
  props: {
    breadcrumbObj: {
      type: Object,
      debufult: {}
    }
  },
  data () {
    return {
      versions,
      list: [],
      list2: [],
      defaultParams: {
        name: 'label', // 展示的名称
        id: 'id' // 唯一标示id
      },
      tableList: []
    }
  },
  created () {
    for (let i = 0; i < 15; i++) {
      this.list.push({
        label: i,
        id: i
      })
      this.list2.push({
        label: i,
        id: i
      })
    }
    for (let i = 0; i < 20; i++) {
      this.tableList.push({
        id: i,
        name: i,
        state: '离线',
        IP: '10.10.10.11'
      })
    }
  },
  methods: {
    remove (id) {
      this.tableList = this.tableList.filter(item => {
        return id !== item.id
      })
    },
    removeCallBack (data) {
      console.log(data)
    }
  }
}
</script>

## API

### Attributes

| 参数           | 说明       | 类型                        | 可选值 | 默认值                  |
| -------------- | ---------- | --------------------------- | ------ | ----------------------- |
| max-num        | 最大数量   | Number(数字为 0 代表无上限) | -      | 20                      |
| label-width    | 内容宽度   | Number                      | -      | 0(不定宽)               |
| default-params | 传入的属性 | Object                      | -      | {name: 'name',id: 'id'} |
| delect-text<Badge text="1.13.1+" />  | 清空时的文案 | string                      | -      | '确定清空数据？' |

### 事件

| 参数  | 说明             |  参数|
| ----- | ---------------- | ---- | 
| click | 添加按钮点击事件 | ---|
| remove<Badge text="1.13.1+" />  | remove时的事件 |(data) : 数组形式，被删除的内容| 

### slot

| name  | 说明             |
| ----- | ---------------- |
| add <Badge text="1.8.1+" /> | 添加按钮插槽 |
| description | 描述插槽 |

