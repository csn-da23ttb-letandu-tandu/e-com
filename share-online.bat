@echo off
chcp 65001 > nul
cd /d "%~dp0"
title Chia sẻ Web Thế Giới Công Nghệ ra Internet (Localtunnel)
echo ========================================================
echo   ĐANG TẠO ĐƯỜNG LINK ONLINE MIỄN PHÍ RA INTERNET
echo   Đường link: https://thegioicongnghe-shop.loca.lt
echo ========================================================
echo.

npx localtunnel --port 80 --subdomain thegioicongnghe-shop

echo.
pause
