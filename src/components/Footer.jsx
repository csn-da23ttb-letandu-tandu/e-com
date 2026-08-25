import React from 'react';
import { PhoneCall, ShieldCheck, RefreshCw, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 text-xs mt-12">
      {/* Key Advantages Bar */}
      <div className="bg-gray-50 border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
            <div className="p-2 bg-red-50 text-[#d70018] rounded-full">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Bảo Hành Chính Hãng</div>
              <div className="text-gray-500 text-[11px]">100% Sản phẩm Apple & Tech</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
            <div className="p-2 bg-red-50 text-[#d70018] rounded-full">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-gray-900">1 Đổi 1 Trong 30 Ngày</div>
              <div className="text-gray-500 text-[11px]">Lỗi nhà sản xuất yên tâm dùng</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
            <div className="p-2 bg-red-50 text-[#d70018] rounded-full">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Trả Góp 0% Lãi Suất</div>
              <div className="text-gray-500 text-[11px]">Thủ tục nhanh chóng 5 phút</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
            <div className="p-2 bg-red-50 text-[#d70018] rounded-full">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Tổng Đài Miễn Phí</div>
              <div className="text-gray-500 text-[11px]">1800.2097 (8h00 - 21h30)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Hotline */}
        <div>
          <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase">Tổng đài hỗ trợ miễn phí</h4>
          <ul className="space-y-2 text-gray-600">
            <li>Gọi mua hàng: <strong className="text-[#d70018]">1800.2097</strong> (7h30 - 22h00)</li>
            <li>Khiếu nại: <strong className="text-gray-900">1800.2063</strong> (8h00 - 21h30)</li>
            <li>Bảo hành: <strong className="text-gray-900">1800.2064</strong> (8h00 - 21h00)</li>
          </ul>

          <div className="mt-6">
            <h5 className="font-bold text-gray-900 mb-2">Phương thức thanh toán</h5>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-100 border border-gray-200 rounded font-semibold text-[10px]">VNPay QR</span>
              <span className="px-2 py-1 bg-gray-100 border border-gray-200 rounded font-semibold text-[10px]">Momo</span>
              <span className="px-2 py-1 bg-gray-100 border border-gray-200 rounded font-semibold text-[10px]">Visa / Master</span>
              <span className="px-2 py-1 bg-gray-100 border border-gray-200 rounded font-semibold text-[10px]">ZaloPay</span>
            </div>
          </div>
        </div>

        {/* Column 2: Information */}
        <div>
          <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase">Thông tin & Chính sách</h4>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-[#d70018] cursor-pointer">Mua hàng và thanh toán Online</li>
            <li className="hover:text-[#d70018] cursor-pointer">Mua hàng trả góp Online</li>
            <li className="hover:text-[#d70018] cursor-pointer">Tra cứu thông tin bảo hành</li>
            <li className="hover:text-[#d70018] cursor-pointer">Tra cứu hóa đơn điện tử</li>
            <li className="hover:text-[#d70018] cursor-pointer">Trung tâm bảo hành chính hãng</li>
            <li className="hover:text-[#d70018] cursor-pointer">Quy định về việc lưu trữ dữ liệu</li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase">Dịch vụ & Tiện ích</h4>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-[#d70018] cursor-pointer">Dịch vụ vệ sinh laptop / điện thoại</li>
            <li className="hover:text-[#d70018] cursor-pointer">Khách hàng doanh nghiệp (B2B)</li>
            <li className="hover:text-[#d70018] cursor-pointer">Chương trình Smember độc quyền</li>
            <li className="hover:text-[#d70018] cursor-pointer">Tuyển dụng vị trí mới nhất</li>
          </ul>
        </div>

        {/* Column 4: Brand */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 via-[#d70018] to-red-800 p-1.5 flex items-center justify-center shadow-md shadow-red-600/30 border border-white/20">
              <svg className="w-4 h-4 text-white fill-current drop-shadow" viewBox="0 0 24 24">
                <path d="M13 2L3 14h7v8l10-12h-7L13 2z" />
              </svg>
            </div>
            <div className="inline-flex items-center gap-1 bg-[#d70018] text-white font-black text-sm px-2.5 py-1 rounded-xl font-display shadow">
              <span>THẾ GIỚI</span>
              <span className="text-yellow-300">CÔNG NGHỆ</span>
            </div>
          </div>
          <p className="text-gray-500 mb-4 leading-relaxed">
            Hệ thống bán lẻ thiết bị công nghệ hàng đầu Việt Nam. Cung cấp Smartphone, Laptop, Phụ kiện chính hãng 100%.
          </p>
          <div className="flex space-x-3 text-gray-600">
            <a href="#" className="p-2 bg-gray-100 hover:bg-[#d70018] hover:text-white rounded-full transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" className="p-2 bg-gray-100 hover:bg-[#d70018] hover:text-white rounded-full transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="#" className="p-2 bg-gray-100 hover:bg-[#d70018] hover:text-white rounded-full transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="bg-gray-100 border-t border-gray-200 py-4 text-center text-gray-500 text-[11px]">
        <div className="max-w-7xl mx-auto px-4">
          © 2026 Thế Giới Công Nghệ Premium Electronics. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
}
