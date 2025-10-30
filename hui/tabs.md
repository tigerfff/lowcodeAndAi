# Tabs 标签页

分隔内容上有关联但属于不同类别的数据集合。

## 基础用法

<template>
  <code-box title="基本用法" description="tabs 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 value 属性来指定当前选中的标签页。">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label-icon="h-icon-search" label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label-icon="h-icon-setting" label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth" :disabled="true">定时任务补偿</el-tab-pane>
    </el-tabs>
  </code-box>
</template>

```html
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label-icon="h-icon-search" label="用户管理" name="first">
      用户管理
    </el-tab-pane>
    <el-tab-pane label-icon="h-icon-setting" label="配置管理" name="second">
      配置管理
    </el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth" :disabled="true">
      定时任务补偿
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
```

## 最大宽度

<template>
  <code-box title="最大宽度" description="tabs 组件提供了最大宽度的功能。这个值默认为 192px，当设置了该属性后，超出的内容将以省略号的形式实现。">
    <el-tabs v-model="activeName4" @tab-click="handleClick">
      <el-tab-pane label="未设置" name="first">未设置</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="设置了最大宽度，超出最大的宽度" :label-max-width="70" name="third">设置了最大宽度，超出最大的宽度</el-tab-pane>
      <el-tab-pane label="未设置最大宽度，但是实际的宽度却很大很大。可是没有用，因为有默认值。" name="fourth">未设置最大宽度，但是实际的宽度却很大很大</el-tab-pane>
    </el-tabs>
  </code-box>
</template>

```html
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="未设置" name="first">未设置</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane
      label="设置了最大宽度，超出最大的宽度"
      :label-max-width="70"
      name="third"
    >
      设置了最大宽度，超出最大的宽度
    </el-tab-pane>
    <el-tab-pane
      label="未设置最大宽度，但是实际的宽度却很大很大。可是没有用，因为有默认值。"
      name="fourth"
    >
      未设置最大宽度，但是实际的宽度却很大很大
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first'
      };
    }
  };
</script>
```

## 固定宽度

<template>
  <code-box title="固定宽度" description="tabs 组件提供了固定宽度的功能。当设置了该属性后，将以固定宽度来展现内容。tabs 的最大宽度将失效。示例中，跟最大宽度 Demo 类似，但标签的宽度已经固定，不会随着内容改变而改变。设置的 label-max-width 也无效。">
    <el-tabs v-model="activeName5" @tab-click="handleClick" :fixWidth="140">
      <el-tab-pane label="未" name="first">未设置最大宽度，但内容不够</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="设置了最大宽度，超出最大的宽度" :label-max-width="70" name="third">设置了最大宽度，超出最大的宽度</el-tab-pane>
      <el-tab-pane label="未设置最大宽度，但是实际的宽度却很大很大。可是没有用，因为有默认值。" name="fourth">未设置最大宽度，但是实际的宽度却很大很大</el-tab-pane>
    </el-tabs>
  </code-box>
</template>

```html
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" :fixWidth="140">
    <el-tab-pane label="未" name="first">
      未设置最大宽度，但内容不够
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane
      label="设置了最大宽度，超出最大的宽度"
      :label-max-width="70"
      name="third"
    >
      设置了最大宽度，超出最大的宽度
    </el-tab-pane>
    <el-tab-pane
      label="未设置最大宽度，但是实际的宽度却很大很大。可是没有用，因为有默认值。"
      name="fourth"
    >
      未设置最大宽度，但是实际的宽度却很大很大
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first'
      };
    }
  };
</script>
```

### 内容过多时可滑动

<template>
  <code-box title="会自动出现滑动按钮" description="内容过多时可滑动">
    <el-tabs v-model="lostactiveName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(v,index) in losttabPanes"
        :label="'标签'+index"
        :name="'tab'+index"
        :key="index">
        标签{{index}}
      </el-tab-pane>
    </el-tabs>
  </code-box>
</template>

```html
<template>
  <el-tabs v-model="lostactiveName" @tab-click="handleClick">
    <el-tab-pane
      v-for="(v,index) in losttabPanes"
      :label="'标签'+index"
      :name="'tab'+index"
      :key="index"
    >
      标签{{index}}
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        lostactiveName: 'tab1',
        losttabPanes: new Array(20)
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
```

### 卡片化

卡片化的标签页。

<template>
  <code-box title="卡片化" description="将`type`设置为`border-card`">
    <el-tabs type="border-card">
      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </code-box>
</template>

```html
<el-tabs type="border-card">
  <el-tab-pane label="用户管理">用户管理</el-tab-pane>
  <el-tab-pane label="配置管理">配置管理</el-tab-pane>
  <el-tab-pane label="角色管理">角色管理</el-tab-pane>
  <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
</el-tabs>
```

### 切换 tab 页前的钩子

<template>
  <code-box title="切换tab页前的钩子" description="切换tab页会触发beforeLeave勾子，发生在切换前">
    <el-tabs type="border-card" :before-leave="beforeLeave" @tab-click="handleClick">
      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </code-box>
</template>

```html
<el-tabs type="border-card" :before-leave="beforeLeave">
  <el-tab-pane label="用户管理">用户管理</el-tab-pane>
  <el-tab-pane label="配置管理">配置管理</el-tab-pane>
  <el-tab-pane label="角色管理">角色管理</el-tab-pane>
  <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
</el-tabs>
<script>
  export default {
    data() {},
    methods: {
      return new Promise((resolve, reject) => {
        this.$confirm(`是否切换到该页面`, { type: 'question' })
          .then(() => {resolve()})
          .catch(err => { reject(err)})
      })
    }
  };
</script>
```

### 自定义标签页

<template>
  <code-box title="自定义标签页" description="可以通过具名 `slot` 来实现自定义标签页的内容">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="h-icon-calendar" style="font-size: 24px;vertical-align: -6px;"></i> 我的行程</span>
        我的行程
      </el-tab-pane>
      <el-tab-pane label="消息中心">消息中心</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </code-box>
</template>

```html
<el-tabs type="border-card">
  <el-tab-pane>
    <span slot="label">
      <i class="h-icon-calendar"></i>
      我的行程
    </span>
    我的行程
  </el-tab-pane>
  <el-tab-pane label="消息中心">消息中心</el-tab-pane>
  <el-tab-pane label="角色管理">角色管理</el-tab-pane>
  <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
</el-tabs>
```

### 动态增减标签页

增减标签页按钮只能在选项卡样式的标签页下使用

<template>
  <code-box title="自定义标签页" description="可以通过具名 `slot` 来实现自定义标签页的内容">
    <el-tabs v-model="editableTabsValue" type="border-card" editable @edit="handleTabsEdit" >
      <el-tab-pane
        :key="item.name"
        v-for="(item, index) in editableTabs"
        :label="item.title"
        :name="item.name"
      >
        {{item.content}}
      </el-tab-pane>
    </el-tabs>
  </code-box>
</template>

```html
<el-tabs
  v-model="editableTabsValue"
  type="border-card"
  editable
  @edit="handleTabsEdit"
>
  <el-tab-pane
    :key="item.name"
    v-for="(item, index) in editableTabs"
    :label="item.title"
    :name="item.name"
  >
    {{item.content}}
  </el-tab-pane>
</el-tabs>

<script>
  export default {
    data() {
      return {
        editableTabsValue: '2',
        editableTabs: [
          {
            title: 'Tab 1',
            name: '1',
            content: 'Tab 1 content'
          },
          {
            title: 'Tab 2',
            name: '2',
            content: 'Tab 2 content'
          }
        ],
        tabIndex: 2
      };
    },
    methods: {
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: '新页签',
            name: newTabName,
            content: '新页签的内容'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }

          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
    }
  };
</script>
```

### 自定义增加标签页触发器

<template>
  <code-box title="自定义增加标签页触发器" description="">
    <div style="margin-bottom: 20px;">
      <el-button
        size="small"
        @click="addTab(editableTabsValue2)"
      >
        add tab
      </el-button>
    </div>
    <el-tabs v-model="editableTabsValue2" type="border-card" closable :before-remove="beforeRemove" @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, index) in editableTabs2"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        {{item.content}}
      </el-tab-pane>
    </el-tabs>
  </code-box>
</template>

```html
<div style="margin-bottom: 20px;">
  <el-button size="small" @click="addTab(editableTabsValue2)">
    add tab
  </el-button>
</div>
<el-tabs
  v-model="editableTabsValue2"
  type="border-card"
  closable
  @tab-remove="removeTab"
>
  <el-tab-pane
    v-for="(item, index) in editableTabs2"
    :key="item.name"
    :label="item.title"
    :name="item.name"
  >
    {{item.content}}
  </el-tab-pane>
</el-tabs>
<script>
  export default {
    data() {
      return {
        editableTabsValue2: '2',
        editableTabs2: [
          {
            title: 'Tab 1',
            name: '1',
            content: 'Tab 1 content'
          },
          {
            title: 'Tab 2',
            name: '2',
            content: 'Tab 2 content'
          }
        ],
        tabIndex: 2
      };
    },
    methods: {
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs2.push({
          title: '新页签',
          name: newTabName,
          content: '新页签的内容'
        });
        this.editableTabsValue2 = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      }
    }
  };
</script>
```

### 增加删除 tab 勾子<Badge text="2.1+"/>

<template>
  <code-box title="增加删除 tab 勾子，可以阻止 tab 被删除" description="当时用tabs动态增减标签的能力时，删除tab标签会先触发beforeRemove勾子，它可以阻断该tab被删除。">
    <div style="margin-bottom: 20px;">
      <el-button
        size="small"
        @click="addTab(editableTabsValue2)"
      >
        add tab
      </el-button>
    </div>
    <el-tabs v-model="editableTabsValue2" type="border-card" closable :before-remove="beforeRemove" @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, index) in editableTabs2"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        {{item.content}}
      </el-tab-pane>
    </el-tabs>
  </code-box>
</template>

```html
<div style="margin-bottom: 20px;">
  <el-button size="small" @click="addTab(editableTabsValue2)">
    add tab
  </el-button>
</div>
<el-tabs
  v-model="editableTabsValue2"
  type="border-card"
  closable
  :before-remove="beforeRemove"
  @tab-remove="removeTab"
>
  <el-tab-pane
    v-for="(item, index) in editableTabs2"
    :key="item.name"
    :label="item.title"
    :name="item.name"
  >
    {{item.content}}
  </el-tab-pane>
</el-tabs>
<script>
  export default {
    data() {
      return {
        editableTabsValue2: '2',
        editableTabs2: [
          {
            title: 'Tab 1',
            name: '1',
            content: 'Tab 1 content'
          },
          {
            title: 'Tab 2',
            name: '2',
            content: 'Tab 2 content'
          }
        ],
        tabIndex: 2
      };
    },
    methods: {
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs2.push({
          title: '新页签',
          name: newTabName,
          content: '新页签的内容'
        });
        this.editableTabsValue2 = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      },
      beforeRemove(name) {
        return new Promise((resolve, reject) => {
          this.$confirm('确定删除吗？', { type: 'question' })
            .then(() => {
              resolve();
            })
            .catch(err => {
              reject(err);
            });
        });
      }
    }
  };
</script>
```

### 位置 <Badge text="2.0+"/>

可以通过 tab-position 设置标签的位置

<template>
  <code-box title="位置" description="标签一共有四个方向的设置 tabPosition='left|right|top|bottom'">
    <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
      <el-radio-button label="top">top</el-radio-button>
      <el-radio-button label="right">right</el-radio-button>
      <el-radio-button label="bottom">bottom</el-radio-button>
      <el-radio-button label="left">left</el-radio-button>
    </el-radio-group>
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="角色管理2">角色管理2</el-tab-pane>
      <el-tab-pane label="角色管理3">角色管理3</el-tab-pane>
      <el-tab-pane label="角色管理4">角色管理4</el-tab-pane>
      <el-tab-pane label="角色管理5">角色管理5</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </code-box>
</template>

```html
<template>
  <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
    <el-radio-button label="top">top</el-radio-button>
    <el-radio-button label="right">right</el-radio-button>
    <el-radio-button label="bottom">bottom</el-radio-button>
    <el-radio-button label="left">left</el-radio-button>
  </el-radio-group>

  <el-tabs :tab-position="tabPosition" style="height: 200px;">
    <el-tab-pane label="用户管理">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        tabPosition: 'top'
      };
    }
  };
</script>
```

## 不同尺寸

<template>
  <code-box title="不同尺寸" description="提供3种尺寸">
    <el-tabs v-model="activeName" size="small">
      <el-tab-pane label="small" name="first">small</el-tab-pane>
      <el-tab-pane label="小号" name="second">小号</el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeName">
      <el-tab-pane label="medium" name="first">medium</el-tab-pane>
      <el-tab-pane label="中等" name="second">中等</el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeName" size="large">
      <el-tab-pane label="large" name="first">large</el-tab-pane>
      <el-tab-pane label="大号" name="second">大号</el-tab-pane>
    </el-tabs>
  </code-box>
</template>

```html
<template>
  <el-tabs v-model="activeName" size="small">
    <el-tab-pane label="small" name="first">small</el-tab-pane>
    <el-tab-pane label="小号" name="second">小号</el-tab-pane>
  </el-tabs>
  <el-tabs v-model="activeName">
    <el-tab-pane label="medium" name="first">medium</el-tab-pane>
    <el-tab-pane label="中等" name="second">中等</el-tab-pane>
  </el-tabs>
  <el-tabs v-model="activeName" size="large">
    <el-tab-pane label="large" name="first">large</el-tab-pane>
    <el-tab-pane label="大号" name="second">大号</el-tab-pane>
  </el-tabs>
</template>
```

## API

### Tabs Attributes

| 参数                                               | 说明                                                                              | 类型                                | 可选值                       | 默认值                                           |
| -------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------- | ------------------------------------------------ |
| type                                               | 风格类型                                                                          | string                              | card/border-card             | —                                                |
| size                                               | 尺寸                                                                              | string                              | small/medium/large           | medium                                           |
| closable                                           | 标签是否可关闭                                                                    | boolean                             | —                            | false                                            |
| addable                                            | 标签是否可增加                                                                    | boolean                             | —                            | false                                            |
| editable                                           | 标签是否同时可增加和关闭                                                          | boolean                             | —                            | false                                            |
| tab-position                                       | 选项卡所在位置                                                                    | string                              | top/right/bottom/right       | top                                              |
| active-name(deprecated)                            | 选中选项卡的 name                                                                 | string                              | —                            | 第一个选项卡的 name                              |
| value                                              | 绑定值，选中选项卡的 name                                                         | string                              | —                            | 第一个选项卡的 name                              |
| ~~orientation~~                                    | 选项卡横向还是纵向排列                                                            | string                              | vertical-left/vertival-right | 默认值空，空则水平方向排列                       |
| ~~before-tab-change~~                              | 切换 tab 页前的钩子，返回 Boolean 或 Promise\<Boolean\>，为 true 表示切换         | Function(tab, tabName, event)       | —                            | () => true                                       |
| before-leave <Badge text="非兼容" type="warning"/> | 切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。       | Function(activeName, oldActiveName) | —                            | () => true                                       |
| before-remove <Badge  text="2.1" type="warning"/>  | 删除标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止删除。       | Function(tabName)                   | —                            | () => true                                       |
| label-max-width                                    | 头部标签最大宽度                                                                  | Number                              | —                            | 无默认值，但头部标签样式控制默认最大宽度为 192px |
| fix-width <Badge text="2.0" type="warning"/>       | tab 的固定宽度。设置后将与内容无关，tab 展现固定的宽度，同时 label-max-width 失效 | Number                              | -                            | 无默认值                                         |

### Tabs Events

| 事件名称   | 说明                                    | 回调参数              |
| ---------- | --------------------------------------- | --------------------- |
| tab-click  | tab 被选中时触发                        | 被选中的标签 tab 实例 |
| tab-remove | 点击 tab 移除按钮后触发                 | 被删除的标签的 name   |
| tab-add    | 点击 tabs 的新增按钮后触发              | —                     |
| edit       | 点击 tabs 的新增按钮或 tab 被关闭后触发 | (targetName, action)  |

### Menu Methods

| 方法名称          | 说明         | 参数 |
| ----------------- | ------------ | ---- |
| scrollToActiveTab | 高亮选中 tab | -    |

### Tab-pane Attributes

| 参数            | 说明                                             | 类型    | 可选值       | 默认值                                                |
| --------------- | ------------------------------------------------ | ------- | ------------ | ----------------------------------------------------- |
| label           | 选项卡标题                                       | string  | —            | —                                                     |
| label-icon      | 选项卡以图标而不是文字标记                       | string  | hui 字体图标 | —                                                     |
| disabled        | 是否禁用                                         | boolean | —            | false                                                 |
| name            | 与选项卡 activeName 对应的标识符，表示选项卡别名 | string  | —            | 该选项卡在选项卡列表中的顺序值，如第一个选项卡则为'1' |
| closable        | 标签是否可关闭                                   | boolean | —            | false                                                 |
| label-max-width | 头部标签最大宽度，可以覆盖 Tabs 控件的值         | Number  | —            | 无默认值，但头部标签样式控制默认最大宽度为 192px      |

<script>
  export default {
    data() {
      return {
        activeName: 'first',
        activeName2: 'first',
        activeName4: 'first',
        activeName3: 'first',
        activeName5: 'first',
        editableTabsValue: '2',
        editableTabsValue2: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        editableTabs2: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2,
        lostactiveName: 'tab1',
        losttabPanes: new Array(20),
        vactiveName1: 'second',
        vactiveName2: 'third',
        tabPosition: 'top',
        isFirst: true
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: '新页签',
            name: newTabName,
            content: '新页签的内容'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }

          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      },
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs2.push({
          title: '新页签',
          name: newTabName,
          content: '新页签的内容'
        });
        this.editableTabsValue2 = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      },
      beforeLeave(oldTabName, tabName) {
        if(this.isFirst) {
          this.isFirst = false
          return true
        } else {
          return new Promise((resolve, reject) => {
              this.$confirm(`是否切换到该页面`, { type: 'question' })
                    .then(() => {resolve()})
                    .catch(err => { reject(err)})
          })
        }
      },
      beforeRemove(name) {
        return new Promise((resolve, reject)=>{
          this.$confirm('确定删除吗？', { type: 'question' })
                    .then(() => {resolve()})
                    .catch(err => { reject(err)})
        })
      }
    }
  }
</script>

<style>
  .el-tabs--vertical {
    position: relative;
  }
  .el-tabs--vertical .el-tabs__content {
    position:absolute;
    left: 80px;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 10px;
  }
</style>
