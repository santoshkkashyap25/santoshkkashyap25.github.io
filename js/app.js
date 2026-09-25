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
    this.renderExperience();
    this.renderProjects();
    this.renderResearchAndHonors();
    this.renderSkills();
    this.renderBlog();
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

  renderExperience() {
    const container = document.getElementById("experience-container");
    if (!container || !SITE_CONFIG.experience) return;

    container.innerHTML = SITE_CONFIG.experience.map((exp, idx) => `
      <div class="exp-card ${idx === 0 ? "exp-current" : ""}">
        <div class="exp-card-header">
          <div>
            <div class="exp-role-row font-mono">
              <h3 class="exp-role">${exp.role}</h3>
              <span class="exp-company">@ ${exp.company}</span>
              <span class="exp-badge">${exp.type}</span>
            </div>
            <div class="exp-meta-row font-mono">
              <span class="exp-period">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -1px; margin-right: 4px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>${exp.period}
              </span>
              <span class="exp-location">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -1px; margin-right: 4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>${exp.location}
              </span>
            </div>
          </div>
        </div>

        <ul class="exp-highlights">
          ${exp.highlights.map(h => `<li><span class="bullet">›</span> <span>${h}</span></li>`).join("")}
        </ul>

        <div class="exp-stack">
          ${exp.stack.map(s => `<span class="tech-chip font-mono">${s}</span>`).join("")}
        </div>
      </div>
    `).join("");
  }

  renderResearchAndHonors() {
    const researchEl = document.getElementById("research-card-wrap");
    if (researchEl && SITE_CONFIG.research) {
      const res = SITE_CONFIG.research;
      researchEl.innerHTML = `
        <div class="research-card">
          <div class="research-header">
            <span class="proj-badge font-mono">${res.badge}</span>
            <span class="proj-category font-mono">${res.citation}</span>
          </div>
          <h3 class="research-title font-mono">${res.title}</h3>
          <p class="proj-desc">${res.summary}</p>
          <ul class="proj-highlights">
            ${res.highlights.map(h => `<li><span class="bullet">›</span> ${h}</li>`).join("")}
          </ul>
          <div class="proj-tech-stack">
            ${res.tags.map(t => `<span class="tech-chip font-mono">${t}</span>`).join("")}
          </div>
        </div>
      `;
    }

    const eduHonorsEl = document.getElementById("education-honors-wrap");
    if (eduHonorsEl && SITE_CONFIG.education) {
      eduHonorsEl.innerHTML = `
        <div class="edu-col">
          <h3 class="edu-sec-title font-mono">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 6px;"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>Academic Degrees & Education
          </h3>
          <div class="edu-grid-two">
            ${SITE_CONFIG.education.map(edu => `
              <div class="edu-item">
                <div class="edu-header">
                  <span class="edu-degree font-mono font-bold">${edu.degree}</span>
                  <span class="edu-period font-mono">${edu.period}</span>
                </div>
                <div class="edu-institution">${edu.institution}</div>
                <div class="edu-grade font-mono">${edu.grade}</div>
                <p class="edu-details">${edu.details}</p>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }
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
              <span>${p.demoLabel || "Live Demo"}</span>
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
      this.showToast(`Copied ${SITE_CONFIG.profile.email} to clipboard!`);
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
