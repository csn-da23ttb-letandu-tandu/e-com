import React, { useState, useEffect } from 'react';
import { 
  Star, ShieldCheck, RefreshCw, Truck, Heart, Share2, 
  Check, Zap, ChevronRight, MessageSquare, ThumbsUp, Sparkles, Scale, Newspaper, HelpCircle, ChevronDown, Clock, ArrowRight, X
} from 'lucide-react';

export default function ProductDetail({ 
  product, 
  user,
  onAddToCart, 
  onBuyNow, 
  onBackToCatalog,
  onToggleCompare,
  compareList = [],
  onToggleWishlist,
  wishlist = []
}) {
  // React hooks declared AT THE VERY TOP
  const [selectedImage, setSelectedImage] = useState(product?.images ? product.images[0] : '');
  const [selectedColor, setSelectedColor] = useState(product?.colors ? product.colors[0] : null);
  const [selectedCapacity, setSelectedCapacity] = useState(product?.capacities ? product.capacities[0] : null);
  const [newReviewText, setNewReviewText] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [selectedArticleModal, setSelectedArticleModal] = useState(null);
  const [isAllNewsModalOpen, setIsAllNewsModalOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      author: "Trần Phương Nam",
      rating: 5,
      date: "2 ngày trước",
      comment: "Máy dùng cực kì mượt, màu Titan Sa Mạc bên ngoài sang trọng hơn nhiều so với ảnh. Đã dùng được 1 tuần vô cùng hài lòng!"
    },
    {
      id: 2,
      author: "Lê Minh Anh",
      rating: 5,
      date: "1 tuần trước",
      comment: "Giao hàng siêu nhanh chỉ trong vòng 1.5h tại Hà Nội. Nhân viên nhiệt tình hướng dẫn chuyển dữ liệu từ máy cũ."
    }
  ]);

  // Reset selections when product prop changes
  useEffect(() => {
    if (product) {
      setSelectedImage(product.images ? product.images[0] : '');
      setSelectedColor(product.colors ? product.colors[0] : null);
      setSelectedCapacity(product.capacities ? product.capacities[0] : null);
    }
  }, [product]);

  // Real-time Countdown Timer for Sale Expiration
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

  useEffect(() => {
    if (!product?.discountEndDate) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });
      return;
    }

    const updateTimer = () => {
      const now = new Date().getTime();
      const end = new Date(product.discountEndDate).getTime();
      const distance = end - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [product?.discountEndDate]);

  if (!product) return null;

  // Compute capacity and color-based dynamic prices considering expiration
  const getDynamicPriceInfo = () => {
    if (!product) return { price: 0, oldPrice: 0, saving: 0 };
    const isExpired = product.discountEndDate && new Date() >= new Date(product.discountEndDate);

    // Dynamic per-color custom pricing
    let colorPriceDiff = 0;
    if (selectedColor && selectedColor.price && Number(selectedColor.price) > 0) {
      colorPriceDiff = Number(selectedColor.price) - Number(product.price);
    }

    // Dynamic per-capacity custom pricing set by Admin
    let customCapacityPrice = null;
    if (product.capacityList && Array.isArray(product.capacityList) && selectedCapacity) {
      const foundCap = product.capacityList.find(c => (typeof c === 'object' ? c.name : c) === selectedCapacity);
      if (foundCap && typeof foundCap === 'object' && foundCap.price && Number(foundCap.price) > 0) {
        customCapacityPrice = Number(foundCap.price);
      }
    }

    if (customCapacityPrice !== null) {
      const effectivePrice = Math.max(100000, customCapacityPrice + colorPriceDiff);
      const effectiveOld = isExpired ? null : (product.oldPrice ? product.oldPrice + colorPriceDiff : null);
      const saving = (effectiveOld && effectiveOld > effectivePrice) ? effectiveOld - effectivePrice : 0;
      return { price: effectivePrice, oldPrice: effectiveOld, saving };
    }

    if (!product.capacities || product.capacities.length === 0 || !selectedCapacity) {
      const basePrice = isExpired ? (product.oldPrice || product.price) : product.price;
      const effectivePrice = Math.max(100000, basePrice + colorPriceDiff);
      const effectiveOld = isExpired ? null : (product.oldPrice ? product.oldPrice + colorPriceDiff : null);
      const saving = (effectiveOld && effectiveOld > effectivePrice) ? effectiveOld - effectivePrice : 0;
      return { price: effectivePrice, oldPrice: effectiveOld, saving };
    }

    const index = product.capacities.indexOf(selectedCapacity);
    if (index === -1) {
      const basePrice = isExpired ? (product.oldPrice || product.price) : product.price;
      const effectivePrice = Math.max(100000, basePrice + colorPriceDiff);
      const effectiveOld = isExpired ? null : (product.oldPrice ? product.oldPrice + colorPriceDiff : null);
      const saving = (effectiveOld && effectiveOld > effectivePrice) ? effectiveOld - effectivePrice : 0;
      return { price: effectivePrice, oldPrice: effectiveOld, saving };
    }

    let stepAmount = 4000000;
    if (product.price >= 30000000) stepAmount = 6000000;
    else if (product.price <= 5000000) stepAmount = 1000000;
    else if (product.price <= 15000000) stepAmount = 2000000;

    const baseIndex = product.capacities.length > 2 ? 1 : 0; 
    const diff = index - baseIndex;

    const basePrice = (isExpired ? (product.oldPrice || product.price) : product.price) + colorPriceDiff;
    const baseOld = isExpired ? null : (product.oldPrice ? product.oldPrice + colorPriceDiff : null);

    const currentPrice = Math.max(1000000, basePrice + diff * stepAmount);
    const currentOldPrice = baseOld ? Math.max(1200000, baseOld + diff * stepAmount) : null;
    const saving = currentOldPrice ? currentOldPrice - currentPrice : 0;

    return { price: currentPrice, oldPrice: currentOldPrice, saving };
  };

  const currentPriceInfo = getDynamicPriceInfo();

  // Dynamic Product Display Name
  const dynamicName = selectedCapacity
    ? `${product.name.replace(/\s\d+(GB|TB|MB)$/i, '')} ${selectedCapacity}`
    : product.name;

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    setReviewsList([
      {
        id: Date.now(),
        author: user?.name || 'Lê Tấn Dư',
        rating: 5,
        date: "Vừa xong",
        comment: newReviewText
      },
      ...reviewsList
    ]);
    setNewReviewText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <button onClick={onBackToCatalog} className="hover:text-[#d70018]">Trang chủ</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={onBackToCatalog} className="hover:text-[#d70018]">{product.category}</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 font-semibold truncate">{dynamicName}</span>
      </nav>

      {/* Main Grid: Gallery (Left) + Purchase Form (Right) */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative border border-gray-200 rounded-2xl p-6 bg-white flex items-center justify-center min-h-[380px] shadow-inner overflow-hidden">
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#d70018] text-white font-extrabold text-xs px-3 py-1 rounded-md z-10 shadow">
                {product.badge}
              </span>
            )}
            <img 
              src={selectedImage || (product.images ? product.images[0] : '')} 
              alt={dynamicName}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop";
              }}
              className="max-h-[340px] w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Thumbnail Slider */}
          {product.images && product.images.length > 0 && (
            <div className="flex space-x-3 overflow-x-auto py-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-xl border-2 p-1 bg-white shrink-0 transition ${
                    selectedImage === img ? 'border-[#d70018] ring-2 ring-red-200' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={img} 
                    alt="" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop";
                    }}
                    className="w-full h-full object-contain" 
                  />
                </button>
              ))}
            </div>
          )}

          {/* Key Guarantee Icons */}
          <div className="grid grid-cols-2 gap-3 pt-4 text-xs">
            <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
              <ShieldCheck className="w-5 h-5 text-[#d70018] shrink-0" />
              <span>Bảo hành chính hãng 12 tháng tại hệ thống</span>
            </div>
            <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-green-50/60 border border-green-100 text-gray-800">
              <Truck className="w-5 h-5 text-green-600 shrink-0" />
              <span className="font-semibold text-green-900">Giao hàng 63 Tỉnh/Thành toàn quốc & Hỏa tốc 2H</span>
            </div>
          </div>
        </div>

        {/* Right Column: Info & Variants (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header Title & Rating */}
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight mb-2 font-display">
              {dynamicName}
            </h1>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-gray-900">{product.rating}</span>
                <span className="text-gray-400">({product.reviewsCount} đánh giá)</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-green-600 font-semibold flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                <span>Tình trạng: {product.status}</span>
              </span>
            </div>
          </div>

          {/* Real-time Flash Sale Expiration Timer Banner */}
          {product.discountEndDate && (
            <>
              {timeLeft.isExpired ? (
                <div className="bg-slate-900 text-white rounded-2xl p-3.5 flex items-center justify-between text-xs border border-slate-800 shadow-md">
                  <div className="flex items-center space-x-2 font-bold text-amber-400">
                    <Clock className="w-4 h-4 animate-pulse" />
                    <span>⌛ ĐÃ HẾT THỜI GIAN KHUYẾN MÃI GIẢM GIÁ</span>
                  </div>
                  <span className="text-[11px] text-gray-300 font-medium hidden sm:inline">Tự động quay về bán giá gốc niêm yết</span>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-red-600 via-[#d70018] to-red-800 text-white rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-2 shadow-md">
                  <div className="flex items-center space-x-2 font-extrabold text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-300 animate-ping"></span>
                    <span className="tracking-wide uppercase">🔥 Flash Sale Đang Giảm Giá</span>
                  </div>

                  <div className="flex items-center space-x-1 text-xs font-mono font-black">
                    <span className="text-[11px] font-sans font-bold text-red-100 mr-1">Kết thúc sau:</span>
                    <span className="bg-slate-900 px-2 py-1 rounded-lg text-yellow-300">{String(timeLeft.days).padStart(2, '0')}d</span>
                    <span>:</span>
                    <span className="bg-slate-900 px-2 py-1 rounded-lg text-yellow-300">{String(timeLeft.hours).padStart(2, '0')}h</span>
                    <span>:</span>
                    <span className="bg-slate-900 px-2 py-1 rounded-lg text-yellow-300">{String(timeLeft.minutes).padStart(2, '0')}m</span>
                    <span>:</span>
                    <span className="bg-slate-900 px-2 py-1 rounded-lg text-yellow-300">{String(timeLeft.seconds).padStart(2, '0')}s</span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Pricing Box */}
          <div className="bg-red-50/60 border border-red-100 rounded-2xl p-4 flex flex-wrap items-baseline gap-3 animate-in fade-in duration-200">
            <span className="text-3xl font-extrabold text-[#d70018]">
              {currentPriceInfo.price.toLocaleString('vi-VN')}đ
            </span>
            {currentPriceInfo.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                {currentPriceInfo.oldPrice.toLocaleString('vi-VN')}đ
              </span>
            )}
            {currentPriceInfo.saving > 0 && (
              <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full ml-auto shadow-sm">
                Tiết kiệm {currentPriceInfo.saving.toLocaleString('vi-VN')}đ
              </span>
            )}
          </div>

          {/* Capacity Selectors */}
          {product.capacities && product.capacities.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Chọn Dung lượng: <span className="text-[#d70018]">{selectedCapacity}</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {product.capacities.map(cap => (
                  <button
                    key={cap}
                    onClick={() => setSelectedCapacity(cap)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                      selectedCapacity === cap
                        ? 'border-[#d70018] bg-red-50 text-[#d70018] shadow-sm ring-2 ring-red-100 scale-105'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selectors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Chọn Màu sắc: <span className="text-[#d70018]">{selectedColor?.name}</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl border text-xs font-semibold transition ${
                      selectedColor?.name === color.name
                        ? 'border-[#d70018] bg-red-50 text-[#d70018] shadow-sm ring-2 ring-red-100 scale-105'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full border border-gray-300 ${color.bg}`}></span>
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CellphoneS Style Promotion Box */}
          {product.promotions && (
            <div className="border border-red-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-[#d70018] to-red-700 text-white text-xs font-extrabold px-4 py-2.5 flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-300 fill-current" />
                <span>KHUYẾN MÃI ĐẶC QUYỀN SMEMBER</span>
              </div>
              <ul className="p-4 bg-red-50/30 text-xs text-gray-700 space-y-2.5">
                {product.promotions.map((promo, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="w-4 h-4 rounded-full bg-[#d70018] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{promo}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Admin Role Purchase Restriction Warning */}
          {user?.role === 'admin' && (
            <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs p-3 rounded-xl flex items-center space-x-2 font-bold animate-in fade-in">
              <span className="text-base">🔒</span>
              <span>Tài khoản Quản trị viên (Admin) chỉ thực hiện quản trị hệ thống, không hỗ trợ tính năng mua hàng mua sắm.</span>
            </div>
          )}

          {/* Action CTA Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => onBuyNow({
                ...product,
                name: dynamicName,
                price: currentPriceInfo.price,
                oldPrice: currentPriceInfo.oldPrice,
                capacity: selectedCapacity,
                color: selectedColor?.name
              })}
              className="w-full bg-[#d70018] hover:bg-[#be0015] text-white font-extrabold py-3.5 rounded-xl text-center shadow-lg transition transform active:scale-98"
            >
              <div className="text-base uppercase tracking-wider">MUA NGAY</div>
              <div className="text-[11px] font-medium text-red-100">Giao hàng tận nơi 2h hoặc nhận tại cửa hàng</div>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onAddToCart({
                  ...product,
                  name: dynamicName,
                  price: currentPriceInfo.price,
                  oldPrice: currentPriceInfo.oldPrice,
                  capacity: selectedCapacity,
                  color: selectedColor?.name
                })}
                className="bg-red-50 hover:bg-red-100 border border-red-200 text-[#d70018] font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2 transition"
              >
                <span>THÊM VÀO GIỎ HÀNG</span>
              </button>

              <button 
                onClick={() => onToggleCompare?.(product)}
                className={`border text-xs font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition ${
                  compareList.some(item => item.id === product.id)
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white hover:bg-slate-50 text-gray-800 border-gray-300'
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>{compareList.some(item => item.id === product.id) ? 'ĐÃ CHỌN SO SÁNH' : 'SO SÁNH CẤU HÌNH'}</span>
              </button>
            </div>

            <div className="pt-1 flex items-center justify-between text-xs">
              <button
                onClick={() => onToggleWishlist?.(product.id)}
                className="flex items-center space-x-1.5 text-gray-600 hover:text-[#d70018] font-semibold transition"
              >
                <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{wishlist.includes(product.id) ? 'Đã lưu vào Yêu thích' : 'Thêm vào sản phẩm Yêu thích'}</span>
              </button>

              <span className="text-gray-400">Mã SP: TZ-{product.id}</span>
            </div>
          </div>

        </div>

      </div>

      {/* Specifications & Highlight Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Specs Accordion (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-base font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#d70018]" />
            <span>Thông số kỹ thuật nổi bật</span>
          </h3>

          {product.specs && (
            <div className="divide-y divide-gray-100 text-xs">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-semibold text-gray-500 w-1/3 uppercase tracking-wider text-[11px]">{key}</span>
                  <span className="font-bold text-gray-900 w-2/3">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Product Overview Description (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h3 className="text-base font-extrabold text-gray-900 pb-3 border-b border-gray-100 flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-[#d70018]" />
            <span>Đặc điểm nổi bật</span>
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>

      </div>

      {/* Customer Ratings & Reviews Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
        <h3 className="text-base font-extrabold text-gray-900 flex items-center justify-between">
          <span>Đánh giá từ khách hàng</span>
          <button 
            onClick={() => document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-xs bg-[#d70018] text-white px-3 py-1.5 rounded-lg font-bold hover:bg-[#be0015] transition"
          >
            Viết đánh giá
          </button>
        </h3>

        {/* Rating Score Card */}
        <div className="bg-gray-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-8 border border-gray-100">
          <div className="text-center sm:border-r sm:border-gray-200 pr-0 sm:pr-8">
            <div className="text-4xl font-extrabold text-gray-900 font-display">{product.rating}/5</div>
            <div className="flex text-yellow-400 my-1 justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div className="text-xs text-gray-500">Dựa trên {product.reviewsCount} đánh giá thực tế</div>
          </div>

          {/* Rating Progress bars */}
          <div className="flex-1 w-full space-y-1.5 text-xs">
            {[5, 4, 3, 2, 1].map(stars => (
              <div key={stars} className="flex items-center space-x-3">
                <span className="w-8 text-gray-600 font-semibold">{stars} sao</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-yellow-400 h-full rounded-full" 
                    style={{ width: stars === 5 ? '88%' : stars === 4 ? '10%' : '2%' }}
                  ></div>
                </div>
                <span className="w-10 text-right text-gray-400">{stars === 5 ? '88%' : '10%'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviewsList.map(rev => (
            <div key={rev.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-full bg-red-100 text-[#d70018] font-bold flex items-center justify-center">
                    {rev.author.charAt(0)}
                  </div>
                  <span className="font-bold text-gray-900">{rev.author}</span>
                  <span className="bg-green-100 text-green-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                    Đã mua tại Thế Giới Công Nghệ
                  </span>
                </div>
                <span className="text-gray-400 text-[11px]">{rev.date}</span>
              </div>
              
              {/* Review Stars */}
              <div className="flex items-center space-x-1 pl-9">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3.5 h-3.5 ${i < (rev.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-[11px] font-bold text-gray-700 ml-1">({rev.rating || 5}/5 sao)</span>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed pl-9">{rev.comment}</p>
            </div>
          ))}
        </div>

        {/* Write Review Form */}
        <form id="review-form" onSubmit={handleAddReview} className="pt-4 border-t border-gray-100 space-y-4">
          <h4 className="font-bold text-sm text-gray-900">Đánh giá & Nhận xét sản phẩm:</h4>
          
          {/* Interactive 1 - 5 Star Selector */}
          <div className="flex items-center space-x-3 bg-red-50/50 border border-red-100 p-3 rounded-xl">
            <span className="text-xs font-bold text-gray-700">Chọn đánh giá của bạn:</span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setUserRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-yellow-400 hover:scale-125 transition transform focus:outline-none"
                  title={`Đánh giá ${star} sao`}
                >
                  <Star 
                    className={`w-6 h-6 transition ${
                      (hoverRating || userRating) >= star 
                        ? 'fill-yellow-400 text-yellow-400 scale-110 drop-shadow-sm' 
                        : 'text-gray-300'
                    }`} 
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-extrabold text-[#d70018]">
              {userRating === 5 ? '⭐ 5/5 (Tuyệt vời)' :
               userRating === 4 ? '⭐ 4/5 (Rất tốt)' :
               userRating === 3 ? '⭐ 3/5 (Bình thường)' :
               userRating === 2 ? '⭐ 2/5 (Tạm được)' : '⭐ 1/5 (Cần cải thiện)'}
            </span>
          </div>

          <textarea
            rows="3"
            required
            value={newReviewText}
            onChange={(e) => setNewReviewText(e.target.value)}
            placeholder="Chia sẻ nhận xét của bạn về hiệu năng, camera, thời lượng pin..."
            className="w-full p-3 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none"
          ></textarea>
          <button 
            type="submit"
            className="bg-[#d70018] hover:bg-[#be0015] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow"
          >
            Gửi đánh giá ngay
          </button>
        </form>
      </div>

      {/* Product Tech News & Articles Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <h3 className="font-extrabold text-base text-gray-900 flex items-center space-x-2 font-display">
            <Newspaper className="w-5 h-5 text-[#d70018]" />
            <span>Tin Tức & Đánh Giá {product.name}</span>
          </h3>
          <button
            onClick={() => setIsAllNewsModalOpen(true)}
            className="text-xs text-[#d70018] font-bold cursor-pointer hover:underline flex items-center gap-1"
          >
            <span>Xem tất cả tin tức</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              id: 1,
              title: `Đánh giá chi tiết ${product.name}: Sức mạnh đột phá năm 2026!`,
              category: 'ĐÁNH GIÁ SẢN PHẨM',
              excerpt: `Trải nghiệm thực tế camera AI 50MP, hiệu năng chip 3nm đỉnh cao và thời lượng pin sạc siêu tốc 30 phút.`,
              author: 'S-Tech Lab',
              date: '3 giờ trước',
              readTime: '4 phút đọc',
              image: product.images[0],
              content: [
                `Trong trải nghiệm thực tế kéo dài 1 tuần tại phòng thử nghiệm S-Tech Lab, ${product.name} ấn tượng mạnh mẽ nhờ sự kết hợp giữa thiết kế cao cấp và sức mạnh xử lý phần cứng cực hạn.`,
                `Màn hình tần số quét 120Hz mượt mà, độ sáng đỉnh 2.500 nits hiển thị rõ nét ngay dưới ánh nắng mặt trời gắt. Cụm camera quay chụp đêm khử nhiễu AI ấn tượng, tái tạo màu sắc chân thực.`,
                `Hệ thống tản nhiệt tối ưu giúp máy luôn duy trì nhiệt độ mát mẻ dưới 38°C ngay cả khi chơi các tựa game đồ họa nặng liên tục trong 2 giờ.`,
                `💡 Lời khuyên: Sản phẩm hiện đang có sẵn tại hệ thống Thế Giới Công Nghệ với ưu đãi tặng gói bảo hành VIP 1 đổi 1 và Trả góp 0%.`
              ]
            },
            {
              id: 2,
              title: `So sánh ${product.name} và các đối thủ cùng phân khúc cao cấp`,
              category: 'SO SÁNH CÔNG NGHỆ',
              excerpt: `Phân tích chi tiết màn hình LTPO OLED, độ phân giải sắc nét và chính sách trợ giá thu cũ đổi mới độc quyền.`,
              author: 'Biên tập viên Thế Giới Công Nghệ',
              date: '1 ngày trước',
              readTime: '5 phút đọc',
              image: product.images[1] || product.images[0],
              content: [
                `Khi đặt ${product.name} lên bàn cân so sánh cùng các sản phẩm flagship khác trong cùng tầm giá, thiết bị nổi bật với khả năng tối ưu hóa phần mềm và thời lượng pin sử dụng thực tế.`,
                `Chính sách trợ giá Thu Cũ Đổi Mới đến 2.000.000đ tại cửa hàng giúp chi phí nâng cấp sản phẩm trở nên hấp dẫn hơn bao giờ hết.`,
                `💡 Đánh giá chung: Mẫu sản phẩm đáng xuống tiền nhất trong phân khúc cao cấp năm nay.`
              ]
            },
            {
              id: 3,
              title: `Mẹo sử dụng & Tối ưu pin ${product.name} dùng mượt cả ngày`,
              category: 'MẸO SỬ DỤNG',
              excerpt: `Tổng hợp 10 cài đặt ẩn giúp tăng gấp đôi tuổi thọ pin, tùy biến giao diện mượt mà và chế độ chụp đêm cực phẩm.`,
              author: 'Chuyên gia Công nghệ',
              date: '3 ngày trước',
              readTime: '3 phút đọc',
              image: product.images[2] || product.images[0],
              content: [
                `Bật tính năng sạc thông minh bảo vệ pin ở mức 80%, tắt các ứng dụng chạy ngầm không cần thiết và bật Chế độ tối (Dark Mode) để tiết kiệm pin OLED lên đến 30%.`,
                `Tùy chỉnh phím tắt nhanh để bật camera trong 0.5 giây giúp bạn không bỏ lỡ bất kỳ khoảnh khắc quý giá nào trong cuộc sống.`
              ]
            }
          ].map(article => (
            <div 
              key={article.id} 
              onClick={() => setSelectedArticleModal(article)}
              className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition group bg-white flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="h-44 bg-gray-50 overflow-hidden relative p-3 flex items-center justify-center border-b border-gray-100">
                  <img src={article.image} alt={article.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition" />
                  <span className="absolute top-2.5 left-2.5 bg-[#d70018] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow">TIN NỔI BẬT</span>
                </div>
                <div className="p-4 space-y-2.5">
                  <div className="flex items-center text-xs text-gray-500 font-semibold space-x-2">
                    <span className="font-extrabold text-gray-800">{article.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gray-400" /> {article.date}</span>
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-gray-900 group-hover:text-[#d70018] transition line-clamp-2 leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed font-normal">
                    {article.excerpt}
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4">
                <span className="text-xs sm:text-sm font-black text-[#d70018] group-hover:underline flex items-center space-x-1">
                  <span>Đọc bài viết</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ Accordion) */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
        <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
          <h3 className="font-extrabold text-base text-gray-900 flex items-center space-x-2 font-display">
            <HelpCircle className="w-5 h-5 text-[#d70018]" />
            <span>Các Câu Hỏi Thường Gặp Khi Mua {product.name}</span>
          </h3>
          <span className="text-xs text-gray-500 font-medium">Hỗ trợ tư vấn 24/7 (Miễn phí 1800.2097)</span>
        </div>

        <div className="space-y-3">
          {[
            {
              q: `Sản phẩm ${product.name} tại Thế Giới Công Nghệ có chính hãng 100% không?`,
              a: `Tất cả sản phẩm bán ra tại Thế Giới Công Nghệ cam kết 100% là hàng mới nguyên niêm phong seal, chính hãng phân phối chính thức tại Việt Nam (VN/A), xuất đầy đủ hóa đơn VAT.`
            },
            {
              q: `Chính sách bảo hành và 1 đổi 1 như thế nào?`,
              a: `Quý khách được hưởng quyền lợi 1 ĐỔI 1 TRONG 30 NGÀY nếu sản phẩm có lỗi phần cứng từ nhà sản xuất. Sản phẩm được bảo hành chính hãng 12 tháng tại các trung tâm ủy quyền toàn quốc.`
            },
            {
              q: `Tôi có thể Mua Trả Góp 0% và Thu Cũ Đổi Mới không?`,
              a: `Có! Hệ thống hỗ trợ Trả góp 0% lãi suất qua thẻ tín dụng hơn 25 ngân hàng hoặc qua công ty tài chính (0đ trả trước). Đồng thời trợ giá Thu Cũ Đổi Mới lên đến 2.000.000đ.`
            },
            {
              q: `Thời gian giao hàng mất bao lâu sau khi chốt đơn?`,
              a: `Giao hàng hỏa tốc trong 1 - 2 giờ tại nội thành TP. Hồ Chí Minh & Hà Nội. Các tỉnh thành khác giao nhanh trong vòng 1 - 3 ngày làm việc qua đối tác vận chuyển uy tín.`
            },
            {
              q: `Tôi có được mở hộp kiểm tra sản phẩm trước khi thanh toán không?`,
              a: `Hoàn toàn được! Quý khách được quyền đồng kiểm sản phẩm với nhân viên giao hàng, kiểm tra tem seal, nguyên vẹn ngoại quan trước khi ký nhận thanh toán.`
            }
          ].map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-2xl transition overflow-hidden ${isOpen ? 'border-red-200 bg-red-50/30' : 'border-gray-200 bg-white'}`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-xs text-gray-900 flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-[#d70018] font-black text-[10px] flex items-center justify-center shrink-0">
                      Q{index + 1}
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#d70018]' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-gray-600 border-t border-red-100/60 leading-relaxed animate-in fade-in">
                    <div className="flex items-start space-x-2">
                      <span className="font-black text-[#d70018] shrink-0">💡 Trả lời:</span>
                      <span>{faq.a}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* All Product News Modal */}
      {isAllNewsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 relative border border-gray-100 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-red-50 text-[#d70018] rounded-xl">
                  <Newspaper className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900 font-display">
                    Tất Cả Bài Viết & Đánh Giá Về {product.name}
                  </h3>
                  <p className="text-xs text-gray-500">Tổng hợp trải nghiệm camera, hiệu năng gaming và hướng dẫn sử dụng</p>
                </div>
              </div>
              <button onClick={() => setIsAllNewsModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: 1,
                  title: `Đánh giá chi tiết ${product.name}: Sức mạnh đột phá năm 2026!`,
                  category: 'ĐÁNH GIÁ SẢN PHẨM',
                  excerpt: `Trải nghiệm thực tế camera AI 50MP, hiệu năng chip 3nm đỉnh cao và thời lượng pin sạc siêu tốc 30 phút.`,
                  author: 'S-Tech Lab',
                  date: '3 giờ trước',
                  readTime: '4 phút đọc',
                  image: product.images[0],
                  content: [
                    `Trong trải nghiệm thực tế kéo dài 1 tuần tại phòng thử nghiệm S-Tech Lab, ${product.name} ấn tượng mạnh mẽ nhờ sự kết hợp giữa thiết kế cao cấp và sức mạnh xử lý phần cứng cực hạn.`,
                    `Màn hình tần số quét 120Hz mượt mà, độ sáng đỉnh 2.500 nits hiển thị rõ nét ngay dưới ánh nắng mặt trời gắt. Cụm camera quay chụp đêm khử nhiễu AI ấn tượng, tái tạo màu sắc chân thực.`,
                    `Hệ thống tản nhiệt tối ưu giúp máy luôn duy trì nhiệt độ mát mẻ dưới 38°C ngay cả khi chơi các tựa game đồ họa nặng liên tục trong 2 giờ.`,
                    `💡 Lời khuyên: Sản phẩm hiện đang có sẵn tại hệ thống Thế Giới Công Nghệ với ưu đãi tặng gói bảo hành VIP 1 đổi 1 và Trả góp 0%.`
                  ]
                },
                {
                  id: 2,
                  title: `So sánh ${product.name} và các đối thủ cùng phân khúc cao cấp`,
                  category: 'SO SÁNH CÔNG NGHỆ',
                  excerpt: `Phân tích chi tiết màn hình LTPO OLED, độ phân giải sắc nét và chính sách trợ giá thu cũ đổi mới độc quyền.`,
                  author: 'Biên tập viên Thế Giới Công Nghệ',
                  date: '1 ngày trước',
                  readTime: '5 phút đọc',
                  image: product.images[1] || product.images[0],
                  content: [
                    `Khi đặt ${product.name} lên bàn cân so sánh cùng các sản phẩm flagship khác trong cùng tầm giá, thiết bị nổi bật với khả năng tối ưu hóa phần mềm và thời lượng pin sử dụng thực tế.`,
                    `Chính sách trợ giá Thu Cũ Đổi Mới đến 2.000.000đ tại cửa hàng giúp chi phí nâng cấp sản phẩm trở nên hấp dẫn hơn bao giờ hết.`
                  ]
                }
              ].map(art => (
                <div 
                  key={art.id}
                  onClick={() => setSelectedArticleModal(art)}
                  className="p-4 border border-gray-200 rounded-2xl flex gap-4 hover:shadow-md transition cursor-pointer bg-white"
                >
                  <img src={art.image} alt="" className="w-24 h-24 object-contain rounded-xl bg-gray-50 p-1 shrink-0" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-[#d70018] bg-red-50 px-2 py-0.5 rounded-md">{art.category}</span>
                    <h4 className="font-bold text-xs text-gray-900">{art.title}</h4>
                    <p className="text-[11px] text-gray-500 line-clamp-2">{art.excerpt}</p>
                    <span className="text-xs text-[#d70018] font-bold block pt-1 hover:underline">Đọc ngay &raquo;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Article Detail Reader Modal */}
      {selectedArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 relative border border-gray-100 shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div className="space-y-1 pr-6">
                <span className="bg-red-50 text-[#d70018] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase border border-red-200">
                  {selectedArticleModal.category || 'TIN CÔNG NGHỆ'}
                </span>
                <h3 className="font-extrabold text-base text-gray-900 font-display leading-snug pt-1">
                  {selectedArticleModal.title}
                </h3>
                <div className="flex items-center text-[11px] text-gray-500 space-x-3 pt-0.5">
                  <span className="font-bold text-gray-700">{selectedArticleModal.author}</span>
                  <span>•</span>
                  <span>{selectedArticleModal.date}</span>
                  <span>•</span>
                  <span className="text-[#d70018] font-bold">{selectedArticleModal.readTime || '3 phút đọc'}</span>
                </div>
              </div>
              <button onClick={() => setSelectedArticleModal(null)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full h-52 bg-gray-50 rounded-2xl p-3 flex items-center justify-center overflow-hidden border border-gray-200">
              <img src={selectedArticleModal.image} alt="" className="max-h-full max-w-full object-contain" />
            </div>

            <div className="space-y-3 text-xs text-gray-700 leading-relaxed font-normal">
              {(selectedArticleModal.content || [selectedArticleModal.excerpt]).map((para, idx) => (
                <p key={idx} className={para.startsWith('💡') ? 'bg-red-50 p-3 rounded-xl border border-red-200 font-bold text-gray-900' : ''}>
                  {para}
                </p>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <span className="text-[11px] text-gray-400">© 2026 Thế Giới Công Nghệ</span>
              <button
                onClick={() => setSelectedArticleModal(null)}
                className="bg-[#d70018] hover:bg-[#be0015] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow"
              >
                Đóng bài viết
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
