import DrawerForm from '@/components/DrawerForm';
import { FormItemsType } from '@/components/DrawerForm/_type';
import { Form } from 'antd';
import { gender } from '@packages/shared/enums';
import { useBarnStore } from '@packages/shared/stores';
import { Barn } from '@packages/shared/classes';
import { IProp } from './_type';
export default function AddBarns({ isOpen, setIsOpen, data }: IProp) {
  const formItems: FormItemsType[] = [
    {
      type: 'text',
      name: 'name',
      label: 'Ağılın İsmi',
      placeholder: 'İnek Ağılı',
      defaultValue: data?.name
    },
    {
      type: 'text',
      name: 'type',
      label: 'Ağılın Türü',
      placeholder: 'Büyükbaş',
      defaultValue: data?.type
    },
    {
      type: 'select',
      name: 'gender',
      label: 'Ağıldaki Hayvanların Cinsiyeti',
      defaultOption: data?.gender ?? gender.karma,
      options: [
        { label: 'Karışık', value: gender.karma },
        { label: 'Dişi', value: gender.female },
        { label: 'Erkek', value: gender.male },
      ],
    },
  ];

  const [form] = Form.useForm();
  const { setBarn, updateBarn, deleteBarn } = useBarnStore();

  const handleSave = () => {
    if (data) {
      updateBarn(new Barn({ ...form.getFieldsValue(), id: data.id }))
    } else {
      setBarn(new Barn(form.getFieldsValue()))
    }
  };

  const handleDelete = data ? () => (deleteBarn(data.id)) : undefined

  return (
    <>
      <DrawerForm
        title={data ? "Mevcut Ağıl Kaydını Güncelle" : "Yeni Ağıl Kaydı Girişi"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        formItems={formItems}
        form={form}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />    </>
  );
};