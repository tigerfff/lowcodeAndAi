# PageGroup 分组

## 基础用法
<template>
  <code-box browser title="基础用法" description="对内容进行分组展示">
    <h-page-container>
      <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
      <h-page-content flex align-center>
        <el-form
          :model="form"
          label-position="top"
          style="width: 480px; margin-top: 24px;"
          content-width="480px"
        >
          <h-page-group title="Group Title">
            <el-form-item
              v-for="i in 2"
              :key="`form_${i}`"
              label="Title"
              required-right
            >
              <el-input v-model="form.title" placeholder="Information" />
            </el-form-item>
          </h-page-group>
          <h-page-group title="Group Title">
            <el-form-item label="Title" required-right>
              <el-input v-model="form.title" placeholder="Information" />
            </el-form-item>
          </h-page-group>
        </el-form>
      </h-page-content>
    </h-page-container>
  </code-box>
</template>

```html
<h-page-container>
  <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
  <h-page-content flex align-center>
    <el-form
      :model="form"
      label-position="top"
      style="width: 480px; margin-top: 24px;"
      content-width="480px"
    >
      <h-page-group title="Group Title">
        <el-form-item
          v-for="i in 2"
          :key="`form_${i}`"
          label="Title"
          required-right
        >
          <el-input v-model="form.title" placeholder="Information" />
        </el-form-item>
      </h-page-group>
      <h-page-group title="Group Title">
        <el-form-item label="Title" required-right>
          <el-input v-model="form.title" placeholder="Information" />
        </el-form-item>
      </h-page-group>
    </el-form>
  </h-page-content>
</h-page-container>

<script>
  export default {
    data() {
      return {
        breadcrumb: ['Title', 'Title', 'Title', 'Title'],
        form: {
          title: ''
        }
      }
    }
  }
</script>
```

## 操作按钮
<template>
  <code-box browser title="操作按钮" description="通过插槽 `headerAction` 可以插入操作按钮">
    <h-page-container>
      <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
      <h-page-content flex align-center>
        <el-form
          :model="form"
          label-position="top"
          style="width: 480px; margin-top: 24px;"
          content-width="480px"
        >
          <h-page-group title="Group Title">
            <template slot="headerAction">
              <i class="h-icon-setting" />
            </template>
            <el-form-item
              v-for="i in 2"
              :key="`form_${i}`"
              label="Title"
              required-right
            >
              <el-input v-model="form.title" placeholder="Information" />
            </el-form-item>
          </h-page-group>
          <h-page-group title="Group Title">
            <template slot="headerAction">
              <i class="h-icon-alarm" />
            </template>
            <el-form-item label="Title" required-right>
              <el-input v-model="form.title" placeholder="Information" />
            </el-form-item>
          </h-page-group>
        </el-form>
      </h-page-content>
    </h-page-container>
  </code-box>
</template>

```html
<h-page-container>
  <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
  <h-page-content flex align-center>
    <el-form
      :model="form"
      label-position="top"
      style="width: 480px; margin-top: 24px;"
      content-width="480px"
    >
      <h-page-group title="Group Title">
        <template slot="headerAction">
          <i class="h-icon-setting" />
        </template>
        <el-form-item
          v-for="i in 2"
          :key="`form_${i}`"
          label="Title"
          required-right
        >
          <el-input v-model="form.title" placeholder="Information" />
        </el-form-item>
      </h-page-group>
      <h-page-group title="Group Title">
        <template slot="headerAction">
          <i class="h-icon-alarm" />
        </template>
        <el-form-item label="Title" required-right>
          <el-input v-model="form.title" placeholder="Information" />
        </el-form-item>
      </h-page-group>
    </el-form>
  </h-page-content>
</h-page-container>

<script>
  export default {
    data() {
      return {
        breadcrumb: ['Title', 'Title', 'Title', 'Title'],
        form: {
          title: ''
        }
      }
    }
  }
</script>
```

## 可伸缩
<template>
  <code-box browser title="可伸缩" description="设置属性 `collapsable` 让分组可以进行伸缩。">
    <h-page-container>
      <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
      <h-page-content flex align-center>
        <el-form
          :model="form"
          label-position="top"
          style="width: 480px; margin-top: 24px;"
          content-width="480px"
        >
          <h-page-group title="Group Title" collapsable>
            <el-form-item
              v-for="i in 2"
              :key="`form_${i}`"
              label="Title"
              required-right
            >
              <el-input v-model="form.title" placeholder="Information" />
            </el-form-item>
          </h-page-group>
          <h-page-group title="Group Title" collapsable :expanded="false">
            <el-form-item label="Title" required-right>
              <el-input v-model="form.title" placeholder="Information" />
            </el-form-item>
          </h-page-group>
        </el-form>
      </h-page-content>
    </h-page-container>
  </code-box>
</template>

```html
<h-page-container>
  <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
  <h-page-content flex align-center>
    <el-form
      :model="form"
      label-position="top"
      style="width: 480px; margin-top: 24px;"
      content-width="480px"
    >
      <h-page-group title="Group Title" collapsable>
        <el-form-item
          v-for="i in 2"
          :key="`form_${i}`"
          label="Title"
          required-right
        >
          <el-input v-model="form.title" placeholder="Information" />
        </el-form-item>
      </h-page-group>
      <h-page-group title="Group Title" collapsable :expanded="false">
        <el-form-item label="Title" required-right>
          <el-input v-model="form.title" placeholder="Information" />
        </el-form-item>
      </h-page-group>
    </el-form>
  </h-page-content>
</h-page-container>

<script>
  export default {
    data() {
      return {
        breadcrumb: ['Title', 'Title', 'Title', 'Title'],
        form: {
          title: ''
        }
      }
    }
  }
</script>
```

<script>
  export default {
    data() {
      return {
        breadcrumb: ['Title', 'Title', 'Title', 'Title'],
        form: {
          title: ''
        }
      }
    }
  }
</script>

## API

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| collapsable | 分组是否可伸缩 | Boolean | - | false |
| expanded | 分组可伸缩时，是否为展开状态 | Boolean | - | true |
| title | 分组标题 | String | - | - |

### Events
| 事件 | 说明 | 回调参数 |
|------|------|------|
| open | 分组展开的回调 | - |
| close | 分组收起的回调 | - |

### Slot
| name | 说明 |
|------|------|
| headerAction | 标题右侧操作按钮插槽 |
