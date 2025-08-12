import React, { useEffect, useState } from 'react';
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
  Space,
  Row,
  Col,
  Divider,
  Modal,
  Table,
} from 'antd';
import { useWatch } from 'antd/es/form/Form';
import { InfoCircleOutlined, FileTextOutlined } from '@ant-design/icons';

const { Option } = Select;

const Trade: React.FC = () => {
  const [form] = Form.useForm();
  const side = useWatch('side', form);
  const orderType = useWatch('orderType', form);
  const product = useWatch('product', form);
  const priceType = useWatch('priceType', form);
  const splitType = useWatch('split', form);

  const [disablePrice, setDisablePrice] = useState(false);
  const [disableTrigPrice, setDisableTrigPrice] = useState(false);
  const [isRecentModalOpen, setIsRecentModalOpen] = useState(false);
  const [recentSymbols, setRecentSymbols] = useState<
    { key: string; symbol: string; exch: string }[]
  >([]); 

  const handleSubmit = (values: any) => {
    console.log('Submitted:', values);
  };

  const handleReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    let priceDisabled = false;
    let trigDisabled = false;

    if (orderType === 'BO' && product === 'INTRADAY') {
      switch (priceType) {
        case 'LIMIT':
          trigDisabled = true;
          priceDisabled = false;
          break;
        case 'MARKET':
          trigDisabled = true;
          priceDisabled = true;
          break;
        case 'STOP_LOSS':
          trigDisabled = false;
          priceDisabled = false;
          break;
        case 'SL_MARKET':
          trigDisabled = false;
          priceDisabled = true;
          break;
        default:
          break;
      }
    } else if (orderType === 'REGULAR') {
      switch (priceType) {
        case 'LIMIT':
          trigDisabled = true;
          priceDisabled = false;
          break;
        case 'MARKET':
          trigDisabled = true;
          priceDisabled = true;
          break;
        case 'STOP_LOSS':
          trigDisabled = false;
          priceDisabled = false;
          break;
        case 'SL_MARKET':
          trigDisabled = false;
          priceDisabled = true;
          break;
        default:
          break;
      }
    } else if (orderType === 'CO') {
      switch (priceType) {
        case 'LIMIT':
          trigDisabled = false;
          priceDisabled = false;
          break;
        case 'MARKET':
          trigDisabled = false;
          priceDisabled = true;
          break;
        default:
          break;
      }
    }

    setDisablePrice(priceDisabled);
    setDisableTrigPrice(trigDisabled);
  }, [orderType, product, priceType]);

  const recentCols = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      sorter: (a: any, b: any) => a.symbol.localeCompare(b.symbol),
    },
    {
      title: 'Exch',
      dataIndex: 'exch',
      key: 'exch',
      sorter: (a: any, b: any) => a.exch.localeCompare(b.exch),
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#f0f2f5',
        padding: '20px 0',
        minHeight: '50vh',
      }}
    >
      <div
        style={{
          background: side === 'SELL' ? '#fff1f0' : '#f6ffed',
          padding: 16,
          borderRadius: 10,
          width: 1000,
          border: side === 'SELL' ? '2px solid #ffa39e' : '2px solid #80EF80',
          boxShadow:
            side === 'SELL'
              ? '0 0 12px 4px #ffa39e'
              : '0 0 12px 4px #80EF80',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            side: 'BUY',
            orderType: 'REGULAR',
            product: 'INTRADAY',
            priceType: 'LIMIT',
            exchange: 'NSE',
            quantity: 1,
            price: '0',
            triggerPrice: '0',
            disclosedQty: '0',
            timeInForce: 'DAY',
            split: 'NO',
          }}
          onFinish={handleSubmit}
        >
          <Row gutter={[12, 8]}>
            {/* BUY / SELL */}
            <Col span={24}>
              <Form.Item name="side" style={{ marginBottom: 0 }}>
                <Radio.Group size="small">
                  <Radio value="BUY">BUY</Radio>
                  <Radio value="SELL">SELL</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* Order Type */}
            <Col span={6}>
              <Form.Item name="orderType" style={{ marginBottom: 0 }}>
                <Radio.Group size="small">
                  <Tooltip title="Regular Order">
                    <Radio value="REGULAR">REGULAR</Radio>
                  </Tooltip>
                  <Tooltip title="Bracket Order">
                    <Radio value="BO">BO</Radio>
                  </Tooltip>
                  <Tooltip title="Cover Order">
                    <Radio value="CO">CO</Radio>
                  </Tooltip>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* File icon opens Recent Symbols modal */}
            <Col span={2}>
              <Button
                icon={<FileTextOutlined style={{ fontSize: '32px', color: '#1890ff' }} />}
                size="large"
                type="text"
                onClick={() => {
                  setIsRecentModalOpen(true);
                }}
              />
            </Col>

            {/* Exchange */}
            <Col span={4}>
              <Form.Item name="exchange" style={{ marginBottom: 0 }}>
                <Select size="large">
                  <Option value="NSE">NSE</Option>
                  <Option value="BSE">BSE</Option>
                  <Option value="MCX">MCX</Option>
                </Select>
              </Form.Item>
            </Col>

            {/* Symbol */}
            <Col span={12}>
              <Form.Item
                name="symbol"
                rules={[{ required: true, message: 'Enter symbol' }]}
                style={{ marginBottom: 0 }}
              >
                <Input
                  size="large"
                  placeholder="Symbol"
                  suffix={
                    <Tooltip title="Search using instrument symbol...(use words like 'future','call','put' or enter strike price for options">
                      <InfoCircleOutlined />
                    </Tooltip>
                  }
                />
              </Form.Item>
            </Col>

            {/* Product */}
            <Col span={12}>
              <Form.Item name="product" style={{ marginBottom: 0 }}>
                <Radio.Group size="small">
                  <Radio value="INTRADAY">INTRADAY</Radio>
                  <Tooltip title="Delivery position in STOCKS">
                  <Radio value="DELIVERY" disabled={orderType === 'CO' || orderType === 'BO'}>
                    DELIVERY
                  </Radio>
                  </Tooltip>
                  <Tooltip title="Carry forward positions in DERIVATIVES">
                  <Radio value="NORMAL" disabled={orderType === 'CO' || orderType === 'BO'}>
                    NORMAL
                  </Radio>
                  </Tooltip>
                  <Tooltip title="Margin Trading Facility(MTF)">
                  <Radio value="MTF" disabled={orderType === 'CO' || orderType === 'BO'}>
                    MTF
                  </Radio>
                  </Tooltip>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* Price Type */}
            <Col span={12}>
              <Form.Item name="priceType" style={{ marginBottom: 0 }}>
                <Radio.Group size="small">
                  <Radio value="LIMIT">LIMIT</Radio>
                  <Radio value="MARKET">MARKET</Radio>
                  <Radio value="STOP_LOSS" disabled={orderType === 'CO'}>
                    STOP_LOSS
                  </Radio>
                  <Radio value="SL_MARKET" disabled={orderType === 'CO'}>
                    SL_MARKET
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* Qty */}
            <Col span={4}>
              <Form.Item label="Qty" name="quantity">
                <InputNumber
                  size="large"
                  min={1}
                  controls={false}
                  style={{ width: '100%' }}
                  addonBefore={
                    <Button
                      size="small"
                      onClick={() => {
                        const current = form.getFieldValue('quantity') || 1;
                        form.setFieldsValue({ quantity: Math.max(1, current - 1) });
                      }}
                    >
                      −
                    </Button>
                  }
                  addonAfter={
                    <Button
                      size="small"
                      onClick={() => {
                        const current = form.getFieldValue('quantity') || 1;
                        form.setFieldsValue({ quantity: current + 1 });
                      }}
                    >
                      +
                    </Button>
                  }
                />
              </Form.Item>
            </Col>

            {/* Price */}
            <Col span={4}>
              <Form.Item label="Price" name="price">
                <Input size="large" prefix="₹" disabled={disablePrice} />
              </Form.Item>
            </Col>

            {/* Trigger Price */}
            <Col span={4}>
              <Form.Item label="Trig. Price" name="triggerPrice">
                <Input size="large" prefix="₹" disabled={disableTrigPrice} />
              </Form.Item>
            </Col>

            {/* Disclosed Qty */}
            <Col span={4}>
              <Form.Item label="Disclosed Qty." name="disclosedQty">
                <InputNumber size="large" min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            {/* Accounts */}
            <Col span={8}>
              <Tooltip title="Select accounts (Hold <Strl> or <Shift> to select multiple. <Ctrl + a> to select all"> 
              <Form.Item label="Accounts">
                <Input value="" size="large" />
              </Form.Item>
              </Tooltip>
            </Col>

            {/* BO Fields */}
            {orderType === 'BO' && (
              <>
                <Col span={4}>
                  <Form.Item label="Target" name="Target">
                    <InputNumber size="large" min={0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Stoploss" name="Stoploss">
                    <InputNumber size="large" min={0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Trail. Stoploss" name="Trail. Stoploss">
                    <InputNumber size="large" min={0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </>
            )}

            {/* Time in Force + AMO */}
            <Col span={12}>
              <Space>
                <Form.Item name="timeInForce" style={{ marginBottom: 0 }}>
                  <Radio.Group size="small">
                    <Radio value="DAY" disabled={orderType === 'CO' || orderType === 'BO'}>
                      DAY
                    </Radio>
                    <Radio value="IOC" disabled={orderType === 'CO' || orderType === 'BO'}>
                      IOC
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name="amo" valuePropName="checked" style={{ marginBottom: 0 }}>
                  <Checkbox>AMO</Checkbox>
                </Form.Item>
              </Space>
            </Col>

            {/* Switches */}
            <Col span={4}>
              <Form.Item label="Group Acc" name="groupAcc" valuePropName="checked">
                <Switch style={{ transform: 'scale(1.5)' }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Diff. Qty." name="diffQty" valuePropName="checked">
                <Switch style={{ transform: 'scale(1.5)' }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Multiplier" name="multiplier" valuePropName="checked">
                <Switch style={{ transform: 'scale(1.5)' }} />
              </Form.Item>
            </Col>

            {/* Split Order */}
            <Col span={24}>
              <Form.Item label="Split Order" name="split">
                <Radio.Group size="small">
                  <Tooltip title="Do not split the order">
                    <Radio value="NO">NO</Radio>
                  </Tooltip>
                  <Tooltip title="Split order using quantity freeze limit">
                    <Radio value="AUTO">AUTO</Radio>
                  </Tooltip>
                  <Tooltip title="Split order as per quantity specified by order">
                    <Radio value="QTY">QTY</Radio>
                  </Tooltip>
                </Radio.Group>
              </Form.Item>
              {['REGULAR', 'BO', 'CO'].includes(orderType) && splitType === 'QTY' && (
                <Form.Item label="Split Qty." name="splitQty" style={{ marginTop: 8 }}>
                  <InputNumber size="large" min={0} style={{ width: 200 }} />
                </Form.Item>
              )}
            </Col>

            {/* Buttons */}
            <Col span={24}>
              <Divider style={{ margin: '8px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Space>
                  <Button type="primary" htmlType="submit" size="small" danger={side === 'SELL'}>
                    {side === 'SELL' ? 'SELL' : 'BUY'}
                  </Button>
                  <Button htmlType="button" onClick={handleReset} size="small">
                    Reset
                  </Button>
                </Space>
              </div>
            </Col>
          </Row>
        </Form>
      </div>

      <Modal
        title="Recent Symbols"
        open={isRecentModalOpen}
        onCancel={() => setIsRecentModalOpen(false)}
        footer={[
          <Button
            key="cancel"
            type="primary"
            style={{ background: '#07b08a', borderColor: '#07b08a' }}
            onClick={() => setIsRecentModalOpen(false)}
          >
            Cancel
          </Button>,
        ]}
        centered
        width={600}
        maskClosable={false}
        bodyStyle={{
          minHeight: 400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      > 
        <div style={{ flex: 1 }}>
          <Table
            columns={recentCols}
            dataSource={recentSymbols}
            pagination={false}
            locale={{ emptyText: 'No data available in table' }}
            rowKey="key"
          />
        </div>
        <div style={{ textAlign: 'left', marginTop: 8 }}>
          Showing 0 to 0 of 0 entries
        </div>
      </Modal>

    </div>
  );
};

export default Trade;
