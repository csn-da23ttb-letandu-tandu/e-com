import React, { useState } from 'react';
import { Ticket, Plus, Trash2, CheckCircle, XCircle, Search, Sparkles, AlertCircle, Clock } from 'lucide-react';

export default function AdminCoupons({ vouchers = [], onAddVoucher, onDeleteVoucher, onToggleVoucherStatus }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'percentage', // percentage or fixed
    discountValue: 10,
    minOrderValue: 0,
    expiryDate: '',
    description: '',
    isActive: true
  });

  const filteredVouchers = vouchers.filter(v => 
    v.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!newCoupon.code.trim()) return;

    const couponData = {
      id: 'v_' + Date.now(),
      code: newCoupon.code.toUpperCase().trim(),
      discountType: newCoupon.discountType,
      discountValue: Number(newCoupon.discountValue),
      minOrderValue: Number(newCoupon.minOrderValue),
      expiryDate: newCoupon.expiryDate || null,
      description: newCoupon.description || `Mã giảm giá ${newCoupon.code}`,
      isActive: newCoupon.isActive
    };

    onAddVoucher?.(couponData);
    setIsAddModalOpen(false);
    setNewCoupon({
      code: '',
      discountType: 'percentage',
      discountValue: 10,
      minOrderValue: 0,
      expiryDate: '',
      description: '',
      isActive: true
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-50 text-[#d70018] rounded-2xl">
            <Ticket className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 font-display">Quản Lý Mã Giảm Giá (Coupons)</h1>
            <p className="text-xs text-gray-500">Tạo và quản lý các chương trình ưu đãi, khuyến mãi của ADMIN </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#d70018] hover:bg-[#be0015] text-white text-xs font-bold px-5 py-3 rounded-2xl shadow transition flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Tạo mã giảm giá mới
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm mã coupon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#d70018] outline-none"
          />
        </div>

        <div className="flex items-center gap-4 text-gray-600 font-semibold">
          <span>Tổng số: <strong className="text-gray-900">{vouchers.length}</strong> mã</span>
          <span>Đang kích hoạt: <strong className="text-emerald-600">{vouchers.filter(v => v.isActive).length}</strong></span>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="p-4">Mã Coupon</th>
                <th className="p-4">Loại giảm giá</th>
                <th className="p-4">Giá trị giảm</th>
                <th className="p-4">Mô tả / Đơn tối thiểu</th>
                <th className="p-4 text-center">Trạng thái</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredVouchers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-400">
                    Chưa có mã giảm giá nào phù hợp.
                  </td>
                </tr>
              ) : (
                filteredVouchers.map((voucher) => (
                  <tr key={voucher.id} className="hover:bg-slate-50/60 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-sm text-[#d70018] bg-red-50 px-2.5 py-1 rounded-xl border border-red-200">
                          {voucher.code}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-gray-700">
                      {voucher.discountType === 'percentage' ? 'Phần trăm (%)' : 'Số tiền cố định (đ)'}
                    </td>
                    <td className="p-4 font-extrabold text-slate-900">
                      {voucher.discountType === 'percentage' 
                        ? `${voucher.discountValue}%` 
                        : `${voucher.discountValue.toLocaleString('vi-VN')}đ`}
                    </td>
                    <td className="p-4 space-y-0.5">
                      <p className="font-medium text-gray-800">{voucher.description}</p>
                      {voucher.minOrderValue > 0 && (
                        <p className="text-[11px] text-gray-400">
                          Đơn tối thiểu: {voucher.minOrderValue.toLocaleString('vi-VN')}đ
                        </p>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => onToggleVoucherStatus?.(voucher.id)}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1 transition ${
                          voucher.isActive 
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {voucher.isActive ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            Đang chạy
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            Tắt
                          </>
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          if (window.confirm(`Xóa voucher ${voucher.code}?`)) {
                            onDeleteVoucher?.(voucher.id);
                          }
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                        title="Xóa coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Tạo Mã Giảm Giá Mới
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1 uppercase text-[10px]">
                  Mã Coupon (VD: TGCN100)
                </label>
                <input
                  type="text"
                  required
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  placeholder="Nhập mã giảm giá..."
                  className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-mono font-bold focus:bg-white focus:border-[#d70018] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1 uppercase text-[10px]">
                    Loại giảm giá
                  </label>
                  <select
                    value={newCoupon.discountType}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-medium focus:bg-white focus:border-[#d70018] outline-none"
                  >
                    <option value="percentage">Phần trăm (%)</option>
                    <option value="fixed">Số tiền cố định (VNĐ)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1 uppercase text-[10px]">
                    Giá trị giảm {newCoupon.discountType === 'percentage' ? '(%)' : '(VNĐ)'}
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder={newCoupon.discountType === 'percentage' ? 'VD: 15 (% phần trăm)' : 'VD: 500000 (đ)'}
                    value={newCoupon.discountValue}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-bold focus:bg-white focus:border-[#d70018] outline-none text-[#d70018]"
                  />
                </div>
              </div>

              {/* Quick Percentage Presets */}
              {newCoupon.discountType === 'percentage' && (
                <div className="bg-red-50/60 p-3 rounded-2xl border border-red-100 space-y-1.5">
                  <div className="text-[10px] font-extrabold text-[#d70018] uppercase">
                    ⚡ Chọn nhanh tỷ lệ giảm giá theo phần trăm (%):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[5, 10, 15, 20, 25, 30, 40, 50].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setNewCoupon(prev => ({ ...prev, discountValue: pct }))}
                        className={`text-xs font-black px-2.5 py-1 rounded-lg transition shadow-sm border ${
                          Number(newCoupon.discountValue) === pct
                            ? 'bg-[#d70018] text-white border-[#d70018]'
                            : 'bg-white text-[#d70018] border-red-200 hover:bg-red-50'
                        }`}
                      >
                        Giảm {pct}%
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block font-bold text-gray-700 mb-1 uppercase text-[10px]">
                  Đơn hàng tối thiểu (VNĐ)
                </label>
                <input
                  type="number"
                  min="0"
                  value={newCoupon.minOrderValue}
                  onChange={(e) => setNewCoupon({ ...newCoupon, minOrderValue: e.target.value })}
                  placeholder="0đ"
                  className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-medium focus:bg-white focus:border-[#d70018] outline-none"
                />
              </div>

              {/* Coupon Expiry Date Setting */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-gray-200 space-y-2">
                <label className="block text-[11px] font-bold text-gray-800 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#d70018]" />
                    <span>Hạn sử dụng mã coupon (Hết hạn sẽ ngưng áp dụng):</span>
                  </span>
                  {newCoupon.expiryDate && (
                    <span className="text-emerald-600 font-bold text-[10px]">
                      Hạn: {new Date(newCoupon.expiryDate).toLocaleString('vi-VN')}
                    </span>
                  )}
                </label>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="datetime-local"
                    value={newCoupon.expiryDate || ''}
                    onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
                    className="flex-1 p-2 bg-white border border-gray-300 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#d70018]"
                  />
                  <div className="flex gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        const d = new Date();
                        d.setDate(d.getDate() + 3);
                        setNewCoupon(prev => ({ ...prev, expiryDate: d.toISOString().slice(0, 16) }));
                      }}
                      className="px-2 py-1 bg-white hover:bg-slate-100 border border-gray-300 text-[10px] font-bold rounded-lg shadow-sm"
                    >
                      +3 ngày
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const d = new Date();
                        d.setDate(d.getDate() + 7);
                        setNewCoupon(prev => ({ ...prev, expiryDate: d.toISOString().slice(0, 16) }));
                      }}
                      className="px-2 py-1 bg-white hover:bg-slate-100 border border-gray-300 text-[10px] font-bold rounded-lg shadow-sm"
                    >
                      +7 ngày
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const d = new Date();
                        d.setDate(d.getDate() + 30);
                        setNewCoupon(prev => ({ ...prev, expiryDate: d.toISOString().slice(0, 16) }));
                      }}
                      className="px-2 py-1 bg-white hover:bg-slate-100 border border-gray-300 text-[10px] font-bold rounded-lg shadow-sm"
                    >
                      +30 ngày
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewCoupon(prev => ({ ...prev, expiryDate: '' }))}
                      className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-[10px] font-bold rounded-lg"
                    >
                      Vô hạn
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1 uppercase text-[10px]">
                  Mô tả ưu đãi
                </label>
                <textarea
                  rows="2"
                  value={newCoupon.description}
                  onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                  placeholder="VD: Giảm ngay 100k cho đơn từ 2 triệu..."
                  className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-medium focus:bg-white focus:border-[#d70018] outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#d70018] text-white font-bold rounded-xl shadow hover:bg-[#be0015]"
                >
                  Lưu Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
