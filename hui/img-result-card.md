# ImgResultCard 图片结果卡片


## 安装

```bash
$ npm i @hui-pro/img-result-card -D
# 或者
$ yarn add @hui-pro/img-result-card --dev
```

## 引入

```js
import imgResultCard from '@hui-pro/img-result-card';
import '@hui-pro/img-result-card/theme/index.scss';
Vue.use(imgResultCard);
```

## 纵向卡片

<template>
  <code-box title="" description="根据data渲染卡片">
    <el-row :gutter="8">
      <el-col :span="6">
        <h-img-result-card :data="testData" show-title  @click-pic="clickPicHandle"/>
      </el-col>
      <el-col :span="6">
        <h-img-result-card :data="testData" show-title  @click-pic="clickPicHandle"/>
      </el-col>
    </el-row>
  </code-box>
</template>

```html
<template>
  <el-row :gutter="8">
    <el-col :span="6">
      <h-img-result-card
        :data="testData"
        show-title
        @click-pic="clickPicHandle"
      />
    </el-col>
    <el-col :span="6">
      <h-img-result-card
        :data="testData"
        show-title
        @click-pic="clickPicHandle"
      />
    </el-col>
  </el-row>
</template>

<script>
  import './assets/img/img-result-card/fonts/lidaicon.scss';
  export default {
    data() {
      return {
        isChoosed: false,
        thumbnailData: {
          pic: 'https://s2.ax1x.com/2019/03/19/AupWvt.jpg',
          thumbnail: {
            w: 0.182031,
            x: 0.447656,
            h: 0.811111,
            y: 0.1875
          }
        },
        testData0: {
          pic: 'https://s2.ax1x.com/2019/03/19/AupWvt.jpg',
          info: [
            {
              label: '采集地点',
              content: '江陵路明月路口'
            },
            {
              label: '采集时间',
              content: '2017-11-21 07:08:09'
            },
            {
              label: '车道',
              content: '车道3'
            },
            {
              label: '主品牌',
              content: '奔驰'
            },
            {
              label: '车辆类型',
              content: '轿车'
            }
          ]
        },
        testData: {
          pic: 'https://s2.ax1x.com/2019/03/19/AupWvt.jpg',
          info: [
            {
              icon: 'lidaicon-vs',
              keynote: true,
              content: '浙A12345'
            },
            { icon: 'lidaicon-map-local-f-lg', content: '江陵路明月路口' },
            {
              icon: 'lidaicon-body-behavior-lg-f',
              content: '2017-11-21 07:08:09'
            }
          ],
          btns: [
            {
              icon: 'lidaicon-h-document',
              title: '编辑',
              click(data) {
                alert(data.pic);
              }
            },
            {
              icon: 'lidaicon-map-local',
              title: '定位',
              click(data) {
                alert(data.pic);
              }
            },
            {
              icon: 'lidaicon-cart-add',
              title: '添加',
              click(data) {
                alert(data.pic);
              }
            },
            {
              icon: 'lidaicon-photo-add',
              title: '查看',
              click(data) {
                alert(data.pic);
              }
            },
            {
              icon: 'lidaicon-video-preview',
              title: '预览',
              click(data) {
                alert(data.pic);
              }
            },
            {
              icon: 'lidaicon-face-id-search',
              title: '搜索',
              click(data) {
                alert(data.pic);
              }
            }
          ],
          detail(data) {
            alert(data.pic);
          }
        },
        testData2: {
          pic: 'https://s2.ax1x.com/2019/03/19/AupWvt.jpg',
          info: [
            {
              icon: 'lidaicon-vs',
              keynote: true,
              content: '浙A12345'
            },
            { icon: 'lidaicon-map-local-f-lg', content: '阡陌路物联网街路口' },
            {
              icon: 'lidaicon-body-behavior-lg-f',
              content: '2017-11-21 07:08:09'
            }
          ],
          btns: [
            {
              icon: 'lidaicon-h-document',
              title: '编辑',
              click(data) {
                alert(data.pic);
              }
            },
            {
              icon: 'lidaicon-map-local',
              title: '定位',
              click(data) {
                alert(data.pic);
              }
            }
          ],
          detail(data) {
            alert(data.pic);
          }
        },
        testData3: {
          pic: 'https://s2.ax1x.com/2019/04/19/Epxy1U.jpg',
          label: '原图'
        },
        testData4: {
          pic: 'https://s2.ax1x.com/2019/04/19/EpxW7R.jpg',
          label: '抓拍图'
        },
        testData5: {
          pic: 'https://s2.ax1x.com/2019/03/19/AupWvt.jpg',
          info: [
            {
              icon: 'lidaicon-vs',
              keynote: true,
              content: '浙A12345'
            },
            { icon: 'lidaicon-map-local-f-lg', content: '江陵路明月路口' },
            {
              icon: 'lidaicon-body-behavior-lg-f',
              content: '2017-11-21 07:08:09'
            }
          ]
        },
        testData6: {
          pic: 'https://s2.ax1x.com/2019/03/19/AupWvt.jpg',
          info: [
            {
              icon: 'lidaicon-vs',
              keynote: true,
              content: '浙A56954'
            },
            { icon: 'lidaicon-map-local-f-lg', content: '阡陌路物联网街路口' },
            {
              icon: 'lidaicon-body-behavior-lg-f',
              content: '2017-11-21 07:08:09'
            }
          ]
        }
      };
    },
    methods: {
      clickHandle(data) {
        alert('click event' + data.pic);
      },
      clickPicHandle(data) {
        alert('clickPic event' + data.pic);
      },
      chooseHandle(data) {
        this.isChoosed = !this.isChoosed;
      }
    }
  };
</script>
```

## 横向卡片

<template>
   <code-box title="" description="横向卡片">
    <el-row :gutter="8">
      <el-col :span="20">
        <h-img-result-card horizontal :data="testData0"/>
      </el-col>
    </el-row>
  </code-box>
</template>

```html
<template>
  <el-row :gutter="8">
    <el-col :span="20">
      <h-img-result-card horizontal :data="testData0"/>
    </el-col>
  </el-row>
</template>

<script>
  ......
<script>
```

## 自定义宽高

<template>
  <code-box title="" description="自定义宽高比">
    <el-row :gutter="8">
      <el-col :span="6">
        <h-img-result-card
          :pic-size="{
            width: 224,
            height: 126
          }"
          :data="testData"
        />
      </el-col>
      <el-col :span="6">
        <h-img-result-card
          :pic-size="{
            width: 224,
            height: 168
          }"
          :data="testData"
        />
      </el-col>
    </el-row>
  </code-box>
</template>

```html
<template>
  <code-box title="" description="自定义宽高">
    <el-row :gutter="8">
      <el-col :span="6">
        <h-img-result-card
          :pic-size="{
            width: 224,
            height: 126
          }"
          :data="testData"
        />
      </el-col>
      <el-col :span="6">
        <h-img-result-card
          :pic-size="{
            width: 224,
            height: 168
          }"
          :data="testData"
        />
      </el-col>
    </el-row>
  </code-box>
</template>

<script>
  ......
<script>
```

## 切换图片展示模式

<template>
  <code-box title="" description="切换图片展示模式">
    <el-row :gutter="8">
      <el-col :span="6">
        cover(默认)
        <h-img-result-card pic-mode="cover" :data="testData"/>
      </el-col>
      <el-col :span="6">
        contain
        <h-img-result-card  pic-mode="contain" :data="testData"/>
      </el-col>
    </el-row>
  </code-box>
</template>

```html
<template>
  <el-row :gutter="8">
    <el-col :span="6">
      cover(默认)
      <h-img-result-card pic-mode="cover" :data="testData" />
    </el-col>
    <el-col :span="6">
      contain
      <h-img-result-card pic-mode="contain" :data="testData" />
    </el-col>
  </el-row>
</template>

<script>
  ......
<script>
```

## 缩略图裁剪

<template>
  <code-box>
    <el-row :gutter="32">
        <el-col :span="6">
            <h-img-result-card :data="thumbnailData"/>
        </el-col>
    </el-row>
  </code-box>
</template>

```html
<template>
  <el-row :gutter="32">
    <el-col :span="6">
      <h-img-result-card :data="thumbnailData" />
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        thumbnailData: {
          pic: 'https://s2.ax1x.com/2019/03/19/AupWvt.jpg',
          thumbnail: {
            w: 0.182031,
            x: 0.447656,
            h: 0.811111,
            y: 0.1875
          }
        }
      };
    }
  };
</script>
```

## 可选择激活模式

<template>
  <code-box title="" description="可选择激活模式">
    <el-row :gutter="8">
      <el-col :span="6">
        可选择模式
        <h-img-result-card choosable :is-choosed="isChoosed" :data="testData" @choose="chooseHandle"/>
      </el-col>
      <el-col :span="6">
        激活模式
        <h-img-result-card active :data="testData"/>
      </el-col>
    </el-row>
  </code-box>
</template>

```html
<template>
  <el-row :gutter="8">
    <el-col :span="6">
      可选择模式
      <h-img-result-card choosable :is-choosed="isChoosed" :data="testData" @choose="chooseHandle"/>
    </el-col>
    <el-col :span="6">
      激活模式
      <h-img-result-card active :data="testData"/>
    </el-col>
  </el-row>
</template>

<script>
  ......
<script>
```

## 双图模式

<template>
  <code-box title="" description="双图模式">
    <el-row :gutter="8">
      <el-col :span="12">
        普通模式
        <h-img-result-card-group>
          <h-img-result-card :data="testData5"/>
          <h-img-result-card :data="testData6"/>
          <div slot="extra" class="vehicle-num">
            <h-vehicle-plate-tag color="blue" value="浙A59191" />
            <label>超速比：<strong>48%</strong></label>
            <label>距离：<span>1.0km</span></label>
            <el-button type="link">查看详情</el-button>
          </div>
        </h-img-result-card-group>
      </el-col>
      <el-col :span="12">
        可选择模式
        <h-img-result-card-group  choosable :is-choosed="isChoosed"  @choose="chooseHandle">
          <h-img-result-card :data="testData5"/>
          <h-img-result-card :data="testData6"/>
          <div slot="extra" class="vehicle-num">
            <h-vehicle-plate-tag color="blue" value="浙A59191" />
            <label>超速比：<strong>48%</strong></label>
            <label>距离：<span>1.0km</span></label>
            <el-button type="link">查看详情</el-button>
          </div>
        </h-img-result-card-group>
      </el-col>
    </el-row>
  </code-box>
</template>

<style lang="scss">
  .vehicle-num {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    align-items: center;
    background-color: #fafafa;
    label {
      line-height: 24px;
      color: #999999;
      > strong {
        color: red;
      }
      > span {
        color: #4d4d4d;
      }
    }
  }
</style>

```html
<template>
  <el-row :gutter="8">
    <el-col :span="12">
      普通模式
      <h-img-result-card-group>
        <h-img-result-card :data="testData5"/>
        <h-img-result-card :data="testData6"/>
        <div slot="extra" class="vehicle-num">
          <h-vehicle-plate-tag color="blue" value="浙A59191" />
          <label>超速比：<strong>48%</strong></label>
          <label>距离：<span>1.0km</span></label>
          <el-button type="link">查看详情</el-button>
        </div>
      </h-img-result-card-group>
    </el-col>
    <el-col :span="12">
      可选择模式
      <h-img-result-card-group  choosable :is-choosed="isChoosed"  @choose="chooseHandle">
        <h-img-result-card :data="testData5"/>
        <h-img-result-card :data="testData6"/>
        <div slot="extra" class="vehicle-num">
          <h-vehicle-plate-tag color="blue" value="浙A59191" />
          <label>超速比：<strong>48%</strong></label>
          <label>距离：<span>1.0km</span></label>
          <el-button type="link">查看详情</el-button>
        </div>
      </h-img-result-card-group>
    </el-col>
  </el-row>
</template>

<style lang="scss">
  .vehicle-num {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    line-height: 24px;
    background-color: #fafafa;
    .el-button {
      height: 24px;
      line-height: 24px;
    }
    label {
      line-height: 24px;
      color: #999999;
      > strong {
        color: red;
      }
      > span {
        color: #4d4d4d;
      }
    }
  }
</style>

<script>
  ......
<script>
```

## 带相似度双图模式

<template>
  <code-box title="" description="带相似度双图模式">
    <el-row :gutter="8">
      <el-col :span="12">
        <h-img-result-card-group similar :similar-value="84.56" similar-bg="danger">
          <h-img-result-card :data="testData3"/>
          <h-img-result-card :data="testData4"/>
        </h-img-result-card-group>
      </el-col>
    </el-row>
  </code-box>
</template>

```html
<template>
  <el-row :gutter="8">
    <el-col :span="12">
      <h-img-result-card-group
        similar
        :similar-value="84.56"
        similar-bg="danger"
      >
        <h-img-result-card :data="testData3" />
        <h-img-result-card :data="testData4" />
      </h-img-result-card-group>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        testData3: {
          pic: 'https://s2.ax1x.com/2019/04/19/Epxy1U.jpg',
          label: '原图'
        },
        testData4: {
          pic: 'https://s2.ax1x.com/2019/04/19/EpxW7R.jpg',
          label: '抓拍图'
        }
      };
    }
  };
</script>
```

## 更多插槽

<template>
  <code-box title="" description="卡片支持更多插槽">
    <el-row :gutter="8">
      <el-col :span="6">
        <h-img-result-card :data="testData">
          <template slot="info" slot-scope="{ item }">
            <h-vehicle-plate-tag
              v-if="item.plate"
              color="blue"
              :value="item.plate"
            />
            <i v-if="item.icon" :class="item.icon" />
            <label v-if="item.label" v-text="item.label" />
            <span v-text="item.content" />
          </template>
          <span style="color:#fff" slot="topLeft">slots.topLeft</span>
          <span style="color:#fff" slot="topRight">slots.topRight</span>
          <span style="color:#fff" slot="bottomLeft">slots.bottomLeft</span>
          <span style="color:#fff" slot="bottomRight">slots.bottomRight</span>
        </h-img-result-card>
      </el-col>
    </el-row>
  </code-box>
</template>

```html
<template>
  <el-row :gutter="8">
    <el-col :span="6">
      <h-img-result-card :data="testData">
        <template slot="info" slot-scope="{ item }">
          <h-vehicle-plate-tag
            v-if="item.plate"
            color="blue"
            :value="item.plate"
          />
          <i v-if="item.icon" :class="item.icon" />
          <label v-if="item.label" v-text="item.label" />
          <span v-text="item.content" />
        </template>
        <span style="color:#fff" slot="topLeft">slots.topLeft</span>
        <span style="color:#fff" slot="topRight">slots.topRight</span>
        <span style="color:#fff" slot="bottomLeft">slots.bottomLeft</span>
        <span style="color:#fff" slot="bottomRight">slots.bottomRight</span>
      </h-img-result-card>
    </el-col>
  </el-row>
</template>
```

<script>
const versions = require('docs/.vuepress/src/version.json');
import './assets/img/img-result-card/fonts/lidaicon.scss';

export default {
  data() {
    return {
      versions,
      isChoosed: false,
      thumbnailData: {
        pic: 'https://s2.ax1x.com/2019/03/19/AupWvt.jpg',
        thumbnail: {
          w: 0.182031,
          x: 0.447656,
          h: 0.811111,
          y: 0.1875
        }
      },
      testData0: {
        pic: 'https://s2.ax1x.com/2019/03/19/AupWvt.jpg',
        info: [
          {
            label: '采集地点',
            content: '江陵路明月路口'
          },
          {
            label: '采集时间',
            content: '2017-11-21 07:08:09'
          },
          {
            label: '车道',
            content: '车道3'
          },
          {
            label: '主品牌',
            content: '奔驰'
          },
          {
            label: '车辆类型',
            content: '轿车'
          }
        ]
      },
      testData: {
        pic: 'https://s2.ax1x.com/2019/03/19/AupWvt.jpg',
        info: [
          {
            plate: '浙A12345'
          },
          {
            icon: 'lidaicon-vs',
            keynote: true,
            content: '浙A12345'
          },
          {
            icon: 'lidaicon-map-local-f-lg',
            content: '江陵路明月路口'
          },
          {
            icon: 'lidaicon-body-behavior-lg-f',
            content: '2017-11-21 07:08:09'
          }
        ],
        btns: [
          {
            icon: 'lidaicon-h-document',
            title: '编辑',
            click(data) {
              alert(data.pic);
            }
          },
          {
            icon: 'lidaicon-map-local',
            title: '定位',
            click(data) {
              alert(data.pic);
            }
          },
          {
            icon: 'lidaicon-cart-add',
            title: '添加',
            click(data) {
              alert(data.pic);
            }
          },
          {
            icon: 'lidaicon-photo-add',
            title: '查看',
            click(data) {
              alert(data.pic);
            }
          },
          {
            icon: 'lidaicon-video-preview',
            title: '预览',
            click(data) {
              alert(data.pic);
            }
          },
          {
            icon: 'lidaicon-face-id-search',
            title: '搜索',
            click(data) {
              alert(data.pic);
            }
          }
        ],
        detail(data) {
          alert(data.pic);
        }
      },
      testData2: {
        pic: 'https://s2.ax1x.com/2019/03/19/AupWvt.jpg',
        info: [
          {
            icon: 'lidaicon-vs',
            keynote: true,
            content: '浙A12345'
          },
          {
            icon: 'lidaicon-map-local-f-lg',
            content: '阡陌路物联网街路口'
          },
          {
            icon: 'lidaicon-body-behavior-lg-f',
            content: '2017-11-21 07:08:09'
          }
        ],
        btns: [
          {
            icon: 'lidaicon-h-document',
            title: '编辑',
            click(data) {
              alert(data.pic);
            }
          },
          {
            icon: 'lidaicon-map-local',
            title: '定位',
            click(data) {
              alert(data.pic);
            }
          }
        ],
        detail(data) {
          alert(data.pic);
        }
      },
      testData3: {
        pic: 'https://s2.ax1x.com/2019/04/19/Epxy1U.jpg',
        label: '原图'
      },
      testData4: {
        pic: 'https://s2.ax1x.com/2019/04/19/EpxW7R.jpg',
        label: '抓拍图'
      },
      testData5: {
        pic: 'https://s2.ax1x.com/2019/03/19/AupWvt.jpg',
        info: [
          {
            icon: 'lidaicon-vs',
            keynote: true,
            content: '浙A12345'
          },
          {
            icon: 'lidaicon-map-local-f-lg',
            content: '江陵路明月路口'
          },
          {
            icon: 'lidaicon-body-behavior-lg-f',
            content: '2017-11-21 07:08:09'
          }
        ]
      },
      testData6: {
        pic: 'https://s2.ax1x.com/2019/03/19/AupWvt.jpg',
        info: [
          {
            icon: 'lidaicon-vs',
            keynote: true,
            content: '浙A56954'
          },
          {
            icon: 'lidaicon-map-local-f-lg',
            content: '阡陌路物联网街路口'
          },
          {
            icon: 'lidaicon-body-behavior-lg-f',
            content: '2017-11-21 07:08:09'
          }
        ]
      }
    };
  },
  methods: {
    clickHandle(data) {
      alert('click event' + data.pic);
    },
    clickPicHandle(data) {
      alert('clickPic event' + data.pic);
    },
    chooseHandle(data) {
      this.isChoosed=!this.isChoosed;
    }
  }
};
</script>

## API

### 属性

| 参数                              | 说明                                                         | 类型    | 可选值        | 默认值                  |
| --------------------------------- | ------------------------------------------------------------ | ------- | ------------- | ----------------------- |
| data                              | 传入的数据                                                   | Object  | 见下方表格    | -                       |
| pic-size <Badge text="1.11.1+" /> | 图片尺寸                                                     | Object  | -             | width: 215, height: 215 |
| pic-mode                          | 图片展示模式                                                 | String  | cover/contain | cover                   |
| choosable                         | 是否切换到可选择模式                                         | Boolean | false/true    | false                   |
| is-choosed                        | 是否选中                                                     | Boolean | false/true    | false                   |
| horizontal                        | 是否横向卡片                                                 | Boolean | false/true    | false                   |
| show-title                        | 是否显示按钮标题，控制底部按钮是否切换到图标文本共同显示模式 | Boolean | false/true    | false                   |

### 事件

| 参数      | 说明                          | 参数类型 | 参数内容   |
| --------- | ----------------------------- | -------- | ---------- |
| choose    | 卡片被选择事件，返回 data     | Object   | 见下方表格 |
| click-pic | 卡片图片被点击事件，返回 data | Object   | 见下方表格 |

### 插槽

| 名称                          | 说明           | 类型 |
| ----------------------------- | -------------- | ---- |
| default                       | 卡片底部插槽   | All  |
| topLeft                       | 图片左上角插槽 | All  |
| topRight                      | 图片右上角插槽 | All  |
| bottomLeft                    | 图片左下角插槽 | All  |
| bottomRight                   | 图片右上角插槽 | All  |
| info <Badge text="1.11.1+" /> | 卡片信息插槽   | All  |

## ImgResultCardGroup API

### 属性

| 参数          | 说明           | 类型    | 可选值                      | 默认值 |
| ------------- | -------------- | ------- | --------------------------- | ------ |
| similar       | 是否显示相似度 | Boolean | false/true                  | false  |
| similar-value | 相似度数值     | Float   | -                           | -      |
| similar-bg    | 相似度背景颜色 | String  | danger/success/warning/info | danger |

### 插槽

| 名称    | 说明                                                | 类型          |
| ------- | --------------------------------------------------- | ------------- |
| default | 默认插槽，对多个图片卡片按组展示，一般支持 2 个以上 | ImgResultCard |
| extra   | 图片组底部插槽，用于操作扩展                        | All           |

## data 的数据格式

| 参数  | 说明                    | 类型          | 可选值               | 默认值 |
| ----- | ----------------------- | ------------- | -------------------- | ------ |
| pic   | 卡片需展示图片 URL 地址 | String        | -                    | -      |
| label | 图片底部显示文本        | Boolean       | 如“原图”，“对比图”等 | -      |
| info  | 卡片信息内容            | Array[Object] | 见下方示例           | -      |

```javascript
[
  {
    icon: 'lidaicon-vs', //显示图标
    keynote: true, //是否突出显示
    content: '浙A12345' //显示文本
  }
];
```

| 参数 | 说明       | 类型          | 可选值     | 默认值 |
| ---- | ---------- | ------------- | ---------- | ------ |
| btns | 按钮栏内容 | Array[Object] | 见下方示例 | -      |

```javascript
[
  {
    icon: 'lidaicon-vs', //显示图标
    title: '编辑', //按钮标题
    click(data) {
      //按钮点击事件
      alert(data.pic);
    }
  }
];
```

| 参数      | 说明                     | 类型   | 可选值     | 默认值 |
| --------- | ------------------------ | ------ | ---------- | ------ |
| thumbnail | 大图对应框选图片位置信息 | Object | 见下方示例 | -      |

```javascript
{
    w: 0.182031, //宽度占比
    x: 0.447656, //横坐标占比
    h: 0.811111, //高度占比
    y: 0.1875 //纵坐标占比
};
```

| 参数   | 说明                                 | 类型           | 可选值 | 默认值 |
| ------ | ------------------------------------ | -------------- | ------ | ------ |
| detail | 点击详情按钮处理函数,参数为当前 data | Function(data) | -      | -      |
