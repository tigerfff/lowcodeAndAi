# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

<template>
  <code-box description="在`el-option`中，设定`disabled`值为 true，即可禁用该选项">
    <el-row class="demo-select">
      <el-col :span="12">
        <el-select
          v-model="value"
          placeholder="请选择"
          @change="search"
          @blur="blurEvent"
          @focus="focusEvent"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :show-html="false"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </code-box>
</template>

```vue
<el-select
  v-model="value"
  placeholder="请选择"
  @change="search"
  @blur="blurEvent"
  @focus="focusEvent"
>
  <el-option
    v-for="item in options"
    :key="item.value"
    :label="item.label"
    :value="item.value"
  >
  </el-option>
</el-select>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: ''
    };
  }
};
</script>
```

## 有禁用选项

<template>
  <code-box description="在`el-option`中，设定`disabled`值为 true，即可禁用该选项">
    <el-select v-model="value2" placeholder="请选择">
    <el-option
      v-for="item in options2"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled">
    </el-option>
  </el-select>
  </code-box>
</template>

```vue
<el-select v-model="value2" placeholder="请选择">
    <el-option
      v-for="item in options2"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled">
    </el-option>
  </el-select>
<script>
export default {
  data() {
    return {
      options2: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶',
          disabled: true
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value2: ''
    };
  }
};
</script>
```

## 禁用状态

<template>
  <code-box title="选择器不可用状态" description="为`el-select`设置`disabled`属性，则整个选择器不可用">
    <el-select v-model="value3" disabled placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </code-box>
</template>

```vue
<el-select v-model="value3" disabled placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value3: ''
    };
  }
};
</script>
```

## 可清空单选

<template>
  <code-box title="为`el-select`设置`clear`属性，则可将选择器清空。需要注意的是，`clear`属性仅适用于单选，`clearable`属性仅适用于多选，demo见下方案例">
    <el-select v-model="value4" clear placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </code-box>
</template>

```vue
<el-select v-model="value4" clear placeholder="请选择" >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value4: ''
    };
  }
};
</script>
```

## 基础多选

<template>
  <code-box title="为`el-select`设置`multiple`属性即可启用多选，`multiple-limi`可以设置做多可选,此时`v-model`的值为当前选中值所组成的数组，你也可以设置collapse-tags属性将它们合并为一段文字">
    <el-row class="demo-select">
    <el-col :span="3" class="demo-title">基础多选：</el-col>
    <el-col :span="9">
      <el-select v-model="value5" multiple placeholder="请选择" :multiple-limit='4'>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  <br>
  <el-row class="demo-select">
    <el-col :span="3" class="demo-title">不换行：</el-col>
    <el-col :span="9">
      <el-select v-model="value5" multiple multiple-nowrap placeholder="请选择" :multiple-limit='4' >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  <br>
  <el-row class="demo-select">
    <el-col :span="3" class="demo-title">显示个数（带清除按钮）：</el-col>
    <el-col :span="9">
      <el-select v-model="value5" multiple collapse-tags clearable placeholder="请选择" :multiple-limit='4' >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  </code-box>
</template>

```vue
   <el-row class="demo-select">
    <el-col :span="3" class="demo-title">基础多选：</el-col>
    <el-col :span="9">
      <el-select v-model="value5" multiple placeholder="请选择" :multiple-limit='4' >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  <br>
  <el-row class="demo-select">
    <el-col :span="3" class="demo-title">不换行：</el-col>
    <el-col :span="9">
      <el-select v-model="value5" multiple multiple-nowrap placeholder="请选择" :multiple-limit='4' >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  <br>
  <el-row class="demo-select">
    <el-col :span="3" class="demo-title">显示个数（带清除按钮）：</el-col>
    <el-col :span="9">
      <el-select v-model="value5" multiple collapse-tags clearable placeholder="请选择" :multiple-limit='4' >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value5: ['选项5','选项1']
      }
    }
  }
</script>
```

## 自定义模板

<template>
  <code-box title="可以自定义备选项" description="将自定义的 HTML 模板插入`el-option`的 slot 中即可`">
    <el-select v-model="value6" placeholder="请选择">
    <el-option
      v-for="item in cities"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <span style="float: left" v-html="item.label"></span>
      <span style="float: right; font-size: 13px">{{ item.value }}</span>
    </el-option>
  </el-select>
  </code-box>
</template>

```vue
<el-select v-model="value6" placeholder="请选择">
    <el-option
      v-for="item in cities"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; font-size: 13px">{{ item.value }}</span>
    </el-option>
  </el-select>
<script>
export default {
  data() {
    return {
      cities: [
        {
          value: 'Beijing',
          label: '北京'
        },
        {
          value: 'Shanghai',
          label: '上海'
        },
        {
          value: 'Nanjing',
          label: '南京'
        },
        {
          value: 'Chengdu',
          label: '成都'
        },
        {
          value: 'Shenzhen',
          label: '深圳'
        },
        {
          value: 'Guangzhou',
          label: '广州'
        }
      ],
      value6: ''
    };
  }
};
</script>
```

## 分组

<template>
  <code-box title="备选项进行分组展示" description="使用`el-option-group`对备选项进行分组，它的`label`属性为分组名">
    <el-select v-model="value7" placeholder="请选择">
    <el-option-group
      v-for="group in options3"
      :key="group.label"
      :label="group.label">
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-option-group>
  </el-select>
  </code-box>
</template>

```vue
<el-select v-model="value7" placeholder="请选择">
    <el-option-group
      v-for="group in options3"
      :key="group.label"
      :label="group.label">
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-option-group>
  </el-select>
<script>
export default {
  data() {
    return {
      options3: [
        {
          label: '热门城市',
          options: [
            {
              value: 'Shanghai',
              label: '上海'
            },
            {
              value: 'Beijing',
              label: '北京'
            }
          ]
        },
        {
          label: '城市名',
          options: [
            {
              value: 'Chengdu',
              label: '成都'
            },
            {
              value: 'Shenzhen',
              label: '深圳'
            },
            {
              value: 'Guangzhou',
              label: '广州'
            },
            {
              value: 'Dalian',
              label: '大连'
            }
          ]
        }
      ],
      value7: ''
    };
  }
};
</script>
```

## 搜索

<template>
  <code-box title="可以创建并选中选项中不存在的条目" description="使用`filterable`属性即可通过在输入框中输入文字来搜索">
    <el-select
      v-model="value11"
      filterable
      placeholder="请选择文章标签">
      <el-option
        v-for="item in options6"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </code-box>
</template>

```vue
<el-select v-model="value11" filterable placeholder="请选择文章标签">
  <el-option
    v-for="item in options6"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
<script>
export default {
  data() {
    return {
      options6: [
        {
          value: 'HTML',
          label: 'HTML'
        },
        {
          value: 'CSS',
          label: 'CSS'
        },
        {
          value: 'JavaScript',
          label: 'JavaScript'
        }
      ],
      value10: []
    };
  }
};
</script>
```

## 创建条目

<template>
  <code-box title="可以创建并选中选项中不存在的条目" description="使用`allow-create`属性即可通过在输入框中输入文字来创建新的条目。注意此时`filterable`必须为true">
    <el-select
    @search='search'
    v-model="value10"
    multiple
    reserve-keyword
    filterable
    allow-create
    placeholder="请选择文章标签">
    <el-option
      v-for="item in options5"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </code-box>
</template>

```vue
<el-select
  @search="search"
  v-model="value10"
  multiple
  reserve-keyword
  filterable
  allow-create
  placeholder="请选择文章标签"
>
    <el-option
      v-for="item in options5"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
<script>
export default {
  data() {
    return {
      options5: [
        {
          value: 'HTML',
          label: 'HTML'
        },
        {
          value: 'CSS',
          label: 'CSS'
        },
        {
          value: 'JavaScript',
          label: 'JavaScript'
        }
      ],
      value10: []
    };
  }
};
</script>
```

<script>
  export default {
    data() {
      return {
        list: null,
        options: [{
          value: "选项1",
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        options2: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶',
          disabled: true
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        options3: [{
          label: '热门城市',
          options: [{
            value: 'Shanghai',
            label: '上海'
          }, {
            value: 'Beijing',
            label: '北京'
          }]
        }, {
          label: '城市名',
          options: [{
            value: 'Chengdu',
            label: '成都'
          }, {
            value: 'Shenzhen',
            label: '深圳'
          }, {
            value: 'Guangzhou',
            label: '广州'
          }, {
            value: 'Dalian',
            label: '大连'
          }]
        }],
        options4: [],
        options5: [{
          value: 'HTML',
          label: 'HTML'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
        }],
        options6: [{
          value: 'HTML',
          label: 'HTML'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
        }],
        cities: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Nanjing',
          label: '南京'
        }, {
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }],
        value: -1,
        value2: '',
        value3: '',
        value4: '',
        value5: ['选项5','选项1'],
        value6: '',
        value7: '',
        value8: '',
        value9: '',
        value10: [],
        value11: [],
        value12: '',
        value13: [],
        loading: false,
        states: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
      };
    },

    mounted() {
      this.list = this.states.map(item => { return { value: item, label: item}; });
    },

    methods: {
      search(val,a,b) {
        //console.log(val,a,b);
      },
      focusEvent(val) {
        //console.log(val,'聚焦事件');
      },
      blurEvent(val) {
        //console.log(val,'失焦事件');
      },
      remoteMethod(query, isClick) {
        //console.log(query,isClick);
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => item.value.toLowerCase().indexOf(query.toLowerCase()) > -1);
          }, 200);
        } else {
          this.options4 = [];
        }
      }
    }
  };
</script>

<style>
  .demo-select .el-select {
    width: 240px;
  }
  .demo-select {
    /* text-align: center; */

    .sub-title {
      margin-bottom: 10px;
      font-size: 14px;
      color: #8492a6;
    }

    .el-col:not(:last-child):not(.demo-title) {
      border-right: 1px solid rgba(224,230,237,0.50);
    }

    .el-select {
      text-align: left;
    }

    .demo-title {
      display: inline-block;
      line-height: 32px;
      text-align: right;
      border-right: none;
    }
  }
</style>

::: tip 提示

输入框默认 `100%` 宽，由外层容器自由控制宽度。控件根据 HUI 规范提供默认样式如下：

.el-select--width-sm: 96px;

:::

### Select Attributes

| 参数                                         | 说明                                                                           | 类型     | 可选值              | 默认值                           |
| -------------------------------------------- | ------------------------------------------------------------------------------ | -------- | ------------------- | -------------------------------- |
| multiple                                     | 是否多选                                                                       | boolean  | —                   | false                            |
| disabled                                     | 是否禁用                                                                       | boolean  | —                   | false                            |
| readonly                                     | 是否只读                                                                       | boolean  | —                   | false                            |
| value-key                                    | 作为 value 唯一标识的键名，绑定值为对象类型时必填                              | string   | —                   | value                            |
| size                                         | 输入框尺寸                                                                     | string   | large/small/mini    | —                                |
| clear                                        | 单选时是否可以清空选项                                                         | boolean  | —                   | false                            |
| clearable                                    | 多选时是否可以清空选项                                                         | boolean  | —                   | false                            |
| collapse-tags                                | 多选时是否将选中值按文字的形式展示                                             | boolean  | —                   | false                            |
| multiple-limit                               | 多选时用户最多可以选择的项目数，为 0 则不限制                                  | number   | —                   | 0                                |
| multiple-nowrap                              | 多选时选中项过多，超过一行时不进行换行，多出来的内容截断处理                   | boolean  | —                   | false                            |
| max-width                                    | 下拉框的最大宽度,要大于显示框的宽度,否则会失效                                 | number   | —                   | 默认为输入框宽度                 |
| kind                                         | 可选悬浮和面性样式                                                             | string   | surface, suspension | —                                |
| name                                         | select input 的 name 属性                                                      | string   | —                   | —                                |
| placeholder                                  | 占位符                                                                         | string   | —                   | 请选择                           |
| filterable                                   | 是否可搜索                                                                     | boolean  | —                   | false                            |
| search <Badge text="已废弃" type="warning"/> | 是否创建搜索图标                                                               | boolean  | —                   | false                            |
| allow-create                                 | 是否允许用户创建新条目，需配合 `filterable` 使用                               | boolean  | —                   | false                            |
| filter-method                                | 自定义过滤方法                                                                 | function | —                   | —                                |
| remote                                       | 是否为远程搜索                                                                 | boolean  | —                   | false                            |
| remote-method                                | 远程搜索方法                                                                   | function | —                   | 参数分别是当前值和是否是点击触发 |
| loading                                      | 是否正在从远程获取数据                                                         | boolean  | —                   | false                            |
| loading-text                                 | 远程加载时显示的文字                                                           | string   | —                   | 加载中                           |
| no-match-text                                | 搜索条件无匹配时显示的文字                                                     | string   | —                   | 暂无数据                         |
| no-data-text                                 | 选项为空时显示的文字                                                           | string   | —                   | 暂无结果                         |
| popper-class                                 | Select 下拉框的类名                                                            | string   | —                   | —                                |
| default-first-option                         | 在输入框按下回车，选择第一个匹配项。需配合 `filterable` 或 `remote` 使用       | boolean  | -                   | false                            |
| popper-append-to-body                        | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false | boolean  | -                   | true                             |
| popperOptions <Badge text="2.38.0"/>         | vue-popper 的参数配置                                                          | Object   | -                   |                                  |
| placement <Badge text="2.38.0"/>             | vue-popper 默认起始位置                                                        | String   | bottom-start        |                                  |

### Select Events

| 事件名称                                             | 说明                                                                                           | 回调参数                                     |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------- |
| change                                               | 选中值发生变化时触发                                                                           | 目前的选中值                                 |
| focus                                                | 聚焦时触发（仅在filterable为true时候生效）                                                                                     | 事件对象                                     |
| blur                                                 | 失焦时触发                                                                                     | 事件对象                                     |
| visible-change                                       | 下拉框出现/隐藏时触发                                                                          | 出现则为 true，隐藏则为 false                |
| hiddenMenu<Badge text="待移除,无效" type="warning"/> | 隐藏下拉框                                                                                     | 需要通过 ref 来调用                          |
| remove-tag                                           | 多选模式下移除 tag 时触发                                                                      | 移除的 tag 值                                |
| clear                                                | 可清空的单选模式下用户点击清空按钮时触发                                                       | —                                            |
| search                                               | 可用户点击搜索按钮时触发(作为回调)                                                             | 返回当前选中值和过滤值                       |
| on-scrolling-x                                       | 下拉框横向滚动时触发事件,参数返回滚动距离和已滚动百分比（百分比为 1 则表示滚动到尽头）         | {scrollLeft, percentX }                      |
| on-scrolling-y                                       | 下拉框内容过多纵向滚动时触发事件,参数返回滚动距离和已滚动百分比（百分比为 1 则表示滚动到尽头） | {scrollTop, percentY }                       |
| on-scrolling                                         | 下拉框内部滚动条滚动时触发事件,参数返回滚动距离和已滚动百分比（百分比为 1 则表示滚动到尽头）   | {scrollLeft, scrollTop, percentX, percentY } |

### Select Slots

| 事件名称 | 说明                |
| -------- | ------------------- |
| prefix   | Select 组件头部内容 |

### Option Group Attributes

| 参数                           | 说明                                                                        | 类型    | 可选值 | 默认值 |
| ------------------------------ | --------------------------------------------------------------------------- | ------- | ------ | ------ |
| label                          | 分组的组名                                                                  | string  | —      | —      |
| disabled                       | 是否将该分组下所有选项置为禁用                                              | boolean | —      | false  |
| show-html <Badge text="2.0+"/> | 是否用 v-html 解析 label(此时不支持关键字搜索标红)，默认开启会导致 xss 漏洞 | boolean | —      | false  |

### Option Attributes

| 参数     | 说明                                      | 类型                       | 可选值 | 默认值 |
| -------- | ----------------------------------------- | -------------------------- | ------ | ------ |
| value    | 选项的值                                  | string/number/array/object | 必填   | —      |
| label    | 选项的标签，若不设置则默认与 `value` 相同 | string/number              | —      | —      |
| disabled | 是否禁用该选项                            | boolean                    | —      | false  |
