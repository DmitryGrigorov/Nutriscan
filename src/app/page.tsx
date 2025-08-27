'use client';
import React, { useState } from 'react';
import {
  Layout,
  Row,
  Col,
  Card,
  Button,
  Avatar,
  Typography,
  Carousel,
  Modal,
  Divider,
  List,
} from 'antd';
import {
  ExperimentOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  TrophyOutlined,
  LikeOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { TitleHero } from '@/components/home/TitleHero';
import { WhyQuestionnaireSection } from '@/components/home/WhyQuestionnaireSection';
import { SelectionProcessSection } from '@/components/home/SelectionProcessSection';
import { TrustSection } from '@/components/home/TrustSection';
 import { BenefitsCarousel } from '@/components/home/BenefitsCarousel';
 import { TestimonialsSection } from '@/components/home/TestimonialsSection';
 import { FAQSection } from '@/components/home/FAQSection';
 import { MainFooter } from '@/components/home/MainFooter';

const { Title, Paragraph, Text } = Typography;
const { Footer, Content } = Layout;

interface Expert {
  name: string;
  role: string;
  image: string;
  shortBio: string;
  fullBio: string;
  specialization: string[];
  education: string[];
}

// --- Hero Section ---
function HeroSection() {
  return <TitleHero />;
}

// --- Testimonials ---
function Testimonials() {
  const testimonials = [
    {
      name: 'Елена Смирнова',
      role: 'Фитнес-тренер',
      image: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=2',
      quote:
        'Благодаря персональным рекомендациям я смогла подобрать комплекс добавок, который действительно помогает моим клиентам достигать лучших результатов.',
    },
    {
      name: 'Алексей Петров',
      role: 'IT-специалист',
      image: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=1',
      quote:
        'Сервис помог мне разобраться в огромном количестве БАДов и выбрать именно то, что нужно для поддержания энергии в течение рабочего дня.',
    },
    {
      name: 'Мария Иванова',
      role: 'Врач-диетолог',
      image: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=4',
      quote:
        'Как специалист, я ценю научный подход к подбору добавок. Рекомендую этот сервис своим пациентам для дополнительной поддержки здоровья.',
    },
    {
      name: 'Дмитрий Козлов',
      role: 'Спортсмен',
      image: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=7',
      quote:
        'Индивидуальный подход помог мне оптимизировать программу приема добавок и значительно улучшить восстановление после тренировок.',
    },
  ];
  return (
    <>
      <style jsx global>{`
        .ant-carousel .slick-arrow {
          width: 54px;
          height: 54px;
          background: #fff !important;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(22, 119, 255, 0.62);
          color: #16b6be !important;
          border: 1.5px solid #e6f4ff;
          z-index: 2;
          transition: box-shadow 0.2s;
        }
        .ant-carousel .slick-arrow:hover {
          box-shadow: 0 4px 16px rgba(22, 182, 190, 0.18);
          color: #fff !important;
          background: rgba(66, 86, 114, 0.47) !important;
        }
        .ant-carousel .slick-arrow:before {
          color: #16b6be !important;
          font-size: 28px !important;
        }
        .ant-carousel .slick-dots li button {
          background: #000 !important;
          opacity: 1;
        }
        .ant-carousel .slick-dots li.slick-active button {
          background: #16b6be !important;
        }
        .ant-carousel .slick-dots-bottom {
          bottom: -32px;
        }

        :where(.css-dev-only-do-not-override-1a4icq8).ant-carousel
          .slick-dots
          li.slick-active::after {
          background: #16b6be !important;
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ padding: '40px 0', background: '#fff' }}
      >
        <Title level={2} style={{ textAlign: 'center', marginBottom: 12, fontSize: 28 }}>
          Отзывы пользователей
        </Title>
        <Paragraph style={{ textAlign: 'center', color: '#888', marginBottom: 32, fontSize: 16 }}>
          Узнайте, как наш сервис помогает людям улучшать здоровье и достигать своих целей
        </Paragraph>
        <Carousel autoplay style={{ maxWidth: 600, margin: '0 auto' }}>
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <Card
                style={{
                  minHeight: 260,
                  textAlign: 'center',
                  boxShadow: '0 2px 12px #e6f4ff',
                  padding: 24,
                  borderRadius: 18,
                  margin: '0 1vw',
                }}
              >
                <div style={{ marginBottom: 12 }}>
                  <LikeOutlined style={{ fontSize: 28, color: '#16B6BE' }} />
                </div>
                <Paragraph style={{ fontSize: 17, fontStyle: 'italic', marginBottom: 18 }}>
                  "{t.quote}"
                </Paragraph>
                <Avatar src={t.image} size={56} style={{ marginBottom: 6 }} />
                <Title level={4} style={{ margin: 0, fontSize: 18 }}>
                  {t.name}
                </Title>
                <Text type="secondary" style={{ fontSize: 15 }}>
                  {t.role}
                </Text>
              </Card>
            </motion.div>
          ))}
        </Carousel>
      </motion.div>
    </>
  );
}

// --- Scientific Basis ---
function ScientificBasis() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.18, delayChildren: 0.1 },
        },
      }}
      style={{ background: '#f6faff', padding: '40px 0' }}
    >
      <Title level={2} style={{ textAlign: 'center', marginBottom: 12, fontSize: 28 }}>
        Почему нам доверяют учёные
      </Title>
      <Paragraph style={{ textAlign: 'center', color: '#888', marginBottom: 32, fontSize: 16 }}>
        Наш подход к подбору биологически активных добавок основан на научных данных и современных
        исследованиях
      </Paragraph>
      <Row gutter={[16, 16]} justify="center" style={{ marginBottom: 24 }}>
        <Col xs={24} md={16}>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
            }}
          >
            <Card
              bordered={false}
              style={{ minHeight: 180, boxShadow: '0 2px 12px #e6f4ff', borderRadius: 18 }}
            >
              <Title level={3} style={{ fontSize: 22, marginBottom: 10 }}>
                Научно обоснованный подход
              </Title>
              <Paragraph style={{ fontSize: 15 }}>
                Наша методика подбора БАДов основана на комплексном анализе состава добавок и их
                влияния на организм. Мы учитываем индивидуальные особенности каждого человека:
                возраст, пол, образ жизни, имеющиеся заболевания и генетические предрасположенности.
              </Paragraph>
              <Paragraph style={{ fontSize: 15 }}>
                Алгоритм рекомендаций постоянно совершенствуется на основе новейших клинических
                исследований и научных публикаций. Мы сотрудничаем с ведущими специалистами в
                области нутрициологии, фармакологии и спортивной медицины.
              </Paragraph>
              <Paragraph style={{ fontSize: 15 }}>
                Каждая рекомендуемая добавка проходит многоступенчатую проверку на эффективность и
                безопасность. Мы отслеживаем возможные взаимодействия между компонентами и учитываем
                индивидуальную непереносимость.
              </Paragraph>
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} md={8}>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
            }}
          >
            <Card
              bordered={false}
              style={{
                minHeight: 180,
                background: '#16B6BE',
                color: '#fff',
                boxShadow: '0 2px 12px #e6f4ff',
                borderRadius: 18,
              }}
            >
              <Title level={3} style={{ color: '#fff', fontSize: 22, marginBottom: 10 }}>
                Наши достижения
              </Title>
              <List
                itemLayout="horizontal"
                dataSource={[
                  {
                    icon: <CheckCircleOutlined />,
                    text: 'Более 50 научных публикаций в рецензируемых журналах',
                  },
                  {
                    icon: <CheckCircleOutlined />,
                    text: 'Сотрудничество с 12 исследовательскими центрами',
                  },
                  { icon: <CheckCircleOutlined />, text: 'Более 100 000 успешных рекомендаций' },
                  { icon: <TrophyOutlined />, text: 'Признаны лучшим сервисом 2023 года' },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={item.icon}
                      title={<span style={{ color: '#fff', fontSize: 15 }}>{item.text}</span>}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </motion.div>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} md={8}>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
            }}
          >
            <Card
              bordered={false}
              style={{
                minHeight: 120,
                textAlign: 'center',
                boxShadow: '0 2px 12px #e6f4ff',
                borderRadius: 18,
              }}
            >
              <ExperimentOutlined style={{ fontSize: 28, color: '#16B6BE' }} />
              <Title level={4} style={{ fontSize: 18 }}>
                Клинические исследования
              </Title>
              <Paragraph style={{ fontSize: 15 }}>
                Все рекомендации основаны на результатах научных исследований
              </Paragraph>
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} md={8}>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
            }}
          >
            <Card
              bordered={false}
              style={{
                minHeight: 120,
                textAlign: 'center',
                boxShadow: '0 2px 12px #e6f4ff',
                borderRadius: 18,
              }}
            >
              <TeamOutlined style={{ fontSize: 28, color: '#16B6BE' }} />
              <Title level={4} style={{ fontSize: 18 }}>
                Сертифицированные лаборатории
              </Title>
              <Paragraph style={{ fontSize: 15 }}>
                Сотрудничаем только с проверенными производителями
              </Paragraph>
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} md={8}>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
            }}
          >
            <Card
              bordered={false}
              style={{
                minHeight: 120,
                textAlign: 'center',
                boxShadow: '0 2px 12px #e6f4ff',
                borderRadius: 18,
              }}
            >
              <ShieldCheckIcon style={{ fontSize: 28, color: '#16B6BE' }} />
              <Title level={4} style={{ fontSize: 18 }}>
                Независимая экспертиза
              </Title>
              <Paragraph style={{ fontSize: 15 }}>
                Регулярная проверка качества и эффективности добавок
              </Paragraph>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  );
}

// --- Expert Team ---
const experts = [
  {
    name: 'Анна Соколова',
    role: 'Главный нутрициолог',
    image: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=1',
    shortBio: 'Специалист по персонализированному питанию и нутрицевтикам',
    fullBio:
      'Анна имеет более 15 лет опыта в области нутрициологии и диетологии. Она специализируется на разработке индивидуальных программ питания и подборе БАДов для оптимизации здоровья и повышения качества жизни. Анна регулярно выступает на международных конференциях и является автором множества научных публикаций.',
    specialization: ['Персонализированное питание', 'Нутригеномика', 'Спортивная нутрициология'],
    education: [
      'Кандидат медицинских наук, МГУ',
      'Сертифицированный нутрициолог, Американская ассоциация нутрициологов',
      'Диплом по спортивной диетологии, Международный олимпийский комитет',
    ],
  },
  {
    name: 'Михаил Волков',
    role: 'Врач-эндокринолог',
    image: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=3',
    shortBio: 'Эксперт по гормональному балансу и метаболическим процессам',
    fullBio:
      'Михаил специализируется на диагностике и лечении эндокринных заболеваний, а также на коррекции гормонального баланса с помощью нутрицевтиков. Он разработал уникальную методику подбора БАДов для пациентов с нарушениями обмена веществ и гормональными дисбалансами. Михаил является членом Европейской ассоциации эндокринологов.',
    specialization: ['Гормональный баланс', 'Метаболический синдром', 'Щитовидная железа'],
    education: [
      'Доктор медицинских наук, РНИМУ им. Н.И. Пирогова',
      'Специализация по эндокринологии, Первый МГМУ им. И.М. Сеченова',
      'Стажировка в клинике Мэйо, США',
    ],
  },
  {
    name: 'Екатерина Новикова',
    role: 'Нарколог',
    image: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=5',
    shortBio: 'Специалист по фармакокинетике и взаимодействию БАДов с лекарствами',
    fullBio:
      'Екатерина изучает взаимодействие биологически активных добавок с лекарственными препаратами и их влияние на организм. Она разрабатывает протоколы безопасного применения БАДов и консультирует по вопросам совместимости различных компонентов. Екатерина участвует в клинических исследованиях новых нутрицевтиков и оценке их эффективности.',
    specialization: [
      'Фармакокинетика БАДов',
      'Лекарственные взаимодействия',
      'Безопасность нутрицевтиков',
    ],
    education: [
      'Кандидат фармацевтических наук, СПбГХФА',
      'Магистр биохимии, МГУ',
      'Сертификат по клинической фармакологии, Университет Копенгагена',
    ],
  },
  {
    name: 'Дмитрий Орлов',
    role: 'Спортивный физиолог',
    image: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=12',
    shortBio: 'Эксперт по спортивному питанию и эргогенным добавкам',
    fullBio:
      'Дмитрий специализируется на разработке программ питания и подборе БАДов для спортсменов различных видов спорта. Он работает с профессиональными атлетами и любителями, помогая им достигать оптимальных результатов и улучшать восстановление. Дмитрий проводит исследования в области спортивной физиологии и эргогенных средств.',
    specialization: ['Спортивное питание', 'Эргогенные добавки', 'Восстановление после тренировок'],
    education: [
      'Кандидат биологических наук, РГУФКСМиТ',
      'Сертифицированный специалист по спортивному питанию, ISSN',
      'Диплом физиолога, МГУ',
    ],
  },
];

function ExpertTeam() {
  const [modal, setModal] = useState<{ open: boolean; expert: Expert | null }>({
    open: false,
    expert: null,
  });
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.15, delayChildren: 0.1 },
        },
      }}
      style={{ padding: '56px 0', background: '#fff' }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
        }}
      >
        <Title level={2} style={{ textAlign: 'center', marginBottom: 16 }}>
          Команда экспертов
        </Title>
        <Paragraph style={{ textAlign: 'center', color: '#888', marginBottom: 40 }}>
          Наши специалисты обладают обширным опытом в области нутрициологии, фармакологии и медицины
        </Paragraph>
      </motion.div>
      <Row gutter={[24, 24]} justify="center">
        {experts.map((expert, idx) => (
          <Col xs={24} md={6} key={idx}>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
              }}
            >
              <Card
                hoverable
                style={{ minHeight: 320, textAlign: 'center', boxShadow: '0 2px 12px #e6f4ff' }}
                onClick={() => setModal({ open: true, expert })}
              >
                <Avatar src={expert.image} size={96} style={{ marginBottom: 16 }} />
                <Title level={4} style={{ margin: 0 }}>
                  {expert.name}
                </Title>
                <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                  {expert.role}
                </Text>
                <Paragraph style={{ color: '#666', minHeight: 48 }}>{expert.shortBio}</Paragraph>
                <Button
                  type="link"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModal({ open: true, expert });
                  }}
                >
                  Подробнее
                </Button>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
      <Modal
        open={modal.open}
        onCancel={() => setModal({ open: false, expert: null })}
        footer={null}
        title={modal.expert?.name}
      >
        {modal.expert && (
          <div>
            <Avatar src={modal.expert.image} size={96} style={{ marginBottom: 16 }} />
            <Title level={4} style={{ margin: 0 }}>
              {modal.expert.role}
            </Title>
            <Paragraph>{modal.expert.fullBio}</Paragraph>
            <Divider>Специализация</Divider>
            <ul>
              {modal.expert.specialization.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <Divider>Образование</Divider>
            <ul>
              {modal.expert.education.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}


// --- Main Page ---
export default function AntdHome() {
  return (
    <Layout style={{ background: '#fff' }}>
      <Content style={{}}>
        <HeroSection />
        <WhyQuestionnaireSection />
        <SelectionProcessSection />
        <TrustSection />
        <BenefitsCarousel />
        <TestimonialsSection />
        <FAQSection />
      </Content>
      <MainFooter />
    </Layout>
  );
}

// --- SVG иконка для независимой экспертизы ---
function ShieldCheckIcon(props: any) {
  return (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        stroke="#16B6BE"
        strokeWidth="2"
        d="M12 3l7 4v5c0 5.25-3.5 9.25-7 10-3.5-.75-7-4.75-7-10V7l7-4z"
      />
      <path
        stroke="#16B6BE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4"
      />
    </svg>
  );
}

<style jsx global>{`
  @media (max-width: 480px) {
    body {
      overflow-x: hidden;
    }
    .ant-layout-content {
      padding-left: 4px !important;
      padding-right: 4px !important;
      box-sizing: border-box;
      max-width: 100vw !important;
    }
    .ant-row {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
    .ant-col {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    .ant-card {
      padding: 10px !important;
      min-width: 0 !important;
      max-width: 100vw !important;
      box-sizing: border-box;
    }
    .ant-carousel {
      max-width: 100vw !important;
      width: 100vw !important;
      min-width: 0 !important;
    }
    .ant-carousel .slick-slide > div {
      padding: 0 !important;
    }
    .ant-carousel .slick-arrow {
      width: 38px !important;
      height: 38px !important;
      font-size: 18px !important;
    }
    .ant-carousel .slick-dots-bottom {
      bottom: -16px !important;
    }
    .ant-typography,
    .ant-typography h1,
    .ant-typography h2,
    .ant-typography h3,
    .ant-typography h4 {
      font-size: 15px !important;
      line-height: 1.2 !important;
      word-break: break-word;
    }
    .ant-typography h1 {
      font-size: 22px !important;
    }
    .ant-typography h2 {
      font-size: 18px !important;
    }
    .ant-typography h3 {
      font-size: 16px !important;
    }
    .ant-typography h4 {
      font-size: 15px !important;
    }
    .ant-btn {
      font-size: 15px !important;
      padding: 0 12px !important;
      height: 38px !important;
      border-radius: 8px !important;
    }
    .ant-avatar {
      width: 40px !important;
      height: 40px !important;
      min-width: 40px !important;
      min-height: 40px !important;
    }
    .ant-divider {
      margin: 12px 0 !important;
    }
    .ant-space {
      gap: 8px !important;
    }
    .ant-layout-footer {
      padding-left: 8px !important;
      padding-right: 8px !important;
    }
    .ant-list-item-meta-title {
      font-size: 14px !important;
    }
    .ant-list-item {
      padding: 6px 0 !important;
    }
    .ant-list {
      margin-bottom: 0 !important;
    }
    .ant-modal {
      padding: 0 !important;
      width: 98vw !important;
      max-width: 98vw !important;
    }
    .ant-modal-content {
      padding: 8px !important;
    }
  }
`}</style>;
