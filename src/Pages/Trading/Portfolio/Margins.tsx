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

const parseCurrency = (val: any) =>
  parseFloat(String(val).replace(/[^0-9.-]/g, '')) || 0;

const Margins: React.FC = () => {
  const initialData = [
    {
      key: '1',
      pseAcc: '',
      trdAcc: '',
      category: '',
      total: '₹0.00',
      net: '₹0.00',
      funds: '₹0.00',
      utilized: '₹0.00',
      available: '₹0.00',
      collateral: '₹0.00',
      realmtm: '₹0.00',
      unrealmtm: '₹0.00',
      adhoc: '₹0.00',
      span: '₹0.00',
      exposure: '₹0.00',
      payin: '₹0.00',
    },
  ];

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleSearch = (value: string) => {
    setSearchText(value);
    if (!value.trim()) {
      setFilteredData(initialData);
      return;
    }
    const lower = value.toLowerCase();
    setFilteredData(
      initialData.filter(item =>
        Object.values(item).some(v =>
          String(v).toLowerCase().includes(lower)
        )
      )
    );
  };

  const handleColumnFilter = (value: string, key: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    let data = initialData;
    Object.keys(newFilters).forEach(k => {
      if (newFilters[k]) {
        data = data.filter((row: any) =>
          String(row[k]).toLowerCase().includes(newFilters[k].toLowerCase())
        );
      }
    });
    setFilteredData(data);
  };

  const mergedRow = {
    key: '0',
    isMergedRow: true,
    pseAcc: 'No data available in table.',
  };

  const tableData = [mergedRow, ...filteredData];

  const firstColumn = {
    title: 'Pse Acc',
    dataIndex: 'pseAcc',
    sorter: (a: any, b: any) =>
      String(a.pseAcc || '').localeCompare(String(b.pseAcc || '')),
    render: (_: any, row: any) =>
      row.isMergedRow
        ? {
            children: row.pseAcc,
            props: {
              colSpan: filteredData.length > 0 ? 15 : 1,
              style: {
                textAlign: 'center',
                fontWeight: 'bold',
                background: '#f5f5f5',
              },
            },
          }
        : _,
  };

  const extraColumns = filteredData.length > 0 ? [
    { title: 'Trd Acc', dataIndex: 'trdAcc', sorter: (a:any,b:any)=>String(a.trdAcc).localeCompare(String(b.trdAcc)), render: (_:any,row:any)=>row.isMergedRow?{props:{colSpan:0}}:_ },
    { title: 'Category', dataIndex: 'category', sorter: (a:any,b:any)=>String(a.category).localeCompare(String(b.category)), render: (_:any,row:any)=>row.isMergedRow?{props:{colSpan:0}}:_ },
    { title: 'Total', dataIndex: 'total', sorter: (a:any,b:any)=>parseCurrency(a.total)-parseCurrency(b.total), render: (_:any,row:any)=>row.isMergedRow?{props:{colSpan:0}}:_ },
    { title: 'Net', dataIndex: 'net', sorter: (a:any,b:any)=>parseCurrency(a.net)-parseCurrency(b.net), render: (_:any,row:any)=>row.isMergedRow?{props:{colSpan:0}}:_ },
    { title: 'Funds', dataIndex: 'funds', sorter: (a:any,b:any)=>parseCurrency(a.funds)-parseCurrency(b.funds), render: (_:any,row:any)=>row.isMergedRow?{props:{colSpan:0}}:_ },
    { title: 'Utilized', dataIndex: 'utilized', sorter: (a:any,b:any)=>parseCurrency(a.utilized)-parseCurrency(b.utilized), render: (_:any,row:any)=>row.isMergedRow?{props:{colSpan:0}}:_ },
    { title: 'Available', dataIndex: 'available', sorter: (a:any,b:any)=>parseCurrency(a.available)-parseCurrency(b.available), render: (_:any,row:any)=>row.isMergedRow?{props:{colSpan:0}}:_ },
    { title: 'Collateral', dataIndex: 'collateral', sorter: (a:any,b:any)=>parseCurrency(a.collateral)-parseCurrency(b.collateral), render: (_:any,row:any)=>row.isMergedRow?{props:{colSpan:0}}:_ },
    { title: 'Real. Mtm', dataIndex: 'realmtm', sorter: (a:any,b:any)=>parseCurrency(a.realmtm)-parseCurrency(b.realmtm), render: (_:any,row:any)=>row.isMergedRow?{props:{colSpan:0}}:_ },
    { title: 'Unreal. Mtm', dataIndex: 'unrealmtm', sorter: (a:any,b:any)=>parseCurrency(a.unrealmtm)-parseCurrency(b.unrealmtm), render: (_:any,row:any)=>row.isMergedRow?{props:{colSpan:0}}:_ },
    { title: 'Adhoc', dataIndex: 'adhoc', sorter: (a:any,b:any)=>parseCurrency(a.adhoc)-parseCurrency(b.adhoc), render: (_:any,row:any)=>row.isMergedRow?{props:{colSpan:0}}:_ },
    { title: 'Span', dataIndex: 'span', sorter: (a:any,b:any)=>parseCurrency(a.span)-parseCurrency(b.span), render: (_:any,row:any)=>row.isMergedRow?{props:{colSpan:0}}:_ },
    { title: 'Exposure', dataIndex: 'exposure', sorter: (a:any,b:any)=>parseCurrency(a.exposure)-parseCurrency(b.exposure), render: (_:any,row:any)=>row.isMergedRow?{props:{colSpan:0}}:_ },
    { title: 'Payin', dataIndex: 'payin', sorter: (a:any,b:any)=>parseCurrency(a.payin)-parseCurrency(b.payin), render: (_:any,row:any)=>row.isMergedRow?{props:{colSpan:0}}:_ },
  ] : [];

  const columns = [firstColumn, ...extraColumns];

  return (
    <div style={{ padding: 16 }}>

      {/* ACTION ROW */}
      <Row gutter={8} style={{ marginBottom: 8 }}>
        <Col><Tooltip title="Reset Margins Filter"><Button style={greyBtn}>Reset</Button></Tooltip></Col>
        <Col><Tooltip title="Show Equity Margins"><Button style={greenBtn}>Equity</Button></Tooltip></Col>
        <Col><Tooltip title="Show Commodity Margins"><Button style={greenBtn}>Commodity</Button></Tooltip></Col>
        <Col><Tooltip title="Show Combined Margins"><Button style={greenBtn}>Total</Button></Tooltip></Col>
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

      {/* EXPORT ROW */}
      <Row gutter={8} style={{ marginBottom: 12 }}>
        <Col><Tooltip title="Download in Excel format"><Button style={{ fontWeight: 'bold', backgroundColor: '#36454F', color: '#fff' }}>Excel</Button></Tooltip></Col>
        <Col><Tooltip title="Download in Csv format"><Button style={{ fontWeight: 'bold', backgroundColor: '#36454F', color: '#fff' }}>CSV</Button></Tooltip></Col>
      </Row>

      {/* TABLE */}
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
              </>
            ),
          },
        }}
      />
    </div>
  );
};

export default Margins;
