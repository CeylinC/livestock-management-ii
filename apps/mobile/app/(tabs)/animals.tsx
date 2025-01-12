import { Text, SafeAreaView } from "react-native";
import { Button, Pagination } from "@ant-design/react-native";
import Table from "../../components/Table";
import { router } from "expo-router";
import { useAnimalStore, useUserStore } from "@packages/shared/stores";
import { IAnimal } from "@packages/shared/models";
import { useEffect, useState } from "react";
import { styles } from "@/assets/style/tabs";
import { paginationButtonLocal } from "@/constants/local";
import { mobilePageSize } from "@packages/shared/constant";

const columns = [
  "name",
  "earring",
  "type",
  "genus",
  "gender",
  "birthday",
  "barnName",
];

export default function AnimalsScreen() {
  const { fetchInitialData, fetchPage, totalCount, animals, selectAnimal } =
    useAnimalStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      fetchInitialData(mobilePageSize, user?.id);
    }
  }, [user]);

  const handlePageChange = (current: number) => {
    setCurrentPage(current);
    fetchPage(mobilePageSize, current, user?.id!);
  };

  const handleSelectRow = (item: IAnimal) => {
    selectAnimal(item);
    router.replace("/addAnimal");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hayvanlar</Text>
      <Table<IAnimal>
        handleSelectRow={handleSelectRow}
        data={animals}
        columns={columns}
      />
      <Pagination
        total={Math.ceil(totalCount / mobilePageSize)}
        current={currentPage}
        locale={paginationButtonLocal}
        onChange={handlePageChange}
      />
      <Button type="primary" onPress={() => router.replace("/addAnimal")}>
        Hayvan Ekle
      </Button>
    </SafeAreaView>
  );
}
