'use client';
import React, { useState } from 'react';
import styles from './FAQSection.module.css';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'Как принимать Nutriscan?',
    answer: (
      <>
        Принимайте комплекс во время или после еды, запивая большим количеством воды. <br /> <br />
        <strong>Важно:</strong> не смешивайте NutriScan с горячими напитками, высокая температура
        может снизить
        <br />
        эффективность усвоения микронутриентов.
        <br />
        <br />
        Принимайте NutriScan в одно и то же время каждый день, чтобы выработать привычку и избежать
        пропуска приема.
      </>
    ),
  },
  {
    id: 2,
    question: 'Зачем нужен опросник, если я загрузил анализы?',
    answer:
      'Анализы показывают текущее состояние, но опросник помогает понять причины дефицитов и подобрать оптимальные дозировки с учетом вашего образа жизни.',
  },
  {
    id: 3,
    question: 'Я веган или вегетарианец, для меня найдется подходящий комплекс?',
    answer:
      'Да, у нас есть специальные комплексы для веганов и вегетарианцев с учетом особенностей растительного питания и повышенной потребности в B12, железе и цинке.',
  },
  {
    id: 4,
    question: 'Где можно сдать анализы?',
    answer:
      'Анализы можно сдать в любой лицензированной лаборатории: Инвитро, Гемотест, KDL или в поликлинике по месту жительства.',
  },
  {
    id: 5,
    question: 'Сочетается ли NutriScan с хроническими заболеваниями?',
    answer:
      'Наши нутрициологи учитывают хронические заболевания при составлении рекомендаций. Обязательно укажите их в опроснике для безопасного подбора комплекса.',
  },
  {
    id: 6,
    question: 'Где производится NutriScan?',
    answer:
      'Продукция производится на сертифицированных заводах в России и Европе с соблюдением международных стандартов качества GMP.',
  },
];

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]); // Первый элемент открыт по умолчанию

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.molecula} />
      <section className={styles.faqSection}>
        <div className={styles.content}>
          <h2 className={styles.title}>Остались вопросы?</h2>

          <div className={styles.faqList}>
            {faqData.map((item) => (
              <div
                key={item.id}
                className={`${styles.faqItem} ${openItems.includes(item.id) ? styles.open : ''}`}
              >
                <button className={styles.faqQuestion} onClick={() => toggleItem(item.id)}>
                  <span className={styles.questionText}>{item.question}</span>
                  <span className={styles.icon}>{openItems.includes(item.id) ? '−' : '+'}</span>
                </button>

                <div className={styles.faqAnswer}>
                  <div className={styles.answerContent}>
                    <p className={styles.answerText}>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
