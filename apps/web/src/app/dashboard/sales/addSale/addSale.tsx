import { saleCategory, paymentState } from "@packages/shared/enums";
import DrawerForm from "@/components/DrawerForm";
import { FormItemsType } from "@/components/DrawerForm/_type";
import { Form } from "antd";
import { IProp } from "./_type";
import { useMemo } from "react";
import { useSaleStore, useUserStore } from "@packages/shared/stores";
import { Sale } from "@packages/shared/classes";

export default function AddSale({ isOpen, setIsOpen, data }: IProp) {
  const formItems = useMemo<FormItemsType[]>(() => {
    return [
      {
        type: "text",
        name: "name",
        label: "Ürünün İsmi",
        placeholder: "İnek Ağılı",
        defaultValue: data?.name,
      },
      {
        type: "text",
        name: "type",
        label: "Ürünün Türü",
        placeholder: "Büyükbaş",
        defaultValue: data?.type,
      },
      {
        type: "select",
        name: "category",
        label: "Ürünün Kategorisi",
        defaultOption: data?.category ?? saleCategory.animalProduct,
        options: [
          { label: "Hayvansal Ürün", value: saleCategory.animalProduct },
          { label: "Canlı Hayvan", value: saleCategory.animal },
          { label: "Gübre", value: saleCategory.fertilizer },
          { label: "Tarım", value: saleCategory.agriculture },
          { label: "Yem", value: saleCategory.feed },
          { label: "İlaç", value: saleCategory.medicine },
          { label: "Ekipman", value: saleCategory.equipment },
        ],
      },
      {
        type: "text",
        name: "amount",
        label: "Ürünün Miktarı",
        placeholder: "3",
        defaultValue: data?.amount,
      },
      {
        type: "text",
        name: "price",
        label: "Ürünün Satış Fiyatı",
        placeholder: "50 TL",
        defaultValue: data?.price,
      },
      {
        type: "datetime",
        name: "saleDate",
        label: "Ürünün Satış Tarihi",
        defaultValue: data?.saleDate,
      },
      {
        type: "text",
        name: "recipientName",
        label: "Alıcı Adı",
        placeholder: "Ahmet Çaltepe",
        defaultValue: data?.recipientName,
      },
      {
        type: "text",
        name: "contact",
        label: "Alıcının İletişim Bilgisi",
        placeholder: "0555555555",
        defaultValue: data?.contact,
      },
      {
        type: "select",
        name: "paymentState",
        label: "Ödeme Durumu",
        defaultOption: data?.paymentState ?? saleCategory.animalProduct,
        options: [
          { label: "Ödendi", value: paymentState.true },
          { label: "Ödenmedi", value: paymentState.false },
        ],
      },
      {
        type: "datetime",
        name: "paymentDate",
        label: "Ödeme Tarihi",
        defaultValue: data?.paymentDate,
      },
    ];
  }, [data]);

  const [form] = Form.useForm();
  const { setSale, updateSale, deleteSale } = useSaleStore();
  const { user } = useUserStore();

  const handleSave = () => {
    if (data) {
      updateSale(
        new Sale({ ...form.getFieldsValue(), id: data.id }),
        user?.id!
      );
    } else {
      setSale(new Sale(form.getFieldsValue()), user?.id!);
    }
  };

  const handleDelete = data ? () => deleteSale(data.id, user?.id!) : undefined;

  return (
    <>
      <DrawerForm
        title={
          data ? "Mevcut Satış Kaydını Güncelle" : "Yeni Satış Kaydı Girişi"
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        formItems={formItems}
        form={form}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
    </>
  );
}
