# PyRST Architecture

This document describes the system architecture, component breakdown, and technical design decisions for PyRST.

## Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Component Breakdown](#component-breakdown)
- [Data Flow](#data-flow)
- [File Structure](#file-structure)
- [Technology Choices](#technology-choices)

## Overview

PyRST is a client-side web application that runs Python code in the browser using WebAssembly (via Pyodide). The application processes reStructuredText markup and converts it to HTML without any server-side processing.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                   User Interface                       │  │
│  │  ┌─────────────┐      ┌──────────────┐               │  │
│  │  │   Editor    │      │   Preview    │               │  │
│  │  │   Panel     │◄────►│    Panel     │               │  │
│  │  └─────────────┘      └──────────────┘               │  │
│  │  ┌──────────────────────────────────────┐            │  │
│  │  │         Toolbar & Controls            │            │  │
│  │  └──────────────────────────────────────┘            │  │
│  │  ┌──────────────────────────────────────┐            │  │
│  │  │         Error Panel                   │            │  │
│  │  └──────────────────────────────────────┘            │  │
│  └───────────────────────────────────────────────────────┘  │
│                           │                                  │
│  ┌────────────────────────▼──────────────────────────────┐  │
│  │              JavaScript Layer                         │  │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────────┐  │  │
│  │  │  app.js  │  │app_export│  │error-highlighting.js│ │  │
│  │  └──────────┘  └──────────┘  └────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
│                           │                                  │
│  ┌────────────────────────▼──────────────────────────────┐  │
│  │            Pyodide (Python in WASM)                   │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │               main.py                             │ │  │
│  │  │         (RST Processing Logic)                    │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │          docutils Package                         │ │  │
│  │  │      (RST Parser & HTML Generator)                │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              Browser Storage (localStorage)            │  │
│  │                (Panel sizes, preferences)              │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## System Architecture

### Frontend Layer (HTML/CSS/JS)

The frontend is built with vanilla JavaScript and Tailwind CSS, providing:

- **HTML Structure** (`index.html`): Semantic layout with editor, preview, toolbar, and error panels
- **CSS Styling**: Three CSS modules for different concerns:
  - `editor.css`: Editor-specific styles, toolbar, error panel
  - `preview.css`: RST HTML output styling (headings, tables, code blocks, admonitions)
  - `resizable.css`: Drag-to-resize divider styling
- **JavaScript Modules**: Three main JS files:
  - `app.js`: Core initialization, toolbar, resizing, RST conversion
  - `app_export.js`: Export functionality (copy, download as RST/HTML/PDF)
  - `error-highlighting.js`: Error parsing, panel management, line highlighting

### Python Layer (Pyodide/docutils)

The Python layer runs in WebAssembly via Pyodide:

- **main.py**: Contains `convert_rst()` function that uses docutils to parse RST and generate HTML
- **docutils**: Installed via micropip at runtime, provides the RST parser
- **Pyodide Bridge**: JavaScript-Python interop using `pyodide.runPythonAsync()` and `pyodide.globals`

### Storage Layer

- **LocalStorage**: Persists panel sizes across sessions
- **No Server Storage**: All document data stays in the browser

## Component Breakdown

### 1. Editor Panel

**Purpose**: Text input area for writing RST

**Components**:
- Textarea element with monospace font
- Highlight overlay for error/warning line highlighting
- Auto-sync with preview via input events

**Files**:
- `index.html` (lines 77-158)
- `app.js` (toolbar functions)
- `error-highlighting.js` (line highlighting)

### 2. Preview Panel

**Purpose**: Rendered HTML output of RST

**Components**:
- Preview div that displays docutils-generated HTML
- Export buttons (copy/download RST, HTML, PDF)
- Styled with comprehensive CSS for all RST elements

**Files**:
- `index.html` (lines 188-227)
- `preview.css` (all RST element styling)
- `app_export.js` (export functionality)

### 3. Toolbar

**Purpose**: Quick access to common RST formatting

**Components**:
- Header buttons (H1, H2, H3)
- Text formatting (bold, italic, code)
- List buttons (bullet, numbered)
- Link/image insertion
- Block elements (code block, quote, table)

**Files**:
- `index.html` (lines 88-148)
- `app.js` (lines 117-346)

**Key Functions**:
- `addHeading(level)`: Adds RST heading with underline
- `wrapText(prefix, suffix)`: Wraps selection with markers
- `insertText(text)`: Inserts at cursor position
- `insertBulletList()`, `insertNumberedList()`: Smart list insertion
- `insertLink()`, `insertImage()`: Link/image insertion
- `insertCodeBlock()`, `insertBlockquote()`, `insertTable()`: Block insertion

### 4. Error Panel

**Purpose**: Display RST syntax errors and warnings

**Components**:
- Error list with clickable items
- Error/warning counts
- Collapsible panel
- Line jump functionality

**Files**:
- `index.html` (lines 160-181)
- `error-highlighting.js`

**Key Functions**:
- `parseSystemMessages(html)`: Extracts errors from docutils system messages
- `updateErrorPanel(errors)`: Updates UI with error list
- `highlightEditorLines(errors)`: Highlights error lines in editor
- `jumpToLine(lineNumber)`: Scrolls editor to specific line

### 5. Resizable Panels

**Purpose**: Adjustable split between editor and preview

**Components**:
- Draggable divider
- Panel flex sizing
- LocalStorage persistence

**Files**:
- `app.js` (lines 12-111)
- `resizable.css`

**Key Functions**:
- `initResizablePanels()`: Sets up drag handlers
- `loadPanelSizes()`: Restores saved sizes
- `savePanelSizes()`: Persists to localStorage

### 6. Pyodide Integration

**Purpose**: Run Python/docutils in browser

**Components**:
- Pyodide loader
- micropip for package installation
- Python-JavaScript bridge

**Files**:
- `app.js` (lines 351-467)
- `main.py`

**Key Functions**:
- `initPyodide()`: Loads Pyodide, installs docutils, initializes editor
- `convertRST(rstText)`: Calls Python to convert RST to HTML
- `convert_rst(rst_text)`: Python function using docutils

## Data Flow

### Initialization Flow

```
1. Page Load
   ↓
2. DOMContentLoaded Event
   ↓
3. initPyodide()
   ├─ Load Pyodide from CDN
   ├─ Install micropip
   ├─ Install docutils
   ├─ Load main.py
   ├─ Load sample.rst
   ├─ Initialize editor with sample
   ├─ Set up event listeners
   └─ Initialize toolbar, export, resizing
   ↓
4. Ready to Use
```

### Editing Flow

```
1. User types in editor
   ↓
2. 'input' event fired
   ↓
3. Debounced convertRST() called (300ms delay)
   ↓
4. JavaScript → Python bridge
   ├─ Set rst_input in Python globals
   ├─ Run publish_string() via docutils
   └─ Return HTML string
   ↓
5. Parse HTML for system messages
   ↓
6. Update preview panel with HTML
   ↓
7. Update error panel with errors
   ↓
8. Highlight error lines in editor
```

### Export Flow

```
1. User clicks export button
   ↓
2. Export function called
   ├─ Copy RST → clipboard.writeText(editor.value)
   ├─ Copy HTML → clipboard.writeText(preview.innerHTML)
   ├─ Download RST → Blob → download link
   ├─ Download HTML → Full HTML with CSS → download
   └─ PDF → window.print()
   ↓
3. Show toast notification
```

## File Structure

```
pyrst/
├── src/pyrst/
│   ├── index.html              # Main HTML structure
│   ├── app.js                  # Core app logic, toolbar, resizing
│   ├── app_export.js           # Export functions, toast notifications
│   ├── error-highlighting.js   # Error parsing and highlighting
│   ├── main.py                 # Python RST conversion logic
│   ├── sample.rst              # Sample RST content
│   ├── __init__.py             # Empty Python package marker
│   └── css/
│       ├── editor.css          # Editor, toolbar, error panel styles
│       ├── preview.css         # RST HTML output styles
│       └── resizable.css       # Resizable divider styles
├── docs/                       # Documentation
├── tests/                      # Test files
├── pyproject.toml              # Python project metadata
├── Makefile                    # Build commands
├── README.md                   # Project README
└── uv.lock                     # Dependency lock file
```

## Technology Choices

### Why Pyodide?

**Chosen**: Pyodide enables running Python directly in the browser via WebAssembly.

**Alternatives Considered**:
- Pure JavaScript RST parser (none mature enough)
- Server-side processing (defeats "no server" goal)

**Benefits**:
- Use mature docutils library without modification
- No server infrastructure needed
- Instant local processing
- Privacy: no data leaves browser

**Tradeoffs**:
- Initial load time (10-30 seconds for Pyodide + docutils)
- Larger bundle size (~10MB)
- Requires WASM-capable browser

### Why Vanilla JavaScript?

**Chosen**: No framework, pure JavaScript

**Alternatives Considered**:
- React, Vue, Svelte

**Benefits**:
- Zero build step (just serve static files)
- Smaller bundle size
- Faster page load
- Easier debugging
- No framework lock-in

**Tradeoffs**:
- Manual DOM manipulation
- More verbose code for complex UIs

### Why Tailwind CSS via CDN?

**Chosen**: Tailwind CSS loaded from CDN

**Alternatives Considered**:
- Custom CSS only
- Bootstrap
- Compiled Tailwind

**Benefits**:
- Rapid UI development
- Consistent design system
- No build step required
- Responsive utilities built-in

**Tradeoffs**:
- Larger CSS payload (CDN version includes all classes)
- Utility-first approach (verbose HTML)

### Why docutils?

**Chosen**: Official RST implementation

**Alternatives Considered**:
- Custom parser
- Markdown (different syntax)

**Benefits**:
- Standard RST parser used by Sphinx, Python docs
- Comprehensive directive/role support
- Well-tested and maintained
- System messages for error reporting

**Tradeoffs**:
- Python-only (requires Pyodide)
- Larger than minimal parsers

### Why localStorage?

**Chosen**: Browser localStorage for persistence

**Alternatives Considered**:
- IndexedDB
- No persistence
- Server-side storage

**Benefits**:
- Simple API
- Synchronous access
- Sufficient for small data (panel sizes)
- No setup required

**Tradeoffs**:
- Limited storage (5-10MB)
- Cleared on cache clear
- Same-origin only

## Performance Considerations

### Initial Load Optimization

- Pyodide loaded from CDN (cached by browser)
- Loading screen with progress updates
- Async initialization with await/async

### Runtime Optimization

- Debounced RST conversion (300ms delay)
- Efficient DOM updates (innerHTML for preview)
- CSS containment for panels

### Memory Management

- Single Pyodide instance (not recreated)
- Minimal Python globals
- DOM cleanup on error panel updates

## Security Considerations

### Client-Side Only

- No server means no server-side vulnerabilities
- User data never transmitted
- XSS protection via proper HTML escaping (docutils handles this)

### Content Security

- No eval() usage
- Safe clipboard API usage
- Blob URLs properly revoked after download

## Future Architecture Improvements

### Potential Enhancements

1. **Web Workers**: Move Pyodide to web worker for better UI responsiveness
2. **Virtual Scrolling**: For very long documents
3. **Code Splitting**: Lazy-load Pyodide only when needed
4. **Progressive Web App**: Offline support, installable
5. **Syntax Highlighting**: CodeMirror or Monaco for editor
6. **Dark Mode**: Theme switching
7. **Plugin System**: Custom directives/roles

### Scalability

Current architecture handles:
- Documents up to ~10,000 lines (tested)
- Multiple open sessions (separate browser tabs)
- Concurrent editing (localStorage sync)

Limitations:
- Very large documents (>50,000 lines) may cause lag
- Mobile browsers with limited memory
- Older browsers without WASM support

---

**Last Updated**: 2025-11-15
