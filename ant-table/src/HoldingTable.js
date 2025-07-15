
import React, { useState } from "react";
import { Table } from "antd";
import "./table.css";

const initialData = [
  {
    key: "1",
    pseAcc: "",
    trdAcc: "",
    category: "",
    total: "",
    net: "",
    funds: "",
    utilized: "",
    available: "",
    collateral: "",
    realMtm: "",
    unrealMtm: "",
    adhoc: "",
    span: "",
    exposure: "",
  },
  {
    key: "2",
    pseAcc: "53135052",
    trdAcc: "53135052",
    category: "ALL",
    total: "0.46",
    net: "0.46",
    funds: "0",
    utilized: "0",
    available: "0.46",
    collateral: "0",
    realMtm: "0",
    unrealMtm: "0",
    adhoc: "0",
    span: "0",
    exposure: "0",
  },
  {
    key: "3",
    pseAcc: "12282222",
    trdAcc: "53135052",
    category: "ALL",
    total: "0.46",
    net: "",
    funds: "0",
    utilized: "0",
    available: "",
    collateral: "0",
    realMtm: "0",
    unrealMtm: "0",
    adhoc: "0",
    span: "0",
    exposure: "0",
  },
  {
    key: "4",
    pseAcc: 53135054,
    trdAcc: 53135054,
    category: "ALL",
    total: 2.75,
    net: 2.70,
    funds: 1.00,
    utilized: 0.85,
    available: "₹1.90",
    collateral: 0.2,
    realMtm: 0.1,
    unrealMtm: 0.15,
    adhoc: 0.05,
    span: 0.2,
    exposure: 0.3,  

  }
];


const getDropdownFilter = (dataIndex, data) => {
const uniqueValues = [...new Set(data.map((item) => item[dataIndex]))];
return {
filters: uniqueValues.map((val) => ({ text: val?.toString() || "Blank", value: val })),
onFilter: (value, record) => record[dataIndex]?.toString() === value.toString(),
filterIcon: () => <span style={{ fontSize: "12px" }}>↑↓</span>
};
};

const HoldingsTable = () => {
  const [data] = useState(initialData);

  const columns = [
    { title: "Pse Acc", dataIndex: "pseAcc", ...getDropdownFilter("pseAcc", data) },
    { title: "Trd Acc", dataIndex: "trdAcc", ...getDropdownFilter("trdAcc", data) },
    { title: "Category", dataIndex: "category", ...getDropdownFilter("category", data) },
    { title: "Total", dataIndex: "total", ...getDropdownFilter("total", data) },
    { title: "Net", dataIndex: "net",  ...getDropdownFilter("net", data) },
    { title: "Funds", dataIndex: "funds", ...getDropdownFilter("funds", data) },
    { title: "Utilized", dataIndex: "utilized",  ...getDropdownFilter("utilized", data) },
    { title: "Available", dataIndex: "available",  ...getDropdownFilter("available", data) },
    { title: "Collateral", dataIndex: "collateral",  ...getDropdownFilter("collateral", data) },
    { title: "Real. Mtm", dataIndex: "realMtm",  ...getDropdownFilter("realMtm", data) },
    { title: "Unreal. Mtm", dataIndex: "unrealMtm",  ...getDropdownFilter("unrealMtm", data) },
    { title: "Adhoc", dataIndex: "adhoc",  ...getDropdownFilter("adhoc", data) },
    { title: "Span", dataIndex: "span", ...getDropdownFilter("span", data) },
    { title: "Exposure", dataIndex: "exposure",  ...getDropdownFilter("exposure", data) },
  ];

  return (
    <div style={{ padding: 16 }}>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={false}
        scroll={{ x: true }}
        summary={() => (
          <Table.Summary fixed>
            
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}></Table.Summary.Cell>
              <Table.Summary.Cell index={1}></Table.Summary.Cell>
              <Table.Summary.Cell index={2}></Table.Summary.Cell>
              <Table.Summary.Cell index={3}>₹0.46</Table.Summary.Cell>
              <Table.Summary.Cell index={4}>₹0.46</Table.Summary.Cell>
              <Table.Summary.Cell index={5}>₹0.00</Table.Summary.Cell>
              <Table.Summary.Cell index={6}>₹0.00</Table.Summary.Cell>
              <Table.Summary.Cell index={7}>₹0.46</Table.Summary.Cell>
              <Table.Summary.Cell index={8}>₹0.00</Table.Summary.Cell>
              <Table.Summary.Cell index={9}>₹0.00</Table.Summary.Cell>
              <Table.Summary.Cell index={10}>₹0.00</Table.Summary.Cell>
              <Table.Summary.Cell index={11}>₹0.00</Table.Summary.Cell>
              <Table.Summary.Cell index={12}>₹0.00</Table.Summary.Cell>
              <Table.Summary.Cell index={13}>₹0.00</Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
      
    </div>
  );
};

export default HoldingsTable;