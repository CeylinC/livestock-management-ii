"use client";

import { useUserStore } from "@packages/shared/stores";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Settings() {
  const { logout, user, saveUser } = useUserStore();
  const router = useRouter();
  const [fullName, setFullName] = useState(user?.fullName);

  const handleLogout = async () => {
    if (await logout()) {
      router.push("/login");
    }
  };
  return (
    <div className="min-h-[calc(100vh_-_160px)] flex flex-col justify-between">
      <div className="w-1/3">
        <p className="mb-2">Kullanıcı Adı</p>
        <div className="flex flex-row justify-between gap-2">
          <Input
            defaultValue={fullName}
            onChange={(event) => setFullName(event.currentTarget.value)}
          />
          <Button
            color="primary"
            variant="filled"
            onClick={() => {
              if (fullName && user) {
                saveUser({ ...user, fullName: fullName });
              }
            }}
          >
            Kaydet
          </Button>
        </div>
      </div>
      <Button
        className="flex flex-row justify-start m-1 pl-6 pr-4 border-0"
        color="danger"
        variant="link"
        onClick={handleLogout}
      >
        Çıkış Yap
      </Button>
    </div>
  );
}
