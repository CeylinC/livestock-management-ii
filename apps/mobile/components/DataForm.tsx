'use client'
import React, { useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import { Button, DatePicker, Form, FormInstance, Input, Picker, Flex as Row, } from '@ant-design/react-native';
import { Text, StyleSheet } from 'react-native';
import { PickerRef } from '@ant-design/react-native/lib/picker/Picker';
import { DatePickerRef } from '@ant-design/react-native/lib/date-picker/date-picker';

dayjs.extend(weekday);
dayjs.extend(localeData);

export default function DrawerForm({ handleSave, handleDelete, handleCancel, formItems, form }: IProp) {

  const pickerRef = React.useRef<PickerRef>(null)
  const dateTimeRef = React.useRef<DatePickerRef>(null)

  useEffect(() => {
    const initialFormValues = formItems.reduce((acc: Record<string, unknown>, item) => {
      if ('defaultOption' in item) {
        acc[item.name] = [item.defaultOption];
      }
      if ('defaultValue' in item) {
        if (item.type === 'datetime') {
          if (item.defaultValue !== undefined) {
            acc[item.name] = dayjs(item.defaultValue).valueOf();
          } else {
            acc[item.name] = dayjs().valueOf();
          }
        } else {
          acc[item.name] = item.defaultValue;
        }
      }
      return acc;
    }, {} as Record<string, unknown>);

    form.setFieldsValue(initialFormValues);
  }, [formItems, form]);

  return (
    <Form layout="vertical" form={form}>
      {formItems.map((item, index) => {
        if (item.type === 'select') {
          return (
            <Form.Item
              name={item.name}
              label={item.label}
              key={index}
              onPress={() => {
                pickerRef.current?.toggle()
              }}
            >
              <Picker
                data={item.options}
                ref={pickerRef}
              >
                {({ extra }) => (<Text>{extra}</Text>)}
              </Picker>
            </Form.Item>
          );
        }
        if (item.type === 'datetime') {
          return (
            <Form.Item
              name={item.name}
              label={item.label}
              key={index}
              onPress={() => {
                dateTimeRef.current?.toggle()
              }}
            >
              <DatePicker
                format={'YYYY/MM/DD'}
                ref={dateTimeRef}
              >
                {({ extra }) => (<Text>{extra}</Text>)}
              </DatePicker>
            </Form.Item>
          );
        } else {
          return (
            <Form.Item
              name={item.name}
              key={index}
              label={item.label}
            >
              <Input />
            </Form.Item>
          );
        }
      })}
      <Button onPress={handleSave} type="primary" style={styles.button}>{
        handleDelete ? 'Güncelle' : 'Ekle'
      }</Button>
      {
        handleDelete && (
          <Button onPress={handleDelete} type='warning' style={styles.button}>Sil</Button>
        )
      }
      <Button onPress={handleCancel} type="ghost" style={styles.button}>İptal Et</Button>
    </Form >

  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 4,
    marginHorizontal: 8,
  },
});

export interface IProp {
  formItems: FormItemsType[];
  form: FormInstance;
  handleSave: () => void;
  handleDelete?: () => void
  handleCancel: () => void;
}

export type FormItemsType =
  | {
    type: 'text';
    name: string;
    label: string;
    placeholder: string;
  }
  | {
    type: 'text';
    name: string;
    label: string;
    defaultValue: string;
    placeholder: string;
  }
  | {
    type: 'datetime';
    name: string;
    label: string;
  }
  | {
    type: 'datetime';
    name: string;
    label: string;
    defaultValue: Dayjs;
  }
  | {
    type: 'select';
    name: string;
    label: string;
    defaultOption: string;
    options: { value: string; label: string }[];
  };