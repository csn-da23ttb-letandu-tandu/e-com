@echo off
chcp 65001 > nul
cd /d "%~dp0"
title Tắt Web TanDu trên Docker
echo ========================================================
echo   ĐANG TẮT TẤT CẢ CONTAINER DOCKER TANDU...
echo ========================================================
echo.

docker compose down
docker stop tandu_production_web tandu_dev_web 2>nul

echo.
echo ========================================================
echo   [ĐÃ TẮT THÀNH CÔNG] Trang web đã được tắt hoàn toàn!
echo ========================================================
echo.
pause
