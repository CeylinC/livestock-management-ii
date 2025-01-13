import { Button, Form, Input } from "@ant-design/react-native";
import React from "react";
import { ScrollView, Text } from "react-native";
import { router } from "expo-router";
import { useUserStore } from "@packages/shared/stores";
import { mobileAuth } from "../_layout";
import { styles } from "@/assets/style/tabs";

export default function LoginScreen() {
  const { login } = useUserStore();
  const [form] = Form.useForm();

  const onSubmit = async () => {
    const values = form.getFieldsValue();
    console.log(values);
    if (values.username && values.password) {
      if (await login(values.username, values.password, mobileAuth, "mobile")) {
        router.push("/(tabs)");
      }
    }
    console.log("Success");
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Giriş Yap</Text>
      <Form name="login" form={form}>
        <Form.Item
          label="Email"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Şifre"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onPress={onSubmit}>
            Giriş Yap
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="ghost" onPress={() => router.push("/(auth)/signup")}>
            Üye Ol
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="ghost" onPress={() => router.push("/(auth)/forgetPassword")}>
            Şifremi Unuttum
          </Button>
        </Form.Item>
      </Form>
    </ScrollView>
  );
}
