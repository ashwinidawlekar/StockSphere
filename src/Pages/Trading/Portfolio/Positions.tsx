import React, { useState } from "react";
import {
  Table,
  Select,
  Button,
  Input,
  Row,
  Col,
  Divider,
  Card,
  Tooltip,
} from "antd";

const { Option } = Select;

const columns = [
  { title: 'Symbol', dataIndex: 'symbol', width: 100, sorter: (a, b) => a.symbol - b.symbol },
  { title: "M2M", dataIndex: "m2m", width: 100, sorter: (a, b) => a.m2m - b.m2m },
  { title: "PnL", dataIndex: "pnl", width: 100, sorter: (a, b) => a.pnl - b.pnl },
  { title: "AT PnL", dataIndex: "atpnl", width: 100, sorter: (a, b) => a.atpnl - b.atpnl },
  { title: "Real PL", dataIndex: "realpl", width: 100, sorter: (a, b) => a.realpl - b.realpl },
  { title: "Unreal PL", dataIndex: "unrealpl", width: 100, sorter: (a, b) => a.unrealpl - b.unrealpl },
  { title: "Net Qty", dataIndex: "netqty", width: 100, sorter: (a, b) => a.netqty - b.netqty },
  { title: "Ltp", dataIndex: "ltp", width: 100, sorter: (a, b) => a.ltp - b.ltp },
  { title: "Buy Qty", dataIndex: "buyqty", width: 100, sorter: (a, b) => a.buyqty - b.buyqty },
  { title: "Sell Qty", dataIndex: "sellqty", width: 100, sorter: (a, b) => a.sellqty - b.sellqty },
  { title: "Buy Val", dataIndex: "buyval", width: 100, sorter: (a, b) => a.buyval - b.buyval },
  { title: "Sell Val", dataIndex: "sellval", width: 100, sorter: (a, b) => a.sellval - b.sellval },
  { title: "Net Val", dataIndex: "netval", width: 100, sorter: (a, b) => a.netval - b.netval },
  { title: "B Avg Prc", dataIndex: "bavg", width: 100, sorter: (a, b) => a.bavg - b.bavg },
  { title: "S Avg Prc", dataIndex: "savg", width: 100, sorter: (a, b) => a.savg - b.savg },
];

const mergedRow = {
  key: "0",
  isMergedRow: true,
  symbol: "No data available in table.",
};


const dataRow1 = {
  key: "1",
  symbol: "TCS",
  m2m: 100,
  pnl: 200,
  atpnl: 150,
  realpl: 120,
  unrealpl: 80,
  netqty: 10,
  ltp: 102.45,
  pseacc: "ACC1",
  trdacc: "TRD1",
  buyqty: 5,
  sellqty: 5,
  buyval: 1000,
  sellval: 1050,
  netval: 50,
  bavg: 100.25,
  savg: 105.0,
  state: "Open",
  direction: "Long",
  type: "EQ",
  category: "Cash",
  broker: "Zerodha",
};

const dataRow2 = {
  key: "2",
  symbol: "INFY",
  m2m: -50,
  pnl: -30,
  atpnl: -10,
  realpl: -20,
  unrealpl: -10,
  netqty: -5,
  ltp: 1480.2,
  pseacc: "ACC2",
  trdacc: "TRD2",
  buyqty: 0,
  sellqty: 5,
  buyval: 0,
  sellval: 7400,
  netval: -7400,
  bavg: 0,
  savg: 1480.0,
  state: "Closed",
  direction: "Short",
  type: "EQ",
  category: "Cash",
  broker: "AngelOne",
};

const ALL_ROWS = [dataRow1, dataRow2];

const Positions = () => {
  const [filteredData, setFilteredData] = useState<any[]>([mergedRow, ...ALL_ROWS]);

  const handleSearch = (value: string) => {
    const lower = value.toLowerCase().trim();
    if (!lower) {
      setFilteredData([mergedRow, ...ALL_ROWS]);
      return;
    }

    const matched = ALL_ROWS.filter(r => r.symbol.toLowerCase().includes(lower));
    setFilteredData([mergedRow, ...matched]);
  };

  const mergedColumns = columns.map((col, index) => ({
    ...col,
    render: (value: any, row: any) => {
      if (row.isMergedRow) {
        if (index === 0) {
          return {
            children: (
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#3d3d3d",
                  padding: "2px 0",
                }}
              >
                No data available in table.
              </div>
            ),
            props: { colSpan: columns.length },
          };
        }
        return { children: null, props: { colSpan: 0 } };
      }
      return value;
    },
  }));

  return (
    <div style={{ padding: 24 }}>
      {/* Top Filters and Search */}
      <Row gutter={[8, 8]} align="middle" style={{ marginBottom: 8 }}>
        <Col flex="auto">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Input.Search
            placeholder="Search..."
            style={{ width: 240 }}
            onSearch={handleSearch}
            allowClear
          />
          <div style={{ display: "flex", gap: 8 }}>
            <Button style={{ fontWeight: "bold" }}>Excel</Button>
            <Button style={{ fontWeight: "bold" }}>CSV</Button>
          </div>
          </div>
        </Col>

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
            <Button style={{ backgroundColor: "#6e6e6e", color: "#fff" }}>Reset</Button>
          </Tooltip>
        </Col>

        <Col>
          <Tooltip title="Select all positions">
            <Button style={{ backgroundColor: "#6e6e6e", color: "#fff" }}>Select</Button>
          </Tooltip>
        </Col>

        <Col>
          <Tooltip title="Deselect all positions">
            <Button style={{ backgroundColor: "#6e6e6e", color: "#fff" }}>Deselect</Button>
          </Tooltip>
        </Col>

        <Col><Button style={{ background: "#f77d5c", color: "#fff" }}>Sq. Pos. Mkt.</Button></Col>
        <Col><Button style={{ background: "#f77d5c", color: "#fff" }}>Sq. Pos.</Button></Col>
        <Col><Button style={{ background: "#f77d5c", color: "#fff" }}>Sq. Acc.</Button></Col>
      </Row>

      <Divider style={{ margin: "8px 0" }} />

      {/* Table */}
      <Table
        columns={mergedColumns}
        dataSource={filteredData}
        rowKey="key"
        pagination={false}
        bordered
        scroll={{ x: "max-content" }}
        style={{ marginTop: 0 }}
      />

      {/* POSITIONS SUMMARY */}
      <Card
        title={
          <span style={{ color: "#00968f", fontWeight: "bold" }}>
            POSITIONS SUMMARY
          </span>
        }
        style={{
          marginTop: 24,
          background: "#f4faff",
          border: "1px solid #d9d9d9",
        }}
      >
        <Row gutter={[16, 8]}>
          {/* Col 1 */}
          <Col span={4}>
            <div><strong>» M2M</strong> = <strong style={{ color: "#1414d2" }}>0.00</strong></div>
            <div><strong>» PnL</strong> = <strong style={{ color: "#1414d2" }}>0.00</strong></div>
            <div><strong>» AT PnL</strong> = <strong style={{ color: "#1414d2" }}>0.00</strong></div>
          </Col>

          {/* Col 2 */}
          <Col span={4}>
            <div>
              <span style={{ color: "#228B22", fontWeight: "bold" }}>» Long</span> = <strong style={{ color: "#1414d2" }}>0</strong>
            </div>
            <div>
              <span style={{ color: "#8B0000", fontWeight: "bold" }}>» Short</span> = <strong style={{ color: "#1414d2" }}>0</strong>
            </div>
            <div>
              <span style={{ color: "#1c55c0", fontWeight: "bold" }}>» Neutral</span> = <strong style={{ color: "#1414d2" }}>0</strong>
            </div>
          </Col>

          {/* Col 3 */}
          <Col span={4}>
          <div><strong>» Open</strong> = <strong style={{ color: "#1414d2" }}>0</strong></div>
          <div><strong>» Closed</strong> = <strong style={{ color: "#1414d2" }}>0</strong></div>
          </Col>

          {/* Col 4 */}
          <Col span={4}>
            <div>
              <span style={{ color: "#228B22", fontWeight: "bold" }}>» NetQty-L</span> = <strong style={{ color: "#1414d2" }}>0</strong>
            </div>
            <div>
              <span style={{ color: "#8B0000", fontWeight: "bold" }}>» NetQty-S</span> = <strong style={{ color: "#1414d2" }}>0</strong>
            </div>
          </Col>

          {/* Col 5 */}
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
