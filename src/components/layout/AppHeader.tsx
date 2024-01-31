import { Button, Drawer, Layout, Modal, Select, Space } from "antd";
import { useCrypto } from "../../hooks/useCrypto.ts";
import { useEffect, useState } from "react";
import CoinInfoModal from "../CoinInfoModal.tsx";
import { ICoinStatsApi } from "../../interfaces/coin-stats.interface.ts";
import { AddAssetForm } from "../AddAssetForm.tsx";

const headerStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

export default function AppHeader() {
    const [select, setSelect] = useState(false)
    const [modal, setModal] = useState(false)
    const [drawer, setDrawer] = useState(false)
    const [coin, setCoin] = useState<ICoinStatsApi | null>(null)
    const { coinStats } = useCrypto()

    useEffect(() => {
        const keypress = (event: KeyboardEvent) => {
            if (event.key === "/") {
                setSelect((prev) => !prev)
            }
        }
        document.addEventListener('keypress', keypress)
        return () => document.removeEventListener('keypress', keypress)
    }, [])
    const handelSelect = (value: string) => {
        const coin = coinStats.find((c: ICoinStatsApi) => c.id === value);
        if (coin) {
            setCoin(coin);
            setModal(true);
        } else {
            console.error('Coin not found');
        }
    }

    return (
        <Layout.Header style={headerStyle}>
            <Select
                open={select}
                onSelect={handelSelect}
                onClick={() => setSelect((prev) => !prev)}
                style={{ width: '250px' }}
                value={['press / to open']}
                optionLabelProp="label"
                options={coinStats.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label}/>
                        {option.data.label}
                    </Space>
                )}
            />
            <Button
                type="primary"
                onClick={() => setDrawer(true)}
            >
                Add Asset
            </Button>
            <Modal open={modal}
                   onOk={() => setModal(false)}
                   onCancel={() => setModal(false)}
                   footer={null}
            >
                <CoinInfoModal coin={coin}/>
            </Modal>
            <Drawer
                destroyOnClose
                width={600}
                title="Add Asset"
                onClose={() => setDrawer(false)}
                open={drawer}>
                <AddAssetForm onClose={() => {
                    setDrawer(false)
                }}/>
            </Drawer>
        </Layout.Header>
    )
}