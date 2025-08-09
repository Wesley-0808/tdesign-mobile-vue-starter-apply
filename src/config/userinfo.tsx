import { CalendarIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';

import type { FormItems } from '@/components/form/type';

import { Occupation } from './consts';

// 表单内容配置
export const formOptions: FormItems[] = [
  {
    id: 'setDefault',
    label: '设为默认',
    type: 'switch',
    contentAlign: 'right',
  },
  {
    id: 'name',
    label: '姓名',
    type: 'input',
    placeholder: '请输入内容',
    rules: [{ required: true, message: '姓名必填' }],
  },
  {
    id: 'birthday',
    label: '生日',
    type: 'date-picker',
    placeholder: '请选择日期',
    rules: [{ required: true, message: '生日必填' }],
    suffixIcon: () => <CalendarIcon size="22" />,
    componentProps: {
      title: '选择生日',
      mode: ['date'],
      format: 'YYYY-MM-DD',
    },
  },
  {
    id: 'phone',
    label: '手机号',
    type: 'input',
    placeholder: '请输入内容',
    rules: [{ required: true, message: '手机号必填' }],
    componentProps: {
      type: 'tel',
      maxlength: 11,
    },
  },
  {
    id: 'idCard',
    label: '身份证',
    type: 'input',
    placeholder: '请输入您的身份证号码',
    rules: [{ required: true, message: '身份证号码必填' }],
    componentProps: {
      type: 'text',
      maxlength: 18,
    },
  },
  {
    id: 'email',
    label: '邮箱',
    type: 'input',
    placeholder: '请输入您的邮箱',
    componentProps: {
      type: 'text',
    },
  },
  {
    id: 'occupation',
    label: '职业',
    type: 'picker',
    placeholder: '请选择职业',
    suffixIcon: () => <ChevronRightIcon size="22" />,
    componentProps: {
      columns: Occupation,
    },
  },
];
