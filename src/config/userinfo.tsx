import { CalendarIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';
import type {
  DateTimePickerProps,
  FormItemProps,
  FormProps,
  InputProps,
  PickerProps,
  SwitchProps,
} from 'tdesign-mobile-vue';

import { Occupation } from './consts';

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

export interface FormOptionCommon extends FormItemProps {
  // 标识
  id?: string;
  // 占位符
  placeholder?: string;
  // 右侧图标
  suffixIcon?: InputProps['suffixIcon'];
  // 表单内容对齐方式：左对齐、右对齐。可选项：left/right
  contentAlign?: FormProps['contentAlign'];
}

interface FormSwitchOption extends FormOptionCommon {
  // 表单类型
  type: 'switch';
  // 透传给 input 组件的参数
  componentProps?: SwitchProps;
}

interface FormInputOption extends FormOptionCommon {
  // 表单类型
  type: 'input';
  // 透传给 input 组件的参数
  componentProps?: InputProps;
}

interface FormDatePickerOption extends FormOptionCommon {
  // 表单类型
  type: 'date-picker';
  // 透传给 date-time-picker 组件的参数
  componentProps?: DateTimePickerProps;
}

interface FormPickerOption extends FormOptionCommon {
  // 表单类型
  type: 'picker';
  // 透传给 date-time-picker 组件的参数
  componentProps?: PickerProps;
}

export type FormItems = FormSwitchOption | FormInputOption | FormDatePickerOption | FormPickerOption;

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
