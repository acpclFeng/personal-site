/* =========================================================
   NOVA · 主控脚本
   导航 / 主题 / 打字机 / 滚动动画 / 灯箱 / 表单 / 数据注入
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
    // scrollspy
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
    ".section-head, .about-photo, .about-text, .skills-grid, .contact-grid, .project-card, .blog-card, .testi-card, .version-item"
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
  tlItems.forEach(el => tlIo.observe(el));

  /* ---- 注入：项目 ---- */
  const pg = document.getElementById("projectGrid");
  if (pg && D.projects) {
    D.projects.forEach(p => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.innerHTML = `
        <div class="project-thumb"><span>${p.thumb}</span></div>
        <div class="project-body">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <div class="project-tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
        </div>`;
      card.addEventListener("click", () => openLightbox(p));
      pg.appendChild(card);
    });
  }

  /* ---- 灯箱 ---- */
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
  function closeLightbox() { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); }
  if (lb) {
    lbClose.addEventListener("click", closeLightbox);
    lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });
  }

  /* ---- 注入：技能条 ---- */
  const sb = document.getElementById("skillBars");
  if (sb && D.skillBars) {
    D.skillBars.forEach(s => {
      const row = document.createElement("div");
      row.className = "skill-row";
      row.innerHTML = `
        <div class="skill-top"><span>${s.name}</span><span>${s.value}%</span></div>
        <div class="skill-track"><div class="skill-fill" data-w="${s.value}"></div></div>`;
      sb.appendChild(row);
    });
    const sbIo = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          sb.querySelectorAll(".skill-fill").forEach(f => f.style.width = f.dataset.w + "%");
          sbIo.disconnect();
        }
      });
    }, { threshold: 0.3 });
    sbIo.observe(sb);
  }

  /* ---- 注入：时间线 ---- */
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
    // 重新观察新插入的时间线
    tl.querySelectorAll(".tl-item").forEach(el => tlIo.observe(el));
  }

  /* ---- 注入：博客 ---- */
  const bg = document.getElementById("blogGrid");
  if (bg && D.blogs) {
    D.blogs.forEach(b => {
      const card = document.createElement("article");
      card.className = "blog-card";
      card.innerHTML = `
        <div class="blog-meta">${b.date}</div>
        <h3>${b.title}</h3>
        <p>${b.desc}</p>
        <a class="blog-read" href="#">阅读 →</a>`;
      bg.appendChild(card);
    });
  }

  /* ---- 注入：评价 ---- */
  const tg = document.getElementById("testiGrid");
  if (tg && D.testimonials) {
    D.testimonials.forEach(t => {
      const card = document.createElement("div");
      card.className = "testi-card";
      card.innerHTML = `
        <p>${t.text}</p>
        <div class="testi-by">
          <div class="testi-avatar">${t.name[0]}</div>
          <div><div class="testi-who">${t.name}</div><div class="testi-role">${t.role}</div></div>
        </div>`;
      tg.appendChild(card);
    });
  }

  /* ---- 注入：版本 ---- */
  const vl = document.getElementById("versionList");
  if (vl && D.versions) {
    D.versions.forEach(v => {
      const item = document.createElement("div");
      item.className = "version-item";
      item.innerHTML = `
        <div class="version-tag">${v.tag}</div>
        <div class="version-info"><strong>${v.title}</strong><span>${v.info}</span></div>
        <span style="color:var(--cyan)">→</span>`;
      vl.appendChild(item);
    });
  }

  /* ---- 联系表单（无后端：本地校验 + 成功提示） ---- */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
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
      note.textContent = `✓ 已收到，${name.value.trim()}！这是演示表单，部署后可接入真实邮箱/后端。`;
      note.className = "form-note ok";
      form.reset();
    });
  }
})();
