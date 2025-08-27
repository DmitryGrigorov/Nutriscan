'use client';
import React from 'react';
import styles from './MainFooter.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
      <motion.div 
        className={styles.ball}
        initial={{ 
          x: 0, 
          y: 0, 
          rotate: 0, 
          scale: 0.8,
          opacity: 0 
        }}
        whileInView={{ 
          x: 0, 
          y: 0, 
          rotate: 360, 
          scale: 1,
          opacity: 1 
        }}
        transition={{ 
          duration: 2,
          ease: "easeOut",
          delay: 0.2 
        }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          style={{ width: '100%', height: '100%' }}
        />
      </motion.div>
      <motion.div 
        className={styles.imgFooter}
        initial={{ 
          x: 0, 
          y: 0, 
          opacity: 0,
          scale: 0.9 
        }}
        whileInView={{ 
          x: 0, 
          y: 0, 
          opacity: 1,
          scale: 1 
        }}
        transition={{ 
          duration: 1.5,
          ease: "easeOut",
          delay: 0.5 
        }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div
          animate={{
            x: [0, 5, 0],
            y: [0, -8, 0],
          }}
          transition={{
            x: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            },
            y: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          style={{ width: '100%', height: '100%' }}
        />
      </motion.div>
      
      {/* Кнопка "Наверх" */}
      <motion.div
        onClick={scrollToTop}
        onMouseDown={(e) => e.preventDefault()}
        className={styles.scrollToTopButton}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6,
          ease: "easeOut",
          delay: 1.2
        }}
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
        whileTap={{ 
          scale: 0.95,
          transition: { duration: 0.1 }
        }}
      >
        Наверх
        <svg width="12" height="16" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 17V1M7 1L13 7M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      <motion.div 
        className={styles.container}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ 
          duration: 0.8,
          ease: "easeOut",
          delay: 0.8
        }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className={styles.row}>
          <motion.div 
            className={styles.column}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7,
              ease: "easeOut",
              delay: 1.0
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div 
              className={styles.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6,
                ease: "easeOut",
                delay: 1.2
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Image src="/assets/icons/logo.svg" alt="" width={270} height={60}/>
            </motion.div>
            <motion.p 
              className={styles.companyInfo}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut",
                delay: 1.2
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              ООО «Нутрискан», ©2025
            </motion.p>
            <motion.p 
              className={styles.companyInfo}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut",
                delay: 1.3
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              105203, город Москва, Первомайская ул, д. 116а, помещ. 1/1
            </motion.p>
            <motion.p 
              className={styles.companyInfo}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut",
                delay: 1.4
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              9:00–19:00, Пн–Пт
            </motion.p>
            <motion.p 
              className={styles.companyInfoLast}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut",
                delay: 1.5
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              email: <strong>info@nutriscan.ru</strong>
            </motion.p>
            <motion.p 
              className={styles.disclaimer}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                ease: "easeOut",
                delay: 1.6
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              Все рекомендации не носят предписательного характера. Пожалуйста, ознакомьтесь с
              Пользовательским соглашением перед использованием
            </motion.p> 
          </motion.div>
          

          <motion.div 
            className={styles.columnLists}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7,
              ease: "easeOut",
              delay: 1.2
            }}
            viewport={{ once: true, amount: 0.2 }}
          >

          <motion.div 
            className={styles.column}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut",
              delay: 1.3
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h5 
              className={styles.sectionTitle}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut",
                delay: 1.4
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              Nutriscan
            </motion.h5>
            <motion.ul 
              className={styles.navigationList}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ 
                duration: 0.6,
                ease: "easeOut",
                delay: 1.5
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.li 
                className={styles.navigationItem}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeOut",
                  delay: 1.6
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                Исследования
              </motion.li>
              <motion.li 
                className={styles.navigationItem}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeOut",
                  delay: 1.7
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                Отзывы
              </motion.li>
              <motion.li 
                className={styles.navigationItem}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeOut",
                  delay: 1.8
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                Эксперты
              </motion.li>
            </motion.ul>
          </motion.div>
          
          <motion.div 
            className={styles.column}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut",
              delay: 1.4
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h5 
              className={styles.sectionTitle}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut",
                delay: 1.5
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              Документы
            </motion.h5>
            <motion.ul 
              className={styles.navigationList}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ 
                duration: 0.6,
                ease: "easeOut",
                delay: 1.6
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.li 
                className={styles.navigationItem}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeOut",
                  delay: 1.7
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                Пользовательское соглашение
              </motion.li>
              <motion.li 
                className={styles.navigationItem}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeOut",
                  delay: 1.8
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                Отзывы
              </motion.li>
              <motion.li 
                className={styles.navigationItem}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeOut",
                  delay: 1.9
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                Эксперты
              </motion.li>
            </motion.ul>
          </motion.div>

          <motion.div 
            className={styles.descriptionText}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7,
              ease: "easeOut",
              delay: 1.5
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            Размещённые на сайте продукты не являются лекарственными средствами
Nutriscan не осуществляет медицинскую деятельность и не оказывает Пользователям Сайта медицинские услуги, в том числе направленные на профилактику, диагностику и лечение заболеваний.


          </motion.div>
          </motion.div>        
        </div>
      
        

      </motion.div>
    </footer>
  );
}