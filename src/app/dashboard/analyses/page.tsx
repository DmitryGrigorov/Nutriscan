'use client';

import React, { useState } from 'react';
import { Card, List, Typography, Button, Upload, message } from 'antd';
import { UploadOutlined, FileTextOutlined } from '@ant-design/icons';
import { BasePage } from '@/components/dashboard/BasePage';

const { Text } = Typography;

interface Analysis {
  id: string;
  name: string;
  date: string;
  type: string;
  status: 'pending' | 'completed';
}

export default function AnalysesPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      // TODO: Implement file upload to Appwrite storage
      message.success('Анализ успешно загружен');
      setAnalyses([
        ...analyses,
        {
          id: Date.now().toString(),
          name: file.name,
          date: new Date().toISOString(),
          type: 'Общий анализ крови',
          status: 'pending',
        },
      ]);
    } catch (error) {
      message.error('Ошибка при загрузке файла');
    } finally {
      setUploading(false);
    }
    return false;
  };

  return (
    <BasePage
      title="Загруженные анализы"
      extra={
        <Upload
          beforeUpload={handleUpload}
          showUploadList={false}
          accept=".pdf,.jpg,.jpeg,.png"
        >
          <Button type="primary" icon={<UploadOutlined />} loading={uploading}>
            Загрузить анализ
          </Button>
        </Upload>
      }
    >
      <List
        dataSource={analyses}
        renderItem={(analysis) => (
          <List.Item>
            <Card style={{ width: '100%' }}>
              <List.Item.Meta
                avatar={<FileTextOutlined style={{ fontSize: '24px' }} />}
                title={analysis.name}
                description={
                  <>
                    <Text>Тип: {analysis.type}</Text>
                    <br />
                    <Text>Дата загрузки: {new Date(analysis.date).toLocaleDateString()}</Text>
                    <br />
                    <Text>
                      Статус:{' '}
                      {analysis.status === 'pending' ? 'В обработке' : 'Обработан'}
                    </Text>
                  </>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </BasePage>
  );
} 