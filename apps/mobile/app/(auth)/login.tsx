import {
  Button,
  Form,
  Input,
} from '@ant-design/react-native'
import React from 'react'
import { ScrollView, Text } from 'react-native'
import { router } from 'expo-router';
import { useUserStore } from '@packages/shared/stores';
import { mobileAuth } from '../_layout';

export default function LoginScreen() {
  const { login } = useUserStore();
  const [form] = Form.useForm()

  const onSubmit= async () => {
    const values = form.getFieldsValue();
    console.log(values)
    if (values.username && values.password) {
      if (await login(values.username, values.password, mobileAuth, 'mobile')) {
        router.push("/(tabs)");
      }
    }
    console.log("Success");
  };


  return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text>Kayıt Ol</Text>
        <Form
          name="basic"
          form={form}
      >
        <Form.Item
          label="Email"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input type='password' />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onPress={onSubmit}>Submit</Button>
        </Form.Item>
      </Form>
      <Button type="primary" onPress={() => router.push("/(auth)/signup")}>Signup</Button>
      </ScrollView>
  );
}