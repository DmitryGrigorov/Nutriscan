import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getFontStyle } from '@/lib/fontUtils';
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
              <span className={styles.highlightedText}>индивидуального смарт-анализа</span>
              <br />
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
              <div onClick={handleRecommendationsClick} className={styles.recommendationsButton}>
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
              </div>
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
