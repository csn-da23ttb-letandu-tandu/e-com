// Database Service Layer for TGCN E-Commerce Application
import defaultDbData from '../data/database.json';

const STORAGE_KEYS = {
  PRODUCTS: 'techzone_products',
  USERS: 'techzone_registered_accounts',
  ORDERS: 'techzone_orders',
  COUPONS: 'techzone_vouchers',
  ARTICLES: 'techzone_articles',
  BANNERS: 'techzone_ad_banners'
};

export const dbService = {
  // Get full database snapshot
  getFullDatabase() {
    return {
      system_info: {
        app_name: "Thế Giới Công Nghệ (TGCN)",
        version: "2.5.0",
        db_engine: "TGCN LocalStorage/IndexedDB Core",
        last_updated: new Date().toISOString()
      },
      products: this.getItem(STORAGE_KEYS.PRODUCTS, defaultDbData.products),
      users: this.getItem(STORAGE_KEYS.USERS, defaultDbData.users),
      orders: this.getItem(STORAGE_KEYS.ORDERS, defaultDbData.orders),
      coupons: this.getItem(STORAGE_KEYS.COUPONS, defaultDbData.coupons),
      articles: this.getItem(STORAGE_KEYS.ARTICLES, []),
      ad_banners: this.getItem(STORAGE_KEYS.BANNERS, [])
    };
  },

  getItem(key, fallback = []) {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      console.error(`Error loading database table ${key}:`, e);
      return fallback;
    }
  },

  setItem(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error(`Error saving database table ${key}:`, e);
      return false;
    }
  },

  // Export database JSON file to computer
  exportDatabaseJSON() {
    const fullDb = this.getFullDatabase();
    const jsonStr = JSON.stringify(fullDb, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `TheGioiCongNghe_Database_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Import database JSON file from computer
  async importDatabaseJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsedDb = JSON.parse(e.target.result);
          if (parsedDb.products) this.setItem(STORAGE_KEYS.PRODUCTS, parsedDb.products);
          if (parsedDb.users) this.setItem(STORAGE_KEYS.USERS, parsedDb.users);
          if (parsedDb.orders) this.setItem(STORAGE_KEYS.ORDERS, parsedDb.orders);
          if (parsedDb.coupons) this.setItem(STORAGE_KEYS.COUPONS, parsedDb.coupons);
          if (parsedDb.articles) this.setItem(STORAGE_KEYS.ARTICLES, parsedDb.articles);
          if (parsedDb.ad_banners) this.setItem(STORAGE_KEYS.BANNERS, parsedDb.ad_banners);
          resolve(true);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsText(file);
    });
  },

  // Reset database to initial factory state
  resetToFactoryDefaults() {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.COUPONS);
    localStorage.removeItem(STORAGE_KEYS.ARTICLES);
    localStorage.removeItem(STORAGE_KEYS.BANNERS);
  },

  // Get statistics for Database Console
  getStats() {
    const fullDb = this.getFullDatabase();
    const jsonString = JSON.stringify(fullDb);
    const bytes = new Blob([jsonString]).size;
    const kb = (bytes / 1024).toFixed(2);

    return {
      totalProducts: fullDb.products.length,
      totalUsers: fullDb.users.length,
      totalOrders: fullDb.orders.length,
      totalCoupons: fullDb.coupons.length,
      totalArticles: fullDb.articles.length,
      totalBanners: fullDb.ad_banners.length,
      dbSizeBytes: bytes,
      dbSizeKB: kb,
      lastSync: new Date().toLocaleTimeString('vi-VN')
    };
  }
};
