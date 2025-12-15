import React, { useState } from 'react';
import {
  Table,
  Input,
  Button,
  Tooltip,
  Row,
  Col,
  Select,
  Space
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const Holdings: React.FC = () => {
  const initialData = [
    {
      key: '1',
      pseAcc: 'ACC001',
      trdAcc: 'TRD001',
      exchange: 'NSE',
      symbol: 'TCS',
      totqty: 100,
      ltp: '₹3600',
      currval: '₹360000',
      quantity: 100,
      t1qty: 10,
      pnl: '₹5000',
      product: 'EQ',
      nsesymbol: 'TCS',
      bsesymbol: '532540',
      isin: 'INE467B01029',
      insttoken: '123456',
      colqty: 50,
      coltype: 'Margin',
      haircut: '10%',
      avgprice: '₹3100',
      day: 'Monday',
      platform: 'Kite',
      broker: 'Zerodha',
    }
  ];

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleSearch = (value: string) => {
    const lower = value.toLowerCase();
    setSearchText(value);

    if (!value.trim()) {
      setFilteredData(initialData);
      return;
    }

    setFilteredData(
      initialData.filter((item) =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(lower)
        )
      )
    );
  };

  const handleColumnFilter = (value: string, dataIndex: string) => {
    const newFilters = { ...filters, [dataIndex]: value };
    setFilters(newFilters);

    let updated = initialData;

    Object.keys(newFilters).forEach((key) => {
      const searchValue = newFilters[key].toLowerCase();
      if (searchValue) {
        updated = updated.filter((item: any) =>
          String(item[key]).toLowerCase().includes(searchValue)
        );
      }
    });

    setFilteredData(updated);
  };

  const mergedRow = {
    key: '0',
    isMergedRow: true,
    pseAcc: 'No data available in table.',
  };

  const tableData = [mergedRow, ...filteredData];

  const extraColumns = filteredData.length > 0 ? [
    { title: 'Trd Acc', dataIndex: 'trdAcc', sorter: (a: any, b: any) => a.trdAcc.localeCompare(b.trdAcc), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Exchnage', dataIndex: 'exchange', sorter: (a: any, b: any) => a.exchange.localeCompare(b.exchange), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Symbol', dataIndex: 'symbol', sorter: (a: any, b: any) => a.symbol.localeCompare(b.symbol), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Tot. Qty', dataIndex: 'totqty', sorter: (a: any, b: any) => a.totqty - b.totqty, render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'LTP', dataIndex: 'ltp', sorter: (a: any, b: any) => a.ltp.localeCompare(b.ltp), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Curr. Val.', dataIndex: 'currval', sorter: (a: any, b: any) => a.currval.localeCompare(b.currval), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Quantity', dataIndex: 'quantity', sorter: (a: any, b: any) => a.quantity - b.quantity, render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'T1. Qty', dataIndex: 't1qty', sorter: (a: any, b: any) => a.t1qty - b.t1qty, render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'PnL', dataIndex: 'pnl', sorter: (a: any, b: any) => a.pnl.localeCompare(b.pnl), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Product', dataIndex: 'product', sorter: (a: any, b: any) => a.product.localeCompare(b.product), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'NSE-Symbol', dataIndex: 'nsesymbol', sorter: (a: any, b: any) => a.nsesymbol.localeCompare(b.nsesymbol), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'BSE- Symbol', dataIndex: 'bsesymbol', sorter: (a: any, b: any) => a.bsesymbol.localeCompare(b.bsesymbol), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'ISIN', dataIndex: 'isin', sorter: (a: any, b: any) => a.isin.localeCompare(b.isin), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Inst. Token', dataIndex: 'insttoken', sorter: (a: any, b: any) => a.insttoken.localeCompare(b.insttoken), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Collateral Qty.', dataIndex: 'colqty', sorter: (a: any, b: any) => a.colqty - b.colqty, render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Collateral Type.', dataIndex: 'coltype', sorter: (a: any, b: any) => a.coltype.localeCompare(b.coltype), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Haircut', dataIndex: 'haircut', sorter: (a: any, b: any) => a.haircut.localeCompare(b.haircut), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Avg. Price', dataIndex: 'avgprice', sorter: (a: any, b: any) => a.avgprice.localeCompare(b.avgprice), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Day', dataIndex: 'day', sorter: (a: any, b: any) => a.day.localeCompare(b.day), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Platform', dataIndex: 'platform', sorter: (a: any, b: any) => a.platform.localeCompare(b.platform), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Broker', dataIndex: 'broker', sorter: (a: any, b: any) => a.broker.localeCompare(b.broker), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
  ] : [];

  const firstColumn = {
    title: 'Pse Acc',
    dataIndex: 'pseAcc',
    sorter: (a: any, b: any) => a.pseAcc?.localeCompare(b.pseAcc),
    render: (_: any, row: any) =>
      row.isMergedRow
        ? { children: row.pseAcc, props: { colSpan: filteredData.length > 0 ? 22 : 1, style: { textAlign: 'center', fontWeight: 'bold', background: '#f5f5f5' } } }
        : _
  };

  const columns = [firstColumn, ...extraColumns];

  const filterInputRow = (
    <tr>
      {columns.map((col: any) => {
        if (col.dataIndex === 'pseAcc' && filteredData.length === 0) {
          return <th key={col.dataIndex} />;
        }

        const uniqueValues = Array.from(
          new Set(initialData.map((item) => (item as any)[col.dataIndex]))
        );

        return (
          <th key={col.dataIndex}>
            <Select
              allowClear
              showSearch
              size="small"
              style={{ width: '100%' }}
              value={filters[col.dataIndex] || undefined}
              onChange={(value) => handleColumnFilter(value || '', col.dataIndex)}
            >
              {uniqueValues.map((val) => (
                <Option key={val} value={val}>{val}</Option>
              ))}
            </Select>
          </th>
        );
      })}
    </tr>
  );

  return (
    <div style={{ padding: 16 }}>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        bordered
        scroll={{ x: 'max-content' }}
        components={{
          header: {
            row: (props: any) => (
              <>
                <tr {...props} />
                {filterInputRow}
              </>
            ),
          },
        }}
      />
    </div>
  );
};

export default Holdings;
