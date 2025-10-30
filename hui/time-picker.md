# TimePicker 时分秒选择器

<template>
  <author-info
    :version="versions['time-picker']"
    author="唐丽萍6"
    ux="苗任越"
    ui="江佳欢"
    standard="http://10.33.43.73/BBG_UED/BUI_Design/bscs/v2.0/issues/37"
    reviewed
  />
</template>

## 安装

```bash
$ npm i @hui-pro/time-picker -D
# 或者
$ yarn add @hui-pro/time-picker --dev
```

## 引入

```js
import TimePicker from '@hui-pro/time-picker';
import '@hui-pro/time-picker/theme/index.scss';
Vue.use(TimePicker);
```

## 时分秒

<template>
  <code-box title="基础用法" description="展示格式为时分秒">
    <h-time-picker v-model="date1" :format="format1"></h-time-picker>
  </code-box>
</template>

```html
<h-time-picker v-model="date1" :format="format1"></h-time-picker>

<script>
  export default {
    data() {
      return {
        date1: ['00:00:00', '01:00:00'],
        format1: 'HH:mm:ss'
      };
    }
  };
</script>
```

## 时分

<template>
  <code-box title="基础用法" description="展示格式为时分">
    <h-time-picker v-model="date2" :format="format2"></h-time-picker>
  </code-box>
</template>

```html
<h-time-picker v-model="date2" :format="format2"></h-time-picker>

<script>
  export default {
    data() {
      return {
        date2: ['00:00', '01:00'],
        format2: 'HH:mm'
      };
    }
  };
</script>
```

## 时

<template>
  <code-box title="基础用法" description="展示格式为时">
    <h-time-picker v-model="date3" :format="format3"></h-time-picker>
  </code-box>
</template>

```html
<h-time-picker v-model="date3" :format="format3"></h-time-picker>

<script>
  export default {
    data() {
      return {
        date3: ['00:00', '01:00'],
        format3: 'HH'
      };
    }
  };
</script>
```

## 时(自定义区域；目前仅支持时的范围控制)

<template>
  <code-box title="基础用法" description="可自定义区域，目前只支持小时可配置,可配置开始和结束时间是否可相等">
    <h-time-picker v-model="date4" :format="format4" :hTimeRegion="hTimeRegion" :validateEqual="validateEqual"></h-time-picker>
  </code-box>
</template>

```html
<h-time-picker
  v-model="date4"
  :format="format4"
  :validateEqual="ture"
></h-time-picker>

<script>
  export default {
    data() {
      return {
        date4: ['00:00', '01:00'],
        format4: 'HH',
        hTimeRegion: ['00:00', '23:00']
      };
    }
  };
</script>
```

## 自定义时间间隔

<template>
  <code-box title="基础用法" description="可自定义时分秒时间间隔">
    <h-time-picker v-model="date5" :steps="steps"></h-time-picker>
  </code-box>
</template>

```html
<h-time-picker
  v-model="date5"
  :steps="steps"
></h-time-picker>

<script>
  export default {
    data() {
      return {
        date5: ['00:00:00', '00:00:00'],
        steps: {
          hStep: 3,
          mStep: 4,
          sStep: 5
        }
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
        date1: ['00:00:00', '01:00:00'],
        // date1: [],
        format1: 'HH:mm:ss',
        date2: ['00:00', '01:00'],
        // date2: [],
        format2: 'HH:mm',
        date3: ['00:00', '01:00'],
        // date3: [],
        format3: 'HH',
        date4: ['00:00', '01:00'],
        // date4: [],
        format4: 'HH',
        validateEqual: true,
        hTimeRegion: ['00:00', '23:00'],
        date5: ['00:00:00', '00:00:00'],
        steps: {
          hStep: 3,
          mStep: 4,
          sStep: 5
        }
      }
    },
    watch: {
      date1 (val) {
        console.log(val)
      }
    }
  }
</script>

## API

### Attributes

| 参数           | 说明                         | 类型    | 可选值                    | 默认值             |
| -------------- | ---------------------------- | ------- | ------------------------- | ------------------ |
| format         | 格式化类型                   | Stirng  | 'HH:mm:ss', 'HH:mm', 'HH' | 'HH:mm:ss'         |
| validate-equal | 开始和结束时间效验是否可相等 | Boolean |                           | false              |
| h-time-region  | 用于控制小时的区间           | Array   |                           | ['00:00', '24:00'] |
| steps <Badge text="2.0+" /> | 用于控制时分秒的间隔(hStep 小时间隔，mStep 分间隔，sStep 秒间隔) | Object |                           | {hStep: 1, mStep: 1, sStep: 1} |
| validate  <Badge text="1.15.1+" /> | 是否效验开始和结束时间大小           | Boolean   |                           | true |
| custom-class | 下拉框类名| |  | |

