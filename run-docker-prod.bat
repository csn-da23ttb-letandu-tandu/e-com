@echo off
chcp 65001 > nul
cd /d "%~dp0"
title Bật Web TanDu trên Docker
echo ========================================================
echo   ĐANG KHỞI CHẠY WEB TANDU TRÊN DOCKER (PORT 80)...
echo ========================================================
echo.

docker compose up -d --build tandu-web

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [LỖI] Không thể bật Docker. Vui lòng mở phần mềm Docker Desktop trước!
    echo.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ========================================================
echo   [THÀNH CÔNG] Web đã bật! Đang mở trình duyệt...
echo ========================================================
echo.

timeout /t 2 > nul
start http://localhost

pause
