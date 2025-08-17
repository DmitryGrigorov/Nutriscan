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
              <span className={styles.titleBold}>подбор витаминов</span>
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
              <div style={{ borderRadius: '12px', overflow: 'hidden', width: 242, height: 126 }}>
                <Image
                  src="/assets/images/nuclear.jpg"
                  alt="AI NutriScan"
                  width={242}
                  height={126}
                />
              </div>
            </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Первый блок: 100+ параметров персонализации */}
            <div
              style={{
                borderRadius: 16,
                border: '1.5px solid #B6E6F2',
                background: 'linear-gradient(180deg, #E6F8FA 0%, #D6F2F7 100%)',
                padding: '20px 28px 18px 28px',
                marginBottom: 0,
                display: 'flex',
                alignItems: 'center',
                minWidth: 260,
                minHeight: 100,
                boxShadow: '0 1px 4px #e6f4ff33',
              }}
            >
              <span style={{ fontWeight: 900, fontSize: 38, color: '#15456E', marginRight: 12, lineHeight: 1 }}>
                100+
              </span>
              <span style={{ color: '#15456E', fontSize: 18, fontWeight: 500, lineHeight: 1.2 }}>
                параметров<br />персонализации
              </span>
            </div>
            {/* Второй блок: Получить рекомендации */}
            <a
              href="#"
              className={styles.ctaButton}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 16,
                background: '#fff',
                color: '#15456E',
                fontWeight: 800,
                fontSize: 22,
                padding: '22px 28px 20px 28px',
                minHeight: 100,
                minWidth: 260,
                boxShadow: '0 1px 4px #e6f4ff33',
                textDecoration: 'none',
                border: 'none',
                marginTop: 0,
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
            >
              <span style={{ color: '#15456E', fontWeight: 800, fontSize: 22, lineHeight: 1 }}>
                Получить<br />рекомендации
              </span>
              <span style={{ marginLeft: 18, fontSize: 28, color: '#15456E', fontWeight: 700, lineHeight: 1 }}>
                &gt;
              </span>
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
