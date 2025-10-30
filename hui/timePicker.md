# TimePicker 时间选择器

用于选择或输入日期

## 固定时间点

<template>
  <code-box
    title="提供几个固定的时间点供用户选择"
    description="使用 el-time-select 标签，分别通过`star`、`end`和`step`指定可选的开始时间、结束时间和步长"
  >
    <el-time-select
      v-model="value1"
      :picker-options="{
        start: '08:30',
        step: '00:15',
        end: '18:30'
      }"
      placeholder="请选择时间"
   />
  </code-box>
</template>

```html
<template>
  <el-time-select
    v-model="value1"
    :picker-options="{
    start: '08:30',
    step: '00:15',
    end: '18:30'
  }"
    placeholder="请选择时间"
  />
</template>

<script>
  export default {
    data() {
      return {
        value1: ''
      };
    }
  };
</script>
```

## 请任意时间点

<template>
  <code-box
    title="可以选择任意时间"
    description="使用 el-time-picker 标签，通过`selectableRange`限制可选时间范围。提供了两种交互方式：默认情况下通过鼠标滚轮进行选择，打开`arrow-control`属性则通过界面上的箭头进行选择。"
  >
    <el-time-picker
      v-model="value6"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      placeholder="请任意时间点"
    />
    <el-time-picker v-model="value7" :unlink="true" placeholder="请任意时间点" />
    <el-time-picker
      v-model="value2"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      :picker-options="{
        selectableRange: '18:30:00 - 20:30:00'
      }"
      placeholder="请任意时间点"
    />
  </code-box>
</template>

```html
<template>
  <el-time-picker v-model="value6" placeholder="请任意时间点" />
  <el-time-picker v-model="value7" :unlink="true" placeholder="请任意时间点" />
  <el-time-picker
    v-model="value2"
    :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
    placeholder="请任意时间点"
  />
</template>

<script>
  export default {
    data() {
      return {
        value2: new Date('),
        value3: new Date(2019, 9, 10, 18, 40)
      };
    }
  };
</script>
```

### 固定时间范围

<template>
  <code-box title="若先选择开始时间，则结束时间内备选项的状态会随之改变">
    <el-time-select
      placeholder="开始时间"
      v-model="startTime"
      :picker-options="{
        start: '08:30',
        step: '00:15',
        end: '18:30',
        range: ['08:30-9:30', '12:00-16:00', '18:00-22:00']
      }"
    />
    <el-time-select
      placeholder="结束时间"
      v-model="endTime"
      :picker-options="{
        start: '08:30',
        step: '00:15',
        end: '18:30',
        minTime: startTime
      }"
    />
  </code-box>
</template>

```html
<template>
  <el-time-select
    placeholder="开始时间"
    v-model="startTime"
    :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      range: ['08:30-9:30', '12:00-16:00', '18:00-22:00']
    }"
  />
  <el-time-select
    placeholder="结束时间"
    v-model="endTime"
    :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }"
  />
</template>

<script>
  export default {
    data() {
      return {
        startTime: '',
        endTime: ''
      };
    }
  };
</script>
```

## 任意时间范围

<template>
  <code-box
    title="可选择任意的时间范围"
    description="添加`is-range`属性即可请选择时间范围，同样支持`arrow-control`属性。"
  >
    <el-time-picker
      is-range
      v-model="value4"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
    />
  </code-box>
</template>

```html
<template>
  <el-time-picker
    is-range
    v-model="value4"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
  />
</template>

<script>
  export default {
    data() {
      return {
        value4: '',
        value5: [new Date(2019, 9, 10, 8, 40), new Date(2019, 9, 10, 9, 40)]
      };
    }
  };
</script>
```

<script>
  export default {
    data() {
      return {
        value1: '',
        value2: new Date(2019, 1, 1, 18, 30, 30),
        value3: new Date(2019, 9, 10, 18, 40),
        value4: '',
        value5: [new Date(2019, 9, 10, 8, 40), new Date(2019, 9, 10, 9, 40)],
        value6: new Date(2019, 1, 1, 18, 30, 30),
        value7: new Date(2019, 1, 1, 18, 30, 30),
        startTime: '',
        endTime: ''
      };
    },
    methods: {
      handleChange(val, inputVal) {
        // console.log('change', val, inputVal);
      },
      handleInput(val, inputVal) {
        // console.log('input', val, inputVal);
      },
      handleFocus(vm, val) {
        // console.log('focus', val);
      },
      handleBlur(vm, val) {
        // console.log('blur', val);
      }
    }
  };
</script>

<style lang="scss">
  .demo-timePicker {
    .el-date-editor {
      width: 256px;
    }
    .el-range-editor{
      width: 320px;
    }
    .el-date-editor + .el-date-editor {
      margin-left: 8px;
    }
  }
</style>

::: tip 提示

日期控件默认 `100%` 宽，由外层容器自由控制宽度。控件根据 HUI 规范提供默认样式如下：

.el-date-picker--width: 256px;

.el-range-picker--width: 320px;

:::

### Attributes

| 参数              | 说明                                                                 | 类型                                  | 可选值                                                   | 默认值                                                        |
| ----------------- | -------------------------------------------------------------------- | ------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------- |
| value / v-model   | 绑定值                                                               | date(TimePicker) / string(TimeSelect) | —                                                        | —                                                             |
| readonly          | 完全只读                                                             | boolean                               | —                                                        | false                                                         |
| disabled          | 禁用                                                                 | boolean                               | —                                                        | false                                                         |
| editable          | 文本框可输入                                                         | boolean                               | —                                                        | true                                                          |
| clearable         | 是否显示清除按钮                                                     | boolean                               | —                                                        | true                                                          |
| size              | 输入框尺寸                                                           | string                                | medium / small / mini                                    | —                                                             |
| placeholder       | 非范围选择时的占位内容                                               | string                                | —                                                        | —                                                             |
| start-placeholder | 范围选择时开始日期的占位内容                                         | string                                | —                                                        | —                                                             |
| end-placeholder   | 范围选择时开始日期的占位内容                                         | string                                | —                                                        | —                                                             |
| is-range          | 是否为时间范围选择，仅对`<el-time-picker>`有效                       | boolean                               | —                                                        | false                                                         |
| arrow-control     | 是否使用箭头进行时间选择，仅对`<el-time-picker>`有效                 | boolean                               | —                                                        | false                                                         |
| align             | 对齐方式                                                             | string                                | left / center / right                                    | left                                                          |
| popper-class      | TimePicker 下拉框的类名                                              | string                                | —                                                        | —                                                             |
| picker-options    | 当前时间日期选择器特有的选项参考下表                                 | object                                | —                                                        | {}                                                            |
| range-separator   | 选择范围时的分隔符                                                   | string                                | -                                                        | '-'                                                           |
| value-format      | 可选，仅 TimePicker 时可用，绑定值的格式。不指定则绑定值为 Date 对象 | string                                | 见[日期格式](#/zh-CN/component/date-picker#ri-qi-ge-shi) | —                                                             |
| default-value     | 可选，选择器打开时默认显示的时间                                     | Date(TimePicker) / string(TimeSelect) | 可被`new Date()`解析(TimePicker) / 可选值(TimeSelect)    | —                                                             |
| name              | 原生属性                                                             | string                                | —                                                        | —                                                             |
| prefix-icon       | 自定义头部图标的类名                                                 | string                                | —                                                        | h-icon-clock                                                  |
| clear-icon        | 自定义清空图标的类名                                                 | string                                | —                                                        | h-icon-close                                                  |
| unlink            | 选择时间是否与输入框联动，非联动条件最终值以确认或快捷按钮为准       | boolean                               | -                                                        | default: true <br /> type 为 ['year', 'month', 'time']: false |
| unlink-range      | range 模式是否取消关联开始时间与结束时间                             | boolean                               | —                                                        | true                                                          |
| compare-times      | 自定义计算开始时间与结束时间大小判断方法                             | function                               | 说明 如果 return true 可以保存数据, 如果返回 提示错误描述。仅对`is-range`有效                                                        | -                                                          |

### Time Select Options

| 参数    | 说明                                             | 类型   | 可选值 | 默认值 |
| ------- | ------------------------------------------------ | ------ | ------ | ------ |
| start   | 开始时间                                         | string | —      | 09:00  |
| end     | 结束时间                                         | string | —      | 18:00  |
| step    | 间隔时间                                         | string | —      | 00:30  |
| minTime | 最小时间，小于该时间的时间段将被禁用             | string | —      | 00:00  |
| maxTime | 最大时间，大于该时间的时间段将被禁用             | string | —      | —      |
| range   | 可选时间段, 如['09:30 - 12:00', '14:30 - 18:30'] | array  | —      | —      |

### Time Picker Options

| 参数             | 说明                                                                                                | 类型           | 可选值                                    | 默认值     |
| ---------------- | --------------------------------------------------------------------------------------------------- | -------------- | ----------------------------------------- | ---------- |
| selectableRange | 可选时间段，例如`'18:30:00 - 20:30:00'`或者传入数组`['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']`, 暂不支持`range`模式 | string / array | —                                         | —          |
| format           | 时间格式化(TimePicker)                                                                              | string         | 小时：`HH`，分：`mm`，秒：`ss`，AM/PM `A` | 'HH:mm:ss' |

### Events

| 事件名称 | 返回值                                                                 | 说明                    |
| -------- | ---------------------------------------------------------------------- | ----------------------- |
| change   | 组件绑定值（受 `value-format` 控制），输入框显示值（受 `format` 控制） | 用户选定的值改变触发    |
| input    | 组件绑定值（受 `value-format` 控制），输入框显示值（受 `format` 控制） | 输入框值改变触发        |
| blur     | 组件绑定值（受 `value-format` 控制），输入框显示值（受 `format` 控制） | 当 input 失去焦点时触发 |
| focus    | 组件绑定值（受 `value-format` 控制），输入框显示值（受 `format` 控制） | 当 input 获得焦点时触发 |

### Methods

| 方法名 | 说明              | 参数 |
| ------ | ----------------- | ---- |
| focus  | 使 input 获取焦点 | -    |
