import './index.less';

import dayjs from 'dayjs';
import { omit } from 'lodash';
import { defineComponent, reactive, ref } from 'vue';

import { Occupation } from '@/config/consts';
import { prefix } from '@/config/global';
import type { FormItems } from '@/config/userinfo';
import { formConfig, formOptions } from '@/config/userinfo';
import { t } from '@/locales';

export default defineComponent({
  name: 'FormRender',
  emits: ['confirm'],
  setup(props, { emit }) {
    const prefixClass = `${prefix}-form`;

    const initialFormData: Record<string, any> = {};

    const rules: Record<string, any> = {};

    formOptions.forEach((option) => {
      if (option.type === 'picker') {
        initialFormData[option.id] = [];
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
        default:
          return null;
      }
    };

    return () => {
      return (
        <t-form
          class={`${prefixClass}`}
          ref={formRef}
          {...formConfig}
          rules={rules}
          data={formData}
          onSubmit={onSubmit}
        >
          {formOptions.map((option) => (
            <t-form-item
              key={option.id}
              name={option.id}
              {...omit(option, ['componentProps', 'id', 'type', 'suffixIcon', 'rules'])}
            >
              {renderItem(option)}
            </t-form-item>
          ))}
          <div class={`${prefixClass}-button`}>
            <t-button theme="primary" size="large" type="submit" block>
              {t('components.form.submitBtn')}
            </t-button>
          </div>
        </t-form>
      );
    };
  },
});
