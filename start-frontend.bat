@echo off
echo =========================================
echo  Farmer Advisory System - Frontend Setup
echo =========================================
echo.

cd frontend

if not exist "node_modules" (
    echo [1/2] Installing dependencies (this may take a few minutes)...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        echo Please make sure Node.js is installed
        pause
        exit /b 1
    )
) else (
    echo Dependencies already installed, skipping...
)

echo [2/2] Starting React development server...
echo.
echo =========================================
echo  Frontend is starting...
echo  Browser will open at http://localhost:3000
echo  Press Ctrl+C to stop the server
echo =========================================
echo.

call npm start
