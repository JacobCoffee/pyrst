.DEFAULT_GOAL:=help
.ONESHELL:
NODE_ENV=.nodeenv

help: ## Display this help text for Makefile
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z0-9_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

upgrade: ## Upgrade all dependencies to the latest stable versions
	@uv lock --upgrade
	@echo "=> Dependencies Updated"

setup-node: ## Set up node environment and install prettier
	@bash scripts/setup_node.sh

lint: ## Lint the code
	@uv run ruff check --fix --unsafe-fixes .

fmt: ## Format the code
	@uv run ruff format .

fmt-check: ## Runs Ruff format in check mode (no changes)
	@uv run --no-sync ruff format --check .

prettier: setup-node ## Format JS/CSS/HTML with prettier
	@source $(NODE_ENV)/bin/activate && npx prettier --write "src/**/*.{js,css,html}"

prettier-check: setup-node ## Check JS/CSS/HTML formatting with prettier
	@source $(NODE_ENV)/bin/activate && npx prettier --check "src/**/*.{js,css,html}"

type-check: ## Run type-checking
	@uv run ty check

test: ## Run tests
	@uv run pytest

ci: lint fmt prettier type-check test ## Run everything its cleaner.

docs-serve: ## Serve documentation locally with auto-rebuild
	@uv run sphinx-autobuild docs docs/_build/html --port 8002 --watch docs

docs-build: ## Build documentation
	@uv run sphinx-build -W --keep-going -b html docs docs/_build/html

docs-clean: ## Clean documentation build artifacts
	@rm -rf docs/_build docs/_static docs/_templates _site

site-build: ## Build complete site (app + docs) for deployment
	@echo "Building documentation..."
	@uv run sphinx-build -b html docs _site/docs
	@echo "Copying app files..."
	@mkdir -p _site
	@cp -r src/pyrst/* _site/
	@touch _site/.nojekyll
	@echo "Site built in _site/ directory"
	@echo "  - App: _site/index.html"
	@echo "  - Docs: _site/docs/index.html"

site-serve: site-build ## Build and serve complete site locally
	@echo "Serving site at http://localhost:8003"
	@echo "  - App: http://localhost:8003/"
	@echo "  - Docs: http://localhost:8003/docs/"
	@cd _site && python3 -m http.server 8003
