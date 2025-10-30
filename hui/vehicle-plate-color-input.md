# VehiclePlateColorInput 车辆牌照选择

## 安装

```bash
$ npm i @hui-pro/vehicle-plate-color-input -D
# 或者
yarn add @hui-pro/vehicle-plate-color-input --dev
```

## 引入

```js
import VehiclePlateColorInput from '@hui-pro/vehicle-plate-color-input';
import '@hui-pro/vehicle-plate-color-input/theme/index.scss';
Vue.use(VehiclePlateColorInput);
```

## 基本用法

<template>
  <code-box>
    <h-vehicle-plate-color-input
      class="el-input--width"
      :data="data"
      v-model="value"
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
        value: '',
        data: [
          {
            key: '0',
            plate: 'blue',
            value: '蓝色'
          },
          {
            key: '1',
            plate: 'yellow',
            value: '黄色'
          },
          {
            key: '2',
            plate: 'green',
            value: '绿色'
          },
          {
            key: '3',
            plate: 'black',
            value: '黑色'
          },
          {
            key: '4',
            plate: 'white',
            value: '白色'
          },
          {
            key: '5',
            plate: 'newgreen',
            value: '小型新能源'
          },
          {
            key: '6',
            plate: 'yellowgreen',
            value: '大型新能源'
          },
          {
            key: '7',
            plate: 'other',
            value: '其他'
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
    <h-vehicle-plate-color-input
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
        value2: '0',
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
        value: '',
        value2: '0',
        data: [
          {
            key: '0',
            plate: 'blue',
            value: '蓝色'
          },
          {
            key: '1',
            plate: 'yellow',
            value: '黄色'
          },
          {
            key: '2',
            plate: 'green',
            value: '绿色'
          },
          {
            key: '3',
            plate: 'black',
            value: '黑色'
          },
          {
            key: '4',
            plate: 'white',
            value: '白色'
          },
          {
            key: '5',
            plate: 'newgreen',
            value: '小型新能源'
          },
          {
            key: '6',
            plate: 'yellowgreen',
            value: '大型新能源'
          },
          {
            key: '7',
            plate: 'other',
            value: '其他'
          }
        ],
        inputProps: {
          disabled: true
        }
      }
    }
  }
</script>

## API

### Attributes

| 参数        | 说明                               | 类型           | 可选值 | 默认值           |
| ----------- | ---------------------------------- | -------------- | ------ | ---------------- |
| **v-model** | 绑定数据                           | String         | -      | -                |
| **data**    | 车辆颜色数据,Function 返回 Promise | Array/Function | -      | -                |
| data-props  | 数据 key 值别名                    | Object         | -      | 对应 data key 名 |
| input-props | input 属性                         | Object         | -      | -                |
| plateText   | 车牌示例显示文本                   | String         | -      | -                |

### dataProps

| key   | 说明     | 可选值 | 默认值 |
| ----- | -------- | ------ | ------ |
| key   | 唯一标识 | -      | key    |
| value | 显示名称 | -      | value  |
| plate | 车牌类型 | -      | plate  |
