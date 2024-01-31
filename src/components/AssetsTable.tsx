import { Table, TableColumnsType } from "antd";
import { ITableColumn } from "../interfaces/coin-stats.interface.ts";
import { useCrypto } from "../hooks/useCrypto.ts";

const columns: TableColumnsType<ITableColumn> = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend']
    },
    {
        title: 'Price, $',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price,
        defaultSortOrder: 'descend'
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        sorter: (a, b) => a.amount - b.amount,
        defaultSortOrder: 'descend'
    }
];

export default function AssetsTable() {
    const {coinAssets} = useCrypto()
    const data = coinAssets.map((a) => ({
        key: a.id,
        name: a.name,
        price: a.price,
        amount: a.amount
    }))

    return (
        <Table
            pagination={false}
            columns={columns}
            dataSource={data}
        />
    )
}