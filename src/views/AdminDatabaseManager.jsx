import React, { useState, useEffect } from 'react';
import { Database, Download, Upload, RefreshCw, Server, Table, CheckCircle, Code, ShieldCheck, HardDrive, FileJson, AlertTriangle } from 'lucide-react';
import { dbService } from '../services/dbService';

export default function AdminDatabaseManager({ onRefreshApp }) {
  const [stats, setStats] = useState(dbService.getStats());
  const [rawDbJson, setRawDbJson] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' or 'json'
  const [msg, setMsg] = useState(null);

  const refreshStats = () => {
    const s = dbService.getStats();
    setStats(s);
    setRawDbJson(JSON.stringify(dbService.getFullDatabase(), null, 2));
  };

  useEffect(() => {
    refreshStats();
  }, []);

  const handleExport = () => {
    dbService.exportDatabaseJSON();
    showMsg('success', 'Đã xuất file Cơ sở dữ liệu (TheGioiCongNghe_Database.json) thành công!');
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await dbService.importDatabaseJSON(file);
        refreshStats();
        showMsg('success', 'Đã nạp file Database mới vào hệ thống thành công! Trang web đang làm mới...');
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } catch (err) {
        showMsg('error', 'Lỗi cấu trúc file JSON Database! Vui lòng kiểm tra lại định dạng file.');
      }
    }
  };

  const handleReset = () => {
    if (window.confirm('CẢNH BÁO: Hành động này sẽ xóa toàn bộ dữ liệu chỉnh sửa và khôi phục Cơ sở dữ liệu về mặc định ban đầu. Bạn có chắc chắn muốn khôi phục?')) {
      dbService.resetToFactoryDefaults();
      refreshStats();
      showMsg('warning', 'Đã khôi phục Cơ sở dữ liệu về dữ liệu gốc mặc định thành công! Đang tải lại...');
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    }
  };

  const showMsg = (type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">

      {/* Top Banner Header (Phong cách Sáng Light Mode) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200/80 shadow-lg text-gray-900">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-50 text-[#d70018] rounded-2xl border border-red-200 shadow-sm">
            <Database className="w-8 h-8 animate-pulse text-[#d70018]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black font-display text-slate-900">Quản Lý Cơ Sở Dữ Liệu</h1>
              <span className="bg-emerald-50 text-emerald-700 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-sm">
                🟢 HỆ THỐNG HOẠT ĐỘNG
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Hệ quản trị CSDL JSON & Bộ nhớ lưu trữ dành cho Báo Cáo Đồ Án
            </p>
          </div>
        </div>

        {/* Database Quick Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleExport}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-4 py-2.5 rounded-xl transition shadow flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Xuất Dữ Liệu (.JSON)</span>
          </button>

          <label className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-4 py-2.5 rounded-xl transition shadow flex items-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>Nạp Dữ Liệu (.JSON)</span>
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>

          <button
            onClick={handleReset}
            className="bg-red-50 hover:bg-red-100 text-[#d70018] font-extrabold text-xs px-4 py-2.5 rounded-xl transition border border-red-200 flex items-center gap-2 cursor-pointer"
            title="Khôi phục về dữ liệu gốc ban đầu"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Khôi Phục Dữ Liệu Gốc</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {msg && (
        <div className={`p-4 rounded-2xl text-xs font-bold flex items-center space-x-2 animate-in fade-in ${msg.type === 'success' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
            msg.type === 'error' ? 'bg-red-100 text-red-800 border border-red-300' :
              'bg-amber-100 text-amber-900 border border-amber-300'
          }`}>
          {msg.type === 'error' ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          <span>{msg.text}</span>
        </div>
      )}

      {/* System Metrics & Health Dashboard Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-1">
          <div className="text-[10px] text-gray-500 font-bold uppercase">Sản phẩm kho</div>
          <div className="text-2xl font-black text-slate-900 font-display">{stats.totalProducts} <span className="text-xs text-gray-400 font-normal">bản ghi</span></div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-1">
          <div className="text-[10px] text-gray-500 font-bold uppercase">Tài khoản Người Dùng</div>
          <div className="text-2xl font-black text-blue-600 font-display">{stats.totalUsers} <span className="text-xs text-gray-400 font-normal">tài khoản</span></div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-1">
          <div className="text-[10px] text-gray-500 font-bold uppercase">Đơn hàng mua</div>
          <div className="text-2xl font-black text-emerald-600 font-display">{stats.totalOrders} <span className="text-xs text-gray-400 font-normal">đơn</span></div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-1">
          <div className="text-[10px] text-gray-500 font-bold uppercase">Mã giảm giá</div>
          <div className="text-2xl font-black text-purple-600 font-display">{stats.totalCoupons} <span className="text-xs text-gray-400 font-normal">mã giảm</span></div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-1">
          <div className="text-[10px] text-gray-500 font-bold uppercase">Bài viết tin tức</div>
          <div className="text-2xl font-black text-amber-600 font-display">{stats.totalArticles} <span className="text-xs text-gray-400 font-normal">bài viết</span></div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-1">
          <div className="text-[10px] text-gray-500 font-bold uppercase">Dung lượng CSDL</div>
          <div className="text-2xl font-black text-red-600 font-display">{stats.dbSizeKB} <span className="text-xs text-gray-400 font-normal">Dung lượng KB</span></div>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="flex border-b border-gray-200 gap-4 text-xs font-extrabold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-2 border-b-2 transition flex items-center gap-2 ${activeTab === 'overview' ? 'border-[#d70018] text-[#d70018]' : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
        >
          <Table className="w-4 h-4" />
          <span>Danh Sách Các Bảng CSDL</span>
        </button>

        <button
          onClick={() => setActiveTab('json')}
          className={`pb-3 px-2 border-b-2 transition flex items-center gap-2 ${activeTab === 'json' ? 'border-[#d70018] text-[#d70018]' : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
        >
          <Code className="w-4 h-4" />
          <span>Trình Xem Dữ Liệu Thô (Mã JSON)</span>
        </button>
      </div>

      {/* Tab 1: Database Collections Grid */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { tableName: 'products', label: 'Bảng Sản Phẩm Kho', count: stats.totalProducts, desc: 'Lưu trữ thông tin chi tiết tên, giá, % giảm, tồn kho, ảnh & thông số kĩ thuật sản phẩm' },
            { tableName: 'users', label: 'Bảng Tài Khoản Người Dùng', count: stats.totalUsers, desc: 'Lưu trữ danh sách tài khoản Khách hàng & Ban quản trị Admin, phân quyền & khóa tài khoản' },
            { tableName: 'orders', label: 'Bảng Đơn Hàng Mua Sắm', count: stats.totalOrders, desc: 'Lưu trữ lịch sử giao dịch mua sắm, trạng thái giao hàng, phương thức COD/Banking' },
            { tableName: 'coupons', label: 'Bảng Mã Giảm Giá', count: stats.totalCoupons, desc: 'Lưu trữ danh sách mã giảm giá %, giảm tiền cố định, thời hạn hết hạn mã' },
            { tableName: 'articles', label: 'Bảng Bài Viết Tin Tức', count: stats.totalArticles, desc: 'Lưu trữ tin tức công nghệ, bài viết tư vấn mua sắm, hình ảnh & lượt xem' },
            { tableName: 'ad_banners', label: 'Bảng Banner Quảng Cáo', count: stats.totalBanners, desc: 'Lưu trữ dữ liệu các banner quảng cáo Reno16 F 5G, Galaxy A27 5G trên trang chủ' }
          ].map((tbl, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-3 hover:border-red-200 transition">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
                <span className="font-mono font-bold text-xs text-red-600 bg-red-50 px-2.5 py-1 rounded-lg border border-red-100">
                  bang_{tbl.tableName}
                </span>
                <span className="text-xs font-black text-gray-900 bg-gray-100 px-2.5 py-0.5 rounded-full">
                  {tbl.count} bản ghi
                </span>
              </div>
              <h4 className="font-extrabold text-sm text-gray-900">{tbl.label}</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-normal">{tbl.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Raw JSON Inspector */}
      {activeTab === 'json' && (
        <div className="bg-[#1e293b] rounded-3xl p-5 border border-slate-700 shadow-2xl space-y-3 font-mono text-xs text-white">
          <div className="flex justify-between items-center text-slate-300 border-b border-slate-700 pb-3">
            <span className="flex items-center gap-2 text-emerald-400 font-bold">
              <FileJson className="w-4 h-4" />
              Dữ Liệu Hệ Thống Thời Gian Thực (Mã JSON)
            </span>
            <span className="text-[11px] text-slate-400">Đã đồng bộ thời gian thực với bộ nhớ trình duyệt</span>
          </div>

          <textarea
            readOnly
            value={rawDbJson}
            className="w-full h-96 bg-[#0f172a] text-emerald-400 p-4 rounded-2xl border border-slate-700 focus:outline-none font-mono text-[11px] leading-relaxed resize-none"
          />
        </div>
      )}

    </div>
  );
}
