/**
 * PyRST - Browser-based RST editor using Pyodide
 * Main initialization script
 */

let pyodide;
const MIN_PANEL_WIDTH = 300; // Minimum width for each panel in pixels

/**
 * Dark Mode functionality
 */
function initDarkMode() {
  const toggle = document.getElementById("dark-mode-toggle");
  if (!toggle) {
    console.warn("Dark mode toggle button not found");
    return;
  }

  // Load saved preference
  const isDark = localStorage.getItem("pyrst-dark-mode") === "true";
  if (isDark) {
    document.body.classList.add("dark-mode");
    updateDarkModeIcon(true);
  }

  // Toggle handler
  toggle.addEventListener("click", () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    localStorage.setItem("pyrst-dark-mode", isDarkMode);
    updateDarkModeIcon(isDarkMode);
  });

  console.log("Dark mode initialized!");
}

function updateDarkModeIcon(isDark) {
  const toggle = document.getElementById("dark-mode-toggle");
  if (!toggle) return;

  const icon = toggle.querySelector("i");
  if (icon) {
    icon.setAttribute("data-feather", isDark ? "sun" : "moon");
    feather.replace({ width: 20, height: 20 });
  }
}

/**
 * Resizable panels functionality
 */
function initResizablePanels() {
  const divider = document.getElementById("divider");
  const editorPanel = document.getElementById("editor-panel");
  const previewPanel = document.getElementById("preview-panel");
  const container = document.getElementById("editor-container");

  if (!divider || !editorPanel || !previewPanel || !container) {
    console.log("Resizable panels not available (mobile view or elements not found)");
    return;
  }

  let isDragging = false;

  // Load saved panel sizes from localStorage
  function loadPanelSizes() {
    const saved = localStorage.getItem("pyrst-panel-sizes");
    if (saved) {
      try {
        const { editorWidth } = JSON.parse(saved);
        editorPanel.style.flex = `0 0 ${editorWidth}px`;
        previewPanel.style.flex = "1 1 0";
        console.log("Loaded panel sizes from localStorage:", editorWidth);
      } catch (e) {
        console.warn("Failed to parse saved panel sizes, using defaults");
        setDefaultSizes();
      }
    } else {
      setDefaultSizes();
    }
  }

  // Set default 50/50 split
  function setDefaultSizes() {
    editorPanel.style.flex = "1 1 0";
    previewPanel.style.flex = "1 1 0";
  }

  // Save panel sizes to localStorage
  function savePanelSizes() {
    const sizes = {
      editorWidth: editorPanel.offsetWidth,
      previewWidth: previewPanel.offsetWidth,
    };
    localStorage.setItem("pyrst-panel-sizes", JSON.stringify(sizes));
    console.log("Saved panel sizes:", sizes);
  }

  // Handle mouse down on divider
  function onMouseDown(e) {
    isDragging = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    e.preventDefault();
  }

  // Handle mouse move
  function onMouseMove(e) {
    if (!isDragging) return;

    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const dividerWidth = 4;

    // Calculate the new editor width based on mouse position
    let newEditorWidth = e.clientX - containerRect.left;
    const newPreviewWidth = containerWidth - newEditorWidth - dividerWidth;

    // Enforce minimum widths
    if (newEditorWidth < MIN_PANEL_WIDTH) {
      newEditorWidth = MIN_PANEL_WIDTH;
    }
    if (newPreviewWidth < MIN_PANEL_WIDTH) {
      newEditorWidth = containerWidth - MIN_PANEL_WIDTH - dividerWidth;
    }

    // Apply new widths using flex-basis
    editorPanel.style.flex = `0 0 ${newEditorWidth}px`;
    previewPanel.style.flex = "1 1 0";
  }

  // Handle mouse up
  function onMouseUp() {
    if (isDragging) {
      isDragging = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      savePanelSizes();
    }
  }

  // Attach event listeners
  divider.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);

  // Load initial sizes
  loadPanelSizes();

  console.log("Resizable panels initialized!");
}

/**
 * Toolbar formatting functions
 */

// Get current selection or cursor position in editor
function getEditorSelection() {
  const editor = document.getElementById("editor");
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const selectedText = editor.value.substring(start, end);
  return { editor, start, end, selectedText };
}

// Insert text at cursor position or replace selection
function insertText(text, selectInserted = false) {
  const { editor, start, end } = getEditorSelection();
  const before = editor.value.substring(0, start);
  const after = editor.value.substring(end);
  editor.value = before + text + after;

  // Set cursor position
  if (selectInserted) {
    editor.selectionStart = start;
    editor.selectionEnd = start + text.length;
  } else {
    editor.selectionStart = editor.selectionEnd = start + text.length;
  }

  // Trigger preview update
  editor.dispatchEvent(new Event("input"));
  editor.focus();
}

// Wrap selected text with markers
function wrapText(prefix, suffix = prefix) {
  const { editor, start, end, selectedText } = getEditorSelection();

  if (selectedText) {
    const wrapped = prefix + selectedText + suffix;
    const before = editor.value.substring(0, start);
    const after = editor.value.substring(end);
    editor.value = before + wrapped + after;
    editor.selectionStart = start + prefix.length;
    editor.selectionEnd = end + prefix.length;
  } else {
    const placeholder = "text";
    const wrapped = prefix + placeholder + suffix;
    const before = editor.value.substring(0, start);
    const after = editor.value.substring(start);
    editor.value = before + wrapped + after;
    editor.selectionStart = start + prefix.length;
    editor.selectionEnd = start + prefix.length + placeholder.length;
  }

  editor.dispatchEvent(new Event("input"));
  editor.focus();
}

// Add heading underline
function addHeading(level) {
  const { editor, start, selectedText } = getEditorSelection();
  const chars = { 1: "=", 2: "-", 3: "~" };
  const char = chars[level];

  if (selectedText) {
    const underline = char.repeat(selectedText.length);
    insertText(selectedText + "\n" + underline + "\n\n", false);
  } else {
    const heading = "Heading " + level;
    const underline = char.repeat(heading.length);
    insertText(heading + "\n" + underline + "\n\n", false);
  }
}

// Insert bullet list
function insertBulletList() {
  const { editor, start, end, selectedText } = getEditorSelection();
  const before = editor.value.substring(0, start);
  const currentLine = before.split("\n").pop();

  if (selectedText) {
    // Convert selected lines to bullet list
    const lines = selectedText.split("\n");
    const list = lines.map((line) => (line.trim() ? "- " + line : "")).join("\n");
    insertText(list + "\n", false);
  } else if (currentLine.trim() === "") {
    // Empty line: insert 3 placeholder items
    insertText("- Item 1\n- Item 2\n- Item 3\n", false);
  } else if (currentLine.match(/^-\s/)) {
    // Already in a list: add new item on next line
    const after = editor.value.substring(end);
    editor.value = before + "\n- " + after;
    editor.selectionStart = editor.selectionEnd = start + 3;
    editor.dispatchEvent(new Event("input"));
    editor.focus();
  } else {
    // Convert current line to list item
    const lineStart = start - currentLine.length;
    const after = editor.value.substring(end);
    const beforeLine = editor.value.substring(0, lineStart);
    editor.value = beforeLine + "- " + currentLine + after;
    editor.selectionStart = editor.selectionEnd = start + 2;
    editor.dispatchEvent(new Event("input"));
    editor.focus();
  }
}

// Insert numbered list
function insertNumberedList() {
  const { editor, start, end, selectedText } = getEditorSelection();
  const before = editor.value.substring(0, start);
  const currentLine = before.split("\n").pop();

  if (selectedText) {
    // Convert selected lines to numbered list
    const lines = selectedText.split("\n");
    const list = lines.map((line, i) => (line.trim() ? `${i + 1}. ${line}` : "")).join("\n");
    insertText(list + "\n", false);
  } else if (currentLine.trim() === "") {
    // Empty line: insert 3 placeholder items
    insertText("1. Item 1\n2. Item 2\n3. Item 3\n", false);
  } else if (currentLine.match(/^\d+\.\s/)) {
    // Already in a numbered list: add new item on next line
    const currentNumber = parseInt(currentLine.match(/^\d+/)[0]);
    const after = editor.value.substring(end);
    editor.value = before + `\n${currentNumber + 1}. ` + after;
    editor.selectionStart = editor.selectionEnd = start + `\n${currentNumber + 1}. `.length;
    editor.dispatchEvent(new Event("input"));
    editor.focus();
  } else {
    // Convert current line to list item
    const lineStart = start - currentLine.length;
    const after = editor.value.substring(end);
    const beforeLine = editor.value.substring(0, lineStart);
    editor.value = beforeLine + "1. " + currentLine + after;
    editor.selectionStart = editor.selectionEnd = start + 3;
    editor.dispatchEvent(new Event("input"));
    editor.focus();
  }
}

// Insert link
function insertLink() {
  const { selectedText } = getEditorSelection();
  if (selectedText) {
    insertText(`\`${selectedText} <https://example.com>\`_`, false);
  } else {
    const linkText = "`Link text <https://example.com>`_";
    insertText(linkText, true);
  }
}

// Insert image
function insertImage() {
  insertText(".. image:: /path/to/image.png\n   :alt: Image description\n   :width: 400\n\n", false);
}

// Insert code block
function insertCodeBlock() {
  const { selectedText } = getEditorSelection();
  if (selectedText) {
    insertText(".. code-block:: python\n\n   " + selectedText.replace(/\n/g, "\n   ") + "\n\n", false);
  } else {
    insertText('.. code-block:: python\n\n   # Your code here\n   print("Hello, World!")\n\n', false);
  }
}

// Insert blockquote
function insertBlockquote() {
  const { selectedText } = getEditorSelection();
  if (selectedText) {
    const lines = selectedText.split("\n");
    const quote = lines.map((line) => "   " + line).join("\n");
    insertText(quote + "\n\n", false);
  } else {
    insertText("   This is a blockquote.\n   It can span multiple lines.\n\n", false);
  }
}

// Insert table
function insertTable() {
  const { editor, start } = getEditorSelection();
  const before = editor.value.substring(0, start);
  const currentLine = before.split("\n").pop();

  const table = `+------------+------------+------------+
| Header 1   | Header 2   | Header 3   |
+============+============+============+
| Row 1, C1  | Row 1, C2  | Row 1, C3  |
+------------+------------+------------+
| Row 2, C1  | Row 2, C2  | Row 2, C3  |
+------------+------------+------------+

`;

  // If not at start of line, add newline before table
  if (currentLine.length > 0) {
    insertText("\n" + table, false);
  } else {
    insertText(table, false);
  }
}

// Initialize toolbar event listeners
function initToolbar() {
  // Initialize Feather icons
  feather.replace({ width: 16, height: 16 });

  // Headers
  document.getElementById("btn-h1").addEventListener("click", () => addHeading(1));
  document.getElementById("btn-h2").addEventListener("click", () => addHeading(2));
  document.getElementById("btn-h3").addEventListener("click", () => addHeading(3));

  // Text formatting
  document.getElementById("btn-bold").addEventListener("click", () => wrapText("**"));
  document.getElementById("btn-italic").addEventListener("click", () => wrapText("*"));
  document.getElementById("btn-code").addEventListener("click", () => wrapText("``", "``"));

  // Lists
  document.getElementById("btn-ul").addEventListener("click", insertBulletList);
  document.getElementById("btn-ol").addEventListener("click", insertNumberedList);

  // Links & Media
  document.getElementById("btn-link").addEventListener("click", insertLink);
  document.getElementById("btn-image").addEventListener("click", insertImage);

  // Blocks
  document.getElementById("btn-codeblock").addEventListener("click", insertCodeBlock);
  document.getElementById("btn-quote").addEventListener("click", insertBlockquote);
  document.getElementById("btn-table").addEventListener("click", insertTable);

  console.log("Toolbar initialized!");
}

/**
 * Initialize Pyodide and load Python modules
 */
async function initPyodide() {
  const spinner = document.getElementById("loading-spinner");
  const status = document.getElementById("loading-status");

  try {
    console.log("Loading Pyodide...");
    status.textContent = "Downloading Pyodide...";

    // Initialize Pyodide
    pyodide = await loadPyodide();
    console.log("Pyodide loaded successfully!");

    // Test Python
    status.textContent = "Pyodide loaded! Installing packages...";
    const result = await pyodide.runPythonAsync(`
            import sys
            f"Python {sys.version} running in browser!"
        `);
    console.log(result);

    // Load micropip
    await pyodide.loadPackage("micropip");
    const micropip = pyodide.pyimport("micropip");

    // Install docutils
    status.textContent = "Installing docutils...";
    await micropip.install("docutils");
    console.log("docutils installed!");

    // Load Python converter function
    status.textContent = "Loading Python modules...";
    const mainResponse = await fetch("./main.py");
    const mainCode = await mainResponse.text();
    await pyodide.runPythonAsync(mainCode);
    console.log("main.py loaded");

    // Load sample RST content
    status.textContent = "Loading sample content...";
    const sampleResponse = await fetch("./sample.rst");
    const sampleText = await sampleResponse.text();

    // Initialize editor in JavaScript (not Python to avoid innerHTML escaping)
    status.textContent = "Initializing editor...";
    const editor = document.getElementById("editor");
    const preview = document.getElementById("preview");

    editor.value = sampleText;

    // RST conversion inspired by waldyrious/rst-playground
    async function convertRST(rstText) {
      pyodide.globals.set("rst_input", rstText);
      const htmlString = await pyodide.runPythonAsync(`
from docutils.core import publish_string
publish_string(rst_input, writer_name="html5").decode("utf-8")
            `);
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");
      return doc.body.innerHTML;
    }

    const initialHtml = await convertRST(sampleText);
    preview.innerHTML = initialHtml;

    // Parse initial errors
    const initialErrors = parseSystemMessages(initialHtml);
    updateErrorPanel(initialErrors);

    console.log("Editor initialized!");

    // Debounced conversion with error checking
    const debouncedConvert = debounce(async (text) => {
      const html = await convertRST(text);
      preview.innerHTML = html;

      // Parse and display errors
      const errors = parseSystemMessages(html);
      updateErrorPanel(errors);
    }, 300);

    editor.addEventListener("input", (e) => {
      debouncedConvert(e.target.value);
    });

    // Initialize toggle button for error panel
    const toggleBtn = document.getElementById("toggle-errors");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", toggleErrorPanel);
    }

    console.log("Event handlers registered!");

    // Hide spinner
    status.textContent = "Ready!";
    setTimeout(() => {
      spinner.classList.add("hidden");
    }, 500);

    console.log("PyRST fully initialized!");

    // Initialize dark mode first (before icons are rendered)
    initDarkMode();

    // Initialize toolbar buttons
    initToolbar();

    // Initialize export buttons
    initExportButtons();

    // Initialize resizable panels
    initResizablePanels();
  } catch (error) {
    console.error("Failed to initialize:", error);
    status.textContent = "Error during initialization. Check console.";
    status.classList.remove("text-blue-600");
    status.classList.add("text-red-600");
  }
}

// Initialize when page loads
window.addEventListener("DOMContentLoaded", initPyodide);
