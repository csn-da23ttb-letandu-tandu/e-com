# Thế Giới Công Nghệ (TGCN) - Web Application

Dự án Web e-commerce công nghệ React + Vite.

---

## 🐳 Hướng dẫn chạy ứng dụng bằng Docker

Dự án đã được tích hợp cấu hình **Docker** & **Docker Compose** hỗ trợ cả hai môi trường: **Production** và **Development**.

### 🛠 Các Yêu Cầu Cần Có
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) đã được cài đặt và đang hoạt động.

---

### 🚀 1. Chạy Môi Trường Production (Khuyên Dùng)
Ứng dụng sẽ được build tối ưu bằng Multi-stage build và phục vụ bởi server **Nginx** siêu nhanh tại cổng `http://localhost:80`.

- **Sử dụng script 1-Click (Windows):**
  Nhấp đúp chuột vào file `run-docker-prod.bat`
- **Sử dụng NPM command:**
  ```bash
  npm run docker:prod
  ```
- **Hoặc sử dụng Docker Compose trực tiếp:**
  ```bash
  docker compose up --build tandu-web
  ```

---

### 💻 2. Chạy Môi Trường Development (Hỗ trợ Live Reload / Hot-Reload)
Giúp lập trình viên phát triển ứng dụng trực tiếp trong Docker container, tự động cập nhật khi thay đổi code trên máy local tại cổng `http://localhost:5173`.

- **Sử dụng NPM command:**
  ```bash
  npm run docker:dev
  ```
- **Hoặc sử dụng Docker Compose trực tiếp:**
  ```bash
  docker compose up --build tandu-dev
  ```

---

### 🛑 3. Dừng và Dọn Dẹp Containers
Để dừng tất cả các container đang chạy:
```bash
npm run docker:down
# hoặc
docker compose down
```

---

## 🛠 Hướng dẫn chạy thông thường (Không dùng Docker)

```bash
# Cài đặt thư viện
npm install

# Chạy bản dev
npm run dev

# Build bản sản xuất
npm run build
```
