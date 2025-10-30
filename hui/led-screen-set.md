# Led 屏幕控件

<template>
  <author-info
    :version="versions['led-screen-set']"
    author="张凤49"
  />
</template>

## 安装

```bash
$ npm i @hui-pro/led-screen-set -D
# 或者
$ yarn add @hui-pro/led-screen-set --dev
```

## 引入

```js
import ledScreenSet from '@hui-pro/led-screen-set';
import '@hui-pro/led-screen-set/theme/index.scss';
Vue.use(ledScreenSet);
```

## 基础用法

<template>
  <code-box title="基础用法" description="插件助手">
    <led-screen-set
    v-model="val"
    :selectKey="selectKey"
    :selectName="selectName"
    :childrens="childrens"
    :keywords="keywords"
    :cwidth.sync="width"
    :cheight.sync="height"
    @showTypeChange="showTypeChange"
    @showModeChange="showModeChange"
    @clickRect="clickRect"
  ></led-screen-set>
  </code-box>
</template>

```html
<template>
  <led-screen-set
    v-model="val"
    :selectKey="selectKey"
    :selectName="selectName"
    :childrens="childrens"
    :keywords="keywords"
    :cwidth.sync="width"
    :cheight.sync="height"
    @showTypeChange="showTypeChange"
    @showModeChange="showModeChange"
    @clickRect="clickRect"
  ></led-screen-set>
</template>
<script>
  import Vue from 'vue';
  import ImgPreview from '@hui-pro/img-preview';
  import '@hui-pro/img-preview/theme/index.scss';
  Vue.use(ImgPreview);

  export default {
    data() {
      return {
        selectKey: 'dictCode',
        selectName: 'dictName',
        childrens: 'childrenList',
        keywords: [
          {
            dictName: '类型一',
            dictCode: '11111',
            childrenList: [
              { dictName: '关键字1', dictCode: 'key1111' },
              { dictName: '关键字2', dictCode: 'key2221' },
              { dictName: '换行', dictCode: 'line_feed' },
               {
          dictName: '换行1',
          dictCode: 'line_feed1'
        },
        {
          dictName: '换行2',
          dictCode: 'line_feed2'
        }
            ]
          },
          {
            dictName: '类型二',
            dictCode: '22222',
            childrenList: [
              { dictName: '关键字3', dictCode: 'key3333' },
              { dictName: '关键字4', dictCode: 'key4444' },
              { dictName: '换行', dictCode: 'line_feed' }
            ]
          }
        ],
        val: [],
        width: '0',
        height: '0',
        fontColors:[
         {
          name: '黑色',
          value: 'black',
          active: true
          }
        ],
        fontSizes:[
          {
            name:'20px',
            value: 20
          }
      ]
      };
    }
  };
</script>
```

### Attributes

| 参数                  | 说明                                                                        | 类型   | 可选值 | 默认值         |
| --------------------- | --------------------------------------------------------------------------- | ------ | ------ | -------------- |
| cwidth                | 画布宽度                                                                    | String | -      | '500'          |
| cheight               | 画布高度                                                                    | String | -      | '500'          |
| canvasRects / v-model | 绑定值                                                                      | Array  | -      | []             |
| selectKey             | 指定显示类型下拉 option 值绑定(包括显示内容)为 option 对象的某个属性值      | String | -      | 'dictCode'     |
| selectName            | 指定显示类型下拉 option 显示的名称(包括显示内容)为 option 对象的某个属性值  | String | -      | 'dictName'     |
| childrens             | 指定显示类型下拉 option 的子节点对象（不同类型下的关键字 List）的某个属性值 | String | -      | 'childrenList' |
| keywords              | 显示类型，用来存放通过自定义字段（selectKey，selectName，childrens）组成对象的 List | Array  | -      | []             |
| placeholder           | 占位符                                                                      | Array  | -      | ['[', ']']     |
| multipleLimit         | 控制能够选多少个关键字                                                      | Number | -      | 8              |
| maxLength             | 显示内容里字符的最大长度                                                    | Number | -      | 64             |
| exceptCodes           | 设置可以被多选的关键字                                                      | Array  | -      | ['line_feed']  |
| fontColors                | 字体颜色                                                                    | Array | -      | []          |
| fontSizes                | 字体大小                                                                    | Array | -      | []          |
| showModes                | 显示方式                                                                    | Array | -      | []          |
| isBold                | 是否显示加粗按钮                                                                    | Boolean | -      | true          |


#### canvasRects / v-model 包含的对象属性

| 参数         | 说明                                | 类型   | 可选值           | 默认值       |
| ------------ | ----------------------------------- | ------ | ---------------- | ------------ |
| text         | 显示的文字                          | String | -                | '欢迎光临: ' |
| font-color   | 文字颜色                            | String | -                | '#FA3239'    |
| font-size    | 文字大小                            | Number | -                | 16           |
| font-weight  | 显示的文字                          | String | 'normal'/ 'bold' | 'normal'     |
| hor-align    | 文字的对齐方式 0:居左 1:居中 2:居右 | Number | -                | 0            |
| show-mode    | 显示方式                           | Number | -                | 1            |
| show-type    | 显示类型                           | Number | -                | 1            |
| stroke-style | 矩形边框颜色                        | String | -                | 'grey'       |
| fill-style   | 矩形填充颜色                        | String | -                | ''           |
| x            | 矩形距离 canvas 的 x 坐标           | String | -                | ''           |
| y            | 矩形距离 canvas 的 y 坐标           | String | -                | ''           |
| width        | 矩形宽度                            | String | -                | ''           |
| height       | 矩形高度                            | String | -                | ''           |


#### fontColors 包含的对象属性
| 参数        | 说明                                | 类型   | 可选值           | 默认值       |
| ----------- | ----------------------------------- | ------ | ---------------- | ------------ |
| name        | 颜色名称                          | String | -                | '红色' |
| value   | 颜色值                            | String | -                | '#FA3239'    |
| active    | 是否被选中                            | Boolean | -                | true           |



#### fontSizes 包含的对象属性
| 参数        | 说明                                | 类型   | 可选值           | 默认值       |
| ----------- | ----------------------------------- | ------ | ---------------- | ------------ |
| name        | 字体大小描述                          | String | -                | '16px' |
| value   | 颜色值                            | Number | -                | 16   |


#### showModes 包含的对象属性
| 参数        | 说明                                | 类型   | 可选值           | 默认值       |
| ----------- | ----------------------------------- | ------ | ---------------- | ------------ |
| name        | 显示方式名称                          | String | -                | '向上滚动' |
| value   | 显示方式值                            | Number | -                | 4   |


### Methods
| 方法名        | 说明                                | 参数   | 
| ----------- | ----------------------------------- | ------ | 
| render        | 手动修改rect里的属性之后需要调用这个render函数                          | - |



<script>
  const versions = require('docs/.vuepress/src/version.json');
  import Vue from 'vue';


  export default {
    components: {
      
    },
    data() {
      return {
        versions,
         selectKey: 'dictCode',
      selectName: 'dictName',
      childrens: 'childrenList',
      keywords: [
        {
          dictName: '类型一',
          dictCode: '11111',
          childrenList: [
            { dictName: '关键字1', dictCode: 'key1111' },
            { dictName: '关键字2', dictCode: 'key2221' },
            { dictName: '换行', dictCode: 'line_feed' },
             {
          dictName: '换行1',
          dictCode: 'line_feed1'
        },
        {
          dictName: '换行2',
          dictCode: 'line_feed2'
        },
          {
          dictName: '换行3',
          dictCode: 'line_feed3'
        },
        {
          dictName: '换行4',
          dictCode: 'line_feed4'
        },  {
          dictName: '换行5',
          dictCode: 'line_feed5'
        },
        {
          dictName: '换行6',
          dictCode: 'line_feed6'
        }
          ]
        },
        {
          dictName: '类型二',
          dictCode: '22222',
          childrenList: [
            { dictName: '关键字3', dictCode: 'key3333' },
            { dictName: '关键字4', dictCode: 'key4444' },
            { dictName: '换行', dictCode: 'line_feed' }
          ]
        }
      ],
      val: [],
      width: '0',
      height: '0',
      fontColors:[
         {
      name: '黑色',
      value: 'black',
      active: true
    }
        ],
      fontSizes:[
        {
          name:'20px',
          value: 20
        }
      ]
      }
    },
    methods:{
      handleClick(){
        this.$message.success('添加成功')
      },
      showTypeChange(val){
        console.log(val,'showTypeChange')
      },
      showModeChange(val){
        console.log(val,'showModeChange')
      },
      clickRect(val){
         console.log(val,'clickRect')
      }
    }
  }
</script>
