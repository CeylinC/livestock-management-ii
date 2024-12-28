'use client';

import React, { useEffect } from 'react';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { IProp } from './_type';
const { Option } = Select;
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(weekday);
dayjs.extend(localeData);

export default function DrawerForm({ title, isOpen, setIsOpen, formItems, form, handleSave, handleDelete }: IProp) {
  useEffect(() => {
    const initialFormValues = formItems.reduce((acc: Record<string, unknown>, item) => {
      if ('defaultOption' in item) {
        acc[item.name] = item.defaultOption;
      }
      if ('defaultValue' in item) {
        if (item.type === 'datetime') {
          if (item.defaultValue !== undefined) {
            acc[item.name] = dayjs(item.defaultValue.format('YYYY/MM/DD'), 'YYYY/MM/DD')
          } else acc[item.name] = dayjs();
        } else {
          acc[item.name] = item.defaultValue;
        }
      }
      return acc;
    }, {} as Record<string, unknown>);

    form.setFieldsValue(initialFormValues);
  }, [formItems, form]);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Drawer
        title={title}
        width={540}
        onClose={onClose}
        open={isOpen}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>İptal Et</Button>
            <Button onClick={() => {
              handleSave();
              onClose();
            }} type="primary">
              {handleDelete ? 'Düzenle' : 'Oluştur'}
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form}>
          {formItems.map((item) => {
            if (item.type === 'select') {
              return (
                <Row gutter={16} key={item.name}>
                  <Col span={24}>
                    <Form.Item
                      name={item.name}
                      label={item.label}
                    >
                      <Select>
                        {item.options.map((option) => (
                          <Option value={option.value} key={option.value}>{option.label}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              );
            } else if (item.type === 'datetime') {
              return (
                <Row gutter={16} key={item.name}>
                  <Col span={24}>
                    <Form.Item
                      name={item.name}
                      label={item.label}
                    >
                      <DatePicker
                        placeholder='YYYY/MM/DD'
                        format={'YYYY/MM/DD'}
                        style={{ width: '100%' }}
                        getPopupContainer={(trigger) => trigger.parentElement!}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              );
            } else {
              return (
                <Row gutter={16} key={item.name}>
                  <Col span={24}>
                    <Form.Item
                      name={item.name}
                      label={item.label}
                    >
                      <Input placeholder={item.placeholder} />
                    </Form.Item>
                  </Col>
                </Row>
              );
            }
          })}
          {
            handleDelete && (
              <Button onClick={() => { handleDelete(); onClose(); }}>Sil</Button>
            )
          }
        </Form>
      </Drawer>
    </>
  );
};