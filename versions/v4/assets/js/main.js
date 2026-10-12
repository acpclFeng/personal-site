/* =========================================================
   林棋铭 · 主控脚本
   导航 / 主题 / 打字机 / 滚动动画 / 灯箱 / 表单 / 数据注入 / 时钟
   ========================================================= */
(function () {
  const D = window.NOVA_DATA || {};

  /* ---- 年份 ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Header 滚动态 + 进度条 + scrollspy ---- */
  const header = document.getElementById("siteHeader");
  const progress = document.getElementById("scrollProgress");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  function onScroll() {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 30);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
    let current = sections[0];
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= 120) current = s;
    }
    navLinks.forEach(a =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + current.id)
    );
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- 移动端菜单 ---- */
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", open);
      mobileMenu.setAttribute("aria-hidden", !open);
    });
    mobileMenu.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
      })
    );
  }

  /* ---- 主题切换 ---- */
  const themeToggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem("nova-theme");
  if (saved) document.body.setAttribute("data-theme", saved);
  function syncThemeIcon() {
    const t = document.body.getAttribute("data-theme");
    if (themeToggle) themeToggle.querySelector(".theme-icon").textContent = t === "light" ? "☀" : "🌙";
  }
  syncThemeIcon();
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
      document.body.setAttribute("data-theme", next);
      localStorage.setItem("nova-theme", next);
      syncThemeIcon();
      window.dispatchEvent(new Event("nova:themechange"));
    });
  }

  /* ---- 返回顶部 ---- */
  const toTop = document.getElementById("toTop");
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---- 鼠标跟随光晕 ---- */
  const glow = document.getElementById("cursorGlow");
  if (glow && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener("mousemove", e => {
      glow.style.opacity = "1";
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
  }

  /* ---- 打字机 ---- */
  const typedEl = document.getElementById("typedText");
  if (typedEl && D.typed) {
    let ti = 0, ci = 0, deleting = false;
    function tick() {
      const word = D.typed[ti];
      typedEl.textContent = word.slice(0, ci);
      if (!deleting && ci < word.length) { ci++; setTimeout(tick, 70); }
      else if (!deleting && ci === word.length) { deleting = true; setTimeout(tick, 1500); }
      else if (deleting && ci > 0) { ci--; setTimeout(tick, 35); }
      else { deleting = false; ti = (ti + 1) % D.typed.length; setTimeout(tick, 400); }
    }
    tick();
  }

  /* ---- 统计数字动画 ---- */
  function animateCount(el) {
    const target = +el.dataset.count; let cur = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const timer = setInterval(() => {
      cur += step; if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = cur;
    }, 30);
  }

  /* ---- 通用 reveal 观察器 ---- */
  const revealEls = document.querySelectorAll(
    ".section-head, .about-card, .skills-grid, .contact-grid, .project-card, .blog-card, .academic-card, .version-item"
  );
  revealEls.forEach(el => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        e.target.querySelectorAll?.("[data-count]").forEach(animateCount);
        if (e.target.matches("[data-count]")) animateCount(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ---- 3D 倾斜（鼠标视差） ---- */
  function initTilt() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.querySelectorAll("[data-tilt]").forEach(card => {
      card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  /* ---- 时间线观察器 ---- */
  const tlItems = document.querySelectorAll(".tl-item");
  const tlIo = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("show"), i * 80);
        tlIo.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  /* ---- 灯箱（文字详情 + 图片） ---- */
  const lb = document.getElementById("lightbox");
  const lbBody = document.getElementById("lightboxBody");
  const lbClose = document.getElementById("lightboxClose");
  function openLightbox(p) {
    lbBody.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.detail}</p>
      <div class="lb-tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>`;
    lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
  }
  function openImgLightbox(src, cap) {
    lbBody.innerHTML = `<img class="lb-img" src="${src}" alt="${cap}" /><p>${cap}</p>`;
    lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
  }
  function closeLightbox() { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); }
  if (lb) {
    lbClose.addEventListener("click", closeLightbox);
    lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });
  }

  /* ---- 注入：成长足迹卡片 ---- */
  const pg = document.getElementById("projectGrid");
  if (pg && D.projects) {
    D.projects.forEach(p => {
      const card = document.createElement("article");
      card.className = "project-card reveal";
      card.setAttribute("data-tilt", "");
      card.innerHTML = `
        <div class="project-thumb"><span>${p.thumb}</span></div>
        <div class="project-body">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <div class="project-tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
        </div>`;
      card.addEventListener("click", () => openLightbox(p));
      pg.appendChild(card);
      io.observe(card);
    });
  }

  /* ---- 注入：学业绩点卡 ---- */
  const ag = document.getElementById("academicsGrid");
  if (ag && D.academics) {
    D.academics.forEach(a => {
      const card = document.createElement("article");
      card.className = "academic-card reveal";
      card.setAttribute("data-tilt", "");
      card.innerHTML = `
        <div class="academic-img"><img src="${a.src}" alt="${a.cap}" loading="lazy" /></div>
        <div class="academic-cap">${a.cap}</div>
        <div class="academic-note">${a.note}</div>`;
      card.addEventListener("click", () => openImgLightbox(a.src, a.cap));
      ag.appendChild(card);
      io.observe(card);
    });
  }

  /* ---- 注入：MBTI 面板 ---- */
  const mp = document.getElementById("mbtiPanel");
  if (mp && D.mbti) {
    const m = D.mbti;
    const head = document.createElement("div");
    head.className = "mbti-head";
    head.innerHTML = `<span class="mbti-type">${m.type}</span><span class="mbti-nick">${m.nickname}</span>`;
    mp.appendChild(head);

    const sum = document.createElement("p");
    sum.className = "mbti-summary";
    sum.textContent = m.summary;
    mp.appendChild(sum);

    const axesWrap = document.createElement("div");
    axesWrap.className = "mbti-axes";
    (m.axes || []).forEach(a => {
      const right = a.value >= 50;
      const strength = right ? a.value : 100 - a.value;
      const leftTxt = right ? a.left : `${a.left} · ${strength}%`;
      const rightTxt = right ? `${a.right} · ${strength}%` : a.right;
      const row = document.createElement("div");
      row.className = "mbti-axis";
      row.innerHTML = `
        <div class="mbti-axis-top">
          <span class="${right ? "dim" : "win"}">${leftTxt}</span>
          <span class="${right ? "win" : "dim"}">${rightTxt}</span>
        </div>
        <div class="mbti-track"><div class="mbti-fill" data-w="${a.value}"></div></div>`;
      axesWrap.appendChild(row);
    });
    mp.appendChild(axesWrap);

    const mIo = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          mp.querySelectorAll(".mbti-fill").forEach(f => f.style.width = f.dataset.w + "%");
          mIo.disconnect();
        }
      });
    }, { threshold: 0.3 });
    mIo.observe(mp);
  }

  /* ---- 注入：成长时间线 ---- */
  const tl = document.getElementById("timeline");
  if (tl && D.timeline) {
    D.timeline.forEach(t => {
      const item = document.createElement("div");
      item.className = "tl-item";
      item.innerHTML = `
        <div class="tl-year">${t.year}</div>
        <div class="tl-card"><h3>${t.title}</h3><p>${t.desc}</p></div>`;
      tl.appendChild(item);
    });
    tl.querySelectorAll(".tl-item").forEach(el => tlIo.observe(el));
  }

  /* ---- 注入：最近在做（原博客位） ---- */
  const ng = document.getElementById("nowGrid");
  if (ng && D.now) {
    D.now.forEach(b => {
      const card = document.createElement("article");
      card.className = "blog-card reveal";
      card.innerHTML = `
        <div class="blog-meta">${b.date}</div>
        <h3>${b.title}</h3>
        <p>${b.desc}</p>`;
      ng.appendChild(card);
      io.observe(card);
    });
  }

  /* ---- 注入：版本历程（可点击打开真实页面） ---- */
  const vl = document.getElementById("versionList");
  if (vl && D.versions) {
    D.versions.forEach(v => {
      const a = document.createElement("a");
      a.className = "version-item reveal";
      a.href = v.href;
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML = `
        <div class="version-tag">${v.tag}</div>
        <div class="version-info"><strong>${v.title}</strong><span>${v.info}</span></div>
        <span class="version-go">打开 →</span>`;
      vl.appendChild(a);
      io.observe(a);
    });
  }

  /* ---- 联系表单（无后端：本地校验 + 唤起邮件客户端真实发信） ---- */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  const OWNER_EMAIL = "1528139286@qq.com";
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = form.name, email = form.email, msg = form.message;
      let ok = true;
      [name, email, msg].forEach(f => f.classList.remove("invalid"));
      if (!name.value.trim()) { name.classList.add("invalid"); ok = false; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) { email.classList.add("invalid"); ok = false; }
      if (!msg.value.trim()) { msg.classList.add("invalid"); ok = false; }
      if (!ok) {
        note.textContent = "请检查标红的字段是否填写正确。";
        note.className = "form-note err";
        return;
      }
      const subject = encodeURIComponent(`来自个人主页的消息 · ${name.value.trim()}`);
      const body = encodeURIComponent(
        `称呼：${name.value.trim()}\n对方邮箱：${email.value.trim()}\n\n${msg.value.trim()}`
      );
      note.textContent = "✓ 已唤起你的邮件客户端，确认发送即可。";
      note.className = "form-note ok";
      window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
    });
  }

  /* ---- 页脚：本地实时时钟 + 访客计数器（localStorage） ---- */
  const clockEl = document.getElementById("localClock");
  if (clockEl) {
    const pad = n => String(n).padStart(2, "0");
    const tickClock = () => {
      const d = new Date();
      clockEl.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };
    tickClock();
    setInterval(tickClock, 1000);
  }
  const vc = document.getElementById("visitCount");
  if (vc) {
    let n = parseInt(localStorage.getItem("林棋铭-visits") || "0", 10) + 1;
    localStorage.setItem("林棋铭-visits", String(n));
    vc.textContent = n;
  }

  /* ---- 初始化 3D 倾斜 ---- */
  initTilt();
})();
