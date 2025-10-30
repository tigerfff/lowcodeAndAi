# Steps 步骤条

引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。

## 基础用法

<template>
    <code-box title="简单的步骤条。" description="设置`active`属性，接受一个`Number`，表明步骤的 index，从 0 开始。
    需要定宽的步骤条时，设置`space`属性即可，它接受`Number`，单位为`px`，如果不设置，则为自适应。
    设置`finish-status`属性可以改变已经完成的步骤的状态。`right-title`可以选择文字显示位置
    设置`disorder`属性可以选择无序状态" >
    <el-row>
      <el-col :span="100">
        <el-steps :active="active" finish-status="success">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
        </el-steps>
      </el-col>
      <el-col :span="100" style="margin-top: 12px;">
        <el-steps :space="140" :active="active" finish-status="success" :disorder="true">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-button class="demo1" style="margin-top: 12px;margin-left: 5px;" @click="next">下一步</el-button>
    </code-box>
</template>

```vue
<el-row>
  <el-col :span="100">
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
    </el-col>
    <el-col :span="100" style="margin-top: 12px;">
      <el-steps :space="140" :active="active" finish-status="success" :disorder="true">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
    </el-col>
  </el-row>
<el-button
  class="demo1"
  style="margin-top: 12px;"
  @click="next"
>下一步</el-button>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },

  methods: {
    next() {
      if (this.active++ > 1) this.active = 0;
    }
  }
};
</script>
```

## 可点击的步骤条

<template>
    <code-box title="可点击的步骤条。" description="通过事件step-click接收当前所点击步骤索引，调用者可根据业务需要判定当前索引的step是否需要跳转过去。demo中即把索引2（步骤3）给禁止跳转了，可由业务具体使用。" >
    <el-row>
      <el-col :span="100">
        <el-steps :space="300" :active="active8" finish-status="success" @step-click="hdClick">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-button class="demo1" style="margin-top: 12px;margin-left: 5px;" @click="next8">下一步</el-button>
    </code-box>
</template>

```vue
<el-row>
  <el-col :span="100">
    <el-steps :space="300" :active="active" finish-status="success"  @step-click="hdClick">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
    </el-col>
  </el-row>
<el-button
  class="demo1"
  style="margin-top: 12px;"
  @click="next"
>下一步</el-button>

<script>
export default {
  data() {
    return {
      active8: 0
    };
  },

  methods: {
    hdClick(index) {
      if (index === 2) {
        return;
      }
      this.active8 = index;
    },
    next() {
      if (this.active8++ > 1) this.active8 = 0;
    }
  }
};
</script>
```

## 带图标的步骤条

<template>
    <code-box title="步骤条内可以启用各种自定义的图标。" description="通过`icon`属性来设置图标，图标的类型可以参考 Icon 组件的文档，除此以外，还能通过具名`slot`来使用自定义的图标。">
    <el-steps :space="300" :active="active4" finish-status="finish">
      <el-step title="步骤 1" icon="edit"></el-step>
      <el-step title="步骤 2" icon="upload"></el-step>
      <el-step title="步骤 3" icon="picture"></el-step>
    </el-steps>
    <el-button class="demo4" style="margin-top: 12px;" @click="next4">下一步</el-button>
    </code-box>
</template>

```vue
<el-steps :space="300" :active="active4" finish-status="finish">
  <el-step title="步骤 1" icon="edit"></el-step>
  <el-step title="步骤 2" icon="upload"></el-step>
  <el-step title="步骤 3" icon="picture"></el-step>
</el-steps>
<el-button
  class="demo4"
  style="margin-top: 12px;"
  @click="next4"
>下一步</el-button>

<script>
export default {
  data() {
    return {
      active4: 0
    };
  },

  methods: {
    next4() {
      if (this.active4++ > 1) this.active4 = 0;
    }
  }
};
</script>
```

## 竖式步骤条

<template>
    <code-box title="竖直方向的步骤条。" description="只需要在`el-steps`元素中设置`direction`属性为`vertical`即可。space如果不设置则默认是根据内容高度自动伸缩">
    <el-row>
      <el-col :span="12">
        <el-steps :space="150" direction="vertical" :active="active5">
          <el-step title="步骤 1" description="填写基本信息"></el-step>
          <el-step title="步骤 2" description="填写基本信息"></el-step>
          <el-step title="步骤 3" description="填写基本信息"></el-step>
        </el-steps>
      </el-col>
      <el-col :span="12">
        <el-steps direction="vertical" :active="active5" :disorder="true">
          <el-step title="步骤 1" description="填写基本信息"></el-step>
          <el-step title="步骤 2" description="填写基本信息"></el-step>
          <el-step title="步骤 3" description="填写基本信息"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-button class="demo5" style="margin-top: 12px;" @click="next5">下一步</el-button>
    </code-box>
</template>

```vue
<el-row>
  <el-col :span="12">
    <el-steps :space="150" direction="vertical" :active="active5">
      <el-step title="步骤 1" description="填写基本信息"></el-step>
      <el-step title="步骤 2" description="填写基本信息"></el-step>
      <el-step title="步骤 3" description="填写基本信息"></el-step>
    </el-steps>
  </el-col>
  <el-col :span="12">
    <el-steps direction="vertical" :active="active5" :disorder="true">
      <el-step title="步骤 1" description="填写基本信息"></el-step>
      <el-step title="步骤 2" description="填写基本信息"></el-step>
      <el-step title="步骤 3" description="填写基本信息"></el-step>
    </el-steps>
  </el-col>
</el-row>
<el-button class="demo5" style="margin-top: 12px;" @click="next5">下一步</el-button>

<script>
export default {
  data() {
    return {
      active5: 0
    };
  },

  methods: {
    next5() {
      if (this.active5++ > 1) this.active5 = 0;
    }
  }
};
</script>
```

## API

### Steps Attributes

| 参数                                        | 说明                                               | 类型          | 可选值                            | 默认值     |
| ------------------------------------------- | -------------------------------------------------- | ------------- | --------------------------------- | ---------- |
| space                                       | 每个 step 的间距，不填写将自适应间距。支持百分比。 | Number,String | —                                 | —          |
| direction                                   | 显示方向                                           | string        | vertical/horizontal               | horizontal |
| active                                      | 设置当前激活步骤                                   | number        | —                                 | 0          |
| process-status                              | 设置当前步骤的状态                                 | string        | wait/process/finish/error/success | process    |
| finish-status                               | 设置结束步骤的状态                                 | string        | wait/process/finish/error/success | finish     |
| align-center<Badge text="待移除" type="warning"/>                                | 标题描述居中对齐                                   | boolean       | -                                 | true       |
| right-title                                 | title 在右边显示                                   | boolean       | -                                 | false      |
| ~~size~~<Badge text="移除" type="warning"/> | 尺寸                                               | string        | small/mini                        |            |
| line                                        | 是否有进度线                                       | boolean       | -                                 | true       |
| disorder <Badge text="2.0+"/>               | 无序状态                                           | boolean       | -                                 | false      |

### Steps Event

| 事件名称   | 说明               | 回调参数           |
| ---------- | ------------------ | ------------------ |
| step-click | 步骤的点击事件响应 | 返回当前步骤索引值 |

### Step Attributes

| 参数        | 说明                                            | 类型                                                                | 可选值 | 默认值 |
| ----------- | ----------------------------------------------- | ------------------------------------------------------------------- | ------ | ------ |
| title       | 标题                                            | string                                                              | —      | —      |
| description | 描述性文字                                      | string                                                              | —      | —      |
| icon        | 图标                                            | Element Icon 提供的图标，如果要使用自定义图标可以通过 slot 方式写入 | string | —      |
| status      | 设置当前步骤的状态，不设置则根据 steps 确定状态 | wait/process/finish/error/success                                   | -      |        |

### Step Slot

| name        | 说明       |
| ----------- | ---------- |
| icon        | 图标       |
| title       | 标题       |
| description | 描述性文字 |

<script>
  export default {
    data() {
      return {
        active: 0,
        active2: 0,
        active3: 0,
        active4: 0,
        active5: 0,
        active6: 0,
        active7: 0,
        active8:0
      };
    },

    methods: {
      hdClick(index) {
        if(index === 2) {
          return 
        }
        this.active8 = index
      },
      next() {
        if (this.active++ > 1) this.active = 0;
      },
      next2() {
        if (this.active2++ > 1) this.active2 = 0;
      },
      next3() {
        if (this.active3++ > 1) this.active3 = 0;
      },
      next4() {
        if (this.active4++ > 1) this.active4 = 0;
      },
      next5() {
        if (this.active5++ > 1) this.active5 = 0;
      },
      next6() {
        if (this.active6++ > 1) this.active6 = 0;
      },
      next7() {
        if (this.active7++ > 1) this.active7 = 0;
      },
      next8() {
        if (this.active8++ > 1) this.active8 = 0;
      }
    }
  }
</script>
