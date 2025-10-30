# Affix 图钉 <Badge text="2.0+"/>

## 基础用法

<template>
  <code-box title="基础用法" description="简单使用，当元素不可见时，直接固定在最顶端。">
    <h-affix>
      <span class="demo-affix-block">Fixed at the top</span>
    </h-affix>
  </code-box>
</template>

``` html
<h-affix>
  <span class="demo-affix-block">Fixed at the top</span>
</h-affix>
```

## 偏移

<template>
  <code-box title="偏移" description="当滚动到一定距离时再固定。">
    <h-affix :offset-top="60">
      <span class="demo-affix-block">Fixed at the top 60px from the top</span>
    </h-affix>
  </code-box>
</template>

``` html
<h-affix :offset-top="60">
  <span class="demo-affix-block">Fixed at the top 60px from the top</span>
</h-affix>
```

## 固定在底部

<template>
  <code-box title="固定在底部" description="在屏幕下方固定，可以通过缩小浏览器窗口高度来查看效果。">
    <h-affix :offset-bottom="10">
      <span class="demo-affix-block">Fix at the bottom 10px</span>
    </h-affix>
  </code-box>
</template>

``` html
<h-affix :offset-bottom="10">
  <span class="demo-affix-block">Fix at the bottom 10px</span>
</h-affix>
```

## 固定状态改变时的回调

<template>
  <code-box title="固定在底部" description="在屏幕下方固定，可以通过缩小浏览器窗口高度来查看效果。">
    <h-affix :offset-top="100" @on-change="change">
      <span class="demo-affix-block">Fix the position at the top of 100px at the top</span>
    </h-affix>
  </code-box>
</template>

``` html
<h-affix :offset-top="100" @on-change="change">
  <span class="demo-affix-block">Fix the position at the top of 100px at the top</span>
</h-affix>
<script>
export default {
  methods: {
    change (status) {
      console.log(`Status: ${status}`)
    }
  }
};
</script>
```

## API

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| container | 外层滚动容器（参数为选择器） | String | - | window |
| offset-top | 距离窗口顶部达到指定偏移量后触发 | Number | - | 0 |
| offset-bottom | 距离窗口底部达到指定偏移量后触发 | Number | - | - |
| slot-width | 固定时，占位元素的宽度，可以不设置，不设置则固定时使用元素的原宽度 | Number | - | - |
| slot-height | 固定时，占位元素的高度，可以不设置，不设置则固定时使用元素的原高度 | Number | - | - |

### 方法
| 方法名 | 说明 | 参数 |
| ------ | ------ | ------ |
| updateAffixStyle | 在固定状态下修改图钉样式 | 共一个参数，图钉样式，能设置样式 `top` `bottom` `left` `width` |

### Events
| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| on-change | 在固定状态发生改变时触发 | 共一个参数，当前的固定状态：true/false |


<style lang="scss">
  .demo-affix {
    .demo-affix-block {
      display: inline-block;
      color: #fff;
      padding: 10px 30px;
      text-align: center;
      background: rgba(0,153,229,.9);
    }
  }
</style>

<script>
  export default {
    methods: {
      change (status) {
        console.log(`Status: ${status}`)
      }
    }
  };
</script>
