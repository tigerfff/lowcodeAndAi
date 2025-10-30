# MutliSelector 下拉搜索多选

<template>
  <author-info
    :version="versions['mutli-selector']"
    author="张凤49"
    ux="苗任越"
    ui="江佳欢"
    standard="http://10.33.43.73/BBG_UED/BUI_Design/bscs/v2.0/issues/46"
    reviewed
  />
</template>

## 安装

```bash
$ npm i @hui-pro/mutli-selector -D
# 或者
$ yarn add @hui-pro/mutli-selector --dev
```

## 引入

```js
import MutliSelector from '@hui-pro/mutli-selector';
import '@hui-pro/mutli-selector/theme/index.scss';
Vue.use(MutliSelector);
```

## 基础用法

<template>
  <code-box title="基础用法" description="通过设置 `highlight-key` 可以为高亮显示指定文本，颜色默认为主题色。">
    <h-multi-selector append-body v-model="value" :dataList="list1"/>
  </code-box>
</template>

```html
<h-multi-selector v-model="value" :dataList="list1" />

<script>
  export default {
    data() {
      return {
        list1: [],
        value: []
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        let list = [];
        for (let i = 0; i < 20; i++) {
          list.push({
            id: i,
            name: `name${i}`
          });
        }
        this.list1 = list;
      }
    },
    watch: {
      value(val) {
        console.log('wz', val);
      }
    }
  };
</script>
```

## 排序

<template>
  <code-box title="排序" description="通过设置sort来把选中的选项置顶（收齐下拉框时排序，并非实时）">
    <h-multi-selector v-model="value3" :dataList="list1" :sort="true"/>
  </code-box>
</template>

```html
<h-multi-selector v-model="value3" :dataList="list1" :sort="true" />

<script>
  export default {
    data() {
      return {
        list1: [],
        value3: []
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        let list = [];
        for (let i = 0; i < 20; i++) {
          list.push({
            id: i,
            name: `name${i}`
          });
        }
        this.list1 = list;
      }
    },
    watch: {
      value3(val) {
        console.log('wz', val);
      }
    }
  };
</script>
```

## 选中个数限制

<template>
  <code-box title="选中个数限制" description="通过设置multi-mum可以限制最大选中的个数。">
    <h-multi-selector v-model="value6" :dataList="list1" :multi-num="5"/>
  </code-box>
</template>

```html
<h-multi-selector v-model="value6" :dataList="list1" :multi-num="5" />

<script>
  export default {
    data() {
      return {
        list1: [],
        value6: []
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        let list = [];
        for (let i = 0; i < 20; i++) {
          list.push({
            id: i,
            name: `name${i}`
          });
        }
        this.list1 = list;
      }
    },
    watch: {
      value6(val) {
        console.log('wz', val);
      }
    }
  };
</script>
```

## 含全部(联动)

<template>
  <code-box title="基础用法" description="设置hasAllSelect为true">
    <h-multi-selector :disabledIds="disabledIds" v-model="value2" :dataList="list1" :hasAllSelect="true"/>
  </code-box>
</template>

```html
<h-multi-selector v-model="value2" :dataList="list1" :hasAllSelect="true" />

<script>
  export default {
    data() {
      return {
        list1: [],
        value: [1]
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        let list = [];
        for (let i = 0; i < 20; i++) {
          list.push({
            id: i,
            name: `name${i}`
          });
        }
        this.list1 = list;
      }
    },
    watch: {
      value(val) {
        console.log('wz', val);
      }
    }
  };
</script>
```

## 含全部(不联动)

<template>
  <code-box title="含全部(不联动)" description="这边的全部，并非是全选，只是list选项中包含“全部”的名称而已。另外通过unsortId来设置不需要排序的id（这边可传入全部的id，用途是选中的选项置顶时，全部仍然是在顶部）">
    <h-multi-selector v-model="value4" :dataList="list2" :sort="true" :unsortId="unsortId"/>
  </code-box>
</template>

```html
<h-multi-selector
  v-model="value4"
  :dataList="list2"
  :sort="true"
  :unsortId="unsortId"
/>

<script>
  export default {
    data() {
      return {
        list2: [],
        value4: []
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        let list = [];
        for (let i = 0; i < 20; i++) {
          list.push({
            id: i,
            name: `name${i}`
          });
        }
        this.unsortId = ['all'];
        this.list2 = [{ id: 'all', name: '全部' }].concat(list);
      }
    },
    watch: {
      value4(val) {
        console.log('wz', val);
      }
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
        list1: [],
        value: [1],
        value2: [],
        value3: [],
        unsortId: [],
        disabledIds: [],
        list2: [],
        value4: [],
        value6: []
      }
    },
    created () {
      setTimeout(() => {
        this.init()
      }, 3000)
      
    },
    methods: {
      init () {
        let list = []
        for (let i = 0; i< 20; i++) {
          list.push({
            id: i,
            name: `name${i}`
          })
        }
        this.list1 = list
        this.unsortId = ['all']
        this.list2 = [{id: 'all', name: '全部'}].concat(list)
        console.log(this.list2)
        setTimeout(() => {
          this.value2 = [1]
        }, 3000)
      },
    },
    watch: {
      value (val) {
        console.log('wz', val)
      }
    }
  }
</script>

## API

### Attributes

| 参数           | 说明                                                                  | 类型    | 可选值 | 默认值                  |
| -------------- | --------------------------------------------------------------------- | ------- | ------ | ----------------------- |
| data-list      | 下拉选项列表                                                          | Array   | -      | []                      |
| options        | 传入的 name 和 id                                                     | Object  | -      | {id:'id', name: 'name'} |
| unsortId       | 不需要排序的 id 值（配合 sort 使用）                                  | Array   | -      | []                      |
| sort           | 收齐下拉面板时是否需要将选中项置顶                                    | Boolean | -      | false                   |
| sort           | 收齐下拉面板时是否需要将选中项置顶                                    | Boolean | -      | false                   |
| multi-num      | 选中项限制个数 (不要和联动全部配合使用，目前不支持全部联动加限制个数) | number  | -      | -                       |
| has-all-select | 是否需要联动全部选项                                                  | Boolean | -      | false                   |
| disabledIds  <Badge text="1.14.1+" /> | 置灰不可选择功能,数组内放入不可选择的value值(不要和联动全部配合使用，目前不支持全部联动加限制个数)  | Array | -      | []  |
| append-body  <Badge text="1.15.1+" /> | 是否放到body上 | Boolean | -      | false |
| valueType  <Badge text="1.15.1+" /> | v-model绑定数组中的值是key还是对象 | string | 'key': id集合；'object': 对象集合 | 'key' |


