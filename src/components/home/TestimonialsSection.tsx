'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './TestimonialsSection.module.css';

const testimonials = [
  {
    id: 1,
    name: 'Елизавета Волкова',
    rating: '5.0',
    avatar: '/assets/images/Ellipse 1.jpg',
    quote: 'Выяснила, что магний не усваивается из-за избытка кофе в течение дня',
    fullText: (
      <>
        Только благодаря анкете на сайте NutriScan и подробному анализу от нейросети NutriScan AI
        удалось выяснить, что магний не усваивается из-за любимого кофе. <br />
        <br /> Через месяц заметила значительные изменения — кожа стала более сияющей, а волосы
        крепче.
        <br /> Рекомендую!
      </>
    ),
  },
  {
    id: 2,
    name: 'Гоша Ларкин',
    rating: '5.0',
    avatar: '/assets/images/Ellipse 2.jpg',
    quote: 'Проблема усвоения железа решилась простым добавлением витамина С в рацион',
    fullText:
      'Я бегаю. Анализы показали низкий гемоглобин. Врач прописал железо. Результата — ноль! И только пройдя опрос на сайте NutriScan я получил рекомендации с учётом моего питания: добавили витамин С, дозу железа уменьшили. Пол года — полет нормальный!',
  },
  {
    id: 3,
    name: 'Анна Султанова',
    rating: '5.0',
    avatar: '/assets/images/Ellipse 3.jpg',
    quote: 'Нравится, что натуральный природные компоненты',
    fullText:
      'Мне нравится, что БАДы содержат природные компоненты. Они помогают мне держать витамины в норме. А с консультацией нутрициолога что выбранные добавки подходят.',
  },
];

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => Math.min(prev + 1, testimonials.length - 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className={styles.container}>
      <section className={styles.testimonialsSection}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>
              Убедитесь
              <br />
              в эффективности
              <br />
              NutriScan
            </h2>
            <p className={styles.subtitle}>Наши клиенты делятся своим опытом использования</p>
          </div>
          <Image
            src="/assets/images/avatars.png"
            alt="Avatars"
            width={498}
            height={348}
            className={styles.avatarsImage}
          />
        </div>

        <div className={styles.carouselContainer}>
          <div
            className={styles.carousel}
            style={{
              transform: `translateX(-${currentTestimonial * 400}px)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={styles.testimonialCard}>
                <div className={styles.testimonialHeader}>
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className={styles.testimonialAvatar}
                  />
                  <div className={styles.testimonialInfo}>
                    <h4 className={styles.testimonialName}>{testimonial.name}</h4>
                    <div className={styles.rating}>
                      <span className={styles.star}>★</span>
                      <span className={styles.ratingValue}>{testimonial.rating}</span>
                    </div>
                  </div>
                </div>

                <blockquote className={styles.testimonialQuote}>«{testimonial.quote}»</blockquote>

                <p className={styles.testimonialText}>{testimonial.fullText}</p>
              </div>
            ))}
          </div>

          <div className={styles.navigation}>
            <button onClick={prevTestimonial} className={styles.navButton}>
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
            <button onClick={nextTestimonial} className={styles.navButton}>
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
      </section>
    </div>
  );
}
