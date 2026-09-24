/**
 * Core Application Orchestrator
 * Mounts UI components, handles project filtering, blog loading,
 * markdown modal reading, theme persistence, and notifications.
 */
class PortfolioApp {
  constructor() {
    this.currentTheme = localStorage.getItem("terminal_theme") || "dark";
    this.activeProjectFilter = "all";
    this.activeBlogTag = "all";
    this.blogSearchQuery = "";
    this.embeddedPostsCache = {};

    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.renderHeaderAndHero();
    this.renderStats();
    this.renderSkills();
    this.renderProjects();
    this.renderBlog();
    this.renderJourney();
    this.initNavigation();
    this.initArticleModal();
    this.initTerminal();
    this.initToast();
  }

  setTheme(themeName) {
    this.currentTheme = themeName;
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("terminal_theme", themeName);

    const themeSelect = document.getElementById("theme-selector");
    if (themeSelect) {
      themeSelect.value = themeName;
    }
  }

  renderHeaderAndHero() {
    const nameEls = document.querySelectorAll(".bind-name");
    nameEls.forEach(el => el.textContent = SITE_CONFIG.profile.name);

    const roleEls = document.querySelectorAll(".bind-role");
    roleEls.forEach(el => el.textContent = SITE_CONFIG.profile.role);

    const bioEls = document.querySelectorAll(".bind-bio");
    bioEls.forEach(el => el.textContent = SITE_CONFIG.profile.bio);

    const statusEl = document.getElementById("availability-status");
    if (statusEl) {
      statusEl.textContent = SITE_CONFIG.profile.statusText;
    }
  }

  renderStats() {
    const container = document.getElementById("hero-stats-grid");
    if (!container) return;

    container.innerHTML = SITE_CONFIG.profile.stats.map(s => `
      <div class="stat-card">
        <div class="stat-val font-mono">${s.value}</div>
        <div class="stat-lbl">${s.label}</div>
      </div>
    `).join("");
  }

  renderSkills() {
    const container = document.getElementById("skills-container");
    if (!container) return;

    container.innerHTML = SITE_CONFIG.skills.map(cat => `
      <div class="skill-category-card">
        <div class="skill-category-header">
          <div class="skill-icon-wrap">
            <span class="skill-folder-glyph">›</span>
          </div>
          <h3 class="skill-category-title font-mono">${cat.category}</h3>
        </div>
        <div class="skill-pills-wrap">
          ${cat.skills.map(s => `
            <div class="skill-pill">
              <span class="skill-name">${s.name}</span>
              <span class="skill-tag font-mono">${s.tag}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");
  }

  renderProjects() {
    const container = document.getElementById("projects-grid");
    if (!container) return;

    const filtered = this.activeProjectFilter === "all"
      ? SITE_CONFIG.projects
      : SITE_CONFIG.projects.filter(p => p.category === this.activeProjectFilter);

    if (filtered.length === 0) {
      container.innerHTML = `<div class="empty-state font-mono">No repositories found in category "${this.activeProjectFilter}".</div>`;
      return;
    }

    container.innerHTML = filtered.map(p => `
      <div class="project-card ${p.isFeatured ? "featured-project" : ""}">
        <div class="proj-header">
          <div class="proj-meta">
            <span class="proj-badge font-mono">${p.badge}</span>
            <span class="proj-category font-mono">${p.categoryName}</span>
          </div>
          <div class="proj-stars font-mono">
            <span class="star-icon">★</span>
            <span>${p.stars}</span>
          </div>
        </div>

        <h3 class="proj-title font-mono">
          <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer">${p.title}</a>
        </h3>

        <p class="proj-desc">${p.shortDescription}</p>

        <ul class="proj-highlights">
          ${p.highlights.map(h => `<li><span class="bullet">›</span> ${h}</li>`).join("")}
        </ul>

        <div class="proj-tech-stack">
          ${p.technologies.map(t => `<span class="tech-chip font-mono">${t}</span>`).join("")}
        </div>

        <div class="proj-actions">
          <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline font-mono">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <span>Source Code</span>
          </a>
          ${p.demoUrl ? `
            <a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary font-mono">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              <span>Live Demo</span>
            </a>
          ` : `
            <button class="btn btn-disabled font-mono" disabled>
              <span>CLI / Library</span>
            </button>
          `}
        </div>
      </div>
    `).join("");
  }

  filterProjects(category, btnElement) {
    this.activeProjectFilter = category;
    const buttons = document.querySelectorAll(".proj-filter-btn");
    buttons.forEach(b => b.classList.remove("active"));
    if (btnElement) btnElement.classList.add("active");
    this.renderProjects();
  }

  renderBlog() {
    const container = document.getElementById("blog-grid");
    if (!container) return;

    let posts = SITE_CONFIG.blogPosts;

    if (this.blogSearchQuery) {
      const q = this.blogSearchQuery.toLowerCase();
      posts = posts.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (this.activeBlogTag !== "all") {
      posts = posts.filter(p => p.tags.includes(this.activeBlogTag));
    }

    if (posts.length === 0) {
      container.innerHTML = `<div class="empty-state font-mono">No articles found matching your search.</div>`;
      return;
    }

    container.innerHTML = posts.map(post => `
      <article class="blog-card" onclick="window.app.openArticle('${post.slug}')">
        <div class="blog-card-header">
          <span class="blog-category font-mono">${post.category}</span>
          <span class="blog-read-time font-mono">${post.readTime}</span>
        </div>
        <h3 class="blog-card-title">${post.title}</h3>
        <p class="blog-card-summary">${post.summary}</p>
        <div class="blog-card-footer">
          <div class="blog-card-tags">
            ${post.tags.map(t => `<span class="blog-tag font-mono">${t}</span>`).join("")}
          </div>
          <span class="blog-read-link font-mono">
            Read Post <span class="arrow">→</span>
          </span>
        </div>
      </article>
    `).join("");
  }

  filterBlogByTag(tag, tagEl) {
    this.activeBlogTag = tag;
    const tagBtns = document.querySelectorAll(".blog-tag-filter");
    tagBtns.forEach(b => b.classList.remove("active"));
    if (tagEl) tagEl.classList.add("active");
    this.renderBlog();
  }

  searchBlog(query) {
    this.blogSearchQuery = query;
    this.renderBlog();
  }

  renderJourney() {
    const container = document.getElementById("journey-timeline");
    if (!container) return;

    container.innerHTML = SITE_CONFIG.journey.map(item => `
      <div class="commit-item">
        <div class="commit-node">
          <div class="commit-dot type-${item.type}"></div>
          <div class="commit-line"></div>
        </div>
        <div class="commit-content">
          <div class="commit-header">
            <span class="commit-hash font-mono">${item.commitHash}</span>
            <span class="commit-tag font-mono">${item.tag}</span>
            <span class="commit-date font-mono">${item.date}</span>
          </div>
          <h4 class="commit-title">${item.title}</h4>
          <p class="commit-desc">${item.description}</p>
          <div class="commit-stack font-mono">
            ${item.stack.map(s => `<span class="stack-item">${s}</span>`).join("")}
          </div>
        </div>
      </div>
    `).join("");
  }

  initNavigation() {
    // Smooth scrolling
    const links = document.querySelectorAll("a[href^='#']");
    links.forEach(l => {
      l.addEventListener("click", (e) => {
        const href = l.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });

    // Mobile nav toggle
    const toggleBtn = document.getElementById("mobile-menu-toggle");
    const navMenu = document.getElementById("main-nav");
    if (toggleBtn && navMenu) {
      toggleBtn.addEventListener("click", () => {
        navMenu.classList.toggle("nav-open");
      });
      // Close on link click
      navMenu.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => navMenu.classList.remove("nav-open"));
      });
    }

    // Scroll spy for active link indicator
    window.addEventListener("scroll", () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.pageYOffset;

      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll(`.nav-link[href="#${sectionId}"]`).forEach(link => {
            document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
            link.classList.add("active");
          });
        }
      });
    });
  }

  scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  async openArticle(slug) {
    const post = SITE_CONFIG.blogPosts.find(p => p.slug === slug);
    if (!post) return;

    const modal = document.getElementById("article-reader-modal");
    const bodyEl = document.getElementById("reader-body");
    const titleEl = document.getElementById("reader-title");
    const metaEl = document.getElementById("reader-meta");
    const progressBar = document.getElementById("reader-progress-bar");

    if (!modal || !bodyEl) return;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    titleEl.textContent = post.title;
    metaEl.innerHTML = `
      <span class="font-mono">${post.category}</span>
      <span class="sep">•</span>
      <span class="font-mono">${post.date}</span>
      <span class="sep">•</span>
      <span class="font-mono">${post.readTime}</span>
    `;

    bodyEl.innerHTML = `
      <div class="reader-loading font-mono">
        <span class="term-prompt">›</span> Loading article buffer: <code>${post.markdownFile}</code>...
      </div>
    `;

    try {
      let rawMarkdown = "";
      if (this.embeddedPostsCache[post.markdownFile]) {
        rawMarkdown = this.embeddedPostsCache[post.markdownFile];
      } else {
        const resp = await fetch(post.markdownFile);
        if (!resp.ok) throw new Error("Failed to fetch markdown file");
        rawMarkdown = await resp.text();
        this.embeddedPostsCache[post.markdownFile] = rawMarkdown;
      }

      bodyEl.innerHTML = MarkdownRenderer.render(rawMarkdown);
      
      // Reading progress tracker
      const scrollContainer = document.getElementById("reader-scroll-container");
      if (scrollContainer && progressBar) {
        scrollContainer.scrollTop = 0;
        scrollContainer.onscroll = () => {
          const totalHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
          const progress = totalHeight > 0 ? (scrollContainer.scrollTop / totalHeight) * 100 : 0;
          progressBar.style.width = `${progress}%`;
        };
      }
    } catch (err) {
      console.warn("Could not fetch remote markdown directly (common on file:// protocol). Providing fallback viewer.", err);
      // Fallback content rendering
      bodyEl.innerHTML = MarkdownRenderer.render(`
# ${post.title}

*Published on ${post.date} • ${post.readTime} • Category: ${post.category}*

---

> [!NOTE]
> ${post.summary}

### Key Architectural Takeaways:
- **Repository**: [View GitHub Repository](${SITE_CONFIG.profile.github})
- **Topic Focus**: ${post.tags.join(", ")}

*To view the full offline markdown file in your IDE or browser, open: \`${post.markdownFile}\`*
      `);
    }
  }

  closeArticle() {
    const modal = document.getElementById("article-reader-modal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  initArticleModal() {
    const modal = document.getElementById("article-reader-modal");
    const closeBtn = document.getElementById("reader-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeArticle());
    }
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) this.closeArticle();
      });
    }
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeArticle();
    });
  }

  initTerminal() {
    window.terminal = new TerminalController("term-container", "term-input", "term-output");
  }

  initToast() {
    this.toastEl = document.getElementById("site-toast");
  }

  showToast(message, duration = 2500) {
    if (!this.toastEl) return;
    this.toastEl.textContent = message;
    this.toastEl.classList.add("show");
    setTimeout(() => {
      this.toastEl.classList.remove("show");
    }, duration);
  }

  copyEmail() {
    navigator.clipboard.writeText(SITE_CONFIG.profile.email).then(() => {
      this.showToast(`✓ Copied ${SITE_CONFIG.profile.email} to clipboard!`);
    }).catch(() => {
      this.showToast(`Email: ${SITE_CONFIG.profile.email}`);
    });
  }
}

// Global bootstrap
document.addEventListener("DOMContentLoaded", () => {
  window.app = new PortfolioApp();
  window.commandPalette = new CommandPalette();
});
