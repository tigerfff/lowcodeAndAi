# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

## 基础用法

移动到下拉菜单上，展开更多操作。

<template>
  <code-box
    title="基础用法"
    description="通过组件`slot`来设置下拉触发的元素以及需要通过具名`slot`为`dropdown` 来设置下拉菜单。默认情况下，下拉按钮只要`hover`即可，无需点击也会显示下拉菜单。">
    <el-dropdown  placement="bottom-start">
      <el-button class="el-dropdown-link" type="iconButton">
        下拉菜单
        <i class="h-icon-angle_down_sm el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown" ref="dropmenu">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </code-box>
</template>

```html
<el-dropdown placement="bottom-start">
  <el-button class="el-dropdown-link" type="iconButton">
    下拉菜单
    <i class="h-icon-angle_down_sm el-icon--right"></i>
  </el-button>
  <el-dropdown-menu slot="dropdown" ref="dropmenu">
    <el-dropdown-item>黄金糕</el-dropdown-item>
    <el-dropdown-item>狮子头</el-dropdown-item>
    <el-dropdown-item>螺蛳粉</el-dropdown-item>
    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
```

## 触发对象

可使用按钮触发下拉菜单。

<template>
  <code-box
    title="触发对象"
    description="设置`split-button`属性来让触发下拉元素呈现为按钮组，左边是功能按钮，右边是触发下拉菜单的按钮，设置为`true`即可。">
    <el-dropdown  placement="bottom-start">
      <el-button>更多菜单<i class="h-icon-angle_down_sm el-icon--right"></i></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown placement="bottom-end" split-button type="primary" @click="handleClick">
      更多菜单
      <el-dropdown-menu slot="dropdown" :popper-options="popperOptions" @animation-finished="hdFinished">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </code-box>
</template>

```html
<el-dropdown placement="bottom-start">
  <el-button>
    更多菜单
    <i class="h-icon-angle_down_sm el-icon--right"></i>
  </el-button>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>黄金糕</el-dropdown-item>
    <el-dropdown-item>狮子头</el-dropdown-item>
    <el-dropdown-item>螺蛳粉</el-dropdown-item>
    <el-dropdown-item>双皮奶</el-dropdown-item>
    <el-dropdown-item>蚵仔煎</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
<el-dropdown
  placement="bottom-end"
  split-button
  type="primary"
  @click="handleClick"
>
  更多菜单
  <el-dropdown-menu
    slot="dropdown"
    :popper-options="popperOptions"
    @animation-finished="hdFinished"
  >
    <el-dropdown-item>黄金糕</el-dropdown-item>
    <el-dropdown-item>狮子头</el-dropdown-item>
    <el-dropdown-item>螺蛳粉</el-dropdown-item>
    <el-dropdown-item>双皮奶</el-dropdown-item>
    <el-dropdown-item>蚵仔煎</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>

<script>
  export default {
    data() {
      let _this = this;
      return {
        popperOptions: {
          onUpdate() {},
          gpuAcceleration: false
        }
      };
    },
    methods: {
      handleClick() {
        alert('button click');
      },
      hdFinished() {
        console.log('动画结束');
      }
    }
  };
</script>
```

## 触发方式

可以配置 click 激活或者 hover 激活。

<template>
  <code-box
    title="触发方式"
    description="在`trigger`属性设置为`click`即可。">
    <el-row class="block-col-2">
      <el-col :span="12">
        <span class="demonstration">hover 激活</span>
        <el-dropdown  placement="bottom-start">
          <el-button class="el-dropdown-link" type="iconButton">
            下拉菜单
            <i class="h-icon-angle_down_sm el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="12">
        <span class="demonstration">click 激活</span>
        <el-dropdown  placement="bottom-start" trigger="click">
          <el-button class="el-dropdown-link" type="iconButton">
            下拉菜单
            <i class="h-icon-angle_down_sm el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </code-box>
</template>

```html
<el-row class="block-col-2">
  <el-col :span="12">
    <span class="demonstration">hover 激活</span>
    <el-dropdown placement="bottom-start">
      <el-button class="el-dropdown-link" type="iconButton">
        下拉菜单
        <i class="h-icon-angle_down_sm el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-col>
  <el-col :span="12">
    <span class="demonstration">click 激活</span>
    <el-dropdown trigger="click" placement="bottom-start">
      <el-button class="el-dropdown-link" type="iconButton">
        下拉菜单
        <i class="h-icon-angle_down_sm el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-col>
</el-row>
```

## 菜单显示位置<Badge text="2.0+"/>

可以使用`placement`属性来配置，默认"bottom-end"。

<template>
  <code-box
    title="菜单显示位置"
    description="placement可配置参数包括top/top-start/top-end/bottom/bottom-start/bottom-end">
    <el-dropdown placement="bottom-end">
      <el-button type="primary">
        更多菜单<i class="h-icon-angle_down_sm el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头狮子头狮子头狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown placement="top-end">
      <el-button type="primary">
        更多菜单<i class="h-icon-angle_down_sm el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头狮子头狮子头狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown placement="bottom-start">
      <el-button type="primary">
        更多菜单<i class="h-icon-angle_down_sm el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头狮子头狮子头狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown  placement="top-start">
      <el-button type="primary">
        更多菜单<i class="h-icon-angle_down_sm el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头狮子头狮子头狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </code-box>
</template>

```html
<el-dropdown placement="bottom-end">
  <el-button type="primary">
    更多菜单
    <i class="h-icon-angle_down_sm el-icon--right"></i>
  </el-button>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>黄金糕</el-dropdown-item>
    <el-dropdown-item>狮子头狮子头狮子头狮子头</el-dropdown-item>
    <el-dropdown-item>螺蛳粉</el-dropdown-item>
    <el-dropdown-item>双皮奶</el-dropdown-item>
    <el-dropdown-item>蚵仔煎</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
<el-dropdown placement="top-end">
  <el-button type="primary">
    更多菜单
    <i class="h-icon-angle_down_sm el-icon--right"></i>
  </el-button>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>黄金糕</el-dropdown-item>
    <el-dropdown-item>狮子头狮子头狮子头狮子头</el-dropdown-item>
    <el-dropdown-item>螺蛳粉</el-dropdown-item>
    <el-dropdown-item>双皮奶</el-dropdown-item>
    <el-dropdown-item>蚵仔煎</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
<el-dropdown placement="bottom-start">
  <el-button type="primary">
    更多菜单
    <i class="h-icon-angle_down_sm el-icon--right"></i>
  </el-button>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>黄金糕</el-dropdown-item>
    <el-dropdown-item>狮子头狮子头狮子头狮子头</el-dropdown-item>
    <el-dropdown-item>螺蛳粉</el-dropdown-item>
    <el-dropdown-item>双皮奶</el-dropdown-item>
    <el-dropdown-item>蚵仔煎</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
<el-dropdown placement="top-start">
  <el-button type="primary">
    更多菜单
    <i class="h-icon-angle_down_sm el-icon--right"></i>
  </el-button>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>黄金糕</el-dropdown-item>
    <el-dropdown-item>狮子头狮子头狮子头狮子头</el-dropdown-item>
    <el-dropdown-item>螺蛳粉</el-dropdown-item>
    <el-dropdown-item>双皮奶</el-dropdown-item>
    <el-dropdown-item>蚵仔煎</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
```

## 菜单隐藏方式

可以`hide-on-click`属性来配置。

<template>
  <code-box
    title="菜单隐藏方式"
    description="下拉菜单默认在点击菜单项后会被隐藏，将`hide-on-click`属性默认为`false`可以关闭此功能。">
    <el-dropdown :hide-on-click="false">
      <span class="el-dropdown-link">
        下拉菜单<i class="h-icon-angle_down_sm el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </code-box>
</template>

```html
<el-dropdown :hide-on-click="false">
  <span class="el-dropdown-link">
    下拉菜单
    <i class="h-icon-angle_down_sm el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>黄金糕</el-dropdown-item>
    <el-dropdown-item>狮子头</el-dropdown-item>
    <el-dropdown-item>螺蛳粉</el-dropdown-item>
    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
```

## 指令事件

点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作

<template>
  <code-box
    title="指令事件"
    description="点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        下拉菜单<i class="h-icon-angle_down_sm el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">黄金糕</el-dropdown-item>
        <el-dropdown-item command="b">狮子头</el-dropdown-item>
        <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
        <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
        <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </code-box>
</template>

```html
<el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    下拉菜单
    <i class="h-icon-angle_down_sm el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="a">黄金糕</el-dropdown-item>
    <el-dropdown-item command="b">狮子头</el-dropdown-item>
    <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
    <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
    <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
<script>
  export default {
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      }
    }
  };
</script>
```

## API

### Attributes

| 参数                                            | 说明                                                                 | 类型    | 可选值                                               | 默认值     |
| ----------------------------------------------- | -------------------------------------------------------------------- | ------- | ---------------------------------------------------- | ---------- |
| type                                            | 菜单按钮类型，同 Button 组件(只在`split-button`为 true 的情况下有效) | string  | —                                                    | —          |
| size                                            | 菜单按钮尺寸，同 Button 组件(只在`split-button`为 true 的情况下有效) | string  | —                                                    | —          |
| icon                                            | 菜单按钮图标，同 Button 组件(只在`split-button`为 true 的情况下有效) | string  | —                                                    | —          |
| split-button                                    | 下拉触发元素呈现为按钮组                                             | boolean | —                                                    | false      |
| ~~menu-align~~                                  | 菜单水平对齐方向                                                     | string  | start, end                                           | end        |
| placement <Badge text="非兼容" type="warning"/> | 菜单弹出位置                                                         | string  | top/top-start/top-end/bottom/bottom-start/bottom-end | bottom-end |
| trigger                                         | 触发下拉的行为                                                       | string  | hover, click                                         | hover      |
| hide-on-click                                   | 是否在点击菜单项后隐藏菜单                                           | boolean | —                                                    | true       |
| hide-on-click-outside                           | 是否在点击下拉菜单项以外区域后隐藏菜单，需要配合 trigger="click"使用 | boolean | —                                                    | true       |
| show-timeout                                    | 展开下拉菜单的延时（仅在 trigger 为 hover 时有效）                   | number  | —                                                    | 250        |
| hide-timeout                                    | 收起下拉菜单的延时（仅在 trigger 为 hover 时有效）                   | number  | —                                                    | 150        |
| isItemKeyEnterShow                              | item回车是否隐藏，默认false                                         | boolean | —                                                   | false        |

### 方法

| 方法名 | 说明         | 参数 |
| ------ | ------------ | ---- |
| show   | 显示下拉菜单 | —    |
| hide   | 隐藏下拉菜单 | —    |

### Dropdown Events

| 事件名称       | 说明                                          | 回调参数                      |
| -------------- | --------------------------------------------- | ----------------------------- |
| click          | `split-button` 为 true 时，点击左侧按钮的回调 | —                             |
| command        | 点击菜单项触发的事件回调                      | dropdown-item 的指令          |
| visible-change | 下拉框出现/隐藏时触发                         | 出现则为 true，隐藏则为 false |

### Dropdown Menu Item Attributes

| 参数     | 说明       | 类型                 | 可选值 | 默认值 |
| -------- | ---------- | -------------------- | ------ | ------ |
| command  | 指令       | string/number/object | —      | —      |
| disabled | 禁用       | boolean              | —      | false  |
| divided  | 显示分割线 | boolean              | —      | false  |

<style lang="scss">
  .code-box {
    .el-dropdown {
      vertical-align: middle;

      & + .el-dropdown {
        margin-left: 15px;
      }
      i {
        position: relative;
        // top: 5px;
        vertical-align: middle;
        font-size: 24px;
        line-height: 0;
      }
    }
  }
  .block-col-2 {
     margin: -24px;

    .el-col {
      padding: 30px 0;
      text-align: center;
      border-right: 1px solid #eff2f6;

      &:last-child {
        border-right: 0;
      }
    }
  }
 .demo-dropDown .demonstration {
   display: block;
   color: #8492a6;
   font-size: 14px;
   margin-bottom: 20px;
 }
</style>

<script>
  export default {
    data() {
      let _this = this
      return {
        popperOptions: {
          onUpdate () {

          },
          gpuAcceleration: false
        }
      }
    },
    mounted() {
      //console.log(this.$refs.dropmenu)
    },
    methods: {
      handleClick() {
        alert('button click');
      },
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      hdFinished() {
        //console.log('动画结束')
      }
    }
  }
</script>
