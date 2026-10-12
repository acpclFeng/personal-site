/* =========================================================
   林棋铭 · Matrix 代码雨（可开关的全屏叠加层，默认关闭）
   纯 Canvas，尊重 prefers-reduced-motion
   ========================================================= */
(function () {
  const btn = document.getElementById("fxToggle");
  const canvas = document.getElementById("matrixCanvas");
  if (!btn || !canvas) return;
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const chars = "アイウエオカキクケコサシスセソタチツテト01林棋铭HDU<>/{}#$%&*=+ABCDEF";
  const fontSize = 16;
  let on = false, raf = null, drops = [], W = 0, H = 0;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    const cols = Math.floor(W / fontSize);
    drops = new Array(cols).fill(0).map(() => Math.random() * -50);
  }

  function draw() {
    ctx.fillStyle = "rgba(5, 8, 22, 0.10)";
    ctx.fillRect(0, 0, W, H);
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize, y = drops[i] * fontSize;
      // 头部亮一点，尾部青色
      ctx.fillStyle = Math.random() > 0.92 ? "#ffffff" : "#00f0ff";
      ctx.fillText(ch, x, y);
      if (y > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    raf = requestAnimationFrame(draw);
  }

  function start() {
    if (reduce) return; // 减动效偏好下不启动
    resize();
    canvas.classList.add("on");
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    draw();
  }
  function stop() {
    canvas.classList.remove("on");
    btn.classList.remove("active");
    btn.setAttribute("aria-pressed", "false");
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    ctx.clearRect(0, 0, W, H);
  }

  btn.addEventListener("click", () => { on = !on; on ? start() : stop(); });
  window.addEventListener("resize", () => { if (on && !reduce) resize(); });
})();
