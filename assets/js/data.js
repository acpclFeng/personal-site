/* =========================================================
   NOVA · 站点数据层（示例占位）
   👉 替换指引：把下面的文字改成你自己的内容即可，结构保持不动。
   ========================================================= */
window.NOVA_DATA = {
  /* 打字机循环展示的自我定位 */
  typed: [
    "创意开发者 / Creative Developer",
    "视觉设计师 / Visual Designer",
    "前端工程师 / Frontend Engineer",
    "数字游民 / Digital Nomad"
  ],

  /* 作品画廊 */
  projects: [
    {
      title: "Nebula 仪表盘",
      desc: "一套面向数据团队的暗色实时可视化面板，支持自定义组件与主题。",
      tags: ["Vue", "D3.js", "WebSocket"],
      thumb: "NB",
      detail: "为某 SaaS 团队从 0 到 1 搭建的实时监控仪表盘。采用 WebSocket 推送 + 虚拟滚动，万级数据点下仍保持 60fps。设计上以暗色为底、霓虹为强调，强调信息密度与可读性平衡。"
    },
    {
      title: "Echo 音乐可视化",
      desc: "把音频频谱实时渲染成可交互粒子星空的 WebGL 实验。",
      tags: ["WebGL", "Web Audio", "GLSL"],
      thumb: "EC",
      detail: "一个纯前端的音乐可视化玩具。用 Web Audio API 取频谱，在 Canvas/WebGL 里驱动粒子运动。曾在社区收获 2k+ star，被用作多个 live set 的舞台背景。"
    },
    {
      title: "Paper 笔记应用",
      desc: "本地优先、端到端加密的极简笔记，支持双向链接。",
      tags: ["TypeScript", "IndexedDB", "CRDT"],
      thumb: "PP",
      detail: "一个坚持本地优先理念的笔记工具。用 CRDT 解决多端同步冲突，所有数据端到端加密。界面追求「无干扰写作」，去掉一切非必要元素。"
    },
    {
      title: "Atlas 设计系统",
      desc: "跨 12 个产品线的组件库与设计令牌规范。",
      tags: ["Design System", "Figma", "Tokens"],
      thumb: "AT",
      detail: "主导搭建的公司级设计系统，统一了 12 条产品线的视觉语言。以设计令牌（Design Tokens）打通 Figma 与代码，主题切换成本从天级降到分钟级。"
    },
    {
      title: "Pulse 健身小程序",
      desc: "结合陀螺仪的动作识别训练助手，上线 3 月 10w+ 用户。",
      tags: ["小程序", "运动识别", "Canvas"],
      thumb: "PL",
      detail: "一款健身打卡小程序。利用手机传感器做轻量动作识别，配合 Canvas 动画做实时反馈。上线三个月自然增长破 10 万用户。"
    },
    {
      title: "Drift 个人博客引擎",
      desc: "零依赖、构建飞快的静态博客生成器，自带暗色主题。",
      tags: ["Node", "Markdown", "SSG"],
      thumb: "DR",
      detail: "为了解决「写博客比写文章还麻烦」而做的静态站点生成器。零运行时依赖，百篇文章构建 < 1s，自带赛博风主题与 RSS。"
    }
  ],

  /* 技能雷达图维度（0-100） */
  radar: {
    labels: ["前端", "设计", "后端", "动效", "产品", "协作"],
    values: [95, 88, 70, 92, 75, 85]
  },

  /* 技能条 */
  skillBars: [
    { name: "HTML / CSS", value: 96 },
    { name: "JavaScript / TS", value: 93 },
    { name: "React / Vue", value: 90 },
    { name: "UI / 视觉设计", value: 88 },
    { name: "动效 / Canvas", value: 92 },
    { name: "Node / 后端", value: 72 }
  ],

  /* 成长时间线 */
  timeline: [
    { year: "2018", title: "踏入代码世界", desc: "大学选修计算机，写出第一行 Hello World，从此一发不可收拾。" },
    { year: "2020", title: "第一个上线项目", desc: "和同学做了校园活动报名系统，第一次体会「被真实使用」的喜悦。" },
    { year: "2022", title: "转向设计与前端", desc: "在实习中迷上交互动效，开始系统学习视觉设计与前端工程。" },
    { year: "2024", title: "独立接单 & 开源", desc: "开始自由职业，同时维护几个开源项目，认识了一群同频的人。" },
    { year: "2026", title: "现在 & 未来", desc: "在创意开发路上继续探索，希望做出更多「会呼吸的界面」。" }
  ],

  /* 博客 / 随笔 */
  blogs: [
    { date: "2026.08", title: "为什么我把主页重做成了赛博风", desc: "聊聊这次重构背后的取舍：性能、个性与可读性的三角博弈。" },
    { date: "2026.05", title: "用 Canvas 做粒子背景的 5 个坑", desc: "从性能到 reduced-motion，一篇避坑指南。" },
    { date: "2026.02", title: "设计师也要懂一点工程", desc: "边界正在消失，T 型人才为什么越来越值钱。" }
  ],

  /* 评价 */
  testimonials: [
    { name: "林深", role: "产品负责人 · 某科技公司", text: "星野把我们的设计稿还原到像素级，还主动优化了三处动效，体验提升肉眼可见。" },
    { name: "阿木", role: "开源社区伙伴", text: "协作过好几个项目，响应快、审美在线，是最让人省心的队友之一。" },
    { name: "Yuki", role: "自由设计师", text: "和星野一起做的可视化展，评委直接给的满分，视觉和技术都扛打。" }
  ],

  /* 往期版本 */
  versions: [
    { tag: "v3.0", title: "赛博科技风重构", info: "2026.10 · 全新视觉与交互，新增技能雷达与时间线" },
    { tag: "v2.0", title: "极简动态版", info: "2025.06 · 滚动叙事 + 留白设计" },
    { tag: "v1.0", title: "初代作品集", info: "2024.03 · 单页静态，朴素但真诚" }
  ]
};
