// Smart Search Utility with Vietnamese accent removal & synonym matching

export const removeVietnameseTones = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .trim();
};

export const smartMatchProduct = (product, query) => {
  if (!query || !query.trim()) return true;

  const normQuery = removeVietnameseTones(query);
  const words = normQuery.split(/\s+/).filter(Boolean);

  const normName = removeVietnameseTones(product.name);
  const normBrand = removeVietnameseTones(product.brand);
  const normCategory = removeVietnameseTones(product.category);
  const normDescription = removeVietnameseTones(product.description || '');
  const normSpecs = removeVietnameseTones(Object.values(product.specs || {}).join(' '));

  // Synonym / Related Alias mapping
  let categorySynonyms = '';

  // Phone synonyms
  if (['dt', 'dien thoai', 'dienthoai', 'phone', 'mobile', 'dien', 'thoai'].some(k => normQuery.includes(k))) {
    categorySynonyms += ' smartphones iphone samsung xiaomi pixel ultra pro max plus fold';
  }

  // Laptop synonyms
  if (['lap', 'laptop', 'may tinh', 'maytinh', 'ram', 'ssd', 'chiu'].some(k => normQuery.includes(k))) {
    categorySynonyms += ' laptops macbook rog zephyrus xps thinkpad asus dell lenovo gaming';
  }

  // Headphones & Audio synonyms
  if (['tai nghe', 'tainghe', 'headphone', 'earphone', 'loa', 'am thanh', 'bluetooth', 'am'].some(k => normQuery.includes(k))) {
    categorySynonyms += ' audio sony airpods marshall stanmore wireless mic';
  }

  // Tablet synonyms
  if (['may tinh bang', 'tablet', 'ipad', 'tab', 'bang'].some(k => normQuery.includes(k))) {
    categorySynonyms += ' tablets ipad tab pro ultra s9 m4';
  }

  // Accessory synonyms
  if (['dong ho', 'watch', 'sac', 'sac nhanh', 'chuot', 'ban phim', 'phu kien', 'day'].some(k => normQuery.includes(k))) {
    categorySynonyms += ' accessories watch series ultra applewatch anker logitech keychron mx gan fast';
  }

  // Feature synonyms
  if (['chong on', 'anc', 'noise'].some(k => normQuery.includes(k))) {
    categorySynonyms += ' sony airpods wh-1000xm5 pro';
  }
  if (['chong nuoc', 'ip68', 'waterproof'].some(k => normQuery.includes(k))) {
    categorySynonyms += ' s24 tab watch ultra';
  }
  if (['titan', 'titanium'].some(k => normQuery.includes(k))) {
    categorySynonyms += ' iphone 16 pro max s24 ultra';
  }

  const fullSearchTarget = `${normName} ${normBrand} ${normCategory} ${normDescription} ${normSpecs} ${categorySynonyms}`;

  // Every query word must match somewhere in the full target string
  return words.every(word => fullSearchTarget.includes(word));
};
