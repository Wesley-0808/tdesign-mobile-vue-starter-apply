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

import { useCityStore } from '@/store/modules/city';

// 引入城市数据
import { cityGroups, indexList } from './cities';

const router = useRouter();
const cityStore = useCityStore();

// 当前定位信息
const currentLocation = ref({
  city: cityStore.getCurrentCity, // 从 store 获取
  latitude: null as number | null,
  longitude: null as number | null,
  isLocating: false,
  lastUpdate: null as Date | null,
});

// 当前选中的城市
const currentCity = ref(cityStore.getCurrentCity);

// 转换为 t-indexes 需要的数据格式
const cityGroupsList = computed(() => {
  return Object.entries(cityGroups).map(([index, cities]) => ({
    index,
    children: cities,
  }));
});

// 选择城市
const selectCity = (city: { name: string; pinyin: string }) => {
  currentCity.value = city.name;
  currentLocation.value.city = city.name;

  // 更新 store 中的城市
  cityStore.setCurrentCity(city.name);

  setTimeout(() => {
    router.go(-1);
  }, 300);
};

// 索引变化事件
const onIndexChange = (index: string | number) => {
  console.log('当前索引:', index);
  // console.log('当前索引:', index);
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

    // 更新 store 中的城市
    cityStore.setCurrentCity(normalizedCityName);

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
  // 初始化城市 store
  cityStore.initCity();

  const cachedLocation = localStorage.getItem('cachedLocation');
  if (cachedLocation) {
    try {
      const parsed = JSON.parse(cachedLocation);
      const cacheAge = Date.now() - new Date(parsed.lastUpdate).getTime();
      if (cacheAge < 30 * 60 * 1000) {
        currentLocation.value = parsed;
        currentCity.value = parsed.city;
        // 同步到 store
        cityStore.setCurrentCity(parsed.city);
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
<style scoped lang="less">
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

:deep(.t-cell__right) {
  padding-right: 7% !important;
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
  font-size: 14px;
  transform: translateY(-50%);
}
</style>
