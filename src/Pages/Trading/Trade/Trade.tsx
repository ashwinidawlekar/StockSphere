import React from 'react'
import {
    Form,
    Radio,
    Select,
    Input,
    InputNumber,
    Tooltip,
    Checkbox,
    Switch,
    Button,
    Typography,
    Space,
    Row,
    Col,
    Divider,
} from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { httpClient } from '../../../Services/apiService'

const { Option } = Select

const Trade: React.FC = () => {
    const [form] = Form.useForm()

    const handleSubmit = async (values: any) => {
        const payload = {
            pseudoAccount: '53135052',
            tradeType: values.side,
            orderType: values.priceType,
            productType: values.product,
            quantity: values.quantity?.toString(),
            price: values.price?.toString(),
            triggerPrice: values.triggerPrice?.toString() || '0',
            exchange: values.exchange,
            symbol: values.symbol,
        }

        try {
            const data = await httpClient('/api/trading/placeRegularOrder', {
                method: 'POST',
                params: payload,
                headers: {
                    'api-key': 'f0a63155-883b-4fb5-b73f-8fefe03f4e4d',
                },
            })
            console.log('API Response:', data)
        } catch (err) {
            console.error('API Error:', err)
        }
    }

    const handleReset = () => {
        form.resetFields()
    }

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'top',
                justifyContent: 'center',
                background: '#f0f2f5',
                paddingTop: '20px',
            }}
        >
            <div
                style={{
                    width: 1000,
                    background: '#f6ffed',
                    padding: 16,
                    borderRadius: 10,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        exchange: 'NSE',
                        side: 'BUY',
                        orderType: 'REGULAR',
                        product: 'INTRADAY',
                        priceType: 'LIMIT',
                        timeInForce: 'DAY',
                        quantity: 1,
                        disclosedQty: 0,
                        price: '0',
                        triggerPrice: '0',
                    }}
                    onFinish={handleSubmit}
                >
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <Row gutter={[8, 8]}>
                                {/* Row 1: BUY / SELL */}
                                <Col span={24}>
                                    <Form.Item
                                        name="side"
                                        style={{ marginBottom: 0 }}
                                    >
                                        <Radio.Group size="small">
                                            <Radio value="BUY">BUY</Radio>
                                            <Radio value="SELL">SELL</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>

                                {/* Row 2: Order Type */}
                                <Col span={24}>
                                    <Form.Item
                                        name="orderType"
                                        label="Order Type"
                                        style={{ marginBottom: 0 }}
                                    >
                                        <Radio.Group size="small">
                                            <Radio value="REGULAR">REGULAR</Radio>
                                            <Radio value="BO">BO</Radio>
                                            <Radio value="CO">CO</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>

                                {/* Row 3: Exchange and Symbol with Labels */}
                                <Col span={6}>
                                    <Form.Item
                                        name="exchange"
                                        label="Exchange"
                                        style={{ marginBottom: 0 }}
                                    >
                                        <Select size="small" style={{ width: '100%' }}>
                                            <Option value="NSE">NSE</Option>
                                            <Option value="BSE">BSE</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col span={18}>
                                    <Form.Item
                                        name="symbol"
                                        label="Symbol"
                                        rules={[{ required: true, message: 'Enter symbol' }]}
                                        style={{ marginBottom: 0 }}
                                    >
                                        <Input
                                            size="small"
                                            placeholder="e.g. SBIN"
                                            suffix={
                                                <Tooltip title="Use strike, expiry, call/put">
                                                    <InfoCircleOutlined />
                                                </Tooltip>
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>

                        <Col span={24}>
                            <Space wrap>
                                <Form.Item name="product" style={{ marginBottom: 0 }}>
                                    <Radio.Group size="small">
                                        <Radio value="INTRADAY">INTRADAY</Radio>
                                        <Radio value="DELIVERY">DELIVERY</Radio>
                                        <Radio value="NORMAL">NORMAL</Radio>
                                        <Radio value="MTF">MTF</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item name="priceType" style={{ marginBottom: 0 }}>
                                    <Radio.Group size="small">
                                        <Radio value="LIMIT">LIMIT</Radio>
                                        <Radio value="MARKET">MARKET</Radio>
                                        <Radio value="SL">STOP_LOSS</Radio>
                                        <Radio value="SL_MARKET">SL_MARKET</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Space>
                        </Col>

                        <Col span={6}>
                            <Form.Item
                                label="Qty"
                                name="quantity"
                                style={{ marginBottom: 8 }}
                            >
                                <InputNumber size="small" min={1} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item label="Price" name="price" style={{ marginBottom: 8 }}>
                                <Input size="small" />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item
                                label="Trig. Price"
                                name="triggerPrice"
                                style={{ marginBottom: 8 }}
                            >
                                <Input disabled size="small" />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item
                                label="Disclosed Qty."
                                name="disclosedQty"
                                style={{ marginBottom: 8 }}
                            >
                                <InputNumber size="small" min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="[53135052] selected"
                                style={{ marginBottom: 8 }}
                            >
                                <Input value="53135052 : 53135052" disabled size="small" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Space>
                                <Form.Item name="timeInForce" style={{ marginBottom: 0 }}>
                                    <Radio.Group size="small">
                                        <Radio value="DAY">DAY</Radio>
                                        <Radio value="IOC">IOC</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item
                                    name="amo"
                                    valuePropName="checked"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Checkbox>AMO</Checkbox>
                                </Form.Item>
                            </Space>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Split Order"
                                name="split"
                                style={{ marginBottom: 8 }}
                            >
                                <Radio.Group size="small">
                                    <Radio value="NO">NO</Radio>
                                    <Radio value="AUTO">AUTO</Radio>
                                    <Radio value="QTY">QTY</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Space wrap>
                                <Form.Item
                                    label="Group Acc"
                                    name="groupAcc"
                                    valuePropName="checked"
                                >
                                    <Switch size="small" />
                                </Form.Item>

                                <Form.Item
                                    label="Diff. Qty."
                                    name="diffQty"
                                    valuePropName="checked"
                                >
                                    <Switch size="small" />
                                </Form.Item>

                                <Form.Item
                                    label="Multiplier"
                                    name="multiplier"
                                    valuePropName="checked"
                                >
                                    <Switch size="small" />
                                </Form.Item>
                            </Space>
                        </Col>

                        <Col span={24}>
                            <Divider style={{ margin: '8px 0' }} />
                            <Space>
                                <Button type="primary" htmlType="submit" size="small">
                                    BUY
                                </Button>
                                <Button htmlType="button" onClick={handleReset} size="small">
                                    Reset
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default Trade
