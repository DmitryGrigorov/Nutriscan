'use client';

import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

interface Category {
  id: number;
  name: string;
  description: string;
  productsCount: number;
  isActive: boolean;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    { 
      id: 1, 
      name: 'Витамины', 
      description: 'Витаминные добавки и комплексы', 
      productsCount: 25,
      isActive: true
    },
    { 
      id: 2, 
      name: 'Минералы', 
      description: 'Минеральные добавки', 
      productsCount: 18,
      isActive: true
    },
    { 
      id: 3, 
      name: 'Протеины', 
      description: 'Протеиновые добавки', 
      productsCount: 12,
      isActive: true
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Товаров',
      dataIndex: 'productsCount',
      key: 'productsCount',
    },
    {
      title: 'Статус',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Активна' : 'Неактивна'}
        </Tag>
      ),
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
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter(category => category.id !== id));
    message.success('Категория удалена');
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingCategory) {
        setCategories(categories.map(category =>
          category.id === editingCategory.id ? { ...category, ...values } : category
        ));
        message.success('Категория обновлена');
      } else {
        const newCategory = {
          id: Math.max(...categories.map(c => c.id)) + 1,
          ...values,
          productsCount: 0,
        };
        setCategories([...categories, newCategory]);
        message.success('Категория добавлена');
      }
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Добавить категорию
        </Button>
      </div>

      <Table columns={columns} dataSource={categories} rowKey="id" />

      <Modal
        title={editingCategory ? 'Редактировать категорию' : 'Добавить категорию'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
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
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="isActive"
            label="Активна"
            valuePropName="checked"
            initialValue={true}
          >
            <Input type="checkbox" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
} 