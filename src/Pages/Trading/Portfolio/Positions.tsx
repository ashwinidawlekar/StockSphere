import React, { useState } from 'react';
import {
  Table,
  Input,
  Button,
  Select,
  Row,
  Col,
  Card,
  Tooltip,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const Positions: React.FC = () => {
  const initialData = [
    {
      key: "1",
      m2m: "₹0.00",
      pnl: "₹0.00",
      atpnl: "₹0.00",
      symbol: "",
      realpl: "",
      unrealpl: "",
      netqty: 0,
      ltp: "",
      pseacc: "",
      trdacc: "",
      buyqty: 0,
      sellqty: 0,
      buyval: "₹0.00",
      sellval: "₹0.00",
      netval: "₹0.00",
      bavg: "₹0.00",
      savg: "₹0.00",
      state: "",
      direction: "",
      type: "",
      category: "",
      broker: "",
    },
  ];

  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [filteredData, setFilteredData] = useState(initialData);

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
          String((item as any)[key]).toLowerCase().includes(searchValue)
        );
      }
    });

    setFilteredData(updated);
  };

  const parseCurrency = (val: any): number =>
    parseFloat(String(val).replace(/[^0-9.-]+/g, '')) || 0;

  const columns = [
    { key: 'm2m', title: "M2M", dataIndex: "m2m", width: 100, sorter: (a: any, b: any) => parseCurrency(a.m2m) - parseCurrency(b.m2m), onHeaderCell: () => ({ style: { backgroundColor: '#fffac8' } }) },
    { key: 'pnl', title: "PnL", dataIndex: "pnl", width: 100, sorter: (a: any, b: any) => parseCurrency(a.pnl) - parseCurrency(b.pnl), onHeaderCell: () => ({ style: { backgroundColor: '#fffac8' } }) },
    { key: 'atpnl', title: "AT PnL", dataIndex: "atpnl", width: 100, sorter: (a: any, b: any) => parseCurrency(a.atpnl) - parseCurrency(b.atpnl), onHeaderCell: () => ({ style: { backgroundColor: '#fffac8' } }) },
    { key: 'symbol', title: 'Symbol', dataIndex: "symbol", width: 100, sorter: (a: any, b: any) => String(a.symbol).localeCompare(String(b.symbol)) },
    { key: 'realpl', title: "Real PL", dataIndex: "realpl", width: 100, sorter: (a: any, b: any) => parseCurrency(a.realpl) - parseCurrency(b.realpl) },
    { key: 'unrealpl', title: "Unreal PL", dataIndex: "unrealpl", width: 100, sorter: (a: any, b: any) => parseCurrency(a.unrealpl) - parseCurrency(b.unrealpl) },
    { key: 'netqty', title: "Net Qty", dataIndex: "netqty", width: 100, sorter: (a: any, b: any) => Number(a.netqty) - Number(b.netqty) },
    { key: 'ltp', title: "Ltp", dataIndex: "ltp", width: 100, sorter: (a: any, b: any) => parseCurrency(a.ltp) - parseCurrency(b.ltp) },
    { key: 'buyqty', title: "Buy Qty", dataIndex: "buyqty", width: 100, sorter: (a: any, b: any) => Number(a.buyqty) - Number(b.buyqty) },
    { key: 'sellqty', title: "Sell Qty", dataIndex: "sellqty", width: 100, sorter: (a: any, b: any) => Number(a.sellqty) - Number(b.sellqty) },
    { key: 'buyval', title: "Buy Val", dataIndex: "buyval", width: 100, sorter: (a: any, b: any) => parseCurrency(a.buyval) - parseCurrency(b.buyval) },
    { key: 'sellval', title: "Sell Val", dataIndex: "sellval", width: 100, sorter: (a: any, b: any) => parseCurrency(a.sellval) - parseCurrency(b.sellval) },
    { key: 'netval', title: "Net Val", dataIndex: "netval", width: 100, sorter: (a: any, b: any) => parseCurrency(a.netval) - parseCurrency(b.netval) },
    { key: 'bavg', title: "B Avg Prc", dataIndex: "bavg", width: 100, sorter: (a: any, b: any) => parseCurrency(a.bavg) - parseCurrency(b.bavg) },
    { key: 'savg', title: "S Avg Prc", dataIndex: "savg", width: 100, sorter: (a: any, b: any) => parseCurrency(a.savg) - parseCurrency(b.savg) },
  ];

  const filterInputRow = (
    <tr key="filter-row">
      {columns.map((col) => {
        const uniqueValues = Array.from(
          new Set(initialData.map((item: any) => item[col.dataIndex]))
        );
        return (
          <th key={String(col.dataIndex)}>
            <Select
              allowClear
              showSearch
              size="small"
              style={{ width: '100%' }}
              placeholder=""
              value={filters[col.dataIndex] || undefined}
              onChange={(value) => handleColumnFilter(value || '', col.dataIndex)}
              filterOption={(input, option) =>
                String(option?.children).toLowerCase().includes(input.toLowerCase())
              }
            >
              {uniqueValues.map((val: any) => (
                <Option key={String(val)} value={String(val)}>
                  {String(val)}
                </Option>
              ))}
            </Select>
          </th>
        );
      })}
    </tr>
  );

  return (
    <div style={{ padding: 24 }}>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        bordered
        scroll={{ x: 'max-content' }}
        locale={{ emptyText: '' }}
        components={{
          header: {
            cell: (props: any) => <th {...props} />,
            wrapper: (props: any) => {
              return (
                <thead {...props}>
                  {props.children}
                  {filterInputRow}
                </thead>
              );
            },
          },
          body: {
            wrapper: (props: any) => {
              if (filteredData.length === 0) {
                return (
                  <tbody>
                    <tr>
                      <td
                        colSpan={columns.length}
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          padding: '12px',
                          backgroundColor: '#fafafa',
                        }}
                      >
                        No Data Available in table
                      </td>
                    </tr>
                  </tbody>
                );
              }
              return <tbody {...props} />;
            },
          },
        }}
      />
      <Card
        title={<span style={{ color: "#00968f", fontWeight: "bold" }}>POSITIONS SUMMARY</span>}
        style={{ marginTop: 24, background: "#f4faff", border: "1px solid #d9d9d9" }}
      >
        <Row gutter={[16, 8]}>
          <Col xs={24} sm={12} md={8} lg={4}>
            <div><strong>» M2M</strong> = <strong style={{ color: "#1414d2" }}>0.00</strong></div>
            <div><strong>» PnL</strong> = <strong style={{ color: "#1414d2" }}>0.00</strong></div>
            <div><strong>» AT PnL</strong> = <strong style={{ color: "#1414d2" }}>0.00</strong></div>
          </Col>

          <Col xs={24} sm={12} md={8} lg={4}>
            <div><span style={{ color: "#228B22", fontWeight: "bold" }}>» Long</span> = <strong style={{ color: "#1414d2" }}>0</strong></div>
            <div><span style={{ color: "#8B0000", fontWeight: "bold" }}>» Short</span> = <strong style={{ color: "#1414d2" }}>0</strong></div>
            <div><span style={{ color: "#1c55c0", fontWeight: "bold" }}>» Neutral</span> = <strong style={{ color: "#1414d2" }}>0</strong></div>
          </Col>

          <Col xs={24} sm={12} md={8} lg={4}>
            <div><strong>» Open</strong> = <strong style={{ color: "#1414d2" }}>0</strong></div>
            <div><strong>» Closed</strong> = <strong style={{ color: "#1414d2" }}>0</strong></div>
          </Col>

          <Col xs={24} sm={12} md={8} lg={4}>
            <div><span style={{ color: "#228B22", fontWeight: "bold" }}>» NetQty-L</span> = <strong style={{ color: "#1414d2" }}>0</strong></div>
            <div><span style={{ color: "#8B0000", fontWeight: "bold" }}>» NetQty-S</span> = <strong style={{ color: "#1414d2" }}>0</strong></div>
          </Col>

          <Col xs={24} sm={12} md={8} lg={4}>
            <div><strong>» Total</strong> = <strong style={{ color: "#1414d2" }}>0</strong></div>
            <div><strong>» Accounts</strong> = <strong style={{ color: "#1414d2" }}>0</strong></div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Positions;
