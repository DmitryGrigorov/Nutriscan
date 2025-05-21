'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, Upload, message, Switch, Image } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { Category } from '@/types/category';
import { ID, Storage, Databases, Query } from 'appwrite';
import { client } from '@/lib/appwrite';
import type { UploadFile } from 'antd/es/upload/interface';

const storage = new Storage(client);
const databases = new Databases(client);
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_IMAGES || '';
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID || '';
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';

const transliterate = (text: string): string => {
  const translitMap: { [key: string]: string } = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
    А: 'A',
    Б: 'B',
    В: 'V',
    Г: 'G',
    Д: 'D',
    Е: 'E',
    Ё: 'E',
    Ж: 'Zh',
    З: 'Z',
    И: 'I',
    Й: 'Y',
    К: 'K',
    Л: 'L',
    М: 'M',
    Н: 'N',
    О: 'O',
    П: 'P',
    Р: 'R',
    С: 'S',
    Т: 'T',
    У: 'U',
    Ф: 'F',
    Х: 'H',
    Ц: 'Ts',
    Ч: 'Ch',
    Ш: 'Sh',
    Щ: 'Sch',
    Ъ: '',
    Ы: 'Y',
    Ь: '',
    Э: 'E',
    Ю: 'Yu',
    Я: 'Ya',
  };

  return text
    .split('')
    .map((char) => translitMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();
  // const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.orderDesc('$createdAt'),
      ]);
      setCategories(response.documents as Category[]);
    } catch (error) {
      message.error('Ошибка при загрузке категорий');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (imageUrl: string) => {
    setPreviewImage(imageUrl);
    setPreviewVisible(true);
  };

  const handleToggleActive = async (record: Category, checked: boolean) => {
    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, record.$id, { isActive: checked });
      setCategories((prev) =>
        prev.map((cat) => (cat.$id === record.$id ? { ...cat, isActive: checked } : cat))
      );
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
      sorter: (a: Category, b: Category) => a.name.localeCompare(b.name),
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
      render: (imageUrl: string) =>
        imageUrl ? (
          <Image
            src={imageUrl}
            alt="Category"
            width={50}
            height={50}
            style={{ objectFit: 'cover' }}
            preview={false}
          />
        ) : null,
    },
    {
      title: 'Активна',
      dataIndex: 'isActive',
      key: 'isActive',
      sorter: (a: Category, b: Category) => Number(a.isActive) - Number(b.isActive),
      render: (isActive: boolean, record: Category) => (
        <Switch checked={isActive} onChange={(checked) => handleToggleActive(record, checked)} />
      ),
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: Category, b: Category) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: any, record: Category) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          {record.imageUrl && (
            <Button icon={<EyeOutlined />} onClick={() => handlePreview(record.imageUrl)} />
          )}
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.$id)} />
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
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: category.imageUrl,
        },
      ]);
    }
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      setCategories(categories.filter((category) => category.$id !== id));
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
        await databases.updateDocument(DATABASE_ID, COLLECTION_ID, editingCategory.$id, {
          ...values,
          updatedAt: now,
        });
        message.success('Категория обновлена');
      } else {
        await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
          ...values,
          slug: transliterate(values.name),
          isActive: false,
          createdAt: now,
          updatedAt: now,
        });
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
    // setUploading(true);
    try {
      const response = await storage.createFile(BUCKET_ID, ID.unique(), file);
      const fileUrl = storage.getFileView(BUCKET_ID, response.$id).toString();
      form.setFieldValue('imageUrl', fileUrl);
      setFileList([
        {
          uid: response.$id,
          name: file.name,
          status: 'done',
          url: fileUrl,
        },
      ]);
      message.success('Изображение успешно загружено');
    } catch (error) {
      message.error('Ошибка при загрузке изображения');
      console.error('Upload error:', error);
    } finally {
      // setUploading(false);
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
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (file.url) {
              handlePreview(file.url);
            }
          }}
        >
          {originNode}
        </div>
      );
    },
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <b>Всего категорий: {categories.length}</b>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Добавить категорию
        </Button>
      </div>

      <Table columns={columns} dataSource={categories} rowKey="$id" loading={loading} />

      <Modal
        title={editingCategory ? 'Редактировать категорию' : 'Добавить категорию'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={isMobile ? '100vw' : 800}
        style={isMobile ? { top: 0, padding: 0 } : {}}
        bodyStyle={isMobile ? { padding: 16, minHeight: '100vh' } : {}}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Название"
            rules={[{ required: true, message: 'Пожалуйста, введите название' }]}
          >
            <Input
              onChange={(e) => {
                const slug = transliterate(e.target.value);
                form.setFieldValue('slug', slug);
              }}
            />
          </Form.Item>
          <Form.Item name="slug" label="Slug" tooltip="URL-friendly версия названия">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="description"
            label="Описание"
            rules={[{ required: true, message: 'Пожалуйста, введите описание' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="isActive" label="Активна" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="imageUrl" label="Изображение">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Upload.Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Нажмите или перетащите файл в эту область для загрузки
                </p>
                <p className="ant-upload-hint">Поддерживаются только изображения</p>
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
          {editingCategory && (
            <>
              <Form.Item name="createdAt" label="Дата создания">
                <Input disabled />
              </Form.Item>
              <Form.Item name="updatedAt" label="Дата обновления">
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
