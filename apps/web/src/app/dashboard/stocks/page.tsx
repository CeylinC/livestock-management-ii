"use client";

import DataTable from "@/components/DataTable";
import { Button, TableProps } from "antd";
import { ITableStock } from "./_type";
import { useEffect, useState } from "react";
import AddStock from "./addStock/addStock";
import { useStockStore } from "@packages/shared/stores";
import { IStock } from "@packages/shared/models";
import { webPageSize } from "@packages/shared/constant";

export default function Dashboard() {
  const { fetchInitialData, fetchPage, totalCount, stocks } = useStockStore();

  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState<ITableStock[]>([]);
  const [selectedData, setSelectedData] = useState<IStock>();


  useEffect(() => {
    fetchInitialData(webPageSize)
  }, [])

  useEffect(() => {
    if (stocks !== null) {
      setDatas(stocks.map((stock, index) => ({
        key: index.toString(),
        name: stock.name,
        category: stock.category,
        amount: stock.amount,
        dealer: stock.dealer,
        storage: stock.storage,
        id: stock.id
      })))
    }
  }, [stocks])

  const onClickRow = ((record: TableProps<ITableStock>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { key, ...data } = record as ITableStock;
    setSelectedData(data)
    setIsAddOpen(true)
  })

  const handleCreateData = () => {
    setSelectedData(undefined)
    setIsAddOpen(true);
  }

  const handlePageChange = (page: number, pageSize: number) => {
    fetchPage(pageSize, page);
  };

  return (
    <div className="w-full h-screen flex items-center flex-col">
      <h1>Stoklar</h1>
      <Button onClick={handleCreateData}>Stok Ekle</Button>
      <AddStock isOpen={isAddOpen} setIsOpen={setIsAddOpen} data={selectedData} />
      <DataTable columns={columns} data={datas} onClickRow={onClickRow} handlePageChange={handlePageChange} totalCount={totalCount}/>
    </div>
  );
}

const columns: TableProps<ITableStock>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Dealer',
    dataIndex: 'dealer',
    key: 'dealer',
  },
  {
    title: 'Storage',
    dataIndex: 'storage',
    key: 'storage',
  },
];
