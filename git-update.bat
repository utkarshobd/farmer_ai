@echo off
echo ========================================
echo  Update GitHub Repository
echo ========================================
echo.

set /p message="Enter commit message: "

echo.
echo [1/3] Adding changes...
git add .

echo [2/3] Committing changes...
git commit -m "%message%"

echo [3/3] Pushing to GitHub...
git push

echo.
echo ========================================
echo  Update Complete!
echo  Repository: https://github.com/utkarshobd/farmer_ai
echo ========================================
pause
