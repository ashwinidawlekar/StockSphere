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

  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

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
    { title: 'Trd Acc', dataIndex: 'trdAcc', sorter: (a, b) => a.trdAcc.localeCompare(b.trdAcc), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Category', dataIndex: 'category', sorter: (a, b) => a.category.localeCompare(b.category), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Total', dataIndex: 'total', sorter: (a, b) => a.total.localeCompare(b.total), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Net', dataIndex: 'net', sorter: (a, b) => a.net.localeCompare(b.net), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Funds', dataIndex: 'funds', sorter: (a, b) => a.funds.localeCompare(b.funds), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Utilized', dataIndex: 'utilized', sorter: (a, b) => a.utilized.localeCompare(b.utilized), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Available', dataIndex: 'available', sorter: (a, b) => a.available.localeCompare(b.available), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Collateral', dataIndex: 'collateral', sorter: (a, b) => a.collateral.localeCompare(b.collateral), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Real. Mtm', dataIndex: 'realmtm', sorter: (a, b) => a.realmtm.localeCompare(b.realmtm), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Unreal. Mtm', dataIndex: 'unrealmtm', sorter: (a, b) => a.unrealmtm.localeCompare(b.unrealmtm), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Adhoc', dataIndex: 'adhoc', sorter: (a, b) => a.adhoc.localeCompare(b.adhoc), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Span', dataIndex: 'span', sorter: (a, b) => a.span.localeCompare(b.span), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Exposure', dataIndex: 'exposure', sorter: (a, b) => a.exposure.localeCompare(b.exposure), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Payin', dataIndex: 'payin', sorter: (a, b) => a.payin.localeCompare(b.payin), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Day', dataIndex: 'day', sorter: (a, b) => a.day.localeCompare(b.day), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Broker', dataIndex: 'broker', sorter: (a, b) => a.broker.localeCompare(b.broker), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
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
              colSpan: filteredData.length > 0 ? 17 : 1,
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
      {/* Top Filter Buttons */}
      <Row gutter={[8, 8]} style={{ marginBottom: 12, flexWrap: 'wrap' }}>
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


      {/* Excel + CSV + Search Row */}
      <Row gutter={[8, 8]} justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col xs={24} sm={24} md={12}>
          <Button style={{ fontWeight: 'bold', marginRight: 8, backgroundColor: '#36454F', color: '#fff' }}>Excel</Button>
          <Button style={{ fontWeight: 'bold', marginRight: 8, backgroundColor: '#36454F', color: '#fff' }}>CSV</Button>
        </Col>
        <Col xs={24} sm={24} md={12} style={{ textAlign: "right" }}>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: "100%", maxWidth: 220 }}
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

export default Margins;
