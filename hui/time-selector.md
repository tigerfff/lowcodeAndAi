# TimeSelector 时间选择器

<template>
  <author-info
    :version="versions['time-selector']"
    author="唐丽萍6"
    ux="苗任越"
    ui="江佳欢"
    standard="http://10.33.43.73/BBG_UED/BUI_Design/bscs/v2.0/issues/7"
    reviewed
  />
</template>

## 安装

```bash
$ npm i @hui-pro/time-selector -D
# 或者
$ yarn add @hui-pro/time-selector --dev
```

## 引入
```js
import TimeSelector from '@hui-pro/time-selector';
import '@hui-pro/time-selector/theme/index.scss';
Vue.use(TimeSelector);
```
## 如果出现依赖控件有多语言不翻译问题时在项目中引入依赖控件
```js
import TimePicker from '@hui-pro/time-picker';
Vue.use(TimePicker);
import TimeQuarter from '@hui-pro/time-quarter';
Vue.use(TimeQuarter);
```

## 基础用法1
<template>
  <code-box title="正常的选择器" description="含颗粒度granularity-list颗粒度列表，granularity-type来控制颗粒度的只有自定义，还是月、季度、年和自定义都有颗粒度">
   <p>只有自定义含有颗粒度</p>
    <h-time-selector @change="change" v-model="time" :time-labels="timeLabels"
    :granularity-list="granularityList"></h-time-selector>
     <p>月、季度、年、自定义含有颗粒度</p>
    <h-time-selector v-model="time21" :time-labels="timeLabels"
    :granularity-list="granularityList"
    granularity-type="all"></h-time-selector>
  </code-box>
</template>

```html
<h-time-selector v-model="time" :time-labels="timeLabels"
    :granularity-list="granularityList"></h-time-selector>
<h-time-selector v-model="time21" :time-labels="timeLabels"
    :granularity-list="granularityList"
    granularity-type="all"></h-time-selector>

<script>
  export default {
    data() {
      return {
        time: {
          type: 'month',
          currentTime: '2019-03',
          granularity: '',
        },
        timeLabels: [
          {
            label: 'day',
            name: '日'
          },
          {
            label: 'week',
            name: '周'
          },
          {
            label: 'month',
            name: '月'
          },
          {
            label: 'quarter',
            name: '季'
          },
          {
            label: 'year',
            name: '年'
          },
          {
            label: 'custom',
            name: '自定义'
          }
        ],
        granularityList: [
          {
            type: 'dayly',
            value: 'dayly',
            name: '按日统计'
          },
          {
            type: 'weekly',
            value: 'weekly',
            name: '按周统计'
          },
          {
            type: 'monthly',
            value: 'monthly',
            name: '按月统计'
          },{
            type: 'quarterly',
            value: 'quarterly',
            name: '按季度统计'
          },{
            type: 'yearly',
            value: 'yearly',
            name: '按年统计'
          }
        ]
      }
    }
  }
</script>
```

## 基础用法2
<template>
  <code-box title="正常的选择器" description="无颗粒度">
    <h-time-selector v-model="time22" :time-labels="timeLabels">
    </h-time-selector>
  </code-box>
</template>

```html
<h-time-selector v-model="time22" :time-labels="timeLabels"></h-time-selector>

<script>
  export default {
    data() {
      return {
        time22: {
          type: 'day',
          currentTime: null,
          granularity: '',
        },
        timeLabels: [
          {
            label: 'day',
            name: '日'
          },
          {
            label: 'week',
            name: '周'
          },
          {
            label: 'month',
            name: '月'
          },
          {
            label: 'quarter',
            name: '季'
          },
          {
            label: 'year',
            name: '年'
          },
          {
            label: 'custom',
            name: '自定义'
          }
        ]
      }
    }
  }
  </script>
```

## 基础用法3
<template>
  <code-box title="显示快捷箭头" description="时间选择器前显示前（或后）一日/周/月/季/年按钮，只有复杂模式生效">
    <div style="margin-bottom: 10px;">
      <span>显示快捷箭头</span>
      <el-switch v-model="showQuickButton"/>
    </div>
    <h-time-selector v-model="time33" :time-labels="timeLabels" :show-quick-button="showQuickButton" :dayType="dayType">
    </h-time-selector>
  </code-box>
</template>

```html
<div style="margin-bottom: 10px;">
  <span>显示快捷箭头</span>
  <el-switch v-model="showQuickButton"/>
</div>
<h-time-selector v-model="time33" :time-labels="timeLabels" :show-quick-button="showQuickButton" :dayType="dayType"></h-time-selector>

<script>
  export default {
    data() {
      return {
        showQuickButton: true,
        dayType: 'accurate',
        time33: {
          type: 'day',
          currentTime: null,
          granularity: '',
        },
        timeLabels: [
          {
            label: 'day',
            name: '日'
          },
          {
            label: 'week',
            name: '周'
          },
          {
            label: 'month',
            name: '月'
          },
          {
            label: 'quarter',
            name: '季'
          },
          {
            label: 'year',
            name: '年'
          },
          {
            label: 'custom',
            name: '自定义'
          }
        ]
      }
    }
  }
  </script>
```

## 基础用法4,简单模式
<template>
  <code-box title="简单模式" description="通过设置type为simple">
    <h-time-selector @change="change"  v-model="time55" type="simple"
    :granularity-list="granularityList"
    :time-labels="simpleTimeLabels">
    </h-time-selector>
  </code-box>
</template>

```html
<h-time-selector v-model="time55" type="simple" :granularityList="granularityList" :time-labels="simpleTimeLabels">
</h-time-selector>

<script>
  export default {
    data() {
      return {
        time55: {
          type: 'today',
          currentTime: null
        },
        simpleTimeLabels: [
        {
          label: 'today',
          name: '今日'
        },
        {
          label: 'yesterday',
          name: '昨日'
        },
        {
          label: 'nearlySeven',
          name: '近7天'
        },
        {
          label: 'nearlythirty',
          name: '近30天'
        },
        {
          label: 'custom',
          name: '自定义'
        }
      ],
      granularityList: [
        {
          type: 'dayly',
          value: 'dayly',
          name: '按日统计'
        },
        {
          type: 'weekly',
          value: 'weekly',
          name: '按周统计'
        },
        {
          type: 'monthly',
          value: 'monthly',
          name: '按月统计'
        },{
          type: 'quarterly',
          value: 'quarterly',
          name: '按季度统计'
        },{
          type: 'yearly',
          value: 'yearly',
          name: '按年统计'
        }
      ]
      }
    }
  }
  </script>
```

## 插槽使用1
<template>
  <code-box title="插槽使用selectSlot" description="增加额外的type，需要关联下拉框,通过scope.type来控制显隐; handlerUpdateValue()可触发内部值发生变化">
    <h-time-selector ref="time2" v-model="time2" :time-labels="timeLabels2"
    :granularity-list="granularityList"
    :set-current-time="setCurrentTime2">
      <template slot="selectSlot" slot-scope="scope">
       <el-select v-model="special2" class="inner-select notime" v-show="scope.type === 'other'"
                 key="other">
        <el-option key="中秋"
                   label="中秋"
                   value="中秋">
        </el-option>
        <el-option key="国庆"
                   label="国庆"
                   value="国庆">
        </el-option>
      </el-select>
      </template>
    </h-time-selector>
  </code-box>
</template>

```html
<h-time-selector ref="time2" v-model="time2" :time-labels="timeLabels2"
    :granularity-list="granularityList"
    :set-current-time="setCurrentTime2">
      <template slot="selectSlot" slot-scope="scope">
       <el-select v-model="special2" class="inner-select notime"  v-show="scope.type === 'other'"
                 key="other">
        <el-option key="中秋"
                   label="中秋"
                   value="中秋">
        </el-option>
        <el-option key="国庆"
                   label="国庆"
                   value="国庆">
        </el-option>
      </el-select>
      </template>
    </h-time-selector>
<script>
export default {
    data() {
      return {
        time2: {
        type: 'day',
        currentTime: null,
        granularity: '',
      },
      special2: '中秋',
      timeLabels2: [
        {
          label: 'day',
          name: '日'
        },
        {
          label: 'week',
          name: '周'
        },
        {
          label: 'month',
          name: '月'
        },
        {
          label: 'quarter',
          name: '季'
        },
        {
          label: 'other',
          name: '特殊日'
        },
        {
          label: 'year',
          name: '年'
        },
        {
          label: 'custom',
          name: '自定义'
        }
      ],
      granularityList: [
        {
          type: 'dayly',
          value: 'dayly',
          name: '按日统计'
        },
        {
          type: 'weekly',
          value: 'weekly',
          name: '按周统计'
        },
        {
          type: 'monthly',
          value: 'monthly',
          name: '按月统计'
        },{
          type: 'quarterly',
          value: 'quarterly',
          name: '按季度统计'
        },{
          type: 'yearly',
          value: 'yearly',
          name: '按年统计'
        }
      ]
    }
  },
  watch: {
    time2(val) {
      console.log('time', val)
    },
    // special2是组件外部的参数，变化时，调用组件的更新数据方法
    special2 () {
      this.$refs.time2.handlerUpdateValue()
    }
  },
  methods: {
    setCurrentTime2 () {
      return {
        currentTime: this.special2,
        oter: '返回的请在watch的model中查看'
      }
    }
  }
}
</script>
```

## 插槽使用2
<template>
  <code-box title="插槽使用timeSlot和selectSlot插槽" description="增加额外的type，其他: 时间选择器 + 下拉">
    <h-time-selector ref="time3" v-model="time3" :time-labels="timeLabels3"
    :granularity-list="granularityList"
    :set-current-time="setCurrentTime3">
      <template slot="timeSlot" slot-scope="scope">
        <el-date-picker key="year2"
                        style="width:100%"
                        format="yyyy"
                        :editable="false"
                        :clearable="false"
                        v-show="scope.type === 'other'"
                        v-model="testyear"
                        type="year">
        </el-date-picker>
      </template>
      <template slot="selectSlot" slot-scope="scope">
       <el-select v-model="special3" class="inner-select notime" v-show="scope.type === 'other'"
                 key="ssss">
        <el-option key="中秋"
                   label="中秋"
                   value="中秋">
        </el-option>
        <el-option key="国庆"
                   label="国庆"
                   value="国庆">
        </el-option>
      </el-select>
      </template>
    </h-time-selector>
  </code-box>
</template>

```html
<h-time-selector ref="time3" v-model="time3" :time-labels="timeLabels3"
    :granularity-list="granularityList"
    :set-current-time="setCurrentTime3">
      <template slot="timeSlot" slot-scope="scope">
        <el-date-picker key="year2"
                        style="width:100%"
                        format="yyyy"
                        :editable="false"
                        :clearable="false"
                        v-show="scope.type === 'other'"
                        v-model="testyear"
                        type="year">
        </el-date-picker>
      </template>
      <template slot="selectSlot" slot-scope="scope">
       <el-select v-model="special3" class="inner-select notime" v-show="scope.type === 'other'"
                 key="ssss">
        <el-option key="中秋"
                   label="中秋"
                   value="中秋">
        </el-option>
        <el-option key="国庆"
                   label="国庆"
                   value="国庆">
        </el-option>
      </el-select>
      </template>
    </h-time-selector>
<script>
export default {
  data () {
    return {
      time3: {
        type: 'day',
        currentTime: null,
        granularity: '',
      },
      special3: '国庆',
      testyear: new Date(),
      timeLabels3: [
        {
          label: 'day',
          name: '日'
        },
        {
          label: 'week',
          name: '周'
        },
        {
          label: 'month',
          name: '月'
        },
        {
          label: 'quarter',
          name: '季'
        },
        {
          label: 'other',
          name: '特殊日'
        },
        {
          label: 'year',
          name: '年'
        },
        {
          label: 'custom',
          name: '自定义'
        }
      ],
      granularityList: [
        {
          type: 'dayly',
          value: 'dayly',
          name: '按日统计'
        },
        {
          type: 'weekly',
          value: 'weekly',
          name: '按周统计'
        },
        {
          type: 'monthly',
          value: 'monthly',
          name: '按月统计'
        },{
          type: 'quarterly',
          value: 'quarterly',
          name: '按季度统计'
        },{
          type: 'yearly',
          value: 'yearly',
          name: '按年统计'
        }
      ]
    }
  },
  watch: {
    time3(val) {
      console.log('time', val)
    },
    // special3和testyear是组件外部的参数，变化时，调用组件的更新数据方法
    special3 () {
      this.$refs.time3.handlerUpdateValue()
    },
    testyear () {
      this.$refs.time3.handlerUpdateValue()
    }
  },
  methods: {
    setCurrentTime3 () {
      // 返回值自己定义
      return {
        currentTime: this.special3,
        oter: '这个'
      }
    }
  }
}
</script>
```

## 复制时间选择器
<template>
  <code-box title="复制" description="可能会在弹窗中也使用时间选择器，且值与页面中的相同(复制第一个到第二个,仅仅是当前的选中值)">
    <h-time-selector v-model="time4" :time-labels="timeLabels"
    :granularity-list="granularityList"
    :dayType="dayType"></h-time-selector>
      <br/>
      <el-button @click="test" style="margin: 8px 0">复制</el-button>
      <br/>
    <h-time-selector v-model="time5" :time-labels="timeLabels"
    :granularity-list="granularityList"
    :dayType="dayType"></h-time-selector>
  </code-box>
</template>

```html
 <h-time-selector v-model="time4" :time-labels="timeLabels"
    :granularity-list="granularityList"
    :dayType="dayType"></h-time-selector>
      <br/>
      <el-button @click="test">复制</el-button>
      <br/>
    <h-time-selector v-model="time5" :time-labels="timeLabels"
    :granularity-list="granularityList"
    :dayType="dayType"></h-time-selector>
<script>
export default {
  data () {
    return {
      time4: {
        type: 'day',
        currentTime: null,
        granularity: '',
      },
      dayType: 'accurate',
      time5: {
        type: 'day',
        currentTime: null,
        granularity: '',
      },
      timeLabels: [
        {
          label: 'day',
          name: '日'
        },
        {
          label: 'week',
          name: '周'
        },
        {
          label: 'month',
          name: '月'
        },
        {
          label: 'quarter',
          name: '季'
        },
        {
          label: 'year',
          name: '年'
        },
        {
          label: 'custom',
          name: '自定义'
        }
      ],
      granularityList: [
        {
          type: 'dayly',
          value: 'dayly',
          name: '按日统计'
        },
        {
          type: 'weekly',
          value: 'weekly',
          name: '按周统计'
        },
        {
          type: 'monthly',
          value: 'monthly',
          name: '按月统计'
        },{
          type: 'quarterly',
          value: 'quarterly',
          name: '按季度统计'
        },{
          type: 'yearly',
          value: 'yearly',
          name: '按年统计'
        }
      ]
    }
  },
  methods: {
    test () {
      this.time5 = JSON.parse(JSON.stringify(this.time4))
    }
  }
}
</script>
```

## 日类型:精确到时分秒
<template>
  <code-box title="精确选择" description="精确选择到时分,时分秒设置accurateDayFormat">
    <h-time-selector v-model="time71" :time-labels="timeLabels"
    :granularity-list="granularityList"
    :day-type="dayType"
    :accurateDayFormat="accurateDayFormat2"></h-time-selector>
  </code-box>
</template>

```html
<h-time-selector v-model="time71" :time-labels="timeLabels"
    :granularity-list="granularityList"
    :day-type="dayType"
    :accurateDayFormat="accurateDayFormat2"></h-time-selector>
<script>
export default {
  data () {
    return {
      time71: {
        type: 'day',
        currentTime: null,
        granularity: '',
      },
      accurateDayFormat3: 'HH:mm',
      dayType: 'accurate',
      timeLabels: [
        {
          label: 'day',
          name: '日'
        },
        {
          label: 'week',
          name: '周'
        },
        {
          label: 'month',
          name: '月'
        },
        {
          label: 'quarter',
          name: '季'
        },
        {
          label: 'year',
          name: '年'
        },
        {
          label: 'custom',
          name: '自定义'
        }
      ],
      granularityList: [
        {
          type: 'dayly',
          value: 'dayly',
          name: '按日统计'
        },
        {
          type: 'weekly',
          value: 'weekly',
          name: '按周统计'
        },
        {
          type: 'monthly',
          value: 'monthly',
          name: '按月统计'
        },{
          type: 'quarterly',
          value: 'quarterly',
          name: '按季度统计'
        },{
          type: 'yearly',
          value: 'yearly',
          name: '按年统计'
        }
      ]
    }
  },
  watch: {
    time7(val) {
      console.log('time7', val)
    }
  },
  methods: {
  }
}
</script>
```

## 日类型:精确到时分
<template>
  <code-box title="精确选择" description="精确选择到时分,时分秒设置accurateDayFormat">
    <h-time-selector v-model="time7" :time-labels="timeLabels"
    :granularity-list="granularityList"
    :day-type="dayType"
    :accurateDayFormat="accurateDayFormat3"></h-time-selector>
  </code-box>
</template>

```html
<h-time-selector v-model="time7" :time-labels="timeLabels"
    :granularity-list="granularityList"
    :day-type="dayType"></h-time-selector>
<script>
export default {
  data () {
    return {
      time7: {
        type: 'day',
        currentTime: null,
        granularity: '',
      },
      accurateDayFormat3: 'HH:mm',
      dayType: 'accurate',
      timeLabels: [
        {
          label: 'day',
          name: '日'
        },
        {
          label: 'week',
          name: '周'
        },
        {
          label: 'month',
          name: '月'
        },
        {
          label: 'quarter',
          name: '季'
        },
        {
          label: 'year',
          name: '年'
        },
        {
          label: 'custom',
          name: '自定义'
        }
      ],
      granularityList: [
        {
          type: 'dayly',
          value: 'dayly',
          name: '按日统计'
        },
        {
          type: 'weekly',
          value: 'weekly',
          name: '按周统计'
        },
        {
          type: 'monthly',
          value: 'monthly',
          name: '按月统计'
        },{
          type: 'quarterly',
          value: 'quarterly',
          name: '按季度统计'
        },{
          type: 'yearly',
          value: 'yearly',
          name: '按年统计'
        }
      ]
    }
  },
  watch: {
    time7(val) {
      console.log('time7', val)
    }
  },
  methods: {
  }
}
</script>
```

## 日类型精确到时
<template>
  <code-box title="日的时间选择可精确到时" description="展示HH：00的显示">
    <h-time-selector v-model="time8" :time-labels="timeLabels"
    :granularity-list="granularityList"
    :day-type="dayType"
    :accurateDayFormat="accurateDayFormat"
    :default-time="defaultTime2"></h-time-selector>
  </code-box>
</template>

```html
<h-time-selector v-model="time8" :time-labels="timeLabels"
    :granularity-list="granularityList"
    :day-type="dayType"
    :accurateDayFormat="accurateDayFormat"
    :default-time="defaultTime2"></h-time-selector>
<script>
export default {
  data () {
    return {
      time8: {
        type: 'day',
        currentTime: null,
        granularity: '',
      },
      defaultTime2: {
        day: new Date(),
        week: new Date(),
        month: new Date(),
        year: new Date(),
        quarter: new Date(),
        custom: [new Date(), new Date()],
        dayAccurate: ['00:00', '23:00']
      },
      dayType: 'accurate',
      timeLabels: [
        {
          label: 'day',
          name: '日'
        },
        {
          label: 'week',
          name: '周'
        },
        {
          label: 'month',
          name: '月'
        },
        {
          label: 'quarter',
          name: '季'
        },
        {
          label: 'year',
          name: '年'
        },
        {
          label: 'custom',
          name: '自定义'
        }
      ],
      granularityList: [
        {
          type: 'dayly',
          value: 'dayly',
          name: '按日统计'
        },
        {
          type: 'weekly',
          value: 'weekly',
          name: '按周统计'
        },
        {
          type: 'monthly',
          value: 'monthly',
          name: '按月统计'
        },{
          type: 'quarterly',
          value: 'quarterly',
          name: '按季度统计'
        },{
          type: 'yearly',
          value: 'yearly',
          name: '按年统计'
        }
      ]
    }
  },
  watch: {
    time7(val) {
      console.log('time7', val)
    }
  },
  methods: {
  }
}
</script>
```

## 时间转换
<template>
  <code-box title="时间转换" description="changeCurrentTime():提供day,month,year时间转换（v-mode中都是字符串）转换后为数组">
    <h-time-selector ref="time9" v-model="time9" :time-labels="timeLabels"
    :granularity-list="granularityList"></h-time-selector>
  </code-box>
</template>

```html
<h-time-selector ref="time9" v-model="time9" :time-labels="timeLabels"
    :granularity-list="granularityList"></h-time-selector>
<script>
export default {
  data () {
    return {
      time8: {
        type: 'day',
        currentTime: null,
        granularity: '',
      },
      time9: {
        type: 'day',
        currentTime: null,
        granularity: '',
      },
      timeLabels: [
        {
          label: 'day',
          name: '日'
        },
        {
          label: 'week',
          name: '周'
        },
        {
          label: 'month',
          name: '月'
        },
        {
          label: 'quarter',
          name: '季'
        },
        {
          label: 'year',
          name: '年'
        },
        {
          label: 'custom',
          name: '自定义'
        }
      ],
      granularityList: [
        {
          type: 'dayly',
          value: 'dayly',
          name: '按日统计'
        },
        {
          type: 'weekly',
          value: 'weekly',
          name: '按周统计'
        },
        {
          type: 'monthly',
          value: 'monthly',
          name: '按月统计'
        },{
          type: 'quarterly',
          value: 'quarterly',
          name: '按季度统计'
        },{
          type: 'yearly',
          value: 'yearly',
          name: '按年统计'
        }
      ]
    }
  },
  watch: {
    time9(val) {
      console.log('time9转换前', val)
      console.log('time9转换后', this.$refs.time9.changeCurrentTime(val))
    }
  },
  methods: {
  }
}
</script>
```



<script>
  const versions = require('docs/.vuepress/src/version.json');
  import moment from 'moment'
  export default {
  data () {
    return {
      versions,
      showQuickButton: true,
      customTime: [new Date(), new Date()],
      time: {
        type: 'month',
        currentTime: '2019-04',
        granularity: '',
      },
      time21: {
        type: 'day',
        currentTime: null,
        granularity: '',
      },
      time55: {
        type: 'today',
        currentTime: null
      },
      defaultTime: {
        day: new Date(),
        week: new Date(),
        month: new Date(),
        year: new Date(),
        quarter: new Date(),
        custom: [new Date(), new Date()],
        dayAccurate: ['00:00:00', '23:00:00']
      },
      defaultTime2: {
        day: new Date(),
        week: new Date(),
        month: new Date(),
        year: new Date(),
        quarter: new Date(),
        custom: [new Date(), new Date()],
        dayAccurate: ['00:00', '23:00']
      },
      defaultTime3: {
        day: '',
        week: '',
        month: '',
        year: '',
        quarter: '',
        custom: ['', ''],
        dayAccurate: ['', '']
      },
      time22: {
        type: 'month',
        currentTime: null,
        granularity: ''
      },
      time33: {
        type: 'day',
        currentTime: null,
        granularity: ''
      },
      time2: {
        type: 'day',
        currentTime: null,
        granularity: '',
      },
      time3: {
        type: 'day',
        currentTime: null,
        granularity: '',
      },
      time4: {
        type: 'day',
        currentTime: null,
        granularity: '',
      },
      time5: {
        type: 'day',
        currentTime: null,
        granularity: '',
      },
      time7: {
        type: 'day',
        currentTime: null,
        granularity: '',
      },
      time71: {
        type: 'day',
        currentTime: null,
        granularity: ''
      },
      time8: {
        type: 'day',
        currentTime: null,
        granularity: '',
      },
      time9: {
        type: 'day',
        currentTime: null,
        granularity: '',
      },
      dayType: 'accurate',
      testyear: new Date(),
      special2: '中秋',
      special3: '国庆',
      timeLabels: [
        {
          label: 'day',
          name: '日'
        },
        {
          label: 'week',
          name: '周'
        },
        {
          label: 'month',
          name: '月'
        },
        {
          label: 'quarter',
          name: '季'
        },
        {
          label: 'year',
          name: '年'
        },
        {
          label: 'custom',
          name: '自定义'
        }
      ],
      timeLabels2: [
        {
          label: 'day',
          name: '日'
        },
        {
          label: 'week',
          name: '周'
        },
        {
          label: 'month',
          name: '月'
        },
        {
          label: 'quarter',
          name: '季'
        },
        {
          label: 'other',
          name: '特殊日'
        },
        {
          label: 'year',
          name: '年'
        },
        {
          label: 'custom',
          name: '自定义'
        }
      ],
      timeLabels3: [
        {
          label: 'day',
          name: '日'
        },
        {
          label: 'week',
          name: '周'
        },
        {
          label: 'month',
          name: '月'
        },
        {
          label: 'quarter',
          name: '季'
        },
        {
          label: 'other',
          name: '其他'
        },
        {
          label: 'year',
          name: '年'
        },
        {
          label: 'custom',
          name: '自定义'
        }
      ],
      simpleTimeLabels: [
        {
          label: 'today',
          name: '今日'
        },
        {
          label: 'yesterday',
          name: '昨日'
        },
        {
          label: 'nearlySeven',
          name: '近7天'
        },
        {
          label: 'nearlythirty',
          name: '近30天'
        },
        {
          label: 'custom',
          name: '自定义'
        }
      ],
      granularityList: [
        {
          type: 'dayly',
          value: 'dayly',
          name: '按日统计'
        },
        {
          type: 'weekly',
          value: 'weekly',
          name: '按周统计'
        },
        {
          type: 'monthly',
          value: 'monthly',
          name: '按月统计'
        },{
          type: 'quarterly',
          value: 'quarterly',
          name: '按季度统计'
        },{
          type: 'yearly',
          value: 'yearly',
          name: '按年统计'
        }
      ],
      accurateDayFormat: 'HH',
      accurateDayFormat2: 'HH:mm:ss',
      accurateDayFormat3: 'HH:mm',
      hTimeRegion: ['00:00', '23:00']
    }
  },
  watch: {
    time55 (val) {
      console.log('simple', val)
    },
    time(val) {
      console.log('time', val)
    },
    time22 (val) {
      console.log(val)
    },
    time2(val) {
      console.log('time2', val)
    },
    time3(val) {
      console.log('time3', val)
    },
    time7(val) {
      console.log('time7', val)
    },
    time8(val) {
      console.log('time8', val)
    },
    time9(val) {
      console.log('time9转换前', val)
      console.log('time9转换后', this.$refs.time9.changeCurrentTime(val))
    },
    special2 () {
      this.$refs.time2.handlerUpdateValue()
    },
    special3 () {
      this.$refs.time3.handlerUpdateValue()
    },
    testyear () {
      this.$refs.time3.handlerUpdateValue()
    }
  },
  methods: {
    change (val) {
      console.log('change事件', val)
    },
    reset () {
      // console.log(this.$refs.tests)
      this.$refs.tests.reset()
    },
    test () {
      this.time5 = JSON.parse(JSON.stringify(this.time4))
    },
    setCurrentTime2 () {
      return {
        currentTime: this.special2,
        oter: '返回的请在watch的model中查看'
      }
    },
    setCurrentTime3 () {
      return {
        currentTime: this.special3,
        oter: '这个'
      }
    }
  }
  }
</script>

## API

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 参数 |
| ---- | ---- | ---- | ------ | ------ | ---- |
| v-model | 绑定当前的值 默认赋值 {currentTime: null, type: 'day'} | Object | ------ | ------ | ---- |
| time-labels | 按钮的名称，简易模式：label（today， yesterday, nearlySeven, nearlythirty, custom），复杂模式： label: 已定(day, week, month, quarter, year, custom) name字段自定义| Array | ------ | ------ | ---- |
| show-quick-button | 是否显示快捷按钮，只有复杂模式生效 | Boolean | true, false | false | ---- |
| default-time | 默认每个type的值 | Object | ------ | 根据当日计算值，如day 就是2018-12-6, month: 2018-12等 | ---- |
| day-options | 时间选择器日约束条件(参考hui) | Object | ------ | 限制今日之后的时间不可选取 | ---- |
| week-options | 时间选择器周约束条件(参考hui) | Object | ------ | 限制本周之后的时间不可选取 | ---- |
| month-options | 时间选择器月约束条件(参考hui) | Object | ------ | 限制本月之后的时间不可选取 | ---- |
| quarter-options | 时间选择器季度约束条件(参考hui), 对象内部增加一个listLimit字段，用于限制下拉季度项，默认不可选择超过本季度之后的季度选项 | Object | ------ | 限制本年之后的时间不可选取 | ---- |
| year-options | 时间选择器年约束条件(参考hui) | Object | ------ | 限制今日之后的时间不可选取 | ---- |
| custom-options | 时间选择器自定义时间约束条件(参考hui) | Object | ------ | 限制今日之后的时间不可选取 | ---- |
| granularity-list | 颗粒度列表, type值固定，value和name可自定义 | Array | ------ | ------ | ---- |
| granularity-type | 配合granularity-list一起使用，控制颗粒度列表展示的范围 | String | 'all', 'custom'| 'custom' | ---- |
| set-current-time | 绑定当前的值 默认赋值 {currentTime: null, type: 'day'} | Object | ------ | ------ | ---- |
| day-type | 默认只选择天 | String | 'simple'和'accurate' | 'simple' | ---- |
| accurate-day-format | 天的精确时间格式 | String | 'HH:mm:ss' | 'HH:mm',, 'HH:mm:ss', 'HH' | ---- |
| week-disable | 用于控制显示周的结束时间（由于可能会做不可选择的限制，顾做时间转换）|传入的时间为endTime，然后retuen出一个结尾的时间（即需要展示的周结尾时间）|
| type | 是复杂模式和简易模式|String|'complex'和'simple'| 'complex' | |
| custom-default | type为simple时，简单的时间选择器，自定义的默认值|Array| | [new Date(), new Date()] | |
| validate-equal | 精确日时间中：开始和结束时间效验是否可相等 | Boolean | |false |
| h-time-region | 精确日时间中：用于控制小时的区间 | Array | | ['00:00', '24:00'] |
| linkageFlag  <Badge text="1.5.1+" />| 联动标志位，由于默认是正向联动，如要主要赋值，可先关闭联动在赋值，防止联动值覆盖 | Boolean| true| |
| timeInitFlag  <Badge text="1.10.1+" />| 是否默认初始化，默认会初始化为day类型的时间 | Boolean| true| |
| customKeep（简单模式） <Badge text="1.16.1+" />| 每次切换到自定义时间是不是保持初始化的默认值 | Boolean| true | |
| custom-class | 下拉框类名| |  | |

### 方法

| 方法 | 说明 | 参数 |
| ---- | ---- | ---- |
| handlerUpdateValue | 用于更新vaule值 | ---- |
| reset | 重置为初始状态（仅为复杂时间选择器） | ---- |
| change <Badge text="1.14.4+" /> | 更新事件 ({type, currentTime, granularity}) | ---- |
| changeCurrentTime |  用于转换（day,month,year）时间,默认day为yyyy-mm-dd，month:yyyy-mm,year: yyyy转换后都是数组，这个时间的开始到结束 如：day[yyyy-mm-dd 00:00:00, yyyy-mm-dd 23:59:59] | 传入v-model值 |


