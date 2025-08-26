'use client';
import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SelectionProcessSection.module.css';

const { Title, Paragraph } = Typography;

interface ProcessStep {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 'analysis',
    title: 'Анализируем состояние',
    subtitle: 'Комплексный подход',
    description:
      'Учитываем не только анализы, но и ваш образ жизни. Уточняем наличие хронических заболеваний, аллергий или непереносимости веществ.',
    image: '/images/selection-process-1.jpg',
  },
  {
    id: 'personalization',
    title: 'Персонализируем',
    subtitle: 'Индивидуальный подход',
    description: 'Создаем персональную программу на основе ваших уникальных потребностей и целей.',
    image: '/images/selection-process-2.jpg',
  },
  {
    id: 'recommendation',
    title: 'Рекомендуем',
    subtitle: 'Научный подход',
    description: 'Подбираем БАДы на основе научных исследований и клинических данных.',
    image: '/images/selection-process-3.jpg',
  },
];

export function SelectionProcessSection() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % processSteps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + processSteps.length) % processSteps.length);
  };

  const currentProcessStep = processSteps[currentStep];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.8 }}
      className={styles.container}
    >
      <div className={styles.content}>
        <div className={styles.textSection}>
          <Title level={2} className={styles.mainTitle}>
            Как происходит подбор NutriScan™
          </Title>

          <div className={styles.tabContainer}>
            {processSteps.map((step, index) => (
              <button
                key={step.id}
                className={`${styles.tab} ${index === currentStep ? styles.activeTab : ''}`}
                onClick={() => setCurrentStep(index)}
              >
                {step.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.stepContent}
            >
              <Title level={3} className={styles.subtitle}>
                {currentProcessStep.subtitle}
              </Title>
              <Paragraph className={styles.description}>{currentProcessStep.description}</Paragraph>
            </motion.div>
          </AnimatePresence>

          <div className={styles.navigation}>
            <Button
              type="text"
              icon={<LeftOutlined />}
              onClick={prevStep}
              className={styles.navButton}
            />
            <Button
              type="text"
              icon={<RightOutlined />}
              onClick={nextStep}
              className={styles.navButton}
            />
          </div>
        </div>

        <div className={styles.imageSection}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className={styles.imageContainer}
            >
              <div className={styles.imagePlaceholder}>
                <div className={styles.labImage}>
                  {/* Здесь будет изображение лаборатории */}
                  <div className={styles.imageContent}>
                    <div className={styles.scientist}></div>
                    <div className={styles.labEquipment}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
