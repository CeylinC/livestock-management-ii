import { Button, Card } from "antd";
import Link from "next/link";
import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Image from "next/image";

const navbarList = [
  {
    key: "1",
    label: <Link href={"/"}>Anasayfa</Link>,
  },
  {
    key: "2",
    label: <Link href={"/login"}>Giriş Yap</Link>,
  },
  {
    key: "3",
    label: <Link href={"/signup"}>Üye Ol</Link>,
  },
];

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center">
      <div className="bg-white fixed top-0 shadow flex justify-between items-center w-full">
        <p className="bold text-xl ml-4">Çiftlik Yönetimi</p>
        <Menu
          className="mr-4"
          selectedKeys={["1"]}
          mode="horizontal"
          items={navbarList}
        />
      </div>
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-t from-blue-50">
        <div className="flex flex-row items-center gap-16">
          <Image
            src={"/frame.png"}
            alt={"QR Code"}
            width={300}
            height={300}
            className="rounded-xl"
          />
          <div className="flex flex-col">
            <div className="text-3xl text-blue-500 font-bold max-w-[600px]">
              ÇİFTLİĞİNİZDE DİJİTAL DÖNÜŞÜME ADIM ATIN
            </div>
            <div className="text-xl text-gray-500">
              Mobil Uygulamamızı İndirin!
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center p-6">
        <h1 className="text-2xl font-bold text-center text-blue-500">
          Hizmetlerimiz
        </h1>
        <div className="flex flex-row gap-4 p-6 justify-center items-center">
          <Card
            title="Hayvan Yönetimi"
            bordered={false}
            className="text-center"
            style={{ width: 300, height: 150 }}
          >
            <p>
              Sürü sağlığını takip edin, verimliliği artırın ve bakım
              süreçlerini optimize edin.
            </p>
          </Card>
          <Card
            title="Gelir ve Gider Takibi"
            bordered={false}
            className="text-center"
            style={{ width: 300, height: 150 }}
          >
            <p>
              Maliyetleri analiz edin, gelirleri yönetin ve kârlılığınızı
              artırın.
            </p>
          </Card>
          <Card
            title="Stok ve Depo Yönetimi"
            bordered={false}
            className="text-center"
            style={{ width: 300, height: 150 }}
          >
            <p>
              Yem, ilaç ve diğer malzemelerinizi etkili bir şekilde takip edin.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
