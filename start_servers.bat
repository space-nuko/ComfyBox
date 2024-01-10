@echo off
setlocal enabledelayedexpansion

echo Starting run_nvidia_gpu.bat (please make sure it has the argument --enable-cors-header). 

REM Change to the backend directory
cd ".."

REM Start the backend server
start "" "run_nvidia_gpu.bat"

echo Waiting for the server to start...
echo Note: You may increase or decrease the timeout time by changing its value (Default: 10 seconds).
timeout /t 1 > NUL

timeout /t 10


REM Start the frontend server
cd "ComfyBox-ReOpened-Forked-"
start run.bat

REM Optional: Insert a delay here to allow some time for the frontend to start
REM timeout /t 5

start "" "http://localhost:8000/"

echo Both servers are running.
echo You may now close this window.

pause

