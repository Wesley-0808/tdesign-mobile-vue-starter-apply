import dayjs from 'dayjs';

import type { ActivityModel } from '@/api/model/listModel';

// 查找某个项目的最前（最早）的日期
export const getLastDate = (item: ActivityModel) => {
  const { date } = item;
  if (!date) return 0;
  // 比较每一个日期
  return date.reduce((pre, cur) => {
    return dayjs(pre).isBefore(dayjs(cur)) ? pre : cur;
  });
};
