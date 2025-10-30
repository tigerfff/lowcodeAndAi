# VehicleNumberInput 车牌输入框

<template>
  <author-info
    :version="versions['vehicle-number-input']"
    author="叶波"
    ux="刘俊森"
    ui="刘俊森、曾芬"
    standard="http://ga-gitlab.hikvision.com/PBG_UX/Design_Guideline_GUI_Senior/issues/65"
    reviewed
  />
</template>

## 安装

```bash
$ npm i @hui-pro/vehicle-number-input -D
# 或者
yarn add @hui-pro/vehicle-number-input --dev
```

## 引入

```js
import VehicleNumberInput from '@hui-pro/vehicle-number-input';
import '@hui-pro/vehicle-number-input/theme/index.scss';
Vue.use(VehicleNumberInput);
```

## 基本用法

<template>
  <code-box>
    <el-row :gutter="8">
      <el-col :span="8">
        <el-form :model="ruleForm" :rules="rules">
            <el-form-item
              prop="num"
            >
              <h-vehicle-number-input
                tips="*号替代多个或零个字符，?号替代一个字符"
                width="100%"
                v-model="ruleForm.num"
                :disabled="openRule"
              />
            </el-form-item>
        </el-form>
        <el-button @click="openRule = !openRule">切换可用行</el-button>
      </el-col>
    </el-row>
  </code-box>
</template>

```html
<template>
  <code-box>
    <el-row :gutter="8">
      <el-col :span="12">
        <el-form :model="ruleForm" :rules="rules">
            <el-form-item
              prop="num"
            >
              <h-vehicle-number-input
                tips="*号替代多个或零个字符，?号替代一个字符"
                v-model="ruleForm.num"
                :disabled="openRule"
              />
            </el-form-item>
        </el-form>
        <el-button @click="openRule = !openRule">切换可用行</el-button>
      </el-col>
    </el-row>
  <code-box>
</template>

<script>
export default {
  data() {
    return {
      openRule: false,
      ruleForm: {
        num: '浙A59191'
      },
      rules: {
        num: [
          {
            validator(rule, value, callback) {
              let regStr =
                '^[0-9a-zA-Z京沪粤浙苏鲁陕晋冀豫川渝辽吉皖鄂湘赣闽甘宁蒙津贵云桂琼青新藏黑学挂领使港澳警\\*\\?]{0,8}$';
              let reg = new RegExp(regStr);
              if (!reg.test(value)) {
                callback(new Error('请正确输入号牌号码'));
              } else {
                callback();
              }
            },
            trigger: 'change'
          }
        ]
      }
    };
  }
};
</script>
```

## 自定义选择范围

<template>
  <code-box>
    <el-row :gutter="8">
      <el-col :span="12">
        <h-vehicle-number-input
          :area="['京','沪','粤','浙','苏']"
          :letter="['A','B','C','D']"
          :special="['使', '学']"
        />
      </el-col>
    </el-row>
  </code-box>
</template>

```html
<template>
  <el-row :gutter="8">
    <el-col :span="12">
      <h-vehicle-number-input
        :area="['京','沪','粤','浙','苏']"
        :letter="['A','B','C','D']"
        :special="['使', '学']"
      />
    </el-col>
  </el-row>
</template>
```

<script>
const versions = require('docs/.vuepress/src/version.json');
export default {
  data() {
    return {
      versions,
      openRule: false,
      ruleForm: {
        num: '浙A59191'
      },
      rules: {
        num: [
          {
            validator(rule, value, callback) {
              let regStr =
                '^[0-9a-zA-Z京沪粤浙苏鲁陕晋冀豫川渝辽吉皖鄂湘赣闽甘宁蒙津贵云桂琼青新藏黑学挂领使港澳警\\*\\?]{0,8}$';
              let reg = new RegExp(regStr);
              if (!reg.test(value)) {
                callback(new Error('请正确输入号牌号码'));
              } else {
                callback();
              }
            },
            trigger: 'change'
          }
        ]
      }
    };
  }
};
</script>

## API

### 属性

| 参数     | 说明           | 类型    | 可选值     | 默认值 |
| -------- | -------------- | ------- | ---------- | ------ |
| value    | 绑定值         | String  | -          | -      |
| area     | 区域选择项     | Array   | -          | null   |
| letter   | 字母选择项     | Array   | -          | null   |
| special  | 特殊车牌选择项 | Array   | -          | null   |
| disabled | 是否禁用       | Boolean | true/false | false  |
| clearable | 是否增加删除图标       | Boolean | true/false | true  |
| custom-class | 下拉框类名| |  | |
### 事件

| 参数   | 说明             | 参数类型 | 参数内容 |
| ------ | ---------------- | -------- | -------- |
| change | 输入值改变事件   | String   | 输入值   |
| focus  | 聚焦事件         | String   | 输入值   |
| blur   | 失去焦点事件     | String   | 输入值   |
