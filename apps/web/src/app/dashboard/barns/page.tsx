"use client";

import { Button, TableProps } from "antd";
import DataTable from "@/components/DataTable";
import { ITableBarn } from "./_type";
import { useEffect, useState } from "react";
import AddBarns from "./addBarn/addBarn";
import { useBarnStore } from "@packages/shared/stores";
import { IBarn } from "@packages/shared/models";

export default function Dashboard() {
    const { getBarns, barns } = useBarnStore();

    const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
    const [datas, setDatas] = useState<ITableBarn[]>([]);
    const [selectedData, setSelectedData] = useState<IBarn>();
  
    useEffect(() => {
      getBarns()
    }, [])
  
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
  
    return (
        <div className="w-full h-screen flex items-center flex-col">
            <h1>Ağıllar</h1>
            <Button onClick={handleCreateData}>Ağıl Ekle</Button>
            <AddBarns isOpen={isAddOpen} setIsOpen={setIsAddOpen} data={selectedData}/>
            <DataTable columns={columns} data={datas} onClickRow={onClickRow} />
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