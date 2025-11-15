#!/usr/bin/env bash
set -e

# Setup node environment using nodeenv
NODE_ENV_DIR=".nodeenv"

if [ ! -d "$NODE_ENV_DIR" ]; then
    echo "Creating node environment..."
    uv run nodeenv "$NODE_ENV_DIR"
fi

echo "Activating node environment and installing prettier..."
source "$NODE_ENV_DIR/bin/activate"
npm install --save-dev prettier
echo "Node environment setup complete!"