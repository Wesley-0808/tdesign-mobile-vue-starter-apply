import { defineStore } from 'pinia';

export const useCityStore = defineStore('city', {
  state: () => ({
    currentCity: '深圳', // 默认城市
  }),

  actions: {
    // 设置当前城市
    setCurrentCity(city: string) {
      this.currentCity = city;
      // 可选：保存到 localStorage
      localStorage.setItem('currentCity', city);
    },

    // 初始化城市（从 localStorage 恢复）
    initCity() {
      const savedCity = localStorage.getItem('currentCity');
      if (savedCity) {
        this.currentCity = savedCity;
      }
    },
  },

  getters: {
    // 获取当前城市
    getCurrentCity: (state) => state.currentCity,
  },
});
