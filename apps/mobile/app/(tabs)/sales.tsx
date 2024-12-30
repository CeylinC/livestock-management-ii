import { Text, SafeAreaView } from 'react-native';
import { Button, Pagination } from '@ant-design/react-native';
import Table from '../../components/Table';
import { router } from 'expo-router';
import { useSaleStore } from '@packages/shared/stores';
import { ISale } from '@packages/shared/models';
import { useEffect } from 'react';
import { styles } from '@/assets/style/tabs';
import { paginationButtonLocal } from '@/constants/local';

const columns = [
  'name',
  'type',
  'category',
  'amount',
  'price',
  'saleDate',
  'recipientName',
  'contact',
  'paymentState',
  'paymentDate',
];

export default function SalesScreen() {
  const { selectSale, getSales, sales } = useSaleStore();

  useEffect(() => {
    getSales();
  }, [])

  const handleSelectRow = (item: ISale) => {
    selectSale(item);
    router.replace('/addSale');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Satışlar</Text>
      <Table<ISale> handleSelectRow={handleSelectRow} data={sales} columns={columns} />
      <Pagination total={5} current={1} locale={paginationButtonLocal} />
      <Button type="primary" onPress={() => router.replace('/addSale')}>Satış Ekle</Button>
    </SafeAreaView>
  );
}