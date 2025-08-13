import './index.less';

import dayjs from 'dayjs';
import { isFunction } from 'lodash';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import type { ActivityModel } from '@/api/model/listModel';
import { getLastDate } from '@/utils/activity/getDate';
import { getMaxPrice, getMinPrice } from '@/utils/activity/getPrice';

export default defineComponent({
  name: 'ActivityList',
  props: {
    data: {
      type: Array as PropType<ActivityModel[]>,
    },
    // Function(custom filter method)
    filterBy: {
      type: [Function] as PropType<any>,
    },
    // latest | max-evaluate
    sortBy: {
      type: [String] as PropType<any>,
    },
  },
  setup(props) {
    const renderList = () => {
      const sortedData = props.data.sort((a, b) => {
        if (props.sortBy === 'latest') {
          return dayjs(getLastDate(a)).isBefore(getLastDate(b)) ? -1 : 1;
        }
        if (props.sortBy === 'max-evaluate') {
          return b.evaluate - a.evaluate;
        }
        return 0;
      });

      const filteredData = sortedData.filter((i) => {
        if (isFunction(props.filterBy)) {
          return props.filterBy(i);
        }
        return true;
      });

      const getPrice = (item: ActivityModel) => {
        if (item.price === 'free') {
          return '免费活动';
        }
        return `¥${getMinPrice(item)}-¥${getMaxPrice(item)}`;
      };

      const list = filteredData.map((item) => {
        return (
          <div class="activity-list-item">
            <div class="activity-list-item__image">
              <img src={item.img} alt={item.name} />
            </div>
            <div class="activity-list-item__content">
              <div class="activity-list-item__content-title">{item.name}</div>
              <div class="activity-list-item__content-evaluate">
                <t-rate value={item.evaluate} max="5" size="16" placement="" allow-half />
                <span class="evaluate-text">{item.evaluate}分</span>
              </div>
              <div class="activity-list-item__content-price">{getPrice(item)}</div>
            </div>
          </div>
        );
      });

      return list;
    };
    return () => {
      return <>{renderList()}</>;
    };
  },
});
