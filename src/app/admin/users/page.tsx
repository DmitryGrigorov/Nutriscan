'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Switch, Tag, Typography } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Databases, Query, Models } from 'appwrite';
import { client } from '@/lib/appwrite';

const { Title } = Typography;
const databases = new Databases(client);
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || '';
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';

interface User extends Models.Document {
  name: string;
  email: string;
  phone?: string;
  isActive: boolean;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [
        Query.orderDesc('$createdAt'),
      ]);
      setUsers(response.documents as User[]);
    } catch (error) {
      message.error('Ошибка при загрузке пользователей');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await databases.deleteDocument(DATABASE_ID, USERS_COLLECTION_ID, id);
      setUsers(users.filter((user) => user.$id !== id));
      message.success('Пользователь удален');
    } catch (error) {
      message.error('Ошибка при удалении пользователя');
      console.error('Delete error:', error);
    }
  };

  const handleToggleActive = async (user: User, checked: boolean) => {
    try {
      await databases.updateDocument(DATABASE_ID, USERS_COLLECTION_ID, user.$id, {
        isActive: checked,
        updatedAt: new Date().toISOString(),
      });
      setUsers((prev) => prev.map((u) => (u.$id === user.$id ? { ...u, isActive: checked } : u)));
      message.success('Статус активности обновлен');
    } catch (error) {
      message.error('Ошибка при обновлении статуса');
      console.error('Update error:', error);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const now = new Date().toISOString();

      if (editingUser) {
        await databases.updateDocument(DATABASE_ID, USERS_COLLECTION_ID, editingUser.$id, {
          ...values,
          updatedAt: now,
        });
        message.success('Пользователь обновлен');
      }
      fetchUsers();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
      message.error('Ошибка при сохранении данных пользователя');
    }
  };

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => (
        <Space>
          <MailOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
      render: (text: string) =>
        text ? (
          <Space>
            <PhoneOutlined />
            {text}
          </Space>
        ) : (
          '-'
        ),
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'red' : 'blue'}>
          {role === 'admin' ? 'Администратор' : 'Пользователь'}
        </Tag>
      ),
    },
    {
      title: 'Статус',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean, record: User) => (
        <Switch checked={isActive} onChange={(checked) => handleToggleActive(record, checked)} />
      ),
    },
    {
      title: 'Дата регистрации',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: any, record: User) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.$id)} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Управление пользователями</Title>
      <div style={{ marginBottom: 16 }}>
        <b>Всего пользователей: {users.length}</b>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="$id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingUser ? 'Редактировать пользователя' : 'Новый пользователь'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Имя"
            rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Пожалуйста, введите email' },
              { type: 'email', message: 'Введите корректный email' },
            ]}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item name="phone" label="Телефон">
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item name="role" label="Роль" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
