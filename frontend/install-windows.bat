@echo off
cd /d "%~dp0"
echo Installing BLCK frontend dependencies...
call npm install
if errorlevel 1 (
  echo.
  echo Installation failed. Check your internet connection and Node.js installation.
  pause
  exit /b 1
)
echo.
echo Installation complete. Run start-windows.bat to launch.
pause
