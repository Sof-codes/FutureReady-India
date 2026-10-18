@echo off
title FutureReady India - One-Click Launcher
echo ===================================================
echo   FutureReady India - AI, Skills & Employment
echo ===================================================
echo Starting Python FastAPI Backend on http://127.0.0.1:8000 ...
start "FutureReady Backend" cmd /k "cd /d %~dp0 && python -m uvicorn backend.main:app --port 8000"

timeout /t 3 >nul

echo Starting React Web App on http://localhost:3000 ...
start "FutureReady Web App" cmd /k "cd /d %~dp0frontend && npm run dev"

timeout /t 2 >nul

echo Opening FutureReady India in your default browser...
start http://localhost:3000

echo ===================================================
echo   FutureReady India is now running!
echo   Close the open window to stop the application.
echo ===================================================
