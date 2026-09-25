/**
 * Interactive Developer Terminal CLI
 * Provides a responsive command-line interface for exploring Santosh's portfolio.
 */
class TerminalController {
  constructor(containerId, inputId, outputId) {
    this.container = document.getElementById(containerId);
    this.input = document.getElementById(inputId);
    this.output = document.getElementById(outputId);
    this.history = [];
    this.historyIndex = -1;
    this.commandList = [
      "help", "about", "experience", "skills", "projects", "research",
      "education", "blog", "read", "resume", "stats", "contact", "theme", "repo", "clear", "gui", "sudo"
    ];

    if (this.input) {
      this.initEvents();
    }
  }

  initEvents() {
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const cmd = this.input.value.trim();
        if (cmd) {
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          this.execute(cmd);
          this.input.value = "";
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (this.history.length > 0 && this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = "";
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        this.autocomplete();
      }
    });

    // Keep terminal focused when clicking terminal body
    if (this.container) {
      this.container.addEventListener("click", () => {
        this.input.focus();
      });
    }
  }

  autocomplete() {
    const val = this.input.value.toLowerCase().trim();
    if (!val) return;
    const match = this.commandList.find(c => c.startsWith(val));
    if (match) {
      this.input.value = match;
    }
  }

  execute(commandString) {
    const trimmed = commandString.trim();
    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Echo command
    this.appendLine(`<span class="term-prompt">santosh@ai-node:~$</span> <span class="term-echo">${this.escapeHtml(trimmed)}</span>`, "term-cmd-echo");

    switch (cmd) {
      case "help":
        this.printHelp();
        break;

      case "about":
        this.appendLine(`
<div class="term-box">
  <div class="term-highlight font-bold">${SITE_CONFIG.profile.name} (${SITE_CONFIG.profile.handle})</div>
  <div class="term-accent">${SITE_CONFIG.profile.role}</div>
  <p class="term-text mt-1">${SITE_CONFIG.profile.bio}</p>
  <div class="term-muted mt-1">Location: ${SITE_CONFIG.profile.location} | Status: ${SITE_CONFIG.profile.statusText}</div>
</div>
        `);
        break;

      case "skills":
        let skillsHtml = '<div class="term-skills-grid">';
        SITE_CONFIG.skills.forEach(cat => {
          skillsHtml += `
            <div class="term-skill-col">
              <div class="term-cat-title">› ${cat.category}</div>
              <ul class="term-list">
                ${cat.skills.map(s => `<li><span class="term-accent">${s.name}</span> <span class="term-badge">${s.level}</span></li>`).join("")}
              </ul>
            </div>
          `;
        });
        skillsHtml += '</div>';
        this.appendLine(skillsHtml);
        break;

      case "projects":
        let projHtml = '<div class="term-projects-list">';
        projHtml += '<div class="term-muted">Showing personal projects (click to view or type <code>repo [name]</code>):</div>';
        SITE_CONFIG.projects.forEach((p, idx) => {
          projHtml += `
            <div class="term-proj-item">
              <span class="term-num">[${idx + 1}]</span>
              <a href="${p.githubUrl}" target="_blank" class="term-link font-bold">${p.title}</a>
              <span class="term-badge">${p.badge}</span>
              <div class="term-text text-sm">${p.shortDescription}</div>
              <div class="term-tech-tags">${p.technologies.slice(0, 5).join(" • ")}</div>
            </div>
          `;
        });
        projHtml += '</div>';
        this.appendLine(projHtml);
        break;

      case "repo":
        if (!args[0]) {
          this.appendLine(`<span class="term-err">Usage: repo &lt;name&gt; (e.g. repo rag, repo sentiment, repo gnn)</span>`);
          return;
        }
        const query = args[0].toLowerCase();
        const foundRepo = SITE_CONFIG.projects.find(p => p.id.includes(query) || p.title.toLowerCase().includes(query));
        if (foundRepo) {
          window.open(foundRepo.githubUrl, "_blank");
          this.appendLine(`Opening repository: <a href="${foundRepo.githubUrl}" target="_blank" class="term-link">${foundRepo.githubUrl}</a>`);
        } else {
          this.appendLine(`<span class="term-err">No matching repository found for "${args[0]}". Type 'projects' to list all.</span>`);
        }
        break;

      case "blog":
        let blogHtml = '<div class="term-blog-list">';
        blogHtml += '<div class="term-muted">Available Engineering Articles:</div>';
        SITE_CONFIG.blogPosts.forEach((post, i) => {
          blogHtml += `
            <div class="term-blog-item">
              <span class="term-num">[${i + 1}]</span>
              <a href="javascript:void(0)" onclick="window.app.openArticle('${post.slug}')" class="term-link font-bold">${post.title}</a>
              <span class="term-muted">(${post.readTime})</span>
              <div class="term-text text-sm">${post.summary}</div>
            </div>
          `;
        });
        blogHtml += '<div class="term-muted mt-1">Tip: Type <code>read 1</code> or click the titles above to open the reader modal.</div>';
        blogHtml += '</div>';
        this.appendLine(blogHtml);
        break;

      case "read":
        if (!args[0]) {
          this.appendLine(`<span class="term-err">Usage: read &lt;number or slug&gt; (e.g. read 1, read rag)</span>`);
          return;
        }
        let targetPost = null;
        const index = parseInt(args[0], 10);
        if (!isNaN(index) && index >= 1 && index <= SITE_CONFIG.blogPosts.length) {
          targetPost = SITE_CONFIG.blogPosts[index - 1];
        } else {
          targetPost = SITE_CONFIG.blogPosts.find(p => p.slug.includes(args[0].toLowerCase()));
        }
        if (targetPost) {
          this.appendLine(`Launching reader for: <span class="term-accent">${targetPost.title}</span>...`);
          window.app.openArticle(targetPost.slug);
        } else {
          this.appendLine(`<span class="term-err">Article not found for query "${args[0]}". Type 'blog' to see all posts.</span>`);
        }
        break;

      case "experience":
        let expHtml = '<div class="term-exp-list">';
        SITE_CONFIG.experience.forEach(exp => {
          expHtml += `
            <div class="term-proj-item">
              <span class="term-accent font-bold">${exp.role}</span> @ <span class="term-highlight">${exp.company}</span>
              <span class="term-badge">${exp.period}</span>
              <div class="term-text text-sm">${exp.highlights[0]}</div>
              <div class="term-tech-tags">${exp.stack.slice(0, 5).join(" • ")}</div>
            </div>
          `;
        });
        expHtml += '</div>';
        this.appendLine(expHtml);
        break;

      case "research":
        const res = SITE_CONFIG.research;
        this.appendLine(`
<div class="term-box">
  <div class="term-highlight font-bold">${res.title}</div>
  <div class="term-accent">${res.badge} • ${res.citation}</div>
  <p class="term-text mt-1">${res.summary}</p>
  <div class="term-tech-tags mt-1">${res.tags.join(" • ")}</div>
</div>
        `);
        break;

      case "education":
        let eduHtml = '<div class="term-box">';
        eduHtml += '<div class="term-highlight font-bold">Academic Degrees:</div>';
        SITE_CONFIG.education.forEach(e => {
          eduHtml += `<div class="mt-1"><span class="term-accent">${e.degree}</span> - ${e.institution} <span class="term-badge">${e.grade}</span></div>`;
          eduHtml += `<div class="term-muted text-sm">${e.details}</div>`;
        });
        eduHtml += '</div>';
        this.appendLine(eduHtml);
        break;

      case "stats":
        this.appendLine(`
<div class="term-box">
  <div class="term-highlight">System Performance & Benchmarks:</div>
  <div>Uptime: <span class="term-accent">99.98% Available</span></div>
  <div>Production Deployments: <span class="term-accent">Active on Cloud</span></div>
  <div>Primary Stack: <span class="term-accent">PyTorch, LangGraph, FastAPI, ONNX Runtime</span></div>
</div>
        `);
        break;

      case "contact":
        this.appendLine(`
<div class="term-box">
  <div class="term-highlight">Contact & Social Channels:</div>
  <div>Email: <a href="mailto:${SITE_CONFIG.profile.email}" class="term-link">${SITE_CONFIG.profile.email}</a></div>
  <div>GitHub: <a href="${SITE_CONFIG.profile.github}" target="_blank" class="term-link">${SITE_CONFIG.profile.github}</a></div>
  <div>LinkedIn: <a href="${SITE_CONFIG.profile.linkedin}" target="_blank" class="term-link">${SITE_CONFIG.profile.linkedin}</a></div>
  <div>Substack: <a href="${SITE_CONFIG.profile.substack}" target="_blank" class="term-link">${SITE_CONFIG.profile.substack}</a></div>
</div>
        `);
        break;

      case "resume":
        this.appendLine(`
<div class="term-box">
  <div class="term-highlight">Resume Request:</div>
  <div>To request my latest comprehensive resume, send an email to:</div>
  <div class="mt-1"><a href="mailto:${SITE_CONFIG.profile.email}?subject=Resume%20Request%20-%20Santosh%20Kumar%20Kashyap" class="term-link">${SITE_CONFIG.profile.email}</a></div>
</div>
        `);
        break;

      case "theme":
        const validThemes = ["dark", "matrix", "dracula", "light"];
        if (!args[0] || !validThemes.includes(args[0].toLowerCase())) {
          this.appendLine(`<span class="term-err">Usage: theme [dark | matrix | dracula | light]</span>`);
          return;
        }
        const selectedTheme = args[0].toLowerCase();
        window.app.setTheme(selectedTheme);
        this.appendLine(`Theme updated to: <span class="term-accent">${selectedTheme}</span>`);
        break;

      case "clear":
        this.output.innerHTML = "";
        return;

      case "gui":
        const targetSec = document.getElementById("projects") || document.body;
        targetSec.scrollIntoView({ behavior: "smooth" });
        this.appendLine(`Navigating to visual view...`);
        break;

      case "sudo":
        this.appendLine(`<span class="term-accent">[SUDO] User santoshkkashyap25 is already in the wheel group. Access granted.</span>`);
        break;

      default:
        this.appendLine(`<span class="term-err">command not found: ${this.escapeHtml(cmd)}. Type <span class="term-link" onclick="window.terminal.runCmd('help')">help</span> for a list of available commands.</span>`);
        break;
    }

    // Scroll to bottom of terminal output
    this.container.scrollTop = this.container.scrollHeight;
  }

  printHelp() {
    this.appendLine(`
<div class="term-help-table">
  <div class="term-help-row"><span class="term-cmd font-bold">about</span> <span class="term-desc">Display profile summary, focus, and status</span></div>
  <div class="term-help-row"><span class="term-cmd font-bold">experience</span> <span class="term-desc">Inspect NDA-safe engineering roles & highlights</span></div>
  <div class="term-help-row"><span class="term-cmd font-bold">skills</span> <span class="term-desc">Show categorized AI/ML and engineering skill matrix</span></div>
  <div class="term-help-row"><span class="term-cmd font-bold">projects</span> <span class="term-desc">List GitHub repositories with live links</span></div>
  <div class="term-help-row"><span class="term-cmd font-bold">research</span> <span class="term-desc">View IEEE publication & concurrency deep learning paper</span></div>
  <div class="term-help-row"><span class="term-cmd font-bold">education</span> <span class="term-desc">Inspect M.Tech/B.Tech degrees and academic background</span></div>
  <div class="term-help-row"><span class="term-cmd font-bold">repo &lt;name&gt;</span> <span class="term-desc">Directly open a repository in GitHub (e.g. repo rag)</span></div>
  <div class="term-help-row"><span class="term-cmd font-bold">blog</span> <span class="term-desc">List technical articles and research breakdowns</span></div>
  <div class="term-help-row"><span class="term-cmd font-bold">read &lt;id&gt;</span> <span class="term-desc">Open article reader modal (e.g. read 1)</span></div>
  <div class="term-help-row"><span class="term-cmd font-bold">resume</span> <span class="term-desc">Get instructions to request latest resume</span></div>
  <div class="term-help-row"><span class="term-cmd font-bold">stats</span> <span class="term-desc">Inspect engineering metrics & system benchmarks</span></div>
  <div class="term-help-row"><span class="term-cmd font-bold">contact</span> <span class="term-desc">Get direct email, Substack, and social channels</span></div>
  <div class="term-help-row"><span class="term-cmd font-bold">theme &lt;name&gt;</span> <span class="term-desc">Change UI palette (dark, matrix, dracula, light)</span></div>
  <div class="term-help-row"><span class="term-cmd font-bold">clear</span> <span class="term-desc">Clear the terminal screen</span></div>
  <div class="term-help-row"><span class="term-cmd font-bold">gui</span> <span class="term-desc">Scroll to graphical projects showcase</span></div>
</div>
    `);
  }

  runCmd(command) {
    if (this.input) {
      this.input.value = command;
      this.execute(command);
      this.input.value = "";
    }
  }

  appendLine(html, customClass = "") {
    const div = document.createElement("div");
    div.className = `term-line ${customClass}`;
    div.innerHTML = html;
    this.output.appendChild(div);
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}
