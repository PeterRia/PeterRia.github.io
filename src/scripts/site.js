const root = document.documentElement;

function setLanguage(lang) {
  root.dataset.lang = lang;
  localStorage.setItem("lang", lang);
}

function initLanguageToggle() {
  document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(root.dataset.lang === "zh" ? "en" : "zh");
    });
  });
}

function initScrollProgress() {
  const progress = document.querySelector("[data-scroll-progress]");
  if (!progress) return;

  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable <= 0 ? 0 : window.scrollY / scrollable;
    progress.style.width = `${Math.min(1, Math.max(0, ratio)) * 100}%`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function initReveal() {
  const elements = Array.from(document.querySelectorAll("[data-reveal], .reveal"));
  if (elements.length === 0) return;

  const revealElement = (element) => {
    element.dataset.revealed = "true";
    element.classList.add("is-visible");
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    elements.forEach(revealElement);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealElement(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  elements.forEach((element) => observer.observe(element));
}

function initStickyNav() {
  const nav = document.querySelector("header.nav");
  if (!nav) return;

  const showTop = 100;
  const delta = 6;
  let lastY = window.scrollY || 0;

  const update = () => {
    const y = window.scrollY || 0;
    const change = y - lastY;
    nav.classList.toggle("is-docked", y > 12);

    if (y <= showTop) {
      nav.classList.remove("is-hidden");
    } else if (change > delta) {
      nav.classList.add("is-hidden");
    } else if (change < -delta) {
      nav.classList.remove("is-hidden");
    }

    lastY = y;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initGitHubStars() {
  const target = document.querySelector("[data-github-stars]");
  const repo = target?.dataset.githubRepo;
  if (!target || !repo) return;

  const format = (count) => {
    if (!Number.isFinite(count) || count <= 0) return "0";
    if (count < 1000) return String(count);
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  };

  fetch(`https://api.github.com/repos/${repo}`, {
    headers: { Accept: "application/vnd.github+json" }
  })
    .then((response) => (response.ok ? response.json() : null))
    .then((data) => {
      if (!data || typeof data.stargazers_count !== "number") return;
      const stars = format(data.stargazers_count);
      target.textContent = `Star · ${stars}`;
      target.setAttribute("aria-label", `Open GitHub repository with ${stars} stars`);
    })
    .catch(() => {
      // Leave the static placeholder when the API is unavailable.
    });
}

function initCommandMenu() {
  const dialog = document.querySelector("[data-command-menu]");
  const input = document.querySelector("[data-command-input]");
  const items = Array.from(document.querySelectorAll("[data-command-item]"));
  if (!dialog || !input) return;

  const filterItems = () => {
    const query = input.value.trim().toLowerCase();
    items.forEach((item) => {
      const haystack = `${item.textContent} ${item.dataset.keywords}`.toLowerCase();
      item.hidden = query.length > 0 && !haystack.includes(query);
    });
  };

  document.querySelectorAll("[data-command-open]").forEach((button) => {
    button.addEventListener("click", () => {
      if (typeof dialog.showModal !== "function") return;
      dialog.showModal();
      input.value = "";
      filterItems();
      window.setTimeout(() => input.focus(), 30);
    });
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  input.addEventListener("input", filterItems);
}

function initBlogFilters() {
  const buttons = Array.from(document.querySelectorAll("[data-filter-tag]"));
  const posts = Array.from(document.querySelectorAll("[data-post-card]"));
  if (buttons.length === 0 || posts.length === 0) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const tag = button.dataset.filterTag;
      buttons.forEach((item) => item.classList.toggle("active", item === button));
      posts.forEach((post) => {
        const tags = post.dataset.tags?.split(",") ?? [];
        post.hidden = tag !== "all" && !tags.includes(tag);
      });
    });
  });
}

function initCopyEmail() {
  document.querySelector("[data-copy-email]")?.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    const email = button.dataset.copyEmail;
    if (!email || !navigator.clipboard) return;
    await navigator.clipboard.writeText(email);
    button.dataset.copied = "true";
    window.setTimeout(() => delete button.dataset.copied, 1400);
  });
}

initLanguageToggle();
initScrollProgress();
initReveal();
initStickyNav();
initGitHubStars();
initCommandMenu();
initBlogFilters();
initCopyEmail();
