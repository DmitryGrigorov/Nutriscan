import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styles from './WhyQuestionnaireSection.module.css';

export const WhyQuestionnaireSection = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleButtonClick = () => {
    if (user) {
      router.push('/dashboard/surveys/supplements');
    } else {
      router.push('/auth/register');
    }
  };
  return (
    <div className={styles.container}>
      <div
        className={styles.headerContent}
        style={{ backgroundImage: 'url(/assets/images/doctor_img.jpg)' }}
      >
        <div className={styles.headerText}>
          <h2 className={styles.mainTitle}>Почему важно заполнить анкету</h2>
          <p className={styles.quote}>
            «Анализы крови показывают лишь часть
            <br /> картины. Ваши привычки, образ жизни и даже
            <br /> стресс могут влиять на усвоение витаминов
            <br /> сильнее, чем кажется»
          </p>
          <p className={styles.author}>
            Майкл Грегер,
            <br /> Московская медицинская конференция, 2024
          </p>
        </div>
        <div className={styles.doctorImageContainer}></div>
      </div>

      <div className={styles.cardsContainer}>
        <div className={styles.cardWoman}>
          <div className={styles.cardContent}>
            <div className={styles.cardTextContent}>
              <h3 className={styles.cardTitle}>
                Анализы не всегда отражают
                <br /> реальный дефицит
              </h3>
              <p className={styles.cardText}>
                Уровень магния в крови может быть в норме,
                <br /> но при хроническом стрессе он быстро
                <br />
                «расходуется» клетками — и вы все равно
                <br /> чувствуете усталость.
              </p>
            </div>
          </div>
          <div className={styles.cardBenefit}>
            <Image
              src={'/assets/images/check_blue_square.jpg'}
              alt=""
              width={52}
              height={48}
              className={styles.checkIcon}
            />
            <span className={styles.benefitText}>
              Анкета помогает выявить подобные
              <br /> скрытые риски
            </span>
          </div>
        </div>

        <div className={styles.cardViolet}>
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
            <Image
              src={'/assets/images/check_blue_square.jpg'}
              alt=""
              width={52}
              height={48}
              className={styles.checkIcon}
            />

            <span className={styles.benefitText}>
              Ваши ответы помогают убрать <br /> нерелевантные варианты
            </span>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.bottomCardsContainer}>
          <div className={styles.bottomCard}>
            <h3 className={styles.bottomCardTitle}>Образ жизни меняет потребности</h3>
            <ul className={styles.bottomCardList}>
              <li>
                Кофе/алкоголь вымывают магний
                <br /> и витамины группы В
              </li>
              <li>
                Курение увеличивает потребность
                <br /> в витамине С и антиоксидантах
              </li>
            </ul>
            <div className={styles.bottomCardBenefit}>
              <Image
                src={'/assets/images/check_blue_square.jpg'}
                alt=""
                width={52}
                height={48}
                className={styles.checkIcon}
              />

              <span className={styles.benefitText}>
                Мы спрашиваем о ваших привычках, чтобы скорректировать дозировки
              </span>
            </div>
          </div>

          <div className={styles.bottomCta}>
            <h3 className={styles.bottomCtaTitle}>
              Узнайте какие витамины
              <br /> будут работать именно
              <br /> для вас
            </h3>
            <p className={styles.bottomCtaDescription}>Бесплатно. Онлайн. За 5 минут.</p>
            <div onClick={handleButtonClick} className={styles.bottomCtaButton}>
              Заполнить анкету
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
