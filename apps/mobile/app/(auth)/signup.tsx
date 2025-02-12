import { Button, Form, Input } from "@ant-design/react-native";
import React from "react";
import { ScrollView, Text } from "react-native";
import { router } from "expo-router";
import { useUserStore } from "@packages/shared/stores";
import { mobileAuth } from "../_layout";
import { styles } from "@/assets/style/tabs";

export default function SignupScreen() {
  const { signUp } = useUserStore();
  const [form] = Form.useForm();

  const onSubmit = async () => {
    const values = form.getFieldsValue();
    if (values.username && values.password && values.email) {
      if (
        await signUp(
          values.username,
          values.password,
          values.fullName,
          mobileAuth,
          "mobile"
        )
      ) {
        router.push("/(tabs)");
      }
    }
    console.log("Success");
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Üye Ol</Text>
      <Form name="signup">
        <Form.Item
          label="Kullanıcı Adı"
          name="fullName"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
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
            Üye Ol
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="ghost" onPress={() => router.push("/(auth)/login")}>
            Giriş Yap
          </Button>
        </Form.Item>
      </Form>
    </ScrollView>
  );
}
