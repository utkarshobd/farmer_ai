# 🚀 Upload to GitHub

## Quick Upload (Windows)

### Option 1: One-Click Upload
Double-click: **`upload-to-github.bat`**

---

## Option 2: Manual Upload

Open Command Prompt in this folder and run:

```bash
git init
git add .
git commit -m "Initial commit: AI Based Farmer Advisory System"
git branch -M main
git remote add origin https://github.com/utkarshobd/farmer_ai.git
git push -u origin main
```

---

## If Repository Already Exists

If you get an error that the repository already has content:

```bash
git init
git add .
git commit -m "Initial commit: AI Based Farmer Advisory System"
git branch -M main
git remote add origin https://github.com/utkarshobd/farmer_ai.git
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## After Upload

Your repository will be available at:
**https://github.com/utkarshobd/farmer_ai**

---

## What Gets Uploaded

✅ Complete backend application
✅ Complete frontend application
✅ All documentation files
✅ Setup scripts
✅ Configuration files
✅ .gitignore (excludes node_modules, venv, etc.)

---

## First Time Git User?

### Install Git
Download from: https://git-scm.com/downloads

### Configure Git
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## Need GitHub Authentication?

When prompted for credentials:
- Username: Your GitHub username
- Password: Use Personal Access Token (not password)

### Create Personal Access Token:
1. Go to GitHub.com → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token
4. Select "repo" scope
5. Copy the token and use it as password

---

## Verify Upload

After upload, check:
1. Go to https://github.com/utkarshobd/farmer_ai
2. Verify all files are present
3. Check README.md displays correctly

---

## Update Repository Later

```bash
git add .
git commit -m "Your update message"
git push
```

---

**Ready to upload? Run `upload-to-github.bat`**
