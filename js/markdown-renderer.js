/**
 * Lightweight, zero-dependency Markdown Parser & Code Syntax Highlighter
 * Supports headers, lists, code blocks, inline code, bold, italic, links,
 * blockquotes, tables, horizontal rules, and copyable code snippets.
 */
const MarkdownRenderer = {
  render(markdown) {
    if (!markdown) return "";
    
    // Normalize newlines
    let src = markdown.replace(/\r\n/g, "\n");

    // Preserve code blocks before running inline regexes
    const codeBlocks = [];
    src = src.replace(/```([a-zA-Z0-9_\-\+]*)\n([\s\S]*?)```/g, (match, lang, code) => {
      const id = `__CODE_BLOCK_${codeBlocks.length}__`;
      codeBlocks.push({ lang: lang.trim() || "text", code });
      return id;
    });

    // Inline math or block math styling
    src = src.replace(/\$\$([\s\S]*?)\$\$/g, '<div class="math-block"><code>$1</code></div>');
    src = src.replace(/\$([^\$\n]+)\$/g, '<code class="math-inline">$1</code>');

    // Headers
    src = src.replace(/^######\s+(.*$)/gim, '<h6 class="md-h6">$1</h6>');
    src = src.replace(/^#####\s+(.*$)/gim, '<h5 class="md-h5">$1</h5>');
    src = src.replace(/^####\s+(.*$)/gim, '<h4 class="md-h4">$1</h4>');
    src = src.replace(/^###\s+(.*$)/gim, '<h3 class="md-h3">$1</h3>');
    src = src.replace(/^##\s+(.*$)/gim, '<h2 class="md-h2">$1</h2>');
    src = src.replace(/^#\s+(.*$)/gim, '<h1 class="md-h1">$1</h1>');

    // Horizontal Rule
    src = src.replace(/^---$/gim, '<hr class="md-divider" />');

    // Blockquotes
    src = src.replace(/^\>\s+(.*$)/gim, '<blockquote class="md-blockquote">$1</blockquote>');

    // Tables
    src = src.replace(/(([^\n]+\|)+[^\n]+\n)(\s*\|?[-:]+[-| :]*\n)((?:[^\n]+\|[^\n]+\n?)+)/g, (match, headerLine, sepLine, rows) => {
      const headers = headerLine.split('|').map(h => h.trim()).filter(h => h.length > 0);
      const ths = headers.map(h => `<th>${h}</th>`).join('');
      
      const trs = rows.trim().split('\n').map(row => {
        const cells = row.split('|').map(c => c.trim()).filter(c => c.length > 0);
        return `<tr>${cells.map(c => `<td>${c}</td>`).join('')}</tr>`;
      }).join('');

      return `<div class="table-responsive"><table class="md-table"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
    });

    // Unordered Lists
    src = src.replace(/^\s*[-*+]\s+(.*)$/gim, '<li class="md-li">$1</li>');
    src = src.replace(/(<li class="md-li">[\s\S]*?<\/li>)/g, (match) => {
      return `<ul class="md-ul">${match}</ul>`;
    });
    // Deduplicate nested </ul><ul class="md-ul">
    src = src.replace(/<\/ul>\s*<ul class="md-ul">/g, '');

    // Bold & Italic
    src = src.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    src = src.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    src = src.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Links [text](url)
    src = src.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="md-link">$1 <span class="ext-icon">↗</span></a>');

    // Inline Code
    src = src.replace(/`([^`\n]+)`/g, '<code class="md-code-inline">$1</code>');

    // Paragraphs: separate non-tagged lines
    const lines = src.split('\n');
    const processedLines = [];
    let inP = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) {
        if (inP) {
          processedLines.push('</p>');
          inP = false;
        }
        continue;
      }

      if (line.startsWith('<h') || line.startsWith('<hr') || line.startsWith('<ul') || 
          line.startsWith('<blockquote') || line.startsWith('<div') || line.startsWith('__CODE_BLOCK_')) {
        if (inP) {
          processedLines.push('</p>');
          inP = false;
        }
        processedLines.push(line);
      } else {
        if (!inP) {
          processedLines.push('<p class="md-p">');
          inP = true;
        }
        processedLines.push(line + ' ');
      }
    }
    if (inP) processedLines.push('</p>');
    src = processedLines.join('\n');

    // Restore Code Blocks with Syntax Highlighter & Copy Button
    src = src.replace(/__CODE_BLOCK_(\d+)__/g, (match, idx) => {
      const block = codeBlocks[parseInt(idx, 10)];
      if (!block) return "";

      if (block.lang.toLowerCase() === "mermaid") {
        return `
          <div class="code-window mermaid-window not-prose my-6">
            <div class="code-window-header">
              <div class="window-dots">
                <span class="dot dot-red"></span>
                <span class="dot dot-yellow"></span>
                <span class="dot dot-green"></span>
              </div>
              <span class="code-lang-tag">VECTOR DIAGRAM (MERMAID)</span>
            </div>
            <div class="mermaid p-4 text-center overflow-x-auto">${this.escapeHtml(block.code.trim())}</div>
          </div>
        `;
      }

      const highlighted = this.highlightSyntax(block.code.trim(), block.lang);

      return `
        <div class="code-window">
          <div class="code-window-header">
            <div class="window-dots">
              <span class="dot dot-red"></span>
              <span class="dot dot-yellow"></span>
              <span class="dot dot-green"></span>
            </div>
            <span class="code-lang-tag">${block.lang.toUpperCase()}</span>
            <button class="code-copy-btn" onclick="MarkdownRenderer.copyCode(this)" data-code="${this.escapeAttr(block.code.trim())}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>Copy</span>
            </button>
          </div>
          <pre class="code-pre"><code class="language-${block.lang}">${highlighted}</code></pre>
        </div>
      `;
    });

    return src;
  },

  highlightSyntax(code, lang) {
    if (!lang) return this.escapeHtml(code);
    const l = lang.toLowerCase();

    // Plain text, markdown, shell, terminal: do not apply keyword highlighting
    if (['text', 'txt', 'plain', 'plaintext', 'markdown', 'md', 'bash', 'sh', 'shell', 'console', 'terminal', 'mermaid'].includes(l)) {
      return this.escapeHtml(code);
    }

    // JSON syntax highlighting
    if (l === 'json') {
      return this.escapeHtml(code).replace(
        /("(?:\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*")(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
        (match, string, colon, bool) => {
          if (string) {
            if (colon) {
              return `<span class="tok-kw">${string}</span>${colon}`;
            }
            return `<span class="tok-string">${string}</span>`;
          }
          if (bool) {
            return `<span class="tok-kw">${bool}</span>`;
          }
          return `<span class="tok-num">${match}</span>`;
        }
      );
    }

    // First escape HTML special characters
    const escaped = this.escapeHtml(code);

    // Single-pass tokenizer to ensure HTML tags are never matched or corrupted
    const tokenRegex = /(["'`])(?:\\.|(?!\1)[^\\\n])*\1|(?:#|\/\/)[^\n]*|\b(?:def|class|import|from|return|async|await|if|else|elif|for|while|in|as|try|except|with|const|let|var|function|export|default|true|false|None|null|self|type|interface|struct)\b|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_]\w*(?=\()/g;

    return escaped.replace(tokenRegex, (match) => {
      if (match.startsWith('#') || match.startsWith('//')) {
        return `<span class="tok-comment">${match}</span>`;
      }
      if (match.startsWith('"') || match.startsWith("'") || match.startsWith('`')) {
        return `<span class="tok-string">${match}</span>`;
      }
      if (/^\d/.test(match)) {
        return `<span class="tok-num">${match}</span>`;
      }
      if (/\b(?:def|class|import|from|return|async|await|if|else|elif|for|while|in|as|try|except|with|const|let|var|function|export|default|true|false|None|null|self|type|interface|struct)\b/.test(match)) {
        return `<span class="tok-kw">${match}</span>`;
      }
      return `<span class="tok-fn">${match}</span>`;
    });
  },

  escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  },

  escapeAttr(str) {
    return encodeURIComponent(str);
  },

  copyCode(button) {
    const rawCode = decodeURIComponent(button.getAttribute("data-code"));
    navigator.clipboard.writeText(rawCode).then(() => {
      const span = button.querySelector("span");
      const originalText = span.textContent;
      span.textContent = "Copied!";
      button.classList.add("copied");
      setTimeout(() => {
        span.textContent = originalText;
        button.classList.remove("copied");
      }, 2000);
    });
  }
};
