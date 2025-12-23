import React from "react";
import "./NiftyB.css";
import { useState } from "react";
import { Modal } from "antd";
import OrderForm from "./Bs";
// import MainTabs from "../Tabs/Tabs";
import { Table, Input, Button, Select, Row, Col, Card, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;
// const initialData = [
//   {
//     key: "1",
//     m2m: "₹0.00",
//     pnl: "₹0.00",
//     atpnl: "₹0.00",
//     symbol: "",
//     realpl: "",
//     unrealpl: "",
//     netqty: 0,
//     ltp: "",
//     buyqty: 0,
//     sellqty: 0,
//     buyval: "₹0.00",
//     sellval: "₹0.00",
//     netval: "₹0.00",
//     bavg: "₹0.00",
//     savg: "₹0.00",
//   },
// ];

// const parseCurrency = (val: any) =>
//   parseFloat(String(val).replace(/[^0-9.-]+/g, "")) || 0;

// const handleColumnFilter = (value: string, key: string) => {
//   const newFilters = { ...filters, [key]: value };
//   setFilters(newFilters);

//   let data = initialData;
//   Object.keys(newFilters).forEach((k) => {
//     if (newFilters[k]) {
//       data = data.filter((row: any) =>
//         String(row[k]).toLowerCase().includes(newFilters[k].toLowerCase())
//       );
//     }
//   });
//   setFilteredData(data);
// };

// const columns = [
//   {
//     key: "m2m",
//     title: "M2M",
//     dataIndex: "m2m",
//     width: 100,
//     sorter: (a: any, b: any) => parseCurrency(a.m2m) - parseCurrency(b.m2m),
//     onHeaderCell: () => ({ style: { backgroundColor: "#fffac8" } }),
//   },
//   {
//     key: "pnl",
//     title: "PnL",
//     dataIndex: "pnl",
//     width: 100,
//     sorter: (a: any, b: any) => parseCurrency(a.pnl) - parseCurrency(b.pnl),
//     onHeaderCell: () => ({ style: { backgroundColor: "#fffac8" } }),
//   },
//   {
//     key: "atpnl",
//     title: "AT PnL",
//     dataIndex: "atpnl",
//     width: 100,
//     sorter: (a: any, b: any) => parseCurrency(a.atpnl) - parseCurrency(b.atpnl),
//     onHeaderCell: () => ({ style: { backgroundColor: "#fffac8" } }),
//   },
//   {
//     key: "symbol",
//     title: "Symbol",
//     dataIndex: "symbol",
//     width: 100,
//     sorter: (a: any, b: any) =>
//       String(a.symbol).localeCompare(String(b.symbol)),
//   },
//   {
//     key: "realpl",
//     title: "Real PL",
//     dataIndex: "realpl",
//     width: 100,
//     sorter: (a: any, b: any) =>
//       parseCurrency(a.realpl) - parseCurrency(b.realpl),
//   },
//   {
//     key: "unrealpl",
//     title: "Unreal PL",
//     dataIndex: "unrealpl",
//     width: 100,
//     sorter: (a: any, b: any) =>
//       parseCurrency(a.unrealpl) - parseCurrency(b.unrealpl),
//   },
//   {
//     key: "netqty",
//     title: "Net Qty",
//     dataIndex: "netqty",
//     width: 100,
//     sorter: (a: any, b: any) => Number(a.netqty) - Number(b.netqty),
//   },
//   {
//     key: "ltp",
//     title: "Ltp",
//     dataIndex: "ltp",
//     width: 100,
//     sorter: (a: any, b: any) => parseCurrency(a.ltp) - parseCurrency(b.ltp),
//   },
//   {
//     key: "buyqty",
//     title: "Buy Qty",
//     dataIndex: "buyqty",
//     width: 100,
//     sorter: (a: any, b: any) => Number(a.buyqty) - Number(b.buyqty),
//   },
//   {
//     key: "sellqty",
//     title: "Sell Qty",
//     dataIndex: "sellqty",
//     width: 100,
//     sorter: (a: any, b: any) => Number(a.sellqty) - Number(b.sellqty),
//   },
//   {
//     key: "buyval",
//     title: "Buy Val",
//     dataIndex: "buyval",
//     width: 100,
//     sorter: (a: any, b: any) =>
//       parseCurrency(a.buyval) - parseCurrency(b.buyval),
//   },
//   {
//     key: "sellval",
//     title: "Sell Val",
//     dataIndex: "sellval",
//     width: 100,
//     sorter: (a: any, b: any) =>
//       parseCurrency(a.sellval) - parseCurrency(b.sellval),
//   },
//   {
//     key: "netval",
//     title: "Net Val",
//     dataIndex: "netval",
//     width: 100,
//     sorter: (a: any, b: any) =>
//       parseCurrency(a.netval) - parseCurrency(b.netval),
//   },
//   {
//     key: "bavg",
//     title: "B Avg Prc",
//     dataIndex: "bavg",
//     width: 100,
//     sorter: (a: any, b: any) => parseCurrency(a.bavg) - parseCurrency(b.bavg),
//   },
//   {
//     key: "savg",
//     title: "S Avg Prc",
//     dataIndex: "savg",
//     width: 100,
//     sorter: (a: any, b: any) => parseCurrency(a.savg) - parseCurrency(b.savg),
//   },
// ];

// const filterRow = (
//   <tr>
//     {columns.map((col) => (
//       <th key={col.dataIndex}>
//         <Select
//           allowClear
//           size="small"
//           style={{ width: "100%" }}
//           value={filters[col.dataIndex]}
//           onChange={(v) => handleColumnFilter(v || "", col.dataIndex)}
//         />
//       </th>
//     ))}
//   </tr>
// );

// const [filters, setFilters] = useState<{ [key: string]: string }>({});
// const [filteredData, setFilteredData] = useState(initialData);

export default function NiftyB() {
  const [open, setOpen] = useState(false);
  const items = [
    {
      label: "Nifty 16 Dec 2025 PE 26000",
      value: "nifty 16 dec 2025 pe 26000",
    },
    {
      label: "Nifty 16 Dec 2025 CE 26000",
      value: "nifty 16 dec 2025 ce 26000",
    },
  ];

  return (
    <div>
      <div id="mainNB">
        <div id="tab_box">
          <div className="title">
            <h3>Nifty Breakout</h3>
          </div>
          <div className="col">
            <div style={{ width: 350 }}>
              <Select
                placeholder="Select an option"
                style={{
                  width: "100%",
                  height: "3rem",
                  fontSize: "1.1rem",
                  border: "0.1rem solid #ced4da",
                  borderRadius: "0.5rem",
                }}
              >
                <Option value="option1">Nifty</Option>
                <Option value="option2">Nifty Bank</Option>
                <Option value="option3">Sensex</Option>
              </Select>
            </div>

            <div style={{ width: 350 }}>
              <Select
                showSearch
                placeholder="Select or Search here"
                options={items}
                style={{
                  width: "100%",
                  height: "3rem",
                  fontSize: "1.1rem",
                  border: "0.1rem solid #ced4da",
                  borderRadius: "0.5rem",
                }}
              >
                <Option value="apple">Nifty 16 Dec 2025 PE 26000</Option>
                <Option value="banana">Nifty 16 Dec 2025 CE 26000</Option>
                {/* <Option value="orange">Orange</Option> */}
              </Select>
            </div>

            <div
              className="price"
              style={{ width: "350", alignItems: "center" }}
            >
              <Input
                value="₹150"
                readOnly
                style={{
                  width: "80%",
                  height: "3rem",
                  fontSize: "1.1rem",
                  border: "1px solid black",
                  textAlign: "center",
                }}
              />
            </div>

            <div className="btns">
              <div className="buy">
                <button onClick={() => setOpen(true)}>Buy</button>
              </div>
              <div className="sell">
                <button onClick={() => setOpen(true)}>Sell</button>
              </div>
            </div>
          </div>

          <div className="options">
            <div className="trade_tab">
              {/* <Table
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
                            <td
                              colSpan={columns.length}
                              style={{
                                textAlign: "center",
                                fontWeight: "bold",
                              }}
                            >
                              No Data Available in table
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        <tbody {...props} />
                      ),
                  },
                }}
              /> */}
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        footer={null}
        width={1000}
        onCancel={() => setOpen(false)}
      >
        <OrderForm />
      </Modal>
    </div>
  );
}
