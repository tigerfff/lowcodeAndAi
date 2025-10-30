# Input 输入框

通过鼠标或键盘输入字符

## 基础用法

<template>
  <code-box>
    <el-input
      placeholder="请输入"
      v-model="input"
    ></el-input>
  </code-box>
</template>

```html
<el-input
  class="el-input--width"
  v-model="input"
  placeholder="请输入"
></el-input>
<script>
  export default {
    data() {
      return {
        input: ''
      };
    }
  };
</script>
```

## 禁用状态

<template>
  <code-box title="多独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍" description="通过 `disabled` 属性指定是否禁用 input 组件">
  <el-input
    class="el-input--width"
    placeholder="请输入"
    v-model="input1"
    :disabled="true">
  </el-input>
  </code-box>
</template>

```html
<el-input
  class="el-input--width"
  placeholder="请输入"
  v-model="input1"
  :disabled="true"
></el-input>

<script>
  export default {
    data() {
      return {
        input1: ''
      };
    }
  };
</script>
```

## 密码拓展

<template>
  <code-box description="可以通过扩展事件的方式实现一些业务功能">
    <el-input class="el-input--width" v-model="input0" placeholder="请输入" :type = password>
    <i slot="suffix" class="el-input__icon" :class=passwordIcon @mousedown="onMousedownClick" @mouseup="toPassword" @mouseout="toPassword"></i>
    </el-input>
  </code-box>
</template>

```html
<el-input
  class="el-input--width"
  v-model="input0"
  placeholder="请输入"
  :type="password"
>
  <i
    slot="suffix"
    class="el-input__icon"
    :class="passwordIcon"
    @mousedown="onMousedownClick"
    @mouseup="toPassword"
    @mouseout="toPassword"
  ></i>
</el-input>
<script>
  export default {
    data() {
      return {
        input0: '',
        password: 'password',
        passwordIcon: 'h-icon-password_unvisible'
      },
    methods: {
      onMousedownClick(ev) {
        console.log('按下回调');
        this.password = 'text';
        this.passwordIcon = 'h-icon-password_visible';
      },
      toPassword(ev) {
        console.log('松开回调');
        this.password = 'password';
        this.passwordIcon = 'h-icon-password_unvisible';
      }
    }
    }
  }
</script>
```

## 带固定内容的输入框 <Badge text="2.0+"/>

<template>
  <code-box title="带有固定内容输入类型" description="可以通过 prefix-icon 和 suffix-icon 属性在 input 组件首部和尾部增加显示图标，也可以通过 slot 来放置图标和文字(建议),另可通过 kind 属性指定输入框的样式,可选面性surface和悬浮suspension">
    <p>属性方式：</p>
    <el-row>
      <el-col :span="8">
        <el-input
          class="el-input--width"
          placeholder="请输入"
          suffix-icon="h-icon-search"
          v-model="input2"
          clearable
          :on-icon-click="handleIconClick"
          :clear-icon-click="clearIconClick">
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-input
          class="el-input--width"
          placeholder="请输入"
          prefix-icon="h-icon-user"
          v-model="input10"
          clearable
          :on-icon-click="handleIconClick">
        </el-input>
      </el-col>
    </el-row>
    <div style="margin: 20px 0;"></div>
    <p>slot 方式：</p>
    <el-row>
      <el-col :span="8">
        <el-input
          class="el-input--width"
          placeholder="请输入"
          clearable
          v-model="input11"
          :on-icon-click="handleIconClick">
          <i slot="suffix" class="el-input__icon h-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-input
          class="el-input--width custom-suffix"
          placeholder="请输入"
          v-model="input11"
          :on-icon-click="handleIconClick">
          <span slot="suffix" class="custom-text">
            分钟
          </span>
        </el-input>
      </el-col>
    </el-row>

  </code-box>
</template>

```html
属性方式：
    <el-row>
      <el-col :span="8">
        <el-input
          class="el-input--width"
          placeholder="请输入"
          suffix-icon="h-icon-search"
          v-model="input2"
          clearable
          :on-icon-click="handleIconClick"
          :clear-icon-click="clearIconClick">
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-input
          class="el-input--width"
          placeholder="请输入"
          prefix-icon="h-icon-search"
          v-model="input10"
          clearable
          :on-icon-click="handleIconClick">
        </el-input>
      </el-col>
    </el-row>
    slot 方式：
    <el-row>
      <el-col :span="8">
        <el-input
          class="el-input--width"
          placeholder="请输入"
          v-model="input11"
          clearable
          :on-icon-click="handleIconClick">
          <i slot="suffix" class="el-input__icon h-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-input
          class="el-input--width"
          placeholder="请输入"
          kind="suspension"
          v-model="input11"
          clearable
          :on-icon-click="handleIconClick">
          <span slot="suffix" style="padding-right:6px">分钟</span>
        </el-input>
      </el-col>
    </el-row>
<script>
export default {
  data() {
    return {
      input2: '',
      input10: '',
      input11: ''
    }
  },
  methods: {
    handleIconClick(ev) {
      console.log(ev);
    },
    clearIconClick() {
      console.log('删除回调');
    }
  }
}
</script>
```

## 带计数文本域 <Badge text="2.0+"/>

<template>
  <code-box title="用于输入多行文本信息，通过将 `type` 属性的值指定为 textarea。" description="`count`属性控制计数，以及用maxlength控制最大输入字数">
    <div style="margin: 20px 0;"></div>
    <el-input
      class="el-textarea--height el-input--width"
      type="textarea"
      :rows="4"
      :count="100"
      maxlength="100"
      placeholder="请输入"
      v-model="textarea">
    </el-input>
  </code-box>
</template>

```html
<div style="margin: 20px 0;"></div>
<el-input
  class="el-textarea--height el-input--width"
  type="textarea"
  :rows="4"
  :count="100"
  maxlength="100"
  placeholder="请输入"
  v-model="textarea"
></el-input>
<script>
  export default {
    data() {
      return {
        textarea: ''
      };
    }
  };
</script>
```

## 可自适应文本高度的文本域

<template>
  <code-box title="用于输入多行文本信息，通过将 `type` 属性的值指定为 textarea。" description="通过设置 `autosize` 或 `resize` 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 `autosize` 还可以设定为一个对象，指定最小行数和最大行数">
    <el-input
      class="el-textarea--height el-input--width resize-area"
      type="textarea"
      :rows="4"
      resize
      placeholder="请输入"
      v-model="textarea2"
    >
    </el-input>
    <div style="margin: 120px 0 20px 0;"></div>
    <el-input
      class="el-textarea--height el-input--width"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4, maxWidth: 480 }"
      placeholder="请输入"
      v-model="textarea3"
    >
    </el-input>
  </code-box>
</template>

```html
<el-input
  class="el-textarea--height el-input--width resize-area"
  type="textarea"
  :rows="4"
  resize
  placeholder="请输入"
  v-model="textarea2"
></el-input>
<div style="margin: 120px 0 20px 0;"></div>
<el-input
  class="el-textarea--height el-input--width"
  type="textarea"
  :autosize="{ minRows: 2, maxRows: 4, maxWidth: 480 }"
  placeholder="请输入"
  v-model="textarea3"
></el-input>

<style>
  .resize-area {
    min-width: 240px;
    max-width: 480px;
    min-height: 92px;
    max-height: 184px;
  }
</style>
```

## 复合型输入框

<template>
  <code-box title="用于输入多行文本信息，通过将 `type` 属性的值指定为 textarea。" description="文本域高度可通过 `rows` 属性控制">
    <div class="el-input--width-group">
      <el-input placeholder="请输入" v-model="input3">
        <template slot="prepend"><span class='fontBorder'>Http://</span></template>
      </el-input>
    </div>
    <div class="el-input--width-group" style="margin-top: 15px;">
      <el-input placeholder="请输入" v-model="input4">
        <template slot="append"><span class='fontBorder'>.com</span></template>
      </el-input>
    </div>
    <div class="el-input--width-group" style="margin-top: 15px;">
      <el-input placeholder="请输入" v-model="input4">
        <template slot="append"><el-button>按钮</el-button></template>
      </el-input>
    </div>
    <div class="el-input--width-group" style="margin-top: 15px;">
      <el-input placeholder="请输入" v-model="input5">
        <el-select class="el-select--width-sm" v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
      </el-input>
    </div>
  </code-box>
</template>

```html
<div class="el-input--width-group">
  <el-input placeholder="请输入" v-model="input3">
    <template slot="prepend"><span class='fontBorder'>Http://</span></template>
  </el-input>
</div>
<div class="el-input--width-group" style="margin-top: 15px;">
  <el-input placeholder="请输入" v-model="input4">
    <template slot="append"><span class='fontBorder'>.com</span></template>
  </el-input>
</div>
<div class="el-input--width-group" style="margin-top: 15px;">
  <el-input placeholder="请输入" v-model="input4">
    <template slot="append"><el-button>按钮</el-button></template>
  </el-input>
</div>
<div class="el-input--width-group" style="margin-top: 15px;">
  <el-input placeholder="请输入" v-model="input5">
    <el-select class="el-select--width-sm" v-model="select" slot="prepend" placeholder="请选择">
      <el-option label="餐厅名" value="1"></el-option>
      <el-option label="订单号" value="2"></el-option>
      <el-option label="用户电话" value="3"></el-option>
    </el-select>
  </el-input>
</div>
<!-- <div style="margin-top: 15px;">
  <el-input placeholder="请输入" v-model="input3">
    <template slot="prepend"><el-button>白色按钮</el-button></template>
  </el-input>
</div>
<div style="margin-top: 15px;">
  <el-input placeholder="请输入" v-model="input4">
    <template slot="append"><el-button>白色按钮</el-button></template>
  </el-input> -->
</div>
<style>
  .el-select .el-input {
    width: 110px;
  }
</style>
<script>
export default {
  data() {
    return {
      input3: '',
      input4: '',
      input5: '',
      select: ''
    }
  }
}
</script>
```

<!-- ## 尺寸

<template>
  <code-box title="尺寸" description="可通过 `size` 属性指定输入框的尺寸，除了默认的大小外，还提供了 large、small 和 mini 三种尺寸">
    <div class="demo-input-size">
      <el-input
        size="large"
        placeholder="请输入"
        v-model="input6">
      </el-input>
      <el-input
        placeholder="请输入"
        v-model="input7">
      </el-input>
      <el-input
        size="small"
        placeholder="请输入"
        v-model="input8">
      </el-input>
      <el-input
        size="mini"
        placeholder="请输入"
        v-model="input9">
      </el-input>
    </div>
  </code-box>
</template>

```html
<div class="demo-input-size">
  <el-input
    size="large"
    icon="h-icon-search"
    placeholder="请输入"
    v-model="input6">
  </el-input>
  <el-input
    placeholder="请输入"
    v-model="input7">
  </el-input>
  <el-input
    size="small"
    placeholder="请输入"
    v-model="input8">
  </el-input>
  <el-input
    size="mini"
    placeholder="请输入"
    v-model="input9">
  </el-input>
</div>

<script>
export default {
  data() {
    return {
      input6: '',
      input7: '',
      input8: '',
      input9: ''
    }
  }
}
</script>
``` -->

<script>
  import Vue from 'vue';
  Vue.component('my-item-zh', {
    functional: true,
    render: function (h, ctx) {
      var item = ctx.props.item;
      return h('li', ctx.data, [
        h('div', { attrs: { class: 'name' } }, [item.value]),
        h('span', { attrs: { class: 'addr' } }, [item.address])
      ]);
    },
    props: {
      item: { type: Object, required: true }
    }
  });
  export default {
    data() {
      let validateAutoFill = (rule, value, callback) => {
        if (!value) callback();
        if (/^.*%$/.test(value)) value = value.slice(0, -1)
        const reg = /^((0|[1-9]|[1-9][0-9]|100)|(0|[1-9]|[1-9][0-9]|100)\.\d+)$/
        if (!reg.test(value)) {
          callback(new Error('请输入0-100的数值'));
        }
        let valueArray = value.split('.')
        if (valueArray[1] && valueArray[1].length > 1) {
          callback(new Error('小数点后面最多一位数'));
        }
        callback();
      };
      return {
        restaurants: [],
        password: 'password',
        passwordIcon: 'h-icon-password_unvisible',
        input: '',
        input0: '',
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: '',
        input7: '',
        input8: '',
        input9: '',
        input10: '',
        input11: '',
        textarea: '',
        textarea2: '',
        textarea3: '',
        select: '',
        state1: '',
        state2: '',
        state3: '',
        state4: '',
        autoFillForm: {
          normal: '',
          special: ''
        },
        autoFillRules: {
          normal: [
            { required: true, message: '此项为必填项', trigger: 'blur' },
            { validator: validateAutoFill, trigger: 'change' },
            { validator: validateAutoFill, trigger: 'blur' }
          ],
          special: [
            { required: true, message: '此项为必填项', trigger: 'blur' },
            { validator: validateAutoFill, trigger: 'change' },
            { validator: validateAutoFill, trigger: 'blur' }
          ]
        },
        areaCode: '',
        phoneCode: ''
      };
    },
    methods: {
      loadAll() {
        return [
          { "value": "perfect三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
      changeState1() {
        this.state1 = 'perfect';
        this.$refs.state1.handleChange(this.state1,true);
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        cb(results);
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      handleIconClick(ev) {
        console.log(ev);
      },
      clearIconClick(ev) {
        console.log('删除回调');
      },
      onMousedownClick(ev) {
        console.log('按下回调');
        this.password = 'text';
        this.passwordIcon = 'h-icon-password_visible';
      },
      toPassword(ev) {
        console.log('松开回调');
        this.password = 'password';
        this.passwordIcon = 'h-icon-password_unvisible';
      },
      handleFocusNormal(e) {
        let value = this.autoFillForm.normal
        const _this = this
        this.$refs.autoFillForm.validateField('normal', function(error) {
          if (error) return
          if (/^.*%$/.test(value)) _this.autoFillForm.normal = value.slice(0, -1)
        })
      },
      handleBlurNormal(e) {
        let value = this.autoFillForm.normal
        if (!value || /^.*%$/.test(value)) return
        const _this = this
        this.$refs.autoFillForm.validateField('normal', function(error) {
          if (error) return
          _this.autoFillForm.normal += '%'
        })
      },
      handleFocusSpecial(e) {
        let value = this.autoFillForm.special
        const _this = this
        this.$refs.autoFillForm.validateField('special', function(error) {
          if (error) return
          if (/^.*%$/.test(value)) _this.autoFillForm.special = value.slice(0, -1)
        })
      },
      handleBlurSpecial(e) {
        let value = this.autoFillForm.special
        if (!value) {
          this.autoFillForm.special = '0%'
          return
        }
        if (/^.*%$/.test(value)) return
        const _this = this
        this.$refs.autoFillForm.validateField('special', function(error) {
          if (error) {
            let value = _this.autoFillForm.special
            value = value.replace(/[^0-9\.]/g, '')
            let floatValue = parseFloat(value)
            if (floatValue > 100) {
              _this.autoFillForm.special = '100%'
              return
            }
            const reg = /^(0|[1-9]|[1-9][0-9]|100)\.\d+$/
            if (reg.test(value)) {
              _this.autoFillForm.special = floatValue.toFixed(1) + '%'
              return
            }
            return
          }
          _this.autoFillForm.special += '%'
        })
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
  };
</script>

<style lang="scss">
.demo-input {
  .h-ip-input .el-input {
    width: 25%;
  }
  .h-icon-search {
    cursor: pointer;
  }

  .el-input-group {
    width: 100%;
  }

  .demo {
    width: 40%;
  }
  .fontBorder{
    /* border: 1px solid #b3b3b3; */
  }
  .demo-input-size {
    .el-input {
      vertical-align: top;
      margin: 0 10px 10px 0;
    }
  }

  .demo-autocomplete {
    text-align: center;
  }

  .sub-title {
    margin-bottom: 10px;
    font-size: 14px;
    color: #8492a6;
  }

  .el-col:not(:last-child) {
    border-right: 1px solid rgba(224, 230, 237, 0.50);
  }

  .el-autocomplete {
    text-align: left;
  }


  .el-autocomplete-suggestion.my-autocomplete {
    li {
      line-height: normal;
      padding: 7px;

      .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .addr {
        font-size: 12px;
        color: #b4b4b4;
      }

      .highlighted .addr {
        color: #ddd;
      }
    }
  }
  .demo-search{
    cursor: pointer;
  }
  .resize-area{
    min-width: 240px;
    max-width: 480px;
    min-height: 92px;
    max-height: 184px;
  }
  .custom-suffix {
    .custom-text {
      padding-right: 6px;
    }
  }
}
</style>

::: tip 提示

输入框默认 `100%` 宽，由外层容器自由控制宽度。控件根据 HUI 规范提供默认样式如下：

.el-input--width-sm: 120px;

.el-input--width: 240px;

.el-input--width-group: 336px;

.el-input--height: 92px;

:::

### Input Attributes

| 参数                                   | 说明                                                                                                                                                          | 类型                     | 可选值                                                                                                    | 默认值 |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------- | ------ |
| type                                   | 类型                                                                                                                                                          | string                   | text/textarea                                                                                             | text   |
| value                                  | 绑定值                                                                                                                                                        | string, number           | —                                                                                                         | —      |
| maxlength                              | 最大输入长度                                                                                                                                                  | number                   | —                                                                                                         | —      |
| minlength                              | 最小输入长度                                                                                                                                                  | number                   | —                                                                                                         | —      |
| placeholder                            | 输入框占位文本                                                                                                                                                | string                   | —                                                                                                         | —      |
| disabled                               | 禁用                                                                                                                                                          | boolean                  | —                                                                                                         | false  |
| search                                 | 是否创建搜索图标                                                                                                                                              | boolean                  | —                                                                                                         | false  |
| size                                   | 输入框尺寸，只在 `type!="textarea"` 时有效                                                                                                                    | string                   | large, small, mini                                                                                        | —      |
| kind                                   | 可选悬浮和面性样式                                                                                                                                            | string                   | surface, suspension                                                                                       | —      |
| prefix-icon <Badge text="2.0+"/>       | 输入框头部图标                                                                                                                                                | string                   | —                                                                                                         |        |
| suffix-icon <Badge text="2.0+"/>       | 输入框尾部图标                                                                                                                                                | string                   | —                                                                                                         |        |
| rows                                   | 输入框行数，只对 `type="textarea"` 有效                                                                                                                       | number                   | —                                                                                                         | 2      |
| autosize                               | 自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，{ minRows: 2, maxRows: 6, maxWidth: 480 } minRows:最小行数，maxRows:最大行数，maxWidth：最大宽度 | boolean/object           | —                                                                                                         | false  |
| auto-complete                          | 原生属性，自动补全                                                                                                                                            | string                   | on, off                                                                                                   | off    |
| name                                   | 原生属性                                                                                                                                                      | string                   | —                                                                                                         | —      |
| readonly                               | 原生属性，是否只读                                                                                                                                            | boolean                  | —                                                                                                         | false  |
| clearable                              | 是否增加删除图标                                                                                                                                              | boolean                  | —                                                                                                         | false  |
| maxlength                                    | 原生属性，设置最大值                                                                                                                                          | —                        | —                                                                                                         | —      |
| minlength                                    | 原生属性，设置最小值                                                                                                                                          | —                        | —                                                                                                         | —      |
| step                                   | 原生属性，设置输入字段的合法数字间隔                                                                                                                          | —                        | —                                                                                                         | —      |
| resize                                 | 控制是否能被用户缩放                                                                                                                                          | string                   | none, both, horizontal, vertical                                                                          | —      |
| autofocus                              | 原生属性，自动获取焦点                                                                                                                                        | boolean                  | true, false                                                                                               | false  |
| form                                   | 原生属性                                                                                                                                                      | string                   | —                                                                                                         | —      |
| tips                                   | 输入框文字提示信息                                                                                                                                            | string                   | —                                                                                                         | —      |
| tips-max-width                         | 提示信息最大宽度                                                                                                                                              | string, number           | —                                                                                                         | —      |
| tips-placement                         | 提示信息出现位置                                                                                                                                              | string                   | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | top    |
| tips-offset                            | 提示信息偏移量（对应 tips-placement 会有不同的偏移方向，'top'向上偏移、'bottom'向下偏移、'left'项做偏移、'right'向右偏移）                                    | string                   | —                                                                                                         | —      |
| tips-trigger（不建议使用，后续会删除） | 提示信息触发方式                                                                                                                                              | click/focus/hover/manual | —                                                                                                         | focus  |
| tips-class                             | 提示信息 class 类                                                                                                                                             | string                   | —                                                                                                         | —      |
| count <Badge text="2.0+"/>             | 计数(倒计) 只在 `type==="textarea"` 时有效                                                                                                                    | number                   | > 0                                                                                                       | —      |
| debounce <Badge text="2.21+"/>         | 输入以及值的防抖，默认 0 秒                                                                                                                                   | number                   | 0                                                                                                         | —      |

### Input Slots <Badge text="2.0+"/>

| 名称    | 说明                                  |
| ------- | ------------------------------------- |
| prefix  | 输入框头部内容，只对 type="text" 有效 |
| suffix  | 输入框尾部内容，只对 type="text" 有效 |
| prepend | 输入框前置内容，只对 type="text" 有效 |
| append  | 输入框后置内容，只对 type="text" 有效 |

### Input Events

| 事件名称 | 说明                                   | 回调参数                  |
| -------- | -------------------------------------- | ------------------------- |
| click    | 点击 Input 内的图标时触发              | (event: Event)            |
| delete   | 点击 Input 内的 `clearable` 图标时触发 | (event: Event)            |
| clear    | 点击 Input 内的 `clearable` 图标时触发 | (event: Event)            |
| blur     | 在 Input 失去焦点时触发                | (event: Event)            |
| focus    | 在 Input 获得焦点时触发                | (event: Event)            |
| change   | 在 Input 值改变时触发                  | (value: string \| number) |
