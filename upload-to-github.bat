@echo off
echo ========================================
echo  Uploading to GitHub
echo ========================================
echo.

echo [1/6] Initializing Git repository...
git init

echo [2/6] Adding all files...
git add .

echo [3/6] Creating initial commit...
git commit -m "Initial commit: AI Based Farmer Advisory System - Complete implementation with all SRS requirements"

echo [4/6] Adding remote repository...
git remote add origin https://github.com/utkarshobd/farmer_ai.git

echo [5/6] Setting branch to main...
git branch -M main

echo [6/6] Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo  Upload Complete!
echo  Repository: https://github.com/utkarshobd/farmer_ai.git
echo ========================================
pause
