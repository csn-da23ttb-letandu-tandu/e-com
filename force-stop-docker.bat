@echo off
chcp 65001 > nul
cd /d "%~dp0"
title Cưỡng Ép Tắt Tất Cả Docker Containers
echo ========================================================
echo   ĐANG CƯỠNG ÉP DỪNG TẤT CẢ CONTAINER DOCKER...
echo ========================================================
echo.

echo [1/3] Dừng theo Docker Compose...
docker compose down --remove-orphans

echo.
echo [2/3] Cưỡng ép dừng các container đang chạy trên Cổng 80/5173...
for /f "tokens=*" %%i in ('docker ps -q') do docker stop %%i

echo.
echo [3/3] Xóa các container đã dừng...
for /f "tokens=*" %%i in ('docker ps -a -q') do docker rm -f %%i

echo.
echo ========================================================
echo   [THÀNH CÔNG] Tất cả các Docker Container đã được tắt sạch sẽ!
echo ========================================================
echo.
pause
