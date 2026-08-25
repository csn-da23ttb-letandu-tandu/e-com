import React, { useState } from 'react';
import { 
  Plus, Search, Edit3, Trash2, SlidersHorizontal, 
  X, Check, Image as ImageIcon, Eye, Upload, Link as LinkIcon, Clock, Sparkles
} from 'lucide-react';

export default function AdminProducts({ 
  products, 
  onAddProduct, 
  onUpdateProduct, 
  onDeleteProduct 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State with Multi-Image Support (Up to 4 images)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Smartphones',
    brand: 'Apple',
    price: '',
    oldPrice: '',
    discountEndDate: '',
    stock: 10,
    status: 'Còn hàng',
    imageUrls: ['', '', '', ''],
    description: ''
  });

  const [customColorName, setCustomColorName] = useState('');
  const [customColorCode, setCustomColorCode] = useState('#06b6d4');
  const [customColorPrice, setCustomColorPrice] = useState('');

  const [customCapName, setCustomCapName] = useState('');
  const [customCapPrice, setCustomCapPrice] = useState('');

  const handleAddCustomColor = () => {
    if (!customColorName.trim()) return;
    const newCol = { 
      name: customColorName.trim(), 
      code: customColorCode,
      price: customColorPrice ? Number(customColorPrice) : (Number(formData.price) || null)
    };
    setFormData(prev => ({
      ...prev,
      colors: [...(prev.colors || []), newCol]
    }));
    setCustomColorName('');
    setCustomColorPrice('');
  };

  const handleRemoveColor = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      colors: (prev.colors || []).filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleAddCustomCapacity = () => {
    if (!customCapName.trim()) return;
    const newCap = { 
      name: customCapName.trim().toUpperCase(), 
      price: customCapPrice ? Number(customCapPrice) : (Number(formData.price) || null)
    };
    setFormData(prev => ({
      ...prev,
      capacityList: [...(prev.capacityList || []), newCap]
    }));
    setCustomCapName('');
    setCustomCapPrice('');
  };

  const handleRemoveCapacity = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      capacityList: (prev.capacityList || []).filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Smartphones',
      brand: 'Apple',
      price: '',
      oldPrice: '',
      discountEndDate: '',
      stock: 10,
      status: 'Còn hàng',
      imageUrls: [
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop',
        ''
      ],
      colors: [
        { name: 'Titan Sa Mạc', code: '#d8c4b6' },
        { name: 'Titan Tự Nhiên', code: '#8a8682' },
        { name: 'Trắng Ngọc Trai', code: '#ffffff' }
      ],
      capacityList: [
        { name: '128GB', price: 29990000 },
        { name: '256GB', price: 32550000 },
        { name: '512GB', price: 38550000 },
        { name: '1TB', price: 44550000 }
      ],
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    const imgs = p.images || [];
    const caps = p.capacityList || (p.capacities ? p.capacities.map(c => typeof c === 'object' ? c : { name: c, price: p.price }) : [{ name: '256GB', price: p.price }]);
    setFormData({
      name: p.name,
      category: p.category,
      brand: p.brand,
      price: p.price,
      oldPrice: p.oldPrice || '',
      discountEndDate: p.discountEndDate || '',
      stock: p.stock,
      status: p.status,
      imageUrls: [
        imgs[0] || '',
        imgs[1] || '',
        imgs[2] || '',
        imgs[3] || ''
      ],
      colors: p.colors || [
        { name: 'Trắng Ngọc Trai', code: '#ffffff' },
        { name: 'Đen Nhám', code: '#1e293b' }
      ],
      capacityList: caps,
      description: p.description || ''
    });
    setIsModalOpen(true);
  };

  const handleImageUrlChange = (val, index) => {
    const updated = [...formData.imageUrls];
    updated[index] = val;
    setFormData({ ...formData, imageUrls: updated });
  };

  const handleImageFileUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = [...formData.imageUrls];
        updated[index] = reader.result;
        setFormData({ ...formData, imageUrls: updated });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanImages = formData.imageUrls.filter(url => url && url.trim() !== '');
    const finalImages = cleanImages.length > 0 
      ? cleanImages 
      : ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop'];

    const productPayload = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: formData.name,
      category: formData.category,
      brand: formData.brand,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      discountEndDate: formData.discountEndDate || null,
      stock: Number(formData.stock),
      status: formData.status,
      badge: 'Giảm 10%',
      installment: 'Trả góp 0%',
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviewsCount: editingProduct ? editingProduct.reviewsCount : 1,
      images: finalImages,
      colors: formData.colors && formData.colors.length > 0 ? formData.colors : [{ name: 'Trắng Ngọc Trai', code: '#ffffff' }],
      capacities: (formData.capacityList && formData.capacityList.length > 0) ? formData.capacityList.map(c => typeof c === 'object' ? c.name : c) : ['256GB'],
      capacityList: (formData.capacityList && formData.capacityList.length > 0) ? formData.capacityList : [{ name: '256GB', price: Number(formData.price) }],
      specs: editingProduct ? editingProduct.specs : { "Màn hình": "OLED 120Hz", "Chipset": "Flagship 3nm" },
      description: formData.description || 'Sản phẩm công nghệ chính hãng mua tại Thế Giới Công Nghệ.'
    };

    if (editingProduct) {
      onUpdateProduct(productPayload);
    } else {
      onAddProduct(productPayload);
    }

    setIsModalOpen(false);
  };

  // Filtered product list
  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 font-display">
            Quản Lý Sản Phẩm Hệ Thống
          </h1>
          <p className="text-xs text-gray-500">
            Quản lý danh mục kho hàng, giá bán và thay đổi bộ 3-4 hình ảnh sản phẩm.
          </p>
        </div>

        <button 
          onClick={handleOpenAdd}
          className="flex items-center space-x-2 bg-[#d70018] hover:bg-[#be0015] text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Thêm sản phẩm mới</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <input 
            type="text"
            placeholder="Tìm theo tên sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <span className="text-xs font-semibold text-gray-500">Danh mục:</span>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-xs font-semibold text-gray-700 rounded-xl px-3 py-2 outline-none"
          >
            <option value="All">Tất cả danh mục</option>
            <option value="Smartphones">Điện thoại</option>
            <option value="Laptops">Laptops</option>
            <option value="Tablets">Máy tính bảng</option>
            <option value="Audio">Âm thanh</option>
            <option value="Smartwatches">Đồng hồ</option>
            <option value="Accessories">Phụ kiện</option>
          </select>
        </div>
      </div>

      {/* Products Table Grid */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Sản phẩm & Bộ Ảnh ({filtered.length})</th>
                <th className="py-3.5 px-4">Danh mục</th>
                <th className="py-3.5 px-4">Thương hiệu</th>
                <th className="py-3.5 px-4">Giá bán</th>
                <th className="py-3.5 px-4">Số lượng Tồn & Trạng thái</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/80 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative shrink-0">
                        <img 
                          src={p.images[0]} 
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop";
                          }}
                          className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-gray-200"
                        />
                        {p.images.length > 1 && (
                          <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full border border-white">
                            +{p.images.length - 1}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-gray-900 line-clamp-1">{p.name}</h4>
                        <div className="text-[10px] text-gray-400 flex items-center gap-1.5 mt-0.5">
                          <span>{p.images.length} ảnh trong bộ</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-semibold">{p.colors?.length || 1} màu sắc</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-gray-100 text-gray-700 font-semibold px-2.5 py-1 rounded-lg">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-800">{p.brand}</td>
                  <td className="py-3 px-4">
                    <div className="font-extrabold text-[#d70018]">
                      {p.price.toLocaleString('vi-VN')}đ
                    </div>
                    {p.oldPrice && (
                      <div className="text-[10px] text-gray-400 line-through">
                        {p.oldPrice.toLocaleString('vi-VN')}đ
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        p.stock === 0 || p.status === 'Hết hàng'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {p.stock === 0 ? 'Hết hàng (0)' : `Còn hàng (${p.stock})`}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition"
                        title="Chỉnh sửa sản phẩm"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm(`Bạn có chắc muốn xóa "${p.name}"?`)) {
                            onDeleteProduct(p.id);
                          }
                        }}
                        className="p-1.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative border border-gray-100 shadow-2xl space-y-5">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-red-50 text-[#d70018] rounded-xl">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-base text-gray-900 font-display">
                  {editingProduct ? 'Chỉnh Sửa Thông Tin & Bộ Ảnh Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
                </h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Auto-Fill Sample Data Bar */}
            <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 space-y-1.5">
              <div className="text-[11px] font-bold text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                <span>TỰ ĐIỀN MẪU DỮ LIỆU NHANH (Không cần tự gõ từng ô):</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleAutoFill('iphone')}
                  className="bg-white hover:bg-amber-500 hover:text-white border border-amber-300 text-amber-900 font-black text-[10px] px-2.5 py-1 rounded-xl transition shadow-sm"
                >
                  ⚡ iPhone 16 Pro Max Mẫu
                </button>
                <button
                  type="button"
                  onClick={() => handleAutoFill('samsung')}
                  className="bg-white hover:bg-amber-500 hover:text-white border border-amber-300 text-amber-900 font-black text-[10px] px-2.5 py-1 rounded-xl transition shadow-sm"
                >
                  ⚡ Samsung S24 Ultra Mẫu
                </button>
                <button
                  type="button"
                  onClick={() => handleAutoFill('macbook')}
                  className="bg-white hover:bg-amber-500 hover:text-white border border-amber-300 text-amber-900 font-black text-[10px] px-2.5 py-1 rounded-xl transition shadow-sm"
                >
                  ⚡ MacBook Pro M3 Mẫu
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Tên sản phẩm *</label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d70018] outline-none font-semibold text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Danh mục *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d70018] outline-none bg-white font-semibold text-gray-800"
                  >
                    <option value="Smartphones">Điện thoại (Smartphones)</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Tablets">Máy tính bảng (Tablets)</option>
                    <option value="Audio">Tai nghe & Âm thanh</option>
                    <option value="Smartwatches">Đồng hồ thông minh</option>
                    <option value="Accessories">Phụ kiện & Củ sạc</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Thương hiệu *</label>
                  <input 
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d70018] outline-none font-semibold text-gray-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Giá gốc niêm yết (VNĐ)</label>
                  <input 
                    type="number"
                    placeholder="VD: 35000000"
                    value={formData.oldPrice}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData(prev => ({ ...prev, oldPrice: val }));
                    }}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d70018] outline-none font-semibold text-gray-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Giá bán khuyến mãi (VNĐ) *</label>
                  <input 
                    type="number"
                    required
                    placeholder="VD: 29990000"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d70018] outline-none font-extrabold text-[#d70018]"
                  />
                </div>

                {/* Direct Discount Percentage Helper */}
                <div className="col-span-1 sm:col-span-2 bg-red-50/50 p-3.5 rounded-2xl border border-red-100 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#d70018]">
                    <span>🎯 TÙY CHỈNH TỈ LỆ GIẢM GIÁ (% PHẦN TRĂM)</span>
                    {formData.oldPrice && formData.price && Number(formData.oldPrice) > Number(formData.price) && (
                      <span className="bg-[#d70018] text-white px-2.5 py-0.5 rounded-full font-black text-[11px] shadow-sm">
                        Đang giảm {Math.round(((Number(formData.oldPrice) - Number(formData.price)) / Number(formData.oldPrice)) * 100)}%
                      </span>
                    )}
                  </div>
                  
                  {/* Manual Typing % Box + Presets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                    {/* Manual Percentage Input Box */}
                    <div className="flex items-center space-x-2 bg-white p-2 rounded-xl border border-red-200 shadow-sm">
                      <span className="text-[11px] text-gray-700 font-bold shrink-0">Tự nhập % giảm:</span>
                      <div className="relative flex-1">
                        <input
                          type="number"
                          min="1"
                          max="99"
                          placeholder="VD: 18"
                          value={
                            formData.oldPrice && formData.price && Number(formData.oldPrice) > Number(formData.price)
                              ? Math.round(((Number(formData.oldPrice) - Number(formData.price)) / Number(formData.oldPrice)) * 100)
                              : ''
                          }
                          onChange={(e) => {
                            const pct = Number(e.target.value);
                            const basePrice = Number(formData.oldPrice) || Number(formData.price) || 10000000;
                            if (pct >= 0 && pct <= 99) {
                              const calculated = Math.round(basePrice * (1 - pct / 100));
                              setFormData(prev => ({
                                ...prev,
                                oldPrice: basePrice,
                                price: calculated
                              }));
                            }
                          }}
                          className="w-full pl-3 pr-7 py-1 bg-slate-50 border border-gray-200 rounded-lg text-xs font-black text-[#d70018] outline-none focus:bg-white focus:ring-2 focus:ring-[#d70018]"
                        />
                        <span className="absolute right-2 top-1 text-xs font-black text-[#d70018] pointer-events-none">%</span>
                      </div>
                    </div>

                    {/* Preset Buttons */}
                    <div>
                      <div className="text-[10px] font-bold text-gray-500 mb-1">Hoặc chọn % có sẵn:</div>
                      <div className="flex flex-wrap gap-1">
                        {[5, 10, 15, 20, 25, 30, 40, 50].map((pct) => (
                          <button
                            key={pct}
                            type="button"
                            onClick={() => {
                              const basePrice = Number(formData.oldPrice) || Number(formData.price) || 10000000;
                              const calculated = Math.round(basePrice * (1 - pct / 100));
                              setFormData(prev => ({
                                ...prev,
                                oldPrice: basePrice,
                                price: calculated
                              }));
                            }}
                            className="bg-white hover:bg-[#d70018] hover:text-white border border-red-200 text-[#d70018] font-black text-[10px] px-2 py-0.5 rounded-md transition shadow-sm"
                          >
                            -{pct}%
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Discount Expiration Timer Setting */}
                  <div className="pt-2 border-t border-red-200/60 space-y-1.5">
                    <label className="block text-[11px] font-bold text-gray-800 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#d70018]" />
                        <span>Hạn giảm giá (Hết giờ tự động dừng giảm & quay về giá gốc):</span>
                      </span>
                      {formData.discountEndDate && (
                        <span className="text-emerald-700 font-extrabold text-[10px]">
                          Hạn: {new Date(formData.discountEndDate).toLocaleString('vi-VN')}
                        </span>
                      )}
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                      <input 
                        type="datetime-local"
                        value={formData.discountEndDate || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, discountEndDate: e.target.value }))}
                        className="w-full sm:flex-1 px-3 py-1.5 bg-white border border-red-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#d70018]"
                      />
                      <div className="flex gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            const d = new Date();
                            d.setDate(d.getDate() + 1);
                            setFormData(prev => ({ ...prev, discountEndDate: d.toISOString().slice(0, 16) }));
                          }}
                          className="px-2 py-1 bg-white hover:bg-slate-100 border border-gray-300 text-[10px] font-bold rounded-lg shadow-sm"
                        >
                          +1 ngày
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const d = new Date();
                            d.setDate(d.getDate() + 3);
                            setFormData(prev => ({ ...prev, discountEndDate: d.toISOString().slice(0, 16) }));
                          }}
                          className="px-2 py-1 bg-white hover:bg-slate-100 border border-gray-300 text-[10px] font-bold rounded-lg shadow-sm"
                        >
                          +3 ngày
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const d = new Date();
                            d.setDate(d.getDate() + 7);
                            setFormData(prev => ({ ...prev, discountEndDate: d.toISOString().slice(0, 16) }));
                          }}
                          className="px-2 py-1 bg-white hover:bg-slate-100 border border-gray-300 text-[10px] font-bold rounded-lg shadow-sm"
                        >
                          +7 ngày
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, discountEndDate: '' }))}
                          className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-[10px] font-bold rounded-lg"
                        >
                          Vô thời hạn
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Multi-Image Manager Section */}
              <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <span className="font-extrabold text-gray-900 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#d70018]" />
                    <span>Quản lý Bộ Ảnh Sản Phẩm (Tối đa 4 ảnh)</span>
                  </span>
                  <span className="text-[10px] text-gray-500 font-semibold">Tải từ máy tính hoặc dán URL</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[0, 1, 2, 3].map((idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-gray-200 space-y-2 shadow-sm">
                      <div className="flex items-center justify-between text-[11px] font-bold text-gray-800">
                        <span>Ảnh {idx + 1} {idx === 0 && <span className="text-[#d70018] font-black">(Ảnh chính)</span>}</span>
                        {formData.imageUrls[idx] && (
                          <button
                            type="button"
                            onClick={() => handleImageUrlChange('', idx)}
                            className="text-red-500 hover:underline text-[10px]"
                          >
                            Xóa ảnh
                          </button>
                        )}
                      </div>

                      {/* Image Preview Thumbnail */}
                      <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200 relative">
                        {formData.imageUrls[idx] ? (
                          <img 
                            src={formData.imageUrls[idx]} 
                            alt={`Preview ${idx + 1}`}
                            className="max-h-full max-w-full object-contain p-1"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop';
                            }}
                          />
                        ) : (
                          <div className="text-gray-400 text-center space-y-1">
                            <ImageIcon className="w-6 h-6 mx-auto stroke-1" />
                            <div className="text-[10px]">Chưa chọn ảnh</div>
                          </div>
                        )}
                      </div>

                      {/* URL Input */}
                      <div className="space-y-1">
                        <input 
                          type="text"
                          placeholder={`Dán đường dẫn URL ảnh ${idx + 1}...`}
                          value={formData.imageUrls[idx]}
                          onChange={(e) => handleImageUrlChange(e.target.value, idx)}
                          className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg text-[11px] outline-none focus:ring-1 focus:ring-[#d70018]"
                        />
                      </div>

                      {/* File Upload Button */}
                      <div className="relative">
                        <label className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-1 px-2 rounded-lg text-[10px] flex items-center justify-center space-x-1 cursor-pointer transition">
                          <Upload className="w-3 h-3 text-[#d70018]" />
                          <span>Tải tệp ảnh từ máy tính</span>
                          <input 
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageFileUpload(e, idx)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Color Variants Manager */}
              <div className="space-y-3 bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100">
                <div className="flex items-center justify-between border-b border-indigo-200/60 pb-2">
                  <span className="font-extrabold text-indigo-950 text-xs flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#d70018]"></span>
                    <span>Quản lý Tùy Chọn Màu Sắc Sản Phẩm</span>
                  </span>
                  <span className="text-[10px] text-indigo-800 font-bold">
                    Đã thêm {(formData.colors || []).length} màu
                  </span>
                </div>

                {/* Added Colors Swatches List with Per-Color Custom Price */}
                <div className="space-y-2">
                  {(formData.colors || []).map((col, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white p-2 px-3 rounded-xl border border-indigo-200 shadow-sm text-xs font-bold text-gray-800 gap-2">
                      <div className="flex items-center space-x-2 shrink-0">
                        <span 
                          className="w-5 h-5 rounded-full border border-gray-300 shrink-0 shadow-sm" 
                          style={{ backgroundColor: col.code || '#000000' }}
                        />
                        <span className="font-extrabold text-gray-900">{col.name}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] text-gray-500 font-semibold">Giá riêng màu này:</span>
                        <input
                          type="number"
                          placeholder={formData.price ? `${formData.price}đ (bằng giá gốc)` : "VD: 34990000"}
                          value={col.price || ''}
                          onChange={(e) => {
                            const val = e.target.value ? Number(e.target.value) : null;
                            setFormData(prev => {
                              const updatedColors = [...(prev.colors || [])];
                              updatedColors[idx] = { ...updatedColors[idx], price: val };
                              return { ...prev, colors: updatedColors };
                            });
                          }}
                          className="w-36 px-2.5 py-1 bg-slate-50 border border-gray-200 rounded-lg text-xs font-black text-[#d70018] outline-none focus:bg-white focus:ring-1 focus:ring-[#d70018]"
                        />
                        <span className="text-[10px] text-[#d70018] font-black">VNĐ</span>

                        <button
                          type="button"
                          onClick={() => handleRemoveColor(idx)}
                          className="text-gray-400 hover:text-red-600 font-bold ml-2 p-1"
                          title="Xóa màu này"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New Color Form Controls */}
                <div className="bg-white p-3 rounded-xl border border-indigo-200 space-y-2">
                  <div className="text-[11px] font-bold text-gray-700">Thêm màu sắc mới & Giá riêng:</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <input
                      type="color"
                      value={customColorCode}
                      onChange={(e) => setCustomColorCode(e.target.value)}
                      className="w-9 h-9 p-0.5 rounded-lg border border-gray-300 cursor-pointer shrink-0"
                      title="Chọn mã màu"
                    />
                    <input
                      type="text"
                      placeholder="Tên màu (VD: Titan Sa Mạc)..."
                      value={customColorName}
                      onChange={(e) => setCustomColorName(e.target.value)}
                      className="flex-1 min-w-[150px] px-3 py-2 border border-gray-300 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#d70018]"
                    />
                    <input
                      type="number"
                      placeholder="Giá riêng màu (VD: 35990000)"
                      value={customColorPrice}
                      onChange={(e) => setCustomColorPrice(e.target.value)}
                      className="w-40 px-3 py-2 border border-gray-300 rounded-xl text-xs font-extrabold text-[#d70018] outline-none focus:ring-2 focus:ring-[#d70018]"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomColor}
                      className="bg-[#d70018] hover:bg-[#be0015] text-white font-extrabold text-xs px-4 py-2 rounded-xl transition shadow shrink-0"
                    >
                      + Thêm màu
                    </button>
                  </div>

                  {/* Preset Quick Color Buttons */}
                  <div className="pt-1.5 border-t border-gray-100 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-gray-500 font-bold">Gợi ý màu hot:</span>
                    {[
                      { name: 'Titan Sa Mạc', code: '#d8c4b6' },
                      { name: 'Titan Tự Nhiên', code: '#8a8682' },
                      { name: 'Trắng Ngọc Trai', code: '#ffffff' },
                      { name: 'Xanh Cyan', code: '#06b6d4' },
                      { name: 'Đen Nhám', code: '#1e293b' },
                      { name: 'Vàng Rose Gold', code: '#f59e0b' },
                      { name: 'Tím Pastel', code: '#c084fc' }
                    ].map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => {
                          setCustomColorName(preset.name);
                          setCustomColorCode(preset.code);
                        }}
                        className="flex items-center space-x-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-md text-[10px] font-bold text-gray-700 transition"
                      >
                        <span className="w-2.5 h-2.5 rounded-full border border-gray-300" style={{ backgroundColor: preset.code }} />
                        <span>{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Capacity GB Variants Manager */}
              <div className="space-y-3 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
                <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
                  <span className="font-extrabold text-emerald-950 text-xs flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                    <span>Quản lý Tùy Chọn Dung Lượng GB/TB & Giá Riêng</span>
                  </span>
                  <span className="text-[10px] text-emerald-800 font-bold">
                    Đã thêm {(formData.capacityList || []).length} phiên bản
                  </span>
                </div>

                {/* Added Capacity List with Per-Capacity Custom Price */}
                <div className="space-y-2">
                  {(formData.capacityList || []).map((cap, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white p-2 px-3 rounded-xl border border-emerald-200 shadow-sm text-xs font-bold text-gray-800 gap-2">
                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[11px] px-2.5 py-0.5 rounded-lg border border-emerald-200">
                          {typeof cap === 'object' ? cap.name : cap}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] text-gray-500 font-semibold">Giá phiên bản GB này:</span>
                        <input
                          type="number"
                          placeholder={formData.price ? `${formData.price}đ` : "VD: 34990000"}
                          value={(typeof cap === 'object' ? cap.price : null) || ''}
                          onChange={(e) => {
                            const val = e.target.value ? Number(e.target.value) : null;
                            setFormData(prev => {
                              const updatedCaps = [...(prev.capacityList || [])];
                              const capName = typeof updatedCaps[idx] === 'object' ? updatedCaps[idx].name : updatedCaps[idx];
                              updatedCaps[idx] = { name: capName, price: val };
                              return { ...prev, capacityList: updatedCaps };
                            });
                          }}
                          className="w-36 px-2.5 py-1 bg-slate-50 border border-gray-200 rounded-lg text-xs font-black text-emerald-700 outline-none focus:bg-white focus:ring-1 focus:ring-emerald-500"
                        />
                        <span className="text-[10px] text-emerald-700 font-black">VNĐ</span>

                        <button
                          type="button"
                          onClick={() => handleRemoveCapacity(idx)}
                          className="text-gray-400 hover:text-red-600 font-bold ml-2 p-1"
                          title="Xóa dung lượng này"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New Capacity Form Controls */}
                <div className="bg-white p-3 rounded-xl border border-emerald-200 space-y-2">
                  <div className="text-[11px] font-bold text-gray-700">Thêm dung lượng GB/TB mới & Giá riêng:</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <input
                      type="text"
                      placeholder="Dung lượng (VD: 256GB, 512GB, 1TB)..."
                      value={customCapName}
                      onChange={(e) => setCustomCapName(e.target.value)}
                      className="flex-1 min-w-[150px] px-3 py-2 border border-gray-300 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      type="number"
                      placeholder="Giá riêng (VD: 38990000)"
                      value={customCapPrice}
                      onChange={(e) => setCustomCapPrice(e.target.value)}
                      className="w-40 px-3 py-2 border border-gray-300 rounded-xl text-xs font-extrabold text-emerald-700 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomCapacity}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition shadow shrink-0"
                    >
                      + Thêm GB
                    </button>
                  </div>

                  {/* Preset Quick Capacity Buttons */}
                  <div className="pt-1.5 border-t border-gray-100 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-gray-500 font-bold">Gợi ý dung lượng:</span>
                    {['128GB', '256GB', '512GB', '1TB', '2TB', '8GB/256GB', '16GB/512GB', '36GB/1TB'].map((capName, cIdx) => (
                      <button
                        key={cIdx}
                        type="button"
                        onClick={() => {
                          setCustomCapName(capName);
                        }}
                        className="bg-gray-50 hover:bg-emerald-50 border border-gray-200 px-2 py-0.5 rounded-md text-[10px] font-bold text-gray-700 transition"
                      >
                        {capName}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Mô tả sản phẩm</label>
                <textarea 
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d70018] outline-none font-medium text-gray-800"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#d70018] hover:bg-[#be0015] text-white font-extrabold py-3 rounded-2xl uppercase tracking-wider transition shadow-lg shadow-red-600/20 text-xs"
              >
                {editingProduct ? 'LƯU THAY ĐỔI SẢN PHẨM & BỘ ẢNH' : 'TẠO SẢN PHẨM MỚI'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
