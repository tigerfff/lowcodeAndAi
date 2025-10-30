# PwdInput 密码输入框

<template>
  <author-info
    :version="versions['pwd-input']"
    author="相霄3"
    codeplay="http://emptycup.hikvision.com.cn/codeplay/gist/295"
  />
</template>

## 安装

```bash
$ npm i @hui-pro/pwd-input -D
# 或者
$ yarn add @hui-pro/pwd-input --dev
```

## 引入

```js
import pwdInput from '@hui-pro/pwd-input';
import '@hui-pro/pwd-input/theme/index.scss';
Vue.use(pwdInput);
```

## 基础用法

<template>
  <code-box title="基础用法" description="用于提示密码强度的输入框">
    <el-form label-width="80px" content-width="300px">
      <el-form-item label="密码">
        <h-pwd-input
          v-model="password"
          :pwd-strength.sync="pwdStrength"
        ></h-pwd-input>
      </el-form-item>
    </el-form>
  </code-box>
</template>

```html
<el-form label-width="80px" content-width="300px">
  <el-form-item label="密码">
    <h-pwd-input
      v-model="password"
      :pwd-strength.sync="pwdStrength"
    ></h-pwd-input>
  </el-form-item>
</el-form>

<script>
  export default {
    data() {
      return {
        password: 'Abc123++',
        pwdStrength: 3
      };
    }
  };
</script>
```

<script>
  const versions = require('docs/.vuepress/src/version.json');
  export default {
    data() {
      return {
        versions,
        password: 'Abc123++',
        pwdStrength: 3
      }
    }
  }
</script>

<style lang="scss">
  .demo-pwd-input {
    .el-form-item {
      margin-bottom: 0;
    }
  }
</style>

## API

### Attributes

| 参数           | 说明                  | 类型           | 可选值                                                                                                    | 默认值     |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------- | ---------- |
| value          | 绑定值 | String | - | - |
| disabled       | 禁用状态 | Boolean | true/false | false |
| width          | IP 输入框宽度 | String | - | '100%' |
| maxlength      | 最大输入长度 | Number | - | - |
| placeholder    | 输入框占位文本 | String | - | - |
| pwd-strength   | 密码强度（密码强度说明参考下面文案说明） | Number | 0/1/2/3 | 0 |
| echo-password  | 用于回显的字符，前端默认设置的字符串用来显示密码 | String | - | '**\*\***' |
| tips           | IP 输入框文字提示信息 | String | - | - |
| tips-max-width | 提示信息最大宽度 | String, Number | - | - |
| tips-placement | 提示信息出现位置 | String | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | top |
| tips-offset    | 提示信息偏移量（对应 tips-placement 会有不同的偏移方向，'top'向上偏移、'bottom'向下偏移、'left'项做偏移、'right'向右偏移） | String | - | - |
| show-rank      | 是否显示密码强度  | Boolean | - | true |
| user-name      | 用户名 | String | -  | 'admin' |
| auto-complete  | 是否启用自动完成功能 | String | -  | 'off' |

::: tip 密码强度说明

- 等级 0（风险密码）：密码长度小于 8 位，或者只包含 4 类字符中的任意一类，或者密码与用户名一样，或者密码是用户名的倒写。
- 等级 1（弱密码）：包含两类字符，且组合为（数字+小写字母）或（数字+大写字母），且长度大于等于 8 位。
- 等级 2（中密码）：包含两类字符，且组合不能为（数字+小写字母）和（数字+大写字母），且长度大于等于 8 位。
- 等级 3（强密码）：包含三类字符及以上，且长度大于等于 8 位。
  :::

### 事件

| 参数  | 说明             | 回调参数 |
| ----- | --------------- | ------------ |
| focus | 在 PwdInput 获得焦点时触发 | (event: Event) |