'use client';

import React, { useState, useEffect } from 'react';
import { Card, Table, Typography, Tag, Space, Button, Upload, message } from 'antd';
import { UploadOutlined, DownloadOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { ID, Storage, Models } from 'appwrite';
import { client } from '@/lib/appwrite';

const { Title } = Typography;

const storage = new Storage(client);
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ANALYSES || '';

interface AnalysisFile extends Models.File {
  analysisTitle?: string;
  size?: number;
  sizeOriginal?: number;
}

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

export default function AnalysesPage() {
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<AnalysisFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await storage.listFiles(BUCKET_ID);
      const files = response.files as AnalysisFile[];

      // Добавляем отладочную информацию
      console.log(
        'Files from Appwrite:',
        files.map((file) => ({
          name: file.name,
          size: file.size,
          sizeOriginal: file.sizeOriginal,
          mimeType: file.mimeType,
        }))
      );

      // Получаем дополнительную информацию для каждого файла
      const filesWithInfo = await Promise.all(
        files.map(async (file) => {
          try {
            const fileUrl = storage.getFileView(BUCKET_ID, file.$id).toString();
            const response = await fetch(fileUrl);
            const blob = await response.blob();

            // Если это PDF, пытаемся получить заголовок
            if (file.mimeType === 'application/pdf') {
              const text = await extractPdfTitle(blob);
              return {
                ...file,
                analysisTitle: text || file.name,
                size: file.sizeOriginal || file.size || blob.size, // Используем sizeOriginal или size
              };
            }

            return {
              ...file,
              analysisTitle: file.name,
              size: file.sizeOriginal || file.size || blob.size, // Используем sizeOriginal или size
            };
          } catch (error) {
            console.error('Error processing file:', error);
            return {
              ...file,
              analysisTitle: file.name,
              size: file.sizeOriginal || file.size, // Используем sizeOriginal или size
            };
          }
        })
      );

      setUploadedFiles(filesWithInfo);
    } catch (error) {
      message.error('Ошибка при загрузке списка анализов');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const extractPdfTitle = async (blob: Blob): Promise<string | null> => {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const text = new TextDecoder().decode(uint8Array);

      // Ищем заголовок в первых 1000 символах PDF
      const firstPage = text.slice(0, 1000);
      const titleMatch = firstPage.match(/\/Title\s*\(([^)]+)\)/);

      if (titleMatch && titleMatch[1]) {
        return titleMatch[1].trim();
      }

      return null;
    } catch (error) {
      console.error('Error extracting PDF title:', error);
      return null;
    }
  };

  const handleUpload = async () => {
    setUploading(true);

    try {
      const uploadPromises = fileList.map(async (file) => {
        const response = await storage.createFile(BUCKET_ID, ID.unique(), file);
        return response;
      });

      await Promise.all(uploadPromises);
      setFileList([]);
      message.success('Анализы успешно загружены');
      fetchFiles();
    } catch (error) {
      message.error('Ошибка при загрузке анализов');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileId: string) => {
    try {
      await storage.deleteFile(BUCKET_ID, fileId);
      message.success('Анализ удален');
      fetchFiles();
    } catch (error) {
      message.error('Ошибка при удалении анализа');
    }
  };

  const handleDownload = async (fileId: string) => {
    try {
      const fileUrl = storage.getFileDownload(BUCKET_ID, fileId).toString();
      window.open(fileUrl, '_blank');
    } catch (error) {
      message.error('Ошибка при скачивании анализа');
    }
  };

  const handlePreview = async (fileId: string) => {
    try {
      const fileUrl = storage.getFileView(BUCKET_ID, fileId).toString();
      window.open(fileUrl, '_blank');
    } catch (error) {
      message.error('Ошибка при просмотре анализа');
    }
  };

  const uploadProps: UploadProps = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: any) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
    multiple: true,
    accept: '.pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png',
  };

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
      render: (_, record: any) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => message.info('Просмотр результатов анализа')}
          >
            Просмотр
          </Button>
          <Button type="text" icon={<DownloadOutlined />} onClick={() => handleDownload(record.id)}>
            Скачать
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={2}>Мои анализы</Title>
          <Space>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Выбрать файлы</Button>
            </Upload>
            <Button
              type="primary"
              onClick={handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
            >
              {uploading ? 'Загрузка...' : 'Загрузить'}
            </Button>
          </Space>
        </div>

        <Card>
          <div
            style={{
              background: 'linear-gradient(120deg, #e0f7fa 0%, #f6fffe 100%)',
              padding: '16px 24px',
              borderRadius: '8px',
              marginBottom: '24px',
              border: '1px solid #2ec6c6',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                fontSize: '16px',
                color: '#003b3b',
                fontWeight: 500,
                lineHeight: 1.5,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  background: '#2ec6c6',
                  color: '#fff',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  marginRight: '12px',
                  fontSize: '14px',
                }}
              >
                В разработке
              </span>
              Раздел автоматического парсинга данных из загруженных файлов находится в разработке. В
              ближайшее время здесь появится возможность автоматического извлечения данных из
              PDF-файлов и их отображения в таблице.
            </div>
          </div>
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

        <div
          style={{
            background: 'linear-gradient(120deg, #e8f5e9 0%, #f1f8e9 100%)',
            padding: '16px 24px',
            borderRadius: '8px',
            marginBottom: '24px',
            border: '1px solid #66bb6a',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: '16px',
              color: '#1b5e20',
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                background: '#66bb6a',
                color: '#fff',
                padding: '4px 12px',
                borderRadius: '16px',
                marginRight: '12px',
                fontSize: '14px',
              }}
            >
              Готово
            </span>
            Раздел загрузки файлов анализов готов к использованию. Вы можете загружать файлы в
            форматах PDF, DOC, DOCX, XLS, XLSX, JPG, JPEG и PNG.
          </div>
        </div>

        <Card title="Загруженные файлы" loading={loading}>
          <Table
            columns={[
              {
                title: 'Имя файла',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Дата загрузки',
                dataIndex: '$createdAt',
                key: 'createdAt',
                render: (date: string) => new Date(date).toLocaleDateString('ru-RU'),
              },
              {
                title: 'Размер',
                dataIndex: 'size',
                key: 'size',
                render: (size: number | undefined) => {
                  console.log('Rendering size:', size, typeof size); // Отладочная информация
                  if (!size) return '0 KB';
                  const sizeInKB = size / 1024;
                  if (sizeInKB < 1024) {
                    return `${sizeInKB.toFixed(2)} KB`;
                  } else {
                    const sizeInMB = sizeInKB / 1024;
                    return `${sizeInMB.toFixed(2)} MB`;
                  }
                },
              },
              {
                title: 'Действия',
                key: 'actions',
                render: (_: unknown, record: AnalysisFile) => (
                  <Space>
                    <Button
                      type="text"
                      icon={<EyeOutlined />}
                      onClick={() => handlePreview(record.$id)}
                    >
                      Просмотр
                    </Button>
                    <Button
                      type="text"
                      icon={<DownloadOutlined />}
                      onClick={() => handleDownload(record.$id)}
                    >
                      Скачать
                    </Button>
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(record.$id)}
                    >
                      Удалить
                    </Button>
                  </Space>
                ),
              },
            ]}
            dataSource={uploadedFiles}
            rowKey="$id"
          />
        </Card>
      </Space>
    </div>
  );
}
