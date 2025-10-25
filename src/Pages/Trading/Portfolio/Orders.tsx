import React, { useEffect, useState } from 'react';
import {
  Table,
  Input,
  Button,
  Select,
  Card,
  Row,
  Col,
  Divider,
  Tooltip,
  Space
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const Orders: React.FC = () => {
  const initialData: React.SetStateAction<any[]> = [];

  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleSearch = (value: string) => {
    const lower = value.toLowerCase();
    setSearchText(value);
    if (value.trim() === '') {
      setFilteredData(initialData);
    } else {
      const filtered = initialData.filter((item) =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(lower)
        )
      );
      setFilteredData(filtered);
    }
  };

  const handleColumnFilter = (value: string, dataIndex: string) => {
    const newFilters = { ...filters, [dataIndex]: value };
    setFilters(newFilters);

    let updated = initialData;
    Object.keys(newFilters).forEach((key) => {
      const searchValue = newFilters[key].toLowerCase();
      if (searchValue) {
        updated = updated.filter((item) =>
          String(item[key]).toLowerCase().includes(searchValue)
        );
      }
    });

    setFilteredData(updated);
  };

  const mergedRow = {
    key: '0',
    isMergedRow: true,
    symbol: 'No data available in table.',
  };

  const columns = [
    { title: 'Symbol', dataIndex: 'symbol', sorter: (a: any, b: any) => a.symbol.localeCompare(b.symbol) },
    { title: 'Pse Acc ', dataIndex: 'pseAcc', sorter: (a: any, b: any) => a.pseAcc.localeCompare(b.pseAcc) },
    { title: 'Trd Acc ', dataIndex: 'trdAcc', sorter: (a: any, b: any) => a.trdAcc.localeCompare(b.trdAcc) },
    { title: 'Id', dataIndex: 'id', sorter: (a: any, b: any) => a.id.localeCompare(b.id) },
    { title: 'Update Time', dataIndex: 'updateTime', sorter: (a: any, b: any) => a.updateTime.localeCompare(b.updateTime) },
    { title: 'Status', dataIndex: 'status', sorter: (a: any, b: any) => a.status.localeCompare(b.status) },
    { title: 'Qty', dataIndex: 'qty', sorter: (a: any, b: any) => a.qty - b.qty },
    { title: 'Price', dataIndex: 'price', sorter: (a: any, b: any) => a.price - b.price },
    { title: 'Variety', dataIndex: 'variety', sorter: (a: any, b: any) => a.variety.localeCompare(b.variety) },
    { title: 'Trade', dataIndex: 'trade', sorter: (a: any, b: any) => a.trade.localeCompare(b.trade) },
    { title: 'Order', dataIndex: 'order', sorter: (a: any, b: any) => a.order.localeCompare(b.order) },
    { title: 'Product', dataIndex: 'product', sorter: (a: any, b: any) => a.product.localeCompare(b.product) },
    { title: 'Exch', dataIndex: 'exch', sorter: (a: any, b: any) => a.exch.localeCompare(b.exch) },
    { title: 'Trig Prc', dataIndex: 'trigPrc', sorter: (a: any, b: any) => a.trigPrc - b.trigPrc },
    { title: 'Fill Qty', dataIndex: 'fillQty', sorter: (a: any, b: any) => a.fillQty - b.fillQty },
    { title: 'Pend Qty', dataIndex: 'pendQty', sorter: (a: any, b: any) => a.pendQty - b.pendQty },
  ];

  const filterInputRow = (
    <tr>
      {columns.map((col) => {
        const uniqueValues = Array.from(
          new Set(initialData.map((item) => item[col.dataIndex]).filter(Boolean))
        );

        return (
          <th key={col.dataIndex}>
            <Select
              allowClear
              showSearch
              size="small"
              style={{ width: '100%' }}
              placeholder=""
              value={filters[col.dataIndex] || undefined}
              onChange={(value) => handleColumnFilter(value || '', col.dataIndex)}
              filterOption={(input, option) =>
                (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
            >
              {uniqueValues.map((val) => (
                <Option key={val} value={val}>
                  {val}
                </Option>
              ))}
            </Select>
          </th>
        );
      })}
    </tr>
  );

  return (
    <div style={{ padding: 16 }}>
      {/* Top Action Buttons */}
      <Row gutter={[8, 8]} align="middle" wrap={true}>
        <Col>
          <Tooltip title="Order Status">
            <Select defaultValue="ALL" style={{ width: 160 }}>
              <Option value="ALL">ALL</Option>
              <Option value="OPEN">OPEN</Option>
              <Option value="COMPLETE">COMPLETE</Option>
              <Option value="CANCELLED">CANCELLED</Option>
              <Option value="REJECTED">REJECTED</Option>
              <Option value="TRIGGER_PENDING">TRIGGER_PENDING</Option>
              <Option value="UNKNOWN">UNKNOWN</Option>
            </Select>
          </Tooltip>
        </Col>
        
        {[
          { title: "Active", color: "#00b96b" },
          { title: "Inactive", color: "#00b96b" },
          { title: "Reset", color: "#6e6e6e" },
          { title: "Select", color: "#6e6e6e" },
          { title: "Deselect", color: "#6e6e6e" },
          { title: "Modify", color: "#ea9845e9", border: "#ea7e45" },
          { title: "Cancel", color: "#fa0801", border: "#fa0801" }
        ].map((btn, idx) => (
          <Col key={idx}>
            <Tooltip title={btn.title}>
              <Button
                style={{
                  minWidth: 100,
                  backgroundColor: btn.color,
                  borderColor: btn.border || btn.color,
                  color: "#fff"
                }}
              >
                {btn.title}
              </Button>
            </Tooltip>
          </Col>
        ))}
      </Row>

      <Row
        justify="space-between"
        style={{ marginTop: 12, marginBottom: 16, flexWrap: 'wrap' }}
        gutter={[8, 8]}
      >
        <Col xs={24} sm={12} md={12} lg={8}>
          <Space>
            <Button style={{ fontWeight: 'bold', backgroundColor: '#36454F', color: '#fff' }}>Excel</Button>
            <Button style={{ fontWeight: 'bold', backgroundColor: '#36454F', color: '#fff' }}>CSV</Button>
          </Space>
        </Col>
        <Col>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
            value={searchText}
            onChange={e => handleSearch(e.target.value)}
          />
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        bordered
        scroll={{ x: 'max-content' }}
        locale={{
          emptyText: (
            <div
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#3d3d3d',
              }}
            >
              No data available in table
            </div>
          ),
        }}
        components={{
          header: {
            cell: (props: any) => <th {...props} />,
            row: (props: any) => (
              <>
                <tr {...props} />
                {filterInputRow}
              </>
            ),
          },
        }}
      />

      {/* Summary [COUNT] */}
      <Card style={{ marginTop: 24 }}>
        <h3 style={{ color: '#00b2b2', fontWeight: 'bold' }}>ORDERS SUMMARY [COUNT]</h3>
        <Row justify="space-between" gutter={[16, 16]}>
          <Divider />
          <Col xs={24} sm={12} md={6}>
            <div style={{ fontWeight: 'bold', color: '#0080ff' }}>» Open: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
            <div style={{ fontWeight: 'bold', color: '#800080' }}>» Trig Pend: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div style={{ color: '#A52A2A', fontWeight: 'bold' }}>» Rejected: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
            <div style={{ color: '#228B22', fontWeight: 'bold' }}>» Cancelled: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div style={{ color: '#006400', fontWeight: 'bold' }}>» Complete: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
            <div style={{ color: '#00008B', fontWeight: 'bold' }}>» Unknown: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div style={{ fontWeight: 'bold' }}>» Total: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
            <div style={{ fontWeight: 'bold' }}>» Accounts = <span style={{ color: '#0000ff' }}>0</span></div>
          </Col>
        </Row>
      </Card>

      {/* Summary [QUANTITY] */}
      <Card style={{ marginTop: 16 }}>
        <h3 style={{ color: '#A9A9A9', fontWeight: 'bold' }}>ORDERS SUMMARY [QUANTITY]</h3>
        <Row justify="space-between" gutter={[16, 16]}>
          <Divider />
          <Col xs={24} sm={12} md={6}>
            <div style={{ fontWeight: 'bold', color: '#0080ff' }}>» Open: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
            <div style={{ fontWeight: 'bold', color: '#800080' }}>» Trig Pend: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div style={{ color: '#A52A2A', fontWeight: 'bold' }}>» Rejected: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
            <div style={{ color: '#228B22', fontWeight: 'bold' }}>» Cancelled: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div style={{ color: '#006400', fontWeight: 'bold' }}>» Complete: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
            <div style={{ color: '#00008B', fontWeight: 'bold' }}>» Unknown: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div style={{ fontWeight: 'bold' }}>» Total: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
            <div style={{ fontWeight: 'bold' }}>» Accounts = <span style={{ color: '#0000ff' }}>0</span></div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Orders;
