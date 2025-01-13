"use client";

import { Button, TableProps } from "antd";
import DataTable from "@/components/DataTable";
import { ITableBarn } from "./_type";
import { useEffect, useState } from "react";
import AddBarns from "./addBarn/addBarn";
import { useBarnStore, useUserStore } from "@packages/shared/stores";
import { IBarn } from "@packages/shared/models";
import { webPageSize } from "@packages/shared/constant";

export default function Dashboard() {
  const { fetchInitialData, fetchPage, totalCount, barns } = useBarnStore();
  const { user } = useUserStore();

  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState<ITableBarn[]>([]);
  const [selectedData, setSelectedData] = useState<IBarn>();

  useEffect(() => {
    if(user) {
      fetchInitialData(webPageSize, user.id)
    }
  }, [user])

  useEffect(() => {
    if (barns !== null) {
      setDatas(barns.map((barn, index) => ({
        key: index.toString(),
        name: barn.name,
        type: barn.type,
        gender: barn.gender,
        id: barn.id,
      })))
    }
  }, [barns])

  const onClickRow = ((record: TableProps<ITableBarn>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { key, ...data } = record as ITableBarn;
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
      <h1>Ağıllar</h1>
      <Button onClick={handleCreateData}>Ağıl Ekle</Button>
      <AddBarns isOpen={isAddOpen} setIsOpen={setIsAddOpen} data={selectedData} />
      <DataTable columns={columns} data={datas} onClickRow={onClickRow} handlePageChange={handlePageChange} totalCount={totalCount} />
    </div>
  );
}

const columns: TableProps<ITableBarn>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
];