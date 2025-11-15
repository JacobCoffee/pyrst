"""Sphinx configuration for PyRST."""

from __future__ import annotations

import importlib.metadata
from datetime import datetime

# -- Project information -----------------------------------------------------
project = "PyRST"
author = "Jacob Coffee"
copyright = f"{datetime.now().year}, {author}"  # noqa: A001, DTZ005
release = importlib.metadata.version("pyrst")

# -- General configuration ---------------------------------------------------
extensions = [
    "sphinx.ext.autodoc",
    "sphinx.ext.napoleon",
    "sphinx.ext.intersphinx",
    "sphinx.ext.autosectionlabel",
    "sphinx.ext.viewcode",
    "sphinx_copybutton",
    "sphinx_design",
]

# Intersphinx mapping
intersphinx_mapping = {
    "python": ("https://docs.python.org/3", None),
}

# Autosectionlabel settings
autosectionlabel_prefix_document = True

# Napoleon settings
napoleon_google_docstring = True
napoleon_numpy_docstring = False
napoleon_include_init_with_doc = True
napoleon_include_private_with_doc = False
napoleon_include_special_with_doc = True
napoleon_use_admonition_for_examples = True
napoleon_use_admonition_for_notes = True
napoleon_use_admonition_for_references = False
napoleon_use_ivar = False
napoleon_use_param = True
napoleon_use_rtype = True
napoleon_attr_annotations = True

# Autodoc settings
autodoc_default_options = {
    "members": True,
    "member-order": "bysource",
    "special-members": "__init__",
    "undoc-members": True,
    "show-inheritance": True,
}

# -- Options for HTML output -------------------------------------------------
html_theme = "shibuya"
html_title = "PyRST"

html_theme_options = {
    "accent_color": "blue",
    "logo_target": "/",
    "announcement": "Docs were AI generated, sorry if they suck!",
    "nav_links": [
        {
            "title": "Demo",
            "url": "https://pyrst.dev",
        },
        {
            "title": "GitHub",
            "url": "https://github.com/JacobCoffee/pyrst",
        },
    ],
    "github_url": "https://github.com/JacobCoffee/pyrst",
    "twitter_url": "https://twitter.com/_scriptr",
    "youtube_url": "https://youtube.com/@coffeetbh",
}

# Copy button settings
copybutton_prompt_text = r">>> |\.\.\. |\$ |In \[\d*\]: | {2,5}\.\.\.: | {5,8}: "
copybutton_prompt_is_regexp = True
copybutton_remove_prompts = True

# -- General options ---------------------------------------------------------
templates_path = ["_templates"]
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

# The suffix(es) of source filenames
source_suffix = ".rst"

# The master document
master_doc = "index"

# Add any paths that contain custom static files
html_static_path = ["_static"]

# Output file base name for HTML help builder
htmlhelp_basename = "PyRSTdoc"
