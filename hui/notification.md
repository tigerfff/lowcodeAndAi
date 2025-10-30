# Notification 通知

悬浮出现在页面右上角，显示全局的通知提醒消息。

## 基本用法

<template>
  <code-box title="基本用法" description="适用性广泛的通知栏">
    <el-button plain @click="open">可自动关闭</el-button>
    <el-button plain @click="open2">不会自动关闭</el-button>
  </code-box>
</template>

``` html
<el-button plain @click="open">可自动关闭</el-button>
<el-button plain @click="open2">不会自动关闭</el-button>
<script>
  export default {
    methods: {
      open() {
       this.$notify({
          title: '标题名称',
          message: '这是一条定时关闭的消息',
        });
      },

      open2() {
        this.$notify({
          title: '提示',
          message: '这是一条不会自动关闭的消息',
          duration: 0
        });
      }
    }
  }
</script>
```

## 不同尺寸的通知

<template>
  <code-box title="不同尺寸的通知" description="使用`size`来控制通知的大小尺寸">
    <el-button plain @click="open3">small</el-button>
    <el-button plain @click="open4">middle</el-button>
     <el-button plain @click="open5">big</el-button>
  </code-box>
</template>

``` html
<el-button plain @click="open3">small</el-button>
<el-button plain @click="open4">middle</el-button>
<el-button plain @click="open5">big</el-button>
<script>
  export default {
    methods: {
      open3() {
        this.$notify({
          title: '消息',
          message: '这是一条size为small的消息',
          size:'small'
        });
      },

      open4() {
        this.$notify({
          title: '消息',
          message: '这是一条size为middle的消息',
          size:'middle'
        });
      },

      open5() {
        this.$notify({
          title: '消息',
          message: '这是一条size为large的消息',
          size:'large'
        });
      },
    }
  }
</script>
```

## 使用 HTML 片段

<template>
  <code-box title="使用 HTML 片段" description="`message` 属性支持传入 HTML 片段">
    <el-button plain @click="openHTML">使用 HTML 片段</el-button>
  </code-box>
</template>

``` html
<el-button plain @click="openHTML">使用 HTML 片段</el-button>
<script>
  export default {
    methods: {
      openHTML(){
        this.$notify({
          title: '标题名称',
          message: '<i style="color: teal">这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案</i>',
          dangerouslyUseHTMLString:true
        });
      }
    }
  }
</script>
```
:::warning 警告
`message` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。因此在 `dangerouslyUseHTMLString` 打开的情况下，请确保 `message` 的内容是可信的，**永远不要**将用户提交的内容赋值给 `message` 属性。
:::


## 带有偏移


<template>
  <code-box title="带有偏移" description="让 Notification 偏移一些位置">
    <el-button plain @click="open6">偏移的消息</el-button>
  </code-box>
</template>

```html
<el-button plain @click="open6">偏移的消息</el-button>
<script>
  export default {
    methods: {
      open3() {
        this.$notify.success({
          title: '成功',
          message: '这是一条成功的提示消息',
          offset: 100
        });
      }
    }
  }
</script>
```

## 自定义弹出位置
<template>
  <code-box title="自定义弹出位置" description="可以让 Notification 从屏幕四角中的任意一角弹出">
    <el-button plain @click="open7">右上角</el-button>
    <el-button plain @click="open8">右下角</el-button>
    <el-button plain @click="open9">左下角</el-button>
    <el-button plain @click="open10">左上角</el-button>
  </code-box>
</template>

```html
<el-button plain @click="open7">右上角</el-button>
<el-button plain @click="open8">右下角</el-button>
<el-button plain @click="open9">左下角</el-button>
<el-button plain @click="open10">左上角</el-button>
<script>
  export default {
    methods: {
      open4() {
        this.$notify({
          title: '自定义位置',
          message: '右上角弹出的消息'
        });
      },
      open5() {
        this.$notify({
          title: '自定义位置',
          message: '右下角弹出的消息',
          position: 'bottom-right'
        });
      },
      open6() {
        this.$notify({
          title: '自定义位置',
          message: '左下角弹出的消息',
          position: 'bottom-left'
        });
      },
      open7() {
        this.$notify({
          title: '自定义位置',
          message: '左上角弹出的消息',
          position: 'top-left'
        });
      }
    }
  }
</script>
```

## 隐藏关闭按钮

<template>
  <code-box title="隐藏关闭按钮" description="隐藏Notification的关闭按钮">
    <el-button plain @click="open11">隐藏关闭按钮的消息</el-button>
  </code-box>
</template>

```html
<el-button plain @click="open11">隐藏关闭按钮的消息</el-button>
<script>
  export default {
    methods: {
      open11() {
        this.$notify({
          title: '消息',
          message: '隐藏关闭按钮的消息',
          showClose: false
        });
      }
    }
  }
</script>
```

### 全局方法

HUI 为 `Vue.prototype` 添加了全局方法 `$notify`。因此在 vue instance 中可以采用本页面中的方式调用 Notification。

### 单独引用

单独引入 Notification：

```javascript
import { Notification } from 'hui';
```

<style lang="scss">
.notification-page{
  li{
    font-size:14px;
    color:rgba(#000, 0.3);
    list-style:none
  }
  .notification-page-button{
    color:#40a5f5;
    text-align:right;
    cursor:pointer;
  }
}
</style>

<script>
  export default {
    methods: {
      open() {
          this.$notify({
          title: '标题名称',
          message: '这是一条定时关闭的消息',
        });
      },

      open2() {
        this.$notify({
          title: '提示',
          message: '这是一条不会自动关闭的消息',
          duration: 0
        });
      },

      open3() {
        this.$notify({
          title: '消息',
          message: '这是一条size为small的消息',
          size:'small'
        });
      },

      open4() {
        this.$notify({
          title: '消息',
          message: '这是一条size为middle的消息',
          size:'middle'
        });
      },

      open5() {
        this.$notify({
          title: '消息',
          message: '这是一条size为large的消息',
          size:'large'
        });
      },

      openHTML(){
        this.$notify({
          title: '标题名称',
          message: '<i style="color: teal">这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案</i>',
          dangerouslyUseHTMLString:true
        });
      },

      openPagination() {
         this.$notify({
          title: '第一条通知',
          message: '<div class="notification-page"><ul style="padding:0;margin:0"><li>第一条通知的内容1</li><li>第一条通知的内容2</li><li class="notification-page-button">查看</li></ul></div>',
          dangerouslyUseHTMLString:true,
          pagination:true
        });
        setTimeout(() => {
          this.$notify({
            title: '第二条通知',
            message: '<div class="notification-page"><ul style="padding:0;margin:0"><li>第二条通知的内容1</li><li>第二条通知的内容2</li><li class="notification-page-button">查看</li></ul></div>',
            dangerouslyUseHTMLString:true,
            pagination:true
          });
        },1000)
      },

      open6() {
        this.$notify({
          title: '消息',
          message: '这是一条带偏移的消息',
          offset: 100
        });
      },

      open7() {
        this.$notify({
          title: '自定义位置',
          message: '右上角弹出的消息'
        });
      },

      open8() {
        this.$notify({
          title: '自定义位置',
          message: '右下角弹出的消息',
          position: 'bottom-right'
        });
      },

      open9() {
        this.$notify({
          title: '自定义位置',
          message: '左下角弹出的消息',
          position: 'bottom-left'
        });
      },

      open10() {
        this.$notify({
          title: '自定义位置',
          message: '左上角弹出的消息',
          position: 'top-left'
        });
      },

      open11() {
        this.$notify({
          title: '消息',
          message: '隐藏关闭按钮的消息',
          showClose: false
        });
      },

      onClose() {
        console.log('Notification 已关闭');
      }
    }
  };
</script>

### Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 标题 | string | — | — |
| size <Badge text="2.0+"/> | 尺寸 | string | small/middle/large | small |
| message | 说明文字 | string/Vue.VNode | — | — |
| type(2.0版本中已去除) <Badge text="非兼容" type="warning"/>| 主题样式，如果不在可选值内将被忽略 | string | success/warning/info/error | — |
| dangerouslyUseHTMLString <Badge text="2.0+"/> | 是否将 message 属性作为 HTML 片段处理 | boolean | — | false |
| iconClass(2.0版本中已去除) <Badge text="非兼容" type="warning"/> | 自定义图标的类名。若设置了 `type`，则 `iconClass` 会被覆盖 | string | — | — |
| customClass | 自定义类名 | string | — | — |
| duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | — | 3000 |
| position <Badge text="2.0+"/> | 自定义弹出位置 | number | top-right/top-left/bottom-right/bottom-left | top-right |
| onClose | 关闭时的回调函数 | function | — | — |
| onClick | 点击 Notification 时的回调函数 | function | — | — |
| offset | 偏移的距离，在同一时刻，所有的 Notification 实例应当具有一个相同的偏移量 | number | — | 0 |
| pagination <Badge text="2.0+"/> | 是否开启分页 | Boolean | — | false |
| showClose <Badge text="2.0+"/> | 是否展示关闭按钮 | Boolean | — | true |

### 方法
调用 `Notification` 或 `this.$notify` 会返回当前 Notification 的实例。如果需要手动关闭实例，可以调用它的 `close` 方法。
| 方法名 | 说明 |
| ---- | ---- |
| close | 关闭当前的 Notification |
