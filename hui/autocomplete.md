# Autocomplete 搜索框

搜索用的输入框(需要绑定value和显示的label不一致的请使用select组件)

## 带输入建议

<template>
  <code-box title="根据输入内容提供对应的输入建议" description="autocomplete 是一个可带输入建议的输入框组件，`fetch-suggestions` 是一个返回输入建议的方法属性，如 querySearch(queryString, cb)，在该方法中你可以在你的输入建议数据准备好时通过 cb(data) 返回到 autocomplete 组件中">
    <el-row class="demo-autocomplete">
      <el-col :span="12">
        <div class="sub-title">激活即列出输入建议</div>
        <el-autocomplete
          class="inline-input"
          v-model="state1"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          clearable
          @visible="handleSelect"
          :clear-icon-click="clearSearch"
          ref='state1'
        >
        <i slot="suffix" class="el-input__icon h-icon-search"></i>
        </el-autocomplete>
      </el-col>
      <el-col :span="12">
        <div class="sub-title">输入后匹配输入建议</div>
        <el-autocomplete
          class="inline-input"
          v-model="state2"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleSelect"
        ></el-autocomplete>
      </el-col>
    </el-row>
  </code-box>
</template>

```vue
<el-row class="demo-autocomplete">
  <el-col :span="12">
    <div class="sub-title">激活即列出输入建议</div>
    <el-autocomplete
      class="inline-input"
      v-model="state1"
      :fetch-suggestions="querySearch"
      :clear-icon-click="clearSearch"
      placeholder="请输入内容"
      @visible="handleSelect"
      kind="surface"
      ref='state1'
    ><i slot="suffix" class="el-input__icon h-icon-search"></i></el-autocomplete>
  </el-col>
  <el-col :span="12">
    <div class="sub-title">输入后匹配输入建议</div>
    <el-autocomplete
      class="inline-input"
      v-model="state2"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
  </el-col>
</el-row>
<script>
export default {
  data() {
    return {
      restaurants: [],
      state1: '',
      state2: ''
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return restaurant.value.indexOf(queryString.toLowerCase()) === 0;
      };
    },
    loadAll() {
      return [
        { value: 'perfect三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        {
          value: 'Hot honey 首尔炸鸡（仙霞路）',
          address: '上海市长宁区淞虹路661号'
        },
        {
          value: '新旺角茶餐厅',
          address: '上海市普陀区真北路988号创邑金沙谷6号楼113'
        },
        { value: '泷千家(天山西路店)', address: '天山西路438号' },
        {
          value: '胖仙女纸杯蛋糕（上海凌空店）',
          address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101'
        },
        { value: '贡茶', address: '上海市长宁区金钟路633号' },
        {
          value: '豪大大香鸡排超级奶爸',
          address: '上海市嘉定区曹安公路曹安路1685号'
        },
        {
          value: '茶芝兰（奶茶，手抓饼）',
          address: '上海市普陀区同普路1435号'
        },
        { value: '十二泷町', address: '上海市北翟路1444弄81号B幢-107' },
        { value: '星移浓缩咖啡', address: '上海市嘉定区新郁路817号' },
        { value: '阿姨奶茶/豪大大', address: '嘉定区曹安路1611号' },
        { value: '新麦甜四季甜品炸鸡', address: '嘉定区曹安公路2383弄55号' },
        {
          value: 'Monica摩托主题咖啡店',
          address: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F'
        },
        {
          value: '浮生若茶（凌空soho店）',
          address: '上海长宁区金钟路968号9号楼地下一层'
        },
        { value: 'NONO JUICE  鲜榨果汁', address: '上海市长宁区天山西路119号' },
        { value: 'CoCo都可(北新泾店）', address: '上海市长宁区仙霞西路' },
        {
          value: '快乐柠檬（神州智慧店）',
          address: '上海市长宁区天山西路567号1层R117号店铺'
        },
        {
          value: 'Merci Paul cafe',
          address: '上海市普陀区光复西路丹巴路28弄6号楼819'
        },
        {
          value: '猫山王（西郊百联店）',
          address: '上海市长宁区仙霞西路88号第一层G05-F01-1-306'
        },
        { value: '枪会山', address: '上海市普陀区棕榈路' },
        { value: '纵食', address: '元丰天山花园(东门) 双流路267号' },
        { value: '钱记', address: '上海市长宁区天山西路' },
        { value: '壹杯加', address: '上海市长宁区通协路' },
        {
          value: '唦哇嘀咖',
          address: '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元'
        },
        { value: '爱茜茜里(西郊百联)', address: '长宁区仙霞西路88号1305室' },
        {
          value: '爱茜茜里(近铁广场)',
          address:
            '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺'
        },
        {
          value: '鲜果榨汁（金沙江路和美广店）',
          address: '普陀区金沙江路2239号金沙和美广场B1-10-6'
        },
        {
          value: '开心丽果（缤谷店）',
          address: '上海市长宁区威宁路天山路341号'
        },
        { value: '超级鸡车（丰庄路店）', address: '上海市嘉定区丰庄路240号' },
        { value: '妙生活果园（北新泾店）', address: '长宁区新渔路144号' },
        { value: '香宜度麻辣香锅', address: '长宁区淞虹路148号' },
        {
          value: '凡仔汉堡（老真北路店）',
          address: '上海市普陀区老真北路160号'
        },
        { value: '港式小铺', address: '上海市长宁区金钟路968号15楼15-105室' },
        { value: '蜀香源麻辣香锅（剑河路店）', address: '剑河路443-1' },
        { value: '北京饺子馆', address: '长宁区北新泾街道天山西路490-1号' },
        {
          value: '饭典*新简餐（凌空SOHO店）',
          address: '上海市长宁区金钟路968号9号楼地下一层9-83室'
        },
        {
          value: '焦耳·川式快餐（金钟路店）',
          address: '上海市金钟路633号地下一层甲部'
        },
        { value: '动力鸡车', address: '长宁区仙霞西路299弄3号101B' },
        { value: '浏阳蒸菜', address: '天山西路430号' },
        { value: '四海游龙（天山西路店）', address: '上海市长宁区天山西路' },
        {
          value: '樱花食堂（凌空店）',
          address: '上海市长宁区金钟路968号15楼15-105室'
        },
        { value: '壹分米客家传统调制米粉(天山店)', address: '天山西路428号' },
        {
          value: '福荣祥烧腊（平溪路店）',
          address: '上海市长宁区协和路福泉路255弄57-73号'
        },
        {
          value: '速记黄焖鸡米饭',
          address: '上海市长宁区北新泾街道金钟路180号1层01号摊位'
        },
        { value: '红辣椒麻辣烫', address: '上海市长宁区天山西路492号' },
        {
          value: '(小杨生煎)西郊百联餐厅',
          address: '长宁区仙霞西路88号百联2楼'
        },
        { value: '阳阳麻辣烫', address: '天山西路389号' },
        {
          value: '南拳妈妈龙虾盖浇饭',
          address: '普陀区金沙江路1699号鑫乐惠美食广场A13'
        }
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    clearSearch () {
     console.log(1) 
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>
```

## 后缀拓展 <Badge text="2.0+"/>

<template>
  <code-box title="邮箱" description="通过监听输入事件来改变下拉框选项">
    <el-row class="demo-autocomplete">
        <el-autocomplete
          class="inline-input"
          v-model="state5"
          :fetch-suggestions="email"
          placeholder="请输入内容"
          @select="handleSelect"
          ref='state5'
        >
        <i slot="suffix" class="el-input__icon h-icon-search"></i>
        </el-autocomplete>
    </el-row>
  </code-box>
</template>

```vue
<template>
  <code-box title="邮箱" description="通过监听输入事件来改变下拉框选项">
    <el-row class="demo-autocomplete">
      <el-autocomplete
        class="inline-input"
        v-model="state5"
        :fetch-suggestions="email"
        placeholder="请输入内容"
        @select="handleSelect"
        ref="state5"
      >
        <i slot="suffix" class="el-input__icon h-icon-search"></i>
      </el-autocomplete>
    </el-row>
  </code-box>
</template>
<script>
export default {
  data() {
    return {
      state5: ''
    };
  },
  methods: {
    email(value, cb) {
      let result;
      if (!value || value.indexOf('@') >= 0) {
        result = [];
      } else {
        result = ['gmail.com', '163.com', 'qq.com'].map(
          domain => `${value}@${domain}`
        );
      }
      cb(result);
    },
    handleSelect(item) {
      console.log(item);
    }
  }
};
</script>
```

## 自定义模板(jsx 写法) <Badge text="2.0+"/>

<template>
  <code-box title="多可自定义输入建议的显示" description="通过jsx的写法完全自定义下拉框的内容"> 
    <el-autocomplete
      popper-class="my-autocomplete"
      v-model="state3"
      :fetch-suggestions="queryClass"
      custom-item="my-item-zh"
      placeholder="请输入内容"
      @select="handleSelect"
    >
      <i
        slot="suffix"
        class="el-input__icon h-icon-search"
        @click="handleIconClick"
      ></i>
    </el-autocomplete>
  </code-box>
</template>

```vue
<el-autocomplete
  popper-class="my-autocomplete"
  v-model="state3"
  :fetch-suggestions="queryClass"
  custom-item="my-item-zh"
  placeholder="请输入内容"
  @select="handleSelect"
  :on-icon-click="handleIconClick"
>
<i slot="suffix"
    class="el-input__icon h-icon-search"
    @click="handleIconClick"
  ></i></el-autocomplete>

<style>
.h-select-dropdown-menu-item-group {
  border-bottom: 1px solid #f6f6f6;
  .h-select-dropdown-menu-item-group-title {
    color: #666;
    font-weight: bold;
    padding: 0 12px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    a {
      float: right;
      color: #1890ff;
      background-color: transparent;
      text-decoration: none;
      outline: none;
      cursor: pointer;
    }
  }
  .h-select-dropdown-menu-item-group-list {
    margin: 0;
    padding: 0;
  }
}
</style>

<script>
const dataSource = [
  {
    title: '话题',
    children: [
      {
        title: 'HUI',
        count: 10000
      },
      {
        title: 'HUI UI',
        count: 10600
      }
    ]
  },
  {
    title: '问题',
    children: [
      {
        title: 'HUI UI 有多好',
        count: 60100
      },
      {
        title: 'HUI 是啥',
        count: 30010
      }
    ]
  },
  {
    title: '文章',
    children: [
      {
        title: 'HUI 是一个设计语言',
        count: 100000
      }
    ]
  }
];
Vue.component('my-item-zh', {
  functional: true,
  props: {
    select: Function,
    item: object
  },
  render: function(h, ctx) {
    console.log(ctx);
    var item = ctx.props.item;
    var self = ctx;
      return <li class='h-select-dropdown-menu-item-group'>
                  <div class='h-select-dropdown-menu-item-group-title'>
                    <span>{item.title}<a  class='h-select-dropdown-menu-item-group-link'>更多</a></span>
                  </div>
                  <ul class='h-select-dropdown-menu-item-group-list'>
                    {item.children.map((i, index)=>{
                      let select = ()=>{
                        ctx.parent.select(i.title)
                      } 
                      return  <li class='el-autocomplete-suggestion__item' onClick={select}>{i.title}
                                <span class='certain-search-item-count'>{i.count}</span>
                              </li>
                    })}                        
                  </ul>
              </li>
  }
});
export default {
  data() {
    return {
      restaurants: [],
      state3: ''
    };
  },
  methods: {
    queryClass(queryString, cb) {
      cb(dataSource);
    },
    handleSelect(item) {
      console.log(item);
    },
    handleIconClick(ev) {
      console.log(ev);
    }
  }
};
</script>
```

## 远程搜索

<template>
  <code-box title="从服务端搜索数据" >
    <el-autocomplete
      v-model="state4"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
    ></el-autocomplete>
  </code-box>
</template>

```vue
<el-autocomplete
  v-model="state4"
  :fetch-suggestions="querySearchAsync"
  placeholder="请输入内容"
  @select="handleSelect"
></el-autocomplete>
<script>
export default {
  data() {
    return {
      restaurants: [],
      state4: '',
      timeout: null
    };
  },
  methods: {
    loadAll() {
      return [
        { value: 'perfect三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        {
          value: 'Hot honey 首尔炸鸡（仙霞路）',
          address: '上海市长宁区淞虹路661号'
        },
        {
          value: '新旺角茶餐厅',
          address: '上海市普陀区真北路988号创邑金沙谷6号楼113'
        },
        { value: '泷千家(天山西路店)', address: '天山西路438号' },
        {
          value: '胖仙女纸杯蛋糕（上海凌空店）',
          address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101'
        },
        { value: '贡茶', address: '上海市长宁区金钟路633号' },
        {
          value: '豪大大香鸡排超级奶爸',
          address: '上海市嘉定区曹安公路曹安路1685号'
        },
        {
          value: '茶芝兰（奶茶，手抓饼）',
          address: '上海市普陀区同普路1435号'
        },
        { value: '十二泷町', address: '上海市北翟路1444弄81号B幢-107' },
        { value: '星移浓缩咖啡', address: '上海市嘉定区新郁路817号' },
        { value: '阿姨奶茶/豪大大', address: '嘉定区曹安路1611号' },
        { value: '新麦甜四季甜品炸鸡', address: '嘉定区曹安公路2383弄55号' },
        {
          value: 'Monica摩托主题咖啡店',
          address: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F'
        },
        {
          value: '浮生若茶（凌空soho店）',
          address: '上海长宁区金钟路968号9号楼地下一层'
        },
        { value: 'NONO JUICE  鲜榨果汁', address: '上海市长宁区天山西路119号' },
        { value: 'CoCo都可(北新泾店）', address: '上海市长宁区仙霞西路' },
        {
          value: '快乐柠檬（神州智慧店）',
          address: '上海市长宁区天山西路567号1层R117号店铺'
        },
        {
          value: 'Merci Paul cafe',
          address: '上海市普陀区光复西路丹巴路28弄6号楼819'
        },
        {
          value: '猫山王（西郊百联店）',
          address: '上海市长宁区仙霞西路88号第一层G05-F01-1-306'
        },
        { value: '枪会山', address: '上海市普陀区棕榈路' },
        { value: '纵食', address: '元丰天山花园(东门) 双流路267号' },
        { value: '钱记', address: '上海市长宁区天山西路' },
        { value: '壹杯加', address: '上海市长宁区通协路' },
        {
          value: '唦哇嘀咖',
          address: '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元'
        },
        { value: '爱茜茜里(西郊百联)', address: '长宁区仙霞西路88号1305室' },
        {
          value: '爱茜茜里(近铁广场)',
          address:
            '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺'
        },
        {
          value: '鲜果榨汁（金沙江路和美广店）',
          address: '普陀区金沙江路2239号金沙和美广场B1-10-6'
        },
        {
          value: '开心丽果（缤谷店）',
          address: '上海市长宁区威宁路天山路341号'
        },
        { value: '超级鸡车（丰庄路店）', address: '上海市嘉定区丰庄路240号' },
        { value: '妙生活果园（北新泾店）', address: '长宁区新渔路144号' },
        { value: '香宜度麻辣香锅', address: '长宁区淞虹路148号' },
        {
          value: '凡仔汉堡（老真北路店）',
          address: '上海市普陀区老真北路160号'
        },
        { value: '港式小铺', address: '上海市长宁区金钟路968号15楼15-105室' },
        { value: '蜀香源麻辣香锅（剑河路店）', address: '剑河路443-1' },
        { value: '北京饺子馆', address: '长宁区北新泾街道天山西路490-1号' },
        {
          value: '饭典*新简餐（凌空SOHO店）',
          address: '上海市长宁区金钟路968号9号楼地下一层9-83室'
        },
        {
          value: '焦耳·川式快餐（金钟路店）',
          address: '上海市金钟路633号地下一层甲部'
        },
        { value: '动力鸡车', address: '长宁区仙霞西路299弄3号101B' },
        { value: '浏阳蒸菜', address: '天山西路430号' },
        { value: '四海游龙（天山西路店）', address: '上海市长宁区天山西路' },
        {
          value: '樱花食堂（凌空店）',
          address: '上海市长宁区金钟路968号15楼15-105室'
        },
        { value: '壹分米客家传统调制米粉(天山店)', address: '天山西路428号' },
        {
          value: '福荣祥烧腊（平溪路店）',
          address: '上海市长宁区协和路福泉路255弄57-73号'
        },
        {
          value: '速记黄焖鸡米饭',
          address: '上海市长宁区北新泾街道金钟路180号1层01号摊位'
        },
        { value: '红辣椒麻辣烫', address: '上海市长宁区天山西路492号' },
        {
          value: '(小杨生煎)西郊百联餐厅',
          address: '长宁区仙霞西路88号百联2楼'
        },
        { value: '阳阳麻辣烫', address: '天山西路389号' },
        {
          value: '南拳妈妈龙虾盖浇饭',
          address: '普陀区金沙江路1699号鑫乐惠美食广场A13'
        }
      ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return state.value.indexOf(queryString.toLowerCase()) === 0;
      };
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>
```

<script>
  import Vue from 'vue';
  const dataSource = [{
    title: '话题',
    children: [{
      title: 'HUI',
      count: 10000,
    }, {
      title: 'HUI UI',
      count: 10600,
    }],
  }, {
    title: '问题',
    children: [{
      title: 'HUI UI 有多好',
      count: 60100,
    }, {
      title: 'HUI 是啥',
      count: 30010,
    }],
  }, {
    title: '文章',
    children: [{
      title: 'HUI 是一个设计语言',
      count: 100000,
    }],
  }];
  Vue.component('my-item-zh', {
    functional: true,
    props:{
      select: Function,
      item: Object
    },
    render: function (h, ctx) {
      var item = ctx.props.item;
      var self = ctx
      return <li class='h-select-dropdown-menu-item-group'>
                  <div class='h-select-dropdown-menu-item-group-title'>
                    <span>{item.title}<a  class='h-select-dropdown-menu-item-group-link'>更多</a></span>
                  </div>
                  <ul class='h-select-dropdown-menu-item-group-list'>
                    {item.children.map((i, index)=>{
                      let select = ()=>{
                        ctx.parent.select(i.title)
                      } 
                      return  <li class='el-autocomplete-suggestion__item' onClick={select}>{i.title}
                                <span class='certain-search-item-count'>{i.count}</span>
                              </li>
                    })}                        
                  </ul>
              </li>
    }
  });

  export default {
    data() {
      return {
        restaurants: [],
        history:[{ "value": "搜索记录1", "address": "1" },
          { "value": "搜索记录2", "address": "2" },
          { "value": "搜索记录3", "address": "3" }
        ],
        password: 'password',
        passwordIcon: 'h-icon-eye_close',
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
        state5: '',
        state6: '',
        propsTest: {
          label: 'address',
          value: 'value'
        }
      };
    },
    methods: {
      selectOne() {
        this.$refs.state1.select({ "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" });
      },
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
      selectSlot(item){
        this.state6 = item.value;
        this.$refs.suggestions=[];
      },
      clear(){
        this.history=[];
        this.$refs.slot.getData('');
      },
      email(value, cb) {
        let result;
        if (!value || value.indexOf('@') >= 0) {
          result = [];
        } else {
          result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
        }
        cb(result);
      },
      queryClass(queryString, cb){
        cb(dataSource);
      },
      querySlot(queryString, cb){
        cb(this.history);
      },
      querySearch(queryString, cb) {
        console.log(queryString)
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
        return restaurant => {
return restaurant.value.indexOf(queryString.toLowerCase()) !== -1
        }
      },
      handleSelect(item) {
        console.log(item);
      },
      clearSearch () {
        console.log(1) 
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
        this.passwordIcon = 'h-icon-eye_open';
      },
      onMouseupClick(ev) {
        console.log('松开回调');
        this.password = 'password';
        this.passwordIcon = 'h-icon-eye_close';
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
  };
</script>

<style lang="scss">
.demo-autocomplete {
  text-align: left;
  .el-input-group__append {
    border-color: #6E90FF;
  }

  .el-select .el-input {
    width: 110px;
  }

  .el-input {
    width: 240px;
  }

  .el-textarea {
    width: 414px;
  }

  .el-input-group {
    width: 100%;
  }

  .demo {
    width: 40%;
  }

  .demo-input-size {
    .el-input {
      vertical-align: top;
      margin: 0 10px 10px 0;
    }
  }


  .sub-title {
    margin-bottom: 10px;
    font-size: 14px;
    color: #8492a6;
  }

  .el-col:not(:last-child) {
    border-right: 1px solid rgba(224, 230, 237, 0.50);
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
}
.clearSlot{
  height: 32px;
  background: #fff;
  text-align: center;
  cursor: pointer;
  line-height: 32px;
}
.h-select-dropdown-menu-item-group{
  border-bottom: 1px solid #F6F6F6;
  .h-select-dropdown-menu-item-group-title {
    color: #666;
    font-weight: bold;
    padding: 0 12px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    a{
      float: right;
      color: #1890ff;
      background-color: transparent;
      text-decoration: none;
      outline: none;
      cursor: pointer;
    }
  }
  .h-select-dropdown-menu-item-group-list{
    margin: 0;
    padding: 0;
  }

}
</style>

### Autocomplete Attributes

| 参数                                 | 说明                                                                                                                       | 类型                            | 可选值                                                                                                    | 默认值          |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------- |
| placeholder                          | 输入框占位文本(建议不为空,为空时在 ie 下有异常)                                                                            | string                          | —                                                                                                         | —               |
| kind                                 | 可选悬浮和面性样式                                                                                                         | string                          | surface, suspension                                                                                       | —               |
| disabled                             | 禁用                                                                                                                       | boolean                         | —                                                                                                         | false           |
| props                                | 配置选项，默认{value:'value'}用于指定对象的key值,可加需要字段用于自定义                                                    | object                          | —                                                                                                         | {value:'value'} |
| value                                | 必填值输入绑定值                                                                                                           | string                          | —                                                                                                         | —               |
| custom-item                          | 通过该参数指定自定义的输入建议列表项的组件名,替换整个下拉框的内容,项目实践一中有多次使用                                   | string                          | —                                                                                                         | —               |
| fetch-suggestions                    | 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它                                   | Function(queryString, callback) | —                                                                                                         | —               |
| popper-class                         | Autocomplete 下拉列表的类名                                                                                                | string                          | —                                                                                                         | —               |
| trigger-on-focus                     | 是否在输入框 focus 时显示建议列表                                                                                          | boolean                         | —                                                                                                         | true            |
| clear-icon-click                     | 点击删除图标的回调函数                                                                                                     | function                        | —                                                                                                         | —               |
| debounce                             | 输入时的去抖延迟，毫秒                                                                                                     | number                          | —                                                                                                         | 100             |
| tips <Badge text="2.0+"/>            | 输入框文字提示信息                                                                                                         | string                          | —                                                                                                         | —               |
| tips-max-width  <Badge text="2.0+"/> | 提示信息最大宽度                                                                                                           | string, number                  | —                                                                                                         | —               |
| tips-placement  <Badge text="2.0+"/> | 提示信息出现位置                                                                                                           | string                          | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | top             |
| tips-offset    <Badge text="2.0+"/>  | 提示信息偏移量（对应 tips-placement 会有不同的偏移方向，'top'向上偏移、'bottom'向下偏移、'left'项做偏移、'right'向右偏移） | string                          | —                                                                                                         | —               |
| tips-trigger   <Badge text="2.0+"/>  | 提示信息触发方式                                                                                                           | click/focus/hover/manual        | —                                                                                                         | focus           |
| tips-class   <Badge text="2.0+"/>    | 提示信息 class 类                                                                                                          | string                          | —                                                                                                         | —               |
| maxlength    <Badge text="2.0+"/>    | 最大输入长度                                                                                                               | number                          | —                                                                                                         | —               |
| minlength    <Badge text="2.0+"/>    | 最小输入长度                                                                                                               | number                          | —                                                                                                         | —               |
| popper-append-to-body                | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false                                             | boolean                         | -                                                                                                         | true            |

### props

| 参数  | 说明                               | 类型   | 可选值 | 默认值 |
| ----- | ---------------------------------- | ------ | ------ | ------ |
| value | 指定选项的值为选项对象的某个属性值 | string | —      | value  |

### Autocomplete Slots <Badge text="2.0+"/>

| 名称    | 说明                                  |
| ------- | ------------------------------------- |
| prefix  | 输入框头部内容，只对 type="text" 有效 |
| suffix  | 输入框尾部内容，只对 type="text" 有效 |
| prepend | 输入框前置内容，只对 type="text" 有效 |
| append  | 输入框后置内容，只对 type="text" 有效 |

### Autocomplete Events

| 事件名称 | 说明                    | 回调参数       |
| -------- | ----------------------- | -------------- |
| select   | 点击选中建议项时触发    | 选中建议项     |
| visible  | 建议栏开启和关闭时触发  | 建议栏是否显示 |
| focus    | 在 Input 获得焦点时触发 | (event: Event) |
| blur     | 在 Input 失去焦点时触发 | (event: Event) |
| input    | 在 Input 值改变时触发   | 修改后的值     |

