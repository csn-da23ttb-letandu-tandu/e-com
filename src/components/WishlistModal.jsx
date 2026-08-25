import React from 'react';
import { X, Heart, ShoppingCart, Trash2, ChevronRight, Sparkles } from 'lucide-react';

export default function WishlistModal({
  isOpen,
  onClose,
  wishlist = [],
  products = [],
  onToggleWishlist,
  onAddToCart,
  onSelectProduct
}) {
  if (!isOpen) return null;

  const favoriteProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-red-600 to-[#d70018] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-white/10 rounded-full">
              <Heart className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg font-display flex items-center gap-2">
                Sản Phẩm Yêu Thích Của Bạn
                <span className="bg-yellow-400 text-slate-900 text-[11px] font-black px-2 py-0.5 rounded-full">
                  {favoriteProducts.length}
                </span>
              </h2>
              <p className="text-xs text-red-100">Các sản phẩm bạn đã lưu để mua sau</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Heart className="w-8 h-8 text-red-400 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-gray-900 text-base">Chưa có sản phẩm yêu thích</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Hãy bấm biểu tượng trái tim <Heart className="w-3.5 h-3.5 inline text-red-500" /> ở bất kỳ sản phẩm nào để lưu lại tại đây!
                </p>
              </div>
              <button 
                onClick={onClose}
                className="bg-[#d70018] text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-[#be0015] transition shadow-md"
              >
                Khám phá sản phẩm ngay
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favoriteProducts.map(product => (
                <div 
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between relative group"
                >
                  {/* Remove Wishlist Button */}
                  <button 
                    onClick={() => onToggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition z-10"
                    title="Xóa khỏi danh sách yêu thích"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div 
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="cursor-pointer space-y-3"
                  >
                    <div className="w-full h-32 bg-gray-50 rounded-xl p-2 flex items-center justify-center border border-gray-100">
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" 
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-500">{product.brand}</span>
                      <h4 className="font-bold text-xs text-gray-900 line-clamp-2 hover:text-[#d70018] transition">
                        {product.name}
                      </h4>
                      <div className="flex items-baseline space-x-2 mt-1">
                        <span className="font-extrabold text-sm text-[#d70018]">
                          {product.price.toLocaleString('vi-VN')}đ
                        </span>
                        {product.oldPrice && (
                          <span className="text-[10px] text-gray-400 line-through">
                            {product.oldPrice.toLocaleString('vi-VN')}đ
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="pt-3 border-t border-gray-100 mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                      {product.status || 'Còn hàng'}
                    </span>
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="bg-[#d70018] hover:bg-[#be0015] text-white font-bold px-3 py-1.5 rounded-lg text-xs transition shadow flex items-center space-x-1"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Thêm giỏ hàng</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {favoriteProducts.length > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600">
            <span>Đang lưu <strong>{favoriteProducts.length}</strong> sản phẩm yêu thích</span>
            <button 
              onClick={onClose}
              className="font-bold text-[#d70018] hover:underline flex items-center gap-1"
            >
              <span>Tiếp tục xem shop</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
