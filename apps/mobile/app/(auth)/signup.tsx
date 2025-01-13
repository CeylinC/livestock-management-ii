import { Button, Form, Input } from "@ant-design/react-native";
import React from "react";
import { ScrollView, Text } from "react-native";
import { router } from "expo-router";
import { useUserStore } from "@packages/shared/stores";
import { mobileAuth } from "../_layout";

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
      <Text>Üye Ol</Text>
      <Form name="basic">
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
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onPress={onSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Button type="primary" onPress={() => router.push("/(auth)/login")}>
        Login
      </Button>
    </ScrollView>
  );
}
