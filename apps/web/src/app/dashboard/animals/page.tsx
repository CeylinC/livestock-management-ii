"use client";

import DataTable from "@/components/DataTable";
import { Button, TableProps } from "antd";
import { ITableAnimal } from "./_type";
import { useEffect, useState } from "react";
import AddAnimal from "./addAnimal/addAnimal";
import { IAnimal } from "@packages/shared/models";
import { useAnimalStore, useUserStore } from "@packages/shared/stores";
import { webPageSize } from "@packages/shared/constant";

export default function Dashboard() {
  const { fetchInitialData, fetchPage, totalCount, animals } = useAnimalStore();
  const { user } = useUserStore();

  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState<ITableAnimal[]>([]);
  const [selectedData, setSelectedData] = useState<IAnimal>();

  useEffect(() => {
    if(user) {
      fetchInitialData(webPageSize, user.id)
    }
  }, [user])

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

  const handlePageChange = (page: number, pageSize: number) => {
    fetchPage(pageSize, page, user?.id!);
  };

  return (
    <div className="w-full min-h-[calc(100vh_-_160px)] flex items-center flex-col">
      <h1>Hayvanlar</h1>
      <Button onClick={handleCreateData}>Hayvan Ekle</Button>
      <AddAnimal isOpen={isAddOpen} setIsOpen={setIsAddOpen} data={selectedData} />
      <DataTable columns={columns} data={datas} onClickRow={onClickRow} handlePageChange={handlePageChange} totalCount={totalCount}/>
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