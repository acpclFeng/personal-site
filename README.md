# NOVA · 赛博科技风个人主页

> 一份为社团考核量身打造的自我介绍网站 —— 不只是一个「关于我」，更是一个能交互、能玩、能打分的作品。

## ✨ 亮点（评委请重点看这里）

- **赛博科技风视觉**：深色霓虹 + 玻璃拟态 + 网格背景，全程统一的设计语言，拒绝模板脸。
- **Hero 粒子星空**：纯 Canvas 实时连线动画（自适应明暗主题、尊重 `prefers-reduced-motion`）。
- **打字机自我介绍**：首屏循环展示你的多重身份。
- **技能雷达图**：Canvas 绘制的发光多边形，一眼看懂能力结构。
- **互动成长时间线**：滚动触发的动画时间轴，讲你的故事。
- **作品画廊 + 灯箱**：卡片网格，点击弹出详情。
- **明暗主题切换** + **移动端适配** + **无障碍支持**（焦点可见、减动效）。
- **零依赖、零构建**：纯静态 HTML/CSS/JS，GitHub Pages 直接托管，加载飞快。

## 📁 目录结构

```
portfolio/
├── index.html              # 单页主文件（结构 / SEO / 无障碍）
├── 404.html                # 自定义 404
├── assets/
│   ├── css/style.css       # 全部样式（变量驱动双主题）
│   ├── js/
│   │   ├── data.js         # 👈 你主要改这里：所有文字内容
│   │   ├── particles.js    # Hero 粒子背景
│   │   ├── radar.js        # 技能雷达图
│   │   └── main.js         # 交互主控
│   └── img/                # favicon / 头像占位
└── README.md
```

## 🛠 本地预览（仅自己看，不要用于交付）

```bash
cd portfolio
python -m http.server 8000
# 浏览器打开 http://localhost:8000
```
> 交付请走 GitHub Pages，不要暴露 localhost 链接。

## 🚀 部署到 GitHub Pages

### 方式 A：网页手动上传（最简单，无需命令行）
适用于仓库已建好、不想折腾 git 的情况。

1. 下载本项目的 `personal-site.zip`，解压得到 `portfolio/` 文件夹。
2. 打开 `github.com/acpclFeng/personal-site` → 点 **Add file → Upload files**。
3. 把解压后的 `portfolio/` 里的**全部内容**（`index.html`、`404.html`、`README.md`、以及整个 `assets/` 文件夹）一起拖进上传框提交。
   - ⚠️ 关键：`index.html` 必须放在仓库**根目录**，不能套一层 `portfolio/` 文件夹。
   - GitHub 支持拖文件夹保留结构，所以直接拖 `assets/` 文件夹即可。
4. 仓库 → **Settings → Pages** → Source 选 **`main` / `(root)`** → Save。
5. 等待 1~2 分钟，访问 `https://acpclFeng.github.io/personal-site/` 即可。

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

## ✏️ 怎么换成「你」的内容

**99% 的修改只需编辑 `assets/js/data.js`**，无需懂代码：

| 想改什么 | 改 `data.js` 里的哪一段 |
|---------|----------------------|
| 名字 / Logo 文字 | `index.html` 中 `logo-text` 与 `hero-title` 的「星野 NOVA」 |
| 首屏循环标语 | `typed` 数组 |
| 一句话介绍 / 标语 | `index.html` 中 `hero-tagline` |
| 关于我段落 | `index.html` 中 `about-text` 区块 |
| 作品 | `projects` 数组（标题/描述/标签/详情） |
| 技能雷达 | `radar` 的 `labels` 与 `values`（0-100） |
| 技能条 | `skillBars` 数组 |
| 成长时间线 | `timeline` 数组 |
| 博客 | `blogs` 数组 |
| 评价 | `testimonials` 数组 |
| 联系方式 | `index.html` 中 `contact-side` + `data.js` 暂无（直接在 HTML 改） |
| 头像 | 替换 `assets/img/avatar.svg`（或换成你的照片） |

## 📝 备注

- 联系表单为前端演示（本地校验 + 成功提示）。要真实收信，可接入 Formspree / 邮件 API / 后端。
- 社交链接（GitHub / 微博 / 小红书）在 `index.html` 的 Header、Footer、Contact 三处，替换 `#` 为你的主页。
