# Color 色彩

<style scope>
  .demo-color-box {
    border-radius: 4px;
    padding: 20px;
    height: 74px;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;
  }
  .bg-red {
     background:  #E72528;
  }
  .bg-green {
     background:  #42C707;
  }
  .bg-blue {
     background:  #2080F7;
  }


  .bg-urgent {
     background:  #FA3239;
  }
  .bg-warning {
     background:  #FF952C;
  }
  .bg-remind {
     background:  #FFCC00;
  }
  .bg-success {
     background:  #02BF0F;
  }
  .bg-information {
     background:  #2196F3;
  }

  .bg-l4 {
     background:  #FF0000;
  }
  .bg-l3 {
     background:  #FF9900;
  }
  .bg-l2 {
     background:  #FFFF00;
  }
  .bg-l1 {
     background:  #0000FF;
  }

  .color-row {
    margin-bottom: 0 !important;
  }

  .bg-black {
    background-color: #000;
  }
  .bg-black1 {
    background-color: rgba(0, 0, 0, .9);
  }
  .bg-black2 {
    background-color: rgba(0, 0, 0, .7);
  }
  .bg-black3 {
    background-color: rgba(0, 0, 0, .4);
  }
  .bg-black4 {
    background-color: rgba(0, 0, 0, .3);
  }
  .bg-black5 {
    background-color: rgba(0, 0, 0, .2);
  }
  .bg-black6 {
    background-color: rgba(0, 0, 0, .12);
  }
  .bg-black7 {
    background-color: rgba(0, 0, 0, .08);
  }
  .bg-black8 {
    background-color: rgba(0, 0, 0, .06);
  }
  .bg-black9 {
    background-color: rgba(0, 0, 0, .04);
  }
  .bg-font-black {
    background-color: rgba(0, 0, 0, .9);
  }
  .bg-font-black-light {
    background-color: rgba(0, 0, 0, .7);
  }
  .bg-font-black-lighter {
    background-color: rgba(0, 0, 0, .4);
  }
  .bg-font-black-lightest {
    background-color: rgba(0, 0, 0, .2);
  }

  .bg-white {
    background-color: #FFF;
  }
  .bg-gray {
    background-color: rgba(255, 255, 255, .9);
  }
  .bg-gray-light {
    background-color: rgba(255, 255, 255, .7);
  }
  .bg-gray-lighter {
    background-color: rgba(255, 255, 255, .4);
  }
  .bg-gray-lightest {
    background-color: rgba(255, 255, 255, .2);
  }
  
  .bg-gray-white {
    background-color: #fff;
  }

  .bg-white-dark {
    background-color: #f9fafc;
  }

  .color-gray {
    color: #5e6d82;
  }
</style>

HUI 为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。

## 主色

根据我们行业特性与广度及原有项目的配色分析，我们把通用的主色分为 红 / 绿 / 蓝

<template>
  <el-row :gutter="12">
    <el-col :span="8">
      <div class="demo-color-box bg-red">Red<div class="value">#E72528</div></div>
    </el-col>
    <el-col :span="8">
      <div class="demo-color-box bg-green">Green<div class="value">#42C707</div></div>
    </el-col>
    <el-col :span="8">
      <div class="demo-color-box bg-blue">Blue<div class="value">#2080F7</div></div>
    </el-col>
  </el-row>
</template>

## 功能性色彩

除了主色外的场景色，需要在不同的场景中使用（例如危险色表示危险的操作）。

<template>
  <el-row :gutter="12">
    <el-col :span="4">
      <div class="demo-color-box bg-urgent">Urgent<div class="value">#FA3239</div></div>
    </el-col>
    <el-col :span="4">
      <div class="demo-color-box bg-warning">Warning<div class="value">#FF952C</div></div>
    </el-col>
    <el-col :span="4">
      <div class="demo-color-box bg-remind">Remind<div class="value">#FFCC00</div></div>
    </el-col>
    <el-col :span="4">
      <div class="demo-color-box bg-success">Success<div class="value">#02BF0F</div></div>
    </el-col>
    <el-col :span="4">
      <div class="demo-color-box bg-information">Information<div class="value">#2196F3</div></div>
    </el-col>
  </el-row>
</template>

## 中性色

中性色用于文本、背景和边框颜色。通过运用不同的中性色，来表现层次结构。

根据页面设计中文本、控件等基础采用的中性色（黑）我们做梳理，基本规则如下

<template>
  <el-row class="color-row" :gutter="12">
    <el-col :span="6">
      <div class="demo-color-box-group">
        <div class="demo-color-box bg-black1">90%</div>
      </div>
    </el-col>
    <el-col :span="2">
      <div>文本</div>
      <div>标题</div>
    </el-col>
    <el-col :span="4">
      <div>输入框</div>
      <div>描边 Selected</div>
    </el-col>
  </el-row>
  <el-row class="color-row" :gutter="12">
    <el-col :span="6">
      <div class="demo-color-box-group">
        <div class="demo-color-box bg-black2">70%</div>
      </div>
    </el-col>
    <el-col :span="2">
      <div>文本</div>
      <div>正常</div>
    </el-col>
    <el-col :span="4">
      <div>输入框</div>
      <div>描边 Hover</div>
    </el-col>
    <el-col :span="2">
      <div>滚动条</div>
      <div>Pressed</div>
    </el-col>
  </el-row>
  <el-row class="color-row" :gutter="12">
    <el-col :span="6">
      <div class="demo-color-box-group">
        <div class="demo-color-box bg-black3">40%</div>
      </div>
    </el-col>
    <el-col :span="2">
      <div>文本</div>
      <div>次要</div>
    </el-col>
    <el-col :span="4" :offset="4">
      <div>滚动条</div>
      <div>Hover</div>
    </el-col>
  </el-row>
  <el-row class="color-row" :gutter="12">
    <el-col :span="6">
      <div class="demo-color-box-group">
        <div class="demo-color-box bg-black4">30%</div>
      </div>
    </el-col>
    <el-col :span="4" :offset="2">
      <div>输入框</div>
      <div>描边 Normal</div>
    </el-col>
  </el-row>
  <el-row class="color-row" :gutter="12">
    <el-col :span="6">
      <div class="demo-color-box-group">
        <div class="demo-color-box bg-black5">20%</div>
      </div>
    </el-col>
    <el-col :span="2">
      <div>文本</div>
      <div>禁用</div>
    </el-col>
    <el-col :span="4" :offset="4">
      <div>滚动条</div>
      <div>Normal</div>
    </el-col>
  </el-row>
  <el-row class="color-row" :gutter="12">
    <el-col :span="6">
      <div class="demo-color-box-group">
        <div class="demo-color-box bg-black6 color-gray">12%</div>
      </div>
    </el-col>
    <el-col :span="4" :offset="8">
      <div>触控反馈</div>
      <div>Pressed</div>
      <div>图标/图文按钮、表格</div>
    </el-col>
    <el-col :span="2">
      <div>分割线</div>
      <div>深</div>
    </el-col>
  </el-row>
  <el-row class="color-row" :gutter="12">
    <el-col :span="6">
      <div class="demo-color-box-group">
        <div class="demo-color-box bg-black7 color-gray">8%</div>
      </div>
    </el-col>
    <el-col :span="2" :offset="12">
      <div>分割线</div>
      <div>浅</div>
      <div>如表格</div>
    </el-col>
    <el-col :span="4">
      <div>触控反馈</div>
      <div>Pressed</div>
      <div>如下拉列表、树</div>
    </el-col>
  </el-row>
  <el-row class="color-row" :gutter="12">
    <el-col :span="6">
      <div class="demo-color-box-group">
        <div class="demo-color-box bg-black8 color-gray">6%</div>
      </div>
    </el-col>
    <el-col :span="4" :offset="8">
      <div>触控反馈</div>
      <div>Hover</div>
      <div>图标/图文按钮、表格</div>
    </el-col>
  </el-row>
  <el-row class="color-row" :gutter="12">
    <el-col :span="6">
      <div class="demo-color-box-group">
        <div class="demo-color-box bg-black9 color-gray">4%</div>
      </div>
    </el-col>
    <el-col :span="4" :offset="14">
      <div>触控反馈</div>
      <div>Pressed</div>
      <div>如下拉列表、树</div>
    </el-col>
  </el-row>
</template>


<!-- <template>
  <el-row :gutter="12">
    <el-col :span="12">
      <el-row :gutter="12">
        <el-col :span="12">
          <div class="demo-color-box-group">
            <div class="demo-color-box bg-black">Light<div class="value">基于#000000</div></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="demo-color-box-group">
            <div class="demo-color-box bg-font-black">标题文本<div class="value">90%</div></div>
            <div class="demo-color-box bg-font-black-light">正常文本<div class="value">70%</div></div>
            <div class="demo-color-box bg-font-black-lighter">次要文本<div class="value">40%</div></div>
            <div class="demo-color-box bg-font-black-lightest">禁用文本<div class="value">20%</div></div>
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="12" class="bg-black">
      <el-row :gutter="12">
        <el-col :span="12">
          <div class="demo-color-box-group">
            <div class="demo-color-box color-gray bg-gray">标题文本<div class="value">90%</div></div>
            <div class="demo-color-box color-gray bg-gray-light">正常文本<div class="value">70%</div></div>
            <div class="demo-color-box bg-gray-lighter">次要文本<div class="value">40%</div></div>
            <div class="demo-color-box bg-gray-lightest">禁用文本<div class="value">20%</div></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="demo-color-box-group" style="border: 1px solid #e0e6ed;border-radius: 4px;">
            <div class="demo-color-box color-gray bg-white">Dark<div class="value">基于#FFFFFF</div></div>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template> -->
