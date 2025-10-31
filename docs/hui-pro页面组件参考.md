# hui-pro 页面组件参考

> 基于 `/public/hui-pro/page/src/` 源码整理

## 📋 组件清单

hui-pro 提供了一套完整的页面布局组件，用于快速搭建后台管理页面。

### 核心布局组件

| 组件名 | 说明 | 关键特性 |
|--------|------|----------|
| `h-page-container` | 最外层容器 | 滚动监听、上下文提供 |
| `h-page-header` | 页面头部 | 面包屑、标题、操作按钮、固定吸顶 |
| `h-page-content` | 内容区域 | flex 布局、响应式 |
| `h-page-search` | 搜索栏 | 自适应栅格、高低频搜索 |
| `h-page-search-item` | 搜索项容器 | 包裹表单组件 |
| `h-page-table` | 表格容器 | 表头固定、滚动条固定、分页固定 |

### 其他组件

| 组件名 | 说明 |
|--------|------|
| `h-page-action` | 操作栏 |
| `h-page-button-group` | 按钮组 |
| `h-page-footer` | 页面底部 |
| `h-page-menu` | 页面菜单 |
| `h-page-sidebar` | 侧边栏 |
| `h-page-detail` | 详情展示 |
| `h-page-detail-item` | 详情项 |
| `h-page-group` | 分组容器 |

---

## 1. h-page-container

### 功能
页面最外层容器，提供全局上下文和滚动监听。

### Slots
```vue
<h-page-container>
  <h-page-header slot="pageHeader" />
  <!-- 默认 slot：主内容区 -->
  <h-page-content>
    <!-- 内容 -->
  </h-page-content>
</h-page-container>
```

### Props
无

### Provide
```javascript
{
  pageContainer: {
    headerAffix: Boolean,  // 头部是否固定
    headerHeight: Number,  // 头部高度
    sidebarAffix: Boolean, // 侧边栏是否固定
    scrollTop: Number,     // 页面滚动距离
    innerWidth: Number     // 容器宽度
  }
}
```

### Events
- `on-scroll`：页面滚动事件，参数：`{ scrollTop, scrollLeft }`

### 使用示例
```vue
<h-page-container @on-scroll="handleScroll">
  <h-page-header 
    slot="pageHeader"
    :breadcrumb="['首页', '用户管理']"
    title="用户列表"
  />
  <h-page-content>
    <!-- 内容 -->
  </h-page-content>
</h-page-container>
```

---

## 2. h-page-header

### 功能
页面头部，包含面包屑、标题、副标题、返回按钮、操作按钮区域。

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `affix` | Boolean | false | 是否固定在顶部 |
| `breadcrumb` | Array | [] | 面包屑数组 |
| `separator` | String | null | 面包屑分隔符 |
| `breadcrumbItemMaxWidth` | String/Number | '256px' | 面包屑项最大宽度 |
| `title` | String | '' | 页面标题 |
| `subtitle` | String | '' | 页面副标题 |
| `returnIcon` | Boolean | false | 是否显示返回图标 |
| `returnRouter` | String | '' | 返回路由 |
| `beforeReturn` | Function | null | 返回前钩子 |
| `returnEvent` | Function | null | 返回事件 |

### Slots
- `pageHeaderAction`：右侧操作按钮区域

### 面包屑格式
```javascript
// 简单格式（字符串数组）
['首页', '系统管理', '用户管理']

// 完整格式（对象数组）
[
  { title: '首页', router: '/' },
  { title: '系统管理', router: '/system' },
  { title: '用户管理', router: '/system/user' }
]
```

### 使用示例
```vue
<h-page-header
  :affix="true"
  :breadcrumb="breadcrumb"
  title="用户管理"
  subtitle="查看和管理系统用户"
  :return-icon="true"
>
  <el-button slot="pageHeaderAction" type="primary">新增用户</el-button>
</h-page-header>
```

### 特性说明
- **面包屑自动折叠**：当宽度不足时，自动折叠中间项，保留首尾
- **固定吸顶**：设置 `affix` 后，滚动时自动吸顶
- **响应式适配**：宽度不足时，面包屑和操作按钮自动调整

---

## 3. h-page-content

### 功能
主内容区域容器，提供 flex 布局支持。

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `flex` | Boolean | false | 是否使用 flex 布局 |
| `direction` | String | 'vertical' | flex 方向：vertical / horizontal |
| `alignCenter` | Boolean | false | 是否水平居中 |

### Slots
- `default`：内容插槽

### Provide
```javascript
{
  pageContent: {
    searchIconExist: Boolean,   // 搜索图标是否存在
    searchIconActive: Boolean,  // 搜索图标是否激活
    actionAffix: Boolean,       // 操作栏是否固定
    actionHeight: Number,       // 操作栏高度
    innerWidth: Number,         // 内容区宽度
    innerHeight: Number         // 内容区高度
  }
}
```

### 使用示例
```vue
<h-page-content :flex="true" direction="vertical">
  <h-page-search><!-- 搜索区 --></h-page-search>
  <h-page-table><!-- 表格区 --></h-page-table>
</h-page-content>
```

---

## 4. h-page-search

### 功能
搜索栏容器，提供自适应栅格布局和高低频搜索功能。

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `model` | Object | - | 表单数据对象（el-form 的 model） |
| `rules` | Object | - | 表单校验规则 |
| `labelPosition` | String | 'top' | 标签位置：top / left / right |
| `labelWidth` | String | null | 标签宽度 |
| `options` | Object | {} | 断点配置 |
| `hlfIcon` | String | 'h-icon-angles_down_sm' | 高低频图标 |

### Slots
- `default`：搜索项插槽（放置 h-page-search-item）
- `pageSearchAction`：操作按钮区域

### 断点配置
```javascript
// 默认断点（可通过 options 自定义）
{
  xl: 1408,  // ≥1408px 显示 6 列
  lg: 935,   // ≥935px 显示 4 列
  md: 708,   // ≥708px 显示 3 列
  sm: 472    // ≥472px 显示 2 列
             // <472px 显示 1 列
}
```

### 方法
- `getForm()`：获取表单实例
- `resetFields(isEmpty)`：重置表单
- `reset()`：重置表单和状态

### Events
- `collapse`：展开/收起事件，参数：`showMore`

### 使用示例
```vue
<h-page-search 
  ref="search"
  :model="searchForm" 
  :rules="rules"
>
  <!-- 搜索项 -->
  <h-page-search-item label="用户名" prop="userName">
    <el-input v-model="searchForm.userName" />
  </h-page-search-item>
  
  <h-page-search-item label="状态" prop="status" :show="false">
    <el-select v-model="searchForm.status">
      <el-option label="全部" value="" />
      <el-option label="启用" value="1" />
      <el-option label="停用" value="0" />
    </el-select>
  </h-page-search-item>
  
  <!-- 操作按钮 -->
  <template slot="pageSearchAction">
    <el-button type="primary" @click="handleSearch">查询</el-button>
    <el-button @click="handleReset">重置</el-button>
  </template>
</h-page-search>

<script>
export default {
  methods: {
    handleReset() {
      this.$refs.search.reset()
    }
  }
}
</script>
```

### 高低频搜索
- 设置 `h-page-search-item` 的 `show` 为 `false` 的项为低频搜索项
- 当有低频项时，自动显示展开/收起图标
- 用户可点击图标切换显示全部搜索项

---

## 5. h-page-search-item

### 功能
搜索项容器，包裹单个表单组件。

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `prop` | String | null | 表单字段名 |
| `label` | String | '' | 字段标签 |
| `rules` | Object | - | 校验规则 |
| `required` | Boolean | false | 是否必填 |
| `labelWidth` | String | null | 标签宽度 |
| `show` | Boolean | true | 是否默认显示（用于高低频） |
| `hidden` | Boolean | false | 是否隐藏 |

### Slots
- `default`：表单组件插槽

### 使用示例
```vue
<!-- 高频搜索项（默认显示） -->
<h-page-search-item label="用户名" prop="userName">
  <el-input v-model="form.userName" clearable />
</h-page-search-item>

<!-- 低频搜索项（默认隐藏，点击展开后显示） -->
<h-page-search-item label="创建时间" prop="createTime" :show="false">
  <el-date-picker v-model="form.createTime" type="daterange" />
</h-page-search-item>

<!-- 完全隐藏（v-if 的替代） -->
<h-page-search-item label="隐藏字段" prop="hidden" :hidden="true">
  <el-input v-model="form.hidden" />
</h-page-search-item>
```

---

## 6. h-page-table

### 功能
表格容器，支持表头固定、滚动条固定、分页器固定。

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `full` | Boolean | false | 是否占满剩余空间 |
| `border` | Boolean | false | 是否显示左右边框 |
| `headerAffix` | Boolean | true | 表头是否固定 |
| `headerOffsetTop` | Number | null | 表头固定时距离顶部的偏移 |
| `scrollbarAffix` | Boolean | true | 滚动条是否固定 |
| `scrollbarOffsetBottom` | Number | 0 | 滚动条固定时距离底部的偏移 |
| `paginationAffix` | Boolean | true | 分页器是否固定 |
| `paginationOffsetBottom` | Number | 0 | 分页器固定时距离底部的偏移 |

### Slots
- `default`：表格插槽（放置 el-table）
- `pagination`：分页器插槽（放置 el-pagination）

### 使用示例
```vue
<h-page-table
  :full="true"
  :border="true"
  :header-affix="true"
  :scrollbar-affix="true"
  :pagination-affix="true"
>
  <!-- 表格 -->
  <el-table :data="tableData" stripe>
    <el-table-column prop="userId" label="用户ID" width="80" />
    <el-table-column prop="userName" label="用户名" />
    <el-table-column prop="phone" label="手机号" />
    <el-table-column prop="status" label="状态">
      <template slot-scope="{ row }">
        <el-tag :type="row.status === '1' ? 'success' : 'info'">
          {{ row.status === '1' ? '启用' : '停用' }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
  
  <!-- 分页器 -->
  <el-pagination
    slot="pagination"
    :current-page="pagination.pageNo"
    :page-size="pagination.pageSize"
    :total="pagination.total"
    :page-sizes="[10, 20, 50, 100]"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</h-page-table>
```

### 固定模式说明

**表头固定**（headerAffix）：
- 滚动时，表头自动吸顶
- 适合长表格滚动查看

**滚动条固定**（scrollbarAffix）：
- 滚动条固定在屏幕底部
- 适合宽表格横向滚动

**分页器固定**（paginationAffix）：
- 分页器固定在屏幕底部
- 滚动时始终可见

---

## 💡 最佳实践

### 1. 标准列表页结构

```vue
<template>
  <h-page-container @on-scroll="handleScroll">
    <!-- 页面头部 -->
    <h-page-header
      slot="pageHeader"
      :affix="true"
      :breadcrumb="breadcrumb"
      :title="title"
    >
      <el-button 
        slot="pageHeaderAction" 
        type="primary" 
        @click="handleAdd"
      >
        新增
      </el-button>
    </h-page-header>
    
    <!-- 内容区域 -->
    <h-page-content>
      <!-- 搜索栏 -->
      <h-page-search 
        ref="search"
        :model="searchForm"
      >
        <!-- 搜索项 -->
        <h-page-search-item label="用户名" prop="userName">
          <el-input v-model="searchForm.userName" clearable />
        </h-page-search-item>
        
        <h-page-search-item label="状态" prop="status">
          <el-select v-model="searchForm.status" clearable>
            <el-option label="全部" value="" />
            <el-option label="启用" value="1" />
            <el-option label="停用" value="0" />
          </el-select>
        </h-page-search-item>
        
        <!-- 操作按钮 -->
        <template slot="pageSearchAction">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </template>
      </h-page-search>
      
      <!-- 表格 -->
      <h-page-table :full="true">
        <el-table :data="tableData" stripe>
          <el-table-column prop="userId" label="用户ID" width="80" />
          <el-table-column prop="userName" label="用户名" />
          <el-table-column prop="phone" label="手机号" />
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="{ row }">
              <el-button type="text" @click="handleEdit(row)">编辑</el-button>
              <el-button type="text" @click="handleDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <!-- 分页器 -->
        <el-pagination
          slot="pagination"
          :current-page="pagination.pageNo"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </h-page-table>
    </h-page-content>
  </h-page-container>
</template>

<script>
export default {
  data() {
    return {
      breadcrumb: ['首页', '系统管理', '用户管理'],
      title: '用户列表',
      searchForm: {
        userName: '',
        status: ''
      },
      tableData: [],
      pagination: {
        pageNo: 1,
        pageSize: 20,
        total: 0
      }
    }
  },
  
  mounted() {
    this.fetchData()
  },
  
  methods: {
    handleSearch() {
      this.pagination.pageNo = 1
      this.fetchData()
    },
    
    handleReset() {
      this.$refs.search.reset()
      this.handleSearch()
    },
    
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.fetchData()
    },
    
    handleCurrentChange(page) {
      this.pagination.pageNo = page
      this.fetchData()
    },
    
    async fetchData() {
      // 调用接口获取数据
      const params = {
        ...this.searchForm,
        pageNo: this.pagination.pageNo,
        pageSize: this.pagination.pageSize
      }
      // const res = await api.getUserList(params)
      // this.tableData = res.data.rows
      // this.pagination.total = res.data.total
    }
  }
}
</script>
```

### 2. 响应式断点自定义

如果需要自定义响应式断点：

```vue
<h-page-search
  :model="searchForm"
  :options="{
    xl: 1600,  // 自定义断点
    lg: 1200,
    md: 900,
    sm: 600
  }"
>
  <!-- ... -->
</h-page-search>
```

### 3. 高低频搜索最佳实践

```vue
<!-- 高频项（常用，默认显示） -->
<h-page-search-item label="用户名" prop="userName">
  <el-input v-model="form.userName" />
</h-page-search-item>

<h-page-search-item label="手机号" prop="phone">
  <el-input v-model="form.phone" />
</h-page-search-item>

<!-- 低频项（不常用，默认隐藏） -->
<h-page-search-item label="邮箱" prop="email" :show="false">
  <el-input v-model="form.email" />
</h-page-search-item>

<h-page-search-item label="注册时间" prop="regTime" :show="false">
  <el-date-picker v-model="form.regTime" type="daterange" />
</h-page-search-item>
```

**原则**：
- 常用搜索项设置为高频（默认显示）
- 不常用搜索项设置为低频（点击展开后显示）
- 高频项建议 ≤ 3 个

---

## 🔗 组件关系图

```
h-page-container (最外层)
├─ h-page-header (具名slot: pageHeader)
│  └─ pageHeaderAction slot (操作按钮)
└─ h-page-content (默认slot)
   ├─ h-page-search
   │  ├─ h-page-search-item (多个)
   │  │  └─ el-input / el-select / ... (表单组件)
   │  └─ pageSearchAction slot (查询、重置按钮)
   └─ h-page-table
      ├─ el-table (默认slot)
      │  └─ el-table-column (多个)
      └─ el-pagination (具名slot: pagination)
```

---

## 📚 参考资源

- **组件源码**：`/public/hui-pro/page/src/`
- **使用文档**：本文档
- **开发文档**：`/docs/开发文档.md`
- **产品文档**：`/docs/产品文档.md`

---

**最后更新**：2025-10-31

