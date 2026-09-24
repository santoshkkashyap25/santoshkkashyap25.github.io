# Santosh Kumar Kashyap — GitHub Pages Portfolio & Tech Blog

> Production-grade personal portfolio and engineering research blog for **Santosh Kumar Kashyap** (`santoshkkashyap25`), AI / ML Engineer & GenAI Systems Developer.

Designed with a high-performance **Terminal & Developer Monospace** aesthetic: clean, uncluttered, code-editor inspired, responsive, and completely zero-build.

---

## 🌟 Key Highlights & Features

- **Zero-Build Architecture**: Pure modern HTML5, Vanilla CSS design system, and modular Vanilla JS. Deploys instantly to GitHub Pages with zero compilation pipelines.
- **Interactive Terminal Shell**: Embedded CLI emulator in hero responding to `help`, `about`, `skills`, `projects`, `blog`, `read [id]`, `stats`, `theme`, `contact`, and `clear`, with clickable suggestion chips for mobile and touch devices.
- **Command Palette (`⌘K` / `Ctrl+K`)**: Keyboard-driven launcher for jumping to sections, searching repositories, opening blog posts, copying email, and switching color themes.
- **Dynamic Markdown Blog Reader**: Built-in client-side Markdown parser and syntax highlighter. Read research breakdowns in a modal with reading progress tracking and one-click code copy buttons.
- **Real Production Repositories**: Showcases Santosh's actual GitHub repositories with real tags, highlights, and live Render demo links:
  - `live-rag-fact-checker` (Live RAG claim verification with BM25Okapi re-ranking)
  - `ask-your-doc` (LangGraph PDF chat with verifiable page citations)
  - `sentiment-analysis` (INT8 Quantized RoBERTa on ONNX Runtime with drift monitoring)
  - `fake-news-detection-gnn` (Social misinformation cascade classifier with PyTorch Geometric)
  - `insurance-default-risk-profiler` (Probability-calibrated XGBoost for class imbalance)
  - `kart-ecommerce` (Full-stack Django platform)
  - `iris-flower-classifier` (Scikit-Learn pipeline & REST API)
- **Interactive Git Commit Graph**: Experience and career journey formatted as an authentic `git log --graph --oneline` timeline.
- **Theme Switcher**: 4 developer color palettes:
  - `dark` (Cyber Slate / Terminal default)
  - `matrix` (Phosphor Green hacker aesthetic)
  - `dracula` (Vibrant developer purple, pink & cyan)
  - `light` (Clean paper monospace editor)

---

## 🚀 Local Development

To run the site locally on your machine, simply launch any lightweight local HTTP server:

### Option 1: Python (Built-in)
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

### Option 2: Node.js / npx
```bash
npx serve .
```

---

## 📦 How to Publish to GitHub Pages (`santoshkkashyap25.github.io`)

### Step 1: Initialize Git and Commit
In this directory (`d:\Projects\github-page`):
```bash
git init
git add .
git commit -m "feat: initial commit of developer portfolio & blog"
```

### Step 2: Create Repository on GitHub
Create a public repository named:
```
santoshkkashyap25.github.io
```

### Step 3: Push to GitHub
```bash
git branch -M main
git remote add origin https://github.com/santoshkkashyap25/santoshkkashyap25.github.io.git
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub: `https://github.com/santoshkkashyap25/santoshkkashyap25.github.io`
2. Click **Settings** → **Pages** (in the left sidebar).
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch` (or choose `GitHub Actions` if you want to use `.github/workflows/pages.yml`).
   - **Branch**: Select `main` and folder `/ (root)`.
4. Click **Save**.
5. Your site will be live at:
   ```
   https://santoshkkashyap25.github.io/
   ```

---

## 🛠️ How to Customize Your Site

All your personal data, projects, skills, and blog posts are centralized in one file:
👉 **`js/config.js`**

### 1. Updating Projects
In `js/config.js`, modify or append items to the `SITE_CONFIG.projects` array:
```javascript
{
  id: "my-new-project",
  title: "New Project Name",
  category: "rag", // rag | mlops | deeplearning | web
  categoryName: "RAG & GenAI",
  badge: "NEW",
  stars: 5,
  shortDescription: "Description of your new project...",
  highlights: ["Highlight 1", "Highlight 2"],
  technologies: ["PyTorch", "FastAPI", "Docker"],
  githubUrl: "https://github.com/santoshkkashyap25/my-new-project",
  demoUrl: "https://my-demo-url.com",
  isFeatured: true
}
```

### 2. Adding New Blog Posts
1. Create a new markdown file in the `posts/` folder, for example `posts/my-new-article.md`.
2. Add the entry to the `SITE_CONFIG.blogPosts` array in `js/config.js`:
```javascript
{
  slug: "my-new-article",
  title: "My New Article Title",
  summary: "A brief summary of what this article covers...",
  date: "2026-10-01",
  readTime: "5 min read",
  category: "GenAI & RAG",
  tags: ["RAG", "Python"],
  markdownFile: "posts/my-new-article.md"
}
```

---

## ⌨️ Keyboard Shortcuts & Terminal Commands

| Shortcut / Command | Action |
| :--- | :--- |
| `Ctrl + K` / `Cmd + K` | Open interactive Command Palette |
| `Escape` | Close active reader modal or command palette |
| `help` | In terminal: Show all available shell commands |
| `read 1` | In terminal: Launch article reader for post #1 |
| `theme matrix` | In terminal: Switch theme to Phosphor Green |
| `projects` | In terminal: List GitHub repositories |
| `stats` | In terminal: Display engineering benchmarks |
