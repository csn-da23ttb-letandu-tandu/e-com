import React, { useState } from 'react';
import { CreditCard, X, ShieldCheck, CheckCircle2, Building2, Calculator, ChevronRight, FileText } from 'lucide-react';

export default function InstallmentModal({ isOpen, onClose }) {
  const [productPrice, setProductPrice] = useState(25000000);
  const [downPaymentPct, setDownPaymentPct] = useState(0); // 0%, 20%, 30%, 50%
  const [termMonths, setTermMonths] = useState(6); // 3, 6, 9, 12
  const [selectedBank, setSelectedBank] = useState('VPBank');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [idCardNumber, setIdCardNumber] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const banksList = [
    { name: 'VPBank', color: 'bg-emerald-600' },
    { name: 'Techcombank', color: 'bg-red-600' },
    { name: 'MBBank', color: 'bg-blue-700' },
    { name: 'Vietcombank', color: 'bg-[#1b4332]' },
    { name: 'Sacombank', color: 'bg-blue-600' },
    { name: 'ACB', color: 'bg-blue-800' },
    { name: 'HSBC', color: 'bg-[#d70018]' },
    { name: 'TPBank', color: 'bg-purple-700' }
  ];

  // Calculations
  const downPaymentAmount = Math.round(productPrice * (downPaymentPct / 100));
  const remainingLoan = productPrice - downPaymentAmount;
  const monthlyPayment = Math.round(remainingLoan / termMonths);

  const handleSubmitInstallment = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-gray-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-600 rounded-2xl">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="inline-block bg-blue-500 text-white font-black text-[10px] px-2 py-0.2 rounded-full uppercase">
                Duyệt Hồ Sơ Online 15 Phút
              </div>
              <h3 className="font-extrabold text-lg leading-tight font-display">
                Đăng Ký Trả Góp 0% Lãi Suất
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs flex-1">

          {!isSuccess ? (
            <form onSubmit={handleSubmitInstallment} className="space-y-4">
              
              {/* Product Price Simulator */}
              <div>
                <label className="block font-bold text-gray-700 mb-1 uppercase text-[10px]">
                  Giá trị sản phẩm dự tính trả góp (VNĐ)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="500000"
                    value={productPrice}
                    onChange={(e) => setProductPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-extrabold text-slate-900 focus:bg-white focus:border-blue-600 outline-none text-sm"
                  />
                  <span className="absolute right-3 top-2.5 font-bold text-gray-400">VNĐ</span>
                </div>
              </div>

              {/* Bank Selection Grid */}
              <div>
                <label className="block font-bold text-gray-700 mb-2 uppercase text-[10px]">
                  1. Chọn ngân hàng phát hành thẻ tín dụng (Hơn 25+ ngân hàng)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {banksList.map(b => (
                    <button
                      key={b.name}
                      type="button"
                      onClick={() => setSelectedBank(b.name)}
                      className={`p-2.5 rounded-xl border text-center font-extrabold text-xs transition flex flex-col items-center justify-center space-y-1 ${
                        selectedBank === b.name
                          ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm ring-2 ring-blue-200'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full ${b.color}`}></span>
                      <span>{b.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Term & Down Payment Options */}
              <div className="grid grid-cols-2 gap-3">
                {/* Term */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1.5 uppercase text-[10px]">
                    2. Kỳ hạn trả góp (Tháng)
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    {[3, 6, 9, 12].map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setTermMonths(m)}
                        className={`py-2 rounded-lg font-black text-xs transition border ${
                          termMonths === m
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {m}T
                      </button>
                    ))}
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1.5 uppercase text-[10px]">
                    3. Trả trước (VNĐ)
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    {[0, 20, 30, 50].map(pct => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setDownPaymentPct(pct)}
                        className={`py-2 rounded-lg font-black text-xs transition border ${
                          downPaymentPct === pct
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Installment Calculation Summary Box */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 rounded-2xl space-y-2 border border-slate-700 shadow-md">
                <div className="flex items-center justify-between text-xs border-b border-slate-700 pb-2">
                  <span className="text-gray-400">Ngân hàng & Kỳ hạn:</span>
                  <strong className="text-blue-400 font-bold">{selectedBank} • {termMonths} tháng (0% lãi suất)</strong>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Trả trước ({downPaymentPct}%):</span>
                    <strong className="text-white text-sm">{downPaymentAmount.toLocaleString('vi-VN')}đ</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 block text-[10px]">Góp mỗi tháng:</span>
                    <strong className="text-yellow-400 text-base font-black">{monthlyPayment.toLocaleString('vi-VN')}đ/tháng</strong>
                  </div>
                </div>
              </div>

              {/* Customer Online Registration Form */}
              <div className="space-y-3 pt-1">
                <div className="font-extrabold text-xs text-gray-800 uppercase flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Thông tin người đăng ký hồ sơ online</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">Họ và tên *</label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-gray-200 rounded-xl font-bold text-xs outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">Số điện thoại *</label>
                    <input
                      type="tel"
                      required
                      placeholder="VD: 0912345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-gray-200 rounded-xl font-bold text-xs outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-600 mb-1">Số CCCD / CMND (Bảo mật 100%)</label>
                  <input
                    type="text"
                    placeholder="VD: 079202xxxxxx"
                    value={idCardNumber}
                    onChange={(e) => setIdCardNumber(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-gray-200 rounded-xl font-bold text-xs outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Nộp Hồ Sơ Duyệt Trả Góp Online 15 Phút</span>
              </button>
            </form>
          ) : (
            /* Registration Success Screen */
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-black text-slate-900 font-display">Gửi Hồ Sơ Thành Công!</h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Cảm ơn <strong>{fullName}</strong>. Chuyên viên trả góp của Thế Giới Công Nghệ sẽ liên hệ qua SĐT <strong className="text-blue-600">{phone}</strong> trong vòng 15 phút để hoàn tất thủ tục duyệt 0% lãi suất.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200 text-left text-xs space-y-2">
                <div className="font-bold text-slate-900 border-b border-gray-200 pb-1">Tóm tắt hồ sơ:</div>
                <div className="flex justify-between text-gray-600">
                  <span>Ngân hàng liên kết:</span>
                  <strong className="text-slate-900">{selectedBank}</strong>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Kỳ hạn trả góp:</span>
                  <strong className="text-slate-900">{termMonths} Tháng (0% lãi)</strong>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Góp mỗi tháng:</span>
                  <strong className="text-[#d70018] font-bold">{monthlyPayment.toLocaleString('vi-VN')}đ/tháng</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => { setIsSuccess(false); onClose(); }}
                className="w-full py-3 bg-slate-900 text-white font-extrabold rounded-2xl shadow transition"
              >
                Hoàn tất & Về cửa hàng
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
