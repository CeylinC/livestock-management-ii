import { Text, SafeAreaView } from "react-native";
import { Button, Pagination } from "@ant-design/react-native";
import Table from "../../components/Table";
import { router } from "expo-router";
import { useSaleStore, useUserStore } from "@packages/shared/stores";
import { ISale } from "@packages/shared/models";
import { useEffect, useState } from "react";
import { styles } from "@/assets/style/tabs";
import { paginationButtonLocal } from "@/constants/local";
import { mobilePageSize } from "@packages/shared/constant";

const columns = [
  "name",
  "type",
  "category",
  "amount",
  "price",
  "saleDate",
  "recipientName",
  "contact",
  "paymentState",
  "paymentDate",
];

export default function SalesScreen() {
  const { selectSale, fetchInitialData, fetchPage, totalCount, sales } =
    useSaleStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      fetchInitialData(mobilePageSize, user?.id);
    }
  }, [user]);

  const handleSelectRow = (item: ISale) => {
    selectSale(item);
    router.replace("/addSale");
  };

  const handlePageChange = (current: number) => {
    setCurrentPage(current);
    fetchPage(mobilePageSize, current, user?.id!);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Satışlar</Text>
      <Table<ISale>
        handleSelectRow={handleSelectRow}
        data={sales}
        columns={columns}
      />
      <Pagination
        total={Math.ceil(totalCount / mobilePageSize)}
        current={currentPage}
        locale={paginationButtonLocal}
        onChange={handlePageChange}
      />
      <Button type="primary" onPress={() => router.replace("/addSale")}>
        Satış Ekle
      </Button>
    </SafeAreaView>
  );
}
