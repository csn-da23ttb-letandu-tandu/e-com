import React, { useState } from 'react';
import { GraduationCap, X, CheckCircle2, Sparkles, ShieldCheck, ChevronRight, Upload, School } from 'lucide-react';

export default function StudentDiscountModal({ isOpen, onClose, onApplyVoucher }) {
  const [schoolName, setSchoolName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  if (!isOpen) return null;

  const handleVerifyStudent = (e) => {
    e.preventDefault();
    if (!studentName.trim() || !schoolName.trim()) return;
    setIsVerified(true);
  };

  const handleClaimStudentVoucher = () => {
    alert(`🎓 Tuyệt vời! Mã ưu đãi Học sinh - Sinh viên "SSTUDENT5" (Giảm 5%) đã được mở khóa thành công cho học sinh/sinh viên ${studentName}.`);
    if (onApplyVoucher) {
      onApplyVoucher({
        code: 'SSTUDENT5',
        label: 'Ưu đãi S-Student giảm 5%',
        type: 'percent',
        value: 0.05
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-slate-900 text-amber-400 rounded-2xl">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-block bg-slate-900 text-amber-400 font-black text-[10px] px-2 py-0.2 rounded-full uppercase">
                Chương Trình S-STUDENT 2026
              </div>
              <h3 className="font-black text-lg leading-tight font-display">
                Học Sinh - Sinh Viên Giảm Thêm 5%
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/10 text-slate-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs flex-1">

          {!isVerified ? (
            <form onSubmit={handleVerifyStudent} className="space-y-4">
              
              <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl space-y-1 text-amber-900">
                <div className="font-extrabold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Đặc quyền ưu đãi Sinh viên tại Thế Giới Công Nghệ:</span>
                </div>
                <ul className="list-disc list-inside text-[11px] font-semibold text-amber-800 space-y-0.5 pl-1">
                  <li>Giảm ngay 5% tối đa 500.000đ áp dụng toàn bộ Laptop, iPad & Smartphone.</li>
                  <li>Tặng thêm 1 năm bảo hành mở rộng chính hãng.</li>
                  <li>Duyệt trực tuyến nhanh bằng Thẻ Sinh Viên / Mã MSSV / App trường.</li>
                </ul>
              </div>

              {/* Student Information Form */}
              <div className="space-y-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1 uppercase text-[10px]">
                    Trường Đại Học / Cao Đẳng / THPT *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="VD: ĐH Bách Khoa, ĐH Tôn Đức Thắng..."
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-gray-200 rounded-xl font-bold text-xs outline-none focus:bg-white focus:border-amber-500"
                    />
                    <School className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1 uppercase text-[10px]">
                      Họ và tên Sinh viên *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Nguyễn Văn B"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-bold text-xs outline-none focus:bg-white focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1 uppercase text-[10px]">
                      Mã Sinh Viên (MSSV)
                    </label>
                    <input
                      type="text"
                      placeholder="VD: 21120000"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-bold text-xs outline-none focus:bg-white focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1 uppercase text-[10px]">
                    Số điện thoại liên hệ *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="VD: 0987654321"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-bold text-xs outline-none focus:bg-white focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-black text-amber-400 font-extrabold text-sm py-3.5 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2"
              >
                <GraduationCap className="w-5 h-5" />
                <span>Xác Thực Học Sinh - Sinh Viên Ngay</span>
              </button>
            </form>
          ) : (
            /* Verification Success Screen */
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-black text-slate-900 font-display">Xác Thực S-Student Thành Công!</h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Chúc mừng bạn <strong>{studentName}</strong> ({schoolName}). Bạn đã được cấp mã ưu đãi độc quyền <strong>Giảm 5%</strong> áp dụng cho toàn bộ sản phẩm mua sắm.
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 p-4 rounded-2xl shadow-md font-mono space-y-1">
                <div className="text-[10px] uppercase font-sans font-bold opacity-80">Mã Voucher S-Student 5%:</div>
                <div className="text-2xl font-black tracking-widest uppercase">SSTUDENT5</div>
                <div className="text-[11px] font-sans font-semibold">Tự động giảm 5% khi thanh toán</div>
              </div>

              <button
                type="button"
                onClick={handleClaimStudentVoucher}
                className="w-full py-3 bg-[#d70018] hover:bg-[#be0015] text-white font-extrabold rounded-2xl shadow-lg transition flex items-center justify-center space-x-1.5"
              >
                <span>Nhận Mã Giảm 5% & Áp Dụng Ngay</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
