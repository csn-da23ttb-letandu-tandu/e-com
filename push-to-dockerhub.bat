@echo off
chcp 65001 > nul
cd /d "%~dp0"
title Đẩy (Push) TanDu Web lên Docker Hub (tandu5205)
echo ========================================================
echo   ĐANG XÂY DỰNG VÀ TẢI (PUSH) WEB LÊN DOCKER HUB
echo   Tài khoản: tandu5205
echo   Repository: tandu5205/tandu-web:latest
echo ========================================================
echo.

echo [1/2] Đang build Docker Image cho tandu5205/tandu-web:latest...
docker build -t tandu5205/tandu-web:latest -t tandu5205/tandu-web:v1.0 .

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [LỖI] Build image thất bại. Vui lòng kiểm tra Docker Desktop đã bật chưa!
    echo.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/2] Đang tải Image lên Docker Hub (tandu5205/tandu-web)...
docker push tandu5205/tandu-web:latest
docker push tandu5205/tandu-web:v1.0

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [LỖI] Đẩy image thất bại! 
    echo Gợi ý: Mở terminal và gõ 'docker login' để đăng nhập tài khoản tandu5205 trước.
    echo.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ========================================================
echo   [THÀNH CÔNG RỰC RỠ!]
echo   Image đã được tải lên Docker Hub: tandu5205/tandu-web
echo   Bây giờ bạn có thể bấm làm mới (Refresh) tab 'My Hub' trên Docker Desktop!
echo ========================================================
echo.
pause
