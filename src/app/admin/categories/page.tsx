'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, Upload, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Category } from '@/types/category';
import { ID, Storage, Databases, Query } from 'appwrite';
import { client } from '@/lib/appwrite';
import type { UploadFile } from 'antd/es/upload/interface';

const storage = new Storage(client);
const databases = new Databases(client);
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_IMAGES || '';
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID || '';
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.orderDesc('$createdAt')]
      );
      setCategories(response.documents as Category[]);
    } catch (error) {
      message.error('Ошибка при загрузке категорий');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Активна',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => isActive ? 'Да' : 'Нет',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: any, record: Category) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.$id)}
          />
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingCategory(null);
    form.resetFields();
    setFileList([]);
    setIsModalVisible(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    if (category.imageUrl) {
      setFileList([{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: category.imageUrl,
      }]);
    }
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      setCategories(categories.filter(category => category.$id !== id));
      message.success('Категория удалена');
    } catch (error) {
      message.error('Ошибка при удалении категории');
      console.error('Delete error:', error);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const now = new Date().toISOString();

      if (editingCategory) {
        await databases.updateDocument(
          DATABASE_ID,
          COLLECTION_ID,
          editingCategory.$id,
          {
            ...values,
            updatedAt: now,
          }
        );
        message.success('Категория обновлена');
      } else {
        await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          ID.unique(),
          {
            ...values,
            slug: values.name.toLowerCase().replace(/\s+/g, '-'),
            isActive: false,
            createdAt: now,
            updatedAt: now,
          }
        );
        message.success('Категория добавлена');
      }
      fetchCategories();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
      message.error('Ошибка при сохранении категории');
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const response = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file
      );
      const fileUrl = storage.getFileView(BUCKET_ID, response.$id).toString();
      form.setFieldValue('imageUrl', fileUrl);
      setFileList([{
        uid: response.$id,
        name: file.name,
        status: 'done',
        url: fileUrl,
      }]);
      message.success('Изображение успешно загружено');
    } catch (error) {
      message.error('Ошибка при загрузке изображения');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
    return false;
  };

  const uploadProps = {
    onRemove: () => {
      setFileList([]);
      form.setFieldValue('imageUrl', '');
    },
    beforeUpload: handleUpload,
    fileList,
    maxCount: 1,
    accept: 'image/*',
    listType: 'picture-card' as const,
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Добавить категорию
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={categories} 
        rowKey="$id" 
        loading={loading}
      />

      <Modal
        title={editingCategory ? 'Редактировать категорию' : 'Добавить категорию'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Название"
            rules={[{ required: true, message: 'Пожалуйста, введите название' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Описание"
            rules={[{ required: true, message: 'Пожалуйста, введите описание' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="imageUrl"
            label="Изображение"
            rules={[{ required: true, message: 'Пожалуйста, загрузите изображение' }]}
          >
            <Input />
          </Form.Item>
        </Form>
        <Upload {...uploadProps}>
          {fileList.length === 0 && (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Загрузить</div>
            </div>
          )}
        </Upload>
      </Modal>
    </div>
  );
} 