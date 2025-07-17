#!/bin/bash

# Exit on error
set -e

# Display a message
echo "🚀 Initializing Aguat Solutions Landing Page project..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Set up Husky
echo "🐶 Setting up Husky git hooks..."
npx husky install
chmod +x .husky/pre-commit
chmod +x .husky/_/husky.sh

# Run linting and formatting
echo "🔍 Running linter and formatter..."
npm run lint:fix

# Start development server
echo "✅ Setup complete! Starting development server..."
echo "🌐 You can now access the site at http://localhost:3000"
npm run dev