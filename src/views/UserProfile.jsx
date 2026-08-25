import React, { useState, useEffect, useMemo } from 'react';
import { 
  User, Package, Gift, MapPin, LogOut, Plus, Edit3, Trash2, X, Check, ShieldCheck, Heart, ShoppingCart
} from 'lucide-react';
import { MOCK_USER_PROFILE } from '../data/mockData';

export default function UserProfile({ 
  orders = [], 
  user, 
  onLogout, 
  onOpenAuth,
  wishlist = [],
  products = [],
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onUpdateUserProfile,
  onNavigateAdmin
}) {
  const [activeTab, setActiveTab] = useState('info'); // 'info', 'orders', 'vouchers', 'address', 'wishlist'
  const [suggestedVoucherModal, setSuggestedVoucherModal] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const [profileData, setProfileData] = useState({
    name: user?.name || 'Lê Tấn Dư',
    phone: user?.phone || '0368402970',
    email: user?.email || 'tandu@gmail.com',
    dob: user?.dob || '05/02/2005',
    gender: user?.gender || 'Nam'
  });

  const [addresses, setAddresses] = useState([
    { id: 1, name: user?.name || 'Lê Tấn Dư', phone: user?.phone || '0368402970', address: 'Số 123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, Hồ Chí Minh', isDefault: true }
  ]);

  const [addressFormData, setAddressFormData] = useState({
    name: '', phone: '', address: '', isDefault: false
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || 'Lê Tấn Dư',
        phone: user.phone || '0368402970',
        email: user.email || 'tandu@gmail.com',
        dob: user.dob || '05/02/2005',
        gender: user.gender || 'Nam'
      });
    }
  }, [user]);

  // Calculate real customer metrics based on logged-in user email
  const customerOrders = useMemo(() => {
    if (!user?.email) return [];
    return orders.filter(o => (o.email || '').toLowerCase() === user.email.toLowerCase());
  }, [orders, user]);

  const totalSpentNumber = useMemo(() => {
    const calculated = customerOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    return calculated > 0 ? calculated : 4200000;
  }, [customerOrders]);

  const totalSpentFormatted = useMemo(() => {
    if (totalSpentNumber >= 1000000) {
      return `${(totalSpentNumber / 1000000).toFixed(1)}M`;
    }
    if (totalSpentNumber > 0) {
      return `${(totalSpentNumber / 1000).toFixed(0)}K`;
    }
    return '4.2M';
  }, [totalSpentNumber]);

  const points = useMemo(() => {
    const calcPoints = Math.floor(totalSpentNumber / 200000);
    return calcPoints > 0 ? calcPoints : 12;
  }, [totalSpentNumber]);

  const memberTier = user?.memberTier || 'S-ELITE';

  const rankDiscount = useMemo(() => {
    if (memberTier === 'S-ELITE' || memberTier === 'S-CLASS') return '08%';
    if (memberTier === 'S-VIP') return '05%';
    return '03%';
  }, [memberTier]);

  const suggestedProductsForVoucher = useMemo(() => {
    if (!suggestedVoucherModal) return [];
    return products.filter(p => {
      const matchMinSpend = p.price >= (suggestedVoucherModal.minSpend || 0);
      const matchCategory = !suggestedVoucherModal.category || p.category === suggestedVoucherModal.category;
      return matchMinSpend && matchCategory;
    }).slice(0, 6);
  }, [products, suggestedVoucherModal]);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-50 text-[#d70018] flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Bạn chưa đăng nhập</h2>
        <p className="text-xs text-gray-500">
          Vui lòng đăng nhập hoặc đăng ký tài khoản để xem thông tin cá nhân, lịch sử đơn hàng và nhận ưu đãi Smember.
        </p>
        <button
          onClick={onOpenAuth}
          className="bg-[#d70018] hover:bg-[#be0015] text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-md"
        >
          Đăng nhập / Đăng ký ngay
        </button>
      </div>
    );
  }

  // GIAO DIỆN HỒ SƠ DÀNH RIÊNG CHO TÀI KHOẢN ADMIN
  if (user?.role === 'admin') {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8 animate-in fade-in">
        
        {/* Admin Banner Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 text-white rounded-3xl p-8 shadow-xl border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <ShieldCheck className="w-48 h-48 text-white" />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-[#d70018] text-white flex items-center justify-center font-extrabold text-2xl shadow-lg border border-white/20">
                {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-extrabold font-display">{user.name}</h1>
                  <span className="bg-red-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                    SYSTEM ADMIN
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 flex items-center gap-3">
                  <span>Email: {user.email}</span>
                  <span>•</span>
                  <span>SĐT: {user.phone || '0368402970'}</span>
                </p>
                <div className="mt-2 text-[11px] text-red-300 font-semibold flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                  <span>Tài khoản Quản trị hệ thống chuyên biệt - Toàn quyền điều hành Admin Portal</span>
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 shrink-0"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Đăng xuất Admin</span>
            </button>
          </div>
        </div>

        {/* Quick Admin Tools Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900 font-display flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#d70018]" />
            <span>Công Cụ Điều Hành Quản Trị Viên</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div 
              onClick={() => onNavigateAdmin && onNavigateAdmin('admin-overview')}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:border-[#d70018] hover:shadow-md transition cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#d70018] flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-gray-900 group-hover:text-[#d70018]">1. Tổng Quan Hệ Thống</h3>
              <p className="text-xs text-gray-500 mt-1">Xem thống kê doanh thu, đơn hàng & biểu đồ kinh doanh.</p>
            </div>

            <div 
              onClick={() => onNavigateAdmin && onNavigateAdmin('admin-products')}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:border-[#d70018] hover:shadow-md transition cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-gray-900 group-hover:text-[#d70018]">2. Quản Lý Sản Phẩm</h3>
              <p className="text-xs text-gray-500 mt-1">Thêm sản phẩm mới, cập nhật giá, tồn kho & ảnh sản phẩm.</p>
            </div>

            <div 
              onClick={() => onNavigateAdmin && onNavigateAdmin('admin-users')}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:border-[#d70018] hover:shadow-md transition cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                <User className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-gray-900 group-hover:text-[#d70018]">3. Quản Lý Khách Hàng & Admin</h3>
              <p className="text-xs text-gray-500 mt-1">Phân quyền vai trò, mở/khóa tài khoản và cấp Admin mới.</p>
            </div>
          </div>
        </div>

      </div>
    );
  }

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (onUpdateUserProfile) {
      onUpdateUserProfile(profileData);
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleOpenAddAddress = () => {
    setEditingAddress(null);
    setAddressFormData({ name: profileData.name, phone: profileData.phone, address: '', isDefault: false });
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddress = (item) => {
    setEditingAddress(item);
    setAddressFormData({ name: item.name, phone: item.phone, address: item.address, isDefault: item.isDefault });
    setIsAddressModalOpen(true);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const handleSaveAddressSubmit = (e) => {
    e.preventDefault();
    if (editingAddress) {
      const updated = addresses.map(a => a.id === editingAddress.id ? { ...a, ...addressFormData } : a);
      setAddresses(updated);
    } else {
      const newAddr = { id: Date.now(), ...addressFormData };
      if (addressFormData.isDefault || addresses.length === 0) {
        const resetDefault = addresses.map(a => ({ ...a, isDefault: false }));
        setAddresses([...resetDefault, newAddr]);
      } else {
        setAddresses([...addresses, newAddr]);
      }
    }
    setIsAddressModalOpen(false);
  };

  const favoriteProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      
      {/* Page Title */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h1 className="text-xl font-extrabold text-gray-900 font-display">
          Tài khoản cá nhân - Thành viên VIP
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar Menu (3 cols - Design #2) */}
        <aside className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm h-fit space-y-2">
          {[
            { id: 'info', label: 'Thông tin cá nhân', icon: User },
            { id: 'orders', label: `Lịch sử đơn hàng (${customerOrders.length})`, icon: Package },
            { id: 'wishlist', label: `Sản phẩm yêu thích (${favoriteProducts.length})`, icon: Heart },
            { id: 'vouchers', label: 'Ưu đãi của tôi', icon: Gift },
            { id: 'address', label: 'Địa chỉ đã lưu', icon: MapPin }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition ${
                  isActive 
                    ? 'bg-red-50 text-[#d70018] border border-red-200' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#d70018]' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}

          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition border-t border-gray-100 mt-4"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất</span>
          </button>
        </aside>

        {/* Right Main Content Area (9 cols - Design #2) */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Top Member Card (Smember S-ELITE Banner) */}
          <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-900 rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-slate-900 text-yellow-400 font-extrabold text-xl flex items-center justify-center border-2 border-yellow-300 shadow">
                {profileData.name ? profileData.name.charAt(0).toUpperCase() : 'L'}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-black">{profileData.name}</h2>
                  <span className="bg-slate-900 text-yellow-400 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full border border-yellow-400">
                    {memberTier}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">Thành viên từ 2022</p>
              </div>
            </div>

            {/* Stat Counter Cards Grid */}
            <div className="grid grid-cols-4 gap-3 text-center w-full md:w-auto">
              <div className="bg-white/80 backdrop-blur px-4 py-2.5 rounded-xl border border-white/50">
                <div className="text-lg font-black text-slate-900">{points}</div>
                <div className="text-[10px] font-bold text-slate-600">ĐIỂM TÍCH LŨY</div>
              </div>
              <div className="bg-white/80 backdrop-blur px-4 py-2.5 rounded-xl border border-white/50">
                <div className="text-lg font-black text-[#d70018]">{totalSpentFormatted}</div>
                <div className="text-[10px] font-bold text-slate-600">TỔNG CHI TIÊU</div>
              </div>
              <div className="bg-white/80 backdrop-blur px-4 py-2.5 rounded-xl border border-white/50">
                <div className="text-lg font-black text-slate-900">1250</div>
                <div className="text-[10px] font-bold text-slate-600">ĐIỂM THƯỞNG</div>
              </div>
              <div className="bg-white/80 backdrop-blur px-4 py-2.5 rounded-xl border border-white/50">
                <div className="text-lg font-black text-slate-900">{rankDiscount}</div>
                <div className="text-[10px] font-bold text-slate-600">GIẢM HẠNG VIP</div>
              </div>
            </div>
          </div>

          {/* TAB 1: Thông tin cá nhân */}
          {activeTab === 'info' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
              <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-gray-900">Thông tin tài khoản</h3>
                {saveSuccess && (
                  <span className="text-xs text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full border border-green-200">
                    ✓ Cập nhật thành công!
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Họ và tên</label>
                    <input 
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Số điện thoại</label>
                    <input 
                      type="text"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                    <input 
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Ngày sinh</label>
                    <input 
                      type="text"
                      value={profileData.dob}
                      onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Gender Radio options */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Giới tính</label>
                  <div className="flex space-x-6 text-xs">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="gender" 
                        checked={profileData.gender === 'Nam'} 
                        onChange={() => setProfileData({ ...profileData, gender: 'Nam' })}
                        className="accent-[#d70018]" 
                      />
                      <span>Nam</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="gender" 
                        checked={profileData.gender === 'Nữ'} 
                        onChange={() => setProfileData({ ...profileData, gender: 'Nữ' })}
                        className="accent-[#d70018]" 
                      />
                      <span>Nữ</span>
                    </label>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="bg-[#d70018] hover:bg-[#be0015] text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-md"
                >
                  Lưu thay đổi
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: Lịch sử đơn hàng */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-gray-900 border-b border-gray-100 pb-3">
                Lịch sử mua hàng ({orders.length})
              </h3>

              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-2xl p-4 space-y-3 bg-gray-50/50">
                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-gray-900">{order.id}</span>
                        <span className="text-gray-400 ml-2">({order.time})</span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        order.status === 'Đã giao' || order.status === 'Hoàn thành' ? 'bg-green-100 text-green-700' :
                        order.status === 'Đang xử lý' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Đang giao' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="divide-y divide-gray-100 text-xs">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="py-2 flex justify-between">
                          <span className="font-semibold text-gray-800">{it.name} (x{it.quantity})</span>
                          <span className="font-bold text-gray-900">{it.price.toLocaleString('vi-VN')}đ</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-xs">
                      <span className="text-gray-500">Tổng thanh toán:</span>
                      <span className="font-extrabold text-sm text-[#d70018]">
                        {order.total.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Ưu đãi của tôi */}
          {activeTab === 'vouchers' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-gray-900 border-b border-gray-100 pb-3">
                Ưu đãi & Voucher Smember của bạn
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { 
                    code: 'SMEMBER', 
                    title: 'Giảm 5% cho tất cả thiết bị', 
                    sub: 'Hạn dùng: 31/12/2026', 
                    minSpend: 0, 
                    discountType: '5%',
                    bg: 'border-red-200 bg-red-50/60',
                    badgeBg: 'bg-[#d70018]',
                    btnBg: 'bg-[#d70018]'
                  },
                  { 
                    code: 'TGCN500', 
                    title: 'Voucher giảm trực tiếp 500k', 
                    sub: 'Cho đơn hàng từ 10 Triệu', 
                    minSpend: 10000000, 
                    discountType: '500.000đ',
                    bg: 'border-amber-200 bg-amber-50/60',
                    badgeBg: 'bg-amber-600',
                    btnBg: 'bg-slate-900'
                  },
                  { 
                    code: 'LAPTOPAI1K', 
                    title: 'Trợ giá Laptop AI & MacBook 1 Triệu', 
                    sub: 'Áp dụng cho danh mục Laptop', 
                    minSpend: 15000000, 
                    discountType: '1.000.000đ',
                    category: 'Laptops',
                    bg: 'border-blue-200 bg-blue-50/60',
                    badgeBg: 'bg-blue-600',
                    btnBg: 'bg-blue-600'
                  },
                  { 
                    code: 'AUDIOVIP20', 
                    title: 'Giảm 20% Tai nghe & Loa Bluetooth', 
                    sub: 'Áp dụng cho danh mục Âm thanh', 
                    minSpend: 2000000, 
                    discountType: '20%',
                    category: 'Audio',
                    bg: 'border-purple-200 bg-purple-50/60',
                    badgeBg: 'bg-purple-600',
                    btnBg: 'bg-purple-600'
                  }
                ].map(v => (
                  <div key={v.code} className={`border ${v.bg} rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow transition`}>
                    <div>
                      <span className={`${v.badgeBg} text-white font-extrabold text-[10px] px-2 py-0.5 rounded`}>MÃ: {v.code}</span>
                      <h4 className="font-bold text-xs text-gray-900 mt-1">{v.title}</h4>
                      <p className="text-[10px] text-gray-500">{v.sub}</p>
                    </div>
                    <button 
                      onClick={() => setSuggestedVoucherModal(v)}
                      className={`${v.btnBg} hover:opacity-90 text-white text-xs font-extrabold px-3.5 py-2 rounded-xl shadow transition flex items-center space-x-1`}
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>Dùng ngay</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Địa chỉ đã lưu (CRUD Cập nhật địa chỉ) */}
          {activeTab === 'address' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <h3 className="font-extrabold text-sm text-gray-900">
                  Địa chỉ giao hàng đã lưu ({addresses.length})
                </h3>
                <button
                  onClick={handleOpenAddAddress}
                  className="flex items-center space-x-1.5 bg-[#d70018] hover:bg-[#be0015] text-white font-bold px-3.5 py-1.5 rounded-xl text-xs shadow transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Thêm địa chỉ mới</span>
                </button>
              </div>

              {addresses.length === 0 ? (
                <div className="text-center py-8 text-xs text-gray-500">
                  Bạn chưa có địa chỉ giao hàng nào. Vui lòng nhấn "+ Thêm địa chỉ mới" để tạo.
                </div>
              ) : (
                <div className="space-y-3">
                  {addresses.map((item) => (
                    <div 
                      key={item.id}
                      className="border border-gray-200 rounded-2xl p-4 space-y-2 text-xs bg-white hover:border-red-200 transition shadow-sm relative"
                    >
                      <div className="flex justify-between items-start">
                        <div className="font-bold text-gray-900 text-sm flex items-center space-x-2">
                          <span>{item.name} ({item.phone})</span>
                          {item.isDefault && (
                            <span className="text-[#d70018] bg-red-50 border border-red-200 px-2 py-0.5 rounded text-[10px]">
                              Mặc định
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleOpenEditAddress(item)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded font-semibold flex items-center space-x-1"
                            title="Chỉnh sửa"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Sửa</span>
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(item.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded font-semibold flex items-center space-x-1"
                            title="Xóa"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Xóa</span>
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-600 font-medium leading-relaxed">
                        {item.address}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Wishlist Tab Content */}
          {activeTab === 'wishlist' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#d70018] fill-[#d70018]" />
                    <span>Danh sách sản phẩm yêu thích</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Các sản phẩm bạn đã bấm thả tim lưu lại</p>
                </div>
                <span className="bg-red-50 text-[#d70018] border border-red-200 text-xs font-bold px-3 py-1 rounded-full">
                  {favoriteProducts.length} sản phẩm
                </span>
              </div>

              {favoriteProducts.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto stroke-[1.5]" />
                  <p className="text-xs text-gray-500 font-medium">Bạn chưa lưu sản phẩm yêu thích nào.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {favoriteProducts.map(product => (
                    <div 
                      key={product.id}
                      className="border border-gray-200 rounded-2xl p-4 flex flex-col justify-between relative bg-white hover:shadow-md transition group"
                    >
                      <button 
                        onClick={() => onToggleWishlist && onToggleWishlist(product.id)}
                        className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition z-10"
                        title="Xóa khỏi yêu thích"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div 
                        onClick={() => onSelectProduct && onSelectProduct(product)}
                        className="cursor-pointer space-y-3"
                      >
                        <div className="w-full h-36 bg-gray-50 rounded-xl p-2 flex items-center justify-center">
                          <img src={product.images[0]} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition" />
                        </div>
                        <h4 className="font-bold text-xs text-gray-900 line-clamp-2 hover:text-[#d70018]">{product.name}</h4>
                        <div className="font-extrabold text-sm text-[#d70018]">{product.price.toLocaleString('vi-VN')}đ</div>
                      </div>

                      <button 
                        onClick={() => onAddToCart && onAddToCart(product)}
                        className="mt-3 w-full bg-[#d70018] hover:bg-[#be0015] text-white text-xs font-bold py-2 rounded-xl transition flex items-center justify-center space-x-1"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Thêm vào giỏ</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* Add / Edit Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full p-6 relative border border-gray-100 space-y-4 animate-in fade-in zoom-in-95">
            <button 
              onClick={() => setIsAddressModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-extrabold text-base text-gray-900 border-b border-gray-100 pb-3">
              {editingAddress ? 'Chỉnh sửa địa chỉ giao hàng' : 'Thêm địa chỉ giao hàng mới'}
            </h3>

            <form onSubmit={handleSaveAddressSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Họ và tên người nhận *</label>
                <input 
                  type="text"
                  required
                  value={addressFormData.name}
                  onChange={(e) => setAddressFormData({ ...addressFormData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d70018] outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Số điện thoại người nhận *</label>
                <input 
                  type="text"
                  required
                  value={addressFormData.phone}
                  onChange={(e) => setAddressFormData({ ...addressFormData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d70018] outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Địa chỉ chi tiết (Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành) *</label>
                <textarea 
                  rows="3"
                  required
                  placeholder="Ví dụ: Số 123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, Hồ Chí Minh"
                  value={addressFormData.address}
                  onChange={(e) => setAddressFormData({ ...addressFormData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d70018] outline-none"
                ></textarea>
              </div>

              <label className="flex items-center space-x-2 cursor-pointer font-semibold text-gray-700">
                <input 
                  type="checkbox"
                  checked={addressFormData.isDefault}
                  onChange={(e) => setAddressFormData({ ...addressFormData, isDefault: e.target.checked })}
                  className="accent-[#d70018] w-4 h-4 rounded"
                />
                <span>Đặt làm địa chỉ giao hàng mặc định</span>
              </label>

              <button 
                type="submit"
                className="w-full bg-[#d70018] hover:bg-[#be0015] text-white font-bold py-3 rounded-xl uppercase tracking-wider transition shadow-md"
              >
                {editingAddress ? 'LƯU CẬP NHẬT' : 'THÊM ĐỊA CHỈ MỚI'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Voucher Product Suggestion Modal */}
      {suggestedVoucherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 relative border border-gray-100 shadow-2xl space-y-5">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-red-50 text-[#d70018] rounded-xl">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-900 font-display">
                    Gợi Ý Sản Phẩm Áp Dụng Mã {suggestedVoucherModal.code}
                  </h3>
                  <p className="text-xs text-gray-500">{suggestedVoucherModal.title}</p>
                </div>
              </div>

              <button 
                onClick={() => setSuggestedVoucherModal(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-3.5 rounded-2xl border border-red-200 text-xs flex items-center justify-between">
              <div className="font-bold text-[#d70018]">
                🎁 Ưu đãi áp dụng: {suggestedVoucherModal.discountType} khi mua các sản phẩm dưới đây!
              </div>
              <span className="text-[10px] bg-[#d70018] text-white font-extrabold px-2.5 py-0.5 rounded-full">
                MÃ: {suggestedVoucherModal.code}
              </span>
            </div>

            {/* Suggested Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suggestedProductsForVoucher.map(product => {
                const discountAmount = suggestedVoucherModal.discountType.includes('%')
                  ? (product.price * parseFloat(suggestedVoucherModal.discountType) / 100)
                  : 500000;
                const estimatedPrice = Math.max(0, product.price - discountAmount);

                return (
                  <div key={product.id} className="border border-gray-200 rounded-2xl p-4 flex flex-col justify-between bg-white hover:border-red-300 hover:shadow-md transition group">
                    <div 
                      onClick={() => {
                        setSuggestedVoucherModal(null);
                        onSelectProduct && onSelectProduct(product);
                      }}
                      className="cursor-pointer space-y-2"
                    >
                      <div className="w-full h-36 bg-gray-50 rounded-xl p-2 flex items-center justify-center">
                        <img src={product.images[0]} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition" />
                      </div>
                      <h4 className="font-bold text-xs text-gray-900 line-clamp-2 group-hover:text-[#d70018]">{product.name}</h4>
                      
                      <div className="space-y-0.5">
                        <div className="text-[10px] text-gray-400 line-through">{product.price.toLocaleString('vi-VN')}đ</div>
                        <div className="font-black text-sm text-[#d70018] flex items-center justify-between">
                          <span>{estimatedPrice.toLocaleString('vi-VN')}đ</span>
                          <span className="text-[10px] bg-red-100 text-[#d70018] font-bold px-1.5 py-0.5 rounded">
                            Giảm ~{(discountAmount / 1000).toFixed(0)}K
                          </span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        onAddToCart && onAddToCart(product);
                        setSuggestedVoucherModal(null);
                      }}
                      className="mt-3 w-full bg-[#d70018] hover:bg-[#be0015] text-white text-xs font-extrabold py-2 rounded-xl transition flex items-center justify-center space-x-1.5 shadow"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Thêm vào giỏ & Dùng mã</span>
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
