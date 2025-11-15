================================================================================
Welcome to the Comprehensive reStructuredText Showcase
================================================================================

:Author: PyRST Documentarians
:Date: 2025-11-15
:Version: 2.0
:Status: Complete
:Abstract: This document demonstrates the full capabilities of reStructuredText,
           including formatting, directives, roles, tables, code blocks, and more.

.. contents:: Table of Contents
   :depth: 3
   :backlinks: top

================================================================================
Section 1: Text Formatting & Inline Markup
================================================================================

Basic Inline Formatting
------------------------

reStructuredText supports various inline text formatting options:

* *Emphasis* (typically rendered as italics)
* **Strong emphasis** (typically rendered as bold)
* ``Inline code`` or literal text
* `Interpreted text` (role depends on context)

You can also use :sub:`subscript` and :sup:`superscript` text, as well as 
:title:`title reference` for document or section titles.

Special Characters & Escaping
------------------------------

Backslash escaping works: \*not emphasized\*, \`not code\`.

Em-dashes (---), en-dashes (--), and ellipsis (...) are automatically converted.

Inline Literals & Code
-----------------------

For inline code, use double backticks: ``import antigravity``

You can also reference code elements with roles:

* :code:`variable = 42`
* :py:func:`range`
* :py:class:`MyClass`
* :py:meth:`object.method`

================================================================================
Section 2: Paragraphs & Block Quotes
================================================================================

Regular Paragraphs
------------------

This is a regular paragraph. Paragraphs are separated by blank lines.
Multiple lines within a paragraph are joined together automatically,
making it easy to write flowing text without worrying about line breaks.

    This is a block quote. Block quotes are indented and can span
    multiple lines. They're useful for quoting other sources or
    highlighting important text.

        Block quotes can be nested by increasing the indentation level.
        This creates a visual hierarchy in your documentation.

Line Blocks
-----------

| Line blocks preserve line breaks.
| Each line starts with a pipe character.
| This is useful for addresses, poetry, or code output.
|
| You can even have blank lines within them.

================================================================================
Section 3: Lists & Enumerations
================================================================================

Bullet Lists
------------

Simple bullet lists:

* First item
* Second item
* Third item with a longer description that wraps across
  multiple lines while maintaining proper indentation

Nested bullet lists:

* Top level item
  
  * Nested item one
  * Nested item two
    
    * Deeply nested item
    * Another deeply nested item

* Back to top level

Enumerated Lists
----------------

Numbered lists with different styles:

1. First item
2. Second item
3. Third item

a. Lowercase letters
b. Second item
c. Third item

A. Uppercase letters
B. Second item
C. Third item

i. Roman numerals (lowercase)
ii. Second item
iii. Third item

Auto-numbered list:

#. First auto-numbered item
#. Second auto-numbered item
#. Third auto-numbered item

Definition Lists
----------------

Term 1
    Definition of term 1. This can be a longer description
    that spans multiple lines.

Term 2
    Definition of term 2.

Term 3 : classifier
    Definitions can have classifiers.

Term 4 : classifier one : classifier two
    Multiple classifiers are supported.

Field Lists
-----------

:Field name: Field content can span multiple lines if needed,
             maintaining proper indentation.
:Another field: Simple content
:Date: 2025-11-15
:Status: Active
:Priority: High

Option Lists
------------

-a            Option with short form
-b file       Option with argument
--long        Long option form
--input=file  Long option with argument
-v, --verbose Options can have short and long forms

================================================================================
Section 4: Code Blocks & Literal Blocks
================================================================================

Literal Blocks
--------------

A literal block is introduced by ending a paragraph with ``::``::

    This is a literal block.
    It preserves whitespace and line breaks.
    Useful for code or preformatted text.
    
        Indentation is preserved.
        def example():
            return True

Code Blocks with Syntax Highlighting
-------------------------------------

Python code:

.. code-block:: python
   :linenos:
   :emphasize-lines: 3,5-7

   def fibonacci(n):
       """Calculate Fibonacci sequence."""
       if n <= 1:
           return n
       else:
           return fibonacci(n-1) + fibonacci(n-2)
   
   # Generate first 10 Fibonacci numbers
   result = [fibonacci(i) for i in range(10)]
   print(result)

JavaScript code:

.. code-block:: javascript
   :linenos:

   function greet(name) {
       console.log(`Hello, ${name}!`);
   }
   
   const users = ['Alice', 'Bob', 'Charlie'];
   users.forEach(user => greet(user));

SQL code:

.. code-block:: sql

   SELECT 
       u.id,
       u.username,
       COUNT(p.id) as post_count
   FROM users u
   LEFT JOIN posts p ON u.id = p.user_id
   WHERE u.active = true
   GROUP BY u.id, u.username
   HAVING COUNT(p.id) > 5
   ORDER BY post_count DESC;

YAML configuration:

.. code-block:: yaml

   server:
     host: localhost
     port: 8080
     ssl: true
   
   database:
     type: postgresql
     name: myapp
     credentials:
       user: admin
       password: secret

================================================================================
Section 5: Tables
================================================================================

Grid Tables
-----------

Grid tables provide the most control but are verbose:

+------------------------+------------+----------+----------+
| Header row, column 1   | Header 2   | Header 3 | Header 4 |
+========================+============+==========+==========+
| body row 1, column 1   | column 2   | column 3 | column 4 |
+------------------------+------------+----------+----------+
| body row 2             | Cells may span columns.          |
+------------------------+------------+---------------------+
| body row 3             | Cells may  | - Cells             |
+------------------------+ span rows. | - can               |
| body row 4             |            | - contain           |
+------------------------+------------+ - blocks            |

Simple Tables
-------------

Simple tables are easier to write but less flexible:

=====  =====  =======
  A      B    A and B
=====  =====  =======
False  False  False
True   False  False
False  True   False
True   True   True
=====  =====  =======

Performance Metrics Table:

=========  ========  ========  =========
Metric     Minimum   Average   Maximum
=========  ========  ========  =========
Latency    5ms       12ms      45ms
Throughput 1000/s    5000/s    10000/s
Memory     256MB     512MB     1024MB
=========  ========  ========  =========

CSV Tables
----------

Tables can be generated from CSV data:

.. csv-table:: Programming Languages Comparison
   :header: "Language", "Typing", "Paradigm", "Year"
   :widths: 20, 15, 30, 10

   "Python", "Dynamic", "Multi-paradigm", "1991"
   "Java", "Static", "Object-oriented", "1995"
   "JavaScript", "Dynamic", "Multi-paradigm", "1995"
   "Rust", "Static", "Multi-paradigm", "2010"
   "Go", "Static", "Concurrent", "2009"

List Tables
-----------

List tables are defined using list syntax:

.. list-table:: Feature Comparison
   :widths: 25 25 25 25
   :header-rows: 1

   * - Feature
     - Basic Plan
     - Pro Plan
     - Enterprise
   * - Storage
     - 10GB
     - 100GB
     - Unlimited
   * - Users
     - 5
     - 50
     - Unlimited
   * - Support
     - Email
     - Email + Chat
     - 24/7 Phone

================================================================================
Section 6: Links & References
================================================================================

External Hyperlinks
-------------------

Direct links: https://www.python.org

Named links: `Python Website <https://www.python.org>`_

Anonymous links: `Python`__ and `Documentation`__

__ https://www.python.org
__ https://docs.python.org

Internal Links & References
----------------------------

You can link to other sections like `Section 1: Text Formatting & Inline Markup`_.

Or use custom reference names:

.. _custom-label:

This section has a custom label that can be referenced from anywhere.

Link to the `custom label <custom-label_>`_.

Footnotes & Citations
---------------------

Here's a sentence with a footnote. [#footnote1]_

Another footnote reference. [#footnote2]_

You can also use manual footnote numbers. [1]_

Citation references look like this. [CIT2025]_

.. [#footnote1] This is the first auto-numbered footnote.
.. [#footnote2] This is the second auto-numbered footnote with
   content spanning multiple lines.
.. [1] Manually numbered footnote.
.. [CIT2025] Citation example. "rST Documentation Best Practices", 
   Documentarians, 2025.

================================================================================
Section 7: Admonitions & Directives
================================================================================

Standard Admonitions
--------------------

.. attention::
   This is an attention admonition. Use it to highlight important information
   that requires the reader's focus.

.. caution::
   Caution admonitions warn users about potential issues or things to be
   careful about.

.. danger::
   Danger admonitions indicate severe warnings about dangerous operations
   or critical issues.

.. error::
   Error admonitions describe error conditions or problems that have occurred.

.. hint::
   Hint admonitions provide helpful tips or suggestions to make things easier.

.. important::
   Important admonitions highlight crucial information that shouldn't be missed.

.. note::
   Note admonitions contain supplementary information that adds context or
   clarification to the main content.

.. tip::
   Tip admonitions offer practical advice or best practices.

.. warning::
   Warning admonitions alert users to potential problems or deprecated features.

Generic Admonition
------------------

.. admonition:: Custom Admonition Title

   You can create custom admonitions with any title you want.
   This is useful for specialized documentation needs.

Sidebar Content
---------------

.. sidebar:: Related Information
   :subtitle: Additional Context

   Sidebars contain related information that supplements the main content.
   They're typically rendered in a box to the side of the main text.
   
   * Related link 1
   * Related link 2
   * Related link 3

The main content continues here alongside the sidebar.

Topics
------

.. topic:: Topic Title

   Topics are like mini-documents within a document. They have titles
   and can contain any type of content including lists, code blocks,
   and other elements.

================================================================================
Section 8: Images & Figures
================================================================================

Simple Images
-------------

Images can be included with the image directive:

.. image:: https://via.placeholder.com/400x200.png?text=Sample+Image
   :alt: Sample placeholder image
   :width: 400px
   :align: center

Figures with Captions
---------------------

Figures are images with captions and optional legends:

.. figure:: https://via.placeholder.com/500x300.png?text=Figure+Example
   :alt: Example figure
   :width: 500px
   :align: center
   :figwidth: 80%

   **Figure 1:** This is the figure caption. It can span multiple lines
   and provides context for the image above.

   The legend (this part) provides additional information about the figure.
   It can contain multiple paragraphs and other rST elements.

================================================================================
Section 9: Advanced Directives
================================================================================

Contents Directive
------------------

Local table of contents for this section:

.. contents:: Section Contents
   :local:
   :depth: 2

Include Directive
-----------------

You can include external files (example, not active):

.. code-block:: rst

   .. include:: external_file.rst

Raw HTML/LaTeX
--------------

Raw content passes through unchanged:

.. raw:: html

   <div style="color: blue; font-weight: bold;">
   This is raw HTML content that will be rendered directly.
   </div>

Replace Directive
-----------------

.. |RST| replace:: reStructuredText
.. |date| date:: %Y-%m-%d

Text substitutions: |RST| is powerful! Today's date: |date|

Math Directive
--------------

Mathematical notation (if math role is available):

.. math::

   \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}

Inline math: :math:`E = mc^2`

Container Directive
-------------------

.. container:: custom-class

   Containers allow you to apply custom classes to content blocks,
   which can be styled with CSS in HTML output.

Class Directive
---------------

.. class:: highlight

This paragraph has a custom class applied to it.

================================================================================
Section 10: Comments & Metadata
================================================================================

Comments
--------

.. This is a comment that won't appear in the rendered output.
   Comments can span multiple lines.
   They're useful for notes to documentation writers.

..
   You can also create comment blocks like this,
   which is useful for temporarily disabling large sections.

Document Metadata
-----------------

Metadata can be defined at the document level:

.. meta::
   :description: Comprehensive reStructuredText showcase document
   :keywords: rST, reStructuredText, documentation, markup, Python

================================================================================
Section 11: Special Sections
================================================================================

Dedications
-----------

.. dedication::

   This document is dedicated to the Python documentation community
   and all who contribute to making documentation better.

Abstract
--------

.. abstract::

   This comprehensive showcase demonstrates the full range of
   reStructuredText capabilities, from basic formatting to advanced
   directives and complex table structures.

Compound Paragraphs
-------------------

.. compound::

   This is a compound paragraph containing multiple elements that are
   treated as a single unit. This is useful for grouping related content.
   
   * Item one
   * Item two
   
   All of this is part of the compound paragraph.

================================================================================
Section 12: Code Documentation Features
================================================================================

Function Documentation
----------------------

.. py:function:: calculate_fibonacci(n: int) -> int

   Calculate the nth Fibonacci number.

   :param n: The position in the Fibonacci sequence
   :type n: int
   :returns: The Fibonacci number at position n
   :rtype: int
   :raises ValueError: If n is negative

   Example usage::

       >>> calculate_fibonacci(10)
       55

Class Documentation
-------------------

.. py:class:: DataProcessor

   A class for processing data with various transformation methods.

   .. py:method:: load_data(filepath: str) -> pd.DataFrame

      Load data from a file.

      :param filepath: Path to the data file
      :type filepath: str
      :returns: Loaded data
      :rtype: pd.DataFrame

   .. py:method:: transform(data: pd.DataFrame) -> pd.DataFrame

      Transform the input data.

      :param data: Input DataFrame
      :type data: pd.DataFrame
      :returns: Transformed data
      :rtype: pd.DataFrame

Module Documentation
--------------------

.. py:module:: mypackage.utilities

.. py:data:: DEFAULT_TIMEOUT
   :type: int
   :value: 30

   Default timeout value in seconds.

================================================================================
Section 13: Cross-referencing
================================================================================

See Also
--------

.. seealso::

   * :ref:`custom-label`
   * :doc:`other_document`
   * `External Documentation <https://docutils.sourceforge.io/rst.html>`_

Version Information
-------------------

.. versionadded:: 2.0
   This feature was added in version 2.0.

.. versionchanged:: 2.1
   The behavior was modified to improve performance.

.. deprecated:: 3.0
   This feature will be removed in version 3.0. Use :func:`new_function` instead.

================================================================================
Section 14: Testing & Examples
================================================================================

Doctest Blocks
--------------

Doctest blocks show interactive Python sessions:

>>> def add(a, b):
...     return a + b
>>> add(2, 3)
5
>>> add(-1, 1)
0

Parsed Literal Blocks
----------------------

.. parsed-literal::

   This is a parsed literal block.
   It preserves whitespace but allows **inline** *markup*.
   Code: ``example.py``

================================================================================
Section 15: Transitions & Separators
================================================================================

A transition is a horizontal line:

----

They separate sections or topics within a document.

Another way to create transitions:

****

Or using underscores:

____

================================================================================
Conclusion
================================================================================

This comprehensive showcase demonstrates the extensive capabilities of
reStructuredText. From simple text formatting to complex tables, code blocks,
and advanced directives, rST provides all the tools needed for professional
documentation.

Key Takeaways
-------------

1. **Readability**: rST source is readable even without rendering
2. **Flexibility**: Supports everything from simple notes to complex technical docs
3. **Extensibility**: Custom directives and roles can be created
4. **Standardization**: Widely used in Python documentation ecosystem

Additional Resources
--------------------

For more information, consult these resources:

* `reStructuredText Primer <https://docutils.sourceforge.io/docs/user/rst/quickstart.html>`_
* `Quick Reference <https://docutils.sourceforge.io/docs/user/rst/quickref.html>`_
* `Directives Reference <https://docutils.sourceforge.io/docs/ref/rst/directives.html>`_

================================================================================
Section 16: Error Detection Showcase (Intentional Errors Below)
================================================================================

.. note::

   The examples below contain **intentional errors and warnings** to demonstrate
   PyRST's error detection and reporting capabilities. These are meant to showcase
   the error panel, not actual documentation mistakes!

Intentional Warning: Duplicate Target
--------------------------------------

.. _demo-target:

This is a target for cross-referencing.

.. _demo-target:

This creates a duplicate implicit target warning (shown in error panel).

Intentional Error: Malformed Directive
---------------------------------------

.. note
   This note directive is missing the double colon, causing a warning.

Intentional Error: Invalid Indentation
---------------------------------------

.. code-block:: python

def broken_indent():
    # This code block has incorrect indentation
    return "error"

Intentional Warning: Unknown Role
----------------------------------

This text uses an :unknown-role:`invalid custom role` that doesn't exist.

Intentional Error: Malformed Link
----------------------------------

This is a `malformed link because it's missing the closing backtick and underscore

Intentional Warning: Unmatched Title Underline
-----------------------------------------------

Bad Heading
=====

The underline is too short for this heading.

.. note::

   End of intentional error examples. The errors above help demonstrate
   PyRST's real-time error detection in the error panel!

================================================================================

.. footer:: Document generated on |date| | Version 2.0 | |RST| Showcase
