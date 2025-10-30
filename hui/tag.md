# Tag 标签

## 基础用法

用于标记和选择。

<template>
  <code-box title="基础用法" description="由`type`属性来选择tag的类型，也可以通过`color`属性来自定义背景色。">
    <el-tag>标签一</el-tag>
    <el-tag type="info">标签二</el-tag>
    <el-tag type="primary">标签三</el-tag>
    <el-tag type="success">标签四</el-tag>
    <el-tag type="warning">标签五</el-tag>
    <el-tag type="danger">标签六</el-tag>
  </code-box>
</template>

```html
<el-tag>标签一</el-tag>
<el-tag type="info">标签二</el-tag>
<el-tag type="primary">标签三</el-tag>
<el-tag type="success">标签四</el-tag>
<el-tag type="warning">标签五</el-tag>
<el-tag type="danger">标签六</el-tag>
```

## 可移除标签

默认的标签只是展示作用。可以通过 `closable` 属性设置标签是否有关闭事件。标签的真正的移除作用，通过 `close` 事件监听实现。

<template>
  <code-box
    title="可移除标签"
    description="设置`closable`属性可以定义一个标签是否可移除。默认的标签移除时会附带渐变动画，如果不想使用，可以设置`disable-transitions`属性，它接受一个`Boolean`，true 为关闭。">
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      :closable="true"
      :type="tag.type"
    >
      {{tag.name}}
    </el-tag>
  </code-box>
</template>


```html
<el-tag
  v-for="tag in tags"
  :key="tag.name"
  :closable="true"
  :type="tag.type"
>
{{tag.name}}
</el-tag>

<script>
  export default {
    data() {
      return {
        tags: [
          { name: '标签一', type: '' },
          { name: '标签二', type: 'gray' },
          { name: '标签三', type: 'primary' },
          { name: '标签四', type: 'success' },
          { name: '标签五', type: 'warning' },
          { name: '标签六', type: 'danger' }
        ]
      };
    }
  }
</script>
```

## 带链接标签

默认的标签只是展示作用。可以使用 `<a>` 标签来为 `tag` 里的文字设置跳转链接。

<template>
  <code-box
    title="带链接标签"
    description="tag 文字部分">
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      :type="tag.type"
    >
      <a>{{tag.name}}</a>
    </el-tag>
  </code-box>
</template>


```html
<el-tag
  v-for="tag in tags"
  :key="tag.name"
  :closable="true"
  :type="tag.type"
>
{{tag.name}}
</el-tag>

<script>
  export default {
    data() {
      return {
        tags: [
          { name: '标签一', type: '' },
          { name: '标签二', type: 'gray' },
          { name: '标签三', type: 'primary' },
          { name: '标签四', type: 'success' },
          { name: '标签五', type: 'warning' },
          { name: '标签六', type: 'danger' }
        ]
      };
    }
  }
</script>
```

## 自定义颜色

<template>
  <code-box
    title="自定义颜色"
    description="标签的颜色除了指定的几种类型外，也可以通过 color 属性来设置相应的背景颜色">
    <el-tag
      v-for="tag in tagWithColor"
      :key="tag.name"
      :closable="true"
      :color="tag.color"
    >
    {{tag.name}}
    </el-tag>
  </code-box>
</template>

```html
<el-tag
  v-for="tag in tagWithColor"
  :key="tag.name"
  :color="tag.color"
>
  {{tag.name}}
</el-tag>

<script>
export default {
  data(){
    tagWithColor: [
      {name: '色值名', color: 'LimeGreen'},
      {name: '十六进制', color: '#ff952c'},
      {name: 'RGB', color: 'rgb(250,50,57)'},
    ]
  }
}
</script>
```

## 动态编辑标签

可移除标签的移除事件，需要开发自己实现。动态编辑的按钮需要独立实现。

<template>
  <code-box
    title="动态编辑标签"
    description="动态编辑标签可以通过点击标签关闭按钮后触发的 `close` 事件来实现">
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag.name"
      :closable="true"
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
    {{tag}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" @click="showInput"><i class="h-icon-add"></i> New Tag</el-button>
  </code-box>
</template>



```html
<el-tag
  v-for="tag in dynamicTags"
  :key="tag.name"
  :closable="true"
  :disable-transitions="false"
  @close="handleClose(tag)"
>
{{tag}}
</el-tag>
<el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

<script>
  export default {
    data() {
      return {
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
      };
    },
    methods: {
      handleClose(tag) {
        console.log(tag);
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>
```

## 选择尺寸

可以对标签设置三种类型的尺寸来应用不同的场景。目前提供 `large/medium/small` 三种尺寸供选择。默认状态为 `medium`。

<template>
  <code-box
    title="标签尺寸"
    description="可以通过使用 size 属性来更改标签的大小">
    <el-tag
      :key="tag.name"
      v-for="tag in tagWithSize"
      :disable-transitions="false"
      :size="tag.size"
    >
    {{tag.name}}
    </el-tag>
  </code-box>
</template>

```html
<el-tag
  :key="tag.name"
  v-for="tag in tagWithSize"
  :disable-transitions="false"
  :size="tag.size"
>
  {{tag.name}}
</el-tag>

<script>
export default {
  data() {
    return {
      tagWithSize: [
        { name: '大型标签', size: 'large' },
        { name: '默认标签', size: '' },
        { name: '小型标签', size: 'small' }
      ]
    };
  }
}
</script>
```

## maxWidth 溢出省略

支持对标签设置溢出操作。标签大小不再随内部方案而无限制增加。
最大宽度的值，一般使用具体的尺寸值，包含单位。标签中，尺寸的大小，不包含删除按钮的大小，只包含显示的文字区域宽度。默认情况下，设置为 `200px`

<template>
  <code-box
    title="溢出省略"
    description="通过设置 `maxWidth` 属性，设置标签的最大宽度。超出部分直接使用省略号代替。并开放 `title` 参数，可以设置提示语。">
    <el-tag
      v-for="tag in tagWithMaxSize"
      :closable="tag.closable"
      :key="tag.name"
      :title="tag.title"
      :maxWidth="tag.maxWidth"
    >
    {{tag.name}}
    </el-tag>
  </code-box>
</template>

```html
<el-tag
  v-for="tag in tagWithMaxSize"
  :key="tag.name"
  :title="tag.title"
  :maxWidth="tag.maxWidth"
>
{{tag.name}}
</el-tag>

<script>
export default {
  data() {
    return {
      tagWithMaxSize: [
        { name: '带关闭按钮最大宽度90px', maxWidth: '90px', closable: true,title: '带关闭按钮最大宽度90px' },
        { name: '这个是设置了最大宽度90px', maxWidth: '90px',title: '这个是设置了最大宽度90px' },
        { name: '没有超过200px' },
        { name: '中等带title标签中等标签中等标签中等标签',title: '这是一个自带 title 的标签，因为长度超过200px' }
      ]
    };
  }
}
</script>
```

<script>
  export default {
    data() {
      return {
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: '',
        tags: [
          { name: '标签一', type: '' },
          { name: '标签二', type: 'info' },
          { name: '标签三', type: 'primary' },
          { name: '标签四', type: 'success' },
          { name: '标签五', type: 'warning' },
          { name: '标签六', type: 'danger' }
        ],
        tagWithColor: [
          // {name: '红色', color: 'red'},
          {name: '色值名', color: 'LimeGreen'},
          {name: '十六进制', color: '#ff952c'},
          {name: 'RGB', color: 'rgb(250,50,57)'},
        ],
        tagWithSize: [
          { name: '大型标签', size: 'large' },
          { name: '默认标签', size: '' },
          { name: '小型标签', size: 'small' }
        ],
        tagWithMaxSize: [
          { name: '带关闭按钮最大宽度90px', maxWidth: '90px', closable: true,title: '带关闭按钮最大宽度90px' },
          { name: '这个是设置了最大宽度90px', maxWidth: '90px',title: '这个是设置了最大宽度90px' },
          { name: '没有超过200px' },
          { name: '中等带title标签中等标签中等标签中等标签',title: '这是一个自带 title 的标签，因为长度超过200px' }
        ],
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
      };
    },
    methods: {
      handleClose(tag) {
        console.log(tag);
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      handleClose(tag) {
        console.log(tag);
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 24px;
    line-height: 24px;
    padding: 0;
    border-style: dashed; 
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .input-new-tag .el-input__inner {
    height: 24px;
    line-height: 24px;
  }
</style>
### Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 主题 | string | primary/gray/success/warning/danger | — |
| closable | 是否可关闭 | boolean | — | false |
| disable-transitions <Badge text="非兼容" type="warning"/>| 是否禁用渐变动画，即在 1.0 中的 `close-transition` 属性 | boolean | — | false |
| hit | 是否有边框描边 | boolean | — | false |
| color | 背景色 | string | — | — |
| size <Badge text="2.0"/> | tag 标签的尺寸 | String | medium/small/mini | medium |
| maxWidth | 最大宽度。该大小为内容显示，不包含关闭标签的部分 | string | — | '200px' |
| title | 提示语 | string | — | — |


### Events

| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭tag时触发的事件 | — |
