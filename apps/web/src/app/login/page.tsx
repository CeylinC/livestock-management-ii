"use client";
import { Button, Form, FormProps, Input } from "antd";
import { useUserStore } from "@packages/shared/stores";
import { useRouter } from "next/navigation";

type FieldType = {
  username?: string;
  password?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function Login() {
  const { login } = useUserStore();
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values.username && values.password) {
      if (await login(values.username, values.password)) {
        router.push("/dashboard");
      }
    }
    console.log("Success:", values);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1>Login</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}

        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
