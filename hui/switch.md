# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

switch 的开关操作间隔建议在 0.5 秒以上。

## 基础用法

<template>
  <code-box>
  <el-switch
    v-model="value1" active-text="淦饭" inactive-text="减肥">
  </el-switch>
  </code-box>
</template>

```html
<el-switch v-model="value1" active-text="淦饭" inactive-text="减肥"></el-switch>
<script>
  export default {
    data() {
      return {
        value1: true
      };
    }
  };
</script>
```

## 三种大小

<template>
  <code-box>
   <el-switch
    v-model="value4"
  >
  </el-switch>
  <el-switch
    v-model="value5"
    size="small"
  >
  </el-switch>
  <el-switch
    v-model="value6"
    size="mini"
  >
  </el-switch>
  </code-box>
</template>

```html
<el-switch v-model="value4"></el-switch>
<el-switch v-model="value5" size="small">
  <el-switch v-model="value6" size="mini"></el-switch>

  <script>
    export default {
      data() {
        return {
          value4: true,
          value5: true,
          value6: true
        };
      }
    };
  </script>
</el-switch>
```

## 禁用状态

<template>
  <code-box title="禁用状态" description="设置`disabled`属性，接受一个`Boolean`，设置`true`即可禁用">
    <el-switch
      v-model="value7"
      disabled>
    </el-switch>
    <el-switch
      v-model="value8"
      disabled>
    </el-switch>

  </code-box>
</template>

```html
<el-switch v-model="value7" disabled></el-switch>
<el-switch v-model="value8" disabled></el-switch>
<script>
  export default {
    data() {
      return {
        value7: true,
        value8: false
      };
    }
  };
</script>
```

## 扩展的 value 类型

<template>
  <code-box title="扩展的 value 类型" description="设置`active-value`和`inactive-value`属性，接受`Boolean`, `String`或`Number`类型的值">
  <el-tooltip :content="'Switch value: ' + value9" placement="top">
      <el-switch
      v-model="value9"
      active-color="#2080f7"
      inactive-color="#CCCCCC"
      active-value="100"
      inactive-value="0">
      </el-switch>
  </el-tooltip>
  </code-box>
</template>

```html
<el-tooltip :content="'Switch value: ' + value9" placement="top">
  <el-switch
    v-model="value9"
    active-color="#2080f7"
    inactive-color="#CCCCCC"
    active-value="100"
    inactive-value="0"
  ></el-switch>
</el-tooltip>
<script>
  export default {
    data() {
      return {
        value9: '100'
      };
    }
  };
</script>
```

## 切换前进行判断

<template>
  <code-box>
    <el-switch
      v-model="value1"
      :before-change="handleBeforeChange">
    </el-switch>
  </code-box>
</template>

```html
<el-switch v-model="value1" :before-change="handleBeforeChange"></el-switch>

<script>
  export default {
    data() {
      return {
        value1: true
      };
    },
    computed: {
      text: function() {
        return this.value1
          ? '此操作将关闭开关, 是否继续?'
          : '此操作将打开开关, 是否继续?';
      }
    },
    methods: {
      handleBeforeChange (value, done) {
        this.$confirm(this.text, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'question'
        }).then(() => {
          done()
        }).catch(() => {});
      }
    }
  };
</script>
```

## API

### Attributes

| 参数                               | 说明                                         | 类型                                                             | 可选值 | 默认值                     |
| ---------------------------------- | -------------------------------------------- | ---------------------------------------------------------------- | ------ | -------------------------- |
| disabled                           | 是否禁用                                     | boolean                                                          | —      | false                      |
| size                               | 大小                                         | string                                                           | small  | normal                     |
| width                              | switch 的宽度（像素）                        | number                                                           | —      | 52（有文字）/ 40（无文字） |
| active-icon-class                  | switch 打开时所显示图标的类名                | string                                                           | —      | —                          |
| inactive-icon-class                | switch 关闭时所显示图标的类名                | string                                                           | —      | —                          |
| active-text<Badge text="2.16+"/>   | 右侧的文字                                   | string                                                           | —      | —                          |
| inactive-text<Badge text="2.16+"/> | 左侧的文字                                   | string                                                           | —      | —                          |
| instruction                        | 右边描述性文字                               | string                                                           | —      | —                          |
| active-value                       | switch 打开时的值                            | boolean / string / number                                        | —      | true                       |
| inactive-value                     | switch 关闭时的值                            | boolean / string / number                                        | —      | false                      |
| active-color                       | switch 打开时的背景色                        | string                                                           | —      | #20A0FF                    |
| inactive-color                     | switch 关闭时的背景色                        | string                                                           | —      | #C0CCDA                    |
| name                               | switch 对应的 name 属性                      | string                                                           | —      | —                          |
| allow-focus                        | 是否开启 `.focus()` & `.blur()` 方法 `input` | boolean                                                          | —      | false                      |
| before-change                      | 开关切换前的回调，可以阻止开关切换           | function(value, done)；value 为当前开关的值；done 用于切换开关； | —      | false                      |

### Events

| 事件名称 | 说明                                            | 回调参数       |
| -------- | ----------------------------------------------- | -------------- |
| change   | switch 状态发生变化时的回调函数                 | 新状态的值     |
| blur     | blur 时触发 (当 `allowFocus` 的值是 `true`)     | (event: Event) |
| focus    | on focus 时触发 (当 `allowFocus` 的值是 `true`) | (event: Event) |

<style>
  .demo-box.demo-switch {
    .el-switch {
      margin: 20px 20px 20px 0;
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        value1: true,
        value2: true,
        value3: true,
        value4: true,
        value5: true,
        value6: true,
        value7: true,
        value8: false,
        value9: '100',
      }
    },
    computed: {
      text: function(){
        return this.value1 ? '此操作将关闭开关, 是否继续?' : '此操作将打开开关, 是否继续?'
      }
    },
    methods: {
      handleBeforeChange (value, done) {
        this.$confirm(this.text, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'question'
        }).then(() => {
          done()
        }).catch(() => {});
      }
    }
  };
</script>
