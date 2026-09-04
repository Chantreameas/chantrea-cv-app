#!/bin/bash
# ============================================================
# 🚀 One-Click Deployment Helper for Chantrea MEAS CV App
# ============================================================
# This script helps you push to GitHub and provides deployment
# instructions for Render.com free hosting.
#
# BEFORE RUNNING THIS SCRIPT:
# 1. Create a GitHub account at https://github.com
# 2. Create a Personal Access Token at:
#    https://github.com/settings/tokens/new
#    - Select scopes: repo (full control)
#    - Copy the token (you'll paste it below)
# 3. Create a new repository at:
#    https://github.com/new
#    - Name: chantrea-cv-app
#    - Make it PRIVATE
#    - Don't initialize with README
# ============================================================

echo ""
echo "🏨 ================================================"
echo "   Chantrea MEAS CV App — Deployment Helper"
echo "   ================================================"
echo ""

# Check if GitHub username and token are provided
if [ -z "$1" ] || [ -z "$2" ]; then
  echo "❌ Usage: ./deploy.sh <GITHUB_USERNAME> <GITHUB_TOKEN>"
  echo ""
  echo "   Example: ./deploy.sh chantrea ghp_xxxxxxxxxxxx"
  echo ""
  echo "   Get your token at: https://github.com/settings/tokens/new"
  echo "   (Select 'repo' scope)"
  echo ""
  exit 1
fi

GITHUB_USER=$1
GITHUB_TOKEN=$2
REPO_NAME="chantrea-cv-app"

# Set remote URL with token
CURRENT_DIR=$(cd "$(dirname "$0")" && pwd)
cd "$CURRENT_DIR"

echo "📦 Step 1: Adding GitHub remote..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/${GITHUB_USER}/${REPO_NAME}.git"
echo "✅ Remote added: github.com/${GITHUB_USER}/${REPO_NAME}"

echo ""
echo "📦 Step 2: Pushing code to GitHub..."
git push -u origin main

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Push failed. Common reasons:"
  echo "   - Repository doesn't exist yet (create it at github.com/new)"
  echo "   - Wrong username or token"
  echo "   - Token expired or missing 'repo' scope"
  echo ""
  echo "   Create the repo first: https://github.com/new"
  echo "   Name: ${REPO_NAME}, Private, No README"
  echo ""
  exit 1
fi

echo ""
echo "✅ ================================================ "
echo "   Code pushed to GitHub successfully!"
echo "   ================================================ "
echo ""
echo "🌐 Step 3: Deploy on Render (2 minutes)"
echo ""
echo "   1. Open: https://render.com"
echo "   2. Click 'Get Started' → Sign up with GitHub"
echo "   3. Click 'New +' → 'Web Service'"
echo "   4. Select your repo: ${GITHUB_USER}/${REPO_NAME}"
echo "   5. Fill in:"
echo "      Name:           chantrea-cv-app"
echo "      Runtime:        Node"
echo "      Build Command:  npm install"
echo "      Start Command:  npm start"
echo "      Instance Type:  Free"
echo "   6. Add Environment Variable:"
echo "      ADMIN_PASSWORD = Chantrea2024!Secure"
echo "   7. Click 'Create Web Service'"
echo ""
echo "   🎉 Your CV will be live at:"
echo "   https://chantrea-cv-app.onrender.com"
echo ""
echo "   🔧 Admin panel at:"
echo "   https://chantrea-cv-app.onrender.com/admin"
echo ""
echo "   🔑 Password: Chantrea2024!Secure"
echo "   (or whatever you set as ADMIN_PASSWORD)"
echo ""