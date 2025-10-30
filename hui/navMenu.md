# NavMenu 导航菜单

为网站提供导航功能的菜单。

## 基础用法

<template>
  <code-box type="menu" title="基础用法" description="垂直菜单，可内嵌子菜单。">
    <el-row class="tac">
      <el-col :span="8">
        <h5>带 icon</h5>
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-submenu index="1" icon="h-icon-menu" title="导航一">
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
            <el-menu-item index="1-4">选项4</el-menu-item>
          </el-submenu>
          <el-menu-item index="2" icon="h-icon-menu_f">导航二</el-menu-item>
          <el-menu-item index="3" icon="h-icon-setting" disabled>导航三</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="8">
        <h5>不带 icon</h5>
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-submenu index="1" title="导航一">
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
            <el-menu-item index="1-4">选项4</el-menu-item>
          </el-submenu>
          <el-menu-item index="2">导航二</el-menu-item>
          <el-menu-item index="3">导航三</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </code-box>
</template>

``` html
<el-row class="tac">
  <el-col :span="8">
    <h5>带 icon</h5>
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
      <el-submenu index="1" icon="h-icon-menu" title="导航一">
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
        <el-menu-item index="1-4">选项4</el-menu-item>
      </el-submenu>
      <el-menu-item index="2" icon="h-icon-menu_f">导航二</el-menu-item>
      <el-menu-item index="3" icon="h-icon-setting" disabled>导航三</el-menu-item>
    </el-menu>
  </el-col>
  <el-col :span="8">
    <h5>不带 icon</h5>
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-submenu index="1" title="导航一">
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
        <el-menu-item index="1-4">选项4</el-menu-item>
      </el-submenu>
      <el-menu-item index="2">导航二</el-menu-item>
      <el-menu-item index="3">导航三</el-menu-item>
    </el-menu>
  </el-col>
</el-row>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
```

## 折叠（通过按钮）

<template>
  <code-box type="menu" title="折叠（通过按钮）" description="通过设置 `collapse-btn` 为 `true`，可以使用折叠按钮，若外部容器有滚动条，请添加`wrap-scroll`。">
    <el-scrollbar wrap-class="page-scrollbar__wrap" view-class="page-scrollbar__view" :size="6">
      <el-menu
        class="el-menu-vertical-demo"
        theme="dark"
        :collapse="isCollapse1"
        collapse-btn
        wrap-scroll
        @click-collapse="handleClickCollapseBtn"
        @fold="fold"
        @unfold="unfold"
        @show-collapse="handleShowCollapse"
        @hide-collapse="handleHideCollapse"
      >
        <el-submenu index="1" icon="h-icon-menu" title="导航一">
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
          <el-submenu index="1-4" title="选项4">
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2" icon="h-icon-menu_f">导航二</el-menu-item>
        <el-menu-item index="3" icon="h-icon-setting">导航三</el-menu-item>
      </el-menu>
    </el-scrollbar>
  </code-box>
</template>

```html
<el-scrollbar wrap-class="page-scrollbar__wrap" view-class="page-scrollbar__view" :size="6">
  <el-menu
    class="el-menu-vertical-demo"
    theme="dark"
    :collapse="isCollapse1"
    collapse-btn
    wrap-scroll
    @click-collapse="handleClickCollapseBtn"
    @fold="fold"
    @unfold="unfold"
    @show-collapse="handleShowCollapse"
    @hide-collapse="handleHideCollapse"
  >
    <el-submenu index="1" icon="h-icon-menu" title="导航一">
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
      <el-menu-item index="1-3">选项3</el-menu-item>
      <el-submenu index="1-4" title="选项4">
        <el-menu-item index="1-4-1">选项4-1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="2" icon="h-icon-menu_f">导航二</el-menu-item>
    <el-menu-item index="3" icon="h-icon-setting">导航三</el-menu-item>
  </el-menu>
</el-scrollbar>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

<script>
  export default {
    data() {
      return {
        isCollapse1: true
      };
    },
    methods: {
      handleClickCollapseBtn () {
        this.isCollapse1 = !this.isCollapse1
      },
      fold () {
        console.log('fold')
      },
      unfold () {
        console.log('unfold')
      },
      handleShowCollapse (el) {
        console.log('show-collapse')
      },
      handleHideCollapse (el) {
        console.log('hide-collapse')
      }
    }
  }
</script>
```

## 折叠

<template>
  <code-box type="menu" title="折叠" description="通过参数控制折叠">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-submenu index="1" icon="h-icon-menu" title="导航一">
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
        <el-submenu index="1-4" title="选项4">
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2" icon="h-icon-menu_f">导航二</el-menu-item>
      <el-menu-item index="3" icon="h-icon-setting">导航三</el-menu-item>
    </el-menu>
  </code-box>
</template>

```html
<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">展开</el-radio-button>
  <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group>
<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-submenu index="1" icon="h-icon-menu" title="导航一">
    <el-menu-item index="1-1">选项1</el-menu-item>
    <el-menu-item index="1-2">选项2</el-menu-item>
    <el-menu-item index="1-3">选项3</el-menu-item>
    <el-submenu index="1-4" title="选项4">
      <el-menu-item index="1-4-1">选项4-1</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="2" icon="h-icon-menu_f">导航二</el-menu-item>
  <el-menu-item index="3" icon="h-icon-setting">导航三</el-menu-item>
</el-menu>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

<script>
  export default {
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
```

## 顶栏

适用广泛的基础用法。

<template>
  <code-box title="顶栏" description="导航菜单默认为垂直模式，通过 `mode` 属性可以使导航菜单变更为水平模式。另外，在菜单中通过 `submenu` 组件可以生成二级菜单。">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" @open="handleOpen" @close="handleClose">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2" title="我的工作台">
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">订单管理</el-menu-item>
    </el-menu>
    <!-- <div class="line"></div>
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2" title="我的工作台">
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="3" disabled>订单管理</el-menu-item>
    </el-menu> -->
  </code-box>
</template>

```html
<el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">处理中心</el-menu-item>
  <el-submenu index="2" title="我的工作台">
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
  </el-submenu>
  <el-menu-item index="3">订单管理</el-menu-item>
</el-menu>
<div class="line"></div>
<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">处理中心</el-menu-item>
  <el-submenu index="2" title="我的工作台">
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
  </el-submenu>
  <el-menu-item index="3" disabled>订单管理</el-menu-item>
</el-menu>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
```

## API

### Menu Attribute
| 参数                                          | 说明                                                                                | 类型       | 可选值              | 默认值    |
| --------------------------------------------- | ----------------------------------------------------------------------------------- | ---------- | ------------------- | --------- |
| mode                                          | 模式                                                                                | string     | horizontal,vertical | vertical  |
| collapse                                      | 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）                                | boolean    | —                   | false     |
| collapse-btn                                  | 是否启用折叠按钮                                                                    | boolean    | —                   | false     |
| ~~theme~~ <Badge text="移除" type="warning"/> | ~~主题色~~                                                                          | ~~string~~ | ~~light,dark~~      | ~~light~~ |
| default-active                                | 当前激活菜单的 index                                                                | string     | —                   | —         |
| default-openeds                               | 当前打开的submenu的 key 数组                                                        | Array      | —                   | —         |
| unique-opened                                 | 是否只保持一个子菜单的展开                                                          | boolean    | —                   | false     |
| menu-trigger                                  | 子菜单打开的触发方式(只在 mode 为 horizontal 时有效)                                | string     | —                   | hover     |
| router                                        | 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 | boolean    | —                   | false     |
| wrap-scroll                                   | 外部容器是否滚动，若滚动请开启这个参数                                              | boolean    | —                   | false     |

### Menu Methods
| 事件名称                   | 说明                | 参数                                |
| -------------------------- | ------------------- | ----------------------------------- |
| open <Badge text="2.0+"/>  | 展开指定的 sub-menu | index: 需要打开的 sub-menu 的 index |
| close <Badge text="2.0+"/> | 收起指定的 sub-menu | index: 需要收起的 sub-menu 的 index |

### Menu Events
| 事件名称       | 说明                                                | 回调参数                                                                 |
| -------------- | --------------------------------------------------- | ------------------------------------------------------------------------ |
| select         | 菜单激活回调                                        | index: 选中菜单项的 indexPath: 选中菜单项的 index path                   |
| open           | SubMenu 展开的回调                                  | index: 打开的 subMenu 的 index， indexPath: 打开的 subMenu 的 index path |
| close          | SubMenu 收起的回调                                  | index: 收起的 subMenu 的 index， indexPath: 收起的 subMenu 的 index path |
| click-collapse | 折叠按钮点击的回调                                  | —                                                                        |
| fold           | 菜单折叠回调                                        | —                                                                        |
| unfold         | 菜单展开回调                                        | —                                                                        |
| show-collapse  | 折叠菜单显示事件（仅在设置wrap-scroll为true时生效） | —                                                                        |
| hide-collapse  | 折叠菜单隐藏事件（仅在设置wrap-scroll为true时生效） | —                                                                        |

### SubMenu Attribute
| 参数     | 说明         | 类型    | 可选值 | 默认值                                                   |
| -------- | ------------ | ------- | ------ | -------------------------------------------------------- |
| index    | 唯一标志     | string  | —      | —                                                        |
| title    | 子菜单标题   | string  | —      | 如果文字过长会显示 title，如果想自定义可以使用slot title |
| icon     | 菜单项的图标 | string  | —      | —                                                        |
| disabled | 是否禁用     | boolean | —      | false                                                    |

### Menu-Item Attribute
| 参数     | 说明                | 类型    | 可选值 | 默认值 |
| -------- | ------------------- | ------- | ------ | ------ |
| index    | 唯一标志            | string  | —      | —      |
| route    | Vue Router 路径对象 | Object  | —      | —      |
| disabled | 是否禁用            | boolean | —      | false  |

### Menu-Group Attribute
| 参数  | 说明     | 类型   | 可选值 | 默认值 |
| ----- | -------- | ------ | ------ | ------ |
| title | 分组标题 | string | —      | —      |

### Slot

| name                      | 说明            |
| ------------------------- | --------------- |
| —                         | menu-item的内容 |
| icon <Badge text="2.0+"/> | menu-item的图标 |


<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        isCollapse: true,
        isCollapse1: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log('open', key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log('close', key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClickCollapseBtn () {
        this.isCollapse1 = !this.isCollapse1
      },
      fold () {
        console.log('fold')
      },
      unfold () {
        console.log('unfold')
      },
      handleShowCollapse (el) {
      },
      handleHideCollapse (el) {
      }
    }
  }
</script>

<style lang="scss">
  .demo-navMenu {
    .el-menu-demo {
      padding-left: 55px;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
    .line {
      height: 1px;
      background-color: #e0e6ed;
      margin: 35px -24px;
    }
    h5 {
      font-size: 14px;
      color: #8492a6;
      margin-top: 10px;
    }
    .tac {
      text-align: center;

      .el-menu-vertical-demo {
        display: inline-block;
        text-align: left;
      }
    }
  }
</style>
