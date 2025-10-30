# h-pagedTable 分页表格

表格与分页结合的组件。

## 指定构建 url 的函数

<template>
  <code-box
    title=""
    description=""
  >
  <h-paged-table
    :url="(pageSize, currentPage) => $withBase(`/data/table_road.json?perPage=${pageSize}&page=${currentPage}`)"
    :data="(json) => json.data.results"
    :total="(json) => json.data.totalRecord"
    :page-count="(json) => json.data.totalPage"
    @fetch-success="(json) => {}"
    @fetch-error="(err) => {}"
    style="height:360px;"
  >
    <el-table
      slot-scope="props"
      :data="props.data"
      force-scroll
    >
      <el-table-column prop="rank" label="排名"></el-table-column>
      <el-table-column prop="linkName" label="拥堵路段名称"></el-table-column>
      <el-table-column prop="congestionIndex" label="交通指数" ></el-table-column>
    </el-table>
  </h-paged-table>
  </code-box>
</template>

```html
<template>
  <h-paged-table
    :url="(pageSize, currentPage) => `/data/table_road.json?perPage=${pageSize}&page=${currentPage}`"
    :data="(json) => json.data.results"
    :total="(json) => json.data.totalRecord"
    :page-count="(json) => json.data.totalPage"
    @fetch-success="(json) => {}"
    @fetch-error="(err) => {}"
    style="height:360px;"
  >
    <el-table
      slot-scope="props"
      :data="props.data"
      force-scroll
    >
      <el-table-column prop="rank" label="排名"></el-table-column>
      <el-table-column prop="linkName" label="拥堵路段名称"></el-table-column>
      <el-table-column prop="congestionIndex" label="交通指数" ></el-table-column>
    </el-table>
  </h-paged-table>
</template>
```

## 指定自定义请求函数

<template>
  <code-box
    title=""
    description=""
  >
  <h-paged-table
    :fetch="tableFetch"
    :data="(json) => json.data.results"
    :total="(json) => json.data.totalRecord"
    :page-count="(json) => json.data.totalPage"
    style="height:360px;"
  >
    <el-table
      slot-scope="props"
      :data="props.data"
      force-scroll
    >
      <el-table-column prop="rank" label="排名"></el-table-column>
      <el-table-column prop="linkName" label="拥堵路段名称"></el-table-column>
      <el-table-column prop="congestionIndex" label="交通指数" ></el-table-column>
    </el-table>
  </h-paged-table>
  </code-box>
</template>

```html
<template>
  <h-paged-table
    :fetch="tableFetch"
    :data="(json) => json.data.results"
    :total="(json) => json.data.totalRecord"
    :page-count="(json) => json.data.totalPage"
    style="height:360px;"
  >
    <el-table
      slot-scope="props"
      :data="props.data"
      force-scroll
    >
      <el-table-column prop="rank" label="排名"></el-table-column>
      <el-table-column prop="linkName" label="拥堵路段名称"></el-table-column>
      <el-table-column prop="congestionIndex" label="交通指数" ></el-table-column>
    </el-table>
  </h-paged-table>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    tableFetch(url, perPage, page) {
      return axios.get('/data/table_road.json', { params: { perPage, page } })
        .then(response => response.data);
    }
  }
};
</script>
```

## 分页请求前的钩子

<template>
  <code-box
    title=""
    description=""
  >
  <h-paged-table
    :fetch="tableFetch"
    :data="(json) => json.data.results"
    :total="(json) => json.data.totalRecord"
    :page-count="(json) => json.data.totalPage"
    :before-current-change="beforeCurrentChange"
    :before-size-change="beforeSizeChange"
    style="height:360px;"
  >
    <el-table
      slot-scope="props"
      :data="props.data"
      force-scroll
    >
      <el-table-column prop="rank" label="排名"></el-table-column>
      <el-table-column prop="linkName" label="拥堵路段名称"></el-table-column>
      <el-table-column prop="congestionIndex" label="交通指数" ></el-table-column>
    </el-table>
  </h-paged-table>
  </code-box>
</template>

```html
<template>
  <h-paged-table
    :fetch="tableFetch"
    :data="(json) => json.data.results"
    :total="(json) => json.data.totalRecord"
    :page-count="(json) => json.data.totalPage"
    :before-current-change="beforeCurrentChange"
    :before-size-change="beforeSizeChange"
    style="height:360px;"
  >
    <el-table
      slot-scope="props"
      :data="props.data"
      force-scroll
    >
      <el-table-column prop="rank" label="排名"></el-table-column>
      <el-table-column prop="linkName" label="拥堵路段名称"></el-table-column>
      <el-table-column prop="congestionIndex" label="交通指数" ></el-table-column>
    </el-table>
  </h-paged-table>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    beforeCurrentChange(val, oldVal) {
      return this.$confirm(`是否跳转到第 ${val} 页？`, { type: 'question' })
        .then(() => true)
        .catch(() => false);
    },
    beforeSizeChange(val, oldVal) {
      return this.$confirm(`是否一页显示 ${val} 条数据？`, { type: 'question' })
        .then(() => true)
        .catch(() => false);
    }
  }
};
</script>
```

## 手动重载表格

<template>
  <code-box
    title=""
    description=""
  >
  <div>
    <el-input placeholder="搜索" v-model="q">
      <el-button
        slot="append"
        type="primary"
        icon="h-icon-search"
        @click="$refs.pagedTable.reload({ q })"
      ></el-button>
    </el-input>
    <h-paged-table
      ref="pagedTable"
      :url="$withBase(`/data/table_road.json`)"
      :fetch="tableFetchWithReload"
      :data="(json) => json.data.results"
      :total="(json) => json.data.totalRecord"
      :page-count="(json) => json.data.totalPage"
      style="height:360px;"
    >
      <el-table
        slot-scope="props"
        :data="props.data"
        force-scroll
      >
        <el-table-column prop="rank" label="排名"></el-table-column>
        <el-table-column prop="linkName" label="拥堵路段名称"></el-table-column>
        <el-table-column prop="congestionIndex" label="交通指数" ></el-table-column>
      </el-table>
    </h-paged-table>
  </div>
  </code-box>
</template>

```html
<template>
  <div>
    <el-input placeholder="搜索" v-model="q">
      <el-button
        slot="append"
        type="primary"
        icon="h-icon-search"
        @click="$refs.pagedTable.reload({ q })"
      ></el-button>
    </el-input>
    <h-paged-table
      ref="pagedTable"
      url="table_road.json"
      :fetch="tableFetchWithReload"
      :data="(json) => json.data.results"
      :total="(json) => json.data.totalRecord"
      :page-count="(json) => json.data.totalPage"
      style="height:360px;"
    >
      <el-table
        slot-scope="props"
        :data="props.data"
        force-scroll
      >
        <el-table-column prop="rank" label="排名"></el-table-column>
        <el-table-column prop="linkName" label="拥堵路段名称"></el-table-column>
        <el-table-column prop="congestionIndex" label="交通指数" ></el-table-column>
      </el-table>
    </h-paged-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      q: ''
    };
  },
  methods: {
    tableFetchWithReload(url, perPage, page, reloadOpt = {}) {
      return axios.get(url, { params: Object.assign({ perPage, page }, reloadOpt) })
        .then(response => response.data);
    },
  }
};
</script>
```


## API

### Attributes

| 参数                | 说明                                                                                                                        | 类型                                                 | 默认值                                    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------- |
| url                 | 构建 url 的函数                                                                                                             | Function(pageSize, currentPage, reloadOpt) 或 String | ''                                        |
| fetch               | 自定义请求函数。参数中 url 为「构建 url 的函数」得到的值；reloadOpt 为调用 reload 方法时传入的参数。返回一个 promise 对象。 | Function(url, pageSize, currentPage, reloadOpt)      | (url) => defaultPromise({ url })          |
| loading             | 是否正在请求，使用 .sync 修饰符进行同步，外部赋值不会影响组件内部                                                           | Boolean                                              | false                                     |
| beforeCurrentChange | 分页跳转发请求前的钩子，返回 Boolean 或 Promise\<Boolean\>，为 true 表示继续跳转                                            | Function(val, oldVal)                                | () => true                                |
| beforeSizeChange    | 每页显示条目个数变化发请求前的钩子，返回 Boolean 或 Promise\<Boolean\>，为 true 表示继续跳转                                | Function(val, oldVal)                                | () => true                                |
| data                | 获取表格数据的函数，参数 json 来自于 fetch 的返回值                                                                         | Function(json)                                       | -                                         |
| total               | 获取总条目数的函数，参数 json 来自于 fetch 的返回值                                                                         | Function(json)                                       | () => 0                                   |
| pageCount           | 获取总页数的函数，参数 json 来自于 fetch 的返回值                                                                           | Function(json)                                       | () => 0                                   |
| layout              | 同 ElPagination                                                                                                             | String                                               | 'total, sizes, prev, pager, next, jumper' |
| pageSize            | 同 ElPagination                                                                                                             | Number                                               | 10                                        |
| pageSizes           | 同 ElPagination                                                                                                             | Array                                                | [10, 20, 30, 40, 50, 100]                 |
| currentPage         | 同 ElPagination                                                                                                             | Number                                               | 1                                         |

要设置表格高度时，应当直接设置 HPagedTable 的 CSS。

### Events

| 事件名称       | 说明                     | 回调参数             |
| -------------- | ------------------------ | -------------------- |
| size-change    | pageSize 改变时会触发    | 每页条数 `size`      |
| current-change | currentPage 改变时会触发 | 当前页 `currentPage` |
| fetch-success  | 请求成功后触发           | 响应数据             |
| fetch-error    | 请求失败后触发           | 错误对象             |

### Methods

| 方法名 | 说明                                          | 参数      |
| ------ | --------------------------------------------- | --------- |
| reload | 重新加载表格，传入的参数会提供给 url 和 fetch | reloadOpt |

### Slot

| name | 说明                                                                                                                                                          |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -    | 需要以作用域插值的方式插入 ElTable。其中 `data` 必须为 `slot-scope="props"` 提供的 `props.data`，必须设置 `force-scroll`，不能设置 ElTable 上分页相关的属性。 |


<style lang="scss">
  .code-box.demo-h-pagedTable {
    table {
      margin: 0;
      display: table;
      border-collapse: separate;
    }

    th, td, tr {
      border-top: 0;
      border-left: 0;
    }

    .code-box-demo .el-table:not(.el-table--border) th, td {
      border-right: 0;
    }
  }
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      q: ''
    };
  },
  methods: {
    tableFetch(url, perPage, page) {
      return axios.get(this.$withBase('/data/table_road.json'), { params: { perPage, page } })
        .then(response => response.data);
    },
    beforeCurrentChange(val, oldVal) {
      return this.$confirm(`是否跳转到第 ${val} 页？`, { type: 'question' })
        .then(() => true)
        .catch(() => false);
    },
    beforeSizeChange(val, oldVal) {
      return this.$confirm(`是否一页显示 ${val} 条数据？`, { type: 'question' })
        .then(() => true)
        .catch(() => false);
    },
    tableFetchWithReload(url, perPage, page, reloadOpt = {}) {
      return axios.get(url, { params: Object.assign({ perPage, page }, reloadOpt) })
        .then(response => response.data);
    },
  }
};
</script>
