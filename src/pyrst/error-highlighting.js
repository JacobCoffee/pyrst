/**
 * Error highlighting and navigation functions for PyRST
 */

// Parse system messages from HTML and extract error information
function parseSystemMessages(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const systemMessages = doc.querySelectorAll('.system-message');
    const errors = [];

    systemMessages.forEach((msg) => {
        const firstPara = msg.querySelector('p');
        if (!firstPara) return;

        const text = firstPara.textContent;
        // Match patterns like "WARNING/2 (<string>, line 165)" or "ERROR/3 (<string>, line 189)"
        const match = text.match(/(WARNING|ERROR)\/(\d+)\s*\(<string>,\s*line\s*(\d+)\)/);

        if (match) {
            const [, severity, level, lineNumber] = match;

            // Get the error message (rest of the paragraphs)
            const messageParts = [];
            msg.querySelectorAll('p').forEach((p, idx) => {
                if (idx > 0) { // Skip first paragraph (header)
                    messageParts.push(p.textContent.trim());
                }
            });

            errors.push({
                severity: severity.toLowerCase(),
                level: parseInt(level),
                line: parseInt(lineNumber),
                message: messageParts.join(' ') || text
            });
        }
    });

    return errors;
}

// Update error panel with parsed errors
function updateErrorPanel(errors) {
    const errorPanel = document.getElementById('error-panel');
    const errorList = document.getElementById('error-list');
    const errorCount = document.getElementById('error-count');
    const warningCount = document.getElementById('warning-count');

    if (!errorPanel) return; // Panel not yet initialized

    const errorTotal = errors.filter(e => e.severity === 'error').length;
    const warningTotal = errors.filter(e => e.severity === 'warning').length;

    errorCount.textContent = errorTotal;
    warningCount.textContent = warningTotal;

    // Show/hide panel based on errors
    if (errors.length === 0) {
        errorPanel.classList.add('hidden');
        clearEditorHighlights();
        return;
    }

    errorPanel.classList.remove('hidden');

    // Build error list HTML
    errorList.innerHTML = errors.map((error) => `
        <div class="error-item ${error.severity}" data-line="${error.line}" role="button" tabindex="0">
            <div class="error-icon">
                ${error.severity === 'error'
                    ? '<i data-feather="x-circle"></i>'
                    : '<i data-feather="alert-triangle"></i>'}
            </div>
            <div class="error-content">
                <div class="error-header">
                    <span class="error-severity">${error.severity.toUpperCase()}</span>
                    <span class="error-line">Line ${error.line}</span>
                </div>
                <div class="error-message">${error.message}</div>
            </div>
        </div>
    `).join('');

    // Re-initialize feather icons for error panel
    feather.replace({ width: 16, height: 16 });

    // Add click handlers to jump to lines
    errorList.querySelectorAll('.error-item').forEach(item => {
        item.addEventListener('click', () => {
            jumpToLine(parseInt(item.dataset.line));
        });
        item.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                jumpToLine(parseInt(item.dataset.line));
            }
        });
    });

    // Highlight error lines in editor
    highlightEditorLines(errors);
}

// Jump to a specific line in the editor
function jumpToLine(lineNumber) {
    const editor = document.getElementById('editor');
    const lines = editor.value.split('\n');

    // Calculate character offset for the target line
    let offset = 0;
    for (let i = 0; i < lineNumber - 1 && i < lines.length; i++) {
        offset += lines[i].length + 1; // +1 for newline
    }

    // Set cursor position and select the line
    editor.focus();
    editor.selectionStart = offset;
    editor.selectionEnd = offset + (lines[lineNumber - 1]?.length || 0);

    // Scroll line into view
    const lineHeight = parseInt(getComputedStyle(editor).lineHeight);
    const scrollTop = (lineNumber - 1) * lineHeight;
    editor.scrollTop = scrollTop - editor.clientHeight / 2;
}

// Highlight error lines in editor (using background overlay)
function highlightEditorLines(errors) {
    const highlightOverlay = document.getElementById('editor-highlights');
    if (!highlightOverlay) return;

    const editor = document.getElementById('editor');
    const lines = editor.value.split('\n');
    const lineHeight = parseInt(getComputedStyle(editor).lineHeight) || 20;

    // Clear previous highlights
    highlightOverlay.innerHTML = '';

    // Create highlight divs for each error line
    errors.forEach(error => {
        const lineIndex = error.line - 1;
        if (lineIndex < 0 || lineIndex >= lines.length) return;

        const highlight = document.createElement('div');
        highlight.className = `editor-line-highlight ${error.severity}`;
        highlight.style.top = `${lineIndex * lineHeight}px`;
        highlight.style.height = `${lineHeight}px`;
        highlightOverlay.appendChild(highlight);
    });
}

// Clear all editor highlights
function clearEditorHighlights() {
    const highlightOverlay = document.getElementById('editor-highlights');
    if (highlightOverlay) {
        highlightOverlay.innerHTML = '';
    }
}

// Toggle error panel visibility
function toggleErrorPanel() {
    const errorList = document.getElementById('error-list');
    const toggleBtn = document.getElementById('toggle-errors');
    const isCollapsed = errorList.classList.toggle('collapsed');

    if (isCollapsed) {
        toggleBtn.querySelector('i').setAttribute('data-feather', 'chevron-down');
    } else {
        toggleBtn.querySelector('i').setAttribute('data-feather', 'chevron-up');
    }
    feather.replace({ width: 16, height: 16 });
}

// Debounce helper for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
