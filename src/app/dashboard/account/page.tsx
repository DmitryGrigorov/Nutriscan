'use client';

import { useEffect, useState } from 'react';
import { Spin, Modal, message } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import { appwriteApi } from '@/lib/appwrite/api';
import { UserProfile } from '@/types';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { BasePage } from '@/components/dashboard/BasePage';
import styles from './page.module.css';

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

interface GigaChatResponse {
  id: string;
  response: string;
  createdAt: string;
}

function DashboardContent() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [surveyHistory, setSurveyHistory] = useState<SurveyEntry[]>([]);
  const [notesHistory, setNotesHistory] = useState<NotesEntry[]>([]);
  const [gptResponses, setGptResponses] = useState<{ [key: string]: string }>({});
  const [loadingGigaChat, setLoadingGigaChat] = useState<{ [key: string]: boolean }>({});
  const [gigaChatResponses, setGigaChatResponses] = useState<{ [key: string]: string }>({});
  const [activeTab, setActiveTab] = useState('info');
  const [expandedSurveys, setExpandedSurveys] = useState<{ [key: string]: boolean }>({});

  const loadData = async () => {
    if (!user) return;
    try {
      const userProfile = await appwriteApi.profile.get(user.$id);
      setProfile(userProfile);

      let parsedValues: SurveyEntry[] = [];
      let parsedNotes: NotesEntry[] = [];

      // Parse survey history
      if (userProfile?.valuesJSON) {
        parsedValues = userProfile.valuesJSON
          .map((entry) => JSON.parse(entry))
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setSurveyHistory(parsedValues);
      }

      // Parse notes history
      if (userProfile?.notesJSON) {
        parsedNotes = userProfile.notesJSON
          .map((entry) => JSON.parse(entry))
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setNotesHistory(parsedNotes);
      }

      // Load existing GPT responses
      if (userProfile?.gptJSON) {
        const parsedGptResponses: GptResponse[] = userProfile.gptJSON
          .map((entry) => JSON.parse(entry))
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        const gptResponsesMap: { [key: string]: string } = {};
        parsedGptResponses.forEach((gptResponse) => {
          gptResponsesMap[gptResponse.id] = gptResponse.response;
        });
        setGptResponses(gptResponsesMap);
      }

      // Load existing GigaChat responses
      if (userProfile?.gigaChatJSON) {
        const parsedGigaChatResponses: GigaChatResponse[] = userProfile.gigaChatJSON
          .map((entry) => JSON.parse(entry))
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        const gigaChatResponsesMap: { [key: string]: string } = {};
        parsedGigaChatResponses.forEach((gigaChatResponse) => {
          gigaChatResponsesMap[gigaChatResponse.id] = gigaChatResponse.response;
        });
        setGigaChatResponses(gigaChatResponsesMap);
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

  const formatBirthDate = (age: number) => {
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - age;
    return `${birthYear > 1900 ? '22.09.' + birthYear : 'Не указано'}`;
  };

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
      medicalCheckupFrequency: 'Частота медосмотров',
      bloodTests: 'Анализы крови',
      bloodTestAbnormalities: 'Отклонения в анализах',
      pregnancyStatus: 'Беременность/Лактация',
      pregnancyStage: 'Срок беременности',
      lactationStage: 'Стадия лактации',
      menstrualPain: 'Боли при менструации',
      gynecologicalCondition: 'Гинекологические заболевания',
      menopauseStatus: 'Менопауза',
      cardio: 'Сердечно-сосудистые заболевания',
      cardioMeds: 'Препараты для ССС',
      gastro: 'Заболевания ЖКТ',
      liver: 'Заболевания печени',
      endocrine: 'Эндокринные заболевания',
      diabetesControl: 'Контроль диабета',
      thyroid: 'Заболевания щитовидной железы',
      musculoskeletal: 'Заболевания ОДА',
      allergy: 'Аллергии',
      foodAllergy: 'Пищевые аллергии',
      drugAllergy: 'Лекарственные аллергии',
      regularMeds: 'Регулярные лекарства',
      regularMedsList: 'Список принимаемых лекарств',
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
      age: {
        under18: 'Младше 18 лет',
        '18-30': '18-30 лет',
        '31-45': '31-45 лет',
        '46-60': '46-60 лет',
        over60: 'Старше 60 лет',
      },
      physicalActivity: {
        low: 'Низкая активность',
        moderate: 'Умеренная активность',
        high: 'Высокая активность',
        pro: 'Профессиональная активность',
      },
      dietType: {
        regular: 'Обычное питание',
        vegetarian: 'Вегетарианство',
        vegan: 'Веганство',
        glutenFree: 'Безглютеновая диета',
        keto: 'Кето-диета',
        lowCarb: 'Низкоуглеводная диета',
        intermittent: 'Интервальное голодание',
        other: 'Особый режим питания',
      },
      takesSupplements: {
        yes: 'Да',
        no: 'Нет',
      },
      smoking: {
        yes: 'Да, регулярно',
        episodic: 'Периодически (менее 5 сигарет в день)',
        vape: 'Электронные сигареты/вейп',
        quitRecent: 'Недавно бросил(а) курить',
        quitLong: 'Бывший курильщик',
        never: 'Некурящий',
      },
      stress: {
        low: 'Низкий стресс',
        moderate: 'Умеренный стресс',
        high: 'Высокий стресс',
        chronic: 'Хронический стресс',
      },
      sleepHours: {
        lt5: 'Критически недостаточный сон',
        '5-6': 'Недостаточный сон',
        '7-8': 'Оптимальный сон',
        gt8: 'Продолжительный сон',
      },
      alcohol: {
        never: 'Не употребляю',
        rare: 'Редко (несколько раз в год)',
        moderate: 'Умеренно (1-2 раза в месяц)',
        regular: 'Регулярно (1-2 раза в неделю)',
        often: 'Часто (3 и более раз в неделю)',
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

  // Функция для извлечения основных данных из опросника
  const extractMainData = (values: string[]) => {
    const mainData: { age?: string; height?: number; weight?: number } = {};

    values.forEach((value) => {
      try {
        let parsed;
        if (typeof value === 'string') {
          parsed = JSON.parse(value);
        } else {
          parsed = value;
        }

        if (typeof parsed === 'object' && parsed !== null) {
          const entries = Object.entries(parsed);
          entries.forEach(([key, val]) => {
            if (key === 'age' && val) {
              mainData.age = getReadableValue(key, val);
            } else if (key === 'height' && val && typeof val === 'number') {
              mainData.height = val;
            } else if (key === 'weight' && val && typeof val === 'number') {
              mainData.weight = val;
            }
          });
        }
      } catch (e) {
        // Игнорируем ошибки парсинга
      }
    });

    return mainData;
  };

  // Функция для простого преобразования markdown в HTML
  const simpleMarkdownToHtml = (md: string): string => {
    if (!md) return '';
    return md
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.*?)\*/gim, '<i>$1</i>')
      .replace(/^\s*[-*] (.*)$/gim, '<li>$1</li>')
      .replace(/\n/g, '<br />');
  };

  const askGigaChat = async (entry: SurveyEntry) => {
    try {
      setLoadingGigaChat((prev) => ({ ...prev, [entry.id]: true }));
      const values = Array.isArray(entry.values) ? entry.values : [entry.values];
      const notes = notesHistory.find((n) => n.id === entry.id)?.notes || [];

      const response = await fetch('/api/gigachat', {
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
        throw new Error('Failed to get GigaChat response');
      }

      const data = await response.json();

      // Save GigaChat response to user profile
      if (user) {
        const userProfile = await appwriteApi.profile.get(user.$id);
        if (!userProfile) {
          throw new Error('User profile not found');
        }
        const existingGigaChatJSON = userProfile.gigaChatJSON || [];
        const newGigaChatResponse: GigaChatResponse = {
          id: entry.id,
          response: data.content,
          createdAt: new Date().toISOString(),
        };
        await appwriteApi.profile.update(user.$id, {
          gigaChatJSON: [...existingGigaChatJSON, JSON.stringify(newGigaChatResponse)],
        });
      }

      setGigaChatResponses((prev) => ({ ...prev, [entry.id]: data.content }));
      message.success('Анализ данных от GigaChat успешно получен');
    } catch (error) {
      console.error('Error getting GigaChat response:', error);
      message.error('Не удалось получить анализ данных от GigaChat');
    } finally {
      setLoadingGigaChat((prev) => ({ ...prev, [entry.id]: false }));
    }
  };

  const toggleSurveyExpansion = (surveyId: string) => {
    setExpandedSurveys((prev) => ({
      ...prev,
      [surveyId]: !prev[surveyId],
    }));
  };

  const renderPersonalInfo = () => (
    <div className={styles.tabContent}>
      <div className={styles.infoGrid}>
        <div className={styles.infoField}>
          <p className={styles.fieldLabel}>Фамилия, имя, отчество</p>
          <p className={styles.fieldValue}>{profile?.name || 'Не указано'}</p>
        </div>
        <div className={styles.infoField}>
          <p className={styles.fieldLabel}>Электронная почта</p>
          <p className={styles.fieldValue}>{profile?.email || 'Не указано'}</p>
        </div>
        <div className={styles.infoField}>
          <p className={styles.fieldLabel}>Номер телефона</p>
          <p className={styles.fieldValue}>{profile?.phone || 'Не указано'}</p>
        </div>
        <div className={styles.infoField}>
          <p className={styles.fieldLabel}>Дата рождения</p>
          <p className={styles.fieldValue}>
            {profile?.age ? formatBirthDate(profile.age) : 'Не указано'}
          </p>
        </div>
        <div className={styles.infoField}>
          <p className={styles.fieldLabel}>Вес</p>
          <p className={styles.fieldValue}>
            {profile?.weight ? `${profile.weight}кг` : 'Не указано'}
          </p>
        </div>
        <div className={styles.infoField}>
          <p className={styles.fieldLabel}>Рост</p>
          <p className={styles.fieldValue}>
            {profile?.height ? `${profile.height}см` : 'Не указано'}
          </p>
        </div>
      </div>
      <button className={styles.editButton} onClick={() => setIsEditModalVisible(true)}>
        Редактировать личные данные
      </button>
    </div>
  );

  const renderSurveyHistory = () => (
    <div className={styles.tabContent}>
      {surveyHistory.length > 0 ? (
        <div className={styles.historyContent}>
          {surveyHistory.map((entry, index) => {
            const values = Array.isArray(entry.values) ? entry.values : [entry.values];
            const hasGigaChatResponse = gigaChatResponses[entry.id] !== undefined;
            const notesEntry = notesHistory.find((n) => n.id === entry.id);
            const mainData = extractMainData(values);

            const isExpanded = expandedSurveys[entry.id] || false;

            return (
              <div key={entry.id} className={styles.surveyCard}>
                <div
                  className={styles.surveyHeader}
                  onClick={(e) => {
                    // Предотвращаем сворачивание при клике на кнопки
                    if (!(e.target as HTMLElement).closest(`.${styles.surveyActions}`)) {
                      toggleSurveyExpansion(entry.id);
                    }
                  }}
                >
                  <div>
                    <h3 className={styles.surveyTitle}>Опросник #{index + 1}</h3>
                    <p className={styles.surveyDate}>
                      Пройден:{' '}
                      {new Date(entry.createdAt).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    {(mainData.age || mainData.height || mainData.weight) && (
                      <div className={styles.surveyMainInfo}>
                        {mainData.age && (
                          <div className={styles.mainInfoItem}>
                            <div className={styles.mainInfoLabel}>Возраст</div>
                            <div className={styles.mainInfoValue}>{mainData.age}</div>
                          </div>
                        )}
                        {mainData.height && (
                          <div className={styles.mainInfoItem}>
                            <div className={styles.mainInfoLabel}>Рост, см</div>
                            <div className={styles.mainInfoValue}>{mainData.height}</div>
                          </div>
                        )}
                        {mainData.weight && (
                          <div className={styles.mainInfoItem}>
                            <div className={styles.mainInfoLabel}>Вес, кг</div>
                            <div className={styles.mainInfoValue}>{mainData.weight}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className={styles.surveyActions}>
                    {!hasGigaChatResponse && (
                      <button
                        className={`${styles.actionButton} ${styles.gigaChat}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          askGigaChat(entry);
                        }}
                        disabled={loadingGigaChat[entry.id]}
                      >
                        {loadingGigaChat[entry.id] ? 'Загрузка...' : 'Анализ от GigaChat'}
                      </button>
                    )}
                  </div>
                  <div className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}>
                    ▼
                  </div>
                </div>

                <div className={`${styles.surveyContent} ${isExpanded ? styles.expanded : ''}`}>
                  <div className={styles.detailsGrid}>
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
                          <div key={vIndex} className={styles.detailField}>
                            <div className={styles.detailLabel}>{getReadableFieldName(key)}</div>
                            <div className={styles.detailValue}>{getReadableValue(key, val)}</div>
                          </div>
                        );
                      } catch (e) {
                        console.error('Error parsing value:', e, value);
                        return null;
                      }
                    })}
                  </div>

                  {notesEntry && notesEntry.notes && notesEntry.notes.length > 0 && (
                    <div className={styles.notesSection}>
                      <h4 className={styles.notesTitle}>
                        Пометки, которые были сделаны при прохождении опросника
                      </h4>
                      <ul className={styles.notesList}>
                        {notesEntry.notes.map((note, i) => (
                          <li key={i}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {gptResponses[entry.id] && (
                    <div className={`${styles.responseSection} ${styles.gpt}`}>
                      <h4 className={`${styles.responseTitle} ${styles.gpt}`}>
                        Анализ данных от ChatGPT
                      </h4>
                      <div
                        className={styles.responseContent}
                        dangerouslySetInnerHTML={{
                          __html: simpleMarkdownToHtml(gptResponses[entry.id]),
                        }}
                      />
                    </div>
                  )}

                  {gigaChatResponses[entry.id] && (
                    <div className={`${styles.responseSection} ${styles.gigaChat}`}>
                      <h4 className={`${styles.responseTitle} ${styles.gigaChat}`}>
                        Анализ данных от GigaChat
                      </h4>
                      <div
                        className={styles.responseContent}
                        dangerouslySetInnerHTML={{
                          __html: simpleMarkdownToHtml(gigaChatResponses[entry.id]),
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.noData}>
          <p>История пройденных опросов пуста</p>
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Персональная информация</h1>

      <div className={styles.tabs}>
        <ul className={styles.tabsList}>
          <li>
            <button
              className={`${styles.tabButton} ${activeTab === 'info' ? styles.active : ''}`}
              onClick={() => setActiveTab('info')}
            >
              Персональная информация
            </button>
          </li>
          <li>
            <button
              className={`${styles.tabButton} ${activeTab === 'history' ? styles.active : ''}`}
              onClick={() => setActiveTab('history')}
            >
              История пройденных опросов
            </button>
          </li>
        </ul>
      </div>

      {activeTab === 'info' ? renderPersonalInfo() : renderSurveyHistory()}

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
    <BasePage title="">
      <DashboardContent />
    </BasePage>
  );
}
