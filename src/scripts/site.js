const root = document.documentElement;

function setLanguage(lang) {
  root.dataset.lang = lang;
  localStorage.setItem("lang", lang);
}

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
}

function initThemeToggle() {
  document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });
}

function initLanguageToggle() {
  document.querySelector("[data-lang-toggle]")?.addEventListener("click", () => {
    setLanguage(root.dataset.lang === "zh" ? "en" : "zh");
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
  const elements = Array.from(document.querySelectorAll(".reveal"));
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  elements.forEach((element) => observer.observe(element));
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

  document.querySelector("[data-command-open]")?.addEventListener("click", () => {
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
      input.value = "";
      filterItems();
      window.setTimeout(() => input.focus(), 30);
    }
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

initThemeToggle();
initLanguageToggle();
initScrollProgress();
initReveal();
initCommandMenu();
initBlogFilters();
initCopyEmail();
