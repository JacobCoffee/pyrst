# PyRST Features

Complete documentation of all features in PyRST.

## Table of Contents

- [Core Features](#core-features)
- [Editor Features](#editor-features)
- [Preview Features](#preview-features)
- [Toolbar Features](#toolbar-features)
- [Error Detection](#error-detection)
- [Export Features](#export-features)
- [UI Features](#ui-features)
- [Performance Features](#performance-features)

## Core Features

### Live Preview

**Description**: Instant HTML rendering as you type

**How it works**:
- Debounced conversion (300ms delay after last keystroke)
- Pyodide processes RST through docutils
- HTML output displayed in preview panel
- Synchronized scrolling between editor and preview

**Benefits**:
- See changes immediately
- No manual refresh needed
- Fast feedback loop for document authoring

### Client-Side Processing

**Description**: All processing happens in your browser

**How it works**:
- Pyodide runs Python in WebAssembly
- docutils installed via micropip
- No server requests after initial load

**Benefits**:
- Privacy: your documents never leave your browser
- No server costs
- Works offline (after first load)
- Fast processing without network latency

### LocalStorage Persistence

**Description**: Automatically saves preferences locally

**What is saved**:
- Panel sizes (editor/preview split ratio)
- Panel configuration persists across sessions

**How to use**:
- Adjust panels by dragging divider
- Settings automatically saved
- Cleared when browser cache is cleared

## Editor Features

### Syntax-Aware Editor

**Description**: Monospace font optimized for RST editing

**Features**:
- Fixed-width font for alignment
- Tab support for indentation
- Line wrapping
- Smooth scrolling

**Customizations**:
- Custom scrollbar styling
- Focus ring for accessibility
- Transparent background for error highlighting overlay

### Smart Text Selection

**Description**: Toolbar functions adapt to selection

**Behaviors**:
- With selection: wrap/transform selected text
- Without selection: insert placeholder text
- Empty line: create default structures

**Example** (Bold button):
- Selected "hello" → `**hello**`
- No selection → `**text**` (with "text" selected)

### Error Line Highlighting

**Description**: Visual indicators for lines with errors/warnings

**Features**:
- Red background for errors
- Yellow background for warnings
- Left border for quick visual scanning
- Click error in panel to jump to line

**Screenshot suggestion**: Show editor with highlighted error lines

## Preview Features

### Comprehensive RST Support

**Description**: Full rendering of RST elements

**Supported Elements**:
- **Headers**: H1-H6 with proper hierarchy
- **Inline formatting**: Bold, italic, code, subscript, superscript
- **Lists**: Bullet, numbered, definition, field, option
- **Links**: External, internal, footnotes, citations
- **Code blocks**: With syntax highlighting hints
- **Tables**: Grid, simple, CSV, list tables
- **Images**: With alt text, sizing, alignment
- **Figures**: Images with captions and legends
- **Admonitions**: Note, warning, tip, danger, error, etc.
- **Directives**: Code blocks, raw HTML, math, containers
- **Special sections**: Sidebar, topic, abstract, dedication

### Styled Output

**Description**: Beautiful rendering of all RST elements

**Styling Features**:
- Proper typography with readable fonts
- Color-coded admonitions
- Syntax-highlighted code blocks
- Responsive tables
- Figure captions and legends
- Blockquote styling
- Table of contents styling

**CSS Coverage**:
- 360+ lines of preview styling in `preview.css`
- Support for all docutils output classes
- System messages hidden (shown in error panel instead)

### Live HTML Generation

**Description**: Real-time conversion from RST to HTML5

**Process**:
1. User types RST
2. Debounced trigger (300ms)
3. Python docutils processes text
4. HTML5 output generated
5. Preview panel updated
6. Error messages extracted

## Toolbar Features

### Quick Formatting Buttons

**Description**: 13 toolbar buttons for common RST syntax

**Button Groups**:

1. **Headers** (3 buttons)
   - H1, H2, H3
   - Adds text and underline characters

2. **Text Formatting** (3 buttons)
   - Bold: `**text**`
   - Italic: `*text*`
   - Code: `` `text` ``

3. **Lists** (2 buttons)
   - Bullet list: `- item`
   - Numbered list: `1. item`

4. **Links & Media** (2 buttons)
   - Hyperlink: `` `text <url>`_ ``
   - Image: `.. image:: path`

5. **Blocks** (3 buttons)
   - Code block: `.. code-block:: python`
   - Blockquote: indented text
   - Table: grid table template

See [TOOLBAR.md](TOOLBAR.md) for detailed documentation.

### Smart Insertion Logic

**Description**: Context-aware insertion behavior

**Smart Behaviors**:

1. **Headers**:
   - Selected text becomes header
   - No selection: inserts "Heading N"

2. **Lists**:
   - Empty line: insert 3 placeholder items
   - In existing list: add next item
   - Non-empty line: convert line to list item

3. **Code Blocks**:
   - Selected text: becomes code content
   - No selection: inserts template with example

4. **Tables**:
   - Checks if at start of line
   - Adds newline before table if needed

### Keyboard-Friendly

**Description**: All buttons focusable and keyboard accessible

**Accessibility**:
- Tab navigation through toolbar
- Enter/Space to activate buttons
- ARIA labels on all buttons
- Tooltips on hover

## Error Detection

### Real-Time Syntax Checking

**Description**: Parses docutils system messages for errors

**Detection Method**:
- Docutils generates system messages in HTML
- JavaScript parses messages
- Extracts severity, line number, message
- Displays in error panel

**Error Types**:
- **ERROR**: Critical syntax issues
- **WARNING**: Non-critical issues or deprecations

### Error Panel

**Description**: Collapsible panel showing all errors and warnings

**Features**:
- Error count badge (red)
- Warning count badge (yellow)
- Clickable error items
- Jump to line on click
- Collapse/expand toggle
- Auto-show when errors exist
- Auto-hide when no errors

**Error Item Display**:
- Icon (X for error, triangle for warning)
- Severity label
- Line number
- Full error message

### Line Jump Navigation

**Description**: Click error to jump to problematic line

**How it works**:
1. Click error in panel
2. Editor scrolls to line
3. Line is selected
4. Line is highlighted with color

**Benefits**:
- Quick navigation to problems
- No manual line counting
- Visual confirmation of location

### Visual Line Highlighting

**Description**: Colored overlay on error lines in editor

**Implementation**:
- Transparent overlay div
- Positioned absolutely over editor
- Height matches line height
- Left border for emphasis
- Doesn't interfere with editing

**Colors**:
- Red background + border for errors
- Yellow background + border for warnings

**Screenshot suggestion**: Error panel with highlighted lines

## Export Features

### Copy to Clipboard

**Description**: One-click copy of RST or HTML

**Options**:
1. **Copy RST**: Raw RST source text
2. **Copy HTML**: Rendered HTML output

**Implementation**:
- Uses Clipboard API
- Toast notification on success
- Error handling for permissions

**Use Cases**:
- Share RST source with colleagues
- Paste HTML into CMS or email
- Quick backup of content

### Download Files

**Description**: Save as RST, HTML, or PDF

**Options**:

1. **Download RST** (`.rst` file)
   - Raw RST source
   - Plain text file
   - Filename: `document.rst`

2. **Download HTML** (`.html` file)
   - Complete standalone HTML
   - Embedded CSS styles
   - Filename: `document.html`
   - Can open directly in browser

3. **Download PDF** (print dialog)
   - Opens browser print dialog
   - Save as PDF option
   - Full document styling
   - Uses @media print CSS

**Implementation**:
- Blob API for file creation
- Object URL generation
- Automatic cleanup after download

### Standalone HTML Export

**Description**: Self-contained HTML with embedded CSS

**Features**:
- Complete HTML5 document
- All preview styles embedded in `<style>` tag
- No external dependencies
- Minified CSS for smaller file size
- Proper charset and viewport meta tags

**Use Cases**:
- Email newsletters
- Documentation delivery
- Offline viewing
- Archival

### Toast Notifications

**Description**: Popup notifications for export actions

**Features**:
- Success/error states
- Auto-dismiss after 3 seconds
- Manual close button
- Slide-in animation
- Multiple toasts stack vertically

**Toast Types**:
- Success (green): "RST copied to clipboard!"
- Error (red): "Failed to copy HTML"

## UI Features

### Resizable Panels

**Description**: Drag to adjust editor/preview split

**How to use**:
1. Hover over divider (changes to resize cursor)
2. Click and drag left/right
3. Release to set size
4. Sizes automatically saved

**Features**:
- Minimum width enforced (300px each panel)
- Visual feedback on hover (blue highlight)
- Smooth dragging
- Persistent sizing via localStorage

**Benefits**:
- Customize workspace
- Wide editor for long lines
- Wide preview for tables/images
- Adapts to screen size

**Screenshot suggestion**: Divider being dragged

### Responsive Design

**Description**: Adapts to different screen sizes

**Breakpoints**:
- Mobile (< 1024px): Stacked layout (editor above preview)
- Desktop (≥ 1024px): Side-by-side with resizable divider

**Mobile Optimizations**:
- No resize divider on mobile
- Touch-friendly buttons
- Readable text sizes
- Scrollable panels

### Loading Screen

**Description**: Animated loading during Pyodide initialization

**Features**:
- Python logo with spinning border
- Progress messages:
  - "Initializing..."
  - "Downloading Pyodide..."
  - "Pyodide loaded! Installing packages..."
  - "Installing docutils..."
  - "Loading Python modules..."
  - "Loading sample content..."
  - "Initializing editor..."
  - "Ready!"
- Estimated time: 10-30 seconds
- Gradient background
- Smooth fade-out when ready

**Screenshot suggestion**: Loading screen

### Modern UI Design

**Description**: Clean, professional interface

**Design Elements**:
- Gradient header (blue to indigo)
- Card-based layout
- Subtle shadows
- Rounded corners
- Consistent spacing
- Feather icon set
- Tailwind CSS utilities

**Color Palette**:
- Primary: Blue (#3b82f6)
- Secondary: Indigo (#4f46e5)
- Error: Red (#ef4444)
- Warning: Yellow (#f59e0b)
- Success: Green (#10b981)
- Gray scale for text and borders

## Performance Features

### Debounced Conversion

**Description**: Delays RST conversion to reduce processing

**How it works**:
- Waits 300ms after last keystroke
- Cancels pending conversions
- Only processes when user stops typing

**Benefits**:
- Smoother typing experience
- Reduces CPU usage
- Prevents conversion on every keystroke
- Still feels instant (300ms is imperceptible)

### Efficient DOM Updates

**Description**: Optimized rendering for fast updates

**Optimizations**:
- Direct innerHTML update (fast for static content)
- Minimal DOM manipulation
- CSS containment on panels
- No unnecessary re-renders

### Cached Resources

**Description**: Browser caching for faster subsequent loads

**Cached Resources**:
- Pyodide runtime (from CDN)
- Tailwind CSS (from CDN)
- Feather icons (from CDN)
- Sample RST file

**Benefits**:
- First load: 10-30 seconds
- Subsequent loads: 2-5 seconds
- Offline capability (once cached)

## Accessibility Features

### Keyboard Navigation

**Description**: Full keyboard access to all features

**Shortcuts**:
- Tab: Navigate toolbar buttons
- Enter/Space: Activate button
- Tab: Focus editor/preview
- Arrow keys: Scroll panels

### Screen Reader Support

**Description**: Semantic HTML and ARIA labels

**Features**:
- ARIA labels on all buttons
- Semantic HTML5 elements
- Role attributes where appropriate
- Alt text on icons
- Labeled form elements

### Focus Management

**Description**: Clear focus indicators

**Features**:
- Blue focus rings on buttons
- Editor focus indicator
- Skip to content (implicit with tab order)

## Browser Compatibility

### Supported Browsers

**Tested On**:
- Chrome/Edge 90+
- Firefox 88+
- Safari 15+

**Requirements**:
- WebAssembly support
- ES6+ JavaScript
- Clipboard API (for copy functions)
- LocalStorage API

**Not Supported**:
- Internet Explorer
- Very old mobile browsers
- Browsers without WASM

### Progressive Enhancement

**Description**: Core functionality available even with limitations

**Graceful Degradation**:
- No WASM: Error message shown
- No Clipboard API: Download still works
- No localStorage: Panels still resizable (not persistent)

## Future Features

**Planned Enhancements** (see TODO.md):

1. Dark mode toggle
2. Syntax highlighting in editor
3. Undo/redo functionality
4. Keyboard shortcuts for toolbar
5. Custom themes
6. Image upload support
7. Multiple document tabs
8. Search and replace
9. Auto-save drafts
10. Import from file

---

**Last Updated**: 2025-11-15
