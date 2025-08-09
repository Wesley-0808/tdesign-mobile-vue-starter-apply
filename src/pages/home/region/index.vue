<template>
  <div class="region-container">
    <!-- 顶部当前定位信息 -->
    <div class="current-location">
      <div class="location-info">
        <t-icon name="location" size="20" color="#666" />
        <span class="city-name">{{ currentLocation.city || '定位中...' }}</span>
        <t-icon v-if="currentLocation.isLocating" name="loading" size="16" class="loading-icon" />
      </div>
      <t-button
        size="small"
        variant="outline"
        class="update-location-btn"
        :disabled="currentLocation.isLocating"
        @click="updateLocation"
      >
        {{ currentLocation.isLocating ? '定位中...' : '更新定位' }}
      </t-button>
    </div>

    <!-- 城市列表容器 -->
    <div class="city-list-container">
      <!-- 热门城市独立显示，正常滚动 -->
      <div class="section">
        <div class="section-title">热门城市</div>
        <div class="city-list-section">
          <div
            v-for="city in popularCities"
            :key="city.name"
            class="city-item"
            :class="{ active: city.name === currentCity }"
            @click="selectCity(city)"
          >
            <span class="city-text">{{ city.name }}</span>
            <t-icon v-if="city.name === currentCity" name="check" size="24" color="#0052d9" class="check-icon" />
          </div>
        </div>
      </div>

      <!-- 使用 t-indexes 组件，只包含字母分组的城市 -->
      <t-indexes :index-list="indexList" :sticky="false" @change="onIndexChange">
        <template v-for="group in cityGroupsList" :key="group.index">
          <t-indexes-anchor :index="group.index" />
          <t-cell-group>
            <t-cell
              v-for="city in group.children"
              :key="city.name"
              :title="city.name"
              :class="{ active: city.name === currentCity }"
              @click="selectCity(city)"
            >
              <template #right-icon>
                <t-icon v-if="city.name === currentCity" name="check" size="24" color="#0052d9" />
              </template>
            </t-cell>
          </t-cell-group>
        </template>
      </t-indexes>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Toast } from 'tdesign-mobile-vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 当前定位信息
const currentLocation = ref({
  city: '深圳',
  latitude: null as number | null,
  longitude: null as number | null,
  isLocating: false,
  lastUpdate: null as Date | null,
});

// 当前选中的城市
const currentCity = ref('深圳');

// 热门城市列表
const popularCities = ref([
  { name: '北京', pinyin: 'beijing' },
  { name: '上海', pinyin: 'shanghai' },
  { name: '广州', pinyin: 'guangzhou' },
  { name: '深圳', pinyin: 'shenzhen' },
  { name: '成都', pinyin: 'chengdu' },
]);

// 按字母分组的城市列表
const cityGroups = ref({
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
});

// 转换为 t-indexes 需要的数据格式
const cityGroupsList = computed(() => {
  return Object.entries(cityGroups.value).map(([index, cities]) => ({
    index,
    children: cities,
  }));
});

// 字母列表（不包含热门城市）
const indexList = computed(() => Object.keys(cityGroups.value));

// 选择城市
const selectCity = (city: { name: string; pinyin: string }) => {
  currentCity.value = city.name;
  currentLocation.value.city = city.name;
  setTimeout(() => {
    router.go(-1);
  }, 300);
};

// 索引变化事件
const onIndexChange = (index: string) => {
  console.log('当前索引:', index);
};

// 更新定位
const updateLocation = async () => {
  if (currentLocation.value.isLocating) return;

  currentLocation.value.isLocating = true;

  try {
    if (!navigator.geolocation) {
      throw new Error('您的浏览器不支持地理定位功能');
    }

    const position = await getCurrentPosition();
    const cityInfo = await getCityFromCoordinates(position.coords.latitude, position.coords.longitude);

    const cityName = cityInfo.city || cityInfo.province || '未知城市';
    const normalizedCityName = cityName.replace(/市$/, '');

    currentLocation.value = {
      city: normalizedCityName,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      isLocating: false,
      lastUpdate: new Date(),
    };

    currentCity.value = normalizedCityName;

    Toast.success(`定位成功：${normalizedCityName}`);
  } catch (error) {
    console.error('定位失败:', error);
    let errorMessage = '定位失败，请重试';

    if (error instanceof GeolocationPositionError) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = '定位权限被拒绝，请在设置中开启定位权限';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = '位置信息不可用，请检查网络连接';
          break;
        case error.TIMEOUT:
          errorMessage = '定位超时，请重试';
          break;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    Toast.error(errorMessage);
    currentLocation.value.isLocating = false;
  }
};

const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 5 * 60 * 1000,
    };
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

const getCityFromCoordinates = async (_latitude: number, _longitude: number) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mockCityData = {
      city: '深圳',
      province: '广东省',
      district: '南山区',
      address: '广东省深圳市南山区',
    };
    return mockCityData;
  } catch (error) {
    console.error('获取城市信息失败:', error);
    throw new Error('无法获取城市信息');
  }
};

onMounted(async () => {
  const cachedLocation = localStorage.getItem('cachedLocation');
  if (cachedLocation) {
    try {
      const parsed = JSON.parse(cachedLocation);
      const cacheAge = Date.now() - new Date(parsed.lastUpdate).getTime();
      if (cacheAge < 30 * 60 * 1000) {
        currentLocation.value = parsed;
        currentCity.value = parsed.city;
        return;
      }
    } catch (e) {
      console.error('解析缓存定位信息失败:', e);
    }
  }

  try {
    await updateLocation();
  } catch (error) {
    console.error('自动定位失败:', error);
    console.log('自动定位失败，使用默认城市');
  }
});

watch(
  currentLocation,
  (newLocation) => {
    if (newLocation.city && newLocation.lastUpdate) {
      localStorage.setItem('cachedLocation', JSON.stringify(newLocation));
    }
  },
  { deep: true },
);
</script>
<style scoped lang="scss">
.t-button--outline {
  border-radius: 100px !important;
  background: #e7e7e7;

  &::after {
    border-radius: 100px !important;
  }
}

.region-container {
  background: #f5f5f5;
  min-height: 100vh;
  position: relative;
}

.current-location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}

.location-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.city-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.city-list-container {
  height: calc(100vh - 120px);
  overflow-y: auto;
}

.city-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f8f8;
  }

  &.active {
    background: #e6f3ff;

    .city-text {
      font-weight: 600;
      color: #0052d9;
    }
  }
}

.city-text {
  font-size: 16px;
  color: #333;
  transition: all 0.2s ease;
  flex: 1;
}

.check-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0052d9;
  font-size: 20px;
  flex-shrink: 0;
  margin-left: 8px;
}

.loading-icon {
  animation: spin 1s linear infinite;
  margin-left: 8px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.update-location-btn {
  border-radius: 100px !important;
  background: #e7e7e7;
  color: #201f1f;
  font-size: 14px;
  padding: 8px 16px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover:not(:disabled) {
    background: #d8d8d8;
    border-color: #c0c0c0;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 1px 4px rgb(0 0 0 / 10%);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &::after {
    border-radius: 100px !important;
  }
}

.section {
  background: #fff;
  margin-bottom: 8px;
}

.section-title {
  padding: 12px 16px 8px;
  background: #f8f8f8;
  color: #666;
  font-size: 14px;
  font-weight: 500;
}

.city-list-section {
  background: #fff;

  .city-item {
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }
  }
}

// 自定义 t-cell 样式
:deep(.t-cell) {
  &.active {
    background: #e6f3ff;

    .t-cell__title {
      font-weight: 600;
      color: #0052d9;
    }
  }
}

:deep(.t-indexes-anchor) {
  background: #f8f8f8;
  color: #666;
  font-size: 14px;
  font-weight: 500;
}

:deep(.t-indexes__sidebar) {
  top: 55%;
  transform: translateY(-50%);
}
</style>
