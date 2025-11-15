.PHONY: install serve

install:
	@uv sync

serve:
	@echo "Starting development server at http://localhost:8000"
	@cd src/pyrst/ && uv run python -m http.server 8000
