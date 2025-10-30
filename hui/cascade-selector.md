# CascadeSelector 横向级联选择器

<template>
  <author-info
    :version="versions['cascade-selector']"
    author="张凤49"
    ux="苗任越，赵露唏"
    ui="杨丹妮"
    standard="http://10.33.43.73/BBG_UED/BUI_Design/bscs/v2.0/issues/17"
    reviewed
  />
</template>

> 备注：适用范围3,4层的类型;默认展示7行内容，如果含有搜索或字母过滤，则展示5行内容；根据视觉要求可修改panel-height来控制面板高度

## 安装

```bash
$ npm i @hui-pro/cascade-selector -D
# 或者
$ yarn add @hui-pro/cascade-selector --dev
```

## 引入
```js
import CascadeSelector from '@hui-pro/cascade-selector';
import '@hui-pro/cascade-selector/theme/index.scss';
Vue.use(CascadeSelector);
```
## 基础用法-异步
<template>
  <code-box title="基础用法-异步" description="通过点击回调函数来传回参数,只能选择到最后一级, 面板的布局可通过col-span来控制每一层级的布局，如果布局相同可传入数字，如果不同数组传入">
    <h-cascade-selector placeholder="只能选择到最后一级"
          :tab-list="tabList"
          v-model="result"
          :is-only-select-last="true"
          :col-span="[4, 6, 8]"
          :data='initData'
          :get-region-data="getRegionData"></h-cascade-selector>
    <br/>
    <h-cascade-selector placeholder="只能选择到任意层级"
    :tab-list="tabList2"
    v-model="result55"
    :is-only-select-last="false"
    :data='initData'
          :get-region-data="getRegionData"></h-cascade-selector>
  </code-box>
</template>

```html
<h-cascade-selector placeholder="只能选择到最后一级"
          :tab-list="tabList"
          v-model="result"
          :col-span="[4, 6, 8]"
          :is-only-select-last="true"
          :data='initData'
          :get-region-data="getRegionData"></h-cascade-selector>
<h-cascade-selector placeholder="只能选择到任意层级"
    :tab-list="tabList2"
    v-model="result2"
    :is-only-select-last="false"
    :data='initData'
          :get-region-data="getRegionData"></h-cascade-selector>

<script>
  export default {
    data() {
      return {
        tabList: ['第一层', '第二层', '第三层'],
        tabList2: ['第一层', '第二层', '第三层', '第四层'],
        result: {},
        result2: {},
        initData: []
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
          // 初始化第一层假数据
        this.initData = this.createdData()
      },
      getRegionData (item, callback) {
        setTimeout(() => {
          let x = this.createdData()
          callback(x)
        }, 1000)
      },
      createdData () {
        let cities = [
          '杭州',
          '天津',
          '广东',
          '西安',
          '北京',
          '武汉',
          '杭州',
          '背景',
          'scsc',
          '杭州'
        ]
        let num = Math.round(Math.random() * 100)
        let j = Math.round(Math.random() * 9)
        let city = cities[j]
        let result = []
        for (let i = 1; i < num; i++) {
          result.push({
            name: `${city}${i}`,
            id: i,
            label: `${city}${i}`
          })
        }
        return result
      }
    }
  }
</script>
```

## 基础用法-同步（带搜索）
<template>
  <code-box title="基础用法-同步" description="通过设置参数load-type为'sync',并且将数据通过children的树形结构传入，children可通过default-option来修改">
    <h-cascade-selector placeholder="选中任意层级"
      :tab-list="tabList"
      v-model="result55"
      load-type="sync"
      :data='allData'></h-cascade-selector>
    <br/>
    <h-cascade-selector placeholder="只能选择到最后一级"
      :tab-list="tabList"
      v-model="result56"
      :is-only-select-last="true"
      load-type="sync"
      :data='allData'></h-cascade-selector>
  </code-box>
</template>

```html
<h-cascade-selector placeholder="选中任意层级"
      :tab-list="tabList"
      v-model="result55"
      load-type="sync"
      :data='allData'></h-cascade-selector>
    <br/>
    <h-cascade-selector placeholder="只能选择到最后一级"
      :tab-list="tabList"
      v-model="result56"
      :is-only-select-last="true"
      load-type="sync"
      :data='allData'></h-cascade-selector>

<script>
  export default {
    data() {
      return {
        tabList: ['第一层', '第二层', '第三层'],
        result55: {},
        result56: {},
        allData: []
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
          // 初始化所有数据
        let data = this.createdData()
        for(let i= 0; i< data.length; i++) {
          data[i].children = this.createdData()
          for(let j= 0; j< data[i].children.length; j++) {
            data[i].children[j].children = this.createdData()
          }
        }
        this.allData = data
      },
      createdData () {
        let letterSort = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ]
        let cities = [
          '杭州',
          '天津',
          '广东',
          '西安',
          '北京',
          '武汉',
          '杭州',
          '背景',
          'scsc',
          '杭州'
        ]
        let num = 8
        let j = Math.round(Math.random() * 9)
        let city = cities[j]
        let result = []
        for (let i = 1; i < num; i++) {
          result.push({
            name: `${city}${letterSort[i % 26]}`,
            id: i,
            label: `${city}${letterSort[i % 26]}`,
            type: letterSort[i % 26]
          })
        }
        return result
      }
    }
  }
</script>
```

## 只显示选中的最后一层的内容
<template>
  <code-box title="只显示选中的最后一层的内容" description="设置is-only-show-last参数为true，在输入框内只显示最后一层">
    <h-cascade-selector placeholder="选中任意层级"
          :tab-list="tabList"
          v-model="result22"
          :is-only-show-last="true"
          :data='initData'
          :get-region-data="getRegionData"></h-cascade-selector>
  </code-box>
</template>

```html
<h-cascade-selector placeholder="选中任意层级"
          :tab-list="tabList"
          v-model="result22"
          :is-only-show-last="true"
          :data='initData'
          :get-region-data="getRegionData"></h-cascade-selector>

<script>
  export default {
    data() {
      return {
        tabList: ['第一层', '第二层', '第三层']
        result22: {},
        initData: []
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
          // 初始化第一层假数据
        this.initData = this.createdData()
      },
      getRegionData (item, callback) {
        setTimeout(() => {
          let x = this.createdData()
          callback(x)
        }, 1000)
      },
      createdData () {
        let cities = [
          '杭州',
          '天津',
          '广东',
          '西安',
          '北京',
          '武汉',
          '杭州',
          '背景',
          'scsc',
          '杭州'
        ]
        let num = Math.round(Math.random() * 100)
        let j = Math.round(Math.random() * 9)
        let city = cities[j]
        let result = []
        for (let i = 1; i < num; i++) {
          result.push({
            name: `${city}${i}`,
            id: i,
            label: `${city}${i}`
          })
        }
        return result
      }
    }
  }
</script>
```


## 可搜索
<template>
  <code-box title="基础用法-搜索" description="通过配置search-fn来过滤">
    <h-cascade-selector placeholder="只能选择到最后一级"
          :tab-list="tabList"
          v-model="result3"
          :is-only-select-last="true"
          :data='initData'
          :panel-height="280"
          :can-search='true'
          :search-fn="searchFunction"
          :get-region-data="getRegionData"></h-cascade-selector>
  </code-box>
</template>

```html
<h-cascade-selector placeholder="只能选择到最后一级"
          :tab-list="tabList"
          v-model="result3"
          :is-only-select-last="true"
          :data='initData'
          :panel-height="280"
          :can-search='true'
          :search-fn="searchFunction"
          :get-region-data="getRegionData"></h-cascade-selector>

<script>
  export default {
    data() {
      return {
        tabList: ['第一层', '第二层', '第三层'],
        result3: {},
        initData: []
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
          // 初始化第一层假数据
        this.initData = this.createdData()
      },
      getRegionData (item, callback) {
        setTimeout(() => {
          let x = this.createdData()
          callback(x)
        }, 1000)
      },
      createdData () {
        let cities = [
          '杭州',
          '天津',
          '广东',
          '西安',
          '北京',
          '武汉',
          '杭州',
          '背景',
          'scsc',
          '杭州'
        ]
        let num = Math.round(Math.random() * 100)
        let j = Math.round(Math.random() * 9)
        let city = cities[j]
        let result = []
        for (let i = 1; i < num; i++) {
          result.push({
            name: `${city}${i}`,
            id: i,
            label: `${city}${i}`
          })
        }
        return result
      },
      searchFunction (text, item, index, data) {
        console.log(text)
        console.log(item)
        console.log(index)
        console.log(data)
        // 内部使用filter函数，这边只要返回return规则
        return item.name.includes(text);
      }
    }
  }
</script>
```

## 初始化时默认选中

<template>
  <code-box title="基础用法-默认选中" description="通过配置default-selected来默认初始化，参数可为Boolean和Boolean数组,1.default-selected:true，代表默认初始化所以层级的第一个节点；2.default-selected=[true, true, false]代表默认初始化前2层的第一个节点。另外可通过配合数据加载完成回调afterDataCompleteFn和selectNode方法来选中节点">
    <h-cascade-selector placeholder="可以选择任意层级"
          :tab-list="tabList"
          v-model="result11"
          :data='initData2'
          :default-selected="true"
          :get-region-data="getRegionData"></h-cascade-selector>
    <br/>
    <h-cascade-selector placeholder="可以选择任意层级"
          :tab-list="tabList"
          v-model="result12"
          :data='initData3'
          ref="select-node"
          :default-selected="[true, true, false]"
          :get-region-data="getRegionData"></h-cascade-selector>
      <br/>
    <h-cascade-selector placeholder="可以选择任意层级"
          :tab-list="tabList"
          v-model="result13"
          :data='initData4'
          ref="select-node"
          :after-data-complete-fn="afterDataCompleteFn"
          :get-region-data="getRegionData"></h-cascade-selector>
  </code-box>
</template>

```html
    <h-cascade-selector placeholder="可以选择任意层级"
          :tab-list="tabList"
          v-model="result11"
          :data='initData2'
          :default-selected="true"
          :get-region-data="getRegionData"></h-cascade-selector>
    <br/>
    <h-cascade-selector placeholder="可以选择任意层级"
          :tab-list="tabList"
          v-model="result12"
          :data='initData3'
          ref="select-node"
          :default-selected="[true, true, false]"
          :get-region-data="getRegionData"></h-cascade-selector>
      <br/>
    <h-cascade-selector placeholder="可以选择任意层级"
          :tab-list="tabList"
          v-model="result13"
          :data='initData4'
          ref="select-node"
          :after-data-complete-fn="afterDataCompleteFn"
          :get-region-data="getRegionData"></h-cascade-selector>
<script>
export default {
    data() {
      return {
        tabList: ['第一层', '第二层', '第三层'],
        result11: {},
        result12: {},
        result13: {},
        initData: [],
        initData2: [],
        initData3: [],
        initData4: []
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
          // 初始化第一层假数据
        this.initData = this.createdData()
        this.initData2 = this.createdData()
        this.initData3 = this.createdData()
        this.initData4 = this.createdData()
      },
      getRegionData (item, callback) {
        setTimeout(() => {
          let x = this.createdData()
          callback(x)
        }, 1000)
      },
      createdData () {
        let cities = [
          '杭州',
          '天津',
          '广东',
          '西安',
          '北京',
          '武汉',
          '杭州',
          '背景',
          'scsc',
          '杭州'
        ]
        let num = Math.round(Math.random() * 100)
        let j = Math.round(Math.random() * 9)
        let city = cities[j]
        let result = []
        for (let i = 1; i < num; i++) {
          result.push({
            name: `${city}${i}`,
            id: i,
            label: `${city}${i}`
          })
        }
        return result
      },
      searchFunction (text, item, index, data) {
        console.log(text)
        console.log(item)
        console.log(index)
        console.log(data)
        // 内部使用filter函数，这边只要返回return规则
        return item.name.includes(text);
      },
      // 每层加载完数据的回调函数
      afterDataCompleteFn(index) {
        let data = {
          tab: index,
          index: 1
        }
        this.$refs['select-node'] && this.$refs['select-node'].selectNode(data);
      }
    }
  }
</script>
```

## 字母过滤

<template>
  <code-box title="字母过滤" description="通过设置letter-filter为true(letter-filter可分别控制每一层是否有字母过滤)，开启字母过滤，但是传入的列表内容中必须包含字段type（如type: 'A'），这个type字段可通过defaultOption来修改">
    <h-cascade-selector placeholder="可以选择任意层级"
          :tab-list="tabList"
          v-model="result77"
          :data='initData3'
          :panel-height="274"
          :letter-filter="letterFilter"
          :get-region-data="getRegionData"></h-cascade-selector>
  </code-box>
</template>

```html
<h-cascade-selector placeholder="可以选择任意层级"
          :tab-list="tabList"
          v-model="result77"
          :data='initData3'
          :panel-height="274"
          :letter-filter="letterFilter"
          :get-region-data="getRegionData"></h-cascade-selector>
<script>
export default {
    data() {
      return {
        tabList: ['第一层', '第二层', '第三层'],
        result77: {},
        initData3: [],
        letterFilter: [false, false, true]
      }
    },
    created () {
      this.init()
    },
    methods: {
      getRegionData (item, callback) {
        setTimeout(() => {
          let x = this.createdData()
          callback(x)
        }, 1000)
      },
      createdData () {
        let cities = [
          '杭州',
          '天津',
          '广东',
          '西安',
          '北京',
          '武汉',
          '杭州',
          '背景',
          'scsc',
          '杭州'
        ]
        let letterSort = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ]
        let num = Math.round(Math.random() * 100)
        let j = Math.round(Math.random() * 9)
        let city = cities[j]
        let result = []
        for (let i = 1; i < num; i++) {
          result.push({
            name: `${city}${i}`,
            id: i,
            label: `${city}${i}`,
            type: letterSort[i % 26]
          })
        }
        return result
      }
    }
  }
</script>
```

## 默认选中（新）：用于编辑状态
<template>
  <code-box title="默认选中（新）：用于编辑状态" description="通过设置defaultSelect属性，当初始化时，会自动选中数据，并一层层的选中对应数据">
<h-cascade-selector placeholder="只能选择到最后一级"
          :tab-list="tabList"
          v-model="result"
          :is-only-select-last="true"
          :defaultSelect="defaultSelect"
          :col-span="[4, 6, 8]"
          :data='initData'
          :get-region-data="getRegionData"></h-cascade-selector>
          <el-button type="primary" @click="changSelect">切换选中的数据</el-button>
  </code-box>
</template>

```html
<h-cascade-selector placeholder="只能选择到最后一级"
          :tab-list="tabList"
          v-model="result"
          :col-span="[4, 6, 8]"
          :is-only-select-last="true"
          :defaultSelect="defaultSelect"
          :data='initData'
          :get-region-data="getRegionData"></h-cascade-selector>

<script>
  export default {
    data() {
      return {
        tabList: ['第一层', '第二层', '第三层'],
        result: {},
        initData: [],
        defaultSelect: {
          flag: true,
          ids: [1, 2, 3]
        },
        i: 1
      }
    },
    created () {
      this.init()
    },
    methods: {
      changSelect () {
        this.i++
        if (this.i === 10) {
          this.i = 1
        }
        this.defaultSelect.ids = [this.i, this.i, this.i]
      },
      init () {
          // 初始化第一层假数据
        this.initData = this.createdData()
      },
      getRegionData (item, callback) {
        setTimeout(() => {
          let x = this.createdData()
          callback(x)
        }, 1000)
      },
      createdData () {
        let cities = [
          '杭州',
          '天津',
          '广东',
          '西安',
          '北京',
          '武汉',
          '杭州',
          '背景',
          'scsc',
          '杭州'
        ]
        let num = Math.round(Math.random() * 100)
        let j = Math.round(Math.random() * 9)
        let city = cities[j]
        let result = []
        for (let i = 1; i < num; i++) {
          result.push({
            name: `${city}${i}`,
            id: i,
            label: `${city}${i}`
          })
        }
        return result
      }
    }
  }
</script>
```


<script>
  const versions = require('docs/.vuepress/src/version.json');
  export default {
    data() {
      return {
        versions,
        tabList: ['第一层', '第二层', '第三层'],
        tabList2: ['第一层', '第二层', '第三层', '第四层'],
        result: {},
        result2: {},
        result3: {},
        result22: {},
        result11: {},
        result12: {},
        result13: {},
        result55: {},
        result56: {},
        result77: {},
        initData: [],
        initData2: [],
        initData3: [],
        initData4: [],
        allData: [],
        letterFilter: [false, false, true],
        defaultSelect: {
          flag: true,
          ids: [1, 1, 1]
        },
        i: 1
      }
    },
    watch: {
      result55 (val) {
        console.log('val', val)
      }
    },
    created () {
      this.init()
    },
    methods: {
      changSelect () {
        this.i++
        if (this.i === 10) {
          this.i = 1
        }
        this.defaultSelect.ids = [this.i, this.i, this.i]
      },
      init () {
          // 初始化第一层假数据
        this.initData = this.createdData()
        this.initData2 = this.createdData()
        this.initData3 = this.createdData()
        this.initData4 = this.createdData()
        let data = this.createdData2()
        for(let i= 0; i< data.length; i++) {
          data[i].children = this.createdData2()
          for(let j= 0; j< data[i].children.length; j++) {
            data[i].children[j].children = this.createdData2()
          }
        }
        this.allData = data
      },
      getRegionData (item, callback) {
        setTimeout(() => {
          let x = this.createdData()
          callback(x)
        }, 1000)
      },
      createdData () {
        let letterSort = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ]
        let cities = [
          '杭州',
          '天津',
          '广东',
          '西安',
          '北京',
          '武汉',
          '杭州',
          '背景',
          'scsc',
          '杭州'
        ]
        let num = Math.round(Math.random() * 100)
        let j = Math.round(Math.random() * 9)
        let city = cities[j]
        let result = []
        for (let i = 1; i < num; i++) {
          result.push({
            name: `${city}${letterSort[i % 26]}`,
            id: i,
            label: `${city}${letterSort[i % 26]}`,
            type: letterSort[i % 26]
          })
        }
        return result
      },
      createdData2 () {
        let letterSort = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ]
        let cities = [
          '杭州',
          '天津',
          '广东',
          '西安',
          '北京',
          '武汉',
          '杭州',
          '背景',
          'scsc',
          '杭州'
        ]
        let num = 8
        let j = Math.round(Math.random() * 9)
        let city = cities[j]
        let result = []
        for (let i = 1; i < num; i++) {
          result.push({
            name: `${city}${letterSort[i % 26]}`,
            id: i,
            label: `${city}${letterSort[i % 26]}`,
            type: letterSort[i % 26]
          })
        }
        return result
      },
      searchFunction (text, item, index, data) {
        console.log(text)
        console.log(item)
        console.log(index)
        console.log(data)
        // 内部使用filter函数，这边只要返回return规则
        return item.name.includes(text);
      },
      // 每层加载完数据的回调函数
      afterDataCompleteFn(index) {
        let data = {
          tab: index,
          index: 1
        }
        this.$refs['select-node'] && this.$refs['select-node'].selectNode(data);
      }
    }
  }
</script>


## API

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 参数 |
|---------- |-------------- |---------- |--------------------------------  |-------- | ---|
| select-node | 选中节点函数，**前提是已有数据** | Function | -- | 无 | （Object) （object为选中的节点，需要传入tab和index, tab代表是第一个tab页，index为当前tab页下的哪个节点如{tab: 0, index: 0},选中第一个tab页下的第一个节点)
### 事件
|参数|说明|参数|
|---------- |-------------- |---------- |
|item-click <Badge text="1.3.1+" />|选项选中事件|(index, currentTab, item) index：当前面板页0，1,2；currentTab:当前面板名称，item:当前选中项|

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|---------- |-------------- |---------- |--------------------------------  |-------- | ---|
| **tab-list** | tab分页数据，**必选参数** | Array | — | — | — |
| **get-region-data** | 回调函数，用于回调返回数据 **当异步时为必选必选参数** | Function | — | — | (item, callback) item为当前点击项，callback需要你传回下一个数据 callback(data) |
| **data** | 初始化数据（即第一层数据） **必选参数** | Array | — | [] | — |
| load-type | 加载方式，同步或异步 | String | 'async', 'sync' | 'async' | — |
| is-only-select-last | 是否点击到最后一层 | Booleam | — | false | — |
| is-only-show-last | 只是只展示最后一个选中的数据 | Booleam | — | false | — |
| letter-filter | 是否字母过滤 | Boolean控制所有层都有或都没有, Array分别控制每一层是否有 | — | false | — |
| placeholder | 提示语 | String | — | 请选择 | — |
| header-type | tab样式类型 | string | 'triangle' | — | — |
| type | 待完善，后续支持联级选择分类ABCD..(传入的数据必须是对象，eg {A: [], B: []}) | string | — | 'normal' | — |
| default-option | 属性为name和id，内部通过id和name进行展示和标识的，展示为name对应的属性值 | Object | — | {id: 'id', name: 'name', children: 'children', type: 'type'} | — |
| cashe | 是否缓存已加载的数据 | Boolean | — | true | — |
| can-search | 是否有搜索 | Boolean,Array | 传入Boolean时，代表所有层都是有搜索或无搜索，Array: [true, false, true]与层数需要对应 | false | — |
| no-data-text | 每一层无数据时的提示语 | String, Array | 传入Boolean则代表每一层提示语都一样，Array ['暂无楼层'， ‘暂房间’...] 与tab层数要相同 | '暂无数据' |  |
| search-fn | 搜索过滤函数 | Function | -- | 无 | （searchText, item, index, data) （searchText为搜索内容，item，index，data为filter函数的三个参数。根据这些值，返回Boolean，来告诉组件是否需要该项值)
| default-selected | 是否默认选中节点，仅仅初始化话时有效，即第一次 | Boolean, Array | -- | false | （传入Boolean时，代表所有层都是有默认选中，Array: [true, false, true]与层数需要对应. **不可传入[true, false, true]这种默认选中中间位false的情况。**
| after-data-complete-fn | 加载完一层tab数据时，的回调函数 | Function | -- | 无 | （index）传入的为tab的index，可以知道为哪一层数据tab加载完成了
| base-content | 在input框中增加展示默认前缀值 | String | -- | 无 | 
| col-span | 内容栅格布局(24栅格，传入数值代表每一层都一样布局，传入数组代表不同层对应的栅格) | Number, Array | -- | 6 | 
| panel-height | 内容区域展示的高度（不包含tab） | Number | -- | 280 |
|defaultSelect <Badge text="1.5.1+" />|默认选中|Object | -- | { flag: false, ids: [] } flag是否默认选中，ids为默认选中的id集合|
|allTabDisabled <Badge text="1.7.1+" />|tab是否都置灰不可点击|Boolean | -- | false |
| clearable <Badge text="2.0.0-beta.3+" />       | 是否可清空数据                                                             | Boolean       |                     | true                    |
| disabled <Badge text="2.0.0-beta.3+" />       | 不可选择                                                             | Boolean       |                     | false                          |
