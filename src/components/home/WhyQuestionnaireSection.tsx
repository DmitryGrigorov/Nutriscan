import React from 'react';
import Image from 'next/image';
import { CheckCircleFilled } from '@ant-design/icons';
import styles from './WhyQuestionnaireSection.module.css';

export const WhyQuestionnaireSection = () => {
  return (
    <div className={styles.container}>
      <div
        className={styles.headerContent}
        style={{ backgroundImage: 'url(/assets/images/doctor_img.jpg)' }}
      >
        <div className={styles.headerText}>
          <h2 className={styles.mainTitle}>Почему важно заполнить анкету</h2>
          <p className={styles.quote}>
            «Анализы крови показывают лишь часть<br /> картины. Ваши привычки, образ жизни и даже<br /> стресс
            могут влиять на усвоение витаминов<br /> сильнее, чем кажется»
          </p>
          <p className={styles.author}>Майкл Грегер,<br /> Московская медицинская конференция, 2024</p>
        </div>
        <div className={styles.doctorImageContainer}></div>
      </div>

      <div className={styles.cardsContainer}>
        <div className={styles.cardWoman}>
          <div className={styles.cardContent}>
            <div className={styles.cardTextContent}>
              <h3 className={styles.cardTitle}>Анализы не всегда отражают реальный дефицит</h3>
              <p className={styles.cardText}>
                Уровень магния в крови может быть в норме, но при хроническом стрессе он быстро
                «расходуется» клетками — и вы все равно чувствуете усталость.
              </p>
            </div>
          </div>
          <div className={styles.cardBenefit}>
            <CheckCircleFilled className={styles.checkIcon} />
            <span className={styles.benefitText}>
              Анкета помогает выявить подобные скрытые риски
            </span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.cardTextContent}>
              <h3 className={styles.cardTitle}>Симптомы ≠ очевидные причины</h3>
              <ul className={styles.cardList}>
                <li>Усталость может быть из-за дефицита железа, В12 или плохого сна.</li>
                <li>Сухость кожи — нехватка Омеги-3, цинка или витамина А</li>
              </ul>
            </div>
          </div>
          <div className={styles.cardBenefit}>
            <CheckCircleFilled className={styles.checkIcon} />
            <span className={styles.benefitText}>
              Ваши ответы помогают убрать нерелевантные варианты
            </span>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.bottomCardsContainer}>
          <div className={styles.bottomCard}>
            <h3 className={styles.bottomCardTitle}>Образ жизни меняет потребности</h3>
            <ul className={styles.bottomCardList}>
              <li>Кофе/алкоголь вымывают магний и витамины группы В</li>
              <li>Курение увеличивает потребность в витамине С и антиоксидантах</li>
            </ul>
            <div className={styles.bottomCardBenefit}>
              <CheckCircleFilled className={styles.checkIcon} />
              <span className={styles.benefitText}>
                Мы спрашиваем о ваших привычках, чтобы скорректировать дозировки
              </span>
            </div>
          </div>

          <div className={styles.bottomCta}>
            <h3 className={styles.bottomCtaTitle}>
              Узнайте какие витамины будут работать именно для вас
            </h3>
            <p className={styles.bottomCtaDescription}>Бесплатно. Онлайн. За 5 минут.</p>
            <button className={styles.bottomCtaButton}>Заполнить анкету</button>
          </div>
        </div>
      </div>
    </div>
  );
};
