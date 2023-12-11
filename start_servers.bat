@echo off
setlocal enabledelayedexpansion

REM Change to the backend directory
cd "..\ComfyUI"

REM Start the backend server
start /b cmd /c python main.py --enable-cors-header > ..\backend_log.txt

REM Wait for the backend server to be ready
:waitForBackend
timeout /t 1 > NUL
findstr /m "Starting server" "..\backend_log.txt"
if errorlevel 1 goto waitForBackend

REM Start the frontend server
cd "..\ComfyBox-ReOpened-Forked-"
start run.bat

REM Optional: Insert a delay here to allow some time for the frontend to start
REM timeout /t 10

REM Open the frontend in the default web browser
start "" "http://127.0.0.1:8000/"

echo Both servers are running.
pause
