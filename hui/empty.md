# Empty 缺省

## 安装

```bash
$ npm i @hui-pro/empty -D
# 或者
$ yarn add @hui-pro/empty --dev
```

## 引入

```js
import Empty from '@hui-pro/empty';
import '@hui-pro/empty/theme/index.scss';
Vue.use(Empty);
```

## 基础用法

<template>
  <code-box title="基础用法">
    <div class='demo-wrapper'>
      <h-empty size='fit' />
    </div>
  </code-box>
</template>

```html
<h-empty />
```

## 内置类型

<template>
  <code-box title="内置类型" description='`h-empty- + 文本` 即组件名,例:h-empty-error'>
    <p>请求失败：</p>
    <el-row :gutter="20">
      <el-col :span="4">
        <h-empty-error />
        <p class='demo-text'>error</p>
      </el-col>
      <el-col :span="4">
        <h-empty-error-control />
        <p class='demo-text'>error-control</p>
      </el-col>
      <el-col :span="4">
        <h-empty-error-net />
        <p class='demo-text'>error-net</p>
      </el-col>
      <el-col :span="4">
        <h-empty-error-server />
        <p class='demo-text'>error-server</p>
      </el-col>
      <el-col :span="4">
        <h-empty-error-video />
        <p class='demo-text'>error-video</p>
      </el-col>
      <el-col :span="4">
        <h-empty-error-image />
        <p class='demo-text'>error-image</p>
      </el-col>
    </el-row>
    <p>无数据：</p>
    <el-row :gutter="20">
      <el-col :span="4">
        <h-empty-no-data />
        <p class='demo-text'>no-data</p>
      </el-col>
      <el-col :span="4">
        <h-empty-no-data-map />
        <p class='demo-text'>no-data-map</p>
      </el-col>
      <el-col :span="4">
        <h-empty-no-result />
        <p class='demo-text'>no-result</p>
      </el-col>
      <el-col :span="4">
        <h-empty-no-result-car />
        <p class='demo-text'>no-result-car</p>
      </el-col>
      <el-col :span="4">
        <h-empty-no-result-video />
        <p class='demo-text'>no-result-video</p>
      </el-col>
    </el-row>
    <p>默认显示：</p>
    <el-row :gutter="20">
      <el-col :span="4">
        <h-empty-default-image />
        <p class='demo-text'>default-image</p>
      </el-col>
      <el-col :span="4">
        <h-empty-default-image-2 />
        <p class='demo-text'>default-image-2</p>
      </el-col>
      <el-col :span="4">
        <h-empty-default-map />
        <p class='demo-text'>default-map</p>
      </el-col>
      <el-col :span="4">
        <h-empty-default-video />
        <p class='demo-text'>default-video</p>
      </el-col>
    </el-row>
    <p>其他：</p>
    <el-row :gutter="20">
      <el-col :span="4">
        <h-empty-invalid />
        <p class='demo-text'>invalid</p>
      </el-col>
      <el-col :span="4">
        <h-empty-update />
        <p class='demo-text'>update</p>
      </el-col>
    </el-row>
  </code-box>
</template>

```html
<h-empty>
  <template #img>
    <h-empty-error-net />
  </template>
</h-empty>
```

::: tip

关于 SVG 一些使用问题 [传送门](http://uplus.hikvision.com.cn/#community/article?id=c8ea31e5-5e24-4ef6-b09f-bd56d0cefb02)

:::

## 尺寸

<template>
  <code-box title="尺寸展示">
    <div class="custom-item" v-for="i in 6">
      <span class="tag">{{{ 1:'xs', 2:'sm', 3:'md', 4:'lg', 5:'md', 6:'lg' }[i]}}</span>
      <h-empty
        :size="{
          1:'xs',
          2:'sm',
          3:'md',
          4:'lg',
          5:'md',
          6:'lg'
        }[i]"
      >
        <template #img>
          <h-empty-invalid />
        </template>
        <template v-if="i > 4" #title>
          自定义标题
        </template>
        <template #description>
          自定义描述
        </template>
      </h-empty>
    </div>
  </code-box>
</template>

```html
<div class="custom-item" v-for="i in 6">
  <span>{{{ 1:'xs', 2:'sm', 3:'md', 4:'lg', 5:'md', 6:'lg' }[i]}}</span>
  <h-empty
    :size="{
      1:'xs',
      2:'sm',
      3:'md',
      4:'lg',
      5:'md',
      6:'lg'
    }[i]"
  >
    <template #img>
      <h-empty-invalid />
    </template>
    <template v-if="i > 4" #title>自定义标题</template>
    <template #description>自定义描述</template>
  </h-empty>
</div>
```

## 自定义内容

<template>
  <code-box title="自定义内容">
    <el-row :gutter="16">
      <el-col class="demo-custom-wrapper" :span="12">
        <h-empty>
          <h-empty-upload />
        </h-empty>
      </el-col>
      <el-col class="demo-custom-wrapper" :span="12">
        <h-empty
          img="/hui-pro/images/error403.png"
          title="自定义标题"
          description="自定义描述"
        />
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col class="demo-custom-wrapper" :span="12">
        <h-empty>
          <template #img>
            <h-empty-upload />
          </template>
          <template #title>
            自定义标题
          </template>
          <template #description>
            还没有监控点，去
            <el-button type="text" @click="handleClick">
              添加
            </el-button>
          </template>
        </h-empty>
      </el-col>
      <el-col class="demo-custom-wrapper" :span="12">
        <h-empty>
          <template #img>
            <img src="/hui-pro/images/error403.png" alt="403">
          </template>
          <template #title>
            自定义标题
          </template>
        </h-empty>
      </el-col>
    </el-row>
  </code-box>
</template>

```html
<el-row :gutter="16">
  <el-col class="demo-custom-wrapper" :span="12">
    <h-empty>
      <h-empty-upload />
    </h-empty>
  </el-col>
  <el-col class="demo-custom-wrapper" :span="12">
    <h-empty
      img="/hui-pro/images/error403.png"
      title="自定义标题"
      description="自定义描述"
    />
  </el-col>
</el-row>
<el-row :gutter="16">
  <el-col class="demo-custom-wrapper" :span="12">
    <h-empty>
      <template #img>
        <h-empty-upload />
      </template>
      <template #title>自定义标题</template>
      <template #description>
        还没有监控点，去
        <el-button type="text" @click="handleClick">添加</el-button>
      </template>
    </h-empty>
  </el-col>
  <el-col class="demo-custom-wrapper" :span="12">
    <h-empty>
      <template #img>
        <img src="/hui-pro/images/error403.png" alt="403" />
      </template>
      <template #title>自定义标题</template>
    </h-empty>
  </el-col>
</el-row>
```

:::tip

自定义优先级：slot default > slot > attributes

:::

<style lang='scss' scoped>
.demo-empty {
  .demo-wrapper{
    height: 400px;
  }
  .demo-custom-wrapper{
    height: 200px;
  }
  .demo-text {
    margin: 4px 0;
    text-align: center;
  }
  .el-button--large {
    font-size: 16px;
  }
  .custom-item {
    position: relative;
    width: 50%;
    height: 400px;
    padding: 16px;
    border-radius: 2px;
    float: left;
    .h-empty {
      border: 1px solid rgba(0,0,0,0.04);
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
    }
    .tag {
      position: absolute;
      right: 32px;
      bottom: 32px;
      font-size: 16px;
    }
  }
}
</style>

<script>
  const versions = require('docs/.vuepress/src/version.json');
  import HEmptyUpload from '../../../.vuepress/public/svgs/default_upload.svg?svg';
  export default {
    components: {
      HEmptyUpload
    },
    data() {
      return {
        versions
      }
    },
    methods:{
      handleClick(){
        this.$message.success('添加成功')
      }
    }
  }
</script>

## API

### Attributes

| 参数        | 说明                                                             | 类型        | 可选值                                                                               | 默认值 |
| ----------- | ---------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------ | ------ |
| size        | 缺省尺寸，[fit 为自适应](#fit-模式适配规则)，custom 为自定义尺寸 | Fix：String | 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'fit', 'custom' <Badge text="1.13.1+" /> | 'md'   |
| img         | 缺省图 url                                                       | String      | -                                                                                    | -      |
| title       | 标题文案                                                         | String      | -                                                                                    | -      |
| description | 描述文案                                                         | String      | -                                                                                    | -      |
| media       | 自定义自适应                                                     | String      | -                                                                                    | -      |

### Slot

| 参数        | 说明     | 类型 | 可选值 | 默认值     |
| ----------- | -------- | ---- | ------ | ---------- |
| img         | 占位图   | Slot | -      | 'no-data'  |
| title       | 标题文案 | Slot | -      | -          |
| description | 描述文案 | Slot | -      | '暂无数据' |

### 尺寸说明

| 参数 | 说明           |
| ---- | -------------- |
| T    | 仅文本         |
| XS   | 56px \* 56px   |
| SM   | 72px \* 72px   |
| MD   | 104px \* 104px |
| LG   | 160px \* 160px |

### 细节

| 参数        | Title/Font-size | Description/Font-size | Title/Margin-top | Description/Margin-top |
| ----------- | --------------- | --------------------- | ---------------- | ---------------------- |
| MD          | -               | 16 px                 | -                | 16 px                  |
| MD（Title） | 16 px           | 14 px                 | 16 px            | 4 px                   |
| LG          | -               | 16 px                 | -                | 16 px                  |
| LG（Title） | 18 px           | 16 px                 | 16 px            | 8 px                   |

### `fit` 模式适配规则

| 宽（纵）\ 高（横） | 180 | 240 | 400 | 554 | 1044+ |
| ------------------ | --- | --- | --- | --- | ----- |
| 180                | T   | T   | T   | T   | T     |
| 240                | T   | XS  | XS  | XS  | XS    |
| 256                | T   | XS  | SM  | SM  | SM    |
| 1080               | T   | XS  | MD  | MD  | MD    |
| 1920+              | T   | XS  | MD  | LG  | LG    |
