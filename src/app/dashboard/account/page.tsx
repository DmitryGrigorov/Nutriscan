'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  Typography,
  Descriptions,
  Space,
  Spin,
  Button,
  Modal,
  Timeline,
  Collapse,
  Alert,
  message,
} from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import { appwriteApi } from '@/lib/appwrite/api';
import { UserProfile } from '@/types';
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
  RobotOutlined,
} from '@ant-design/icons';
import { ProfileForm } from '@/components/profile/ProfileForm';

interface SurveyEntry {
  id: string;
  values: string[];
  createdAt: string;
}

interface NotesEntry {
  id: string;
  notes: string[];
  createdAt: string;
}

interface GptResponse {
  id: string;
  response: string;
  createdAt: string;
}

// Функция для перевода ключей в читаемый вид
const getReadableFieldName = (key: string): string => {
  const fieldNames: { [key: string]: string } = {
    gender: 'Пол',
    age: 'Возраст',
    height: 'Рост',
    weight: 'Вес',
    takesSupplements: 'Принимает добавки',
    currentSupplements: 'Текущие добавки',
    supplementDuration: 'Длительность приема',
    supplementEffectiveness: 'Эффективность добавок',
    supplementGoals: 'Цели приема',
    supplementConcerns: 'Опасения',
    physicalActivity: 'Физическая активность',
    dietType: 'Тип питания',
    fruitsVeggies: 'Употребление фруктов и овощей',
    fishSeafood: 'Употребление рыбы и морепродуктов',
    dairy: 'Употребление молочных продуктов',
    grains: 'Употребление цельнозерновых продуктов',
    redMeat: 'Употребление красного мяса',
    alcohol: 'Употребление алкоголя',
    smoking: 'Курение',
    stress: 'Уровень стресса',
    sleepHours: 'Часы сна',
    sleepProblems: 'Проблемы со сном',
  };

  return fieldNames[key] || key;
};

// Функция для перевода значений в читаемый вид
const getReadableValue = (key: string, value: any): string => {
  if (value === true) return 'Да';
  if (value === false) return 'Нет';

  const valueMap: { [key: string]: { [key: string]: string } } = {
    gender: {
      male: 'Мужской',
      female: 'Женский',
    },
    physicalActivity: {
      low: 'Низкая',
      moderate: 'Умеренная',
      high: 'Высокая',
      pro: 'Профессиональная',
    },
    dietType: {
      regular: 'Обычное питание',
      vegetarian: 'Вегетарианство',
      vegan: 'Веганство',
      glutenfree: 'Безглютеновая диета',
      keto: 'Кетогенная диета',
      lowcarb: 'Низкоуглеводная диета',
      if: 'Интервальное голодание',
    },
    fruitsVeggies: {
      daily: 'Ежедневно',
      regular: '3-5 раз в неделю',
      rare: '1-2 раза в неделю',
      never: 'Редко или никогда',
    },
    alcohol: {
      never: 'Не употребляет',
      rare: 'Редко',
      moderate: 'Умеренно',
      regular: 'Регулярно',
      often: 'Часто',
    },
    smoking: {
      yes: 'Да, регулярно',
      episodic: 'Периодически',
      vape: 'Электронные сигареты',
      quit_recent: 'Бросил менее года назад',
      quit_long: 'Бросил более года назад',
      never: 'Никогда не курил',
    },
    stress: {
      low: 'Низкий',
      moderate: 'Умеренный',
      high: 'Высокий',
      chronic: 'Хронический',
    },
  };

  if (typeof value === 'string' && valueMap[key]?.[value]) {
    return valueMap[key][value];
  }

  if (Array.isArray(value)) {
    return value.map((v) => valueMap[key]?.[v] || v).join(', ');
  }

  return String(value);
};

function DashboardContent() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [surveyHistory, setSurveyHistory] = useState<SurveyEntry[]>([]);
  const [notesHistory, setNotesHistory] = useState<NotesEntry[]>([]);
  const [loadingGpt, setLoadingGpt] = useState<{ [key: string]: boolean }>({});
  const [gptResponses, setGptResponses] = useState<{ [key: string]: string }>({});

  const loadData = async () => {
    if (!user) return;
    try {
      const userProfile = await appwriteApi.profile.get(user.$id);
      setProfile(userProfile);

      let parsedValues: SurveyEntry[] = [];
      let parsedNotes: NotesEntry[] = [];

      // Parse survey history
      if (userProfile?.valuesJSON) {
        parsedValues = userProfile.valuesJSON.map((entry) => JSON.parse(entry));
        setSurveyHistory(parsedValues);
      }

      // Parse notes history
      if (userProfile?.notesJSON) {
        parsedNotes = userProfile.notesJSON.map((entry) => JSON.parse(entry));
        setNotesHistory(parsedNotes);
      }

      // Load existing GPT responses
      if (userProfile?.gptJSON) {
        const parsedGptResponses: GptResponse[] = userProfile.gptJSON.map((entry) =>
          JSON.parse(entry)
        );
        const gptResponsesMap: { [key: string]: string } = {};
        parsedGptResponses.forEach((gptResponse) => {
          gptResponsesMap[gptResponse.id] = gptResponse.response;
        });
        setGptResponses(gptResponsesMap);
      }
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

  const askGPT = async (entry: SurveyEntry) => {
    try {
      setLoadingGpt((prev) => ({ ...prev, [entry.id]: true }));
      const values = Array.isArray(entry.values) ? entry.values : [entry.values];
      const notes = notesHistory.find((n) => n.id === entry.id)?.notes || [];

      const response = await fetch('/api/chatgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notes,
          values: values.map((v) => {
            try {
              return typeof v === 'string' ? JSON.parse(v) : v;
            } catch (e) {
              return v;
            }
          }),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get GPT response');
      }

      const data = await response.json();

      // Save GPT response to user profile
      if (user) {
        const userProfile = await appwriteApi.profile.get(user.$id);
        if (!userProfile) {
          throw new Error('User profile not found');
        }
        const existingGptJSON = userProfile.gptJSON || [];
        const newGptResponse: GptResponse = {
          id: entry.id,
          response: data.content,
          createdAt: new Date().toISOString(),
        };
        await appwriteApi.profile.update(user.$id, {
          gptJSON: [...existingGptJSON, JSON.stringify(newGptResponse)],
        });
      }

      setGptResponses((prev) => ({ ...prev, [entry.id]: data.response }));
      message.success('Анализ данных успешно получен');
    } catch (error) {
      console.error('Error getting GPT response:', error);
      message.error('Не удалось получить анализ данных');
    } finally {
      setLoadingGpt((prev) => ({ ...prev, [entry.id]: false }));
    }
  };

  const renderSurveyTimeline = () => {
    if (!surveyHistory.length) {
      return <Typography.Text type="secondary">Нет пройденных опросников</Typography.Text>;
    }

    return (
      <Timeline>
        {surveyHistory.map((entry, index) => {
          const values = Array.isArray(entry.values) ? entry.values : [entry.values];
          const hasGptResponse = gptResponses[entry.id] !== undefined;
          const notesEntry = notesHistory.find((n) => n.id === entry.id);
          return (
            <Timeline.Item key={entry.id} dot={<FormOutlined style={{ fontSize: '16px' }} />}>
              <Card
                size="small"
                title={
                  <Space>
                    <CalendarOutlined />
                    {new Date(entry.createdAt).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Space>
                }
                style={{ marginBottom: 16 }}
                extra={
                  !hasGptResponse ? (
                    <Button
                      type="primary"
                      icon={<RobotOutlined />}
                      onClick={() => askGPT(entry, index)}
                      loading={loadingGpt[entry.id]}
                    >
                      Анализ данных
                    </Button>
                  ) : null
                }
              >
                <Collapse>
                  <Collapse.Panel
                    header={
                      <Space>
                        <FileTextOutlined />
                        Показать детали опросника
                      </Space>
                    }
                    key="1"
                  >
                    <Descriptions column={1} bordered size="small" style={{ marginBottom: 16 }}>
                      {values.map((value, vIndex) => {
                        try {
                          let parsed;
                          if (typeof value === 'string') {
                            parsed = JSON.parse(value);
                          } else {
                            parsed = value;
                          }
                          let key, val;
                          if (typeof parsed === 'object' && parsed !== null) {
                            const entries = Object.entries(parsed);
                            if (entries.length > 0) {
                              [key, val] = entries[0];
                            } else {
                              return null;
                            }
                          } else {
                            return null;
                          }
                          return (
                            <Descriptions.Item
                              key={vIndex}
                              label={
                                <Typography.Text strong>
                                  {getReadableFieldName(key)}
                                </Typography.Text>
                              }
                            >
                              {getReadableValue(key, val)}
                            </Descriptions.Item>
                          );
                        } catch (e) {
                          console.error('Error parsing value:', e, value);
                          return null;
                        }
                      })}
                    </Descriptions>
                    {notesEntry && notesEntry.notes && notesEntry.notes.length > 0 && (
                      <Alert
                        message="Пометки , которые были сделаны при прохождении опросника"
                        description={
                          Array.isArray(notesEntry.notes)
                            ? notesEntry.notes.join(', ')
                            : notesEntry.notes
                        }
                        type="info"
                        showIcon
                        style={{ marginBottom: 16 }}
                      />
                    )}
                    {gptResponses[entry.id] && (
                      <Alert
                        message="Анализ данных"
                        description={gptResponses[entry.id]}
                        type="success"
                        showIcon
                      />
                    )}
                  </Collapse.Panel>
                </Collapse>
              </Card>
            </Timeline.Item>
          );
        })}
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

        <Card title="История опросников">{renderSurveyTimeline()}</Card>
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
