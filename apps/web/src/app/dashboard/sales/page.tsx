"use client";

import DataTable from "@/components/DataTable";
import { Button, TableProps } from "antd";
import { ITableSale } from "./_type";
import { useEffect, useState } from "react";
import AddSale from "./addSale/addSale";
import { useSaleStore } from "@packages/shared/stores";
import { ISale } from "@packages/shared/models";
import { webPageSize } from "@packages/shared/constant";

export default function Dashboard() {
  const { fetchInitialData, fetchPage, totalCount, sales } = useSaleStore();

  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState<ITableSale[]>([]);
  const [selectedData, setSelectedData] = useState<ISale>();

  useEffect(() => {
    fetchInitialData(webPageSize)
  }, [])

  useEffect(() => {
    if (sales !== null) {
      setDatas(sales.map((sale, index) => ({
        key: index.toString(),
        name: sale.name,
        type: sale.type,
        category: sale.category,
        amount: sale.amount,
        price: sale.price,
        saleDate: sale.saleDate,
        recipientName: sale.recipientName,
        contact: sale.contact,
        paymentState: sale.paymentState,
        paymentDate: sale.paymentDate,
        id: sale.id
      })))
    }
  }, [sales])

  const onClickRow = ((record: TableProps<ITableSale>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { key, ...data } = record as ITableSale;
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
      <h1>Satışlar</h1>
      <Button onClick={handleCreateData}>Satış Ekle</Button>
      <AddSale isOpen={isAddOpen} setIsOpen={setIsAddOpen} data={selectedData} />
      <DataTable columns={columns} data={datas} onClickRow={onClickRow} handlePageChange={handlePageChange} totalCount={totalCount} />
    </div>
  );
}

const columns: TableProps<ITableSale>['columns'] = [
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
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Sale Date',
    dataIndex: 'saleDate',
    key: 'saleDate',
    render: (text) => <a>{text.format('DD/MM/YYYY')}</a>
  },
  {
    title: 'Recipient Name',
    dataIndex: 'recipientName',
    key: 'recipientName',
  },
  {
    title: 'Contact',
    dataIndex: 'contact',
    key: 'contact',
  },
  {
    title: 'Payment State',
    dataIndex: 'paymentState',
    key: 'paymentState',
  },
  {
    title: 'Payment Date',
    dataIndex: 'paymentDate',
    key: 'paymentDate',
    render: (text) => <a>{text.format('DD/MM/YYYY')}</a>
  },
];