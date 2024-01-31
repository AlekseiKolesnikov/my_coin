import { Layout, Typography } from "antd";
import { useCrypto } from "../../hooks/useCrypto.ts";
import PortfolioChart from "../PortfolioChart.tsx";
import AssetsTable from "../AssetsTable.tsx";

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem'
};

export default function AppContent() {
    const { coinAssets, coinStats } = useCrypto()

    const cryptoPriceMap = coinStats.reduce<Record<string, number>>((acc, c) => {
        acc[c.id] = c.price
        return acc
    }, {})
    return (
        <Layout.Content style={contentStyle}>
            <Typography.Title level={3} style={{ textAlign: 'left', color: "white" }}>
                Portfolio: {' '}
                ${coinAssets
                .map((asset) => asset.amount * cryptoPriceMap[asset.id])
                .reduce((acc, v) => acc + (v ? v : 0), 0).toFixed(2)}
            </Typography.Title>
            <PortfolioChart/>
            <AssetsTable/>
        </Layout.Content>
    )
}