# HolidayPicker 节假日设置

<template>
  <author-info
    :version="versions['holiday-picker']"
    author="姜炎6"
    ux="苗任越"
    ui="江佳欢"
    standard="http://10.33.43.73/BBG_UED/BUI_Design/bscs/v2.0/issues/24"
    reviewed
  />
</template>

## 安装

```bash
$ npm i @hui-pro/holiday-picker -D
# 或者
$ yarn add @hui-pro/holiday-picker --dev
```

## 引入

```js
// main.js
import holidayPicker from '@hui-pro/holiday-picker';
import '@hui-pro/holiday-picker/theme/index.scss';
Vue.use(holidayPicker);
```

## 基础用法

<template>
  <code-box title="基础用法" description="直接引入h-holiday-picker控件，然后通过holidayList属性传入当前节假日信息，可以加上.sync修饰符实现节假日信息的双向绑定。">
    <h-holiday-picker :holidayList.sync="currentHolidayList" @dateClick="dateClickHandler" @dateChange="dateChangeHandler" @calendarChange="calendarChangeHandler">
    </h-holiday-picker>
  </code-box>
</template>

```html
<h-holiday-picker
  :holidayList.sync="currentHolidayList"
  @dateClick="dateClickHandler"
  @dateChange="dateChangeHandler"
></h-holiday-picker>

<script>
  export default {
    name: 'holiday-picker-page',
    data() {
      return {
        currentHolidayList: ['2019-03-05']
      };
    },
    methods: {
      dateClickHandler({ dateItem, holidayList }) {
        console.log(dateItem);
        console.log(holidayList);
      },
      currentDateChangeHandler(holidayList) {
        console.log(holidayList);
      }
    }
  };
</script>
```

## 自定义内容

<template>
  <code-box title="自定义内容" description="通过scope-slot传入自定义的内容，可以根据实际场景灵活变化表格中的内容。">
    <h-holiday-picker :holidayList.sync="currentHolidayList2">
      <template slot-scope="scope">
        <div class="date-info">
          <!-- 日期信息 -->
          <span class="custom-date">
            自定义内容<br>
            阴历：{{ scope.item && scope.item.lunarDate.fmtStr }}<br>
            阳历：{{ scope.item && scope.item.date.getDate() }}
          </span>
        </div>
        <div class="festival-info">
          <!-- 节假日信息 -->
          <span class="festival">
            {{
              scope.item && (scope.item.lunarDate.festival || scope.item.lunarDate.Term)
            }}
          </span>
        </div>
        <div class="status">
          <!-- 当前状态信息 -->
          <span v-if="scope.item.isHoliday">自定义已选中</span>
          <span v-else>自定义未选中</span>
        </div>
      </template>
    </h-holiday-picker>
  </code-box>
</template>

```html
<h-holiday-picker :holidayList.sync="currentHolidayList2">
  <template slot-scope="scope">
    <div class="date-info">
      <!-- 日期信息 -->
      <span class="custom-date">
        自定义内容
        <br />
        阴历：{{ scope.item && scope.item.lunarDate.fmtStr }}
        <br />
        阳历：{{ scope.item && scope.item.date.getDate() }}
      </span>
    </div>
    <div class="festival-info">
      <!-- 节假日信息 -->
      <span class="festival">
        {{ scope.item && (scope.item.lunarDate.festival ||
        scope.item.lunarDate.Term) }}
      </span>
    </div>
    <div class="status">
      <!-- 当前状态信息 -->
      <span v-if="scope.item.isHoliday">自定义已选中</span>
      <span v-else>自定义未选中</span>
    </div>
  </template>
</h-holiday-picker>
<script>
  export default {
    name: 'holiday-picker-page',
    data() {
      return {
        currentHolidayList2: []
      };
    }
  };
</script>
```

<script>
  const versions = require('docs/.vuepress/src/version.json');
  export default {
    name: 'holiday-picker-page',
    data () {
      const year = new Date().getFullYear()
      const month = new Date().getMonth() + 1 > 10 ? new Date().getMonth() + 1 : `0${new Date().getMonth() + 1}`
      const date = new Date().getDate() > 10 ? new Date().getDate() - 1 : `0${new Date().getDate() - 1}`
      const currentDate = `${year}-${month}-${date}`
      return {
        versions,
        currentHolidayList: [currentDate],
        currentHolidayList2: []
      }
    },
    computed: {
      pickerOptions() {
        return {
          disabledDate(time) {
            return (
              time.getTime() > new Date(2029, 11, 31) ||
              time.getTime() < new Date(2019, 0, 1)
            );
          }
        };
      }
    },
    methods: {
      dateClickHandler ({dateItem, holidayList}) {
        console.log(dateItem)
        // console.log(holidayList)
      },
      dateChangeHandler (holidayList) {
        // console.log(holidayList)
      },
      calendarChangeHandler (currentYear, currentMonth) {
        console.log(currentYear)
        console.log(currentMonth)
      }
    }
  }
</script>

## API

### Attributes

| 参数              | 说明                                   | 类型                    | 可选值         | 默认值                                                 |
| ----------------- | -------------------------------------- | ----------------------- | -------------- | ------------------------------------------------------ |
| holiday-list      | 传入节假日列表，可用.sync 实现双向绑定 | Array&lt;YYYY-MM-DD&gt; | -              | []                                                     |
| first-day-of-week | 周起始日                               | Number                  | 1-7(周一~周日) | 7                                                      |
| text              | 日历选中时显示的文本                   | String                  | -              | '休'（注意，如果使用了 slot 自定义内容，此属性无效。） |
| readonly          | 是否只读模式(只读模式不能选中日期)     | Boolean                 | true/false     | false                                                  |
| cell-height       | 日历单元格高度                         | Number                  | 单位是 px      | 111（这里建议最小就是 80，再小会影响样式了）           |
| defaultCurrentYear       | 日历默认当前年份，只用于初始化，后续不会监听变化                         | Number                  | 1970-2199      | 当前年份           |
| defaultCurrentMonth       | 日历默认当前月份，只用于初始化，后续不会监听变化                         | Number                  | 0-11      | 当前月份           |
| picker-options<Badge text="请确保hui版本不低于2.6.3" />       | 对日期的可选范围限制，会同时作用在表格上方的年月两个选择器，用法与hui的datePicker控件一致。（其实不仅是picker-options，datePicker的其他属性也可以声明使用，并且会同时作用在表格上方的年月控件上，因为统一用v-bind和v-on透传了配置和事件。但是只有picker-options经过测试，是稳定可用的，使用其他属性请自行保证控件的可用性）                         | Function                  | -      | 1900.1.1-2100.11.31           |

### events

| 事件名         | 说明                                             | 参数                                                               |
| -------------- | ------------------------------------------------ | ------------------------------------------------------------------ |
| dateClick      | 当某一天被点击时抛出该事件                       | ({dateItem, holidayList}),被点击的日期的信息和当前选中的节假日列表 |
| dateChange     | 当拖动多选时，每次选中日期发生变化都会抛出该事件 | (holidayList),当前状态下，选中的节假日列表                         |
| calendarChange | 当日期控件切换日期时，会抛出该事件               | (currentYear, currentMonth),当前日期对应的年、月                   |

### dateItem 属性

| 属性名           | 说明                                                          | 类型    |
| ---------------- | ------------------------------------------------------------- | ------- |
| date             | 被点击日期 0 点的标准时间对象                                 | Date    |
| isCurrentMonth   | 被点击日期是否在当前月份                                      | Boolean |
| isFirstLunarDate | 被点击日期是否阴历第一天                                      | Boolean |
| isHoliday        | 被点击日期是否被设置为节假日                                  | Boolean |
| isNextMonth      | 被点击日期是否在下个月（阳历）                                | Boolean |
| isPrevMonth      | 被点击日期是否在上个月（阳历）                                | Boolean |
| isToday          | 被点击日期是否是当日                                          | Boolean |
| lunarDate        | 被点击日期的阴历日期对象，详细属性见下表                      | Object  |
| solarDateStr     | 被点击日期的格式化显示（YYYY-MM-D），注意，这里的日不是双位的 | String  |

### lunarDate 属性

| 属性名   | 说明             | 类型   |
| -------- | ---------------- | ------ |
| Animal   | 当前阴历年的生肖 | String |
| IDayCn   | 当前阴历日的写法 | String |
| IMonthCn | 当前阴历月的写法 | String |
| Term     | 当前节气         | String |
| festival | 当前节日         | String |

### slots

| 插槽名称                        | 类型       | 说明                                                                                                                                                                                                  |
| ------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default <Badge text="1.5.1+" /> | slot-scope | 可以通过 slot-scope="scope"默认插槽自定义日历中每个单元格的内容，同时可以获取当前 item 的各项属性值，数据结构与 dateItem 属性一致，属性访问方式举例：scope.item.date。详细用法查看自定义内容的 demo。 |

::: tip

1.4.1 ~ 1.5.0 之间的版本，插槽只能自定义选中状态部分；1.5.1 之后修改为插槽自定义整个日期单元格内的内容。

:::
