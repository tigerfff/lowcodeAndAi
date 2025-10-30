# Slider 滑块

通过拖动滑块在一个固定区间内进行选择

## 基础用法

在拖动滑块时，显示当前值

<template>
  <code-box
    description="通过设置绑定值自定义滑块的初始值, `show-tooltip`属性控制tooltip的显示与否, `format-tooltip`属性用于格式化tooltip的显示, `disabled`属性用于禁用slider">
    <div class="block">
      <span class="demonstration">默认</span>
      <el-slider v-model="value1"></el-slider>
    </div>
    <div class="block">
      <span class="demonstration">自定义初始值</span>
      <el-slider v-model="value2"></el-slider>
    </div>
    <div class="block">
      <span class="demonstration">隐藏 Tooltip</span>
      <el-slider v-model="value3" :show-tooltip="false"></el-slider>
    </div>
    <div class="block">
      <span class="demonstration">格式化 Tooltip</span>
      <el-slider v-model="value4" :format-tooltip="formatTooltip"></el-slider>
    </div>
    <div class="block">
      <span class="demonstration">禁用</span>
      <el-slider v-model="value5" disabled></el-slider>
    </div>
  </code-box>
</template>

```vue
<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-slider v-model="value1"></el-slider>
  </div>
  <div class="block">
    <span class="demonstration">自定义初始值</span>
    <el-slider v-model="value2"></el-slider>
  </div>
  <div class="block">
    <span class="demonstration">隐藏 Tooltip</span>
    <el-slider v-model="value3" :show-tooltip="false"></el-slider>
  </div>
  <div class="block">
    <span class="demonstration">格式化 Tooltip</span>
    <el-slider v-model="value4" :format-tooltip="formatTooltip"></el-slider>
  </div>
  <div class="block">
    <span class="demonstration">禁用</span>
    <el-slider v-model="value5" disabled></el-slider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 0,
      value2: 50,
      value3: 36,
      value4: 48,
      value5: 42
    };
  },
  methods: {
    formatTooltip(val) {
      return val / 100;
    }
  }
};
</script>
```

## 离散值

选项可以是离散的

<template>
  <code-box
    description="`show-stops`属性用于控制间断点的显示与否, `step`属性的值可以改变步长, `show-stops-number`属性显示下标文字">
    <div class="block">
      <span class="demonstration">不显示间断点</span>
      <el-slider
        v-model="value6"
        :step="10">
      </el-slider>
    </div>
    <div class="block">
      <span class="demonstration">通过step配置显示间断点</span>
      <el-slider
        v-model="value7"
        :step="10"
        show-stops>
      </el-slider>
    </div>
    <div class="block">
      <span class="demonstration">通过mark配置显示间断点</span>
      <el-slider
        v-model="value1"
        :marks="{10: '10H', 50: '50H'}"
        show-stops
        show-stops-number>
      </el-slider>
    </div>
  </code-box>
</template>

```vue
<template>
  <div class="block">
    <span class="demonstration">不显示间断点</span>
    <el-slider v-model="value6" :step="10"></el-slider>
  </div>
  <div class="block">
    <span class="demonstration">通过step配置显示间断点</span>
    <el-slider v-model="value7" :step="10" show-stops></el-slider>
  </div>
  <div class="block">
    <span class="demonstration">通过mark配置显示间断点</span>
    <el-slider
      v-model="value1"
      :marks="{10: '10H', 50: '50H'}"
      show-stops
      show-stops-number
    ></el-slider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value6: 0,
      value7: 0
    };
  }
};
</script>
```

## 带有输入框

通过输入框设置精确数值

<template>
  <code-box
    description="`show-input`属性用于控制输入框的显示与否">
    <div class="block">
      <el-slider
        v-model="value8"
        show-input>
      </el-slider>
    </div>
  </code-box>
</template>

```vue
<template>
  <div class="block">
    <el-slider v-model="value8" show-input></el-slider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value8: 0
    };
  }
};
</script>
```

## 微调滑块

<template>
  <code-box
    description="设置`show-button`属性可以显示控制按钮, 使用微调滑块功能">
    <div class="block">
        <el-slider
          show-button
          v-model="fineTuneValue"
          :step="2"
          :max="10">
        </el-slider>
    </div>
  </code-box>
</template>

```vue
<template>
  <div class="block">
    <el-slider
      show-button
      v-model="fineTuneValue"
      :step="2"
      :max="10"
    ></el-slider>
  </div>
</template>
```

## 范围选择

支持选择某一数值范围

<template>
  <code-box
    description="使用`range`属性可以使用范围选择功能, 此时绑定值为数组. 前后两个滑块重叠时, 用鼠标选取的将是后一个滑块">
    <div class="block">
      <el-slider
        v-model="value9"
        range
        :max="10">
      </el-slider>
    </div>
  </code-box>
</template>

```vue
<template>
  <div class="block">
    <el-slider v-model="value9" range :max="10"></el-slider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value9: [4, 8]
    };
  }
};
</script>
```

## 范围选择带输入框

支持输入框设置精确数值范围

<template>
  <code-box
    description="在设置`range`属性的同时,设置`show-input`。 前后两个滑块重叠时, 用鼠标选取的将是后一个滑块。">
    <div class="block">
      <el-slider
        v-model="value10"
        show-input
        :show-input-controls="false"
        range
        :max="10">
      </el-slider>
    </div>
  </code-box>
</template>

```vue
<template>
  <div class="block">
    <el-slider v-model="value10" show-input range :max="10"></el-slider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value10: [4, 8]
    };
  }
};
</script>
```

## 竖向模式

<template>
  <code-box
    description="使用`vertical`属性, 配合`height`属性启用竖向模式">
    <div class="block">
      <el-slider
        v-model="value11"
        vertical
        :max="10"
        height="200px">
      </el-slider>
    </div>
  </code-box>
</template>

```vue
<template>
  <div class="block">
    <el-slider v-model="value11" vertical :max="10" height="200px"></el-slider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value11: 4
    };
  }
};
</script>
```

<script>
  export default {
    data() {
      return {
        value1: 0,
        value2: 50,
        value3: 36,
        value4: 48,
        value5: 42,
        value6: 0,
        value7: 0,
        value8: 0,
        value9: [4, 8],
        value10: [4, 8],
        value11: 4,
        fineTuneValue: 1
      };
    },
    methods: {
      formatTooltip(val) {
        return val / 100;
      }
    }
  }
</script>

<style lang="scss">
  .code-box.demo-slider .source {
    padding: 0;
  }

  .code-box.demo-slider .block {
    padding: 30px 24px;
    overflow: hidden;
    border-bottom: solid 1px #EFF2F6;
    &:last-child {
      border-bottom: none;
    }
  }

  .code-box.demo-slider .demonstration {
    font-size: 14px;
    color: #8492a6;
    line-height: 44px;
  }

  .code-box.demo-slider .demonstration + .el-slider {
    float: right;
    width: 70%;
    margin-right: 20px;
  }
</style>

## API

### Attributes

| 参数                | 说明                                                       | 类型            | 可选值              | 默认值                      |
| ------------------- | ---------------------------------------------------------- | --------------- | ------------------- | --------------------------- |
| min                 | 最小值                                                     | number          | —                   | 0                           |
| max                 | 最大值                                                     | number          | —                   | 100                         |
| disabled            | 是否禁用                                                   | boolean         | —                   | false                       |
| step                | 步长                                                       | number          | —                   | 1                           |
| marks               | 标记                                                       | array/object    | 标记优先级高于 step | []，如果是[1]等价于 {"1":1} |
| show-input          | 是否显示输入框                                             | boolean         | —                   | false                       |
| show-button         | 是否显示控制按钮                                           | boolean         | —                   | false                       |
| show-input-controls | 在显示输入框的情况下，是否显示输入框的控制按钮             | boolean         | —                   | true                        |
| show-stops          | 是否显示间断点                                             | boolean         | —                   | false                       |
| show-stops-number   | 是否显示间断点下标                                         | boolean         | —                   | false                       |
| show-tooltip        | 是否显示 tooltip                                           | boolean         | —                   | true                        |
| format-tooltip      | 格式化 tooltip message                                     | Function(value) | —                   | —                           |
| range               | 是否为范围选择                                             | boolean         | —                   | false                       |
| vertical            | 是否竖向模式                                               | boolean         | —                   | false                       |
| height              | Slider 高度，竖向模式时必填                                | String          | —                   | —                           |

### Events

| 事件名称     | 说明                                               | 回调参数      |
| ------------ | -------------------------------------------------- | ------------- |
| change       | 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发） | 改变后的值    |
| drag-start   | 拖拽开始前触发                                     | event, 当前值 |
| drag-end     | 拖拽完成后立即触发                                 | 改变后的值    |
| before-click | 点击 slider 之前触发                               | event, 当前值 |
| slider-click | 点击 slider 后触发                                 | 改变后的值    |
