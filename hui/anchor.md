# Anchor 锚点 <Badge text="2.0+" />

### 基础用法

<template>
  <code-box title="基础用法" description="最简单的用法。" id="base">
    <div style="margin-top: 20px">
      <el-button @click="cardFolded">设置锚点面板{{folded ? '常显示' : '可收起'}}</el-button>
    </div>
    <h-anchor :offset-top="60" show-ink :folded="folded">
      <h-anchor-link href="#base" title="基础用法" is-current/>
      <h-subanchor href="#api" title="API">
        <h-anchor-link href="#anchor-attributes" title="Anchor Attributes" />
        <h-anchor-link href="#anchor-events" title="Anchor Events" />
        <h-anchor-link href="#anchor-link-attributes" title="Anchor-Link Attributes" />
      </h-subanchor>
      <h-anchor-link href="#test-a" title="测试点A"></h-anchor-link>
      <h-subanchor href="#test-b" title="测试点B">
        <h-subanchor href="#test-b-1" title="测试点B-1">
          <h-anchor-link href="#test-b-1-1" title="测试点B-1-1"></h-anchor-link>
          <h-anchor-link href="#test-b-1-2" title="测试点B-1-2"></h-anchor-link>
          <h-anchor-link href="#test-b-1-3" title="测试点B-1-3"></h-anchor-link>
        </h-subanchor>
        <h-anchor-link href="#test-b-2" title="测试点B-2"></h-anchor-link>
        <h-anchor-link href="#test-b-3" title="测试点B-3"></h-anchor-link>
      </h-subanchor>
      <h-subanchor href="#test-c" title="测试点C">
        <h-anchor-link href="#test-c-1" title="测试点C-1"></h-anchor-link>
        <h-anchor-link href="#test-c-2" title="测试点C-2"></h-anchor-link>
        <h-anchor-link href="#test-c-3" title="测试点C-3"></h-anchor-link>
      </h-subanchor>
      <h-subanchor href="#test-d" title="测试点D">
        <h-anchor-link href="#test-d-1" title="测试点D-1"></h-anchor-link>
        <h-anchor-link href="#test-d-2" title="测试点D-2"></h-anchor-link>
        <h-anchor-link href="#test-d-3" title="测试点D-3"></h-anchor-link>
      </h-subanchor>
    </h-anchor>
  </code-box>
</template>

``` html
<div style="margin-top: 20px">
  <el-button @click="cardFolded">设置锚点面板{{folded ? '常显示' : '可收起'}}</el-button>
</div>

<h-anchor :offset-top="60" show-ink :folded="folded">
  <h-anchor-link href="#base" title="基础用法" is-current/>
  <h-subanchor href="#api" title="API">
    <h-anchor-link href="#anchor-attributes" title="Anchor Attributes" />
    <h-anchor-link href="#anchor-events" title="Anchor Events" />
    <h-anchor-link href="#anchor-link-attributes" title="Anchor-Link Attributes" />
  </h-subanchor>
  <h-anchor-link href="#test-a" title="测试点A"></h-anchor-link>
  <h-subanchor href="#test-b" title="测试点B">
    <h-subanchor href="#test-b-1" title="测试点B-1">
      <h-anchor-link href="#test-b-1-1" title="测试点B-1-1"></h-anchor-link>
      <h-anchor-link href="#test-b-1-2" title="测试点B-1-2"></h-anchor-link>
      <h-anchor-link href="#test-b-1-3" title="测试点B-1-3"></h-anchor-link>
    </h-subanchor>
    <h-anchor-link href="#test-b-2" title="测试点B-2"></h-anchor-link>
    <h-anchor-link href="#test-b-3" title="测试点B-3"></h-anchor-link>
  </h-subanchor>
  <h-subanchor href="#test-c" title="测试点C">
    <h-anchor-link href="#test-c-1" title="测试点C-1"></h-anchor-link>
    <h-anchor-link href="#test-c-2" title="测试点C-2"></h-anchor-link>
    <h-anchor-link href="#test-c-3" title="测试点C-3"></h-anchor-link>
  </h-subanchor>
  <h-subanchor href="#test-d" title="测试点D">
    <h-anchor-link href="#test-d-1" title="测试点D-1"></h-anchor-link>
    <h-anchor-link href="#test-d-2" title="测试点D-2"></h-anchor-link>
    <h-anchor-link href="#test-d-3" title="测试点D-3"></h-anchor-link>
  </h-subanchor>
</h-anchor>

<script>
export default {
  data () {
    return {
      folded: false
    }
  },
  methods: {
    cardFolded () {
      this.folded = !this.folded
    }
  }
}
</script>
```

<!-- ### 静态位置

<template>
  <code-box title="静态位置" description="不浮动，状态不随页面滚动变化。" id="static" demo-style="padding-left: 200px;">
    <h-anchor :affix="false" show-ink>
      <h-anchor-link href="#base" title="基础用法" />
      <h-anchor-link href="#static" title="静态位置" />
      <h-anchor-link href="#api" title="API">
        <h-anchor-link href="#anchor-attributes" title="Anchor Attributes" />
        <h-anchor-link href="#anchor-events" title="Anchor Events" />
        <h-anchor-link href="#anchor-link-attributes" title="Anchor-Link Attributes" />
      </h-anchor-link>
    </h-anchor>
  </code-box>
</template>

``` html
<h-anchor :affix="false">
  <h-anchor-link href="#base" title="基础用法" />
  <h-anchor-link href="#static" title="静态位置" />
  <h-anchor-link href="#api" title="API">
    <h-anchor-link href="#anchor-attributes" title="Anchor Attributes" />
    <h-anchor-link href="#anchor-events" title="Anchor Events" />
    <h-anchor-link href="#anchor-link-attributes" title="Anchor-Link Attributes" />
  </h-anchor-link>
</h-anchor>
``` -->

### API

#### Anchor Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| affix | 固定模式 | Boolean | - | true |
| height | 面板高度（当存在高度且内容超出时，会出现滚动条） | String/Number | - | - |
| container | 外层滚动容器（参数为选择器） | String | - | window |
| offset-top | 固定模式下，距离窗口顶部达到指定偏移量后触发 | Number | - | 0 |
| offset-bottom | 固定模式下，距离窗口底部达到指定偏移量后触发 | Number | - | - |
| bounds | 锚点区域边界，单位：px | Number | - | 5 |
| scroll-offset | 点击滚动的额外距离 | 	Number | - | 0 |
| show-ink | 是否显示小圆点 | Boolean | - | false |
| folded | 静止时是否折叠 | Boolean | - | false |
| folded-scroll-time | 滚动停止时，面板收起的延后时间（仅folded为true时生效） | Number | - | 1000 |

#### Anchor Events
| 事件名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| on-select | 点击锚点时触发 | 共一个参数，点击的连接 |
| on-change | 链接改变时触发 | 共两个参数，新链接和旧链接 |

#### Anchor-Link & SubAnchor Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| href | 锚点链接 | String | - | - |
| title | 文字内容 | String | - | - |
| isCurrent | 是否为默认项（可以将第一项设置为true，那么如果页面没有锚点激活，就会自动锁定第一项） | Boolean | - | false |
| scroll-offset | 点击滚动的额外距离 | 	Number | - | 0 |

<script>
export default {
  data () {
    return {
      folded: false
    }
  },
  methods: {
    cardFolded () {
      this.folded = !this.folded
    }
  }
}
</script>

<style lang="scss">
.demo-anchor {
  .code-box-demo {
    height: 275px;
  }
}
</style>

<h3 style="height: 500px;" id="test-a">
  <a href="#测试点A（height-500px）" aria-hidden="true" class="header-anchor">#</a>
  测试点A（height-500px）
</h3>

<h3 id="test-b" style="height: 400px;">
  <a href="#测试点B（子节点300px*3）" aria-hidden="true" class="header-anchor">#</a>
  测试点B（子节点300px*3）
</h3>

<h4 id="test-b-1">
  <a href="#测试点B-子节点1" aria-hidden="true" class="header-anchor">#</a>
  测试点B-子节点1
</h4>

<h5 id="test-b-1-1" style="height: 200px;">
  <a href="#测试点B-子节点1-1" aria-hidden="true" class="header-anchor">#</a>
  测试点B-子节点1-1
</h5>

<h5 id="test-b-1-2" style="height: 200px;">
  <a href="#测试点B-子节点1-2" aria-hidden="true" class="header-anchor">#</a>
  测试点B-子节点1-2
</h5>

<h5 id="test-b-1-3" style="height: 200px;">
  <a href="#测试点B-子节点1-3" aria-hidden="true" class="header-anchor">#</a>
  测试点B-子节点1-3
</h5>

<h4 id="test-b-2" style="height: 300px;">
  <a href="#测试点B-子节点2" aria-hidden="true" class="header-anchor">#</a>
  测试点B-子节点2
</h4>

<h4 id="test-b-3" style="height: 300px;">
  <a href="#测试点B-子节点3" aria-hidden="true" class="header-anchor">#</a>
  测试点B-子节点3
</h4>

<h3 id="test-c" style="height: 200px;">
  <a href="#测试点C（子节点200px*3）" aria-hidden="true" class="header-anchor">#</a>
  测试点C（子节点200px*3）
</h3>

<h4 id="test-c-1" style="height: 300px;">
  <a href="#测试点C-子节点1" aria-hidden="true" class="header-anchor">#</a>
  测试点C-子节点1
</h4>

<h4 id="test-c-2" style="height: 300px;">
  <a href="#测试点C-子节点2" aria-hidden="true" class="header-anchor">#</a>
  测试点C-子节点2
</h4>

<h4 id="test-c-3" style="height: 300px;">
  <a href="#测试点C-子节点3" aria-hidden="true" class="header-anchor">#</a>
  测试点C-子节点3
</h4>

<h3 id="test-d" style="height: 200px;">
  <a href="#测试点D（子节点200px*3）" aria-hidden="true" class="header-anchor">#</a>
  测试点D（子节点200px*3）
</h3>

<h4 id="test-d-1" style="height: 300px;">
  <a href="#测试点D-子节点1" aria-hidden="true" class="header-anchor">#</a>
  测试点D-子节点1
</h4>

<h4 id="test-d-2" style="height: 300px;">
  <a href="#测试点D-子节点2" aria-hidden="true" class="header-anchor">#</a>
  测试点D-子节点2
</h4>

<h4 id="test-d-3" style="height: 300px;">
  <a href="#测试点D-子节点3" aria-hidden="true" class="header-anchor">#</a>
  测试点D-子节点3
</h4>
