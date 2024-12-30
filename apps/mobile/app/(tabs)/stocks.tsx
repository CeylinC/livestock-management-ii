import { Text, SafeAreaView } from 'react-native';
import { Button, Pagination } from '@ant-design/react-native';
import Table from '../../components/Table';
import { router } from 'expo-router';
import { useStockStore } from '@packages/shared/stores';
import { IStock } from '@packages/shared/models';
import { useEffect, useState } from 'react';
import { styles } from '@/assets/style/tabs';
import { paginationButtonLocal } from '@/constants/local';
import { mobilePageSize } from '@packages/shared/constant';

const columns = [
  'name',
  'category',
  'amount',
  'dealer',
  'storage',
];

export default function StocksScreen() {
  const { selectStock, fetchInitialData, fetchPage, totalCount, stocks } = useStockStore();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetchInitialData(mobilePageSize);
  }, [])

  const handleSelectRow = (item: IStock) => {
    selectStock(item);
    router.replace('/addStock');
  }

  const handlePageChange = (current: number) => {
    setCurrentPage(current);
    fetchPage(mobilePageSize, current);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Stoklar</Text>
      <Table<IStock> handleSelectRow={handleSelectRow} data={stocks} columns={columns} />
      <Pagination total={Math.ceil(totalCount / mobilePageSize)} current={currentPage} locale={paginationButtonLocal} onChange={handlePageChange} />
      <Button type="primary" onPress={() => router.replace('/addStock')}>Stok Ekle</Button>
    </SafeAreaView>
  );
}