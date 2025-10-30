# AddFormItem 逐条添加

<template>
  <author-info
    :version="versions['add-form-item']"
    author="姜炎6"
    ux="苗任越"
    ui="江佳欢"
    standard="http://10.33.43.73/BBG_UED/BUI_Design/bscs/v2.0/issues/10"
    reviewed
  />
</template>

## 安装

```bash
$ npm i @hui-pro/add-form-item -D
# 或者
$ yarn add @hui-pro/add-form-item --dev
```

## 引入

```js
import addFormItem from '@hui-pro/add-form-item';
import '@hui-pro/add-form-item/theme/index.scss';
Vue.use(addFormItem);
```

## 设计思路

逐条添加场景比较灵活多变，直接封装业务逻辑会导致控件的限制特别多，不能适应灵活多变的场景；所以目前主要是封装了布局的逻辑，而实际的业务逻辑由开发者自行处理，这里牺牲了复用度，但提高了灵活度。这里主要是参考实现方式，现实业务中的各种细节需要自行实现，把这里当做典型页面来理解可能更合适一些。

## 基础用法

<template>
<code-box title="基础用法" description="添加单项内容，该场景通过在item-group类型的el-form-item下使用多个h-add-form-item-single标签实现，h-add-form-item-single是对el-form-item的再次封装，API与el-form-item完全一致">
  <el-form :model="singleItemForm" :rules="rules" ref="addFormItemSingle" label-position="top" class="demo-ruleForm">
    <el-form-item label="品牌名称" prop="brand">
      <el-input v-model="singleItemForm.brand"></el-input>
    </el-form-item>
    <el-form-item label="详细说明" prop="desc">
      <el-input type="textarea" v-model="singleItemForm.desc"></el-input>
    </el-form-item>
    <el-form-item label="子品牌" item-group style="margin-bottom: 24px;">
      <h-add-form-item-single v-for="item,i in singleItemForm.subBrand" :key="i" :prop="`subBrand[${i}].value`" :rules="[
            { required: true, message: '请输入子品牌名称', },
            { min: 3, max: 5, message: '输入3到5个字符' }
        ]">
        <el-input v-model="item.value"></el-input>
        <el-button slot="operate" icon="h-icon-delete" @click="delSingleInput(i)"/>
      </h-add-form-item-single>
      <h-add-form-item-btn icon="h-icon-add" @click="addSingleInput" :totalNum="6"
                           :currentNum="singleItemForm.subBrand.length">
                           添加
      </h-add-form-item-btn>
    </el-form-item>
    <el-form-item class="demo-form-btns">
      <el-button type="primary" @click="submitForm('addFormItemSingle')">立即创建</el-button>
      <el-button @click="resetFields('addFormItemSingle')">重置</el-button>
      <el-button @click="resetValidates('addFormItemSingle')">清除校验信息</el-button>
    </el-form-item>
  </el-form>
</code-box>
</template>

```html
<el-form
  :model="singleItemForm"
  :rules="rules"
  ref="addFormItemSingle"
  label-position="top"
  class="demo-ruleForm"
>
  <el-form-item label="品牌名称" prop="brand">
    <el-input v-model="singleItemForm.brand"></el-input>
  </el-form-item>
  <el-form-item label="详细说明" prop="desc">
    <el-input type="textarea" v-model="singleItemForm.desc"></el-input>
  </el-form-item>
  <el-form-item label="子品牌" item-group style="margin-bottom: 24px;">
    <h-add-form-item-single
      v-for="item,i in singleItemForm.subBrand"
      :key="i"
      :prop="`subBrand[${i}].value`"
      :rules="[
          { required: true, message: '请输入子品牌名称', },
          { min: 3, max: 5, message: '输入3到5个字符' }
      ]"
    >
      <el-input v-model="item.value"></el-input>
      <el-button
        slot="operate"
        icon="h-icon-delete"
        @click="delSingleInput(i)"
      />
    </h-add-form-item-single>
    <h-add-form-item-btn
      icon="h-icon-add"
      @click="addSingleInput"
      :totalNum="6"
      :currentNum="singleItemForm.subBrand.length"
    >
      添加
    </h-add-form-item-btn>
  </el-form-item>
  <el-form-item class="demo-form-btns">
    <el-button type="primary" @click="submitForm('addFormItemSingle')">
      立即创建
    </el-button>
    <el-button @click="resetFields('addFormItemSingle')">重置</el-button>
    <el-button @click="resetValidates('addFormItemSingle')">
      清除校验信息
    </el-button>
  </el-form-item>
</el-form>

<script>
  export default {
    name: 'addFormItemDemo',
    data() {
      return {
        rules: {
          brand: [
            { required: true, message: '请输入活动名称' },
            { min: 3, max: 5, message: '输入3到5个字符' }
          ],
          desc: [
            { required: true, message: '请输入活动名称' },
            { min: 3, max: 5, message: '输入3到5个字符' }
          ]
        },
        singleItemForm: {
          brand: '',
          desc: '',
          subBrand: [{ value: 'A6L' }, { value: 'A4L' }]
        }
      };
    },
    methods: {
      resetFields(formName) {
        this.$refs[formName].resetFields();
      },
      resetValidates(formName) {
        this.$refs[formName].resetValidates();
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$message.success('submit');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addSingleInput() {
        this.singleItemForm.subBrand.push({ value: '' });
      },
      delSingleInput(index) {
        this.singleItemForm.subBrand.splice(index, 1);
      }
    }
  };
</script>
```

## 横向排布(按行添加)

<template>
<code-box title="横向排布" description="横向排布，也即是按行添加内容，该场景通过在item-group类型的el-form-item下使用表格实现，表格中使用自定义模板，通过h-add-form-item-row布局，h-add-form-item-row是对el-form-item的再次封装，API与el-form-item完全一致；注意，这里表格中表头上的必填项标识是自己实现的，具体参考demo写法。">
  <el-form :model="addFormItemRow" :rules="addFormItemRowRule" ref="addFormItemRow" label-position="top" class="demo-ruleForm">
    <el-form-item label="项目名称" prop="name">
      <el-input v-model="addFormItemRow.name"></el-input>
    </el-form-item>
    <el-form-item label="详细说明" prop="desc">
      <el-input type="textarea" v-model="addFormItemRow.desc"></el-input>
    </el-form-item>
    <el-form-item label="名称" item-group style="margin-bottom: 24px;">
      <el-table :data="addFormItemRow.rowFormData" :cell-style="{'vertical-align': 'middle'}">
        <el-table-column prop="code" :ishtml="true" label="<span>工号<i style='margin-left: 4px;color: #fa3239'>*</i></span>">
          <template slot-scope="scope">
            <h-add-form-item-row :prop="`rowFormData[${scope.$index}].code`" :rules="[
                { required: true, message: '请输入活动名称', },
                { min: 3, max: 5, message: '输入3到5个字符' }
              ]"
            >
              <el-input v-model="scope.row.code"></el-input>
            </h-add-form-item-row>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名">
          <template slot-scope="scope">
            <h-add-form-item-row :prop="`rowFormData[${scope.$index}].name`" :rules="[
                { required: true, message: '请输入活动名称', },
                { min: 3, max: 5, message: '输入3到5个字符' }
              ]"
            >
              <el-input v-model="scope.row.name"></el-input>
            </h-add-form-item-row>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期">
          <template slot-scope="scope">
            <h-add-form-item-row :prop="`rowFormData[${scope.$index}].date`" :rules="[
                { required: true, message: '请输入活动名称', }
              ]"
            >
              <el-date-picker v-model="scope.row.date" type="date" placeholder="请选择日期"></el-date-picker>
            </h-add-form-item-row> 
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button slot="operate" icon="h-icon-delete" @click="delRowFormData(scope.$index)"/>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn-wrapper" style="border: 1px solid rgba(0,0,0,0.08);padding: 4px;margin-top: -1px;">
        <h-add-form-item-btn icon="h-icon-add" @click="addRowFormData" :totalNum="8"
                           :currentNum="addFormItemRow.rowFormData.length">
                           添加
        </h-add-form-item-btn>
      </div>
    </el-form-item>
    <el-form-item class="demo-form-btns">
      <el-button type="primary" @click="submitForm('addFormItemRow')">立即创建</el-button>
      <el-button @click="resetFields('addFormItemRow')">重置</el-button>
      <el-button @click="resetValidates('addFormItemRow')">清除校验信息</el-button>
    </el-form-item>
  </el-form>
</code-box>
</template>

```html
<el-form
  :model="addFormItemRow"
  :rules="addFormItemRowRule"
  ref="addFormItemRow"
  label-position="top"
  class="demo-ruleForm"
>
  <el-form-item label="项目名称" prop="name">
    <el-input v-model="addFormItemRow.name"></el-input>
  </el-form-item>
  <el-form-item label="详细说明" prop="desc">
    <el-input type="textarea" v-model="addFormItemRow.desc"></el-input>
  </el-form-item>
  <el-form-item label="名称" item-group style="margin-bottom: 24px;">
    <!-- 注意，这里需要在table上增加居中对齐的样式 -->
    <el-table
      :data="addFormItemRow.rowFormData"
      :cell-style="{'vertical-align': 'middle'}"
    >
      <el-table-column
        prop="code"
        :ishtml="true"
        label="<span>工号<i style='margin-left: 4px;color: #fa3239'>*</i></span>"
      >
        <template slot-scope="scope">
          <h-add-form-item-row
            :prop="`rowFormData[${scope.$index}].code`"
            :rules="[
              { required: true, message: '请输入活动名称', },
              { min: 3, max: 5, message: '输入3到5个字符' }
            ]"
          >
            <el-input v-model="scope.row.code"></el-input>
          </h-add-form-item-row>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名">
        <template slot-scope="scope">
          <h-add-form-item-row
            :prop="`rowFormData[${scope.$index}].name`"
            :rules="[
              { required: true, message: '请输入活动名称', },
              { min: 3, max: 5, message: '输入3到5个字符' }
            ]"
          >
            <el-input v-model="scope.row.name"></el-input>
          </h-add-form-item-row>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="日期">
        <template slot-scope="scope">
          <h-add-form-item-row
            :prop="`rowFormData[${scope.$index}].date`"
            :rules="[
              { required: true, message: '请输入活动名称', }
            ]"
          >
            <el-date-picker
              v-model="scope.row.date"
              type="date"
              placeholder="请选择日期"
            ></el-date-picker>
          </h-add-form-item-row>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="操作">
        <template slot-scope="scope">
          <el-button
            slot="operate"
            icon="h-icon-delete"
            @click="delRowFormData(scope.$index)"
          />
        </template>
      </el-table-column>
    </el-table>
    <div
      class="btn-wrapper"
      style="border: 1px solid rgba(0,0,0,0.08);padding: 4px;margin-top: -1px;"
    >
      <h-add-form-item-btn
        icon="h-icon-add"
        @click="addRowFormData"
        :totalNum="8"
        :currentNum="addFormItemRow.rowFormData.length"
      >
        添加
      </h-add-form-item-btn>
    </div>
  </el-form-item>
  <el-form-item class="demo-form-btns">
    <el-button type="primary" @click="submitForm('addFormItemRow')">
      立即创建
    </el-button>
    <el-button @click="resetFields('addFormItemRow')">重置</el-button>
    <el-button @click="resetValidates('addFormItemRow')">
      清除校验信息
    </el-button>
  </el-form-item>
</el-form>
<script>
  export default {
    name: 'addFormItemDemo',
    data() {
      return {
        addFormItemRowRule: {
          name: [
            { required: true, message: '请输入活动名称' },
            { min: 3, max: 5, message: '输入3到5个字符' }
          ],
          desc: [
            { required: true, message: '请输入活动名称' },
            { min: 3, max: 5, message: '输入3到5个字符' }
          ]
        },
        addFormItemRow: {
          name: '',
          desc: '',
          rowFormData: [
            {
              code: '10050401',
              name: '张全蛋',
              date: '2019-04-26'
            }
          ]
        }
      };
    },
    methods: {
      resetFields(formName) {
        this.$refs[formName].resetFields();
      },
      resetValidates(formName) {
        this.$refs[formName].resetValidates();
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$message.success('submit');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addRowFormData() {
        this.addFormItemRow.rowFormData.push({
          code: '',
          name: '',
          date: ''
        });
      },
      delRowFormData(index) {
        this.addFormItemRow.rowFormData.splice(index, 1);
      }
    }
  };
</script>
```

## 纵向排布(按列添加)

<template>
<code-box title="纵向排布" description="纵向排布，也即是将多行表单项组成一列来添加内容，该场景通过在item-group类型的el-form-item下使用h-add-form-item-col实现，h-add-form-item-col内部按实际业务场景放el-form-item即可，h-add-form-item-col主要负责布局，不影响表单的任何特性；具体参考下方的demo。">
  <el-form :model="addFormItemCol" :rules="addFormItemColRule" ref="addFormItemCol" label-position="top" class="demo-ruleForm">
    <el-form-item label="项目名称" prop="name">
      <el-input v-model="addFormItemRow.name"></el-input>
    </el-form-item>
    <el-form-item label="详细说明" prop="desc">
      <el-input type="textarea" v-model="addFormItemRow.desc"></el-input>
    </el-form-item>
    <el-form-item label="房屋信息" item-group style="margin-bottom: 24px;">
      <h-add-form-item-col v-for="item,i in addFormItemCol.colFormData"
                         :key="i" @delete="delColFormData(i)"
      >
        <el-form-item :key="`${i}.name`" label="小区名称" :prop="`colFormData[${i}].name`" :rules="[
              { required: true, message: '请输入活动名称', },
              { min: 3, max: 5, message: '输入3到5个字符' }
          ]">
          <el-input v-model="item.name"></el-input>
        </el-form-item>
        <el-form-item :key="`${i}.code`" label="门牌号" :prop="`colFormData[${i}].code`" :rules="[
              { required: true, message: '请输入活动名称', },
              { min: 3, max: 5, message: '输入3到5个字符' }
          ]">
          <el-input v-model="item.code"></el-input>
        </el-form-item>
        <el-form-item :key="`${i}.owner`" label="户主" :prop="`colFormData[${i}].owner`" :rules="[
              { required: true, message: '请输入活动名称', },
              { min: 3, max: 5, message: '输入3到5个字符' }
          ]">
          <el-input v-model="item.owner"></el-input>
        </el-form-item>
        <el-form-item :key="`${i}.area`" label="面积" :prop="`colFormData[${i}].area`" :rules="[
              { required: true, message: '请输入活动名称', },
              { min: 3, max: 5, message: '输入3到5个字符' }
          ]">
          <el-input v-model="item.area"></el-input>
        </el-form-item>
        <!-- 自定义按钮的实例代码 -->
        <!-- <el-button slot="operate-btn" @click="delColFormDataCustom(i)">自定义按钮</el-button> -->
      </h-add-form-item-col>
      <h-add-form-item-btn icon="h-icon-add" @click="addColFormData" :totalNum="4"
                           :currentNum="addFormItemCol.colFormData.length">
                           添加
      </h-add-form-item-btn>
    </el-form-item>
    <el-form-item class="demo-form-btns">
      <el-button type="primary" @click="submitForm('addFormItemCol')">立即创建</el-button>
      <el-button @click="resetFields('addFormItemCol')">重置</el-button>
      <el-button @click="resetValidates('addFormItemCol')">清除校验信息</el-button>
    </el-form-item>
  </el-form>
</code-box>
</template>

```html
<el-form
  :model="addFormItemCol"
  :rules="addFormItemColRule"
  ref="addFormItemCol"
  label-position="top"
  class="demo-ruleForm"
>
  <el-form-item label="项目名称" prop="name">
    <el-input v-model="addFormItemRow.name"></el-input>
  </el-form-item>
  <el-form-item label="详细说明" prop="desc">
    <el-input type="textarea" v-model="addFormItemRow.desc"></el-input>
  </el-form-item>
  <el-form-item label="房屋信息" item-group style="margin-bottom: 24px;">
    <h-add-form-item-col
      v-for="item,i in addFormItemCol.colFormData"
      :key="i"
      @delete="delColFormData(i)"
    >
      <el-form-item
        :key="`${i}.name`"
        label="小区名称"
        :prop="`colFormData[${i}].name`"
        :rules="[
            { required: true, message: '请输入活动名称', },
            { min: 3, max: 5, message: '输入3到5个字符' }
        ]"
      >
        <el-input v-model="item.name"></el-input>
      </el-form-item>
      <el-form-item
        :key="`${i}.code`"
        label="门牌号"
        :prop="`colFormData[${i}].code`"
        :rules="[
            { required: true, message: '请输入活动名称', },
            { min: 3, max: 5, message: '输入3到5个字符' }
        ]"
      >
        <el-input v-model="item.code"></el-input>
      </el-form-item>
      <el-form-item
        :key="`${i}.owner`"
        label="户主"
        :prop="`colFormData[${i}].owner`"
        :rules="[
            { required: true, message: '请输入活动名称', },
            { min: 3, max: 5, message: '输入3到5个字符' }
        ]"
      >
        <el-input v-model="item.owner"></el-input>
      </el-form-item>
      <el-form-item
        :key="`${i}.area`"
        label="面积"
        :prop="`colFormData[${i}].area`"
        :rules="[
            { required: true, message: '请输入活动名称', },
            { min: 3, max: 5, message: '输入3到5个字符' }
        ]"
      >
        <el-input v-model="item.area"></el-input>
      </el-form-item>
    </h-add-form-item-col>
    <h-add-form-item-btn
      icon="h-icon-add"
      @click="addColFormData"
      :totalNum="4"
      :currentNum="addFormItemCol.colFormData.length"
    >
      添加
    </h-add-form-item-btn>
  </el-form-item>
  <el-form-item class="demo-form-btns">
    <el-button type="primary" @click="submitForm('addFormItemCol')">
      立即创建
    </el-button>
    <el-button @click="resetFields('addFormItemCol')">重置</el-button>
    <el-button @click="resetValidates('addFormItemCol')">
      清除校验信息
    </el-button>
  </el-form-item>
</el-form>

<script>
  export default {
    name: 'addFormItemDemo',
    data() {
      return {
        addFormItemColRule: {
          name: [
            { required: true, message: '请输入活动名称' },
            { min: 3, max: 5, message: '输入3到5个字符' }
          ],
          desc: [
            { required: true, message: '请输入活动名称' },
            { min: 3, max: 5, message: '输入3到5个字符' }
          ]
        },
        addFormItemCol: {
          name: '',
          desc: '',
          colFormData: [
            {
              name: '玉兰花园',
              code: '1-504',
              owner: '罗伯特唐尼',
              area: '89'
            }
          ]
        }
      };
    },
    methods: {
      resetFields(formName) {
        this.$refs[formName].resetFields();
      },
      resetValidates(formName) {
        this.$refs[formName].resetValidates();
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$message.success('submit');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addColFormData() {
        this.addFormItemCol.colFormData.push({
          name: '',
          code: '',
          owner: '',
          area: ''
        });
      },
      delColFormData(index) {
        this.addFormItemCol.colFormData.splice(index, 1);
      }
    }
  };
</script>
```

<script>
const versions = require('docs/.vuepress/src/version.json');
export default {
  name: 'addFormItemDemo',
  data () {
    return {
      versions,
      rules: {
        brand: [
          { required: true, message: '请输入活动名称', },
          { min: 3, max: 5, message: '输入3到5个字符' }
        ],
        desc: [
          { required: true, message: '请输入活动名称', },
          { min: 3, max: 5, message: '输入3到5个字符' }
        ]
      },
      singleItemForm: {
        brand: '',
        desc: '',
        subBrand: [{value: 'A6L'}, {value: 'A4L'}]
      },
      addFormItemRowRule: {
        name: [
          { required: true, message: '请输入活动名称', },
          { min: 3, max: 5, message: '输入3到5个字符' }
        ],
        desc: [
          { required: true, message: '请输入活动名称', },
          { min: 3, max: 5, message: '输入3到5个字符' }
        ]
      },
      addFormItemRow: {
        name: '',
        desc: '',
        rowFormData: [
          {
            code: '10050401',
            name: '张全蛋',
            date: '2019-04-26'
          }
        ]
      },
      addFormItemColRule: {
        name: [
          { required: true, message: '请输入活动名称', },
          { min: 3, max: 5, message: '输入3到5个字符' }
        ],
        desc: [
          { required: true, message: '请输入活动名称', },
          { min: 3, max: 5, message: '输入3到5个字符' }
        ]
      },
      addFormItemCol: {
        name: '',
        desc: '',
        colFormData: [
          {
            name: '玉兰花园',
            code: '1-504',
            owner: '罗伯特唐尼',
            area: '89'
          }
        ]
      }
    }
  },
  methods: {
    resetFields (formName) {
      this.$refs[formName].resetFields()
    },
    resetValidates (formName) {
      this.$refs[formName].resetValidates()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.success('submit');
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addSingleInput () {
      this.singleItemForm.subBrand.push({value: ''})
    },
    delSingleInput (index) {
      this.singleItemForm.subBrand.splice(index, 1)
    },
    addRowFormData () {
      this.addFormItemRow.rowFormData.push({
        code: '',
        name: '',
        date: ''
      })
    },
    delRowFormData (index) {
      this.addFormItemRow.rowFormData.splice(index, 1)
    },
    addColFormData () {
      this.addFormItemCol.colFormData.push({
        name: '',
        code: '',
        owner: '',
        area: ''
      })
    },
    delColFormData (index) {
      this.addFormItemCol.colFormData.splice(index, 1)
    },
    delColFormDataCustom(index) {
      console.log('自定义删除')
      console.log(index)
    }
  }
}
</script>
<style>
.demo-ruleForm {
  width: 600px;
}
</style>

## API

该控件实际上涉及到四个相关子控件:add-form-item-single,add-form-item-row,add-form-item-col,add-form-item-btn，需要使用者根据场景自行挑选。下面分别进行说明。

## add-form-item-single

单个项目添加

### Attributes & Events

与 el-form-item 一致

### slot

| 名称    | 说明               | 作用                                       |
| ------- | ------------------ | ------------------------------------------ |
| -       | 默认 slot          | 里面放表单控件，比如 el-input、el-radio 等 |
| operate | 存放操作按钮的插槽 | 里面放该项表单项对应的操作按钮             |

## add-form-item-row

按行添加

### Attributes & Events & Slots

与 el-form-item 一致

## add-form-item-col

按列添加

### Attributes

| 名称      | 说明             | 类型    | 默认值 |
| --------- | ---------------- | ------- | ------ |
| no-delete | 是否隐藏删除按钮 | Boolean | false  |

其他与 el-form-item 一致

### Slot

| 名称      | 说明             | 作用    |
| --------- | ---------------- | ------- |
| operate-btn | 自定义删除按钮插槽 | 可自定义删除按钮，注意此时@delete事件不再生效，删除逻辑要自行实现。 |


### Events

| 名称   | 说明                           | 作用                                       |
| ------ | ------------------------------ | ------------------------------------------ |
| delete | 每一项点击删除按钮时抛出该事件 | 用于通知外部按钮被点击，以便进行需要的操作 |

## add-form-item-btn

逐条添加按钮

### Attributes

| 名称        | 说明             | 作用                             |
| ----------- | ---------------- | -------------------------------- |
| current-num | 当前项目数量     | 记录当前已添加的项目个数         |
| total-num   | 最大添加数量限制 | 超出最大添加数量限制后，按钮禁用 |

### Events & Slots

与 el-button 一致
