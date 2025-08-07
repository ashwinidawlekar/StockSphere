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
  Tooltip
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const Orders: React.FC = () => {
  const initialData = [
    
  ];

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
      <Row gutter={[8, 8]} align="middle">
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
        <Col>
          <Tooltip title="Show active orders [OPEN, TRIGGER_PENDING, UNKNOWN]">
            <Button type="primary" style={{ backgroundColor: '#00b96b' }}>Active</Button>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Show inactive orders [COMPLETE, CANCELLED, REJECTED]">
            <Button type="primary" style={{ backgroundColor: '#00b96b' }}>Inactive</Button>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Reset orders filter">
            <Button style={{ backgroundColor: "#6e6e6e", color: "#fff" }}>Reset</Button>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Select all orders">
            <Button style={{ backgroundColor: "#6e6e6e", color: "#fff" }}>Select</Button>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Deselect all orders">
            <Button style={{ backgroundColor: "#6e6e6e", color: "#fff" }}>Deselect</Button>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Modify one or more orders">
            <Button style={{ backgroundColor: '#ea9845e9', borderColor: '#ea7e45', color: '#fff' }}>Modify</Button>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Cancel one or more orders">
            <Button style={{ backgroundColor: '#fa0801', borderColor: '#fa0801', color: '#fff' }}>Cancel</Button>
          </Tooltip>
        </Col>
      </Row>

      {/* Export and Search */}
      <Row justify="space-between" style={{ marginTop: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <Col>
          <Button style={{ fontWeight: 'bold', marginRight: 8, backgroundColor: '#36454F', color: '#fff' }}>Excel</Button>
          <Button style={{ fontWeight: 'bold', marginRight: 8, backgroundColor: '#36454F', color: '#fff' }}>CSV</Button>
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
        <Row justify="space-between">
          <Divider />
          <Col>
            <div style={{ fontWeight: 'bold', color: '#0080ff' }}>» Open: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
            <div style={{ fontWeight: 'bold', color: '#800080' }}>» Trig Pend: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
          </Col>
          <Col>
            <div style={{ color: '#A52A2A', fontWeight: 'bold' }}>» Rejected: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
            <div style={{ color: '#228B22', fontWeight: 'bold' }}>» Cancelled: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
          </Col>
          <Col>
            <div style={{ color: '#006400', fontWeight: 'bold' }}>» Complete: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
            <div style={{ color: '#00008B', fontWeight: 'bold' }}>» Unknown: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
          </Col>
          <Col>
            <div style={{ fontWeight: 'bold' }}>» Total: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
            <div style={{ fontWeight: 'bold' }}>» Accounts = <span style={{ color: '#0000ff' }}>0</span></div>
          </Col>
        </Row>

        <p style={{ color: '#999' }}>
          <span style={{ color: '#007bff' }}>☞</span> Status: [Buy + Sell = Total] <br />
          <span style={{ color: '#007bff' }}>☞</span> Shows order count by status. Buy, sell as well as total order count. <br />
          <span style={{ color: '#007bff' }}>☞</span> Summary is calculated based on filtered (visible) rows only.
        </p>
      </Card>

      {/* Summary [QUANTITY] */}
      <Card style={{ marginTop: 16 }}>
        <h3 style={{ color: '#A9A9A9', fontWeight: 'bold' }}>ORDERS SUMMARY [QUANTITY]</h3>
        <Row justify="space-between">
          <Divider />
          <Col>
            <div style={{ fontWeight: 'bold', color: '#0080ff' }}>» Open: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
            <div style={{ fontWeight: 'bold', color: '#800080' }}>» Trig Pend: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
          </Col>
          <Col>
            <div style={{ color: '#A52A2A', fontWeight: 'bold' }}>» Rejected: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
            <div style={{ color: '#228B22', fontWeight: 'bold' }}>» Cancelled: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
          </Col>
          <Col>
            <div style={{ color: '#006400', fontWeight: 'bold' }}>» Complete: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
            <div style={{ color: '#00008B', fontWeight: 'bold' }}>» Unknown: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
          </Col>
          <Col>
            <div style={{ fontWeight: 'bold' }}>» Total: 0 + 0 = <span style={{ color: '#0000ff' }}>0</span></div>
            <div style={{ fontWeight: 'bold' }}>» Accounts = <span style={{ color: '#0000ff' }}>0</span></div>
          </Col>
        </Row>

        <p style={{ color: '#999' }}>
          <span style={{ color: '#007bff' }}>☞</span> Status : [Buy Qty + Sell Qty = Total Qty] <br />
          <span style={{ color: '#007bff' }}>☞</span> Shows order quantity total by status. Buy, sell as well as total order quantity. <br />
          <span style={{ color: '#007bff' }}>☞</span> Summary is calculated based on filtered (visible) rows only.
        </p>
      </Card>
    </div>
  );
};

export default Orders;
