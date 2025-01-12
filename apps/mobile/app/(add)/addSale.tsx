import { Form, Provider } from "@ant-design/react-native";
import React from "react";
import { ScrollView } from "react-native";
import DataForm, { FormItemsType } from "../../components/DataForm";
import { router, Stack } from "expo-router";
import { useSaleStore, useUserStore } from "@packages/shared/stores";
import { Sale } from "@packages/shared/classes";
import { paymentState, saleCategory } from "@packages/shared/enums";

export default function AddSaleScreen() {
  const { selectSale, selectedSale, updateSale, setSale, deleteSale } =
    useSaleStore();
  const [form] = Form.useForm();
  const { user } = useUserStore();

  const formItems: FormItemsType[] = [
    {
      type: "text",
      name: "name",
      label: "Ürünün İsmi",
      placeholder: "İnek Ağılı",
      defaultValue: selectedSale?.name,
    },
    {
      type: "text",
      name: "type",
      label: "Ürünün Türü",
      placeholder: "Büyükbaş",
      defaultValue: selectedSale?.type,
    },
    {
      type: "select",
      name: "category",
      label: "Ürünün Kategorisi",
      defaultOption: selectedSale?.category ?? saleCategory.animalProduct,
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
      defaultValue: selectedSale?.amount,
    },
    {
      type: "text",
      name: "price",
      label: "Ürünün Satış Fiyatı",
      placeholder: "50 TL",
      defaultValue: selectedSale?.price,
    },
    {
      type: "datetime",
      name: "saleDate",
      label: "Ürünün Satış Tarihi",
      defaultValue: selectedSale?.saleDate,
    },
    {
      type: "text",
      name: "recipientName",
      label: "Alıcı Adı",
      placeholder: "Ahmet Çaltepe",
      defaultValue: selectedSale?.recipientName,
    },
    {
      type: "text",
      name: "contact",
      label: "Alıcının İletişim Bilgisi",
      placeholder: "0555555555",
      defaultValue: selectedSale?.contact,
    },
    {
      type: "select",
      name: "paymentState",
      label: "Ödeme Durumu",
      defaultOption: selectedSale?.paymentState ?? saleCategory.animalProduct,
      options: [
        { label: "Ödendi", value: paymentState.true },
        { label: "Ödenmedi", value: paymentState.false },
      ],
    },
    {
      type: "datetime",
      name: "paymentDate",
      label: "Ödeme Tarihi",
      defaultValue: selectedSale?.paymentDate,
    },
  ];

  const onSubmit = () => {
    if (selectedSale) {
      updateSale(
        new Sale({
          ...form.getFieldsValue(),
          id: selectedSale.id,
          category: form.getFieldValue("category")[0],
          paymentState: form.getFieldValue("paymentState")[0],
        }),
        user?.id!
      );
    } else {
      setSale(
        new Sale({
          ...form.getFieldsValue(),
          gender: form.getFieldValue("gender")[0],
        }),
        user?.id!
      );
    }
    onNavigate();
  };

  const onDelete = () => {
    if (!selectedSale) {
      return;
    }
    deleteSale(selectedSale.id, user?.id!);
    onNavigate();
  };

  const onCancel = () => {
    onNavigate();
  };

  const onNavigate = () => {
    selectSale(null);
    router.replace("/(tabs)/sales");
  };

  return (
    <Provider>
      <Stack.Screen
        options={{
          title: selectedSale
            ? "Mevcut Satışın Kaydını Güncelle"
            : "Yeni Satış Kaydı Oluştur",
        }}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <DataForm
          formItems={formItems}
          form={form}
          handleSave={onSubmit}
          handleCancel={onCancel}
          handleDelete={selectedSale ? onDelete : undefined}
        />
      </ScrollView>
    </Provider>
  );
}
