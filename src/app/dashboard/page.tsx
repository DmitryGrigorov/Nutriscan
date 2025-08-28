'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BasePage } from '@/components/dashboard/BasePage';
import styles from './page.module.css';

interface DashboardCardProps {
  title: string;
  description: string;
  image: string;
  path: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, image, path }) => {
  const router = useRouter();

  return (
    <div
      className={styles.dashboardCard}
      onClick={() => router.push(path)}
    >
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>
          <Image
            src={`/assets/images/dashboard/${image}`}
            alt={title}
            width={49}
            height={49}
          />
        </div>
      </div>
      <h3 className={styles.cardTitle}>
        {title}
      </h3>
      <p className={styles.cardDescription}>
        {description}
      </p>
    </div>
  );
};

export default function DashboardPage() {
  const cards: DashboardCardProps[] = [
    {
      title: 'Персональная информация',
      description: 'Личные данные и настройки',
      image: 'personal_info.jpg',
      path: '/dashboard/account',
    },
    {
      title: 'Лабораторные анализы ',
      description: 'Загрузка и исследование результатов медицинских анализов',
      image: 'lab.jpg',
      path: '/dashboard/analyses',
    },
    {
      title: 'Динамика показателей здоровья',
      description: 'Отслеживание изменений в показателях здоровья и анализов',
      image: 'markhealth.jpg',
      path: '/dashboard/trends',
    },
    {
      title: 'Персональные рекомендации',
      description: 'Рекомендации по здоровью и питанию',
      image: 'recomend.jpg',
      path: '/dashboard/surveys/supplements',
    },
    {
      title: 'Опросы',
      description: 'Пройдите наши опросы и получите персональные рекомендации',
      image: 'surveys.jpg',
      path: '/dashboard/surveys',
    },
    {
      title: 'Анкета «Образ жизни»',
      description: 'Оценка уровня физической активности и тренировок',
      image: 'lifestyle.jpg',
      path: 'dashboard/surveys/supplements',
    },
    {
      title: 'Анкета «Пищевые привычки»',
      description: 'Расскажите о ваших пищевых привычках и предпочтениях',
      image: 'foodhabits.jpg',
      path: '/dashboard/surveys/nutrition-habits',
    },
    {
      title: 'Анкета «Оценка здоровья»',
      description: 'Оценка текущего состояние здоровья и самочувствия',
      image: 'health.jpg',
      path: '/dashboard/surveys/user-profile-survey',
    },
    {
      title: 'История потребления БАДов',
      description: 'Управление приемом биологически активных добавок',
      image: 'pills.jpg',
      path: '/dashboard/supplements',
    },
    {
      title: 'Акции и спецпредложения',
      description: 'Специальные предложения и скидки на БАДы и анализы',
      image: 'percent.jpg',
      path: '/dashboard/promotions',
    },
    {
      title: 'Напоминания о покупке БАДов',
      description: 'Управление напоминаниями о приеме добавок',
      image: 'notification.jpg',
      path: '/dashboard/supplement-reminders',
    },
    {
      title: 'Напоминания о сдаче анализов',
      description: 'Управление напоминаниями о плановых анализах',
      image: 'notification_analis.jpg',
      path: '/dashboard/analysis-reminders',
    },
  ];

  return (
    <BasePage title="Личный профиль NutriScan">
      <div className={styles.container}>
        <div className={styles.cardsGrid}>
          {cards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>
      </div>
    </BasePage>
  );
}