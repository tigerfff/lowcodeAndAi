# Checkbox 多选框

一组备选项中进行多选

## 基础用法

<template>
  <code-box title="单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍" description="在`el-checkbox`元素中定义`v-model`绑定变量，多一的`checkbox`中，默认绑定变量的值会是`Boolean`，选中为`true`">
    <el-checkbox v-model="checked">备选项</el-checkbox>
  </code-box>
</template>

```vue
<el-checkbox v-model="checked">备选项</el-checkbox>

<script>
export default {
  data() {
    return {
      checked: true
    };
  }
};
</script>
```

## 禁用状态

<template>
  <code-box title="多选框不可用的状态" description="选中的条件是绑定的变量值等于`label`中的值。只要在`el-checkbox`元素中设置`disabled`属性即可，它接受一个`Boolean`，`true`为禁用">
    <el-checkbox v-model="checked1" disabled>备选项1</el-checkbox>
    <el-checkbox v-model="checked2" disabled>备选项</el-checkbox>
  </code-box>
</template>

```vue
<el-checkbox v-model="checked1" disabled>备选项1</el-checkbox>
<el-checkbox v-model="checked2" disabled>备选项</el-checkbox>

<script>
export default {
  data() {
    return {
      checked1: false,
      checked2: true
    };
  }
};
</script>
```

## 多选框组

<template>
  <code-box title="适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项" description="`checkbox-group`元素能把多个 checkbox 管理为一组，只需要在 Group 中使用`v-model`绑定`Array`类型的变量即可。 `el-checkbox` 的 `label`属性是该 checkbox 对应的值，若该标签中无内容，则该属性也充当 checkbox 按钮后的介绍。`label`与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中`">
    <div style="margin-top: 16px;">
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="复选框 A"></el-checkbox>
        <el-checkbox label="复选框 B"></el-checkbox>
        <el-checkbox label="复选框 C"></el-checkbox>
        <el-checkbox label="禁用" disabled></el-checkbox>
        <el-checkbox label="选中且禁用" disabled></el-checkbox>
      </el-checkbox-group>
    </div>
     <div style="margin-top: 16px;">
       <el-checkbox-group v-model="checkList4" vertical>
         <el-checkbox label="垂直排列 A"></el-checkbox>
         <el-checkbox label="垂直排列 B"></el-checkbox>
         <el-checkbox label="垂直排列 C"></el-checkbox>
       </el-checkbox-group>
        </div>
    <div style="margin-top: 16px;">
       <el-checkbox-group v-model="checkList4" vertical>
         <el-checkbox label="垂直排列 A"></el-checkbox>
         <el-checkbox label="垂直排列 B"></el-checkbox>
         <el-checkbox label="垂直排列 C"></el-checkbox>
       </el-checkbox-group>
    </div>
    <div style="margin-top: 16px;">
      <el-checkbox-group v-model="checkList2" size='small' type="simple">
        <el-checkbox-button label="上海"></el-checkbox-button>
        <el-checkbox-button label="北京"></el-checkbox-button>
        <el-checkbox-button label="广州"></el-checkbox-button>
        <el-checkbox-button label="深圳"></el-checkbox-button>
        <el-checkbox-button label="杭州"></el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div style="margin-top: 16px;">
      <el-checkbox-group v-model="checkList3">
        <el-checkbox-button label="上海"></el-checkbox-button>
        <el-checkbox-button label="北京"></el-checkbox-button>
        <el-checkbox-button label="广州"></el-checkbox-button>
        <el-checkbox-button label="深圳" disabled></el-checkbox-button>
        <el-checkbox-button label="杭州"></el-checkbox-button>
      </el-checkbox-group>
    </div>
  </code-box>
</template>

```vue
<div style="margin-top: 16px;">
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="复选框 A"></el-checkbox>
        <el-checkbox label="复选框 B"></el-checkbox>
        <el-checkbox label="复选框 C"></el-checkbox>
        <el-checkbox label="禁用" disabled></el-checkbox>
        <el-checkbox label="选中且禁用" disabled></el-checkbox>
      </el-checkbox-group>
    </div>
<div style="margin-top: 16px;">
      <el-checkbox-group v-model="checkList4" vertical>
        <el-checkbox label="垂直排列 A"></el-checkbox>
        <el-checkbox label="垂直排列 B"></el-checkbox>
        <el-checkbox label="垂直排列 C"></el-checkbox>
      </el-checkbox-group>
    </div>
<div style="margin-top: 16px;">
      <el-checkbox-group v-model="checkList2" size='small' type="simple">
        <el-checkbox-button label="上海"></el-checkbox-button>
        <el-checkbox-button label="北京"></el-checkbox-button>
        <el-checkbox-button label="广州"></el-checkbox-button>
        <el-checkbox-button label="深圳"></el-checkbox-button>
        <el-checkbox-button label="杭州"></el-checkbox-button>
      </el-checkbox-group>
    </div>
<div style="margin-top: 16px;">
      <el-checkbox-group v-model="checkList3">
        <el-checkbox-button label="上海"></el-checkbox-button>
        <el-checkbox-button label="北京"></el-checkbox-button>
        <el-checkbox-button label="广州"></el-checkbox-button>
        <el-checkbox-button label="深圳" disabled></el-checkbox-button>
        <el-checkbox-button label="杭州"></el-checkbox-button>
      </el-checkbox-group>
    </div>

<script>
export default {
  data() {
    return {
      checkList: ['选中且禁用', '复选框 A']
    };
  }
};
</script>
```

## indeterminate 状态

<template>
  <code-box title="indeterminate 状态" description="`indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果">
  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
  <div style="margin: 15px 0;"></div>
  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
  </el-checkbox-group>
  </code-box>
</template>

```vue
<el-checkbox
  :indeterminate="isIndeterminate"
  v-model="checkAll"
  @change="handleCheckAllChange"
>全选</el-checkbox>
<div style="margin: 15px 0;"></div>
<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
</el-checkbox-group>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  data() {
    return {
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true
    };
  },
  methods: {
    handleCheckAllChange(value) {
      this.checkedCities = value ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>
```

## 可选项目数量的限制

<template>
  <code-box title="" description="使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量">
  <el-checkbox-group
    v-model="checkedCities1"
    :min="1"
    :max="2">
    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
  </el-checkbox-group>
  </code-box>
</template>

```vue
<el-checkbox-group v-model="checkedCities1" :min="1" :max="2">
  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
</el-checkbox-group>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  data() {
    return {
      checkedCities1: ['上海', '北京'],
      cities: cityOptions
    };
  }
};
</script>
```

<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  module.exports = {
    data() {
      return {
        checkList: ['选中且禁用','复选框 A'],
        checkList2: [],
        checkList3: [],
        checkList4: [],
        checked: true,
        checked1: false,
        checked2: true,
        checked3: true,
        checked4: false,
        checked5: false,
        checked6: true,
        isValid: '可用',
        checkAll: false,
        cities: cityOptions,
        checkedCities: ['上海', '北京'],
        checkedCities1: ['上海', '北京'],
        isIndeterminate: true,
        checkboxGroup1: ['上海'],
        checkboxGroup2: ['北京'],
        checkboxGroup3: ['广州'],
        checkboxGroup4: ['上海'],
        checkboxGroup5: [],
        checkboxGroup6: []
      };
    },
    methods: {
      handleChange(value,event) {
        //console.log(value,event);
      },
      handleCheckAllChange(value,event,that) {
        //console.log(value,event,that);
        this.checkedCities = value?  cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value,event,that) {
        //console.log(value,event,that);
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
    }
  };
</script>

<style>
  .demo-box.demo-checkbox {
    .checkbox {
      margin-right: 5px;

      & + .checkbox {
        margin-left: 10px;
      }
    }
  }
</style>

## API

### Checkbox Attributes

| 参数          | 说明                                                                  | 类型           | 可选值 | 默认值 |
| ------------- | --------------------------------------------------------------------- | -------------- | ------ | ------ |
| label         | 选中状态的值（只有在`checkbox-group`或者绑定对象类型为`array`时有效） | string         | —      | —      |
| true-label    | 选中时的值                                                            | string, number | —      | —      |
| false-label   | 没有选中时的值                                                        | string, number | —      | —      |
| show-label    | 是否显示 label 值                                                     | boolean        | —      | true   |
| name          | 原生 name 属性                                                        | string         | —      | —      |
| disabled      | 按钮禁用                                                              | boolean        | —      | false  |
| checked       | 当前是否勾选                                                          | boolean        | —      | false  |
| indeterminate | 设置 indeterminate 状态，只负责样式控制                               | boolean        | —      | false  |

### Checkbox-group Attributes

| 参数       | 说明                                 | 类型    | 可选值       | 默认值  |
| ---------- | ------------------------------------ | ------- | ------------ | ------- |
| size       | Checkbox 按钮组尺寸                  | string  | large, small | —       |
| fill       | 按钮激活时的填充色和边框色           | string  | —            | #20a0ff |
| text-color | 按钮激活时的文本颜色                 | string  | —            | #ffffff |
| min        | 可被勾选的 checkbox 的最小数量       | number  | —            | 0       |
| max        | 可被勾选的 checkbox 的最大数量       | number  | —            | —       |
| type       | 选中时的样式：default/simple         | string  | —            | default |
| vertical   | checkbox 是否垂直排列：default/false | boolean | —            | false   |

### Checkbox Events

| 事件名称 | 说明                     | 回调参数                                                          |
| -------- | ------------------------ | ----------------------------------------------------------------- |
| change   | 当绑定值变化时触发的事件 | 更新后的值,event 事件对象(若放于 checkbox-group 则返回 undefined) |
