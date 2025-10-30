# Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

## 典型表单

<template>
  <code-box title="典型表单" description="包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。" class="form-demo">
    <el-form ref="form" label-position="top" :model="form" label-width="90px" content-width="400px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc" tips="123" tips-placement="right"></el-input>
      </el-form-item>
      <el-form-item class="demo-form-btns">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </code-box>
</template>

```html
<el-form
  ref="form"
  label-position="top"
  :model="form"
  label-width="90px"
  content-width="400px"
>
  <el-form-item label="hello">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="活动名称">
    <el-input v-model="form.name">
      <template slot="append">Http://</template>
    </el-input>
  </el-form-item>
  <el-form-item label="活动区域">
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="活动时间">
    <el-col :span="11">
      <el-date-picker
        type="date"
        placeholder="选择日期"
        v-model="form.date1"
        style="width: 100%;"
      ></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker
        type="fixed-time"
        placeholder="选择时间"
        v-model="form.date2"
        style="width: 100%;"
      ></el-time-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="即时配送">
    <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="活动性质">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
      <el-checkbox label="地推活动" name="type"></el-checkbox>
      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="特殊资源">
    <el-radio-group v-model="form.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input
      type="textarea"
      v-model="form.desc"
      tips="123"
      tips-placement="right"
    ></el-input>
  </el-form-item>
  <el-form-item class="demo-form-btns">
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  };
</script>
```

## 标签位置

<template>
  <code-box title="标签位置" description="标签位置分为左侧标签、上方标签、右侧标签；其中，左侧和右侧标签，必选的小红点默认在左侧，如果需要放到右侧则加入 required-right <br /> 局内标签则加入 placeholder 去除 label 属性">
    <h4> 常用标签： </h4>
    <el-radio-group v-model="labelPosition" size="small" label-width="90px" content-width="300px">
      <el-radio-button label="left">左侧标签</el-radio-button>
      <el-radio-button label="top">上方标签</el-radio-button>
      <el-radio-button label="right">右侧标签</el-radio-button>
    </el-radio-group>
    <div style="margin: 20px;"></div>
    <el-form label-width="90px" :model="formLabelAlign" :label-position="labelPosition">
      <el-form-item label="名称" required>
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" required required-right>
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
    </el-form>
    <h4> 局内标签： </h4>
    <el-form>
      <el-form-item>
        <el-input v-model="formLabelAlign.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formLabelAlign.region" placeholder="活动区域"></el-input>
      </el-form-item>
    </el-form>
  </code-box>
</template>

```html
<h4> 常用标签： </h4>
<el-radio-group v-model="labelPosition" size="small" label-width="90px" content-width="300px">
  <el-radio-button label="left">左侧标签</el-radio-button>
  <el-radio-button label="top">上方标签</el-radio-button>
  <el-radio-button label="right">右侧标签</el-radio-button>
</el-radio-group>
<div style="margin: 20px;"></div>
<el-form label-width="90px" :model="formLabelAlign" :label-position="labelPosition">
  <el-form-item label="名称" required>
    <el-input v-model="formLabelAlign.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域" required required-right>
    <el-input v-model="formLabelAlign.region"></el-input>
  </el-form-item>
</el-form>
<h4> 局内标签： </h4>
<el-form>
  <el-form-item>
    <el-input v-model="formLabelAlign.name" placeholder="名称"></el-input>
  </el-form-item>
  <el-form-item>
    <el-input v-model="formLabelAlign.region" placeholder="活动区域"></el-input>
  </el-form-item>
</el-form>

<script>
  export default {
    data() {
      return {
        labelPosition: 'left',
        formLabelAlign: {
          name: '',
          region: ''
        }
      };
    }
  };
</script>
```

<!-- ## 纯文本表单

<template>
  <code-box title="纯文本表单" description="纯文本表单需要设置 text-form，然后直接在 `el-form-item` 里传入文本。">
    <el-radio-group v-model="labelPosition1" size="small" label-width="80px" content-width="300px">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="top">顶部对齐</el-radio-button>
    </el-radio-group>
    <div style="margin: 20px;"></div>
    <el-form text-form label-width="80px" v-if="labelPosition1 === 'left'">
      <el-form-item label="Title">
        Informations
      </el-form-item>
      <el-form-item label="Title">
        Informations
      </el-form-item>
    </el-form>
    <el-form text-form label-width="80px" label-position="top" v-if="labelPosition1 === 'top'">
      <el-form-item label="Title">
        Informations
      </el-form-item>
      <el-form-item label="Title">
        Informations
      </el-form-item>
    </el-form>
  </code-box>
</template>

``` html
``` -->

## 解释说明

<template>
  <code-box title="解释说明" description="一般用于提示用户如何录入信息，或在录入错误后给予辅助说明。">
    <el-radio-group v-model="labelPosition2" size="small" label-width="90px" content-width="300px">
      <el-radio-button label="left">左侧标签</el-radio-button>
      <el-radio-button label="top">上方标签</el-radio-button>
    </el-radio-group>
    <div style="margin: 20px;"></div>
    <el-form ref="form" :model="form" label-width="120px" v-if="labelPosition2 === 'left'">
      <el-form-item label="基本用法" introduction="这是基本用法的介绍">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="自定义">
        <div slot="introduction">多行信息<br/>第二行信息<br/>第三行信息</div>
        <el-input></el-input>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" label-position="top" label-width="120px" v-if="labelPosition2 === 'top'">
      <el-form-item label="基本用法" required-right introduction="这是基本用法的介绍">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="自定义" required-right>
        <div slot="introduction">多行信息<br/>第二行信息<br/>第三行信息</div>
        <el-input></el-input>
      </el-form-item>
    </el-form>
  </code-box>
</template>

```html
<el-radio-group
  v-model="labelPosition2"
  size="small"
  label-width="90px"
  content-width="300px"
>
  <el-radio-button label="left">左侧标签</el-radio-button>
  <el-radio-button label="top">上方标签</el-radio-button>
</el-radio-group>
<div style="margin: 20px;"></div>
<el-form
  ref="form"
  :model="form"
  label-width="120px"
  v-if="labelPosition2 === 'left'"
>
  <el-form-item label="基本用法" introduction="这是基本用法的介绍">
    <el-input></el-input>
  </el-form-item>
  <el-form-item label="自定义">
    <div slot="introduction">
      多行信息
      <br />
      第二行信息
      <br />
      第三行信息
    </div>
    <el-input></el-input>
  </el-form-item>
</el-form>
<el-form
  ref="form"
  :model="form"
  label-position="top"
  label-width="120px"
  v-if="labelPosition2 === 'top'"
>
  <el-form-item
    label="基本用法"
    required-right
    introduction="这是基本用法的介绍"
  >
    <el-input></el-input>
  </el-form-item>
  <el-form-item label="自定义" required-right>
    <div slot="introduction">
      多行信息
      <br />
      第二行信息
      <br />
      第三行信息
    </div>
    <el-input></el-input>
  </el-form-item>
</el-form>

<script>
  export default {
    data() {
      return {
        labelPosition2: 'left'
      };
    }
  };
</script>
```

## 提示信息

<template>
  <code-box title="表单验证" description="只有 Input 和 Textarea 可以显示提示信息，默认出现在元素上方，提示信息支持 `popover` 的 `placement` 参数，可以修改提示出现的位置，提示信息默认最长宽度为300px。">
    <el-form ref="form" label-position="top" :model="form" label-width="120px">
      <el-form-item label="基本用法" required>
        <el-input tips="这是个最基本的提示信息" v-model="formTips.tip1"></el-input>
      </el-form-item>
      <el-form-item label="顶部居左">
        <el-input tips="这个提示信息左对齐<br>这个提示信息左对齐<br>这个提示信息左对齐" tips-placement="top-start" v-model="formTips.tip2"></el-input>
      </el-form-item>
      <el-form-item label="提示在右侧">
        <el-input tips="出现在元素右方" tips-placement="right" v-model="formTips.tip3"></el-input>
      </el-form-item>
      <el-form-item label="限制宽度" required>
        <el-input tips="这是一条很长很长很长很长很长很长很长很长很长的提示信息，但设置了最大宽度" tips-max-width="200px" tips-placement="right" v-model="formTips.tip4"></el-input>
      </el-form-item>
      <el-form-item label="提示">
        <el-input type="textarea" tips="这是 textarea 的提示信息" v-model="formTips.tip5"></el-input>
      </el-form-item>
      <el-form-item class="demo-form-btns">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </code-box>
</template>

```html
<el-form ref="form" label-position="top" :model="form" label-width="120px">
  <el-form-item label="基本用法" required>
    <el-input tips="这是个最基本的提示信息" v-model="formTips.tip1"></el-input>
  </el-form-item>
  <el-form-item label="顶部居左">
    <el-input
      tips="这个提示信息左对齐<br>这个提示信息左对齐<br>这个提示信息左对齐"
      tips-placement="top-start"
      v-model="formTips.tip2"
    ></el-input>
  </el-form-item>
  <el-form-item label="提示在右侧">
    <el-input
      tips="出现在元素右方"
      tips-placement="right"
      v-model="formTips.tip3"
    ></el-input>
  </el-form-item>
  <el-form-item label="限制宽度" required>
    <el-input
      tips="这是一条很长很长很长很长很长很长很长很长很长的提示信息，但设置了最大宽度"
      tips-max-width="200px"
      tips-placement="right"
      v-model="formTips.tip4"
    ></el-input>
  </el-form-item>
  <el-form-item label="提示">
    <el-input
      type="textarea"
      tips="这是 textarea 的提示信息"
      v-model="formTips.tip5"
    ></el-input>
  </el-form-item>
  <el-form-item class="demo-form-btns">
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
<script>
  export default {
    data() {
      return {
        formTips: {
          tip1: '',
          tip2: '',
          tip3: '',
          tip4: '',
          tip5: ''
        }
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  };
</script>
```

## 表单验证

<template>
  <code-box title="表单验证" description="在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。<br>  2.7 新增: 如果校验内容过多可以利用 form-item showEllipsis 属性来省略报错内容。<br> 
    Form 组件提供了表单验证的功能，只需要通过 `rule` 属性传入约定的验证规则，并 Form-Item 的 `prop` 属性设置为需校验的字段名即可。校验规则参见 [async-validator](https://github.com/yiminghe/async-validator)">
    <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region" :showEllipsis=true>
        <el-input v-model="ruleForm.region"></el-input>
      </el-form-item>
      <el-form-item label="活动时间" item-group required>
        <el-col :span="11">
          <el-form-item prop="date1" :show-label="false">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2" :show-label="false">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item class="demo-form-btns">
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="resetValidates('ruleForm')">清除校验信息</el-button>
      </el-form-item>
    </el-form>
  </code-box>
</template>

```html
<el-form
  :model="ruleForm"
  label-position="top"
  :rules="rules"
  ref="ruleForm"
  label-width="100px"
  class="demo-ruleForm"
>
  <el-form-item label="活动名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域" prop="region" :showEllipsis="true">
    <el-input v-model="ruleForm.region"></el-input>
  </el-form-item>
  <el-form-item label="活动时间" item-group required>
    <el-col :span="11">
      <el-form-item prop="date1" :show-label="false">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="ruleForm.date1"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="date2" :show-label="false">
        <el-time-picker
          type="fixed-time"
          placeholder="选择时间"
          v-model="ruleForm.date2"
          style="width: 100%;"
        ></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item class="demo-form-btns">
    <el-button type="primary" @click="submitForm('ruleForm')">
      立即创建
    </el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
    <el-button @click="resetValidates('ruleForm')">清除校验信息</el-button>
  </el-form-item>
</el-form>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            {
              required: true,
              message:
                '这是一条很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的错误信息',
              trigger: 'blur'
            }
          ],
          date1: [
            {
              type: 'date',
              required: true,
              message: '请选择日期',
              trigger: 'change'
            }
          ],
          date2: [
            {
              type: 'date',
              required: true,
              message: '请选择时间',
              trigger: 'change'
            }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid, invalidFields) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            console.log(invalidFields);
            this.$refs[formName].focusFirstField();
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      resetValidates(formName) {
        this.$refs[formName].resetValidates();
      }
    }
  };
</script>
```

## 有描述信息

<template>
  <code-box title="有描述信息" description="表单提供了 `description` 和 `description-render`，可以加载单行以及多行描述信息。">
    <el-form :model="descForm" label-position="top" :rules="rules" ref="descForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="name" description="我是描述信息">
        <el-input v-model="descForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region" :description-render="descriptionRender">
        <el-input v-model="descForm.region"></el-input>
      </el-form-item>
      <el-form-item class="demo-form-btns">
        <el-button type="primary" @click="submitForm('descForm')">立即创建</el-button>
        <el-button @click="resetForm('descForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </code-box>
</template>

```html
<el-form
  :model="descForm"
  label-position="top"
  :rules="rules"
  ref="descForm"
  label-width="100px"
  class="demo-ruleForm"
>
  <el-form-item label="活动名称" prop="name" description="我是描述信息">
    <el-input v-model="descForm.name"></el-input>
  </el-form-item>
  <el-form-item
    label="活动区域"
    prop="region"
    :description-render="descriptionRender"
  >
    <el-input v-model="descForm.region"></el-input>
  </el-form-item>
  <el-form-item class="demo-form-btns">
    <el-button type="primary" @click="submitForm('descForm')">
      立即创建
    </el-button>
    <el-button @click="resetForm('descForm')">重置</el-button>
  </el-form-item>
</el-form>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            {
              required: true,
              message:
                '这是一条很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的错误信息',
              trigger: 'change'
            }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid, invalidFields) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            console.log(invalidFields);
            this.$refs[formName].focusFirstField();
            return false;
          }
        });
      },
      descriptionRender(h) {
        return (
          <div>
            <div>我是多行的描述信息1</div>
            <div>我是多行的描述信息2</div>
            <div>我是多行的描述信息3</div>
          </div>
        );
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
```

## 自定义校验规则

<template>
  <code-box title="自定义校验规则" description="这个例子中展示了如何使用自定义验证规则来完成密码的二次验证">
    <el-form :model="ruleForm2" label-position="top" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="ip" prop="ip">
        <h-ip-input v-model="ruleForm2.ip" auto-complete="off">
        </h-ip-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm2.age"></el-input>
      </el-form-item>
      <el-form-item class="demo-form-btns">
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </code-box>
</template>

```html
<el-form
  :model="ruleForm2"
  label-position="top"
  :rules="rules2"
  ref="ruleForm2"
  label-width="100px"
  class="demo-ruleForm"
>
  <el-form-item label="密码" prop="pass">
    <el-input
      type="password"
      v-model="ruleForm2.pass"
      auto-complete="off"
    ></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input
      type="password"
      v-model="ruleForm2.checkPass"
      auto-complete="off"
    ></el-input>
  </el-form-item>
  <el-form-item label="年龄" prop="age">
    <el-input v-model.number="ruleForm2.age"></el-input>
  </el-form-item>
  <el-form-item class="demo-form-btns">
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  </el-form-item>
</el-form>
<script>
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          ip: [
            {
              validator: (rule, value, callback) => {
                console.log(this.ruleForm2.ip);
                callback(new Error('测试值'));
              },
              trigger: 'blur'
            }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            {
              type: 'number',
              required: true,
              message: '年龄不能为空',
              trigger: 'blur'
            },
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid, invalidFields) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            console.log(invalidFields);
            this.$refs[formName].focusFirstField();
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
```

## 数字类型验证

<template>
  <code-box title="数字类型验证" description="数字类型的验证需要在 `v-model` 处加上 `.number` 的修饰符，这是 `Vue` 自身提供的用于将绑定值转化为 `number` 类型的修饰符。">
    <el-form :model="numberValidateForm" label-position="top" ref="numberValidateForm" :rules="rules_V" label-width="100px" class="demo-ruleForm">
      <el-form-item
        label="年龄"
        prop="age"
        :rules="[
          { required: true, message: '年龄不能为空'},
          { type: 'number', message: '年龄必须为数字值'}
        ]"
      >
        <el-input type="age" v-model.number="numberValidateForm.age" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="身高"
        prop="height"
        required
      >
        <el-input type="text" v-model="numberValidateForm.height" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="demo-form-btns">
        <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
        <el-button @click="resetForm('numberValidateForm')">重置</el-button>
        <el-button @click="emptyForm('numberValidateForm')">清空</el-button>
      </el-form-item>
    </el-form>
  </code-box>
</template>

```html
<el-form
  :model="numberValidateForm"
  label-position="top"
  ref="numberValidateForm"
  :rules="rules_V"
  label-width="100px"
  class="demo-ruleForm"
>
  <el-form-item
    label="年龄"
    prop="age"
    :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]"
  >
    <el-input
      type="age"
      v-model.number="numberValidateForm.age"
      auto-complete="off"
    ></el-input>
  </el-form-item>
  <el-form-item label="身高" prop="height" required>
    <el-input
      type="text"
      v-model="numberValidateForm.height"
      auto-complete="off"
    ></el-input>
  </el-form-item>
  <el-form-item class="demo-form-btns">
    <el-button type="primary" @click="submitForm('numberValidateForm')">
      提交
    </el-button>
    <el-button @click="resetForm('numberValidateForm')">重置</el-button>
    <el-button @click="emptyForm('numberValidateForm')">清空</el-button>
  </el-form-item>
</el-form>
<script>
  export default {
    data() {
      var validateHeight = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('身高不能为空'));
        }
        if (/\D/.test(value)) {
          callback(new Error('只能输入数字值'));
        } else {
          callback();
        }
      };
      return {
        numberValidateForm: {
          age: 18,
          height: '175'
        },
        rules_V: {
          height: [{ validator: validateHeight, trigger: 'blur' }]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid, invalidFields) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            console.log(invalidFields);
            this.$refs[formName].focusFirstField();
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      emptyForm(formName) {
        this.$refs[formName].resetFields(true);
      }
    }
  };
</script>
```

## API

### Form Attributes

| 参数                                         | 说明                                                                             | 类型    | 可选值         | 默认值                                      |
| -------------------------------------------- | -------------------------------------------------------------------------------- | ------- | -------------- | ------------------------------------------- |
| model                                        | 表单数据对象                                                                     | object  | —              | —                                           |
| rules                                        | 表单验证规则                                                                     | object  | —              | —                                           |
| inline                                       | 行内表单模式                                                                     | boolean | —              | false                                       |
| text-form                                    | 纯文本表单，设为 true 会调整表单间距                                             | boolean | —              | false                                       |
| label-position                               | 表单域标签的位置                                                                 | string  | right/left/top | right                                       |
| label-width                                  | 表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值                    | string  | —              | —                                           |
| label-suffix                                 | 表单域标签的后缀                                                                 | string  | —              | —                                           |
| content-width                                | 表单域内容的宽度，作为 Form 直接子元素的 form-item 会继承该值                    | string  | —              | —                                           |
| show-message                                 | 是否显示校验错误信息                                                             | boolean | —              | true                                        |
| message-position                             | 校验错误信息显示位置                                                             | string  | bottom/right   | bottom                                      |
| grid-layout                                  | 支持表单标签和表单项栅格布局，设置为`true`后 label-width 和 content-width 将失效 | boolean | —              | false                                       |
| label-grid                                   | 表单域标签断点栅格数（用法参考 Layout 的 col 控件）                              | object  | —              | { xl: 24, lg: 24, md: 24, sm: 24, sx: 24 }; |
| content-grid                                 | 表单域内容断点栅格数（用法参考 Layout 的 col 控件）                              | object  | —              | { xl: 24, lg: 24, md: 24, sm: 24, sx: 24 }; |
| label-overflow-title                         | label 文字超长后，是否被隐藏且显示 title                                         | Boolean | —              | true                                        |
| gutter                                       | 表单项的间距，建议不要设置到 20 以下，否则错误信息可能会被遮挡                   | Number  | —              | 无默认值，样式中控制默认间距为 24px         |
| validate-on-rule-change <Badge text="2.0+"/> | 是否在 `rules` 属性改变后立即触发一次验证                                        | boolean | —              | true                                        |

### Form Methods

| 方法名                               | 说明                                                       | 参数                                                                                  |
| ------------------------------------ | ---------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| validate                             | 对整个表单进行校验的方法                                   | Function(callback: Function(boolean))                                                 |
| validateField                        | 对部分表单字段进行校验的方法                               | Function(prop: string, callback: Function(errorMessage: string))                      |
| resetValidate <Badge text="2.0+"/>   | 移除某个字段的校验结果，重置规则                           | Function(prop: string, isResetRule: Boolean)                                          |
| resetValidates                       | 对整个表单的校验信息进行重置，移除所有校验结果             | -                                                                                     |
| resetFields                          | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | (isEmpty) 接受一个参数，1. boolean 类型，若为 `true` 则清空所有字段，默认值为 `false` |
| focusFirstField <Badge text="2.0+"/> | 将自动聚焦在第一个错误的表单项中（仅对`el-input`）有效     | -                                                                                     |

### Form Events

| 事件名称                      | 说明                   | 回调参数                             |
| ----------------------------- | ---------------------- | ------------------------------------ |
| validate <Badge text="2.0+"/> | 任一表单项被校验后触发 | 被校验的表单项 prop 值，校验是否通过 |

### Form-Item Attributes

| 参数                          | 说明                                                                              | 类型     | 可选值                                                                                                    | 默认值                                      |
| ----------------------------- | --------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| prop                          | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的      | string   | 传入 Form 组件的 `model` 中的字段                                                                         | —                                           |
| disabled <Badge text="2.0+"/> | 表单项内容是否为禁用状态（禁用状态下不会显示必填标识）                            | Boolean  | -                                                                                                         | false                                       |
| label                         | 标签文本                                                                          | string   | —                                                                                                         | —                                           |
| label-width                   | 表单域标签的的宽度，例如 '50px'，可覆盖父控件的 label-width                       | string   | —                                                                                                         | —                                           |
| content-width                 | 表单域内容的的宽度，例如 '50px'，可覆盖父控件的 content-width                     | string   | —                                                                                                         | —                                           |
| required                      | 是否必填，如不设置，则会根据校验规则自动生成                                      | bolean   | —                                                                                                         | false                                       |
| required-right                | 是否必填的星号是否显示在文字右侧                                                  | bolean   | —                                                                                                         | true                                        |
| rules                         | 表单验证规则                                                                      | object   | —                                                                                                         | —                                           |
| error                         | 表单域验证错误信息, 设置该值会使表单验证状态变为`error`，并显示该错误信息         | string   | —                                                                                                         | —                                           |
| show-message                  | 是否显示校验错误信息                                                              | boolean  | —                                                                                                         | true                                        |
| introduction                  | 表单项的介绍文字                                                                  | string   | -                                                                                                         | ''                                          |
| introduction-icon             | 介绍文字的响应图标                                                                | string   | -                                                                                                         | 'h-icon-help'                               |
| introduction-placement        | 介绍文字的出现位置                                                                | string   | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom                                      |
| introduction-class            | 为介绍文字弹出框添加类名                                                          | string   | -                                                                                                         | -                                           |
| description                   | 表单项描述信息                                                                    | string   | -                                                                                                         | -                                           |
| description-render            | 表单项描述信息的渲染                                                              | Function | -                                                                                                         | -                                           |
| item-group                    | 是否作为群组 Item 的容器                                                          | Boolean  | -                                                                                                         | false                                       |
| label-grid                    | 表单域标签断点栅格数，可覆盖父控件的 label-grid（用法参考 Layout 的 col 控件）    | object   | —                                                                                                         | { xl: 24, lg: 24, md: 24, sm: 24, sx: 24 }; |
| content-grid                  | 表单域内容断点栅格数，可覆盖父控件的 label-grid（用法参考 Layout 的 col 控件）    | object   | —                                                                                                         | { xl: 24, lg: 24, md: 24, sm: 24, sx: 24 }; |
| before-validate               | 表单校验前的回调，返回 false 则不再进行校验，支持 promise。（入参：value，rules） | function | —                                                                                                         | -                                           |
| show-ellipsis                 | 表单错误信息省略显示                                                              | boolean  | -                                                                                                         | false                                       |

### Form-Item Slot

| name                              | 说明             |
| --------------------------------- | ---------------- |
| —                                 | Form Item 的内容 |
| label                             | 标签文本的内容   |
| introduction <Badge text="2.0+"/> | 解释说明文本     |

<script>
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateHeight = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('身高不能为空'));
        }
        if (/\D/.test(value)) {
          callback(new Error('只能输入数字值'));
        } else {
          callback();
        }
      };
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formInline: {
          user: '',
          region: ''
        },
        labelPosition: 'left',
        labelPosition1: 'left',
        labelPosition2: 'left',
        formLabelAlign: {
          name: '',
          region: ''
        },
        formTips: {
          tip1: '',
          tip2: '',
          tip3: '',
          tip4: '',
          tip5: ''
        },
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        descForm: {
          name: '',
          region: ''
        },
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: '',
          ip:'192.168.0.1'
        },
        formLabelWidth: '90px',
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '这是一条很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的错误信息', trigger: 'blur' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ]
        },
        rules2: {
           ip:[{
                validator:(rule, value, callback)=>{
                    console.log(this.ruleForm2.ip)
                    callback(new Error('测试值'))
                },
                trigger: 'blur'
              }],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { type: 'number', required: true, message: '年龄不能为空', trigger: 'blur' },
            { validator: checkAge, trigger: 'blur' }
          ]
        },
        rules_V: {
          height: [
            { validator: validateHeight, trigger: 'blur' }
          ]
        },
        dynamicValidateForm: {
          domains: [{
            value: '',
            key: Date.now()
          }],
          email: ''
        },
        numberValidateForm: {
          age: 18,
          height: '175'
        },
        labelGrid: {
          xl: 6,
          lg: 7,
          md: 7,
          sm: 8,
          xs: 8
        },
        contentGrid: {
          xl: 12,
          lg: 10,
          md: 10,
          sm: 8,
          xs: 8
        },
        btnsContentGrid: {
          xl: {offset: 6, span: 12},
          lg: {offset: 7, span: 10},
          md: {offset: 7, span: 10},
          sm: {offset: 8, span: 8},
          xs: {offset: 8, span: 8}
        }
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid, invalidFields) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            console.log(invalidFields)
            this.$refs[formName].focusFirstField()
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      resetValidates(formName) {
        this.$refs[formName].resetValidates();
      },
      emptyForm(formName) {
        this.$refs[formName].resetFields(true);
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      },
      descriptionRender(h) {
        return (
          <div>
            <div>我是多行的描述信息1</div>
            <div>我是多行的描述信息2</div>
            <div>我是多行的描述信息3</div>
          </div>
        );
      }
    }
  }
</script>

<style lang="scss">
  .demo-form {
    .el-form {
      width: 440px;
    }
    .el-form--grid-layout {
      width: 100%;
    }

    .line {
      text-align: center;
    }

    .el-checkbox-group {
      width: 320px;
      margin: 0;
      padding: 0;
      list-style: none;

      &:after, &:before {
        content: ' ';
        display: table;
      }
      &:after {
        clear: both;
        visibility: hidden;
        font-size: 0;
        height: 0;
      }

      .el-checkbox {
        float: left;
        width: 160px;
        padding-right: 20px;
        margin: 0;
        padding: 0;

        + .el-checkbox {
          margin-left: 0;
        }
      }
    }
    .demo-form-normal {
      width: 440px;
    }
    .demo-form-inline {
      width: auto;

      .el-input {
        width: 150px;
      }
      > * {
        margin-right: 10px;
      }
    }
    .demo-ruleForm {
      width: 460px;
    }
    .demo-ruleForm-right {
      width: auto;
    }
    .demo-dynamic {
      .el-input {
        margin-right: 10px;
        width: 270px;
        vertical-align: top;
      }
    }
    .fr {
      float: right;
    }
    .demo-form-btns {
      margin-top: 48px;
      .el-button {
        min-width: 96px;
      }
    }
  }
  .form-demo {
    .el-date-editor {
      width: 100% !important;
    }
  }
</style>
