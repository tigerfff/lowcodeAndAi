# IpInput IP输入框

## 基础用法
<template>
  <code-box title="基础用法" description="用于输入 IP 的输入框">
    <el-form label-width="80px" content-width="162px">
      <el-form-item label="IP地址">
        <h-ip-input v-model="ip" @blur="onBlur" tips="分为4段，每段范围为0~255的整数，参考格式：127.0.0.1。"></h-ip-input>
      </el-form-item>
    </el-form>
  </code-box>
</template>

```html
<el-form label-width="80px" content-width="162px">
  <el-form-item label="IP地址">
    <h-ip-input v-model="ip" @blur="onBlur" tips="分为4段，每段范围为0~255的整数，参考格式：127.0.0.1。"></h-ip-input>
  </el-form-item>
</el-form>

<script>
  export default {
    data() {
      return {
        ip: '192.168.0.1'
      }
    },
    methods: {
      onBlur(e, i) {
        console.log(i)
      }
    }
  }
</script>
```

## 禁用状态
<template>
  <code-box title="禁用状态" description="通过 `disabled` 属性指定是否禁用 ip-input 组件">
    <el-form label-width="80px" content-width="162px">
      <el-form-item label="IP地址">
        <h-ip-input v-model="ip" disabled></h-ip-input>
      </el-form-item>
    </el-form>
  </code-box>
</template>

```html
<el-form label-width="80px" content-width="162px">
  <el-form-item label="IP地址">
    <h-ip-input v-model="ip" disabled></h-ip-input>
  </el-form-item>
</el-form>

<script>
  export default {
    data() {
      return {
        ip: '192.168.0.1'
      }
    }
  }
</script>
```

## 指定每项宽度
<template>
  <code-box title="指定每项宽度" description="可以通过 `item-width` 指定每项宽度。">
    <el-form label-width="80px" content-width="220px">
      <el-form-item label="IP地址">
        <h-ip-input v-model="ip" item-width="40px"></h-ip-input>
      </el-form-item>
    </el-form>
  </code-box>
</template>

```html
<el-form label-width="80px" content-width="220px">
  <el-form-item label="IP地址">
    <h-ip-input v-model="ip" item-width="40px"></h-ip-input>
  </el-form-item>
</el-form>

<script>
  export default {
    data() {
      return {
        ip: '192.168.0.1'
      }
    }
  }
</script>
```

<script>
  export default {
    data() {
      return {
        ip: '192.168.0.1'
      }
    },
    methods: {
      onBlur(e, i) {
        console.log(i)
      }
    }
  }
</script>


<style lang="scss">
  .demo-ip-input {
    .el-form-item {
      margin-bottom: 0;
    }
  }
</style>

## API

### Attributes
| 参数           | 说明                                                                                                                     | 类型           | 可选值                                                                                                    | 默认值 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------- | --------------------------------------------------------------------------------------------------------- | ------ |
| value          | 绑定值                                                                                                                   | String         | -                                                                                                         | -      |
| width          | IP输入框宽度                                                                                                             | String         | -                                                                                                         | '100%' |
| item-width     | 每项宽度                                                                                                                 | String         | -                                                                                                         | null   |
| disabled       | 禁用                                                                                                                     | Boolean        | -                                                                                                         | false  |
| tips           | IP输入框文字提示信息                                                                                                     | String         | -                                                                                                         | -      |
| tips-max-width | 提示信息最大宽度                                                                                                         | String, Number | -                                                                                                         | -      |
| tips-placement | 提示信息出现位置                                                                                                         | String         | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | top    |
| tips-offset    | 提示信息偏移量（对应tips-placement会有不同的偏移方向，'top'向上偏移、'bottom'向下偏移、'left'项做偏移、'right'向右偏移） | String         | -                                                                                                         | -      |

### Events

| 事件名称 | 说明                 | 回调参数                  |
| -------- | -------------------- | ------------------------- |
| blur     | 单个输入框失焦事件 | (event: Event, i: Number) |
| input     | 值改变事件          | arr |