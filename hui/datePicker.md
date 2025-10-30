# DatePicker 日期选择器

用于选择或输入日期

## 选择日

<template>
  <code-box
    title="以「日」为基本单位，基础的日期选择控件"
    description="基本单位由`type`属性指定。快捷选项需配置`picker-options`对象中的`shortcuts`，禁用日期通过 `disabledDate` 设置，传入函数。支持智能类型转化，如：`20200421 => 2020/04/21`。配置 `dateClassRender` 可以给时间加入特殊样式。"
  >
    <div class="block">
      <span class="demonstration">默认</span>
      <!-- <el-button @click="reset">重置</el-button> -->
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="请选择日期"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>
    <div class="block">
      <span class="demonstration">带快捷选项</span>
      <el-date-picker
        v-model="value2"
        type="date"
        placeholder="请选择日期"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        :picker-options="pickerOptions1"
      />
    </div>
  </code-box>
</template>

```html
<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker v-model="value1" type="date" placeholder="请选择日期" />
  </div>
  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <el-date-picker
      v-model="value2"
      type="date"
      placeholder="请选择日期"
      :picker-options="pickerOptions1"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          dateClassRender(time) {
            return time.getDay() === 0 ? 'sunday' : '';
          },
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
        value2: ''
      };
    }
  };
</script>
```

## 其他日期单位

<template>
  <code-box
    title="通过扩展基础的日期选择，可以选择周、月、年或多个日期"
    description="周选择器末尾使用`$`符号表示显示区间，如：`yyyy/MM/dd$`"
  >
    <div class="container">
      <div class="block">
        <span class="demonstration">周</span>
        <el-date-picker
          v-model="value3"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
          type="week"
          placeholder="请选择周"
        />
      </div>
      <div class="block">
        <span class="demonstration">月</span>
        <el-date-picker
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
          v-model="value4"
          type="month"
          placeholder="请选择月"
        />
      </div>
    </div>
    <div class="container">
      <div class="block">
        <span class="demonstration">年</span>
        <el-date-picker
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
          v-model="value5"
          type="year"
          placeholder="请选择年"
        />
      </div>
      <div class="block">
        <span class="demonstration">多个日期</span>
        <el-date-picker
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
          type="dates"
          v-model="value14"
          placeholder="请选择一个或多个日期"
        />
      </div>
    </div>
  </code-box>
</template>

```html
<div class="container">
  <div class="block">
    <span class="demonstration">周</span>
    <el-date-picker v-model="value3" type="week" placeholder="请选择周" />
  </div>
  <div class="block">
    <span class="demonstration">月</span>
    <el-date-picker v-model="value4" type="month" placeholder="请选择月" />
  </div>
  <div class="container">
    <div class="block">
      <span class="demonstration">年</span>
      <el-date-picker v-model="value5" type="year" placeholder="请选择年" />
    </div>
    <div class="block">
      <span class="demonstration">多个日期</span>
      <el-date-picker
        type="dates"
        v-model="value14"
        placeholder="请选择一个或多个日期"
      />
    </div>
  </div>
</div>

<script>
  export default {
    data() {
      return {
        value3: new Date(),
        value4: new Date(),
        value5: new Date(),
        value14: [new Date(), new Date(new Date().getTime() + 86400000)]
      };
    }
  };
</script>
```

## 选择日期范围

<template>
  <code-box
    title="可在一个选择器中便捷地选择一个时间范围"
    description="在选择日期范围时，默认情况下左右面板不会联动。如果希望两个面板联动，可以使用`unlink-panels`属性联动。"
  >
    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        v-model="value6"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
    </div>
    <div class="block">
      <span class="demonstration">带快捷选项</span>
      <el-date-picker
        v-model="value7"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions2"
      />
    </div>
  </code-box>
</template>

```html
<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker
      v-model="value6"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
  </div>
  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <el-date-picker
      v-model="value7"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions2"
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
        value6: [new Date(), new Date()],
        value7: []
      };
    }
  };
</script>
```

## 选择月份范围

<template>
  <code-box
    title="可在一个选择器中便捷地选择一个月份范围"
    description="在选择月份范围时，默认情况下左右面板不会联动。如果希望两个面板联动，可以使用`unlink-panels`属性联动。"
  >
    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker
        v-model="value15"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        type="monthrange"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
      />
    </div>
    <div class="block">
      <span class="demonstration">带快捷选项</span>
      <el-date-picker
        v-model="value16"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        type="monthrange"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        :picker-options="pickerOptions3"
      />
    </div>
  </code-box>
</template>

```html
<div class="block">
  <span class="demonstration">默认</span>
  <el-date-picker
    v-model="value15"
    type="monthrange"
    start-placeholder="开始月份"
    end-placeholder="结束月份"
  />
</div>
<div class="block">
  <span class="demonstration">带快捷选项</span>
  <el-date-picker
    v-model="value16"
    type="monthrange"
    start-placeholder="开始月份"
    end-placeholder="结束月份"
    :picker-options="pickerOptions3"
  />
</div>

<script>
  export default {
    data() {
      return {
        pickerOptions3: {
          shortcuts: [
            {
              text: '本月',
              onClick(picker) {
                picker.$emit('pick', [new Date(), new Date()], true);
              }
            },
            {
              text: '今年至今',
              onClick(picker) {
                const end = new Date();
                const start = new Date(new Date().getFullYear(), 0);
                picker.$emit('pick', [start, end], true);
              }
            },
            {
              text: '最近六个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setMonth(start.getMonth() - 6);
                picker.$emit('pick', [start, end], true);
              }
            }
          ]
        },
        value15: [
          new Date(new Date().setMonth(0)),
          new Date(new Date().setMonth(5))
        ],
        value16: ''
      };
    }
  };
</script>
```

## 选择年范围 <Badge text="2.29.0+" />

<template>
  <code-box
    title="选择年范围。"
    description="年选择。"
  >
    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker
        v-model="value18"
        type="yearrange"
        format="yyyy"
      />
    </div>
  </code-box>
</template>

```html
<template>
  <el-date-picker v-model="value18" type="yearrange" format="yyyy" />
</template>
<script>
  export default {
    data() {
      return {
        value18: [new Date('2020'), new Date('2021')]
      };
    }
  };
</script>
```

<template>
  <code-box
    title="使用`format`指定输入框的格式；使用`value-format`指定绑定值的格式。"
    description="默认情况下，组件接受并返回`Date`对象。以下为可用的格式化字串，以 UTC 2017 年 1 月 2 日 03:04:05 为例："
  >
    <div class="block">
      <span class="demonstration">默认为 Date 对象</span>
      <div class="demonstration">值：{{ value10 }}</div>
      <el-date-picker
        v-model="value10"
        type="date"
        placeholder="请选择日期"
        format="yyyy 年 MM 月 dd 日"
      />
    </div>
    <div class="block">
      <span class="demonstration">使用 value-format</span>
      <div class="demonstration">值：{{ value11 }}</div>
      <el-date-picker
        v-model="value11"
        type="date"
        placeholder="请选择日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy/MM/dd"
      />
    </div>
    <div class="block">
      <span class="demonstration">时间戳</span>
      <div class="demonstration">值：{{ value12 }}</div>
      <el-date-picker
        v-model="value12"
        type="date"
        placeholder="请选择日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="timestamp"
      />
    </div>
  </code-box>
</template>

```html
<template>
  <div class="block">
    <span class="demonstration">默认为 Date 对象</span>
    <div class="demonstration">值：{{ value10 }}</div>
    <el-date-picker
      v-model="value10"
      type="date"
      placeholder="请选择日期"
      format="yyyy 年 MM 月 dd 日"
    />
  </div>
  <div class="block">
    <span class="demonstration">使用 value-format</span>
    <div class="demonstration">值：{{ value11 }}</div>
    <el-date-picker
      v-model="value11"
      type="date"
      placeholder="请选择日期"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy/MM/dd"
    />
  </div>
  <div class="block">
    <span class="demonstration">时间戳</span>
    <div class="demonstration">值：{{ value12 }}</div>
    <el-date-picker
      v-model="value12"
      type="date"
      placeholder="请选择日期"
      format="yyyy 年 MM 月 dd 日"
      value-format="timestamp"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value10: '',
        value11: '',
        value12: ''
      };
    }
  };
</script>
```

## 默认显示日期

<template>
  <code-box
    title="在选择日期范围时，指定起始日期和结束日期的默认时刻。"
    description="选择日期范围时，默认情况下，起始日期和结束日期的时间部分均为当天的 0 点 0 分 0 秒。通过`default-time`可以分别指定二者的具体时刻。`default-time`接受一个数组，其中的值为形如`12:00:00`的字符串，第一个值控制起始日期的时刻，第二个值控制结束日期的时刻。"
  >
    <div class="block">
      <p>组件值：{{ value13 }}</p>
      <el-date-picker
        v-model="value13"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
      />
    </div>
  </code-box>
</template>

```html
<template>
  <div class="block">
    <p>组件值：{{ value13 }}</p>
    <el-date-picker
      v-model="value13"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value13: ''
      };
    }
  };
</script>
```

## 自定义年月日 <Badge text="Beta 2.10.0+" />

<template>
  <code-box title="自定义面板" description="可自定义任意面板内容">
    <div class="block">
      <el-date-picker v-model="value17" type="date" placeholder="请选择日期">
        <template slot="year" slot-scope="{ value }">
          <span :class="['cell', { tag: new Date().getFullYear() === value }]">
            {{ value }}年
          </span>
        </template>
        <template slot="month" slot-scope="{ value }">
          <span :class="['cell', { tag: new Date().getMonth() === value }]">
            {{ value }}月
          </span>
        </template>
        <template slot="date" slot-scope="{ value }">
          <span :class="['cell', { tag: new Date().getDate() === value }]">
            {{ value }}日
          </span>
        </template>
      </el-date-picker>
      <br>
      <br>
      <el-date-picker v-model="value6" type="daterange">
        <template slot="startMonth" slot-scope="{ value }">
          <span :class="['cell', { tag: new Date().getMonth() === value }]">
            {{ value }}月
          </span>
        </template>
        <template slot="endMonth" slot-scope="{ value }">
          <span :class="['cell', { tag: new Date().getMonth() === value }]">
            {{ value }}m
          </span>
        </template>
        <template slot="startDate" slot-scope="{ value }">
          <span :class="['cell', { tag: new Date().getDate() === value }]">
            {{ value }}日
          </span>
        </template>
        <template slot="endDate" slot-scope="{ value }">
          <span :class="['cell', { tag: new Date().getDate() === value }]">
            {{ value }}d
          </span>
        </template>
      </el-date-picker>
    </div>
  </code-box>
</template>

```html
<template>
  <el-date-picker v-model="value17" type="date" placeholder="请选择日期">
    <template slot="year" slot-scope="{ value }">
      <span :class="['cell', { tag: new Date().getFullYear() === value }]">
        {{ value }}
      </span>
    </template>
    <template slot="month" slot-scope="{ value }">
      <span :class="['cell', { tag: new Date().getMonth() === value }]">
        {{ value }}月
      </span>
    </template>
    <template slot="date" slot-scope="{ value }">
      <span :class="['cell', { tag: new Date().getDate() === value }]">
        {{ value }}日
      </span>
    </template>
  </el-date-picker>
  <br />
  <br />
  <el-date-picker v-model="value6" type="daterange">
    <template slot="startMonth" slot-scope="{ value }">
      <span :class="['cell', { tag: new Date().getMonth() === value }]">
        {{ value }}月
      </span>
    </template>
    <template slot="endMonth" slot-scope="{ value }">
      <span :class="['cell', { tag: new Date().getMonth() === value }]">
        {{ value }}m
      </span>
    </template>
    <template slot="startDate" slot-scope="{ value }">
      <span :class="['cell', { tag: new Date().getDate() === value }]">
        {{ value }}日
      </span>
    </template>
    <template slot="endDate" slot-scope="{ value }">
      <span :class="['cell', { tag: new Date().getDate() === value }]">
        {{ value }}d
      </span>
    </template>
  </el-date-picker>
</template>
<script>
  export default {
    data() {
      return {
        value6: [new Date(), new Date()],
        value17: new Date()
      };
    }
  };
</script>
```

::: tip

`.cell、.tag` 为 `HUI` 视觉规范内置 class 插槽可直接使用。

:::

<style lang="scss">
  .demo-datePicker {
    .el-date-editor {
      width: 256px;
    }
    .el-range-editor {
      width: 320px;
    }
    .code-box-demo {
      display: flex;
      flex-wrap: wrap;
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

    .container {
      flex: 1;
      border-right: solid 1px #eff2f6;
      .block {
        border-right: none;
        &:last-child {
          border-top: solid 1px #eff2f6;
        }
      }
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

  .sunday {
    color: green;
  }
</style>

<script>
  export default {
    data() {
      const now = new Date();
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 86400000;
          },
          dateClassRender(time) {
            return time.getDay() === 0 ? "sunday" : ""
          },
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
          dateClassRender(time) {
            return time.getDay() === 0 ? "sunday" : ""
          },
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
          shortcuts: [
            {
              text: '本月',
              onClick(picker) {
                picker.$emit('pick', [new Date(), new Date()], true);
              }
            },
            {
              text: '今年至今',
              onClick(picker) {
                const end = new Date();
                const start = new Date(new Date().getFullYear(), 0);
                picker.$emit('pick', [start, end], true);
              }
            },
            {
              text: '最近六个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setMonth(start.getMonth() - 6);
                picker.$emit('pick', [start, end], true);
              }
            }
          ]
        },
        pickerOptionsTest: {
          customValidation: () => {
            return true;
          }
        },
        // pickerOptionsDemo:{
        //   disabledDate(time) {
        //   return time.getTime() > Date.now();
        //   }
        // },
        value1: 1598948561240,
        value2: '',
        value3: new Date('2019-07-15'),
        value4: new Date(),
        value5: new Date(),
        value6: [new Date(), new Date()],
        value7: [],
        value8: '',
        value9: '',
        value10: '',
        value11: '',
        value12: '',
        value13: '',
        value14: [new Date(), new Date(new Date().getTime() + 86400000)],
        value15: [
          new Date(new Date().setMonth(0)),
          new Date(new Date().setMonth(5))
        ],
        value16: '',
        value17: new Date(),
        value18: [new Date('2020'), new Date('2021')]
      };
    },
    methods: {
      handleChange(val, inputVal) {
        // console.log('change', val, inputVal);
      },
      handleInput(val, inputVal) {
        // console.log('input', val, inputVal);
      },
      handleFocus(val, inputVal) {
        // console.log('focus', val, inputVal);
      },
      handleBlur(val, inputVal) {
        // console.log('blur', val, inputVal);
      },
      reset() {
        this.value1 = '';
      }
    }
  };
</script>

## 日期格式

::: warning 警告

警告请注意大小写

:::

| 格式        | 含义      | 说明                                             | 举例                  |
| ----------- | --------- | ------------------------------------------------ | --------------------- |
| `yyyy`      | 年        |                                                  | 2017                  |
| `M`         | 月        | 不补 0                                           | 1                     |
| `MM`        | 月        |                                                  | 01                    |
| `Mo`        | 月序数    |                                                  | 1st 2nd ... 11th 12th |
| `W`         | 周        | `仅周选择器可用`，不补 0                         | 1                     |
| `WW`        | 周        | `仅周选择器的可用`                               | 01                    |
| `Wo`        | 周序数    | `仅周选择器的可用`                               | 1st 2nd ... 52nd 53rd |
| `d`         | 日        | 不补 0                                           | 2                     |
| `dd`        | 日        |                                                  | 02                    |
| `do`        | 日序数    |                                                  | 1st 2nd ... 30th 31st |
| `H`         | 小时      | 24 小时制；不补 0                                | 3                     |
| `HH`        | 小时      | 24 小时制                                        | 03                    |
| `h`         | 小时      | 12 小时制，须和 `A` 或 `a` 使用，不补 0          | 3                     |
| `hh`        | 小时      | 12 小时制，须和 `A` 或 `a` 使用                  | 03                    |
| `m`         | 分钟      | 不补 0                                           | 4                     |
| `mm`        | 分钟      |                                                  | 04                    |
| `s`         | 秒        | 不补 0                                           | 5                     |
| `ss`        | 秒        |                                                  | 05                    |
| `A`         | AM/PM     | 仅 `format` 可用，大写                           | AM                    |
| `a`         | am/pm     | 仅 `format` 可用，小写                           | am                    |
| `timestamp` | JS 时间戳 | 仅 `value-format` 可用，组件绑定值为`number`类型 | 1483326245000         |

::: tip 提示

日期控件默认 `100%` 宽，由外层容器自由控制宽度。控件根据 HUI 规范提供默认样式如下：

.el-date-picker--width: 256px;

.el-range-picker--width: 320px;

:::

### Attributes

| 参数              | 说明                                                           | 类型                                      | 可选值                                                                                                                          | 默认值                                                        |
| ----------------- | -------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| value / v-model   | 绑定值                                                         | date(DatePicker) / array(DateRangePicker) | —                                                                                                                               | —                                                             |
| readonly          | 完全只读                                                       | boolean                                   | —                                                                                                                               | false                                                         |
| disabled          | 禁用                                                           | boolean                                   | —                                                                                                                               | false                                                         |
| editable          | 文本框可输入                                                   | boolean                                   | —                                                                                                                               | true                                                          |
| clearable         | 是否显示清除按钮                                               | boolean                                   | —                                                                                                                               | true                                                          |
| size              | 输入框尺寸                                                     | string                                    | large, small, mini                                                                                                              | —                                                             |
| placeholder       | 非范围选择时的占位内容                                         | string                                    | —                                                                                                                               | —                                                             |
| start-placeholder | 范围选择时开始日期的占位内容                                   | string                                    | —                                                                                                                               | —                                                             |
| end-placeholder   | 范围选择时结束日期的占位内容                                   | string                                    | —                                                                                                                               | —                                                             |
| type              | 显示类型                                                       | string                                    | year/month/date/dates/ week/datetime/datetimerange/daterange                                                                    | date                                                          |
| format            | 显示在输入框中的格式                                           | string                                    | 见[日期格式](#/zh-CN/component/date-picker#ri-qi-ge-shi)                                                                        | yyyy/MM/dd                                                    |
| align             | 面板对齐方式                                                   | string                                    | left, center, right                                                                                                             | left                                                          |
| popper-class      | DatePicker 下拉框的类名                                        | string                                    | —                                                                                                                               | —                                                             |
| picker-options    | 当前时间日期选择器特有的选项参考下表                           | object                                    | —                                                                                                                               | {}                                                            |
| range-separator   | 选择范围时的分隔符                                             | string                                    | —                                                                                                                               | '-'                                                           |
| default-value     | 可选，选择器打开时默认显示的时间                               | Date                                      | 可被`new Date()`解析                                                                                                            | —                                                             |
| default-time      | 范围选择时选中日期所使用的当日内具体时刻                       | string\[]                                 | 数组，长度为 2，每项值为字符串，形如`12:00:00`，第一项指定开始日期的时刻，第二项指定结束日期的时刻，不指定会使用时刻 `00:00:00` | '00:00:00'                                                    |
| value-format      | 可选，绑定值的格式。不指定则绑定值为 Date 对象                 | string                                    | 见[日期格式](#/zh-CN/component/date-picker#ri-qi-ge-shi)                                                                        | —                                                             |
| name              | 原生属性                                                       | string                                    | —                                                                                                                               | —                                                             |
| prefix-icon       | 自定义日期图标的类名                                           | string                                    | —                                                                                                                               | —                                                             |
| clear-icon        | 自定义清空图标的类名                                           | string                                    | —                                                                                                                               | —                                                             |
| validate-event    | 输入时是否触发表单的校验                                       | boolean                                   | —                                                                                                                               | true                                                          |
| unlink            | 选择时间是否与输入框联动，非联动条件最终值以确认或快捷按钮为准 | boolean                                   | -                                                                                                                               | default: true <br /> type 为 ['year', 'month', 'time']: false |
| unlink-panels     | 在范围选择器里取消两个日期面板之间的联动                       | boolean                                   | —                                                                                                                               | true                                                          |
| unlink-range      | range 模式是否取消关联开始时间与结束时间                       | boolean                                   | —                                                                                                                               | true                                                          |
| calendar-type     | 国际日历的特殊格式,目前支持佛历 th(泰历)和尼泊尔日历 np        | string                                    | th/np                                                                                                                           | ""                                                            |

### Picker Options

| 参数                                    | 说明                                                                                                                     | 类型                           | 可选值 | 默认值   |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------ | ------ | -------- |
| shortcuts                               | 设置快捷选项，需要传入 { text, onClick } 对象用法参考 demo 或下表                                                        | Object\[]                      | —      | —        |
| disabledDate                            | 设置禁用状态，参数为当前日期，要求返回 Boolean                                                                           | Function                       | —      | —        |
| selectableRange                         | 可选时间段，例如`'18:30:00 - 20:30:00'`或者传入数组`['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']`, 暂不支持`range`模式 | string / array                 | —      | —        |
| firstDayOfWeek                          | 周起始日                                                                                                                 | Number                         | 1 到 7 | 1        |
| onPick                                  | 选中日期后会执行的回调，只有当 `daterange` 或 `datetimerange` 才生效                                                     | Function({ maxDate, minDate }) | —      | —        |
| customValidation                        | 日期范围的自定义校验方法，参数为开始日期和结束日期，要求返回 Boolean，返回值为 true 时表示通过验证                       | Function(minDate, maxDate)     | —      | —        |
| customPrompt                            | 日期范围的自定义校验方法不通过时对应的提示语句                                                                           | String                         | —      | —        |
| dateClassRender<Badge text="2.29.0+" /> | 根据时间加入自定义样式{ time }                                                                                           | Function                       | —      | () => {} |

### Shortcuts

| 参数    | 说明                                                                                                  | 类型     | 可选值 | 默认值 |
| ------- | ----------------------------------------------------------------------------------------------------- | -------- | ------ | ------ |
| text    | 标题文本                                                                                              | string   | —      | —      |
| onClick | 选中后的回调函数，参数是 vm，可通过触发 'pick' 事件设置选择器的值。例如 vm.\$emit('pick', new Date()) | function | —      | —      |

### Events

| 事件名称 | 返回值                                                                 | 说明                    |
| -------- | ---------------------------------------------------------------------- | ----------------------- |
| change   | 组件绑定值（受 `value-format` 控制），输入框显示值（受 `format` 控制） | 面板选定值和显示值不同时触发    |
| input    | 组件绑定值（受 `value-format` 控制），输入框显示值（受 `format` 控制） | 输入框值改变触发        |
| blur     | 组件绑定值（受 `value-format` 控制），输入框显示值（受 `format` 控制） | 当 input 失去焦点时触发 |
| focus    | 组件绑定值（受 `value-format` 控制），输入框显示值（受 `format` 控制） | 当 input 获得焦点时触发 |

### Instance.\$emit

> picker.\$emit('pick', date, visible, changeInput);

| 参数        | 说明                          | 默认值 |
| ----------- | ----------------------------- | ------ |
| date        | 自定义事件，`range`模式为数组 | —      |
| visible     | 是否显示面板                  | false  |
| changeInput | 是否改变输入框值              | false  |

### Methods

| 方法名 | 说明              | 参数 |
| ------ | ----------------- | ---- |
| focus  | 使 input 获取焦点 | —    |

### Slots <Badge text="Beta 2.10.0+" />

| 插槽名称 | 说明       | slot-scope                                      |
| -------- | ---------- | ----------------------------------------------- |
| year     | 年面板插槽 | 'value', 'date', 'type', 'disabled', 'selected' |
| month    | 月面板插槽 | 'value', 'date', 'type', 'disabled', 'selected' |
| date     | 日面板插槽 | 'value', 'date', 'type', 'disabled', 'selected' |

### SlotScope [slot='year|startYear|endYear']

| 参数     | 说明           | 类型    | 值                                                                                      |
| -------- | -------------- | ------- | --------------------------------------------------------------------------------------- |
| value    | 面板显示值     | string  | -                                                                                       |
| date     | 面板日期       | date    | -                                                                                       |
| type     | 面板类型       | string  | 'normal' 常规类型，'today' 当前年，'prev-year' 前一个月补全年，'next-year' 下一年补全年 |
| disabled | 当前项是否禁用 | boolean | -                                                                                       |
| selected | 当前项是否选中 | boolean | -                                                                                       |

### SlotScope [slot='month|startMonth|endMonth']

| 参数     | 说明           | 类型    | 值                                |
| -------- | -------------- | ------- | --------------------------------- |
| value    | 面板显示值     | string  | -                                 |
| date     | 面板日期       | date    | -                                 |
| type     | 面板类型       | string  | 'normal' 常规类型，'today' 当前月 |
| disabled | 当前项是否禁用 | boolean | -                                 |
| selected | 当前项是否选中 | boolean | -                                 |

### SlotScope [slot='date|startDate|endDate']

| 参数     | 说明           | 类型    | 值                                                                                        |
| -------- | -------------- | ------- | ----------------------------------------------------------------------------------------- |
| value    | 面板显示值     | string  | -                                                                                         |
| date     | 面板日期       | date    | -                                                                                         |
| type     | 面板类型       | string  | 'normal' 常规类型，'today' 当前日，'prev-month' 前一个月补全日，'next-month' 下一年补全日 |
| disabled | 当前项是否禁用 | boolean | -                                                                                         |
| selected | 当前项是否选中 | boolean | -                                                                                         |
