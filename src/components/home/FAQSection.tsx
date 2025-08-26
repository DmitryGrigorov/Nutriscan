'use client';
import React, { useState } from 'react';
import { Typography, Collapse } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import styles from './FAQSection.module.css';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

interface FAQItem {
  id: string;
  question: string;
  answer: string[];
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'Как принимать Nutriscan?',
    answer: [
      'Принимайте комплекс во время или после еды, запивая большим количеством воды.',
      'Важно: не смешивайте NutriScan с горячими напитками, высокая температура может снизить эффективность усвоения микронутриентов.',
      'Принимайте NutriScan в одно и то же время каждый день, чтобы выработать привычку и избежать пропуска приема.',
    ],
  },
  {
    id: '2',
    question: 'Зачем нужен опросник, если я загрузил анализы?',
    answer: [
      'Опросник помогает получить полную картину вашего здоровья, включая образ жизни, привычки питания и субъективные ощущения.',
      'Анализы показывают текущее состояние, а опросник выявляет факторы, которые могут влиять на ваше самочувствие.',
      'Комбинация анализов и опросника обеспечивает наиболее точный подбор персонального комплекса.',
    ],
  },
  {
    id: '3',
    question: 'Я веган или вегетарианец, для меня найдется подходящий комплекс?',
    answer: [
      'Да, NutriScan учитывает ваши диетические предпочтения и ограничения.',
      'Мы подбираем комплексы, совместимые с веганским и вегетарианским образом жизни.',
      'Все рекомендации адаптированы под ваши пищевые привычки и убеждения.',
    ],
  },
  {
    id: '4',
    question: 'Где можно сдать анализы?',
    answer: [
      'Вы можете сдать анализы в любой медицинской лаборатории или клинике.',
      'Рекомендуем сдавать анализы утром натощак для получения наиболее точных результатов.',
      'После получения результатов вы можете загрузить их в нашу систему для анализа.',
    ],
  },
  {
    id: '5',
    question: 'Сочетается ли NutriScan с хроническими заболеваниями?',
    answer: [
      'NutriScan разработан с учетом различных состояний здоровья.',
      'При наличии хронических заболеваний обязательно проконсультируйтесь с врачом перед приемом.',
      'Наша система учитывает ваши заболевания при подборе комплекса.',
    ],
  },
  {
    id: '6',
    question: 'Где производится NutriScan?',
    answer: [
      'NutriScan производится на современных фармацевтических предприятиях в России.',
      'Все производство соответствует международным стандартам качества GMP.',
      'Каждая партия проходит строгий контроль качества перед выпуском.',
    ],
  },
];

export function FAQSection() {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  const handlePanelChange = (keys: string | string[]) => {
    setActiveKeys(Array.isArray(keys) ? keys : [keys]);
  };

  const customExpandIcon = ({ isActive }: { isActive?: boolean }) => (
    <div className={styles.expandIcon}>{isActive ? <MinusOutlined /> : <PlusOutlined />}</div>
  );

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
      {/* Декоративные элементы */}
      <div className={styles.decorativeElement1}></div>
      <div className={styles.decorativeElement2}></div>
      <div className={styles.decorativeElement3}></div>
      <div className={styles.decorativeElement4}></div>
      <div className={styles.decorativeElement5}></div>

      <div className={styles.content}>
        <Title level={2} className={styles.mainTitle}>
          Остались вопросы?
        </Title>

        <div className={styles.faqContainer}>
          <div className={styles.accordionContainer}>
            {faqData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={styles.accordionItem}
              >
                <Collapse
                  activeKey={activeKeys.includes(item.id) ? [item.id] : []}
                  onChange={(keys) => {
                    const newKeys = Array.isArray(keys) ? keys : [keys];
                    if (newKeys.includes(item.id)) {
                      setActiveKeys([...activeKeys, item.id]);
                    } else {
                      setActiveKeys(activeKeys.filter((key) => key !== item.id));
                    }
                  }}
                  expandIcon={customExpandIcon}
                  className={styles.accordion}
                  ghost
                >
                  <Panel
                    header={<span className={styles.questionText}>{item.question}</span>}
                    key={item.id}
                    className={styles.panel}
                  >
                    <div className={styles.answerContainer}>
                      {item.answer.map((paragraph, pIndex) => (
                        <Paragraph key={pIndex} className={styles.answerText}>
                          {paragraph}
                        </Paragraph>
                      ))}
                    </div>
                  </Panel>
                </Collapse>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
