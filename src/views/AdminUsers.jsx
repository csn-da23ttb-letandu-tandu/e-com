import React, { useState } from 'react';
import { 
  Users, UserCheck, ShieldCheck, Search, Eye, Lock, Unlock, 
  Trash2, Shield, User, ShoppingBag, Phone, Mail, Calendar, Sparkles, X
} from 'lucide-react';

export default function AdminUsers({ 
  registeredUsers = [], 
  orders = [], 
  onUpdateUserRole, 
  onDeleteUser, 
  onToggleUserLock,
  onRegisterUser
}) {
  const [activeTab, setActiveTab] = useState('customers'); // 'customers' hoặc 'admins'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserDetail, setSelectedUserDetail] = useState(null);

  // New Admin creation modal state
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPhone, setNewAdminPhone] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [addAdminError, setAddAdminError] = useState('');

  // Default accounts fallback if list is empty
  const userList = registeredUsers.length > 0 ? registeredUsers : [
    {
      name: 'Lê Tấn Dư (Admin)',
      email: 'tandu@gmail.com',
      phone: '0368402970',
      dob: '05/02/2005',
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

  // Separate list into Admins and Customers cleanly
  const adminList = userList.filter(u => u.role === 'admin');
  const customerList = userList.filter(u => u.role !== 'admin');

  // Active dataset depending on activeTab
  const currentCategoryUsers = activeTab === 'admins' ? adminList : customerList;

  // Filter user list by search query
  const filteredUsers = currentCategoryUsers.filter(u => {
    const q = searchTerm.toLowerCase();
    return (u.name || '').toLowerCase().includes(q) || 
           (u.email || '').toLowerCase().includes(q) || 
           (u.phone || '').includes(q);
  });

  // Calculate stats
  const totalUsers = userList.length;
  const totalAdmins = adminList.length;
  const totalCustomers = customerList.length;

  const handleCreateAdmin = (e) => {
    e.preventDefault();
    setAddAdminError('');

    const cleanEmail = newAdminEmail.trim().toLowerCase();
    const cleanPhone = newAdminPhone.trim();
    const cleanName = newAdminName.trim();

    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setAddAdminError('Vui lòng nhập email hợp lệ');
      return;
    }
    if (newAdminPassword.length < 6) {
      setAddAdminError('Mật khẩu Admin phải từ 6 ký tự trở lên');
      return;
    }

    if (userList.some(u => u.email.toLowerCase() === cleanEmail)) {
      setAddAdminError('Email này đã tồn tại trong hệ thống');
      return;
    }

    const newAdmin = {
      name: cleanName || 'Admin Hệ Thống',
      email: cleanEmail,
      phone: cleanPhone || '0900000000',
      dob: '01/01/2000',
      password: newAdminPassword,
      role: 'admin',
      memberTier: 'S-ELITE',
      isLocked: false
    };

    if (onRegisterUser) {
      onRegisterUser(newAdmin);
    }
    setIsAddAdminModalOpen(false);
    setNewAdminName('');
    setNewAdminEmail('');
    setNewAdminPhone('');
    setNewAdminPassword('');
    alert(`Đã cấp tài khoản Quản trị viên (Admin) thành công cho: ${cleanEmail}`);
  };

  // Get orders placed by a specific user email
  const getUserOrders = (email) => {
    if (!email) return [];
    return orders.filter(o => (o.email || '').toLowerCase() === email.toLowerCase());
  };

  // Get user total spend amount
  const getUserTotalSpent = (email) => {
    const userOrders = getUserOrders(email);
    return userOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 font-display flex items-center gap-2">
            <Users className="w-6 h-6 text-[#d70018]" />
            <span>Quản Lý Tài Khoản Khách Hàng & Đăng Nhập</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Xem toàn bộ tài khoản khách hàng đã đăng ký, quyền hạn, trạng thái đăng nhập và lịch sử mua hàng.
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 text-[#d70018] px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-2">
          <UserCheck className="w-4 h-4" />
          <span>{totalUsers} Tài khoản trong cơ sở dữ liệu</span>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-gray-500">Tổng Số Tài Khoản</div>
            <div className="text-2xl font-extrabold text-gray-900 mt-1">{totalUsers}</div>
            <div className="text-[11px] text-green-600 font-semibold mt-1">Tất cả tài khoản hệ thống</div>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-gray-500">Tài Khoản Khách Hàng</div>
            <div className="text-2xl font-extrabold text-gray-900 mt-1">{totalCustomers}</div>
            <div className="text-[11px] text-gray-500 font-semibold mt-1">Khách hàng mua sắm</div>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
            <User className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-gray-500">Tài Khoản Quản Trị (Admin)</div>
            <div className="text-2xl font-extrabold text-[#d70018] mt-1">{totalAdmins}</div>
            <div className="text-[11px] text-red-600 font-semibold mt-1">Quyền quản trị toàn hệ thống</div>
          </div>
          <div className="p-3 bg-red-50 text-[#d70018] rounded-2xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Primary Section Tabs (Phân tách Khách Hàng và Quản Trị Viên) */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 border-b border-gray-200 pb-2">
        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-2xl border border-gray-200">
          <button
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center space-x-2 ${
              activeTab === 'customers'
                ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <User className="w-4 h-4 text-green-600" />
            <span>1. Khách Hàng Mua Sắm ({totalCustomers})</span>
          </button>

          <button
            onClick={() => setActiveTab('admins')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center space-x-2 ${
              activeTab === 'admins'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-red-500" />
            <span>2. Danh Sách Quản Trị Viên (Admin) ({totalAdmins})</span>
          </button>
        </div>

        {/* Add Admin Button (Only shown in Admin Tab) */}
        {activeTab === 'admins' && (
          <button
            onClick={() => setIsAddAdminModalOpen(true)}
            className="bg-[#d70018] hover:bg-[#be0015] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center space-x-2 shadow transition"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>+ Cấp Tài Khoản Admin Mới</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Search Bar */}
        <div className="relative w-full sm:w-96">
          <input 
            type="text"
            placeholder={activeTab === 'admins' ? "Tìm theo tên, email Admin..." : "Tìm theo tên, email, SĐT khách hàng..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#d70018] focus:border-transparent outline-none font-medium"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>

        <div className="text-xs font-semibold text-gray-500">
          {activeTab === 'admins' ? (
            <span className="text-[#d70018] font-bold">🔒 Danh sách Quản trị viên hệ thống có toàn quyền quản trị</span>
          ) : (
            <span className="text-gray-600">🛍️ Danh sách khách hàng mua sắm sản phẩm</span>
          )}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Tài khoản & Khách hàng</th>
                <th className="py-3.5 px-4">Email đăng nhập</th>
                <th className="py-3.5 px-4">Số điện thoại</th>
                <th className="py-3.5 px-4">Hạng thành viên</th>
                <th className="py-3.5 px-4">Quyền hạn</th>
                <th className="py-3.5 px-4 text-right">Thao tác Quản trị</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredUsers.map((u, idx) => {
                const isAdmin = u.role === 'admin';
                const userOrdersCount = getUserOrders(u.email).length;
                const totalSpent = getUserTotalSpent(u.email);

                return (
                  <tr key={u.email || idx} className={`hover:bg-gray-50/80 transition ${u.isLocked ? 'bg-red-50/40 opacity-75' : ''}`}>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm shadow-inner ${
                          isAdmin 
                            ? 'bg-[#d70018] text-white' 
                            : 'bg-slate-900 text-white'
                        }`}>
                          {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <div className="font-extrabold text-gray-900 text-xs flex items-center gap-1.5">
                            <span>{u.name}</span>
                            {isAdmin && (
                              <span className="bg-red-100 text-[#d70018] text-[9px] font-black px-1.5 py-0.2 rounded-md uppercase">
                                ADMIN
                              </span>
                            )}
                            {u.isLocked && (
                              <span className="bg-gray-200 text-gray-700 text-[9px] font-bold px-1.5 py-0.2 rounded-md">
                                Đã khóa
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-2">
                            <span>Đã đặt {userOrdersCount} đơn</span>
                            <span>•</span>
                            <span className="text-[#d70018] font-bold">Chi: {totalSpent.toLocaleString('vi-VN')}đ</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-gray-800">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        <span>{u.email}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-gray-700 font-semibold">
                      <div className="flex items-center space-x-1">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <span>{u.phone || 'Chưa cập nhật'}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-block text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                        u.memberTier === 'S-ELITE' ? 'bg-amber-50 text-amber-900 border-amber-300' :
                        u.memberTier === 'S-VIP' ? 'bg-purple-50 text-purple-900 border-purple-300' :
                        u.memberTier === 'S-CLASS' ? 'bg-blue-50 text-blue-900 border-blue-300' :
                        'bg-gray-100 text-gray-800 border-gray-200'
                      }`}>
                        👑 {u.memberTier || 'S-MEM'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center space-x-1 text-[11px] font-extrabold px-2.5 py-1 rounded-xl ${
                        isAdmin 
                          ? 'bg-red-50 text-[#d70018] border border-red-200' 
                          : 'bg-slate-100 text-slate-800 border border-slate-200'
                      }`}>
                        {isAdmin ? <ShieldCheck className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                        <span>{isAdmin ? 'Quản trị viên' : 'Khách hàng'}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      {/* View Customer Details Button */}
                      <button
                        onClick={() => setSelectedUserDetail(u)}
                        className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition font-semibold"
                        title="Xem lịch sử & chi tiết tài khoản"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Switch Role Button */}
                      {onUpdateUserRole && u.email.toLowerCase() !== 'tandu@gmail.com' && (
                        <button
                          onClick={() => {
                            const newRole = isAdmin ? 'customer' : 'admin';
                            if (window.confirm(`Đổi quyền tài khoản "${u.name}" thành ${newRole === 'admin' ? 'Quản trị viên (Admin)' : 'Khách hàng'}?`)) {
                              onUpdateUserRole(u.email, newRole);
                            }
                          }}
                          className="p-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg transition font-semibold"
                          title={isAdmin ? 'Hạ quyền xuống Khách hàng' : 'Thăng quyền thành Admin'}
                        >
                          <Shield className="w-4 h-4" />
                        </button>
                      )}

                      {/* Lock / Unlock Account Button */}
                      {onToggleUserLock && u.email.toLowerCase() !== 'tandu@gmail.com' && (
                        <button
                          onClick={() => onToggleUserLock(u.email)}
                          className={`p-1.5 rounded-lg transition font-semibold ${
                            u.isLocked 
                              ? 'bg-green-50 text-green-600 hover:bg-green-100' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          title={u.isLocked ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
                        >
                          {u.isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        </button>
                      )}

                      {/* Delete User Button */}
                      {onDeleteUser && u.email.toLowerCase() !== 'tandu@gmail.com' && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Bạn có chắc muốn xóa tài khoản "${u.name}" (${u.email})?`)) {
                              onDeleteUser(u.email);
                            }
                          }}
                          className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition font-semibold"
                          title="Xóa tài khoản"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail & Order History Modal */}
      {selectedUserDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 relative border border-gray-100 shadow-2xl space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-[#d70018] text-white flex items-center justify-center font-extrabold text-lg shadow-inner">
                  {selectedUserDetail.name ? selectedUserDetail.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-1.5">
                    <span>{selectedUserDetail.name}</span>
                    {selectedUserDetail.role === 'admin' && (
                      <span className="bg-red-100 text-[#d70018] text-[9px] font-extrabold px-2 py-0.5 rounded-full">ADMIN</span>
                    )}
                  </h3>
                  <p className="text-xs text-gray-500">{selectedUserDetail.email}</p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedUserDetail(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Info Details Grid */}
            <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs">
              <div>
                <span className="text-gray-500 font-semibold block">Số điện thoại:</span>
                <span className="font-extrabold text-gray-900">{selectedUserDetail.phone || 'Chưa cập nhật'}</span>
              </div>
              <div>
                <span className="text-gray-500 font-semibold block">Ngày sinh:</span>
                <span className="font-extrabold text-gray-900">{selectedUserDetail.dob || 'Chưa cập nhật'}</span>
              </div>
              <div>
                <span className="text-gray-500 font-semibold block">Hạng thành viên:</span>
                <span className="font-extrabold text-[#d70018]">👑 {selectedUserDetail.memberTier || 'S-MEM'}</span>
              </div>
              <div>
                <span className="text-gray-500 font-semibold block">Tổng chi tiêu:</span>
                <span className="font-extrabold text-green-700">
                  {getUserTotalSpent(selectedUserDetail.email).toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>

            {/* Customer Orders History Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <h4 className="font-extrabold text-xs text-gray-900 flex items-center space-x-1.5">
                  <ShoppingBag className="w-4 h-4 text-[#d70018]" />
                  <span>Lịch sử đơn hàng đã mua ({getUserOrders(selectedUserDetail.email).length})</span>
                </h4>
              </div>

              {getUserOrders(selectedUserDetail.email).length === 0 ? (
                <div className="text-center py-6 text-xs text-gray-400 font-semibold">
                  Khách hàng này chưa phát sinh đơn hàng nào.
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {getUserOrders(selectedUserDetail.email).map((o, idx) => (
                    <div key={o.id || idx} className="p-3 border border-gray-200 rounded-xl text-xs space-y-1 bg-white hover:border-red-200 transition">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-gray-900">Mã đơn: {o.id}</span>
                        <span className="text-[#d70018] font-extrabold">{o.total ? o.total.toLocaleString('vi-VN') : '0'}đ</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-gray-500">
                        <span>Thời gian: {o.time || 'Vừa xong'}</span>
                        <span className="text-green-600 font-semibold">{o.status || 'Đã xác nhận'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Modal Thêm Tài Khoản Admin Mới */}
      {isAddAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative border border-gray-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#d70018]" />
                <span>Cấp Tài Khoản Admin Mới</span>
              </h3>
              <button 
                onClick={() => setIsAddAdminModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {addAdminError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl">
                {addAdminError}
              </div>
            )}

            <form onSubmit={handleCreateAdmin} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Tên Quản Trị Viên *</label>
                <input 
                  type="text"
                  required
                  placeholder="Ví dụ: Admin Nguyễn Văn B"
                  value={newAdminName}
                  onChange={(e) => setNewAdminName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d70018] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Email Đăng Nhập Admin *</label>
                <input 
                  type="email"
                  required
                  placeholder="admin.moi@gmail.com"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d70018] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Số điện thoại liên hệ</label>
                <input 
                  type="text"
                  placeholder="0988888888"
                  value={newAdminPhone}
                  onChange={(e) => setNewAdminPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d70018] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Mật khẩu khởi tạo * (Tối thiểu 6 ký tự)</label>
                <input 
                  type="password"
                  required
                  placeholder="••••••••"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d70018] outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddAdminModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#d70018] text-white font-bold rounded-xl hover:bg-[#be0015] shadow transition"
                >
                  Tạo Quản Trị Viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
