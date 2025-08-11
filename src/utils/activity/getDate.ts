import dayjs from 'dayjs';
import { isArray } from 'lodash';

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

export const getDateRangeString = (date: Date[]) => {
  // 单个时间转换
  function convertSingleTime(timeStr: Date): string {
    const date = dayjs(timeStr, 'YYYY-MM-DD');
    const YY = date.format('YYYY');
    const MM = date.format('M');
    const DD = date.format('DD');

    return `${YY}年${MM}月${DD}日`;
  }

  if (isArray(date)) {
    const startDate = dayjs(date?.[0], 'YYYY-MM-DD');
    const endDate = dayjs(date?.[1], 'YYYY-MM-DD');

    const daysDiff = endDate.diff(startDate, 'day');

    const firstFormatted = convertSingleTime(date[0]);
    let secondFormatted: string;

    if (daysDiff < 365 && startDate.isSame(endDate, 'year')) {
      // 相差一年以下
      secondFormatted = endDate.format('M月DD日');
    } else {
      // 相差一年以上
      secondFormatted = convertSingleTime(date?.[1]);
    }
    return `${firstFormatted} - ${secondFormatted}`;
  } else {
    console.error('Invalid input type');
  }

  return '';
};
