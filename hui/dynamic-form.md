# DynamicForm 动态表单 <Badge text="1.8.0+" />

<template>
  <author-info
    :version="versions['dynamic-form']"
    author="吴佳雯6"
  />
</template>

## 安装

```bash
$ npm i @hui-pro/dynamic-form -D
# 或者
$ yarn add @hui-pro/dynamic-form --dev
```

## 引入

```js
import dynamicForm from '@hui-pro/dynamic-form';
import '@hui-pro/pwd-input/theme/index.scss';
Vue.use(dynamicForm);
```

::: tip
有关联调可以直接跳转至 [dynamic-form-plugins](http://xiangxiao3.10.1.74.57.xip.io:8000/dynamic-form-plugins/guide/#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95) 仓库进行联调，如果基础控件无法满足也可以在[dynamic-form-plugins gitlab](http://iris.hikvision.com.cn/xiangxiao3/dynamic-form-plugins)项目中加入自己需要的业务控件，欢迎PR
:::

## 基础用法

<template>
  <code-box title="基础用法" description="用于普通表单">
    <h-dynamic-form
      ref="form"
      :data="basicComponents"
      style="width: 480px; margin-top: 40px; margin-bottom: 14px;">
    </h-dynamic-form>
    <el-button @click="resetBase()">重置表单项</el-button>
  </code-box>
</template>

```html
<h-dynamic-form
  ref="form"
  :data="basicComponents"
  style="width: 480px; margin-top: 40px; margin-bottom: 14px;">
  <el-button @click="resetBase()">重置表单项</el-button>
</h-dynamic-form>

<script>
  export default {
    data() {
      return {
        basicComponents: [{
          model: 'input',
          type: "el-input",
          label: "输入框",
          defaultValue: "",
          props: {
            description: "这是描述",
            placeholder: "请输入啊啊啊",
            tips: "1-32个字符；不能包含'/\:*?<>|这些特殊字符",
            regular: "^[^|':\\\\<>\"/?\\*]+$",
            required: true,
            tipsPlacement: 'top'
          }
        }]
      };
    },
    methods: {
      resetBase(){
        let resetData = [{
          type: 'p',
          content: '重新设置了表单，这是其中一项',
          defaultValue: "",
        }, {
          model: 'input1',
          type: "el-input",
          label: "输入框1",
          defaultValue: ""
        }, {
          model: 'input2',
          type: "el-input",
          label: "输入框2",
          defaultValue: ""
        }]
        this.basicComponents = resetData
      }
    }
  };
</script>
```

## 搜索表单

<template>
  <code-box title="搜索表单" description="用于搜索表单`defaultShow`这个字段控制表单项是否默认收起，默认为`true`，不收起">
    <h-page-container style="height: auto">
      <h-page-content>
        <h-layout direction="vertical">
          <h-dynamic-form
            ref="form"
            :data="searchComponents"
            form-type="h-page-search"
            item-type="h-page-search-item">
            <template slot="pageSearchAction">
              <el-button
                class="page-btn"
                type="primary">
                查询
              </el-button>
              <el-button
                class="page-btn">
                重置
              </el-button>
            </template>
          </h-dynamic-form>
        </h-layout>
      </h-page-content>
    </h-page-container>
  </code-box>
</template>

```html
<h-page-container style="height: auto">
  <h-page-content>
    <h-layout direction="vertical">
      <h-dynamic-form
        ref="form"
        :data="searchComponents"
        formType="h-page-search"
        item-type="h-page-search-item">
        <template slot="pageSearchAction">
          <el-button
            class="page-btn"
            type="primary">
            查询
          </el-button>
          <el-button
            class="page-btn">
            重置
          </el-button>
        </template>
      </h-dynamic-form>
    </h-layout>
  </h-page-content>
</h-page-container>

<script>
  export default {
    data() {
      return {
        searchComponents: [{
          model: 'input',
          type: "el-input",
          label: "输入框",
          defaultValue: ""
        }, {
          model: 'selectSimple',
          type: "el-select",
          label: "下拉单选框",
          defaultValue: "1",
          children: [{
              type: 'el-option',
              props: {
                value: "1",
                label: "IS-TVL000-0-1"
              }
            },
            {
              type: 'el-option',
              props: {
                value: "2",
                label: "DS-TVL001-1-6",
              }
            }
          ]
        }, {
          model: 'selectMultiple',
          type: "el-select",
          label: "下拉多选框",
          defaultValue: [],
          props: {
            multiple: true
          },
          children: [{
              type: 'el-option',
              props: {
                value: "1",
                selected: true,
                label: "IS-TVL000-0-1"
              }
            },
            {
              type: 'el-option',
              props: {
                value: "2",
                selected: false,
                label: "DS-TVL001-1-6"
              }
            }
          ]
        }, {
          model: 'timePick',
          type: 'el-date-picker',
          label: "日期选择器",
          defaultShow: false, // 默认收起
          props: {
            type: "date",
            format: 'yyyy-MM-dd'
          }
        }]
      };
    }
  };
</script>
```

## 组件slot使用

<template>
  <code-box title="组件slot使用" description="slot基础用法">
    <h-dynamic-form
      ref="form"
      :data="slotComponents"
      style="width: 480px; margin-top: 40px; margin-bottom: 14px;">
    </h-dynamic-form>
  </code-box>
</template>

```html
<h-dynamic-form
  ref="form"
  :data="slotComponents"
  style="width: 480px; margin-top: 40px; margin-bottom: 14px;">
</h-dynamic-form>

<script>
  export default {
    data() {
      return {
        slotComponents: [{
          model: 'input',
          type: "el-input",
          label: "输入框",
          defaultValue: "",
          slots: [{
            name: "append",
            children: ["元"]
          }, {
            name: "prepend",
            children: ["$"]
          }]
        }]
      };
    }
  };
</script>
```

## 组件组（如Select 选择器、Checkbox多选框组、Radio多选框组等，注意：这里类似于Checkbox，modal值是label，而不是value，当需要显示的文本值和给后端的code值不一致的情况，可以参考下例中的多选框组的配置）

<template>
  <code-box title="组件组" description="用于组件组">
    <h-dynamic-form
      ref="form"
      :data="groupData"
      style="width: 480px; margin-top: 40px; margin-bottom: 14px;">
    </h-dynamic-form>
  </code-box>
</template>

```html
<h-dynamic-form
  ref="form"
  :data="groupData"
  style="width: 480px; margin-top: 40px; margin-bottom: 14px;">
</h-dynamic-form>

<script>
  export default {
    data() {
      return {
        groupData: [{
          model: 'selectSimple',
          type: "el-select",
          label: "下拉单选框",
          defaultValue: "2",
          children: [{
              type: 'el-option',
              props: {
                value: "1",
                label: "IS-TVL000-0-1"
              }
            },
            {
              type: 'el-option',
              props: {
                value: "2",
                label: "DS-TVL001-1-6"
              }
            }
          ]
        }, {
          model: "checkboxMultiple",
          type: "el-checkbox-group",
          label: "多选框组",
          defaultValue: [],
          children: [{
              type: 'el-checkbox',
              props: {
                label: "1"
              },
              children: ['IS-TVL000-0-1']
            },
            {
              type: 'el-checkbox',
              props: {
                label: "2"
              },
              children: ['IS-TVL000-1-6']
            }
          ]
        }, {
          model: "radioMultiple",
          type: "el-radio-group",
          label: "单选框组",
          defaultValue: '',
          children: [{
              type: 'el-radio-button',
              props: {
                label: "16x32"
              }
            },
            {
              type: 'el-radio-button',
              props: {
                label: "32x64"
              }
            }
          ],
          props: {
            type: "simple",
          }
        }]
      };
    }
  };
</script>
```

## 组件联动

<template>
  <code-box title="组件联动" description="用于组件联动的隐藏和显示">
    <h-dynamic-form
      ref="form"
      :data="linkData"
      style="width: 480px; margin-top: 40px; margin-bottom: 14px;">
    </h-dynamic-form>
  </code-box>
</template>

```html
<h-dynamic-form
  ref="form"
  :data="linkData"
  style="width: 480px; margin-top: 40px; margin-bottom: 14px;">
</h-dynamic-form>

<script>
  export default {
    data() {
      return {
        linkData: [{
          model: 'selectSimple',
          type: "el-select",
          label: "下拉单选框",
          defaultValue: "1",
          children: [{
              type: 'el-option',
              props: {
                value: "1",
                label: "IS-TVL000-0-1"
              }
            },
            {
              type: 'el-option',
              props: {
                value: "2",
                label: "DS-TVL001-1-6"
              }
            }
          ],
          cascades: [{
            value: '1',
            fields: [{
              model: "input",
              hide: false
            }]
          }, {
            value: '2',
            fields: [{
              model: "input",
              hide: true
            }]
          }]
        }, {
          model: 'input',
          type: "el-input",
          label: "输入框",
          defaultValue: ""
        }]
      };
    }
  };
</script>
```

## 基础校验

<template>
  <code-box title="基础校验" description="用于表单基础校验">
    <h-dynamic-form
      ref="form"
      :data="basicCheckData"
      style="width: 480px; margin-top: 40px; margin-bottom: 14px;">
    </h-dynamic-form>
  </code-box>
</template>

```html
<h-dynamic-form
  ref="form"
  :data="basicCheckData"
  :plugin-rules="pluginRules"
  style="width: 480px; margin-top: 40px; margin-bottom: 14px;">
</h-dynamic-form>

<script>
  export default {
    data() {
      return {
        basicCheckData: [{
          model: 'input',
          type: "el-input",
          label: "输入框",
          defaultValue: "",
          props: {
            regular: "^[^|':\\\\<>\"/?\\*]+$",
            required: true,
            tips: "1-32个字符；不能包含'/\:*?<>|这些特殊字符"
          }
        }, {
          model: "ipInput",
          type: "h-ip-input",
          label: "IP输入框",
          defaultValue: '',
          props: {
            tips: "分为4段，每段范围为0~255的整数参考格式127.0.0.1",
            regular: "((([1-9]?\\d|1\\d{2})|2[0-4]\\d|25[0-5])\\.){3}(([1-9]?\\d|1\\d{2})|2[0-4]\\d|25[0-5])",
            required: true
          }
        }]
      };
    }
  };
</script>
```

## 自定义校验规则引入

<template>
  <code-box title="自定义校验规则引入" description="用于自定义校验规则引入">
    <h-dynamic-form
      ref="form"
      :data="simpleData"
      :plugin-rules="pluginRules"
      style="width: 480px; margin-top: 40px; margin-bottom: 14px;">
    </h-dynamic-form>
  </code-box>
</template>

```html
<h-dynamic-form
  ref="form"
  :data="simpleData"
  :plugin-rules="pluginRules"
  style="width: 480px; margin-top: 40px; margin-bottom: 14px;">
</h-dynamic-form>

<script>
  export default {
    data() {
      return {
        simpleData: [{
          type: 'p',
          content: '这里的校验是开发人员自己加的',
          defaultValue: "",
        }, {
          model: 'input1',
          type: "el-input",
          label: "输入框",
          defaultValue: ""
        }, {
          model: 'input2',
          type: "el-input",
          label: "输入框",
          defaultValue: ""
        }],
        pluginRules: {
          input1: [
            {
              required: true,
              message: '自定义1校验信息',
              trigger: 'blur'
            }
          ],
          input2: [
            {
              required: true,
              message: '自定义2校验信息',
              trigger: 'blur'
            }
          ]
        }
      };
    }
  };
</script>
```

## 调用表单校验方法

<template>
  <code-box title="调用表单校验方法" description="用于调用表单校验方法">
    <h-dynamic-form
      ref="checkForm"
      :data="checkData"
      style="width: 480px; margin-top: 40px; margin-bottom: 14px;">
      <template slot='append'>
        <el-button class="page-btn" @click="handlerSimplexClick">保存</el-button>
      </template>
    </h-dynamic-form>
  </code-box>
</template>

```html
<h-dynamic-form
  ref="checkForm"
  :data="checkData"
  style="width: 480px; margin-top: 40px; margin-bottom: 14px;">
  <template slot='append'>
    <el-button class="page-btn" @click="handlerSimplexClick">保存</el-button>
  </template>
</h-dynamic-form>

<script>
  export default {
    data() {
      return {
        checkData: [{
          model: 'input',
          type: "el-input",
          label: "输入框",
          defaultValue: "",
          props: {
            placeholder: "请输入啊啊啊",
            tips: "1-32个字符；不能包含'/\:*?<>|这些特殊字符",
            regular: "^[^|':\\\\<>\"/?\\*]+$",
            required: true,
            tipsPlacement: 'top'
          }
        }, {
          model: "ipInputs",
          type: "ip-inputs",
          label: "IP输入框",
          hide: false,
          props: {
            simpleText: '单个',
            multiText: '区间',
            relatedUnique: "port",
            tips: "分为4段，每段范围为0~255的整数参考格式127.0.0.1",
            regular: "((([1-9]?\\d|1\\d{2})|2[0-4]\\d|25[0-5])\\.){3}(([1-9]?\\d|1\\d{2})|2[0-4]\\d|25[0-5])",
            required: true
          }
        }]
      };
    },
    methods: {
      async handlerSimplexClick () {
        let valid = await this.$refs.checkForm.validate()
        if (valid) {
          let form = this.$refs.checkForm.getForm()
          console.log(form)
        }
      }
    }
  };
</script>
```

## 复杂校验方法

<template>
  <code-box title="复杂校验方法" description="基于validator做的复杂校验方式，具体参考链接 https://github.com/validatorjs/validator.js#validators; ；另一是dyFunction，需要挂在到vue实例上，记得删除哦！">
    <h-dynamic-form
      ref="checkComplexForm"
      :data="checkComplexData"
      style="width: 480px; margin-top: 40px; margin-bottom: 14px;">
    </h-dynamic-form>
  </code-box>
</template>

```html
<h-dynamic-form
  ref="checkComplexForm"
  :data="checkComplexData"
  style="width: 480px; margin-top: 40px; margin-bottom: 14px;">
  <template slot='append'>
    <el-button class="page-btn" @click="handlerComplexClick">保存</el-button>
  </template>
</h-dynamic-form>

<script>
  export default {
    data() {
      return {
        checkComplexData: [{
          model: 'input',
          type: "el-input",
          label: "输入框",
          defaultValue: "",
          props: {
            placeholder: "输入3~1000的数字",
            validators: [{
              "method": "isInt",
              "args": [{
                min: 3,
                max: 1000
              }],
              "message": "输入3~1000的数字"
            }]
          }
        }, {
          model: 'input2',
          type: "el-input",
          label: "输入框",
          defaultValue: "",
          props: {
            placeholder: "xx",
            validators: [{
              "method": "isxx",
              "type": "dyFunction",
              "args": [],
              "message": "这个是我配置的function isxx，必须填入xx"
            }]
          }
        }]
      };
    },
    created () {
      if(typeof Vue.prototype.$dyValidator !== "object"){
        Vue.prototype.$dyValidator = {}
      }
      Vue.prototype.$dyValidator.isxx = (value) => {
        if (value === "xx") {
          return true
        }
        return false
      }    
    },
    beforeDestroy () {
      Vue.prototype.$dyValidator.isxx = null
    }
  };
</script>
```

## 回填表单信息方法

<template>
  <code-box title="回填表单信息方法" description="用于回填表单信息方法">
    <h-dynamic-form
      ref="fillForm"
      :data="fillData"
      style="width: 480px; margin-top: 40px; margin-bottom: 14px;"
      @form-init="handlerFormInit">
    </h-dynamic-form>
  </code-box>
</template>

```html
<h-dynamic-form
  ref="fillForm"
  :data="fillData"
  style="width: 480px; margin-top: 40px; margin-bottom: 14px;"
  @form-init="handlerFormInit">
</h-dynamic-form>

<script>
  export default {
    data() {
      return {
        fillData: [{
          model: 'input',
          type: "el-input",
          label: "输入框",
          defaultValue: "",
        }, {
          model: 'timePick',
          type: 'el-date-picker',
          label: "日期选择器",
          defaultValue: "",
          props: {
            type: "date",
            format: 'yyyy-MM-dd'
          }
        }]
      };
    },
    methods: {
      handlerFormInit () {
        let form = {
          input: '回填输入框',
          timePick: '2019-08-22'
        }
        this.$refs.fillForm.setForm(form)
      }
    }
  };
</script>
```

## hui全量表单项用法

<template>
  <code-box title="基础用法" description="用于普通表单">
    <h-dynamic-form
      ref="form"
      :data="formComponents"
      style="width: 480px; margin-top: 40px; margin-bottom: 14px;">
    </h-dynamic-form>
  </code-box>
</template>

```html
<h-dynamic-form
  ref="form"
  :data="basicComponents"
  style="width: 480px; margin-top: 40px; margin-bottom: 14px;">
</h-dynamic-form>

<script>
  export default {
    data() {
      return {
        formComponents: [{
          type: 'p',
          content: '啊啊啊啊啊啊',
          class: 'asasas'
        }, {
          type: 'img',
          props: {
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584964599193&di=35635236b043e2907e42657790c1b5d0&imgtype=0&src=http%3A%2F%2Fcase.52design.com%2Fupfiles%2F201107%2FL110719259198.jpg',
          },
          content: '啊啊啊啊啊啊',
          class: 'form-img'
        }, {
          model: 'input',
          type: "el-input",
          label: "输入框",
          defaultValue: ""
        }, {
          model: 'selectSimple',
          type: "el-select",
          label: "下拉单选框",
          defaultValue: "",
          children: [{
              type: 'el-option',
              props: {
                value: "1",
                selected: true,
                label: "IS-TVL000-0-1"
              }
            },
            {
              type: 'el-option',
              props: {
                value: "2",
                selected: false,
                label: "DS-TVL001-1-6"
              }
            }
          ]
        }, {
          model: 'selectMultiple',
          type: "el-select",
          label: "下拉多选框",
          defaultValue: [],
          children: [{
              type: 'el-option',
              props: {
                value: "1",
                selected: true,
                label: "IS-TVL000-0-1"
              }
            },
            {
              type: 'el-option',
              props: {
                value: "2",
                selected: false,
                label: "DS-TVL001-1-6"
              }
            }
          ],
          props: {
            multiple: true,
          }
        }, {
          model: 'timePick',
          type: 'el-date-picker',
          label: "日期选择器",
          defaultValue: '',
          props: {
            type: "date",
            format: 'yyyy-MM-dd',
            name: "日期选择器"
          }
        }, {
          model: "checkboxSimple",
          type: "el-checkbox",
          label: "多选框",
          defaultValue: true,
          props: {
            label: "多选框"
          }
        }, {
          model: "checkboxMultiple",
          type: "el-checkbox-group",
          label: "多选框组",
          defaultValue: [],
          children: [{
            type: 'el-checkbox',
            props: {
              label: "1"
            },
            children: ['IS-TVL000-0-1']
          },
          {
            type: 'el-checkbox',
            props: {
              label: "2"
            },
            children: ['IS-TVL000-1-6']
          }]
        }, {
          model: 'radioSimple',
          type: "el-radio",
          label: "单选框",
          defaultValue: '单选框',
        }, {
          model: "radioMultiple",
          type: "el-radio-group",
          label: "单选框组",
          defaultValue: '',
          children: [{
              type: 'el-radio-button',
              props: {
                label: "16x32"
              }
            },
            {
              type: 'el-radio-button',
              props: {
                label: "32x64"
              }
            }
          ],
          props: {
            type: "simple"
          }
        }, {
          model: 'switch',
          type: "el-switch",
          label: '开关',
          defaultValue: false,
          props: {
            width: 52
          }
        }, {
          model: "pwdInput",
          type: "h-pwd-input",
          label: "密码输入框",
          defaultValue: ''
        }, {
          model: "inputNumber",
          type: "el-input-number",
          label: "数字输入框",
          defaultValue: ''
        }, {
          model: "ipInput",
          type: "h-ip-input",
          label: "IP输入框",
          defaultValue: ''
        }]
      };
    }
  };
</script>
```

<script>
  import Vue from "vue"
  import dynamicFormData from './dynamicFormData'
  const versions = require('docs/.vuepress/src/version.json');
  export default {
    data() {
      return {
        versions,
        basicComponents: dynamicFormData.basicComponents,
        formComponents: dynamicFormData.formComponents,
        searchComponents: dynamicFormData.searchComponents,
        slotComponents: dynamicFormData.slotComponents,
        groupData: dynamicFormData.groupData,
        linkData: dynamicFormData.linkData,
        basicCheckData: dynamicFormData.basicCheckData,
        simpleData: dynamicFormData.simpleData,
        checkData: dynamicFormData.checkData,
        checkComplexData:dynamicFormData.checkComplexData,
        fillData: dynamicFormData.fillData,
        form: {},
        pluginRules: {
          input1: [
            {
              required: true,
              message: '自定义1校验信息',
              trigger: 'blur'
            }
          ],
          input2: [
            {
              required: true,
              message: '自定义2校验信息',
              trigger: 'blur'
            }
          ],
        }
      }
    },
    methods: {
      async handlerSimplexClick () {
        let valid = await this.$refs.checkForm.validate()
        if (valid) {
          let form = this.$refs.checkForm.getForm()
          console.log(form)
        }
      },
      handlerFormInit () {
        let form = {
          input: '回填输入框',
          timePick: '2019-08-22'
        }
        this.$refs.fillForm.setForm(form)
      },
      resetBase(){
        this.basicComponents = dynamicFormData.resetData
      }
    },
    created () {
      if(typeof Vue.prototype.$dyValidator !== "object"){
        Vue.prototype.$dyValidator = {}
      }
      Vue.prototype.$dyValidator.isxx = (value) => {
        if (value === "xx") {
          return true
        }
        return false
      }    
    },
    beforeDestroy () {
      Vue.prototype.$dyValidator.isxx = null
    }
  }
</script>

<style>
.form-img {
  width: 80px;
}
</style>

## API

### Attributes

| 参数           | 说明                                                                                                                       | 类型           | 可选值                                                                                                    | 默认值     |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------- | ---------- |
| form-type          | 表单类型                                                                                                                        | String | el-form/h-page-search                                                                                                         | el-form          |
| item-type       | 表单项类型                                                                               | String        | el-form-item/h-page-search-item | el-form-item      |
| **data**          | 表单组件数据  **必选参数**           | Array         | -                | -     |
| show-label          | 是否显示组件文本                | Boolean         | -                | true     |
| form-config      | 表单配置（参考Form Attributes）     | Object       | -         | {labelPosition: 'top'}          |
| plugin-rules    | 自定义字段校验规则                                                                                                             | Array/Object       | -                                                                                                         | -          |

### Data

| 参数           | 说明                                                                                                                       | 类型           | 可选值                                                                                                    | 默认值     |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------- | ---------- |
| **type**       | 组件类型 **必选参数**                                                                      | String        | el-input/el-select/el-date-picker/el-checkbox/el-checkbox-group/el-radio/el-radio-group/el-switch/el-input-number/h-pwd-input/h-ip-input                                                                                                         | -          |
| **model**      | 绑定属性 **必选参数**                                                         | String        | - | -      |
| defaultShow      | 用于搜索表单， 表示是否默认开启高级搜索，初始化时隐藏此项                       | Boolean        | - | true      |
| **label**      | 组件文本 **必选参数**                                                         | String         | -                                                                                                         | ''     |
| hide      | 是否隐藏     | Boolean       | -         | false          |
| **defaultValue**      | 默认值 **必选参数**     | String, Number, Boolean       | 各主要组件对应的值：el-input: '' / el-select(单选): '' / el-select(多选): [] / el-date-picker(单个时间): '' / el-date-picker(时间段): [] / el-checkbox: false / el-checkbox-group: [] / el-radio: '' / el-radio-group: [] / el-switch: false /  el-input-number: 0 / h-pwd-input: '' / h-ip-input: ''     | -          |
| order    | 排序字段                                                                                                             | Number         | -                                                                                                         | -          |
| props   | 引用组件的属性以及校验等信息({description: '', regular: null, required: true, tips: ''}) 如无需相应配置则可不设置此参数               | Object         | -                                                                                                   | -          |
| slots  |  当前表单项的 slot 数据          | Object   | -         | - |
| children  | 子组件信息(每个子组件数据可为对象或字符串，为对象时，对应的参数如下children列表)                                                                           | Array   | -                                                                                                         | [] |
| cascades           | 联动组件信息                                                                                                      | Array         | -                                                                                                         | -          |
| ...           | 其他form-itrm支持的属性， 如 introduction 等         | string/Boolean/object         | -                       | -          |

### children

| 参数           | 说明                                                                                                                       | 类型           | 可选值                                                                                                    | 默认值     |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------- | ---------- |
| **type**       | 组件类型 **必选参数**                      | String        | 常用值el-option/el-checkbox/el-radio     | -          |
| props   | 子组件的属性({}) 如无需相应配置则可不设置此参数               | Object         | -          | -          |
| children  | 子组件信息(理论上可无限嵌套)                         | Array   | -               | [] |

### slots

| 参数           | 说明                                                                                                                       | 类型           | 可选值                                                                                                    | 默认值     |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------- | ---------- |
| **name**          | slot name                     | String     | prefix/suffix/prepend/append等当前表单项支持的slot name          | -          |
| **children**       | slot 内容               | Array        | - | []      |

### cascades

| 参数           | 说明                                                                                                                       | 类型           | 可选值                                                                                                    | 默认值     |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------- | ---------- |
| **value**          | 选中值 **必选参数**                     | String, Number, Boolean     | -          | -          |
| **fields**       | fields数组里对于的是需要更改渲染的表单项数据(无需列全，只要把需要更改的属性列一下，且只能向下联动，即只能联动排序比自身靠后的表单项) **必选参数**                     | Array        | - | -      |


### Dynamic Form slot

| name                               | 说明                                                                                |
| ---------------------------------- | ----------------------------------------------------------------------------------- |
| pageSearchAction                   | 搜索表单按钮                                                              |
| prepend                            | 所有表单项前面，插入自定义表单项                                                     |
| append                               | 所有表单项末尾，插入自定义表单项                                                                          |


### Form Methods
|参数|说明|参数|
|---------- |-------------- |---------- |
|getForm|获取表单信息|-|
|setForm|设置表单信息|(form) 完整的表单字段信息|
|formInit|回填表单数据|-|
|setFormItem|设置表单项信息|(key, value) key：表单属性；value：表单值|
|getFormItem|设置表单项信息|(key) key：表单属性|
|getFormRef|获取当前动态表单组件的注册引用信息|-|
|resetFields|对整个表单的信息进行重置，包括移除所有校验结果|-|
|resetValidates|移除所有的表单校验信息|-|
|validate|对整个表单进行校验，调用时需要使用await|-|

::: tip 自定义组件的额外说明

- 表单校验：调用的自定义组件需要在提交时进行组件内表单校验时，请在组件调用时 'ref' 属性命名前加上 'dynamic-' ,若是自定义组件内部有特殊校验请名称方法名为'validate', 若无特殊校验可不写此方法
  :::