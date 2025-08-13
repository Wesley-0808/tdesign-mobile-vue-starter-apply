import './index.less';

import dayjs from 'dayjs';
import { isFunction, omit } from 'lodash';
import type { FormProps } from 'tdesign-mobile-vue';
import type { PropType } from 'vue';
import { defineComponent, reactive, ref } from 'vue';

import { formConfig as formDefaultConfig, Occupation } from '@/config/consts';
import { prefix } from '@/config/global';
import { t } from '@/locales';

import type { BtnConfig, FormCheckTagProp, FormItems } from './type';

export default defineComponent({
  // 表单通用组件
  // 为什么要采用这样的方法渲染表单呢？因为考虑到用户信息内容不一定等同设计稿的内容，所以根据配置进行渲染，提高通用性与便携性，开发者不需要额外添加冗余代码，只需修改配置即可。
  name: 'FormRender',
  props: {
    formConfig: {
      type: Object as PropType<FormProps>,
    },
    formOptions: {
      type: Array as PropType<FormItems[]>,
    },
    btnConfig: {
      type: Array as PropType<BtnConfig[]>,
    },
  },
  // 表单提交校验完毕后触发
  emits: ['confirm', 'reset'],
  setup(props, { emit }) {
    const prefixClass = `${prefix}-form`;

    const initialFormData: Record<string, any> = {};

    const rules: Record<string, any> = {};

    // 初始化表单数据
    props.formOptions.forEach((option) => {
      if (option.type === 'picker' || option.type === 'check-tag') {
        initialFormData[option.id] = [];
      } else if (option.type === 'slider') {
        initialFormData[option.id] = option.componentProps?.defaultValue || [];
      } else if (option.type === 'date-picker') {
        initialFormData[option.id] = dayjs().format('YYYY-MM-DD');
      } else if (option.type === 'switch') {
        initialFormData[option.id] = false;
      } else {
        initialFormData[option.id] = '';
      }

      // 规则
      if (option.rules) {
        rules[option.id] = option.rules;
      }
    });

    const formData = reactive(initialFormData);
    const formRef = ref();
    const datePickerVisible = ref<Record<string, boolean>>({});
    const pickerVisible = ref<Record<string, boolean>>({});

    const onSubmit = () => {
      formRef.value?.validate?.().then((result: object | boolean) => {
        emit('confirm', result, formData);
      });
    };

    const onReset = () => {
      emit('reset');
    };

    // date-time-picker 相关方法
    const showDatePicker = (id: string) => {
      datePickerVisible.value[id] = true;
    };

    const onDatePickerChange = (value: any, id: string) => {
      formData[id] = value;
      datePickerVisible.value[id] = false;
    };

    const onDatePickerCancel = (id: string) => {
      datePickerVisible.value[id] = false;
    };

    // picker 相关方法
    const showPicker = (id: string) => {
      pickerVisible.value[id] = true;
    };

    const onPickerChange = (value: any, id: string) => {
      formData[id] = value;
      pickerVisible.value[id] = false;
    };

    const onPickerCancel = (id: string) => {
      pickerVisible.value[id] = false;
    };

    const onSliderChange = (id: string, value: number[]) => {
      formData[id] = value;
    };
    const onCheckTagClick = (id: string, val: string) => {
      const currentValues = formData[id] || [];
      if (currentValues.includes(val)) {
        formData[id] = currentValues.filter((item: string) => item !== val);
      } else {
        formData[id] = [...currentValues, val];
      }
    };

    // 渲染表单内容
    const renderItem = (option: FormItems) => {
      switch (option.type) {
        case 'input':
          return (
            <t-input
              v-model={formData[option.id]}
              placeholder={option.placeholder}
              borderless
              {...option?.componentProps}
              v-slots={{
                suffixIcon: option?.suffixIcon,
              }}
            ></t-input>
          );
        case 'date-picker':
          return (
            <>
              <t-input
                v-model={formData[option.id]}
                borderless
                placeholder={option.placeholder}
                readonly
                onClick={() => showDatePicker(option.id)}
                v-slots={{
                  suffixIcon: option?.suffixIcon,
                }}
              ></t-input>
              <t-popup v-model={datePickerVisible.value[option.id]} placement="bottom">
                <t-date-time-picker
                  value={formData[option.id]}
                  {...option?.componentProps}
                  onChange={(value: any) => onDatePickerChange(value, option.id)}
                  onCancel={() => onDatePickerCancel(option.id)}
                />
              </t-popup>
            </>
          );
        case 'picker':
          return (
            <>
              <t-input
                value={
                  Occupation.find((item) => {
                    return item.value === formData[option.id]?.[0] || '';
                  })?.label
                }
                borderless
                placeholder={option.placeholder}
                readonly
                onClick={() => showPicker(option.id)}
                v-slots={{
                  suffixIcon: option?.suffixIcon,
                }}
              ></t-input>
              <t-popup v-model={pickerVisible.value[option.id]} placement="bottom">
                <t-picker
                  v-model={formData[option.id]}
                  {...option?.componentProps}
                  onChange={(value: any) => onPickerChange(value, option.id)}
                  onCancel={() => onPickerCancel(option.id)}
                ></t-picker>
              </t-popup>
            </>
          );
        case 'switch':
          return <t-switch v-model={formData[option.id]} {...option?.componentProps}></t-switch>;
        case 'slider':
          return (
            <t-slider
              v-model={formData[option.id]}
              range
              show-extreme-value
              label={(val: number) => val}
              {...option?.componentProps}
              onChange={(value: number[]) => onSliderChange(option.id, value)}
            ></t-slider>
          );
        case 'check-tag': {
          const { options } = option.componentProps as FormCheckTagProp;
          return (
            <div class={`${prefixClass}__check-tag-group`}>
              {options.map((tag) => {
                // 为什么需要加一个class？因为组件prop校验没有extra-large
                return (
                  <t-check-tag
                    class="t-tag--extra-large"
                    checked={formData[option.id]?.includes(tag.value)}
                    variant="light"
                    theme="primary"
                    shape="round"
                    onClick={() => onCheckTagClick(option.id, tag.value)}
                    {...omit(option?.componentProps, ['options'])}
                  >
                    {tag.label}
                  </t-check-tag>
                );
              })}
            </div>
          );
        }
        case 'custom':
          return isFunction(option.component) ? option.component?.() : option.component;
        default:
          return null;
      }
    };

    return () => {
      return (
        <t-form
          class={`${prefixClass}`}
          ref={formRef}
          {...{
            ...formDefaultConfig,
            ...props.formConfig,
          }}
          rules={rules}
          data={formData}
          onSubmit={onSubmit}
          onReset={onReset}
        >
          {props.formOptions.map((option) => (
            <t-form-item
              key={option.id}
              name={option.id}
              {...omit(option, ['componentProps', 'id', 'type', 'suffixIcon', 'component'])}
            >
              {renderItem(option)}
            </t-form-item>
          ))}
          <div class={`${prefixClass}-button`}>
            {props.btnConfig?.map((item) => {
              return <t-button {...item}>{item?.t ? t(item?.t) : ''}</t-button>;
            })}
          </div>
        </t-form>
      );
    };
  },
});
