import { TableProps } from "antd";

export interface IProp<T> {
  columns: TableProps<T>['columns']
  data: T[]
  onClickRow: (record: TableProps<T>) => void
  handlePageChange: (page: number, pageSize: number) => void
  totalCount: number
}