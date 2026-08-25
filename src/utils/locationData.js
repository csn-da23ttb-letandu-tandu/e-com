// Danh sách đầy đủ 63 Tỉnh/Thành phố Việt Nam - Hỗ trợ giao hàng toàn quốc 63 tỉnh thành
export const VIETNAM_PROVINCES = [
  "TP Hồ Chí Minh",
  "Hà Nội",
  "Đà Nẵng",
  "Cần Thơ",
  "Hải Phòng",
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bạc Liêu",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Định",
  "Bình Dương",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cao Bằng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Tĩnh",
  "Hải Dương",
  "Hậu Giang",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái"
];

export const REGIONS_WITH_STORES = VIETNAM_PROVINCES.map(province => {
  if (province === 'TP Hồ Chí Minh') return { name: province, stores: '58 cửa hàng', popular: true };
  if (province === 'Hà Nội') return { name: province, stores: '45 cửa hàng', popular: true };
  if (province === 'Đà Nẵng') return { name: province, stores: '12 cửa hàng', popular: true };
  if (province === 'Cần Thơ') return { name: province, stores: '8 cửa hàng', popular: true };
  if (province === 'Hải Phòng') return { name: province, stores: '7 cửa hàng', popular: true };
  if (province === 'Bình Dương') return { name: province, stores: '10 cửa hàng', popular: true };
  if (province === 'Đồng Nai') return { name: province, stores: '8 cửa hàng', popular: true };
  if (province === 'Bà Rịa - Vũng Tàu') return { name: province, stores: '6 cửa hàng', popular: false };
  if (province === 'Khánh Hòa') return { name: province, stores: '5 cửa hàng', popular: false };
  if (province === 'Thừa Thiên Huế') return { name: province, stores: '4 cửa hàng', popular: false };
  if (province === 'Lâm Đồng') return { name: province, stores: '5 cửa hàng', popular: false };
  if (province === 'Kiên Giang') return { name: province, stores: '4 cửa hàng', popular: false };
  if (province === 'Quảng Ninh') return { name: province, stores: '5 cửa hàng', popular: false };
  if (province === 'Bắc Ninh') return { name: province, stores: '4 cửa hàng', popular: false };
  if (province === 'Thanh Hóa') return { name: province, stores: '3 cửa hàng', popular: false };
  return { name: province, stores: 'Giao tận nơi (2-3 ngày)', popular: false };
});
