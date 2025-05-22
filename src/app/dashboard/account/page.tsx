'use client';

import { useEffect, useState } from 'react';
import { Card, Typography, Descriptions, Space, Spin, Button, Modal } from 'antd';
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
} from '@ant-design/icons';

function DashboardContent() {
  const { user } = useAuth();
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      try {
        const [survey, userProfile] = await Promise.all([
          appwriteApi.surveys.getUserSurvey(user.$id),
          appwriteApi.profile.get(user.$id),
        ]);
        setSurveyData(survey);
        setProfile(userProfile);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

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
              Edit Profile
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

        {surveyData && (
          <Card title="Latest Survey Results">
            <Descriptions column={1}>
              <Descriptions.Item label="Age Group">{surveyData.age}</Descriptions.Item>
              <Descriptions.Item label="Gender">{surveyData.gender}</Descriptions.Item>
              <Descriptions.Item label="Goal">{surveyData.goal}</Descriptions.Item>
              <Descriptions.Item label="Activity Level">
                {surveyData.activityLevel}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}
      </Space>

      <Modal
        title="Edit Profile"
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
