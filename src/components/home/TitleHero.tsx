import React from 'react';
import Image from 'next/image';
import { getFontStyle } from '@/lib/fontUtils';
import styles from './TitleHero.module.css';

export const TitleHero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heroContent} style={getFontStyle('black')}>
        {/* Левый блок */}
        <div className={styles.leftBlock}>
          <div className={styles.titleContainer}>
            <span className={styles.title}>
              <span className={styles.titleBold}>Персональный</span>
              <br />
              подбор витаминов
              <br />
              <span className={styles.titleNutriScan}>NutriScan™</span>
            </span>
          </div>
          <div className={styles.description}>
            <span className={styles.descriptionMedium}>
              специально для вас на основе <br />
              <span className={styles.highlightedText}>индивидуального смарт-анализа</span>
            </span>
            <br />
            параметров вашего организма и образа жизни
          </div>
          {/* Карточка AI NutriScan */}
          <div className={styles.aiCard}>
            <div className={styles.aiCardLeft}>
              <div>
                <Image
                  src="/assets/icons/ai_circle.svg"
                  alt="AI NutriScan"
                  width={54}
                  height={54}
                />
              </div>
              <div className={styles.aiTitle}>
                Умная система <span className={styles.aiTitleHighlight}>AI NutriScan</span>
              </div>
            </div>
            <div>
              <div className={styles.aiStats}>
                100+
                <span className={styles.aiStatsText}>параметров профилирования</span>
              </div>
              <a href="/quiz" className={styles.ctaButton}>
                Получить рекомендации
              </a>
            </div>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <div className={styles.imageWrapperInner}></div>
          <div className={styles.mainImage} />
          <div className={styles.circleImage} />
        </div>
      </div>
    </div>
  );
};
