import React, { useState, useRef } from 'react';
import { X, Gift, Sparkles, Trophy, Copy, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LuckyWheelModal({ isOpen, onClose, onClaimVoucher }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonVoucher, setWonVoucher] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const wheelSegments = [
    { code: 'TANDU10', label: 'Giảm 10%', color: '#d70018', textColor: '#ffffff' },
    { code: 'FREESHIP', label: 'Freeship 0đ', color: '#1e293b', textColor: '#ffffff' },
    { code: 'TGCN500', label: 'Giảm 500k', color: '#eab308', textColor: '#1e293b' },
    { code: 'LUCKY100', label: 'Giảm 100k', color: '#2563eb', textColor: '#ffffff' },
    { code: 'VIPMEMBER', label: 'Giảm 15%', color: '#16a34a', textColor: '#ffffff' },
    { code: 'TANDU200', label: 'Giảm 200k', color: '#9333ea', textColor: '#ffffff' }
  ];

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setWonVoucher(null);

    // Pick random index
    const selectedIndex = Math.floor(Math.random() * wheelSegments.length);
    const segmentAngle = 360 / wheelSegments.length;
    
    // Extra full spins (5-8 turns) + alignment angle
    const extraRounds = (5 + Math.floor(Math.random() * 3)) * 360;
    // Align segment to top pointer (270deg offset)
    const targetAngle = extraRounds + (360 - (selectedIndex * segmentAngle) - segmentAngle / 2);

    setRotation(targetAngle);

    setTimeout(() => {
      setSpinning(false);
      const prize = wheelSegments[selectedIndex];
      setWonVoucher(prize);
      onClaimVoucher?.(prize);

      // Trigger Confetti fireworks!
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti error:', err);
      }
    }, 4000);
  };

  const handleCopyCode = () => {
    if (!wonVoucher) return;
    navigator.clipboard.writeText(wonVoucher.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-600 via-[#d70018] to-red-700 text-white p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-10">
            <Sparkles className="w-32 h-32" />
          </div>
          <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2 shadow-md">
            <Gift className="w-3.5 h-3.5" />
            Vòng Quay May Mắn Thế Giới Công Nghệ
          </div>
          <h2 className="text-2xl font-black font-display">Quay Ngay - Trúng Lớn 100%</h2>
          <p className="text-xs text-red-100 mt-1">Săn Voucher độc quyền giảm tới 500.000đ từ Tấn Dư Store</p>
        </div>

        {/* Wheel Section */}
        <div className="p-6 flex flex-col items-center justify-center bg-slate-50 relative">
          
          {/* Wheel Pointer Indicator */}
          <div className="absolute top-4 z-20 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-amber-400 filter drop-shadow-md"></div>

          {/* Dynamic SVG Wheel */}
          <div className="relative w-64 h-64 my-4 flex items-center justify-center">
            <div 
              className="w-full h-full rounded-full border-4 border-amber-400 shadow-2xl overflow-hidden transition-all duration-[4000ms] ease-[cubic-bezier(0.15,0.99,0.18,1.00)]"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {wheelSegments.map((seg, i) => {
                  const segAngle = 360 / wheelSegments.length;
                  const startAngle = i * segAngle;
                  const endAngle = (i + 1) * segAngle;

                  const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                  const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                  const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                  const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                  const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                  // Text position angle
                  const midAngle = startAngle + segAngle / 2;
                  const textX = 50 + 32 * Math.cos((Math.PI * midAngle) / 180);
                  const textY = 50 + 32 * Math.sin((Math.PI * midAngle) / 180);

                  return (
                    <g key={i}>
                      <path d={pathData} fill={seg.color} stroke="#ffffff" strokeWidth="0.5" />
                      <text
                        x={textX}
                        y={textY}
                        fill={seg.textColor}
                        fontSize="4"
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="central"
                        transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                      >
                        {seg.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Center Spin Button */}
            <button
              onClick={handleSpin}
              disabled={spinning}
              className="absolute z-10 w-16 h-16 rounded-full bg-slate-900 border-4 border-amber-400 text-amber-400 font-black text-xs shadow-2xl flex items-center justify-center hover:scale-105 transition disabled:opacity-80"
            >
              {spinning ? (
                <Sparkles className="w-6 h-6 animate-spin" />
              ) : (
                <span>QUAY</span>
              )}
            </button>
          </div>

          {/* Result Card */}
          {wonVoucher && (
            <div className="mt-4 w-full bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-center animate-in zoom-in-95 duration-200">
              <div className="inline-flex items-center gap-1.5 text-[#d70018] text-xs font-bold uppercase tracking-wide">
                <Trophy className="w-4 h-4 text-amber-600" />
                Chúc Mừng Bạn Đã Trúng Phần Thưởng!
              </div>
              <div className="text-xl font-black text-slate-900 my-1">
                {wonVoucher.label}
              </div>
              <p className="text-xs text-gray-600 mb-3">Mã voucher đã tự động thêm vào Kho ưu đãi của bạn</p>
              
              <div className="flex items-center justify-center gap-2">
                <div className="bg-white border border-amber-300 px-4 py-2 rounded-xl text-sm font-mono font-bold text-[#d70018]">
                  {wonVoucher.code}
                </div>
                <button
                  onClick={handleCopyCode}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Đã chép' : 'Sao chép'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-100 flex justify-between items-center text-xs">
          <span className="text-gray-500">Mỗi tài khoản được nhận ưu đãi từ Vòng quay</span>
          <button
            onClick={onClose}
            className="text-gray-700 font-bold hover:text-[#d70018] transition"
          >
            Đóng cửa sổ
          </button>
        </div>

      </div>
    </div>
  );
}
