import React from 'react';
import { Table, TableProps } from 'antd';
import { IProp } from './_type';


export default function DataTable<T>({ columns, data, onClickRow }: IProp<T>) {
    return (
        <>
            <Table<T>
                columns={columns}
                dataSource={data}
                style={{width: "100%"}}
                onRow={(record) => {
                    return {
                      onClick: () => onClickRow(record as TableProps<T>),
                    };
                  }}
            />
        </>
    );
};