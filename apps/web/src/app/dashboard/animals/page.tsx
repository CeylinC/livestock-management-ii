"use client";

import DataTable from "@/components/DataTable";
import { Button, TableProps } from "antd";
import { ITableAnimal } from "./_type";
import { useEffect, useState } from "react";
import AddAnimal from "./addAnimal/addAnimal";
import { IAnimal } from "@packages/shared/models";
import { useAnimalStore } from "@packages/shared/stores";

export default function Dashboard() {
  const { getAnimals, animals } = useAnimalStore();

  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState<ITableAnimal[]>([]);
  const [selectedData, setSelectedData] = useState<IAnimal>();

  useEffect(() => {
    getAnimals()
  }, [])

  useEffect(() => {
    if (animals !== null) {
      setDatas(animals.map((animal, index) => ({
        key: index.toString(),
        name: animal.name,
        earring: animal.earring,
        type: animal.type,
        genus: animal.genus,
        gender: animal.gender,
        birthday: animal.birthday,
        barnName: animal.barnName,
        id: animal.id,
      })))
    }
  }, [animals])

  const onClickRow = ((record: TableProps<ITableAnimal>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { key, ...data } = record as ITableAnimal;
    setSelectedData(data)
    setIsAddOpen(true)
  })

  const handleCreateData = () => {
    setSelectedData(undefined)
    setIsAddOpen(true);
  }

  return (
    <div className="w-full h-screen flex items-center flex-col">
      <h1>Hayvanlar</h1>
      <Button onClick={handleCreateData}>Hayvan Ekle</Button>
      <AddAnimal isOpen={isAddOpen} setIsOpen={setIsAddOpen} data={selectedData} />
      <DataTable columns={columns} data={datas} onClickRow={onClickRow} />
    </div>
  );
}

const columns: TableProps<ITableAnimal>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Earring',
    dataIndex: 'earring',
    key: 'earring',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Genus',
    dataIndex: 'genus',
    key: 'genus',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Birthday',
    dataIndex: 'birthday',
    key: 'birthday',
    render: (text) => <a>{text.format('DD/MM/YYYY')}</a>,
  },
  {
    title: 'Barn',
    dataIndex: 'barnName',
    key: 'barnName',
  },
];

