import {
  Form,
  Provider,
} from '@ant-design/react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import DataForm, { FormItemsType } from '../../components/DataForm';
import { router, Stack } from 'expo-router';
import { useStockStore } from '@packages/shared/stores';
import { Stock } from '@packages/shared/classes';
import { saleCategory } from '@packages/shared/enums';

export default function AddStockScreen() {
  const { selectStock, selectedStock, updateStock, setStock, deleteStock } = useStockStore();
  const [form] = Form.useForm()

  const formItems: FormItemsType[] = [
    {
      type: 'text',
      name: 'name',
      label: 'Stoğun İsmi',
      placeholder: 'İnek Ağılı',
      defaultValue: selectedStock?.name
    },
    {
      type: 'select',
      name: 'category',
      label: 'Stoğun Kategorisi',
      defaultOption: saleCategory.animalProduct,
      options: [
        { label: 'Hayvansal Ürün', value: saleCategory.animalProduct },
        { label: 'Canlı Hayvan', value: saleCategory.animal },
        { label: 'Gübre', value: saleCategory.fertilizer },
        { label: 'Tarım', value: saleCategory.agriculture },
        { label: 'Yem', value: saleCategory.feed },
        { label: 'İlaç', value: saleCategory.medicine },
        { label: 'Ekipman', value: saleCategory.equipment },
      ],
    },
    {
      type: 'text',
      name: 'amount',
      label: 'Stoğun Miktarı',
      placeholder: '3',
      defaultValue: selectedStock?.amount
    },
    {
      type: 'text',
      name: 'dealer',
      label: 'Tedarikçi',
      placeholder: 'Ahmet Çaltepe',
      defaultValue: selectedStock?.dealer
    },
    {
      type: 'text',
      name: 'storage',
      label: 'Stoğun Depolanma Yeri',
      placeholder: 'Dolap',
      defaultValue: selectedStock?.storage
    }
  ];

  const onSubmit = () => {
    if (selectedStock) {
      updateStock(new Stock({ ...form.getFieldsValue(), id: selectedStock.id, saleCategory: form.getFieldValue('saleCategory')[0] }))
    } else {
      setStock(new Stock({ ...form.getFieldsValue(), saleCategory: form.getFieldValue('saleCategory')[0] }))
    }
    onNavigate();
  }

  const onDelete = () => {
    if (!selectedStock) {
      return;
    }
    deleteStock(selectedStock.id)
    onNavigate();
  }

  const onCancel = () => {
    onNavigate();
  }

  const onNavigate = () => {
    selectStock(null)
    router.replace('/(tabs)/stocks')
  }


  return (
    <Provider>
      <Stack.Screen options={{ title: selectedStock ? "Mevcut Stok Kaydını Güncelle" : "Yeni Stok Kaydı Oluştur" }} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <DataForm
          formItems={formItems}
          form={form}
          handleSave={onSubmit}
          handleCancel={onCancel}
          handleDelete={selectedStock ? onDelete : undefined}
        />
      </ScrollView>
    </Provider>
  );
}