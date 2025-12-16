import React, { useState } from 'react';
import {
  Table,
  Input,
  Button,
  Tooltip,
  Row,
  Col,
  Select,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const greyBtn = { background: '#6e6e6e', color: '#fff' };
const greenBtn = { background: '#11c26d', color: '#fff' };
const orangeBtn = { background: '#ff8c5a', color: '#fff' };

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
    },
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
      initialData.filter(item =>
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
      if (newFilters[key]) {
        updated = updated.filter((item: any) =>
          String(item[key]).toLowerCase().includes(newFilters[key].toLowerCase())
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
    { title: 'Exchange', dataIndex: 'exchange', sorter: (a: any, b: any) => a.exchange.localeCompare(b.exchange), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Symbol', dataIndex: 'symbol', sorter: (a: any, b: any) => a.symbol.localeCompare(b.symbol), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Tot. Qty', dataIndex: 'totqty', sorter: (a: any, b: any) => a.totqty - b.totqty, render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'LTP', dataIndex: 'ltp', sorter: (a: any, b: any) => a.ltp.localeCompare(b.ltp), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Curr. Val.', dataIndex: 'currval', sorter: (a: any, b: any) => a.currval.localeCompare(b.currval), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Quantity', dataIndex: 'quantity', sorter: (a: any, b: any) => a.quantity - b.quantity, render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'T1 Qty', dataIndex: 't1qty', sorter: (a: any, b: any) => a.t1qty - b.t1qty, render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'PnL', dataIndex: 'pnl', sorter: (a: any, b: any) => a.pnl.localeCompare(b.pnl), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Product', dataIndex: 'product', sorter: (a: any, b: any) => a.product.localeCompare(b.product), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'NSE-Symbol', dataIndex: 'nsesymbol', sorter: (a: any, b: any) => a.nsesymbol.localeCompare(b.nsesymbol), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'BSE-Symbol', dataIndex: 'bsesymbol', sorter: (a: any, b: any) => a.bsesymbol.localeCompare(b.bsesymbol), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'ISIN', dataIndex: 'isin', sorter: (a: any, b: any) => a.isin.localeCompare(b.isin), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Inst. Token', dataIndex: 'insttoken', sorter: (a: any, b: any) => a.insttoken.localeCompare(b.insttoken), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
  ] : [];

  const firstColumn = {
    title: 'Pse Acc',
    dataIndex: 'pseAcc',
    sorter: (a: any, b: any) => a.pseAcc?.localeCompare(b.pseAcc),
    render: (_: any, row: any) =>
      row.isMergedRow
        ? { children: row.pseAcc, props: { colSpan: filteredData.length > 0 ? 15 : 1, style: { textAlign: 'center', fontWeight: 'bold', background: '#f5f5f5' } } }
        : _
  };

  const columns = [firstColumn, ...extraColumns];

  const filterInputRow = (
    <tr>
      {columns.map((col: any) => (
        <th key={col.dataIndex}>
          {col.dataIndex && (
            <Select
              allowClear
              size="small"
              style={{ width: '100%' }}
              value={filters[col.dataIndex]}
              onChange={(v) => handleColumnFilter(v || '', col.dataIndex)}
            />
          )}
        </th>
      ))}
    </tr>
  );

  return (
    <div style={{ padding: 16 }}>

      <Row gutter={8} style={{ marginBottom: 8 }}>
        <Col><Tooltip title="Reset Holdings Filter"><Button style={greyBtn}>Reset</Button></Tooltip></Col>
        <Col><Tooltip title="Select all holdings (If filtered, only filtered holdings will be selected)"><Button style={greyBtn}>Select</Button></Tooltip></Col>
        <Col><Tooltip title="Deselect all holdings"><Button style={greyBtn}>Deselect</Button></Tooltip></Col>
        <Col><Tooltip title="Square-Off (SELL) one or more holdings with a single click!"><Button style={orangeBtn}>Square-Off</Button></Tooltip></Col>
        <Col><Tooltip title="Increase (BUY) one or more holdings with a single click!"><Button style={greenBtn}>Increase</Button></Tooltip></Col>

        <Col flex="auto" />

        <Col>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 220 }}
          />
        </Col>
      </Row>

      <Row gutter={8} style={{ marginBottom: 12 }}>
        <Col><Tooltip title="Download in Excel format"><Button style={{ fontWeight: 'bold', backgroundColor: '#36454F', color: '#fff' }}>Excel</Button></Tooltip></Col>
        <Col><Tooltip title="Download in Csv format"><Button style={{ fontWeight: 'bold', backgroundColor: '#36454F', color: '#fff' }}>CSV</Button></Tooltip></Col>
      </Row>

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
