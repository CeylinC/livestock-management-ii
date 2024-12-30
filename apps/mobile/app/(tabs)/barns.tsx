import { Text, SafeAreaView } from 'react-native';
import { Button, Pagination } from '@ant-design/react-native';
import Table from '../../components/Table';
import { router } from 'expo-router';
import { useBarnStore } from '@packages/shared/stores';
import { IBarn } from '@packages/shared/models';
import { useEffect } from 'react';
import { styles } from '@/assets/style/tabs';
import { paginationButtonLocal } from '@/constants/local';

const columns = [
  'name',
  'type',
  'gender',
];

export default function BarnsScreen() {
  const { selectBarn, getBarns, barns } = useBarnStore();

  useEffect(() => {
    getBarns();
  }, [])

  const handleSelectRow = (item: IBarn) => {
    selectBarn(item);
    router.replace('/addBarn');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ağıllar</Text>
      <Table<IBarn> handleSelectRow={handleSelectRow} data={barns} columns={columns} />
      <Pagination total={5} current={1} locale={paginationButtonLocal} />
      <Button type="primary" onPress={() => router.replace('/addBarn')}>Ağıl Ekle</Button>
    </SafeAreaView>
  );
}