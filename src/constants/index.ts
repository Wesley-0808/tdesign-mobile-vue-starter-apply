import type { City, CityGroup, ShareActionSheetData } from '@/types/interface';

export enum ContentTypeEnum {
  Json = 'application/json;charset=UTF-8',
  FormURLEncoded = 'application/x-www-form-urlencoded;charset=UTF-8',
  FormData = 'multipart/form-data;charset=UTF-8',
}

// 按字母分组的城市列表
export const cityGroup: CityGroup = {
  热门城市: [
    { value: '北京市', label: '北京' },
    { value: '上海市', label: '上海' },
    { value: '广州市', label: '广州' },
    { value: '深圳市', label: '深圳' },
    { value: '成都市', label: '成都' },
  ],
  A: [
    { value: '澳门', label: '澳门特别行政区' },
    { value: '阿克苏市', label: '阿克苏' },
    { value: '安吉市', label: '安吉' },
    { value: '鞍山市', label: '鞍山' },
  ],
  B: [
    { value: '北京市', label: '北京' },
    { value: '保定市', label: '保定' },
    { value: '包头市', label: '包头' },
  ],
  C: [
    { value: '成都市', label: '成都' },
    { value: '重庆市', label: '重庆' },
    { value: '长沙市', label: '长沙' },
  ],
  D: [
    { value: '大连市', label: '大连' },
    { value: '东莞市', label: '东莞' },
    { value: '大庆市', label: '大庆' },
  ],
  E: [
    { value: '鄂尔多斯市', label: '鄂尔多斯' },
    { value: '恩施市', label: '恩施' },
    { value: '鄂州市', label: '鄂州' },
  ],
  F: [
    { value: '福州市', label: '福州' },
    { value: '佛山市', label: '佛山' },
  ],
  G: [
    { value: '广州市', label: '广州' },
    { value: '贵阳市', label: '贵阳' },
  ],
  H: [
    { value: '杭州市', label: '杭州' },
    { value: '合肥市', label: '合肥' },
  ],
  J: [
    { value: '济南市', label: '济南' },
    { value: '嘉兴市', label: '嘉兴' },
  ],
  K: [{ value: '昆明市', label: '昆明' }],
  L: [{ value: '兰州市', label: '兰州' }],
  M: [{ value: '绵阳市', label: '绵阳' }],
  N: [
    { value: '南京市', label: '南京' },
    { value: '南昌市', label: '南昌' },
  ],
  P: [{ value: '莆田市', label: '莆田' }],
  Q: [{ value: '青岛市', label: '青岛' }],
  R: [{ value: '日照市', label: '日照' }],
  S: [
    { value: '上海市', label: '上海' },
    { value: '深圳市', label: '深圳' },
    { value: '苏州市', label: '苏州' },
  ],
  T: [
    { value: '天津市', label: '天津' },
    { value: '太原市', label: '太原' },
  ],
  W: [
    { value: '武汉市', label: '武汉' },
    { value: '无锡市', label: '无锡' },
  ],
  X: [
    { value: '西安市', label: '西安' },
    { value: '香港', label: '香港特别行政区' },
    { value: '厦门市', label: '厦门' },
  ],
  Y: [
    { value: '烟台市', label: '烟台' },
    { value: '宜昌市', label: '宜昌' },
  ],
  Z: [
    { value: '郑州市', label: '郑州' },
    { value: '珠海市', label: '珠海' },
  ],
};

// 热门城市列表（单独使用）
export const popularCities: City[] = cityGroup['热门城市'];

// 字母索引列表（不包含热门城市）
export const indexList = Object.keys(cityGroup).filter((key) => key !== '热门城市');

export const shareActionSheet: ShareActionSheetData[] = [
  {
    label: '分享给朋友',
    children: [
      { img: '/assets/image/avatar5.png', label: 'Allen' },
      { img: '/assets/image/avatar.png', label: 'Nick' },
      { img: '/assets/image/avatar2.png', label: 'Jacky' },
      { img: '/assets/image/avatar3.png', label: 'Eric' },
      { img: '/assets/image/avatar4.png', label: 'Johnson' },
    ],
  },
  {
    label: '分享到社媒',
    children: [
      { img: '/assets/image/icon-wechat.png', label: 'WeChat' },
      { img: '/assets/image/icon-qq.png', label: 'QQ' },
      { img: '/assets/image/icon-doc.png', label: 'Doc' },
      { img: '/assets/image/icon-map.png', label: 'Map' },
      { img: '/assets/image/icon-qqmusic.png', label: 'QQ Music' },
    ],
  },
];

export default {};
