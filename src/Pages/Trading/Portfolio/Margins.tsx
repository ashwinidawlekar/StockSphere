import React, { useState } from 'react';
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

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleSearch = (value: string) => {
    const lower = value.toLowerCase();
    setSearchText(lower);

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
    { title: 'Category', dataIndex: 'category', sorter: (a: any, b: any) => a.category.localeCompare(b.category), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Total', dataIndex: 'total', sorter: (a: any, b: any) => a.total.localeCompare(b.total), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Net', dataIndex: 'net', sorter: (a: any, b: any) => a.net.localeCompare(b.net), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Funds', dataIndex: 'funds', sorter: (a: any, b: any) => a.funds.localeCompare(b.funds), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Utilized', dataIndex: 'utilized', sorter: (a: any, b: any) => a.utilized.localeCompare(b.utilized), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Available', dataIndex: 'available', sorter: (a: any, b: any) => a.available.localeCompare(b.available), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Collateral', dataIndex: 'collateral', sorter: (a: any, b: any) => a.collateral.localeCompare(b.collateral), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Real. Mtm', dataIndex: 'realmtm', sorter: (a: any, b: any) => a.realmtm.localeCompare(b.realmtm), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Unreal. Mtm', dataIndex: 'unrealmtm', sorter: (a: any, b: any) => a.unrealmtm.localeCompare(b.unrealmtm), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Adhoc', dataIndex: 'adhoc', sorter: (a: any, b: any) => a.adhoc.localeCompare(b.adhoc), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Span', dataIndex: 'span', sorter: (a: any, b: any) => a.span.localeCompare(b.span), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Exposure', dataIndex: 'exposure', sorter: (a: any, b: any) => a.exposure.localeCompare(b.exposure), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Payin', dataIndex: 'payin', sorter: (a: any, b: any) => a.payin.localeCompare(b.payin), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Day', dataIndex: 'day', sorter: (a: any, b: any) => a.day.localeCompare(b.day), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
    { title: 'Broker', dataIndex: 'broker', sorter: (a: any, b: any) => a.broker.localeCompare(b.broker), render: (_: any, row: any) => row.isMergedRow ? { props: { colSpan: 0 } } : _ },
  ] : [];

  const firstColumn = {
    title: 'Pse Acc',
    dataIndex: 'pseAcc',
    sorter: (a: any, b: any) => a.pseAcc?.localeCompare(b.pseAcc),
    render: (_: any, row: any) =>
      row.isMergedRow
        ? { children: row.pseAcc, props: { colSpan: filteredData.length > 0 ? 17 : 1, style: { textAlign: 'center', fontWeight: 'bold', background: '#f5f5f5' } } }
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

export default Margins;
