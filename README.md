# 林棋铭 · 赛博科技风个人主页

> 一份为社团考核量身打造的自我介绍网站 —— 不只是一个「关于我」，更是一个能交互、能玩、能打分的作品。

## ✨ 亮点（评委请重点看这里）

- **赛博科技风视觉**：深色霓虹 + 玻璃拟态 + 网格背景，全程统一的设计语言，拒绝模板脸。
- **Hero 粒子星空**：纯 Canvas 实时连线动画（自适应明暗主题、尊重 `prefers-reduced-motion`）。
- **打字机自我介绍**：首屏循环展示你的多重身份。
- **「关于我」卡片**：头像左 / 文字右同框，学号也放上去，一眼认人。
- **MBTI 面板 + 雷达图**：把「技能」换成性格维度，四维天平条 + 发光雷达，更真实也有新意。
- **互动成长时间线**：滚动触发的动画时间轴，讲你的求学故事。
- **成长足迹卡片 + 灯箱**：没有作品也不慌，写你正在做的事；**每张卡都能配图**（放自己的照片，留空则显示字母块），点击弹出详情。
- **版本历程**：点开就能看这个网站「一步步长成现在这样」，**每个版本独立成文件夹**，并在 GitHub 上各对应一个 **Release**（评委加分项）。
- **迷你 AI 对话彩蛋**：右下角浮动聊天窗，用预设关键词应答（纯前端、无需 API），评委可当场互动 —— 契合 vibe ai lab 身份。
- **视觉炫技**：卡片鼠标视差 3D 倾斜 + 可开关的 Matrix 代码雨背景（左下角「代码雨」按钮，零依赖）。
- **学业绩点卡**：放两张教务系统绩点截图，点开灯箱放大，真实硬货。
- **页脚实时时钟 + 访客计数**：本地实时时间 + localStorage 访客计数（诚实标注为本地计数）。
- **明暗主题切换** + **移动端适配** + **无障碍支持**（焦点可见、减动效）。
- **零依赖、零构建**：纯静态 HTML/CSS/JS，GitHub Pages 直接托管，加载飞快。

## 📁 目录结构

```
portfolio/
├── index.html              # 最新版（v5.0）主文件
├── 404.html                # 自定义 404
├── RELEASES.md             # 👈 各版本对应的 GitHub Release 发布指南
├── versions/               # 每个版本独立成文件夹
│   ├── v1/index.html       # v1.0 朴素文字版（2026.10）
│   ├── v2/index.html       # v2.0 有了设计感（2026.10）
│   ├── v3/index.html       # v3.0 赛博科技风完整版（2026.10）
│   └── v4/index.html       # v4.0 AI 彩蛋 / 视觉增强 / 学业卡（含自带 assets）
├── assets/
│   ├── css/style.css       # 全部样式（变量驱动双主题）
│   ├── js/
│   │   ├── data.js         # 👈 你主要改这里：所有文字内容
│   │   ├── particles.js    # Hero 粒子背景
│   │   ├── radar.js        # MBTI 雷达图
│   │   ├── matrix.js       # Matrix 代码雨开关
│   │   ├── chat.js         # 迷你 AI 对话彩蛋
│   │   └── main.js         # 交互主控
│   └── img/                # favicon / 头像 / 绩点与足迹占位图
└── README.md
```

## 🚀 部署到 GitHub Pages

### 方式 A：网页手动上传（最简单，无需命令行）
适用于仓库已建好、不想折腾 git 的情况。

1. 下载本项目的 `personal-site.zip`（**解压即根目录**，解压出来直接就是站点文件，不会多套一层文件夹）。
2. 打开 `github.com/acpclFeng/personal-site` → 点 **Add file → Upload files**。
3. 把解压出的**全部内容**一起拖进上传框提交：
   `index.html`、`404.html`、`README.md`、`RELEASES.md`、`assets/` 文件夹、`versions/` 文件夹。
   - ⚠️ 关键：`index.html` 必须落在仓库**根目录**（即 `personal-site/index.html`），旁边就是 `assets/` 与 `versions/`。
   - GitHub 支持拖文件夹并保留层级，所以直接拖 `assets/`、`versions/` 两个文件夹即可。
4. 仓库 → **Settings → Pages** → Source 选 **`main` / `(root)`** → Save。
5. 等待 1~2 分钟，访问 `https://acpclFeng.github.io/personal-site/` 即可。

> 发 Release（每个版本一个）请见仓库里的 **`RELEASES.md`**，里面有每个版本的 tag 与可直接复制的发布文案。

### 方式 B：用 git 推送（可选）
```bash
cd portfolio
git init
git add -A
git commit -m "init site"
git branch -M main
git remote add origin https://github.com/acpclFeng/personal-site.git
git push -u origin main
# 然后同方式 A 第 4 步开启 Pages
```

> **AI 对话彩蛋**的回复词库在 `assets/js/chat.js` 的 `REPLIES` 里（纯前端关键词匹配，无需后端）；
> **Matrix 代码雨**开关在 `assets/js/matrix.js`，右下角 🤖 是对话、左下角「代码雨」是代码雨开关。
