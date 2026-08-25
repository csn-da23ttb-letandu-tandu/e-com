import React, { useState } from 'react';
import { X, Smartphone, ShieldCheck, Zap, Lock, Mail, User, Phone, Calendar, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onLoginSuccess, 
  registeredUsers = [], 
  onRegisterUser,
  initialAdminMode = false
}) {
  const [loginType, setLoginType] = useState(() => initialAdminMode ? 'admin' : 'customer');
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Sync initialAdminMode when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setLoginType(initialAdminMode ? 'admin' : 'customer');
      setIsRegister(false);
      setErrorMessage('');
    }
  }, [isOpen, initialAdminMode]);

  // Convenient 3-Dropdown Birthday State
  const [dobDay, setDobDay] = useState('15');
  const [dobMonth, setDobMonth] = useState('08');
  const [dobYear, setDobYear] = useState('1995');

  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingFacebook, setIsLoadingFacebook] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Generate day, month, year options
  const daysOptions = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const monthsOptions = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const currentYear = new Date().getFullYear();
  const yearsOptions = Array.from({ length: 75 }, (_, i) => String(currentYear - 10 - i));

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanName = fullName.trim();
    const cleanDob = `${dobDay}/${dobMonth}/${dobYear}`;

    // Common Email Format Check
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // ==========================================
    // CASE 1: LOGGING IN (ĐĂNG NHẬP)
    // ==========================================
    if (!isRegister) {
      if (!emailRegex.test(cleanEmail) && !/^\d{10}$/.test(cleanEmail)) {
        setErrorMessage('Vui lòng nhập Email chuẩn (VD: tandu@gmail.com) hoặc Số điện thoại 10 số');
        return;
      }

      if (password.length < 6) {
        setErrorMessage('Mật khẩu phải từ 6 ký tự trở lên.');
        return;
      }

      // Check if user exists in database
      const existingAccount = registeredUsers.find(
        u => u.email.toLowerCase() === cleanEmail || u.phone === cleanEmail
      );

      if (!existingAccount) {
        setErrorMessage('Tài khoản chưa được đăng ký trong hệ thống. Vui lòng kiểm tra lại!');
        return;
      }

      if (existingAccount.password !== password) {
        setErrorMessage('Mật khẩu đăng nhập không đúng. Vui lòng thử lại!');
        return;
      }

      // Check account lock
      if (existingAccount.isLocked) {
        setErrorMessage('Tài khoản này đang bị tạm khóa. Vui lòng liên hệ Quản trị viên hệ thống.');
        return;
      }

      // ENFORCE SEPARATION OF ADMIN VS CUSTOMER LOGINS
      if (loginType === 'admin' && existingAccount.role !== 'admin') {
        setErrorMessage('❌ TỪ CHỐI TRUY CẬP: Tài khoản này là Khách hàng, không có quyền đăng nhập Cổng Quản Trị Admin. Vui lòng chọn tab "Khách Hàng".');
        return;
      }

      // Valid account & matching password & matching portal
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onLoginSuccess(existingAccount);
        onClose();
      }, 400);
      return;
    }

    // ==========================================
    // CASE 2: REGISTERING (ĐĂNG KÝ MỚI)
    // ==========================================
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('Email không đúng định dạng. (Ví dụ chuẩn: tandu@gmail.com)');
      return;
    }

    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    if (!phoneRegex.test(cleanPhone)) {
      setErrorMessage('Số điện thoại không hợp lệ (Gồm 10 chữ số, ví dụ: 0368402970)');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Mật khẩu đăng ký tối thiểu phải từ 6 ký tự.');
      return;
    }

    // Check if Email or Phone is ALREADY registered
    const emailExists = registeredUsers.some(u => u.email.toLowerCase() === cleanEmail);
    if (emailExists) {
      setErrorMessage('Email này đã được đăng ký trước đó. Vui lòng nhấn "Đăng nhập ngay"!');
      return;
    }

    const phoneExists = registeredUsers.some(u => u.phone === cleanPhone);
    if (phoneExists) {
      setErrorMessage('Số điện thoại này đã được đăng ký trước đó. Vui lòng nhấn "Đăng nhập ngay"!');
      return;
    }

    // Valid Registration
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      const newUser = {
        name: cleanName || cleanEmail.split('@')[0],
        email: cleanEmail,
        phone: cleanPhone,
        dob: cleanDob,
        password: password,
        gender: 'Nam',
        memberTier: 'S-ELITE'
      };

      if (onRegisterUser) {
        onRegisterUser(newUser);
      }

      onLoginSuccess(newUser);
      onClose();
    }, 400);
  };

  const handleGoogleLogin = () => {
    setIsLoadingGoogle(true);
    setTimeout(() => {
      setIsLoadingGoogle(false);
      const googleUser = {
        name: 'Khách hàng Google',
        email: 'user.google@gmail.com',
        phone: '0368402970',
        dob: '15/08/1995',
        password: 'google_auth_pass',
        memberTier: 'S-ELITE'
      };
      if (onRegisterUser && !registeredUsers.some(u => u.email === googleUser.email)) {
        onRegisterUser(googleUser);
      }
      onLoginSuccess(googleUser);
      onClose();
    }, 600);
  };

  const handleFacebookLogin = () => {
    setIsLoadingFacebook(true);
    setTimeout(() => {
      setIsLoadingFacebook(false);
      const fbUser = {
        name: 'Khách hàng Facebook',
        email: 'user.facebook@gmail.com',
        phone: '0368402970',
        dob: '15/08/1995',
        password: 'fb_auth_pass',
        memberTier: 'S-ELITE'
      };
      if (onRegisterUser && !registeredUsers.some(u => u.email === fbUser.email)) {
        onRegisterUser(fbUser);
      }
      onLoginSuccess(fbUser);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-full flex flex-col md:flex-row relative border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Banner */}
        <div className="md:w-5/12 bg-gradient-to-br from-[#d70018] to-[#990011] text-white p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background circles */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

          <div>
            <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20">
              TGCN Member
            </div>
            <h3 className="text-2xl font-bold font-display leading-tight mb-4">
              Trải nghiệm công nghệ đỉnh cao
            </h3>
            <p className="text-red-100 text-xs leading-relaxed mb-6">
              Đăng nhập bằng tài khoản đã đăng ký để tích điểm VIP, nhận giảm giá Smember đến 500k.
            </p>

            <ul className="space-y-3 text-xs">
              <li className="flex items-center space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Zap className="w-3.5 h-3.5 text-yellow-300" />
                </div>
                <span>Giao hàng nhanh 2H</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-yellow-300" />
                </div>
                <span>Bảo hành chính hãng 12 tháng</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Smartphone className="w-3.5 h-3.5 text-yellow-300" />
                </div>
                <span>Ưu đãi Smember đến 500k</span>
              </li>
            </ul>
          </div>

          <div className="text-[11px] text-red-200 mt-8 pt-4 border-t border-white/10">
            © 2026 Thế Giới Công Nghệ Premium Electronics.
          </div>
        </div>

        {/* Right Form */}
        <div className="md:w-7/12 p-8 flex flex-col justify-center bg-white max-h-[90vh] overflow-y-auto">

          <div className="mb-4">
            <h4 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              {loginType === 'admin' ? (
                <>
                  <span className="bg-red-100 text-[#d70018] text-[10px] font-black px-2 py-0.5 rounded-md uppercase">ADMIN PORTAL</span>
                  <span>Đăng nhập Quản trị viên</span>
                </>
              ) : (
                isRegister ? 'Đăng ký tài khoản Khách hàng' : 'Đăng nhập Khách hàng'
              )}
            </h4>
            <p className="text-xs text-gray-500">
              {loginType === 'admin' 
                ? 'Dành riêng cho nhân sự Quản trị hệ thống. Nhập Email & Mật khẩu Admin.' 
                : isRegister ? 'Tạo tài khoản thành viên để mua sắm và tích điểm' : 'Chỉ dành cho tài khoản Khách hàng đã đăng ký'}
            </p>
          </div>

          {/* Validation Error Alert Box */}
          {errorMessage && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-start space-x-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {isRegister && (
              <>
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Họ và tên *</label>
                  <div className="relative">
                    <input 
                      type="text"
                      required
                      placeholder="Ví dụ: Lê Tấn Dư"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none"
                    />
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Số điện thoại * (10 số)</label>
                  <div className="relative">
                    <input 
                      type="tel"
                      required
                      placeholder="Ví dụ: 0368402970"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none"
                    />
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                {/* Convenient 3-Dropdown Birthday Selector (Ngày / Tháng / Năm) */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-[#d70018]" />
                    <span>Ngày tháng năm sinh *</span>
                  </label>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {/* Day Select */}
                    <div>
                      <select
                        value={dobDay}
                        onChange={(e) => setDobDay(e.target.value)}
                        className="w-full px-2 py-2 rounded-lg border border-gray-300 text-xs font-semibold focus:ring-2 focus:ring-[#d70018] outline-none bg-white cursor-pointer"
                      >
                        {daysOptions.map(d => (
                          <option key={d} value={d}>Ngày {d}</option>
                        ))}
                      </select>
                    </div>

                    {/* Month Select */}
                    <div>
                      <select
                        value={dobMonth}
                        onChange={(e) => setDobMonth(e.target.value)}
                        className="w-full px-2 py-2 rounded-lg border border-gray-300 text-xs font-semibold focus:ring-2 focus:ring-[#d70018] outline-none bg-white cursor-pointer"
                      >
                        {monthsOptions.map(m => (
                          <option key={m} value={m}>Tháng {m}</option>
                        ))}
                      </select>
                    </div>

                    {/* Year Select */}
                    <div>
                      <select
                        value={dobYear}
                        onChange={(e) => setDobYear(e.target.value)}
                        className="w-full px-2 py-2 rounded-lg border border-gray-300 text-xs font-semibold focus:ring-2 focus:ring-[#d70018] outline-none bg-white cursor-pointer"
                      >
                        {yearsOptions.map(y => (
                          <option key={y} value={y}>Năm {y}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {isRegister ? 'Email đăng ký *' : 'Email hoặc Số điện thoại đã đăng ký *'}
              </label>
              <div className="relative">
                <input 
                  type="text"
                  required
                  placeholder={isRegister ? "Ví dụ: tandu@gmail.com" : "Email hoặc SĐT đã đăng ký"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700">Mật khẩu *</label>
                {!isRegister && (
                  <a href="#" className="text-[11px] text-[#d70018] font-semibold hover:underline">
                    Quên mật khẩu?
                  </a>
                )}
              </div>
              <div className="relative">
                <input 
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#d70018] hover:bg-[#be0015] text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center space-x-2 mt-2 disabled:opacity-80"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang xác thực...</span>
                </>
              ) : (
                <>
                  <span>{isRegister ? 'ĐĂNG KÝ TÀI KHOẢN' : 'ĐĂNG NHẬP TÀI KHOẢN'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social Logins (Chỉ hiển thị cho Khách hàng) */}
          {loginType === 'customer' && (
            <div className="mt-4">
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-[11px] text-gray-400">hoặc đăng nhập bằng</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <button 
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoadingGoogle || isLoadingFacebook}
                  className="flex items-center justify-center space-x-2 py-2 px-3 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  {isLoadingGoogle ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#d70018]" />
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                  )}
                  <span>Google</span>
                </button>

                <button 
                  type="button"
                  onClick={handleFacebookLogin}
                  disabled={isLoadingGoogle || isLoadingFacebook}
                  className="flex items-center justify-center space-x-2 py-2 px-3 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  {isLoadingFacebook ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#1877F2]" />
                  ) : (
                    <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )}
                  <span>Facebook</span>
                </button>
              </div>
            </div>
          )}

          {loginType === 'customer' ? (
            <div className="mt-4 text-center text-xs text-gray-500">
              {isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}{' '}
              <button 
                type="button"
                onClick={() => {
                  setErrorMessage('');
                  setIsRegister(!isRegister);
                }}
                className="text-[#d70018] font-bold hover:underline"
              >
                {isRegister ? 'Đăng nhập ngay' : 'Đăng ký ngay'}
              </button>
            </div>
          ) : (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-center text-[11px] text-[#d70018] font-semibold">
              🔒 Tài khoản Quản trị viên chỉ do Admin hệ thống cấp trực tiếp, không hỗ trợ đăng ký tự do.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
