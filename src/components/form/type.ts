import type {
  ButtonProps,
  CheckTagProps,
  DateTimePickerProps,
  FormItemProps,
  FormProps,
  InputProps,
  PickerProps,
  SliderProps,
  SwitchProps,
} from 'tdesign-mobile-vue';

import type { NormalOption } from '@/types/interface';

export interface FormOptionCommon extends FormItemProps {
  class?: string;
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
  // 透传给 picker 组件的参数
  componentProps?: PickerProps;
}

interface FormCheckTagOption extends FormOptionCommon {
  // 表单类型
  type: 'check-tag';
  // 透传给 check-tag 组件的参数
  componentProps?: FormCheckTagProp;
}

interface FormSliderOption extends FormOptionCommon {
  // 表单类型
  type: 'slider';
  // 透传给 slider 组件的参数
  componentProps?: SliderProps;
}

interface FormCustomOption extends FormOptionCommon {
  // 表单类型
  type: 'custom';
  // 自定义组件
  component?: any;
}

export interface FormCheckTagProp extends CheckTagProps {
  options: NormalOption[];
}

export type FormItems =
  | FormSwitchOption
  | FormInputOption
  | FormDatePickerOption
  | FormPickerOption
  | FormCheckTagOption
  | FormSliderOption
  | FormCustomOption;

export interface BtnConfig extends ButtonProps {
  // 多语言配置
  t?: string;
}
