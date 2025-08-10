// 城市数据结构定义
export interface City {
  name: string;
  pinyin: string;
}

export interface CityGroup {
  [key: string]: City[];
}

// 按字母分组的城市列表
export const cityGroups: CityGroup = {
  热门城市: [
    { name: '北京', pinyin: 'beijing' },
    { name: '上海', pinyin: 'shanghai' },
    { name: '广州', pinyin: 'guangzhou' },
    { name: '深圳', pinyin: 'shenzhen' },
    { name: '成都', pinyin: 'chengdu' },
  ],
  A: [
    { name: '澳门', pinyin: 'aomen' },
    { name: '阿克苏', pinyin: 'akesu' },
    { name: '安吉', pinyin: 'anji' },
    { name: '鞍山', pinyin: 'anshan' },
  ],
  B: [
    { name: '北京', pinyin: 'beijing' },
    { name: '保定', pinyin: 'baoding' },
    { name: '包头', pinyin: 'baotou' },
  ],
  C: [
    { name: '成都', pinyin: 'chengdu' },
    { name: '重庆', pinyin: 'chongqing' },
    { name: '长沙', pinyin: 'changsha' },
  ],
  D: [
    { name: '大连', pinyin: 'dalian' },
    { name: '东莞', pinyin: 'dongguan' },
    { name: '大庆', pinyin: 'daqing' },
  ],
  E: [
    { name: '鄂尔多斯', pinyin: 'eerduosi' },
    { name: '恩施', pinyin: 'enshi' },
  ],
  F: [
    { name: '福州', pinyin: 'fuzhou' },
    { name: '佛山', pinyin: 'foshan' },
  ],
  G: [
    { name: '广州', pinyin: 'guangzhou' },
    { name: '贵阳', pinyin: 'guiyang' },
  ],
  H: [
    { name: '杭州', pinyin: 'hangzhou' },
    { name: '合肥', pinyin: 'hefei' },
  ],
  I: [{ name: '宜昌', pinyin: 'yichang' }],
  J: [
    { name: '济南', pinyin: 'jinan' },
    { name: '嘉兴', pinyin: 'jiaxing' },
  ],
  K: [{ name: '昆明', pinyin: 'kunming' }],
  L: [{ name: '兰州', pinyin: 'lanzhou' }],
  M: [{ name: '绵阳', pinyin: 'mianyang' }],
  N: [
    { name: '南京', pinyin: 'nanjing' },
    { name: '南昌', pinyin: 'nanchang' },
  ],
  O: [{ name: '鄂州', pinyin: 'ezhou' }],
  P: [{ name: '莆田', pinyin: 'putian' }],
  Q: [{ name: '青岛', pinyin: 'qingdao' }],
  R: [{ name: '日照', pinyin: 'rizhao' }],
  S: [
    { name: '上海', pinyin: 'shanghai' },
    { name: '深圳', pinyin: 'shenzhen' },
    { name: '苏州', pinyin: 'suzhou' },
  ],
  T: [
    { name: '天津', pinyin: 'tianjin' },
    { name: '太原', pinyin: 'taiyuan' },
  ],
  W: [
    { name: '武汉', pinyin: 'wuhan' },
    { name: '无锡', pinyin: 'wuxi' },
  ],
  X: [
    { name: '西安', pinyin: 'xian' },
    { name: '厦门', pinyin: 'xiamen' },
  ],
  Y: [{ name: '烟台', pinyin: 'yantai' }],
  Z: [
    { name: '郑州', pinyin: 'zhengzhou' },
    { name: '珠海', pinyin: 'zhuhai' },
  ],
};

// 导出热门城市列表（单独使用）
export const popularCities: City[] = cityGroups['热门城市'];

// 导出字母索引列表（不包含热门城市）
export const indexList = Object.keys(cityGroups).filter((key) => key !== '热门城市');
