@echo off
echo ========================================
echo  Farmer Advisory System - Backend Setup
echo ========================================
echo.

cd backend

echo [1/4] Creating virtual environment...
python -m venv venv
if errorlevel 1 (
    echo ERROR: Failed to create virtual environment
    echo Please make sure Python is installed
    pause
    exit /b 1
)

echo [2/4] Activating virtual environment...
call venv\Scripts\activate.bat

echo [3/4] Installing dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo [4/4] Starting Flask server...
echo.
echo ========================================
echo  Backend is starting...
echo  Server will run on http://localhost:5000
echo  Press Ctrl+C to stop the server
echo ========================================
echo.

python app.py
