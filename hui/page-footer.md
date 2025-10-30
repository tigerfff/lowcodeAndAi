# PageFooter 固底操作栏

## 基础用法
<template>
  <code-box browser title="基础用法" description="固定在页面底部的操作栏，需要页面底部预留 `52px` 的间距">
    <h-page-container>
      <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
      <h-page-footer>
        <el-button type="primary">BTN</el-button>
      </h-page-footer>
    </h-page-container>
  </code-box>
</template>

```html
<h-page-container>
  <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
  <h-page-footer>
    <el-button type="primary">BTN</el-button>
  </h-page-footer>
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

## 右侧操作内容
<template>
  <code-box browser title="右侧操作内容" description="通过插槽 `rightAction` 可以设置右侧操作内容">
    <h-page-container>
      <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
      <h-page-footer>
        <el-button type="primary">BTN</el-button>
        <template slot="rightAction">
          <el-button>BTN</el-button>
        </template>
      </h-page-footer>
    </h-page-container>
  </code-box>
</template>

```html
<h-page-container>
  <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
  <h-page-footer>
    <el-button type="primary">BTN</el-button>
    <template slot="rightAction">
      <el-button>BTN</el-button>
    </template>
  </h-page-footer>
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

## 左侧偏移
<template>
  <code-box browser title="左侧偏移" description="当左侧有侧边栏时，可以使用参数 `extra-left` 设置左侧偏移">
    <h-page-container>
      <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
      <h-layout>
        <h-page-sidebar type="list" :affix="false" width="200px">
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
      </h-layout>
      <h-page-footer extra-left="200">
        <el-button type="primary">BTN</el-button>
      </h-page-footer>
    </h-page-container>
  </code-box>
</template>

```html
<h-page-container>
  <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
  <h-layout>
    <h-page-sidebar type="list" :affix="false" width="200px">
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
  </h-layout>
  <h-page-footer extra-left="200">
    <el-button type="primary">BTN</el-button>
  </h-page-footer>
</h-page-container>

<script>
  export default {
    data() {
      return {
        breadcrumb: ['Title', 'Title', 'Title', 'Title'],
        sidebar: [
          'Option1',
          'Option2',
          'Option3',
          'Option4',
          'Option5',
          'Option6',
          'Option7',
          'Option8'
        ],
        activeSidebar: 'Option1'
      }
    },
    methods: {
      handleClick(item) {
        this.activeSidebar = item;
      }
    }
  }
</script>
```

::: tip
若使用固定模式，需要页面底部预留 `52px` 的间距，若使用图钉模式则不需要
:::

<script>
  export default {
    data() {
      return {
        breadcrumb: ['Title', 'Title', 'Title', 'Title'],
        sidebar: [
          'Option1',
          'Option2',
          'Option3',
          'Option4',
          'Option5',
          'Option6',
          'Option7',
          'Option8'
        ],
        activeSidebar: 'Option1'
      }
    },
    methods: {
      handleClick(item) {
        this.activeSidebar = item;
      }
    }
  }
</script>

## API

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| affix | 是否开启图钉模式 | Boolean | - | false |
| extra-left | 除了菜单，额外的左侧元素宽度 | String | - | '0' |
| inner-width | 使用默认 slot 时，操作区域所占的宽度 | String | - | '100%' |
| inner-center | 使用默认 slot 时，操作区域里的内容是否居中显示 | Boolean | - | false |
| inner-style | 使用默认 slot 时，操作区域里的内容样式 | Object | - | - |

### Slot
| name | 说明 |
|------|------|
| rightAction | 右侧操作内容 |
