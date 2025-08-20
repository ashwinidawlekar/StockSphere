import React, { useState, useEffect } from 'react';
import {
  Table,
  Input,
  Button,
  Row,
  Col,
  Tooltip,
  Select,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const Notifications: React.FC = () => {
  const initialData: any[] = [
    {
      key: '1',
      time: '2025-08-01 01:19:30',
      pseAcc: 'PSE123',
      trdAcc: 'TRD001',
      title: 'Margin Call',
      message: 'Your margin is below the required level.',
      broker: 'Zerodha',
      category: 'Alert',
      commandid: 'CMD001',
      id: 'N001',
    },
  ];

  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [titleOptions, setTitleOptions] = useState<string[]>([]);

  useEffect(() => {
    const uniqueTitles = Array.from(new Set(initialData.map((item) => item.title)));
    setTitleOptions(uniqueTitles);
  }, []);

  const handleGlobalSearch = (value: string) => {
    setSearchText(value.toLowerCase());
    if (value.trim() === '') {
      setData(initialData);
    } else {
      const filtered = initialData.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(value.toLowerCase())
        )
      );
      setData(filtered);
    }
  };

  const handleColumnFilter = (value: string, dataIndex: string) => {
    const newFilters = { ...filters, [dataIndex]: value };
    setFilters(newFilters);

    let filteredData = initialData;
    Object.keys(newFilters).forEach((key) => {
      const searchValue = newFilters[key].toLowerCase();
      if (searchValue) {
        filteredData = filteredData.filter((item) =>
          String(item[key]).toLowerCase().includes(searchValue)
        );
      }
    });

    setData(filteredData);
  };

  const handleTitleDropdownFilter = (selectedTitle: string | undefined) => {
    if (!selectedTitle) {
      setData(initialData);
    } else {
      const filtered = initialData.filter((item) => item.title === selectedTitle);
      setData(filtered);
    }
  };

  const columns = [
    { title: 'Time', dataIndex: 'time', sorter: (a: any, b: any) => a.time.localeCompare(b.time) },
    { title: 'Pse Acc ', dataIndex: 'pseAcc', sorter: (a: any, b: any) => a.pseAcc.localeCompare(b.pseAcc) },
    { title: 'Trd Acc ', dataIndex: 'trdAcc', sorter: (a: any, b: any) => a.trdAcc.localeCompare(b.trdAcc) },
    { title: 'Title', dataIndex: 'title', sorter: (a: any, b: any) => a.title.localeCompare(b.title) },
    { title: 'Message', dataIndex: 'message', sorter: (a: any, b: any) => a.message.localeCompare(b.message) },
    { title: 'Broker', dataIndex: 'broker', sorter: (a: any, b: any) => a.broker.localeCompare(b.broker) },
    { title: 'Category', dataIndex: 'category', sorter: (a: any, b: any) => a.category.localeCompare(b.category) },
    { title: 'Command Id', dataIndex: 'commandid', sorter: (a: any, b: any) => a.commandid.localeCompare(b.commandid) },
    { title: 'Id', dataIndex: 'id', sorter: (a: any, b: any) => a.id.localeCompare(b.id) },
  ];

  const filterInputRow = (
    <tr>
      {columns.map((col) => {
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
      {/* Top Controls */}
      <Row gutter={[8, 8]} align="middle" style={{ flexWrap: 'wrap' }}>
        <Col xs={24} sm={12} md={6}>
          <Tooltip title="Reset notifications filter">
            <Button
              style={{ backgroundColor: '#6e6e6e', color: '#fff' }}
              onClick={() => {
                setFilters({});
                setSearchText('');
                setData(initialData);
              }}
            >
              Reset
            </Button>
          </Tooltip>
        </Col>
      </Row>

      <Row
        justify="space-between"
        style={{ marginTop: 12, marginBottom: 8, flexWrap: 'wrap' }}
        gutter={[8, 8]}
      >
        <Col xs={24} sm={24} md={12}>
          <Tooltip title="Download in Excel format">
            <Button
              style={{
                fontWeight: 'bold',
                marginRight: 8,
                backgroundColor: '#36454F',
                color: '#fff',
              }}
            >
              Excel
            </Button>
          </Tooltip>
          <Tooltip title="Download in CSV format">
            <Button
              style={{
                fontWeight: 'bold',
                marginRight: 8,
                backgroundColor: '#36454F',
                color: '#fff',
              }}
            >
              CSV
            </Button>
          </Tooltip>
        </Col>
        <Col xs={24} sm={24} md={12} style={{ textAlign: 'right' }}>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            style={{ width: '100%', maxWidth: 220 }}
            value={searchText}
            onChange={(e) => handleGlobalSearch(e.target.value)}
          />
        </Col>
      </Row>

      {/* Dropdown search after headers */}
      <Row justify="end" style={{ marginBottom: 16 }} gutter={[8, 8]}>
        <Col xs={24} sm={12} md={6}>
          <Select
            showSearch
            allowClear
            placeholder="Filter by Title"
            style={{ width: '100%' }}
            optionFilterProp="children"
            onChange={handleTitleDropdownFilter}
            filterOption={(input, option) =>
              (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
            }
          >
            {titleOptions.map((title) => (
              <Option key={title} value={title}>
                {title}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 'max-content' }}
        bordered
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

export default Notifications;
