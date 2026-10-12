/* =========================================================
   NOVA · 技能雷达图（Canvas 发光多边形）
   ========================================================= */
(function () {
  const canvas = document.getElementById("radarCanvas");
  if (!canvas || !window.NOVA_DATA) return;
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const data = window.NOVA_DATA.radar;
  const size = 420;
  canvas.width = size * dpr; canvas.height = size * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const cx = size / 2, cy = size / 2, R = size / 2 - 54;
  const N = data.labels.length;

  function cssVar(name) {
    return getComputedStyle(document.body).getPropertyValue(name).trim();
  }

  function draw() {
    const cyan = cssVar("--cyan") || "#00f0ff";
    const magenta = cssVar("--magenta") || "#ff2bd6";
    const muted = cssVar("--muted") || "#8aa0c8";
    const text = cssVar("--text") || "#e7f0ff";
    ctx.clearRect(0, 0, size, size);

    // 同心网格
    for (let ring = 1; ring <= 4; ring++) {
      const r = (R * ring) / 4;
      ctx.beginPath();
      for (let i = 0; i <= N; i++) {
        const a = (Math.PI * 2 * i) / N - Math.PI / 2;
        const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = muted; ctx.globalAlpha = 0.18; ctx.lineWidth = 1; ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // 轴线 + 标签
    ctx.font = "600 13px Rajdhani, sans-serif";
    for (let i = 0; i < N; i++) {
      const a = (Math.PI * 2 * i) / N - Math.PI / 2;
      const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y);
      ctx.strokeStyle = muted; ctx.globalAlpha = 0.25; ctx.stroke(); ctx.globalAlpha = 1;
      const lx = cx + (R + 26) * Math.cos(a), ly = cy + (R + 26) * Math.sin(a);
      ctx.fillStyle = text; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(data.labels[i], lx, ly);
    }

    // 数据多边形
    ctx.beginPath();
    for (let i = 0; i <= N; i++) {
      const idx = i % N;
      const a = (Math.PI * 2 * idx) / N - Math.PI / 2;
      const r = (R * data.values[idx]) / 100;
      const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, cyan); grad.addColorStop(1, magenta);
    ctx.fillStyle = grad; ctx.globalAlpha = 0.22; ctx.fill(); ctx.globalAlpha = 1;
    ctx.strokeStyle = cyan; ctx.lineWidth = 2; ctx.shadowColor = cyan; ctx.shadowBlur = 14; ctx.stroke();
    ctx.shadowBlur = 0;

    // 顶点
    for (let i = 0; i < N; i++) {
      const a = (Math.PI * 2 * i) / N - Math.PI / 2;
      const r = (R * data.values[i]) / 100;
      const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = cyan; ctx.shadowColor = cyan; ctx.shadowBlur = 10; ctx.fill(); ctx.shadowBlur = 0;
    }
  }

  draw();
  // 主题切换时重绘
  window.addEventListener("nova:themechange", draw);
})();
