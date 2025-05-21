'use client';

import React from 'react';
import { Card, Table, Typography, Tag, Space, Button, Upload, message } from 'antd';
import { UploadOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Title, Text } = Typography;

// Примеры анализов
const mockAnalyses = [
  {
    id: '1',
    date: '2024-03-15',
    type: 'Общий анализ крови',
    status: 'completed',
    results: [
      { parameter: 'Гемоглобин', value: '145', unit: 'г/л', norm: '130-160' },
      { parameter: 'Лейкоциты', value: '6.5', unit: '×10⁹/л', norm: '4.0-9.0' },
      { parameter: 'Тромбоциты', value: '250', unit: '×10⁹/л', norm: '180-320' },
      { parameter: 'СОЭ', value: '8', unit: 'мм/ч', norm: '2-15' },
    ],
  },
  {
    id: '2',
    date: '2024-02-28',
    type: 'Биохимический анализ крови',
    status: 'completed',
    results: [
      { parameter: 'Глюкоза', value: '5.2', unit: 'ммоль/л', norm: '3.3-5.5' },
      { parameter: 'Холестерин', value: '4.8', unit: 'ммоль/л', norm: '3.0-5.2' },
      { parameter: 'Креатинин', value: '85', unit: 'мкмоль/л', norm: '60-110' },
      { parameter: 'АЛТ', value: '25', unit: 'Ед/л', norm: '0-40' },
    ],
  },
  {
    id: '3',
    date: '2024-01-10',
    type: 'Гормональный профиль',
    status: 'completed',
    results: [
      { parameter: 'ТТГ', value: '2.1', unit: 'мкМЕ/мл', norm: '0.4-4.0' },
      { parameter: 'Т4 свободный', value: '15', unit: 'пмоль/л', norm: '9-22' },
      { parameter: 'Кортизол', value: '450', unit: 'нмоль/л', norm: '138-635' },
    ],
  },
];

const columns = [
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
    render: (date: string) => new Date(date).toLocaleDateString('ru-RU'),
  },
  {
    title: 'Тип анализа',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color={status === 'completed' ? 'success' : 'processing'}>
        {status === 'completed' ? 'Завершен' : 'В обработке'}
      </Tag>
    ),
  },
  {
    title: 'Действия',
    key: 'actions',
    render: (_: any, record: any) => (
      <Space>
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => message.info('Просмотр результатов анализа')}
        >
          Просмотр
        </Button>
        <Button
          type="text"
          icon={<DownloadOutlined />}
          onClick={() => message.info('Скачивание результатов анализа')}
        >
          Скачать
        </Button>
      </Space>
    ),
  },
];

const uploadProps: UploadProps = {
  name: 'file',
  action: '/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} успешно загружен`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} не удалось загрузить`);
    }
  },
};

export default function AnalysesPage() {
  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={2}>Мои анализы</Title>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Загрузить новый анализ</Button>
          </Upload>
        </div>

        <Card>
          <Table
            columns={columns}
            dataSource={mockAnalyses}
            rowKey="id"
            expandable={{
              expandedRowRender: (record) => (
                <Table
                  columns={[
                    { title: 'Параметр', dataIndex: 'parameter', key: 'parameter' },
                    { title: 'Значение', dataIndex: 'value', key: 'value' },
                    { title: 'Единицы', dataIndex: 'unit', key: 'unit' },
                    { title: 'Норма', dataIndex: 'norm', key: 'norm' },
                  ]}
                  dataSource={record.results}
                  pagination={false}
                  size="small"
                />
              ),
            }}
          />
        </Card>
      </Space>
    </div>
  );
}
