## 天气
- 基于next.js的SSR服务端渲染 `https://weather.jindw.xyz`
- 普通SPA版本:`https://github.com/jindws/jindws.github.io`

### UI DESIGN
![design](https://jindw.xyz/upload/2022/04/design-fca44b8e909c4bef9d7904c69e855c1e.png)

### 技术栈
`next.js`,`sass`,`echarts`,`typescript`,`eslint`
- 关于数据
    - 使用高德地图api获取ip定位
    - 使用和风天气获取天气信息
### 展示地址
`https://weather.jindw.xyz/`

> 实现 ui

- 首页`https://weather.jindw.xyz/`
    - 首页背景会随机分布 6 个白点
        - 点击白点会随机再加一个白点
    - 天气图标一点动态
    - 风向天气一点动态
    - 使用 rem,兼容各种屏幕,支持 pc(宽度超过 700px 认为是 pc),支持窗口重置
- 详情页`https://weather.jindw.xyz/main`
    - Today 使用的是 echarts 实现
> 图标区分白天黑夜
- 根据天气预报的时间,6-18 天展示白天的图标,之后展示夜晚的图标
### 其他
- 降水量展示的是1h降水量