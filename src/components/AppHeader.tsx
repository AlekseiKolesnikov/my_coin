import {Button, Layout, Select, Space} from "antd";
import {useCrypto} from "../hooks/useCrypto.ts";

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
    const {coinStats} = useCrypto()

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{width: '250px'}}
                value={['press / to open']}
                optionLabelProp="label"
                options={coinStats.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/>
                        {option.data.label}
                    </Space>
                )}
            />
            <Button type="primary">Add Asset</Button>
        </Layout.Header>
    )
}