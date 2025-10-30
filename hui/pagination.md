# Pagination 分页

当数据量过多时，使用分页分解数据。

## 基础用法
<template>
  <code-box
    title="基础用法"
    description="`layout`表示需要显示的内容，用逗号分隔，布局元素会依次显示。`prev`表示上一页，`next`为下一页，`pager`表示页码列表，除此以外还提供了`jumper`和`total`，`size`和特殊的布局符号`->`，`->`后的元素会靠右显示，`jumper`表示跳页元素，`total`表示显示页码总数，`size`用于设置每页显示的页码数量。">
    <div class="block">
      <span class="demonstration">页数较少时的效果</span>
      <el-pagination
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    </div>
    <div class="block">
      <span class="demonstration">大于 7 页时的效果</span>
      <el-pagination
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </code-box>
</template>

```vue
<template>
  <div class="block">
    <span class="demonstration">页数较少时的效果</span>
    <el-pagination
      layout="prev, pager, next"
      :total="50">
    </el-pagination>
  </div>
  <div class="block">
    <span class="demonstration">大于 7 页时的效果</span>
    <el-pagination
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>
```

## 小型分页

在空间有限的情况下，可以使用简单的小型分页。

<code-box
    description="通过设置属性`small`, 并在`layout`中加入`pager`来使用小型分页">
  <el-pagination
    small
    layout="prev, pager, next"
    :total="50">
  </el-pagination>
</code-box>

```vue
<template>
  <el-pagination
    small
    layout="prev, pager, next"
    :total="50">
  </el-pagination>
</template>
```
## 迷你分页 <Badge text="2.0+"/>

在内容页面宽度特别窄，内容量又相对较多的时候，可以使用迷你分页。

<code-box
    description="通过设置属性`small`, 并在`layout`中加入`miniPager`来使用小型分页. 在`layout`中添加`first`, `last`, 可以为迷你分页添加跳转首页和末页按钮">
  <el-pagination
    small
    layout="prev, miniPager, next"
    :total="50">
  </el-pagination>
  <el-pagination
    small
    layout="first, prev, miniPager, next, last"
    :total="50">
  </el-pagination>
</code-box>

```vue
<template>
  <el-pagination
    small
    layout="prev, miniPager, next"
    :total="50">
  </el-pagination>
  <el-pagination
    small
    layout="first, prev, miniPager, next, last"
    :total="50">
  </el-pagination>
</template>
```

## 表格中使用分页

<code-box
    class="pagination-in-table"
    description="">
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage4"
    :page-sizes="[100, 200, 300, 400]"
    :page-size="100"
    layout="total, sizes, huiPager, jumper"
    :total="1000">
  </el-pagination>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage4"
    :page-sizes="[100, 200, 300, 400]"
    :page-size="100"
    layout="total, sizes, prev, pager, next, jumper"
    :total="1000">
  </el-pagination>
</code-box>

```vue
<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage4"
    :page-sizes="[100, 200, 300, 400]"
    :page-size="100"
    layout="total, sizes, huiPager, jumper"
    :total="1000">
  </el-pagination>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage4"
    :page-sizes="[100, 200, 300, 400]"
    :page-size="100"
    layout="total, sizes, prev, pager, next, jumper"
    :total="1000">
  </el-pagination>
</template>
```

## 附加功能

根据场景需要，可以添加其他功能模块。

<code-box
  description="此例是一个完整的用例，使用了`size-change`和`current-change`事件来处理页码大小和当前页变动时候触发的事件。`page-sizes`接受一个整型数组，数组元素为展示的选择每页显示个数的选项，`[100, 200, 300, 400]`表示四个选项，每页显示 100 个，200 个，300 个或者 400 个。">
  <div class="block">
    <span class="demonstration">显示总数</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
  <div class="block">
    <span class="demonstration">调整每页显示条数</span>
    <section class="pagination-wrap">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage2"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="20"
        :before-size-change="beforeSizeChange"
        :before-current-change="beforeCurrentChange"
        layout="sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="20"
        layout="sizes, prev, pager, next"
        :total="400">
      </el-pagination>
    </section>
  </div>
  <div class="block">
    <span class="demonstration">直接前往页面</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage4"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </div>
</code-box>

```vue
<template>
  <div class="block">
    <span class="demonstration">显示总数</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
  <div class="block">
    <span class="demonstration">调整每页显示条数</span>
    <section class="pagination-wrap">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage2"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="20"
        :before-size-change="beforeSizeChange"
        :before-current-change="beforeCurrentChange"
        layout="sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="20"
        layout="sizes, prev, pager, next"
        :total="400">
      </el-pagination>
    </section>
  </div>
  <div class="block">
    <span class="demonstration">直接前往</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage4"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    methods: {
      handleSizeChange(val, oldVal) {
        console.log(`每页 ${val} 条`);
        console.log(`之前每页 ${oldVal} 条`);
      },
      handleCurrentChange(val, oldVal) {
        console.log(`当前页: ${val}`);
        console.log(`之前页数 ${oldVal}`);
      },
      beforeSizeChange(val, oldVal) {
        return this.$confirm(`是否一页显示 ${val} 条数据？`, { type: 'question' })
          .then(() => true)
          .catch(() => false);
      },
      beforeCurrentChange(val, oldVal) {
        return this.$confirm(`是否跳转到第 ${val} 页？`, { type: 'question' })
          .then(() => true)
          .catch(() => false);
      }
    },
    data() {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 5
      };
    }
  }
</script>
```

<style lang="scss" scope>
  .demo-pagination {
    .block {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 30px 20px;
        overflow: hidden;
        border-bottom: solid 1px #EFF2F6;
        &:last-child {
          border-bottom: none;
        }
      }
    .demonstration {
      font-size: 14px;
      color: #8492a6;
      & + .el-pagination {
        width: 82%;
      }
    }
  }
  .code-box.demo-pagination{
    .pagination-wrap {
      width: 82%;
      .el-pagination:nth-last-child(1) {
        margin-top: 10px;
      }
    }
  }
  .code-box {
    .code-box-demo {
      padding: 24px 20px 40px;
    }
    &.pagination-in-table {
      .code-box-demo {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }
</style>

<script>
let demoInstance = null
  export default {
    data() {
      return {
        pagerCount: 7,
        tableLayout: 'total, sizes, prev, pager, next, jumper',
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 5
      };
    },
    directives: {
      /**
       * @author: fangbinwei
       * @since: 2019-03-30 20:41:11
       * @desc: code-box是异步组件
       */
      paginationAdaptive: {
        inserted (el, binding, vnode, oldVnode) {
          demoInstance.resizeHandler()
        }
      }
    },
    methods: {
      handleSizeChange(val, oldVal) {
        console.log(`每页 ${val} 条`);
        console.log(`之前每页 ${oldVal} 条`);
      },
      handleCurrentChange(val, oldVal) {
        console.log(`当前页: ${val}`);
        console.log(`之前页数 ${oldVal}`);
      },
      beforeSizeChange(val, oldVal) {
        return this.$confirm(`是否一页显示 ${val} 条数据？`, { type: 'question' })
          .then(() => true)
          .catch(() => false);
      },
      beforeCurrentChange(val, oldVal) {
        return this.$confirm(`是否跳转到第 ${val} 页？`, { type: 'question' })
          .then(() => true)
          .catch(() => false);
      },
      resizeHandler () {
        if (!this.$refs.pagination) return

        const pagination= this.$refs.pagination.$el
        const paginationWidth = pagination.getBoundingClientRect().width

        const getTableLayoutWithPagerCount = () => {
          switch (true) {
            case paginationWidth < 880:
              this.pagerCount = 5
              break
            default:
              this.pagerCount = 7
          }
          return 'total, sizes, prev, pager, next, jumper'
        }
        this.tableLayout = paginationWidth < 600 ?
          'huiPager, jumper' :
          paginationWidth < 800 ?
            'total, sizes, huiPager, jumper' :
            getTableLayoutWithPagerCount()
      }
    },
    created () {
      // code-box是异步组件, 如果先进其他页面再进pagination demo,
      // code-box挂载在本组件mounted之前, 如果直接进入pagination demo, code-box挂载在本组件mounted之后
      // 为了确保首次resizeHandler能够执行, 在pagination insert时, 调用demoInstance.resizeHandler, 而不是在mounted中调用
      demoInstance = this
    },
    mounted () {
      window.addEventListener('resize', this.resizeHandler)
    },
    destroyed () {
      window.removeEventListener('resize', this.resizeHandler)
    }
  }
</script>

## API

### Attributes
| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
| small | 是否使用小型分页样式 | Boolean | — | false |
| page-size | 每页显示条目个数 | Number | — | 10 |
| total | 总条目数 | Number | — | — |
| page-count | 总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性 | Number | — | — |
| pager-count <Badge text="2.0+"/> | 页码按钮的数量，当总页数超过该值时会折叠 | Number | 大于等于 5 且小于等于 21 的数(推荐使用奇数) | 7 |
| current-page | 当前页数，支持 .sync 修饰符 | Number | — | 1 |
| layout | 组件布局，子组件名用逗号分隔| String | `sizes`, `prev`, `pager`, `miniPager`<Badge text="2.0+"/>, `huiPager`, `next`, `jumper`, `->`, `total`, `slot`, `first`<Badge text="2.0+"/>, `last`<Badge text="2.0+"/><br/>(`first`, `last`建议只在迷你分页中选用) | 'prev, pager, next, jumper, ->, total'  |
| page-sizes | 每页显示个数选择器的选项设置 | Number[] | — |  [10, 20, 30, 40, 50, 100] |
| page-class | 自定义class,位于组件最外层容器 | String | — | — |
| beforeCurrentChange | 分页跳转发请求前的钩子，返回 Boolean 或 Promise\<Boolean\>，为 true 表示继续跳转 | Function(val, oldVal) | — | () => true |
| beforeSizeChange | 每页显示条目个数变化发请求前的钩子，返回 Boolean 或 Promise\<Boolean\>，为 true 表示继续跳转 | Function(val, oldVal) | — | () => true |
| disabled | 是否禁用 | boolean | — | false |
| prevText <Badge text="2.0+"/>| 定义上一页的文字, 代替图标 | string | — | — |
| nextText <Badge text="2.0+"/>| 定义下一页的文字, 代替图标 | string | — | — |
| sizes-popper-class <Badge text="2.09+"/>| 设置每页显示条数下拉框的类名 | string | — | — |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| size-change | pageSize 改变时会触发 | 每页条数`size`，改变前每页条数`oldSize` |
| current-change | currentPage 改变时会触发 | 当前页`currentPage`，改变前的页数`olaPage` |

### Slot
| name | 说明 |
|------|--------|
| — | 自定义内容，需要在 `layout` 中列出 `slot` |


