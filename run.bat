@echo off
title MatrixMastery AI - Linear Algebra Tutor
echo ============================================================
echo      MatrixMastery AI - University Linear Algebra Tutor
echo ============================================================
echo.
echo Launching standalone application...
echo Backend API + Frontend will open automatically in your browser.
echo URL: http://127.0.0.1:8000
echo.

cd /d "%~dp0"
if exist "dist\MatrixMastery\MatrixMastery.exe" (
    start "" "dist\MatrixMastery\MatrixMastery.exe"
) else (
    start "" ".venv\Scripts\python.exe" backend\app_server.py
)
