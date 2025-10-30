# Test 测试

常用的操作按钮

## 基础用法

<template>
  <code-box>
  <el-tree 
    :data="treeData" 
    :props="defaultProps">
  </el-tree>
  <br/>
  <el-button type="primary">
    主要按钮
  </el-button>
  <br/>
  <br/>
  <el-input-number 
    v-model="num1" 
    :min="1" 
    :max="10" 
    :reset-default=true>
  </el-input-number>
  <br/>
  <br/>
  <el-select v-model="value" placeholder="请选择"> 
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <br/>
  <br/>
  <el-autocomplete
    class="inline-input"
    v-model="state1"
    :fetch-suggestions="querySearch"
    placeholder="请输入内容"
    kind="surface"
    ref='state1'
    icon="h-icon-search">
  </el-autocomplete>
  <br/>
  <br/>
  <el-cascader
    :options="options2"
    v-model="selectedOptions">
  </el-cascader>
  <br/>
  <br/>
  <el-switch
    v-model="value1"
    active-text=""
    inactive-text="">
  </el-switch>
  <br/>
  <br/>
  <el-slider 
    v-model="slideValue">
  </el-slider>
  <br/>
  <br/>
  <el-time-select
    v-model="value2"
    :picker-options="{
      start: '08:30',
      step: '03:00',
      end: '18:30'
    }"
    placeholder="选择时间">
</el-time-select>
<br/>
<br/>
<el-rate
  v-model="value3"
  :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
</el-rate>
<br/>
<br/>
<el-color-picker 
  v-model="color1">
</el-color-picker>
<br/>
<br/>
<el-transfer 
  v-model="value15" 
  :data="data">
</el-transfer>
<br/>
<br/>
<el-form 
  :model="ruleForm" 
  :rules="rules" 
  ref="ruleForm" 
  label-width="100px" 
  class="demo-ruleForm">
  <el-form-item label="活动名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="活动时间" item-group required>
    <el-col :span="11">
      <el-form-item prop="date1" :show-label="false">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="date2" :show-label="false">
        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item label="即时配送" prop="delivery">
    <el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="活动性质" prop="type">
    <el-checkbox-group v-model="ruleForm.type">
      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
      <el-checkbox label="地推活动" name="type"></el-checkbox>
      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="特殊资源" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="活动形式" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>
  <el-form-item class="demo-form-btns">
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
    <el-button @click="resetValidates('ruleForm')">清除校验信息</el-button>
  </el-form-item>
</el-form>
<br/>
<br/>
<el-tag>标签一</el-tag>
<el-tag type="gray">标签二</el-tag>
<el-tag type="primary">标签三</el-tag>
<el-tag type="success">标签四</el-tag>
<el-tag type="warning">标签五</el-tag>
<el-tag type="danger">标签六</el-tag>
<br/>
<br/>
<el-progress :percentage="0"></el-progress>
<el-progress :percentage="70"></el-progress>
<el-progress :percentage="100" status="success"></el-progress>
<el-progress :percentage="50" status="exception"></el-progress>
<br/>
<br/>
<el-badge :value="3" class="item">
  <el-button size="small">回复</el-button>
  <el-alert
    title="成功提示的文案"
    type="success"
    simple>
  </el-alert>
</el-badge>  
<br/>
<br/>
<el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
  <el-menu-item index="1">处理中心</el-menu-item>
  <el-submenu index="2" title="我的工作台">
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
  </el-submenu>
  <el-menu-item index="3">订单管理</el-menu-item>
</el-menu>
<br/>
<br/>
<!-- 有点小问题，但是没报错，下划线没有跟随 -->
<el-tabs v-model="activeName">
  <el-tab-pane label-icon="h-icon-message" name="first">用户管理</el-tab-pane>
  <el-tab-pane label-icon="h-icon-setting" name="second">配置管理</el-tab-pane>
  <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
  <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
</el-tabs>
<br/>
<br/>
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
</el-breadcrumb>
<br/>
<br/>
<el-dropdown>
  <span class="el-dropdown-link">
    下拉菜单<i class="el-icon-caret-bottom el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>黄金糕</el-dropdown-item>
    <el-dropdown-item>狮子头</el-dropdown-item>
    <el-dropdown-item>螺蛳粉</el-dropdown-item>
    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
<br/>
<br/>
<el-steps :space="140" :active="active" finish-status="success">
  <el-step title="步骤 1"></el-step>
  <el-step title="步骤 2"></el-step>
  <el-step title="步骤 3"></el-step>
</el-steps>
<br/>
<br/>
<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  size="small"
  :before-close="handleClose">
  你好啊
<span slot="footer" class="dialog-footer">
  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  <el-button @click="dialogVisible = false">取 消</el-button>
</span>
</el-dialog>
<br/>
<br/>
<el-tooltip class="item" effect="dark" content="Top Left 提示文字,Top Left 提示文字,Top Left 提示文字" placement="top-start">
  <el-button>上左</el-button>
</el-tooltip>
<br/>
<br/>
<el-popover
  ref="popover1"
  placement="top-start"
  title="标题"
  width="200"
  trigger="hover"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
</el-popover>
<el-button v-popover:popover1>hover 激活</el-button>
<br/>
<br/>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span style="line-height: 36px;">卡片名称</span>
    <el-button style="float: right;" type="primary">操作按钮</el-button>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
      <el-carousel height="150px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
</el-card>
<br/>
<br/>
<el-collapse v-model="activeNames">
  <el-collapse-item title="一致性 Consistency" name="1">
    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
  </el-collapse-item>
  <el-collapse-item title="反馈 Feedback" name="2">
    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
  </el-collapse-item>
  <el-collapse-item title="效率 Efficiency" name="3">
    <div>简化流程：设计简洁直观的操作流程；</div>
    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
  </el-collapse-item>
  <el-collapse-item title="可控 Controllability" name="4">
    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
  </el-collapse-item>
</el-collapse>
<br/>
<br/>
<div class="el-demo1__wrap">
  <el-scrollbar
    wrap-class="el-demo1-scrollbar__wrap"
    view-class="el-demo1-scrollbar__view"
    tag="ul">
      <li>Radio单选框</li>
      <li>Checkbox多选框</li>
      <li>Input输入框</li>
      <li>InputNumber计数器</li>
      <li>Select选择器</li>
      <li>Cascader级联选择器</li>
      <li>Switch开关</li>
      <li>Slider滑块</li>
      <li>TimePicker时间选择器</li>
      <li>DatePicker日期选择器</li>
      <li>DateTimePicker日期时间选择器</li>
      <li>Upload上传</li>
  </el-scrollbar>
</div>
<br/>
<br/>
<el-pagination layout="prev, pager, next" :total="50"></el-pagination>
<br/>
<br/>
<el-button :plain="true" @click="open">打开消息提示</el-button>
<br/>
<br/>
<el-table
  :data="tableData"
  stripe
  border
  max-height="200"
  style="width: 100%">
  <el-table-column
    prop="date"
    label="日期"
    width="180">
  </el-table-column>
  <el-table-column
    prop="name"
    show-overflow-tooltip
    label="品牌"
    width="150">
  </el-table-column>
  <el-table-column
    prop="address"
    label="地址">
  </el-table-column>
</el-table>
<el-table
  :data="tableData"
  border
  style="width: 100%">
  <el-table-column
    label="日期"
    width="180">
    <template slot-scope="scope">
      <el-icon name="time"></el-icon>
      <span style="margin-left: 10px">{{ scope.row.date }}</span>
    </template>
  </el-table-column>
  <el-table-column
    label="品牌"
    width="180">
    <template slot-scope="scope">
      <el-popover trigger="hover" placement="top">
        <p>品牌: {{ scope.row.name }}</p>
        <p>地址: {{ scope.row.address }}</p>
        <div slot="reference" class="name-wrapper">
          <el-tag>{{ scope.row.name }}</el-tag>
        </div>
      </el-popover>
    </template>
  </el-table-column>
  <el-table-column label="操作">
    <template slot-scope="scope">
      <el-button
        size="small"
        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
      <el-button
        size="small"
        type="danger"
        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
    </template>
  </el-table-column>
</el-table>
<br/>
<br/>
<el-button type="primary" @click="openFullScreen" v-loading="fullscreenLoading">
  显示整页加载，3 秒后消失
</el-button>
<el-button type="primary" @click="openServiceLoading">
  显示整页加载(Loading服务)
</el-button>
  </code-box>
</template>

``` vue
<el-button type="primary">主要按钮</el-button>
```
<script>
export default {
  data() {
    const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
    return {
      tableData: [{
        date: '2018-01-02',
        name: '海康威视',
        address: '杭州市滨江区阡陌路555号'
      }, {
        date: '2018-01-04',
        name: '海康威视',
        address: '杭州市滨江区金沙江路 1517 弄'
      }, {
        date: '2018-01-01',
        name: '海康威视',
        address: '杭州市滨江区金沙江路 1519 弄'
      }, {
        date: '2018-01-03',
        name: '海康威视',
        address: '杭州市滨江区金沙江路 1516 弄'
      }],
      active: 0,
      activeNames: ['1'],
      dialogVisible: false,
      activeName: 'second',
      activeIndex: '1',
        activeIndex2: '1',
      fullscreenLoading: false,
      treeData: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
      ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
      data: generateData(),
      value15: [1, 4],
      color1: '#20a0ff',
      value12:'20',
      state1: '', 
      value3:null,
      value1:'', 
      slideValue: 0,
      value2:'',     
      selectedOptions: [],
      input: '',
      num1: 1, 
      options2: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
    }
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      openFullScreen() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 2000);
      },
      openServiceLoading() {
        let loadingInstance = this.$loading({ fullscreen: true });
        setTimeout(() => {
          loadingInstance.close();
        }, 2000);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      resetValidates(formName) {
        this.$refs[formName].resetValidates();
      },
    createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
  querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      open() {
        this.$message('这是一条消息提示');
      },
      //  open() {
      //   this.$alert('这是一段内容', '标题名称', {
      //     confirmButtonText: '确定',
      //     callback: action => {
      //       this.$message({
      //         type: 'info',
      //         message: `action: ${ action }`
      //       });
      //     }
      //   });},
      //   open() {
      //   const h = this.$createElement;

      //   this.$notify({
      //     title: '标题名称',
      //     message: h('i', { style: 'color: teal'}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
      //   });
      // },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
  },   

    mounted() {
      this.restaurants = [
          { "value": "perfect三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" }
        ];
    }
}
</script>
<style>
    .el-demo1__wrap {
        height:200px;
    }
    .el-demo1-scrollbar__wrap {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>