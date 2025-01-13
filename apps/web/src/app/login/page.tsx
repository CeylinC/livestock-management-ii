"use client";
import { Button, Form, FormProps, Input } from "antd";
import { useUserStore } from "@packages/shared/stores";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FieldType = {
  email?: string;
  password?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function Login() {
  const { login, resetPassword } = useUserStore();
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values.email && values.password) {
      if (await login(values.email, values.password)) {
        router.push("/dashboard");
      }
    }
    console.log("Success:", values);
  };

  const onResetPassword: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values.email) {
      if (await resetPassword(values.email)) {
        setIsOpenModal(false);
      }
    }
    console.log("Success:", values);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-t from-blue-100">
      {isOpenModal && (
        <>
          <div className="bg-black opacity-30 absolute w-full h-full z-10 top-0 left-0" />
          <div className="absolute w-fit bg-white top-center left-center shadow rounded-xl z-20">
            <div className="flex flex-col p-6">
              <div className="font-bold text-blue-500 text-center mb-4">
                Şifremi Unuttum
              </div>
              <Form
                name="forgetPassword"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{
                  width: 300,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                onFinish={onResetPassword}
                autoComplete="off"
              >
                <Form.Item<FieldType>
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <div className="flex flex-row gap-6">
                  <Button type="primary" htmlType="submit">
                    Şifremi Sıfırla
                  </Button>
                  <Button variant="outlined">İptal</Button>
                </div>
              </Form>
            </div>
          </div>
        </>
      )}
      <div className="p-6 bg-white rounded-xl shadow">
        <h1 className="p-4 text-xl font-bold text-blue-500 text-center">
          Giriş Yap
        </h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, minWidth: 300 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Şifre"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <div className="flex justify-end w-full -mt-2 mb-2">
            <Button
              type="link"
              variant="link"
              onClick={() => setIsOpenModal(true)}
            >
              Şifremi Unuttum
            </Button>
          </div>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Giriş Yap
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="link"
              variant="link"
              onClick={() => router.push("/signup")}
              className="-mt-[32px] text-center"
            >
              Üye Ol
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
