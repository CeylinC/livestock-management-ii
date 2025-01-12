import { Form, Provider } from "@ant-design/react-native";
import React from "react";
import { gender } from "@packages/shared/enums/gender";
import { ScrollView } from "react-native";
import DataForm, { FormItemsType } from "../../components/DataForm";
import { router, Stack } from "expo-router";
import { useBarnStore, useUserStore } from "@packages/shared/stores";
import { Barn } from "@packages/shared/classes";

export default function AddBarnScreen() {
  const { selectBarn, selectedBarn, updateBarn, setBarn, deleteBarn } =
    useBarnStore();
  const [form] = Form.useForm();
  const { user } = useUserStore();

  const formItems: FormItemsType[] = [
    {
      type: "text",
      name: "name",
      label: "Ağılın İsmi",
      placeholder: "İnek Ağılı",
      defaultValue: selectedBarn?.name,
    },
    {
      type: "text",
      name: "type",
      label: "Ağılın Türü",
      placeholder: "Büyükbaş",
      defaultValue: selectedBarn?.type,
    },
    {
      type: "select",
      name: "gender",
      label: "Hayvanın Cinsiyeti",
      defaultOption: selectedBarn?.gender || gender.karma,
      options: [
        { label: "Karışık", value: gender.karma },
        { label: "Dişi", value: gender.female },
        { label: "Erkek", value: gender.male },
      ],
    },
  ];

  const onSubmit = () => {
    if (selectedBarn) {
      updateBarn(
        new Barn({
          ...form.getFieldsValue(),
          id: selectedBarn.id,
          gender: form.getFieldValue("gender")[0],
        }),
        user?.id!
      );
    } else {
      setBarn(
        new Barn({
          ...form.getFieldsValue(),
          gender: form.getFieldValue("gender")[0],
        }),
        user?.id!
      );
    }
    onNavigate();
  };

  const onDelete = () => {
    if (!selectedBarn) {
      return;
    }
    deleteBarn(selectedBarn.id,
      user?.id!);
    onNavigate();
  };

  const onCancel = () => {
    onNavigate();
  };

  const onNavigate = () => {
    selectBarn(null);
    router.replace("/(tabs)/barns");
  };

  return (
    <Provider>
      <Stack.Screen
        options={{
          title: selectedBarn
            ? "Mevcut Ağıl Kaydını Güncelle"
            : "Yeni Ağıl Kaydı Oluştur",
        }}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <DataForm
          formItems={formItems}
          form={form}
          handleSave={onSubmit}
          handleCancel={onCancel}
          handleDelete={selectedBarn ? onDelete : undefined}
        />
      </ScrollView>
    </Provider>
  );
}
