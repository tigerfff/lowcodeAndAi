# VehicleBrandInput 车辆品牌选择

## 安装

```bash
$ npm i @hui-pro/vehicle-brand-input -D
# 或者
yarn add @hui-pro/vehicle-brand-input --dev
```

## 引入

```js
import VehicleBrandInput from '@hui-pro/vehicle-brand-input';
import '@hui-pro/vehicle-brand-input/theme/index.scss';
Vue.use(VehicleBrandInput);
```

## 基本用法

<template>
  <code-box>
    <h-vehicle-brand-input
      v-model="value"
      :data="loadData"
      :input-props="{
        placeholder: '请输入车牌品牌',
        style: {
          width: '240px'
        }
      }"
      class="el-input--width"
    />
  </code-box>
</template>

```html
<template>
  <h-vehicle-brand-input
    v-model="value"
    :data="loadData"
    :input-props="{
      placeholder: '请输入车牌品牌',
      style: {
        width: '240px'
      }
    }"
    class="el-input--width"
  />
</template>
<script>
  import { merge } from '@hui-pro/utils';
  import axios from 'axios';
  export default {
    data() {
      return {
        value: {}
      };
    },
    methods: {
      loadData({ level, item }) {
        return new Promise((resolve, reject) => {
          axios
            .get(
              'http://supernova.hikvision.com.cn:4000/mock/309/getVehicleBrand',
              {
                params: {
                  level
                }
              }
            )
            .then(res => {
              // 扁平化扩展字段
              const data = [];
              for (const dataItem of res.data.data) {
                const obj = JSON.parse(dataItem.expand);
                merge(dataItem, obj);
                data.push(dataItem);
              }
              resolve(data);
            })
            .catch(err => {
              reject(err);
            });
        });
      }
    }
  };
</script>
```

<script>
  import { merge } from '@hui-pro/utils';
  const versions = require('docs/.vuepress/src/version.json');
  import axios from 'axios';
  export default {
    data() {
      return {
        versions,
        value: {}
      };
    },
    methods: {
      loadData({ level, item }) {
        return new Promise((resolve, reject) => {
          axios
            .get(
              'http://supernova.hikvision.com.cn:4000/mock/309/getVehicleBrand',
              {
                params: {
                  level
                }
              }
            )
            .then(res => {
              // 扁平化扩展字段
              const data = [];
              for (const dataItem of res.data.data) {
                const obj = JSON.parse(dataItem.expand)
                merge(dataItem, obj);
                data.push(dataItem)
              }
              resolve(data);
            })
            .catch(err => {
              reject(err);
            });
        });
      }
    }
  };
</script>

:::tip

- 由于数据量较大目前只支持异步。
- 数据来源字典项，到目前为止品牌数据 343 条，logo 30px \* 30px 共 225 枚，欢迎提供数据。
- 由于开发时间问题，目前每一级数据为一次性加载渲染 dom，后续会优化为滚动加载。
- 由于开发时间以及显示问题，目前只支持单选。

:::

## API

### Attributes

| 参数        | 说明                            | 类型     | 可选值 | 默认值           |
| ----------- | ------------------------------- | -------- | ------ | ---------------- |
| **v-model** | 绑定数据                        | Object   | -      | -                |
| **data**    | 车辆品牌数据，返回 Promise      | Function | -      | -                |
| data-props  | 数据 key 值别名                 | Object   | -      | 对应 data key 名 |
| input-props | input 属性                      | Object   | -      | -                |
| level       | 选择层级，0 -> 1 -> 2, 一级为 0 | Number   | -      | 2                |

### Data return

| key   | 说明                              | 可选值 | 默认值 |
| ----- | --------------------------------- | ------ | ------ |
| level | 当前层级, 0 -> 1 -> 2, 根目录为 0 | -      | -      |
| item  | 当前选中项                        | -      | -      |

### DataProps

| key            | 说明      | 可选值 | 默认值     |
| -------------- | --------- | ------ | ---------- |
| **key**        | 唯一标识  | -      | id         |
| **value**      | 显示名称  | -      | name       |
| **shortSpell** | 名称缩写  | -      | shortSpell |
| logo           | 品牌 logo | -      | logo       |
| hot            | 热门品牌  | -      | hot        |
