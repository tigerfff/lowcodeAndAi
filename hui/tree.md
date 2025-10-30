# Tree 树形控件

用清晰的层级结构展示信息，可展开或折叠。

## 基础用法

<template>
  <code-box title="基础用法" description="基础的树形结构展示，默认无边框，建议使用容器边框。">
    <div class="tree-wrap">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" @node-dbclick="handleNodeDbClick"></el-tree>
    </div>
  </code-box>
</template>

```html
<div class="tree-wrap">
  <el-tree
    :data="data"
    :props="defaultProps"
    @node-click="handleNodeClick"
    @node-dbclick="handleNodeDbClick"
  ></el-tree>
</div>

<script>
  export default {
    data() {
      return {
        data: [
          {
            label: '一级 1',
            children: [
              { label: '二级 1-1', children: [{ label: '三级 1-1-1' }] }
            ]
          },
          {
            label: '一级 2',
            children: [
              { label: '二级 2-1', children: [{ label: '三级 2-1-1' }] },
              { label: '二级 2-2', children: [{ label: '三级 2-2-1' }] }
            ]
          },
          {
            label: '一级 3',
            children: [
              { label: '二级 3-1', children: [{ label: '三级 3-1-1' }] },
              { label: '二级 3-2', children: [{ label: '三级 3-2-1' }] }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      handleNodeDbClick(data) {
        console.log(data);
      }
    }
  };
</script>
```

## 带图标 <Badge text="2.0+" />

::: warning v2.1 非兼容性更新

受到 svgIcon 非兼容性更新影响，树中图标名称有所改变，具体以 svgIcon 为准

:::

<template>
  <code-box title="普通图标与SVG图标" description="带图标的树控件，可以设置默认图标，也可以从数据中传入。支持svg图标修改颜色和离线状态">
    <div class="tree-wrap">
      <el-tree :data="dataWithIcon" :props="defaultProps" default-icon="h-icon-internet" move></el-tree>
    </div>
  </code-box>
</template>

```html
<div class="tree-wrap">
  <el-tree
    :data="dataWithIcon"
    :props="defaultProps"
    default-icon="h-icon-internet"
  ></el-tree>
</div>

<script>
  export default {
    data() {
      return {
        dataWithIcon: [
          {
            label: 'Icon 1',
            icon: 'h-icon-menu_f',
            children: [
              {
                label: 'Icon 1-1',
                icon: 'h-icon-setting',
                children: [{ label: 'DefaultIcon 1-1-1' }]
              }
            ]
          },
          {
            label: 'SvgIcon 2',
            svgIcon: ['svg-box-camera', 'svg-state-cascade'],
            svgIconColor: ['#3399ff'],
            svgIconColorActive: ['#33ff99', '#000000'],
            children: [
              {
                label: 'SvgIcon 2-1',
                svgIcon: 'svg-box-camera',
                children: [{ label: 'DefaultIcon 2-1-1' }]
              },
              {
                label: 'SvgIcon-offline 2-2',
                svgIcon: [
                  'svg-box-camera',
                  'svg-state-no-longitude-and-latitude'
                ],
                svgIconOffline: true,
                children: [{ label: 'DefaultIcon 2-2-1' }]
              }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label',
          icon: 'icon',
          svgIcon: 'svgIcon',
          svgIconOffline: 'svgIconOffline',
          svgIconColor: 'svgIconColor',
          svgIconColorActive: 'svgIconColorActive'
        }
      };
    }
  };
</script>
```

## 有滚动条

<template>
  <code-box title="有滚动条" description="横向滚动条默认会出现，纵向滚动条需要给 tree 控件的外部容器定义高度才会出现。">
    <div class="tree-wrap" style="height: 200px;">
      <el-tree :data="dataScroll" :props="defaultProps" @node-click="handleNodeClick" @on-scrolling-y="onScrollingY"></el-tree>
    </div>
  </code-box>
</template>

```html
<div class="tree-wrap" style="height: 200px;">
  <el-tree
    :data="data_scroll"
    :props="defaultProps"
    @node-click="handleNodeClick"
    @on-scrolling-y="onScrollingY"
  ></el-tree>
</div>

<script>
  export default {
    data() {
      return {
        dataScroll: [
          {
            label: '一级 1',
            children: [
              { label: '二级 1-1', children: [{ label: '三级 1-1-1' }] }
            ]
          },
          {
            label:
              '一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2',
            children: [
              {
                label:
                  '二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1',
                children: [
                  {
                    label:
                      '三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1'
                  }
                ]
              },
              { label: '二级 2-2', children: [{ label: '三级 2-2-1' }] }
            ]
          },
          {
            label: '一级 3',
            children: [
              { label: '二级 3-1', children: [{ label: '三级 3-1-1' }] },
              { label: '二级 3-2', children: [{ label: '三级 3-2-1' }] }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label',
          icon: 'icon'
        }
      };
    },
    methods: {
      getCheckedNodes_simple() {
        console.log(this.$refs.simpleTree.getCheckedNodes());
      },
      getCheckedKeys_simple() {
        console.log(this.$refs.simpleTree.getCheckedKeys());
      }
    }
  };
</script>
```

## 简单数据结构

<template>
  <code-box title="简单数据结构" description="使用同级的数据结构，使用子节点parent-key和父节点node-key对应来展现层级。">
    <div class="tree-wrap">
      <el-tree
        :data.sync="simpleData"
        node-key="id"
        parent-key="pId"
        :props="defaultProps"
        ref="simpleTree"
        check-on-click-node
        simple-data
        show-checkbox
        @node-click="handleNodeClick"
      ></el-tree>
    </div>
    <div class="buttons">
      <el-button @click="getCheckedNodes_simple">通过 node 获取</el-button>
      <el-button @click="getCheckedKeys_simple">通过 key 获取</el-button>
    </div>
  </code-box>
</template>

```html
<div class="tree-wrap">
  <el-tree
    :data.sync="simpleData"
    node-key="id"
    parent-key="pId"
    :props="defaultProps"
    ref="simpleTree"
    simple-data
    show-checkbox
    @node-click="handleNodeClick"
  ></el-tree>
</div>

<div class="buttons">
  <el-button @click="getCheckedNodes_simple">通过 node 获取</el-button>
  <el-button @click="getCheckedKeys_simple">通过 key 获取</el-button>
</div>

<script>
  export default {
    data() {
      return {
        simpleData: [
          { id: 1, label: '一级 1' },
          { id: 4, pId: 1, label: '二级 1-1' },
          { id: 9, pId: 4, label: '三级 1-1-1' },
          { id: 10, pId: 4, label: '三级 1-1-2' },
          { id: 2, label: '一级 2' },
          { id: 5, pId: 2, label: '二级 2-1' },
          { id: 6, pId: 2, label: '二级 2-2' }
        ],
        defaultProps: {
          children: 'children',
          label: 'label',
          icon: 'icon'
        }
      };
    },
    methods: {
      getCheckedNodes_simple() {
        console.log(this.$refs.simpleTree.getCheckedNodes());
      },
      getCheckedKeys_simple() {
        console.log(this.$refs.simpleTree.getCheckedKeys());
      }
    }
  };
</script>
```

## 异步树

<template>
  <code-box title="异步树" description="适用于需要选择层级时使用。在下例中，由于在点击时才进行该层数据的获取，导致层级不可预知，如果没有下层数据，则点击后下拉按钮会消失。数据中设置 isLeaf 为 true，将直接不显示下拉按钮。">
    <div class="tree-wrap">
      <el-tree
        ref="lazyTree"
        :data="dataAsync"
        :props="props"
        simple-data
        node-key="id"
        parent-key="pid"
        :load="loadNode"
        show-checkbox
        lazy
        @check-change="handleCheckChange">
      </el-tree>
    </div>
    <div class="buttons">
      <el-button @click="reloadSelectedNode">重新加载选中节点</el-button>
    </div>
  </code-box>
</template>

```html
<div class="tree-wrap">
  <el-tree
    ref="lazyTree"
    :data="dataAsync"
    :props="props"
    simple-data
    node-key="id"
    parent-key="pid"
    :load="loadNode"
    show-checkbox
    lazy
    @check-change="handleCheckChange"
  ></el-tree>
</div>

<div class="buttons">
  <el-button @click="reloadSelectedNode">重新加载选中节点</el-button>
</div>

<script>
  export default {
    data() {
      return {
        dataAsync: [
          { id: 1, name: 'region1' },
          { id: 11, pid: 1, name: 'region11' },
          { id: 2, name: 'region2' }
        ],
        props: {
          label: 'name',
          children: 'zones'
        },
        count: 1
      };
    },
    methods: {
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      handleNodeClick(data, node, tree, event) {
        console.log(data);
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([
            {
              id: 1,
              name: 'region1'
            },
            {
              id: 11,
              pid: 1,
              name: 'region11'
            },
            {
              id: 2,
              name: 'region2'
            }
          ]);
        }
        if (node.level > 3) return resolve([]);

        var hasChild;
        if (node.data.name === 'region11') {
          hasChild = true;
        } else if (node.data.name === 'region2') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }

        setTimeout(() => {
          var data;
          if (hasChild) {
            data = [
              {
                id: 'id' + this.count,
                name: 'zone' + this.count++,
                isLeaf: true
              },
              {
                id: 'id' + this.count,
                name: 'zone' + this.count++
              }
            ];
          } else {
            data = [];
          }

          resolve(data);
        }, 500);
      },
      reloadSelectedNode() {
        const key = this.$refs.lazyTree.getSelectedKey();
        this.$refs.lazyTree.reload(key, function() {
          alert('reload完成！');
        });
      }
    }
  };
</script>
```

## 默认展开和默认选中

<template>
  <code-box title="默认展开和默认选中" description="分别通过`default-expanded-keys`和`default-checked-keys`设置默认展开和默认选中的节点。需要注意的是，此时必须设置`node-key`，其值为节点数据中的一个字段名，该字段在整棵树中是唯一的。">
    <div class="tree-wrap">
      <el-tree
        :data="dataDefault"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
        :props="defaultProps">
      </el-tree>
    </div>
  </code-box>
</template>

```html
<div class="tree-wrap">
  <el-tree
    :data="dataDefault"
    show-checkbox
    node-key="id"
    :default-expanded-keys="[2, 3]"
    :default-checked-keys="[5]"
    :props="defaultProps"
  ></el-tree>
</div>

<script>
  export default {
    data() {
      return {
        dataDefault: [
          {
            id: 1,
            label: '一级 1',
            children: [
              {
                id: 4,
                label: '二级 1-1',
                children: [
                  { id: 9, label: '三级 1-1-1' },
                  { id: 10, label: '三级 1-1-2' }
                ]
              }
            ]
          },
          {
            id: 2,
            label: '一级 2',
            children: [
              { id: 5, label: '二级 2-1' },
              { id: 6, label: '二级 2-2' }
            ]
          },
          {
            id: 3,
            label: '一级 3',
            children: [
              { id: 7, label: '二级 3-1' },
              { id: 8, label: '二级 3-2' }
            ]
          }
        ]
      };
    }
  };
</script>
```

## 禁止点击

<template>
  <code-box title="禁止点击" description="通过`selectable`设置是否可点击。">
    <div class="tree-wrap">
      <el-tree
        :props="selectableProps"
        :data="selectableData"
        node-key="id"
        :default-expanded-keys="[1, 3]"
      ></el-tree>
    </div>
  </code-box>
</template>

```html
<div class="tree-wrap">
  <el-tree
    :props="selectableProps"
    :data="selectableData"
    show-checkbox
    node-key="id"
    :default-expanded-keys="[1, 3]"
  ></el-tree>
</div>

<script>
  export default {
    data() {
      return {
        selectableData: [
          {
            id: 1,
            label: '一级 2（禁点击）',
            selectable: false,
            children: [
              {
                id: 3,
                label: '二级 2-1',
                children: [
                  { id: 4, label: '三级 3-1-1（禁点击）', selectable: false },
                  { id: 5, label: '三级 3-1-2' }
                ]
              }
            ]
          }
        ],
        selectableProps: {
          children: 'children',
          label: 'label',
          selectable: 'selectable'
        }
      };
    }
  };
</script>
```

## 禁止勾选

::: warning v2.8 非兼容性更新说明

根据[issues 603](http://iris.hikvision.com.cn/hui-vue/hui-vue/issues/603)描述，存在勾选父节点被禁用的子节点也会被勾选上的问题

鉴于禁用勾选一直问题不断，这边对禁用勾选逻辑进行一个整体修改。v2.8 产生以下**两点非兼容性更新**

1. 规则改回最初的，当子节点存在禁用未勾选节点时，勾选的父节点只能置位半选状态（如节点 2-5 及其子节点）
2. 和 antd 一样的逻辑，当某一节点禁用时，其子节点将不再享有与该节点的联动逻辑（如节点 2-2 及其子节点）

:::

<template>
  <code-box title="禁用状态（禁止勾选）" description="通过`disabled`设置禁用勾选状态。">
    <div class="tree-wrap">
      <el-tree
        :props="disabledProps"
        :data="dataDisabled"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 3, 8, 11, 14]"
        :default-checked-keys="[2, 5]">
      </el-tree>
    </div>
  </code-box>
</template>

```html
<div class="tree-wrap">
  <el-tree
    :props="disabledProps"
    :data="dataDisabled"
    show-checkbox
    node-key="id"
    :default-expanded-keys="[2, 3, 8, 11, 14]"
    :default-checked-keys="[2, 5]"
  ></el-tree>
</div>

<script>
  export default {
    data() {
      return {
        dataDisabled: [
          {
            id: 1,
            label: '一级 2',
            children: [
              {
                id: 3,
                label: '二级 2-1',
                children: [
                  { id: 4, label: '三级 3-1-1' },
                  { id: 5, label: '三级 3-1-2（禁勾选）', forbidden: true }
                ]
              },
              {
                id: 2,
                label: '二级 2-2（禁勾选）',
                forbidden: true,
                children: [
                  { id: 6, label: '三级 3-2-1' },
                  { id: 7, label: '三级 3-2-2' }
                ]
              },
              {
                id: 8,
                label: '二级 2-3',
                children: [
                  { id: 9, label: '三级 3-3-1' },
                  { id: 10, label: '三级 3-3-2' }
                ]
              },
              {
                id: 11,
                label: '二级 2-4',
                children: [
                  { id: 12, label: '三级 3-4-1', forbidden: true },
                  { id: 13, label: '三级 3-4-2', forbidden: true }
                ]
              },
              {
                id: 14,
                label: '二级 2-5',
                children: [
                  { id: 15, label: '三级 3-5-1', forbidden: true },
                  { id: 16, label: '三级 3-5-2' },
                  { id: 17, label: '三级 3-5-2' }
                ]
              }
            ]
          }
        ],
        disabledProps: {
          children: 'children',
          label: 'label',
          disabled: 'forbidden'
        }
      };
    }
  };
</script>
```

## 树节点的选择

<template>
  <code-box title="树节点的选择" description="本例展示如何获取和设置选中节点。获取和设置各有两种方式：通过 node 或通过 key。如果需要通过 key 来获取或设置，则必须设置`node-key`。">
    <div class="tree-wrap">
      <el-tree
        :data="dataSelect"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
        @current-change="changeSelectNode">
      </el-tree>
    </div>
    <div class="buttons" style="margin-bottom: 8px;">
      <el-button @click="getCheckedNodes">通过 node 获取</el-button>
      <el-button @click="getCheckedKeys">通过 key 获取</el-button>
      <el-button @click="setCheckedNodes">通过 node 设置</el-button>
      <el-button @click="setCheckedKeys">通过 key 设置</el-button>
      <el-button @click="resetChecked">清空</el-button>
    </div>
    <div class="buttons" style="margin-bottom: 8px;">
      <el-button @click="setCurrentNode">通过 node 选中</el-button>
      <el-button @click="setCurrentKey(3)">通过 key 选中</el-button>
      <el-button @click="setCurrentKey(null)">通过 key 取消选中</el-button>
    </div>
    <div class="buttons" style="margin-bottom: 8px;">
      <el-button @click="getSelectedKey">获取选中节点的key</el-button>
      <el-button @click="getSelectedNode">获取选中节点的node</el-button>
    </div>
    <div class="buttons" style="margin-bottom: 8px;">
      <el-button @click="getHalfCheckedKeys">获取半选中节点的key</el-button>
      <el-button @click="getHalfCheckedNodes">获取半选中节点的node</el-button>
    </div>
  </code-box>
</template>

```html
<div class="tree-wrap">
  <el-tree
    :data="dataSelect"
    show-checkbox
    default-expand-all
    node-key="id"
    ref="tree"
    highlight-current
    :props="defaultProps"
    @current-change="changeSelectNode"
  ></el-tree>
</div>

<div class="buttons">
  <el-button @click="getCheckedNodes">通过 node 获取</el-button>
  <el-button @click="getCheckedKeys">通过 key 获取</el-button>
  <el-button @click="setCheckedNodes">通过 node 设置</el-button>
  <el-button @click="setCheckedKeys">通过 key 设置</el-button>
  <el-button @click="resetChecked">清空</el-button>
</div>

<div class="buttons">
  <el-button @click="setCurrentNode">通过 node 选中</el-button>
  <el-button @click="setCurrentKey(3)">通过 key 选中</el-button>
  <el-button @click="setCurrentKey(null)">通过 key 取消选中</el-button>
</div>

<div class="buttons">
  <el-button @click="getSelectedKey">获取选中节点的key</el-button>
  <el-button @click="getSelectedNode">获取选中节点的node</el-button>
</div>

<div class="buttons">
  <el-button @click="getHalfCheckedKeys">获取半选中节点的key</el-button>
  <el-button @click="getHalfCheckedNodes">获取半选中节点的node</el-button>
</div>

<script>
  export default {
    methods: {
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([
          { id: 5, label: '二级 2-1' },
          { id: 9, label: '三级 1-1-1' }
        ]);
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      getCheckedHalfNodes() {
        console.log(this.$refs.tree.getCheckedNodes(false, false));
      },
      getCheckedHalfKeys() {
        console.log(this.$refs.tree.getCheckedKeys(false, false));
      },
      setCurrentNode() {
        this.$refs.tree.setCurrentNode(this.dataSelect[0]);
      },
      setCurrentKey(key) {
        this.$refs.tree.setCurrentKey(key);
      },
      changeSelectNode(nodeData) {
        console.log(nodeData);
      },
      getSelectedKey() {
        console.log(this.$refs.tree.getSelectedKey());
      },
      getSelectedNode() {
        console.log(this.$refs.tree.getSelectedNode());
      },
      getHalfCheckedKeys() {
        console.log(this.$refs.tree.getHalfCheckedKeys());
      },
      getHalfCheckedNodes() {
        console.log(this.$refs.tree.getHalfCheckedNodes());
      }
    },
    data() {
      return {
        dataSelect: [
          {
            id: 1,
            label: '一级 1',
            children: [
              {
                id: 4,
                label: '二级 1-1',
                children: [
                  { id: 9, label: '三级 1-1-1' },
                  { id: 10, label: '三级 1-1-2' }
                ]
              }
            ]
          },
          {
            id: 2,
            label: '一级 2',
            children: [
              { id: 5, label: '二级 2-1' },
              { id: 6, label: '二级 2-2' }
            ]
          },
          {
            id: 3,
            label: '一级 3',
            children: [
              { id: 7, label: '二级 3-1' },
              { id: 8, label: '二级 3-2' }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
  };
</script>
```

## 自定义节点内容

<template>
  <code-box title="自定义节点内容" description="节点的内容支持自定义，可以在节点区添加按钮或图标等内容。demo 使用`prefix-content` 和 `render-content` 指定渲染函数，该函数返回需要的节点区内容即可。渲染函数的用法请参考 Vue 文档。">
    <p>使用 scoped slot（推荐）</p>
    <div class="tree-wrap">
      <el-tree
        :data="dataRender"
        :props="defaultProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data, store }">
          <span class="custom-tree-text" style="white-space: normal; margin-left: 6px; vertical-align: middle;">
            <span>{{ node.label }}</span>
          </span>
          <span class="custom-tree-btn" style="float: right; margin-right: 20px; line-height: 25px;">
            <el-button size="mini" @click="() => append(store, data)">Append</el-button>
            <el-button size="mini" @click="() => remove(store, data)">Delete</el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <p>使用 render-content 和 prefix-content</p>
      <div class="tree-wrap">
        <el-tree
          :data="dataRender"
          :props="defaultProps"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent"
          :prefix-content="prefixContent"
          move>
        </el-tree>
      </div>
  </code-box>
</template>

```html
<p>使用 scoped slot（推荐）</p>
<div class="tree-wrap">
  <el-tree
    :data="dataRender"
    :props="defaultProps"
    show-checkbox
    node-key="id"
    default-expand-all
    :expand-on-click-node="false"
  >
    <span class="custom-tree-node" slot-scope="{ node, data, store }">
      <span class="custom-tree-text">
        <span>{{ node.label }}</span>
      </span>
      <span class="custom-tree-btn">
        <el-button size="mini" @click="() => append(store, data)">
          Append
        </el-button>
        <el-button size="mini" @click="() => remove(store, data)">
          Delete
        </el-button>
      </span>
    </span>
  </el-tree>
</div>

<p>使用 render-content 和 prefix-content</p>
<div class="tree-wrap">
  <el-tree
    :data="dataRender"
    :props="defaultProps"
    show-checkbox
    node-key="id"
    default-expand-all
    :expand-on-click-node="false"
    :render-content="renderContent"
    :prefix-content="prefixContent"
    move
  ></el-tree>
</div>

<script>
  let id = 1000;

  export default {
    data() {
      return {
        dataRender: [
          {
            id: 1,
            label: '一级 1',
            children: [
              {
                id: 4,
                label: '二级 1-1',
                children: [
                  { id: 9, label: '三级 1-1-1' },
                  { id: 10, label: '三级 1-1-2' }
                ]
              }
            ]
          },
          {
            id: 2,
            label: '一级 2',
            children: [
              { id: 5, label: '二级 2-1' },
              { id: 6, label: '二级 2-2' }
            ]
          },
          {
            id: 3,
            label: '一级 3',
            children: [
              { id: 7, label: '二级 3-1' },
              { id: 8, label: '二级 3-2' }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },

    methods: {
      append(store, data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        store.append(newChild, data);
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(store, data) {
        store.remove(data);
      },

      renderContent(h, { node, data, store }) {
        return (
          <span style='white-space: normal; margin-left: 6px; vertical-align: middle;'>
            <span>
              <span>{node.label}</span>
            </span>
            <span style='float: right; margin-right: 20px; line-height: 32px;'>
              <el-button size='mini' on-click={() => this.append(store, data)}>
                Append
              </el-button>
              <el-button size='mini' on-click={() => this.remove(store, data)}>
                Delete
              </el-button>
            </span>
          </span>
        );
      },

      prefixContent(h, { node, expanded, handleExpandIconClick }) {
        return (
          <span
            class={{
              'is-leaf':
                (node.isLeaf || node.data.isLeaf) &&
                node.childNodes.length === 0,
              'h-icon-add': !node.isLeaf && !expanded,
              'h-icon-minus': !node.isLeaf && expanded,
              'el-tree-node__expand-icon': true
            }}
            on-click={handleExpandIconClick}
          ></span>
        );
      }
    }
  };
</script>
```

## 节点过滤

<template>
  <code-box title="节点过滤" description="在需要对节点进行过滤时，调用 Tree 实例的`filter`方法，参数为关键字。需要注意的是，此时需要设置`filter-node-method`，值为过滤函数。">
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText2"
      class="filter-tree-input">
    </el-input>
    <div class="tree-wrap">
      <el-tree
        :data="dataFilter2"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode2"
        ref="tree3">
      </el-tree>
    </div>
  </code-box>
</template>

```html
<el-input
  placeholder="输入关键字进行过滤"
  v-model="filterText"
  class="filter-tree-input"
></el-input>

<div class="tree-wrap">
  <el-tree
    :data="dataFilter"
    :props="defaultProps"
    default-expand-all
    :filter-node-method="filterNode"
    ref="tree2"
  ></el-tree>
</div>

<script>
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val, !this.filterText);
      }
    },

    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    },

    data() {
      return {
        filterText: '',
        dataFilter: [
          {
            id: 1,
            label: '一级 1',
            children: [
              {
                id: 4,
                label: '二级 1-1',
                children: [
                  { id: 9, label: '三级 1-1-1' },
                  { id: 10, label: '三级 1-1-2' }
                ]
              }
            ]
          },
          {
            id: 2,
            label: '一级 2',
            children: [
              { id: 5, label: '二级 2-1' },
              { id: 6, label: '二级 2-2' }
            ]
          },
          {
            id: 3,
            label: '一级 3',
            children: [
              { id: 7, label: '二级 3-1' },
              { id: 8, label: '二级 3-2' }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
  };
</script>
```

## 手风琴模式

<template>
  <code-box title="手风琴模式" description="对于同一级的节点，每次只能展开一个。">
    <div class="tree-wrap">
      <el-tree
        :data="dataAccordion"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick">
      </el-tree>
    </div>
  </code-box>
</template>

```html
<div class="tree-wrap">
  <el-tree
    :data="dataAccordion"
    :props="defaultProps"
    accordion
    @node-click="handleNodeClick"
  ></el-tree>
</div>

<script>
  export default {
    data() {
      return {
        dataAccordion: [
          {
            label: '一级 1',
            children: [
              { label: '二级 1-1', children: [{ label: '三级 1-1-1' }] }
            ]
          },
          {
            label: '一级 2',
            children: [
              { label: '二级 2-1', children: [{ label: '三级 2-1-1' }] },
              { label: '二级 2-2', children: [{ label: '三级 2-2-1' }] }
            ]
          },
          {
            label: '一级 3',
            children: [
              { label: '二级 3-1', children: [{ label: '三级 3-1-1' }] },
              { label: '二级 3-2', children: [{ label: '三级 3-2-1' }] }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    }
  };
</script>
```

## 节点可拖拽

<template>
  <code-box title="节点可拖拽" description="通过 `move` 属性可让节点变为可拖拽。">
    <div class="tree-wrap">
      <el-tree
        :data="dataMove"
        class="move-tree"
        node-key="id"
        :props="defaultProps"
        move
        default-expand-all
        :before-drag="beforeDrag"
        :before-drop="beforeDrop"
        @node-drag="handleNodeDrag"
        @node-drag-move="handleNodeDragMove"
        @node-drop="handleNodeDrop"
        @node-drag-enter="handleNodeDragEnter"
        @node-drag-leave="handleNodeDragLeave"
        @node-drag-end="handleNodeDragEnd"
        @current-change="changeSelectNode"
      ></el-tree>
    </div>
  </code-box>
</template>

```html
<div class="tree-wrap">
  <el-tree
    :data="dataMove"
    class="move-tree"
    node-key="id"
    :props="defaultProps"
    move
    default-expand-all
    :before-drag="beforeDrag"
    :before-drop="beforeDrop"
    @node-drag="handleNodeDrag"
    @node-drag-move="handleNodeDragMove"
    @node-drop="handleNodeDrop"
    @node-drag-enter="handleNodeDragEnter"
    @node-drag-leave="handleNodeDragLeave"
    @node-drag-end="handleNodeDragEnd"
  ></el-tree>
</div>

<script>
  export default {
    data() {
      return {
        dataMove: [
          {
            id: 1,
            label: '一级 1',
            children: [
              {
                id: 4,
                label: '二级 1-1',
                children: [
                  { id: 9, label: '三级 1-1-1' },
                  { id: 10, label: '三级 1-1-2' }
                ]
              }
            ]
          },
          {
            id: 2,
            label: '一级 2',
            children: [
              { id: 5, label: '二级 2-1' },
              { id: 6, label: '二级 2-2' }
            ]
          },
          {
            id: 3,
            label: '一级 3',
            children: [
              { id: 7, label: '二级 3-1' },
              { id: 8, label: '二级 3-2' }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label',
          icon: 'icon'
        }
      };
    },
    methods: {
      beforeDrag(node) {
        return true;
      },
      handleNodeDrag(event, data, node, tree) {
        console.log('drag');
      },
      handleNodeDragMove(event, data, node, tree) {
        console.log('drag-move');
      },
      beforeDrop(node, targetNode, movePosition) {
        return true;
      },
      handleNodeDrop(event, data, node, targetNode, movePosition, tree) {
        console.log('drag-drop');
      },
      handleNodeDragEnter() {
        console.log('drag-enter');
      },
      handleNodeDragLeave() {
        console.log('drag-leave');
      },
      handleNodeDragEnd() {
        console.log('drag-end');
      }
    }
  };
</script>
```

## 节点搜索（仅供项目参考）

<template>
  <code-box title="节点搜索" description="在节点过滤demo的基础上新增了文字高亮逻辑，仅供业务项目参考。">
    <el-input
      placeholder="输入关键字进行搜索"
      v-model="filterText"
      class="filter-tree-input">
    </el-input>
    <div class="tree-wrap">
      <el-tree
        :data="dataFilter"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        :render-content="highlightRender"
        ref="tree2">
      </el-tree>
    </div>
  </code-box>
</template>

```html
<el-input
  placeholder="输入关键字进行搜索"
  v-model="filterText"
  class="filter-tree-input"
></el-input>

<div class="tree-wrap">
  <el-tree
    :data="dataFilter"
    :props="defaultProps"
    default-expand-all
    :filter-node-method="filterNode"
    :render-content="highlightRender"
    ref="tree2"
  ></el-tree>
</div>

<script>
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val, !this.filterText);
      }
    },

    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      highlightRender(h, { node }) {
        const name = node.label;
        if (this.filterText) {
          // 支持大小写模糊搜索
          // specialCharts：特殊字符集合，这些字符不能直接塞进正则里，需要先转译
          const specialCharts = [
            '(',
            ')',
            "'",
            '\\',
            '$',
            '*',
            '+',
            '[',
            ']',
            '?',
            '^',
            '{',
            '}',
            '|',
            '.'
          ];
          let wordStr = '';
          for (let i = 0, len = this.filterText.length; i < len; i++) {
            if (specialCharts.includes(this.filterText[i])) {
              wordStr += '\\' + this.filterText[i];
            } else {
              wordStr += this.filterText[i];
            }
          }
          const wordReg = new RegExp(wordStr, 'ig');
          const keyWordArr = name.match(wordReg);
          const vNodeArr = name
            .split(wordReg)
            .reduce((all, item, index, arr) => {
              item && all.push(h('span', {}, item));
              if (index !== arr.length - 1) {
                all.push(
                  h(
                    'span',
                    {
                      class: 'el-tree-node_highlight'
                    },
                    keyWordArr.shift()
                  )
                );
              }
              return all;
            }, []);
          return h('span', { class: 'el-tree-node__label' }, vNodeArr);
        } else {
          return h('span', { class: 'el-tree-node__label' }, name);
        }
      }
    },

    data() {
      return {
        filterText: '',
        dataFilter: [
          {
            id: 1,
            label: '一级 1',
            children: [
              {
                id: 4,
                label: '二级 1-1',
                children: [
                  { id: 9, label: '三级 1-1-1' },
                  { id: 10, label: '三级 1-1-2' }
                ]
              }
            ]
          },
          {
            id: 2,
            label: '一级 2',
            children: [
              { id: 5, label: '二级 2-1' },
              { id: 6, label: '二级 2-2' }
            ]
          },
          {
            id: 3,
            label: '一级 3',
            children: [
              { id: 7, label: '二级 3-1' },
              { id: 8, label: '二级 3-2' }
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
  };
</script>
```

## API

### Attributes

| 参数                                               | 说明                                                                                              | 类型                                           | 可选值     | 默认值   |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ---------- | -------- |
| data                                               | 展示数据                                                                                          | array                                          | —          | —        |
| empty-text                                         | 内容为空的时候展示的文本                                                                          | String                                         | —          | 暂无数据 |
| node-key                                           | 每个树节点用来作为唯一标识的属性，整颗树应该是唯一的                                              | String                                         | —          | —        |
| parent-key                                         | 配合 simpleData 和 node-key 使用，完成简单数据的展现，定义为父节点的 key                          | String                                         | —          | —        |
| props                                              | 配置选项，具体看下表                                                                              | object                                         | —          | —        |
| render-after-expand                                | 是否在第一次展开某个树节点后才渲染其子节点                                                        | boolean                                        | —          | true     |
| render-when-expand <Badge text="2.0+" />           | 是否在展开某个树节点后才渲染其子节点（收起后就去除）                                              | boolean                                        | —          | false    |
| load                                               | 加载子树数据的方法                                                                                | function(node, resolve)                        | —          | —        |
| lazy                                               | 是否懒加载子节点，需与 load 方法结合使用                                                          | boolean                                        | —          | false    |
| render-content                                     | 树节点的内容区的渲染 Function                                                                     | Function(h, { node }                           | —          | —        |
| prefix-content <Badge text="2.29.0+" />            | 树节点的前缀区的渲染 Function                                                                     | Function(h, { node }                           | —          | —        |
| highlight-current                                  | 是否高亮当前选中节点，默认值是 true。                                                             | boolean                                        | —          | true     |
| current-node-key                                   | 当前选中节点的 key，只写属性                                                                      | string, number                                 | —          | —        |
| default-expand-all                                 | 是否默认展开所有节点                                                                              | boolean                                        | —          | false    |
| expand-on-click-node                               | 是否在点击节点的时候展开或者收缩节点， 默认值为 false，只有点箭头图标的时候才会展开或者收缩节点。 | boolean                                        | —          | false    |
| expand-on-dbclick-node                             | 是否在双击节点的时候展开或者收缩节点， 默认值为 true。                                            | boolean                                        | —          | true     |
| check-on-click-node <Badge text="2.0+" />          | 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。                  | boolean                                        | —          | false    |
| auto-expand-parent                                 | 展开子节点的时候是否自动展开父节点                                                                | boolean                                        | —          | true     |
| default-expanded-keys                              | 默认展开的节点的 key 的数组                                                                       | array                                          | —          | —        |
| show-checkbox                                      | 节点是否可被勾选                                                                                  | boolean                                        | —          | false    |
| default-icon                                       | 默认图标                                                                                          | String                                         | —          | -        |
| check-strictly                                     | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false                            | boolean                                        | —          | false    |
| check-parent-to-child <Badge text="2.36+" />                                    | 父联动子                            | boolean                                        | —          | true    |
| check-child-to-parent <Badge text="2.36+" />                                    | 子联动父                            | boolean                                        | —          | true    |
| default-checked-keys                               | 默认勾选的节点的 key 的数组                                                                       | array                                          | —          | —        |
| filter-node-method                                 | 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏   | Function(value, data, node)                    | —          | —        |
| border                                             | 是否显示边框（不推荐，建议使用容器边框，这个参数和滚动条不兼容）                                  | boolean                                        | —          | false    |
| accordion                                          | 是否每次只打开一个同级树节点展开                                                                  | boolean                                        | —          | false    |
| indent                                             | 相邻级节点间的水平缩进，单位为像素                                                                | number                                         | —          | 16       |
| nodeHeight                                         | 节点高度（默认 css 样式控制为 32px，如果设置会以内联样式覆盖）                                    | number                                         | —          | —        |
| ~~scroll-size~~<Badge text="移除" type="warning"/> | 滚动条尺寸                                                                                        | number                                         | —          | 6        |
| simple-data                                        | 使用同级的数据结构，使用子节点 parent-key 和父节点 node-key 对应来展现层级                        | boolean                                        | —          | false    |
| move                                               | 节点是否可拖拽                                                                                    | boolean                                        | —          | false    |
| move-area                                          | 节点可拖拽的区域，outter 表示节点只有拖拽到树区域以外才会响应                                     | string                                         | all/outter | all      |
| move-style                                         | 拖拽节点的样式，或者可以通过样式覆盖 el-tree\_\_move-block 类来实现，里面就是 Node 节点元素       | object                                         | —          | —        |
| custom-srcollbar <Badge text="2.0+" />             | 是否由用户自定义滚动条（默认是内置 el-scrollbar 的）                                              | boolean                                        | —          | false    |
| before-drag                                        | 用于捕获节点被拖拽之前的事件回调函数，若返回 false，则节点无法被拖拽                              | function(data, node)                           | —          | —        |
| before-drop                                        | 用于捕获节点被加入目标节点之前的事件回调函数，若返回 false，则节点无法被拖拽到目标节点            | function(data, node, targetNode, movePosition) | —          | —        |
| custom-drag                                        | 用于自定义处理 mouseup 之后的逻辑，true 自定义处理                                                | boolean                                        | —          | false    |
| before-click                                       | 用于捕获单击节点之前的事件回调函数，返回 Boolean 或 Promise，为 false 表示无法进行单击操作        | function(data, node)                           | —          | —        |
| nodeClassRender<Badge text="2.38+" />                                       | 用于添加节点的自定义样式        | string                           | function(data)          | ""        |

### props

| 参数                                     | 说明                                                     | 类型                          | 可选值 | 默认值 |
| ---------------------------------------- | -------------------------------------------------------- | ----------------------------- | ------ | ------ |
| label                                    | 指定节点标签为节点对象的某个属性值                       | string, function(data, node)  | —      | —      |
| children                                 | 指定子树为节点对象的某个属性值                           | string, function(data, node)  | —      | —      |
| disabled                                 | 指定节点选择框是否禁用                                   | boolean, function(data, node) | —      | —      |
| showCheckbox                             | 显示多选框                                               | boolean                       | —      | false  |
| isLeaf                                   | 指定节点是否是叶子节点，仅在指定了 lazy 属性的情况下生效 | boolean, function(data, node) | —      | —      |
| icon                                     | 节点的图标                                               | string, function(data, node)  | —      | —      |
| selectable                               | 指定节点是否可以选中                                     | boolean, function(data, node) | —      | —      |
| svgIcon                                  | 节点的 SVG 图标                                          | String/Array                  | —      | —      |
| svgIconOffline                           | 节点的 SVG 图标是否为 Offline 状态                       | boolean                       | —      | —      |
| svgIconColor <Badge text="2.0+" />       | 节点的 SVG 图标非选中状态下的颜色                        | String/Array                  | —      | —      |
| svgIconColorActive <Badge text="2.0+" /> | 节点的 SVG 图标选中状态下的颜色                          | String/Array                  | —      | —      |
| svgIconRequire <Badge text="2.5+" />     | 节点的 SVG 图标是否是外部引入                            | boolean                       | —      | —      |

### 方法

`Tree` 拥有如下方法，返回目前被选中的节点数组：
| 方法名 | 说明 | 参数 |
| --------------- | ---------------------------------------- | ---------------------------------------- |
| filter | 对树节点进行筛选操作（异步树时该过滤方法无效） | 接收一个任意类型的参数，该参数会在 filter-node-method 中作为第一个参数 |
| getCheckedNodes | 若节点可被勾选（即 `show-checkbox` 为 `true`），则返回目前被选中的节点所组成的数组 | (leafOnly, checkedOnly) 接收两个参数，1. boolean 类型的参数，若为 `true` 则仅返回被勾选的叶子节点，默认值为 `false` 2. boolean 类型的参数，若为 `false` 则一起返回半选状态的节点，默认值为 `true` |
| setCheckedNodes | 设置目前勾选的节点，使用此方法必须设置 node-key 属性 | (nodes, leafOnly, rootOnly) 接收两个参数，1. 接收勾选节点数据的数组 2. boolean 类型的参数，若为 `true` 则仅设置叶子节点的勾选状态，默认值为 `false` 3. boolean 类型的参数，若为 `true` 则仅设置勾选节点的勾选状态，默认值为 `false` |
| getCheckedKeys | 若节点可被勾选（即 `show-checkbox` 为 `true`），则返回目前被勾选节点的 key 值所组成的数组，使用此方法必须设置 node-key 属性 | (leafOnly, checkedOnly) 接收两个参数，1. boolean 类型的参数，若为 `true` 则仅返回被勾选的叶子节点的 keys，默认值为 `false` 2. boolean 类型的参数，若为 `false` 则一起返回半选状态的节点，默认值为 `true` |
| setCheckedKeys | 通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性 | (keys, leafOnly, rootOnly) 接收两个参数，1. 勾选节点的 key 的数组 2. boolean 类型的参数，若为 `true` 则仅设置叶子节点的勾选状态，默认值为 `false` 3. boolean 类型的参数，若为 `true` 则仅设置勾选节点的勾选状态，默认值为 `false` |
| setChecked | 通过 key / data 设置某个节点的勾选状态，使用此方法必须设置 node-key 属性 | (key/data, checked, deep) 接收三个参数，1. 勾选节点的 key 或者 data 2. boolean 类型，节点是否勾选 3. boolean 类型，是否设置子节点 ，默认为 false |
| setCurrentKey | 通通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性 | (key) 待被选节点的 key ，设置为`null`则会取消选中状态 |
| setCurrentNode | 通过 data 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性 | (data) 待被选节点的 data ，设置为`null`则会取消选中状态 |
| setSelected | 通过 key / data 设置某个节点的选中状态，使用此方法必须设置 node-key 属性 | (key/data, selected, deep) 接收三个参数，1. 选中节点的 key 或者 data 2. boolean 类型，节点是否选中(默认选中) |
| getSelectedNode | 返回当前点击的节点 | - |
| getSelectedKey | 返回当前点击节点的 Key 值，使用此方法必须设置 node-key 属性 | - |
| resizeScrollbar | 重新渲染滚动条 | - |
| getHalfCheckedNodes | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前半选中的节点所组成的数组 | - |
| getHalfCheckedKeys | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前半选中的节点的 key 所组成的数组 | - |
| getNode | 根据 data 或者 key 拿到 Tree 组件中的 node | (data) 要获得 node 的 key 或者 data |
| expandNode | 展开节点 | (data) 要展开节点 的 key 或者 data |
| collapseNode | 收起节点 | (data) 要收起节点 的 key 或者 data |
| remove | 删除 Tree 中的节点，可以是数组 | (data) 要删除的节点的 data、key 或者 node |
| append | 为 Tree 中的一个节点追加子节点，可以是数组 | (data, parentNode) 1. 要追加的子节点的 data 2. 子节点的 parent 的 data、key 或者 node |
| insertBefore | 为 Tree 的一个节点的前面增加一个节点 | (data, refNode) 1. 要增加的节点的 data 2. 要增加的节点的后一个节点的 data、key 或者 node |
| insertAfter | 为 Tree 的一个节点的后面增加一个节点 | (data, refNode) 1. 要增加的节点的 data 2. 要增加的节点的前一个节点的 data、key 或者 node |
| reload | 重新加载树节点，可以是数组，仅在 lazy 为 true 的情况下可用 | (data) 要重新加载节点的 data、key 或者 node |
| moveNodes | 节点拖拽之后移动节点方法，配合 custiomDrag 属性，node-drag-over 事件可以实现自定义处理 mouseup 之后的逻辑 | - |

### Events

| 事件名称                              | 说明                                                                             | 回调参数                                                                                                                                                                                                                                                                                  |
| ------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| node-click                            | 节点被点击时的回调                                                               | 共四个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身和 click 事件对象。                                                                                                                                                                        |
| node-dbclick                          | 节点被双击时的回调                                                               | 共四个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身和 dbclick 事件对象。                                                                                                                                                                      |
| node-mouseenter                       | 鼠标移入节点事件                                                                 | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、mouseenter 事件对象。                                                                                                                                                                                  |
| node-mouseleave                       | 鼠标移出节点事件                                                                 | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、mouseleave 事件对象。                                                                                                                                                                                  |
| node-contextmenu                      | 当某一节点被鼠标右键点击时会触发该事件                                           | 共四个参数，依次为：event、传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。                                                                                                                                                                                  |
| check-change                          | 节点选中状态发生变化时的回调                                                     | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点                                                                                                                                                                      |
| check                                 | 当复选框被点击的时候触发                                                         | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性，还有是否是勾选状态                                                                                                    |
| current-change                        | 当前选中节点变化时触发的事件                                                     | 共两个参数，依次为：当前节点的数据，当前节点的 Node 对象                                                                                                                                                                                                                                  |
| node-expand                           | 节点被展开时触发的事件                                                           | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。                                                                                                                                                                                         |
| node-collapse                         | 节点被关闭时触发的事件                                                           | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。                                                                                                                                                                                         |
| node-drag                             | 节点开始拖拽时触发的事件                                                         | 共四个参数，依次为：js Event 对象、传递给 `data` 属性的数组中被拖拽节点所对应的对象、被拖拽节点对应的 Node、节点组件本身。                                                                                                                                                                |
| node-drag-move                        | 节点被拖拽移动时触发的事件                                                       | 共四个参数，依次为：js Event 对象、传递给 `data` 属性的数组中被拖拽节点所对应的对象、被拖拽节点对应的 Node、节点组件本身。                                                                                                                                                                |
| node-drag-enter <Badge text="2.0+" /> | 拖拽进入其他节点时触发的事件                                                     | 共四个参数，依次为：js Event 对象、被拖拽节点对应的 Node、目标节点对应的 Node（拖拽到树区域以外则为 null）、节点组件本身。                                                                                                                                                                |
| node-drag-leave <Badge text="2.0+" /> | 拖拽离开某个节点时触发的事件                                                     | 共四个参数，依次为：js Event 对象、被拖拽节点对应的 Node、目标节点对应的 Node（拖拽到树区域以外则为 null）、节点组件本身。                                                                                                                                                                |
| node-drag-end <Badge text="2.0+" />   | 拖拽结束时（可能未成功）触发的事件                                               | 共六个参数，依次为：js Event 对象、传递给 `data` 属性的数组中被拖拽节点所对应的对象、被拖拽节点对应的 Node、目标节点对应的 Node（拖拽到树区域以外则为 null）、节点被拖拽到目标节点的位置：inner（目标节点内） prev（目标节点之前） next（目标节点之后） out（树区域之外）、节点组件本身。 |
| node-drag-over                        | 拖拽结束自定义处理逻辑（暂不处理节点移动）                                       | 共六个参数，依次为：js Event 对象、传递给 `data` 属性的数组中被拖拽节点所对应的对象、被拖拽节点对应的 Node、目标节点对应的 Node（拖拽到树区域以外则为 null）、节点被拖拽到目标节点的位置：inner（目标节点内） prev（目标节点之前） next（目标节点之后） out（树区域之外）、节点组件本身。 |
| node-drop                             | 节点完成拖拽时触发的事件（被拖拽到树区域以外则自身节点不消失）                   | 共六个参数，依次为：js Event 对象、传递给 `data` 属性的数组中被拖拽节点所对应的对象、被拖拽节点对应的 Node、目标节点对应的 Node（拖拽到树区域以外则为 null）、节点被拖拽到目标节点的位置：inner（目标节点内） prev（目标节点之前） next（目标节点之后） out（树区域之外）、节点组件本身。 |
| on-scrolling-x                        | 横向滚动时触发事件,参数返回滚动距离和已滚动百分比（百分比为 1 则表示滚动到尽头） | {scrollLeft, percentX }                                                                                                                                                                                                                                                                   |
| on-scrolling-y                        | 纵向滚动时触发事件,参数返回滚动距离和已滚动百分比（百分比为 1 则表示滚动到尽头） | {scrollTop, percentY }                                                                                                                                                                                                                                                                    |
| on-scrolling                          | 滚动时触发事件,参数返回滚动距离和已滚动百分比（百分比为 1 则表示滚动到尽头）     | {scrollLeft, scrollTop, percentX, percentY }                                                                                                                                                                                                                                              |

### Scoped Slot

| name                        | 说明                                             |
| --------------------------- | ------------------------------------------------ |
| —                           | 自定义树节点的内容，参数为 { node, data, store } |
| empty <Badge text="2.0+" /> | 当无数据时的内容，不传则展示默认的“暂无数据”     |

<script>
  let id = 1000;

  export default {
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val, !this.filterText);
      },
      filterText2(val) {
        this.$refs.tree3.filter(val, !this.filterText2);
      }
    },
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'label',
          icon: 'icon',
          svgIcon: 'svgIcon',
          svgIconOffline: 'svgIconOffline',
        },
        props: {
          label: 'name',
          children: 'zones'
        },
        disabledProps: {
          children: 'children',
          label: 'label',
          disabled: 'forbidden'
        },
        selectableProps: {
          children: 'children',
          label: 'label',
          selectable: 'selectable'
        },
        // 普通数据
        data: [{
          label: '一级 1',
          children: [{ label: '二级 1-1', children: [{ label: '三级 1-1-1' }] }]
        }, {
          label: '一级 2',
          children: [
            { label: '二级 2-1', children: [{ label: '三级 2-1-1' }] },
            { label: '二级 2-2', children: [{ label: '三级 2-2-1' }] }
          ] }, {
          label: '一级 3',
          children: [
            { label: '二级 3-1', children: [{ label: '三级 3-1-1' }] },
            { label: '二级 3-2', children: [{ label: '三级 3-2-1' }] }
          ]
        }],
        // 带图标
        dataWithIcon: [{ label: 'Icon 1',
          icon: 'h-icon-menu_f',
          children: [{ label: 'Icon 1-1', icon: 'h-icon-setting', children: [{ label: 'DefaultIcon 1-1-1' }] }]
        },
        {
          label: 'SvgIcon 2',
          svgIcon: ['svg-box-camera', 'svg-state-cascade'],
          svgIconColor: ['#3399ff'],
          svgIconColorActive: ['#33ff99', '#000000'],
          children: [
            { label: 'SvgIcon 2-1', svgIcon: require('../../assets/svg/tree_main_organization.svg'), svgIconRequire: true, children: [
              { label: 'DefaultIcon 2-1-1' }
            ] },
            { label: 'SvgIcon-offline 2-2', svgIcon: ['svg-box-camera', 'svg-state-no-longitude-and-latitude'], svgIconOffline: true, children: [
              { label: 'DefaultIcon 2-2-1' }
            ] }
          ]
        }
        ],
        // 带滚动条
        dataScroll: [
          { label: '一级 1', children: [
            { label: '二级 1-1', children: [
              { label: '三级 1-1-1' }
            ] }
          ] },
          { label: '一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2一级 2', children: [
            { label: '二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1二级 2-1', children: [
              { label: '三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1三级 2-1-1' }
            ] },
            { label: '二级 2-2', children: [
              { label: '三级 2-2-1' }
              ] }
            ] },
          { label: '一级 3', children: [
            { label: '二级 3-1', children: [
              { label: '三级 3-1-1' }
            ] },
            { label: '二级 3-2', children: [
              { label: '三级 3-2-1' }
            ] }
          ] }
        ],
        // 简单树结构
        simpleData: [
          { id: 1, label: '一级 1' },
          { id: 4, pId: 1, label: '二级 1-1'},
          { id: 9, pId: 4, label: '三级 1-1-1' },
          { id: 10, pId: 4, label: '三级 1-1-2' },
          { id: 2, label: '一级 2' },
          { id: 5, pId: 2, label: '二级 2-1' },
          { id: 6, pId: 2, label: '二级 2-2' }
        ],
        // 异步树
        dataAsync: [
          { id: 1, name: 'region1' },
          { id: 11, pid: 1, name: 'region11' },
          { id: 2, name: 'region2' }
        ],
        count: 1,
        // 默认展开和默认勾选
        dataDefault: [
          { id: 1, label: '一级 1', children: [
            { id: 4, label: '二级 1-1', children: [
              { id: 9, label: '三级 1-1-1' },
              { id: 10, label: '三级 1-1-2' }
            ]}
          ] },
          { id: 2, label: '一级 2', children: [
            { id: 5, label: '二级 2-1' },
            { id: 6, label: '二级 2-2' }
          ] },
          { id: 3, label: '一级 3', children: [
            { id: 7, label: '二级 3-1' },
            { id: 8, label: '二级 3-2' }
          ] }
        ],
        // 禁止点击
        selectableData: [
          { id: 1, label: '一级 2（禁点击）', selectable: false, children: [
            { id: 3, label: '二级 2-1', children: [
              { id: 4, label: '三级 3-1-1（禁点击）', selectable: false },
              { id: 5, label: '三级 3-1-2' }
            ] }
          ] }
        ],
        // 禁用
        dataDisabled: [
          { id: 1, label: '一级 2', children: [
            { id: 3, label: '二级 2-1', children: [
              { id: 4, label: '三级 3-1-1' },
              { id: 5, label: '三级 3-1-2（禁勾选）', forbidden: true }
            ] },
            { id: 2, label: '二级 2-2（禁勾选）', forbidden: true, children: [
              { id: 6, label: '三级 3-2-1' },
              { id: 7, label: '三级 3-2-2' }
            ] },
            { id: 8, label: '二级 2-3', children: [
              { id: 9, label: '三级 3-3-1' },
              { id: 10, label: '三级 3-3-2' }
            ] },
            { id: 11, label: '二级 2-4', children: [
              { id: 12, label: '三级 3-4-1', forbidden: true },
              { id: 13, label: '三级 3-4-2', forbidden: true }
            ] },
            { id: 14, label: '二级 2-5', children: [
              { id: 15, label: '三级 3-5-1', forbidden: true },
              { id: 16, label: '三级 3-5-2' },
              { id: 17, label: '三级 3-5-2' }
            ] }
          ] }
        ],
        // 节点的选择
        dataSelect: [
          { id: 1, label: '一级 1', children: [
            { id: 4, label: '二级 1-1', children: [
              { id: 9, label: '三级 1-1-1' },
              { id: 10, label: '三级 1-1-2' }
            ] }
          ] },
          { id: 2, label: '一级 2', children: [
            { id: 5, label: '二级 2-1' },
            { id: 6, label: '二级 2-2' }
          ] },
          { id: 3, label: '一级 3', children: [
            { id: 7, label: '二级 3-1' },
            { id: 8, label: '二级 3-2' }
          ] }
        ],
        // 节点渲染
        dataRender: [
          { id: 1, label: '一级 1', children: [
            { id: 4, label: '二级 1-1', children: [
              { id: 9, label: '三级 1-1-1' },
              { id: 10, label: '三级 1-1-2' }
            ] }
          ] },
          { id: 2, label: '一级 2', children: [
            { id: 5, label: '二级 2-1' },
            { id: 6, label: '二级 2-2' }
          ] },
          { id: 3, label: '一级 3', children: [
            { id: 7, label: '二级 3-1' },
            { id: 8, label: '二级 3-2' }
          ] }
        ],
        // 节点过滤
        filterText: '',
        filterText2: '',
        dataFilter: [
          { id: 1, label: '一级 1', children: [
            { id: 4, label: '二级 1-1', children: [
              { id: 9, label: '三级 1-1-1' },
              { id: 10, label: '三级 1-1-2' }
            ] }
          ] },
          { id: 2, label: '一级 2', children: [
            { id: 5, label: '二级 2-1' },
            { id: 6, label: '二级 2-2' }
          ] },
          { id: 3, label: '一级 3', children: [
            { id: 7, label: '二级 3-1' },
            { id: 8, label: '二级 3-2' }
          ] }
        ],
        dataFilter2: [
          { id: 1, label: '一级 1', children: [
            { id: 4, label: '二级 1-1', children: [
              { id: 9, label: '三级 1-1-1' },
              { id: 10, label: '三级 1-1-2' }
            ] }
          ] },
          { id: 2, label: '一级 2', children: [
            { id: 5, label: '二级 2-1' },
            { id: 6, label: '二级 2-2' }
          ] },
          { id: 3, label: '一级 3', children: [
            { id: 7, label: '二级 3-1' },
            { id: 8, label: '二级 3-2' }
          ] }
        ],
        // 手风琴
        dataAccordion: [
          { label: '一级 1', children: [
            { label: '二级 1-1', children: [
              { label: '三级 1-1-1' }
            ] }
          ] }, 
          { label: '一级 2', children: [
            { label: '二级 2-1', children: [
              { label: '三级 2-1-1' }
            ] },
            { label: '二级 2-2', children: [
              { label: '三级 2-2-1' }
            ] }
          ] },
          { label: '一级 3', children: [
            { label: '二级 3-1', children: [
              { label: '三级 3-1-1' }
            ] },
            { label: '二级 3-2', children: [
              { label: '三级 3-2-1' }
            ] }
          ] }
        ],
        // 可拖拽
        dataMove: [
          { id: 1, label: '一级 1', children: [
            { id: 4, label: '二级 1-1', children: [
              { id: 9, label: '三级 1-1-1' },
              { id: 10, label: '三级 1-1-2' }
            ] }
          ] },
          { id: 2, label: '一级 2', children: [
            { id: 5, label: '二级 2-1' },
            { id: 6, label: '二级 2-2' }
          ] },
          { id: 3, label: '一级 3', children: [
            { id: 7, label: '二级 3-1' },
            { id: 8, label: '二级 3-2' }
          ] }
        ]
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      handleNodeDbClick(data) {
        console.log(data);
      },
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      handleNodeClick(data, node, tree, event) {
        console.log(data);
      },
      getCheckedNodes_simple() {
        console.log(this.$refs.simpleTree.getCheckedNodes());
      },
      getCheckedKeys_simple() {
        console.log(this.$refs.simpleTree.getCheckedKeys());
      },
      highlightRender (h, { node }) {
        const name = node.label
        if (this.filterText) {
          // 支持大小写模糊搜索
          // specialCharts：特殊字符集合，这些字符不能直接塞进正则里，需要先转译
          const specialCharts = [
            '(', ')', "'", '\\', '$',
            '*', '+', '[', ']', '?',
            '^', '{', '}', '|', '.'
          ];
          let wordStr = '';
          for (let i = 0, len = this.filterText.length; i < len; i++) {
            if (specialCharts.includes(this.filterText[i])) {
              wordStr += '\\' + this.filterText[i];
            } else {
              wordStr += this.filterText[i];
            }
          }
          const wordReg = new RegExp(wordStr, 'ig');
          const keyWordArr = name.match(wordReg);
          const vNodeArr = name.split(wordReg).reduce((all, item, index, arr) => {
            item && all.push(h('span', {}, item));
            if (index !== arr.length - 1) {
              all.push(
                h(
                  'span',
                  {
                    class: 'el-tree-node_highlight'
                  },
                  keyWordArr.shift()
                )
              );
            }
            return all;
          }, []);
          return h('span', { class: 'el-tree-node__label' }, vNodeArr);
        } else {
          return h('span', { class: 'el-tree-node__label' }, name);
        }
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([
            { id: 1, name: 'region1' },
            { id: 11, pid: 1, name: 'region11' },
            { id: 2, name: 'region2' }
          ]);
        }
        if (node.level > 3) return resolve([]);

        var hasChild;
        if (node.data.name === 'region11') {
          hasChild = true;
        } else if (node.data.name === 'region2') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }
    
        setTimeout(() => {
          var data;
          if (hasChild) {
            data = [{
              id: 'id' + this.count,
              name: 'zone' + this.count++,
              isLeaf: true
            }, {
              id: 'id' + this.count,
              name: 'zone' + this.count++
            }];
          } else {
            data = [];
          }
    
          resolve(data);
        }, 500);
      },
      reloadSelectedNode () {
        const key = this.$refs.lazyTree.getSelectedKey()
        this.$refs.lazyTree.reload(key, function() {alert('reload完成！')})
      },
    
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([
          { id: 5, label: '二级 2-1' },
          { id: 9, label: '三级 1-1-1' }
        ]);
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      changeSelectNode (nodeData) {
        console.log(nodeData)
      }, 
      getCheckedHalfNodes() {
        console.log(this.$refs.tree.getCheckedNodes(false, false));
      },
      getCheckedHalfKeys() {
        console.log(this.$refs.tree.getCheckedKeys(false, false));
      },
      setCurrentNode() {
        this.$refs.tree.setCurrentNode(this.dataSelect[0]);
      },
      setCurrentKey(key) {
        this.$refs.tree.setCurrentKey(key);
      },
      getSelectedKey () {
        console.log(this.$refs.tree.getSelectedKey());
      },
      getSelectedNode () {
        console.log(this.$refs.tree.getSelectedNode());
      },
      getHalfCheckedKeys () {
        console.log(this.$refs.tree.getHalfCheckedKeys());
      },
      getHalfCheckedNodes () {
        console.log(this.$refs.tree.getHalfCheckedNodes());
      },
    
      append(store, data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        store.append(newChild, data);
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },
    
      remove(store, data) {
        store.remove(data);
      },
    
      renderContent(h, { node, data, store }) {
        return (
          <span style="white-space: normal; margin-left: 6px; vertical-align: middle;">
            <span class="custom-tree-text">
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px; line-height: 25px;">
              <el-button size="mini" on-click={ () => this.append(store, data) }>Append</el-button>
              <el-button size="mini" on-click={ () => this.remove(store, data) }>Delete</el-button>
            </span>
          </span>);
      },

      prefixContent(h, { node, expanded, handleExpandIconClick }) {
        return (
          <span
            class={{
              'is-leaf': (node.isLeaf || node.data.isLeaf) && node.childNodes.length === 0,
              'h-icon-add': !node.isLeaf && !expanded,
              'h-icon-minus': !node.isLeaf && expanded,
              'el-tree-node__expand-icon': true
            }}
            on-click={handleExpandIconClick}
          ></span >
        );
      },
    
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
    
      filterNode2(value, data) {
        console.log(data.label, data.label.indexOf(value) !== -1)
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
    
      beforeDrag(node) {
        return true;
      },
      handleNodeDrag(event, data, node, tree) {
        console.log('drag');
      },
      handleNodeDragMove(event, data, node, tree) {
        console.log('drag-move');
      },
      beforeDrop(node, targetNode, movePosition) {
        return true;
      },
      handleNodeDrop(event, data, node, targetNode, movePosition, tree) {
        console.log('drag-drop');
      },
      handleNodeDragEnter () {
        console.log('drag-enter')
      },
      handleNodeDragLeave () {
        console.log('drag-leave')
      },
      handleNodeDragEnd () {
        console.log('drag-end')
      },
    
      onScrollingY({scrollTop, percentY}) {
        console.log('树纵向滚动条正在滚动：'+JSON.stringify({ scrollTop, percentY }));
      }
    }
  };
</script>

<style lang="scss">
.el-tree--highlight-current {
  .is-current > .el-tree-node__content .custom-tree-text {
    color: white;
  }
  .custom-tree-node {
    vertical-align: middle;
  }
}
</style>
