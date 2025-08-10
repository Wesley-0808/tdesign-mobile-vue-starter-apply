import { isFinite } from 'lodash';

import type { ActivityModel } from '@/api/model/listModel';

export const getMinPrice = (item: ActivityModel) => {
  const min = Math.min(
    ...item.price
      .map((act) => {
        return act.discount ?? act.price;
      })
      .filter(Boolean),
  );
  // 如果数据不对，则返回无穷
  return isFinite(min) ? min.toFixed(2) : '∞';
};

export const getMaxPrice = (item: ActivityModel) => {
  const max = Math.max(
    ...item.price
      .map((act) => {
        return act.discount ?? act.price;
      })
      .filter(Boolean),
  );
  // 如果数据不对，则返回无穷
  return isFinite(max) ? max.toFixed(2) : '∞';
};
