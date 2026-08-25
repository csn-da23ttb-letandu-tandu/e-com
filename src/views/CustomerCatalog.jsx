import React, { useState, useMemo } from 'react';
import {
  Star, Heart, ShoppingCart, SlidersHorizontal, ChevronRight, Check, Scale, Gift, Sparkles, X,
  Smartphone, Laptop, Tablet, Headphones, Watch, Plug, Layers, Newspaper, HelpCircle, ChevronDown, Clock, ArrowRight, Truck, ShieldCheck, Flame
} from 'lucide-react';
import { smartMatchProduct } from '../utils/searchUtils';
import TradeInModal from '../components/TradeInModal';
import InstallmentModal from '../components/InstallmentModal';
import StudentDiscountModal from '../components/StudentDiscountModal';

export default function CustomerCatalog({
  products,
  articles = [],
  onSelectProduct,
  onAddToCart,
  searchQuery,
  selectedCategory,
  setSelectedCategory,
  compareList = [],
  onToggleCompare,
  onOpenCompareModal,
  wishlist = [],
  onToggleWishlist,
  onOpenLuckyWheel,
  adBanners = [],
  user,
  onNavigateAdmin
}) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [selectedArticleModal, setSelectedArticleModal] = useState(null);
  const [isAllNewsModalOpen, setIsAllNewsModalOpen] = useState(false);
  const [isTradeInOpen, setIsTradeInOpen] = useState(false);

  // Dynamic Hero Banners State Mapping
  const heroMainBanner = adBanners.find(b => b.position === 'hero-main' && b.isActive !== false) || {
    badge: 'SIÊU PHẨM THẾ GIỚI CÔNG NGHỆ',
    title: 'Khám phá công nghệ mới nhất',
    subtitle: 'Tuyển tập thiết bị flagship hàng đầu thị trường. Giảm tới 2 Triệu cho thành viên khi thu cũ đổi mới.',
    buttonText: 'Xem chi tiết ngay',
    imageUrl: products[0]?.images[0],
    productId: products[0]?.id
  };

  const heroSub1Banner = adBanners.find(b => b.position === 'hero-sub-1' && b.isActive !== false) || {
    badge: 'MỚI VỀ',
    title: products[1]?.name || 'iPhone 16 Pro Max 512GB',
    price: products[1]?.price || 34990000,
    imageUrl: products[1]?.images[0],
    productId: products[1]?.id
  };

  const heroSub2Banner = adBanners.find(b => b.position === 'hero-sub-2' && b.isActive !== false) || {
    badge: 'HOT DEAL',
    title: products[2]?.name || 'Samsung Galaxy S25 Plus 256GB',
    price: products[2]?.price || 19990000,
    imageUrl: products[2]?.images[0],
    productId: products[2]?.id
  };

  const resolveBannerTarget = (banner, defaultProduct) => {
    if (banner?.productId) {
      const match = products.find(p => String(p.id) === String(banner.productId));
      if (match) return match;
    }
    return defaultProduct || products[0];
  };
  const [isInstallmentOpen, setIsInstallmentOpen] = useState(false);
  const [isStudentOpen, setIsStudentOpen] = useState(false);

  const handleBuyNowAdBanner = (brandName) => {
    const matched = products.find(p => p.brand?.toLowerCase() === brandName?.toLowerCase() || p.name?.toLowerCase().includes(brandName?.toLowerCase())) || products[0];
    if (matched) {
      onSelectProduct(matched);
    } else {
      setSelectedCategory('Smartphones');
    }
  };

  const TECH_ARTICLES = [
    {
      id: 1,
      title: "Top 5 Điện Thoại Flagship Bán Chạy Nhất Tháng 7/2026: iPhone 16 Pro Max dẫn đầu!",
      category: "TƯ VẤN MUA SẮM",
      author: "Ban Biên Tập Thế Giới Công Nghệ",
      date: "2 giờ trước",
      readTime: "4 phút đọc",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
      excerpt: "Khám phá danh sách các mẫu smartphone sở hữu hiệu năng mạnh mẽ nhất, camera zoom 100x và ưu đãi trả góp 0%.",
      content: [
        "Năm 2026 ghi nhận sự bùng nổ của thế hệ smartphone tích hợp trí tuệ nhân tạo (Galaxy AI & Apple Intelligence). Trong đó, iPhone 16 Pro Max phiên bản Titan Sa Mạc liên tục chiếm vị trí số 1 danh số bán chạy tại hệ thống Thế Giới Công Nghệ.",
        "Điểm nổi bật nằm ở hệ thống camera zoom quang 5x tiêu cự 120mm siêu nét, chip A18 Pro tiến trình 3nm thứ hai cho hiệu năng chơi game 120fps mượt mà và thời lượng pin kéo dài hơn 33 giờ liên tục.",
        "Xếp ở vị trí thứ hai là Samsung Galaxy S25 Ultra 512GB với thiết kế khung Titan siêu nhẹ, tích hợp bút S-Pen huyền thoại và khả năng xử lý hình ảnh AI đỉnh cao. Tiếp theo là Xiaomi 17 Ultra với cụm ống kính hợp tác cùng Leica.",
        "💡 Lời khuyên mua hàng: Quý khách đăng ký hội viên Smember sẽ được giảm trực tiếp 5% và nhận gói bảo hành đặc quyền 1 đổi 1 trong 30 ngày."
      ]
    },
    {
      id: 2,
      title: "Tất Tần Tật Về Chip Snapdragon 8 Elite: Bước nhảy vọt hiệu năng gaming AI!",
      category: "CÔNG NGHỆ MỚI",
      author: "Chuyên Gia S-Tech",
      date: "5 giờ trước",
      readTime: "5 phút đọc",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
      excerpt: "Đánh giá chi tiết vi xử lý 3nm mới nhất trên Xiaomi 17 Ultra và Galaxy S25 Ultra với khả năng tiết kiệm pin 40%.",
      content: [
        "Vi xử lý Snapdragon 8 Elite kiến trúc Oryon thế hệ mới mang lại xung nhịp CPU cực đại 4.32 GHz, đánh dấu bước ngoặt lớn về hiệu năng di động toàn cầu.",
        "Trong các thử nghiệm Benchmark thực tế tại phòng Lab, Snapdragon 8 Elite ghi nhận điểm số Geekbench 6 đơn nhân vượt 3.200 điểm và đa nhân vượt 10.500 điểm - cao hơn 45% so với thế hệ tiền nhiệm.",
        "Khả năng tản nhiệt buồng hơi 3D giúp thiết bị duy trì tốc độ khung hình 60 - 120 fps ổn định ngay cả khi chơi các tựa game đồ họa nặng như Genshin Impact ở cài đặt Max Setting.",
        "💡 Lời khuyên: Nếu bạn là một game thủ di động hoặc cần xử lý video 8K trực tiếp trên điện thoại, các mẫu flagship chạy Snapdragon 8 Elite là sự lựa chọn hàng đầu."
      ]
    },
    {
      id: 3,
      title: "Nên Mua MacBook Pro M3 Hay MacBook Air M3 Nào Phù Hợp Cho Dân Lập Trình & Thiết Kế?",
      category: "TƯ VẤN LAPTOP",
      author: "Lê Hoàng Nam",
      date: "1 ngày trước",
      readTime: "6 phút đọc",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
      excerpt: "Phân tích cấu hình RAM, dung lượng SSD và hệ thống tản nhiệt tối ưu cho người dùng làm việc chuyên nghiệp.",
      content: [
        "Việc lựa chọn giữa dòng MacBook Air M3 mỏng nhẹ và MacBook Pro M3 hiệu năng cao luôn là câu hỏi lớn của nhiều kỹ sư phần mềm, lập trình viên và nhà thiết kế đồ họa.",
        "MacBook Air M3 phù hợp tuyệt đối cho nhu cầu di chuyển nhiều, thời lượng pin 18 tiếng, thiết kế không quạt tản nhiệt hoàn toàn yên tĩnh. Máy xử lý mượt mà tác vụ chỉnh sửa ảnh Photoshop, lập trình Web/React/NodeJS.",
        "Trong khi đó, MacBook Pro M3 / M3 Pro trang bị hệ thống tản nhiệt quạt kép chủ động, màn hình Liquid Retina XDR 120Hz ProMotion và cổng kết nối HDMI/SDXC card slot cực kỳ phù hợp cho các dự án Build code nặng, Render video 4K/8K và thiết kế 3D.",
        "💡 Ưu đãi tại cửa hàng: Giảm thêm 1.000.000đ cho Học sinh - Sinh viên & Trả góp 0% lãi suất."
      ]
    },
    {
      id: 4,
      title: "Hướng Dẫn Đăng Ký Smember Nhận Ngay Voucher Giảm Trực Tiếp 500K & Tích Điểm Đổi Quà",
      category: "ƯU ĐÃI THÀNH VIÊN",
      author: "Đội Ngũ Chăm Sóc Khách Hàng",
      date: "2 ngày trước",
      readTime: "3 phút đọc",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop",
      excerpt: "Mẹo mua hàng tiết kiệm với hạng thẻ S-ELITE, hưởng đặc quyền bảo hành VIP và hỗ trợ giao hàng tận nhà 1h.",
      content: [
        "Chương trình khách hàng thân thiết Smember của Thế Giới Công Nghệ được thiết kế nhằm mang lại đặc quyền mua sắm tiết kiệm tối đa cho người dùng công nghệ Việt Nam.",
        "Ngay sau khi đăng ký tài khoản miễn phí bằng Số điện thoại hoặc Email, bạn sẽ nhận được Mã giảm giá 5% cho tất cả thiết bị và Mã trợ giá 500.000đ cho đơn hàng mua sắm đầu tiên.",
        "Hơn nữa, mỗi giao dịch tích lũy sẽ giúp bạn nâng hạng thẻ từ S-MEM lên S-VIP và S-ELITE để nhận mức giảm VIP cố định tới 8% cùng voucher quà tặng sinh nhật đặc biệt.",
        "💡 Đăng ký ngay hôm nay tại góc trên bên phải màn hình để tích điểm thưởng!"
      ]
    }
  ];

  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState(100000000); // max price filter
  const [sortBy, setSortBy] = useState('popular');
  const [favorites, setFavorites] = useState([]);

  const [activeMegaTab, setActiveMegaTab] = useState('deals');
  const [megaCategory, setMegaCategory] = useState('All');
  const [megaSubCategory, setMegaSubCategory] = useState('All');
  const megaScrollRef = React.useRef(null);

  const handleMegaScroll = (direction) => {
    if (megaScrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      megaScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const brands = ['All', 'Apple', 'Samsung', 'Xiaomi', 'Sony', 'Asus', 'Dell', 'Lenovo', 'Marshall', 'Anker', 'Logitech', 'Keychron', 'Google'];

  // Toggle wishlist heart
  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filter products based on smart search, category, brand, and price
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = smartMatchProduct(p, searchQuery);
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchBrand = selectedBrand === 'All' || p.brand === selectedBrand;
      const matchPrice = p.price <= priceRange;
      return matchSearch && matchCategory && matchBrand && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.salesCount - a.salesCount;
    });
  }, [products, searchQuery, selectedCategory, selectedBrand, priceRange, sortBy]);

  // Reset to page 1 whenever filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedBrand, priceRange, sortBy]);

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const displayedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* Quick Category Navigation Strip (CellphoneS Style) */}
      <div className="mb-6 bg-white rounded-2xl p-3 border border-gray-200 shadow-sm overflow-x-auto scrollbar-none">
        <div className="flex items-center space-x-2 min-w-max">
          {[
            { id: 'All', label: 'Tất cả sản phẩm', icon: Layers, count: products.length },
            { id: 'Smartphones', label: 'Điện thoại', icon: Smartphone, count: products.filter(p => p.category === 'Smartphones').length },
            { id: 'Laptops', label: 'Laptop', icon: Laptop, count: products.filter(p => p.category === 'Laptops').length },
            { id: 'Tablets', label: 'Máy tính bảng', icon: Tablet, count: products.filter(p => p.category === 'Tablets').length },
            { id: 'Audio', label: 'Tai nghe & Âm thanh', icon: Headphones, count: products.filter(p => p.category === 'Audio').length },
            { id: 'Smartwatches', label: 'Đồng hồ thông minh', icon: Watch, count: products.filter(p => p.category === 'Smartwatches').length },
            { id: 'Accessories', label: 'Phụ kiện & Củ sạc', icon: Plug, count: products.filter(p => p.category === 'Accessories').length }
          ].map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedBrand('All');
                }}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 border ${isSelected
                  ? 'bg-[#d70018] text-white border-[#d70018] shadow-md shadow-red-500/20 scale-[1.02]'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-red-50 hover:text-[#d70018] hover:border-red-200'
                  }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${isSelected ? 'bg-white text-[#d70018]' : 'bg-gray-200 text-gray-700'
                  }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Banners Grid (CellphoneS Style Promo Grid - Fully Editable in Admin) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        {/* Main Big Banner */}
        <div className="md:col-span-2 relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 to-red-950 text-white p-8 flex flex-col justify-between min-h-[220px] shadow-lg border border-gray-800 group">
          <div 
            className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: `url(${heroMainBanner.imageUrl || products[0]?.images[0]})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-900"></div>
          </div>

          {/* Quick Admin Edit Trigger Button */}
          {user?.role === 'admin' && (
            <button
              onClick={(e) => { e.stopPropagation(); onNavigateAdmin?.('banners'); }}
              className="absolute top-3 right-3 bg-amber-500 hover:bg-amber-400 text-black text-[11px] font-extrabold px-3 py-1 rounded-xl shadow-lg z-20 flex items-center gap-1 transition animate-bounce"
            >
              <span>✏️ Chỉnh sửa Banner Này (Admin)</span>
            </button>
          )}

          <div className="relative z-10 max-w-sm">
            {heroMainBanner.badge && (
              <span className="inline-block bg-[#d70018] text-white text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md mb-2 shadow">
                {heroMainBanner.badge}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight mb-2">
              {heroMainBanner.title}
            </h2>
            <p className="text-xs text-gray-300 mb-4 line-clamp-2">
              {heroMainBanner.subtitle}
            </p>
            <button
              onClick={() => onSelectProduct(resolveBannerTarget(heroMainBanner, products[0]))}
              className="bg-white text-[#d70018] hover:bg-gray-100 font-bold px-5 py-2 rounded-lg text-xs transition shadow-md flex items-center space-x-1"
            >
              <span>{heroMainBanner.buttonText || 'Xem chi tiết ngay'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Side Banner Cards */}
        <div className="flex flex-col gap-4">
          
          {/* Sub Banner 1 (Mới về) */}
          <div
            onClick={() => onSelectProduct(resolveBannerTarget(heroSub1Banner, products[1]))}
            className="relative flex-1 bg-gradient-to-r from-red-900 to-red-700 text-white rounded-2xl p-4 flex items-center justify-between cursor-pointer shadow hover:shadow-md transition border border-red-800 group"
          >
            {user?.role === 'admin' && (
              <button
                onClick={(e) => { e.stopPropagation(); onNavigateAdmin?.('banners'); }}
                className="absolute top-2 right-2 bg-amber-400 text-black text-[9px] font-extrabold px-2 py-0.5 rounded shadow opacity-90 hover:opacity-100 z-10"
              >
                ✏️ Sửa Banner 1
              </button>
            )}
            <div className="pr-2">
              <span className="text-[10px] uppercase font-bold bg-yellow-400 text-black px-2 py-0.5 rounded">
                {heroSub1Banner.badge || 'MỚI VỀ'}
              </span>
              <h3 className="font-bold text-sm mt-1 line-clamp-1">{heroSub1Banner.title}</h3>
              <div className="text-xs font-semibold text-yellow-300 mt-1">
                {heroSub1Banner.price ? Number(heroSub1Banner.price).toLocaleString('vi-VN') + 'đ' : (products[1]?.price ? products[1]?.price.toLocaleString('vi-VN') + 'đ' : '')}
              </div>
            </div>
            <img
              src={heroSub1Banner.imageUrl || products[1]?.images[0]}
              alt={heroSub1Banner.title}
              referrerPolicy="no-referrer"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop"; }}
              className="w-20 h-20 object-contain rounded-lg shadow-sm border border-white/20 shrink-0 ml-2 bg-white/10 p-1"
            />
          </div>

          {/* Sub Banner 2 (Hot Deal) */}
          <div
            onClick={() => onSelectProduct(resolveBannerTarget(heroSub2Banner, products[2]))}
            className="relative flex-1 bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between cursor-pointer shadow hover:shadow-md transition border border-slate-800 group"
          >
            {user?.role === 'admin' && (
              <button
                onClick={(e) => { e.stopPropagation(); onNavigateAdmin?.('banners'); }}
                className="absolute top-2 right-2 bg-blue-400 text-black text-[9px] font-extrabold px-2 py-0.5 rounded shadow opacity-90 hover:opacity-100 z-10"
              >
                ✏️ Sửa Banner 2
              </button>
            )}
            <div className="pr-2">
              <span className="text-[10px] uppercase font-bold bg-green-500 text-white px-2 py-0.5 rounded">
                {heroSub2Banner.badge || 'HOT DEAL'}
              </span>
              <h3 className="font-bold text-sm mt-1 line-clamp-1">{heroSub2Banner.title}</h3>
              <div className="text-xs font-semibold text-red-400 mt-1">
                {heroSub2Banner.price ? Number(heroSub2Banner.price).toLocaleString('vi-VN') + 'đ' : (products[2]?.price ? products[2]?.price.toLocaleString('vi-VN') + 'đ' : '')}
              </div>
            </div>
            <img
              src={heroSub2Banner.imageUrl || products[2]?.images[0]}
              alt={heroSub2Banner.title}
              referrerPolicy="no-referrer"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop"; }}
              className="w-20 h-20 object-contain rounded-lg shadow-sm border border-white/20 shrink-0 ml-2 bg-white/10 p-1"
            />
          </div>

        </div>

      </div>

      {/* CellphoneS Mega Deal Showcase Section (DEAL SỐC MỖI NGÀY / SẢN PHẨM HOT TREND / HÀNG MỚI VỀ) */}
      <div className="mb-10 bg-gradient-to-b from-blue-50/60 to-white rounded-3xl p-4 sm:p-6 border-2 border-blue-500/30 shadow-lg relative overflow-hidden">

        {/* Top 3 Main Tabs Header */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-5 border-b border-blue-200 pb-3">

          {/* Tab 1: DEAL SỐC MỖI NGÀY */}
          <button
            onClick={() => { setActiveMegaTab('deals'); setMegaCategory('All'); setMegaSubCategory('All'); }}
            className={`py-3 px-2 sm:px-4 rounded-2xl font-black text-xs sm:text-base uppercase transition-all duration-300 flex items-center justify-center space-x-1.5 ${activeMegaTab === 'deals'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 border-2 border-blue-400 scale-[1.02]'
              : 'bg-white text-blue-900 hover:bg-blue-100/60 border border-blue-200'
              }`}
          >
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent drop-shadow-sm font-black flex items-center gap-1">
              🔥 DEAL SỐC MỖI NGÀY
            </span>
          </button>

          {/* Tab 2: SẢN PHẨM HOT TREND */}
          <button
            onClick={() => { setActiveMegaTab('hottrend'); setMegaCategory('All'); setMegaSubCategory('All'); }}
            className={`py-3 px-2 sm:px-4 rounded-2xl font-black text-xs sm:text-base uppercase transition-all duration-300 flex items-center justify-center space-x-1.5 ${activeMegaTab === 'hottrend'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 border-2 border-blue-400 scale-[1.02]'
              : 'bg-white text-blue-900 hover:bg-blue-100/60 border border-blue-200'
              }`}
          >
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent drop-shadow-sm font-black flex items-center gap-1">
              🔥 SẢN PHẨM HOT TREND
            </span>
          </button>

          {/* Tab 3: HÀNG MỚI VỀ */}
          <button
            onClick={() => { setActiveMegaTab('new'); setMegaCategory('All'); setMegaSubCategory('All'); }}
            className={`py-3 px-2 sm:px-4 rounded-2xl font-black text-xs sm:text-base uppercase transition-all duration-300 flex items-center justify-center space-x-1.5 ${activeMegaTab === 'new'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 border-2 border-blue-400 scale-[1.02]'
              : 'bg-white text-blue-900 hover:bg-blue-100/60 border border-blue-200'
              }`}
          >
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent drop-shadow-sm font-black flex items-center gap-1">
              🚀 HÀNG MỚI VỀ ⚡
            </span>
          </button>
        </div>

        {/* Row 1: Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-2 mb-2">
          {[
            { id: 'All', label: 'Tất cả' },
            { id: 'Smartphones', label: 'Điện thoại' },
            { id: 'Tablets', label: 'Máy tính bảng' },
            { id: 'Laptops', label: 'Laptop' },
            { id: 'Audio', label: 'Đồng hồ, âm thanh' },
            { id: 'Accessories', label: 'Phụ kiện' },
            { id: 'Appliances', label: 'Điện máy, gia dụng' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setMegaCategory(item.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold shrink-0 border transition-all ${megaCategory === item.id
                ? 'bg-blue-600 text-white border-blue-600 shadow'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-600'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Row 2: Sub-category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-3 mb-4">
          {[
            { id: 'All', label: 'Tất cả' },
            { id: 'chargers', label: '🔌 Củ cáp' },
            { id: 'mouse_keyboard', label: '⌨️ Chuột, bàn phím' },
            { id: 'powerbank', label: '🔋 Sạc dự phòng' },
            { id: 'camera', label: '📷 Camera' },
            { id: 'apple_acc', label: '🍏 Phụ kiện Apple' },
            { id: 'utility_acc', label: '✨ Phụ kiện tiện ích' },
            { id: 'case', label: '📱 Ốp lưng' }
          ].map(sub => (
            <button
              key={sub.id}
              onClick={() => setMegaSubCategory(sub.id)}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold shrink-0 border transition ${megaSubCategory === sub.id
                ? 'bg-blue-100 border-blue-400 text-blue-700 font-extrabold'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
            >
              {sub.label}
            </button>
          ))}
        </div>

        {/* Product Slider Items */}
        <div className="relative group/slider">

          {/* Scroll Left Arrow */}
          <button
            onClick={() => handleMegaScroll('left')}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-xl border border-gray-200 text-gray-700 hover:bg-red-50 hover:text-[#d70018] flex items-center justify-center opacity-90 hover:opacity-100 transition"
          >
            &lsaquo;
          </button>

          {/* Scroll Right Arrow */}
          <button
            onClick={() => handleMegaScroll('right')}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-xl border border-gray-200 text-gray-700 hover:bg-red-50 hover:text-[#d70018] flex items-center justify-center opacity-90 hover:opacity-100 transition"
          >
            &rsaquo;
          </button>

          {/* Slider Container */}
          <div
            ref={megaScrollRef}
            className="flex items-stretch space-x-4 overflow-x-auto scrollbar-none py-2 px-1 scroll-smooth"
          >
            {products
              .filter(p => {
                if (megaCategory !== 'All' && p.category !== megaCategory) return false;
                if (activeMegaTab === 'deals') return (p.oldPrice || p.price) > 0;
                if (activeMegaTab === 'hottrend') return (p.salesCount || 0) > 2;
                if (activeMegaTab === 'new') return p.badge === 'MỚI VỀ' || p.badge === 'HOT' || true;
                return true;
              })
              .map((prod, index) => {
                const discountPercent = prod.oldPrice ? Math.round(((prod.oldPrice - prod.price) / prod.oldPrice) * 100) : 25;
                const isFav = wishlist.includes(prod.id);

                return (
                  <div
                    key={prod.id || index}
                    onClick={() => onSelectProduct(prod)}
                    className="w-60 sm:w-64 shrink-0 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative group border-t-4 border-t-blue-500 hover:border-t-[#d70018]"
                  >
                    {/* Discount & Installment Badges */}
                    <div className="flex justify-between items-start z-10">
                      <span className="bg-[#d70018] text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow">
                        Giảm {discountPercent}%
                      </span>
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                        Trả góp 0%
                      </span>
                    </div>

                    {/* Brand Name */}
                    <div className="text-[10px] font-extrabold text-gray-400 uppercase mt-2">
                      {prod.brand}
                    </div>

                    {/* Image with specs annotation overlay */}
                    <div className="my-3 h-36 flex items-center justify-center relative overflow-hidden bg-gray-50/50 rounded-xl p-2">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Sub Specs annotation tag */}
                      <div className="absolute right-1 bottom-1 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        {prod.capacity || 'Chính hãng'}
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 group-hover:text-[#d70018] transition line-clamp-2 leading-snug mb-2">
                      {prod.name}
                    </h4>

                    {/* Prices */}
                    <div className="space-y-1 mb-2">
                      <div className="text-base font-black text-[#d70018]">
                        {prod.price.toLocaleString('vi-VN')}đ
                      </div>
                      {prod.oldPrice && (
                        <div className="text-xs text-gray-400 line-through">
                          {prod.oldPrice.toLocaleString('vi-VN')}đ
                        </div>
                      )}
                    </div>

                    {/* S-Student / Offer Tag */}
                    <div className="bg-blue-50/80 rounded-lg p-1.5 text-[10px] text-blue-900 font-bold mb-3 border border-blue-100 leading-tight">
                      S-Student giảm thêm 300.000đ • Trả góp 0đ phụ phí
                    </div>

                    {/* Bottom Features & Action */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px]">
                      <span className="bg-blue-600 text-white font-extrabold px-2 py-0.5 rounded-full text-[9px] flex items-center gap-1">
                        ⚡ 2 Giờ
                      </span>

                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-800 flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {prod.rating || 5}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist?.(prod.id);
                          }}
                          className="p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
          </div>
        </div>

      </div>

      {/* Lucky Spin Promo Banner Strip */}
      <div
        onClick={onOpenLuckyWheel}
        className="mb-8 bg-gradient-to-r from-red-600 via-[#d70018] to-red-700 text-white p-4 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition flex items-center justify-between flex-wrap gap-3 border border-red-500"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-amber-400 text-slate-900 rounded-xl font-bold shadow animate-bounce">
            <Gift className="w-5 h-5 text-red-700" />
          </div>
          <div>
            <h4 className="font-black text-sm text-white flex items-center gap-2">
              Vòng Quay May Mắn Thế Giới Công Nghệ
              <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                100% Trúng Thưởng
              </span>
            </h4>
            <p className="text-xs text-red-100 mt-0.5">Quay ngay để săn Mã Giảm Giá tới 500.000đ & Miễn phí vận chuyển 0đ!</p>
          </div>
        </div>

        <button className="bg-white text-[#d70018] hover:bg-gray-100 font-extrabold px-5 py-2 rounded-xl text-xs transition shadow flex items-center gap-1">
          <span>Quay ngay</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content Layout: Sidebar + Product Grid */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Left Filter & Promo Sticky Sidebar */}
        <aside className="lg:w-1/4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-fit space-y-6 sticky top-20 self-start">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-[#d70018]" />
              <span>Bộ lọc tìm kiếm</span>
            </h3>
            {(selectedBrand !== 'All' || selectedCategory !== 'All' || priceRange < 100000000) && (
              <button
                onClick={() => {
                  setSelectedBrand('All');
                  setSelectedCategory('All');
                  setPriceRange(100000000);
                }}
                className="text-[11px] text-[#d70018] font-semibold hover:underline"
              >
                Xóa tất cả
              </button>
            )}
          </div>

          {/* Brand Filter */}
          <div>
            <h4 className="font-bold text-xs text-gray-700 uppercase tracking-wider mb-2">Thương hiệu</h4>
            <div className="flex flex-wrap gap-2">
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${selectedBrand === brand
                    ? 'bg-red-50 border-[#d70018] text-[#d70018]'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {brand === 'All' ? 'Tất cả' : brand}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-xs text-gray-700 uppercase tracking-wider">Mức giá tối đa</h4>
              <span className="text-xs font-bold text-[#d70018]">
                {priceRange >= 100000000 ? 'Tất cả mức giá' : `${(priceRange / 1000000).toFixed(0)} Triệu`}
              </span>
            </div>
            <input
              type="range"
              min="5000000"
              max="100000000"
              step="5000000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#d70018] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>5 Tr</span>
              <span>50 Tr</span>
              <span>100 Tr</span>
            </div>
          </div>

          {/* Special Banner Promo Box */}
          <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/20 border border-yellow-200 p-4 rounded-xl text-xs space-y-2">
            <div className="font-bold text-amber-900 flex items-center space-x-1">
              <span>👑 Ưu đãi đặc quyền Smember</span>
            </div>
            <p className="text-amber-800 text-[11px]">
              Tích điểm hoàn tiền lên tới 2.5% cho mỗi đơn hàng & miễn phí giao hàng toàn quốc.
            </p>
          </div>

          {/* Left Sidebar Promo Ad Banners (Cột Quảng Cáo Bên Trái) */}
          <div className="space-y-4 pt-2">
            {/* Dynamic Admin Ad Banners for Left Sidebar */}
            {adBanners.filter(b => (b.position === 'left-sidebar' || !b.position) && b.isActive !== false).map(banner => (
              <div key={banner.id} className="bg-white rounded-3xl p-5 text-slate-900 shadow-xl space-y-3.5 relative overflow-hidden group border-2 border-blue-400 transition-all hover:shadow-2xl">
                {/* Logo / Brand */}
                <div className="text-center font-black text-2xl tracking-widest text-slate-950 uppercase font-sans border-b border-slate-100 pb-1.5">
                  {banner.brand || 'OPPO'}
                </div>

                {/* Title & Subtitle */}
                <div className="text-center space-y-1">
                  <h3 className="font-extrabold text-xl text-slate-950 font-display tracking-tight">
                    {banner.title}
                  </h3>
                  {banner.subtitle && (
                    <p className="text-xs text-blue-700 font-bold leading-relaxed">{banner.subtitle}</p>
                  )}
                </div>

                {/* Banner Image */}
                <div className="relative py-1 flex flex-col items-center justify-center">
                  <img 
                    src={banner.imageUrl} 
                    alt={banner.title} 
                    className="w-full h-44 object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleBuyNowAdBanner(banner.brand || 'OPPO')}
                  className="w-full bg-gradient-to-r from-cyan-300 via-sky-400 to-cyan-300 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-black text-xs px-6 py-2.5 rounded-full uppercase tracking-wider shadow-md hover:scale-105 transition-all flex items-center justify-center border border-cyan-200 cursor-pointer"
                >
                  MUA NGAY
                </button>
              </div>
            ))}

            {/* Default OPPO Reno16 F 5G Poster Fallback */}
            {adBanners.filter(b => (b.position === 'left-sidebar' || !b.position) && b.isActive !== false).length === 0 && (
              <div className="bg-white rounded-3xl p-5 text-slate-900 shadow-xl space-y-4 relative overflow-hidden group border-2 border-blue-400 transition-all hover:shadow-2xl">
                <div className="text-center font-black text-3xl tracking-widest text-slate-950 uppercase font-sans border-b border-slate-100 pb-2">
                  oppo
                </div>
                <div className="text-center space-y-1.5">
                  <span className="bg-slate-900 text-white font-extrabold text-[10px] px-3 py-1 rounded-md uppercase tracking-wide inline-block shadow-sm">
                    OPPO AI Phone
                  </span>
                  <h3 className="font-extrabold text-2xl text-slate-950 font-display tracking-tight pt-1">
                    Reno16 F <span className="text-xs font-mono font-black align-super">5G</span>
                  </h3>
                </div>
                <div className="rounded-2xl border-2 border-indigo-200 overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-indigo-800 via-indigo-900 to-indigo-800 text-white text-center text-xs font-black py-2 tracking-wide uppercase">
                    Bộ Quà Tặng Trị Giá 10 Triệu
                  </div>
                  <div className="bg-gradient-to-b from-indigo-50/80 to-purple-100/80 p-3 grid grid-cols-2 gap-2 text-center divide-x divide-indigo-200">
                    <div className="p-1 space-y-0.5">
                      <div className="text-[10px] text-gray-600 font-bold">Gói bảo hành</div>
                      <div className="text-xs font-black text-indigo-950">Premium Service+</div>
                    </div>
                    <div className="p-1 space-y-0.5">
                      <div className="text-[10px] text-gray-600 font-bold">Thu cũ đổi mới</div>
                      <div className="text-xl font-black text-indigo-950 font-display">5 <span className="text-xs font-bold">Triệu</span></div>
                    </div>
                    <div className="p-1 pt-2 border-t border-indigo-200 space-y-0.5">
                      <div className="text-[9px] text-gray-600 font-bold">Mua kèm OPPO Bubble</div>
                      <div className="text-xs font-black text-indigo-950">Giảm <span className="text-base">1</span> Triệu</div>
                    </div>
                    <div className="p-1 pt-2 border-t border-indigo-200 space-y-0.5">
                      <div className="text-[10px] text-gray-600 font-bold">Trả góp</div>
                      <div className="text-2xl font-black text-indigo-950 font-display">0%</div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleBuyNowAdBanner('OPPO')}
                  className="w-fit mx-auto bg-gradient-to-r from-cyan-300 via-sky-400 to-cyan-300 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-black text-xs px-8 py-2.5 rounded-full uppercase tracking-wider shadow-md hover:scale-105 transition-all flex items-center justify-center border border-cyan-200 cursor-pointer"
                >
                  MUA NGAY
                </button>
                <div className="relative pt-2 flex flex-col items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop" 
                    alt="OPPO Reno16 F 5G Showcase" 
                    className="w-full h-48 object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            )}

          </div>
        </aside>

        {/* Right Product List Area */}
        <main className="flex-1 space-y-4">

          {/* Header Controls: Count & Sort */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="font-bold text-base text-gray-900">
                Danh sách sản phẩm ({filteredProducts.length})
              </h2>
              {searchQuery && (
                <p className="text-xs text-gray-500">Kết quả cho: <strong className="text-gray-900">"{searchQuery}"</strong></p>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 font-medium">Sắp xếp theo:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#d70018]"
              >
                <option value="popular">Bán chạy nhất</option>
                <option value="price-asc">Giá thấp đến cao</option>
                <option value="price-desc">Giá cao đến thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
              <p className="text-gray-500 text-sm">Không tìm thấy sản phẩm phù hợp với bộ lọc hiện tại.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {displayedProducts.map(product => {
                const isFav = favorites.includes(product.id);

                return (
                  <div
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 p-4 flex flex-col justify-between cursor-pointer relative group"
                  >
                    {/* Top Badges */}
                    <div className="flex justify-between items-start gap-1 z-10">
                      <div className="flex flex-col gap-1">
                        {(product.stock === 0 || product.status === 'Hết hàng') ? (
                          <span className="bg-slate-900 text-white font-black text-[10px] px-2 py-0.5 rounded-md shadow-sm w-fit uppercase border border-slate-700">
                            HẾT HÀNG
                          </span>
                        ) : product.badge ? (
                          <span className="bg-[#d70018] text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow-sm w-fit">
                            {product.badge}
                          </span>
                        ) : null}

                        {product.installment && (
                          <span className="bg-blue-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-md w-fit">
                            {product.installment}
                          </span>
                        )}
                      </div>

                      {/* Wishlist Heart Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(e, product.id);
                          onToggleWishlist?.(product.id);
                        }}
                        className="p-1.5 rounded-full bg-gray-100/80 hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                        title={wishlist.includes(product.id) ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
                      >
                        <Heart className={`w-4 h-4 ${(favorites.includes(product.id) || wishlist.includes(product.id)) ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                    </div>

                    {/* Image Container with Zoom effect */}
                    <div className="my-4 flex items-center justify-center h-48 overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop";
                        }}
                        className={`max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 ${(product.stock === 0 || product.status === 'Hết hàng') ? 'grayscale opacity-75' : ''}`}
                      />
                    </div>

                    {/* Content Section */}
                    <div>
                      {/* Brand & Category */}
                      <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        {product.brand} • {product.category}
                      </div>

                      {/* Product Name */}
                      <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#d70018] transition line-clamp-2 mb-2 leading-snug">
                        {product.name}
                      </h3>

                      {/* Price Section */}
                      <div className="flex items-baseline space-x-2 mb-3">
                        <span className="text-base font-extrabold text-[#d70018]">
                          {product.price.toLocaleString('vi-VN')}đ
                        </span>
                        {product.oldPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {product.oldPrice.toLocaleString('vi-VN')}đ
                          </span>
                        )}
                      </div>

                      {/* Rating & Action Buttons */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 gap-1.5">
                        <div className="flex items-center space-x-1 text-xs">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-gray-800">{product.rating}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* Compare Checkbox Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleCompare?.(product);
                            }}
                            className={`p-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 border ${compareList.some(item => item.id === product.id)
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white hover:bg-slate-100 text-gray-600 border-gray-200'
                              }`}
                            title="So sánh cấu hình"
                          >
                            <Scale className="w-3.5 h-3.5" />
                            <span className="text-[10px] hidden sm:inline">So sánh</span>
                          </button>

                          {(product.stock === 0 || product.status === 'Hết hàng') ? (
                            <button
                              disabled
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center space-x-1 bg-gray-200 text-gray-500 cursor-not-allowed px-2.5 py-1.5 rounded-lg text-xs font-bold"
                            >
                              <span>Hết hàng</span>
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(product);
                              }}
                              className="flex items-center space-x-1 bg-red-50 hover:bg-[#d70018] text-[#d70018] hover:text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold transition"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>+Giỏ</span>
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Dynamic Interactive Pagination Component */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-8 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-medium">
                Trang <strong className="text-gray-900">{currentPage}</strong> / <strong className="text-gray-900">{totalPages}</strong> (Hiển thị {displayedProducts.length} trên tổng {filteredProducts.length} sản phẩm)
              </span>

              <div className="flex justify-center items-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-9 h-9 rounded-xl font-extrabold text-sm transition flex items-center justify-center border ${currentPage === 1
                    ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:text-[#d70018] hover:border-red-200 shadow-sm'
                    }`}
                  title="Trang trước"
                >
                  &laquo;
                </button>

                {/* Page Number Buttons */}
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  const isActive = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 rounded-xl font-extrabold text-xs transition flex items-center justify-center border ${isActive
                        ? 'bg-[#d70018] text-white border-[#d70018] shadow-md scale-105'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:text-[#d70018] hover:border-red-200 shadow-sm'
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-9 h-9 rounded-xl font-extrabold text-sm transition flex items-center justify-center border ${currentPage === totalPages
                    ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:text-[#d70018] hover:border-red-200 shadow-sm'
                    }`}
                  title="Trang tiếp"
                >
                  &raquo;
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Full-Width Store Privileges & Top Sellers Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-8">
        {/* Banner 1: Express Delivery */}
        <div className="bg-slate-900 p-5 rounded-2xl text-white space-y-2 border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-green-400 animate-pulse" />
              <span className="font-extrabold text-sm text-white">GIAO HẢO TỐC 1-2H</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Miễn phí vận chuyển đơn từ 300K. Đổi mới 30 ngày nếu phát sinh lỗi.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-gray-400">Tư vấn miễn phí:</span>
            <span className="font-black text-amber-400 text-sm">1800.2097</span>
          </div>
        </div>

        {/* Banner 2: Shield VIP Warranty */}
        <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-900 p-5 rounded-2xl text-white space-y-2 border border-emerald-700 shadow-md flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="font-extrabold text-sm text-white">BẢO HÀNH VIP 12 THÁNG</span>
            </div>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Đặc quyền 1 đổi 1 trong 30 ngày đầu tiên nếu máy có lỗi từ nhà sản xuất.
            </p>
          </div>
          <div className="pt-2 border-t border-emerald-800/60 flex justify-between items-center text-xs">
            <span className="text-emerald-300">Cam kết chính hãng:</span>
            <span className="font-black text-emerald-400 text-sm">100% VN/A</span>
          </div>
        </div>

        {/* Banner 3: Mini Recommendations Box */}
        <div className="border border-gray-200 rounded-2xl p-4 space-y-3 bg-white shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <span className="font-extrabold text-xs text-gray-900 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#d70018]" />
              <span>Top Bán Chạy Nhất</span>
            </span>
            <span className="text-[10px] text-[#d70018] font-black bg-red-50 px-2 py-0.5 rounded-full border border-red-200">HOT</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {products.slice(0, 3).map(item => (
              <div
                key={item.id}
                onClick={() => onSelectProduct(item)}
                className="p-1.5 rounded-xl hover:bg-red-50/50 transition cursor-pointer border border-gray-100 hover:border-red-200 text-center"
              >
                <img src={item.images[0]} alt={item.name} className="w-10 h-10 object-contain mx-auto mb-1" />
                <h5 className="font-extrabold text-[10px] text-gray-900 truncate">{item.name}</h5>
                <div className="text-[10px] font-black text-[#d70018]">
                  {(item.price / 1000000).toFixed(1)}Tr
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Homepage Tech News, FAQ & Side Ads Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Main Content Column (News & FAQ) */}
        <div className="lg:col-span-3 space-y-8">

          {/* Tech News Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-red-50 text-[#d70018] rounded-2xl shrink-0 border border-red-100">
                  <Newspaper className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-lg sm:text-xl text-gray-900 font-display">
                    Tin Tức Công Nghệ & Tư Vấn Mua Sắm
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-0.5">Cập nhật xu hướng flagship, đánh giá camera và bí quyết sử dụng thiết bị mới nhất năm 2026</p>
                </div>
              </div>
              <button
                onClick={() => setIsAllNewsModalOpen(true)}
                className="text-xs sm:text-sm text-[#d70018] font-black cursor-pointer hover:underline flex items-center gap-1.5 shrink-0 bg-red-50 px-3.5 py-2 rounded-xl border border-red-200 transition"
              >
                <span>Xem tất cả bài viết</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(articles && articles.length > 0 ? articles : TECH_ARTICLES).map(news => (
                <div
                  key={news.id}
                  onClick={() => setSelectedArticleModal(news)}
                  className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white flex flex-col justify-between cursor-pointer border-l-4 border-l-transparent hover:border-l-[#d70018]"
                >
                  <div>
                    <div className="h-44 bg-gray-50 overflow-hidden relative p-3 flex items-center justify-center border-b border-gray-100">
                      <img src={news.image} alt={news.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute top-2.5 left-2.5 bg-[#d70018] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow">TIN CÔNG NGHỆ</span>
                    </div>
                    <div className="p-4 space-y-2.5">
                      <div className="flex items-center text-xs text-gray-500 font-semibold space-x-2">
                        <span className="font-extrabold text-gray-800">{news.author}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gray-400" /> {news.date}</span>
                      </div>
                      <h4 className="font-extrabold text-sm sm:text-base text-gray-900 group-hover:text-[#d70018] transition line-clamp-2 leading-snug">
                        {news.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed font-normal">
                        {news.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 pb-4 pt-1">
                    <span className="text-xs sm:text-sm font-black text-[#d70018] group-hover:underline flex items-center space-x-1">
                      <span>Đọc tiếp</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Global Store FAQ Section (Accordion) */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-red-50 text-[#d70018] rounded-2xl shrink-0 border border-red-100">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-lg sm:text-xl text-gray-900 font-display">
                    Các Câu Hỏi Thường Gặp Khi Mua Hàng Tại Thế Giới Công Nghệ
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-0.5">Giải đáp thắc mắc về nguồn gốc sản phẩm, chính sách bảo hành, đổi trả và ưu đãi Smember</p>
                </div>
              </div>
              <span className="text-xs sm:text-sm text-gray-700 font-extrabold bg-gray-100 px-3 py-1.5 rounded-xl border border-gray-200 hidden sm:inline">Tổng đài miễn phí: 1800.2097</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  q: "Thế Giới Công Nghệ cam kết chất lượng sản phẩm ra sao?",
                  a: "100% sản phẩm bán tại cửa hàng là hàng chính hãng phân phối Việt Nam (VN/A), nguyên seal hộp, tem kiểm định chất lượng và đầy đủ hóa đơn chứng từ VAT."
                },
                {
                  q: "Quy trình Thu Cũ Đổi Mới (Trade-in) diễn ra như thế nào?",
                  a: "Khách hàng chỉ cần mang máy cũ đến cửa hàng hoặc đăng ký online, kỹ thuật viên hỗ trợ định giá trong 5 phút và trợ giá thêm đến 2.000.000đ để lên đời máy mới."
                },
                {
                  q: "Làm thế nào để áp dụng Mã Giảm Giá / Voucher khi thanh toán?",
                  a: "Tại bước Thanh toán (Checkout), quý khách nhập mã voucher (VD: SMEMBER, TANDU10, FREESHIP) vào ô Mã giảm giá để hệ thống trừ tiền trực tiếp vào đơn hàng."
                },
                {
                  q: "Hình thức Trả Góp 0% lãi suất được áp dụng ra sao?",
                  a: "Hệ thống hỗ trợ Trả góp 0% lãi suất qua thẻ tín dụng hơn 25 ngân hàng liên kết hoặc qua công ty tài chính duyệt nhanh 15 phút chỉ cần CCCD."
                },
                {
                  q: "Sản phẩm bị lỗi trong thời gian đầu xử lý thế nào?",
                  a: "Chính sách ĐẶC QUYỀN 1 đổi 1 trong 30 ngày đầu tiên nếu máy phát sinh lỗi phần cứng do nhà sản xuất. Hỗ trợ gửi bảo hành chính hãng tận nhà."
                },
                {
                  q: "Thời gian giao hàng tận nhà mất bao lâu?",
                  a: "Giao hàng hỏa tốc trong 1-2h nội thành TP.HCM và Hà Nội. Giao hàng toàn quốc từ 1-3 ngày làm việc với dịch vụ cho phép xem hàng trước khi thanh toán."
                }
              ].map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`border rounded-2xl transition overflow-hidden ${isOpen ? 'border-red-200 bg-red-50/30 shadow-sm' : 'border-gray-200 bg-white'}`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className="font-extrabold text-sm text-gray-900 flex items-center space-x-2.5">
                        <span className="w-6 h-6 rounded-full bg-red-100 text-[#d70018] font-black text-xs flex items-center justify-center shrink-0 border border-red-200">
                          ?
                        </span>
                        <span>{faq.q}</span>
                      </span>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#d70018]' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-gray-700 border-t border-red-100/60 leading-relaxed font-medium animate-in fade-in">
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

        </div>

        {/* Side Promotional Ads Column (Cột Quảng Cáo Hot Promo) */}
        <div className="lg:col-span-1 space-y-4">

          {/* Banner 1: Trade-in Thu Cũ Đổi Mới */}
          <div className="bg-gradient-to-br from-[#d70018] via-[#be0015] to-[#a80012] rounded-3xl p-6 text-white shadow-xl space-y-4 relative overflow-hidden group border border-red-700">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
            <span className="bg-amber-400 text-slate-900 font-extrabold text-[11px] px-3 py-1 rounded-full uppercase shadow inline-flex items-center gap-1.5">
              🔥 ƯU ĐÃI ĐẶC QUYỀN
            </span>
            <h4 className="font-extrabold text-xl leading-tight pt-1 font-display">
              Thu Cũ Đổi Mới - Trợ Giá Đến 2.000.000đ
            </h4>
            <p className="text-xs text-red-100 leading-relaxed font-medium">
              Đổi điện thoại, laptop cũ lấy máy mới chính hãng VN/A. 0đ trả trước!
            </p>
            <button
              onClick={() => setIsTradeInOpen(true)}
              className="bg-white text-[#d70018] hover:bg-amber-300 hover:text-slate-900 font-black text-sm px-4 py-3 rounded-full transition shadow-lg flex items-center space-x-1.5 w-full justify-center"
            >
              <span>Định giá máy ngay</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Banner 2: Mua Trả Góp 0% */}
          <div className="bg-[#d70018] rounded-3xl p-6 text-white shadow-xl space-y-4 relative overflow-hidden group border border-red-600">
            <span className="bg-amber-400 text-slate-900 font-extrabold text-[11px] px-3 py-1 rounded-full uppercase shadow inline-flex items-center gap-1.5">
              💳 MUA TRẢ GÓP 0%
            </span>
            <h4 className="font-extrabold text-xl leading-tight pt-1 font-display">
              Duyệt Hồ Sơ Online 15 Phút Qua CCCD
            </h4>
            <p className="text-xs text-red-100 leading-relaxed font-medium">
              0đ trả trước – Không cần chứng minh thu nhập. Hỗ trợ hơn 25 ngân hàng!
            </p>
            <button
              onClick={() => setIsInstallmentOpen(true)}
              className="bg-white text-[#d70018] hover:bg-red-50 font-black text-sm px-4 py-3 rounded-full transition shadow-lg flex items-center space-x-1.5 w-full justify-center"
            >
              <span>Đăng ký vay 0%</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Banner 3: S-Student */}
          <div className="bg-gradient-to-b from-amber-400 via-amber-500 to-amber-500 rounded-3xl p-6 text-slate-950 shadow-xl space-y-4 relative overflow-hidden group border border-amber-300">
            <span className="bg-slate-950 text-amber-400 font-extrabold text-[11px] px-3 py-1 rounded-full uppercase shadow inline-flex items-center gap-1.5">
              🎓 ƯU ĐÃI SINH VIÊN
            </span>
            <h4 className="font-extrabold text-xl leading-tight pt-1 font-display text-slate-950">
              Học Sinh - Sinh Viên Giảm Thêm 5%
            </h4>
            <p className="text-xs text-amber-950 leading-relaxed font-semibold">
              Áp dụng cho Laptop, iPad & Smartphone. Tặng kèm gói bảo hành 12 tháng!
            </p>
            <button
              onClick={() => setIsStudentOpen(true)}
              className="bg-slate-950 text-white hover:bg-slate-900 font-black text-sm px-4 py-3 rounded-full transition shadow-lg flex items-center space-x-1.5 w-full justify-center"
            >
              <span>Nhận ưu đãi SV</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Banner 4: Combo Phụ Kiện Sốc */}
          <div className="bg-gradient-to-br from-emerald-800 to-teal-900 rounded-2xl p-5 text-white shadow-md space-y-3 relative overflow-hidden group border border-emerald-700">
            <span className="bg-emerald-400 text-emerald-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase shadow">
              🎧 DEAL PHỤ KIỆN
            </span>
            <h4 className="font-extrabold text-base leading-snug pt-1">
              Combo Phụ Kiện Mua Kèm Giảm Tới 50%
            </h4>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Sạc nhanh Anker 65W, Tai nghe Sony, Củ sạc Apple Type-C & Cáp chống đứt!
            </p>
            <button
              onClick={() => setSelectedCategory('Accessories')}
              className="bg-white text-emerald-900 hover:bg-emerald-100 font-black text-xs px-4 py-2.5 rounded-xl transition shadow flex items-center space-x-1.5 w-full justify-center"
            >
              <span>Săn deal phụ kiện</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Floating Compare Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 text-white px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-md border border-slate-700 flex items-center space-x-6 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-amber-400" />
            <div className="text-xs font-bold">
              <span>Đã chọn ({compareList.length}/4)</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {compareList.map((item) => (
              <div key={item.id} className="relative group">
                <img
                  src={item.image || item.images?.[0]}
                  alt=""
                  className="w-10 h-10 object-contain bg-white rounded-lg p-1 border border-slate-700"
                />
                <button
                  onClick={() => onToggleCompare?.(item)}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] shadow"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={onOpenCompareModal}
            className="bg-[#d70018] hover:bg-[#be0015] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow flex items-center gap-1.5"
          >
            <span>So Sánh Ngay</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* All Tech Articles List Modal */}
      {isAllNewsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-6 relative border border-gray-100 shadow-2xl space-y-6">

            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-red-50 text-[#d70018] rounded-xl">
                  <Newspaper className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900 font-display">
                    Tất Cả Bài Viết Tin Tức & Đánh Giá Công Nghệ
                  </h3>
                  <p className="text-xs text-gray-500">Cập nhật tin tức hot nhất, mẹo sử dụng và tư vấn chọn mua thiết bị công nghệ 2026</p>
                </div>
              </div>

              <button
                onClick={() => setIsAllNewsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {(articles && articles.length > 0 ? articles : TECH_ARTICLES).map(article => (
                <div
                  key={article.id}
                  onClick={() => {
                    setSelectedArticleModal(article);
                  }}
                  className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition group bg-white flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="h-44 bg-gray-50 overflow-hidden relative p-2 flex items-center justify-center">
                      <img src={article.image} alt={article.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition" />
                      <span className="absolute top-2 left-2 bg-[#d70018] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase">
                        {article.category}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-center text-[10px] text-gray-400 space-x-2">
                        <span className="font-bold text-gray-700">{article.author}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                        <span>•</span>
                        <span className="text-[#d70018] font-bold">{article.readTime}</span>
                      </div>
                      <h4 className="font-bold text-xs text-gray-900 group-hover:text-[#d70018] transition leading-snug">
                        {article.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <span className="text-xs font-extrabold text-[#d70018] group-hover:underline flex items-center space-x-1">
                      <span>Đọc bài viết chi tiết</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
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

            {/* Header */}
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

              <button
                onClick={() => setSelectedArticleModal(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Main Cover Image */}
            <div className="w-full h-56 bg-gray-50 rounded-2xl p-3 flex items-center justify-center overflow-hidden border border-gray-200">
              <img
                src={selectedArticleModal.image}
                alt={selectedArticleModal.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Article Content Paragraphs */}
            <div className="space-y-3 text-xs text-gray-700 leading-relaxed font-normal">
              {(selectedArticleModal.content || [selectedArticleModal.excerpt]).map((para, idx) => (
                <p key={idx} className={para.startsWith('💡') ? 'bg-red-50 p-3 rounded-xl border border-red-200 font-bold text-gray-900' : ''}>
                  {para}
                </p>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <span className="text-[11px] text-gray-400">© 2026 Thế Giới Công Nghệ - Hệ thống bán lẻ công nghệ hàng đầu</span>
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

      {/* Trade-in Thu Cũ Đổi Mới Modal */}
      <TradeInModal
        isOpen={isTradeInOpen}
        onClose={() => setIsTradeInOpen(false)}
        onApplyVoucher={(v) => {
          const saved = JSON.parse(localStorage.getItem('techzone_vouchers') || '[]');
          localStorage.setItem('techzone_vouchers', JSON.stringify([...saved, v]));
        }}
      />

      {/* 0% Installment Registration Modal */}
      <InstallmentModal
        isOpen={isInstallmentOpen}
        onClose={() => setIsInstallmentOpen(false)}
      />

      {/* Student S-Student Verification Modal */}
      <StudentDiscountModal
        isOpen={isStudentOpen}
        onClose={() => setIsStudentOpen(false)}
        onApplyVoucher={(v) => {
          const saved = JSON.parse(localStorage.getItem('techzone_vouchers') || '[]');
          localStorage.setItem('techzone_vouchers', JSON.stringify([...saved, v]));
        }}
      />

    </div>
  );
}
