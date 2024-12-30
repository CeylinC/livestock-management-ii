import { Text, SafeAreaView } from 'react-native';
import { Button, Pagination } from '@ant-design/react-native';
import Table from '../../components/Table';
import { router } from 'expo-router';
import { useStockStore } from '@packages/shared/stores';
import { IStock } from '@packages/shared/models';
import { useEffect } from 'react';
import { styles } from '@/assets/style/tabs';
import { paginationButtonLocal } from '@/constants/local';

const columns = [
  'name',
  'category',
  'amount',
  'dealer',
  'storage',
];

export default function StocksScreen() {
  const { selectStock, getStocks, stocks } = useStockStore();

  useEffect(() => {
    getStocks();
  }, [])

  const handleSelectRow = (item: IStock) => {
    selectStock(item);
    router.replace('/addStock');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Stoklar</Text>
      <Table<IStock> handleSelectRow={handleSelectRow} data={stocks} columns={columns} />
      <Pagination total={5} current={1} locale={paginationButtonLocal} />
      <Button type="primary" onPress={() => router.replace('/addStock')}>Stok Ekle</Button>
    </SafeAreaView>
  );
}