/**
 * Command Palette (Ctrl+K / Cmd+K)
 * Fast, keyboard-driven launcher for navigating sections, searching projects,
 * opening articles, changing themes, and performing quick actions.
 */
class CommandPalette {
  constructor() {
    this.modal = document.getElementById("cmd-palette-modal");
    this.input = document.getElementById("cmd-palette-input");
    this.resultsContainer = document.getElementById("cmd-palette-results");
    this.isOpen = false;
    this.selectedIndex = 0;
    this.currentItems = [];

    this.initEvents();
  }

  initEvents() {
    // Global shortcut Ctrl+K / Cmd+K
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        this.toggle();
      } else if (e.key === "Escape" && this.isOpen) {
        e.preventDefault();
        this.close();
      }
    });

    if (this.modal) {
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) {
          this.close();
        }
      });
    }

    if (this.input) {
      this.input.addEventListener("input", () => {
        this.filter(this.input.value);
      });

      this.input.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          this.moveSelection(1);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          this.moveSelection(-1);
        } else if (e.key === "Enter") {
          e.preventDefault();
          this.triggerSelected();
        }
      });
    }
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    if (this.modal) {
      this.modal.classList.add("active");
      this.input.value = "";
      this.input.focus();
      this.filter("");
    }
  }

  close() {
    this.isOpen = false;
    if (this.modal) {
      this.modal.classList.remove("active");
    }
  }

  getItems() {
    const items = [
      // Sections
      { type: "Section", title: "About Overview", desc: "Background & current engineering status", action: () => window.app.scrollToSection("about") },
      { type: "Section", title: "Industry Experience", desc: "AI/ML Engineer & SDE experience (NDA-safe)", action: () => window.app.scrollToSection("experience") },
      { type: "Section", title: "Featured Projects", desc: "Production repositories and live demos", action: () => window.app.scrollToSection("projects") },
      { type: "Section", title: "Research & Honors", desc: "IEEE publication, M.Tech/B.Tech Gold Medal, GATE CS", action: () => window.app.scrollToSection("research") },
      { type: "Section", title: "Skills & Tech Matrix", desc: "GenAI, Search, Deep Learning, MLOps stack", action: () => window.app.scrollToSection("skills") },
      { type: "Section", title: "Technical Blog & Substack", desc: "Engineering deep-dives & architecture breakdowns", action: () => window.app.scrollToSection("blog") },
      { type: "Section", title: "Journey & Git Log", desc: "Milestones and career commits", action: () => window.app.scrollToSection("journey") },
      { type: "Section", title: "Interactive Terminal", desc: "CLI shell emulator in hero", action: () => window.app.scrollToSection("terminal-sec") },
      { type: "Section", title: "Contact Information", desc: "Email, Substack, and professional channels", action: () => window.app.scrollToSection("contact") },

      // Theme Actions
      { type: "Theme", title: "Switch Theme: Dark (Cyber Slate)", desc: "Default modern dark aesthetic", action: () => window.app.setTheme("dark") },
      { type: "Theme", title: "Switch Theme: Matrix (Phosphor Green)", desc: "Retro terminal hacker aesthetic", action: () => window.app.setTheme("matrix") },
      { type: "Theme", title: "Switch Theme: Dracula (Neon Violet)", desc: "Vibrant high-contrast developer theme", action: () => window.app.setTheme("dracula") },
      { type: "Theme", title: "Switch Theme: Light (Clean Monospace)", desc: "Minimalist light code editor style", action: () => window.app.setTheme("light") },

      // Quick Actions
      { type: "Action", title: "Copy Email (santoshkkashyap25@gmail.com)", desc: "Copies email directly to clipboard", action: () => window.app.copyEmail() },
      { type: "Action", title: "Open GitHub Profile", desc: "Visit https://github.com/santoshkkashyap25", action: () => window.open(SITE_CONFIG.profile.github, "_blank") },
      { type: "Action", title: "Open LinkedIn Profile", desc: "Connect professionally on LinkedIn", action: () => window.open(SITE_CONFIG.profile.linkedin, "_blank") },
      { type: "Action", title: "Open Substack Newsletter (@skknotes)", desc: "Read engineering essays at https://substack.com/@skknotes", action: () => window.open(SITE_CONFIG.profile.substack, "_blank") }
    ];

    // Add Projects
    SITE_CONFIG.projects.forEach(p => {
      items.push({
        type: "Project",
        title: `${p.title} (${p.badge})`,
        desc: p.shortDescription,
        action: () => {
          if (p.demoUrl) {
            window.open(p.demoUrl, "_blank");
          } else {
            window.open(p.githubUrl, "_blank");
          }
        }
      });
    });

    // Add Blog Posts
    SITE_CONFIG.blogPosts.forEach(post => {
      items.push({
        type: "Article",
        title: post.title,
        desc: `${post.readTime} • ${post.category}`,
        action: () => window.app.openArticle(post.slug)
      });
    });

    return items;
  }

  filter(query) {
    const q = query.toLowerCase().trim();
    const allItems = this.getItems();

    if (!q) {
      this.currentItems = allItems;
    } else {
      this.currentItems = allItems.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
      );
    }

    this.selectedIndex = 0;
    this.render();
  }

  render() {
    if (!this.resultsContainer) return;

    if (this.currentItems.length === 0) {
      this.resultsContainer.innerHTML = `
        <div class="cmd-no-results">
          <span class="cmd-err">No commands matching query.</span>
        </div>
      `;
      return;
    }

    let html = "";
    this.currentItems.forEach((item, idx) => {
      const isSelected = idx === this.selectedIndex;
      html += `
        <div class="cmd-item ${isSelected ? "selected" : ""}" data-index="${idx}">
          <div class="cmd-item-left">
            <span class="cmd-item-badge badge-${item.type.toLowerCase()}">${item.type}</span>
            <div class="cmd-item-info">
              <span class="cmd-item-title">${item.title}</span>
              <span class="cmd-item-desc">${item.desc}</span>
            </div>
          </div>
          <span class="cmd-item-enter">↵</span>
        </div>
      `;
    });

    this.resultsContainer.innerHTML = html;

    // Attach click listeners to rendered rows
    const renderedRows = this.resultsContainer.querySelectorAll(".cmd-item");
    renderedRows.forEach((row, i) => {
      row.addEventListener("click", () => {
        this.selectedIndex = i;
        this.triggerSelected();
      });
    });

    this.scrollSelectedIntoView();
  }

  moveSelection(direction) {
    if (this.currentItems.length === 0) return;
    this.selectedIndex = (this.selectedIndex + direction + this.currentItems.length) % this.currentItems.length;
    this.render();
  }

  scrollSelectedIntoView() {
    const selected = this.resultsContainer.querySelector(".cmd-item.selected");
    if (selected) {
      selected.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }

  triggerSelected() {
    const selectedItem = this.currentItems[this.selectedIndex];
    if (selectedItem && selectedItem.action) {
      this.close();
      selectedItem.action();
    }
  }
}
