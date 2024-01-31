import { useRef, useState } from "react";
import { Button, DatePicker, Divider, Form, InputNumber, Result, Select, Space, Typography, } from "antd";
import { useCrypto } from "../hooks/useCrypto.ts";
import { IAsset, ICoinStatsApi } from "../interfaces/coin-stats.interface.ts";
import { CoinInfo } from "./CoinInfo.tsx";

export const AddAssetForm = ({ onClose }: { onClose: () => void }) => {
    const [form] = Form.useForm();
    const [coin, setCoin] = useState<ICoinStatsApi | null>(null);
    const { coinStats } = useCrypto();
    const [submitted, setSubmitted] = useState(false);
    const assetRef = useRef<IAsset>()

    const handelSelect = (value: string) => {
        const coin = coinStats.find((c: ICoinStatsApi) => c.id === value);
        if (coin) {
            setCoin(coin);
        } else {
            console.error("Coin not found");
        }
    };

    if (!coin) {
        return (
            <Select
                onSelect={handelSelect}
                placeholder="Select coin"
                style={{ width: "100%" }}
                value={["press / to open"]}
                optionLabelProp="label"
                options={coinStats.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img
                            style={{ width: 20 }}
                            src={option.data.icon}
                            alt={option.data.label}
                        />
                        {option.data.label}
                    </Space>
                )}
            />
        );
    }

    if (submitted) {
        return (
            <Result
                status="success"
                title="New Asset Added"
                subTitle={`Added ${assetRef.current?.amount} of ${coin.name} by price ${assetRef.current?.price}`}
                extra={[
                    <Button
                        type="primary"
                        key="console"
                        onClick={onClose}
                    >
                        Close
                    </Button>,
                ]}
            />
        );
    }

    const handelAmountChange = (value: number | null) => {
        const price = form.getFieldValue("price");
        if (value) {
            form.setFieldsValue({
                total: +(value * price).toFixed(2),
            });
        }
    };

    const handelPriceChange = (value: number | null) => {
        const amount = form.getFieldValue("amount");
        if (value) {
            form.setFieldsValue({
                total: +(value * amount).toFixed(2),
            });
        }
    };

    const onFinish = (values: IAsset) => {
        assetRef.current = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: new Date()
        }
        setSubmitted(true)
    };

    const validateMessages = {
        required: "${label} is required!",
        types: {
            number: "${label} is not valid number",
        },
        number: {
            range: "${label} must be between ${min} and ${max}",
        },
    };

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 10 }}
            style={{ maxWidth: 600 }}
            initialValues={{
                price: +coin.price.toFixed(2),
            }}
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
            <Typography.Title level={2} style={{ margin: 0 }}>
                <CoinInfo coin={coin} withSymbol/>
                <Divider/>

                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            type: "number",
                            min: 0,
                        },
                    ]}
                >
                    <InputNumber
                        onChange={handelAmountChange}
                        placeholder="Enter coin amount"
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item label="Price" name="price">
                    <InputNumber onChange={handelPriceChange} style={{ width: "100%" }}/>
                </Form.Item>

                <Form.Item label="Date & Time" name="date">
                    <DatePicker showTime/>
                </Form.Item>

                <Form.Item label="Total" name="total">
                    <InputNumber disabled style={{ width: "100%" }}/>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Add Asset
                    </Button>
                </Form.Item>
            </Typography.Title>
        </Form>
    );
}
