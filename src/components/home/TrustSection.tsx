'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './TrustSection.module.css';

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
          <div className={styles.mainTitle}>Мы ценим ваше доверие</div>
          <div className={styles.reviewsStats}>
            <div className={styles.reviewsNumber}>Более 1000</div>
            <div className={styles.reviewsLabel}>отзывов</div>
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
                получили анализ и назначения
                <br /> от системы AI NutriScan бесплатно
              </div>
            </div>

            <div className={styles.taskImageContainer} />
          </div>

          {/* Нижняя секция - Прогресс */}
          <div className={styles.bottomSection}>
            <div className={styles.progressChart}>
              <svg width="265" height="265" viewBox="0 0 265 265">
                <circle
                  cx="132.5"
                  cy="132.5"
                  r="110.5"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="18"
                />
                <circle
                  cx="132.5"
                  cy="132.5"
                  r="110.5"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="18"
                  strokeDasharray={`${2 * Math.PI * 110.5}`}
                  strokeDashoffset={`${2 * Math.PI * 110.5 * (1 - 0.77)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 132.5 132.5)"
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
