'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styles from './BenefitsCarousel.module.css';

const benefits = [
  {
    id: 1,
    title: '+100% к запасу сил и энергии',
    subtitle: 'успевайте больше, чем планировали на день',
    image: '/assets/images/hero_bg.png', // placeholder
    bgColor: 'gradient-mint',
    buttonText: 'Присоединиться',
  },
  {
    id: 2,
    title: 'Крепкие волосы и ногти',
    subtitle: 'приятное дополнение к общему улучшению самочувствия',
    image: '/assets/images/w1.jpg',
    bgColor: 'gradient-blue',
    buttonText: 'Присоединиться',
  },
];

export function BenefitsCarousel() {
  const [currentBenefit, setCurrentBenefit] = useState(0);
  // const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { user } = useAuth();
  const router = useRouter();

  const handleButtonClick = () => {
    if (user) {
      router.push('/dashboard/surveys/supplements');
    } else {
      router.push('/auth/register');
    }
  };

  const nextBenefit = () => {
    setCurrentBenefit((prev) => (prev + 1) % benefits.length);
  };

  const prevBenefit = () => {
    setCurrentBenefit((prev) => (prev - 1 + benefits.length) % benefits.length);
  };

  // const nextTestimonial = () => {
  //   setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  // };

  // const prevTestimonial = () => {
  //   setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  // };

  return (
    <div className={styles.container}>
      {/* Benefits Section */}
      <section className={styles.benefitsSection}>
        <div className={styles.benefitsHeader}>
          <h2 className={styles.benefitsTitle}>Почувствуйте эффект через 2 недели</h2>
          <div className={styles.navigation}>
            <button onClick={prevBenefit} className={styles.navButton}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button onClick={nextBenefit} className={styles.navButton}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.benefitsCarousel}>
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className={`${styles.benefitCard} ${styles[benefit.bgColor]} ${
                index === currentBenefit ? styles.active : ''
              }`}
              style={{ transform: `translateX(-${currentBenefit * 100}%)` }}
            >
              <motion.div
                className={styles.leftColumn}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className={styles.imageLeftColumn} />
                <div className={styles.leftColumnText}>
                  <motion.div
                    className={styles.leftColumnTextTitle}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    +100% к запасу
                    <br />
                    сил и энергии
                  </motion.div>
                  <motion.div
                    className={styles.leftColumnTextSubtitle}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    успевайте больше, <br />
                    чем планировали на день
                  </motion.div>
                  <div onClick={handleButtonClick} className={styles.button}>
                    Присоединиться
                  </div>
                </div>
              </motion.div>
              <div className={styles.rightColumn}>
                <div className={styles.imageRightColumn} />
                <div className={styles.leftColumnText}>
                  <div className={styles.leftColumnTextTitle}>
                    Крепкие волосы
                    <br />и ногти
                  </div>
                  <div className={styles.leftColumnTextSubtitle}>
                    приятное дополнение к общему
                    <br /> улучшению самочувствия
                  </div>
                  <div onClick={handleButtonClick} className={styles.button}>
                    Присоединиться
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
