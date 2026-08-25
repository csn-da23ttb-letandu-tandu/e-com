import React, { useState } from 'react';
import { 
  Check, CreditCard, Truck, MapPin, User, Phone, Mail, 
  Building, CheckCircle2, ShieldCheck, ArrowLeft, QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VIETNAM_PROVINCES } from '../utils/locationData';

export default function CheckoutView({ 
  cart, 
  user, 
  cartSummary, 
  onOrderSuccess, 
  onBackToCart 
}) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    city: 'TP Hồ Chí Minh',
    district: 'Quận 1',
    ward: 'Phường Bến Nghé',
    address: 'Số 123 Đường Lê Lợi',
    note: ''
  });

  const [shippingMethod, setShippingMethod] = useState('express'); // 'standard' or 'express'
  const [paymentMethod, setPaymentMethod] = useState('qr'); // 'cod', 'qr', 'vnpay', 'card'
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shippingCost = shippingMethod === 'express' ? 30000 : 0;
  const totalAmount = (cartSummary?.grandTotal || 0) + (shippingMethod === 'express' ? 30000 : 0);

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    const newOrderId = `HD-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderId(newOrderId);
    setIsCompleted(true);

    // Trigger celebratory confetti effect
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log(err);
    }

    // Call back to parent to register order in system
    onOrderSuccess({
      id: newOrderId,
      customer: formData.name,
      email: formData.email,
      phone: formData.phone,
      time: 'Vừa xong',
      total: totalAmount,
      status: 'Đang xử lý',
      items: cart.map(i => ({ name: i.name, quantity: i.quantity, price: i.price }))
    });
  };

  if (isCompleted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
            Đặt hàng thành công
          </span>
          <h1 className="text-2xl font-extrabold text-gray-900 font-display">
            Cảm ơn bạn đã mua hàng tại Thế Giới Công Nghệ!
          </h1>
          <p className="text-xs text-gray-500">
            Mã đơn hàng của bạn là: <strong className="text-[#d70018] font-bold text-sm">{orderId}</strong>
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-left max-w-md mx-auto space-y-3 text-xs">
          <div className="font-bold text-gray-900 border-b border-gray-100 pb-2">Thông tin giao hàng:</div>
          <div className="flex justify-between"><span className="text-gray-500">Người nhận:</span> <span className="font-semibold">{formData.name}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Số điện thoại:</span> <span className="font-semibold">{formData.phone}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Địa chỉ:</span> <span className="font-semibold">{formData.address}, {formData.ward}, {formData.district}, {formData.city}</span></div>
          <div className="flex justify-between border-t border-gray-100 pt-2"><span className="text-gray-500">Tổng thanh toán:</span> <span className="font-bold text-[#d70018] text-sm">{totalAmount.toLocaleString('vi-VN')}đ</span></div>
        </div>

        <p className="text-xs text-gray-500">
          Bộ phận chăm sóc khách hàng sẽ liên hệ với bạn trong vòng 15 phút để xác nhận đơn hàng.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      
      {/* Checkout Header Stepper (Design #8) */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div className="flex justify-center items-center space-x-4 sm:space-x-12 text-xs font-bold">
          <div className="flex items-center space-x-2 text-green-600">
            <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-xs">✓</span>
            <span>1. Giỏ hàng</span>
          </div>
          <span className="text-gray-300">--</span>
          <div className="flex items-center space-x-2 text-[#d70018]">
            <span className="w-6 h-6 rounded-full bg-[#d70018] text-white flex items-center justify-center text-xs">2</span>
            <span>2. Thông tin & Thanh toán</span>
          </div>
          <span className="text-gray-300">--</span>
          <div className="flex items-center space-x-2 text-gray-400">
            <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">3</span>
            <span>3. Hoàn tất đơn hàng</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Form (Left) + Mini Order Summary (Right) */}
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form Columns (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Receiver Info Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-gray-900 flex items-center space-x-2 border-b border-gray-100 pb-3">
              <User className="w-4 h-4 text-[#d70018]" />
              <span>1. Thông tin người nhận hàng</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Họ và tên người nhận *</label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Số điện thoại liên hệ *</label>
                <input 
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email nhận thông báo đơn hàng</label>
                <input 
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1 flex justify-between">
                  <span>Tỉnh / Thành phố *</span>
                  <span className="text-[10px] text-green-600 font-bold">Giao toàn quốc 63 tỉnh thành</span>
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none bg-white font-medium cursor-pointer"
                >
                  {VIETNAM_PROVINCES.map(province => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Quận / Huyện *</label>
                <input 
                  type="text"
                  required
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Địa chỉ chi tiết (Số nhà, Tên đường) *</label>
                <input 
                  type="text"
                  required
                  placeholder="Ví dụ: 123 Đường Lê Lợi, Phường Bến Nghé"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          {/* Shipping Method Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-gray-900 flex items-center space-x-2 border-b border-gray-100 pb-3">
              <Truck className="w-4 h-4 text-[#d70018]" />
              <span>2. Phương thức vận chuyển</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label 
                onClick={() => setShippingMethod('express')}
                className={`p-4 rounded-xl border cursor-pointer flex items-start space-x-3 transition ${
                  shippingMethod === 'express' 
                    ? 'border-[#d70018] bg-red-50/50 ring-1 ring-[#d70018]' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input 
                  type="radio" 
                  name="shipping" 
                  checked={shippingMethod === 'express'}
                  readOnly 
                  className="mt-1 accent-[#d70018]"
                />
                <div>
                  <div className="font-bold text-xs text-gray-900">Giao hàng Hỏa tốc 2H</div>
                  <div className="text-[11px] text-gray-500">Nhận hàng ngay trong ngày</div>
                  <div className="text-xs font-bold text-[#d70018] mt-1">30.000đ</div>
                </div>
              </label>

              <label 
                onClick={() => setShippingMethod('standard')}
                className={`p-4 rounded-xl border cursor-pointer flex items-start space-x-3 transition ${
                  shippingMethod === 'standard' 
                    ? 'border-[#d70018] bg-red-50/50 ring-1 ring-[#d70018]' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input 
                  type="radio" 
                  name="shipping" 
                  checked={shippingMethod === 'standard'}
                  readOnly 
                  className="mt-1 accent-[#d70018]"
                />
                <div>
                  <div className="font-bold text-xs text-gray-900">Giao hàng Tiêu chuẩn</div>
                  <div className="text-[11px] text-gray-500">Dự kiến 2 - 3 ngày làm việc</div>
                  <div className="text-xs font-bold text-green-600 mt-1">Miễn phí</div>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-gray-900 flex items-center space-x-2 border-b border-gray-100 pb-3">
              <CreditCard className="w-4 h-4 text-[#d70018]" />
              <span>3. Phương thức thanh toán</span>
            </h3>

            <div className="space-y-2.5">
              {[
                { id: 'qr', title: 'Chuyển khoản Ngân hàng qua Mã QR', desc: 'Quét mã VietQR bằng app ngân hàng bất kỳ', icon: QrCode },
                { id: 'cod', title: 'Thanh toán khi nhận hàng (COD)', desc: 'Thanh toán tiền mặt cho shipper khi nhận được hàng', icon: Truck },
                { id: 'vnpay', title: 'Thanh toán qua Ví VNPay / Momo', desc: 'Giảm thêm đến 500k cho khách hàng', icon: ShieldCheck }
              ].map(method => {
                const Icon = method.icon;
                const isSelected = paymentMethod === method.id;

                return (
                  <label 
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                      isSelected 
                        ? 'border-[#d70018] bg-red-50/50 ring-1 ring-[#d70018]' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={isSelected}
                        readOnly 
                        className="accent-[#d70018]"
                      />
                      <Icon className="w-5 h-5 text-[#d70018]" />
                      <div>
                        <div className="font-bold text-xs text-gray-900">{method.title}</div>
                        <div className="text-[11px] text-gray-500">{method.desc}</div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Mini Summary Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4 sticky top-24">
            <h3 className="font-extrabold text-sm text-gray-900 border-b border-gray-100 pb-3">
              TÓM TẮT ĐƠN HÀNG
            </h3>

            {/* Cart items preview */}
            <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto pr-1 space-y-2">
              {cart.map(item => (
                <div key={item.id} className="pt-2 flex items-center space-x-3 text-xs">
                  <img src={item.images[0]} alt="" className="w-12 h-12 object-contain bg-gray-50 rounded border border-gray-100 p-1" />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 line-clamp-1">{item.name}</div>
                    <div className="text-[10px] text-gray-500">Số lượng: {item.quantity}</div>
                  </div>
                  <div className="font-bold text-gray-900">
                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                  </div>
                </div>
              ))}
            </div>

            {/* Cost breakdown */}
            <div className="pt-3 border-t border-gray-200 text-xs space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính sản phẩm</span>
                <span className="font-semibold">{cartSummary?.subtotal?.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí giao hàng</span>
                <span className="font-semibold">{shippingCost === 0 ? 'Miễn phí' : '30.000đ'}</span>
              </div>
              {cartSummary?.discount > 0 && (
                <div className="flex justify-between text-[#d70018] font-semibold">
                  <span>Giảm giá Voucher</span>
                  <span>-{cartSummary.discount.toLocaleString('vi-VN')}đ</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-3 border-t border-gray-200 text-base font-extrabold">
                <span className="text-gray-900">Tổng thanh toán</span>
                <span className="text-2xl text-[#d70018]">{totalAmount.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              className="w-full bg-[#d70018] hover:bg-[#be0015] text-white font-extrabold py-4 rounded-xl text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center space-x-2"
            >
              <span>XÁC NHẬN ĐẶT HÀNG NGAY</span>
            </button>

            <button
              type="button"
              onClick={onBackToCart}
              className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2.5 rounded-xl text-xs transition"
            >
              Quay lại giỏ hàng
            </button>
          </div>
        </div>

      </form>

    </div>
  );
}
