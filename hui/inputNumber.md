# InputNumber 微调控件

仅允许输入标准的数字值，可定义范围

### 基础用法

<template>
    <code-box title="基础用法" description="要使用它，只需要在`el-input-number`元素中使用`v-model`绑定变量即可，变量的初始值即为默认值。如果你需要控制数值在某一范围内，可以设置`min`属性和`max`属性，不设置`min`和`max`时，最小值为 0，最大为无穷大。用户什么都不输入会自动切换到最小值。">
    <el-input-number v-model="num1" @change="handleChange"></el-input-number>
    </code-box>
</template>

```vue
<el-input-number v-model="num1" @change="handleChange"></el-input-number>
<script>
export default {
  data() {
    return {
      num1: 0
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>
```

### 禁用状态

<template>
    <code-box title="禁用状态" description="`disabled`属性接受一个`Boolean`，设置为`true`即可禁用整个组件">
    <el-input-number v-model="num2" :disabled="true"></el-input-number>
    </code-box>
</template>

```vue
<el-input-number v-model="num2" :disabled="true"></el-input-number>

<script>
export default {
  data() {
    return {
      num2: 1
    };
  }
};
</script>
```

### 步数和精度

<template>
    <code-box title="允许定义递增递减的步数控制" description="设置`step`属性可以控制步长，接受一个`Number`，设置 precision 属性可以控制数值精度，接收一个 Number">
    <el-input-number v-model="num3" :step="0.1" :precision=2></el-input-number>
    </code-box>
</template>

```vue
<el-input-number v-model="num3" :step="0.1" :precision="2"></el-input-number>

<script>
export default {
  data() {
    return {
      num3: 5
    };
  }
};
</script>
```

<script>
  export default {
    data() {
      return {
        num1: 0,
        num2: 1,
        num3: 5,
        num4: 1,
        num5: 1,
        num6: 1,
        num7: 1
      }
    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    }
  };
</script>
<style>
  .demo-box.demo-input-number {
    .el-input-number + .el-input-number {
      margin-left: 10px;
    }
  }
</style>

### Attributes

| 参数                           | 说明                                                 | 类型               | 可选值       | 默认值   |
| ------------------------------ | ---------------------------------------------------- | ------------------ | ------------ | -------- |
| value                          | 绑定值                                               | number             | —            | 0        |
| min                            | 设置计数器允许的最小值                               | number             | —            | 0        |
| max                            | 设置计数器允许的最大值                               | number             | —            | Infinity |
| precision <Badge text="2.1+"/> | 数值精度                                             | number             | —            | —        |
| step                           | 计数器步长                                           | number             | —            | 1        |
| size                           | 计数器尺寸                                           | string             | large, small | —        |
| disabled                       | 是否禁用计数器                                       | boolean            | —            | false    |
| name                           | 原生属性                                             | string             | —            | —        |
| label                          | 输入框关联的 label 文字                              | string             | —            | —        |
| resetNum <Badge text="2.32+"/> | 清空以后展示的默认值（不填或者不为null默认是用 min） | number,string,null | —            | null     |

> 2.18.0 引入部分 input 原生支持的属性，比如 tips，但且谨慎使用

### Events

| 事件名称 | 说明                        | 回调参数       |
| -------- | --------------------------- | -------------- |
| change   | 绑定值被改变时触发          | 最后变更的值   |
| blur     | 在组件 Input 失去焦点时触发 | (event: Event) |
| focus    | 在组件 Input 获得焦点时触发 | (event: Event) |
