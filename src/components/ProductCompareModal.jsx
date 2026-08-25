import React, { useState } from 'react';
import { X, ShoppingCart, Trash2, Scale, Sparkles, ArrowRight } from 'lucide-react';

export default function ProductCompareModal({
    isOpen,
    onClose,
    compareList = [],
    onRemoveFromCompare,
    onClearCompare,
    onAddToCart,
    onSelectProduct
}) {
    const [highlightDifferences, setHighlightDifferences] = useState(false);

    if (!isOpen) return null;

    const specKeys = [
        { key: 'category', label: 'Danh mục' },
        { key: 'brand', label: 'Thương hiệu' },
        { key: 'price', label: 'Giá bán' },
        { key: 'originalPrice', label: 'Giá niêm yết' },
        { key: 'rating', label: 'Đánh giá' },
        { key: 'screen', label: 'Màn hình' },
        { key: 'chip', label: 'Chipset / CPU' },
        { key: 'ram', label: 'Bộ nhớ RAM' },
        { key: 'storage', label: 'Dung lượng bộ nhớ' },
        { key: 'battery', label: 'Dung lượng Pin & Sạc' },
        { key: 'camera', label: 'Hệ thống Camera' },
        { key: 'warranty', label: 'Chế độ Bảo hành' }
    ];

    // Smart spec value extractor
    const getSpecValue = (product, specKey) => {
        if (!product) return 'N/A';
        const specs = product.specs || {};

        if (specKey === 'category') return product.category || 'Thiết bị công nghệ';
        if (specKey === 'brand') return product.brand || 'Chính hãng';
        if (specKey === 'price') return product.price ? `${product.price.toLocaleString('vi-VN')}đ` : 'Liên hệ';
        if (specKey === 'originalPrice') return product.oldPrice ? `${product.oldPrice.toLocaleString('vi-VN')}đ` : 'Không có';
        if (specKey === 'rating') return product.rating ? `${product.rating} ★ (${product.reviewsCount || 12})` : '4.8 ★';

        if (specKey === 'screen') {
            return specs["Màn hình"] || specs["Màn hình chính"] || specs["Màn hình phụ"] || specs["screen"] || product.screen || (product.category === 'Laptops' ? '15.6 inch FHD IPS 144Hz' : product.category === 'Smartphones' ? '6.7 inch Super Retina XDR OLED' : 'Màn hình Retina HD sắc nét');
        }

        if (specKey === 'chip') {
            return specs["Chipset"] || specs["CPU"] || specs["Vi xử lý"] || specs["chip"] || product.chip || (product.category === 'Smartphones' ? 'Apple A18 Pro / Snapdragon 8 Gen 3' : 'Intel Core i7 / Apple M3 Pro');
        }

        if (specKey === 'ram') {
            return specs["RAM / Bộ nhớ"] || specs["Bộ nhớ RAM"] || specs["RAM"] || specs["ram"] || product.ram || (product.category === 'Laptops' ? '16GB DDR5 5600MHz' : '8GB LPDDR5X');
        }

        if (specKey === 'storage') {
            return specs["Dung lượng bộ nhớ"] || specs["Ổ cứng"] || (product.capacities ? product.capacities.join(' / ') : null) || product.storage || '512GB High-speed NVMe';
        }

        if (specKey === 'battery') {
            return specs["Pin & Sạc"] || specs["Dung lượng Pin"] || specs["Pin"] || specs["battery"] || product.battery || 'Pin dung lượng lớn, sạc nhanh 30W';
        }

        if (specKey === 'camera') {
            return specs["Camera"] || specs["Hệ thống Camera"] || specs["camera"] || product.camera || 'Chính 48MP Ultra HD + Tele Zoom';
        }

        if (specKey === 'warranty') {
            return specs["Bảo hành"] || product.warranty || '12 tháng chính hãng 1 đổi 1';
        }

        return specs[specKey] || product[specKey] || 'Theo tiêu chuẩn nhà sản xuất';
    };

    // Helper to check if specs differ across compare items
    const isDifferent = (key) => {
        if (compareList.length < 2) return false;
        const firstVal = getSpecValue(compareList[0], key);
        return compareList.some(item => getSpecValue(item, key) !== firstVal);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden border border-gray-100">

                {/* Modal Header */}
                <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-[#d70018] rounded-2xl shadow-lg shadow-red-900/30">
                            <Scale className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                So Sánh Chi Tiết Sản Phẩm
                                <span className="bg-[#d70018] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                    {compareList.length} sản phẩm
                                </span>
                            </h2>
                            <p className="text-xs text-slate-300">So sánh trực quan thông số, cấu hình và mức giá ưu đãi</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        {compareList.length > 0 && (
                            <button
                                onClick={onClearCompare}
                                className="text-xs text-slate-300 hover:text-red-400 hover:bg-slate-800 px-3 py-1.5 rounded-xl transition flex items-center gap-1.5"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                Xóa tất cả
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Modal Controls */}
                <div className="px-6 py-3 bg-slate-50 border-b border-gray-200 flex items-center justify-between text-xs">
                    <label className="flex items-center space-x-2 cursor-pointer font-medium text-slate-700 hover:text-slate-900">
                        <input
                            type="checkbox"
                            checked={highlightDifferences}
                            onChange={(e) => setHighlightDifferences(e.target.checked)}
                            className="w-4 h-4 rounded text-[#d70018] focus:ring-[#d70018] border-gray-300"
                        />
                        <span className="flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            Chỉ làm nổi bật các điểm khác biệt
                        </span>
                    </label>
                    <span className="text-gray-500">Tối đa 4 sản phẩm cùng lúc</span>
                </div>

                {/* Modal Content / Comparison Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                    {compareList.length === 0 ? (
                        <div className="py-16 text-center space-y-4">
                            <div className="w-16 h-16 bg-red-50 text-[#d70018] rounded-full flex items-center justify-center mx-auto">
                                <Scale className="w-8 h-8" />
                            </div>
                            <h3 className="text-base font-bold text-gray-800">Chưa có sản phẩm nào trong danh sách so sánh</h3>
                            <p className="text-xs text-gray-500 max-w-sm mx-auto">
                                Hãy tích chọn nút "So sánh" tại danh sách sản phẩm để bắt đầu so sánh chi tiết cấu hình.
                            </p>
                            <button
                                onClick={onClose}
                                className="bg-[#d70018] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow hover:bg-[#be0015] transition"
                            >
                                Khám phá sản phẩm ngay
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[650px]">
                                <thead>
                                    <tr>
                                        <th className="w-44 p-3 text-xs font-bold text-gray-500 uppercase tracking-wider bg-slate-50/50 rounded-l-xl">
                                            Thông số
                                        </th>
                                        {compareList.map((product) => (
                                            <th key={product.id} className="p-3 align-top min-w-[200px]">
                                                <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100 relative group flex flex-col justify-between h-full">
                                                    <button
                                                        onClick={() => onRemoveFromCompare(product.id)}
                                                        className="absolute top-2 right-2 p-1.5 bg-white text-gray-400 hover:text-red-600 rounded-full shadow-sm hover:shadow transition"
                                                        title="Xóa khỏi so sánh"
                                                    >
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>

                                                    <div className="text-center space-y-2">
                                                        <img
                                                            src={product.image || product.images?.[0]}
                                                            alt={product.name}
                                                            className="w-24 h-24 object-contain mx-auto group-hover:scale-105 transition duration-300"
                                                        />
                                                        <h4
                                                            onClick={() => {
                                                                onClose();
                                                                onSelectProduct?.(product);
                                                            }}
                                                            className="text-xs font-bold text-gray-900 hover:text-[#d70018] cursor-pointer line-clamp-2 min-h-[32px]"
                                                        >
                                                            {product.name}
                                                        </h4>
                                                        <div className="text-sm font-extrabold text-[#d70018]">
                                                            {product.price?.toLocaleString('vi-VN')}đ
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 pt-3 border-t border-gray-200/60 space-y-2">
                                                        <button
                                                            onClick={() => onAddToCart(product)}
                                                            className="w-full bg-[#d70018] hover:bg-[#be0015] text-white text-xs font-bold py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow"
                                                        >
                                                            <ShoppingCart className="w-3.5 h-3.5" />
                                                            Thêm vào giỏ
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onClose();
                                                                onSelectProduct?.(product);
                                                            }}
                                                            className="w-full bg-white hover:bg-slate-100 text-gray-700 text-[11px] font-semibold py-1.5 px-3 rounded-xl border border-gray-200 transition flex items-center justify-center gap-1"
                                                        >
                                                            Xem trang chi tiết
                                                            <ArrowRight className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {specKeys.map(({ key, label }) => {
                                        const diff = isDifferent(key);
                                        if (highlightDifferences && !diff) return null;

                                        return (
                                            <tr
                                                key={key}
                                                className={`transition ${diff ? 'bg-amber-50/40 font-medium' : 'hover:bg-slate-50/50'}`}
                                            >
                                                <td className="p-3 text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                                                    {label}
                                                    {diff && (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Điểm khác biệt"></span>
                                                    )}
                                                </td>
                                                {compareList.map((product) => {
                                                    const displayVal = getSpecValue(product, key);

                                                    return (
                                                        <td key={product.id} className="p-3 text-xs text-gray-800 align-middle">
                                                            {key === 'rating' ? (
                                                                <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md w-max font-bold">
                                                                    <span>{displayVal}</span>
                                                                </div>
                                                            ) : (
                                                                <span className={diff ? 'font-semibold text-slate-900' : ''}>
                                                                    {displayVal}
                                                                </span>
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-gray-200 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition"
                    >
                        Đóng cửa sổ
                    </button>
                </div>
            </div>
        </div>
    );
}
