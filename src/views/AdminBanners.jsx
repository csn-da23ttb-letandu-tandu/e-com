import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Edit3, Trash2, CheckCircle, XCircle, Search, Sparkles, Eye, ChevronRight, Tag, DollarSign, Link } from 'lucide-react';

export default function AdminBanners({
  banners = [],
  products = [],
  onAddBanner,
  onUpdateBanner,
  onDeleteBanner,
  onToggleBannerStatus
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    badge: 'SIÊU PHẨM THẾ GIỚI CÔNG NGHỆ',
    buttonText: 'Xem chi tiết ngay',
    price: '',
    brand: 'APPLE',
    position: 'hero-main',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
    productId: '',
    isActive: true
  });

  const filteredBanners = banners.filter(b => {
    const matchSearch = (b.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (b.brand && b.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (b.badge && b.badge.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchPos = positionFilter === 'All' || b.position === positionFilter;
    return matchSearch && matchPos;
  });

  const handleOpenAdd = (defaultPos = 'hero-main') => {
    setEditingBanner(null);
    setFormData({
      title: 'Khám phá công nghệ mới nhất',
      subtitle: 'Tuyển tập thiết bị flagship hàng đầu thị trường. Giảm tới 2 Triệu cho thành viên khi thu cũ đổi mới.',
      badge: defaultPos === 'hero-sub-1' ? 'MỚI VỀ' : defaultPos === 'hero-sub-2' ? 'HOT DEAL' : 'SIÊU PHẨM THẾ GIỚI CÔNG NGHỆ',
      buttonText: 'Xem chi tiết ngay',
      price: defaultPos.includes('sub') ? '34990000' : '',
      brand: 'APPLE',
      position: defaultPos,
      imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
      productId: products[0]?.id || '',
      isActive: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b) => {
    setEditingBanner(b);
    setFormData({
      title: b.title || '',
      subtitle: b.subtitle || '',
      badge: b.badge || 'SIÊU PHẨM THẾ GIỚI CÔNG NGHỆ',
      buttonText: b.buttonText || 'Xem chi tiết ngay',
      price: b.price ? String(b.price) : '',
      brand: b.brand || 'APPLE',
      position: b.position || 'hero-main',
      imageUrl: b.imageUrl || '',
      productId: b.productId || '',
      isActive: b.isActive !== false
    });
    setIsModalOpen(true);
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const payload = {
      id: editingBanner ? editingBanner.id : 'b_' + Date.now(),
      title: formData.title,
      subtitle: formData.subtitle,
      badge: formData.badge,
      buttonText: formData.buttonText,
      price: formData.price ? Number(formData.price) : undefined,
      brand: formData.brand,
      position: formData.position,
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop',
      productId: formData.productId ? Number(formData.productId) : undefined,
      isActive: formData.isActive
    };

    if (editingBanner) {
      onUpdateBanner?.(payload);
    } else {
      onAddBanner?.(payload);
    }

    setIsModalOpen(false);
  };

  const getPositionLabel = (pos) => {
    switch (pos) {
      case 'hero-main': return '🔴 Banner Chính Lớn (Hero Main)';
      case 'hero-sub-1': return '🟡 Banner Phụ Trên (Mới Về)';
      case 'hero-sub-2': return '🔵 Banner Phụ Dưới (Hot Deal)';
      case 'left-sidebar': return '📌 Sidebar Trái';
      case 'bottom-promo': return '👇 Quảng Cáo Dưới';
      default: return pos;
    }
  };

  const getPositionBadgeStyle = (pos) => {
    switch (pos) {
      case 'hero-main': return 'bg-red-100 text-red-800 border-red-200';
      case 'hero-sub-1': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'hero-sub-2': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-50 text-[#d70018] rounded-2xl">
            <ImageIcon className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 font-display">Quản Lý Banner Quảng Cáo Trang Chủ</h1>
            <p className="text-xs text-gray-500">Chỉnh sửa trực tiếp Banner Chính lớn & 2 Banner Phụ bên phải (Hero Grid)</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleOpenAdd('hero-main')}
            className="bg-[#d70018] hover:bg-[#be0015] text-white text-xs font-extrabold px-4 py-2.5 rounded-2xl shadow transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            + Banner Chính Lớn
          </button>
          <button
            onClick={() => handleOpenAdd('hero-sub-1')}
            className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold px-4 py-2.5 rounded-2xl shadow transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            + Banner Phụ Trên
          </button>
          <button
            onClick={() => handleOpenAdd('hero-sub-2')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold px-4 py-2.5 rounded-2xl shadow transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            + Banner Phụ Dưới
          </button>
        </div>
      </div>

      {/* Hero Banner Quick Visual Map */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 rounded-3xl shadow-sm border border-slate-700 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold border-b border-slate-700 pb-2">
          <span className="flex items-center gap-2 text-amber-400">
            <Sparkles className="w-4 h-4" /> Sơ đồ vị trí Banner Hero trên Trang chủ (CellphoneS Style)
          </span>
          <span className="text-gray-400 text-[11px]">Bấm nút Sửa ở bảng bên dưới để thay đổi nội dung & hình ảnh ngay</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Main Hero Card Preview */}
          <div className="md:col-span-2 border border-red-500/50 bg-red-950/40 p-4 rounded-2xl flex flex-col justify-between min-h-[110px] relative overflow-hidden">
            <span className="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">
              Position: hero-main
            </span>
            <div>
              <span className="text-[10px] font-extrabold text-red-400 uppercase">
                {banners.find(b => b.position === 'hero-main')?.badge || 'SIÊU PHẨM THẾ GIỚI CÔNG NGHỆ'}
              </span>
              <h4 className="font-extrabold text-sm text-white line-clamp-1 mt-0.5">
                {banners.find(b => b.position === 'hero-main')?.title || 'Khám phá công nghệ mới nhất'}
              </h4>
              <p className="text-[11px] text-gray-300 line-clamp-1 mt-0.5">
                {banners.find(b => b.position === 'hero-main')?.subtitle || 'Tuyển tập thiết bị flagship hàng đầu...'}
              </p>
            </div>
            <div className="pt-2">
              <button 
                onClick={() => {
                  const target = banners.find(b => b.position === 'hero-main');
                  if (target) handleOpenEdit(target); else handleOpenAdd('hero-main');
                }}
                className="bg-white text-[#d70018] font-bold text-[11px] px-3 py-1 rounded-lg hover:bg-gray-100 transition inline-flex items-center gap-1"
              >
                ✏️ Chỉnh sửa Banner Chính Lớn
              </button>
            </div>
          </div>

          {/* Sub Hero Cards Preview */}
          <div className="flex flex-col gap-2">
            <div className="border border-amber-500/50 bg-amber-950/30 p-3 rounded-2xl flex justify-between items-center relative">
              <div>
                <span className="text-[9px] font-bold bg-amber-500 text-black px-1.5 py-0.5 rounded uppercase">
                  {banners.find(b => b.position === 'hero-sub-1')?.badge || 'MỚI VỀ'}
                </span>
                <h5 className="font-bold text-xs text-white line-clamp-1 mt-1">
                  {banners.find(b => b.position === 'hero-sub-1')?.title || 'iPhone 16 Pro Max 512GB'}
                </h5>
              </div>
              <button 
                onClick={() => {
                  const target = banners.find(b => b.position === 'hero-sub-1');
                  if (target) handleOpenEdit(target); else handleOpenAdd('hero-sub-1');
                }}
                className="p-1.5 bg-amber-500 text-black hover:bg-amber-400 rounded-lg text-[10px] font-bold shrink-0 ml-2"
              >
                ✏️ Sửa
              </button>
            </div>

            <div className="border border-blue-500/50 bg-blue-950/30 p-3 rounded-2xl flex justify-between items-center relative">
              <div>
                <span className="text-[9px] font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded uppercase">
                  {banners.find(b => b.position === 'hero-sub-2')?.badge || 'HOT DEAL'}
                </span>
                <h5 className="font-bold text-xs text-white line-clamp-1 mt-1">
                  {banners.find(b => b.position === 'hero-sub-2')?.title || 'Samsung Galaxy S25 Plus'}
                </h5>
              </div>
              <button 
                onClick={() => {
                  const target = banners.find(b => b.position === 'hero-sub-2');
                  if (target) handleOpenEdit(target); else handleOpenAdd('hero-sub-2');
                }}
                className="p-1.5 bg-blue-500 text-white hover:bg-blue-400 rounded-lg text-[10px] font-bold shrink-0 ml-2"
              >
                ✏️ Sửa
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm theo tiêu chí, huy hiệu, thương hiệu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#d70018] outline-none"
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <span className="font-semibold text-gray-500">Lọc vị trí:</span>
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 font-bold outline-none cursor-pointer"
          >
            <option value="All">Tất cả vị trí ({banners.length})</option>
            <option value="hero-main">🔴 Banner Chính Lớn (Hero Main)</option>
            <option value="hero-sub-1">🟡 Banner Phụ Trên (Hero Sub 1)</option>
            <option value="hero-sub-2">🔵 Banner Phụ Dưới (Hero Sub 2)</option>
            <option value="left-sidebar">📌 Sidebar Trái</option>
            <option value="bottom-promo">👇 Quảng Cáo Phía Dưới</option>
          </select>
        </div>
      </div>

      {/* Banners Grid / Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px] text-xs">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="p-4">Hình ảnh Banner</th>
                <th className="p-4">Tiêu đề & Huy hiệu</th>
                <th className="p-4">Mô tả & Giá hiển thị</th>
                <th className="p-4">Vị trí hiển thị</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredBanners.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-gray-400">
                    Chưa tìm thấy banner nào phù hợp. Bấm các nút tạo Banner ở trên để thêm mới!
                  </td>
                </tr>
              ) : (
                filteredBanners.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4">
                      <div className="w-20 h-16 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center shrink-0">
                        <img 
                          src={b.imageUrl} 
                          alt={b.title}
                          className="max-h-full max-w-full object-contain p-1"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop';
                          }}
                        />
                      </div>
                    </td>
                    <td className="p-4 space-y-1">
                      {b.badge && (
                        <span className="inline-block bg-red-100 text-[#d70018] text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
                          {b.badge}
                        </span>
                      )}
                      <div className="font-extrabold text-sm text-gray-900">{b.title}</div>
                    </td>
                    <td className="p-4 space-y-1">
                      <div className="text-[11px] text-gray-600 line-clamp-2">{b.subtitle || 'Không có mô tả'}</div>
                      {b.price && (
                        <div className="text-xs font-bold text-[#d70018]">
                          Giá: {Number(b.price).toLocaleString('vi-VN')}đ
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${getPositionBadgeStyle(b.position)}`}>
                        {getPositionLabel(b.position)}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => onToggleBannerStatus?.(b.id)}
                        className={`flex items-center gap-1.5 font-bold text-[11px] px-3 py-1 rounded-full transition ${
                          b.isActive !== false
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {b.isActive !== false ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        <span>{b.isActive !== false ? 'Đang bật (ON)' : 'Đang ẩn (OFF)'}</span>
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleOpenEdit(b)}
                          className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition shadow-sm font-bold text-xs flex items-center gap-1"
                          title="Sửa banner"
                        >
                          <Edit3 className="w-4 h-4" /> Sửa
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Bạn có chắc muốn xóa banner "${b.title}"?`)) {
                              onDeleteBanner?.(b.id);
                            }
                          }}
                          className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition shadow-sm"
                          title="Xóa banner"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Banner Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-gray-100 max-h-[92vh] flex flex-col">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                {editingBanner ? `Chỉnh Sửa Banner (${getPositionLabel(formData.position)})` : 'Thêm Banner Quảng Cáo Mới'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs overflow-y-auto flex-1">
              
              {/* Position Picker & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1 uppercase text-[10px]">
                    Vị trí hiển thị *
                  </label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-bold focus:bg-white focus:border-[#d70018] outline-none"
                  >
                    <option value="hero-main">🔴 Banner Chính Lớn (Hero Main)</option>
                    <option value="hero-sub-1">🟡 Banner Phụ Trên (Hero Sub 1 - Mới về)</option>
                    <option value="hero-sub-2">🔵 Banner Phụ Dưới (Hero Sub 2 - Hot Deal)</option>
                    <option value="left-sidebar">📌 Sidebar Trái</option>
                    <option value="bottom-promo">👇 Quảng Cáo Phía Dưới</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1 uppercase text-[10px]">
                    Huy hiệu (Badge) (VD: MỚI VỀ, HOT DEAL...)
                  </label>
                  <input
                    type="text"
                    placeholder="VD: SIÊU PHẨM THẾ GIỚI CÔNG NGHỆ"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-bold focus:bg-white focus:border-[#d70018] outline-none"
                  />
                </div>
              </div>

              {/* Title & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-gray-700 mb-1 uppercase text-[10px]">
                    Tiêu đề hiển thị trên Banner *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Khám phá công nghệ mới nhất"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-extrabold focus:bg-white focus:border-[#d70018] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1 uppercase text-[10px]">
                    Giá hiển thị (Nếu có)
                  </label>
                  <input
                    type="number"
                    placeholder="VD: 34990000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-bold text-[#d70018] focus:bg-white focus:border-[#d70018] outline-none"
                  />
                </div>
              </div>

              {/* Subtitle / Description */}
              <div>
                <label className="block font-bold text-gray-700 mb-1 uppercase text-[10px]">
                  Mô tả chi tiết / Lời khuyên khuyến mãi
                </label>
                <textarea
                  rows="2"
                  placeholder="VD: Tuyển tập thiết bị flagship hàng đầu thị trường. Giảm tới 2 Triệu cho thành viên khi thu cũ đổi mới."
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-medium focus:bg-white focus:border-[#d70018] outline-none"
                />
              </div>

              {/* Target Product Selector */}
              <div>
                <label className="block font-bold text-gray-700 mb-1 uppercase text-[10px]">
                  Sản phẩm liên kết khi khách hàng Bấm vào Banner
                </label>
                <select
                  value={formData.productId}
                  onChange={(e) => {
                    const chosenId = e.target.value;
                    const p = products.find(prod => String(prod.id) === String(chosenId));
                    if (p) {
                      setFormData(prev => ({
                        ...prev,
                        productId: chosenId,
                        imageUrl: prev.imageUrl || p.images?.[0] || '',
                        price: prev.price || String(p.price)
                      }));
                    } else {
                      setFormData(prev => ({ ...prev, productId: chosenId }));
                    }
                  }}
                  className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-semibold focus:bg-white focus:border-[#d70018] outline-none cursor-pointer"
                >
                  <option value="">-- Không chọn sản phẩm (Mở trang mặc định) --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      [{p.category}] {p.name} - {p.price.toLocaleString('vi-VN')}đ
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Input Section */}
              <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-gray-200">
                <label className="block font-bold text-gray-800 uppercase text-[10px]">
                  Hình ảnh Banner (URL hoặc Upload từ máy tính)
                </label>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-white rounded-xl overflow-hidden border border-gray-300 flex items-center justify-center shrink-0">
                    {formData.imageUrl ? (
                      <img src={formData.imageUrl} alt="Preview" className="max-h-full max-w-full object-contain p-1" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="text"
                      placeholder="Dán URL ảnh từ web CellphoneS..."
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full p-2 bg-white border border-gray-200 rounded-xl font-mono text-[11px] outline-none"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="text-[10px] text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:bg-slate-200 file:text-slate-800 hover:file:bg-slate-300"
                    />
                  </div>
                </div>
              </div>

              {/* Live Card Preview in Modal */}
              <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2">
                <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  👁️ Xem trước giao diện Banner hiển thị thực tế:
                </div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
                  <div className="space-y-1 max-w-[70%]">
                    {formData.badge && (
                      <span className="text-[9px] font-extrabold bg-[#d70018] text-white px-2 py-0.5 rounded uppercase">
                        {formData.badge}
                      </span>
                    )}
                    <h5 className="font-bold text-xs text-white line-clamp-1">{formData.title || 'Tiêu đề Banner'}</h5>
                    <p className="text-[10px] text-gray-400 line-clamp-1">{formData.subtitle}</p>
                    {formData.price && (
                      <div className="text-xs font-bold text-yellow-400">
                        {Number(formData.price).toLocaleString('vi-VN')}đ
                      </div>
                    )}
                  </div>
                  {formData.imageUrl && (
                    <img src={formData.imageUrl} alt="" className="w-14 h-14 object-contain rounded-lg shrink-0 bg-white/10 p-1" />
                  )}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#d70018] text-white font-extrabold rounded-xl shadow hover:bg-[#be0015]"
                >
                  {editingBanner ? 'Lưu Thay Đổi Banner' : 'Tạo Banner Mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
