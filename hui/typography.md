# typography

## 字体

优秀的字体系统首先要选择合适的字体家族「注」，我们建议字体家族中优先使用系统默认的界面字体

```style
font-family: 'Segoe UI', Microsoft YaHei, Arial, Helvetica, sans-serif;
```

## 字号

为了保证随着产品 国际化 与硬件（屏幕）的升级趋势，为了保证良好的易读性和可读性，
我们对原有的字号做了一次升级：

-   基础字号从12 升级到 14（12 保留用作辅助信息）
-   其他字号也对应的做了升级

## 行距

良好的行距配合字号可以达到良好的易读性和可读性，为了保证字体的阅读与 国际化 下的通用性，
我们得出了以下公式给以行高指导：

-   字号 _ 1.5 = 行高（逢单数减1），例如：14（字号）_ 1.5 = 21（行距）≈ 20（行距）

## 字重

字重的选择基于秩序、稳定、克制的原则。由于我们采用的中英文字不同（Segeo UI 有7层字重，而 Microsoft YaHei UI 仅3层），为了达到多语言切换情况下更加统一和谐的效果，BS端产品我们根据 W3C 与 Adobe selector 的指导，建议字重采用数字梯度来实现，并且我们选择了 400 与 500 的字重来达到最好的效果

-   Microsoft YaHei UI：regular（400、500）
-   Segoe UI：regular（400）、semibold（500）

CSS 字重对照表

-   100 = thin
-   200 = extra-light
-   300 = light
-   400 = normal, book
-   500 = medium
-   600 = demi-bold
-   700 = bold
-   800 = heavy
-   900 = black

## 应用
