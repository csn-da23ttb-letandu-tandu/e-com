import React, { useState } from 'react';
import { Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function CartView({ 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  onProceedToCheckout, 
  onContinueShopping,
  activeVouchers = []
}) {
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null);

  // Subtotal calculation
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const vat = Math.round(subtotal * 0.1);
  const shippingFee = subtotal > 10000000 || (appliedVoucher && appliedVoucher.code === 'FREESHIP') ? 0 : 30000;
  
  const calculateDiscount = () => {
    if (!appliedVoucher) return 0;
    if (appliedVoucher.type === 'percent') return Math.round(subtotal * appliedVoucher.value);
    return appliedVoucher.value;
  };

  const discount = calculateDiscount();
  const grandTotal = Math.max(0, subtotal + vat + shippingFee - discount);

  const applyVoucherObj = (codeStr) => {
    const code = codeStr.trim().toUpperCase();

    // Check dynamic Admin vouchers first
    const dynamicVoucher = activeVouchers.find(v => v.code.toUpperCase() === code);
    if (dynamicVoucher) {
      if (!dynamicVoucher.isActive) {
        alert(`⚠️ Mã giảm giá "${code}" đang ở trạng thái ngưng kích hoạt.`);
        return;
      }
      if (dynamicVoucher.expiryDate && new Date() >= new Date(dynamicVoucher.expiryDate)) {
        alert(`⌛ Mã giảm giá "${code}" đã HẾT HẠN SỬ DỤNG vào lúc ${new Date(dynamicVoucher.expiryDate).toLocaleString('vi-VN')}.`);
        return;
      }
      if (dynamicVoucher.minOrderValue && subtotal < dynamicVoucher.minOrderValue) {
        alert(`⚠️ Mã giảm giá "${code}" chỉ áp dụng cho đơn hàng từ ${dynamicVoucher.minOrderValue.toLocaleString('vi-VN')}đ trở lên.`);
        return;
      }

      if (dynamicVoucher.discountType === 'percentage') {
        setAppliedVoucher({
          code: dynamicVoucher.code,
          label: `Giảm ${dynamicVoucher.discountValue}% (${dynamicVoucher.description || 'Ưu đãi'})`,
          type: 'percent',
          value: dynamicVoucher.discountValue / 100
        });
      } else {
        setAppliedVoucher({
          code: dynamicVoucher.code,
          label: `Giảm ${dynamicVoucher.discountValue.toLocaleString('vi-VN')}đ (${dynamicVoucher.description || 'Ưu đãi'})`,
          type: 'fixed',
          value: dynamicVoucher.discountValue
        });
      }
      return;
    }

    if (code === 'SMEMBER') {
      setAppliedVoucher({ code: 'SMEMBER', label: 'Giảm 5% cho Smember', type: 'percent', value: 0.05 });
    } else if (code === 'TANDU10') {
      setAppliedVoucher({ code: 'TANDU10', label: 'Giảm 10% từ Vòng quay', type: 'percent', value: 0.10 });
    } else if (code === 'FREESHIP') {
      setAppliedVoucher({ code: 'FREESHIP', label: 'Miễn phí vận chuyển 0đ', type: 'fixed', value: 30000 });
    } else if (code === 'TGCN500') {
      setAppliedVoucher({ code: 'TGCN500', label: 'Giảm 500.000đ', type: 'fixed', value: 500000 });
    } else if (code === 'LUCKY100') {
      setAppliedVoucher({ code: 'LUCKY100', label: 'Giảm 100.000đ', type: 'fixed', value: 100000 });
    } else if (code === 'VIPMEMBER') {
      setAppliedVoucher({ code: 'VIPMEMBER', label: 'Giảm 15% VIP Member', type: 'percent', value: 0.15 });
    } else if (code === 'TANDU200') {
      setAppliedVoucher({ code: 'TANDU200', label: 'Giảm 200.000đ', type: 'fixed', value: 200000 });
    } else {
      alert('Mã giảm giá không hợp lệ hoặc đã hết thời hạn sử dụng.');
    }
  };

  const handleApplyVoucher = (e) => {
    e.preventDefault();
    applyVoucherObj(voucherCode);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-20 h-20 bg-red-50 text-[#d70018] rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Giỏ hàng của bạn đang trống</h2>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          Hãy chọn các sản phẩm công nghệ tuyệt vời từ danh mục sản phẩm của Thế Giới Công Nghệ để tiếp tục.
        </p>
        <button
          onClick={onContinueShopping}
          className="inline-flex items-center space-x-2 bg-[#d70018] hover:bg-[#be0015] text-white font-bold px-6 py-3 rounded-xl text-xs transition shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Khám phá sản phẩm ngay</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      
      {/* Page Title */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-3">
          <button 
            onClick={onContinueShopping}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-xl font-extrabold text-gray-900 font-display">
            Giỏ hàng của bạn <span className="text-xs text-gray-500 font-normal">({cart.reduce((a, b) => a + b.quantity, 0)} sản phẩm)</span>
          </h1>
        </div>
      </div>

      {/* Main Grid: Cart Items (Left) + Order Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Cart Items List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {cart.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col sm:flex-row items-center gap-4 relative group"
            >
              {/* Product Thumbnail */}
              <div className="w-24 h-24 bg-gray-50 rounded-xl p-2 shrink-0 border border-gray-100 flex items-center justify-center">
                <img 
                  src={item.images[0]} 
                  alt={item.name} 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop";
                  }}
                  className="max-h-full max-w-full object-contain" 
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 space-y-1 text-center sm:text-left">
                <h3 className="font-bold text-sm text-gray-900 leading-snug">{item.name}</h3>
                <div className="text-[11px] text-gray-500">
                  Phân loại: <span className="font-semibold text-gray-700">{item.capacity || 'Tiêu chuẩn'}</span>
                </div>
                <div className="text-xs font-bold text-[#d70018] sm:hidden">
                  {item.price.toLocaleString('vi-VN')}đ
                </div>
              </div>

              {/* Quantity Stepper & Price */}
              <div className="flex items-center space-x-4">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-1.5 text-gray-600 hover:bg-gray-200 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-gray-900">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 text-gray-600 hover:bg-gray-200 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Total Price for item */}
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-extrabold text-[#d70018]">
                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {item.price.toLocaleString('vi-VN')}đ / cái
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Special Gift Guarantee Notice */}
          <div className="bg-green-50 border border-green-200 text-green-900 rounded-2xl p-4 text-xs flex items-center space-x-3">
            <ShieldCheck className="w-6 h-6 text-green-600 shrink-0" />
            <div>
              <strong className="block font-bold">Miễn phí vận chuyển toàn quốc</strong>
              <span>Đơn hàng trên 10 triệu đồng được hỗ trợ bảo hiểm hàng hóa 100% & giao hỏa tốc 2H.</span>
            </div>
          </div>
        </div>

        {/* Right Order Summary Card (5 cols - Design #7) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
            <h3 className="font-extrabold text-base text-gray-900 border-b border-gray-100 pb-3">
              GHI NHẬN THANH TOÁN
            </h3>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính</span>
                <span className="font-bold text-gray-900">{subtotal.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Thế VAT (10%)</span>
                <span className="font-semibold text-gray-700">{vat.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span className="font-semibold text-green-600">
                  {shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')}đ`}
                </span>
              </div>

              {appliedVoucher && (
                <div className="flex justify-between text-[#d70018] bg-red-50 p-2 rounded-lg font-bold">
                  <span>Mã giảm giá ({appliedVoucher.code})</span>
                  <span>-{discount.toLocaleString('vi-VN')}đ</span>
                </div>
              )}
            </div>

            {/* Voucher Input Form */}
            <form onSubmit={handleApplyVoucher} className="space-y-2 pt-2 border-t border-gray-100">
              <label className="block text-xs font-semibold text-gray-700 flex items-center space-x-1">
                <Tag className="w-3.5 h-3.5 text-[#d70018]" />
                <span>Nhập mã giảm giá / Voucher</span>
              </label>
              <div className="flex space-x-2">
                <input 
                  type="text"
                  placeholder="Nhập: TANDU10, TGCN500..."
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-xs uppercase font-bold focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none"
                />
                <button 
                  type="submit"
                  className="bg-gray-900 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                >
                  Áp dụng
                </button>
              </div>
            </form>

            {/* Collected Vouchers List (1-Click Apply) */}
            {activeVouchers.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase">Kho Voucher đã săn:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeVouchers.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setVoucherCode(v.code);
                        applyVoucherObj(v.code);
                      }}
                      className="bg-red-50 hover:bg-red-100 text-[#d70018] border border-red-200 text-[11px] font-bold px-2.5 py-1 rounded-lg transition flex items-center gap-1 shadow-sm"
                    >
                      <span>🏷️ {v.code} ({v.label})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Grand Total */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-baseline mb-4">
                <span className="font-extrabold text-sm text-gray-900">Tổng thanh toán</span>
                <span className="text-2xl font-extrabold text-[#d70018]">
                  {grandTotal.toLocaleString('vi-VN')}đ
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => onProceedToCheckout({ subtotal, vat, shippingFee, discount, grandTotal })}
                className="w-full bg-[#d70018] hover:bg-[#be0015] text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center space-x-2"
              >
                <span>TIẾN HÀNH THANH TOÁN</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onContinueShopping}
                className="w-full mt-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2.5 rounded-xl text-xs transition"
              >
                TIẾP TỤC MUA SẮM
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
