'use client';

import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, message, Radio, Checkbox } from 'antd';
import { useRouter } from 'next/navigation';
import { appwriteApi } from '@/lib/appwrite/api';
import { BasePage } from '@/components/dashboard/BasePage';
import { CustomSteps } from '@/components/ui/CustomSteps';
import { v4 as uuidv4 } from 'uuid';
import styles from './page.module.css';

interface SupplementsSurveyFormData {
  // TODO: Define the fields for the supplements survey
  gender?: string;
  // ...other fields
}

interface LocalState {
  gender?: string;
  pregnancyStatus?: string;
  pregnancyStage?: string;
  menstrualCycle?: string;
  menstrualPain?: string;
  gynecologicalCondition?: string;
  gynecologicalConditionOther?: string;
  menopauseStatus?: string;
  age?: string;
  height?: string;
  weight?: string;
  // Сердечно-сосудистые заболевания
  cardio?: string;
  cardioOther?: string;
  cardioMeds?: string;
  cardioMedsDetails?: string;
  // ЖКТ
  gastro?: string;
  gastroOther?: string;
  liver?: string;
  liverOther?: string;
  // Эндокринные заболевания
  endocrine?: string;
  endocrineOther?: string;
  diabetesControl?: string;
  thyroid?: string;
  thyroidOther?: string;
  // ОДА
  musculoskeletal?: string;
  musculoskeletalOther?: string;
  // Аллергии
  allergy?: string;
  allergyOther?: string;
  foodAllergy?: string[];
  foodAllergyOther?: string;
  drugAllergy?: string[];
  drugAllergyOther?: string;
  // Регулярные препараты
  regularMeds?: string;
  regularMedsList?: string[];
  regularMedsOther?: string;
  // Образ жизни
  physicalActivity?: string;
  dietType?: string;
  dietOther?: string;
  fruitsVeggies?: string;
  fishSeafood?: string;
  dairy?: string;
  grains?: string;
  redMeat?: string;
  alcohol?: string;
  smoking?: string;
  stress?: string;
  sleepHours?: string;
  sleepProblems?: string;
  // Симптомы и жалобы
  symptomsEnergy?: string[];
  symptomsMood?: string[];
  symptomsDigestive?: string[];
  symptomsCardio?: string[];
  symptomsMusculoskeletal?: string[];
  symptomsSkin?: string[];
  symptomsImmune?: string[];
  symptomsOther?: string;
  symptomsOtherText?: string;
  symptomsDuration?: string;
  symptomsDoctor?: string;
  // Дополнительные вопросы о БАДах
  takesSupplements?: 'yes' | 'no';
  currentSupplements?: string[];
  otherSupplements?: string;
  supplementDuration?: string;
  supplementEffectiveness?: string;
  supplementGoals?: string[];
  otherGoals?: string;
  supplementConcerns?: string[];
  medicalCheckupFrequency?: string;
  bloodTests?: string;
  bloodTestAbnormalities?: string[];
  otherAbnormalities?: string;
}

export default function SupplementsSurveyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const router = useRouter();
  const [notes, setNotes] = useState<string[]>([]);
  const [localState, setLocalState] = useState<LocalState>({});
  // const [bmi, setBmi] = useState<number | null>(null);

  // Универсальный обработчик для добавления пометок
  // const addNote = (note: string) => {
  //   setNotes((prev) => (prev.includes(note) ? prev : [...prev, note]));
  // };

  // Универсальный обработчик для изменения значений и переходов
  const handleChange = (key: string, value: any) => {
    setLocalState((prev) => {
      const newState = { ...prev, [key]: value };
      console.log('New state:', newState);
      return newState;
    });
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange('height', e.target.value);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange('weight', e.target.value);
  };

  useEffect(() => {
    console.log('State updated:', localState);
    updateAllNotes(localState);
  }, [localState]);

  // Новый обработчик для возраста и ИМТ
  const handleAgeChange = (value: string) => {
    setLocalState((prev: LocalState) => ({ ...prev, age: value }));
    // Обновляем пометки для возраста
    const newNotes = [
      ...notes.filter(
        (n) =>
          ![
            'Подросток',
            'Молодой возраст',
            'Средний возраст',
            'Старший возраст',
            'Пожилой возраст',
          ].includes(n)
      ),
    ];
    if (value === 'under18') newNotes.push('Подросток');
    if (value === '18-30') newNotes.push('Молодой возраст');
    if (value === '31-45') newNotes.push('Средний возраст');
    if (value === '46-60') newNotes.push('Старший возраст');
    if (value === 'over60') newNotes.push('Пожилой возраст');
    setNotes(newNotes);
  };

  // Универсальный обработчик пометок
  const updateAllNotes = (state: LocalState) => {
    // Обновляем все пометки на основе текущего состояния
    const newNotes: string[] = [];
    console.log(state.pregnancyStatus);
    console.log(state.pregnancyStage);
    console.log({ notes });

    // Пометки для ИМТ
    const height = Number(state.height);
    const weight = Number(state.weight);
    if (height && weight) {
      const bmiValue = +(weight / (height / 100) ** 2).toFixed(1);
      // setBmi(bmiValue);
      if (bmiValue < 18.5) newNotes.push('Недостаточный вес');
      else if (bmiValue < 25) newNotes.push('Нормальный вес');
      else if (bmiValue < 30) newNotes.push('Избыточный вес');
      else newNotes.push('Ожирение');
    }

    // Пометки для сердечно-сосудистых заболеваний
    if (state.cardio === 'hypertension') newNotes.push('Гипертония');
    if (state.cardio === 'ibs') newNotes.push('ИБС');
    if (state.cardio === 'arrhythmia') newNotes.push('Аритмия');
    if (state.cardio === 'varicose') newNotes.push('Варикоз');
    if (state.cardio === 'other') newNotes.push('Другое ССЗ');
    if (state.cardioMeds === 'yes') newNotes.push('Препараты ССС');

    // Пометки для ЖКТ
    if (state.gastro === 'ulcer') newNotes.push('Язвенная болезнь');
    if (state.gastro === 'gastritis') newNotes.push('Гастрит');
    if (state.gastro === 'ibs') newNotes.push('СРК');
    if (state.gastro === 'cholelithiasis') newNotes.push('ЖКБ');
    if (state.gastro === 'other') newNotes.push('Другое ЖКТ');

    // Пометки для заболеваний печени
    if (state.liver === 'fatty') newNotes.push('Жировой гепатоз');
    if (state.liver === 'viral') newNotes.push('Вирусный гепатит');
    if (state.liver === 'cirrhosis') newNotes.push('Цирроз');
    if (state.liver === 'other') newNotes.push('Другое заболевание печени');

    // Пометки для эндокринных заболеваний
    if (state.endocrine === 'dm1') newNotes.push('СД1');
    if (state.endocrine === 'dm2') newNotes.push('СД2');
    if (state.endocrine === 'other') newNotes.push('Другое эндокринное');

    // Пометки для контроля диабета
    if (state.diabetesControl === 'insulin') newNotes.push('Инсулин');
    if (state.diabetesControl === 'oral') newNotes.push('Пероральные противодиабетические');
    if (state.diabetesControl === 'diet') newNotes.push('Немедикаментозный контроль');
    if (state.diabetesControl === 'combined') newNotes.push('Комбинированный контроль');

    // Пометки для заболеваний щитовидной железы
    if (state.thyroid === 'hypo') newNotes.push('Гипотиреоз');
    if (state.thyroid === 'hyper') newNotes.push('Гипертиреоз');
    if (state.thyroid === 'autoimmune') newNotes.push('Аутоиммунный тиреоидит');
    if (state.thyroid === 'nodular') newNotes.push('Узловой зоб');
    if (state.thyroid === 'other') newNotes.push('Другое заболевание щитовидной железы');

    // Пометки для заболеваний ОДА
    if (state.musculoskeletal === 'osteoarthritis') newNotes.push('Остеоартрит');
    if (state.musculoskeletal === 'ra') newNotes.push('Ревматоидный артрит');
    if (state.musculoskeletal === 'osteoporosis') newNotes.push('Остеопороз');
    if (state.musculoskeletal === 'other') newNotes.push('Другое заболевание ОДА');

    // Пометки для аллергий
    if (state.allergy === 'seasonal') newNotes.push('Поллиноз');
    if (state.allergy === 'other') newNotes.push('Другие аллергии');

    // Пометки для пищевых аллергий
    if (state.foodAllergy?.includes('milk')) newNotes.push('Аллергия на молочные продукты');
    if (state.foodAllergy?.includes('eggs')) newNotes.push('Аллергия на яйца');
    if (state.foodAllergy?.includes('seafood')) newNotes.push('Аллергия на морепродукты');
    if (state.foodAllergy?.includes('nuts')) newNotes.push('Аллергия на орехи');
    if (state.foodAllergy?.includes('gluten')) newNotes.push('Аллергия на глютен');
    if (state.foodAllergy?.includes('soy')) newNotes.push('Аллергия на сою');
    if (state.foodAllergy?.includes('other')) newNotes.push('Другая пищевая аллергия');

    // Пометки для лекарственных аллергий
    if (state.drugAllergy?.includes('antibiotics')) newNotes.push('Аллергия на антибиотики');
    if (state.drugAllergy?.includes('nsaids')) newNotes.push('Аллергия на НПВС');
    if (state.drugAllergy?.includes('sulfa')) newNotes.push('Аллергия на сульфаниламиды');
    if (state.drugAllergy?.includes('other')) newNotes.push('Другая лекарственная аллергия');

    // Пометки для регулярных препаратов
    if (state.regularMedsList?.includes('antihypertensives'))
      newNotes.push('Принимает антигипертензивные');
    if (state.regularMedsList?.includes('anticoagulants'))
      newNotes.push('Принимает антикоагулянты');
    if (state.regularMedsList?.includes('hormones')) newNotes.push('Принимает гормоны');
    if (state.regularMedsList?.includes('psychotropics')) newNotes.push('Принимает психотропные');
    if (state.regularMedsList?.includes('antiepileptics'))
      newNotes.push('Принимает противоэпилептические');
    if (state.regularMedsList?.includes('statins')) newNotes.push('Принимает статины');
    if (state.regularMedsList?.includes('other')) newNotes.push('Принимает другие ЛС');

    // Пометки для беременности/лактации
    if (state.pregnancyStatus === 'pregnant') {
      if (state.pregnancyStage === 'first') newNotes.push('Первый триместр');
      if (state.pregnancyStage === 'second') newNotes.push('Второй триместр');
      if (state.pregnancyStage === 'third') newNotes.push('Третий триместр');
      newNotes.push('Беременность');
    } else if (state.pregnancyStatus === 'lactation') {
      if (state.pregnancyStage === 'first') newNotes.push('Ранняя лактация');
      if (state.pregnancyStage === 'second') newNotes.push('Средняя лактация');
      if (state.pregnancyStage === 'third') newNotes.push('Поздняя лактация');
      newNotes.push('Лактация');
    }

    // Пометки для менструальных болей
    if (state.menstrualPain === 'severe') newNotes.push('Дисменорея');
    if (state.menstrualPain === 'moderate') newNotes.push('Умеренная дисменорея');

    // Пометки для гинекологических заболеваний
    if (state.gynecologicalCondition === 'pcos') newNotes.push('СПКЯ');
    if (state.gynecologicalCondition === 'endometriosis') newNotes.push('Эндометриоз');
    if (state.gynecologicalCondition === 'fibroids') newNotes.push('Миома');
    if (state.gynecologicalCondition === 'other')
      newNotes.push('Другое гинекологическое заболевание');

    // Пометки для менопаузы
    if (state.menopauseStatus === 'pre') newNotes.push('Пременопауза');
    if (state.menopauseStatus === 'active') newNotes.push('Менопауза');
    if (state.menopauseStatus === 'post') newNotes.push('Постменопауза');
    if (state.menopauseStatus === 'none') newNotes.push('Репродуктивный возраст');

    // Пометки для добавок
    if (state.takesSupplements === 'yes') {
      if (state.currentSupplements?.includes('multivitamins'))
        newNotes.push('Принимает поливитамины');
      if (state.currentSupplements?.includes('vitaminD')) newNotes.push('Принимает витамин D');
      if (state.currentSupplements?.includes('omega3')) newNotes.push('Принимает Омега-3');
      if (state.currentSupplements?.includes('calciumMagnesium')) newNotes.push('Принимает Ca/Mg');
      if (state.currentSupplements?.includes('probiotics')) newNotes.push('Принимает пробиотики');
      if (state.currentSupplements?.includes('iron')) newNotes.push('Принимает железо');
      if (state.currentSupplements?.includes('proteinBCAA'))
        newNotes.push('Принимает протеин/BCAA');
      if (state.currentSupplements?.includes('herbalExtracts'))
        newNotes.push('Принимает растительные БАДы');
      if (state.currentSupplements?.includes('other')) newNotes.push('Принимает другие БАДы');

      if (state.supplementDuration === 'lessThanMonth') newNotes.push('Недавний прием БАДов');
      if (state.supplementDuration === 'oneToThreeMonths')
        newNotes.push('Краткосрочный прием БАДов');
      if (state.supplementDuration === 'threeToTwelveMonths')
        newNotes.push('Средний срок приема БАДов');
      if (state.supplementDuration === 'moreThanYear') newNotes.push('Длительный прием БАДов');

      if (state.supplementEffectiveness === 'significant')
        newNotes.push('Значительный положительный эффект');
      if (state.supplementEffectiveness === 'moderate')
        newNotes.push('Умеренный положительный эффект');
      if (state.supplementEffectiveness === 'none') newNotes.push('Отсутствие эффекта');
      if (state.supplementEffectiveness === 'negative') newNotes.push('Негативный эффект');
    }

    // Пометки для целей приема добавок
    if (state.supplementGoals?.includes('energy')) newNotes.push('Цель: энергия');
    if (state.supplementGoals?.includes('immunity')) newNotes.push('Цель: иммунитет');
    if (state.supplementGoals?.includes('digestion')) newNotes.push('Цель: пищеварение');
    if (state.supplementGoals?.includes('jointsBones')) newNotes.push('Цель: суставы/кости');
    if (state.supplementGoals?.includes('skinHairNails')) newNotes.push('Цель: кожа/волосы/ногти');
    if (state.supplementGoals?.includes('sleep')) newNotes.push('Цель: сон');
    if (state.supplementGoals?.includes('cardiovascular')) newNotes.push('Цель: сердце/сосуды');
    if (state.supplementGoals?.includes('cognitive')) newNotes.push('Цель: когнитивные функции');
    if (state.supplementGoals?.includes('weightLoss')) newNotes.push('Цель: снижение веса');
    if (state.supplementGoals?.includes('muscleGain')) newNotes.push('Цель: мышечная масса');
    if (state.supplementGoals?.includes('stressMood')) newNotes.push('Цель: стресс/настроение');
    if (state.supplementGoals?.includes('prevention')) newNotes.push('Цель: общая профилактика');
    if (state.supplementGoals?.includes('other')) newNotes.push('Цель: другое');

    // Пометки для опасений
    if (state.supplementConcerns?.includes('medicationInteraction'))
      newNotes.push('Опасение: взаимодействие с ЛС');
    if (state.supplementConcerns?.includes('sideEffects'))
      newNotes.push('Опасение: побочные эффекты');
    if (state.supplementConcerns?.includes('quality')) newNotes.push('Опасение: качество');
    if (state.supplementConcerns?.includes('effectiveness'))
      newNotes.push('Опасение: эффективность');
    if (state.supplementConcerns?.includes('overdose')) newNotes.push('Опасение: дозировка');
    if (state.supplementConcerns?.includes('none')) newNotes.push('Нет опасений');

    // Пометки для медосмотров
    if (state.medicalCheckupFrequency === 'yearly') newNotes.push('Регулярные медосмотры');
    if (state.medicalCheckupFrequency === 'everyTwoThreeYears')
      newNotes.push('Периодические медосмотры');
    if (state.medicalCheckupFrequency === 'asNeeded') newNotes.push('Медосмотры по необходимости');
    if (state.medicalCheckupFrequency === 'rarely') newNotes.push('Редкие медосмотры');

    // Пометки для анализов крови
    if (state.bloodTestAbnormalities?.includes('anemia')) newNotes.push('Анемия');
    if (state.bloodTestAbnormalities?.includes('dyslipidemia')) newNotes.push('Дислипидемия');
    if (state.bloodTestAbnormalities?.includes('hyperglycemia')) newNotes.push('Гипергликемия');
    if (state.bloodTestAbnormalities?.includes('liver')) newNotes.push('Нарушения печеночных проб');
    if (state.bloodTestAbnormalities?.includes('kidney')) newNotes.push('Нарушения почечных проб');
    if (state.bloodTestAbnormalities?.includes('vitaminD')) newNotes.push('Дефицит витамина D');
    if (state.bloodTestAbnormalities?.includes('other'))
      newNotes.push('Другие нарушения в анализах');

    // Пометки для регулярных препаратов
    if (state.regularMedsList?.includes('statins')) newNotes.push('Принимает статины');
    if (state.regularMedsList?.includes('other')) newNotes.push('Принимает другие ЛС');

    // Пометки для образа жизни
    // Физическая активность
    if (state.physicalActivity === 'low') newNotes.push('Низкая активность');
    if (state.physicalActivity === 'moderate') newNotes.push('Умеренная активность');
    if (state.physicalActivity === 'high') newNotes.push('Высокая активность');
    if (state.physicalActivity === 'pro') newNotes.push('Профессиональная активность');

    // Тип питания
    if (state.dietType === 'regular') newNotes.push('Обычное питание');
    if (state.dietType === 'vegetarian') newNotes.push('Вегетарианство');
    if (state.dietType === 'vegan') newNotes.push('Веганство');
    if (state.dietType === 'glutenFree') newNotes.push('Безглютеновая диета');
    if (state.dietType === 'keto') newNotes.push('Кето-диета');
    if (state.dietType === 'lowCarb') newNotes.push('Низкоуглеводная диета');
    if (state.dietType === 'intermittent') newNotes.push('Интервальное голодание');
    if (state.dietType === 'other') newNotes.push('Особый режим питания');

    // Потребление продуктов
    if (state.fruitsVeggies === 'daily') newNotes.push('Ежедневное потребление фруктов/овощей');
    if (state.fruitsVeggies === 'regular') newNotes.push('Регулярное потребление фруктов/овощей');
    if (state.fruitsVeggies === 'irregular')
      newNotes.push('Нерегулярное потребление фруктов/овощей');
    if (state.fruitsVeggies === 'rare') newNotes.push('Дефицит фруктов/овощей');

    if (state.fishSeafood === '2plus') newNotes.push('Достаточное потребление рыбы');
    if (state.fishSeafood === '1w') newNotes.push('Умеренное потребление рыбы');
    if (state.fishSeafood === '1-2m') newNotes.push('Редкое потребление рыбы');
    if (state.fishSeafood === 'rare') newNotes.push('Дефицит рыбы');

    if (state.dairy === 'daily') newNotes.push('Ежедневное потребление молочных');
    if (state.dairy === 'regular') newNotes.push('Регулярное потребление молочных');
    if (state.dairy === 'irregular') newNotes.push('Нерегулярное потребление молочных');
    if (state.dairy === 'rare') newNotes.push('Дефицит молочных');

    if (state.grains === 'daily') newNotes.push('Ежедневное потребление цельнозерновых');
    if (state.grains === 'regular') newNotes.push('Регулярное потребление цельнозерновых');
    if (state.grains === 'irregular') newNotes.push('Нерегулярное потребление цельнозерновых');
    if (state.grains === 'rare') newNotes.push('Дефицит цельнозерновых');

    if (state.redMeat === 'daily') newNotes.push('Высокое потребление красного мяса');
    if (state.redMeat === 'regular') newNotes.push('Умеренно-высокое потребление красного мяса');
    if (state.redMeat === 'irregular') newNotes.push('Умеренное потребление красного мяса');
    if (state.redMeat === 'rare') newNotes.push('Низкое потребление красного мяса');

    // Алкоголь
    if (state.alcohol === 'never') newNotes.push('Не употребляет алкоголь');
    if (state.alcohol === 'rare') newNotes.push('Редкое употребление алкоголя');
    if (state.alcohol === 'moderate') newNotes.push('Умеренное употребление алкоголя');
    if (state.alcohol === 'regular') newNotes.push('Регулярное употребление алкоголя');
    if (state.alcohol === 'frequent') newNotes.push('Частое употребление алкоголя');

    // Курение
    if (state.smoking === 'yes') newNotes.push('Курение');
    if (state.smoking === 'episodic') newNotes.push('Эпизодическое курение');
    if (state.smoking === 'vape') newNotes.push('Вейпинг');
    if (state.smoking === 'quitRecent') newNotes.push('Недавно бросил(а) курить');
    if (state.smoking === 'quitLong') newNotes.push('Бывший курильщик');
    if (state.smoking === 'never') newNotes.push('Некурящий');

    // Стресс
    if (state.stress === 'low') newNotes.push('Низкий стресс');
    if (state.stress === 'moderate') newNotes.push('Умеренный стресс');
    if (state.stress === 'high') newNotes.push('Высокий стресс');
    if (state.stress === 'chronic') newNotes.push('Хронический стресс');

    // Сон
    if (state.sleepHours === 'lt5') newNotes.push('Критически недостаточный сон');
    if (state.sleepHours === '5-6') newNotes.push('Недостаточный сон');
    if (state.sleepHours === '7-8') newNotes.push('Оптимальный сон');
    if (state.sleepHours === 'gt8') newNotes.push('Продолжительный сон');

    if (state.sleepProblems === 'none') newNotes.push('Нормальный сон');
    if (state.sleepProblems === 'init') newNotes.push('Инсомния (начало сна)');
    if (state.sleepProblems === 'maintain') newNotes.push('Инсомния (поддержание сна)');
    if (state.sleepProblems === 'early') newNotes.push('Инсомния (раннее пробуждение)');
    if (state.sleepProblems === 'unrefreshing') newNotes.push('Неосвежающий сон');
    if (state.sleepProblems === 'apnea') newNotes.push('Апноэ сна');

    // Пометки для симптомов и жалоб
    // Энергия и работоспособность
    if (state.symptomsEnergy?.includes('fatigue')) newNotes.push('Хроническая усталость');
    if (state.symptomsEnergy?.includes('performance')) newNotes.push('Снижение работоспособности');
    if (state.symptomsEnergy?.includes('weakness')) newNotes.push('Слабость');
    if (state.symptomsEnergy?.includes('sleepiness')) newNotes.push('Дневная сонливость');

    // Настроение и психический статус
    if (state.symptomsMood?.includes('mood')) newNotes.push('Перепады настроения');
    if (state.symptomsMood?.includes('irritability')) newNotes.push('Раздражительность');
    if (state.symptomsMood?.includes('anxiety')) newNotes.push('Тревожность');
    if (state.symptomsMood?.includes('depression')) newNotes.push('Подавленное настроение');
    if (state.symptomsMood?.includes('concentration')) newNotes.push('Снижение концентрации');
    if (state.symptomsMood?.includes('memory')) newNotes.push('Проблемы с памятью');

    // Пищеварительная система
    if (state.symptomsDigestive?.includes('heartburn')) newNotes.push('Изжога');
    if (state.symptomsDigestive?.includes('heaviness')) newNotes.push('Тяжесть в желудке');
    if (state.symptomsDigestive?.includes('bloating')) newNotes.push('Вздутие живота');
    if (state.symptomsDigestive?.includes('constipation')) newNotes.push('Запоры');
    if (state.symptomsDigestive?.includes('diarrhea')) newNotes.push('Диарея');
    if (state.symptomsDigestive?.includes('irregular')) newNotes.push('Нерегулярный стул');
    if (state.symptomsDigestive?.includes('nausea')) newNotes.push('Тошнота');

    // Сердечно-сосудистая система
    if (state.symptomsCardio?.includes('tachycardia')) newNotes.push('Тахикардия');
    if (state.symptomsCardio?.includes('arrhythmia')) newNotes.push('Аритмия');
    if (state.symptomsCardio?.includes('dyspnea')) newNotes.push('Одышка');
    if (state.symptomsCardio?.includes('edema')) newNotes.push('Отеки');

    // Опорно-двигательный аппарат
    if (state.symptomsMusculoskeletal?.includes('arthralgia')) newNotes.push('Артралгия');
    if (state.symptomsMusculoskeletal?.includes('dorsalgia')) newNotes.push('Дорсалгия');
    if (state.symptomsMusculoskeletal?.includes('myalgia')) newNotes.push('Миалгия');
    if (state.symptomsMusculoskeletal?.includes('cramps')) newNotes.push('Мышечные судороги');

    // Кожа, волосы, ногти
    if (state.symptomsSkin?.includes('dry')) newNotes.push('Сухость кожи');
    if (state.symptomsSkin?.includes('rash')) newNotes.push('Дерматит');
    if (state.symptomsSkin?.includes('hairLoss')) newNotes.push('Алопеция');
    if (state.symptomsSkin?.includes('brittleNails')) newNotes.push('Ломкость ногтей');

    // Иммунная система
    if (state.symptomsImmune?.includes('cold')) newNotes.push('Частые ОРВИ');
    if (state.symptomsImmune?.includes('recovery')) newNotes.push('Снижение иммунитета');
    if (state.symptomsImmune?.includes('herpes')) newNotes.push('Рецидивирующий герпес');
    if (state.symptomsImmune?.includes('seasonal')) newNotes.push('Сезонные аллергии');

    // Другие симптомы
    if (state.symptomsOther?.includes('headache')) newNotes.push('Головные боли');
    if (state.symptomsOther?.includes('dizzy')) newNotes.push('Головокружения');
    if (state.symptomsOther?.includes('noAppetite')) newNotes.push('Снижение аппетита');
    if (state.symptomsOther?.includes('increasedAppetite')) newNotes.push('Повышенный аппетит');
    if (state.symptomsOther?.includes('nightSweats')) newNotes.push('Ночная потливость');
    if (state.symptomsOther?.includes('other')) newNotes.push('Другие симптомы');

    // Длительность симптомов
    if (state.symptomsDuration === 'acute') newNotes.push('Острые симптомы');
    if (state.symptomsDuration === 'subacute') newNotes.push('Подострые симптомы');
    if (state.symptomsDuration === 'chronic') newNotes.push('Длительные симптомы');
    if (state.symptomsDuration === 'veryChronic') newNotes.push('Хронические симптомы');
    if (state.symptomsDuration === 'unknown') newNotes.push('Неопределенная длительность');

    // Обращение к врачу
    if (state.symptomsDoctor === 'regular') newNotes.push('Под наблюдением врача');
    if (state.symptomsDoctor === 'once') newNotes.push('Была консультация врача');
    if (state.symptomsDoctor === 'plan') newNotes.push('Планирует консультацию');
    if (state.symptomsDoctor === 'self') newNotes.push('Самолечение');

    setNotes(newNotes);
  };

  const handleSurveyChange = (key: string, value: any) => {
    setLocalState((prev: LocalState) => ({ ...prev, [key]: value }));
  };

  const steps = [
    {
      title: 'Основная информация',
      content: (
        <>
          {/* Вопрос 1 */}
          <Form.Item
            name="gender"
            label="Укажите ваш пол"
            rules={[{ required: true, message: 'Пожалуйста, выберите ваш пол' }]}
            className={styles.formItem}
          >
            <Radio.Group
              onChange={(e) => {
                handleChange('gender', e.target.value);
                form.setFieldsValue({ gender: e.target.value });
              }}
              value={localState.gender}
              className={styles.radioGroup}
            >
              <Radio value="female">Женский</Radio>
              <Radio value="male">Мужской</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Вопрос 2 */}
          {localState.gender === 'female' && (
            <Form.Item
              name="pregnancyStatus"
              label="Вы беременны или кормите грудью?"
              rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
            >
              <Radio.Group
                onChange={(e) => {
                  handleChange('pregnancyStatus', e.target.value);
                  form.setFieldsValue({ pregnancyStatus: e.target.value });
                }}
                value={localState.pregnancyStatus}
              >
                <Radio value="pregnant">Да, беременна</Radio>
                <Radio value="lactation">Да, кормлю грудью</Radio>
                <Radio value="none">Нет</Radio>
              </Radio.Group>
            </Form.Item>
          )}

          {/* Вопрос 2.1 */}
          {localState.gender === 'female' &&
            localState.pregnancyStatus &&
            ['pregnant', 'lactation'].includes(localState.pregnancyStatus) && (
              <Form.Item
                name="pregnancyStage"
                label="На каком сроке беременности вы находитесь? / Как долго вы кормите грудью?"
                rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
              >
                <Radio.Group
                  onChange={(e) => {
                    handleChange('pregnancyStage', e.target.value);
                    form.setFieldsValue({ pregnancyStage: e.target.value });
                  }}
                  value={localState.pregnancyStage}
                >
                  <Radio value="first">Первый триместр / До 3 месяцев</Radio>
                  <Radio value="second">Второй триместр / 3-6 месяцев</Radio>
                  <Radio value="third">Третий триместр / Более 6 месяцев</Radio>
                </Radio.Group>
              </Form.Item>
            )}

          {/* Вопрос 2.2 */}
          {localState.gender === 'female' && localState.pregnancyStatus === 'none' && (
            <Form.Item
              name="menstrualCycle"
              label="У вас регулярный менструальный цикл?"
              rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
            >
              <Radio.Group
                onChange={(e) => {
                  handleChange('menstrualCycle', e.target.value);
                  form.setFieldsValue({ menstrualCycle: e.target.value });
                }}
                value={localState.menstrualCycle}
              >
                <Radio value="yes">Да</Radio>
                <Radio value="no">Нет</Radio>
              </Radio.Group>
            </Form.Item>
          )}

          {/* Вопрос 2.3 */}
          {localState.gender === 'female' &&
            localState.pregnancyStatus === 'none' &&
            localState.menstrualCycle === 'yes' && (
              <Form.Item
                name="menstrualPain"
                label="Испытываете ли вы болезненные менструации?"
                rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
              >
                <Radio.Group
                  onChange={(e) => {
                    handleChange('menstrualPain', e.target.value);
                    form.setFieldsValue({ menstrualPain: e.target.value });
                  }}
                  value={localState.menstrualPain}
                >
                  <Radio value="severe">Да, сильные боли</Radio>
                  <Radio value="moderate">Да, умеренные боли</Radio>
                  <Radio value="none">Нет, практически безболезненные</Radio>
                </Radio.Group>
              </Form.Item>
            )}

          {/* Вопрос 2.4 */}
          {localState.gender === 'female' &&
            localState.pregnancyStatus === 'none' &&
            localState.menstrualCycle === 'no' && (
              <>
                <Form.Item
                  name="gynecologicalCondition"
                  label="Есть ли у вас диагностированные гинекологические заболевания?"
                  rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
                >
                  <Radio.Group
                    onChange={(e) => {
                      handleChange('gynecologicalCondition', e.target.value);
                      form.setFieldsValue({ gynecologicalCondition: e.target.value });
                    }}
                    value={localState.gynecologicalCondition}
                  >
                    <Radio value="pcos">Синдром поликистозных яичников (СПКЯ)</Radio>
                    <Radio value="endometriosis">Эндометриоз</Radio>
                    <Radio value="fibroids">Миома матки</Radio>
                    <Radio value="other">Другое (укажите)</Radio>
                    <Radio value="none">Нет</Radio>
                  </Radio.Group>
                </Form.Item>
                {localState.gynecologicalCondition === 'other' && (
                  <Form.Item
                    name="gynecologicalConditionOther"
                    rules={[{ required: true, message: 'Пожалуйста, укажите заболевание' }]}
                  >
                    <Input
                      placeholder="Укажите заболевание"
                      onChange={(e) => {
                        setLocalState((prev: LocalState) => ({
                          ...prev,
                          gynecologicalConditionOther: e.target.value,
                        }));
                      }}
                    />
                  </Form.Item>
                )}
              </>
            )}

          {/* Вопрос 2.5 */}
          {localState.gender === 'female' &&
            localState.pregnancyStatus === 'none' &&
            localState.menstrualCycle === 'no' &&
            localState.gynecologicalCondition &&
            (localState.gynecologicalCondition === 'none' ||
              localState.gynecologicalCondition === 'other' ||
              ['pcos', 'endometriosis', 'fibroids'].includes(
                localState.gynecologicalCondition
              )) && (
              <Form.Item
                name="menopauseStatus"
                label="Находитесь ли вы в периоде менопаузы?"
                rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
              >
                <Radio.Group
                  onChange={(e) => {
                    handleChange('menopauseStatus', e.target.value);
                    form.setFieldsValue({ menopauseStatus: e.target.value });
                  }}
                  value={localState.menopauseStatus}
                >
                  <Radio value="pre">Да, пременопауза (начальные симптомы)</Radio>
                  <Radio value="active">Да, менопауза</Radio>
                  <Radio value="post">Да, постменопауза</Radio>
                  <Radio value="none">Нет</Radio>
                </Radio.Group>
              </Form.Item>
            )}

          {/* Список пометок */}
          {notes.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <b>Пометки:</b> {notes.join(', ')}
            </div>
          )}
        </>
      ),
    },
    {
      title: 'Общая информация',
      content: (
        <>
          {/* Вопрос 3 */}
          <Form.Item
            name="age"
            label="Укажите ваш возраст"
            rules={[{ required: true, message: 'Пожалуйста, выберите ваш возраст' }]}
          >
            <Radio.Group onChange={(e) => handleAgeChange(e.target.value)} value={localState.age}>
              <Radio value="under18">Младше 18 лет</Radio>
              <Radio value="18-30">18-30 лет</Radio>
              <Radio value="31-45">31-45 лет</Radio>
              <Radio value="46-60">46-60 лет</Radio>
              <Radio value="over60">Старше 60 лет</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Вопрос 4 и 5 - Рост и вес в одной строке */}
          <div className={styles.inputGroup}>
            <Form.Item
              label="Укажите ваш рост"
              name="height"
              rules={[{ required: true, message: 'Пожалуйста, введите рост' }]}
              className={styles.formItem}
            >
              <Input
                type="number"
                min={100}
                max={250}
                onChange={handleHeightChange}
                value={localState.height}
                placeholder="165см"
              />
            </Form.Item>
            <Form.Item
              label="Укажите ваш вес"
              name="weight"
              rules={[{ required: true, message: 'Пожалуйста, введите вес' }]}
              className={styles.formItem}
            >
              <Input
                type="number"
                min={30}
                max={300}
                onChange={handleWeightChange}
                value={localState.weight}
                placeholder="60кг"
              />
            </Form.Item>
          </div>
          {/* Список пометок */}
          {notes.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <b>Пометки:</b> {notes.join(', ')}
            </div>
          )}
        </>
      ),
    },
    {
      title: 'Хронические заболевания',
      content: (
        <>
          {/* Вопрос 5 */}
          <Form.Item
            name="cardio"
            label="Имеются ли у вас хронические заболевания сердечно-сосудистой системы?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => handleSurveyChange('cardio', e.target.value)}>
              <Radio value="hypertension">Да, гипертония (повышенное давление)</Radio>
              <Radio value="ibs">Да, ишемическая болезнь сердца</Radio>
              <Radio value="arrhythmia">Да, аритмия</Radio>
              <Radio value="varicose">Да, варикозное расширение вен</Radio>
              <Radio value="other">Да, другое (укажите)</Radio>
              <Radio value="none">Нет</Radio>
            </Radio.Group>
          </Form.Item>

          {localState.cardio === 'other' && (
            <Form.Item
              name="cardioOther"
              rules={[{ required: true, message: 'Пожалуйста, укажите заболевание' }]}
            >
              <Input
                placeholder="Укажите заболевание"
                onChange={(e) => {
                  handleSurveyChange('cardioOther', e.target.value);
                }}
              />
            </Form.Item>
          )}

          {localState.cardio && localState.cardio !== 'none' && (
            <>
              {/* Вопрос 5.1 */}
              <Form.Item
                name="cardioMeds"
                label="Принимаете ли вы регулярно препараты для лечения сердечно-сосудистых заболеваний?"
                rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
              >
                <Radio.Group onChange={(e) => handleSurveyChange('cardioMeds', e.target.value)}>
                  <Radio value="yes">Да</Radio>
                  <Radio value="no">Нет</Radio>
                </Radio.Group>
              </Form.Item>

              {localState.cardioMeds === 'yes' && (
                <Form.Item
                  name="cardioMedsDetails"
                  rules={[{ required: true, message: 'Пожалуйста, укажите препараты' }]}
                >
                  <Input.TextArea
                    placeholder="Укажите препараты"
                    onChange={(e) => {
                      handleSurveyChange('cardioMedsDetails', e.target.value);
                    }}
                  />
                </Form.Item>
              )}
            </>
          )}

          {/* Вопрос 6 */}
          <Form.Item
            name="gastro"
            label="Имеются ли у вас заболевания желудочно-кишечного тракта?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => handleSurveyChange('gastro', e.target.value)}>
              <Radio value="ulcer">Да, язвенная болезнь желудка/12-перстной кишки</Radio>
              <Radio value="gastritis">Да, гастрит</Radio>
              <Radio value="ibs">Да, синдром раздраженного кишечника</Radio>
              <Radio value="gallstones">Да, желчнокаменная болезнь</Radio>
              <Radio value="liver">Да, заболевания печени</Radio>
              <Radio value="other">Да, другое (укажите)</Radio>
              <Radio value="none">Нет</Radio>
            </Radio.Group>
          </Form.Item>

          {localState.gastro === 'other' && (
            <Form.Item
              name="gastroOther"
              rules={[{ required: true, message: 'Пожалуйста, укажите заболевание' }]}
            >
              <Input
                placeholder="Укажите заболевание"
                onChange={(e) => {
                  handleSurveyChange('gastroOther', e.target.value);
                }}
              />
            </Form.Item>
          )}

          {localState.gastro === 'liver' && (
            <>
              {/* Вопрос 6.1 */}
              <Form.Item
                name="liver"
                label="Уточните заболевание печени:"
                rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
              >
                <Radio.Group onChange={(e) => handleSurveyChange('liver', e.target.value)}>
                  <Radio value="fatty">Жировой гепатоз</Radio>
                  <Radio value="viral">Вирусный гепатит</Radio>
                  <Radio value="cirrhosis">Цирроз</Radio>
                  <Radio value="other">Другое (укажите)</Radio>
                </Radio.Group>
              </Form.Item>

              {localState.liver === 'other' && (
                <Form.Item
                  name="liverOther"
                  rules={[{ required: true, message: 'Пожалуйста, укажите заболевание' }]}
                >
                  <Input
                    placeholder="Укажите заболевание"
                    onChange={(e) => {
                      handleSurveyChange('liverOther', e.target.value);
                    }}
                  />
                </Form.Item>
              )}
            </>
          )}

          {/* Вопрос 7 */}
          <Form.Item
            name="endocrine"
            label="Имеются ли у вас эндокринные заболевания?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => handleSurveyChange('endocrine', e.target.value)}>
              <Radio value="dm1">Да, сахарный диабет 1 типа</Radio>
              <Radio value="dm2">Да, сахарный диабет 2 типа</Radio>
              <Radio value="thyroid">Да, заболевания щитовидной железы</Radio>
              <Radio value="other">Да, другое (укажите)</Radio>
              <Radio value="none">Нет</Radio>
            </Radio.Group>
          </Form.Item>

          {localState.endocrine === 'other' && (
            <Form.Item
              name="endocrineOther"
              rules={[{ required: true, message: 'Пожалуйста, укажите заболевание' }]}
            >
              <Input
                placeholder="Укажите заболевание"
                onChange={(e) => {
                  handleSurveyChange('endocrineOther', e.target.value);
                }}
              />
            </Form.Item>
          )}

          {(localState.endocrine === 'dm1' || localState.endocrine === 'dm2') && (
            <>
              {/* Вопрос 7.1 */}
              <Form.Item
                name="diabetesControl"
                label="Как вы контролируете диабет?"
                rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
              >
                <Radio.Group
                  onChange={(e) => handleSurveyChange('diabetesControl', e.target.value)}
                >
                  <Radio value="insulin">Инсулинотерапия</Radio>
                  <Radio value="oral">Таблетированные препараты</Radio>
                  <Radio value="lifestyle">Диета и физическая активность</Radio>
                  <Radio value="combo">Комбинация методов</Radio>
                </Radio.Group>
              </Form.Item>
            </>
          )}

          {localState.endocrine === 'thyroid' && (
            <>
              {/* Вопрос 7.2 */}
              <Form.Item
                name="thyroid"
                label="Уточните заболевание щитовидной железы:"
                rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
              >
                <Radio.Group onChange={(e) => handleSurveyChange('thyroid', e.target.value)}>
                  <Radio value="hypo">Гипотиреоз</Radio>
                  <Radio value="hyper">Гипертиреоз</Radio>
                  <Radio value="ait">Аутоиммунный тиреоидит</Radio>
                  <Radio value="nodular">Узловой зоб</Radio>
                  <Radio value="other">Другое (укажите)</Radio>
                </Radio.Group>
              </Form.Item>

              {localState.thyroid === 'other' && (
                <Form.Item
                  name="thyroidOther"
                  rules={[{ required: true, message: 'Пожалуйста, укажите заболевание' }]}
                >
                  <Input
                    placeholder="Укажите заболевание"
                    onChange={(e) => {
                      handleSurveyChange('thyroidOther', e.target.value);
                    }}
                  />
                </Form.Item>
              )}
            </>
          )}

          {/* Вопрос 8 */}
          <Form.Item
            name="musculoskeletal"
            label="Имеются ли у вас заболевания опорно-двигательного аппарата?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => handleSurveyChange('musculoskeletal', e.target.value)}>
              <Radio value="osteoarthritis">Да, остеоартрит</Radio>
              <Radio value="ra">Да, ревматоидный артрит</Radio>
              <Radio value="osteoporosis">Да, остеопороз</Radio>
              <Radio value="other">Да, другое (укажите)</Radio>
              <Radio value="none">Нет</Radio>
            </Radio.Group>
          </Form.Item>

          {localState.musculoskeletal === 'other' && (
            <Form.Item
              name="musculoskeletalOther"
              rules={[{ required: true, message: 'Пожалуйста, укажите заболевание' }]}
            >
              <Input
                placeholder="Укажите заболевание"
                onChange={(e) => {
                  handleSurveyChange('musculoskeletalOther', e.target.value);
                }}
              />
            </Form.Item>
          )}

          {/* Вопрос 9 */}
          <Form.Item
            name="allergy"
            label="Имеются ли у вас аллергические реакции?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => handleSurveyChange('allergy', e.target.value)}>
              <Radio value="food">Да, пищевая аллергия</Radio>
              <Radio value="drug">Да, лекарственная аллергия</Radio>
              <Radio value="seasonal">Да, сезонная аллергия/поллиноз</Radio>
              <Radio value="other">Да, другое (укажите)</Radio>
              <Radio value="none">Нет</Radio>
            </Radio.Group>
          </Form.Item>

          {localState.allergy === 'other' && (
            <Form.Item
              name="allergyOther"
              rules={[{ required: true, message: 'Пожалуйста, укажите тип аллергии' }]}
            >
              <Input
                placeholder="Укажите тип аллергии"
                onChange={(e) => {
                  handleSurveyChange('allergyOther', e.target.value);
                }}
              />
            </Form.Item>
          )}

          {localState.allergy === 'food' && (
            <>
              {/* Вопрос 9.1 */}
              <Form.Item
                name="foodAllergy"
                label="На какие продукты у вас аллергия? (можно выбрать несколько)"
                rules={[{ required: true, message: 'Пожалуйста, выберите варианты' }]}
              >
                <Checkbox.Group onChange={(values) => handleSurveyChange('foodAllergy', values)}>
                  <Checkbox value="milk">Молочные продукты</Checkbox>
                  <Checkbox value="eggs">Яйца</Checkbox>
                  <Checkbox value="seafood">Морепродукты/рыба</Checkbox>
                  <Checkbox value="nuts">Орехи</Checkbox>
                  <Checkbox value="gluten">Глютен</Checkbox>
                  <Checkbox value="soy">Соя</Checkbox>
                  <Checkbox value="other">Другое</Checkbox>
                </Checkbox.Group>
              </Form.Item>

              {localState.foodAllergy?.includes('other') && (
                <Form.Item
                  name="foodAllergyOther"
                  rules={[{ required: true, message: 'Пожалуйста, укажите продукты' }]}
                >
                  <Input
                    placeholder="Укажите продукты"
                    onChange={(e) => {
                      handleSurveyChange('foodAllergyOther', e.target.value);
                    }}
                  />
                </Form.Item>
              )}
            </>
          )}

          {localState.allergy === 'drug' && (
            <>
              {/* Вопрос 9.2 */}
              <Form.Item
                name="drugAllergy"
                label="На какие лекарства у вас аллергия? (можно выбрать несколько)"
                rules={[{ required: true, message: 'Пожалуйста, выберите варианты' }]}
              >
                <Checkbox.Group onChange={(values) => handleSurveyChange('drugAllergy', values)}>
                  <Checkbox value="antibiotics">Антибиотики</Checkbox>
                  <Checkbox value="nsaids">НПВС (ибупрофен, аспирин и т.д.)</Checkbox>
                  <Checkbox value="sulfa">Сульфаниламиды</Checkbox>
                  <Checkbox value="other">Другое</Checkbox>
                </Checkbox.Group>
              </Form.Item>

              {localState.drugAllergy?.includes('other') && (
                <Form.Item
                  name="drugAllergyOther"
                  rules={[{ required: true, message: 'Пожалуйста, укажите лекарства' }]}
                >
                  <Input
                    placeholder="Укажите лекарства"
                    onChange={(e) => {
                      handleSurveyChange('drugAllergyOther', e.target.value);
                    }}
                  />
                </Form.Item>
              )}
            </>
          )}

          {/* Вопрос 10 */}
          <Form.Item
            name="regularMeds"
            label="Принимаете ли вы регулярно какие-либо лекарственные препараты?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => handleSurveyChange('regularMeds', e.target.value)}>
              <Radio value="yes">Да</Radio>
              <Radio value="no">Нет</Radio>
            </Radio.Group>
          </Form.Item>

          {localState.regularMeds === 'yes' && (
            <>
              {/* Вопрос 10.1 */}
              <Form.Item
                name="regularMedsList"
                label="Укажите, какие лекарственные препараты вы принимаете регулярно (можно выбрать несколько):"
                rules={[{ required: true, message: 'Пожалуйста, выберите варианты' }]}
              >
                <Checkbox.Group
                  onChange={(values) => handleSurveyChange('regularMedsList', values)}
                >
                  <Checkbox value="antihypertensives">Антигипертензивные (от давления)</Checkbox>
                  <Checkbox value="anticoagulants">
                    Антикоагулянты/антиагреганты (разжижающие кровь)
                  </Checkbox>
                  <Checkbox value="hormones">
                    Гормональные препараты (в т.ч. контрацептивы)
                  </Checkbox>
                  <Checkbox value="psychotropics">Антидепрессанты/нейролептики</Checkbox>
                  <Checkbox value="antiepileptics">Противоэпилептические</Checkbox>
                  <Checkbox value="statins">Статины (от холестерина)</Checkbox>
                  <Checkbox value="other">Другие</Checkbox>
                </Checkbox.Group>
              </Form.Item>

              {localState.regularMedsList?.includes('other') && (
                <Form.Item
                  name="regularMedsOther"
                  rules={[{ required: true, message: 'Пожалуйста, укажите препараты' }]}
                >
                  <Input.TextArea
                    placeholder="Укажите препараты"
                    onChange={(e) => {
                      handleSurveyChange('regularMedsOther', e.target.value);
                    }}
                  />
                </Form.Item>
              )}
            </>
          )}

          {/* Список пометок */}
          {notes.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <b>Пометки:</b> {notes.join(', ')}
            </div>
          )}
        </>
      ),
    },
    {
      title: 'Образ жизни',
      content: (
        <>
          {/* Вопрос 11 */}
          <Form.Item
            name="physicalActivity"
            label="Оцените вашу физическую активность:"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => handleSurveyChange('physicalActivity', e.target.value)}>
              <Radio value="low">Низкая (сидячая работа, минимальная активность)</Radio>
              <Radio value="moderate">
                Умеренная (регулярные прогулки, легкие тренировки 1-2 раза в неделю)
              </Radio>
              <Radio value="high">Высокая (интенсивные тренировки 3-5 раз в неделю)</Radio>
              <Radio value="pro">
                Очень высокая (ежедневные интенсивные тренировки/профессиональный спорт)
              </Radio>
            </Radio.Group>
          </Form.Item>

          {/* Вопрос 12 */}
          <Form.Item
            name="dietType"
            label="Придерживаетесь ли вы определенного типа питания?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => handleSurveyChange('dietType', e.target.value)}>
              <Radio value="regular">Обычное питание (без ограничений)</Radio>
              <Radio value="vegetarian">Вегетарианство</Radio>
              <Radio value="vegan">Веганство</Radio>
              <Radio value="glutenfree">Безглютеновая диета</Radio>
              <Radio value="keto">Кетогенная диета</Radio>
              <Radio value="lowcarb">Низкоуглеводная диета</Radio>
              <Radio value="if">Интервальное голодание</Radio>
              <Radio value="other">Другое (укажите)</Radio>
            </Radio.Group>
          </Form.Item>
          {localState.dietType === 'other' && (
            <Form.Item
              name="dietOther"
              rules={[{ required: true, message: 'Пожалуйста, укажите тип питания' }]}
            >
              <Input
                placeholder="Укажите тип питания"
                onChange={(e) => handleSurveyChange('dietOther', e.target.value)}
              />
            </Form.Item>
          )}

          {/* Вопрос 13.1 */}
          <Form.Item
            name="fruitsVeggies"
            label="Как часто вы употребляете свежие фрукты и овощи?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => handleSurveyChange('fruitsVeggies', e.target.value)}>
              <Radio value="daily">Ежедневно</Radio>
              <Radio value="regular">3-5 раз в неделю</Radio>
              <Radio value="rare">1-2 раза в неделю</Radio>
              <Radio value="never">Редко или никогда</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Вопрос 13.2 */}
          <Form.Item
            name="fishSeafood"
            label="Как часто вы употребляете рыбу и морепродукты?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => handleSurveyChange('fishSeafood', e.target.value)}>
              <Radio value="2plus">2 и более раз в неделю</Radio>
              <Radio value="1w">1 раз в неделю</Radio>
              <Radio value="1m">1-2 раза в месяц</Radio>
              <Radio value="never">Редко или никогда</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Вопрос 13.3 */}
          <Form.Item
            name="dairy"
            label="Как часто вы употребляете молочные продукты?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => handleSurveyChange('dairy', e.target.value)}>
              <Radio value="daily">Ежедневно</Radio>
              <Radio value="regular">3-5 раз в неделю</Radio>
              <Radio value="rare">1-2 раза в неделю</Radio>
              <Radio value="never">Редко или никогда</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Вопрос 13.4 */}
          <Form.Item
            name="grains"
            label="Как часто вы употребляете цельнозерновые продукты?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => handleSurveyChange('grains', e.target.value)}>
              <Radio value="daily">Ежедневно</Radio>
              <Radio value="regular">3-5 раз в неделю</Radio>
              <Radio value="rare">1-2 раза в неделю</Radio>
              <Radio value="never">Редко или никогда</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Вопрос 13.5 */}
          <Form.Item
            name="redMeat"
            label="Как часто вы употребляете красное мясо?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => handleSurveyChange('redMeat', e.target.value)}>
              <Radio value="daily">Ежедневно</Radio>
              <Radio value="regular">3-5 раз в неделю</Radio>
              <Radio value="rare">1-2 раза в неделю</Radio>
              <Radio value="never">Редко или никогда</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Вопрос 14 */}
          <Form.Item
            name="alcohol"
            label="Как часто вы употребляете алкоголь?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => handleSurveyChange('alcohol', e.target.value)}>
              <Radio value="never">Не употребляю</Radio>
              <Radio value="rare">Редко (несколько раз в год)</Radio>
              <Radio value="moderate">Умеренно (1-2 раза в месяц)</Radio>
              <Radio value="regular">Регулярно (1-2 раза в неделю)</Radio>
              <Radio value="often">Часто (3 и более раз в неделю)</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Вопрос 15 */}
          <Form.Item
            name="smoking"
            label="Курите ли вы?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => handleSurveyChange('smoking', e.target.value)}>
              <Radio value="yes">Да, регулярно</Radio>
              <Radio value="episodic">Периодически (менее 5 сигарет в день)</Radio>
              <Radio value="vape">Электронные сигареты/вейп</Radio>
              <Radio value="quit_recent">Бросил(а) курить менее года назад</Radio>
              <Radio value="quit_long">Бросил(а) курить более года назад</Radio>
              <Radio value="never">Никогда не курил(а)</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Вопрос 16 */}
          <Form.Item
            name="stress"
            label="Как вы оцениваете уровень стресса в вашей жизни?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => handleSurveyChange('stress', e.target.value)}>
              <Radio value="low">Низкий</Radio>
              <Radio value="moderate">Умеренный</Radio>
              <Radio value="high">Высокий</Radio>
              <Radio value="chronic">Очень высокий (хронический стресс)</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Вопрос 17 */}
          <Form.Item
            name="sleepHours"
            label="Сколько часов в среднем вы спите ночью?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => handleSurveyChange('sleepHours', e.target.value)}>
              <Radio value="lt5">Менее 5 часов</Radio>
              <Radio value="5-6">5-6 часов</Radio>
              <Radio value="7-8">7-8 часов</Radio>
              <Radio value="gt8">Более 8 часов</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Вопрос 18 */}
          <Form.Item
            name="sleepProblems"
            label="Испытываете ли вы проблемы со сном?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => handleSurveyChange('sleepProblems', e.target.value)}>
              <Radio value="none">Нет проблем со сном</Radio>
              <Radio value="init">Да, трудности с засыпанием</Radio>
              <Radio value="maintain">Да, частые пробуждения ночью</Radio>
              <Radio value="early">Да, раннее пробуждение</Radio>
              <Radio value="unrefreshing">Да, беспокойный/неосвежающий сон</Radio>
              <Radio value="apnea">Да, храп/апноэ сна</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Список пометок */}
          {notes.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <b>Пометки:</b> {notes.join(', ')}
            </div>
          )}
        </>
      ),
    },
    {
      title: 'Симптомы и жалобы',
      content: (
        <>
          <Form.Item label="19.1 Энергия и работоспособность:" name="symptomsEnergy">
            <Checkbox.Group onChange={(values) => handleSurveyChange('symptomsEnergy', values)}>
              <Checkbox value="fatigue">Хроническая усталость (даже после отдыха)</Checkbox>
              <Checkbox value="performance">Снижение работоспособности</Checkbox>
              <Checkbox value="weakness">Слабость</Checkbox>
              <Checkbox value="sleepy">Сонливость днем</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="19.2 Настроение и психический статус:" name="symptomsMood">
            <Checkbox.Group onChange={(values) => handleSurveyChange('symptomsMood', values)}>
              <Checkbox value="mood">Перепады настроения</Checkbox>
              <Checkbox value="irritability">Раздражительность</Checkbox>
              <Checkbox value="anxiety">Тревожность</Checkbox>
              <Checkbox value="depression">Подавленное настроение</Checkbox>
              <Checkbox value="concentration">Снижение концентрации внимания</Checkbox>
              <Checkbox value="memory">Проблемы с памятью</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="19.3 Пищеварительная система:" name="symptomsDigestive">
            <Checkbox.Group onChange={(values) => handleSurveyChange('symptomsDigestive', values)}>
              <Checkbox value="heartburn">Изжога</Checkbox>
              <Checkbox value="heaviness">Тяжесть в желудке</Checkbox>
              <Checkbox value="bloating">Вздутие живота</Checkbox>
              <Checkbox value="constipation">Запоры</Checkbox>
              <Checkbox value="diarrhea">Диарея</Checkbox>
              <Checkbox value="irregular">Чередование запоров и диареи</Checkbox>
              <Checkbox value="nausea">Тошнота</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="19.4 Сердечно-сосудистая система:" name="symptomsCardio">
            <Checkbox.Group onChange={(values) => handleSurveyChange('symptomsCardio', values)}>
              <Checkbox value="tachycardia">Учащенное сердцебиение</Checkbox>
              <Checkbox value="arrhythmia">Ощущение перебоев в работе сердца</Checkbox>
              <Checkbox value="dyspnea">Одышка при нагрузке</Checkbox>
              <Checkbox value="edema">Отеки ног к вечеру</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="19.5 Опорно-двигательный аппарат:" name="symptomsMusculoskeletal">
            <Checkbox.Group
              onChange={(values) => handleSurveyChange('symptomsMusculoskeletal', values)}
            >
              <Checkbox value="arthralgia">Боли в суставах</Checkbox>
              <Checkbox value="dorsalgia">Боли в спине</Checkbox>
              <Checkbox value="myalgia">Мышечные боли</Checkbox>
              <Checkbox value="cramps">Судороги в ногах</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="19.6 Кожа, волосы, ногти:" name="symptomsSkin">
            <Checkbox.Group onChange={(values) => handleSurveyChange('symptomsSkin', values)}>
              <Checkbox value="dry">Сухость кожи</Checkbox>
              <Checkbox value="rash">Высыпания на коже</Checkbox>
              <Checkbox value="hairloss">Выпадение волос</Checkbox>
              <Checkbox value="nails">Ломкость ногтей</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="19.7 Иммунная система:" name="symptomsImmune">
            <Checkbox.Group onChange={(values) => handleSurveyChange('symptomsImmune', values)}>
              <Checkbox value="cold">Частые простудные заболевания (более 4 раз в год)</Checkbox>
              <Checkbox value="recovery">Долгое восстановление после болезней</Checkbox>
              <Checkbox value="herpes">Рецидивирующий герпес</Checkbox>
              <Checkbox value="allergy">Сезонные аллергии</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="19.8 Другие симптомы:" name="symptomsOther">
            <Checkbox.Group onChange={(values) => handleSurveyChange('symptomsOther', values)}>
              <Checkbox value="headache">Головные боли</Checkbox>
              <Checkbox value="dizzy">Головокружения</Checkbox>
              <Checkbox value="noappetite">Отсутствие аппетита</Checkbox>
              <Checkbox value="hyperappetite">Повышенный аппетит</Checkbox>
              <Checkbox value="nightsweat">Ночная потливость</Checkbox>
              <Checkbox value="other">Другое (укажите)</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          {localState.symptomsOther?.includes('other') && (
            <Form.Item
              name="symptomsOtherText"
              rules={[{ required: true, message: 'Пожалуйста, укажите другие симптомы' }]}
            >
              <Input
                placeholder="Укажите другие симптомы"
                onChange={(e) => handleSurveyChange('symptomsOtherText', e.target.value)}
              />
            </Form.Item>
          )}

          <Form.Item
            label="20. Как давно вы испытываете указанные симптомы?"
            name="symptomsDuration"
          >
            <Radio.Group onChange={(e) => handleSurveyChange('symptomsDuration', e.target.value)}>
              <Radio value="acute">Менее 1 месяца</Radio>
              <Radio value="subacute">1-3 месяца</Radio>
              <Radio value="long">3-12 месяцев</Radio>
              <Radio value="chronic">Более 1 года</Radio>
              <Radio value="unknown">Не помню/затрудняюсь ответить</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="21. Обращались ли вы к врачу с указанными симптомами?"
            name="symptomsDoctor"
          >
            <Radio.Group onChange={(e) => handleSurveyChange('symptomsDoctor', e.target.value)}>
              <Radio value="regular">Да, регулярно наблюдаюсь</Radio>
              <Radio value="once">Да, однократно</Radio>
              <Radio value="plan">Нет, но планирую</Radio>
              <Radio value="self">Нет, считаю, что справлюсь самостоятельно</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Список пометок */}
          {notes.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <b>Пометки:</b> {notes.join(', ')}
            </div>
          )}
        </>
      ),
    },
    {
      title: 'Прием добавок и цели',
      content: (
        <>
          <Form.Item
            name="takesSupplements"
            label="Принимаете ли вы в настоящее время какие-либо витамины, минералы или БАДы?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => handleSurveyChange('takesSupplements', e.target.value)}>
              <Radio value="yes">Да</Radio>
              <Radio value="no">Нет</Radio>
            </Radio.Group>
          </Form.Item>

          {localState.takesSupplements === 'yes' && (
            <>
              <Form.Item
                name="currentSupplements"
                label="Укажите, какие БАДы вы принимаете (можно выбрать несколько):"
                rules={[{ required: true, message: 'Пожалуйста, выберите варианты' }]}
              >
                <Checkbox.Group
                  onChange={(values) => handleSurveyChange('currentSupplements', values)}
                >
                  <Checkbox value="multivitamins">Поливитамины</Checkbox>
                  <Checkbox value="vitaminD">Витамин D</Checkbox>
                  <Checkbox value="omega3">Омега-3 (рыбий жир)</Checkbox>
                  <Checkbox value="calciumMagnesium">Кальций/Магний</Checkbox>
                  <Checkbox value="probiotics">Пробиотики</Checkbox>
                  <Checkbox value="iron">Железо</Checkbox>
                  <Checkbox value="proteinBCAA">Протеин/BCAA</Checkbox>
                  <Checkbox value="herbalExtracts">Растительные экстракты</Checkbox>
                  <Checkbox value="other">Другое (укажите)</Checkbox>
                </Checkbox.Group>
              </Form.Item>

              {localState.currentSupplements?.includes('other') && (
                <Form.Item
                  name="otherSupplements"
                  rules={[{ required: true, message: 'Пожалуйста, укажите БАДы' }]}
                >
                  <Input
                    placeholder="Укажите БАДы"
                    onChange={(e) => handleSurveyChange('otherSupplements', e.target.value)}
                  />
                </Form.Item>
              )}

              <Form.Item
                name="supplementDuration"
                label="Как долго вы принимаете указанные БАДы?"
                rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
              >
                <Radio.Group
                  onChange={(e) => handleSurveyChange('supplementDuration', e.target.value)}
                >
                  <Radio value="lessThanMonth">Менее 1 месяца</Radio>
                  <Radio value="oneToThreeMonths">1-3 месяца</Radio>
                  <Radio value="threeToTwelveMonths">3-12 месяцев</Radio>
                  <Radio value="moreThanYear">Более 1 года</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="supplementEffectiveness"
                label="Заметили ли вы положительный эффект от приема БАДов?"
                rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
              >
                <Radio.Group
                  onChange={(e) => handleSurveyChange('supplementEffectiveness', e.target.value)}
                >
                  <Radio value="significant">Да, значительный</Radio>
                  <Radio value="moderate">Да, но незначительный</Radio>
                  <Radio value="none">Нет, не заметил(а) эффекта</Radio>
                  <Radio value="negative">Заметил(а) отрицательный эффект</Radio>
                </Radio.Group>
              </Form.Item>
            </>
          )}

          <Form.Item
            name="supplementGoals"
            label="Каковы ваши основные цели приема БАДов? (можно выбрать до 3-х приоритетных)"
            rules={[{ required: true, message: 'Пожалуйста, выберите варианты' }]}
          >
            <Checkbox.Group onChange={(values) => handleSurveyChange('supplementGoals', values)}>
              <Checkbox value="energy">Повышение уровня энергии</Checkbox>
              <Checkbox value="immunity">Укрепление иммунитета</Checkbox>
              <Checkbox value="digestion">Улучшение работы желудочно-кишечного тракта</Checkbox>
              <Checkbox value="jointsBones">Поддержка здоровья суставов и костей</Checkbox>
              <Checkbox value="skinHairNails">Улучшение состояния кожи, волос, ногтей</Checkbox>
              <Checkbox value="sleep">Нормализация сна</Checkbox>
              <Checkbox value="cardiovascular">Поддержка сердечно-сосудистой системы</Checkbox>
              <Checkbox value="cognitive">Улучшение работы мозга, памяти</Checkbox>
              <Checkbox value="weightLoss">Снижение веса</Checkbox>
              <Checkbox value="muscleGain">Набор мышечной массы</Checkbox>
              <Checkbox value="stressMood">Снижение уровня стресса, улучшение настроения</Checkbox>
              <Checkbox value="prevention">Общая профилактика заболеваний</Checkbox>
              <Checkbox value="other">Другое (укажите)</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          {localState.supplementGoals?.includes('other') && (
            <Form.Item
              name="otherGoals"
              rules={[{ required: true, message: 'Пожалуйста, укажите цели' }]}
            >
              <Input
                placeholder="Укажите цели"
                onChange={(e) => handleSurveyChange('otherGoals', e.target.value)}
              />
            </Form.Item>
          )}

          <Form.Item
            name="supplementConcerns"
            label="Есть ли у вас какие-либо опасения, связанные с приемом БАДов?"
            rules={[{ required: true, message: 'Пожалуйста, выберите варианты' }]}
          >
            <Checkbox.Group onChange={(values) => handleSurveyChange('supplementConcerns', values)}>
              <Checkbox value="medicationInteraction">
                Боюсь взаимодействия с принимаемыми лекарствами
              </Checkbox>
              <Checkbox value="sideEffects">Боюсь побочных эффектов</Checkbox>
              <Checkbox value="quality">Беспокоюсь о качестве БАДов</Checkbox>
              <Checkbox value="effectiveness">Сомневаюсь в эффективности</Checkbox>
              <Checkbox value="overdose">Опасаюсь передозировки</Checkbox>
              <Checkbox value="none">Нет опасений</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item
            name="medicalCheckupFrequency"
            label="Как часто вы проходите профилактические медицинские осмотры?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group
              onChange={(e) => handleSurveyChange('medicalCheckupFrequency', e.target.value)}
            >
              <Radio value="yearly">Ежегодно</Radio>
              <Radio value="everyTwoThreeYears">Один раз в 2-3 года</Radio>
              <Radio value="asNeeded">Только по необходимости, при появлении симптомов</Radio>
              <Radio value="rarely">Редко или никогда</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="bloodTests"
            label="Сдавали ли вы в течение последнего года анализы крови?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => handleSurveyChange('bloodTests', e.target.value)}>
              <Radio value="both">Да, общий и биохимический анализы</Radio>
              <Radio value="general">Да, только общий анализ</Radio>
              <Radio value="none">Нет</Radio>
            </Radio.Group>
          </Form.Item>

          {(localState.bloodTests === 'both' || localState.bloodTests === 'general') && (
            <Form.Item
              name="bloodTestAbnormalities"
              label="Были ли выявлены какие-либо отклонения в анализах?"
              rules={[{ required: true, message: 'Пожалуйста, выберите варианты' }]}
            >
              <Checkbox.Group
                onChange={(values) => handleSurveyChange('bloodTestAbnormalities', values)}
              >
                <Checkbox value="anemia">Да, анемия/низкий гемоглобин</Checkbox>
                <Checkbox value="dyslipidemia">Да, повышенный холестерин/липиды</Checkbox>
                <Checkbox value="hyperglycemia">Да, повышенный сахар крови</Checkbox>
                <Checkbox value="liver">Да, нарушения функции печени</Checkbox>
                <Checkbox value="kidney">Да, нарушения функции почек</Checkbox>
                <Checkbox value="vitaminD">Да, дефицит витамина D</Checkbox>
                <Checkbox value="other">Да, другие (укажите)</Checkbox>
                <Checkbox value="none">Нет, отклонений не выявлено</Checkbox>
              </Checkbox.Group>
            </Form.Item>
          )}

          {localState.bloodTestAbnormalities?.includes('other') && (
            <Form.Item
              name="otherAbnormalities"
              rules={[{ required: true, message: 'Пожалуйста, укажите отклонения' }]}
            >
              <Input
                placeholder="Укажите отклонения"
                onChange={(e) => handleSurveyChange('otherAbnormalities', e.target.value)}
              />
            </Form.Item>
          )}

          {/* Список пометок */}
          {notes.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <b>Пометки:</b> {notes.join(', ')}
            </div>
          )}
        </>
      ),
    },
  ];

  const handleSubmit = async (values: SupplementsSurveyFormData) => {
    try {
      console.log({ values });
      const currentUser = await appwriteApi.auth.getCurrentUser();
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      // Get the current user's profile
      const userProfile = await appwriteApi.profile.get(currentUser.$id);
      if (!userProfile) {
        throw new Error('User profile not found');
      }

      // Generate unique id for this survey result
      const surveyId = uuidv4();

      // Convert form values to array format
      const valuesArray = Object.entries(values).map(([key, value]) =>
        JSON.stringify({ [key]: value })
      );

      // Get existing valuesJSON and notesJSON arrays or initialize empty arrays
      const existingValuesJSON = userProfile.valuesJSON || [];
      const existingNotesJSON = userProfile.notesJSON || [];

      // Create new entries with timestamps and id
      const newValuesEntry = {
        id: surveyId,
        values: valuesArray,
        createdAt: new Date().toISOString(),
      };

      const newNotesEntry = {
        id: surveyId,
        notes: notes,
        createdAt: new Date().toISOString(),
      };

      // Update user profile with new entries
      await appwriteApi.profile.update(currentUser.$id, {
        valuesJSON: [...existingValuesJSON, JSON.stringify(newValuesEntry)],
        notesJSON: [...existingNotesJSON, JSON.stringify(newNotesEntry)],
      });

      message.success('Спасибо за заполнение анкеты!');
      router.push('/dashboard/account?tab=history');
    } catch (error) {
      message.error('Произошла ошибка при сохранении данных');
      console.error('Error saving survey:', error);
    }
  };

  const next = () => {
    form
      .validateFields()
      .then(() => {
        setCurrentStep(currentStep + 1);
      })
      .catch(() => {
        message.warning(
          'Пожалуйста, заполните все обязательные поля перед переходом к следующему шагу'
        );
      });
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const calculateBMI = () => {
    if (localState.height && localState.weight) {
      const heightM = parseFloat(localState.height) / 100;
      const weightKg = parseFloat(localState.weight);
      const bmi = weightKg / (heightM * heightM);
      return {
        value: bmi.toFixed(0),
        status:
          bmi < 18.5
            ? 'Недостаток веса'
            : bmi < 25
              ? 'Вы в хорошей форме!'
              : bmi < 30
                ? 'Избыточный вес'
                : 'Ожирение',
      };
    }
    return null;
  };

  const bmiResult = calculateBMI();

  return (
    <BasePage title="">
      <div className={styles.surveyContainer}>
        <Card className={styles.surveyCard}>
          <div className={styles.surveyHeader}>
            <h1 className={styles.surveyTitle}>Основной опросник для подбора БАДов</h1>
          </div>

          <div className={styles.surveyContent}>
            <div className={styles.stepsNavigation}>
              <CustomSteps
                direction="vertical"
                size="small"
                current={currentStep}
                className={styles.customSteps}
                items={steps.map((step) => ({ title: step.title }))}
              />
            </div>

            <div className={styles.stepsForm}>
              <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{}}>
                <div className={styles.questionSection}>
                  {steps[currentStep].content}

                  {/* BMI Result Display */}
                  {currentStep === 1 && bmiResult && (
                    <div className={styles.bmiResult}>
                      <div className={styles.bmiIcon}>AI</div>
                      <div className={styles.bmiValue}>Ваш ИМТ = {bmiResult.value}</div>
                      <div className={styles.bmiStatus}>{bmiResult.status}</div>
                    </div>
                  )}
                </div>

                <div className={styles.navigationButtons}>
                  {currentStep > 0 && (
                    <Button onClick={prev} className={styles.backButton}>
                      Назад
                    </Button>
                  )}
                  <div style={{ flex: 1 }}></div>
                  {currentStep < steps.length - 1 && (
                    <Button type="primary" onClick={next} className={styles.nextButton}>
                      Продолжить
                    </Button>
                  )}
                  {currentStep === steps.length - 1 && (
                    <Button type="primary" htmlType="submit" className={styles.nextButton}>
                      Завершить
                    </Button>
                  )}
                </div>
              </Form>
            </div>
          </div>
        </Card>
      </div>
    </BasePage>
  );
}
