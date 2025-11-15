# PyRST Development Guide

This guide covers local development setup, workflows, testing, and contributing to PyRST.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Building and Testing](#building-and-testing)
- [Code Style Guidelines](#code-style-guidelines)
- [Adding New Features](#adding-new-features)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

- **Python**: 3.14 or higher
- **uv**: Python package manager ([installation guide](https://github.com/astral-sh/uv))
- **Modern browser**: Chrome, Firefox, or Safari (for testing)
- **Git**: For version control

### Recommended Tools

- **Code editor**: VS Code, PyCharm, or similar
- **Browser DevTools**: For debugging JavaScript
- **Python debugger**: For debugging Python code

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/JacobCoffee/pyrst.git
cd pyrst
```

### 2. Install Dependencies

```bash
make install
```

This will:
- Create a virtual environment
- Install Python dependencies (docutils, pytest, ruff, etc.)
- Sync dependencies from `pyproject.toml`

**Alternative** (without make):
```bash
uv sync
```

### 3. Start Development Server

```bash
make serve
```

This starts a local HTTP server at `http://localhost:8000` serving the `src/pyrst/` directory.

**Alternative** (without make):
```bash
cd src/pyrst/
uv run python -m http.server 8000
```

### 4. Open in Browser

Navigate to: `http://localhost:8000`

The application should load and initialize Pyodide (may take 10-30 seconds on first load).

## Development Workflow

### Typical Development Cycle

1. **Make code changes** in your editor
2. **Refresh browser** to see changes (no build step!)
3. **Check browser console** for JavaScript errors
4. **Test functionality** manually
5. **Run tests** (when available)
6. **Commit changes** with meaningful messages

### Hot Reloading

PyRST doesn't have hot reloading built in (no build step). To see changes:

1. Save file in editor
2. Refresh browser (Cmd+R / Ctrl+R)

**Tip**: Use browser DevTools "Disable cache" option for faster iteration.

### Browser DevTools

**Console Tab**:
- JavaScript errors and warnings
- Console.log output from app.js
- Pyodide initialization logs

**Network Tab**:
- Pyodide package downloads
- CDN resource loading
- Check for 404s or slow loads

**Application Tab**:
- localStorage inspection (panel sizes)
- View stored preferences

**Elements Tab**:
- Inspect DOM structure
- Debug CSS issues
- View computed styles

## Project Structure

```
pyrst/
├── src/pyrst/              # Main application source
│   ├── index.html          # HTML structure
│   ├── app.js              # Core JavaScript logic
│   ├── app_export.js       # Export functionality
│   ├── error-highlighting.js  # Error detection
│   ├── main.py             # Python RST conversion
│   ├── sample.rst          # Sample content
│   ├── __init__.py         # Python package marker
│   └── css/
│       ├── editor.css      # Editor styling
│       ├── preview.css     # Preview styling
│       └── resizable.css   # Resizable panel styling
├── docs/                   # Documentation
│   ├── ARCHITECTURE.md
│   ├── FEATURES.md
│   ├── DEVELOPMENT.md      # This file
│   ├── API.md
│   └── TOOLBAR.md
├── tests/                  # Test files
│   └── (future test files)
├── pyproject.toml          # Python project config
├── uv.lock                 # Dependency lock file
├── Makefile                # Build commands
├── README.md               # Project README
├── CHANGELOG.md            # Version history
├── CONTRIBUTING.md         # Contribution guide
└── TODO.md                 # Future improvements
```

### Key Files

**index.html**:
- Main HTML structure
- Loads CSS and JavaScript
- Defines editor, preview, toolbar, error panel

**app.js**:
- Pyodide initialization
- Toolbar button handlers
- Resizable panel logic
- RST conversion orchestration

**app_export.js**:
- Copy to clipboard functions
- Download file functions
- Toast notifications

**error-highlighting.js**:
- Parse docutils system messages
- Error panel management
- Line highlighting and navigation

**main.py**:
- `convert_rst(rst_text)` function
- docutils integration
- Error handling

**CSS files**:
- Modular CSS for different concerns
- Tailwind classes used in HTML
- Custom styles for RST elements

## Building and Testing

### No Build Step Required

PyRST is a static site with no build step:
- HTML/CSS/JS served directly
- Pyodide loaded from CDN
- No transpilation needed

### Running Tests

**Current Status**: Tests are in development.

**Future Testing**:
```bash
# Unit tests
pytest tests/

# Pyodide tests (in-browser)
pytest --pyodide tests/
```

**Manual Testing Checklist**:
- [ ] Toolbar buttons insert correct RST syntax
- [ ] Preview updates after typing
- [ ] Errors appear in error panel
- [ ] Error line highlighting works
- [ ] Click error to jump to line
- [ ] Resizable panels save/load sizes
- [ ] Copy RST to clipboard
- [ ] Copy HTML to clipboard
- [ ] Download RST file
- [ ] Download HTML file
- [ ] Download PDF (print dialog)
- [ ] Toast notifications appear
- [ ] Loading screen shows during init
- [ ] Sample content loads correctly

### Code Quality Tools

**Ruff** (Python linter/formatter):
```bash
uv run ruff check src/
uv run ruff format src/
```

**Browser Console**:
- Check for JavaScript errors
- Warning about deprecated APIs
- Pyodide error messages

## Code Style Guidelines

### Python

**Style**: Follow PEP 8 with ruff defaults

**Guidelines**:
- Type hints on function signatures
- Docstrings for public functions
- 4-space indentation
- Max line length: 100 characters
- Use descriptive variable names

**Example**:
```python
def convert_rst(rst_text: str) -> str:
    """Convert reStructuredText to HTML.

    Args:
        rst_text: Input RST content

    Returns:
        HTML output string
    """
    # Implementation
```

### JavaScript

**Style**: Modern ES6+ JavaScript

**Guidelines**:
- Use const/let, avoid var
- Arrow functions for callbacks
- Template literals for strings
- Async/await for promises
- JSDoc comments for complex functions
- 4-space indentation
- Descriptive function names

**Example**:
```javascript
/**
 * Convert RST text to HTML using Pyodide
 * @param {string} rstText - RST input
 * @returns {Promise<string>} HTML output
 */
async function convertRST(rstText) {
    pyodide.globals.set('rst_input', rstText);
    const htmlString = await pyodide.runPythonAsync(`
        publish_string(rst_input, writer_name="html5").decode("utf-8")
    `);
    return htmlString;
}
```

### HTML

**Style**: Semantic HTML5

**Guidelines**:
- Use semantic elements (header, main, section, footer)
- Include ARIA labels for accessibility
- Tailwind classes for styling
- Meaningful IDs and class names

### CSS

**Style**: BEM-like naming, modular

**Guidelines**:
- One CSS file per concern (editor, preview, resizable)
- Descriptive class names
- Mobile-first approach
- Use CSS variables for colors (future)

## Adding New Features

### 1. Toolbar Button

**Example**: Adding a "strikethrough" button

**Step 1**: Add button to HTML (index.html)
```html
<button id="btn-strikethrough" class="toolbar-btn" title="Strikethrough">
    <i data-feather="minus"></i>
</button>
```

**Step 2**: Add event handler (app.js)
```javascript
document.getElementById('btn-strikethrough')
    .addEventListener('click', () => wrapText('~~'));
```

**Step 3**: Test functionality

### 2. Export Format

**Example**: Adding JSON export

**Step 1**: Add button (index.html)
```html
<button id="btn-download-json" class="export-btn" title="Download JSON">
    <i data-feather="download"></i>
    <span class="text-xs ml-1">JSON</span>
</button>
```

**Step 2**: Add export function (app_export.js)
```javascript
function downloadJSONFile() {
    const editor = document.getElementById('editor');
    const data = { rst: editor.value, timestamp: Date.now() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('JSON file downloaded!', 'success');
}
```

**Step 3**: Register handler (app_export.js)
```javascript
function initExportButtons() {
    // ... existing buttons
    document.getElementById('btn-download-json')
        .addEventListener('click', downloadJSONFile);
}
```

### 3. New CSS Theme

**Example**: Adding dark mode

**Step 1**: Add theme toggle button (index.html)

**Step 2**: Create dark mode CSS variables (editor.css)
```css
body.dark-mode {
    --bg-color: #1a1a1a;
    --text-color: #e0e0e0;
    /* ... more variables */
}
```

**Step 3**: Add toggle function (app.js)
```javascript
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}
```

### 4. Python Function

**Example**: Adding custom RST directive support

**Step 1**: Update main.py
```python
def convert_rst(rst_text: str) -> str:
    """Convert RST with custom directives."""
    from docutils import nodes
    from docutils.parsers.rst import Directive

    # Define custom directive
    class CustomDirective(Directive):
        # Implementation
        pass

    # Register directive
    directives.register_directive('custom', CustomDirective)

    # Convert as usual
    return publish_string(rst_text, writer_name="html5").decode("utf-8")
```

**Step 2**: Test in editor

## Troubleshooting

### Pyodide Won't Load

**Symptom**: Infinite loading screen

**Possible Causes**:
1. Network issues (CDN unreachable)
2. Browser doesn't support WASM
3. JavaScript errors during init

**Solutions**:
1. Check browser console for errors
2. Verify internet connection
3. Try different browser
4. Clear browser cache
5. Check Pyodide CDN status

**Debug**:
```javascript
// Add logging in initPyodide()
console.log('Step 1: Loading Pyodide');
pyodide = await loadPyodide();
console.log('Step 2: Pyodide loaded');
```

### Preview Not Updating

**Symptom**: Typing in editor doesn't update preview

**Possible Causes**:
1. JavaScript error in conversion
2. Event listener not attached
3. Debounce too long

**Solutions**:
1. Check console for errors
2. Verify `editor.addEventListener('input', ...)` is called
3. Reduce debounce delay temporarily
4. Check if Pyodide is initialized

**Debug**:
```javascript
editor.addEventListener('input', (e) => {
    console.log('Input event fired:', e.target.value.length);
    debouncedConvert(e.target.value);
});
```

### Errors Not Showing

**Symptom**: Known RST errors don't appear in error panel

**Possible Causes**:
1. System messages hidden by docutils settings
2. Parsing regex not matching
3. Error panel hidden

**Solutions**:
1. Check `report_level` in main.py (should be low to show warnings)
2. Test `parseSystemMessages()` with sample HTML
3. Verify error panel CSS (not `display: none`)

**Debug**:
```javascript
function convertRST(rstText) {
    const html = await convertRST(rstText);
    console.log('HTML output:', html);
    const errors = parseSystemMessages(html);
    console.log('Parsed errors:', errors);
}
```

### localStorage Not Persisting

**Symptom**: Panel sizes reset on refresh

**Possible Causes**:
1. Browser in private/incognito mode
2. localStorage disabled
3. Storage quota exceeded
4. Wrong key name

**Solutions**:
1. Exit private browsing
2. Check browser settings
3. Clear old localStorage data
4. Verify key: `pyrst-panel-sizes`

**Debug**:
```javascript
console.log('Saved sizes:', localStorage.getItem('pyrst-panel-sizes'));
savePanelSizes();
console.log('New sizes:', localStorage.getItem('pyrst-panel-sizes'));
```

### CSS Not Loading

**Symptom**: Unstyled or broken layout

**Possible Causes**:
1. Wrong file path
2. CSS syntax error
3. Tailwind CDN blocked
4. Cache issue

**Solutions**:
1. Check Network tab for 404s
2. Validate CSS syntax
3. Check Content Security Policy
4. Hard refresh (Cmd+Shift+R)

**Debug**:
```bash
# Verify CSS files exist
ls -la src/pyrst/css/
```

### Performance Issues

**Symptom**: Slow typing or laggy preview

**Possible Causes**:
1. Very large document
2. Complex RST directives
3. Too many error highlights
4. Browser memory issue

**Solutions**:
1. Increase debounce delay
2. Optimize `highlightEditorLines()`
3. Limit max highlights
4. Close other browser tabs

**Optimization**:
```javascript
// Increase debounce from 300ms to 500ms
const debouncedConvert = debounce(async (text) => {
    // ...
}, 500);
```

## Deployment

### Static Hosting

PyRST is a static site and can be deployed to:

- **GitHub Pages**
- **Netlify**
- **Vercel**
- **Cloudflare Pages**
- **AWS S3 + CloudFront**
- Any static file server

### Deployment Steps (GitHub Pages Example)

1. **Push to GitHub**:
   ```bash
   git push origin main
   ```

2. **Configure GitHub Pages**:
   - Repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `main`, folder: `/src/pyrst`

3. **Access site**:
   - URL: `https://username.github.io/pyrst/`

### Build Optimization (Optional)

For production, consider:

1. **Minify CSS**: Inline critical CSS, minify files
2. **Service Worker**: Cache Pyodide for offline use
3. **Preload Resources**: Add `<link rel="preload">` for CDN resources
4. **Lazy Loading**: Load Pyodide on first edit (not on page load)

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for:
- Code of conduct
- Pull request process
- Coding standards
- Review guidelines

## Getting Help

- **Issues**: [GitHub Issues](https://github.com/JacobCoffee/pyrst/issues)
- **Discussions**: [GitHub Discussions](https://github.com/JacobCoffee/pyrst/discussions)
- **Email**: jacob@z7x.org

---

**Last Updated**: 2025-11-15
