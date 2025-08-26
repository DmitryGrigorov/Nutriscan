import React from 'react';
import Image from 'next/image';
import { getFontStyle } from '@/lib/fontUtils';
import styles from './TitleHero.module.css';
import { HowItWorksSection } from './HowItWorksSection';

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
              <span className={styles.titleBold}>подбор витаминов</span>
              <br />
              <span className={styles.titleNutriScan}>NutriScan™</span>
            </span>
          </div>
          <div className={styles.description}>
            <span className={styles.descriptionMedium}>
              специально для вас на основе <br />
              <span className={styles.highlightedText}>индивидуального смарт-анализа</span><br />
              параметров вашего организма и образа жизни
            </span>
            
            
          </div>
          <div className={styles.aiCardContainer}>
            {/* Карточка AI NutriScan */}
            <div className={styles.aiCard}>
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
            </div>
            <div className={styles.statsContainer}>
              {/* Первый блок: 100+ параметров персонализации */}
              <div className={styles.statsBlock}>
                <span className={styles.statsNumber}>100+</span>
                <span className={styles.statsText}>
                  параметров
                  <br />
                  персонализации
                </span>
              </div>
              {/* Второй блок: Получить рекомендации */}
              <a href="#" className={styles.recommendationsButton}>
                <span className={styles.recommendationsText}>
                  Получить
                  <br />
                  рекомендации
                </span>
                <span className={styles.recommendationsArrow}><Image src="/assets/icons/arrow-right-icon.svg" alt="Arrow" width={32} height={32} /></span>
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

      <HowItWorksSection />
    </div>
  );
};
