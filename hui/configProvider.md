# Config Provider 全局配置 【实验性功能】

Config Provider 被用来提供全局的配置选项，让你的配置能够在全局都能够被访问到。

主要解决全局 z-index 的问题，相关讨论 [#1331](http://iris.hikvision.com.cn/hui-vue/hui-vue/-/issues/1331)

> 参考 element-plus 和 ant-design-vue 的实现，暂时是一个实验性的功能

> 支持版本 hui 2.42.0+

## 引入 el-config-provider 标签

<template>
  <code-box title="标签用例" description="可以在需要的容器外层加一个 el-config-provider">
    <el-button @click="dialogVisible = true">控制 dialog 的 z-index</el-button>
    <el-config-provider :zIndex="1000">
      <el-dialog title="提示" :visible.sync="dialogVisible" :area="[480, 240]">
        <div>
          可以看到这个弹框的 z-index 是 1000 开始的，而 hui 默认的是 2000 开始的
        </div>
      </el-dialog>
    </el-config-provider>
  </code-box>
</template>


```vue
<template>
  <div>
    <el-button @click="dialogVisible = true">控制dialog的z-index</el-button>
    <el-config-provider :zIndex="1000">
      <el-dialog title="提示" :visible.sync="dialogVisible" :area="[480, 240]">
        <div>
          可以看到这个弹框的 z-index 是 1000 开始的，而 hui 默认的是 2000 开始的
        </div>
      </el-dialog>
    </el-config-provider>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
    };
  }
}
</script>
```

## 其他引入方式

可以在外层包一个组件，然后通过 provide 的方式传递配置


<template>
  <code-box title="标签用例" description="可以在需要的容器外层加一个 el-config-provider">
    <el-button @click="dialogVisible2 = true">控制 dialog 的 z-index</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible2" :area="[480, 240]">
      <div>
        可以看到这个弹框的 z-index 是 3000 开始的
      </div>
    </el-dialog>
  </code-box>
</template>

```vue
<template>
  <code-box title="标签用例" description="可以在需要的容器外层加一个 el-config-provider">
    <el-button @click="dialogVisible2 = true">控制dialog的z-index</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible2" :area="[480, 240]">
      <div>
        可以看到这个弹框的 z-index 是 3000 开始的
      </div>
    </el-dialog>
  </code-box>
</template>
<script>
export default {
  props: {
    zIndex: {
      type: Number,
      default: 3000
    }
  },
  provide() {
    return {
      configProvider: this
    };
  },
}
</script>
```

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false
    };
  },
  props: {
    zIndex: {
      type: Number,
      default: 3000
    }
  },
  provide() {
    return {
      configProvider: this
    };
  },
}
</script>
