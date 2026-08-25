import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage({ 
  registeredUsers = [], 
  onLoginSuccess, 
  onBackToStore 
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setErrorMessage('Vui lòng nhập đầy đủ Email và Mật khẩu Admin');
      return;
    }

    // Check account in database
    const existingAccount = registeredUsers.find(
      u => (u.email || '').toLowerCase() === cleanEmail || (u.phone || '') === cleanEmail
    );

    if (!existingAccount) {
      setErrorMessage('❌ TỪ CHỐI TRUY CẬP: Tài khoản không tồn tại trong hệ thống.');
      return;
    }

    if (existingAccount.password !== cleanPassword) {
      setErrorMessage('❌ Mật khẩu Quản trị viên không chính xác.');
      return;
    }

    if (existingAccount.role !== 'admin') {
      setErrorMessage('🚫 TỪ CHỐI TRUY CẬP: Đây là tài khoản Khách hàng, không có quyền truy cập Trang Quản Trị Admin.');
      return;
    }

    if (existingAccount.isLocked) {
      setErrorMessage('🔒 Tài khoản Admin này đang bị tạm khóa. Vui lòng liên hệ Trưởng ban Quản trị.');
      return;
    }

    // Success Admin Auth
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(existingAccount);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/20 to-slate-100 text-slate-800 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Decorative Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        
        {/* Brand Logo & Title Header */}
        <div className="text-center mb-8 space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 via-[#d70018] to-red-700 text-white flex items-center justify-center mx-auto shadow-xl shadow-red-500/20 border-2 border-white">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <div>
            <div className="inline-block bg-red-100 text-[#d70018] border border-red-200 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
              CỔNG BẢO MẬT QUẢN TRỊ VIÊN
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display">
              Trang Quản Trị Hệ Thống
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Cổng đăng nhập bảo mật dành riêng cho Quản trị viên Thế Giới Công Nghệ
            </p>
          </div>
        </div>

        {/* Login Form Box (Sáng - Nền trắng sạch) */}
        <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-2xl space-y-5">
          
          {/* Quick Admin Auto-Login Demo Bar */}
          <div className="bg-red-50/80 border border-red-200 p-4 rounded-2xl space-y-2.5 shadow-sm">
            <div className="text-[11px] font-extrabold text-[#d70018] flex items-center justify-between">
              <span>⚡ TÀI KHOẢN ADMIN MẶC ĐỊNH HỆ THỐNG:</span>
              <span className="bg-[#d70018] text-white text-[10px] px-2.5 py-0.5 rounded-full font-black">QUẢN TRỊ VIÊN CẤP CAO</span>
            </div>
            <div className="text-xs font-mono bg-white p-3 rounded-xl border border-red-100 space-y-1 shadow-inner">
              <div className="flex justify-between"><span className="text-gray-500 font-semibold">Email Admin:</span> <strong className="text-[#d70018] font-bold">tandu@gmail.com</strong></div>
              <div className="flex justify-between"><span className="text-gray-500 font-semibold">Mật khẩu:</span> <strong className="text-slate-900 font-bold">123456</strong></div>
            </div>
            <button
              type="button"
              onClick={() => {
                const adminAccount = registeredUsers.find(u => u.email === 'tandu@gmail.com') || {
                  name: 'Lê Tấn Dư (Admin)',
                  email: 'tandu@gmail.com',
                  phone: '0368402970',
                  password: '123456',
                  role: 'admin',
                  memberTier: 'S-ELITE',
                  isLocked: false
                };
                setEmail('tandu@gmail.com');
                setPassword('123456');
                setIsSubmitting(true);
                setTimeout(() => {
                  setIsSubmitting(false);
                  onLoginSuccess(adminAccount);
                }, 300);
              }}
              className="w-full bg-[#d70018] hover:bg-[#be0015] text-white font-black py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>⚡ BẤM ĐĂNG NHẬP NHANH BẰNG ADMIN TẤN DƯ</span>
            </button>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl flex items-start space-x-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-[#d70018] shrink-0 mt-0.5" />
              <span className="font-semibold">{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Email / SĐT Quản Trị Viên *
              </label>
              <div className="relative">
                <input 
                  type="text"
                  required
                  placeholder="tandu@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none transition font-semibold"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Mật Khẩu Quản Trị *
              </label>
              <div className="relative">
                <input 
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none transition font-semibold"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#d70018] to-red-600 hover:from-red-600 hover:to-red-700 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-red-600/20 transition flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Đang xác thực Admin...</span>
                </>
              ) : (
                <>
                  <span>ĐĂNG NHẬP TRANG QUẢN TRỊ</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Info Box */}
          <div className="pt-2 text-center text-[11px] text-gray-500 border-t border-gray-100 space-y-2">
            <p>🔒 Mọi hành động đăng nhập Admin đều được ghi lại trong hệ thống nhật ký bảo mật.</p>
          </div>
        </div>

        {/* Back to Customer Storefront Button */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onBackToStore}
            className="text-xs font-bold text-gray-600 hover:text-[#d70018] transition flex items-center justify-center space-x-2 mx-auto bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#d70018]" />
            <span>Quay về Cửa Hàng Bán Hàng</span>
          </button>
        </div>

      </div>
    </div>
  );
}
