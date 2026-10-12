/* =========================================================
   林棋铭 · 迷你 AI 对话彩蛋（纯前端关键词应答，无需后端 / API）
   ========================================================= */
(function () {
  const fab = document.getElementById("chatFab");
  const panel = document.getElementById("chatPanel");
  const closeBtn = document.getElementById("chatClose");
  const body = document.getElementById("chatBody");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatText");
  if (!fab || !panel || !body || !form) return;

  /* 关键词 → 回复（与 林棋铭 的真实信息一致） */
  const REPLIES = [
    { k: ["你是谁", "介绍", "名字", "是谁"], a: "我是 林棋铭 的 AI 分身～本人是杭电圣光机联合学院计算机科学与技术的大二学生，爱探索、爱打羽毛球，也是院学生会办公室部长。" },
    { k: ["专业", "计算机", "学什么", "专业是"], a: "学的是计算机科学与技术，在杭电圣光机联合学院（中外合作）。目前已经在学 Python 和 Java，继续把基础打扎实。" },
    { k: ["羽毛球", "运动", "打球", "体育"], a: "羽毛球是我最放松的事！一场球下来既锻炼又清空脑子，有空就来几局 🏸" },
    { k: ["mbti", "性格", "intp", "人格"], a: "我是 INTP（逻辑学家），偏内向、爱独立思考、喜欢先把事情想明白再动手。" },
    { k: ["编程", "代码", "python", "java"], a: "已经学了 Python 和 Java，现在继续把基础打牢，多写多调试，慢慢能上手做点小东西了。" },
    { k: ["学生会", "部长", "办公室"], a: "我在院学生会担任办公室部长，负责文件、通知和活动统筹，学着把琐碎的事安排明白。" },
    { k: ["ai", "lab", "vibe", "人工智能"], a: "我是 vibe ai lab 的成员，和同频的人一起折腾 AI 相关的东西，享受一起把不懂的搞懂的过程。" },
    { k: ["联系", "邮箱", "微信", "qq", "github", "怎么找你"], a: "邮箱 1528139286@qq.com，微信 Lin6533897643864，QQ 1528139286，GitHub github.com/acpclFeng，欢迎找我聊～" },
    { k: ["绩点", "成绩", "gpa", "学业", "学习"], a: "我的绩点情况放在「学业」板块啦，有两张截图可以点开看。" },
    { k: ["版本", "历史", "怎么做的", "过程"], a: "这个网站是一步步长出来的，点导航里的「版本历程」能看到 v1→现在的全过程。" },
    { k: ["课程", "课表", "上什么课", "学什么课"], a: "现在在打基础：程序设计（C）、Python、数据结构、高数、大学英语这些都在学。中外合作项目里还有不少英文课，挺锻炼人的。" },
    { k: ["瑞安", "家乡", "哪里人", "温州"], a: "老家在浙江瑞安～高中也是在瑞安读的（瑞安市上海新纪元高级中学），后来才来杭州上学。" },
    { k: ["规划", "未来", "目标", "打算", "想做啥"], a: "短期把编程基础打牢、把学生会的事做好；再往后想往 AI 方向多试试，毕竟也在 vibe ai lab 里折腾嘛。" },
    { k: ["圣光机", "中外合作", "联合学院", "合作办学"], a: "杭电圣光机联合学院是中外合作办学项目，计算机专业有英文授课和国外的培养模式，体验挺不一样的。" },
    { k: ["大二", "几年级", "大几", "年级"], a: "现在大二在读～时间过得挺快，感觉刚适应大学生活就要开始考虑方向了。" },
    { k: ["学号"], a: "学号是 25320321，杭电 2025 级的那串学号。" },
    { k: ["为什么选", "选计算机", "为什么学", "怎么选的"], a: "选计算机主要是觉得它够开放、能自己动手做出东西，加上也喜欢琢磨逻辑，算是一拍即合吧。" },
    { k: ["探索", "好奇心", "喜欢做什么", "爱好"], a: "我比较爱探索，遇到不懂的就想去查、去试。除了打球，平时也爱东看看西学学新东西。" },
    { k: ["忙", "辛苦", "累", "平衡"], a: "学习和学生会确实都占时间，忙是真的忙，但把事情一件件理清楚也挺有成就感的～" },
    { k: ["谢谢", "感谢", "谢啦", "thank"], a: "不客气～想了解更多随时来找我聊 😊" },
    { k: ["评委", "打分", "考核", "评价", "看什么"], a: "这是 林棋铭 的社团考核作品哦～网站从 v1 纯文字一路迭代到现在的赛博科技风，评委大大可以重点看看「版本历程」和这个彩蛋 😉" },
    { k: ["你好", "hi", "hello", "在吗", "嗨"], a: "嗨～我是 林棋铭 的 AI 分身，随便问我点关于他的事吧 😎" }
  ];
  const FALLBACK = "这个问题有点超纲啦～你可以问我：你是谁 / 专业 / 课程 / 家乡 / 羽毛球 / MBTI / 联系方式 / 版本 / 规划 这类问题 😉";

  function replyFor(text) {
    const t = text.toLowerCase();
    for (const r of REPLIES) {
      if (r.k.some(key => t.includes(key.toLowerCase()))) return r.a;
    }
    return FALLBACK;
  }

  function addMsg(role, text) {
    const el = document.createElement("div");
    el.className = "chat-msg " + role;
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }

  function botSay(text, delay) {
    setTimeout(() => {
      const typing = document.createElement("div");
      typing.className = "chat-msg bot typing";
      typing.textContent = "正在输入…";
      body.appendChild(typing);
      body.scrollTop = body.scrollHeight;
      setTimeout(() => {
        typing.remove();
        addMsg("bot", text);
      }, 500);
    }, delay || 300);
  }

  function openPanel() {
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    fab.setAttribute("aria-expanded", "true");
  }
  function closePanel() {
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    fab.setAttribute("aria-expanded", "false");
  }

  fab.addEventListener("click", () => {
    if (panel.classList.contains("open")) closePanel();
    else {
      openPanel();
      if (!body.dataset.greeted) {
        botSay("你好呀，我是 林棋铭 的 AI 分身 🤖 想了解他什么？试试问我：你是谁 / 专业 / 课程 / 家乡 / 羽毛球 / MBTI / 联系方式～");
        body.dataset.greeted = "1";
      }
      input.focus();
    }
  });
  closeBtn.addEventListener("click", closePanel);

  form.addEventListener("submit", e => {
    e.preventDefault();
    const v = input.value.trim();
    if (!v) return;
    addMsg("user", v);
    input.value = "";
    botSay(replyFor(v));
  });
})();
