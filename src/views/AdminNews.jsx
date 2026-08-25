import React, { useState } from 'react';
import { 
  Plus, Search, Edit3, Trash2, Newspaper, 
  X, Check, Image as ImageIcon, Eye, Clock, User, ArrowRight 
} from 'lucide-react';

export default function AdminNews({ 
  articles = [], 
  onAddArticle, 
  onUpdateArticle, 
  onDeleteArticle 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'TƯ VẤN MUA SẮM',
    author: 'Ban Biên Tập Thế Giới Công Nghệ',
    readTime: '4 phút đọc',
    image: '',
    excerpt: '',
    content: ''
  });

  const handleOpenAdd = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      category: 'TƯ VẤN MUA SẮM',
      author: 'Ban Biên Tập Thế Giới Công Nghệ',
      readTime: '4 phút đọc',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
      excerpt: '',
      content: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (art) => {
    setEditingArticle(art);
    setFormData({
      title: art.title || '',
      category: art.category || 'TƯ VẤN MUA SẮM',
      author: art.author || 'Ban Biên Tập Thế Giới Công Nghệ',
      readTime: art.readTime || '4 phút đọc',
      image: art.image || '',
      excerpt: art.excerpt || '',
      content: Array.isArray(art.content) ? art.content.join('\n\n') : (art.content || '')
    });
    setIsModalOpen(true);
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const contentParagraphs = formData.content
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const payload = {
      id: editingArticle ? editingArticle.id : Date.now(),
      title: formData.title,
      category: formData.category,
      author: formData.author || 'Ban Biên Tập Thế Giới Công Nghệ',
      date: editingArticle ? editingArticle.date : 'Vừa đăng',
      readTime: formData.readTime || '3 phút đọc',
      image: formData.image || 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
      excerpt: formData.excerpt || formData.title,
      content: contentParagraphs.length > 0 ? contentParagraphs : [formData.excerpt || formData.title]
    };

    if (editingArticle) {
      onUpdateArticle(payload);
    } else {
      onAddArticle(payload);
    }

    setIsModalOpen(false);
  };

  const filteredArticles = articles.filter(art => {
    const matchesCategory = categoryFilter === 'All' || art.category === categoryFilter;
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          art.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <span className="bg-red-100 text-[#d70018] font-extrabold text-[10px] px-3 py-1 rounded-full uppercase border border-red-200">
            HỆ THỐNG QUẢN TRỊ ADMIN
          </span>
          <h1 className="text-2xl font-extrabold text-gray-900 mt-1 font-display flex items-center space-x-2">
            <Newspaper className="w-6 h-6 text-[#d70018]" />
            <span>Quản Lý Tin Tức & Bài Viết Công Nghệ</span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Đăng mới, chỉnh sửa, cập nhật hoặc xóa các bài viết tư vấn mua sắm & đánh giá thiết bị
          </p>
        </div>

        <button 
          onClick={handleOpenAdd}
          className="flex items-center space-x-2 bg-[#d70018] hover:bg-[#be0015] text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Thêm bài viết mới</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <input 
            type="text"
            placeholder="Tìm bài viết theo tiêu đề, tác giả..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <span className="text-xs font-semibold text-gray-500">Danh mục tin:</span>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-xs font-bold text-gray-800 rounded-xl px-3 py-2 outline-none"
          >
            <option value="All">Tất cả danh mục</option>
            <option value="TƯ VẤN MUA SẮM">Tư vấn mua sắm</option>
            <option value="CÔNG NGHỆ MỚI">Công nghệ mới</option>
            <option value="TƯ VẤN LAPTOP">Tư vấn Laptop</option>
            <option value="ĐÁNH GIÁ SẢN PHẨM">Đánh giá sản phẩm</option>
            <option value="MẸO SỬ DỤNG">Mẹo sử dụng</option>
            <option value="ƯU ĐÃI THÀNH VIÊN">Ưu đãi thành viên</option>
          </select>
        </div>
      </div>

      {/* Articles Table Grid */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Bài viết & Ảnh bìa ({filteredArticles.length})</th>
                <th className="py-3.5 px-4">Danh mục</th>
                <th className="py-3.5 px-4">Tác giả & Ngày đăng</th>
                <th className="py-3.5 px-4">Thời gian đọc</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500 text-xs">
                    Không tìm thấy bài viết nào phù hợp.
                  </td>
                </tr>
              ) : (
                filteredArticles.map(art => (
                  <tr key={art.id} className="hover:bg-gray-50/80 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={art.image} 
                          alt={art.title}
                          className="w-14 h-14 object-cover rounded-xl border border-gray-200 bg-gray-50 shrink-0" 
                        />
                        <div className="max-w-md">
                          <div className="font-extrabold text-gray-900 text-xs line-clamp-1">{art.title}</div>
                          <div className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{art.excerpt}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-red-50 text-[#d70018] text-[10px] font-black px-2.5 py-0.5 rounded-full border border-red-200 uppercase">
                        {art.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      <div className="font-bold flex items-center gap-1"><User className="w-3 h-3 text-gray-400" /> {art.author}</div>
                      <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" /> {art.date}</div>
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-800">{art.readTime || '3 phút đọc'}</td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button 
                        onClick={() => handleOpenEdit(art)}
                        className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition font-semibold"
                        title="Chỉnh sửa bài viết"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm(`Xóa bài viết "${art.title}" khỏi hệ thống?`)) {
                            onDeleteArticle(art.id);
                          }
                        }}
                        className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition font-semibold"
                        title="Xóa bài viết"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative border border-gray-100 shadow-2xl space-y-5">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <h3 className="font-extrabold text-base text-gray-900 font-display flex items-center space-x-2">
                <Newspaper className="w-5 h-5 text-[#d70018]" />
                <span>{editingArticle ? 'Chỉnh Sửa Bài Viết Tin Tức' : 'Đăng Bài Viết Tin Tức Mới'}</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-bold text-gray-700 mb-1">Tiêu đề bài viết *</label>
                <input 
                  type="text"
                  required
                  placeholder="Nhập tiêu đề hấp dẫn cho bài viết..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d70018] outline-none font-bold text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Danh mục *</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d70018] outline-none font-bold bg-white text-gray-900"
                  >
                    <option value="TƯ VẤN MUA SẮM">Tư vấn mua sắm</option>
                    <option value="CÔNG NGHỆ MỚI">Công nghệ mới</option>
                    <option value="TƯ VẤN LAPTOP">Tư vấn Laptop</option>
                    <option value="ĐÁNH GIÁ SẢN PHẨM">Đánh giá sản phẩm</option>
                    <option value="MẸO SỬ DỤNG">Mẹo sử dụng</option>
                    <option value="ƯU ĐÃI THÀNH VIÊN">Ưu đãi thành viên</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Tác giả *</label>
                  <input 
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d70018] outline-none font-semibold text-gray-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Thời gian đọc</label>
                  <input 
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="VD: 4 phút đọc"
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d70018] outline-none font-semibold text-gray-800"
                  />
                </div>
              </div>

              {/* Cover Image Manager */}
              <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <label className="block font-bold text-gray-800">Ảnh bìa bài viết</label>
                <div className="flex items-center space-x-3">
                  <div className="w-20 h-16 bg-white rounded-lg flex items-center justify-center border border-gray-200 overflow-hidden shrink-0">
                    {formData.image ? (
                      <img src={formData.image} alt="" className="max-h-full max-w-full object-cover" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <input 
                      type="text"
                      placeholder="Dán đường dẫn URL ảnh bài viết..."
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#d70018]"
                    />
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="text-[11px] text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-red-50 file:text-[#d70018] hover:file:bg-red-100"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Tóm tắt ngắn (Excerpt) *</label>
                <textarea 
                  rows="2"
                  required
                  placeholder="Mô tả ngắn gọn thu hút người đọc..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d70018] outline-none text-xs"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Nội dung chi tiết bài viết (Mỗi dòng xuống hàng là 1 đoạn văn)</label>
                <textarea 
                  rows="6"
                  required
                  placeholder="Nhập nội dung đầy đủ bài viết..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d70018] outline-none text-xs leading-relaxed"
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-100 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#d70018] hover:bg-[#be0015] text-white font-bold transition shadow"
                >
                  {editingArticle ? 'Lưu cập nhật' : '+ Thêm bài viết mới'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
