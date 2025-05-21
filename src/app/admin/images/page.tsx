'use client';

import React, { useState, useEffect } from 'react';
import {
  Upload,
  Button,
  message,
  Image,
  Space,
  Modal,
  Card,
  Row,
  Col,
  Typography,
  Input,
} from 'antd';
import { UploadOutlined, DeleteOutlined, EyeOutlined, CopyOutlined } from '@ant-design/icons';
import { ID, Storage, Models } from 'appwrite';
import { client } from '@/lib/appwrite';
import { BasePage } from '@/components/dashboard/BasePage';

const storage = new Storage(client);
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_IMAGES || '';

export default function ImagesPage() {
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<Models.File[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await storage.listFiles(BUCKET_ID);
      setUploadedFiles(response.files);
    } catch (error) {
      message.error('Ошибка при загрузке списка изображений');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
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
      message.success('Изображения успешно загружены');
      fetchFiles();
    } catch (error) {
      message.error('Ошибка при загрузке изображений');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handlePreview = async (file: Models.File) => {
    try {
      const fileUrl = storage.getFileView(BUCKET_ID, file.$id);
      setPreviewImage(fileUrl.toString());
      setPreviewVisible(true);
    } catch (error) {
      message.error('Ошибка при просмотре изображения');
    }
  };

  const handleDelete = async (fileId: string) => {
    try {
      await storage.deleteFile(BUCKET_ID, fileId);
      message.success('Изображение удалено');
      fetchFiles();
    } catch (error) {
      message.error('Ошибка при удалении изображения');
    }
  };

  const handleCopyUrl = (fileId: string) => {
    const fileUrl = storage.getFileView(BUCKET_ID, fileId).toString();
    navigator.clipboard
      .writeText(fileUrl)
      .then(() => {
        message.success('URL скопирован в буфер обмена');
      })
      .catch(() => {
        message.error('Ошибка при копировании URL');
      });
  };

  const uploadProps = {
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
    accept: 'image/*',
  };

  return (
    <BasePage title="Управление изображениями">
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Card title="Загрузка новых изображений">
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <Upload {...uploadProps} listType="picture">
              <Button icon={<UploadOutlined />}>Выбрать изображения</Button>
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
        </Card>

        <Card title="Загруженные изображения" loading={loading}>
          <Row gutter={[16, 16]}>
            {uploadedFiles.map((file) => (
              <Col xs={24} sm={12} md={8} lg={6} key={file.$id}>
                <Card
                  hoverable
                  cover={
                    <div style={{ height: 200, overflow: 'hidden' }}>
                      <Image
                        alt={file.name}
                        src={storage.getFileView(BUCKET_ID, file.$id).toString()}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  }
                  actions={[
                    <Button
                      key="preview"
                      type="text"
                      icon={<EyeOutlined />}
                      onClick={() => handlePreview(file)}
                    />,
                    <Button
                      key="copy"
                      type="text"
                      icon={<CopyOutlined />}
                      onClick={() => handleCopyUrl(file.$id)}
                    />,
                    <Button
                      key="delete"
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(file.$id)}
                    />,
                  ]}
                >
                  <Card.Meta
                    title={file.name}
                    description={
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Typography.Text type="secondary">
                          {`${(file.sizeOriginal / 1024).toFixed(2)} KB`}
                        </Typography.Text>
                        <Input
                          value={storage.getFileView(BUCKET_ID, file.$id).toString()}
                          readOnly
                          size="small"
                          style={{ fontSize: '12px' }}
                        />
                      </Space>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </Space>

      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width="80%"
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </BasePage>
  );
}
