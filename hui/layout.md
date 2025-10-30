# HUI Pro Layout 组件文档

本文档汇总了 HUI Pro 布局相关的主要组件，方便查阅和使用。

## 目录

- [PageContainer 页面容器](#pagecontainer-页面容器)
- [PageContent 内容区域](#pagecontent-内容区域)
- [PageHeader 页面头部区域](#pageheader-页面头部区域)
- [PageAction 操作栏](#pageaction-操作栏)
- [PageSearch 搜索栏](#pagesearch-搜索栏)
- [PageSidebar 侧边栏](#pagesidebar-侧边栏)
- [PageTable 表格内容](#pagetable-表格内容)
- [PageContentTable 表格内容区域](#pagecontenttable-表格内容区域)

## PageContainer 页面容器

页面容器承载除左侧导航栏外所有的页面元素，在不使用 Page 和 PageMenu 的时候，使用 PageContainer 作为最外层容器。

### Events
| 事件 | 说明 | 回调参数 |
|------|------|------|
| on-scroll | 页面进行滚动时的回调 | 共一个参数，当前滚动的 top、left 值，{ scrollTop, scrollLeft } |

### Slot
| name | 说明 |
|------|------|
| pageHeader | 页面头部插槽 |

## PageContent 内容区域

主内容区域为主要信息承载区域，用于页面主要内容的展示。

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| flex | 内部是否使用 flex 布局 | Boolean | - | false |
| align-center | 使用 flex 布局时，水平方向是否居中 | Boolean | - | false |
| direction | 使用 flex 布局时，内部是水平排列还是垂直排列，默认为'垂直排列' | String | 'vertical' / 'horizontal' | 'vertical' |

## PageHeader 页面头部区域

页面头部区域承载面包屑、返回按钮等，用于展示当前页面在系统中所处的位置，并可以进行页面跳转等操作。

### 基础用法

```html
<h-page-container>
  <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
</h-page-container>

<script>
  export default {
    data() {
      return {
        breadcrumb: ['Title', 'Title', 'Title', 'Title']
      }
    }
  }
</script>
```

### 页面标题

```html
<h-page-container>
  <h-page-header
    slot="pageHeader"
    :breadcrumb="breadcrumb"
    title="Title"
    subtitle="Subtitle"
  />
</h-page-container>
```

### 返回按钮

```html
<h-page-container>
  <h-page-header
    slot="pageHeader"
    :breadcrumb="breadcrumb"
    return-icon
    :before-return="beforeReturn"
    :return-event="returnEvent"
    :return-router="returnRouter"
  />
</h-page-container>

<script>
  export default {
    data() {
      return {
        breadcrumb: ['Title', 'Title', 'Title', 'Title'],
        returnRouter: {
          path: '/main/dashboard'
        }
      }
    },
    methods: {
      beforeReturn() {
        this.$message.warning('beforeReturn');
        return true;
      },
      returnEvent() {
        this.$message.success('returnEvent');
      }
    }
  }
</script>
```

### 右侧操作内容

```html
<h-page-container>
  <h-page-header slot="pageHeader" :breadcrumb="breadcrumb">
    <template slot="pageHeaderAction">
      <el-button type="primary">BTN</el-button>
    </template>
  </h-page-header>
</h-page-container>
```

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| affix | 是否开启图钉模式 | Boolean | - | true |
| offset-top | 距离窗口顶部达到指定偏移量后触发 | Number | - | 0 |
| breadcrumb | 面包屑数组 | Array | - | - |
| title | 标题 | String | - | - |
| subtitle | 副标题 | String | - | - |
| return-icon | 是否显示返回按钮 | Boolean | - | false |
| before-return | 返回前的钩子，返回 false 则不执行操作 | Function | - | - |
| return-event | 回调函数，点击返回按钮会执行这个函数 | Function | - | - |
| return-router | 点击返回按钮后进行路由跳转参数 | Object | - | - |

### Slot
| name | 说明 |
|------|------|
| pageHeaderAction | 头部右侧插槽 |

## PageAction 操作栏

操作栏承载页面上的操作按钮。

### 基础用法

```html
<h-page-container>
  <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
  <h-page-content>
    <h-page-action>
      <el-button type="iconButton" icon="h-icon-import">BTN</el-button>
      <el-button type="iconButton" icon="h-icon-export">BTN</el-button>
      <el-button type="iconButton" icon="h-icon-setting">BTN</el-button>
    </h-page-action>
  </h-page-content>
</h-page-container>
```

### 右侧操作内容

```html
<h-page-container>
  <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
  <h-page-content>
    <h-page-action>
      <el-button type="iconButton" icon="h-icon-import">BTN</el-button>
      <el-button type="iconButton" icon="h-icon-export">BTN</el-button>
      <el-button type="iconButton" icon="h-icon-setting">BTN</el-button>
      <template slot="rightAction">
        <el-button type="iconButton" icon="h-icon-associate">BTN</el-button>
      </template>
    </h-page-action>
  </h-page-content>
</h-page-container>
```

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| affix | 是否开启图钉模式 | Boolean | - | true |
| offset-top | 距离窗口顶部达到指定偏移量后触发 | Number | - | 0 |
| search-icon | 是否显示搜索图标 | Boolean | - | false |
| search-icon-tips | 搜索图标提示信息 | String | - | 'filter' |
| hide-search-icon-tips | 是否隐藏搜索图标提示信息 | Boolean | - | false |
| search-icon-active | 搜索图标是否激活 | Boolean | - | false |

### Methods
| 方法名 | 说明 | 参数 |
|------|------|------|
| resize | 重新计算操作栏宽度 | - |

### Events
| 事件 | 说明 | 回调参数 |
|------|------|------|
| search-collapse | 搜索框显示隐藏时的回调 | 共一个参数，当前的状态，true 为显示，false 为隐藏 |
| fold | 按钮折叠事件 | - |
| unfold | 按钮展开事件 | - |

### Slot
| name | 说明 |
|------|------|
| leftAction | 操作栏左侧插槽，类似默认插槽，但不会使用 `h-page-button-group` 进行包裹 |
| rightAction | 操作栏右侧插槽 |

## PageSearch 搜索栏

搜索栏用于在大量数据中通过筛选，得到特定的数据。

### 基础用法

```html
<h-page-container>
  <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
  <h-page-content>
    <h-page-search ref="search" :model="search">
      <h-page-search-item label="Title" prop="title1">
        <el-input v-model="search.title1" placeholder="Information" />
      </h-page-search-item>
      <h-page-search-item label="Title" prop="title2">
        <el-input v-model="search.title2" placeholder="Information" />
      </h-page-search-item>
      <h-page-search-item label="Title" prop="title3">
        <el-input v-model="search.title3" placeholder="Information" />
      </h-page-search-item>
      <h-page-search-item label="Title" prop="title4">
        <el-input v-model="search.title4" placeholder="Information" />
      </h-page-search-item>
      <template slot="pageSearchAction">
        <el-button type="primary">Search</el-button>
        <el-button @click="handleReset">Reset</el-button>
      </template>
    </h-page-search>
  </h-page-content>
</h-page-container>
```

### 高低频搜索

```html
<h-page-container>
  <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
  <h-page-content>
    <h-page-search ref="search" :model="search">
      <h-page-search-item label="Title" prop="title1">
        <el-input v-model="search.title1" placeholder="Information" />
      </h-page-search-item>
      <h-page-search-item label="Title" prop="title2">
        <el-input v-model="search.title2" placeholder="Information" />
      </h-page-search-item>
      <h-page-search-item label="Title" prop="title3" :show="false">
        <el-input v-model="search.title3" placeholder="Information" />
      </h-page-search-item>
      <h-page-search-item label="Title" prop="title4" :show="false">
        <el-input v-model="search.title4" placeholder="Information" />
      </h-page-search-item>
      <template slot="pageSearchAction">
        <el-button type="primary">Search</el-button>
        <el-button @click="handleReset">Reset</el-button>
      </template>
    </h-page-search>
  </h-page-content>
</h-page-container>
```

### 默认收起

```html
<h-page-container>
  <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
  <h-page-content>
    <h-page-action search-icon />
    <h-page-search ref="search" :model="search">
      <h-page-search-item label="Title" prop="title1">
        <el-input v-model="search.title1" placeholder="Information" />
      </h-page-search-item>
      <h-page-search-item label="Title" prop="title2">
        <el-input v-model="search.title2" placeholder="Information" />
      </h-page-search-item>
      <h-page-search-item label="Title" prop="title3">
        <el-input v-model="search.title3" placeholder="Information" />
      </h-page-search-item>
      <h-page-search-item label="Title" prop="title4">
        <el-input v-model="search.title4" placeholder="Information" />
      </h-page-search-item>
      <template slot="pageSearchAction">
        <el-button type="primary">Search</el-button>
        <el-button @click="handleReset">Reset</el-button>
      </template>
    </h-page-search>
  </h-page-content>
</h-page-container>
```

### PageSearch Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| model | 表单数据对象 | Object | - | - |
| rules | 表单验证规则 | Object | - | - |
| label-position | 表单域标签的位置 | String | right/left/top | top |
| label-width | 表单域标签的宽度 | String | - | - |
| hlf-icon | 高低频搜索图标 | String | - | 'h-icon-angles_down_sm' |
| options | 断点参数 | Object | - | 参考 【PageSearch Options】 |

### PageSearch Methods
| 方法名 | 说明 | 参数 |
|------|------|------|
| getForm | 获取搜索栏使用的表单控件（HUI） | - |
| resetFields | 对整个表单进行重置，清空所有字段并移除校验结果 | - |
| resetStatus | 重置搜索栏显隐性状态 | - |
| reset | 重置搜索栏 | - |
| resize | 重新计算搜索项和操作项所占栅格数 | - |
| collapse | 显示/隐藏高低频搜索项 | - |

### PageSearch Slot
| name | 说明 |
|------|------|
| pageSearchAction | 搜索栏操作按钮插槽 |
| pageSearchHlf | 搜索栏高低频搜索按钮插槽 |

### PageSearch Options
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| xl | 一行 6 个搜索项的断点 | Number | - | 1408 |
| lg | 一行 4 个搜索项的断点 | Number | - | 935 |
| md | 一行 3 个搜索项的断点 | Number | - | 708 |
| sm | 一行 2 个搜索项的断点 | Number | - | 472 |

### PageSearch Events
| 事件 | 说明 | 回调参数 |
|------|------|------|
| collapse | 显示/隐藏高低频搜索项的回调 | 共一个参数，是否显示高低频搜索项 |

### PageSearchItem Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| prop | 表单域 model 字段 | 传入 Form 组件的 model 中的字段 | - | - |
| rules | 表单验证规则 | Object | - | - |
| label | 标签文本 | String | - | - |
| required | 是否必填 | String | - | - |
| required-right | 是否必填，且星号显示在文字右侧 | String | - | - |
| introduction | 表单项的介绍文字 | String | - | - |
| introduction-icon | 	介绍文字的响应图标 | String | - | h-icon-info |
| label-width | 表单域标签的的宽度 | String | - | - |
| show | 设为 false 会开启高低频过滤 | Boolean | - | true |
| hidden | 菜单项是否隐藏 | Boolean | - | false |

## PageSidebar 侧边栏

侧边栏用于承载二级导航，分为树形式和列表形式。

### 基础用法

```html
<h-page-container>
  <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
  <h-layout>
    <h-page-sidebar type="list" width="200px">
      <ul>
        <li
          v-for="(item, index) in sidebar"
          :key="index"
          :class="{ active: item === activeSidebar }"
          @click="handleClick(item)"
        >
          <span>{{ item }}</span>
        </li>
      </ul>
    </h-page-sidebar>
    <h-page-content>Content</h-page-content>
  </h-layout>
</h-page-container>
```

### 树形侧边栏

```html
<h-page-container>
  <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
  <h-layout>
    <h-page-sidebar type="tree" width="200px">
      <el-tree
        :data="treeData"
        :props="defaultProps"
        default-expand-all
        @node-click="handleNodeClick"
      ></el-tree>
    </h-page-sidebar>
    <h-page-content>Content</h-page-content>
  </h-layout>
</h-page-container>
```

### 图钉模式

```html
<h-page-container>
  <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
  <h-layout>
    <h-page-sidebar type="list" width="200px" :affix="true" :offset-top="52">
      <ul>
        <li
          v-for="(item, index) in sidebar"
          :key="index"
          :class="{ active: item === activeSidebar }"
          @click="handleClick(item)"
        >
          <span>{{ item }}</span>
        </li>
      </ul>
    </h-page-sidebar>
    <h-page-content>Content</h-page-content>
  </h-layout>
</h-page-container>
```

### 内置滚动条

```html
<h-page-container>
  <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
  <h-layout>
    <h-page-sidebar type="list" width="200px" :affix="true" :offset-top="52" :inline-scroll="true">
      <ul>
        <li
          v-for="(item, index) in sidebar"
          :key="index"
          :class="{ active: item === activeSidebar }"
          @click="handleClick(item)"
        >
          <span>{{ item }}</span>
        </li>
      </ul>
    </h-page-sidebar>
    <h-page-content>Content</h-page-content>
  </h-layout>
</h-page-container>
```

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| affix | 是否开启图钉模式 | Boolean | - | false |
| offset-top | 图钉模式时，设置距离窗口顶部达到指定偏移量后触发 | Number | - | 0 |
| type | 侧边栏类型 | String | 'list'/'tree' | 'list' |
| width | 侧边栏宽度 | String | - | '200px' |
| inline-scroll | 是否使用内置滚动条 | Boolean | - | false |
| max-height | 使用内置滚动条时指定最大高度 | String | - | - |

## PageTable 表格内容

表格内容用于展示表格数据。

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| full | 表格是否占据容器剩余空间（需要容器是 flex 布局） | Boolean | - | false |
| border | 表格左右是否有边框 | Boolean | - | false |
| header-affix | 表格头部是否开启图钉模式 | Boolean | - | true |
| header-offset-top | 表格头部开启固定模式时，距离窗口顶部达到指定偏移量后触发 | Number | - | - |
| scrollbar-affix | 表格滚动条是否开启固定模式 | Boolean | - | true |
| scrollbar-offset-bottom | 表格滚动条开启固定模式时，距离窗口底部达到指定偏移量后触发 | Number | - | 0 |
| pagination-affix | 表格分页栏是否开启固定模式 | Boolean | - | true |
| pagination-offset-bottom | 表格分页栏开启固定模式时，距离窗口底部达到指定偏移量后触发 | Number | - | 0 |

## PageContentTable 表格内容区域

表格内容区域用于集成搜索栏、操作栏和表格的组合展示。

### 基础用法

```html
<h-page-container>
  <h-page-content-table :isSearchIcon="true">
    <template slot="hPageAction">
      <el-button type="iconButton" icon="h-icon-add" >添加</el-button>
    </template>
    <template slot="rightAction">
        <el-button type="iconButton" icon="h-icon-link" >按钮</el-button>
    </template>
    <h-page-search slot="hPageSearch">
      <h-page-search-item label="关键字">
          <el-input v-model="keyword"></el-input>
      </h-page-search-item>
    </h-page-search>
    <template slot="hPageTable">
      <el-table :data="list" force-scroll>
        <el-table-column type="index" label="序号" width="60">
            <template slot-scope="scope">
                {{scope.$index + 1}}
            </template>
        </el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
      </el-table>
    </template>
    <el-pagination
        slot="pagination"
        :current-page="pageNo"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </h-page-content-table>
</h-page-container>
```

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| isSearchIcon | 是否显示搜索图标 | Boolean | - | false |
| hideSearchIconTips | 是否隐藏搜索图标提示信息 | Boolean | - | true |

### Slot
| name | 说明 |
|------|------|
| hPageAction | 操作栏 hPageAction 插槽 |
| rightAction | 操作栏的右侧插槽 |
| hPageSearch | 搜索栏 hPageSearch 插槽 |
| hPageTable | table 插槽 |
| pagination | pagination 插槽 | 