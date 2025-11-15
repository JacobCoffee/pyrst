.PHONY: install install-dev serve test test-cov test-watch lint format check clean help

help:  ## Show this help message
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

install:  ## Install production dependencies
	@uv sync

install-dev:  ## Install development dependencies
	@uv sync --group dev

serve:  ## Start development server at http://localhost:8000
	@echo "Starting development server at http://localhost:8000"
	@cd src/pyrst/ && uv run python -m http.server 8000

test:  ## Run tests
	@echo "Running tests..."
	@uv run pytest -v

test-cov:  ## Run tests with coverage report
	@echo "Running tests with coverage..."
	@uv run pytest --cov=src/pyrst --cov-report=html --cov-report=term -v
	@echo "\nCoverage report generated in htmlcov/index.html"

test-watch:  ## Run tests in watch mode (requires pytest-watch)
	@echo "Running tests in watch mode..."
	@uv run ptw -- -v

test-fast:  ## Run tests without slow tests
	@echo "Running fast tests only..."
	@uv run pytest -v -m "not slow"

lint:  ## Run ruff linter
	@echo "Running linter..."
	@uv run ruff check src tests

format:  ## Format code with ruff
	@echo "Formatting code..."
	@uv run ruff format src tests
	@uv run ruff check --fix src tests

check:  ## Run all checks (lint, format check, type check, tests)
	@echo "Running all checks..."
	@uv run ruff check src tests
	@uv run ruff format --check src tests
	@uv run pytest --cov=src/pyrst --cov-report=term -v

clean:  ## Clean up generated files
	@echo "Cleaning up..."
	@rm -rf .pytest_cache
	@rm -rf htmlcov
	@rm -rf .coverage
	@rm -rf .ruff_cache
	@rm -rf dist
	@rm -rf build
	@rm -rf *.egg-info
	@find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	@find . -type f -name "*.pyc" -delete
	@echo "Clean complete!"
