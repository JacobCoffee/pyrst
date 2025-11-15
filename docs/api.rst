.. _api:

================================
PyRST JavaScript API Reference
================================

Complete reference for all JavaScript functions in PyRST.

.. contents:: Table of Contents
   :local:
   :depth: 2

Core Functions
==============

initPyodide()
-------------

Initialize Pyodide runtime and load dependencies.

**Location**: ``app.js``

**Signature**:

.. code-block:: javascript

   async function initPyodide(): Promise<void>

**Description**:

Loads Pyodide, installs docutils, sets up event handlers, and initializes the editor.

**Steps**:

1. Load Pyodide from CDN
2. Install micropip
3. Install docutils package
4. Load main.py Python code
5. Load sample.rst content
6. Initialize editor with sample
7. Set up event listeners
8. Initialize toolbar, export, resizing
9. Hide loading spinner

**Side Effects**:

- Updates global ``pyodide`` variable
- Modifies DOM (loading spinner, editor content)
- Registers event listeners
- Stores data in localStorage

**Error Handling**:

- Catches all errors during initialization
- Updates loading status with error message
- Changes text color to red on error

**Usage**:

.. code-block:: javascript

   // Called automatically on DOMContentLoaded
   window.addEventListener('DOMContentLoaded', initPyodide);

convertRST()
------------

Convert reStructuredText to HTML using Pyodide.

**Location**: ``app.js`` (defined within ``initPyodide``)

**Signature**:

.. code-block:: javascript

   async function convertRST(rstText: string): Promise<string>

**Parameters**:

- ``rstText`` (string): RST source text to convert

**Returns**:

- Promise<string>: HTML output from docutils

**Description**:

Sends RST text to Python via Pyodide, runs docutils ``publish_string``, and returns HTML.

**Process**:

1. Set ``rst_input`` in Python globals
2. Run Python code: ``publish_string(rst_input, writer_name="html5")``
3. Parse HTML string
4. Extract body content
5. Return innerHTML

**Usage**:

.. code-block:: javascript

   const html = await convertRST('**Bold text**');
   console.log(html); // <p><strong>Bold text</strong></p>

**Error Handling**:

- Python errors thrown as JavaScript exceptions
- Caught by caller (debounced conversion)

Toolbar Functions
=================

getEditorSelection()
--------------------

Get current selection or cursor position in editor.

**Location**: ``app.js``

**Signature**:

.. code-block:: javascript

   function getEditorSelection(): {
       editor: HTMLTextAreaElement,
       start: number,
       end: number,
       selectedText: string
   }

**Returns**:

- Object with editor element, selection start/end, and selected text

**Usage**:

.. code-block:: javascript

   const { start, end, selectedText } = getEditorSelection();
   console.log(`Selected: "${selectedText}" from ${start} to ${end}`);

insertText()
------------

Insert text at cursor position or replace selection.

**Location**: ``app.js``

**Signature**:

.. code-block:: javascript

   function insertText(text: string, selectInserted: boolean = false): void

**Parameters**:

- ``text`` (string): Text to insert
- ``selectInserted`` (boolean, optional): Whether to select inserted text (default: false)

**Side Effects**:

- Updates editor value
- Moves cursor or selection
- Triggers input event (updates preview)
- Focuses editor

**Usage**:

.. code-block:: javascript

   // Insert at cursor
   insertText('Hello, world!');

   // Insert and select
   insertText('**bold**', true);

wrapText()
----------

Wrap selected text with prefix/suffix markers.

**Location**: ``app.js``

**Signature**:

.. code-block:: javascript

   function wrapText(prefix: string, suffix: string = prefix): void

**Parameters**:

- ``prefix`` (string): Text to add before selection
- ``suffix`` (string, optional): Text to add after selection (defaults to prefix)

**Behavior**:

- **With selection**: Wraps selected text
- **Without selection**: Inserts placeholder "text" and wraps it

**Side Effects**:

- Updates editor value
- Selects inner text (without markers)
- Triggers input event
- Focuses editor

**Usage**:

.. code-block:: javascript

   // Make selected text bold
   wrapText('**'); // **selected**

   // Make selected text italic
   wrapText('*'); // *selected*

   // Wrap with different prefix/suffix
   wrapText('`', '`_'); // `selected`_

addHeading()
------------

Add RST heading with underline.

**Location**: ``app.js``

**Signature**:

.. code-block:: javascript

   function addHeading(level: 1 | 2 | 3): void

**Parameters**:

- ``level`` (number): Heading level (1, 2, or 3)

**Underline Characters**:

- Level 1: ``=``
- Level 2: ``-``
- Level 3: ``~``

**Behavior**:

- **With selection**: Uses selected text as heading
- **Without selection**: Inserts "Heading N" as placeholder

**Output Format**:

::

   Heading Text
   ============

**Usage**:

.. code-block:: javascript

   // H1 heading
   addHeading(1);
   // Output:
   // Heading 1
   // =========

   // H2 heading (with "Title" selected)
   addHeading(2);
   // Output:
   // Title
   // -----

insertBulletList()
------------------

Insert or extend bullet list.

**Location**: ``app.js``

**Signature**:

.. code-block:: javascript

   function insertBulletList(): void

**Behavior**:

- **Selected text**: Convert lines to bullet list
- **Empty line**: Insert 3 placeholder items
- **In existing list**: Add new item on next line
- **Non-empty line**: Convert current line to list item

**Output Examples**:

::

   - Item 1
   - Item 2
   - Item 3

**Usage**:

.. code-block:: javascript

   insertBulletList();
   // If on empty line, inserts:
   // - Item 1
   // - Item 2
   // - Item 3

insertNumberedList()
--------------------

Insert or extend numbered list.

**Location**: ``app.js``

**Signature**:

.. code-block:: javascript

   function insertNumberedList(): void

**Behavior**:

- **Selected text**: Convert lines to numbered list
- **Empty line**: Insert 3 placeholder items
- **In existing list**: Add next numbered item
- **Non-empty line**: Convert current line to list item

**Output Examples**:

::

   1. Item 1
   2. Item 2
   3. Item 3

**Usage**:

.. code-block:: javascript

   insertNumberedList();
   // Inserts numbered list

insertLink()
------------

Insert hyperlink.

**Location**: ``app.js``

**Signature**:

.. code-block:: javascript

   function insertLink(): void

**Behavior**:

- **With selection**: Use selected text as link text
- **Without selection**: Insert placeholder "Link text"

**Output Format**:

::

   `Link text <https://example.com>`_

**Usage**:

.. code-block:: javascript

   insertLink();
   // Output: `Link text <https://example.com>`_

insertImage()
-------------

Insert image directive.

**Location**: ``app.js``

**Signature**:

.. code-block:: javascript

   function insertImage(): void

**Output Format**:

::

   .. image:: /path/to/image.png
      :alt: Image description
      :width: 400

**Usage**:

.. code-block:: javascript

   insertImage();
   // Inserts image template

insertCodeBlock()
-----------------

Insert code block directive.

**Location**: ``app.js``

**Signature**:

.. code-block:: javascript

   function insertCodeBlock(): void

**Behavior**:

- **With selection**: Use selected text as code content (indented)
- **Without selection**: Insert Python example template

**Output Format**:

::

   .. code-block:: python

      # Your code here
      print("Hello, World!")

**Usage**:

.. code-block:: javascript

   insertCodeBlock();
   // Inserts code block template

insertBlockquote()
------------------

Insert blockquote (indented text).

**Location**: ``app.js``

**Signature**:

.. code-block:: javascript

   function insertBlockquote(): void

**Behavior**:

- **With selection**: Indent selected lines
- **Without selection**: Insert placeholder quote

**Output Format**:

::

      This is a blockquote.
      It can span multiple lines.

**Usage**:

.. code-block:: javascript

   insertBlockquote();
   // Inserts indented blockquote

insertTable()
-------------

Insert grid table template.

**Location**: ``app.js``

**Signature**:

.. code-block:: javascript

   function insertTable(): void

**Output Format**:

::

   +------------+------------+------------+
   | Header 1   | Header 2   | Header 3   |
   +============+============+============+
   | Row 1, C1  | Row 1, C2  | Row 1, C3  |
   +------------+------------+------------+
   | Row 2, C1  | Row 2, C2  | Row 2, C3  |
   +------------+------------+------------+

**Usage**:

.. code-block:: javascript

   insertTable();
   // Inserts 3x2 table template

initToolbar()
-------------

Initialize toolbar event listeners.

**Location**: ``app.js``

**Signature**:

.. code-block:: javascript

   function initToolbar(): void

**Side Effects**:

- Registers click handlers for all toolbar buttons
- Initializes Feather icons

**Called By**: ``initPyodide()``

Export Functions
================

copyRSTToClipboard()
--------------------

Copy RST source to clipboard.

**Location**: ``app_export.js``

**Signature**:

.. code-block:: javascript

   async function copyRSTToClipboard(): Promise<void>

**Side Effects**:

- Writes to clipboard
- Shows toast notification

**Error Handling**:

- Catches clipboard API errors
- Shows error toast on failure

**Usage**:

.. code-block:: javascript

   await copyRSTToClipboard();
   // Copies editor content to clipboard

copyHTMLToClipboard()
---------------------

Copy rendered HTML to clipboard.

**Location**: ``app_export.js``

**Signature**:

.. code-block:: javascript

   async function copyHTMLToClipboard(): Promise<void>

**Side Effects**:

- Writes HTML to clipboard
- Shows toast notification

**Usage**:

.. code-block:: javascript

   await copyHTMLToClipboard();
   // Copies preview innerHTML to clipboard

downloadRSTFile()
-----------------

Download RST source as file.

**Location**: ``app_export.js``

**Signature**:

.. code-block:: javascript

   function downloadRSTFile(): void

**Output**:

- Filename: ``document.rst``
- Content: Plain text RST source
- MIME type: ``text/plain``

**Side Effects**:

- Creates Blob and download link
- Triggers browser download
- Shows toast notification

**Usage**:

.. code-block:: javascript

   downloadRSTFile();
   // Downloads document.rst

downloadHTMLFile()
------------------

Download rendered HTML as standalone file.

**Location**: ``app_export.js``

**Signature**:

.. code-block:: javascript

   function downloadHTMLFile(): void

**Output**:

- Filename: ``document.html``
- Content: Complete HTML document with embedded CSS
- MIME type: ``text/html``

**Structure**:

.. code-block:: html

   <!DOCTYPE html>
   <html>
   <head>
       <meta charset="UTF-8">
       <title>Document</title>
       <style>/* embedded preview CSS */</style>
   </head>
   <body>
       <div id="preview"><!-- content --></div>
   </body>
   </html>

**Usage**:

.. code-block:: javascript

   downloadHTMLFile();
   // Downloads document.html

downloadPDF()
-------------

Open print dialog for PDF export.

**Location**: ``app_export.js``

**Signature**:

.. code-block:: javascript

   function downloadPDF(): void

**Side Effects**:

- Opens browser print dialog
- User can save as PDF

**Usage**:

.. code-block:: javascript

   downloadPDF();
   // Opens print dialog

getPreviewCSS()
---------------

Get minified CSS for standalone HTML export.

**Location**: ``app_export.js``

**Signature**:

.. code-block:: javascript

   function getPreviewCSS(): string

**Returns**:

- Minified CSS string for preview styling

**Usage**:

.. code-block:: javascript

   const css = getPreviewCSS();
   // Returns minified preview CSS

showToast()
-----------

Display toast notification.

**Location**: ``app_export.js``

**Signature**:

.. code-block:: javascript

   function showToast(message: string, type: 'success' | 'error' = 'success'): void

**Parameters**:

- ``message`` (string): Text to display
- ``type`` (string, optional): 'success' or 'error' (default: 'success')

**Behavior**:

- Creates toast element
- Appends to container
- Auto-dismisses after 3 seconds
- Can be manually closed

**Usage**:

.. code-block:: javascript

   showToast('File saved!', 'success');
   showToast('Failed to save', 'error');

initExportButtons()
-------------------

Initialize export button event listeners.

**Location**: ``app_export.js``

**Signature**:

.. code-block:: javascript

   function initExportButtons(): void

**Side Effects**:

- Registers click handlers for all export buttons

**Called By**: ``initPyodide()``

Error Highlighting Functions
=============================

parseSystemMessages()
---------------------

Extract errors from docutils HTML output.

**Location**: ``error-highlighting.js``

**Signature**:

.. code-block:: javascript

   function parseSystemMessages(html: string): Array<{
       severity: 'error' | 'warning',
       level: number,
       line: number,
       message: string
   }>

**Parameters**:

- ``html`` (string): HTML output from docutils

**Returns**:

- Array of error objects

**Error Object Structure**:

.. code-block:: javascript

   {
       severity: 'error' | 'warning',  // Error type
       level: number,                   // Severity level (2=WARNING, 3=ERROR)
       line: number,                    // Line number in source
       message: string                  // Error message
   }

**Usage**:

.. code-block:: javascript

   const html = await convertRST(rstText);
   const errors = parseSystemMessages(html);
   console.log(errors);
   // [{ severity: 'error', level: 3, line: 10, message: 'Unknown directive' }]

updateErrorPanel()
------------------

Update error panel with parsed errors.

**Location**: ``error-highlighting.js``

**Signature**:

.. code-block:: javascript

   function updateErrorPanel(errors: Array): void

**Parameters**:

- ``errors`` (Array): Array of error objects from ``parseSystemMessages()``

**Side Effects**:

- Updates error count badges
- Populates error list
- Shows/hides panel
- Highlights error lines
- Registers click handlers on error items

**Usage**:

.. code-block:: javascript

   const errors = parseSystemMessages(html);
   updateErrorPanel(errors);
   // Updates UI with error list

jumpToLine()
------------

Scroll editor to specific line and select it.

**Location**: ``error-highlighting.js``

**Signature**:

.. code-block:: javascript

   function jumpToLine(lineNumber: number): void

**Parameters**:

- ``lineNumber`` (number): 1-indexed line number

**Side Effects**:

- Focuses editor
- Scrolls to line
- Selects line content

**Usage**:

.. code-block:: javascript

   jumpToLine(42);
   // Jumps to line 42 in editor

highlightEditorLines()
----------------------

Add colored overlays to error lines in editor.

**Location**: ``error-highlighting.js``

**Signature**:

.. code-block:: javascript

   function highlightEditorLines(errors: Array): void

**Parameters**:

- ``errors`` (Array): Array of error objects

**Side Effects**:

- Clears previous highlights
- Creates highlight divs for each error
- Positions overlays on error lines

**Usage**:

.. code-block:: javascript

   highlightEditorLines(errors);
   // Adds red/yellow backgrounds to error lines

clearEditorHighlights()
-----------------------

Remove all error line highlights.

**Location**: ``error-highlighting.js``

**Signature**:

.. code-block:: javascript

   function clearEditorHighlights(): void

**Side Effects**:

- Removes all highlight divs from overlay

**Usage**:

.. code-block:: javascript

   clearEditorHighlights();
   // Clears all highlights

toggleErrorPanel()
------------------

Toggle error panel visibility.

**Location**: ``error-highlighting.js``

**Signature**:

.. code-block:: javascript

   function toggleErrorPanel(): void

**Side Effects**:

- Toggles ``collapsed`` class on error list
- Updates chevron icon direction

**Usage**:

.. code-block:: javascript

   toggleErrorPanel();
   // Collapses or expands error panel

Panel Resizing Functions
=========================

initResizablePanels()
---------------------

Initialize resizable panel functionality.

**Location**: ``app.js``

**Signature**:

.. code-block:: javascript

   function initResizablePanels(): void

**Side Effects**:

- Loads saved panel sizes from localStorage
- Registers mouse event handlers on divider
- Sets up drag-to-resize functionality

**Called By**: ``initPyodide()``

**Usage**:

.. code-block:: javascript

   initResizablePanels();
   // Enables panel resizing

loadPanelSizes()
----------------

Load saved panel sizes from localStorage.

**Location**: ``app.js`` (within ``initResizablePanels`` closure)

**Signature**:

.. code-block:: javascript

   function loadPanelSizes(): void

**Storage Key**: ``pyrst-panel-sizes``

**Side Effects**:

- Reads from localStorage
- Applies saved widths to panels
- Falls back to 50/50 split if no data

savePanelSizes()
----------------

Save current panel sizes to localStorage.

**Location**: ``app.js`` (within ``initResizablePanels`` closure)

**Signature**:

.. code-block:: javascript

   function savePanelSizes(): void

**Storage Key**: ``pyrst-panel-sizes``

**Stored Data**:

.. code-block:: javascript

   {
       editorWidth: number,   // Editor panel width in pixels
       previewWidth: number   // Preview panel width in pixels
   }

**Side Effects**:

- Writes to localStorage

setDefaultSizes()
-----------------

Set default 50/50 panel split.

**Location**: ``app.js`` (within ``initResizablePanels`` closure)

**Signature**:

.. code-block:: javascript

   function setDefaultSizes(): void

**Side Effects**:

- Sets both panels to ``flex: 1 1 0``

Utility Functions
=================

debounce()
----------

Debounce function calls.

**Location**: ``error-highlighting.js``

**Signature**:

.. code-block:: javascript

   function debounce(func: Function, wait: number): Function

**Parameters**:

- ``func`` (Function): Function to debounce
- ``wait`` (number): Delay in milliseconds

**Returns**:

- Debounced function

**Usage**:

.. code-block:: javascript

   const debouncedConvert = debounce(async (text) => {
       const html = await convertRST(text);
       preview.innerHTML = html;
   }, 300);

   editor.addEventListener('input', (e) => {
       debouncedConvert(e.target.value);
   });

Global Variables
================

pyodide
-------

Pyodide runtime instance.

**Type**: ``PyodideInterface``

**Initialization**: Set by ``initPyodide()``

**Usage**:

.. code-block:: javascript

   pyodide.globals.set('variable', value);
   const result = await pyodide.runPythonAsync('code');

MIN_PANEL_WIDTH
---------------

Minimum width for resizable panels.

**Type**: ``number``

**Value**: ``300`` (pixels)

**Usage**:

.. code-block:: javascript

   if (newEditorWidth < MIN_PANEL_WIDTH) {
       newEditorWidth = MIN_PANEL_WIDTH;
   }

Event Listeners
===============

Editor Input Event
------------------

**Trigger**: User types in editor

**Handler**: Debounced ``convertRST()``

**Registered By**: ``initPyodide()``

**Behavior**:

1. Wait 300ms after last keystroke
2. Convert RST to HTML
3. Update preview
4. Parse and display errors

Toolbar Button Clicks
---------------------

**Triggers**: Click on toolbar buttons

**Handlers**: Toolbar functions (e.g., ``addHeading``, ``wrapText``)

**Registered By**: ``initToolbar()``

Error Item Clicks
-----------------

**Trigger**: Click on error in error panel

**Handler**: ``jumpToLine()``

**Registered By**: ``updateErrorPanel()``

**Behavior**:

1. Extract line number from data attribute
2. Call ``jumpToLine(lineNumber)``
3. Focus editor and scroll to line

Divider Mouse Events
--------------------

**Triggers**: mousedown, mousemove, mouseup on divider

**Handlers**: Resize functions within ``initResizablePanels()``

**Registered By**: ``initResizablePanels()``

**Behavior**:

1. mousedown: Start dragging
2. mousemove: Update panel sizes
3. mouseup: Save sizes to localStorage

Python API (main.py)
====================

convert_rst()
-------------

Convert RST to HTML using docutils.

**Language**: Python

**Location**: ``main.py``

**Signature**:

.. code-block:: python

   def convert_rst(rst_text: str) -> str

**Parameters**:

- ``rst_text`` (str): RST source text

**Returns**:

- HTML output string

**Error Handling**:

- Returns HTML error block on exception

**Called By**: JavaScript via ``pyodide.runPythonAsync()``

----

**Last Updated**: 2025-11-15
