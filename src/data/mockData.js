// Initial Mock Data for TechZone / CellphoneS style Store & Admin System
// Contains 22 authentic tech products with high-resolution e-commerce images

export const INITIAL_PRODUCTS = [
  {
    id: 101,
    name: "OPPO Reno16 F 5G 256GB - AI Phone",
    category: "Smartphones",
    brand: "OPPO",
    price: 8490000,
    oldPrice: 10490000,
    stock: 25,
    salesCount: 189,
    status: "Còn hàng",
    rating: 4.9,
    reviewsCount: 156,
    badge: "Bộ Quà 10Tr",
    installment: "Trả góp 0%",
    colors: [
      { name: "Trắng Ngọc Trai", code: "#f8fafc", bg: "bg-[#f8fafc]" },
      { name: "Xanh Cyan", code: "#06b6d4", bg: "bg-[#06b6d4]" }
    ],
    capacities: ["256GB", "512GB"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-reno-12-f.png"
    ],
    specs: {
      "Màn hình": "6.7 inch, AMOLED 120Hz, FHD+",
      "Chipset": "Snapdragon 7 Gen 3 AI",
      "RAM / Bộ nhớ": "12GB / 256GB",
      "Camera": "Main 50MP OIS + 8MP Wide + 2MP Macro",
      "Pin & Sạc": "5000 mAh, Sạc nhanh 67W SUPERVOOC"
    },
    description: "OPPO Reno16 F 5G tích hợp công nghệ OPPO AI đột phá, thiết kế siêu mỏng nhẹ thời trang cùng bộ quà tặng ưu đãi trị giá 10 triệu đồng.",
    promotions: [
      "Bộ quà tặng trị giá 10 triệu đồng",
      "Gói bảo hành Premium Service+",
      "Thu cũ đổi mới trợ giá đến 5 Triệu"
    ]
  },
  {
    id: 1,
    name: "iPhone 16 Pro Max 512GB",
    category: "Smartphones",
    brand: "Apple",
    price: 34990000,
    oldPrice: 37990000,
    stock: 42,
    salesCount: 354,
    status: "Còn hàng",
    rating: 4.9,
    reviewsCount: 214,
    badge: "Giảm 8%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Titan Sa Mạc", code: "#d8c4b6", bg: "bg-[#d8c4b6]" },
      { name: "Titan Tự Nhiên", code: "#8a8682", bg: "bg-[#8a8682]" },
      { name: "Titan Trắng", code: "#e3e3df", bg: "bg-[#e3e3df]" },
      { name: "Titan Đen", code: "#363534", bg: "bg-[#363534]" }
    ],
    capacities: ["256GB", "512GB", "1TB"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
    ],
    specs: {
      "Màn hình": "6.9 inch, Super Retina XDR OLED, 120Hz ProMotion",
      "Chipset": "Apple A18 Pro 3nm thế hệ mới",
      "RAM / Bộ nhớ": "8GB / 512GB NVMe",
      "Camera": "Chính 48MP + Góc rộng 48MP + Tele 12MP (Zoom 5x)",
      "Pin & Sạc": "4.685 mAh, Sạc nhanh 30W, Sạc MagSafe 25W"
    },
    description: "iPhone 16 Pro Max mang đến bước đột phá về vật liệu với khung Titan cấp độ 5 siêu bền nhẹ. Thiết kế viền màn hình mỏng nhất từng có trên sản phẩm Apple, kết hợp hệ thống camera nâng cấp toàn diện cùng phím Camera Control hoàn toàn mới.",
    promotions: [
      "Thu cũ đổi mới: Trợ giá lên tới 2.000.000đ trực tiếp",
      "Tặng gói bảo hành VIP 12 tháng 1 đổi 1 chính hãng",
      "Giảm thêm 5% tối đa 500.000đ khi thanh toán qua VNPay QR / Momo"
    ]
  },
  {
    id: 102,
    name: "Điện thoại Meizu Mblu 22 Pro NFC 4GB 128GB",
    category: "Smartphones",
    brand: "Meizu",
    price: 2990000,
    oldPrice: 3990000,
    stock: 50,
    salesCount: 142,
    status: "Còn hàng",
    rating: 5,
    reviewsCount: 18,
    badge: "Giảm 25%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Xanh Ocean", code: "#1e3a8a", bg: "bg-[#1e3a8a]" },
      { name: "Đen Nhám", code: "#18181b", bg: "bg-[#18181b]" }
    ],
    capacities: ["128GB"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/e/meizu-20-pro.png"
    ],
    specs: {
      "Màn hình": "6.6 inch HD+ IPS LCD, 90Hz",
      "Chipset": "Unisoc T606 8 nhân",
      "RAM / Bộ nhớ": "4GB RAM / 128GB ROM",
      "Camera": "Chính 13MP + Cảm biến phụ AI",
      "Pin & Sạc": "5.000 mAh, Sạc 10W Type-C",
      "Tính năng": "NFC kết nối 1 chạm"
    },
    description: "Meizu Mblu 22 Pro là mẫu smartphone giá rẻ nổi bật với kết nối NFC 1 chạm tiện lợi, viên pin khủng 5.000 mAh cùng thiết kế cụm camera tròn độc đáo.",
    promotions: [
      "S-Student giảm thêm 149.500đ",
      "Chỉ thêm 100K nhận ngay dịch vụ Bảo hành Vip 12 tháng 1 đổi 1"
    ]
  },
  {
    id: 103,
    name: "Samsung Galaxy S25 Plus 256GB",
    category: "Smartphones",
    brand: "Samsung",
    price: 19990000,
    oldPrice: 26500000,
    stock: 35,
    salesCount: 215,
    status: "Còn hàng",
    rating: 5,
    reviewsCount: 34,
    badge: "Giảm 25%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Xám Bạc Titanium", code: "#94a3b8", bg: "bg-[#94a3b8]" },
      { name: "Đen Onyx", code: "#0f172a", bg: "bg-[#0f172a]" },
      { name: "Xanh Mint", code: "#a7f3d0", bg: "bg-[#a7f3d0]" }
    ],
    capacities: ["256GB", "512GB"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-s25-plus-xam.png"
    ],
    specs: {
      "Màn hình": "6.7 inch Dynamic AMOLED 2X QHD+, 120Hz Pro",
      "Chipset": "Exynos 2500 / Snapdragon 8 Elite",
      "RAM / Bộ nhớ": "12GB RAM / 256GB UFS 4.0",
      "Camera": "Chính 50MP OIS + Góc rộng 12MP + Tele 10MP (3x)",
      "Pin & Sạc": "4.900 mAh, Sạc siêu nhanh 45W",
      "Tính năng AI": "Galaxy AI thế hệ mới, Circle to Search"
    },
    description: "Samsung Galaxy S25 Plus hội tụ đỉnh cao công nghệ với màn hình lớn 6.7 inch tràn viền siêu mỏng, trợ lý quyền năng Galaxy AI và thời lượng pin vượt trội.",
    promotions: [
      "S-Student giảm thêm 500.000đ",
      "Trả góp 0% - 0đ phụ phí - 0đ trả trước - kỳ hạn đến 12 tháng"
    ]
  },
  {
    id: 104,
    name: "Samsung Galaxy S25 Ultra 512GB",
    category: "Smartphones",
    brand: "Samsung",
    price: 30590000,
    oldPrice: 39490000,
    stock: 28,
    salesCount: 380,
    status: "Còn hàng",
    rating: 4.9,
    reviewsCount: 68,
    badge: "Giảm 23%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Xám Titanium", code: "#64748b", bg: "bg-[#64748b]" },
      { name: "Đen Titanium", code: "#1e293b", bg: "bg-[#1e293b]" },
      { name: "Xanh Titanium", code: "#38bdf8", bg: "bg-[#38bdf8]" }
    ],
    capacities: ["256GB", "512GB", "1TB"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-s25-ultra-xam.png"
    ],
    specs: {
      "Màn hình": "6.8 inch Dynamic AMOLED 2X, Gorilla Armor chống lóa",
      "Chipset": "Snapdragon 8 Elite for Galaxy",
      "RAM / Bộ nhớ": "12GB RAM / 512GB UFS 4.0",
      "Camera": "Super Quad Camera 200MP + 50MP Periscope (5x)",
      "Pin & Sạc": "5.000 mAh, Sạc nhanh 45W, Bút S-Pen tích hợp"
    },
    description: "Siêu phẩm flagship Samsung Galaxy S25 Ultra sở hữu quyền năng Galaxy AI vượt trội, bút S-Pen huyền thoại, khung Titan bo cong nhẹ nâng tầm cầm nắm.",
    promotions: [
      "S-Student giảm thêm 500.000đ",
      "Trả góp 0% - 0đ phụ phí - 0đ trả trước - kỳ hạn đến 12 tháng"
    ]
  },
  {
    id: 105,
    name: "Xiaomi 17 Ultra 5G 16GB 512GB",
    category: "Smartphones",
    brand: "Xiaomi",
    price: 31190000,
    oldPrice: 39990000,
    stock: 20,
    salesCount: 110,
    status: "Còn hàng",
    rating: 5,
    reviewsCount: 29,
    badge: "Giảm 22%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Đen Leica", code: "#09090b", bg: "bg-[#09090b]" },
      { name: "Trắng Gốm", code: "#f8fafc", bg: "bg-[#f8fafc]" }
    ],
    capacities: ["512GB", "1TB"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-14-ultra.png"
    ],
    specs: {
      "Màn hình": "6.73 inch LTPO AMOLED 2K+, 120Hz, 3000 nits",
      "Chipset": "Snapdragon 8 Elite 3nm",
      "RAM / Bộ nhớ": "16GB LPDDR5X / 512GB UFS 4.0",
      "Camera": "Hệ thống 4 camera Leica 50MP 1-inch cảm biến lớn",
      "Pin & Sạc": "5.300 mAh, Sạc dây 90W, Sạc không dây 80W"
    },
    description: "Xiaomi 17 Ultra tái định nghĩa nhiếp ảnh di động với cụm ống kính hợp tác cùng Leica, cảm biến 1 inch khẩu độ mở thay đổi linh hoạt và chip Snapdragon 8 Elite siêu việt.",
    promotions: [
      "S-Student giảm thêm 300.000đ",
      "Trả góp 0% - 0đ phụ phí - 0đ trả trước - kỳ hạn đến 12 tháng"
    ]
  },
  {
    id: 106,
    name: "Xiaomi Redmi Note 14 Pro Plus 5G 8GB 256GB",
    category: "Smartphones",
    brand: "Xiaomi",
    price: 8490000,
    oldPrice: 10800000,
    stock: 40,
    salesCount: 260,
    status: "Còn hàng",
    rating: 5,
    reviewsCount: 45,
    badge: "Giảm 21%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Cát Vàng Premium", code: "#fef08a", bg: "bg-[#fef08a]" },
      { name: "Đen Obsidian", code: "#18181b", bg: "bg-[#18181b]" }
    ],
    capacities: ["256GB", "512GB"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/r/e/redmi-note-13-pro-plus.png"
    ],
    specs: {
      "Màn hình": "6.67 inch Curved AMOLED 1.5K, 120Hz, Gorilla Glass Victus 2",
      "Chipset": "Snapdragon 7s Gen 3 4nm",
      "RAM / Bộ nhớ": "8GB RAM / 256GB UFS 3.1",
      "Camera": "Chính 200MP OIS + Góc rộng 8MP + Tele 50MP",
      "Pin & Sạc": "6.200 mAh Silicon-Carbon, Sạc HyperCharge 90W"
    },
    description: "Xiaomi Redmi Note 14 Pro Plus bứt phá phân khúc tầm trung với camera 200MP, pin siêu trâu 6.200 mAh và chuẩn kháng nước bụi IP68/IP69K cao cấp.",
    promotions: [
      "S-Student giảm thêm 300.000đ",
      "Trả góp 0% - 0đ phụ phí - 0đ trả trước - kỳ hạn đến 12 tháng"
    ]
  },
  {
    id: 107,
    name: "OPPO Find N3 16GB 512GB",
    category: "Smartphones",
    brand: "OPPO",
    price: 26990000,
    oldPrice: 44990000,
    stock: 18,
    salesCount: 88,
    status: "Còn hàng",
    rating: 5,
    reviewsCount: 52,
    badge: "Giảm 40%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Vàng Kim", code: "#eab308", bg: "bg-[#eab308]" },
      { name: "Đen Da Tự Nhiên", code: "#27272a", bg: "bg-[#27272a]" }
    ],
    capacities: ["512GB"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-find-n3-vang.png"
    ],
    specs: {
      "Màn hình chính": "7.82 inch OLED 120Hz nếp gập tàng hình",
      "Màn hình phụ": "6.31 inch OLED 120Hz ngoài",
      "Chipset": "Snapdragon 8 Gen 2 4nm",
      "RAM / Bộ nhớ": "16GB LPDDR5X / 512GB ROM",
      "Camera": "Hasselblad 48MP + 64MP Periscope + 48MP Ultrawide"
    },
    description: "Vua gập flagship OPPO Find N3 ấn tượng với camera Hasselblad đẳng cấp, nếp gập vô hình, công nghệ viền siêu mỏng và khả năng làm việc đa nhiệm 3 cửa sổ màn hình.",
    promotions: [
      "S-Student giảm thêm 300.000đ",
      "Trả góp 0% - 0đ phụ phí - 0đ trả trước - kỳ hạn đến 12 tháng"
    ]
  },
  {
    id: 108,
    name: "Samsung Galaxy S25 Edge 5G 12GB 256GB",
    category: "Smartphones",
    brand: "Samsung",
    price: 18990000,
    oldPrice: 29450000,
    stock: 25,
    salesCount: 165,
    status: "Còn hàng",
    rating: 4.9,
    reviewsCount: 38,
    badge: "Giảm 36%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Trắng Băng", code: "#f1f5f9", bg: "bg-[#f1f5f9]" },
      { name: "Đen Huyền Bí", code: "#0f172a", bg: "bg-[#0f172a]" }
    ],
    capacities: ["256GB", "512GB"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-s25-plus-xam.png"
    ],
    specs: {
      "Màn hình": "6.7 inch Curved Edge Dynamic AMOLED 2X, 120Hz",
      "Chipset": "Snapdragon 8 Gen 3 for Galaxy",
      "RAM / Bộ nhớ": "12GB RAM / 256GB ROM",
      "Camera": "Chính 50MP Dual Pixel OIS + 12MP Super Wide",
      "Pin & Sạc": "4.700 mAh, Sạc siêu nhanh 45W"
    },
    description: "Samsung Galaxy S25 Edge quyến rũ với thiết kế màn hình cong tràn tràn viền 4 cạnh, kết hợp hiệu năng vượt trội và tính năng Galaxy AI thông minh.",
    promotions: [
      "S-Student giảm thêm 500.000đ",
      "Trả góp 0% - 0đ phụ phí - 0đ trả trước - kỳ hạn đến 12 tháng"
    ]
  },
  {
    id: 109,
    name: "Samsung Galaxy Z Fold 6 12GB 256GB",
    category: "Smartphones",
    brand: "Samsung",
    price: 29990000,
    oldPrice: 43990000,
    stock: 22,
    salesCount: 198,
    status: "Còn hàng",
    rating: 4.9,
    reviewsCount: 72,
    badge: "Giảm 32%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Xanh Navy", code: "#1e3a8a", bg: "bg-[#1e3a8a]" },
      { name: "Xám Metal", code: "#475569", bg: "bg-[#475569]" },
      { name: "Hồng Rosé", code: "#f472b6", bg: "bg-[#f472b6]" }
    ],
    capacities: ["256GB", "512GB", "1TB"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-fold-6-xanh.png"
    ],
    specs: {
      "Màn hình chính": "7.6 inch QXGA+ Dynamic AMOLED 2X, 120Hz",
      "Màn hình phụ": "6.3 inch HD+ AMOLED 120Hz",
      "Chipset": "Snapdragon 8 Gen 3 for Galaxy",
      "RAM / Bộ nhớ": "12GB / 256GB NVMe",
      "Bản lề": "FlexHinge thế hệ mới siêu bền 400.000 lần gập"
    },
    description: "Samsung Galaxy Z Fold 6 mỏng nhẹ đỉnh cao chỉ 239g, tích hợp Galaxy AI hỗ trợ vẽ phác thảo thành hình ảnh chuyên nghiệp và dịch cuộc gọi trực tiếp.",
    promotions: [
      "S-Student giảm thêm 500.000đ",
      "Trả góp 0% - 0đ phụ phí - 0đ trả trước - kỳ hạn đến 12 tháng"
    ]
  },
  {
    id: 110,
    name: "OPPO Reno12 5G 12GB 256GB",
    category: "Smartphones",
    brand: "OPPO",
    price: 8990000,
    oldPrice: 12990000,
    stock: 30,
    salesCount: 240,
    status: "Còn hàng",
    rating: 4.8,
    reviewsCount: 64,
    badge: "Giảm 31%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Tím Bạc Dải Ngân Hà", code: "#c084fc", bg: "bg-[#c084fc]" },
      { name: "Nâu Xám Đá", code: "#52525b", bg: "bg-[#52525b]" }
    ],
    capacities: ["256GB", "512GB"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-reno-12.png"
    ],
    specs: {
      "Màn hình": "6.7 inch Curved OLED FHD+, 120Hz, Kính cường lực Gorilla Glass 7i",
      "Chipset": "MediaTek Dimensity 7300-Energy 4nm",
      "RAM / Bộ nhớ": "12GB RAM / 256GB ROM",
      "Camera": "Chuyên gia chân dung AI 50MP Sony LYT-600 OIS",
      "Pin & Sạc": "5.000 mAh, Sạc siêu tốc SUPERVOOC 80W"
    },
    description: "OPPO Reno12 5G được mệnh danh Chuyên Gia Chân Dùng AI với tính năng tách nền 1 chạm AI Tách Nền, xóa vật thể thông minh AI Eraser 2.0 và khung viền hợp kim siêu chịu lực.",
    promotions: [
      "S-Student giảm thêm 300.000đ",
      "Trả góp 0% - 0đ phụ phí - 0đ trả trước - kỳ hạn đến 12 tháng"
    ]
  },
  {
    id: 111,
    name: "Nothing Phone 2A Plus 5G 12GB 256GB",
    category: "Smartphones",
    brand: "Nothing",
    price: 7990000,
    oldPrice: 11490000,
    stock: 25,
    salesCount: 150,
    status: "Còn hàng",
    rating: 4.9,
    reviewsCount: 41,
    badge: "Giảm 30%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Đen Nhám Glyph", code: "#18181b", bg: "bg-[#18181b]" },
      { name: "Xám Bạc Kim Loại", code: "#94a3b8", bg: "bg-[#94a3b8]" }
    ],
    capacities: ["256GB"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/o/nothing-phone-2a.png"
    ],
    specs: {
      "Màn hình": "6.7 inch Flexible AMOLED 120Hz, 1.07 tỷ màu",
      "Chipset": "MediaTek Dimensity 7350 Pro 4nm",
      "RAM / Bộ nhớ": "12GB RAM / 256GB ROM",
      "Camera": "Kép 50MP OIS + 50MP Ultrawide + Selfie 50MP",
      "Thiết kế": "Đèn LED Glyph Interface phát sáng độc đáo"
    },
    description: "Nothing Phone 2A Plus cuốn hút mọi ánh nhìn với mặt lưng trong suốt huyền bí, đèn LED Glyph phát sáng theo nhịp điệu nhạc và camera selfie sắc nét 50MP.",
    promotions: [
      "Trả góp 0% - 0đ phụ phí - 0đ trả trước - kỳ hạn đến 12 tháng"
    ]
  },
  {
    id: 2,
    name: "iPhone 16 Plus 128GB",
    category: "Smartphones",
    brand: "Apple",
    price: 25990000,
    oldPrice: 27990000,
    stock: 28,
    salesCount: 180,
    status: "Còn hàng",
    rating: 4.8,
    reviewsCount: 98,
    badge: "Giảm 7%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Hồng Ultramarine", code: "#e8b0bd", bg: "bg-[#e8b0bd]" },
      { name: "Xanh Lưu Ly", code: "#a2c4c9", bg: "bg-[#a2c4c9]" },
      { name: "Đen Tuyền", code: "#1c1d21", bg: "bg-[#1c1d21]" }
    ],
    capacities: ["128GB", "256GB", "512GB"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
    ],
    specs: {
      "Màn hình": "6.7 inch Super Retina XDR OLED, Dynamic Island",
      "Chipset": "Apple A18 Bionic 3nm",
      "RAM / Bộ nhớ": "8GB / 128GB",
      "Camera": "Chính 48MP Fusion + Góc siêu rộng 12MP",
      "Pin & Sạc": "4.000 mAh, Sạc nhanh 27W"
    },
    description: "iPhone 16 Plus nổi bật với màn hình cực đại 6.7 inch kết hợp viên pin thời lượng lâu nhất dòng iPhone. Thiết kế mặt lưng kính pha màu rực rỡ và phím Action Button đa năng.",
    promotions: ["Tặng ốp lưng MagSafe mỏng nhẹ trị giá 790.000đ"]
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra 512GB",
    category: "Smartphones",
    brand: "Samsung",
    price: 29990000,
    oldPrice: 33990000,
    stock: 35,
    salesCount: 290,
    status: "Còn hàng",
    rating: 4.8,
    reviewsCount: 186,
    badge: "Giảm 12%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Xám Titanium", code: "#787675", bg: "bg-[#787675]" },
      { name: "Đen Titanium", code: "#2b2b2b", bg: "bg-[#2b2b2b]" },
      { name: "Vàng Titanium", code: "#ded6be", bg: "bg-[#ded6be]" }
    ],
    capacities: ["256GB", "512GB", "1TB"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-s24-ultra.png"
    ],
    specs: {
      "Màn hình": "6.8 inch Dynamic AMOLED 2X, 120Hz, Gorilla Armor",
      "Chipset": "Snapdragon 8 Gen 3 for Galaxy",
      "Camera": "200MP + 50MP (Periscope 5x) + 12MP + 10MP",
      "Tính năng AI": "Galaxy AI: Khoanh vùng tìm kiếm, Dịch trực tiếp"
    },
    description: "Siêu phẩm Samsung Galaxy S24 Ultra trang bị quyền năng Galaxy AI tiên phong, bút S-Pen tích hợp và khung viền Titanium bền bỉ đẳng cấp.",
    promotions: ["Tặng kèm củ sạc nhanh 45W chính hãng Samsung"]
  },
  {
    id: 4,
    name: "Samsung Galaxy Z Fold6 512GB",
    category: "Smartphones",
    brand: "Samsung",
    price: 43990000,
    oldPrice: 47990000,
    stock: 12,
    salesCount: 76,
    status: "Còn hàng",
    rating: 4.7,
    reviewsCount: 42,
    badge: "Giảm 8%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Xám Metal", code: "#585a5e", bg: "bg-[#585a5e]" },
      { name: "Hồng Rosé", code: "#f5d3d7", bg: "bg-[#f5d3d7]" },
      { name: "Xanh Navy", code: "#1e293b", bg: "bg-[#1e293b]" }
    ],
    capacities: ["256GB", "512GB", "1TB"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-find-n3.png"
    ],
    specs: {
      "Màn hình chính": "7.6 inch QXGA+ Dynamic AMOLED 2X, 120Hz",
      "Màn hình phụ": "6.3 inch HD+ Dynamic AMOLED 2X",
      "Chipset": "Snapdragon 8 Gen 3 for Galaxy",
      "Trọng lượng": "239g siêu mỏng nhẹ"
    },
    description: "Điện thoại gập đỉnh cao Galaxy Z Fold6 với bản lề FlexHinge tàng hình nếp gập, thiết kế vuông vức mạnh mẽ hỗ trợ đa nhiệm 3 ứng dụng cùng lúc.",
    promotions: ["Tặng gói bảo hành Samsung Care+ 1 năm rơi vỡ vào nước"]
  },
  {
    id: 5,
    name: "Xiaomi 14 Ultra 512GB Leica",
    category: "Smartphones",
    brand: "Xiaomi",
    price: 27990000,
    oldPrice: 32990000,
    stock: 15,
    salesCount: 110,
    status: "Còn hàng",
    rating: 4.9,
    reviewsCount: 64,
    badge: "Giảm 15%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Đen Da Cừu", code: "#111111", bg: "bg-black" },
      { name: "Trắng Gốm", code: "#f8f9fa", bg: "bg-[#f8f9fa]" }
    ],
    capacities: ["512GB"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-14-ultra.png"
    ],
    specs: {
      "Màn hình": "6.73 inch LTPO AMOLED 2K+, 120Hz, 3000 nits",
      "Camera": "Bộ 4 camera 50MP cảm biến Sony LYT-900 1 inch Leica",
      "Chipset": "Snapdragon 8 Gen 3 (4nm)",
      "Pin & Sạc": "5.000 mAh, Sạc dây 90W, Sạc không dây 80W"
    },
    description: "Xiaomi 14 Ultra hợp tác cùng hãng ống kính huyền thoại Leica trang bị cụm 4 ống kính quang học cao cấp, khẩu độ thay đổi vô cấp f/1.63 - f/4.0.",
    promotions: ["Tặng Photography Kit Leica trị giá 4.990.000đ"]
  },
  {
    id: 6,
    name: "MacBook Pro 16 M3 Max 36GB",
    category: "Laptops",
    brand: "Apple",
    price: 88990000,
    oldPrice: 94990000,
    stock: 15,
    salesCount: 89,
    status: "Còn hàng",
    rating: 4.9,
    reviewsCount: 86,
    badge: "Giảm 6%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Space Black", code: "#2e3135", bg: "bg-[#2e3135]" },
      { name: "Silver", code: "#e2e4e6", bg: "bg-[#e2e4e6]" }
    ],
    capacities: ["512GB", "1TB", "2TB"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_pro_16_inch_m3.png"
    ],
    specs: {
      "Màn hình": "16.2 inch Liquid Retina XDR, 3024 x 1964, 120Hz",
      "Chipset": "Apple M3 Max (16-core CPU, 40-core GPU)",
      "RAM / Bộ nhớ": "36GB Unified Memory / 1TB SSD",
      "Thời lượng Pin": "Lên tới 22 giờ sử dụng liên tục",
      "Trọng lượng": "2.16 kg, Khung nhôm nguyên khối"
    },
    description: "MacBook Pro 16 inch M3 Max là đỉnh cao hiệu năng cho lập trình viên, nhà thiết kế đồ họa 3D và chuyên gia làm phim. Màu Space Black sang trọng chống bám vân tay vượt trội.",
    promotions: [
      "Tặng balo chống sốc cao cấp TechZone Premium",
      "Giảm 20% khi mua kèm Hub Chuyển Đổi & Chuột Magic Mouse"
    ]
  },
  {
    id: 7,
    name: "MacBook Air 15 M3 16GB RAM",
    category: "Laptops",
    brand: "Apple",
    price: 32990000,
    oldPrice: 35990000,
    stock: 25,
    salesCount: 210,
    status: "Còn hàng",
    rating: 4.8,
    reviewsCount: 142,
    badge: "Giảm 8%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Midnight", code: "#1e2530", bg: "bg-[#1e2530]" },
      { name: "Starlight", code: "#f0ece1", bg: "bg-[#f0ece1]" },
      { name: "Space Gray", code: "#7d7e80", bg: "bg-[#7d7e80]" }
    ],
    capacities: ["256GB SSD", "512GB SSD"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-air-15-inch-m3.png"
    ],
    specs: {
      "Màn hình": "15.3 inch Liquid Retina, 500 nits brightness",
      "Chipset": "Apple M3 8-core CPU, 10-core GPU",
      "RAM / Bộ nhớ": "16GB Unified RAM / 512GB SSD",
      "Thiết kế": "Mỏng 11.5 mm, nặng 1.51 kg không quạt tản nhiệt"
    },
    description: "MacBook Air 15 inch M3 vừa vặn hoàn hảo giữa màn hình rộng rãi và khả năng di động linh hoạt. Hiệu năng vượt trội gấp 1.6 lần chip M1.",
    promotions: ["Tặng dán màn hình cao cấp JCPAL HD chống xước"]
  },
  {
    id: 8,
    name: "Asus ROG Zephyrus G16 OLED",
    category: "Laptops",
    brand: "Asus",
    price: 62500000,
    oldPrice: 66990000,
    stock: 8,
    salesCount: 45,
    status: "Còn hàng",
    rating: 4.9,
    reviewsCount: 32,
    badge: "Giảm 7%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Eclipse Gray", code: "#3a3c3e", bg: "bg-[#3a3c3e]" },
      { name: "Platinum White", code: "#f2f4f7", bg: "bg-[#f2f4f7]" }
    ],
    capacities: ["1TB SSD", "2TB SSD"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/s/asus-rog-zephyrus-g16.png"
    ],
    specs: {
      "Màn hình": "16 inch ROG Nebula OLED 2.5K, 240Hz, 0.2ms",
      "CPU": "Intel Core Ultra 9 185H (AI PC)",
      "VGA": "NVIDIA GeForce RTX 4080 12GB GDDR6",
      "RAM / SSD": "32GB LPDDR5X / 1TB PCIe 4.0 SSD"
    },
    description: "Laptop Gaming mỏng nhẹ cao cấp nhất của Asus với màn hình ROG Nebula OLED 240Hz, dải đèn Slash Lighting mặt A cực chất cùng vi xử lý AI mạnh mẽ.",
    promotions: ["Tặng chuột gaming ROG Strix Impact III & Balo ROG"]
  },
  {
    id: 9,
    name: "Dell XPS 16 9640 Core Ultra 9",
    category: "Laptops",
    brand: "Dell",
    price: 74990000,
    oldPrice: 79990000,
    stock: 6,
    salesCount: 28,
    status: "Còn hàng",
    rating: 4.8,
    reviewsCount: 19,
    badge: "Giảm 6%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Graphite", code: "#2c2d30", bg: "bg-[#2c2d30]" },
      { name: "Platinum", code: "#e5e7eb", bg: "bg-[#e5e7eb]" }
    ],
    capacities: ["1TB SSD"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/e/dell-xps-16.png"
    ],
    specs: {
      "Màn hình": "16.3 inch OLED 4K+ Touchscreen, 120Hz",
      "CPU": "Intel Core Ultra 9 185H (16-cores, 22-threads)",
      "VGA": "NVIDIA GeForce RTX 4070 8GB GDDR6",
      "RAM / SSD": "32GB LPDDR5X / 1TB NVMe"
    },
    description: "Dell XPS 16 đại diện cho ngôn ngữ thiết kế tương lai với hàng phím cảm ứng Function Touch, touchpad tàng hình dưới mặt kính Gorillaglass mượt mà.",
    promotions: ["Tặng bao da Dell Premier Executive chính hãng"]
  },
  {
    id: 10,
    name: "iPad Pro 13 inch M4 256GB",
    category: "Tablets",
    brand: "Apple",
    price: 37990000,
    oldPrice: 39990000,
    stock: 18,
    salesCount: 165,
    status: "Còn hàng",
    rating: 4.9,
    reviewsCount: 88,
    badge: "Giảm 5%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Space Black", code: "#2e3135", bg: "bg-[#2e3135]" },
      { name: "Silver", code: "#e2e4e6", bg: "bg-[#e2e4e6]" }
    ],
    capacities: ["256GB", "512GB", "1TB"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-pro-13-2024.png"
    ],
    specs: {
      "Màn hình": "13 inch Ultra Retina XDR Tandem OLED, 120Hz",
      "Chipset": "Apple M4 3nm thế hệ thứ 2",
      "Độ mỏng": "5.1 mm - Sản phẩm mỏng nhất lịch sử Apple",
      "Trọng lượng": "579 gram"
    },
    description: "iPad Pro M4 đột phá công nghệ màn hình Tandem OLED hai lớp sáng vượt trội 1600 nits đỉnh điểm, sức mạnh chip M4 cho phép render đồ họa 3D tức thì.",
    promotions: ["Giảm 1 Triệu khi mua kèm bút Apple Pencil Pro"]
  },
  {
    id: 11,
    name: "Samsung Galaxy Tab S9 Ultra 512GB",
    category: "Tablets",
    brand: "Samsung",
    price: 26990000,
    oldPrice: 29990000,
    stock: 14,
    salesCount: 120,
    status: "Còn hàng",
    rating: 4.8,
    reviewsCount: 75,
    badge: "Giảm 10%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Kem Beige", code: "#eae3d2", bg: "bg-[#eae3d2]" },
      { name: "Xám Graphite", code: "#3a3b3e", bg: "bg-[#3a3b3e]" }
    ],
    capacities: ["256GB", "512GB"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-tab-s9-ultra.png"
    ],
    specs: {
      "Màn hình": "14.6 inch Dynamic AMOLED 2X, 120Hz, HDR10+",
      "Chipset": "Snapdragon 8 Gen 2 for Galaxy",
      "Bút kèm theo": "Bút S-Pen kháng nước bụi chuẩn IP68",
      "Pin": "11.200 mAh, Sạc nhanh 45W"
    },
    description: "Máy tính bảng màn hình khổng lồ 14.6 inch thay thế hoàn hảo laptop làm việc. Kháng nước kháng bụi toàn diện IP68 từ thân máy đến bút S-Pen.",
    promotions: ["Tặng bao da bàn phím Smart Keyboard Book Cover"]
  },
  {
    id: 12,
    name: "Sony WH-1000XM5 Wireless Headphones",
    category: "Audio",
    brand: "Sony",
    price: 8490000,
    oldPrice: 9990000,
    stock: 30,
    salesCount: 420,
    status: "Còn hàng",
    rating: 4.8,
    reviewsCount: 195,
    badge: "Giảm 15%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Đen", code: "#1a1a1a", bg: "bg-black" },
      { name: "Bạc Kem", code: "#e8e6df", bg: "bg-[#e8e6df]" },
      { name: "Xanh Midnight", code: "#1c2536", bg: "bg-[#1c2536]" }
    ],
    capacities: ["Standard"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/o/sony-wh-1000xm5.png"
    ],
    specs: {
      "Chống ồn": "Hi-Res Audio Noise Cancelling V1 & QN1 Dual Chip",
      "Thời lượng Pin": "30 giờ bật ANC, Sạc nhanh 3 phút dùng 3 giờ",
      "Kết nối": "Bluetooth 5.2, LDAC, Multi-point connection",
      "Trọng lượng": "250g"
    },
    description: "Tai nghe chụp tai Sony WH-1000XM5 sở hữu công nghệ chống ồn chủ động dẫn đầu thị trường cùng màng loa 30mm thế hệ mới tái tạo chất âm chân thực và chi tiết tuyệt đối.",
    promotions: [
      "Tặng bao da bảo vệ tai nghe cao cấp",
      "Giảm thêm 300.000đ khi đăng ký thành viên Smember"
    ]
  },
  {
    id: 13,
    name: "AirPods Pro Gen 2 Type-C",
    category: "Audio",
    brand: "Apple",
    price: 5490000,
    oldPrice: 6190000,
    stock: 50,
    salesCount: 680,
    status: "Còn hàng",
    rating: 4.9,
    reviewsCount: 310,
    badge: "Giảm 11%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Trắng Bóng", code: "#ffffff", bg: "bg-white" }
    ],
    capacities: ["MagSafe Type-C"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/i/airpods-pro-2-usb-c.png"
    ],
    specs: {
      "Chipset": "Apple H2 Headphone Chip",
      "Tính năng": "Chống ồn ANC gấp 2 lần, Chế độ Xuyên âm Adaptive Audio",
      "Cổng sạc": "USB-C, MagSafe, Apple Watch Charger",
      "Kháng nước": "IP54 chống bụi & mồ hôi"
    },
    description: "Tai nghe True Wireless AirPods Pro 2 trang bị cổng sạc USB-C đồng bộ thiết bị Apple, chip H2 lọc tiếng ồn vượt trội và âm thanh vòm Spatial Audio.",
    promotions: ["Tặng bao da Silicon Elago có móc treo tiện lợi"]
  },
  {
    id: 14,
    name: "Marshall Stanmore III Bluetooth Speaker",
    category: "Audio",
    brand: "Marshall",
    price: 9490000,
    oldPrice: 10490000,
    stock: 16,
    salesCount: 185,
    status: "Còn hàng",
    rating: 4.9,
    reviewsCount: 92,
    badge: "Giảm 9%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Black Gold", code: "#111111", bg: "bg-black" },
      { name: "Vintage Cream", code: "#f5f2eb", bg: "bg-[#f5f2eb]" }
    ],
    capacities: ["Standard"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/marshall-stanmore-iii.png"
    ],
    specs: {
      "Công suất": "80W RMS (Amplifier Class D)",
      "Kết nối": "Bluetooth 5.2, AUX 3.5mm, RCA",
      "Dải tần": "45 - 20,000 Hz",
      "Kích thước": "350 x 203 x 188 mm"
    },
    description: "Loa Bluetooth để bàn Marshall Stanmore III thiết kế phong cách Rock 'n' Roll cổ điển âm trường rộng mở đỉnh cao, núm xoay tinh chỉnh Bass/Treble kim loại tinh xảo.",
    promotions: ["Tặng dây cáp âm thanh AUX mạ vàng 24K"]
  },
  {
    id: 15,
    name: "Apple Watch Series 9 GPS 45mm",
    category: "Accessories",
    brand: "Apple",
    price: 9990000,
    oldPrice: 11490000,
    stock: 25,
    salesCount: 240,
    status: "Còn hàng",
    rating: 4.8,
    reviewsCount: 115,
    badge: "Giảm 13%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Midnight", code: "#1c232e", bg: "bg-[#1c232e]" },
      { name: "Starlight", code: "#f0ece1", bg: "bg-[#f0ece1]" },
      { name: "Pink", code: "#f5d0cd", bg: "bg-[#f5d0cd]" }
    ],
    capacities: ["41mm", "45mm"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-watch-series-9.png"
    ],
    specs: {
      "Màn hình": "Retina Always-On OLED, 2000 nits siêu sáng",
      "Chipset": "S9 SiP lõi kép, thao tác Double Tap thông minh",
      "Tính năng sức khỏe": "Đo nhịp tim, ECG, SpO2, Theo dõi giấc ngủ",
      "Chống nước": "WR50 (50 mét)"
    },
    description: "Apple Watch Series 9 mang đến khả năng tương tác không cần chạm màn hình nhờ thao tác Double Tap chạm hai ngón tay độc đáo, tích hợp màn hình sáng gấp đôi thế hệ cũ.",
    promotions: ["Tặng thêm 1 dây đeo thể thao Silicon màu tùy chọn"]
  },
  {
    id: 16,
    name: "Apple Watch Ultra 2 GPS + Cellular 49mm",
    category: "Accessories",
    brand: "Apple",
    price: 20990000,
    oldPrice: 22990000,
    stock: 10,
    salesCount: 95,
    status: "Còn hàng",
    rating: 4.9,
    reviewsCount: 68,
    badge: "Giảm 9%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Titanium Tự Nhiên", code: "#949494", bg: "bg-[#949494]" }
    ],
    capacities: ["49mm Loop"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-watch-ultra-2.png"
    ],
    specs: {
      "Vỏ đồng hồ": "Titanium cấp độ 5 49mm, Mặt kính Sapphire",
      "Màn hình": "3000 nits - Sáng nhất dòng Apple Watch",
      "Thời lượng Pin": "Lên tới 36 giờ (72 giờ ở chế độ tiết kiệm)",
      "Định vị": "GPS tần số kép chính xác tuyệt đối"
    },
    description: "Đồng hồ thông minh thể thao chuyên nghiệp Apple Watch Ultra 2 thiết kế chống sốc chịu áp suất lặn biển 100m, còi báo động khẩn cấp 86 decibel.",
    promotions: ["Tặng dây Alpine Loop / Trail Loop thể thao cao cấp"]
  },
  {
    id: 17,
    name: "Samsung Galaxy Watch6 Classic 47mm",
    category: "Accessories",
    brand: "Samsung",
    price: 7990000,
    oldPrice: 8990000,
    stock: 20,
    salesCount: 140,
    status: "Còn hàng",
    rating: 4.7,
    reviewsCount: 82,
    badge: "Giảm 11%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Đen Thép", code: "#1f2022", bg: "bg-[#1f2022]" },
      { name: "Bạc Thép", code: "#dcdfe3", bg: "bg-[#dcdfe3]" }
    ],
    capacities: ["43mm", "47mm"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-watch-6-classic.png"
    ],
    specs: {
      "Màn hình": "1.5 inch Super AMOLED Sapphire Crystal",
      "Vòng xoay": "Vòng xoay vật lý Bezel truyền thống sang trọng",
      "Sức khỏe": "Phân tích thành phần cơ thể BIA, Cảnh báo té ngã"
    },
    description: "Galaxy Watch6 Classic mang trở lại vòng xoay vật lý trơn mượt hoài cổ, màn hình hiển thị lớn hơn 20% giúp theo dõi chỉ số sức khỏe & giấc ngủ cực kì chuẩn xác.",
    promotions: ["Tặng củ sạc không dây chính hãng Samsung 15W"]
  },
  {
    id: 18,
    name: "Sạc Anker Prime 100W GaN 3 Cổng",
    category: "Accessories",
    brand: "Anker",
    price: 1590000,
    oldPrice: 1990000,
    stock: 60,
    salesCount: 520,
    status: "Còn hàng",
    rating: 4.9,
    reviewsCount: 230,
    badge: "Giảm 20%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Xám Đen Metal", code: "#28292c", bg: "bg-[#28292c]" }
    ],
    capacities: ["100W GaN"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/u/cu-sac-anker-prime-100w.png"
    ],
    specs: {
      "Công suất": "100W Max Fast Charge",
      "Cổng sạc": "2x USB-C PowerIQ 4.0 + 1x USB-A",
      "Công nghệ": "GaNPrime kiểm soát nhiệt độ ActiveShield 2.0"
    },
    description: "Củ sạc siêu nhỏ gọn Anker Prime 100W cho phép sạc cùng lúc MacBook Pro, iPhone 16 Pro và tai nghe AirPods với tốc độ nhanh nhất thị trường.",
    promotions: ["Tặng cáp sạc Anker Braid C-to-C 100W dài 0.9m"]
  },
  {
    id: 19,
    name: "Chuột Logitech MX Master 3S Wireless",
    category: "Accessories",
    brand: "Logitech",
    price: 2490000,
    oldPrice: 2990000,
    stock: 45,
    salesCount: 410,
    status: "Còn hàng",
    rating: 4.9,
    reviewsCount: 198,
    badge: "Giảm 17%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Graphite", code: "#2a2b2e", bg: "bg-[#2a2b2e]" },
      { name: "Pale Gray", code: "#e0e2e5", bg: "bg-[#e0e2e5]" }
    ],
    capacities: ["Standard"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/h/chuot-khong-day-logitech-mx-master-3s.png"
    ],
    specs: {
      "Cảm biến": "Darkfield 8.000 DPI dùng trên kính",
      "Nút cuộn": "MagSpeed cuộn 1.000 dòng/giây siêu êm",
      "Kết nối": "Bluetooth & Logi Bolt Receiver, cuộn ngang Thumbwheel"
    },
    description: "Chuột văn phòng tốt nhất thế giới Logitech MX Master 3S với click Quiet Clicks giảm 90% tiếng ồn, cuộn từ tính MagSpeed chính xác từng pixel.",
    promotions: ["Tặng thảm lót chuột da PU chống nước TechZone"]
  },
  {
    id: 20,
    name: "Bàn Phím Cơ Keychron Q1 Pro Wireless",
    category: "Accessories",
    brand: "Keychron",
    price: 4590000,
    oldPrice: 4990000,
    stock: 22,
    salesCount: 175,
    status: "Còn hàng",
    rating: 4.8,
    reviewsCount: 89,
    badge: "Giảm 8%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Carbon Black", code: "#1a1a1b", bg: "bg-black" },
      { name: "Shell White", code: "#f0f2f5", bg: "bg-[#f0f2f5]" }
    ],
    capacities: ["Red Switch", "Brown Switch", "Banana Switch"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/b/a/ban-phim-co-keychron-q1-pro.png"
    ],
    specs: {
      "Khung": "Nhôm nguyên khối CNC Double-Gasket Design",
      "Kết nối": "Bluetooth 5.1 & Dây Type-C 1000Hz polling rate",
      "Hot-swappable": "Thay switch nhanh không cần hàn"
    },
    description: "Bàn phím cơ không dây cao cấp Keychron Q1 Pro vỏ nhôm đúc đầm tay, tương thích 100% MacOS & Windows với núm xoay Knob tùy chỉnh âm lượng.",
    promotions: ["Tặng kê tay gỗ Óc Chó (Walnut Wood) thủ công"]
  },
  {
    id: 21,
    name: "Google Pixel 9 Pro XL 256GB",
    category: "Smartphones",
    brand: "Google",
    price: 28990000,
    oldPrice: 31990000,
    stock: 14,
    salesCount: 85,
    status: "Còn hàng",
    rating: 4.8,
    reviewsCount: 48,
    badge: "Giảm 9%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Obsidian Black", code: "#18191c", bg: "bg-[#18191c]" },
      { name: "Porcelain White", code: "#f2f3f5", bg: "bg-[#f2f3f5]" }
    ],
    capacities: ["128GB", "256GB", "512GB"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/o/google-pixel-8-pro.png"
    ],
    specs: {
      "Màn hình": "6.8 inch Super Actua OLED, 120Hz, 3000 nits",
      "Chipset": "Google Tensor G4 4nm với 16GB RAM AI",
      "Camera": "50MP + 48MP Periscope 5x + 48MP Ultrawide",
      "Tính năng Gemini": "Gemini Live AI trợ lý thế hệ mới"
    },
    description: "Flagship Google Pixel 9 Pro XL sở hữu trí tuệ nhân tạo Gemini tích hợp sâu vào hệ điều hành Android thuần khiết, camera chụp đêm ấn tượng bậc nhất.",
    promotions: ["Tặng củ sạc Google 45W Type-C chính hãng"]
  },
  {
    id: 22,
    name: "Lenovo ThinkPad X1 Carbon Gen 12",
    category: "Laptops",
    brand: "Lenovo",
    price: 54990000,
    oldPrice: 59990000,
    stock: 9,
    salesCount: 62,
    status: "Còn hàng",
    rating: 4.9,
    reviewsCount: 39,
    badge: "Giảm 8%",
    installment: "Trả góp 0%",
    colors: [
      { name: "Deep Black Carbon", code: "#1a1b1d", bg: "bg-[#1a1b1d]" }
    ],
    capacities: ["512GB SSD", "1TB SSD"],
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/h/thinkpad-x1-carbon-gen-11.png"
    ],
    specs: {
      "Màn hình": "14 inch OLED 2.8K, 120Hz, 100% DCI-P3",
      "CPU": "Intel Core Ultra 7 155H (16 cores, AI NPU)",
      "RAM / SSD": "32GB LPDDR5X / 1TB NVMe Gen 4",
      "Độ bền": "Chuẩn quân đội MIL-STD 810H, nặng 1.09kg"
    },
    description: "Biểu tượng laptop doanh nhân Lenovo ThinkPad X1 Carbon Gen 12 sợi carbon siêu bền nhẹ, bàn phím gõ êm nhất thế giới và núm đỏ TrackPoint trứ danh.",
    promotions: ["Tặng cặp đựng chống sốc ThinkPad Executive Sleeve"]
  }
];

export const INITIAL_ORDERS = [
  {
    id: "HD-98321",
    customer: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0987***654",
    time: "10 phút trước",
    total: 34990000,
    status: "Đang xử lý",
    items: [
      { name: "iPhone 16 Pro Max 512GB (Titan Sa Mạc)", quantity: 1, price: 34990000 }
    ]
  },
  {
    id: "HD-98320",
    customer: "Trần Thị Bích",
    email: "bich.tran@gmail.com",
    phone: "0912***345",
    time: "34 phút trước",
    total: 5490000,
    status: "Đang giao",
    items: [
      { name: "AirPods Pro 2 Type-C", quantity: 1, price: 5490000 }
    ]
  },
  {
    id: "HD-98319",
    customer: "Lê Hoàng Nam",
    email: "namlh.dev@gmail.com",
    phone: "0977***888",
    time: "1 giờ trước",
    total: 15480000,
    status: "Đã giao",
    items: [
      { name: "Apple Watch Series 9 GPS 45mm", quantity: 1, price: 9990000 },
      { name: "AirPods Pro Gen 2 Type-C", quantity: 1, price: 5490000 }
    ]
  },
  {
    id: "HD-98318",
    customer: "Phạm Minh Tuấn",
    email: "tuan.pham@hotmail.com",
    phone: "0933***112",
    time: "2 giờ trước",
    total: 62500000,
    status: "Hoàn thành",
    items: [
      { name: "Asus ROG Zephyrus G16 OLED", quantity: 1, price: 62500000 }
    ]
  },
  {
    id: "HD-98317",
    customer: "Vũ Thảo Vân",
    email: "vanvt@yahoo.com",
    phone: "0905***999",
    time: "3 giờ trước",
    total: 8490000,
    status: "Đã hủy",
    items: [
      { name: "Sony WH-1000XM5 Wireless", quantity: 1, price: 8490000 }
    ]
  }
];

export const MOCK_USER_PROFILE = {
  name: "Nguyễn Văn A",
  phone: "0987777554",
  email: "nguyenvana@gmail.com",
  dob: "15/08/1995",
  gender: "Nam",
  memberTier: "S-ELITE",
  memberSub: "Thành viên từ 2022",
  points: 12,
  totalSpent: "4.2M",
  vouchers: 1250,
  rankDiscount: "08%"
};

export const REVENUE_MONTHLY_DATA = [
  { month: "Tháng 1", revenue: 1650 },
  { month: "Tháng 2", revenue: 1820 },
  { month: "Tháng 3", revenue: 1750 },
  { month: "Tháng 4", revenue: 2100 },
  { month: "Tháng 5", revenue: 2050 },
  { month: "Tháng 6", revenue: 2300 },
  { month: "Tháng 7", revenue: 2450 }
];
