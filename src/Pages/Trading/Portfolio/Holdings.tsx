import React, { useEffect, useState } from 'react';
import {
  Table,
  Input,
  Button,
  Tooltip,
  Row,
  Col,
  Select
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

  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

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

  const mergedRow = {
    key: '0',
    isMergedRow: true,
    pseAcc: 'No data available in table.',
  };

const tableData = [mergedRow, ...filteredData];

  const extraColumns = filteredData.length > 0 ? [
    
    {
      title: 'Trd Acc',
      dataIndex: 'trdAcc',
      sorter: (a, b) => a.trdAcc.localeCompare(b.trdAcc),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Exchnage',
      dataIndex: 'exchange',
      sorter: (a, b) => a.exchange.localeCompare(b.exchange),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Tot. Qty',
      dataIndex: 'totqty',
      sorter: (a, b) => a.totqty.localeCompare(b.totqty),      
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'LTP',
      dataIndex: 'ltp',
      sorter: (a, b) => a.ltp.localeCompare(b.ltp),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Curr. Val.',
      dataIndex: 'currval',
      sorter: (a, b) => a.currval.localeCompare(b.currval),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      sorter: (a, b) => a.quantity.localeCompare(b.quantity),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'T1. Qty',
      dataIndex: 't1qty',
      sorter: (a, b) => a.t1qty.localeCompare(b.t1qty),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'PnL',
      dataIndex: 'pnl',
      sorter: (a, b) => a.pnl.localeCompare(b.pnl),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Product',
      dataIndex: 'product',
      sorter: (a, b) => a.product.localeCompare(b.product),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'NSE-Symbol',
      dataIndex: 'nsesymbol',
      sorter: (a, b) => a.nsesymbol.localeCompare(b.nsesymbol),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'BSE- Symbol',
      dataIndex: 'bsesymbol',
      sorter: (a, b) => a.bsesymbol.localeCompare(b.bsesymbol),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'ISIN',
      dataIndex: 'isin',
      sorter: (a, b) => a.isin.localeCompare(b.isin),      
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Inst. Token',
      dataIndex: 'insttoken',
      sorter: (a, b) => a.insttoken.localeCompare(b.insttoken),      
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Collateral Qty.',
      dataIndex: 'colqty',
      sorter: (a, b) => a.colqty.localeCompare(b.colqty),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Collateral Type.',
      dataIndex: 'coltype',
      sorter: (a, b) => a.coltype.localeCompare(b.coltype),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Haircut',
      dataIndex: 'haircut',
      sorter: (a, b) => a.haircut.localeCompare(b.haircut),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Avg. Price',
      dataIndex: 'avgprice',
      sorter: (a, b) => a.avgprice.localeCompare(b.avgprice),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Day',
      dataIndex: 'day',
      sorter: (a, b) => a.day.localeCompare(b.day),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      sorter: (a, b) => a.platform.localeCompare(b.platform),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Broker',
      dataIndex: 'broker',
      sorter: (a, b) => a.broker.localeCompare(b.broker),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
  ] : [];

  const firstColumn = {
    title: 'Pse Acc',
    dataIndex: 'pseAcc',
    sorter: (a: any, b: any) => a.pseAcc?.localeCompare(b.pseAcc),
    render: (_: any, row: any) =>
      row.isMergedRow
        ? {
            children: row.pseAcc,
            props: {
              colSpan: filteredData.length > 0 ? 22 : 1,
              style: { textAlign: 'center', fontWeight: 'bold', background: '#f5f5f5' }
            }
          }
        : _
  };

  const columns = [firstColumn, ...extraColumns];
  

  const filterInputRow = (
    <tr>
      {columns.map((col) => {
        if (col.dataIndex === 'pseAcc' && filteredData.length === 0) {
          return <th key={col.dataIndex} />;
        }

        const uniqueValues = Array.from(
          new Set(initialData.map((item) => item[col.dataIndex]))
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
    <div style={{ padding: 16 }}>
      <Row gutter={8} style={{ marginBottom: 12 }}>
        <Col>
          <Tooltip title="Reset holdings filter">
            <Button style={{ backgroundColor: "#6e6e6e", color: "#fff" }}>Reset</Button>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Select all holdings">
            <Button style={{ backgroundColor: "#6e6e6e", color: "#fff" }}>Select</Button>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Deselect all holdings">
            <Button style={{ backgroundColor: "#6e6e6e", color: "#fff" }}>Deselect</Button>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Square-off">
            <Button style={{ backgroundColor: '#f77d5c', color: '#fff' }}>Square-Off</Button>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Increase">
            <Button style={{ backgroundColor: '#00b96b', color: '#fff' }}>Increase</Button>
          </Tooltip>
        </Col>
      </Row>  

      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Tooltip title="Download in Excel format">
            <Button style={{ fontWeight: 'bold', marginRight: 8, backgroundColor: '#36454F', color: '#fff' }}>Excel</Button>
          </Tooltip>
          <Tooltip title="Download in CSV format">
            <Button style={{ fontWeight: 'bold', backgroundColor: '#36454F', color: '#fff' }}>CSV</Button>
          </Tooltip>
        </Col>
        <Col>
          <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 200 }}
          />
        </Col>
      </Row>


      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        bordered
        scroll={{ x: 'max-content' }}
        locale={{
          emptyText: (
            <div
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#3d3d3d',
              }}
            >
              No data available in table
            </div>
          ),
        }}
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
        }}
      />
    </div>
  );
};

export default Holdings;
