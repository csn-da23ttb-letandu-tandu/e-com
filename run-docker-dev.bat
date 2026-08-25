@echo off
chcp 65001 > nul
cd /d "%~dp0"
title Khởi chạy TanDu Web - Docker Development
echo ========================================================
echo   ĐANG KHỞI CHẠY WEB TANDU TRÊN DOCKER (DEVELOPMENT)
echo   Cổng truy cập: http://localhost:5173 (Live Reload)
echo ========================================================
echo.

docker compose up -d --build tandu-dev

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [LỖI] Không thể khởi chạy Docker. Vui lòng kiểm tra Docker Desktop đã mở chưa!
    echo.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ========================================================
echo   [THÀNH CÔNG] Web dev đang chạy tại: http://localhost:5173
echo ========================================================
echo.
pause
