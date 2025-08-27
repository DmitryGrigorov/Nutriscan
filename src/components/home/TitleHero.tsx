import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getFontStyle } from '@/lib/fontUtils';
import { motion } from 'framer-motion';
import styles from './TitleHero.module.css';
import { HowItWorksSection } from './HowItWorksSection';

export const TitleHero = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleRecommendationsClick = () => {
    if (user) {
      router.push('/dashboard/surveys/supplements');
    } else {
      router.push('/auth/register');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heroContent} style={getFontStyle('black')}>
        <div className={styles.heroContentBackground} />

        {/* Левый блок */}
        <div className={styles.leftBlock}>
          <motion.div
            className={styles.titleContainer}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className={styles.title}>
              <span className={styles.titleBold}>Персональный</span>
              <br />
              <span className={styles.titleBold}>подбор витаминов</span>
              <br />
              <span className={styles.titleNutriScan}>NutriScan™</span>
            </span>
          </motion.div>
          <motion.div
            className={styles.description}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className={styles.descriptionMedium}>
              специально для вас на основе <br />
              <span className={styles.highlightedText}>индивидуального смарт-анализа</span>
              <br />
              параметров вашего организма и образа жизни
            </span>
          </motion.div>
          <motion.div
            className={styles.aiCardContainer}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Карточка AI NutriScan */}
            <motion.div
              className={styles.aiCard}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className={styles.aiCardLeft}>
                <div>
                  <Image
                    src="/assets/icons/ai_circle.svg"
                    alt="AI NutriScan"
                    width={52}
                    height={52}
                  />
                </div>
                <div>
                  <div className={styles.aiTitle}>Умная система</div>
                  <div>
                    <span className={styles.aiTitleHighlight}>AI NutriScan</span>
                  </div>
                </div>
              </div>
              <div className={styles.aiImageContainer}>
                <Image
                  src="/assets/images/nuclear.jpg"
                  alt="AI NutriScan"
                  width={242}
                  height={126}
                />
              </div>
            </motion.div>
            <div className={styles.statsContainer}>
              {/* Первый блок: 100+ параметров персонализации */}
              <motion.div
                className={styles.statsBlock}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <span className={styles.statsNumber}>100+</span>
                <span className={styles.statsText}>
                  параметров
                  <br />
                  персонализации
                </span>
              </motion.div>
              {/* Второй блок: Получить рекомендации */}
              <motion.div
                onClick={handleRecommendationsClick}
                className={styles.recommendationsButton}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={styles.recommendationsText}>
                  Получить
                  <br />
                  рекомендации
                </span>
                <span className={styles.recommendationsArrow}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.4413 5.43934C11.0271 4.85355 11.9766 4.85355 12.5624 5.43934L22.1083 14.9852C22.6941 15.571 22.6941 16.5205 22.1083 17.1063L12.5624 26.6522C11.9766 27.238 11.0271 27.238 10.4413 26.6522C9.85551 26.0664 9.85551 25.1169 10.4413 24.5311L18.9266 16.0458L10.4413 7.56043C9.85551 6.97465 9.85551 6.02513 10.4413 5.43934Z" fill="white"/>
                  </svg>
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className={styles.imageWrapperInner}></div>
          <motion.div
            className={styles.mainImage}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
          />
          <motion.div
            className={styles.circleImage}
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }}
          />
        </motion.div>
      </div>

      <HowItWorksSection />
    </div>
  );
};
