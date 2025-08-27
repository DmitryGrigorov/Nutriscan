'use client';
import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SelectionProcessSection.module.css';
import Image from 'next/image';

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
    title: 'Комплексный подход',
    subtitle: 'Анализируем состояние',
    description:
      'Учитываем не только анализы, но и ваш образ жизни. Уточняем наличие хронических заболеваний, аллергий или непереносимости веществ.',
    image: '/assets/images/lab1.jpg',
  },
  {
    id: 'personalization',
    title: 'Точечные решения',
    subtitle: 'Индивидуальный подход',
    description:
      'Рекомендации именно для ваших целей.Свойства, состав и потенциальная польза каждого продукта.',
    image: '/assets/images/lab2.jpg',
  },
  {
    id: 'recommendation',
    title: 'AI NutriScan + эксперты',
    subtitle: 'Стандарты качества',
    description:
      'Чтобы исключить риски конфликта БАДов c лекарствами все алгоритмы проверяет нутрициолог',
    image: '/assets/images/lab3.jpg',
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
      <div className={styles.mainTitle}>Как происходит подбор NutriScan™</div>
      <div className={styles.content}>
        <div className={styles.textSection}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.stepContent}
            >
              <div className={styles.subtitle}>{currentProcessStep.subtitle}</div>
              <div className={styles.title}>{currentProcessStep.title}</div>
              <div className={styles.description}>{currentProcessStep.description}</div>
            </motion.div>
          </AnimatePresence>

          <div className={styles.navigation}>
            <div className={styles.arrowLeft} onClick={prevStep}>
              <Image src={'/assets/icons/arrow-left-icon.svg'} alt="" width={32} height={32} />
            </div>
            <div className={styles.arrowRight} onClick={nextStep}>
              <Image src={'/assets/icons/arrow-right-icon.svg'} alt="" width={32} height={32} />
            </div>
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
                  <Image
                    src={currentProcessStep.image}
                    alt={currentProcessStep.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
