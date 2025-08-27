'use client';
import React from 'react';
import styles from './MainFooter.module.css';
import Image from 'next/image';

export function MainFooter() {
  const scrollToTop = () => {
    try {
      console.log('scrollToTop - Smooth scrolling');

      // Получаем все возможные элементы для скролла
      const html = document.documentElement;
      const body = document.body;
      const layoutContent = document.querySelector('.ant-layout-content');

      console.log('Scroll positions:', {
        window: window.pageYOffset,
        html: html.scrollTop,
        body: body.scrollTop,
        layoutContent: layoutContent?.scrollTop,
      });

      // Функция для smooth скролла с fallback
      const smoothScrollToTop = (element: Element, name: string) => {
        try {
          if (element.scrollTop > 0) {
            console.log(`Smooth скролл ${name} с позиции ${element.scrollTop}`);

            // Пробуем smooth scrolling
            element.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });

            return true;
          }
        } catch (e) {
          console.log(`Smooth скролл не поддерживается для ${name}, используем fallback`);

          // Fallback: анимированный скролл
          const startPosition = element.scrollTop;
          const startTime = performance.now();
          const duration = 800; // 800ms для smooth анимации

          const animateScroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing функция для smooth анимации
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);

            element.scrollTop = startPosition * (1 - easeOutCubic);

            if (progress < 1) {
              requestAnimationFrame(animateScroll);
            }
          };

          requestAnimationFrame(animateScroll);
          return true;
        }
        return false;
      };

      // Пробуем скроллить все возможные элементы
      const scrollElements = [
        { element: html, name: 'html' },
        { element: body, name: 'body' },
        { element: layoutContent, name: 'layoutContent' },
      ].filter((item) => item.element);

      let scrollSuccess = false;
      for (const { element, name } of scrollElements) {
        if (element && smoothScrollToTop(element, name)) {
          scrollSuccess = true;
          break;
        }
      }

      // Если ничего не сработало, используем window.scrollTo
      if (!scrollSuccess) {
        console.log('Используем window.scrollTo как fallback');
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    } catch (error) {
      console.log('Scroll error:', error);
      // Последний fallback без анимации
      try {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      } catch {
        window.scrollTo(0, 0);
      }
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.ball}></div>
      <div className={styles.imgFooter}></div>
      
      {/* Кнопка "Наверх" */}
      <div
        onClick={scrollToTop}
        onMouseDown={(e) => e.preventDefault()}
        className={styles.scrollToTopButton}
      >
        Наверх
        <svg width="12" height="16" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 17V1M7 1L13 7M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.title}>
              <Image src="/assets/icons/logo.svg" alt="" width={270} height={60}/>
            </div>
            <p className={styles.companyInfo}>
              ООО «Нутрискан», ©2025
            </p>
            <p className={styles.companyInfo}>
              105203, город Москва, Первомайская ул, д. 116а, помещ. 1/1
            </p>
            <p className={styles.companyInfo}>9:00–19:00, Пн–Пт</p>
            <p className={styles.companyInfoLast}>
              email: <strong>info@nutriscan.ru</strong>
            </p>
            <p className={styles.disclaimer}>
              Все рекомендации не носят предписательного характера. Пожалуйста, ознакомьтесь с
              Пользовательским соглашением перед использованием
            </p> 
          </div>
          

          <div className={styles.columnLists}>

          <div className={styles.column}>
            <h5 className={styles.sectionTitle}>
              Nutriscan
            </h5>
            <ul className={styles.navigationList}>
              <li className={styles.navigationItem}>Исследования</li>
              <li className={styles.navigationItem}>Отзывы</li>
              <li className={styles.navigationItem}>Эксперты</li>
            </ul>
          </div>
          
          <div className={styles.column}>
            <h5 className={styles.sectionTitle}>
              Документы
            </h5>
            <ul className={styles.navigationList}>
              <li className={styles.navigationItem}>Пользовательское соглашение</li>
              <li className={styles.navigationItem}>Отзывы</li>
              <li className={styles.navigationItem}>Эксперты</li>
            </ul>
          </div>

          <div className={styles.descriptionText}>
            Размещённые на сайте продукты не являются лекарственными средствами
Nutriscan не осуществляет медицинскую деятельность и не оказывает Пользователям Сайта медицинские услуги, в том числе направленные на профилактику, диагностику и лечение заболеваний.


          </div>
          </div>        
        </div>
      
        

      </div>
    </footer>
  );
}