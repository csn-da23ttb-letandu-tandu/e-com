import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Package, FileText, Ticket, Users, Database,
  ExternalLink, LogOut, ShieldCheck, Bell, Search, Clock, ChevronRight, Menu, X, ArrowLeft, Image as ImageIcon
} from 'lucide-react';

export default function AdminPortalLayout({ 
  currentView, 
  setCurrentView, 
  user, 
  onLogout, 
  children 
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [timeString, setTimeString] = useState('');

  // Clock updating real-time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' - ' + now.toLocaleDateString('vi-VN'));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'admin-overview', label: '1. Tổng quan hệ thống', icon: LayoutDashboard, badge: 'Hot' },
    { id: 'admin-products', label: '2. Quản lý sản phẩm', icon: Package },
    { id: 'admin-banners', label: '3. Quản lý Banner Quảng cáo', icon: ImageIcon, badge: 'Mới' },
    { id: 'admin-news', label: '4. Quản lý tin tức', icon: FileText },
    { id: 'admin-coupons', label: '5. Quản lý Mã giảm giá', icon: Ticket },
    { id: 'admin-users', label: '6. Quản lý Khách hàng & Admin', icon: Users },
    { id: 'admin-database', label: '7. Quản lý Cơ sở dữ liệu', icon: Database, badge: 'CSDL' }
  ];

  const getPageTitle = () => {
    switch(currentView) {
      case 'admin-overview': return 'Tổng quan hệ thống';
      case 'admin-products': return 'Danh Mục & Quản Lý Sản Phẩm Kho';
      case 'admin-banners': return 'Quản Lý & Biên Tập Banner Quảng Cáo';
      case 'admin-news': return 'Biên Tập & Quản Lý Bài Viết Tin Tức';
      case 'admin-coupons': return 'Chương Trình Mã Giảm Giá & Voucher';
      case 'admin-users': return 'Quản Lý Tài Khoản Khách Hàng & Ban Admin';
      case 'admin-database': return 'Hệ Thống Quản Trị Cơ Sở Dữ Liệu';
      default: return 'Cổng Quản Trị Hệ Thống Admin';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center z-30 sticky top-0 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-[#d70018] text-white flex items-center justify-center font-black">
            ⚡
          </div>
          <span className="font-extrabold text-sm tracking-wide text-gray-900">CỔNG QUẢN TRỊ HỆ THỐNG</span>
        </div>

        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Left Sidebar Navigation (Phong cách Sáng Clean) */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 
        flex flex-col justify-between transition-transform duration-300 transform shadow-md
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          {/* Admin Portal Brand Header */}
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 via-[#d70018] to-red-700 text-white flex items-center justify-center font-extrabold shadow-md shadow-red-500/20 border border-white">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-black text-sm text-gray-900 tracking-wide font-display flex items-center gap-1.5">
                  <span>THẾ GIỚI CÔNG NGHỆ</span>
                  <span className="bg-[#d70018] text-white text-[9px] px-1.5 py-0.5 rounded font-mono font-bold">ADMIN</span>
                </div>
                <div className="text-[10px] text-gray-500 font-medium">Bảng Điều Hành Hệ Thống</div>
              </div>
            </div>
          </div>

          {/* Active Admin Profile Card */}
          <div className="p-4 mx-3 my-4 bg-slate-50 rounded-2xl border border-gray-200 flex items-center space-x-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#d70018] text-white flex items-center justify-center font-extrabold text-sm shadow">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-extrabold text-xs text-gray-900 truncate">{user?.name || 'Lê Tấn Dư'}</div>
              <div className="text-[10px] text-[#d70018] font-bold uppercase tracking-wider">Quản Trị Viên</div>
            </div>
          </div>

          {/* Navigation Links List */}
          <div className="px-3 space-y-1">
            <div className="px-3 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
              DANH MỤC QUẢN TRỊ
            </div>

            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group cursor-pointer
                    ${isActive 
                      ? 'bg-gradient-to-r from-[#d70018] to-red-600 text-white shadow-md shadow-red-500/20' 
                      : 'text-gray-700 hover:bg-slate-100 hover:text-[#d70018]'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-[#d70018]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase ${
                      isActive ? 'bg-white/20 text-white' : 'bg-red-100 text-[#d70018]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          {/* Switch to Storefront */}
          <button
            onClick={() => setCurrentView('catalog')}
            className="w-full py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs transition flex items-center justify-center space-x-2 border border-gray-300 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-600" />
            <span>Quay về Cửa Hàng</span>
          </button>

          {/* Logout Admin */}
          <button
            onClick={onLogout}
            className="w-full py-2.5 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-[#d70018] font-bold text-xs transition flex items-center justify-center space-x-2 border border-red-200 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất Admin</span>
          </button>

          <div className="text-[10px] text-center text-gray-400 pt-2">
            © 2026 Admin Portal v2.5
          </div>
        </div>
      </aside>

      {/* Right Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-100">
        
        {/* Topbar Header */}
        <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 z-20 shadow-sm">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 font-display flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-[#d70018]" />
              <span>{getPageTitle()}</span>
            </h1>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center space-x-2 font-medium">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>{timeString}</span>
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* System Status Pill */}
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-1.5 rounded-xl font-semibold flex items-center space-x-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block"></span>
              <span>Hệ Thống Hoạt Động Ổn Định</span>
            </div>

            {/* Quick Switch to Shop */}
            <button
              onClick={() => setCurrentView('catalog')}
              className="bg-[#d70018] hover:bg-red-700 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 shadow transition cursor-pointer"
              title="Mở giao diện Cửa Hàng Bán Hàng"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Xem Cửa Hàng</span>
            </button>
          </div>
        </header>

        {/* Dynamic View Content Box */}
        <div className="p-4 sm:p-6 flex-1 overflow-x-hidden text-gray-900 bg-[#f4f5f7]">
          {children}
        </div>

      </main>

    </div>
  );
}
