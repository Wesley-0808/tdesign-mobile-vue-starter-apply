import Mock from 'mockjs';
import type { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/get-recommend-list',
    method: 'get',
    response: () => ({
      code: 0,
      data: {
        ...Mock.mock({
          list: [
            {
              id: 1,
              img: '/assets/image/activity/sicc-2019.png',
            },
            {
              id: 2,
              img: '/assets/image/activity/sicc-2021.png',
            },
            {
              id: 3,
              img: '/assets/image/activity/sicc-2019.png',
            },
            {
              id: 4,
              img: '/assets/image/activity/sicc-2021.png',
            },
            {
              id: 5,
              img: '/assets/image/activity/sicc-2019.png',
            },
            {
              id: 6,
              img: '/assets/image/activity/sicc-2021.png',
            },
          ],
        }),
      },
    }),
  },
  {
    url: '/api/get-all-activity',
    method: 'get',
    response: () => ({
      code: 0,
      data: {
        ...Mock.mock({
          list: [
            {
              id: 1,
              img: '/assets/image/activity/cover-1.png',
              name: '2019 SICC服务设计创新大会',
              date: ['2021-3-18', '2021-3-19'],
              price: [],
              evaluate: 5,
            },
            {
              id: 2,
              img: '/assets/image/activity/cover-2.png',
              name: '2021 SICC服务设计创新大会',
              price: [
                {
                  name: '早鸟价-单人票',
                  price: 128,
                  discount: 88,
                },
                {
                  name: '早鸟价-双人票',
                  price: 228,
                  discount: 168,
                },
                {
                  name: '正价-单人票',
                  price: 128,
                  discount: null,
                },
                {
                  name: '正价-双人票',
                  price: 228,
                  discount: null,
                },
              ],
              evaluate: 4.5,
              interested: 236,
              date: ['2021-3-16'],
              place: '深圳市腾讯滨海大厦',
              introduce:
                '在数字化时代背景下，如何抓住机遇，构建“数字”+“文化”更高效、宽领域、深覆盖的新时代文化创新之路，让优秀传统文化得以延续和新生，被更多人认可和接受，也是我们服务设计探索的方向。2021年5月16日，由腾讯用户研究与体验设计部（简称CDC）主办的第三届服务创新大会，将在深圳腾讯滨海大厦召开。近年来数字化正在赋能传统文化的传承和传播，而传统文化也同样在启发新的服务设计理念和思路，两者之间的界限越来越模糊，相互融合。本次大会将围绕文化保育和文化创新，邀请7位传统文物、建筑、服饰、工艺等不同艺术领域的行业专家，为我们分享最新发展趋势和实践经验，开拓来宾在传统文化与数字科技间的碰撞思路，探索新的服务设计课题，让我们先睹为快，了解这些专家们将会分享哪些主题。 ',
              guest: [
                {
                  name: '1',
                  img: '/assets/image/activity/guest-1.png',
                },
                {
                  name: '2',
                  img: '/assets/image/activity/guest-2.png',
                },
              ],
              venue: [
                {
                  name: '1',
                  img: '/assets/image/activity/venue-1.png',
                },
                {
                  name: '2',
                  img: '/assets/image/activity/venue-2.png',
                },
              ],
            },
            {
              id: 3,
              img: '/assets/image/activity/cover-3.png',
              name: '少年与星空 插画巡展',
              price: ['98.00', '118.00'],
              date: ['2021-3-10', '2021-3-20'],
              evaluate: 4.5,
            },
            {
              id: 4,
              img: '/assets/image/activity/cover-4.png',
              name: 'Unverse AI艺术展',
              price: ['66.00', '988.00'],
              date: ['2021-3-12'],
              evaluate: 3,
            },
          ],
        }),
      },
    }),
  },
  {
    url: '/api/get-activity-evaluate',
    method: 'get',
    response: () => ({
      code: 0,
      data: {
        ...Mock.mock({
          'list|1-3': [
            {
              'id|+1': 1,
              'user|1': ['小小轩', '中中轩', '大大轩'],
              content: '我已经是第三次参加SICC大会了，作为一名服务体验设计行业的从业者，每次参与都受益匪浅...',
              avatar: '/assets/image/avatar.png',
            },
          ],
        }),
      },
    }),
  },
] as MockMethod[];
