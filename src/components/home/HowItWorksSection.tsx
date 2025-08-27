import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styles from './HowItWorksSection.module.css';

export const HowItWorksSection = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleButtonClick = () => {
    if (user) {
      router.push('/dashboard/surveys/supplements');
    } else {
      router.push('/auth/register');
    }
  };

  const steps = [
    {
      number: '1',
      title: 'Пройти опрос',
      description: (
        <>
          Заполните анкету <br /> о состоянии здоровья,
          <br /> привычках и образе жизни.
        </>
      ),
    },
    {
      number: '2',
      title: 'Загрузить анализы',
      description: (
        <>
          Загрузите медицинские
          <br /> анализы для точной
          <br /> индивидуальной рекомендации
        </>
      ),
    },
    {
      number: '3',
      title: 'Получить результат',
      description: (
        <>
          Получите персональные
          <br /> рекомендации по приему
          <br /> витаминов и минералов
        </>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Три шага на пути к здоровому образу жизни</h2>

        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div key={index} className={styles.stepCard}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ctaContainer}>
          <div onClick={handleButtonClick} className={styles.ctaButton}>
            Перейти к заполнению анкеты
          </div>
        </div>
      </div>
    </div>
  );
};
