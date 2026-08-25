import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, ShoppingBag, ChevronRight, ShieldCheck, MapPin, RefreshCw } from 'lucide-react';

export default function AIChatbotWidget({ products = [], onSelectProduct, onAddToCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Xin chào! Tôi là **Trợ lý TGCN (Thế Giới Công Nghệ)** 🤖. Tôi có thể giúp bạn tìm kiếm thiết bị công nghệ phù hợp, giải đáp thắc mắc bảo hành, hoặc săn ưu đãi khuyến mãi. Bạn cần hỗ trợ gì hôm nay?',
      options: [
        '💻 Laptop văn phòng / học tập tốt',
        '🎮 Laptop Gaming mạnh dưới 35tr',
        '📱 iPhone mới nhất & ưu đãi',
        '🛡️ Chính sách bảo hành & đổi trả',
        '📍 Địa chỉ cửa hàng gần nhất'
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (customText) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking and generating dynamic response
    setTimeout(() => {
      generateBotResponse(textToSend);
      setIsTyping(false);
    }, 750);
  };

  const generateBotResponse = (query) => {
    const lower = query.toLowerCase();
    let replyText = '';
    let matchedProducts = [];
    let options = [];

    if (lower.includes('gaming') || lower.includes('chơi game')) {
      replyText = 'Dưới đây là các sản phẩm **Laptop / Thiết bị Gaming** cấu hình cực mạnh, tản nhiệt tối ưu được khách hàng Thế Giới Công Nghệ yêu thích nhất:';
      matchedProducts = products.filter(p => 
        p.category === 'Laptops' && (p.name.toLowerCase().includes('rog') || p.name.toLowerCase().includes('legion') || p.name.toLowerCase().includes('gaming') || p.name.toLowerCase().includes('rtx'))
      ).slice(0, 3);
      if (matchedProducts.length === 0) {
        matchedProducts = products.filter(p => p.category === 'Laptops').slice(0, 2);
      }
      options = ['Xem thêm tai nghe Gaming', 'Tư vấn trả góp 0%'];
    } else if (lower.includes('học tập') || lower.includes('văn phòng') || lower.includes('sinh viên')) {
      replyText = 'Dành cho nhu cầu **học tập - văn phòng**, tôi đề xuất các dòng máy mỏng nhẹ, pin trâu và màn hình sắc nét:';
      matchedProducts = products.filter(p => 
        p.name.toLowerCase().includes('macbook') || p.name.toLowerCase().includes('zenbook') || p.name.toLowerCase().includes('gram') || p.name.toLowerCase().includes('ipad')
      ).slice(0, 3);
      options = ['Laptop dưới 20 triệu', 'Máy tính bảng cho sinh viên'];
    } else if (lower.includes('iphone') || lower.includes('điện thoại') || lower.includes('smartphone')) {
      replyText = 'Đây là các dòng **Điện thoại thông minh** bán chạy nhất với giá tốt nhất thị trường:';
      matchedProducts = products.filter(p => p.category === 'Smartphones').slice(0, 3);
      options = ['Chính sách thu cũ đổi mới', 'Phụ kiện mua kèm giảm 20%'];
    } else if (lower.includes('bảo hành') || lower.includes('đổi trả')) {
      replyText = '🛡️ **Chính sách bảo hành tại Thế Giới Công Nghệ:**\n- 1 đổi 1 trong **30 ngày** nếu có lỗi nhà sản xuất.\n- Bảo hành chính hãng **12 - 24 tháng** tại các trung tâm bảo hành ủy quyền.\n- Hỗ trợ mượn máy dùng tạm trong thời gian bảo hành.\n- Đội ngũ kỹ thuật viên tư vấn 24/7 qua Hotline: **0368 402 970**.';
      options = ['Kiểm tra bảo hành qua SĐT', 'Trang chủ sản phẩm'];
    } else if (lower.includes('cửa hàng') || lower.includes('địa chỉ') || lower.includes('vị trí')) {
      replyText = '📍 **Hệ thống Showroom Thế Giới Công Nghệ:**\n- **Hồ Chí Minh:** 123 Nguyễn Thị Minh Khai, Q.1 & 456 Lê Văn Sỹ, Q.3.\n- **Hà Nội:** 88 Thái Hà, Đống Đa & 102 Cầu Giấy.\n- **Đà Nẵng:** 45 Nguyễn Văn Linh, Q. Thanh Khê.\n- Giờ mở cửa: **8:00 - 21:30** tất cả các ngày trong tuần.';
      options = ['Xem sản phẩm mới nhất', 'Giao hàng 63 tỉnh thành'];
    } else if (lower.includes('giao hàng') || lower.includes('ship') || lower.includes('vận chuyển') || lower.includes('tỉnh') || lower.includes('toàn quốc')) {
      replyText = '🚚 **Chính sách Giao hàng toàn quốc 63 Tỉnh/Thành:**\n- **Hỗ trợ giao hàng 63 tỉnh thành:** Nhận hàng tận nơi toàn quốc từ 2 - 3 ngày làm việc.\n- **Giao hàng Hỏa tốc 2H:** Nhận ngay trong ngày tại nội thành.\n- **Miễn phí giao hàng:** Cho đơn hàng Giao Tiêu chuẩn.\n- **Kiểm tra hàng trước khi thanh toán (COD):** Đồng kiểm an tâm 100%.';
      options = ['Xem giỏ hàng', 'Tư vấn mua sắm'];
    } else {
      // Smart search match
      const keywords = lower.split(' ').filter(w => w.length > 2);
      const found = products.filter(p => keywords.some(k => p.name.toLowerCase().includes(k) || p.category.toLowerCase().includes(k))).slice(0, 3);

      if (found.length > 0) {
        replyText = `Tôi đã tìm thấy **${found.length} sản phẩm** phù hợp với tìm kiếm "${query}" của bạn:`;
        matchedProducts = found;
      } else {
        replyText = `Cảm ơn câu hỏi của bạn về "${query}". Bạn có thể chọn các gợi ý bên dưới hoặc nhờ nhân viên tư vấn qua hotline: **0368 402 970**.`;
        options = [
          '💻 Các dòng Laptop hot',
          '📱 Flagship Điện thoại',
          '🎧 Tai nghe & Phụ kiện'
        ];
      }
    }

    const botMsg = {
      id: Date.now(),
      sender: 'bot',
      text: replyText,
      products: matchedProducts,
      options: options
    };

    setMessages(prev => [...prev, botMsg]);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#d70018] text-white p-4 rounded-full shadow-2xl hover:bg-[#be0015] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          title="Mở Trợ lý TGCN"
        >
          <Bot className="w-7 h-7 animate-bounce" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-2">
            Tư Vấn TGCN
          </span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[560px] animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-[#d70018] flex items-center justify-center shadow-lg shadow-red-900/40">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-1.5">
                  TGCN Assistant
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h3>
                <p className="text-[11px] text-emerald-400 font-medium">Trực tuyến | Phản hồi tức thì</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-[#d70018] text-white flex items-center justify-center flex-shrink-0 text-xs shadow-md">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[82%] space-y-2.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div 
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#d70018] text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                    }`}
                  >
                    <div dangerouslySetInnerHTML={{ 
                      __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') 
                    }} />
                  </div>

                  {/* Render Embedded Product Recommendation Cards */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="space-y-2 pt-1">
                      {msg.products.map((p) => {
                        const imgSrc = p.images?.[0] || p.image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80';
                        return (
                          <div 
                            key={p.id} 
                            className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm flex items-center gap-2.5 hover:border-red-300 transition overflow-hidden"
                          >
                            <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                              <img 
                                src={imgSrc} 
                                alt="" 
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80';
                                }} 
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-[11px] font-bold text-gray-900 truncate">{p.name}</h4>
                              <p className="text-xs font-extrabold text-[#d70018]">
                                {p.price?.toLocaleString('vi-VN')}đ
                              </p>
                            </div>
                            <div className="flex flex-col gap-1 shrink-0">
                              <button
                                onClick={() => {
                                  setIsOpen(false);
                                  onSelectProduct?.(p);
                                }}
                                className="bg-slate-100 hover:bg-slate-200 text-gray-800 text-[10px] font-bold py-1 px-2.5 rounded-lg transition"
                              >
                                Xem
                              </button>
                              <button
                                onClick={() => onAddToCart?.(p)}
                                className="bg-[#d70018] hover:bg-[#be0015] text-white text-[10px] font-bold py-1 px-2.5 rounded-lg transition"
                              >
                                +Giỏ
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Render Action Option Buttons */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(opt)}
                          className="bg-white hover:bg-red-50 text-[#d70018] text-[11px] font-medium px-3 py-1.5 rounded-xl border border-red-200 transition shadow-sm"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center flex-shrink-0 text-xs shadow-md">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-gray-400 italic">
                <Bot className="w-4 h-4 text-[#d70018] animate-spin" />
                <span>Trợ lý TGCN đang soạn phản hồi...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }} 
            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Nhập câu hỏi hoặc nhu cầu mua sắm..."
              className="flex-1 bg-slate-100 border border-transparent rounded-2xl px-4 py-2 text-xs focus:bg-white focus:border-[#d70018] focus:outline-none transition"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="bg-[#d70018] hover:bg-[#be0015] disabled:opacity-50 text-white p-2.5 rounded-2xl transition shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
