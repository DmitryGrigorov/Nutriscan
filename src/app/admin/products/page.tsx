'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, InputNumber, Select, message, Upload, Switch, Image } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, EyeOutlined, InboxOutlined } from '@ant-design/icons';
import { Product } from '@/types/product';
import { Category } from '@/types/category';
import { ID, Storage, Databases, Query } from 'appwrite';
import { client } from '@/lib/appwrite';
import type { UploadFile } from 'antd/es/upload/interface';

const storage = new Storage(client);
const databases = new Databases(client);
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_IMAGES || '';
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID || '';
const CATEGORIES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID || '';
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';

const transliterate = (text: string): string => {
  const translitMap: { [key: string]: string } = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
    'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'E',
    'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
    'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
    'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch', 'Ъ': '',
    'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
  };

  return text
    .split('')
    .map(char => translitMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
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
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        CATEGORIES_COLLECTION_ID,
        [Query.orderDesc('$createdAt')]
      );
      setCategories(response.documents as Category[]);
    } catch (error) {
      message.error('Ошибка при загрузке категорий');
      console.error('Fetch categories error:', error);
    }
  };

  const handlePreview = (imageUrl: string) => {
    setPreviewImage(imageUrl);
    setPreviewVisible(true);
  };

  const handleToggleActive = async (record: Product, checked: boolean) => {
    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, record.$id, { isActive: checked });
      setProducts(prev => prev.map(prod => prod.$id === record.$id ? { ...prod, isActive: checked } : prod));
      message.success('Статус активности обновлён');
    } catch (error) {
      message.error('Ошибка при обновлении статуса');
    }
  };

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
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
      render: (categoryId: string) => {
        const category = categories.find(cat => cat.$id === categoryId);
        return category ? category.name : categoryId;
      }
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      sorter: (a: Product, b: Product) => a.price - b.price,
      render: (price: number) => `₽${price}`,
    },
    {
      title: 'В наличии',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a: Product, b: Product) => a.stock - b.stock,
    },
    {
      title: 'Активен',
      dataIndex: 'isActive',
      key: 'isActive',
      sorter: (a: Product, b: Product) => Number(a.isActive) - Number(b.isActive),
      render: (isActive: boolean, record: Product) => (
        <Switch checked={isActive} onChange={checked => handleToggleActive(record, checked)} />
      ),
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: Product, b: Product) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date: string) => new Date(date).toLocaleString(),
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
            slug: transliterate(values.name),
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
        <b>Всего товаров: {products.length}</b>
      </div>
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
              const slug = transliterate(e.target.value);
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
              {categories.map(category => (
                <Select.Option key={category.$id} value={category.$id}>
                  {category.name}
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
              <Upload.Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Нажмите или перетащите файл в эту область для загрузки</p>
                <p className="ant-upload-hint">
                  Поддерживаются только изображения
                </p>
              </Upload.Dragger>
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