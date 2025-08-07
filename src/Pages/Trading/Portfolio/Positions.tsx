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
      netval: "",
      bavg: "",
      savg: "",
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
          String(item[key]).toLowerCase().includes(searchValue)
        );
      }
    });

    setFilteredData(updated);
  };

  const parseCurrency = (val: string): number =>
    parseFloat(val.replace(/[^0-9.-]+/g, '')) || 0;

  const columns = [
    {
      title: "M2M",
      dataIndex: "m2m",
      width: 100,
      sorter: (a, b) => parseCurrency(a.m2m) - parseCurrency(b.m2m),
      onHeaderCell: () => ({ style: { backgroundColor: '#fffac8' } }),
    },
    {
      title: "PnL",
      dataIndex: "pnl",
      width: 100,
      sorter: (a, b) => parseCurrency(a.pnl) - parseCurrency(b.pnl),
      onHeaderCell: () => ({ style: { backgroundColor: '#fffac8' } }),
    },
    {
      title: "AT PnL",
      dataIndex: "atpnl",
      width: 100,
      sorter: (a, b) => parseCurrency(a.atpnl) - parseCurrency(b.atpnl),
      onHeaderCell: () => ({ style: { backgroundColor: '#fffac8' } }),
    },
    {
      title: 'Symbol',
      dataIndex: "symbol",
      width: 100,
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
    },
    {
      title: "Real PL",
      dataIndex: "realpl",
      width: 100,
      sorter: (a, b) => parseCurrency(a.realpl) - parseCurrency(b.realpl),
    },
    {
      title: "Unreal PL",
      dataIndex: "unrealpl",
      width: 100,
      sorter: (a, b) => parseCurrency(a.unrealpl) - parseCurrency(b.unrealpl),
    },
    {
      title: "Net Qty",
      dataIndex: "netqty",
      width: 100,
      sorter: (a, b) => a.netqty - b.netqty,
    },
    {
      title: "Ltp",
      dataIndex: "ltp",
      width: 100,
      sorter: (a, b) => parseCurrency(a.ltp) - parseCurrency(b.ltp),
    },
    {
      title: "Buy Qty",
      dataIndex: "buyqty",
      width: 100,
      sorter: (a, b) => a.buyqty - b.buyqty,
    },
    {
      title: "Sell Qty",
      dataIndex: "sellqty",
      width: 100,
      sorter: (a, b) => a.sellqty - b.sellqty,
    },
    {
      title: "Buy Val",
      dataIndex: "buyval",
      width: 100,
      sorter: (a, b) => parseCurrency(a.buyval) - parseCurrency(b.buyval),
    },
    {
      title: "Sell Val",
      dataIndex: "sellval",
      width: 100,
      sorter: (a, b) => parseCurrency(a.sellval) - parseCurrency(b.sellval),
    },
    {
      title: "Net Val",
      dataIndex: "netval",
      width: 100,
      sorter: (a, b) => a.netval - b.netval,
    },
    {
      title: "B Avg Prc",
      dataIndex: "bavg",
      width: 100,
      sorter: (a, b) => a.bavg - b.bavg,
    },
    {
      title: "S Avg Prc",
      dataIndex: "savg",
      width: 100,
      sorter: (a, b) => a.savg - b.savg,
    },
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
    <div style={{ padding: 24 }}>
      {/* Dropdown + Buttons */}
      <Row gutter={[8, 8]} align="middle" style={{ marginBottom: 8 }}>
        <Col>
          <Tooltip title="Category Of Positions (Keep it NET, if you are not sure)">
            <Select defaultValue="NET" style={{ width: 120 }}>
              <Option value="NET">NET</Option>
              <Option value="DAY">DAY</Option>
            </Select>
          </Tooltip>
        </Col>

        <Col>
          <Tooltip title="Position State">
            <Select defaultValue="ALL" style={{ width: 120 }}>
              <Option value="ALL">ALL</Option>
              <Option value="OPEN">OPEN</Option>
              <Option value="CLOSED">CLOSED</Option>
            </Select>
          </Tooltip>
        </Col>

        <Col>
          <Tooltip title="Position Direction">
            <Select defaultValue="ALL" style={{ width: 120 }}>
              <Option value="ALL">ALL</Option>
              <Option value="LONG">LONG</Option>
              <Option value="SHORT">SHORT</Option>
              <Option value="NEUTRAL">NEUTRAL</Option>
            </Select>
          </Tooltip>
        </Col>

        <Col>
          <Tooltip title="Reset Positions Filter">
            <Button style={{ backgroundColor: "#6e6e6e", color: "#fff" }} onClick={() => console.log("Reset clicked")}>
              Reset
            </Button>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Select all positions">
            <Button style={{ backgroundColor: "#6e6e6e", color: "#fff" }} onClick={() => console.log("Select clicked")}>
              Select
            </Button>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Deselect all positions">
            <Button style={{ backgroundColor: "#6e6e6e", color: "#fff" }} onClick={() => console.log("Deselect clicked")}>
              Deselect
            </Button>
          </Tooltip>
        </Col>

        <Col><Button style={{ background: "#f77d5c", color: "#fff" }}>Sq. Pos. Mkt.</Button></Col>
        <Col><Button style={{ background: "#f77d5c", color: "#fff" }}>Sq. Pos.</Button></Col>
        <Col><Button style={{ background: "#f77d5c", color: "#fff" }}>Sq. Acc.</Button></Col>
      </Row>

      {/* Search and Export */}
      <Row justify="space-between" style={{ marginTop: 12, marginBottom: 16 }}>
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

      {/* Table */}
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
            row: (props: any) => (
              <>
                <tr {...props} />
                {filterInputRow}
              </>
            ),
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

      {/* POSITIONS SUMMARY */}
      <Card
        title={<span style={{ color: "#00968f", fontWeight: "bold" }}>POSITIONS SUMMARY</span>}
        style={{ marginTop: 24, background: "#f4faff", border: "1px solid #d9d9d9" }}
      >
        <Row gutter={[16, 8]}>
          <Col span={4}>
            <div><strong>» M2M</strong> = <strong style={{ color: "#1414d2" }}>0.00</strong></div>
            <div><strong>» PnL</strong> = <strong style={{ color: "#1414d2" }}>0.00</strong></div>
            <div><strong>» AT PnL</strong> = <strong style={{ color: "#1414d2" }}>0.00</strong></div>
          </Col>

          <Col span={4}>
            <div><span style={{ color: "#228B22", fontWeight: "bold" }}>» Long</span> = <strong style={{ color: "#1414d2" }}>0</strong></div>
            <div><span style={{ color: "#8B0000", fontWeight: "bold" }}>» Short</span> = <strong style={{ color: "#1414d2" }}>0</strong></div>
            <div><span style={{ color: "#1c55c0", fontWeight: "bold" }}>» Neutral</span> = <strong style={{ color: "#1414d2" }}>0</strong></div>
          </Col>

          <Col span={4}>
            <div><strong>» Open</strong> = <strong style={{ color: "#1414d2" }}>0</strong></div>
            <div><strong>» Closed</strong> = <strong style={{ color: "#1414d2" }}>0</strong></div>
          </Col>

          <Col span={4}>
            <div><span style={{ color: "#228B22", fontWeight: "bold" }}>» NetQty-L</span> = <strong style={{ color: "#1414d2" }}>0</strong></div>
            <div><span style={{ color: "#8B0000", fontWeight: "bold" }}>» NetQty-S</span> = <strong style={{ color: "#1414d2" }}>0</strong></div>
          </Col>

          <Col span={4}>
            <div><strong>» Total</strong> = <strong style={{ color: "#1414d2" }}>0</strong></div>
            <div><strong>» Accounts</strong> = <strong style={{ color: "#1414d2" }}>0</strong></div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Positions;
