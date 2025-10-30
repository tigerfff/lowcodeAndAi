# ColorPicker 颜色选择器

## 基础用法

<template>
  <code-box description="">
    <div class="container">
      <div class="block">
        <span class="demonstration">有默认值</span>
        <h-color-picker v-model="color1"></h-color-picker>
      </div>
      <div class="block">
        <span class="demonstration">输入框不展示颜色值</span>
         <h-color-picker v-model="color1" @change="change" :show-color-text="false"></h-color-picker>
      </div>
    </div>
    <div class="container">
      <div class="block">
        <span class="demonstration">无默认值</span>
        <h-color-picker v-model="color2" :show-color-text="false" defaultColor="transparent"></h-color-picker>
      </div>
      <div class="block">
        <span class="demonstration">禁用点击输入框选择颜色</span>
        <h-color-picker v-model="color1" :show-color-text="false" disabled></h-color-picker>
      </div>
    </div>
  </code-box>
</template>



```html
<div class="container">
  <div class="block">
    <span class="demonstration">有默认值</span>
    <h-color-picker v-model="color1"></h-color-picker>
  </div>
  <div class="block">
    <span class="demonstration">输入框不展示颜色值</span>
      <h-color-picker v-model="color1" @change="change" :show-color-text="false"></h-color-picker>
  </div>
</div>
<div class="container">
  <div class="block">
    <span class="demonstration">无默认值</span>
    <h-color-picker v-model="color2" :show-color-text="false"></h-color-picker>
  </div>
  <div class="block">
    <span class="demonstration">禁用</span>
    <h-color-picker v-model="color1" :show-color-text="false" disabled></h-color-picker>
  </div>
</div>
<script>
  export default {
    data() {
      return {
        color1: '#ff0000',
        color2: null
      };
    },
    methods: {
      change(color) {
        console.log(color);
      }
    }
  };
</script>
```

## 选择透明度

<template>
  <code-box description="ColorPicker 通过设置 `show-alpha` 为 `true` 控制是否支持透明度的选择">
    <div class="block">
      <h-color-picker v-model="color3" show-alpha></h-color-picker>
    </div>
  </code-box>
</template>

```html
<template>
  <h-color-picker v-model="color3" show-alpha></h-color-picker>
</template>

<script>
  export default {
    data() {
      return {
        color3: 'rgba(255, 0, 0, 0.8)'
      };
    }
  };
</script>
```

## 简单模式

<template>
  <code-box description=" ColorPicker 通过设置 `isSimple` 为 `true` 开启简单模式，简单模式预设颜色通过 `colorList` 属性传入，如果没有指定`colorList`，则采用系统控件默认颜色">
    <div class="block">
      <h-color-picker v-model="color4" is-simple :colorList="colorList"></h-color-picker>
    </div>
  </code-box>
</template>

```html
<template>
  <h-color-picker v-model="color4" isSimple></h-color-picker>
</template>
<script>
  export default {
    data() {
      return {
        color4: '#ff0000',
        colorList: [
          '#ff0000',
          '#e92656',
          '#960fa3',
          '#3f40a9',
          '#2c84ee',
          '#00b2cd',
          '#008b7e',
          '#36a751',
          '#79be4d',
          '#c2da46',
          '#fdeb4a',
          '#ff911b'
        ]
      };
    }
  };
</script>
```

### Attributes

| 参数            | 说明                 | 类型                                                                      | 可选值 | 默认值 |
| --------------- | -------------------- | ------------------------------------------------------------------------- | ------ | ------ |
| show-alpha      | 是否支持透明度选择   | boolean                                                                   | —      | false  |
| is-simple       | 是否为简单模式       | boolean                                                                   | —      | false  |
| show-color-text | 输入框是否展示颜色值 | boolean                                                                   | —      | true   |
| disabled        | 是否禁用             | boolean                                                                   | —      | false  |
| defaultColor    | 输入框缺省颜色       | string（16进制颜色值）                                                    | —      |        |
| placeholder     | 输入框占位文本       | string                                                                    | —      |        |
| placement       | 下拉配置             | 更多参数可见[Vue-popper](https://github.com/element-component/vue-popper) | —      |        |

### Events

| 事件名称 | 说明               | 回调参数 |
| -------- | ------------------ | -------- |
| change   | 当绑定值变化时触发 | 当前值   |

<script>
export default {
  data(){
    return {
      color1: '#ff0000',
      color2: null,
      color3: 'rgba(255, 0, 0, 0.8)',
      color4: '#ff0000',

      colorList:[
        '#ff0000',
        '#e92656',
        '#960fa3',
        '#3f40a9',
        '#2c84ee',
        '#00b2cd',
        '#008b7e',
        '#36a751',
        '#79be4d',
        '#c2da46',
        '#fdeb4a',
        '#ff911b',
      ]
    }
  },
  methods:{
    change(value){
      console.log('charge',value)
    }
  }
}
</script>
<style lang="scss">
  .demo-colorPicker {
    .h-color-picker {
      width:240px
    }
    .sub-title {
      margin-bottom: 10px;
      color: #8492a6;
      font-size: 14px;
    }
    .code-box-demo {
      display: flex;
      flex-wrap: wrap;
      padding: 0;
    }

    .block {
      flex: 1;
      padding: 30px 0;
      border-right: solid 1px #eff2f6;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      
    }
    .container {
      flex: 1;
      border-right: solid 1px #eff2f6;
      .block {
        border-right: none;
        &:last-child {
          border-top: solid 1px #eff2f6;
        }
      }
      &:last-child {
        border-right: none;
      }
    }
    .demonstration {
      display: block;
      margin-bottom: 20px;
      color: #8492a6;
      font-size: 14px;
    }
  }
  
</style>
