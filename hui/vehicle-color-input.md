# VehicleColorInput 车辆颜色选择

## 安装

```bash
$ npm i @hui-pro/vehicle-color-input -D
# 或者
yarn add @hui-pro/vehicle-color-input --dev
```

## 引入

```js
import VehicleColorInput from '@hui-pro/vehicle-color-input';
import '@hui-pro/vehicle-color-input/theme/index.scss';
Vue.use(VehicleColorInput);
```

## 基本用法

<template>
  <code-box>
    <h-vehicle-color-input class="el-input--width" :data="data" v-model="value" />
  </code-box>
</template>

```html
<template>
  <h-vehicle-color-input class="el-input--width" :data="data" v-model="value" />
</template>
<script>
  export default {
    data() {
      return {
        value: [],
        data: [
          {
            key: 'green',
            value: '绿色',
            color: '#1BCD43'
          },
          {
            key: 'brown',
            value: '棕色',
            color: '#A54040'
          },
          {
            key: 'pink',
            value: '粉色',
            color: '#F7B8B8'
          },
          {
            key: 'purple',
            value: '紫色',
            color: '#AF1BCD'
          },
          {
            key: 'deepGray',
            value: '深灰',
            color: '#797979'
          },
          {
            key: 'cyan',
            value: '青色',
            color: '#14E6CE'
          },
          {
            key: 'orange',
            value: '橙色',
            color: '#FFA500'
          },
          {
            key: 'white',
            value: '白色',
            color: 'white'
          },
          {
            key: 'silver',
            value: '银色',
            color: '#F1F1F1'
          },
          {
            key: 'gray',
            value: '灰色',
            color: '#C1C1C1'
          },
          {
            key: 'black',
            value: '黑色',
            color: '#000'
          },
          {
            key: 'red',
            value: '红色',
            color: '#ED0B0B'
          },
          {
            key: 'deepBlue',
            value: '深蓝',
            color: '#1B61CD'
          },
          {
            key: 'blue',
            value: '蓝色',
            color: '#13BEE3'
          },
          {
            key: 'yellow',
            value: '黄色',
            color: '#E7D010'
          },
          {
            key: 'unknown',
            value: '未知',
            color: 'unknown'
          }
        ]
      };
    }
  };
</script>
```

## 禁用

<template>
  <code-box>
    <h-vehicle-color-input
      class="el-input--width"
      :input-props="inputProps"
      :data="data"
      v-model="value2"
    />
  </code-box>
</template>

```html
<template>
  <h-vehicle-plate-color-input
    class="el-input--width"
    :data="data"
    v-model="value"
  />
</template>
<script>
  export default {
    data() {
      return {
        value2: ['green', 'brown'],
        inputProps: {
          disabled: true
        },
        data: ['参考基础']
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
        value: [],
        value2: ['green','brown'],
        data: [
          {
            key: 'green',
            value: '绿色',
            color: '#1BCD43'
          },
          {
            key: 'brown',
            value: '棕色',
            color: '#A54040'
          },
          {
            key: 'pink',
            value: '粉色',
            color: '#F7B8B8'
          },
          {
            key: 'purple',
            value: '紫色',
            color: '#AF1BCD'
          },
          {
            key: 'deepGray',
            value: '深灰',
            color: '#797979'
          },
          {
            key: 'cyan',
            value: '青色',
            color: '#14E6CE'
          },
          {
            key: 'orange',
            value: '橙色',
            color: '#FFA500'
          },
          {
            key: 'white',
            value: '白色',
            color: 'white'
          },
          {
            key: 'silver',
            value: '银色',
            color: '#F1F1F1'
          },
          {
            key: 'gray',
            value: '灰色',
            color: '#C1C1C1'
          },
          {
            key: 'black',
            value: '黑色',
            color: '#000'
          },
          {
            key: 'red',
            value: '红色',
            color: '#ED0B0B'
          },
          {
            key: 'deepBlue',
            value: '深蓝',
            color: '#1B61CD'
          },
          {
            key: 'blue',
            value: '蓝色',
            color: '#13BEE3'
          },
          {
            key: 'yellow',
            value: '黄色',
            color: '#E7D010'
          },
          {
            key: 'unknown',
            value: '未知',
            color: 'unknown'
          }
        ],
        inputProps: {
          disabled: true
        }
      };
    }
  };
</script>

:::tip

- 支持 ColorTag 所有 color 属性
- 目前只支持 16 个颜色

:::

## API

### Attributes

| 参数        | 说明                               | 类型           | 可选值 | 默认值           |
| ----------- | ---------------------------------- | -------------- | ------ | ---------------- |
| **v-model** | 绑定数据                           | Array          | -      | -                |
| **data**    | 车辆颜色数据,Function 返回 Promise | Array/Function | -      | -                |
| data-props  | 数据 key 值别名                    | Object         | -      | 对应 data key 名 |
| input-props | input 属性                         | Object         | -      | -                |

### dataProps

| key   | 说明     | 可选值 | 默认值 |
| ----- | -------- | ------ | ------ |
| key   | 唯一标识 | -      | key    |
| value | 显示名称 | -      | value  |
| color | 车辆颜色 | -      | color  |
