# MapPicker 标记地图点位

<template>
  <author-info
    :version="versions['map-picker']"
    author="姜炎6"
    ux="王海鸥"
    ui="鲁欣如"
    standard="http://10.33.43.73/BBG_UED/BUI_Design/bscs/v2.0/issues/13"
    reviewed
  />
</template>

## 安装

```bash
$ npm i @hui-pro/map-picker -D
# 或者
$ yarn add @hui-pro/map-picker --dev
```

## 引入

```js
import mapPicker from '@hui-pro/map-picker';
// 地图选点控件涉及字体文件，所以需要定义字体文件路径的变量才行
$--map-picker-font-path: '~@hui-pro/map-picker/theme/fonts';
import '@hui-pro/map-picker/theme/index.scss';
Vue.use(mapPicker);
```

::: tip

请一定注意，该控件需要外网访问权限以加载地图资源，如果你的组件在发布后运行在无外网访问权限的环境下，请务必搭配gais服务使用，否则将无法正常加载地图。

:::

::: tip

该控件依赖openlayers5.x，请先配合5.x版本的openlayers进行使用。

:::
## 基础用法

<template>
  <code-box title="基础用法" description="直接引入map-picker控件，然后通过setting属性传入地图配置信息，v-model绑定当前选中点的坐标">
    <div class="operate-bar">
      <el-button @click="setCenter">设置地图中心</el-button>
      <el-button @click="clearValue">清除坐标</el-button>
      <el-button @click="setValue">修改标记点的位置</el-button>
    </div>
    <h-map-picker ref="map" :setting="mapJson" v-model="coor">
    </h-map-picker>
  </code-box>
</template>

```html
<div class="operate-bar">
  <el-button @click="setCenter">设置地图中心</el-button>
  <el-button @click="clearValue">清除坐标</el-button>
  <el-button @click="setValue">修改标记点的位置</el-button>
</div>
<h-map-picker ref="map" :setting="mapJson" v-model="coor"></h-map-picker>

<script>
  import mapJson from './map-picker.json';
  export default {
    name: 'map-picker-page',
    data() {
      return {
        mapJson,
        coor: []
      };
    },
    methods: {
      setCenter() {
        this.$refs.map.setMapCenter([13540972.434775542, 2891154.157858506]);
      },
      clearValue() {
        this.coor = [];
      },
      setValue() {
        const marker = this.$refs.map.getFeature();
        this.$refs.map.setMarkerPosition(marker, [
          10962904.344773117,
          3654301.448257705
        ]);
      }
    }
  };
</script>
<style scoped lang="scss">
  .operate-bar {
    margin-bottom: 20px;
  }
</style>
```

::: tip

遇到回显场景时，请注意把坐标的赋值操作放到 rendercomplete 事件回调函数中进行，否则回显逻辑可能有问题。

:::

<code-box title="下面是模拟用的setting" description="以下json仅供本地调试使用，实际开发时，请记得替换。这个json来自于gis服务，配好专题地图后，可通过接口拿到该配置信息。">
  
</code-box>

```json
{
  "workspace": {
    "1": {
      "code": "default",
      "createTime": "2018-04-19 13:04:00",
      "declare": "默认工作空间",
      "id": "1",
      "name": "默认",
      "usability": "0"
    },
    "2": {
      "code": "hydro",
      "createTime": "2018-04-19 13:44:15",
      "declare": "hydrologic",
      "id": "2",
      "name": "水雨情",
      "usability": "0"
    },
    "3": {
      "code": "gewggsg",
      "createTime": "2018-04-23 10:27:56",
      "declare": "不管是谁，都不许动！！！",
      "id": "3",
      "name": "不管是谁，都不许动哈！！",
      "usability": "0"
    },
    "4": {
      "code": "bfdslafa",
      "createTime": "2018-12-18 09:57:32",
      "declare": "",
      "id": "4",
      "name": "twj测试",
      "usability": "0"
    },
    "5": {
      "code": "secure",
      "createTime": "2018-04-20 11:38:36",
      "declare": "secure",
      "id": "5",
      "name": "安防",
      "usability": "0"
    },
    "6": {
      "code": "output_test",
      "createTime": "2018-06-26 11:07:44",
      "declare": "导出测试导出测试",
      "id": "6",
      "name": "导出测试",
      "usability": "0"
    }
  },
  "style_def_shape": {
    "1": {
      "angle": 0.0,
      "fillId": "4",
      "id": "1",
      "points": 3,
      "radius": 14.0,
      "radius2": 14.0,
      "rotate": false,
      "rotation": 0.0,
      "strokeId": "2",
      "styleId": "7"
    },
    "2": {
      "angle": 0.0,
      "fillId": "5",
      "id": "2",
      "points": -1,
      "radius": 14.0,
      "radius2": 0.0,
      "rotate": false,
      "rotation": 0.0,
      "strokeId": "1",
      "styleId": "8"
    },
    "3": {
      "angle": 0.0,
      "fillId": "4",
      "id": "3",
      "points": -1,
      "radius": 14.0,
      "radius2": 0.0,
      "rotate": false,
      "rotation": 0.0,
      "strokeId": "3",
      "styleId": "9"
    }
  },
  "layer": {
    "4": {
      "code": "door",
      "createTime": "2018-12-28 14:44:41",
      "declare": "",
      "extentBottom": null,
      "extentLeft": null,
      "extentRight": null,
      "extentTop": null,
      "id": "4",
      "infoId": "4",
      "maxRes": null,
      "minRes": null,
      "name": "门禁点图层",
      "opacity": 1.0,
      "type": "layer_vector",
      "usability": "0",
      "visible": true,
      "workspaceId": "1"
    },
    "5": {
      "code": "camera",
      "createTime": "2018-12-28 14:44:41",
      "declare": "",
      "extentBottom": null,
      "extentLeft": null,
      "extentRight": null,
      "extentTop": null,
      "id": "5",
      "infoId": "5",
      "maxRes": null,
      "minRes": null,
      "name": "监控点测试图层",
      "opacity": 1.0,
      "type": "layer_vector",
      "usability": "0",
      "visible": true,
      "workspaceId": "1"
    },
    "6": {
      "code": "gesgagfsd",
      "createTime": "2018-12-28 14:44:41",
      "declare": "",
      "extentBottom": null,
      "extentLeft": null,
      "extentRight": null,
      "extentTop": null,
      "id": "6",
      "infoId": "1",
      "maxRes": null,
      "minRes": null,
      "name": "高德矢量图层",
      "opacity": 1.0,
      "type": "layer_tile",
      "usability": "0",
      "visible": true,
      "workspaceId": "3"
    },
    "7": {
      "code": "gasgeg",
      "createTime": "2018-12-28 14:44:41",
      "declare": "",
      "extentBottom": null,
      "extentLeft": null,
      "extentRight": null,
      "extentTop": null,
      "id": "7",
      "infoId": "2",
      "maxRes": null,
      "minRes": null,
      "name": "高德影像图",
      "opacity": 1.0,
      "type": "layer_tile",
      "usability": "0",
      "visible": true,
      "workspaceId": "1"
    },
    "8": {
      "code": "third_test",
      "createTime": "2018-12-28 14:44:41",
      "declare": "",
      "extentBottom": null,
      "extentLeft": null,
      "extentRight": null,
      "extentTop": null,
      "id": "8",
      "infoId": "1",
      "maxRes": null,
      "minRes": null,
      "name": "第三方矢量数据源",
      "opacity": 1.0,
      "type": "layer_vector_custom",
      "usability": "0",
      "visible": true,
      "workspaceId": "1"
    }
  },
  "layer_vector_custom": {
    "1": {
      "annoField": "",
      "categoryField": "",
      "id": "1",
      "layerId": "8",
      "options": "",
      "styleId": "1"
    }
  },
  "layer_group": {
    "1": {
      "code": "geasdgf",
      "createTime": "2018-04-23 11:19:56",
      "declare": "",
      "extentBottom": null,
      "extentLeft": null,
      "extentRight": null,
      "extentTop": null,
      "id": "1",
      "maxRes": null,
      "minRes": null,
      "name": "高德矢量图层组",
      "opacity": 1.0,
      "usability": "0",
      "visible": true,
      "workspaceId": "3"
    },
    "2": {
      "code": "image",
      "createTime": "2018-08-23 18:56:39",
      "declare": "",
      "extentBottom": null,
      "extentLeft": null,
      "extentRight": null,
      "extentTop": null,
      "id": "2",
      "maxRes": null,
      "minRes": null,
      "name": "高德影像图层组",
      "opacity": 1.0,
      "usability": "0",
      "visible": true,
      "workspaceId": "1"
    }
  },
  "source_vector": {
    "1": {
      "code": "gsadgsadga",
      "cql": "",
      "createTime": "2018-12-06 21:00:34",
      "declare": "",
      "def": false,
      "expType": 0,
      "id": "1",
      "joinParams": null,
      "name": "监控点测试",
      "sourceIds": "",
      "sourceType": 0,
      "stname": "camera",
      "type": "layer",
      "usability": "0",
      "usePrivilege": false,
      "workspaceId": "1"
    },
    "5": {
      "code": "gsadgasdga",
      "cql": "",
      "createTime": "2018-12-18 10:14:38",
      "declare": "",
      "def": false,
      "expType": 0,
      "id": "5",
      "joinParams": null,
      "name": "门禁点测试",
      "sourceIds": "",
      "sourceType": 0,
      "stname": "doortest",
      "type": "layer",
      "usability": "0",
      "usePrivilege": false,
      "workspaceId": "4"
    }
  },
  "map_layer_group_rel": ["1", "2"],
  "resource_icon": {},
  "style_def_icon": {},
  "style_status": null,
  "style_category": null,
  "tag": {
    "code": "default",
    "createTime": "2018-04-19 13:04:00",
    "declare": "默认标签",
    "id": "1",
    "name": "默认",
    "pcode": "",
    "usability": "0"
  },
  "map": {
    "center": "13358338.89519283,3482189.08540862",
    "code": "gewgasd",
    "cosCenter": "120,30",
    "cosCrs": "EPSG:4326",
    "cosProj": "GEOGCS[\"WGS 84\", \r\n  DATUM[\"World Geodetic System 1984\", \r\n    SPHEROID[\"WGS 84\", 6378137.0, 298.257223563, AUTHORITY[\"EPSG\",\"7030\"]], \r\n    AUTHORITY[\"EPSG\",\"6326\"]], \r\n  PRIMEM[\"Greenwich\", 0.0, AUTHORITY[\"EPSG\",\"8901\"]], \r\n  UNIT[\"degree\", 0.017453292519943295], \r\n  AXIS[\"Geodetic longitude\", EAST], \r\n  AXIS[\"Geodetic latitude\", NORTH], \r\n  AUTHORITY[\"EPSG\",\"4326\"]]",
    "createTime": null,
    "crs": "EPSG:3857",
    "crsProj": "PROJCS[\"WGS 84 / Pseudo-Mercator\", \r\n  GEOGCS[\"WGS 84\", \r\n    DATUM[\"World Geodetic System 1984\", \r\n      SPHEROID[\"WGS 84\", 6378137.0, 298.257223563, AUTHORITY[\"EPSG\",\"7030\"]], \r\n      AUTHORITY[\"EPSG\",\"6326\"]], \r\n    PRIMEM[\"Greenwich\", 0.0, AUTHORITY[\"EPSG\",\"8901\"]], \r\n    UNIT[\"degree\", 0.017453292519943295], \r\n    AXIS[\"Geodetic longitude\", EAST], \r\n    AXIS[\"Geodetic latitude\", NORTH], \r\n    AUTHORITY[\"EPSG\",\"4326\"]], \r\n  PROJECTION[\"Popular Visualisation Pseudo Mercator\", AUTHORITY[\"EPSG\",\"1024\"]], \r\n  PARAMETER[\"semi_minor\", 6378137.0], \r\n  PARAMETER[\"latitude_of_origin\", 0.0], \r\n  PARAMETER[\"central_meridian\", 0.0], \r\n  PARAMETER[\"scale_factor\", 1.0], \r\n  PARAMETER[\"false_easting\", 0.0], \r\n  PARAMETER[\"false_northing\", 0.0], \r\n  UNIT[\"m\", 1.0], \r\n  AXIS[\"Easting\", EAST], \r\n  AXIS[\"Northing\", NORTH], \r\n  AUTHORITY[\"EPSG\",\"3857\"]]",
    "declare": "不许动，不管谁！！",
    "id": "2",
    "maxZoom": 18,
    "minZoom": 4,
    "name": "demo专题地图",
    "pixelRatio": 1.0,
    "roate": 0.0,
    "usability": "0",
    "workspaceId": "1",
    "zoomFactor": 2.0,
    "zoomLevel": 5
  },
  "style_def_fill": {
    "1": {
      "color": "rgba(255,0,0,1)",
      "colorLikeId": null,
      "id": "1",
      "styleId": "4"
    },
    "2": {
      "color": "rgba(255,255,0,1)",
      "colorLikeId": null,
      "id": "2",
      "styleId": "5"
    }
  },
  "layer_heatmap": null,
  "style_conf": {
    "1": {
      "animId": null,
      "annoId": null,
      "code": "yellowstyle",
      "createTime": "2018-08-31 14:25:49",
      "declare": "",
      "fillId": null,
      "id": "1",
      "imageId": "8",
      "name": "黄色图形",
      "strokeId": null,
      "usability": "0",
      "workspaceId": "1"
    },
    "3": {
      "animId": null,
      "annoId": null,
      "code": "redstyle",
      "createTime": "2018-08-31 14:18:07",
      "declare": "",
      "fillId": null,
      "id": "3",
      "imageId": "9",
      "name": "红色图形",
      "strokeId": null,
      "usability": "0",
      "workspaceId": "1"
    },
    "4": {
      "animId": null,
      "annoId": null,
      "code": "gasgdsadg",
      "createTime": "2018-08-24 14:38:51",
      "declare": "",
      "fillId": null,
      "id": "4",
      "imageId": "7",
      "name": "图形",
      "strokeId": null,
      "usability": "0",
      "workspaceId": "1"
    }
  },
  "layer_cluster": null,
  "style_anim_wave": {},
  "style_def_anno": {},
  "style_def": {
    "1": {
      "code": "colorline",
      "createTime": null,
      "declare": "",
      "id": "1",
      "infoId": "1",
      "name": "单色线型",
      "type": "style_def_stroke",
      "usability": "0",
      "workspaceId": "6"
    },
    "2": {
      "code": "hydro_stroke_blue",
      "createTime": null,
      "declare": "",
      "id": "2",
      "infoId": "2",
      "name": "蓝色线条",
      "type": "style_def_stroke",
      "usability": "0",
      "workspaceId": "2"
    },
    "3": {
      "code": "secure_stroke_red",
      "createTime": null,
      "declare": "",
      "id": "3",
      "infoId": "3",
      "name": "红色线",
      "type": "style_def_stroke",
      "usability": "0",
      "workspaceId": "5"
    },
    "4": {
      "code": "hydro_red",
      "createTime": null,
      "declare": "红色填充",
      "id": "4",
      "infoId": "1",
      "name": "红色填充",
      "type": "style_def_fill",
      "usability": "0",
      "workspaceId": "2"
    },
    "5": {
      "code": "gewqgw",
      "createTime": null,
      "declare": "",
      "id": "5",
      "infoId": "2",
      "name": "黄色填充",
      "type": "style_def_fill",
      "usability": "0",
      "workspaceId": "3"
    },
    "7": {
      "code": "gasdgadgs",
      "createTime": null,
      "declare": "",
      "id": "7",
      "infoId": "1",
      "name": "图形",
      "type": "style_def_shape",
      "usability": "0",
      "workspaceId": "1"
    },
    "8": {
      "code": "yellow_circle",
      "createTime": null,
      "declare": "",
      "id": "8",
      "infoId": "2",
      "name": "黄色原图形",
      "type": "style_def_shape",
      "usability": "0",
      "workspaceId": "1"
    },
    "9": {
      "code": "red_circle",
      "createTime": null,
      "declare": "",
      "id": "9",
      "infoId": "3",
      "name": "红色圆图形",
      "type": "style_def_shape",
      "usability": "0",
      "workspaceId": "1"
    }
  },
  "style_anim_blink": {},
  "color_like": {},
  "layer_vector": {
    "4": {
      "annoField": "",
      "annoId": null,
      "categoryField": "",
      "extentRatio": 2.0,
      "id": "4",
      "layerId": "4",
      "observeExtent": false,
      "options": "",
      "sourceId": "5",
      "strict": false,
      "styleId": "4"
    },
    "5": {
      "annoField": "",
      "annoId": null,
      "categoryField": "",
      "extentRatio": 2.0,
      "id": "5",
      "layerId": "5",
      "observeExtent": false,
      "options": "",
      "sourceId": "1",
      "strict": false,
      "styleId": "3"
    }
  },
  "style_def_stroke": {
    "1": {
      "cap": "round",
      "color": "rgba(255,0,0,1)",
      "colorLikeId": null,
      "dash": "",
      "dashOffset": 0,
      "id": "1",
      "join": "round",
      "miterLimit": 10,
      "styleId": "1",
      "width": 1
    },
    "2": {
      "cap": "round",
      "color": "rgba(0,0,255,1)",
      "colorLikeId": null,
      "dash": "",
      "dashOffset": 0,
      "id": "2",
      "join": "round",
      "miterLimit": 10,
      "styleId": "2",
      "width": 2
    },
    "3": {
      "cap": "round",
      "color": "rgba(255,0,0,1)",
      "colorLikeId": null,
      "dash": "",
      "dashOffset": 0,
      "id": "3",
      "join": "round",
      "miterLimit": 10,
      "styleId": "3",
      "width": 1
    }
  },
  "map_layer_rel": ["4", "5", "8"],
  "layer_image": null,
  "anim_wave": null,
  "layer_tile": {
    "1": {
      "crs": "",
      "format": "",
      "id": "1",
      "layerId": "6",
      "levelResolution": null,
      "loadFunction": "",
      "options": "",
      "origin": "",
      "resourceId": null,
      "resourceType": "url",
      "type": "gaode_vec",
      "url": ""
    },
    "2": {
      "crs": "",
      "format": "",
      "id": "2",
      "layerId": "7",
      "levelResolution": null,
      "loadFunction": "",
      "options": "",
      "origin": "",
      "resourceId": null,
      "resourceType": "url",
      "type": "gaode_sat",
      "url": ""
    }
  },
  "layer_group_rel": { "1": ["6"], "2": ["7"] },
  "anim_blink": null
}
```

<script>
  const versions = require('docs/.vuepress/src/version.json');
  const icon = require('./assets/img/logo.png')
  import mapJson from './map-picker.json'
  export default {
    name: 'map-picker-page',
    data () {
      return {
        versions,
        mapJson: null,
        coor: [],
        pointerIcon: {
          normal: icon,
          moving: icon,
          size: [16, 16]
        }
      }
    },
    created () {
      setTimeout(() => {
        this.mapJson = mapJson
      }, 2000)
    },
    watch: {
      coor (val) {
        console.log(val)
        console.log(this.$refs.map.transform(val,'EPSG:3857','EPSG:4326'))
      }
    },
    methods: {
      setCenter () {
        this.$refs.map.setMapCenter([13540972.434775542, 2891154.157858506])
      },
      clearValue () {
        this.coor = []
      },
      setValue () {
        const marker = this.$refs.map.getFeature()
        this.$refs.map.setMarkerPosition(marker, [11860580.804954227, 3436761.665758094])
        // this.coor = [12902570.374537751, 3299786.5110710594]
      },
      startEdit () {
        this.$refs.map.startEdit()
      }
    }
  }
</script>

<style scoped lang="scss">
.operate-bar{
  margin-bottom: 20px;
}
</style>

## API

### Attributes

| 参数         | 说明                                                                                                                                                                                    | 类型   | 可选值 | 默认值                        |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ | ----------------------------- |
| setting      | 当前使用地图的配置信息，来自于 gis 服务，配好专题地图后，可通过接口拿到该配置信息。                                                                                                     | String | -      | -                             |
| pointer-icon | 自定义选点 icon。此属性必须有三个字段（normal,moving,size）：normal 和 moving 分别对应普通状态和移动状态，值可以相同；size 是个数组，描述 icon 的宽高，两个状态下的 icon 必须相同大小。 | Object | -      | 图标见 demo，size 默认[40,40] |
| context | 加载地图资源的上下文，如果配置了这个属性，那么地图将通过指定的上下文去加载地图资源 | Object | -      | {} |

### 方法

| 方法名            | 说明                                                                   | 参数                                                                                                                                                                                                             |
| ----------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| setMarkerPosition | 修改标记点的位置                                                       | (feature:Feature, coor:Array),feature 是地图上的标记点，可通过 getFeature 方法获取到。coor 是个数组，内容是标记点的坐标，一般需要回显时要用到这个方法                                                            |
| setMapCenter      | 设置地图中心点                                                         | (coor:Array),coor 是个数组，内容是中心点的坐标                                                                                                                                                                   |
| transform         | 坐标系转换的方法                                                       | (coor:Array, source String, destination String),coor 是个数组，待转换的坐标；source 是字符串，代表源坐标系编码；destination 是字符串，代表目标坐标系编码（默认双向绑定值的编码是：3857。经纬度的编码是：4326）。 |
| startEdit         | 进入编辑状态                                                           | 调用该方法，可以进入选点状态，点击右键或者按下 esc 自动退出编辑状态，所以也就无需手动退出编辑状态了。                                                                                                            |
| getMap            | 获取 openlayer 的 map 实例，可基于此做更多个性化定制操作               | 无                                                                                                                                                                                                               |
| getFeature        | 获取标记点元素，用于后续修改标记点的样式，可基于此做更多个性化定制操作 | 无                                                                                                                                                                                                               |

### 事件

| 名称                                   | 类型                   | 描述                                                         |
| -------------------------------------- | ---------------------- | ------------------------------------------------------------ |
| rendercomplete <Badge text="1.5.1+" /> | 地图渲染完毕抛出该事件 | 请注意，对地图以及标记点的相关操作请确保在该事件触发之后进行 |

### slot

| 名称        | 类型         | 描述                     |
| ----------- | ------------ | ------------------------ |
| operate-bar | 普通具名插槽 | 可以自定义操作区域的内容 |
