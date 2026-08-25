@echo off
chcp 65001 > nul
cd /d "%~dp0"
title Chia sẻ Web ra Internet (Localtunnel)
echo ========================================================
echo   ĐANG TẠO ĐƯỜNG LINK ONLINE MIỄN PHÍ RA INTERNET
echo   LƯU Ý: KHÔNG ĐÓNG CỬA SỔ NÀY KHI ĐANG CHIA SẺ!
echo   (Nếu đóng cửa sổ này, trang sẽ bị lỗi 503 Tunnel Unavailable)
echo ========================================================
echo.
echo Khởi động Localtunnel cho Cổng 5173 (Vite Dev Server)...
npx localtunnel --port 5173

echo.
pause
