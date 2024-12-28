import { saleCategory } from '@packages/shared/enums/saleCategory';
import DrawerForm from "@/components/DrawerForm";
import { FormItemsType } from "@/components/DrawerForm/_type";
import { Form } from "antd";
import { IProp } from './_type';
import { useStockStore } from '@packages/shared/stores';
import { Stock } from '@packages/shared/classes';
import { useMemo } from 'react';

export default function AddStock({ isOpen, setIsOpen, data }: IProp) {
  const formItems = useMemo<FormItemsType[]>(() => {
    return [
      {
        type: 'text',
        name: 'name',
        label: 'Stoğun İsmi',
        placeholder: 'İnek Ağılı',
        defaultValue: data?.name
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
        defaultValue: data?.amount
      },
      {
        type: 'text',
        name: 'dealer',
        label: 'Tedarikçi',
        placeholder: 'Ahmet Çaltepe',
        defaultValue: data?.dealer
      },
      {
        type: 'text',
        name: 'storage',
        label: 'Stoğun Depolanma Yeri',
        placeholder: 'Dolap',
        defaultValue: data?.storage
      }
    ]
  }, [data]);

  const [form] = Form.useForm();
  const { setStock, updateStock, deleteStock } = useStockStore();

  const handleSave = () => {
    if (data) {
      updateStock(new Stock({ ...form.getFieldsValue(), id: data.id }))
    } else {
      setStock(new Stock(form.getFieldsValue()))
    }
  };

  const handleDelete = data ? () => (deleteStock(data.id)) : undefined

  return (
    <>
      <DrawerForm
        title={data ? "Mevcut Stok Kaydını Güncelle" : "Yeni Stok Kaydı Girişi"}
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