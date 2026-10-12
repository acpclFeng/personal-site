/* =========================================================
   林棋铭 · 打字测速小游戏（纯前端，无依赖）
   作为「成长足迹 · 编程」卡片的可玩作品：逐字高亮对错，
   实时计算 WPM / 准确率 / 用时，localStorage 记录最好成绩。
   ========================================================= */
(function () {
  const modal = document.getElementById("gameModal");
  if (!modal) return;
  const targetEl = modal.querySelector("#typeTarget");
  const input = modal.querySelector("#typeInput");
  const wpmEl = modal.querySelector("#typeWpm");
  const accEl = modal.querySelector("#typeAcc");
  const timeEl = modal.querySelector("#typeTime");
  const bestEl = modal.querySelector("#typeBest");
  const restartBtn = modal.querySelector("#typeRestart");
  const tipEl = modal.querySelector("#typeTip");

  // 英文样本（介绍 林棋铭），标准 WPM 按 5 字符 = 1 词计算
  const TEXT =
    "I am 林棋铭, a sophomore in Computer Science at Hangzhou Dianzi University Joint Institute. " +
    "I love exploring new things and playing badminton. " +
    "I serve as the office minister of the student union, and I have learned Python and Java so far.";

  let chars = [];
  let startTime = null;
  let finished = false;
  let timerId = null;

  function renderTarget() {
    targetEl.innerHTML = "";
    chars = [];
    for (const ch of TEXT) {
      const s = document.createElement("span");
      s.className = "t-char";
      s.textContent = ch;
      targetEl.appendChild(s);
      chars.push(s);
    }
  }

  function compute() {
    const val = input.value;
    let correct = 0;
    for (let i = 0; i < chars.length; i++) {
      const s = chars[i];
      if (i < val.length) {
        const ok = val[i].toLowerCase() === TEXT[i].toLowerCase();
        if (ok) { s.className = "t-char t-ok"; correct++; }
        else { s.className = "t-char t-bad"; }
      } else if (i === val.length) {
        s.className = "t-char t-cur";
      } else {
        s.className = "t-char";
      }
    }
    const typed = val.length;
    const acc = typed ? Math.round((correct / typed) * 100) : 100;
    accEl.textContent = acc + "%";
    if (startTime) {
      const sec = (Date.now() - startTime) / 1000;
      timeEl.textContent = sec.toFixed(1) + "s";
      const wpm = sec > 0 ? Math.round((correct / 5) / (sec / 60)) : 0;
      wpmEl.textContent = wpm;
    }
    return { correct, typed };
  }

  function startTimerIfNeeded() {
    if (!startTime && input.value.length > 0) {
      startTime = Date.now();
      timerId = setInterval(() => { if (!finished) compute(); }, 200);
    }
  }

  function finish() {
    finished = true;
    clearInterval(timerId);
    const sec = (Date.now() - startTime) / 1000;
    const { correct, typed } = compute();
    const acc = typed ? Math.round((correct / typed) * 100) : 0;
    const wpm = sec > 0 ? Math.round((correct / 5) / (sec / 60)) : 0;
    wpmEl.textContent = wpm;
    accEl.textContent = acc + "%";
    timeEl.textContent = sec.toFixed(1) + "s";
    let best = parseInt(localStorage.getItem("林棋铭-typing-best") || "0", 10);
    if (wpm > best) { best = wpm; localStorage.setItem("林棋铭-typing-best", String(best)); }
    bestEl.textContent = best;
    input.disabled = true;
    if (tipEl) tipEl.textContent = "完成！挑战更高 WPM 🚀（点『重新开始』再来一次）";
  }

  function reset() {
    finished = false;
    startTime = null;
    input.value = "";
    input.disabled = false;
    wpmEl.textContent = "0";
    accEl.textContent = "100%";
    timeEl.textContent = "0.0s";
    renderTarget();
    if (tipEl) tipEl.textContent = "照着上面这段文字打，看看你的速度和准确率～";
    setTimeout(() => input.focus(), 50);
  }

  input.addEventListener("input", () => { startTimerIfNeeded(); compute(); if (!finished && input.value.length >= TEXT.length) finish(); });
  restartBtn.addEventListener("click", reset);

  // 供 main.js 在打开弹窗时调用
  window.__typingReset = reset;

  renderTarget();
  bestEl.textContent = parseInt(localStorage.getItem("林棋铭-typing-best") || "0", 10);
})();
