# DateTimePicker 日期时间选择器

在同一个选择器里选择日期和时间

## 日期和时间点

<template>
  <code-box
    description="通过设置`type`属性为`datetime`，即可在同一个选择器里同时进行日期和时间的选择。快捷选项的使用方法与 Date Picker 相同。支持智能类型转化，如：`20200421122020 => 2020/04/21 12:20:20、20200421000000 => 2020/04/21 00:00:00`"
  >
    <div class="block">
      <span class="demonstration">默认</span>
      <!-- <el-button @click="reset">重置</el-button> -->
      <el-date-picker
        @input="handleInput"
        @change="handleChange"
        v-model="value1"
        type="datetime"
        placeholder="请选择日期时间"
      />
    </div>
    <div class="block">
      <span class="demonstration">带快捷选项</span>
      <el-date-picker
        v-model="value2"
        type="datetime"
        placeholder="请选择日期时间"
        :picker-options="pickerOptions1"
      />
    </div>
    <div class="block">
      <span class="demonstration">设置默认时间</span>
      <el-date-picker
        v-model="value3"
        type="datetime"
        placeholder="请选择日期时间"
        default-time="12:00:00"
      />
    </div>
  </code-box>
</template>

```html
<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker
      v-model="value1"
      @change="handleChange"
      type="datetime"
      placeholder="请选择日期时间"
    />
  </div>
  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <el-date-picker
      v-model="value2"
      type="datetime"
      placeholder="请选择日期时间"
      :picker-options="pickerOptions1"
    />
  </div>
  <div class="block">
    <span class="demonstration">设置默认时间</span>
    <el-date-picker
      v-model="value3"
      type="datetime"
      placeholder="请选择日期时间"
      default-time="12:00:00"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions1: {
          shortcuts: [
            {
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date(), true);
              }
            },
            {
              text: '昨天',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date, true);
              }
            },
            {
              text: '一周前',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date, true);
              }
            }
          ]
        },
        value1: new Date(),
        value2: new Date(),
        value3: ''
      };
    },
    methods: {
      handleChange() {},
      handleInput() {}
    }
  };
</script>
```

## 日期和时间范围

<template>
  <code-box title="设置`type`为`datetimerange`即可选择日期和时间范围">
    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker
        v-model="value4"
        type="datetimerange"
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      />
    </div>
    <div class="block">
      <span class="demonstration">带快捷选项</span>
      <el-date-picker
        v-model="value5"
        type="datetimerange"
        :picker-options="pickerOptions2"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      />
    </div>
  </code-box>
</template>

```html
<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker
      v-model="value4"
      type="datetimerange"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
    />
  </div>
  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <el-date-picker
      v-model="value5"
      type="datetimerange"
      :picker-options="pickerOptions2"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions2: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end], true);
              }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end], true);
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end], true);
              }
            }
          ]
        },
        value4: [
          new Date(2019, 10, 10, 10, 10),
          new Date(2019, 10, 11, 10, 10)
        ],
        value5: ''
      };
    }
  };
</script>
```

## 默认的起始与结束时刻

<template>
  <code-box
    description="使用`datetimerange`进行范围选择时，在日期选择面板中选定起始与结束的日期，默认会使用该日期的`00:00:00`作为起始与结束的时刻；通过选项`default-time`可以控制选中起始与结束时间时所使用的具体时刻。`default-time`接受一个数组，数组每项值为字符串，形如`12:00:00`，其中第一项控制起始日期的具体时刻，第二项控制结束时间的具体时刻。"
  >
    <div class="block">
      <span class="demonstration">起始日期时刻为 12:00:00</span>
      <el-date-picker
        v-model="value6"
        type="datetimerange"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :default-time="['12:00:00']"
      />
    </div>
    <div class="block">
      <span class="demonstration">
        起始日期时刻为 12:00:00，结束时间时刻为 08:00:00
      </span>
      <el-date-picker
        v-model="value7"
        type="datetimerange"
        align="right"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :default-time="['12:00:00', '08:00:00']"
      />
    </div>
  </code-box>
</template>

```html
<template>
  <div class="block">
    <span class="demonstration">起始日期时刻为 12:00:00</span>
    <el-date-picker
      v-model="value6"
      type="datetimerange"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      :default-time="['12:00:00']"
    />
  </div>
  <div class="block">
    <span class="demonstration">
      起始日期时刻为 12:00:00，结束时间时刻为 08:00:00
    </span>
    <el-date-picker
      v-model="value7"
      type="datetimerange"
      align="right"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      :default-time="['12:00:00', '08:00:00']"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value6: [],
        value7: []
      };
    }
  };
</script>
```

<style lang="scss">
  .demo-dateTimePicker {
    .el-date-editor {
      width: 256px;
    }
    .el-range-editor {
      width: 320px;
    }

    .code-box-demo {
      display: flex;
      padding: 0;
    }

    .block {
      flex: 1;
      padding: 30px 0;
      border-right: solid 1px #eff2f6;
      text-align: center;
      &:last-child {
        border-right: none;
      }
    }

    .demonstration {
      display: block;
      margin-bottom: 20px;
      color: #8492a6;
      font-size: 14px;
    }
  }
</style>

<script>
  module.exports = {
    data() {
      return {
        pickerOptions1: {
          shortcuts: [
            {
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date(), true);
              }
            },
            {
              text: '昨天',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 *1000* 24);
                picker.$emit('pick', date, true);
              }
            },
            {
              text: '一周前',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 *1000* 24 *7);
                picker.$emit('pick', date, true);
              }
            }
          ]
        },
        pickerOptions2: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600* 1000 *24* 7);
                  picker.$emit('pick', [start, end], true);
                }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 *1000* 24 *30);
                picker.$emit('pick', [start, end], true);
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600* 1000 *24* 90);
                  picker.$emit('pick', [start, end], true);
                }
            }
          ]
        },
        pickerOptions3: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        value1: new Date('2019-05-14 00:00:00'),
        value2: new Date(),
        value3: '',
        value4: [
          new Date(2000, 10, 10, 10, 10),
          new Date(2000, 10, 11, 10, 10)
        ],
        value5: '',
        value6: [],
        value7: []
      };
    },
    methods: {
      handleChange(val) {
        // console.log('change', val);
      },
      handleInput(val) {
        // console.log('input', val);
      },
      reset() {
        this.value1 = '';
      }
    }
  };
</script>

::: tip 提示

DateTimePicker 由 DatePicker 和 TimePicker 派生，`Picker Options` 或者其他选项可以参照 DatePicker 和 TimePicker。

日期控件默认 `100%` 宽，由外层容器自由控制宽度。控件根据 HUI 规范提供默认样式如下：

.el-date-picker--width: 256px;

.el-range-picker--width: 320px;

:::

### Attributes

| 参数               | 说明                                                           | 类型                                              | 可选值                                                                                                                                                                            | 默认值                                                        |
| ------------------ | -------------------------------------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| value / v-model    | 绑定值                                                         | date(DateTimePicker) / array(DateTimeRangePicker) | —                                                                                                                                                                                 | —                                                             |
| readonly           | 完全只读                                                       | boolean                                           | —                                                                                                                                                                                 | false                                                         |
| disabled           | 禁用                                                           | boolean                                           | —                                                                                                                                                                                 | false                                                         |
| editable           | 文本框可输入                                                   | boolean                                           | —                                                                                                                                                                                 | true                                                          |
| clearable          | 是否显示清除按钮                                               | boolean                                           | —                                                                                                                                                                                 | true                                                          |
| size               | 输入框尺寸                                                     | string                                            | large, small, mini                                                                                                                                                                | —                                                             |
| placeholder        | 非范围选择时的占位内容                                         | string                                            | —                                                                                                                                                                                 | —                                                             |
| start-placeholder  | 范围选择时开始时间的占位内容                                   | string                                            | —                                                                                                                                                                                 | —                                                             |
| end-placeholder    | 范围选择时结束时间的占位内容                                   | string                                            | —                                                                                                                                                                                 | —                                                             |
| time-arrow-control | 是否使用箭头进行时间选择                                       | boolean                                           | —                                                                                                                                                                                 | false                                                         |
| type               | 显示类型                                                       | string                                            | year/month/date/week/ datetime/datetimerange/daterange                                                                                                                            | date                                                          |
| format             | 显示在输入框中的格式                                           | string                                            | 见[日期格式](#/zh-CN/component/date-picker#ri-qi-ge-shi)                                                                                                                          | yyyy/MM/dd HH:mm:ss                                           |
| align              | 面板对齐方式                                                   | string                                            | left, center, right                                                                                                                                                               | left                                                          |
| popper-class       | DateTimePicker 下拉框的类名                                    | string                                            | —                                                                                                                                                                                 | —                                                             |
| picker-options     | 当前时间日期选择器特有的选项参考下表                           | object                                            | —                                                                                                                                                                                 | {}                                                            |
| range-separator    | 选择范围时的分隔符                                             | string                                            | -                                                                                                                                                                                 | '-'                                                           |
| default-value      | 可选，选择器打开时默认显示的时间                               | Date                                              | 可被`new Date()`解析                                                                                                                                                              | —                                                             |
| default-time       | 选中日期后的默认具体时刻                                       | 非范围选择时：string / 范围选择时：string\[]      | 非范围选择时：形如`12:00:00`的字符串；范围选择时：数组，长度为 2，每项值为字符串，形如`12:00:00`，第一项指定开始时间的时刻，第二项指定结束时间的时刻。不指定会使用时刻 `00:00:00` | '00:00:00'                                                    |
| value-format       | 可选，绑定值的格式。不指定则绑定值为 Date 对象                 | string                                            | 见[日期格式](#/zh-CN/component/date-picker#ri-qi-ge-shi)                                                                                                                          | —                                                             |
| name               | 原生属性                                                       | string                                            | —                                                                                                                                                                                 | —                                                             |
| prefix-icon        | 自定义头部图标的类名                                           | string                                            | —                                                                                                                                                                                 | —                                                             |
| clear-icon         | 自定义清空图标的类名                                           | string                                            | —                                                                                                                                                                                 | —                                                             |
| unlink             | 选择时间是否与输入框联动，非联动条件最终值以确认或快捷按钮为准 | boolean                                           | -                                                                                                                                                                                 | default: true <br /> type 为 ['year', 'month', 'time']: false |
| unlink-panels      | 在范围选择器里取消两个日期面板之间的联动                       | boolean                                           | —                                                                                                                                                                                 | true                                                          |
| unlink-range       | range 模式是否取消关联开始时间与结束时间                       | boolean                                           | —                                                                                                                                                                                 | true                                                          |
| calendar-type     | 国际日历的特殊格式,目前支持佛历th(泰历)和尼泊尔日历np           | string                                    | th/np                    | ""

### Picker Options

| 参数             | 说明                                                                                                                     | 类型                           | 可选值 | 默认值 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------ | ------ | ------ |
| shortcuts        | 设置快捷选项，需要传入 { text, onClick } 对象用法参考 demo 或下表                                                        | Object\[]                      | —      | —      |
| disabledDate     | 设置禁用状态，参数为当前日期，要求返回 Boolean                                                                           | Function                       | —      | —      |
| selectableRange  | 可选时间段，例如`'18:30:00 - 20:30:00'`或者传入数组`['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']`, 暂不支持`range`模式 | string / array                 | —      | —      |
| firstDayOfWeek   | 周起始日                                                                                                                 | Number                         | 1 到 7 | 1      |
| onPick           | 选中日期后会执行的回调，只有当 `daterange` 或 `datetimerange` 才生效                                                     | Function({ maxDate, minDate }) | —      | —      |
| customValidation | 日期范围的自定义校验方法，参数为开始日期和结束日期，要求返回 Boolean，返回值为 true 时表示通过验证                       | Function({ maxDate, minDate }) | —      | —      |
| customPrompt     | 日期范围的自定义校验方法不通过时对应的提示语句                                                                           | String                         | —      | —      |

### Shortcuts

| 参数    | 说明                                                                                                  | 类型     | 可选值 | 默认值 |
| ------- | ----------------------------------------------------------------------------------------------------- | -------- | ------ | ------ |
| text    | 标题文本                                                                                              | string   | —      | —      |
| onClick | 选中后的回调函数，参数是 vm，可通过触发 'pick' 事件设置选择器的值。例如 vm.\$emit('pick', new Date()) | function | —      | —      |

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
| focus  | 使 input 获取焦点 | —    |

### Instance.\$emit

> picker.\$emit('pick', date, visible, changeInput);

| 参数        | 说明                          | 默认值 |
| ----------- | ----------------------------- | ------ |
| date        | 自定义事件，`range`模式为数组 | —      |
| visible     | 是否显示面板                  | false  |
| changeInput | 是否改变输入框值              | false  |

### Slots

| Name            | 说明         |
| --------------- | ------------ |
| range-separator | 自定义分隔符 |
