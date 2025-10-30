# PageMenu 左侧导航

## 基础用法
<template>
  <code-box browser title="基础用法" description="显示页面导航">
    <h-page>
      <h-page-menu :menu="menu"/>
    </h-page>
  </code-box>
</template>

```html
<h-page>
  <h-page-menu :menu="menu" />
</h-page>

<script>
  export default {
    data() {
      return {
        menu: [{
          title: '首页',
          icon: 'h-icon-menu'
        }]
      }
    }
  }
</script>
```

<script>
  export default {
    data() {
      return {
        menu: [{
          title: '首页',
          icon: 'h-icon-menu'
        }]
      }
    }
  }
</script>

## 配置图片图标

```js
export default {
  data() {
    return {
      imgIconSrc: {
        icon: require('./assets/images/test1-1.png'),
        hoverIcon: require('./assets/images/test16-9.png'),
        activeIcon: require('./assets/images/test16-9.png')
      }
    };
  }
}
```

## API

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| menu | 菜单数据 | Array | - | - |
| ~~menu-theme~~ <Badge type="error" text="2.0.0 移除" /> | 菜单主题 | String | dark/light | dark |
| menu-collapse | 菜单是否默认收起 | Boolean | - | false |
| collapse-btn | 是否启用折叠按钮 | Boolean | - | true |
| fold-width | 菜单折叠宽度 | String | - | '48px' |
| unfold-width | 菜单展开宽度 | String | - | '230px' |
| unique-opened <Badge text="1.11.3+" /> | 是否只保持一个子菜单的展开 | Boolean | - | false |
| router <Badge text="1.11.3+" /> | 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 | Boolean | - | true |
| default-openeds <Badge text="1.18.0+" /> | 当前打开的 submenu 的 key 数组 | Array | - | - |
| customSvgs <Badge text="2.0-beta.7+" /> | 自定义 SVG 图标，需要项目自己配置 loader，参考[HUI 外部引入图标](http://hui.dev.hikhub.net/zh/basic/svg-icon.html#%E5%A4%96%E9%83%A8%E5%BC%95%E5%85%A5%E5%9B%BE%E6%A0%87) | Object | - | - |
| imgIconSrc <Badge text="2.0-beta.25+" /> | 自定义图片图标 | Object | - | - |
| base64IconSrc <Badge text="2.0-beta.25+" /> | 自定义base64图标 | String | - | - |

### Events
| 事件 | 说明 | 回调参数 |
|------|------|------|
| select <Badge text="1.10.0+" /> | 菜单激活回调 | index: 选中菜单项的；indexPath: 选中菜单项的 index path；item: 选中的菜单项对象 |
| open | SubMenu 展开的回调 | index: 打开的 subMenu 的 index， indexPath: 打开的 subMenu 的 index path |
| close | SubMenu 收起的回调 | index: 收起的 subMenu 的 index， indexPath: 收起的 subMenu 的 index path |
| fold | 菜单折叠回调 | - |
| unfold | 菜单展开回调 | - |
| click-collapse | 折叠按钮点击的回调 | - |
| show-collapse <Badge text="1.11.2+" /> | 折叠菜单显示事件 | - |
| hide-collapse <Badge text="1.11.2+" /> | 折叠菜单隐藏事件 | - |

### Menu Data
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| index <Badge text="1.18.0+" /> | 唯一标志 | String | - | - |
| title | 菜单标题 | String | - | - |
| icon | 菜单图标 | String | - | - |
| svgIcon <Badge text="2.0-beta.3+" /> | 菜单 SVG 图标 ，目前只支持 HUI 默认的 SVG 图标，参考网址 [SVG 图标](http://hui.dev.hikhub.net/zh/basic/svg-icon.html) | String | - | - |
| disabled <Badge text="1.18.0+" /> | 是否禁用 | Boolean | - | false |
| children | 子菜单内包含的菜单项 | Array | - | - |
| router | 菜单路由路径 | String | - | - |
| group | 菜单分组，group 值相同的菜单分为一组 | String | - | - |
| customSvgs <Badge text="2.0-beta.7+" /> | 自定义 SVG 图标对象，需要项目自己配置 loader，参考[HUI 外部引入图标](http://hui.dev.hikhub.net/zh/basic/svg-icon.html#%E5%A4%96%E9%83%A8%E5%BC%95%E5%85%A5%E5%9B%BE%E6%A0%87) | Object | - | - |

### Menu Data - customSvgs <Badge text="2.0-beta.7+" />
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| icons | 默认的 SVG 图标名称（对象从 page-menu 控件的 customSvgs 属性中传入） | Array | - | - |
| hoverIcons | 菜单项 hover 时的 SVG 图标名称（对象从 page-menu 控件的 customSvgs 属性中传入） | Array | - | - |
| activeIcons | 菜单项激活时的 SVG 图标名称（对象从 page-menu 控件的 customSvgs 属性中传入） | Array | - | - |
| colors | 默认的 SVG 图标颜色 | Array | - | - |
| hoverColors | 菜单项 hover 时的 SVG 图标颜色 | Array | - | - |
| activeColors | 菜单项激活时的 SVG 图标颜色 | Array | - | - |

## Menu Data - imgIconSrc <Badge text="2.0-beta.25+" />

| 参数       | 说明                                                         | 类型   | 可选值 | 默认值 |
| ---------- | ------------------------------------------------------------ | ------ | ------ | ------ |
| icon       | 默认的图片图标名称（对象从 page-menu 控件的 imgIconSrc 属性中传入） | String | -      | -      |
| hoverIcon  | 菜单项 hover 时的图片图标名称（对象从 page-menu 控件的 imgIconSrc 属性中传入） | String | -      | -      |
| activeIcon | 菜单项激活时的图片图标名称（对象从 page-menu 控件的 imgIconSrc 属性中传入） | String | -      | -      |

