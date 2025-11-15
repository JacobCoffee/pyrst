# PyRST

**A powerful, browser-based reStructuredText editor powered by WebAssembly thanks to Pyodide**

PyRST is a zero-install, client-side reStructuredText (rST) editor 
that runs entirely in your browser using Pyodide and docutils. 

> ![INFO]
> No server required, no data leaves your browser.

[![Python](https://img.shields.io/badge/Python-3.14+-blue.svg)](https://www.python.org/)
[![Pyodide](https://img.shields.io/badge/Pyodide-0.29.0-green.svg)](https://pyodide.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/JacobCoffee/pyrst)

## Features

- **Live Preview**: Instant rendering of RST to HTML as you type
- **WYSIWYG Toolbar**: Quick access to common RST formatting commands
- **Error Highlighting**: Real-time syntax error detection with line highlighting
- **Resizable Panels**: Customizable editor/preview split with persistent sizing
- **Export Options**: Download or copy as RST, HTML, or PDF
- **No Server Required**: All processing happens in your browser via WebAssembly
- **LocalStorage Persistence**: Automatically saves panel sizes locally
- **Modern UI**: Clean, responsive design with Tailwind CSS

## Quick Start

### Online Demo

Visit the live demo at: **TODO**

### Local Development

1. **Install dependencies**:
   ```bash
   make install
   ```

2. **Start local server**:
   ```bash
   make serve
   ```

3. **Open in browser**:
   Navigate to `http://localhost:8000`

## Usage

### Basic Editing

1. Type or paste reStructuredText content in the left editor panel
2. See live HTML preview in the right panel
3. Errors and warnings appear in the collapsible error panel at the bottom

### Toolbar Buttons

Use the formatting toolbar for quick access to common RST syntax:

- **Headers**: H1, H2, H3 with automatic underlines
- **Text Formatting**: Bold, Italic, Inline Code
- **Lists**: Bullet lists and numbered lists
- **Links & Media**: Hyperlinks and images
- **Blocks**: Code blocks, blockquotes, and tables

See [docs/TOOLBAR.md](docs/TOOLBAR.md) for detailed toolbar documentation.

### Export Options

- **Copy RST**: Copy raw RST to clipboard
- **Copy HTML**: Copy rendered HTML to clipboard
- **Download RST**: Save as `.rst` file
- **Download HTML**: Save as standalone `.html` file with embedded CSS
- **Download PDF**: Print to PDF using browser print dialog

## Technology Stack

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Python Runtime**: [Pyodide](https://pyodide.org/) (Python 3.14 in WebAssembly)
- **RST Parser**: [docutils](https://docutils.sourceforge.io/)
- **Icons**: [Feather Icons](https://feathericons.com/)
- **Build Tool**: [uv](https://github.com/astral-sh/uv)

## Documentation

It's all AI generated, so... good luck :)

- [Architecture](docs/ARCHITECTURE.md) - System design and components
- [Features](docs/FEATURES.md) - Complete feature documentation
- [Development Guide](docs/DEVELOPMENT.md) - Local development setup
- [API Reference](docs/API.md) - JavaScript API documentation
- [Toolbar Guide](docs/TOOLBAR.md) - Toolbar button reference
- [Contributing](CONTRIBUTING.md) - How to contribute
- [Changelog](CHANGELOG.md) - Version history

## Requirements

- Modern web browser with WebAssembly support
- For development: Python 3.14+ and `uv` package manager

## Contributing

Open PRs/issues

## License

MIT License

## Acknowledgments

- [Pyodide](https://pyodide.org/) - Python in the browser
- [docutils](https://docutils.sourceforge.io/) - RST parser and HTML generator
- [rst-playground](https://github.com/waldyrious/rst-playground) - Inspiration for the WASM approach
- [Tailwind CSS](https://tailwindcss.com/) - UI styling
- [Feather Icons](https://feathericons.com/) - Icon set

## Author

Jacob Coffee and a lot of Claude Code

---

**All processing happens in your browser. No data is sent to any server.**
