import { Text, SafeAreaView } from 'react-native';
import { Button, Pagination } from '@ant-design/react-native';
import Table from '../../components/Table';
import { router } from 'expo-router';
import { useAnimalStore } from '@packages/shared/stores';
import { IAnimal } from '@packages/shared/models';
import { useEffect } from 'react';
import { styles } from '@/assets/style/tabs';
import { paginationButtonLocal } from '@/constants/local';

const columns = [
  'name',
  'earring',
  'type',
  'genus',
  'gender',
  'birthday',
  'barnName'
];

export default function AnimalsScreen() {
  const { selectAnimal, getAnimals, animals } = useAnimalStore();

  useEffect(() => {
    getAnimals();
  }, [])

  const handleSelectRow = (item: IAnimal) => {
    selectAnimal(item);
    router.replace('/addAnimal');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hayvanlar</Text>
      <Table<IAnimal> handleSelectRow={handleSelectRow} data={animals} columns={columns} />
      <Pagination total={5} current={1} locale={paginationButtonLocal} />
      <Button type="primary" onPress={() => router.replace('/addAnimal')}>Hayvan Ekle</Button>
    </SafeAreaView>
  );
}