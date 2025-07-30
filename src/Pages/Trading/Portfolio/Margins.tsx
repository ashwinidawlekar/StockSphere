import React, { useState } from 'react';
import {
  Table,
  Input,
  Button,
  Tooltip,
  Row,
  Col
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

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
      day: '₹0.00',
      broker: '₹0.00',
    }
  ];

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);

  const handleSearch = (value: string) => {
    const lower = value.toLowerCase();
    setSearchText(lower);
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

  const mergedRow = {
    key: '0',
    isMergedRow: true,
    pseAcc: 'No data available in table.',
  };

  const tableData = [mergedRow, ...filteredData];

  // Define your extra columns with render method to hide cells on merged row
  const extraColumns = filteredData.length > 0 ? [
    
    {
      title: 'Trd Acc',
      dataIndex: 'trdAcc',
      sorter: (a, b) => a.trdAcc.localeCompare(b.trdAcc),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: (a, b) => a.category.localeCompare(b.category),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Total',
      dataIndex: 'total',
      sorter: (a, b) => a.total.localeCompare(b.total),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Net',
      dataIndex: 'net',
      sorter: (a, b) => a.net.localeCompare(b.net),      
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Funds',
      dataIndex: 'funds',
      sorter: (a, b) => a.funds.localeCompare(b.funds),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Utilized',
      dataIndex: 'utilized',
      sorter: (a, b) => a.utilized.localeCompare(b.utilized),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Available',
      dataIndex: 'available',
      sorter: (a, b) => a.available.localeCompare(b.available),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Collateral',
      dataIndex: 'collateral',
      sorter: (a, b) => a.collateral.localeCompare(b.collateral),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Real. Mtm',
      dataIndex: 'realmtm',
      sorter: (a, b) => a.realmtm.localeCompare(b.realmtm),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Unreal. Mtm',
      dataIndex: 'unrealmtm',
      sorter: (a, b) => a.unrealmtm.localeCompare(b.unrealmtm),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Adhoc',
      dataIndex: 'adhoc',
      sorter: (a, b) => a.adhoc.localeCompare(b.adhoc),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Span',
      dataIndex: 'span',
      sorter: (a, b) => a.span.localeCompare(b.span),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Exposure',
      dataIndex: 'exposure',
      sorter: (a, b) => a.exposure.localeCompare(b.exposure),      
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Payin',
      dataIndex: 'payin',
      sorter: (a, b) => a.payin.localeCompare(b.payin),      
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Day',
      dataIndex: 'day',
      sorter: (a, b) => a.day.localeCompare(b.day),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
    {
      title: 'Broker',
      dataIndex: 'broker',
      sorter: (a, b) => a.broker.localeCompare(b.broker),
      render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _
    },
  ] : [];

  // First column with merged content remains unchanged
  const firstColumn = {
    title: 'Pse Acc',
    dataIndex: 'pseAcc',
    sorter: (a: any, b: any) => a.pseAcc?.localeCompare(b.pseAcc),
    render: (_: any, row: any) =>
      row.isMergedRow
        ? {
            children: row.pseAcc,
            props: {
              colSpan: filteredData.length > 0 ? 17 : 1,
              style: { textAlign: 'center', fontWeight: 'bold', background: '#f5f5f5' }
            }
          }
        : _
  };

  // Combine both parts of the columns array
  const columns = [firstColumn, ...extraColumns];

  return (
    <div style={{ padding: 16 }}>
      {/* Top Filter Buttons */}
      <Row gutter={8} style={{ marginBottom: 12 }}>
        <Col>
          <Tooltip title="Reset margins filter">
            <Button style={{ backgroundColor: "#6e6e6e", color: "#fff" }}>Reset</Button>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Show EQUITY margins">
            <Button style={{ backgroundColor: '#00b96b', color: '#fff', fontWeight: 500 }}>Equity</Button>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Show COMMODITY margins">
            <Button style={{ backgroundColor: '#00b96b', color: '#fff', fontWeight: 500 }}>Commodity</Button>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Show combined margins">
            <Button style={{ backgroundColor: '#00b96b', color: '#fff', fontWeight: 500 }}>Total</Button>
          </Tooltip>
        </Col>
      </Row>

      {/* Export Buttons + Search */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Button style={{ fontWeight: 'bold', marginRight: 8, backgroundColor: '#36454F', color: '#fff' }}>Excel</Button>
          <Button style={{ fontWeight: 'bold', marginRight: 8, backgroundColor: '#36454F', color: '#fff' }}>CSV</Button>
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

      {/* Table with Merged Row */}
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        bordered
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default Margins;
