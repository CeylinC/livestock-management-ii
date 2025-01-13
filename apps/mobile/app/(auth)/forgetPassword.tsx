import { Button, Form, Input } from "@ant-design/react-native";
import React from "react";
import { ScrollView, Text } from "react-native";
import { router } from "expo-router";
import { useUserStore } from "@packages/shared/stores";
import { mobileAuth } from "../_layout";
import { styles } from "@/assets/style/tabs";

export default function ForgetPasswordScreen() {
  const { resetPassword } = useUserStore();
  const [form] = Form.useForm();

  const onSubmit = async () => {
    const values = form.getFieldsValue();
    if (values.email) {
      if (await resetPassword(values.email)) {
        router.push("/(auth)/login");
      }
    }
    console.log("Success");
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Şifremi Unuttum</Text>
      <Form name="forgetPassword" form={form}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onPress={onSubmit}>
            Şifremi Unuttum
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="ghost" onPress={() => router.push("/(auth)/login")}>
            İptal
          </Button>
        </Form.Item>
      </Form>
    </ScrollView>
  );
}
