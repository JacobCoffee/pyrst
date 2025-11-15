.. _toolbar:

=====================
PyRST Toolbar Guide
=====================

Complete guide to all toolbar buttons and the RST syntax they generate.

.. contents:: Table of Contents
   :local:
   :depth: 2

Overview
========

The PyRST toolbar provides quick access to common reStructuredText formatting. All buttons insert valid RST syntax at the cursor position or wrap selected text.

Toolbar Layout
--------------

::

    ┌──────────────────────────────────────────────────────────────┐
    │ Headers │ Text Format │ Lists │ Links/Media │ Blocks         │
    ├─────────┼─────────────┼───────┼─────────────┼────────────────┤
    │ H1      │ Bold        │ UL    │ Link        │ Code Block     │
    │ H2      │ Italic      │ OL    │ Image       │ Blockquote     │
    │ H3      │ Code        │       │             │ Table          │
    └─────────┴─────────────┴───────┴─────────────┴────────────────┘

Button Behavior
---------------

**With selection**: Transforms selected text

**Without selection**: Inserts template with placeholder text

Header Buttons
==============

H1 - Top-Level Heading
----------------------

**Button**: ``H1``

**Icon**: Text "H1"

**RST Syntax**:

.. code-block:: rst

   Heading Text
   ============

**Underline Character**: ``=`` (equals signs)

**How to use**:

1. Select text or place cursor
2. Click H1 button
3. Heading and underline inserted

**Examples**:

*With selection "Introduction":*

.. code-block:: rst

   Introduction
   ============

*Without selection:*

.. code-block:: rst

   Heading 1
   =========

**Tips**:

- H1 is typically used for document title
- Should only appear once per document
- Underline must be same length as heading text

H2 - Section Heading
--------------------

**Button**: ``H2``

**Icon**: Text "H2"

**RST Syntax**:

.. code-block:: rst

   Section Name
   ------------

**Underline Character**: ``-`` (hyphens)

**Use Cases**:

- Main sections of document
- Subsections under H1
- Most common heading level

**Examples**:

*With selection "Features":*

.. code-block:: rst

   Features
   --------

*Without selection:*

.. code-block:: rst

   Heading 2
   ---------

H3 - Subsection Heading
-----------------------

**Button**: ``H3``

**Icon**: Text "H3"

**RST Syntax**:

.. code-block:: rst

   Subsection Title
   ~~~~~~~~~~~~~~~~

**Underline Character**: ``~`` (tildes)

**Use Cases**:

- Subsections under H2
- Third-level hierarchy
- Detailed topic headings

**Examples**:

*With selection "Installation":*

.. code-block:: rst

   Installation
   ~~~~~~~~~~~~

*Without selection:*

.. code-block:: rst

   Heading 3
   ~~~~~~~~~

Text Formatting
===============

Bold - Strong Emphasis
----------------------

**Button**: Bold icon (B)

**Icon**: Feather "bold" icon

**RST Syntax**:

.. code-block:: rst

   **bold text**

**Renders as**: **bold text**

**How to use**:

1. Select text to make bold
2. Click bold button
3. Text wrapped with ``**``

**Examples**:

*With selection "important":*

.. code-block:: rst

   **important**

*Without selection:*

.. code-block:: rst

   **text**

(with "text" selected for easy replacement)

**Tips**:

- No spaces between ``**`` and text
- Can be used inline within sentences
- Nested formatting not recommended

Italic - Emphasis
-----------------

**Button**: Italic icon (I)

**Icon**: Feather "italic" icon

**RST Syntax**:

.. code-block:: rst

   *italic text*

**Renders as**: *italic text*

**How to use**:

1. Select text to italicize
2. Click italic button
3. Text wrapped with ``*``

**Examples**:

*With selection "note":*

.. code-block:: rst

   *note*

*Without selection:*

.. code-block:: rst

   *text*

**Tips**:

- Single ``*`` for italic (vs double for bold)
- No spaces between ``*`` and text
- Cannot start with ``*`` if at beginning of line (would be bullet list)

Code - Inline Code
------------------

**Button**: Code icon (</>)

**Icon**: Feather "code" icon

**RST Syntax**:

.. code-block:: rst

   ``inline code``

**Renders as**: ``inline code``

**How to use**:

1. Select code snippet
2. Click code button
3. Text wrapped with ``` `` ```

**Examples**:

*With selection "print('hello')":*

.. code-block:: rst

   ``print('hello')``

*Without selection:*

.. code-block:: rst

   ``text``

**Use Cases**:

- Function names: ``calculate()``
- Variable names: ``user_name``
- File paths: ``/path/to/file``
- Commands: ``ls -la``
- Code snippets: ``x = 42``

**Tips**:

- Use double backticks (not single like Markdown)
- No spaces between ``` `` ``` and text
- For multi-line code, use code block instead

Lists
=====

UL - Bullet List
----------------

**Button**: List icon

**Icon**: Feather "list" icon

**RST Syntax**:

.. code-block:: rst

   - Item 1
   - Item 2
   - Item 3

**Smart Behavior**:

1. **On empty line**: Inserts 3 placeholder items

   .. code-block:: rst

      - Item 1
      - Item 2
      - Item 3

2. **With selected text**: Converts each line to list item

   .. code-block:: rst

      First item
      Second item
      Third item

   Becomes:

   .. code-block:: rst

      - First item
      - Second item
      - Third item

3. **In existing list**: Adds next item

   .. code-block:: rst

      - Existing item
      - New item  ← cursor here after click

4. **On non-empty line**: Converts line to list item

   .. code-block:: rst

      This is text

   Becomes:

   .. code-block:: rst

      - This is text

**Nested Lists**:

.. code-block:: rst

   - Top level

     - Nested item (2 spaces indent)
     - Another nested item

   - Back to top level

**Tips**:

- Must have space after ``-``
- Blank line between list and other content
- Indent by 2 spaces for nesting
- Can mix with other list types

OL - Numbered List
------------------

**Button**: Hash icon (#)

**Icon**: Feather "hash" icon

**RST Syntax**:

.. code-block:: rst

   1. Item 1
   2. Item 2
   3. Item 3

**Smart Behavior**:

1. **On empty line**: Inserts 3 numbered items

   .. code-block:: rst

      1. Item 1
      2. Item 2
      3. Item 3

2. **With selected text**: Converts lines to numbered list

   .. code-block:: rst

      First step
      Second step

   Becomes:

   .. code-block:: rst

      1. First step
      2. Second step

3. **In existing list**: Adds next numbered item

   .. code-block:: rst

      1. First
      2. Second
      3. Third  ← auto-incremented

4. **On non-empty line**: Converts to item #1

**Alternative Syntax**:

.. code-block:: rst

   #. Auto-numbered item
   #. Auto-numbered item
   #. Auto-numbered item

(docutils auto-numbers with ``#.``)

**Nested Lists**:

.. code-block:: rst

   1. Top level

      a. Nested with letters
      b. Another nested

   2. Back to top level

**Tips**:

- Numbers auto-increment in rendering
- Can use any number sequence (e.g., all 1's)
- Indent by 3 spaces for nesting
- Can mix with bullet lists

Links & Media
=============

Link - Hyperlink
----------------

**Button**: Link icon

**Icon**: Feather "link" icon

**RST Syntax**:

.. code-block:: rst

   `Link text <https://example.com>`_

**Renders as**: `Link text <https://example.com>`_

**How to use**:

1. Select link text (or leave cursor)
2. Click link button
3. Replace placeholder URL

**Examples**:

*With selection "Click here":*

.. code-block:: rst

   `Click here <https://example.com>`_

*Without selection:*

.. code-block:: rst

   `Link text <https://example.com>`_

(entire construct is selected for editing)

**Link Types**:

1. **External links**:

   .. code-block:: rst

      `Python Website <https://www.python.org>`_

2. **Direct URLs**:

   .. code-block:: rst

      https://www.example.com

   (auto-linked by docutils)

3. **Named references**:

   .. code-block:: rst

      See the `Introduction`_ section.

      .. _Introduction: #intro

4. **Email links**:

   .. code-block:: rst

      `Email me <mailto:user@example.com>`_

**Tips**:

- Note the trailing underscore ``_``
- Backticks around entire link construct
- Spaces allowed in link text
- URL can be relative or absolute

Image - Insert Image
--------------------

**Button**: Image icon

**Icon**: Feather "image" icon

**RST Syntax**:

.. code-block:: rst

   .. image:: /path/to/image.png
      :alt: Image description
      :width: 400

**Renders**: Displays image in preview

**How to use**:

1. Click image button
2. Replace path with actual image URL/path
3. Update alt text
4. Adjust width if needed

**Image Options**:

.. code-block:: rst

   .. image:: /path/to/image.png
      :alt: Alternative text
      :width: 400px
      :height: 300px
      :align: center
      :target: https://example.com

**Alignment Options**:

- ``:align: left``
- ``:align: center``
- ``:align: right``

**Figure with Caption**:

.. code-block:: rst

   .. figure:: /path/to/image.png
      :alt: Alt text
      :width: 500px

      **Figure 1:** Caption text here.

      Optional legend text.

**Tips**:

- Indent option lines by 3 spaces
- Use absolute URLs for online images
- Relative paths work for local files
- Alt text important for accessibility

Block Elements
==============

Code Block - Multi-line Code
-----------------------------

**Button**: Terminal icon

**Icon**: Feather "terminal" icon

**RST Syntax**:

.. code-block:: rst

   .. code-block:: python

      # Your code here
      print("Hello, World!")

**Renders**: Syntax-highlighted code block

**How to use**:

1. Select code (optional)
2. Click code block button
3. Code is indented and wrapped

**Examples**:

*With selection:*

.. code-block:: rst

   .. code-block:: python

      def hello():
          print("Hello!")

*Without selection:*

.. code-block:: rst

   .. code-block:: python

      # Your code here
      print("Hello, World!")

**Language Options**:

- ``python``
- ``javascript``
- ``bash``
- ``sql``
- ``yaml``
- ``json``
- ``rst``
- ``text`` (no highlighting)
- Many more supported

**Advanced Options**:

.. code-block:: rst

   .. code-block:: python
      :linenos:
      :emphasize-lines: 2,4-6
      :caption: Example Code

      def example():
          return True

**Options**:

- ``:linenos:`` - Show line numbers
- ``:emphasize-lines:`` - Highlight specific lines
- ``:caption:`` - Add caption above code

**Tips**:

- Indent code by 3 spaces
- Blank line after ``.. code-block::``
- Blank line after code block
- Change language name as needed

Blockquote - Quote Text
-----------------------

**Button**: Message square icon

**Icon**: Feather "message-square" icon

**RST Syntax**:

.. code-block:: rst

      This is a blockquote.
      It can span multiple lines.

**Renders**: Indented, styled quotation

**How to use**:

1. Select text to quote (optional)
2. Click blockquote button
3. Text is indented by 3 spaces

**Examples**:

*With selection:*

.. code-block:: rst

      To be or not to be,
      that is the question.

*Without selection:*

.. code-block:: rst

      This is a blockquote.
      It can span multiple lines.

**Nested Quotes**:

.. code-block:: rst

      Outer quote

         Nested quote (6 spaces)

      Back to outer quote

**Attribution**:

.. code-block:: rst

      "The only way to do great work is to love what you do."

      -- Steve Jobs

**Tips**:

- Indent by 3 spaces minimum
- Blank line before and after
- Can contain other RST elements
- Use for citations, quotes, examples

Table - Grid Table
------------------

**Button**: Grid icon

**Icon**: Feather "grid" icon

**RST Syntax**:

.. code-block:: rst

   +------------+------------+------------+
   | Header 1   | Header 2   | Header 3   |
   +============+============+============+
   | Row 1, C1  | Row 1, C2  | Row 1, C3  |
   +------------+------------+------------+
   | Row 2, C1  | Row 2, C2  | Row 2, C3  |
   +------------+------------+------------+

**Renders**: HTML table with borders

**How to use**:

1. Place cursor on empty line
2. Click table button
3. Table template inserted
4. Edit content, add rows as needed

**Table Template**:

- 3 columns
- 2 data rows
- Header row with ``=`` separator

**Customizing Tables**:

**Add Row**:

.. code-block:: rst

   +------------+------------+------------+
   | New Row    | New Data   | More Data  |
   +------------+------------+------------+

**Add Column**:

Increase width and add column:

.. code-block:: rst

   +-------+-------+-------+-------+
   | Col 1 | Col 2 | Col 3 | Col 4 |
   +=======+=======+=======+=======+
   | Data  | Data  | Data  | Data  |
   +-------+-------+-------+-------+

**Cell Spanning**:

.. code-block:: rst

   +------------+------------+
   | Spans      | Normal     |
   | two rows   +------------+
   |            | Data       |
   +------------+------------+

**Alternative: Simple Tables**:

.. code-block:: rst

   =====  =====  ======
     A      B    Result
   =====  =====  ======
   False  False  False
   True   False  False
   False  True   False
   True   True   True
   =====  =====  ======

**Tips**:

- Grid tables are verbose but flexible
- Use monospace font for alignment
- Copy and modify existing rows
- Check alignment carefully
- Simple tables easier for basic data

Tips & Tricks
=============

General Tips
------------

1. **Preview First**: Check preview before exporting
2. **Use Templates**: Toolbar inserts proper syntax
3. **Read Errors**: Error panel shows syntax issues
4. **Check Alignment**: RST is whitespace-sensitive
5. **Blank Lines**: Separate blocks with blank lines

Common Patterns
---------------

**Document Structure**:

.. code-block:: rst

   ================
   Document Title
   ================

   Introduction
   ============

   First paragraph text.

   Section 1
   ---------

   Subsection
   ~~~~~~~~~~

   Content here.

**Code Documentation**:

.. code-block:: rst

   Function Name
   -------------

   .. code-block:: python

      def example(arg):
          """Docstring."""
          return arg * 2

   **Parameters**:

   - ``arg`` - Input value

   **Returns**: Doubled value

**Lists with Code**:

.. code-block:: rst

   Installation steps:

   1. Install dependencies::

          pip install -r requirements.txt

   2. Run setup::

          python setup.py install

   3. Test installation::

          pytest tests/

Keyboard Workflow
-----------------

1. **Tab**: Navigate toolbar buttons
2. **Enter**: Activate focused button
3. **Type**: Continue editing
4. **Ctrl+A**: Select all
5. **Click toolbar**: Transform selection

Quick Reference
---------------

.. list-table::
   :header-rows: 1
   :widths: 20 30 15

   * - Element
     - Syntax
     - Button
   * - H1
     - ``====``
     - H1
   * - H2
     - ``----``
     - H2
   * - H3
     - ``~~~~``
     - H3
   * - Bold
     - ``**text**``
     - **B**
   * - Italic
     - ``*text*``
     - *I*
   * - Code
     - ````text````
     - ``</>``
   * - Bullet
     - ``- item``
     - •
   * - Number
     - ``1. item``
     - #
   * - Link
     - ``` `text <url>`_ ```
     - Link
   * - Image
     - ``.. image::``
     - Image
   * - Code Block
     - ``.. code-block::``
     - Terminal
   * - Quote
     - ``   text``
     - Quote
   * - Table
     - ``+--+--+``
     - Grid

Keyboard Shortcuts
==================

**Current Status**: No built-in keyboard shortcuts yet.

**Future Plans** (see TODO.md):

- Ctrl+B: Bold
- Ctrl+I: Italic
- Ctrl+K: Link
- Ctrl+Shift+C: Code block
- Ctrl+1/2/3: Headers
- Ctrl+L: Bullet list
- Ctrl+Shift+L: Numbered list

**Workaround**:

Use browser accessibility features to tab to buttons and press Enter.

Advanced Usage
==============

Combining Elements
------------------

**List with code**:

.. code-block:: rst

   - Install package::

         pip install pyrst

   - Run application::

         python -m pyrst

**Table with links**:

.. code-block:: rst

   +---------+------------------------------------------+
   | Package | Documentation                             |
   +=========+==========================================+
   | NumPy   | `Link <https://numpy.org>`_              |
   +---------+------------------------------------------+
   | Pandas  | `Link <https://pandas.pydata.org>`_      |
   +---------+------------------------------------------+

**Code with emphasis**:

.. code-block:: rst

   Use the ``**kwargs`` pattern for **variable** arguments.

Custom Directives
-----------------

**Note admonition**:

.. code-block:: rst

   .. note::

      This is important information for the reader.

**Warning admonition**:

.. code-block:: rst

   .. warning::

      This operation cannot be undone!

**See Also**:

.. code-block:: rst

   .. seealso::

      - :ref:`related-section`
      - `External link <https://example.com>`_

Complex Example
---------------

.. code-block:: rst

   Advanced Features
   =================

   Code Execution
   --------------

   PyRST supports **syntax highlighting** for code blocks:

   .. code-block:: python
      :linenos:
      :emphasize-lines: 3,5

      def fibonacci(n):
          """Calculate Fibonacci number."""
          if n <= 1:
              return n
          return fibonacci(n-1) + fibonacci(n-2)

   **Key points**:

   - Recursive implementation
   - Uses ``**kwargs`` pattern
   - See `Python docs <https://docs.python.org>`_ for more

   .. note::

      This is O(2^n) complexity. Use memoization for better performance.

----

**Last Updated**: 2025-11-15

**See Also**:

- :doc:`features`
- :doc:`api`
- `reStructuredText Primer <https://docutils.sourceforge.io/docs/user/rst/quickstart.html>`_
