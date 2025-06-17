'use client';

import { useEffect, useState } from 'react';
import { Card, Typography, Descriptions, Space, Spin, Button, Modal, Timeline, Tag, Collapse } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import { appwriteApi } from '@/lib/appwrite/api';
import { SurveyData, UserProfile } from '@/types';
import { ProfileForm } from '@/components/profile/ProfileForm';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  LineChartOutlined,
  ArrowsAltOutlined,
  EditOutlined,
  FormOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

interface SurveyEntry {
  values: string[];
  createdAt: string;
}

interface NotesEntry {
  notes: string[];
  createdAt: string;
}

function DashboardContent() {
  const { user } = useAuth();
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [surveyHistory, setSurveyHistory] = useState<string[]>([]);
  const [notesHistory, setNotesHistory] = useState<string[]>([]);

  const loadData = async () => {
    if (!user) return;
    try {
      const userProfile = await appwriteApi.profile.get(user.$id);
      setProfile(userProfile);

      // Get raw values
      setSurveyHistory(userProfile?.valuesJSON || []);
      setNotesHistory(userProfile?.notesJSON || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  const handleEditComplete = () => {
    setIsEditModalVisible(false);
    // Reload profile data
    if (user) {
      appwriteApi.profile.get(user.$id).then(setProfile);
    }
  };

  const renderSurveyTimeline = () => {
    if (!surveyHistory.length) {
      return (
        <Typography.Text type="secondary">
          Нет пройденных опросников
        </Typography.Text>
      );
    }

    return (
      <Timeline>
        {surveyHistory.map((entry, index) => (
          <Timeline.Item key={index} dot={<FormOutlined />}>
            <Collapse>
              <Collapse.Panel header={`Опросник #${index + 1}`} key="1">
                <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                  {entry}
                </pre>
                {notesHistory[index] && (
                  <div style={{ marginTop: '8px' }}>
                    <Tag icon={<FileTextOutlined />} color="blue">
                      Заметки: {notesHistory[index]}
                    </Tag>
                  </div>
                )}
              </Collapse.Panel>
            </Collapse>
          </Timeline.Item>
        ))}
      </Timeline>
    );
  };

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card
          title="Информация о профиле"
          extra={
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setIsEditModalVisible(true)}
            >
              Редактировать профиль
            </Button>
          }
        >
          {profile ? (
            <Descriptions column={1}>
              <Descriptions.Item
                label={
                  <>
                    <UserOutlined />
                    &nbsp; ФИО
                  </>
                }
              >
                {profile.name}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <MailOutlined />
                    &nbsp; Email
                  </>
                }
              >
                {profile.email}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <PhoneOutlined />
                    &nbsp; Номер телефона
                  </>
                }
              >
                {profile.phone}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <CalendarOutlined />
                    &nbsp; Возраст
                  </>
                }
              >
                {profile.age} лет
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <LineChartOutlined />
                    &nbsp; Вес
                  </>
                }
              >
                {profile.weight} кг
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <ArrowsAltOutlined />
                    &nbsp; Рост
                  </>
                }
              >
                {profile.height} см
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <Typography.Text type="secondary">
              Нет доступной информации о профиле. Пожалуйста, заполните ваш профиль.
            </Typography.Text>
          )}
        </Card>

        <Card title="История опросников">
          {renderSurveyTimeline()}
        </Card>
      </Space>

      <Modal
        title="Редактировать профиль"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        width={600}
      >
        <ProfileForm onComplete={handleEditComplete} mode="edit" />
      </Modal>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <DashboardContent />
    </div>
  );
}
