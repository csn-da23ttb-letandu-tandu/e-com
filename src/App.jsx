import React, { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import ProductCompareModal from './components/ProductCompareModal';
import AIChatbotWidget from './components/AIChatbotWidget';
import LuckyWheelModal from './components/LuckyWheelModal';
import WishlistModal from './components/WishlistModal';

import CustomerCatalog from './views/CustomerCatalog';
import ProductDetail from './views/ProductDetail';
import CartView from './views/CartView';
import CheckoutView from './views/CheckoutView';
import UserProfile from './views/UserProfile';
import AdminOverview from './views/AdminOverview';
import AdminProducts from './views/AdminProducts';
import AdminBanners from './views/AdminBanners';
import AdminCoupons from './views/AdminCoupons';
import AdminUsers from './views/AdminUsers';
import AdminNews from './views/AdminNews';
import AdminDatabaseManager from './views/AdminDatabaseManager';
import AdminPortalLayout from './views/AdminPortalLayout';
import AdminLoginPage from './views/AdminLoginPage';

import { INITIAL_PRODUCTS, INITIAL_ORDERS } from './data/mockData';

const INITIAL_BANNERS = [
  {
    id: 'hero_main',
    title: 'Khám phá công nghệ mới nhất',
    subtitle: 'Tuyển tập thiết bị flagship hàng đầu thị trường. Giảm tới 2 Triệu cho thành viên khi thu cũ đổi mới.',
    badge: 'SIÊU PHẨM THẾ GIỚI CÔNG NGHỆ',
    buttonText: 'Xem chi tiết ngay',
    brand: 'APPLE',
    position: 'hero-main',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
    productId: 1,
    isActive: true
  },
  {
    id: 'hero_sub1',
    title: 'iPhone 16 Pro Max 512GB',
    subtitle: 'Vật liệu Titan sa mạc đẳng cấp, Chip A18 Pro',
    badge: 'MỚI VỀ',
    price: 34990000,
    brand: 'APPLE',
    position: 'hero-sub-1',
    imageUrl: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png',
    productId: 1,
    isActive: true
  },
  {
    id: 'hero_sub2',
    title: 'Samsung Galaxy S25 Plus 256GB',
    subtitle: 'Trợ lý quyền năng Galaxy AI, Màn 120Hz',
    badge: 'HOT DEAL',
    price: 19990000,
    brand: 'SAMSUNG',
    position: 'hero-sub-2',
    imageUrl: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-s24-ultra.png',
    productId: 103,
    isActive: true
  },
  {
    id: 'b1',
    title: 'Reno16 F 5G - Ổn Áp Chốt Luôn!',
    subtitle: 'Bộ Quà Tặng Trị Giá 10 Triệu, Trả góp 0%',
    badge: 'BỘ QUÀ 10 TR',
    brand: 'OPPO',
    position: 'left-sidebar',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop',
    productId: 101,
    isActive: true
  }
];

const INITIAL_ARTICLES = [
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

export default function App() {
  // Navigation State & URL path detection
  const [currentView, setCurrentView] = useState(() => {
    return window.location.pathname.startsWith('/admin') ? 'admin-overview' : 'catalog';
  }); 
  const [selectedProduct, setSelectedProduct] = useState(INITIAL_PRODUCTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Application Data State
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('techzone_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Sync new high-quality images and properties from INITIAL_PRODUCTS to clear stale cached images
          const updatedParsed = parsed.map(p => {
            const match = INITIAL_PRODUCTS.find(initP => initP.id === p.id || initP.name === p.name);
            return match ? { ...p, images: match.images, badge: match.badge || p.badge } : p;
          });
          const existingIds = new Set(updatedParsed.map(p => p.id));
          const newItems = INITIAL_PRODUCTS.filter(p => !existingIds.has(p.id));
          const fullList = [...updatedParsed, ...newItems];
          localStorage.setItem('techzone_products', JSON.stringify(fullList));
          return fullList;
        }
      } catch (e) {
        console.error("Error parsing saved products:", e);
      }
    }
    localStorage.setItem('techzone_products', JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('techzone_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('techzone_cart');
    return saved ? JSON.parse(saved) : [
      { ...INITIAL_PRODUCTS[0], quantity: 1, capacity: '512GB' },
      { ...INITIAL_PRODUCTS[5], quantity: 1, capacity: '1TB SSD' }
    ];
  });

  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem('techzone_compare');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('techzone_wishlist');
    return saved ? JSON.parse(saved) : [INITIAL_PRODUCTS[0].id, INITIAL_PRODUCTS[1].id];
  });

  const [activeVouchers, setActiveVouchers] = useState(() => {
    const saved = localStorage.getItem('techzone_vouchers');
    return saved ? JSON.parse(saved) : [
      { id: 'v1', code: 'TANDU10', discountType: 'percentage', discountValue: 10, minOrderValue: 0, description: 'Giảm 10% từ Vòng quay may mắn', isActive: true },
      { id: 'v2', code: 'FREESHIP', discountType: 'fixed', discountValue: 30000, minOrderValue: 0, description: 'Miễn phí vận chuyển 0đ', isActive: true }
    ];
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('techzone_theme') === 'dark';
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('techzone_logged_in_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalAdminMode, setAuthModalAdminMode] = useState(false);
  const [cartSummary, setCartSummary] = useState(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isLuckyWheelOpen, setIsLuckyWheelOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);

  // Articles Management State
  const [articles, setArticles] = useState(() => {
    try {
      const saved = localStorage.getItem('techzone_articles');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Articles parse error:", e);
    }
    return INITIAL_ARTICLES;
  });

  const handleAddArticle = (newArt) => {
    setArticles(prev => {
      const updated = [newArt, ...prev];
      localStorage.setItem('techzone_articles', JSON.stringify(updated));
      return updated;
    });
  };

  const handleUpdateArticle = (updatedArt) => {
    setArticles(prev => {
      const updated = prev.map(a => a.id === updatedArt.id ? updatedArt : a);
      localStorage.setItem('techzone_articles', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteArticle = (artId) => {
    setArticles(prev => {
      const updated = prev.filter(a => a.id !== artId);
      localStorage.setItem('techzone_articles', JSON.stringify(updated));
      return updated;
    });
  };

  // Ad Banners State & CRUD Handlers
  const [adBanners, setAdBanners] = useState(() => {
    try {
      const saved = localStorage.getItem('techzone_ad_banners');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map(b => b.id || b.position));
          const missingHeroBanners = INITIAL_BANNERS.filter(b => !existingIds.has(b.id) && !existingIds.has(b.position));
          const merged = [...parsed, ...missingHeroBanners];
          localStorage.setItem('techzone_ad_banners', JSON.stringify(merged));
          return merged;
        }
      }
    } catch (e) {
      console.error("Ad Banners parse error:", e);
    }
    localStorage.setItem('techzone_ad_banners', JSON.stringify(INITIAL_BANNERS));
    return INITIAL_BANNERS;
  });

  const handleAddAdBanner = (newBanner) => {
    setAdBanners(prev => {
      const updated = [newBanner, ...prev];
      localStorage.setItem('techzone_ad_banners', JSON.stringify(updated));
      return updated;
    });
  };

  const handleUpdateAdBanner = (updatedBanner) => {
    setAdBanners(prev => {
      const updated = prev.map(b => b.id === updatedBanner.id ? updatedBanner : b);
      localStorage.setItem('techzone_ad_banners', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteAdBanner = (bannerId) => {
    setAdBanners(prev => {
      const updated = prev.filter(b => b.id !== bannerId);
      localStorage.setItem('techzone_ad_banners', JSON.stringify(updated));
      return updated;
    });
  };

  const handleToggleAdBannerStatus = (bannerId) => {
    setAdBanners(prev => {
      const updated = prev.map(b => b.id === bannerId ? { ...b, isActive: !b.isActive } : b);
      localStorage.setItem('techzone_ad_banners', JSON.stringify(updated));
      return updated;
    });
  };

  // Registered Accounts Database State
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const defaultAccounts = [
      {
        name: 'Lê Tấn Dư (Admin)',
        email: 'tandu@gmail.com',
        phone: '0368402970',
        dob: '05/02/2005',
        password: '123456',
        role: 'admin',
        memberTier: 'S-ELITE',
        isLocked: false
      },
      {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@gmail.com',
        phone: '0987777654',
        dob: '15/08/1995',
        role: 'customer',
        memberTier: 'S-ELITE',
        isLocked: false
      },
      {
        name: 'Trần Thị Bích',
        email: 'bich.tran@gmail.com',
        phone: '0912345678',
        dob: '20/11/1998',
        role: 'customer',
        memberTier: 'S-MEM',
        isLocked: false
      },
      {
        name: 'Lê Hoàng Nam',
        email: 'namlh.dev@gmail.com',
        phone: '0977888999',
        dob: '10/04/1992',
        role: 'customer',
        memberTier: 'S-VIP',
        isLocked: false
      },
      {
        name: 'Phạm Minh Tuấn',
        email: 'tuan.pham@hotmail.com',
        phone: '0933112233',
        dob: '02/09/1989',
        role: 'customer',
        memberTier: 'S-CLASS',
        isLocked: false
      }
    ];
    const saved = localStorage.getItem('techzone_registered_users');
    if (!saved) return defaultAccounts;
    
    // Ensure tandu@gmail.com is always granted admin role
    const parsed = JSON.parse(saved);
    return parsed.map(u => u.email.toLowerCase() === 'tandu@gmail.com' ? { ...u, role: 'admin' } : u);
  });

  useEffect(() => {
    localStorage.setItem('techzone_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const handleUpdateUserRole = (email, newRole) => {
    setRegisteredUsers(prev => prev.map(u => 
      u.email.toLowerCase() === email.toLowerCase() ? { ...u, role: newRole } : u
    ));
  };

  const handleToggleUserLock = (email) => {
    setRegisteredUsers(prev => prev.map(u => 
      u.email.toLowerCase() === email.toLowerCase() ? { ...u, isLocked: !u.isLocked } : u
    ));
  };

  const handleDeleteUser = (email) => {
    setRegisteredUsers(prev => prev.filter(u => u.email.toLowerCase() !== email.toLowerCase()));
  };

  // Sync state changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('techzone_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('techzone_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('techzone_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('techzone_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('techzone_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('techzone_vouchers', JSON.stringify(activeVouchers));
  }, [activeVouchers]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('techzone_logged_in_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('techzone_logged_in_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('techzone_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Dedicated Admin URL Link Listener (#/admin)
  useEffect(() => {
    const checkAdminURL = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/admin') || hash === '#admin') {
        setCurrentView('admin-overview');
      }
    };

    checkAdminURL();
    window.addEventListener('hashchange', checkAdminURL);
    return () => window.removeEventListener('hashchange', checkAdminURL);
  }, []);

  // Sync URL Hash when entering/leaving Admin Portal
  useEffect(() => {
    if (currentView.startsWith('admin')) {
      if (!window.location.hash.startsWith('#/admin')) {
        window.location.hash = '#/admin';
      }
    } else {
      if (window.location.hash.startsWith('#/admin')) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, [currentView]);

  // Product Compare Handlers
  const handleToggleCompare = (product) => {
    setCompareList(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      if (prev.length >= 4) {
        alert('Tối đa chỉ so sánh 4 sản phẩm cùng lúc.');
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromCompare = (productId) => {
    setCompareList(prev => prev.filter(item => item.id !== productId));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  // Wishlist Handler
  const handleToggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Lucky Wheel Voucher Claim Handler
  const handleClaimVoucher = (prize) => {
    setActiveVouchers(prev => {
      if (prev.some(v => v.code === prize.code)) return prev;
      return [
        {
          id: 'v_' + Date.now(),
          code: prize.code,
          discountType: prize.code.includes('10') || prize.code.includes('15') ? 'percentage' : 'fixed',
          discountValue: prize.code === 'TANDU10' ? 10 : prize.code === 'TGCN500' ? 500000 : 100000,
          minOrderValue: 0,
          description: prize.label,
          isActive: true
        },
        ...prev
      ];
    });
  };

  // Admin Coupons Handlers
  const handleAddVoucher = (newVoucher) => {
    setActiveVouchers(prev => [newVoucher, ...prev]);
  };

  const handleDeleteVoucher = (voucherId) => {
    setActiveVouchers(prev => prev.filter(v => v.id !== voucherId));
  };

  const handleToggleVoucherStatus = (voucherId) => {
    setActiveVouchers(prev => prev.map(v => v.id === voucherId ? { ...v, isActive: !v.isActive } : v));
  };

  // Cart Management Handlers
  const handleAddToCart = (product) => {
    if (!user) {
      alert('🔒 YÊU CẦU ĐĂNG NHẬP: Bạn chưa đăng nhập tài khoản. Vui lòng đăng nhập hoặc đăng ký tài khoản để tiến hành mua hàng!');
      setAuthModalOpen(true);
      return;
    }

    if (user?.role === 'admin') {
      alert('🚫 TỪ CHỐI THAO TÁC: Tài khoản Quản trị viên (Admin) chỉ thực hiện nhiệm vụ điều hành hệ thống, không được phép mua hàng như khách hàng. Vui lòng đăng nhập tài khoản Khách hàng để mua hàng!');
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, capacity: product.capacities ? product.capacities[0] : 'Standard' }];
    });
  };

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
    } else {
      setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity: newQty } : item));
    }
  };

  const handleRemoveItem = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  // Product Selection Handler
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct "MUA NGAY" Handler
  const handleBuyNow = (product) => {
    if (!user) {
      alert('🔒 YÊU CẦU ĐĂNG NHẬP: Bạn chưa đăng nhập tài khoản. Vui lòng đăng nhập hoặc đăng ký tài khoản để mua sản phẩm này!');
      setAuthModalOpen(true);
      return;
    }
    if (user?.role === 'admin') {
      alert('🚫 TỪ CHỐI THAO TÁC: Tài khoản Quản trị viên (Admin) chỉ thực hiện nhiệm vụ điều hành hệ thống, không được phép mua hàng như khách hàng. Vui lòng đăng nhập tài khoản Khách hàng để mua hàng!');
      return;
    }
    handleAddToCart(product);
    setCurrentView('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Proceed to Checkout
  const handleProceedToCheckout = (summary) => {
    if (!user) {
      alert('🔒 YÊU CẦU ĐĂNG NHẬP: Bạn cần đăng nhập tài khoản để thực hiện thanh toán đơn hàng!');
      setAuthModalOpen(true);
      return;
    }
    if (user?.role === 'admin') {
      alert('🚫 TỪ CHỐI THAO TÁC: Tài khoản Quản trị viên (Admin) không được phép thực hiện thanh toán đơn hàng.');
      return;
    }
    setCartSummary(summary);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Order Placement Success Handler
  const handleOrderSuccess = (newOrder) => {
    // 1. Add new order
    setOrders(prev => [newOrder, ...prev]);

    // 2. Automatically deduct stock quantity in Admin inventory
    if (newOrder.items && newOrder.items.length > 0) {
      setProducts(prevProducts => {
        const updatedProducts = prevProducts.map(p => {
          const purchasedItem = newOrder.items.find(item => item.id === p.id || item.name === p.name);
          if (purchasedItem) {
            const purchasedQty = purchasedItem.quantity || 1;
            const currentStock = typeof p.stock === 'number' ? p.stock : 10;
            const newStock = Math.max(0, currentStock - purchasedQty);
            return {
              ...p,
              stock: newStock,
              status: newStock === 0 ? 'Hết hàng' : p.status,
              salesCount: (p.salesCount || 0) + purchasedQty
            };
          }
          return p;
        });

        localStorage.setItem('techzone_products', JSON.stringify(updatedProducts));
        return updatedProducts;
      });
    }

    setCart([]); // Clear cart
  };

  // Product Admin Handlers
  const handleAddProduct = (newProd) => {
    setProducts(prev => {
      const updated = [newProd, ...prev];
      localStorage.setItem('techzone_products', JSON.stringify(updated));
      return updated;
    });
  };

  const handleUpdateProduct = (updatedProd) => {
    setProducts(prev => {
      const updated = prev.map(p => p.id === updatedProd.id ? updatedProd : p);
      localStorage.setItem('techzone_products', JSON.stringify(updated));
      return updated;
    });
    if (selectedProduct && selectedProduct.id === updatedProd.id) {
      setSelectedProduct(updatedProd);
    }
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi hệ thống?')) {
      setProducts(prev => {
        const updated = prev.filter(p => p.id !== productId);
        localStorage.setItem('techzone_products', JSON.stringify(updated));
        return updated;
      });
    }
  };

  // Update Order Status Handler
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const isNavigatingAdmin = currentView.startsWith('admin');

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#f4f5f7] text-[#1a1a1a]'}`}>
      
      {/* Top Main Navigation Header (Chỉ hiển thị cho Cửa hàng Khách hàng) */}
      {!isNavigatingAdmin && (
        <Header 
          currentView={currentView}
          setCurrentView={setCurrentView}
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          user={user}
          onOpenAuth={() => {
            setAuthModalAdminMode(false);
            setAuthModalOpen(true);
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          products={products}
          onSelectProduct={handleSelectProduct}
          compareCount={compareList.length}
          onOpenCompareModal={() => setIsCompareModalOpen(true)}
          onOpenLuckyWheel={() => setIsLuckyWheelOpen(true)}
          wishlistCount={wishlist.length}
          onOpenWishlist={() => setIsWishlistModalOpen(true)}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
      )}

      {/* Main Dynamic View Content */}
      <div className="flex-1">
        {/* CUSTOMER VIEWS */}
        {!isNavigatingAdmin && (
          <>
            {currentView === 'catalog' && (
              <CustomerCatalog 
                products={products}
                articles={articles}
                onSelectProduct={handleSelectProduct}
                onAddToCart={handleAddToCart}
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                compareList={compareList}
                onToggleCompare={handleToggleCompare}
                onOpenCompareModal={() => setIsCompareModalOpen(true)}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onOpenLuckyWheel={() => setIsLuckyWheelOpen(true)}
                adBanners={adBanners}
                user={user}
                onNavigateAdmin={(tab) => { setAdminActiveTab(tab || 'banners'); setCurrentView('admin-overview'); }}
              />
            )}

            {currentView === 'product-detail' && (
              <ProductDetail 
                product={selectedProduct}
                articles={articles}
                user={user}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onBackToCatalog={() => setCurrentView('catalog')}
                onToggleCompare={handleToggleCompare}
                compareList={compareList}
                onToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
              />
            )}

            {currentView === 'cart' && (
              <CartView 
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onProceedToCheckout={handleProceedToCheckout}
                onContinueShopping={() => setCurrentView('catalog')}
                activeVouchers={activeVouchers}
              />
            )}

            {currentView === 'checkout' && (
              <CheckoutView 
                cart={cart}
                user={user}
                cartSummary={cartSummary}
                onOrderSuccess={handleOrderSuccess}
                onBackToCart={() => setCurrentView('cart')}
              />
            )}

            {currentView === 'profile' && (
              <UserProfile 
                orders={orders}
                user={user}
                onLogout={() => {
                  setUser(null);
                  setCurrentView('catalog');
                }}
                onOpenAuth={() => {
                  setAuthModalAdminMode(false);
                  setAuthModalOpen(true);
                }}
                wishlist={wishlist}
                products={products}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                onSelectProduct={handleSelectProduct}
                onUpdateUserProfile={(updatedData) => {
                  const newUserData = { ...user, ...updatedData };
                  setUser(newUserData);
                  localStorage.setItem('techzone_logged_in_user', JSON.stringify(newUserData));
                }}
                onNavigateAdmin={(view) => setCurrentView(view)}
              />
            )}
          </>
        )}

        {/* STANDALONE ADMIN PORTAL VIEWS */}
        {isNavigatingAdmin && (
          <>
            {user?.role !== 'admin' ? (
              <AdminLoginPage 
                registeredUsers={registeredUsers}
                onLoginSuccess={(loggedInUser) => {
                  setUser(loggedInUser);
                  localStorage.setItem('techzone_logged_in_user', JSON.stringify(loggedInUser));
                }}
                onBackToStore={() => setCurrentView('catalog')}
              />
            ) : (
              <AdminPortalLayout 
                currentView={currentView}
                setCurrentView={setCurrentView}
                user={user}
                onLogout={() => {
                  setUser(null);
                  setCurrentView('catalog');
                }}
              >
                {currentView === 'admin-overview' && (
                  <AdminOverview 
                    products={products}
                    orders={orders}
                    registeredUsers={registeredUsers}
                    onSelectProduct={handleSelectProduct}
                    onUpdateOrderStatus={handleUpdateOrderStatus}
                  />
                )}

                {currentView === 'admin-products' && (
                  <AdminProducts 
                    products={products}
                    onAddProduct={handleAddProduct}
                    onUpdateProduct={handleUpdateProduct}
                    onDeleteProduct={handleDeleteProduct}
                  />
                )}

                {currentView === 'admin-banners' && (
                  <AdminBanners 
                    banners={adBanners}
                    products={products}
                    onAddBanner={handleAddAdBanner}
                    onUpdateBanner={handleUpdateAdBanner}
                    onDeleteBanner={handleDeleteAdBanner}
                    onToggleBannerStatus={handleToggleAdBannerStatus}
                  />
                )}

                {currentView === 'admin-news' && (
                  <AdminNews 
                    articles={articles}
                    onAddArticle={handleAddArticle}
                    onUpdateArticle={handleUpdateArticle}
                    onDeleteArticle={handleDeleteArticle}
                  />
                )}

                {currentView === 'admin-coupons' && (
                  <AdminCoupons 
                    vouchers={activeVouchers}
                    onAddVoucher={handleAddVoucher}
                    onDeleteVoucher={handleDeleteVoucher}
                    onToggleVoucherStatus={handleToggleVoucherStatus}
                  />
                )}

                {currentView === 'admin-users' && (
                  <AdminUsers 
                    registeredUsers={registeredUsers}
                    orders={orders}
                    onUpdateUserRole={handleUpdateUserRole}
                    onDeleteUser={handleDeleteUser}
                    onToggleUserLock={handleToggleUserLock}
                    onRegisterUser={(newUser) => setRegisteredUsers(prev => [...prev, newUser])}
                  />
                )}

                {currentView === 'admin-database' && (
                  <AdminDatabaseManager />
                )}
              </AdminPortalLayout>
            )}
          </>
        )}
      </div>

      {/* Product Compare Modal */}
      <ProductCompareModal 
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        compareList={compareList}
        onRemoveFromCompare={handleRemoveFromCompare}
        onClearCompare={handleClearCompare}
        onAddToCart={handleAddToCart}
        onSelectProduct={handleSelectProduct}
      />

      {/* Lucky Wheel Minigame Modal */}
      <LuckyWheelModal 
        isOpen={isLuckyWheelOpen}
        onClose={() => setIsLuckyWheelOpen(false)}
        onClaimVoucher={handleClaimVoucher}
      />

      {/* Wishlist Favorites Modal */}
      <WishlistModal 
        isOpen={isWishlistModalOpen}
        onClose={() => setIsWishlistModalOpen(false)}
        wishlist={wishlist}
        products={products}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onSelectProduct={handleSelectProduct}
      />

      {/* AI Chatbot Assistant Widget */}
      <AIChatbotWidget 
        products={products}
        onSelectProduct={handleSelectProduct}
        onAddToCart={handleAddToCart}
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        registeredUsers={registeredUsers}
        initialAdminMode={authModalAdminMode}
        onRegisterUser={(newUser) => {
          setRegisteredUsers(prev => [...prev, newUser]);
        }}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          localStorage.setItem('techzone_logged_in_user', JSON.stringify(loggedInUser));
          if (loggedInUser.role === 'admin') {
            setCurrentView('admin-overview');
          }
        }}
      />

      {/* Footer Component (Chỉ hiển thị cho Cửa hàng Khách hàng) */}
      {!isNavigatingAdmin && (
        <Footer 
          onOpenAdminAuth={() => {
            setCurrentView('admin-overview');
          }}
        />
      )}

    </div>
  );
}
