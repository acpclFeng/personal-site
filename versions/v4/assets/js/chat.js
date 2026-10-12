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
    { k: ["专业", "计算机", "学什么", "专业是"], a: "学的是计算机科学与技术，在杭电圣光机联合学院（中外合作）。目前还在打基础，从 C 语言和 Python 起步。" },
    { k: ["羽毛球", "运动", "打球", "体育"], a: "羽毛球是我最放松的事！一场球下来既锻炼又清空脑子，有空就来几局 🏸" },
    { k: ["mbti", "性格", "intp", "人格"], a: "我是 INTP（逻辑学家），偏内向、爱独立思考、喜欢先把事情想明白再动手。" },
    { k: ["编程", "代码", "python", "c语言", "c 语言"], a: "现在还是编程入门阶段，在啃 C 和 Python 的基础，慢慢来，先把地基打牢。" },
    { k: ["学生会", "部长", "办公室"], a: "我在院学生会担任办公室部长，负责文件、通知和活动统筹，学着把琐碎的事安排明白。" },
    { k: ["ai", "lab", "vibe", "人工智能"], a: "我是 vibe ai lab 的成员，和同频的人一起折腾 AI 相关的东西，享受一起把不懂的搞懂的过程。" },
    { k: ["联系", "邮箱", "微信", "qq", "github", "怎么找你"], a: "邮箱 1528139286@qq.com，微信 Lin6533897643864，QQ 1528139286，GitHub github.com/acpclFeng，欢迎找我聊～" },
    { k: ["绩点", "成绩", "gpa", "学业", "学习"], a: "我的绩点情况放在「学业」板块啦，有两张截图可以点开看。" },
    { k: ["版本", "历史", "怎么做的", "过程"], a: "这个网站是一步步长出来的，点导航里的「版本历程」能看到 v1→现在的全过程。" },
    { k: ["你好", "hi", "hello", "在吗", "嗨"], a: "嗨～我是 林棋铭 的 AI 分身，随便问我点关于他的事吧 😎" }
  ];
  const FALLBACK = "这个问题有点超纲啦～你可以问我：你是谁 / 专业 / 羽毛球 / MBTI / 联系方式 / 版本 这类问题 😉";

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
        botSay("你好呀，我是 林棋铭 的 AI 分身 🤖 想了解他什么？试试问我：你是谁 / 专业 / 羽毛球 / MBTI～");
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
