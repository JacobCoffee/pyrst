"""Convert rST using docutils."""

import js
from pyodide.http import pyfetch


def convert_rst(rst_text: str) -> str:
    """Convert reStructuredText to HTML."""
    if not rst_text.strip():
        return ""

    try:
        # Use publish_string for direct HTML output
        from docutils.core import publish_string

        html = publish_string(
            source=rst_text,
            writer_name="html5",
            settings_overrides={
                "initial_header_level": 1,
                "report_level": 5,
                "halt_level": 5,
                "embed_stylesheet": False,
                "xml_declaration": False,
                "doctitle_xform": False,
            },
        )

        # Convert bytes to string if needed
        if isinstance(html, bytes):
            html = html.decode("utf-8")

        # Extract just the body content (between <body> and </body>)
        import re

        body_match = re.search(r"<body[^>]*>(.*?)</body>", html, re.DOTALL)
        if body_match:
            html = body_match.group(1)

        # Remove the document wrapper div if present
        html = re.sub(r'^\s*<div class="document"[^>]*>', "", html)
        html = re.sub(r"</div>\s*$", "", html)

        return html.strip()
    except Exception as exc:
        import traceback

        error_detail = traceback.format_exc()
        return f'<div class="text-red-600 p-4 bg-red-50 rounded"><strong>Error:</strong> {exc}<pre class="text-xs mt-2">{error_detail}</pre></div>'


async def load_sample_rst():
    """Load the sample RST content from file."""
    response = await pyfetch("./sample.rst")
    content = await response.string()
    return content


async def initialize_editor():
    """Initialize the editor with sample content."""
    sample_text = await load_sample_rst()

    editor = js.document.getElementById("editor")
    preview = js.document.getElementById("preview")

    editor.value = sample_text

    # Convert RST to HTML
    html_output = convert_rst(sample_text)

    # IMPORTANT: Direct assignment doesn't work due to escaping
    # Instead, create a temporary element and use it
    temp = js.document.createElement("div")
    temp.innerHTML = html_output
    preview.replaceChildren()  # Clear existing content

    # Move all children from temp to preview
    while temp.firstChild:
        preview.appendChild(temp.firstChild)

    js.console.log("Editor initialized from Python!")


def setup_event_handlers():
    """Set up event handlers using Python."""

    def on_input(event):
        """Handle input events on the editor."""
        rst_text = event.target.value
        html_output = convert_rst(rst_text)

        # Same approach: use temporary element
        preview = js.document.getElementById("preview")
        temp = js.document.createElement("div")
        temp.innerHTML = html_output
        preview.replaceChildren()

        while temp.firstChild:
            preview.appendChild(temp.firstChild)

    editor = js.document.getElementById("editor")

    # Create a proxy to allow Python function to be called from JS
    # ffi lets us create a proxy obj that can be called from one lang to another
    # this is bridging js <-> python
    from pyodide.ffi import create_proxy

    input_proxy = create_proxy(on_input)

    editor.addEventListener("input", input_proxy)
    js.console.log("Event handlers registered from Python!")
