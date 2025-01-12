import { Text, SafeAreaView } from "react-native";
import { Button, Pagination } from "@ant-design/react-native";
import Table from "../../components/Table";
import { router } from "expo-router";
import { useBarnStore, useUserStore } from "@packages/shared/stores";
import { IBarn } from "@packages/shared/models";
import { useEffect, useState } from "react";
import { styles } from "@/assets/style/tabs";
import { paginationButtonLocal } from "@/constants/local";
import { mobilePageSize } from "@packages/shared/constant";

const columns = ["name", "type", "gender"];

export default function BarnsScreen() {
  const { selectBarn, fetchInitialData, fetchPage, totalCount, barns } =
    useBarnStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      fetchInitialData(mobilePageSize, user?.id);
    }
  }, [user]);

  const handleSelectRow = (item: IBarn) => {
    selectBarn(item);
    router.replace("/addBarn");
  };

  const handlePageChange = (current: number) => {
    setCurrentPage(current);
    fetchPage(mobilePageSize, current, user?.id!);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ağıllar</Text>
      <Table<IBarn>
        handleSelectRow={handleSelectRow}
        data={barns}
        columns={columns}
      />
      <Pagination
        total={Math.ceil(totalCount / mobilePageSize)}
        current={currentPage}
        locale={paginationButtonLocal}
        onChange={handlePageChange}
      />
      <Button type="primary" onPress={() => router.replace("/addBarn")}>
        Ağıl Ekle
      </Button>
    </SafeAreaView>
  );
}
