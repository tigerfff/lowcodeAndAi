# Dialog 对话框

## 基本用法

Dialog 弹出一个对话框，适合需要定制性更大的场景。
在新的 `HUI2.0` 视觉规范中，建议使用 `Dialog` 的宽度为 480/560/660/880 四个尺寸。

<template>
  <code-box
    title="基本用法"
    description="需要设置`visible`属性，它接收`Boolean`，当为`true`时显示 Dialog。Dialog 分为两个部分：`body`和`footer`, `footer`需要具名为`footer`的`slot`。`title`属性用于定义标题，它是可选的，默认值为空。最后，本例还展示了`beforeClose`的用法。">
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog </el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :area="[480, 240]"
      size="small"
      :before-close="handleClose"
      >
      <div class="dialog-text">你好啊
        这是一个弹框
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button><el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </code-box>
</template>

<script>
export default {
 data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>
<style>
.dialog-text {
  padding: 0 8px;
}
</style>

```html
<template>
  <el-button type="text" @click="dialogVisible = true">
    点击打开 Dialog
  </el-button>
  <el-dialog title="提示" :visible.sync="dialogVisible" size="small">
    你好啊
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>
```

## 自定义内容

Dialog 组件的内容可以是任意的，甚至可以是表格或表单。

<template>
  <code-box
    title="基础用法"
    description="下面是应用了 Element Table 和 Form 组件的两个样例。">
    <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible" :area="800" >
      <el-table :data="gridData" :is-show-page="false" height="220" style="width: 100%;">
        <el-table-column prop="date" label="日期" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="200"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button><el-button @click="dialogTableVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- Form -->
    <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form  class="dialog_form_updown" :model="form" label-position="top"  label-width="90px">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button><el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </code-box>
</template>

<script>
  export default {
    data() {
      return {
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
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
        formLabelWidth: '120px'
      };
    }
  };
</script>
<style>
.el-table__header-wrapper table {
  margin: 0;
}
.dialog_form_updown  {
  margin: 0 78px;
}
</style>

```html
<template>
  <code-box
    title="基础用法"
    description="下面是应用了 Element Table 和 Form 组件的两个样例。"
  >
    <el-button type="text" @click="dialogTableVisible = true">
      打开嵌套表格的 Dialog
    </el-button>
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible" :area="800">
      <el-table
        :data="gridData"
        :is-show-page="false"
        height="220"
        style="width: 100%;"
      >
        <el-table-column prop="date" label="日期" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="200"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTableVisible = false">
          确 定
        </el-button>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- Form -->
    <el-button type="text" @click="dialogFormVisible = true">
      打开嵌套表单的 Dialog
    </el-button>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">
          确 定
        </el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </code-box>
</template>

<script>
  export default {
    data() {
      return {
        gridData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '浙江省杭州市滨江区阡陌路555号'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '浙江省杭州市滨江区阡陌路555号'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '浙江省杭州市滨江区阡陌路555号'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '浙江省杭州市滨江区阡陌路555号'
          }
        ],
        dialogTableVisible: false,
        dialogFormVisible: false,
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
        formLabelWidth: '120px'
      };
    }
  };
</script>
```

## 指定宽度

Dialog 以像素值的形式指定 dialog 宽度。

<template>
  <code-box
    title="指定宽度"
    description="通过area设置宽度，可以使 Dialog 显现指定大小。且其内部的样式由嵌入的元素决定。">
    <!-- Form -->
    <el-button type="text" @click="dialogFormVisible2 = true">打开嵌套表单的 Dialog</el-button>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible2" :area="[480, 300]">
      <el-form  class="dialog_form_updown" :model="form" label-position="top">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button><el-button @click="dialogFormVisible2 = false">取 消</el-button>
      </div>
    </el-dialog>
  </code-box>
</template>

```html
<!-- Form -->
<el-button type="text" @click="dialogFormVisible2 = true">
  打开嵌套表单的 Dialog
</el-button>
<el-dialog
  title="收货地址"
  :visible.sync="dialogFormVisible2"
  :area="[480,300]"
>
  <el-form :model="form" label-position="top">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogFormVisible2 = false">
      确 定
    </el-button>
    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
  </div>
</el-dialog>
```

## 指定宽度和高度，且垂直居中显示

Dialog 通常需要对 dialog 指定宽度或者同时指定宽高，如果指定了高度则内容超出时会自动美化滚动条。

<template>
  <code-box
    title="设置宽高"
    description="area以2元素数组设置宽高">
    <!-- Form -->
    <el-button type="text" @click="dialogFormVisible3 = true">打开嵌套表单的 Dialog</el-button>
    <el-dialog :area="[700,760]" top="middle" no-scrollbar title="收货地址" :visible.sync="dialogFormVisible3">
      <el-form ref="form"  class="dialog_form_updown" label-position="top" :model="form" label-width="90px" content-width="540px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name" tips="123"></el-input>
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
        <el-form-item>
          <el-button type="primary">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible3 = false">确 定</el-button><el-button @click="dialogFormVisible3 = false">取 消</el-button>
      </div>
    </el-dialog>
  </code-box>
</template>

```html
<!-- Form -->
<el-button type="text" @click="dialogFormVisible3 = true">
  打开嵌套表单的 Dialog
</el-button>

<el-dialog
  :area="[900,600]"
  top="middle"
  no-scrollbar
  title="收货地址"
  :visible.sync="dialogFormVisible3"
>
  <el-form ref="form" label-position="top" :model="form" label-width="80px">
    <el-form-item label="活动名称">
      <el-input v-model="form.name" tips="123"></el-input>
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
    <el-form-item>
      <el-button type="primary">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogFormVisible3 = false">
      确 定
    </el-button>
    <el-button @click="dialogFormVisible3 = false">取 消</el-button>
  </div>
</el-dialog>

<script>
  export default {
    data() {
      return {
        dialogFormVisible3: false,
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
        formLabelWidth: '120px'
      };
    }
  };
</script>
```

### 嵌套的 Dialog

如果需要在一个 Dialog 内部嵌套另一个 Dialog，需要使用 `append-to-body` 属性。

<template>
  <code-box
    title="使用嵌套dialog"
    description="正常情况下，HUI不建议使用嵌套的 Dialog，如果需要在页面上同时显示多个 Dialog，可以将它们平级放置。对于确实需要嵌套 Dialog 的场景，我们提供了`append-to-body`属性。将内层 Dialog 的该属性设置为 true，它就会插入至 body 元素上，从而保证内外层 Dialog 和遮罩层级关系的正确。">
    <el-button type="text" @click="outerVisible = true">点击打开外层 Dialog</el-button>
    <el-dialog
      title="外层 Dialog"
      :area="[1000, 650]"
      :visible.sync="outerVisible"
      append-to-body>
      这是第一层dialog
      <el-button type="primary" @click="innerVisible = true">打开嵌套层1</el-button>
      <el-dialog
        :area="[800, 500]"
        title="嵌套层1"
        :visible.sync="innerVisible"
        append-to-body>
        这是第二层dialog
        <el-dialog
          :area="[600, 400]"
          title="嵌套层2"
          :visible.sync="innerVisible1"
          append-to-body>
            我在第三个dialog里
        </el-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="innerVisible1 = true">打开嵌套层2</el-button><el-button @click="innerVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="innerVisible = true">打开嵌套层1</el-button><el-button @click="outerVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </code-box>
</template>

```html
<el-button type="text" @click="outerVisible = true">
  点击打开外层 Dialog
</el-button>
<el-dialog
  title="外层 Dialog"
  :area="[1000, 650]"
  :visible.sync="outerVisible"
  append-to-body
>
  这是第一层dialog
  <el-button type="primary" @click="innerVisible = true">打开嵌套层1</el-button>
  <el-dialog
    :area="[800, 500]"
    title="嵌套层1"
    :visible.sync="innerVisible"
    append-to-body
  >
    这是第二层dialog
    <el-dialog
      :area="[600, 400]"
      title="嵌套层2"
      :visible.sync="innerVisible1"
      append-to-body
    >
      我在第三个dialog里
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button @click="innerVisible = false">取 消</el-button>
      <el-button type="primary" @click="innerVisible1 = true">
        打开嵌套层2
      </el-button>
    </div>
  </el-dialog>
  <div slot="footer" class="dialog-footer">
    <el-button @click="outerVisible = false">取 消</el-button>
    <el-button type="primary" @click="innerVisible = true">
      打开嵌套层1
    </el-button>
  </div>
</el-dialog>
```
## 支持拖拽  <Badge text="新增"/>

如果要支持对话框能够拖拽,需要使用 `draggable` 属性,默认为`false`.设置为`true`，则对话框可支持鼠标拖拽移动位置。

<template>
  <code-box
    title="基本用法"
    description="设置`draggable`属性,则对话框支持拖拽">
    <el-button type="text" @click="dialogDragVisible = true">点击打开 Dialog </el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogDragVisible"
      :area="[480, 240]"
      draggable
      size="small"
      :before-close="handleClose"
      >
      <div class="dialog-text">你好啊
        这是一个弹框,可以拖拽
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogDragVisible = false">确 定</el-button><el-button @click="dialogDragVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </code-box>
</template>

<script>
export default {
 data() {
    return {
      dialogDragVisible: false
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>
<style>
.dialog-text {
  padding: 0 8px;
}
</style>

```html
<el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :area="[480, 240]"
      draggable
      size="small"
      :before-close="handleClose"
      >
      <div class="dialog-text">你好啊
        这是一个弹框,可以拖拽
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button><el-button @click="dialogVisible = false">取 消</el-button>
      </span>
</el-dialog>

<script>
  export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>
```

## API

### Attributes

| 参数                  | 说明                                                                                                   | 类型                                 | 可选值                | 默认值 |
| --------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------ | --------------------- | ------ |
| visible               | 是否显示 Dialog，支持 .sync 修饰符                                                                     | boolean                              | —                     | false  |
| title                 | Dialog 的标题，也可通过具名 slot （见下表）传入                                                        | string                               | —                     | —      |
| size                  | Dialog 的大小                                                                                          | string                               | tiny/small/large/full | small  |
| top                   | Dialog CSS 中的 top 值（仅在 size 不为 full 时有效），赋值为 middle 则垂直居中（仅在指定了高度时有效） | string                               | —                     | 15%    |
| area                  | 指定宽度或同时指定宽高，使用了该参数则 size 自动失效；指定了高度时，内容超出区域会自动美化滚动条       | Number/Array(Number,Number)          | —                     | 480    |
| no-scrollbar          | 可以指定不出现 dialog 容器的滚动条（指定了高度才生效，不指定高度默认无滚动条）                         | boolean                              | —                     | true   |
| modal                 | 是否需要遮罩层，如果需要可以点击参考 [#805](http://iris.hikvision.com.cn/hui-vue/hui-vue/-/issues/805) | boolean                              | —                     | true   |
| modal-append-to-body  | 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上                           | boolean                              | —                     | true   |
| append-to-body        | Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true                           | boolean                              | —                     | false  |
| lock-scroll           | 是否在 Dialog 出现时将 body 和 html 滚动锁定                                                           | boolean                              | —                     | true   |
| custom-class          | Dialog 的自定义类名                                                                                    | string                               | —                     | —      |
| close-on-click-modal  | 是否可以通过点击 modal 关闭 Dialog                                                                     | boolean                              | —                     | true   |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Dialog                                                                       | boolean                              | —                     | true   |
| show-close            | 是否显示关闭按钮                                                                                       | boolean                              | —                     | true   |
| before-close          | 关闭前的回调，会暂停 Dialog 的关闭                                                                     | function(done)，done 用于关闭 Dialog | —                     | —      |
| draggable            | 是否支持拖拽                                                                                       | boolean                              | —                     | false   |
| destroy-on-close            | 当关闭 `Dialog` 时，销毁其中的元素                                                                                       | boolean                              | —                     | false   |

### Slot

| name   | 说明                    |
| ------ | ----------------------- |
| —      | Dialog 的内容           |
| title  | Dialog 标题区的内容     |
| footer | Dialog 按钮操作区的内容 |

### Events

| 事件名称 | 说明                  | 回调参数 |
| -------- | --------------------- | -------- |
| close    | Dialog 关闭的回调     | —        |
| open     | Dialog 打开的回调     | —        |
| closed   | Dialog 完全关闭的回调 | —        |
| opened   | Dialog 完全打开的回调 | —        |

<script>
  module.exports = {
    data() {
      return {
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '浙江省杭州市滨江区阡陌路555号'
        }],
        dialogVisible: false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogFormVisible2: false,
        dialogFormVisible3: false,
        outerVisible: false,
        innerVisible: false,
        innerVisible1: false,
        dialogDragVisible:false,
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
        formLabelWidth: '80px'
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>

<style lang="scss" scoped>
  .code-box.demo-dialog {
    .full-image {
      width: 100%;
    }
    .el-dialog__wrapper {
      margin: 0;
    }
    .el-select {
      width: 300px;
    }
    .el-input {
      width: 300px;
    }
    .el-button--text {
      margin-right: 15px;
    }
    .el-table{
      height:300px;
    }
  }
  .dialog_form_updown  {
    margin: 0 78px;
  }
</style>
