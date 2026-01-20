import React, { useState, useEffect, useRef } from "react";
import { Table, Select } from "antd";

const { Option } = Select;

const initialData: any[] = [];

const parseCurrency = (val: any) =>
  parseFloat(String(val).replace(/[^0-9.-]+/g, "")) || 0;

const columns = [
  {
    key: "pseAcc",
    title: "Pse Acc",
    dataIndex: "pseAcc",
    sorter: (a: any, b: any) => String(a.pseAcc).localeCompare(String(b.pseAcc)),
  },
  {
    key: "trdAcc",
    title: "Trd Acc",
    dataIndex: "trdAcc",
    sorter: (a: any, b: any) => String(a.trdAcc).localeCompare(String(b.trdAcc)),
  },
  {
    key: "category",
    title: "Category",
    dataIndex: "category",
    sorter: (a: any, b: any) => String(a.category).localeCompare(String(b.category)),
  },
  {
    key: "total",
    title: "Total",
    dataIndex: "total",
    sorter: (a: any, b: any) => parseCurrency(a.total) - parseCurrency(b.total),
  },
  {
    key: "net",
    title: "Net",
    dataIndex: "net",
    sorter: (a: any, b: any) => parseCurrency(a.net) - parseCurrency(b.net),
  },
  {
    key: "funds",
    title: "Funds",
    dataIndex: "funds",
    sorter: (a: any, b: any) => parseCurrency(a.funds) - parseCurrency(b.funds),
  },
  {
    key: "utilized",
    title: "Utilized",
    dataIndex: "utilized",
    sorter: (a: any, b: any) => parseCurrency(a.utilized) - parseCurrency(b.utilized),
  },
  {
    key: "available",
    title: "Available",
    dataIndex: "available",
    sorter: (a: any, b: any) => parseCurrency(a.available) - parseCurrency(b.available),
  },
  {
    key: "collateral",
    title: "Collateral",
    dataIndex: "collateral",
    sorter: (a: any, b: any) => parseCurrency(a.collateral) - parseCurrency(b.collateral),
  },
  {
    key: "realmtm",
    title: "Real MTM",
    dataIndex: "realmtm",
    sorter: (a: any, b: any) => parseCurrency(a.realmtm) - parseCurrency(b.realmtm),
  },
  {
    key: "unrealmtm",
    title: "Unreal MTM",
    dataIndex: "unrealmtm",
    sorter: (a: any, b: any) => parseCurrency(a.unrealmtm) - parseCurrency(b.unrealmtm),
  },
  {
    key: "adhoc",
    title: "Adhoc",
    dataIndex: "adhoc",
    sorter: (a: any, b: any) => parseCurrency(a.adhoc) - parseCurrency(b.adhoc),
  },
  {
    key: "span",
    title: "Span",
    dataIndex: "span",
    sorter: (a: any, b: any) => parseCurrency(a.span) - parseCurrency(b.span),
  },
  {
    key: "exposure",
    title: "Exposure",
    dataIndex: "exposure",
    sorter: (a: any, b: any) => parseCurrency(a.exposure) - parseCurrency(b.exposure),
  },
  {
    key: "payin",
    title: "Payin",
    dataIndex: "payin",
    sorter: (a: any, b: any) => parseCurrency(a.payin) - parseCurrency(b.payin),
  },
  {
    key: "payout",
    title: "Payout",
    dataIndex: "payout",
    sorter: (a: any, b: any) => parseCurrency(a.payout) - parseCurrency(b.payout),
  },
  {
    key: "day",
    title: "Day",
    dataIndex: "day",
    sorter: (a: any, b: any) => String(a.day).localeCompare(String(b.day)),
  },
  {
    key: "broker",
    title: "Broker",
    dataIndex: "broker",
    sorter: (a: any, b: any) => String(a.broker).localeCompare(String(b.broker)),
  },
];

const MarginsTable: React.FC = () => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [filteredData, setFilteredData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const isFirstLoad = useRef(true);
  useEffect(() => {
  const fetchMargins = () => {
    if (isFirstLoad.current) {
      setLoading(true);
    }

    fetch("http://localhost:5000/margins")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          setFilteredData(initialData);
          return;
        }

        const row = data[0];

        const apiRow = {
          key: "1",
          pseAcc: "",
          trdAcc: "",
          category: "TOTAL",
          total: `₹${row.Ledgerbalance}`,
          net: `₹${row.NetAvailableMargin}`,
          funds: `₹${row.NetAvailableMargin}`,
          utilized: `₹${row.MarginUtilized}`,
          available: `₹${row.NetAvailableMargin}`,
          collateral: `₹${row.CollateralValueAfterHairCut}`,
          realmtm: `₹${row.TodaysLoss ?? 0}`,
          unrealmtm: `₹0`,
          adhoc: `₹${row.AdhocMargin}`,
          span: `₹${row.DerivativeMargin}`,
          exposure: `₹0`,
          payin: `₹${row.FundsPayIn}`,
          payout: `₹${row.FundsWithdrawal}`,
          day: "",
          broker: "5paisa",
        };

        setFilteredData([apiRow]);

        
        if (isFirstLoad.current) {
          setLoading(false);
          isFirstLoad.current = false;
        }
      })
      .catch(() => {
        setFilteredData(initialData);
      })
  };

  fetchMargins();

  const intervalId = setInterval(fetchMargins, 1000);

  return () => clearInterval(intervalId);
}, []);


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

  const filterRow = (
    <tr>
      {columns.map((col: any) => (
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
    <Table
      bordered
      loading={loading}
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
                  <td colSpan={columns.length} style={{ textAlign: "center" }}>
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
  );
};

export default MarginsTable;
