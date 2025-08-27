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
  ThunderboltOutlined,
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

interface GigaChatResponse {
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
    symptomsEnergy: 'Симптомы: энергия',
    symptomsMood: 'Симптомы: настроение',
    symptomsDigestive: 'Симптомы: пищеварение',
    symptomsCardio: 'Симптомы: сердце',
    symptomsMusculoskeletal: 'Симптомы: ОДА',
    symptomsSkin: 'Симптомы: кожа',
    symptomsImmune: 'Симптомы: иммунитет',
    symptomsOther: 'Другие симптомы',
    symptomsDuration: 'Длительность симптомов',
    symptomsDoctor: 'Наблюдение у врача',
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
    pregnancyStatus: {
      pregnant: 'Беременность',
      lactation: 'Лактация',
      none: 'Нет',
    },
    pregnancyStage: {
      first: 'Первый триместр',
      second: 'Второй триместр',
      third: 'Третий триместр',
    },
    lactationStage: {
      first: 'Ранняя лактация',
      second: 'Средняя лактация',
      third: 'Поздняя лактация',
    },
    menstrualPain: {
      severe: 'Дисменорея',
      moderate: 'Умеренная дисменорея',
      none: 'Нет',
    },
    gynecologicalCondition: {
      pcos: 'СПКЯ',
      endometriosis: 'Эндометриоз',
      fibroids: 'Миома',
      other: 'Другое гинекологическое заболевание',
      none: 'Нет',
    },
    menopauseStatus: {
      pre: 'Пременопауза',
      active: 'Менопауза',
      post: 'Постменопауза',
      none: 'Репродуктивный возраст',
    },
    age: {
      under18: 'Младше 18 лет',
      '18-30': '18-30 лет',
      '31-45': '31-45 лет',
      '46-60': '46-60 лет',
      over60: 'Старше 60 лет',
    },
    cardio: {
      hypertension: 'Гипертония',
      ibs: 'ИБС',
      arrhythmia: 'Аритмия',
      varicose: 'Варикоз',
      other: 'Другое ССЗ',
    },
    cardioMeds: {
      yes: 'Препараты ССС',
    },
    gastro: {
      ulcer: 'Язвенная болезнь',
      gastritis: 'Гастрит',
      ibs: 'СРК',
      cholelithiasis: 'ЖКБ',
      other: 'Другое ЖКТ',
    },
    liver: {
      fatty: 'Жировой гепатоз',
      viral: 'Вирусный гепатит',
      cirrhosis: 'Цирроз',
      other: 'Другое заболевание печени',
    },
    endocrine: {
      dm1: 'СД1',
      dm2: 'СД2',
      other: 'Другое эндокринное',
    },
    diabetesControl: {
      insulin: 'Инсулин',
      oral: 'Пероральные противодиабетические',
      diet: 'Немедикаментозный контроль',
      combined: 'Комбинированный контроль',
    },
    thyroid: {
      hypo: 'Гипотиреоз',
      hyper: 'Гипертиреоз',
      autoimmune: 'Аутоиммунный тиреоидит',
      nodular: 'Узловой зоб',
      other: 'Другое заболевание щитовидной железы',
    },
    musculoskeletal: {
      osteoarthritis: 'Остеоартрит',
      ra: 'Ревматоидный артрит',
      osteoporosis: 'Остеопороз',
      other: 'Другое заболевание ОДА',
    },
    allergy: {
      seasonal: 'Поллиноз',
      other: 'Другие аллергии',
    },
    foodAllergy: {
      milk: 'Аллергия на молочные продукты',
      eggs: 'Аллергия на яйца',
      seafood: 'Аллергия на морепродукты/рыбу',
      nuts: 'Аллергия на орехи',
      gluten: 'Аллергия на глютен',
      soy: 'Аллергия на сою',
      other: 'Другая пищевая аллергия',
    },
    drugAllergy: {
      antibiotics: 'Аллергия на антибиотики',
      nsaids: 'Аллергия на НПВС',
      sulfa: 'Аллергия на сульфаниламиды',
      other: 'Другая лекарственная аллергия',
    },
    currentSupplements: {
      multivitamins: 'Принимает поливитамины',
      vitaminD: 'Принимает витамин D',
      omega3: 'Принимает Омега-3',
      calciumMagnesium: 'Принимает Ca/Mg',
      probiotics: 'Принимает пробиотики',
      iron: 'Принимает железо',
      proteinBCAA: 'Принимает протеин/BCAA',
      herbalExtracts: 'Принимает растительные БАДы',
      other: 'Принимает другие БАДы',
    },
    supplementDuration: {
      lessThanMonth: 'Недавний прием БАДов',
      oneToThreeMonths: 'Краткосрочный прием БАДов',
      threeToTwelveMonths: 'Средний срок приема БАДов',
      moreThanYear: 'Длительный прием БАДов',
    },
    supplementEffectiveness: {
      significant: 'Значительный положительный эффект',
      moderate: 'Умеренный положительный эффект',
      none: 'Отсутствие эффекта',
      negative: 'Негативный эффект',
    },
    supplementGoals: {
      energy: 'Цель: энергия',
      immunity: 'Цель: иммунитет',
      digestion: 'Цель: пищеварение',
      jointsBones: 'Цель: суставы/кости',
      skinHairNails: 'Цель: кожа/волосы/ногти',
      sleep: 'Цель: сон',
      cardiovascular: 'Цель: сердце/сосуды',
      cognitive: 'Цель: когнитивные функции',
      weightLoss: 'Цель: снижение веса',
      muscleGain: 'Цель: мышечная масса',
      stressMood: 'Цель: стресс/настроение',
      prevention: 'Цель: общая профилактика',
      other: 'Цель: другое',
    },
    supplementConcerns: {
      medicationInteraction: 'Опасение: взаимодействие с ЛС',
      sideEffects: 'Опасение: побочные эффекты',
      quality: 'Опасение: качество',
      effectiveness: 'Опасение: эффективность',
      overdose: 'Опасение: дозировка',
      none: 'Нет опасений',
    },
    medicalCheckupFrequency: {
      yearly: 'Ежегодно',
      everyTwoThreeYears: 'Один раз в 2-3 года',
      asNeeded: 'Только по необходимости, при появлении симптомов',
      rarely: 'Редко или никогда',
    },
    bloodTests: {
      both: 'Да, общий и биохимический анализы',
      general: 'Да, только общий анализ',
      none: 'Нет',
    },
    bloodTestAbnormalities: {
      anemia: 'Да, анемия/низкий гемоглобин',
      dyslipidemia: 'Да, повышенный холестерин/липиды',
      hyperglycemia: 'Да, повышенный сахар крови',
      liver: 'Да, нарушения функции печени',
      kidney: 'Да, нарушения функции почек',
      vitaminD: 'Да, дефицит витамина D',
      other: 'Да, другие',
      none: 'Нет, отклонений не выявлено',
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
    fruitsVeggies: {
      daily: 'Ежедневное потребление фруктов/овощей',
      regular: 'Регулярное потребление фруктов/овощей',
      irregular: 'Нерегулярное потребление фруктов/овощей',
      rare: 'Дефицит фруктов/овощей',
    },
    fishSeafood: {
      '2plus': 'Достаточное потребление рыбы',
      '1w': 'Умеренное потребление рыбы',
      '1-2m': 'Редкое потребление рыбы',
      rare: 'Дефицит рыбы',
    },
    dairy: {
      daily: 'Ежедневное потребление молочных',
      regular: 'Регулярное потребление молочных',
      irregular: 'Нерегулярное потребление молочных',
      rare: 'Дефицит молочных',
    },
    grains: {
      daily: 'Ежедневное потребление цельнозерновых',
      regular: 'Регулярное потребление цельнозерновых',
      irregular: 'Нерегулярное потребление цельнозерновых',
      rare: 'Дефицит цельнозерновых',
    },
    redMeat: {
      daily: 'Ежедневное потребление красного мяса',
      regular: 'Регулярное потребление красного мяса',
      irregular: 'Нерегулярное потребление красного мяса',
      rare: 'Дефицит красного мяса',
    },
    alcohol: {
      never: 'Не употребляю',
      rare: 'Редко (несколько раз в год)',
      moderate: 'Умеренно (1-2 раза в месяц)',
      regular: 'Регулярно (1-2 раза в неделю)',
      often: 'Часто (3 и более раз в неделю)',
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
    sleepProblems: {
      none: 'Нормальный сон',
      init: 'Инсомния (начало сна)',
      maintain: 'Инсомния (поддержание сна)',
      early: 'Инсомния (раннее пробуждение)',
      unrefreshing: 'Неосвежающий сон',
      apnea: 'Апноэ сна',
    },
    symptomsEnergy: {
      fatigue: 'Хроническая усталость',
      performance: 'Снижение работоспособности',
      weakness: 'Слабость',
      sleepiness: 'Дневная сонливость',
    },
    symptomsMood: {
      mood: 'Перепады настроения',
      irritability: 'Раздражительность',
      anxiety: 'Тревожность',
      depression: 'Подавленное настроение',
      concentration: 'Снижение концентрации',
      memory: 'Проблемы с памятью',
    },
    symptomsDigestive: {
      heartburn: 'Изжога',
      heaviness: 'Тяжесть в желудке',
      bloating: 'Вздутие живота',
      constipation: 'Запоры',
      diarrhea: 'Диарея',
      irregular: 'Нерегулярный стул',
      nausea: 'Тошнота',
    },
    symptomsCardio: {
      tachycardia: 'Тахикардия',
      arrhythmia: 'Аритмия',
      dyspnea: 'Одышка',
      edema: 'Отеки',
    },
    symptomsMusculoskeletal: {
      arthralgia: 'Артралгия',
      dorsalgia: 'Дорсалгия',
      myalgia: 'Миалгия',
      cramps: 'Мышечные судороги',
    },
    symptomsSkin: {
      dry: 'Сухость кожи',
      rash: 'Дерматит',
      hairLoss: 'Алопеция',
      brittleNails: 'Ломкость ногтей',
    },
    symptomsImmune: {
      cold: 'Частые ОРВИ',
      recovery: 'Снижение иммунитета',
      herpes: 'Рецидивирующий герпес',
      seasonal: 'Сезонные аллергии',
    },
    symptomsOther: {
      headache: 'Головные боли',
      dizzy: 'Головокружения',
      noAppetite: 'Снижение аппетита',
      increasedAppetite: 'Повышенный аппетит',
      nightSweats: 'Ночная потливость',
      other: 'Другие симптомы',
    },
    symptomsDuration: {
      acute: 'Острые симптомы',
      subacute: 'Подострые симптомы',
      chronic: 'Длительные симптомы',
      veryChronic: 'Хронические симптомы',
      unknown: 'Неопределенная длительность',
    },
    symptomsDoctor: {
      regular: 'Под наблюдением врача',
      once: 'Была консультация врача',
      plan: 'Планирует консультацию',
      self: 'Самолечение',
    },
    takesSupplements: {
      yes: 'Да',
      no: 'Нет',
    },
    regularMeds: {
      yes: 'Принимает лекарства',
      no: 'Не принимает лекарства',
    },
    regularMedsList: {
      antihypertensives: 'Принимает антигипертензивные',
      anticoagulants: 'Принимает антикоагулянты',
      hormones: 'Принимает гормоны',
      psychotropics: 'Принимает психотропные',
      antiepileptics: 'Принимает противоэпилептические',
      statins: 'Принимает статины',
      other: 'Принимает другие ЛС',
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

// Функция для простого преобразования markdown в HTML
function simpleMarkdownToHtml(md: string): string {
  if (!md) return '';
  return md
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*?)\*/gim, '<i>$1</i>')
    .replace(/^\s*[-*] (.*)$/gim, '<li>$1</li>')
    .replace(/\n/g, '<br />');
}

function DashboardContent() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [surveyHistory, setSurveyHistory] = useState<SurveyEntry[]>([]);
  const [notesHistory, setNotesHistory] = useState<NotesEntry[]>([]);
  const [loadingGpt, setLoadingGpt] = useState<{ [key: string]: boolean }>({});
  const [gptResponses, setGptResponses] = useState<{ [key: string]: string }>({});
  const [loadingGigaChat, setLoadingGigaChat] = useState<{ [key: string]: boolean }>({});
  const [gigaChatResponses, setGigaChatResponses] = useState<{ [key: string]: string }>({});

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

      setGptResponses((prev) => ({ ...prev, [entry.id]: data.content }));
      message.success('Анализ данных успешно получен');
    } catch (error) {
      console.error('Error getting GPT response:', error);
      message.error('Не удалось получить анализ данных');
    } finally {
      setLoadingGpt((prev) => ({ ...prev, [entry.id]: false }));
    }
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

  const renderSurveyTimeline = () => {
    if (!surveyHistory.length) {
      return <Typography.Text type="secondary">Нет пройденных опросников</Typography.Text>;
    }

    return (
      <Timeline>
        {surveyHistory.map((entry) => {
          const values = Array.isArray(entry.values) ? entry.values : [entry.values];
          const hasGptResponse = gptResponses[entry.id] !== undefined;
          const hasGigaChatResponse = gigaChatResponses[entry.id] !== undefined;
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
                  <Space>
                    {/* {!hasGptResponse && (
                      <Button
                        type="primary"
                        icon={<RobotOutlined />}
                        onClick={() => askGPT(entry)}
                        loading={loadingGpt[entry.id]}
                      >
                        Анализ от ChatGPT
                      </Button>
                    )} */}
                    {!hasGigaChatResponse && (
                      <Button
                        type="primary"
                        icon={<ThunderboltOutlined />}
                        onClick={() => askGigaChat(entry)}
                        loading={loadingGigaChat[entry.id]}
                        style={{ backgroundColor: '#722ed1', borderColor: '#722ed1' }}
                      >
                        Анализ от GigaChat
                      </Button>
                    )}
                  </Space>
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
                          <ul style={{ margin: 0, paddingLeft: 20 }}>
                            {notesEntry.notes.map((note, i) => (
                              <li key={i}>{note}</li>
                            ))}
                          </ul>
                        }
                        type="info"
                        showIcon
                        style={{ marginBottom: 16 }}
                      />
                    )}
                    {gptResponses[entry.id] && (
                      <Alert
                        message="Анализ данных от ChatGPT"
                        description={
                          <div
                            dangerouslySetInnerHTML={{
                              __html: simpleMarkdownToHtml(gptResponses[entry.id]),
                            }}
                          />
                        }
                        type="success"
                        showIcon
                        style={{ marginBottom: 16 }}
                      />
                    )}
                    {gigaChatResponses[entry.id] && (
                      <Alert
                        message="Анализ данных от GigaChat"
                        description={
                          <div
                            dangerouslySetInnerHTML={{
                              __html: simpleMarkdownToHtml(gigaChatResponses[entry.id]),
                            }}
                          />
                        }
                        type="success"
                        showIcon
                        style={{ backgroundColor: '#f6ffed', borderColor: '#722ed1' }}
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
