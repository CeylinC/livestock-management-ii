"use client";

import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  HomeOutlined,
  SettingOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { useRouter } from "next/navigation";
import { useUserStore } from "@packages/shared/stores";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const { Header, Sider, Content } = Layout;

const navbarList = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: <Link href={"/dashboard"}>Anasayfa</Link>,
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: <Link href={"/dashboard/animals"}>Hayvanlar</Link>,
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: <Link href={"/dashboard/barns"}>Ağıllar</Link>,
  },
  {
    key: "4",
    icon: <UploadOutlined />,
    label: <Link href={"/dashboard/sales"}>Satışlar</Link>,
  },
  {
    key: "5",
    icon: <UploadOutlined />,
    label: <Link href={"/dashboard/stocks"}>Stoklar</Link>,
  },
  {
    key: "6",
    icon: <SettingOutlined />,
    label: <Link href={"/dashboard/settings"}>Ayarlar</Link>,
  },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { authControl, user, getUser } = useUserStore();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const control = async () => {
      if (!(await authControl())) {
        router.push("/login");
      } else {
        if (!user) {
          const token = sessionStorage.getItem(
            "firebase:authUser:AIzaSyD7bmbh5v0Z4NkrPveOKDMhuyOsVP0jr7Y:[DEFAULT]"
          );
          if (token) {
            const user = JSON.parse(token);
            getUser(user.uid);
          }
        }
      }
    };
    control();
  }, []);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[findKeyByHref(pathname)]}
          items={navbarList}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

const findKeyByHref = (hrefValue: string): string => {
  for (const item of navbarList) {
    const href = item.label.props?.href;
    if (href === hrefValue) {
      return item.key;
    }
  }
  return "1";
};
