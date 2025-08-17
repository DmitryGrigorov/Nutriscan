import React from 'react';
import styles from './HowItWorksSection.module.css';

export const HowItWorksSection = () => {
  const steps = [
    {
      number: '1',
      title: 'Пройти опрос',
      description: 'Заполните анкету о состоянии здоровья, привычках и образе жизни.',
    },
    {
      number: '2',
      title: 'Загрузить анализы',
      description: 'Загрузите медицинские анализы для точной индивидуальной рекомендации',
    },
    {
      number: '3',
      title: 'Получить результат',
      description: 'Получите персональные рекомендации по приему витаминов и минералов',
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
          <a href="/quiz" className={styles.ctaButton}>
            Перейти к заполнению анкеты
          </a>
        </div>
      </div>
    </div>
  );
};
