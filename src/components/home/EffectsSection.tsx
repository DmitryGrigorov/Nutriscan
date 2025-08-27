'use client';
import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import styles from './EffectsSection.module.css';

const { Title, Paragraph } = Typography;

interface EffectCard {
  id: string;
  title: string;
  description: string;
  image: string;
  gradient: string;
}

const effectCards: EffectCard[] = [
  {
    id: 'energy',
    title: '+100% к запасу сил и энергии',
    description: 'успевайте больше, чем планировали на день',
    image: '/images/energy-runner.jpg',
    gradient: 'linear-gradient(135deg, #e6f7ff 0%, #b3e5fc 100%)',
  },
  {
    id: 'hair-nails',
    title: 'Крепкие волосы и ногти',
    description: 'приятное дополнение к общему улучшению самочувствия',
    image: '/images/hair-nails.jpg',
    gradient: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
  },
  {
    id: 'immunity',
    title: 'Укрепление иммунитета',
    description: 'защита от сезонных простуд и вирусов',
    image: '/images/immunity.jpg',
    gradient: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
  },
  {
    id: 'sleep',
    title: 'Качественный сон',
    description: 'глубокий и восстанавливающий отдых',
    image: '/images/sleep.jpg',
    gradient: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
  },
];

export function EffectsSection() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Функция для расчета позиции прокрутки
  const getScrollOffset = () => {
    const cardWidth = 400; // ширина карточки
    const gap = 24; // отступ между карточками
    return scrollPosition * (cardWidth + gap);
  };

  const nextCards = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setScrollPosition((prev) => {
      const newPosition = prev + 2;
      return newPosition >= effectCards.length ? 0 : newPosition;
    });
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevCards = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setScrollPosition((prev) => {
      const newPosition = prev - 2;
      return newPosition < 0 ? Math.max(0, effectCards.length - 2) : newPosition;
    });
    setTimeout(() => setIsAnimating(false), 500);
  };

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
      <div className={styles.header}>
        <Title level={2} className={styles.mainTitle}>
          Почувствуйте эффект через 2 недели
        </Title>

        <div className={styles.navigation}>
          <Button
            type="text"
            icon={<LeftOutlined />}
            onClick={prevCards}
            className={styles.navButton}
          />
          <Button
            type="text"
            icon={<RightOutlined />}
            onClick={nextCards}
            className={styles.navButton}
          />
        </div>
      </div>

      <div className={styles.cardsContainer}>
        <div className={styles.scrollContainer}>
          <motion.div
            className={styles.cardsRow}
            animate={{
              x: -getScrollOffset(),
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
          >
            {effectCards.map((card) => (
              <motion.div
                key={card.id}
                className={styles.card}
                style={{ background: card.gradient }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
              >
                <div className={styles.cardContent}>
                  <div className={styles.textContent}>
                    <Title level={3} className={styles.cardTitle}>
                      {card.title}
                    </Title>
                    <Paragraph className={styles.cardDescription}>{card.description}</Paragraph>
                    <Button className={styles.joinButton}>Присоединиться</Button>
                  </div>

                  <div className={styles.imageContainer}>
                    {card.id === 'energy' && (
                      <div className={styles.runnerImage}>
                        <div className={styles.runner}></div>
                        <div className={styles.headphones}></div>
                      </div>
                    )}

                    {card.id === 'hair-nails' && (
                      <div className={styles.hairImage}>
                        <div className={styles.hair}></div>
                        <div className={styles.hand}></div>
                      </div>
                    )}

                    {card.id === 'immunity' && (
                      <div className={styles.immunityImage}>
                        <div className={styles.shield}></div>
                        <div className={styles.virus}></div>
                      </div>
                    )}

                    {card.id === 'sleep' && (
                      <div className={styles.sleepImage}>
                        <div className={styles.moon}></div>
                        <div className={styles.stars}></div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Индикаторы */}
        <div className={styles.indicators}>
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              className={`${styles.indicator} ${Math.floor(scrollPosition / 2) === index ? styles.activeIndicator : ''}`}
              onClick={() => {
                if (isAnimating) return;
                setIsAnimating(true);
                setScrollPosition(index * 2);
                setTimeout(() => setIsAnimating(false), 500);
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
