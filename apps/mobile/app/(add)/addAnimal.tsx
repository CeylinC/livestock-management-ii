import { Form, Provider } from "@ant-design/react-native";
import React from "react";
import { gender } from "@packages/shared/enums/gender";
import { ScrollView } from "react-native";
import DataForm, { FormItemsType } from "../../components/DataForm";
import { router, Stack } from "expo-router";
import { useAnimalStore, useUserStore } from "@packages/shared/stores";
import { Animal } from "@packages/shared/classes";

export default function AddAnimalScreen() {
  const {
    selectAnimal,
    selectedAnimal,
    updateAnimal,
    setAnimal,
    deleteAnimal,
  } = useAnimalStore();
  const [form] = Form.useForm();
  const { user } = useUserStore();

  const formItems: FormItemsType[] = [
    {
      type: "text",
      name: "name",
      label: "Hayvanın İsmi",
      placeholder: "Karabaş",
      defaultValue: selectedAnimal?.name,
    },
    {
      type: "text",
      name: "earring",
      label: "Hayvanın Kulak Küpesi",
      placeholder: "454545",
      defaultValue: selectedAnimal?.earring,
    },
    {
      type: "text",
      name: "type",
      label: "Hayvanın Türü",
      placeholder: "Büyükbaş",
      defaultValue: selectedAnimal?.type,
    },
    {
      type: "text",
      name: "genus",
      label: "Hayvanın Cinsi",
      placeholder: "Büyükbaş",
      defaultValue: selectedAnimal?.genus,
    },
    {
      type: "select",
      name: "gender",
      label: "Hayvanın Cinsiyeti",
      defaultOption: selectedAnimal?.gender || gender.male,
      options: [
        { label: "Dişi", value: gender.female },
        { label: "Erkek", value: gender.male },
      ],
    },
    {
      type: "datetime",
      name: "birthday",
      label: "Hayvanın Doğum Tarihi",
      defaultValue: selectedAnimal?.birthday,
    },
    {
      type: "text",
      name: "barnName",
      label: "Hayvanın Bulunduğu Ağıl",
      placeholder: "İnek Ağılı",
      defaultValue: selectedAnimal?.barnName,
    },
  ];

  const onSubmit = () => {
    if (selectedAnimal) {
      updateAnimal(
        new Animal({
          ...form.getFieldsValue(),
          id: selectedAnimal.id,
          gender: form.getFieldValue("gender")[0],
        }),
        user?.id!
      );
    } else {
      setAnimal(
        new Animal({
          ...form.getFieldsValue(),
          gender: form.getFieldValue("gender")[0],
        }),
        user?.id!
      );
    }
    onNavigate();
  };

  const onDelete = () => {
    if (!selectedAnimal) {
      return;
    }
    deleteAnimal(selectedAnimal.id, user?.id!);
    onNavigate();
  };

  const onCancel = () => {
    onNavigate();
  };

  const onNavigate = () => {
    selectAnimal(null);
    router.replace("/(tabs)/animals");
  };

  return (
    <Provider>
      <Stack.Screen
        options={{
          title: selectedAnimal
            ? "Mevcut Hayvan Kaydını Güncelle"
            : "Yeni Hayvan Kaydı Oluştur",
        }}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <DataForm
          formItems={formItems}
          form={form}
          handleSave={onSubmit}
          handleCancel={onCancel}
          handleDelete={selectedAnimal ? onDelete : undefined}
        />
      </ScrollView>
    </Provider>
  );
}
