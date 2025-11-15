===============
Deployment Guide
===============

This guide covers deploying both the PyRST application and documentation to GitHub Pages.

Architecture
============

The deployment combines both the app and docs into a single GitHub Pages site:

.. code-block:: text

   https://rst.scriptr.dev/
   ├── /                  # Main PyRST application (from src/pyrst/)
   │   ├── index.html
   │   ├── app.js
   │   ├── main.py
   │   └── ...
   └── /docs/             # Sphinx documentation (built from docs/)
       ├── index.html
       ├── api.html
       ├── features.html
       └── ...

Local Testing
==============

Build and Preview Locally
--------------------------

.. code-block:: bash

   # Build the complete site (app + docs)
   make site-build

   # Build and serve the complete site
   make site-serve

Then visit:

- **App**: http://localhost:8003/
- **Docs**: http://localhost:8003/docs/

Build Only Documentation
-------------------------

.. code-block:: bash

   # Build docs with live reload
   make docs-serve

   # Build docs once
   make docs-build

GitHub Actions Deployment
==========================

The deployment is automated via ``.github/workflows/deploy.yml`` which:

1. **Builds on every push to main**
2. **Builds documentation** using Sphinx
3. **Copies app files** from ``src/pyrst/``
4. **Combines** both into ``_site/`` directory
5. **Deploys** to GitHub Pages

Workflow Trigger
----------------

The workflow runs:

- On every push to ``main`` branch
- On manual trigger via GitHub Actions UI

Build Process
-------------

.. code-block:: yaml

   - Build documentation → _site/docs/
   - Copy app files → _site/
   - Add .nojekyll file
   - Upload to GitHub Pages

GitHub Pages Configuration
===========================

Required Settings
-----------------

1. **Repository Settings** → **Pages**:

   - Source: **GitHub Actions**
   - Custom domain: ``rst.scriptr.dev``

2. **Cloudflare DNS**:

   - Already configured: ``rst.scriptr.dev`` CNAME → ``jacobcoffee.github.io``

First Deployment
----------------

After pushing changes to ``main``:

1. GitHub Actions will automatically trigger
2. Check workflow status at: https://github.com/JacobCoffee/pyrst/actions
3. Once deployed, verify:

   - App: https://rst.scriptr.dev/
   - Docs: https://rst.scriptr.dev/docs/

Alternative: Separate Subdomain for Docs
=========================================

If you want docs on a separate subdomain like ``docs.rst.scriptr.dev``:

Option 1: GitHub Pages (Same Repo)
-----------------------------------

1. **Add Cloudflare CNAME**:

   .. code-block:: text

      docs.rst.scriptr.dev → jacobcoffee.github.io

2. **Update workflow** to deploy to subdomain:

   .. code-block:: yaml

      - name: Configure custom domain
        run: echo "docs.rst.scriptr.dev" > _site/docs/CNAME

.. note::

   GitHub Pages only supports one custom domain per repo, so this would replace the main domain.

Option 2: Separate Repo (Recommended for Subdomain)
----------------------------------------------------

1. **Create new repo**: ``pyrst-docs``
2. **Move docs** to new repo
3. **Configure GitHub Pages** for new repo with custom domain ``docs.rst.scriptr.dev``
4. **Add Cloudflare CNAME**: ``docs.rst.scriptr.dev → jacobcoffee.github.io/pyrst-docs``

Option 3: Cloudflare Pages (Alternative)
-----------------------------------------

Deploy docs separately to Cloudflare Pages:

1. **Connect repo** to Cloudflare Pages
2. **Build command**: ``make docs-build``
3. **Output directory**: ``docs/_build/html``
4. **Custom domain**: ``docs.rst.scriptr.dev``

This allows both:

- ``rst.scriptr.dev`` → GitHub Pages (app)
- ``docs.rst.scriptr.dev`` → Cloudflare Pages (docs)

Recommended Setup
=================

**Current (Simplest)**:

- ✅ App at https://rst.scriptr.dev/
- ✅ Docs at https://rst.scriptr.dev/docs/
- ✅ Single deployment workflow
- ✅ Single GitHub Pages site

**Benefits**:

- Simple CI/CD
- Single workflow to maintain
- Docs always in sync with app version
- No additional DNS configuration

Manual Deployment
=================

If needed, you can manually deploy:

.. code-block:: bash

   # Build the site
   make site-build

   # The _site/ directory contains everything
   # You can upload this to any static host:
   # - GitHub Pages
   # - Netlify
   # - Vercel
   # - Cloudflare Pages
   # - AWS S3 + CloudFront

Troubleshooting
===============

Build Failures
--------------

Check GitHub Actions logs: https://github.com/JacobCoffee/pyrst/actions

Common issues:

- Missing dependencies: Check ``pyproject.toml``
- Sphinx warnings: Check ``docs/conf.py``
- Permission errors: Verify workflow permissions

Local Build Issues
------------------

.. code-block:: bash

   # Clean all build artifacts
   make docs-clean

   # Rebuild
   make site-build

404 on Deployed Site
--------------------

1. Verify GitHub Pages is enabled
2. Check custom domain configuration
3. Wait 5-10 minutes for DNS propagation
4. Check ``.nojekyll`` file exists in ``_site/``

Updating Documentation
======================

1. **Edit docs** in ``docs/*.rst``
2. **Test locally**: ``make docs-serve``
3. **Commit and push** to ``main``
4. **GitHub Actions** automatically deploys

Links
=====

- **Live App**: https://rst.scriptr.dev/
- **Live Docs**: https://rst.scriptr.dev/docs/
- **GitHub Repo**: https://github.com/JacobCoffee/pyrst
- **GitHub Actions**: https://github.com/JacobCoffee/pyrst/actions
