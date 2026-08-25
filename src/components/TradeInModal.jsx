import React, { useState } from 'react';
import { RefreshCw, X, ShieldCheck, Zap, Sparkles, CheckCircle2, ChevronRight, Smartphone, Laptop, Tablet } from 'lucide-react';

export default function TradeInModal({ isOpen, onClose, onApplyVoucher }) {
  const [deviceType, setDeviceType] = useState('smartphone'); // smartphone, laptop, tablet
  const [brand, setBrand] = useState('Apple');
  const [modelName, setModelName] = useState('iPhone 14 Pro Max 256GB');
  const [condition, setCondition] = useState('type1'); // type1, type2, type3
  const [userPhone, setUserPhone] = useState('');
  const [valuationResult, setValuationResult] = useState(null);

  if (!isOpen) return null;

  const sampleModels = {
    Apple: ['iPhone 15 Pro Max 256GB', 'iPhone 14 Pro Max 256GB', 'iPhone 13 Pro 128GB', 'iPhone 12 128GB', 'MacBook Air M1 256GB'],
    Samsung: ['Galaxy S24 Ultra 512GB', 'Galaxy S23 Ultra 256GB', 'Galaxy Z Fold5 512GB', 'Galaxy A54 5G'],
    Xiaomi: ['Xiaomi 13T Pro', 'Xiaomi 14 Ultra', 'Redmi Note 13 Pro+'],
    Laptop: ['MacBook Pro M2', 'Dell XPS 13', 'Asus ROG Strix', 'Lenovo ThinkPad X1']
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    let basePrice = 12000000;
    if (modelName.includes('15 Pro Max') || modelName.includes('S24 Ultra')) basePrice = 19500000;
    else if (modelName.includes('14 Pro Max') || modelName.includes('Fold5')) basePrice = 15000000;
    else if (modelName.includes('13 Pro') || modelName.includes('S23 Ultra')) basePrice = 11500000;
    else if (modelName.includes('MacBook')) basePrice = 13500000;

    let conditionMultiplier = 1.0;
    if (condition === 'type2') conditionMultiplier = 0.85;
    if (condition === 'type3') conditionMultiplier = 0.70;

    const estimatedValue = Math.round(basePrice * conditionMultiplier);
    const bonusSubsidy = 2000000; // Trợ giá 2 Triệu
    const totalBenefit = estimatedValue + bonusSubsidy;

    setValuationResult({
      estimatedValue,
      bonusSubsidy,
      totalBenefit
    });
  };

  const handleClaimSubsidy = () => {
    alert(`🎉 Chúc mừng bạn! Mã trợ giá Thu Cũ Đổi Mới "THUCU2T" (Trị giá 2.000.000đ) đã được kích hoạt thành công cho số điện thoại ${userPhone || 'của bạn'}.`);
    if (onApplyVoucher) {
      onApplyVoucher({
        code: 'THUCU2T',
        label: 'Trợ giá Thu Cũ Đổi Mới 2.000.000đ',
        type: 'fixed',
        value: 2000000
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-gray-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#d70018] via-red-600 to-red-700 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
              <RefreshCw className="w-6 h-6 text-yellow-300 animate-spin-slow" />
            </div>
            <div>
              <div className="inline-block bg-yellow-400 text-slate-900 font-black text-[10px] px-2 py-0.2 rounded-full uppercase">
                Ưu đãi đặc quyền TGCN
              </div>
              <h3 className="font-extrabold text-lg leading-tight font-display">
                Thu Cũ Đổi Mới - Trợ Giá Đến 2.000.000đ
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

          {!valuationResult ? (
            <form onSubmit={handleCalculate} className="space-y-4">
              
              {/* Device Type Switch */}
              <div>
                <label className="block font-bold text-gray-700 mb-2 uppercase text-[10px]">
                  1. Chọn loại thiết bị cũ của bạn
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => { setDeviceType('smartphone'); setBrand('Apple'); }}
                    className={`p-3 rounded-2xl border font-bold flex items-center justify-center space-x-2 transition ${
                      deviceType === 'smartphone'
                        ? 'border-[#d70018] bg-red-50 text-[#d70018] shadow-sm'
                        : 'border-gray-200 bg-white text-gray-600'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Điện thoại</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setDeviceType('laptop'); setBrand('Laptop'); }}
                    className={`p-3 rounded-2xl border font-bold flex items-center justify-center space-x-2 transition ${
                      deviceType === 'laptop'
                        ? 'border-[#d70018] bg-red-50 text-[#d70018] shadow-sm'
                        : 'border-gray-200 bg-white text-gray-600'
                    }`}
                  >
                    <Laptop className="w-4 h-4" />
                    <span>Laptop / Mac</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setDeviceType('tablet'); setBrand('Apple'); }}
                    className={`p-3 rounded-2xl border font-bold flex items-center justify-center space-x-2 transition ${
                      deviceType === 'tablet'
                        ? 'border-[#d70018] bg-red-50 text-[#d70018] shadow-sm'
                        : 'border-gray-200 bg-white text-gray-600'
                    }`}
                  >
                    <Tablet className="w-4 h-4" />
                    <span>Máy tính bảng</span>
                  </button>
                </div>
              </div>

              {/* Brand & Model Selection */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1 uppercase text-[10px]">
                    Thương hiệu
                  </label>
                  <select
                    value={brand}
                    onChange={(e) => {
                      setBrand(e.target.value);
                      const list = sampleModels[e.target.value] || [];
                      if (list.length > 0) setModelName(list[0]);
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-bold outline-none focus:bg-white focus:border-[#d70018]"
                  >
                    {Object.keys(sampleModels).map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1 uppercase text-[10px]">
                    Model máy cũ
                  </label>
                  <select
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-bold outline-none focus:bg-white focus:border-[#d70018]"
                  >
                    {(sampleModels[brand] || []).map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Condition Options */}
              <div>
                <label className="block font-bold text-gray-700 mb-2 uppercase text-[10px]">
                  2. Chọn tình trạng thân máy & chức năng
                </label>
                <div className="space-y-2">
                  <label className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    condition === 'type1' ? 'border-emerald-500 bg-emerald-50/60 text-emerald-900 font-bold' : 'border-gray-200 bg-white text-gray-700'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="condition"
                        checked={condition === 'type1'}
                        onChange={() => setCondition('type1')}
                        className="accent-[#d70018]"
                      />
                      <div>
                        <div className="font-bold text-xs">Loại 1: Máy nguyên zin đẹp 99%</div>
                        <div className="text-[11px] opacity-75">Thân máy không trầy xước, màn hình đẹp, hoạt động hoàn hảo.</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded-full">Định giá cao nhất</span>
                  </label>

                  <label className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    condition === 'type2' ? 'border-amber-500 bg-amber-50/60 text-amber-900 font-bold' : 'border-gray-200 bg-white text-gray-700'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="condition"
                        checked={condition === 'type2'}
                        onChange={() => setCondition('type2')}
                        className="accent-[#d70018]"
                      />
                      <div>
                        <div className="font-bold text-xs">Loại 2: Máy đẹp 95% (Xước dăm nhẹ)</div>
                        <div className="text-[11px] opacity-75">Trầy xước nhỏ ở góc vỏ, mọi chức năng nghe gọi mượt mà.</div>
                      </div>
                    </div>
                  </label>

                  <label className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    condition === 'type3' ? 'border-red-400 bg-red-50/60 text-red-900 font-bold' : 'border-gray-200 bg-white text-gray-700'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="condition"
                        checked={condition === 'type3'}
                        onChange={() => setCondition('type3')}
                        className="accent-[#d70018]"
                      />
                      <div>
                        <div className="font-bold text-xs">Loại 3: Máy cấn móp nhẹ / Pin chai</div>
                        <div className="text-[11px] opacity-75">Có vết cấn vỏ máy, pin chai nhẹ nhưng màn hình hiển thị tốt.</div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* User Phone */}
              <div>
                <label className="block font-bold text-gray-700 mb-1 uppercase text-[10px]">
                  Số điện thoại nhận phiếu trợ giá
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Nhập SĐT của bạn (VD: 0909123456)..."
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-bold outline-none focus:bg-white focus:border-[#d70018]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#d70018] hover:bg-[#be0015] text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span>Tính Giá Máy Cũ & Trợ Giá 2 Triệu Ngay</span>
              </button>
            </form>
          ) : (
            /* Valuation Result Section */
            <div className="space-y-4 animate-in zoom-in-95 duration-200">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-3xl border border-slate-700 space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                  <span className="text-gray-400">Thiết bị định giá:</span>
                  <strong className="text-yellow-300 font-bold">{modelName}</strong>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs text-gray-300">
                    <span>Giá máy cũ dự kiến thu mua:</span>
                    <strong className="text-white text-sm">{valuationResult.estimatedValue.toLocaleString('vi-VN')}đ</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs text-emerald-400 font-bold">
                    <span>+ Trợ giá đặc quyền từ TGCN:</span>
                    <span className="bg-emerald-500/20 px-2 py-0.5 rounded-full text-emerald-300 text-xs">
                      +{valuationResult.bonusSubsidy.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] text-amber-300 uppercase font-bold">Tổng số tiền bạn nhận được:</div>
                    <div className="text-2xl font-black text-white font-display">
                      {valuationResult.totalBenefit.toLocaleString('vi-VN')}đ
                    </div>
                  </div>
                  <div className="bg-amber-400 text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                    Tiết kiệm tối đa
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl text-emerald-900 text-xs space-y-1">
                <div className="font-extrabold flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Quyền lợi Thu Cũ Đổi Mới tại Thế Giới Công Nghệ:</span>
                </div>
                <ul className="list-disc list-inside text-[11px] space-y-0.5 text-emerald-800 font-medium pl-1">
                  <li>Không cần mở máy kiểm tra linh kiện.</li>
                  <li>Trừ tiền trực tiếp vào hóa đơn mua máy mới.</li>
                  <li>Hỗ trợ duyệt hồ sơ trả góp 0đ trả trước cho phần tiền còn lại.</li>
                </ul>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setValuationResult(null)}
                  className="w-1/3 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition"
                >
                  Định giá lại
                </button>
                <button
                  type="button"
                  onClick={handleClaimSubsidy}
                  className="w-2/3 py-3 bg-[#d70018] hover:bg-[#be0015] text-white font-extrabold rounded-2xl shadow-lg transition flex items-center justify-center space-x-1.5"
                >
                  <span>Áp Dụng Voucher 2 Triệu Vào Giỏ</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
