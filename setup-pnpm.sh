#!/bin/bash

# Install pnpm globally if not already installed
if ! command -v pnpm &> /dev/null; then
    echo "Installing pnpm globally..."
    npm install -g pnpm
fi

# Check pnpm version
pnpm_version=$(pnpm --version)
echo "Using pnpm version: $pnpm_version"

# Remove existing node_modules and lock files
echo "Cleaning up existing dependencies..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

# Install dependencies with pnpm
echo "Installing dependencies with pnpm..."
pnpm install

# Setup complete
echo "✅ Setup complete! Your project is now using pnpm."
echo ""
echo "Common pnpm commands:"
echo "  pnpm dev         - Start development server"
echo "  pnpm build       - Build for production"
echo "  pnpm start       - Start production server"
echo "  pnpm add <pkg>   - Add a dependency"
echo "  pnpm add -D <pkg> - Add a dev dependency"
echo ""
echo "Enjoy the speed and efficiency of pnpm! 🚀"
