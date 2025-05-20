'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, InputNumber, Select, message, Upload, Switch, Image } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, EyeOutlined } from '@ant-design/icons';
import { Product } from '@/types/product';
import { categories } from '@/data/products';
import { ID, Storage, Databases, Query } from 'appwrite';
import { client } from '@/lib/appwrite';
import type { UploadFile } from 'antd/es/upload/interface';

const storage = new Storage(client);
const databases = new Databases(client);
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_IMAGES || '';
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID || '';
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.orderDesc('$createdAt')]
      );
      setProducts(response.documents as Product[]);
    } catch (error) {
      message.error('Ошибка при загрузке продуктов');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (imageUrl: string) => {
    setPreviewImage(imageUrl);
    setPreviewVisible(true);
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
      title: 'Изображение',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl: string) => imageUrl ? (
        <Image
          src={imageUrl}
          alt="Product"
          width={50}
          height={50}
          style={{ objectFit: 'cover' }}
          preview={false}
        />
      ) : null,
    },
    {
      title: 'Категория',
      dataIndex: 'categoryId',
      key: 'categoryId',
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `₽${price}`,
    },
    {
      title: 'В наличии',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Активен',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => isActive ? 'Да' : 'Нет',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: any, record: Product) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          {record.imageUrl && (
            <Button
              icon={<EyeOutlined />}
              onClick={() => handlePreview(record.imageUrl)}
            />
          )}
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
    setEditingProduct(null);
    form.resetFields();
    setFileList([]);
    setIsModalVisible(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    if (product.imageUrl) {
      setFileList([{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: product.imageUrl,
      }]);
    }
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      setProducts(products.filter(product => product.$id !== id));
      message.success('Товар удален');
    } catch (error) {
      message.error('Ошибка при удалении товара');
      console.error('Delete error:', error);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const now = new Date().toISOString();

      if (editingProduct) {
        await databases.updateDocument(
          DATABASE_ID,
          COLLECTION_ID,
          editingProduct.$id,
          {
            ...values,
            updatedAt: now,
          }
        );
        message.success('Товар обновлен');
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
        message.success('Товар добавлен');
      }
      fetchProducts();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
      message.error('Ошибка при сохранении товара');
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
    listType: 'text' as const,
    itemRender: (originNode: React.ReactNode, file: UploadFile) => {
      return (
        <div onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (file.url) {
            handlePreview(file.url);
          }
        }}>
          {originNode}
        </div>
      );
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Добавить товар
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={products} 
        rowKey="$id" 
        loading={loading}
      />

      <Modal
        title={editingProduct ? 'Редактировать товар' : 'Добавить товар'}
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
            <Input onChange={(e) => {
              const slug = e.target.value.toLowerCase().replace(/\s+/g, '-');
              form.setFieldValue('slug', slug);
            }} />
          </Form.Item>
          <Form.Item
            name="slug"
            label="Slug"
            tooltip="URL-friendly версия названия"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="description"
            label="Описание"
            rules={[{ required: true, message: 'Пожалуйста, введите описание' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Категория"
            rules={[{ required: true, message: 'Пожалуйста, выберите категорию' }]}
          >
            <Select>
              {categories.filter(cat => cat !== 'Все').map(category => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Цена"
            rules={[{ required: true, message: 'Пожалуйста, введите цену' }]}
          >
            <InputNumber
              min={0}
              prefix="₽"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Количество на складе"
            rules={[{ required: true, message: 'Пожалуйста, введите количество' }]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="isActive"
            label="Активен"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="imageUrl"
            label="Изображение"
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Upload {...uploadProps}>
                {fileList.length === 0 && (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Загрузить</div>
                  </div>
                )}
              </Upload>
              {form.getFieldValue('imageUrl') && (
                <div style={{ marginTop: 8 }}>
                  <Image
                    src={form.getFieldValue('imageUrl')}
                    alt="Preview"
                    width={100}
                    height={100}
                    style={{ objectFit: 'cover' }}
                    preview={{
                      mask: <EyeOutlined />,
                      maskClassName: 'custom-image-mask',
                    }}
                  />
                </div>
              )}
            </Space>
          </Form.Item>
          {editingProduct && (
            <>
              <Form.Item
                name="createdAt"
                label="Дата создания"
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                name="updatedAt"
                label="Дата обновления"
              >
                <Input disabled />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>

      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width="80%"
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
} 