import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, ShoppingCart, User, Smartphone, Laptop, Headphones, 
  Watch, Tablet, ShieldCheck, MapPin, Truck, LayoutDashboard, Store,
  ChevronDown, X, Menu, Sparkles, Check, Building2, Scale, Gift, Heart, Moon, Sun, Ticket
} from 'lucide-react';
import { smartMatchProduct } from '../utils/searchUtils';
import { REGIONS_WITH_STORES } from '../utils/locationData';

export default function Header({ 
  currentView, 
  setCurrentView, 
  cartCount, 
  user, 
  onOpenAuth,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  products = [],
  onSelectProduct,
  compareCount = 0,
  onOpenCompareModal,
  onOpenLuckyWheel,
  wishlistCount = 0,
  onOpenWishlist,
  isDarkMode = false,
  setIsDarkMode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef(null);

  // Store Location State
  const [selectedRegion, setSelectedRegion] = useState(() => {
    return localStorage.getItem('techzone_selected_region') || 'TP Hồ Chí Minh';
  });
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const regionsList = REGIONS_WITH_STORES;

  const categories = [
    { id: 'All', name: 'Tất cả', icon: Store },
    { id: 'Smartphones', name: 'Điện thoại', icon: Smartphone },
    { id: 'Laptops', name: 'Laptop', icon: Laptop },
    { id: 'Tablets', name: 'Máy tính bảng', icon: Tablet },
    { id: 'Audio', name: 'Tai nghe & Loa', icon: Headphones },
    { id: 'Accessories', name: 'Phụ kiện', icon: Watch }
  ];

  // Smart suggestions matching query
  const suggestions = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length === 0) return [];
    return products.filter(p => smartMatchProduct(p, searchQuery)).slice(0, 5);
  }, [products, searchQuery]);

  // Filter regions matching search input in location modal
  const filteredRegions = useMemo(() => {
    if (!locationSearch.trim()) return regionsList;
    return regionsList.filter(r => r.name.toLowerCase().includes(locationSearch.toLowerCase()));
  }, [locationSearch]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectRegion = (regionName) => {
    setSelectedRegion(regionName);
    localStorage.setItem('techzone_selected_region', regionName);
    setIsLocationModalOpen(false);
    
    // Show toast confirmation
    setToastMessage(`Đã cập nhật khu vực xem giá & kho hàng: ${regionName}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
      
      {/* Location Toast Notification */}
      {toastMessage && (
        <div className="bg-[#111] text-yellow-400 text-xs py-2 px-4 text-center font-bold border-b border-yellow-400/30 flex items-center justify-center space-x-2 animate-in slide-in-from-top duration-300 z-50">
          <Check className="w-4 h-4 text-green-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Announcement */}
      <div className="bg-[#111] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Truck className="w-3.5 h-3.5 text-green-400" />
              <span>Giao hàng hỏa tốc 2H</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Hotline: <strong className="text-yellow-400">1800.2097</strong></span>
            
            {/* Mode Switcher Button (Only visible for Admin accounts) */}
            {user?.role === 'admin' && (
              <button 
                onClick={() => setCurrentView(currentView.startsWith('admin') ? 'catalog' : 'admin-overview')}
                className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#d70018] hover:bg-[#be0015] text-white transition-all shadow-sm"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>{currentView.startsWith('admin') ? 'Chuyển Cửa Hàng' : 'Vào Trang Quản Trị'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-[#d70018] text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo Brand with Red Lightning Emblem */}
          <div 
            onClick={() => setCurrentView('catalog')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            {/* Red Lightning Bolt Emblem */}
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 via-[#d70018] to-red-800 p-2 flex items-center justify-center shadow-lg shadow-red-950/40 group-hover:scale-105 transition-transform duration-300 border border-white/20">
              <svg className="w-6 h-6 text-white fill-current drop-shadow" viewBox="0 0 24 24">
                <path d="M13 2L3 14h7v8l10-12h-7L13 2z" />
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="bg-white text-[#d70018] font-black text-sm sm:text-base px-2.5 py-0.5 rounded-xl font-display tracking-tight group-hover:bg-red-50 transition-colors flex items-center space-x-1 shadow-md border border-red-100">
                <span className="text-[#d70018]">THẾ GIỚI</span>
                <span className="text-gray-900 font-extrabold">CÔNG NGHỆ</span>
              </div>
              <span className="text-[9px] text-red-100 font-bold tracking-widest uppercase pl-1 opacity-90 hidden sm:inline-block">
                ⚡ HỆ THỐNG BÁN LẺ ĐIỆN THOẠI & LAPTOP
              </span>
            </div>
          </div>

          {/* Smart Search Bar with Instant Suggestions */}
          <div ref={searchContainerRef} className="flex-1 max-w-2xl relative">
            <div className="relative flex items-center">
              <input 
                type="text"
                placeholder="Bạn cần tìm gì? (Thử gõ: dien thoai, tai nghe, chong on, gaming, macbook...)"
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                  if (currentView !== 'catalog' && !currentView.startsWith('admin')) {
                    setCurrentView('catalog');
                  }
                }}
                className="w-full pl-10 pr-10 py-2 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400 shadow-inner"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Smart Suggestions Dropdown */}
            {showSuggestions && searchQuery.trim() !== '' && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 text-gray-900 divide-y divide-gray-100 animate-in fade-in zoom-in-95">
                <div className="bg-gray-50 px-4 py-2 text-[11px] font-bold text-gray-500 uppercase flex items-center justify-between">
                  <span className="flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#d70018]" />
                    <span>Gợi ý tìm kiếm thông minh ({suggestions.length})</span>
                  </span>
                  <span className="text-[10px] text-gray-400 font-normal">Nhấn để xem chi tiết</span>
                </div>

                {suggestions.length === 0 ? (
                  <div className="p-4 text-center text-xs text-gray-500">
                    Không tìm thấy sản phẩm nào liên quan đến <strong>"{searchQuery}"</strong>
                  </div>
                ) : (
                  <div>
                    {suggestions.map(prod => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          setShowSuggestions(false);
                          if (onSelectProduct) onSelectProduct(prod);
                        }}
                        className="p-3 hover:bg-red-50/60 transition cursor-pointer flex items-center space-x-3 group"
                      >
                        <div className="w-10 h-10 bg-gray-50 rounded-lg p-1 border border-gray-100 shrink-0 overflow-hidden flex items-center justify-center">
                          <img 
                            src={prod.images?.[0] || prod.image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80'} 
                            alt="" 
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80';
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-xs group-hover:text-[#d70018] transition line-clamp-1">
                            {prod.name}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            {prod.brand} • {prod.category}
                          </div>
                        </div>
                        <div className="font-extrabold text-xs text-[#d70018]">
                          {prod.price.toLocaleString('vi-VN')}đ
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4 text-xs font-medium">
            
            {/* Store Location Selector Button */}
            <button 
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden lg:flex items-center space-x-1.5 bg-red-800/60 hover:bg-red-800 px-3 py-1.5 rounded-lg cursor-pointer transition active:scale-95 border border-red-700/60 shadow-sm"
              title="Nhấn để chọn Tỉnh / Thành phố xem giá"
            >
              <MapPin className="w-4 h-4 text-yellow-300 shrink-0 animate-bounce" />
              <div className="text-left leading-tight">
                <div className="text-[10px] text-red-200">Xem giá tại</div>
                <div className="font-semibold text-white flex items-center space-x-1">
                  <span>{selectedRegion}</span>
                  <ChevronDown className="w-3 h-3 text-red-200" />
                </div>
              </div>
            </button>

            {/* Lucky Wheel Minigame Button */}
            <button
              onClick={onOpenLuckyWheel}
              className="flex items-center space-x-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 px-2.5 py-1.5 rounded-lg transition font-bold shadow-md animate-pulse"
              title="Săn Voucher Giảm Giá"
            >
              <Gift className="w-4 h-4 text-red-600" />
              <span className="hidden xl:inline text-xs">Vòng Quay</span>
            </button>

            {/* Product Compare Button */}
            <button
              onClick={onOpenCompareModal}
              className="relative flex items-center space-x-1.5 bg-red-800/80 hover:bg-red-800 px-2.5 py-2 rounded-lg transition"
              title="Danh sách so sánh sản phẩm"
            >
              <div className="relative">
                <Scale className="w-5 h-5 text-white" />
                {compareCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {compareCount}
                  </span>
                )}
              </div>
              <span className="hidden xl:inline font-semibold">So sánh</span>
            </button>

            {/* Wishlist Favorites Button */}
            <button
              onClick={() => onOpenWishlist ? onOpenWishlist() : setCurrentView('profile')}
              className="relative flex items-center space-x-1.5 bg-red-800/80 hover:bg-red-800 px-2.5 py-2 rounded-lg transition"
              title="Sản phẩm yêu thích"
            >
              <div className="relative">
                <Heart className="w-5 h-5 text-white fill-white/20" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="hidden xl:inline font-semibold">Yêu thích</span>
            </button>

            {/* Dark / Light Mode Switcher */}
            <button
              onClick={() => setIsDarkMode?.(!isDarkMode)}
              className="p-2 rounded-lg bg-red-800/80 hover:bg-red-800 text-white transition"
              title={isDarkMode ? 'Chuyển Chế độ Sáng' : 'Chuyển Chế độ Tối'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-yellow-300" /> : <Moon className="w-4 h-4 text-slate-200" />}
            </button>

            {/* Cart Button */}
            <button 
              onClick={() => setCurrentView('cart')}
              className="relative flex items-center space-x-1.5 bg-red-800/80 hover:bg-red-800 px-3 py-2 rounded-lg transition"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-semibold">Giỏ hàng</span>
            </button>

            {/* Account / Profile Button */}
            {user ? (
              <button 
                onClick={() => setCurrentView('profile')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition border ${currentView === 'profile' ? 'bg-white text-[#d70018]' : 'bg-red-800/80 hover:bg-red-800 text-white'}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${user.role === 'admin' ? 'bg-black text-yellow-300' : 'bg-yellow-400 text-black'}`}>
                  {user.name.charAt(0)}
                </div>
                <div className="text-left hidden md:block leading-tight">
                  <div className="font-semibold text-xs flex items-center gap-1">
                    <span>{user.name}</span>
                    {user.role === 'admin' && (
                      <span className="bg-black text-red-400 text-[8px] font-black px-1 rounded uppercase">ADMIN</span>
                    )}
                  </div>
                  <div className="text-[10px] text-yellow-300 font-bold">
                    {user.role === 'admin' ? 'Quản Trị Viên' : user.memberTier}
                  </div>
                </div>
              </button>
            ) : (
              <button 
                onClick={onOpenAuth}
                className="flex items-center space-x-1.5 bg-red-800/80 hover:bg-red-800 px-3 py-2 rounded-lg transition"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline font-semibold">Đăng nhập</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg bg-red-800 text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

          </div>
        </div>
      </div>

      {/* Sub Navigation Bar (Category Bar) - Hidden in Admin view */}
      {!currentView.startsWith('admin') && (
        <nav className="bg-white border-b border-gray-200 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 flex items-center space-x-1 overflow-x-auto py-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    if (currentView !== 'catalog') setCurrentView('catalog');
                  }}
                  className={`flex items-center space-x-2 px-4 py-1.5 rounded-md text-xs font-semibold transition ${
                    isSelected 
                      ? 'bg-red-50 text-[#d70018] border border-red-200' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#d70018]' : 'text-gray-500'}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}

            <div className="flex-1 text-right flex items-center justify-end space-x-4 text-xs font-medium text-gray-600">
              <button 
                onClick={() => setCurrentView('catalog')} 
                className="hover:text-[#d70018] transition flex items-center space-x-1"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block"></span>
                <span className="font-bold text-[#d70018]">Thu cũ đổi mới - Trợ giá 2 Tr</span>
              </button>
            </div>
          </div>
        </nav>
      )}



      {/* Location Selector Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full p-6 relative border border-gray-100 space-y-4 animate-in fade-in zoom-in-95 text-gray-900">
            <button 
              onClick={() => setIsLocationModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-gray-100 pb-3">
              <span className="text-[10px] bg-red-50 text-[#d70018] font-bold px-2 py-0.5 rounded">HỆ THỐNG CỬA HÀNG</span>
              <h3 className="font-extrabold text-base text-gray-900 mt-1 flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-[#d70018]" />
                <span>Chọn Tỉnh / Thành phố để xem giá</span>
              </h3>
              <p className="text-xs text-gray-500">
                Giá sản phẩm và chính sách khuyến mãi sẽ được áp dụng theo kho hàng tại khu vực được chọn.
              </p>
            </div>

            {/* Quick Filter Search */}
            <div className="relative">
              <input 
                type="text"
                placeholder="Tìm nhanh Tỉnh / Thành phố..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#d70018] outline-none"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>

            {/* Popular Major Cities Grid */}
            {!locationSearch && (
              <div>
                <span className="text-[11px] font-bold text-gray-500 uppercase block mb-2">Thành phố trọng điểm</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {regionsList.filter(r => r.popular).map(r => (
                    <button
                      key={r.name}
                      onClick={() => handleSelectRegion(r.name)}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-left transition flex items-center justify-between ${
                        selectedRegion === r.name 
                          ? 'border-[#d70018] bg-red-50 text-[#d70018] shadow-sm' 
                          : 'border-gray-200 hover:border-gray-300 bg-white text-gray-800'
                      }`}
                    >
                      <span>{r.name}</span>
                      {selectedRegion === r.name && <Check className="w-3.5 h-3.5 text-[#d70018]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Full Regions List */}
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase block mb-2">Tất cả Tỉnh / Thành ({filteredRegions.length})</span>
              <div className="max-h-48 overflow-y-auto divide-y divide-gray-100 border border-gray-200 rounded-xl">
                {filteredRegions.map(r => (
                  <div
                    key={r.name}
                    onClick={() => handleSelectRegion(r.name)}
                    className={`p-2.5 text-xs font-semibold hover:bg-red-50/60 transition cursor-pointer flex justify-between items-center ${
                      selectedRegion === r.name ? 'bg-red-50 text-[#d70018]' : 'text-gray-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{r.name}</div>
                      <div className="text-[10px] text-gray-400">{r.stores}</div>
                    </div>
                    {selectedRegion === r.name && (
                      <span className="text-[10px] font-extrabold bg-[#d70018] text-white px-2 py-0.5 rounded">Đang xem</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
