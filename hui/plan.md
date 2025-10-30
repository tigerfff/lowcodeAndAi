# Plan 计划模板

<template>
  <author-info
    :version="versions['plan']"
    author="陈冠彬"
    ux="潘虹帆"
    ui="应源山"
    standard="http://10.33.43.73/huidesign/project/issues/57"
    reviewed
  />
</template>

## 安装

```bash
$ npm i @hui-pro/plan -D
# 或者
$ yarn add @hui-pro/plan --dev
```

## 引入

```js
// main.js
import plan from '@hui-pro/plan';
import './assets/index.scss';
Vue.use(plan);
```

```scss
// assets/index.scss
$--plan-font-path: '~@hui-pro/plan/theme/fonts';
@import '~@hui-pro/plan/theme/index.scss';
```

## 时间段模板

<template>
  <code-box title="时间段模板" description="可设定多种类型的计划，以颜色区分，样式可自定义">
    <div class="toolbar">
      <div class="pull-left page-plan-options">
        <el-radio-group v-model="currentPlanType">
          <el-radio-button :label="1">
            <i class="page-plan-flag"></i>
            <span>事件1</span>
          </el-radio-button>
          <el-radio-button :label="2">
            <i class="page-plan-flag range-color2"></i>
            <span>事件2</span>
          </el-radio-button>
        </el-radio-group>
      </div>
      <div class="pull-right">
        <el-button icon="h-icon-delete" @click="handleClear">清空</el-button>
      </div>
    </div>
    <h-plan-group label-width="80px" action-width="48px">
      <h-plan
        v-for="(value,index) in rangeData"
        :key="index"
        :current-type="currentPlanType"
        :custom-range-color="customRangeColor"
        v-model="rangeData[index]"
        @mouseenter="handleMouseEnter(index)"
        @timeerror="timeError"
        :step="1"
      >
        <span slot="label">{{week[index]}}</span>
        <el-popover slot="action" :ref="'popover'+index" placement="left" title="复制到" popper-class="page-plan-popover" trigger="click"
          @show="handlePopShow" @hide="handlePopHide">
          <div>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="checkedDays" @change="handleCheckedDaysChange">
              <el-checkbox v-for="(day,n) in week" :disabled="n===index" :label="n" :key="day">{{day}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div style="text-align: right; margin: 0">
            <el-button type="text" size="mini" @click="handleCopyConfirm(index)">确定</el-button>
            <el-button type="text" size="mini" class="popover-cancel-btn" @click="closePopover(index)">取消</el-button>
          </div>
          <el-button :class="{'btn-plan-copy':true,'show':focus===index}" icon="h-icon-copy" slot="reference"></el-button>
        </el-popover>
      </h-plan>
    </h-plan-group>
  </code-box>
</template>

```html
<div class="toolbar">
  <div class="pull-left page-plan-options">
    <el-radio-group v-model="currentPlanType">
      <el-radio-button :label="1">
        <i class="page-plan-flag"></i>
        <span>事件1</span>
      </el-radio-button>
      <el-radio-button :label="2">
        <i class="page-plan-flag range-color2"></i>
        <span>事件2</span>
      </el-radio-button>
    </el-radio-group>
  </div>
  <div class="pull-right">
    <el-button icon="h-icon-delete" @click="handleClear">清空</el-button>
  </div>
</div>
<h-plan-group label-width="80px" action-width="48px">
  <h-plan
    v-for="(value,index) in rangeData"
    :key="index"
    :current-type="currentPlanType"
    :custom-range-color="customRangeColor"
    v-model="rangeData[index]"
    @mouseenter="handleMouseEnter(index)"
    @timeerror="timeError"
    :step="1"
  >
    <span slot="label">{{week[index]}}</span>
    <!-- 复制功能 -->
    <el-popover
      slot="action"
      :ref="'popover'+index"
      placement="left"
      title="复制到"
      popper-class="page-plan-popover"
      trigger="click"
      @show="handlePopShow"
      @hide="handlePopHide"
    >
      <div>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
        <el-checkbox-group
          v-model="checkedDays"
          @change="handleCheckedDaysChange"
        >
          <el-checkbox
            v-for="(day,n) in week"
            :disabled="n===index"
            :label="n"
            :key="day"
          >
            {{day}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div style="text-align: right; margin: 0">
        <el-button type="text" size="mini" @click="handleCopyConfirm(index)">
          确定
        </el-button>
        <el-button
          type="text"
          size="mini"
          class="popover-cancel-btn"
          @click="closePopover(index)"
        >
          取消
        </el-button>
      </div>
      <el-button
        :class="{'btn-plan-copy':true,'show':focus===index}"
        icon="h-icon-copy"
        slot="reference"
      ></el-button>
    </el-popover>
  </h-plan>
</h-plan-group>

<script>
  const week = [
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
    '星期日'
  ];
  export default {
    data() {
      return {
        week: week,
        checkedDays: [],
        currentPlanType: 1,
        rangeData: [
          [{ type: 1, from: 900, to: 86399 }],
          [
            { type: 2, from: 28800, to: 46800 },
            { type: 2, from: 72000, to: 78300 }
          ],
          [{ type: 1, from: 18000, to: 36000 }],
          [{ type: 1, from: 36900, to: 45000 }],
          [{ type: 2, from: 27000, to: 45000 }],
          [{ type: 1, from: 72000, to: 78300 }],
          [{ type: 1, from: 28800, to: 46800 }]
        ],
        customRangeColor: {
          '1': '#3d6ce5',
          '2': '#f8ab7c'
        },
        focus: 0,
        isPopoverShow: false,
        checkAll: false,
        isIndeterminate: false
      };
    },
    methods: {
      handleClear() {
        this.rangeData = this.rangeData.map(item => {
          return [];
        });
      },
      handlePopShow() {
        this.isPopoverShow = true;
      },
      handlePopHide() {
        this.checkAll = false;
        this.checkedDays = [];
        this.isIndeterminate = false;
        this.isPopoverShow = false;
      },
      handleMouseEnter(index) {
        if (!this.isPopoverShow) {
          this.focus = index;
        }
      },
      closePopover(index) {
        this.$refs['popover' + index][0].doClose();
      },
      handleCopyConfirm(index) {
        const currentData = this.rangeData[index];
        this.checkedDays.forEach(val => {
          this.$set(
            this.rangeData,
            val,
            JSON.parse(JSON.stringify(currentData))
          );
        });
        this.closePopover(index);
      },
      handleCheckAllChange(checked) {
        this.checkedDays = checked ? [0, 1, 2, 3, 4, 5, 6] : [];
        this.isIndeterminate = false;
      },
      handleCheckedDaysChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.week.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.week.length;
      },
      timeError() {
        console.error('timeError');
      }
    }
  };
</script>
```

## 禁用状态

<template>
  <code-box title="禁用状态" description="纯展示，不可编辑">
    <h-plan-group label-width="80px" :disabled="true">
      <h-plan v-for="(value,index) in disabledData" :key="index" :custom-range-color="customRangeColor" v-model="disabledData[index]">
        <span slot="label">{{week[index]}}</span>
      </h-plan>
    </h-plan-group>
  </code-box>
</template>

```html
<h-plan-group label-width="80px" :disabled="true">
  <h-plan
    v-for="(value,index) in disabledData"
    :key="index"
    :custom-range-color="customRangeColor"
    v-model="disabledData[index]"
  >
    <span slot="label">{{week[index]}}</span>
  </h-plan>
</h-plan-group>

<script>
  const week = [
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
    '星期日'
  ];
  export default {
    data() {
      return {
        week: week,
        disabledData: [
          [{ type: 1, from: 900, to: 86399 }],
          [
            { type: 2, from: 28800, to: 46800 },
            { type: 2, from: 72000, to: 78300 }
          ],
          [{ type: 1, from: 18000, to: 36000 }],
          [{ type: 1, from: 36900, to: 45000 }],
          [{ type: 2, from: 27000, to: 45000 }],
          [{ type: 1, from: 72000, to: 78300 }],
          [{ type: 1, from: 28800, to: 46800 }]
        ],
        customRangeColor: {
          '1': '#3d6ce5',
          '2': '#f8ab7c'
        }
      };
    }
  };
</script>
```

## 时间点模板

<template>
  <code-box title="时间点模板" description="和时间段模板不同，时间点模板响应用户点击，在时间模板上生成时间点">
    <div class="toolbar">
      <div class="pull-left page-plan-options">
        <el-radio-group v-model="currentPlanType">
          <el-radio-button :label="1">
            <i class="page-plan-flag"></i>
            <span>事件1</span>
          </el-radio-button>
          <el-radio-button :label="2">
            <i class="page-plan-flag range-color2"></i>
            <span>事件2</span>
          </el-radio-button>
        </el-radio-group>
      </div>
      <div class="pull-right">
        <el-button icon="h-icon-delete" @click="handleClearPoint">清空</el-button>
      </div>
    </div>
    <h-plan-group label-width="80px" type="point">
      <h-plan
        v-for="(value,index) in pointData"
        :key="index"
        :current-type="currentPlanType"
        :custom-range-color="customRangeColor"
        v-model="pointData[index]"
      >
        <span slot="label">{{week[index]}}</span>
      </h-plan>
    </h-plan-group>
  </code-box>
</template>

```html
<div class="toolbar">
  <div class="pull-left page-plan-options">
    <el-radio-group v-model="currentPlanType">
      <el-radio-button :label="1">
        <i class="page-plan-flag"></i>
        <span>事件1</span>
      </el-radio-button>
      <el-radio-button :label="2">
        <i class="page-plan-flag range-color2"></i>
        <span>事件2</span>
      </el-radio-button>
    </el-radio-group>
  </div>
  <div class="pull-right">
    <el-button icon="h-icon-delete" @click="handleClearPoint">清空</el-button>
  </div>
</div>
<h-plan-group label-width="80px" type="point">
  <h-plan
    v-for="(value,index) in pointData"
    :key="index"
    :current-type="currentPlanType"
    :custom-range-color="customRangeColor"
    v-model="pointData[index]"
  >
    <span slot="label">{{week[index]}}</span>
  </h-plan>
</h-plan-group>

<script>
  const week = [
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
    '星期日'
  ];
  export default {
    data() {
      return {
        week: week,
        currentPlanType: 1,
        pointData: [
          [{ type: 1, point: 900 }],
          [{ type: 2, point: 28800 }, { type: 2, point: 72000 }],
          [{ type: 1, point: 18000 }],
          [{ type: 1, point: 36900 }],
          [{ type: 2, point: 27000 }],
          [{ type: 1, point: 72000 }],
          [{ type: 1, point: 28800 }]
        ],
        customRangeColor: {
          '1': '#3d6ce5',
          '2': '#f8ab7c'
        }
      };
    },
    methods: {
      handleClearPoint() {
        this.pointData = this.rangeData.map(item => {
          return [];
        });
      }
    }
  };
</script>
```

<script>
  const versions = require('docs/.vuepress/src/version.json');
  const week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
  export default {
    data () {
      return {
        versions,
        week: week,
        checkedDays: [],
        currentPlanType: 1,
        rangeData: [
          [{ type: 1, from: 900, to: 86399 }],
          [{ type: 2, from: 28800, to: 46800 }, { type: 2, from: 72000, to: 78300 }],
          [{ type: 1, from: 18000, to: 36000 }],
          [{ type: 1, from: 36900, to: 45000 }],
          [{ type: 2, from: 27000, to: 45000 }],
          [{ type: 1, from: 72000, to: 78300 }],
          [{ type: 1, from: 28800, to: 46800 }]
        ],
        disabledData: [
          [{ type: 1, from: 900, to: 86399 }],
          [{ type: 2, from: 28800, to: 46800 }, { type: 2, from: 72000, to: 78300 }],
          [{ type: 1, from: 18000, to: 36000 }],
          [{ type: 1, from: 36900, to: 45000 }],
          [{ type: 2, from: 27000, to: 45000 }],
          [{ type: 1, from: 72000, to: 78300 }],
          [{ type: 1, from: 28800, to: 46800 }]
        ],
        pointData:[
          [{ type: 1, point: 900 }],
          [{ type: 2, point: 28800 }, { type: 2, point: 72000 }],
          [{ type: 1, point: 18000 }],
          [{ type: 1, point: 36900 }],
          [{ type: 2, point: 27000 }],
          [{ type: 1, point: 72000 }],
          [{ type: 1, point: 28800 }]
        ],
        customRangeColor: {
          '1': '#3d6ce5',
          '2': '#f8ab7c'
        },
        focus: 0,
        isPopoverShow: false,
        checkAll: false,
        isIndeterminate: false
      }
    },
    watch: {
      rangeData (data) {
        // for (let d of data[0]) {
        //   console.log('from: ' + d.from)
        //   console.log('to: ' + d.to)
        // }
      }
    },
    methods:{
      handleClear () {
        this.rangeData = this.rangeData.map(item => {
          return []
        })
      },
      handleClearPoint () {
        this.pointData = this.rangeData.map(item => {
          return []
        })
      },
      handlePopShow () {
        this.isPopoverShow = true
      },
      handlePopHide () {
        this.checkAll = false
        this.checkedDays = []
        this.isIndeterminate = false
        this.isPopoverShow = false
      },
      handleMouseEnter (index) {
        if (!this.isPopoverShow) {
          this.focus = index
        }
      },
      handleFocus(index){
        console.log('handleFocus')
        console.log(index)
      },
      closePopover (index) {
        this.$refs['popover' + index][0].doClose()
      },
      handleCopyConfirm (index) {
        const currentData = this.rangeData[index]
        this.checkedDays.forEach(val => {
          this.$set(this.rangeData, val, JSON.parse(JSON.stringify(currentData)))
        })
        this.closePopover(index)
      },
      handleCheckAllChange (checked) {
        this.checkedDays = checked ? [0, 1, 2, 3, 4, 5, 6] : []
        this.isIndeterminate = false
      },
      handleCheckedDaysChange (value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.week.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.week.length
      },
      timeError(){
        console.error("timeError")
      }
    },
    mounted () {
    }
  }
</script>

<style lang="scss">
  .demo-plan {
    .toolbar{
      margin-bottom: 20px;
    }

    .toolbar:after {
      display: table;
      content: '';
      clear: both;
    }
    .pull-left{
      float:left;
    }

    .pull-right{
      float:right;
    }

    .plan-group>li {
      position: relative;
      padding-left: 80px;
      padding-right: 60px;
    }

    .plan-group>li>label {
      position: absolute;
      left: 0;
      line-height: 40px;
    }

    .btn-plan-copy {
      display: none;
    }

    .btn-plan-copy.show {
      display: inline-block;
    }

    .h-plan-range.range-color2,
    .page-plan-flag.range-color2 {
      background-color: #F8AB7C;
    }

    .page-plan-options {
      float: left;
    }
    .page-plan-options .el-radio-button__inner {
      min-width: 96px;
      border-color: #ddd;
    }
    .page-plan-options .el-radio-button__orig-radio:checked+.el-radio-button__inner {
      color: #666;
      background-color: #f2f2f2;
      border-color: #ddd;
      box-shadow: none;
    }
    .page-plan-options .el-radio-button__inner:hover {
      color: #666;
    }

    .page-plan-flag {
      position: relative;
      top: 1px;
      display: inline-block;
      width: 11px;
      height: 11px;
      margin-right: 6px;
      border-radius: 100%;
      background-color: #3d6ce5;
    }
  }

  .page-plan-popover {
    width: 344px;
    padding: 16px;
  }
  .page-plan-popover .el-popover__title {
    margin-bottom: 16px;
  }
  .page-plan-popover .el-checkbox {
    margin: 0 15px 5px 0 !important;
  }
  .page-plan-popover .popover-cancel-btn {
    color: #4c4c4c;
  }
  .page-plan-popover .popover-cancel-btn:hover {
    color: #666;
  }
</style>

## API

### Plan-group Attributes

| 参数                                | 说明                                               | 类型          | 可选值          | 默认值  |
| ----------------------------------- | -------------------------------------------------- | ------------- | --------------- | ------- |
| type                                | 计划模板类型，分为时间段和时间点                   | string        | 'range'/'point' | 'range' |
| disabled                            | 是否禁用整个模板控件，设置为 true 则禁用所有模板项 | boolean       | —               | false   |
| action-width                        | 右侧操作栏宽度                                     | string        | —               | —       |
| label-width                         | 左侧标签宽度                                       | string        | —               | —       |
| fit                                 | 宽度是否自适应                                     | boolean       | —               | true    |
| max-height <Badge text="1.10.0+" /> | 最大高度，设置后会自动加载滚动条控件               | string/number | —               | -       |
| timepicker-unlink <Badge text="1.12.1+" /> | HUI 时间选择器 unlink 属性，设为 true 后时间选择控件将显示确认按钮，最终时间以点击确认按钮为准 | boolean | — | false |

### Plan Attributes

| 参数               | 说明                                                 | 类型    | 可选值 | 默认值 |
| ------------------ | ---------------------------------------------------- | ------- | ------ | ------ |
| label-width        | 左侧标签宽度                                         | string  | —      | —      |
| action-width       | 右侧操作栏宽度                                       | string  | —      | —      |
| disabled           | 是否禁用单个模板项                                   | boolean | —      | false  |
| step               | 步长,单位分钟                                        | number  | —      | 15     |
| value(v-model)     | 计划数据，最大值为 86399（23:59:59）                 | array   | —      | —      |
| custom-range-class | 多类型样式映射（建议使用 custom-range-color 来替代） | object  | —      | —      |
| custom-range-color | 多类型样式映射，直接写样式，不需要写类               | object  | —      | —      |
| show-popover       | 是否显示滑块浮层                                     | boolean | —      | true   |
| show-tooltip       | 是否显示滑块 tooltip                                 | boolean | —      | true   |
| max-range-count    | 时间轴最多可绘制的时间段数量                         | number  | —      | —      |
| popper-class <Badge text="2.0.0-beta.5+" />  | 弹出框样式类                                         | string  | —      | —      |

### Plan-group Slots

| 名称   | 说明                    |
| ------ | ----------------------- |
| label  | 顶部左侧 slot，可做表头 |
| action | 顶部右侧 slot，可做表头 |

### Plan Slots

| 名称   | 说明                      |
| ------ | ------------------------- |
| label  | 顶部左侧 slot，可做表内容 |
| action | 顶部右侧 slot，可做表内容 |
| popover | 弹出栏自定义内容 |
| popover-prefix <Badge text="2.0.0-beta.5+" /> | 弹出栏时间选择之前的自定义内容 |
| popover-suffix <Badge text="2.0.0-beta.5+" /> | 弹出栏时间选择之后的自定义内容 |
| popover-disabled <Badge text="2.0.0-beta.5+" /> | 禁用计划模板时，弹出栏自定义内容 |

### Plan-group Event

| 参数      | 说明                                         | 参数 |
| --------- | -------------------------------------------- | ---- |
| timeerror | 选择时间错误，一般是时间段的时间前面大于后面 | -    |

### Plan Event

| 参数  | 说明     | 参数                     |
| ----- | -------- | ------------------------ |
| focus | 选中事件 | 返回当前行的第几个时间轴 |
