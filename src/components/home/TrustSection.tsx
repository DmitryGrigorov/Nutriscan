'use client';
import React from 'react';
import { Typography } from 'antd';
import { motion } from 'framer-motion';
import styles from './TrustSection.module.css';

const { Title, Paragraph, Text } = Typography;

export function TrustSection() {
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
        {/* Левая колонка - Отзывы */}
        <div className={styles.leftColumn}>
          <Title level={2} className={styles.mainTitle}>
            Мы ценим ваше доверие
          </Title>

          <div className={styles.chatBubble}>
            <div className={styles.starIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="#16B6BE"
                  stroke="#16B6BE"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>

          <div className={styles.reviewsStats}>
            <div className={styles.reviewsNumber}>Более 1000</div>
            <div className={styles.reviewsLabel}>ОТЗЫВОВ</div>
            <div className={styles.reviewsSubtext}>от реальных покупателей</div>
          </div>
        </div>

        {/* Правая колонка */}
        <div className={styles.rightColumn}>
          {/* Верхняя секция - Пользователи */}
          <div className={styles.topSection}>
            <div className={styles.usersStats}>
              <div className={styles.usersNumber}>&gt; 1,5 млн</div>
              <div className={styles.usersLabel}>пользователей</div>
              <div className={styles.usersDescription}>
                получили анализ и назначения от системы AI NutriScan бесплатно
              </div>
            </div>

            <div className={styles.clipboardIllustration}>
              <div className={styles.clipboard}>
                <div className={styles.paper}>
                  <div className={styles.checkboxItem}>
                    <div className={`${styles.checkbox} ${styles.checked}`}></div>
                    <div className={styles.checkboxText}>Анализ состояния</div>
                  </div>
                  <div className={styles.checkboxItem}>
                    <div className={`${styles.checkbox} ${styles.checked}`}></div>
                    <div className={styles.checkboxText}>Персональные рекомендации</div>
                  </div>
                  <div className={styles.checkboxItem}>
                    <div className={`${styles.checkbox} ${styles.checked}`}></div>
                    <div className={styles.checkboxText}>Подбор БАДов</div>
                  </div>
                  <div className={styles.checkboxItem}>
                    <div className={`${styles.checkbox} ${styles.unchecked}`}></div>
                    <div className={styles.checkboxText}>Доставка</div>
                  </div>
                </div>
              </div>
              <div className={styles.hand}>
                <div className={styles.pencil}></div>
              </div>
            </div>
          </div>

          {/* Нижняя секция - Прогресс */}
          <div className={styles.bottomSection}>
            <div className={styles.progressChart}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - 0.77)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className={styles.progressText}>77%</div>
            </div>

            <div className={styles.progressStats}>
              <div className={styles.progressNumber}>77% клиентов</div>
              <div className={styles.progressDescription}>
                отмечают позитивные изменения самочувствия и настроения *
              </div>
              <div className={styles.progressNote}>*по результатам опроса клиентов NutriScan</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
