import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Select,
  Row,
  Col,
  Card,
  Tooltip,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const greyBtn = { background: "#6e6e6e", color: "#fff" };
const orangeBtn = { background: "#ff8c5a", color: "#fff" };

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
      buyqty: 0,
      sellqty: 0,
      buyval: "₹0.00",
      sellval: "₹0.00",
      netval: "₹0.00",
      bavg: "₹0.00",
      savg: "₹0.00",
    },
  ];

  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [filteredData, setFilteredData] = useState(initialData);

  const [netType, setNetType] = useState("NET");
  const [openType, setOpenType] = useState("ALL");
  const [positionType, setPositionType] = useState("ALL");

  const handleSearch = (value: string) => {
    setSearchText(value);
    if (!value) {
      setFilteredData(initialData);
      return;
    }
    const lower = value.toLowerCase();
    setFilteredData(
      initialData.filter((item) =>
        Object.values(item).some((v) =>
          String(v).toLowerCase().includes(lower)
        )
      )
    );
  };

  const handleColumnFilter = (value: string, key: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    let data = initialData;
    Object.keys(newFilters).forEach((k) => {
      if (newFilters[k]) {
        data = data.filter((row: any) =>
          String(row[k]).toLowerCase().includes(newFilters[k].toLowerCase())
        );
      }
    });
    setFilteredData(data);
  };

  const parseCurrency = (val: any) =>
    parseFloat(String(val).replace(/[^0-9.-]+/g, "")) || 0;

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

  const filterRow = (
    <tr>
      {columns.map((col) => (
        <th key={col.dataIndex}>
          <Select
            allowClear
            size="small"
            style={{ width: "100%" }}
            value={filters[col.dataIndex]}
            onChange={(v) => handleColumnFilter(v || "", col.dataIndex)}
          />
        </th>
      ))}
    </tr>
  );

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={10} align="middle" style={{ marginBottom: 10 }}>
        <Col>
          <Tooltip title="Category Of Positions (Keep it NET, if you are not sure)">
            <Select value={netType} style={{ width: 90 }} onChange={setNetType}>
              <Option value="DAY">DAY</Option>
              <Option value="NET">NET</Option>
            </Select>
          </Tooltip>
        </Col>

        <Col>
          <Tooltip title="Position State">
            <Select value={openType} style={{ width: 100 }} onChange={setOpenType}>
              <Option value="ALL">ALL</Option>
              <Option value="OPEN">OPEN</Option>
              <Option value="CLOSED">CLOSED</Option>
            </Select>
          </Tooltip>
        </Col>

        <Col>
          <Tooltip title="Position Direction">
            <Select value={positionType} style={{ width: 110 }} onChange={setPositionType}>
              <Option value="ALL">ALL</Option>
              <Option value="LONG">LONG</Option>
              <Option value="SHORT">SHORT</Option>
              <Option value="NEUTRAL">NEUTRAL</Option>
            </Select>
          </Tooltip>
        </Col>

        <Col><Tooltip title="Reset position filters"><Button style={greyBtn}>Reset</Button></Tooltip></Col>
        <Col><Tooltip title="Select all positions (if filtered, only filtered positions will be selected)"><Button style={greyBtn}>Select</Button></Tooltip></Col>
        <Col><Tooltip title="Deselect all positions"><Button style={greyBtn}>Deselect</Button></Tooltip></Col>

        <Col><Tooltip title="Square-Off one or more positions at market rate!"><Button style={orangeBtn}>Sq. Pos. Mkt.</Button></Tooltip></Col>
        <Col><Tooltip title="Square-Off with custom options (useful when normal square-off fails!)"><Button style={orangeBtn}>Sq. Pos.</Button></Tooltip></Col>
        <Col><Tooltip title="Square-Off one or more accounts (portfolios) with a single click!"><Button style={orangeBtn}>Sq. Acc.</Button></Tooltip></Col>

        <Col flex="auto" />

        <Col>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 200 }}
          />
        </Col>
      </Row>

      <Row gutter={8} style={{ marginBottom: 8 }}>
        <Col><Tooltip title="Download in Excel format"><Button style={{ fontWeight: 'bold', backgroundColor: '#36454F', color: '#fff' }}>Excel</Button></Tooltip></Col>
        <Col><Tooltip title="Download in Csv format"><Button style={{ fontWeight: 'bold', backgroundColor: '#36454F', color: '#fff' }}>CSV</Button></Tooltip></Col>
      </Row>

      <Table
        bordered
        pagination={false}
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: "max-content" }}
        locale={{ emptyText: "" }}
        components={{
          header: {
            wrapper: (props: any) => (
              <thead {...props}>
                {props.children}
                {filterRow}
              </thead>
            ),
          },
          body: {
            wrapper: (props: any) =>
              filteredData.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={columns.length} style={{ textAlign: "center", fontWeight: "bold" }}>
                      No Data Available in table
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody {...props} />
              ),
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
