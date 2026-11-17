@echo off
cd /d "%~dp0"
if not exist node_modules (
  echo Dependencies missing. Run install-windows.bat first.
  pause
  exit /b 1
)
call npm run dev
pause
