import React from 'react';
import DrawerForm from '@/components/DrawerForm';
import { FormItemsType } from '@/components/DrawerForm/_type';
import { gender } from '@packages/shared/enums';
import { Form } from 'antd';
import { IProp } from './_type';
import { useAnimalStore } from '@packages/shared/stores';
import { Animal } from '@packages/shared/classes';

export default function AddAnimal({ isOpen, setIsOpen, data }: IProp) {
  const formItems: FormItemsType[] = [
    {
      type: 'text',
      name: 'name',
      label: 'Hayvanın İsmi',
      placeholder: 'Karabaş',
      defaultValue: data?.name
    },
    {
      type: 'text',
      name: 'earring',
      label: 'Hayvanın Kulak Küpesi',
      placeholder: '454545',
      defaultValue: data?.earring
    },
    {
      type: 'text',
      name: 'type',
      label: 'Hayvanın Türü',
      placeholder: 'Büyükbaş',
      defaultValue: data?.type
    },
    {
      type: 'text',
      name: 'genus',
      label: 'Hayvanın Cinsi',
      placeholder: 'Büyükbaş',
      defaultValue: data?.genus
    },
    {
      type: 'select',
      name: 'gender',
      label: 'Hayvanın Cinsiyeti',
      defaultOption: data?.gender || gender.female,
      options: [
        { label: 'Dişi', value: gender.female },
        { label: 'Erkek', value: gender.male },
      ],
    },
    {
      type: 'datetime',
      name: 'birthday',
      label: 'Hayvanın Doğum Tarihi',
      defaultValue: data?.birthday
    },
    {
      type: 'text',
      name: 'barnName',
      label: 'Hayvanın Bulunduğu Ağıl',
      placeholder: 'İnek Ağılı',
      defaultValue: data?.barnName
    },
  ];

  const [form] = Form.useForm();
  const {setAnimal, updateAnimal, deleteAnimal} = useAnimalStore();

  const handleSave = () => {
    if (data) {
      updateAnimal(new Animal({ ...form.getFieldsValue(), id: data.id }))
    } else {
      setAnimal(new Animal(form.getFieldsValue()))
    }
  };

  const handleDelete = data ? () => (deleteAnimal(data.id)) : undefined

  return (
    <>
      <DrawerForm
        title={data ? "Mevcut Hayvan Kaydını Güncelle" : "Yeni Hayvan Kaydı Girişi"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        formItems={formItems}
        form={form}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
    </>
  );
};