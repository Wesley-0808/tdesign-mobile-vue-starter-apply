import type { FormProps } from 'tdesign-mobile-vue';

import type { NormalOption } from '@/types/interface';

export const ActivityField: NormalOption[] = [
  {
    label: 'IT互联网',
    value: 'it',
  },
  {
    label: '艺术设计',
    value: 'art',
  },
  {
    label: '科技',
    value: 'technology',
  },
  {
    label: '电商',
    value: 'e-commerce',
  },
  {
    label: '教育',
    value: 'edu',
  },
  {
    label: '医疗健康',
    value: 'health',
  },
  {
    label: '心理学',
    value: 'psychology',
  },
  {
    label: '摄影',
    value: 'photography',
  },
];

export const ActivityType: NormalOption[] = [
  {
    label: '讲座',
    value: 'lecture',
  },
  {
    label: '展览',
    value: 'exhibition',
  },
  {
    label: '工作坊',
    value: 'workshop',
  },
];

export const Occupation: NormalOption[] = [
  {
    label: '学生',
    value: 'student',
  },
  {
    label: '计算机从业者',
    value: 'computer-practitioners',
  },
  {
    label: '设计师/艺术从业者',
    value: 'art-practitioners',
  },
  {
    label: '医务人员',
    value: 'medical-staff',
  },
  {
    label: '自由职业者',
    value: 'freelancer',
  },
  {
    label: '其他',
    value: 'other',
  },
];

// 编辑信息表单配置
export const formConfig: FormProps = {
  // 表单内容对齐方式：左对齐、右对齐。可选项：left/right
  contentAlign: 'left',
  // 表单字段标签对齐方式：左对齐、右对齐、顶部对齐。可选项：left/right/top
  labelAlign: 'left',
  // 可以整体设置label标签宽度，默认为81px
  labelWidth: '81px',
  // 表单校验不通过时，是否自动滚动到第一个校验不通过的字段，平滑滚动或是瞬间直达。值为空则表示不滚动。可选项：''/smooth/auto
  scrollToFirstError: 'smooth',
  // 表单必填符号（*）显示位置。可选项：left/right
  requiredMarkPosition: 'right',
};
