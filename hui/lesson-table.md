# LessonTable 课表控件

<template>
  <author-info
    :version="versions['lesson-table']"
    author="唐丽萍6"
    ux="白楠"
    ui="杨丹妮，苗人越"
    standard="http://iris.hikvision.com.cn/BBG_UED/BUI_Design/bscs/v2.0/issues/101"
    reviewed
  />
</template>

## 安装

```bash
$ npm i @hui-pro/lesson-table  -D
# 或者
$ yarn add @hui-pro/lesson-table --dev
```

## 引入

```js
// main.js
import lessonTable from '@hui-pro/lesson-table';
import '@hui-pro/lesson-table/theme/index.scss';
Vue.use(lessonTable);
```

## 基础用法

<template>
  <code-box title="基础用法" description="课表组件，内置部分样式。只需要传入 行列的定义、星期数据、节次数据，以及二维课表数组，即可。">
    <h-lesson-table
      style="width: 840px; height: 480px;margin: 20px;"
      :topRow="topRow"
      :leftCol="leftCol"
      :itemDatas="itemDatas">
    </h-lesson-table>
  </code-box>
</template>

```html
<h-lesson-table
  style="width: 840px; height: 480px;margin: 20px;"
  :topRow="topRow"
  :leftCol="leftCol"
  :itemDatas="itemDatas">
</h-lesson-table>

<script>
  export default {
    name: 'lesson-table-page',
    data() {
      return {
        topRow: [{text: '11/11', subText: '周一', isToday: false}],// 数据量较多，不全部展示，只显示一个
        leftCol: [{text: '第一节'}],// 数据量较多，不全部展示，只显示一个
        itemDatas: [// 二维数组，节次
          [// 一维数组，一周内，当前节次的所有课程
            {
              'classId': '12345',
              'createTime': '2019年11月15日',
              'className': '希望一班',
              'subjectName': '语文',
              'startTime': '2019-09-12 8:00',
              'endTime': '8:45',
              'truantCount': 45,
              'leaveCount': 2,
              'deviceType': 3,
              'courseStatus': 'finish',
              'headCount': 10,
            },
            // 数据较多，不展示
          ]
        ]
      };
    }
  };
</script>
```

## 使用自定义插槽

<template>
  <code-box title="使用插槽" description="共有四种插槽，分别为：周次cell, 节次 cell, 课程内容 cell 以及表头交叉 cell">
    <h-lesson-table
      style="width: 840px; height: 480px;margin: 20px;"
      :topRow="topRow"
      :leftCol="leftCol"
      :itemDatas="itemDatas">
      <template slot="week-bar" slot-scope="scope">
        <span style="display:flex; height: 100%; justify-content: center; align-items: center;">
          自定义星期{{scope.colIndex + 1}}
        </span>
      </template>
      <template slot="cell-item" slot-scope="scope">
        <span v-if="scope.itemData && scope.itemData.subjectName" style="margin-left: 60px; line-height: 100px;font-weight: blod; color: red;">
          课程 {{scope.itemData.subjectName}}</span>
        <span v-else style="margin-left: 60px; line-height: 100px;">当前无课</span>
      </template>
    </h-lesson-table>
  </code-box>
</template>

```html
<h-lesson-table
  style="width: 840px; height: 480px;margin: 20px;"
  :topRow="topRow"
  :leftCol="leftCol"
  :itemDatas="itemDatas">
  <template slot="week-bar" slot-scope="scope">
    <span style="display:flex; height: 100%; justify-content: center; align-items: center;">
      自定义星期{{scope.colIndex + 1}}
    </span>
  </template>
  <template slot="cell-item" slot-scope="scope">
    <span v-if="scope.itemData && scope.itemData.subjectName" style="margin-left: 60px; line-height: 100px;font-weight: blod; color: red;">
      课程 {{scope.itemData.subjectName}}</span>
    <span v-else style="margin-left: 60px; line-height: 100px;">当前无课</span>
  </template>
</h-lesson-table>

<script>
  export default {
    name: 'lesson-table-page',
    data() {
      return {
        topRow: [{text: '11/11', subText: '周一', isToday: false}],// 数据量较多，不全部展示，只显示一个
        leftCol: [{text: '第一节'}],// 数据量较多，不全部展示，只显示一个
        itemDatas: [// 二维数组，节次
          [// 一维数组，一周内，当前节次的所有课程
            {
              'classId': '12345',
              'createTime': '2019年11月15日',
              'className': '希望一班',
              'subjectName': '语文',
              'startTime': '2019-09-12 8:00',
              'endTime': '8:45',
              'truantCount': 45,
              'leaveCount': 2,
              'deviceType': 3,
              'courseStatus': 'finish',
              'headCount': 10,
            },
            // 数据较多，不展示
          ]
        ]
      };
    }
  };
</script>
```

## 容器尺寸满足全部展示

当容器的尺寸, 宽高满足课表全部展示的时候，不会出现横向的滚动条。纵向，需要给容器设置一个高度，不能缺省。

<template>
  <code-box title="全部展示" description="当页面、容器大小足够展示课表时，不显示滚动条">
    <el-button @click="lessonTShow = true">打开完全展示</el-button>
    <el-dialog :area="[1420, 530]" :visible.sync="lessonTShow" title="无大小限制，完全展示的课表">
      <h-lesson-table
      style="height: 360px;margin: 20px auto;"
      :topRow="topRow"
      :leftCol="leftCol"
      :itemDatas="itemDatas">
      <template slot="week-bar" slot-scope="scope">
        <span style="display:flex; height: 100%; justify-content: center; align-items: center;">
          自定义星期{{scope.colIndex + 1}}
        </span>
      </template>
      <template slot="cell-item" slot-scope="scope">
        <span v-if="scope.itemData && scope.itemData.subjectName" style="margin-left: 60px; line-height: 100px;font-weight: blod; color: red;">
          课程 {{scope.itemData.subjectName}}</span>
        <span v-else style="margin-left: 60px; line-height: 100px;">当前无课</span>
      </template>
    </h-lesson-table>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="lessonTShow = false">
        确 定
      </el-button>
      <el-button @click="lessonTShow = false">取 消</el-button>
    </div>
    </el-dialog>
  </code-box>
</template>

```html
<el-button @click="lessonTShow = true">打开完全展示</el-button>
<el-dialog :area="[1420, 530]" :visible.sync="lessonTShow" title="无大小限制，完全展示的课表">
  <h-lesson-table
  style="height: 360px;margin: 20px auto;"
  :topRow="topRow"
  :leftCol="leftCol"
  :itemDatas="itemDatas">
  <template slot="week-bar" slot-scope="scope">
    <span style="display:flex; height: 100%; justify-content: center; align-items: center;">
      自定义星期{{scope.colIndex + 1}}
    </span>
  </template>
  <template slot="cell-item" slot-scope="scope">
    <span v-if="scope.itemData && scope.itemData.subjectName" style="margin-left: 60px; line-height: 100px;font-weight: blod; color: red;">
      课程 {{scope.itemData.subjectName}}</span>
    <span v-else style="margin-left: 60px; line-height: 100px;">当前无课</span>
  </template>
</h-lesson-table>
<div slot="footer" class="dialog-footer">
  <el-button type="primary" @click="lessonTShow = false">
    确 定
  </el-button>
  <el-button @click="lessonTShow = false">取 消</el-button>
</div>
</el-dialog>

<script>
  export default {
    name: 'lesson-table-page',
    data() {
      return {
        lessonTShow: '',
        topRow: [{text: '11/11', subText: '周一', isToday: false}],// 数据量较多，不全部展示，只显示一个
        leftCol: [{text: '第一节'}],// 数据量较多，不全部展示，只显示一个
        itemDatas: [// 二维数组，节次
          [// 一维数组，一周内，当前节次的所有课程
            {
              'classId': '12345',
              'createTime': '2019年11月15日',
              'className': '希望一班',
              'subjectName': '语文',
              'startTime': '2019-09-12 8:00',
              'endTime': '8:45',
              'truantCount': 45,
              'leaveCount': 2,
              'deviceType': 3,
              'courseStatus': 'finish',
              'headCount': 10,
            },
            // 数据较多，不展示
          ]
        ]
      };
    }
  };
</script>
```

## API

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 示例 |
| ---- | --- | -----| ----- | ------ | ---- |
| rowColName | 斜线表头的行列名，类型 | Object | - | {row: '周次', col: '节次'} | - |
| topRow | 周次表头数据。isToday: 是否为当天。| Array&lt;Object&lt;itemData&gt;&gt; | - | [] | [{text: '11/11', subText: '周一', isToday: false}] |
| leftCol | 侧边节次信息。 | Array&lt;Object&lt;itemData&gt;&gt; | - | [] | [{text: '第一节'}] |
| itemDatas | 课程数据。二维数据，节次，周几 | Array&lt; Array&lt;Object&lt;itemData&gt;&gt; &gt;| - | - | [[{'classId': null,'createTime': '2019年11月15日',className': '希望一班', 'subjectName': '语文', 'startTime': '2019-09-12 8:00', 'endTime': '8:45', 'truantCount': 45, 'leaveCount': 2, 'deviceType': 3, 'courseStatus': 'finish', 'headCount': 10,}]] |


### events

暂未开放，由各个插槽去实现。


### slots

| 插槽名 | 作用 | 域参数 |
| ------ | --- | ------ |
| cell-item | 课程内容 | {rowIndex: '节次', colIndex: '周次（周一，周二分别为 0,1）', itemData: '课程数据。Object'} |
| lesson-bar | 节次 | {rowIndex: '节次', itemData: '节次数据。Object'} |
| week-bar | 星期 | {colIndex: '周次（周一，周二分别为 0,1）', itemData: '星期几数据。Object'} |
| lesson-week | 课表左上角的斜线表格 | {rowColName} |

<script>
  const versions = require('docs/.vuepress/src/version.json');
  export default {
    name: 'lesson-table-page',
    data() {
      return {
         versions,
         lessonTShow: false,
         topRow: [
    {
      'text': '11/11',
      'subText': '周一',
      'isToday': false
    },
    {
      'text': '11/12',
      'subText': '周二',
      'isToday': false
    },
    {
      'text': '11/13',
      'subText': '周三',
      'isToday': true
    },
    {
      'text': '11/14',
      'subText': '周四',
      'isToday': false
    },
    {
      'text': '11/15',
      'subText': '周五',
      'isToday': false
    },
    {
      'text': '11/16',
      'subText': '周六',
      'isToday': false
    },
    {
      'text': '11/17',
      'subText': '周日',
      'isToday': false
    }
  ],
  leftCol: [
    {
      'text': '第一节'
    },
    {
      'text': '第二节'
    },
    {
      'text': '第三节'
    },
    {
      'text': '第四节'
    },
    {
      'text': '第五节'
    }
  ],
  itemDatas: [
    [
      {
        'classId': '12343',
        'createTime': '2019年11月15日',
        'className': '希望一班',
        'subjectName': '语文',
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 45,
        'leaveCount': 2,
        'deviceType': 3,
        'courseStatus': 'finish',
        'headCount': 10,
      },
      {
        'classId': '12343',
        'createTime': null,
        'className': '没有课',
        'subjectName': '数学',
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 15,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      null,
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      }
    ],
    [
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      null,
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      }
    ],
    [
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      }
    ],
    [
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      }
    ],
    [
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      },
      {
        'classId': null,
        'createTime': null,
        'className': '',
        'subjectName': null,
        'startTime': '2019-09-12 8:00',
        'endTime': '8:45',
        'truantCount': 0,
        'leaveCount': 0,
        'deviceType': 0,
        'courseStatus': 'finish',
        'headCount': null,
      }
    ],
  ]

      };
    },
    methods: {
    }
  };
</script>

<style>
.course-table-scrollbar-wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>