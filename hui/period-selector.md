# PeriodSelector 周期选择器

<template>
  <author-info
    :version="versions['period-selector']"
    author="唐丽萍6"
    ux="苗任越"
    ui="江佳欢"
    standard="http://10.33.43.73/BBG_UED/BUI_Design/bscs/v2.0/issues/14"
    reviewed
  />
</template>

## 安装

```bash
$ npm i @hui-pro/period-selector -D
# 或者
$ yarn add @hui-pro/period-selector --dev
```

## 引入

```js
import PeriodSelector from '@hui-pro/period-selector';
import '@hui-pro/period-selector/theme/index.scss';
Vue.use(PeriodSelector);
```

## 基础用法 1

<template>
  <code-box title="基础用法" description="默认就是这3种类型">
    <h-period-selector dayly-width="480px" weekly-width="370px" monthly-width="402px" v-model="periodValue"></h-period-selector>
  </code-box>
</template>

```html
<h-period-selector
  dayly-width="480px"
  weekly-width="370px"
  monthly-width="402px"
  v-model="periodValue"
></h-period-selector>

<script>
  export default {
    data() {
      return {
        periodValue: {
          type: 'dayly',
          value: [{ start: new Date(), end: new Date() }]
        }
      };
    }
  };
</script>
```

## 基础用法 2

<template>
  <code-box title="选择一项" description="选择其中2种">
    <h-period-selector v-model="periodValue2" :period-list="periodList" weekly-width="370px" monthly-width="402px"></h-period-selector>
  </code-box>
</template>

```html
<h-period-selector
  weekly-width="370px"
  monthly-width="402px"
  v-model="periodValue2"
  :period-list="periodList"
></h-period-selector>

<script>
  export default {
    data() {
      return {
        periodValue2: {
          type: 'weekly',
          value: ['星期三']
        },
        periodList: ['weekly', 'monthly']
      };
    }
  };
</script>
```

## 基础用法 3

<template>
  <code-box title="选择一项" description="只选择一项，并去掉label">
    <h-period-selector weekly-width="370px" v-model="periodValue3" :period-list="periodList2" :period-label="false"></h-period-selector>
  </code-box>
</template>

```html
<h-period-selector
  weekly-width="370px"
  v-model="periodValue3"
  :period-list="periodList2"
  :period-label="false"
></h-period-selector>

<script>
  export default {
    data() {
      return {
        periodValue3: {
          type: 'weekly',
          value: ['星期一', '星期日']
        },
        periodList2: ['weekly']
      };
    }
  };
</script>
```

## 基础用法 4-自定义

<template>
  <code-box title="可自定义内容" description="通过设置type为'custom',并且将内容通过插槽插入，使用“custom-period-container”类，定义了容器的样式（背景色和边框）。通过scope.type来控制内容的显隐另外dayly,weekly和monthly的内容与内部对应，其余可对应">
    <h-period-selector v-model="periodValue4" type="custom" :period-list="customList">
      <template slot-scope="scope">
        <div class="custom-period-container" v-show="scope.type=== 'day'">自定义内容</div>
      </template>
    </h-period-selector>
  </code-box>
</template>

```html
<h-period-selector
  v-model="periodValue4"
  type="custom"
  :period-list="customList"
>
  <template slot-scope="scope">
    <div class="custom-period-container" v-show="scope.type=== 'day'">
      自定义内容
    </div>
  </template>
</h-period-selector>

<script>
  export default {
    data() {
      return {
        periodValue4: {
          type: 'dayly',
          value: []
        },
        customList: [
          {
            value: 'day',
            name: '日'
          },
          {
            value: 'dayly',
            name: '每日'
          },
          {
            value: 'weekly',
            name: '每周'
          },
          {
            value: 'monthly',
            name: '每月'
          }
        ]
      };
    }
  };
</script>
```

<script>
  const versions = require('docs/.vuepress/src/version.json');
  export default {
    data() {
      return {
        versions,
        periodValue: {
          type: 'dayly',
          value: [{ start: new Date(), end: new Date() }]
        },
        periodValue2: {
          type: 'weekly',
          value: ['星期三']
        },
        periodValue3: {
          type: 'weekly',
          value: ['星期一', '星期日']
        },
        periodValue4: {
          type: 'dayly',
          value: []
        },
        periodList: ['weekly', 'monthly'],
        periodList2: ['weekly'],
        customList: [{
          value: 'day',
          name: '日'
        },{
          value: 'dayly',
          name: '每日'
        },{
          value: 'weekly',
          name: '每周'
        },{
          value: 'monthly',
          name: '每月'
        }]
      }
    }
  }
</script>

## API

### Attributes

| 参数           | 说明                                                     | 类型    | 可选值                                                      | 默认值                         |
| -------------- | -------------------------------------------------------- | ------- | ----------------------------------------------------------- | ------------------------------ |
| period-list    | 选择要展示的类型                                         | Array   | -                                                           | ['dayly', 'weekly', 'monthly'] |
| period-label   | 是否展示标签                                             | Boolean | -                                                           | true                           |
| day-limit-num  | 每日添加上限                                             | Number  | -                                                           | 20                             |
| dayly-width    | 日类型容器的宽度                                         | String  | -                                                           | '100%'                         |
| weekly-width   | 周类型容器的宽度                                         | String  | -                                                           | '100%'                         |
| monthly-width  | 月类型容器的宽度                                         | String  | -                                                           | '100%'                         |
| type           | 类型                                                     | String  | 'normal':默认定义的 3 种，'custom':可在内容基础上自定义扩展 | '100%'                         |
| picker-options | 每日的时间配置项（详见 hui Time Picker 的 pickerOptions) | Object  | -                                                           | {}                             |
| custom-class | 下拉框类名| |  | |
### slot-scope

| type | 当前选中的类型 | String | | |
