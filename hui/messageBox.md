# MessageBox 弹框

模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、成功提示、错误提示、询问信息。

## 不同尺寸的MessageBox

<template>
  <code-box title="不同尺寸的MessageBox" description="通过size属性控制MessageBox的大小">
    <el-button type="default" @click="open1">small</el-button>
    <el-button type="default" @click="open2">middle</el-button>
    <el-button type="default" @click="open3">large</el-button>
  </code-box>
</template>

```html
<el-button type="default" @click="open1">small</el-button>
<el-button type="default" @click="open2">middle</el-button>
<el-button type="default" @click="open3">large</el-button>
<script>
  export default {
    methods: {
     open1() {
        this.$alert('这是一条size为small的messageBox', '标题名称', {
          confirmButtonText: '确定',
          type:'info'
        });
      },

       open2() {
        this.$alert('这是一条size为middle的messageBox', '标题名称', {
          confirmButtonText: '确定',
          size:'middle',
          type:'info'
        });
      },

       open3() {
        this.$alert('这是一条size为large的messageBox', '标题名称', {
          confirmButtonText: '确定',
          size:'large'
          type:'info'
        });
      },
    }
  }
</script>
```

## 不同类型的MessageBox

<template>
  <code-box title="不同类型的MessageBox" description="通过type属性控制MessageBox的类型">
    <el-button :plain="true" type="success" @click="open4">success</el-button>
    <el-button :plain="true" type="info" @click="open5">info</el-button>
    <el-button :plain="true" type="warning" @click="open6">warning</el-button>
    <el-button :plain="true" type="danger" @click="open7">error</el-button>
  </code-box>
</template>

```html
  <el-button :plain="true" type="success" @click="open4">success</el-button>
  <el-button :plain="true" type="info" @click="open5">info</el-button>
  <el-button :plain="true" type="warning" @click="open6">warning</el-button>
  <el-button :plain="true" type="danger" @click="open7">error</el-button>
<script>
  export default {
    methods: {
      open4() {
        this.$msgbox({
          title:'消息',
          type:'success',
          message:'这是一条success消息'
        })
      },
      open5() {
        this.$msgbox({
          title:'消息',
          type:'info',
          message:'这是一条info消息'
        })
      },
      open6() {
        this.$msgbox({
          title:'消息',
          type:'warning',
          message:'这是一条warning消息'
        })
      },
      open7() {
        this.$msgbox({
          title:'消息',
          type:'error',
          message:'这是一条error消息'
        })
      }
    }
  }
</script>
```

## 确认消息

<template>
  <code-box title="确认消息" description="提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。">
    <el-button type="default" @click="open8">点击打开 Message Box</el-button>
  </code-box>
</template>

```html
<el-button type="default" @click="open8">点击打开 Message Box</el-button>
<script>
  export default {
    methods: {
      // 2.8.0及以上版本推荐使用新增方法onConfirm，onCancel
      open8() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          onConfirm:() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          },
          onCancel:() => {
            this.$message({
              type: 'success',
              message: '已取消删除!'
            });
          }
        })
      }，
      // 低版本请使用以下写法
      open8() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '已取消删除!'
          });
        })
      }
    }
  }
</script>
```

## 自定义按钮的内容

<template>
  <code-box title="自定义按钮的内容" description="用户自定义按钮的内容">
    <el-button type="default" @click="open9">自定义按钮</el-button>
  </code-box>
</template>

```html
<el-button type="default" @click="open9">自定义按钮</el-button>
<script>
  export default {
    methods: {
      // 2.8.0及以上版本推荐使用新增方法onConfirm，onCancel
      open9() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', {
          buttons:[
            {name:'操作1',type:'primary',action:'myAction1'},
            {name:'操作2',type:'primary',action:'myAction2'},
            {name:'取消',type:'default',action:'cancel'},
          ],
          size:'middle',
          onConfirm:(action) => {
            if(action === 'myAction1') {
              this.$message({
                type: 'success',
                message: `已执行myAction1!`
              });
            } else if(action === 'myAction2') {
              this.$message({
                type: 'success',
                message: `已执行myAction2!`
              });
            }
          },
          onCancel:() => {
            this.$message({
              type: 'success',
              message: '已取消删除!'
            });
          }
        })
      },
      // 低版本请使用以下写法
      open9() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', {
          buttons:[
            {name:'操作1',type:'primary',action:'myAction1'},
            {name:'操作2',type:'primary',action:'myAction2'},
            {name:'取消',type:'default',action:'cancel'},
          ],
          size:'middle',
          type: 'question'
        }).then((action) => {
          if(action === 'myAction1') {
            this.$message({
              type: 'success',
              message: `已执行myAction1!`
            });
          } else if(action === 'myAction2') {
            this.$message({
              type: 'success',
              message: `已执行myAction2!`
            });
          }
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '已取消删除!'
          });
        })
      }
    }
  }
</script>
```

<!-- ## 自定义

<template>
  <code-box title="自定义" description="可自定义配置不同内容。">
    <el-button type="text" @click="open10">点击打开 Message Box</el-button>
  </code-box>
</template>

```html
<el-button type="text" @click="open10">点击打开 Message Box</el-button>
<script>
  export default {
    methods: {
      open10() {
        const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '内容可以是 '),
            h('i', { style: 'color: teal' }, 'VNode')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        });
      },
    }
  }
</script>
``` -->

<!-- ## 使用 HTML 片段 -->

<!-- 将`dangerouslyUseHTMLString`属性设置为 true，`message` 就会被当作 HTML 片段处理。 -->
<!-- <template>
  <code-box title="使用 HTML 片段" description="`message` 属性支持传入 HTML 片段">
    <el-button type="text" @click="open11">点击打开 Message Box</el-button>
  </code-box>
</template>

```html
<el-button type="text" @click="open11">点击打开 Message Box</el-button>
<script>
  export default {
    methods: {
      open11() {
        this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
          dangerouslyUseHTMLString: true
        });
      }
    }
  }
</script>
``` -->
<!--
::: warning 警告
`message` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。因此在 `dangerouslyUseHTMLString` 打开的情况下，请确保 `message` 的内容是可信的，**永远不要**将用户提交的内容赋值给 `message` 属性。
::: -->

<!-- ## 区分取消与关闭

<template>
  <code-box title="区分取消与关闭" description="有些场景下，点击取消按钮与点击关闭按钮有着不同的含义。">
    <el-button type="default" @click="open12">点击打开MessageBox</el-button>
  </code-box>
</template>

```html
<el-button type="default" @click="open12">点击打开MessageBox</el-button>
<script>
  export default {
    methods: {
      open12() {
        this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', {
          distinguishCancelAndClose: true,
          cancelButtonText: '放弃修改',
          confirmButtonText: '保存'
        }).then(() => {
          this.$message({
            type: 'info',
            message: '保存修改'
          });
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: action === 'cancel'
              ? '放弃保存并离开页面'
              : '停留在当前页面'
          })
        });
      }
    }
  }
</script>
``` -->

## 全局方法

Element 为 Vue.prototype 添加了如下全局方法：$msgbox, $alert, $confirm 和 $prompt。因此在 vue instance 中可以采用本页面中的方式调用 `MessageBox`。

## 单独引用

单独引入 `MessageBox`：

```javascript
import { MessageBox } from 'hui';
```

对应于上述四个全局方法的调用方法依次为：MessageBox, MessageBox.alert, MessageBox.confirm 和 MessageBox.prompt。

<script>
export default {
  methods: {
    open1() {
      this.$alert('这是一条size为small的messageBox', '标题名称', {
        confirmButtonText: '确定',
        type:'info'
      });
    },

      open2() {
      this.$alert('这是一条size为middle的messageBox', '标题名称', {
        confirmButtonText: '确定',
        size:'middle',
        type:'info'
      });
    },

      open3() {
      this.$alert('这是一条size为large的messageBox', '标题名称', {
        confirmButtonText: '确定',
        size:'large',
        type:'info'
      });
    },

    open8() {
      this.$confirm('此操作将永久删除该文件, 是否继续？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        onConfirm:() => {
          setTimeout(() => {
            this.$message({
              message: '删除成功!',
              type: 'success'
            });
          }, 200);
        },
        onCancel:() => {
          setTimeout(() => {
            this.$message({
              message: '已取消删除!',
              type: 'info'
            });
          }, 200);
        }
      }).then(() => {
        console.log('删除成功!')
      })
    },

    open9() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', {
        buttons:[
          {name:'操作1',type:'primary',action:'myAction1'},
          {name:'操作2',type:'primary',action:'myAction2'},
          {name:'取消',type:'default',action:'cancel'},
        ],
        size:'middle',
        onConfirm:(action) => {
          if(action === 'myAction1') {
            this.$message({
              type: 'success',
              message: `已执行myAction1!`
            });
          } else if (action === 'myAction2'){
            this.$message({
              type: 'success',
              message: `已执行myAction2!`
            });
          }
        },
        onCancel:() => {
          this.$message({
            type: 'success',
            message: '已取消删除!'
          });
        }
      }).then((action) => {
        console.log(`已执行${action}!`)
      })
    },

    // open10() {
    //   const h = this.$createElement;
    //   this.$msgbox({
    //     title: '消息',
    //     message: h('p', null, [
    //       h('span', null, '内容可以是 '),
    //       h('i', { style: 'color: teal' }, 'VNode')
    //     ]),
    //     showCancelButton: true,
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     beforeClose: (action, instance, done) => {
    //       if (action === 'confirm') {
    //         instance.confirmButtonLoading = true;
    //         instance.confirmButtonText = '执行中...';
    //         setTimeout(() => {
    //           done();
    //           setTimeout(() => {
    //             instance.confirmButtonLoading = false;
    //           }, 300);
    //         }, 3000);
    //       } else {
    //         done();
    //       }
    //     }
    //   }).then(action => {
    //     setTimeout(() => {
    //       this.$message({
    //         type: 'info',
    //         message: 'action: ' + action
    //       });
    //     }, 200);
    //   });
    // },

    // open11() {
    //   this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
    //     dangerouslyUseHTMLString: true
    //   });
    // },

    // open12() {
    //   this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', {
    //     type:'question',
    //     distinguishCancelAndClose: true,
    //     cancelButtonText: '放弃修改',
    //     confirmButtonText: '保存'
    //   }).then(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '保存修改'
    //     });
    //   })
    //   .catch(action => {
    //     this.$message({
    //       type: 'info',
    //       message: action === 'cancel'
    //         ? '放弃保存并离开页面'
    //         : '停留在当前页面'
    //     })
    //   });
    // },

    open4() {
      this.$msgbox({
        title:'消息',
        type:'success',
        message:'这是一条success消息'
      })
    },
    open5() {
      this.$msgbox({
        title:'消息',
        type:'info',
        message:'这是一条info消息'
      })
    },
    open6() {
      this.$msgbox({
        title:'消息',
        type:'warning',
        message:'这是一条warning消息'
      })
    },
    open7() {
      this.$msgbox({
        title:'消息',
        type:'error',
        message:'这是一条error消息'
      })
    }
  }
};
</script>

### Options

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | MessageBox 标题 | string | — | — |
| message (confirm中的message参数,2.0版本中已去除) <Badge text="非兼容" type="warning"/>  | MessageBox 消息正文内容 | string / VNode | — | — |
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 片段处理 | boolean | — | false |
| type | 消息类型，用于显示图标 | string | success/info/warning/question/error | — |
| size <Badge text="2.0+"/> | 尺寸 | string | small/middle/large | small |
| customClass | MessageBox 的自定义类名 | string | — | — |
| onConfirm <Badge text="2.8.0+"/> | MessageBox 的确认回调 | function(action) | — | — |
| onCancel <Badge text="2.8.0+"/> | MessageBox 的取消回调 | function(action) | — | — |
| callback | 若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调 | function(action, instance)，action 的值为'confirm'或'cancel', instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法 | — | — |
| beforeClose | MessageBox 关闭前的回调，会暂停实例的关闭 | function(action, instance, done)，action 的值为'confirm'或'cancel'；instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法；done 用于关闭 MessageBox 实例 | — | — |
| lockScroll | 是否在 MessageBox 出现时将 body 滚动锁定 | boolean | — | true |
| showCancelButton | 是否显示取消按钮 | boolean | — | false（以 confirm 和 prompt 方式调用时为 true） |
| showConfirmButton | 是否显示确定按钮 | boolean | — | true |
| cancelButtonText | 取消按钮的文本内容 | string | — | 取消 |
| confirmButtonText | 确定按钮的文本内容 | string | — | 确定 |
| buttons <Badge text="2.0+"/> | 自定义按钮的内容 | Array | 示例传参:<br> buttons:[{ name:'test1',type:'primary',action:'myAction1'},{name:'test2',type:'primary',action:'myAction2'},name:'取消',action:'cancel']<br>回调函数中通过不同的action来做相应操作 | — |
| cancelButtonClass | 取消按钮的自定义类名 | string | — | — |
| confirmButtonClass | 确定按钮的自定义类名 | string | — | — |
| closeOnClickModal <Badge text="非兼容" type="warning"/> (默认值修改为false) | 是否可通过点击遮罩关闭 MessageBox | boolean | — | false |
| closeOnPressEscape <Badge text="非兼容" type="warning"/> (默认值修改为false) | 是否可通过按下 ESC 键关闭 MessageBox | boolean | — | false |
| closeOnHashChange <Badge text="2.0+"/> | 是否在 hashchange 时关闭 MessageBox | boolean | — | true |
| showInput | 是否显示输入框 | boolean | — | false（以 prompt 方式调用时为 true）|
| inputPlaceholder | 输入框的占位符 | string | — | — |
| inputType <Badge text="2.0+"/>| 输入框的类型 | string | — | text |
| inputValue | 输入框的初始文本 | string | — | — |
| inputPattern | 输入框的校验表达式 | regexp | — | — |
| inputValidator | 输入框的校验函数。可以返回布尔值或字符串，若返回一个字符串, 则返回结果会被赋值给 inputErrorMessage | function | — | — |
| inputErrorMessage | 校验未通过时的提示文本 | string | — | 输入的数据不合法! |
