# PageDetail 详情页

## 多列
<template>
  <code-box browser title="多列" description="根据断点对详情项进行多列展示">
    <h-page-container>
      <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
      <h-page-content flex align-center>
        <h-page-group title="Group Title" style="margin-top: 24px;">
          <h-page-detail style="padding: 0;">
            <h-page-detail-item label="Title">Details具体信息</h-page-detail-item>
            <h-page-detail-item label="Title">
              Details具体信息Details具体信息Details具体信息Details具体信息Details具体信息Details具体信息
            </h-page-detail-item>
            <h-page-detail-item label="Title">Details具体信息</h-page-detail-item>
            <h-page-detail-item label="Description" double-col>
              描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息
            </h-page-detail-item>
          </h-page-detail>
        </h-page-group>
      </h-page-content>
    </h-page-container>
  </code-box>
</template>

```html
<h-page-container>
  <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
  <h-page-content flex align-center>
    <h-page-group title="Group Title" style="margin-top: 24px;">
      <h-page-detail style="padding: 0;">
        <h-page-detail-item label="Title">Details具体信息</h-page-detail-item>
        <h-page-detail-item label="Title">
          Details具体信息Details具体信息Details具体信息Details具体信息Details具体信息Details具体信息
        </h-page-detail-item>
        <h-page-detail-item label="Title">Details具体信息</h-page-detail-item>
        <h-page-detail-item label="Description" double-col>
          描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息
        </h-page-detail-item>
      </h-page-detail>
    </h-page-group>
  </h-page-content>
</h-page-container>

<script>
  export default {
    data() {
      return {
        breadcrumb: ['Title', 'Title', 'Title', 'Title']
      }
    }
  }
</script>
```

## 单列
<template>
  <code-box browser title="单列" description="详情项以单列的形式展示">
    <h-page-container>
      <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
      <h-page-content flex align-center>
        <h-page-group title="Group Title" style="margin-top: 24px;">
          <h-page-detail single>
            <h-page-detail-item label="Title">Details具体信息</h-page-detail-item>
            <h-page-detail-item label="Title">
              Details具体信息Details具体信息Details具体信息Details具体信息Details具体信息Details具体信息
            </h-page-detail-item>
            <h-page-detail-item label="Title">Details具体信息</h-page-detail-item>
            <h-page-detail-item label="Description" double-col>
              描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息
            </h-page-detail-item>
          </h-page-detail>
        </h-page-group>
      </h-page-content>
    </h-page-container>
  </code-box>
</template>

```html
<h-page-container>
  <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
  <h-page-content flex align-center>
    <h-page-group title="Group Title" style="margin-top: 24px;">
      <h-page-detail single>
        <h-page-detail-item label="Title">Details具体信息</h-page-detail-item>
        <h-page-detail-item label="Title">
          Details具体信息Details具体信息Details具体信息Details具体信息Details具体信息Details具体信息
        </h-page-detail-item>
        <h-page-detail-item label="Title">Details具体信息</h-page-detail-item>
        <h-page-detail-item label="Description" double-col>
          描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息
        </h-page-detail-item>
      </h-page-detail>
    </h-page-group>
  </h-page-content>
</h-page-container>

<script>
  export default {
    data() {
      return {
        breadcrumb: ['Title', 'Title', 'Title', 'Title']
      }
    }
  }
</script>
```

## 自定义标签
<template>
  <code-box browser title="自定义标签" description="通过插槽 `label` 可以自定义整个标签，通过插槽 `labelAction` 可以传入图标。">
    <h-page-container>
      <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
      <h-page-content flex align-center>
        <h-page-group title="Group Title" style="margin-top: 24px;">
          <h-page-detail single style="padding: 0;">
            <h-page-detail-item label="定制图标">
              <template slot="labelAction">
                <i class="h-icon-info" />
              </template>
              Details具体信息
            </h-page-detail-item>
            <h-page-detail-item>
              <template slot="label">
                <span>定制整个标签</span>
                <i
                  class="h-icon-info"
                  style="padding-left: 12px; font-size: 24px; vertical-align: bottom; color: #4d4d4d;"
                ></i>
              </template>
              Details具体信息
            </h-page-detail-item>
          </h-page-detail>
        </h-page-group>
      </h-page-content>
    </h-page-container>
  </code-box>
</template>

```html
<h-page-container>
  <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
  <h-page-content flex align-center>
    <h-page-group title="Group Title" style="margin-top: 24px;">
      <h-page-detail single style="padding: 0;">
        <h-page-detail-item label="定制图标">
          <template slot="labelAction">
            <i class="h-icon-info" />
          </template>
          Details具体信息
        </h-page-detail-item>
        <h-page-detail-item>
          <template slot="label">
            <span>定制整个标签</span>
            <i
              class="h-icon-info"
              style="padding-left: 12px; font-size: 24px; vertical-align: bottom; color: #4d4d4d;"
            ></i>
          </template>
          Details具体信息
        </h-page-detail-item>
      </h-page-detail>
    </h-page-group>
  </h-page-content>
</h-page-container>

<script>
  export default {
    data() {
      return {
        breadcrumb: ['Title', 'Title', 'Title', 'Title']
      }
    }
  }
</script>
```

<script>
  export default {
    data() {
      return {
        breadcrumb: ['Title', 'Title', 'Title', 'Title']
      }
    }
  }
</script>

<style lang="scss">
.h-page-group {
  padding: 0 28px;
}
</style>

## API

### PageDetail Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| single | 详情项是否单列显示 | Boolean | - | false |
| options | 断点参数 | Object | - | 参考 【PageDetail Options】 |

### PageDetail Options
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| xl | 一行 6 个详情项的断点（默认无法达到，有需求自己设置） | Number | - | 19200 |
| lg | 一行 4 个详情项的断点 | Number | - | 1408 |
| md | 一行 3 个详情项的断点 | Number | - | 944 |
| sm | 一行 2 个详情项的断点 | Number | - | 708 |

### PageDetailItem Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| label | 详情项标签 | String | - | - |
| doubleCol | 是否占据两个单元格 | Boolean | - | false |

### PageDetailItem Slot
| name | 说明 |
|------|------|
| label | 标签项插槽 |
| labelAction | 标签项工具栏插槽 |
