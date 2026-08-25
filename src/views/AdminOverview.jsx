import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, ShoppingBag, Package, Users, DollarSign, 
  ArrowUpRight, Eye, CheckCircle2, Clock, XCircle, X, ShieldCheck, Sparkles, Download, RefreshCw, Pause, Play, Bell
} from 'lucide-react';

export default function AdminOverview({ 
  products = [], 
  orders = [], 
  registeredUsers = [],
  onSelectProduct, 
  onUpdateOrderStatus 
}) {
  const [chartPeriod, setChartPeriod] = useState('monthly'); // 'monthly' | 'weekly'
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // for modal detail view

  const [liveToasts, setLiveToasts] = useState([]);

  // Calculate total revenue STRICTLY from completed / delivered orders ("Hoàn thành" or "Đã giao")
  const completedOrders = orders.filter(o => o.status === 'Hoàn thành' || o.status === 'Đã giao');
  const completedOrderSum = completedOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const displayTotalRevenue = completedOrderSum;
  
  const pendingOrdersCount = orders.filter(o => o.status === 'Đang xử lý').length;
  const displayOrdersCount = orders.length;
  const displayCustomersCount = registeredUsers.length;

  // React strictly when an order status changes to "Hoàn thành" or "Đã giao"
  const prevCompletedSumRef = useRef(completedOrderSum);
  useEffect(() => {
    if (completedOrderSum > prevCompletedSumRef.current) {
      const addedRevenue = completedOrderSum - prevCompletedSumRef.current;
      const newToast = { 
        id: Date.now(), 
        text: `💰 ĐƠN HÀNG HOÀN THÀNH! Doanh thu hệ thống vừa cập nhật +${addedRevenue.toLocaleString('vi-VN')}đ!`, 
        amount: addedRevenue, 
        time: 'Vừa xong' 
      };

      setLiveToasts(prev => [newToast, ...prev.slice(0, 2)]);

      // Auto remove toast after 6 seconds
      setTimeout(() => {
        setLiveToasts(prev => prev.filter(t => t.id !== newToast.id));
      }, 6000);
    }
    prevCompletedSumRef.current = completedOrderSum;
  }, [completedOrderSum]);

  // Chart Datasets
  const monthlyData = [
    { label: 'Tháng 1', value: 165000000, display: '165 Tr', y: 150 },
    { label: 'Tháng 2', value: 182000000, display: '182 Tr', y: 135 },
    { label: 'Tháng 3', value: 175000000, display: '175 Tr', y: 140 },
    { label: 'Tháng 4', value: 210000000, display: '210 Tr', y: 95 },
    { label: 'Tháng 5', value: 205000000, display: '205 Tr', y: 100 },
    { label: 'Tháng 6', value: 230000000, display: '230 Tr', y: 60 },
    { label: 'Tháng 7', value: displayTotalRevenue, display: displayTotalRevenue > 0 ? `${(displayTotalRevenue / 1000000).toFixed(0)} Tr` : '0đ', y: 30 }
  ];

  const weeklyData = [
    { label: 'Tuần 1', value: 42000000, display: '42 Tr', y: 160 },
    { label: 'Tuần 2', value: 48000000, display: '48 Tr', y: 140 },
    { label: 'Tuần 3', value: 51000000, display: '51 Tr', y: 125 },
    { label: 'Tuần 4', value: 65000000, display: '65 Tr', y: 80 },
    { label: 'Tuần 5', value: 59000000, display: '59 Tr', y: 95 },
    { label: 'Tuần 6', value: 72000000, display: '72 Tr', y: 55 },
    { label: 'Tuần 7', value: displayTotalRevenue, display: displayTotalRevenue > 0 ? `${(displayTotalRevenue / 1000000).toFixed(0)} Tr` : '0đ', y: 30 }
  ];

  const activeChartData = chartPeriod === 'monthly' ? monthlyData : weeklyData;

  // Path SVG coordinates generator
  const getSvgPath = (data) => {
    const step = 700 / (data.length - 1);
    let path = `M 0 ${data[0].y}`;
    for (let i = 0; i < data.length - 1; i++) {
      const x1 = i * step;
      const y1 = data[i].y;
      const x2 = (i + 1) * step;
      const y2 = data[i + 1].y;
      const cx1 = x1 + step / 2;
      const cx2 = x1 + step / 2;
      path += ` C ${cx1} ${y1}, ${cx2} ${y2}, ${x2} ${y2}`;
    }
    return path;
  };

  const currentPath = getSvgPath(activeChartData);
  const currentAreaPath = `${currentPath} L 700 200 L 0 200 Z`;

  // Sort top selling products dynamically by salesCount
  const topSellingProducts = [...products]
    .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
    .slice(0, 4);

  const statusOptions = ['Đang xử lý', 'Đang giao', 'Đã giao', 'Hoàn thành', 'Đã hủy'];

  const handleExportOrdersCSV = () => {
    if (!orders || orders.length === 0) {
      alert('Không có dữ liệu đơn hàng để xuất!');
      return;
    }

    const headers = ["Mã đơn", "Khách hàng", "Số điện thoại", "Địa chỉ", "Tổng tiền (VNĐ)", "Hình thức thanh toán", "Trạng thái", "Thời gian"];
    const rows = orders.map(o => [
      `"${o.id}"`,
      `"${o.customerName || o.shippingAddress?.fullName || 'Khách hàng'}"`,
      `"${o.phone || o.shippingAddress?.phone || ''}"`,
      `"${o.shippingAddress?.address || ''}, ${o.shippingAddress?.district || ''}, ${o.shippingAddress?.city || ''}"`,
      `"${o.total || 0}"`,
      `"${o.paymentMethod || 'COD'}"`,
      `"${o.status}"`,
      `"${o.createdAt || ''}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Bao_Cao_Don_Hang_TechZone_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      
      {/* Top Header Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 font-display">
            Tổng quan Quản trị
          </h1>
          <p className="text-xs text-gray-500">
            Hệ thống bán lẻ, Admin dashboard cập nhật theo thời gian thực.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-700 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>🟢 Đang lắng nghe đơn hàng khách mua</span>
          </div>

          <button
            onClick={handleExportOrdersCSV}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow flex items-center gap-1.5"
            title="Xuất báo cáo dữ liệu đơn hàng ra file Excel / CSV"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Xuất báo cáo CSV</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row (Design #1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Revenue */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3 relative overflow-hidden group hover:border-red-300 transition">
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-xl bg-red-50 text-[#d70018]">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              Tự động
            </span>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tổng doanh thu</div>
            <div className="text-2xl font-extrabold text-gray-900 font-display mt-0.5 transition-all">
              {displayTotalRevenue.toLocaleString('vi-VN')}đ
            </div>
          </div>
        </div>

        {/* Metric 2: New Orders */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3 group hover:border-amber-300 transition">
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              {pendingOrdersCount} Mới
            </span>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Đơn hàng mới</div>
            <div className="text-2xl font-extrabold text-gray-900 font-display mt-0.5">
              {displayOrdersCount.toLocaleString('vi-VN')} đơn
            </div>
          </div>
        </div>

        {/* Metric 3: Active Products */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3 group hover:border-blue-300 transition">
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              {products.length} Active
            </span>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sản phẩm đang bán</div>
            <div className="text-2xl font-extrabold text-gray-900 font-display mt-0.5">
              {products.length} dòng máy
            </div>
          </div>
        </div>

        {/* Metric 4: Customers */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3 group hover:border-emerald-300 transition">
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <Users className="w-6 h-6" />
            </div>
            <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              Thực tế
            </span>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Khách hàng đăng ký</div>
            <div className="text-2xl font-extrabold text-gray-900 font-display mt-0.5">
              {displayCustomersCount.toLocaleString('vi-VN')} tài khoản
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Revenue Growth Chart + Top Selling Products (Design #1) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Revenue Area Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 pb-3">
            <h3 className="font-extrabold text-base text-gray-900 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-[#d70018]" />
              <span>Tăng trưởng doanh thu ({chartPeriod === 'monthly' ? 'Theo Tháng' : 'Theo Tuần'})</span>
            </h3>

            {/* Toggle Buttons: Theo Tháng / Theo Tuần */}
            <div className="flex items-center space-x-2 text-xs">
              <button 
                onClick={() => setChartPeriod('monthly')}
                className={`px-3 py-1.5 rounded-xl font-bold transition shadow-sm ${
                  chartPeriod === 'monthly' 
                    ? 'bg-[#d70018] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Theo tháng
              </button>
              <button 
                onClick={() => setChartPeriod('weekly')}
                className={`px-3 py-1.5 rounded-xl font-bold transition shadow-sm ${
                  chartPeriod === 'weekly' 
                    ? 'bg-[#d70018] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Theo tuần
              </button>
            </div>
          </div>

          {/* Custom SVG Interactive Revenue Area Chart */}
          <div className="h-64 relative flex items-end pt-8 pb-6 px-2 border-b border-gray-100">
            
            {/* Hover Tooltip Popup */}
            {hoveredPoint !== null && (
              <div 
                className="absolute z-20 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-xl shadow-xl border border-slate-700 pointer-events-none transform -translate-x-1/2 -translate-y-12 animate-in fade-in zoom-in-95"
                style={{ 
                  left: `${(hoveredPoint * 100) / (activeChartData.length - 1)}%`,
                  top: `${activeChartData[hoveredPoint].y}px`
                }}
              >
                <div className="font-bold text-yellow-400">{activeChartData[hoveredPoint].label}</div>
                <div className="text-[11px]">Doanh thu: {activeChartData[hoveredPoint].value.toLocaleString('vi-VN')}đ</div>
              </div>
            )}

            <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d70018" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#d70018" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area fill */}
              <path 
                d={currentAreaPath} 
                fill="url(#revenueGrad)" 
                className="transition-all duration-500 ease-out"
              />

              {/* Line Stroke */}
              <path 
                d={currentPath} 
                fill="none" 
                stroke="#d70018" 
                strokeWidth="4" 
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />

              {/* Dots */}
              {activeChartData.map((pt, i) => {
                const x = (i * 700) / (activeChartData.length - 1);
                return (
                  <g key={i} className="cursor-pointer">
                    <circle 
                      cx={x} 
                      cy={pt.y} 
                      r={hoveredPoint === i ? "8" : "6"} 
                      fill={hoveredPoint === i ? "#d70018" : "#ffffff"} 
                      stroke="#d70018" 
                      strokeWidth="3" 
                      onMouseEnter={() => setHoveredPoint(i)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      className="transition-all duration-200"
                    />
                  </g>
                );
              })}
            </svg>

            {/* X-Axis labels */}
            <div className="w-full flex justify-between text-xs font-semibold text-gray-500 relative z-10">
              {activeChartData.map((d, i) => (
                <span 
                  key={i} 
                  className={`cursor-pointer transition ${hoveredPoint === i ? 'text-[#d70018] font-bold scale-110' : ''}`}
                  onMouseEnter={() => setHoveredPoint(i)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  {d.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Top Selling Products Widget (4 cols - Design #1) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h3 className="font-extrabold text-base text-gray-900 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Sản phẩm bán chạy</span>
            </h3>
            <span className="text-[10px] bg-red-50 text-[#d70018] px-2 py-0.5 rounded font-bold">Top 4</span>
          </div>

          <div className="divide-y divide-gray-100 space-y-3">
            {topSellingProducts.map(p => (
              <div 
                key={p.id} 
                onClick={() => onSelectProduct && onSelectProduct(p)}
                className="pt-3 flex items-center space-x-3 text-xs hover:bg-gray-50 p-2 rounded-xl transition cursor-pointer group"
              >
                <img src={p.images[0]} alt="" className="w-12 h-12 object-contain bg-gray-50 rounded-xl p-1 border border-gray-100 shrink-0 group-hover:scale-105 transition" />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 line-clamp-1 group-hover:text-[#d70018] transition">{p.name}</h4>
                  <div className="text-[11px] text-gray-500">Đã bán: <strong className="text-gray-800">{p.salesCount || 180} chiếc</strong></div>
                </div>
                <div className="font-extrabold text-[#d70018]">
                  {p.price.toLocaleString('vi-VN')}đ
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Section: Recent Pending Orders Table (Design #1 - Editable Status) */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div>
            <h3 className="font-extrabold text-base text-gray-900">
              Đơn hàng mới cần xử lý
            </h3>
            <p className="text-xs text-gray-500">
              Thay đổi trực tiếp trạng thái đơn hàng trong bảng hoặc bấm "Chi tiết" để xem hóa đơn.
            </p>
          </div>
          <span className="text-xs text-[#d70018] font-bold">
            Tổng cộng {orders.length} đơn hàng
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase border-b border-gray-200">
              <tr>
                <th className="p-3">Mã đơn hàng</th>
                <th className="p-3">Khách hàng</th>
                <th className="p-3">Thời gian</th>
                <th className="p-3">Tổng tiền</th>
                <th className="p-3">Trạng thái (Click để đổi)</th>
                <th className="p-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/80 transition">
                  <td className="p-3 font-bold text-gray-900">{order.id}</td>
                  <td className="p-3 font-semibold text-gray-800">{order.customerName}</td>
                  <td className="p-3 text-gray-500">{order.time}</td>
                  <td className="p-3 font-extrabold text-[#d70018]">
                    {order.total.toLocaleString('vi-VN')}đ
                  </td>
                  
                  {/* DIRECT EDITABLE ORDER STATUS SELECT DROPDOWN */}
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold border outline-none cursor-pointer transition shadow-sm ${
                        order.status === 'Đã giao' || order.status === 'Hoàn thành' ? 'bg-green-100 text-green-700 border-green-300' :
                        order.status === 'Đang xử lý' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                        order.status === 'Đang giao' ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-red-100 text-red-700 border-red-300'
                      }`}
                    >
                      {statusOptions.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-3 py-1 rounded-lg transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Chi tiết</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full p-6 relative border border-gray-100 space-y-4 animate-in fade-in zoom-in-95">
            <button 
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-gray-100 pb-3">
              <span className="text-[10px] bg-red-50 text-[#d70018] font-bold px-2 py-0.5 rounded">HÓA ĐƠN ĐƠN HÀNG</span>
              <h3 className="font-extrabold text-base text-gray-900 mt-1">
                Chi tiết đơn hàng {selectedOrder.id}
              </h3>
              <p className="text-xs text-gray-400">Thời gian khởi tạo: {selectedOrder.time}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-gray-50 p-3 rounded-xl space-y-1 border border-gray-100">
                <div><strong>Khách hàng:</strong> {selectedOrder.customerName}</div>
                <div><strong>Số điện thoại:</strong> {selectedOrder.phone || '0987777554'}</div>
                <div><strong>Địa chỉ giao:</strong> {selectedOrder.address || 'Hồ Chí Minh'}</div>
              </div>

              <div>
                <strong className="block mb-2 text-gray-700">Sản phẩm trong đơn:</strong>
                <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl p-3 bg-white">
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} className="py-1.5 flex justify-between">
                      <span className="font-semibold">{it.name} (x{it.quantity})</span>
                      <span className="font-extrabold text-[#d70018]">{it.price.toLocaleString('vi-VN')}đ</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-gray-700">Cập nhật trạng thái:</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    onUpdateOrderStatus(selectedOrder.id, e.target.value);
                    setSelectedOrder({ ...selectedOrder, status: e.target.value });
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold border border-gray-300 outline-none cursor-pointer bg-white"
                >
                  {statusOptions.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="border-t border-gray-100 pt-3 flex justify-between items-center font-extrabold text-sm">
                <span>TỔNG THÀNH TIỀN:</span>
                <span className="text-lg text-[#d70018]">{selectedOrder.total.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Real-time Live Activity Notification Overlay */}
      {liveToasts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 space-y-2 pointer-events-none max-w-sm w-full">
          {liveToasts.map(toast => (
            <div 
              key={toast.id} 
              className="bg-slate-900/95 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700/80 backdrop-blur flex items-center space-x-3 animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-auto"
            >
              <div className="p-2 bg-[#d70018] rounded-xl shrink-0 text-white shadow-md">
                <Bell className="w-4 h-4 animate-bounce" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider">🔴 Giao dịch Live</span>
                  <span className="text-[9px] text-gray-400">{toast.time}</span>
                </div>
                <p className="text-xs font-bold text-gray-100 truncate mt-0.5">{toast.text}</p>
                {toast.amount > 0 && (
                  <div className="text-xs font-black text-emerald-400 mt-0.5">
                    +{toast.amount.toLocaleString('vi-VN')}đ • {toast.customer}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
