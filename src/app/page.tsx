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
  Space,
  Divider,
  List,
} from 'antd';
import {
  UserOutlined,
  HeartOutlined,
  ExperimentOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  TrophyOutlined,
  ReloadOutlined,
  GiftOutlined,
  SmileOutlined,
  StarOutlined,
  MedicineBoxOutlined,
  SolutionOutlined,
  ProfileOutlined,
  ThunderboltOutlined,
  FireOutlined,
  LikeOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Footer, Content } = Layout;

// --- Hero Section ---
function HeroSection() {
  return (
    <Row gutter={[32, 32]} align="middle" style={{ minHeight: 480, padding: '48px 0 32px 0' }}>
      <Col xs={24} md={12}>
        <Title style={{ fontSize: 44, fontWeight: 800, marginBottom: 16 }}>
          Найдите идеальные <span style={{ color: '#1677ff' }}>БАДы</span> за 2 минуты
        </Title>
        <Paragraph style={{ fontSize: 20, color: '#555', marginBottom: 32 }}>
          Персонализированный подбор биологически активных добавок на основе ваших индивидуальных потребностей, образа жизни и целей здоровья.
        </Paragraph>
        <Space>
          <Button type="primary" size="large" icon={<ProfileOutlined />}>
            Пройти опрос
          </Button>
          <Button size="large" icon={<ArrowRightOutlined />}>
            Узнать больше
          </Button>
        </Space>
      </Col>
      <Col xs={24} md={12} style={{ textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #e6f4ff 60%, #fff 100%)',
          boxShadow: '0 0 64px #e6f4ff',
          position: 'relative',
        }}>
          <MedicineBoxOutlined style={{ fontSize: 96, color: '#1677ff' }} />
        </div>
      </Col>
    </Row>
  );
}

// --- How It Works ---
function HowItWorks() {
  const steps = [
    {
      icon: <ProfileOutlined style={{ fontSize: 32, color: '#1677ff' }} />, title: 'Заполните анкету', description: 'Ответьте на вопросы о вашем здоровье, образе жизни и целях',
    },
    {
      icon: <SolutionOutlined style={{ fontSize: 32, color: '#1677ff' }} />, title: 'Получите рекомендации', description: 'Наш алгоритм подберет персональные БАДы на основе ваших ответов',
    },
    {
      icon: <GiftOutlined style={{ fontSize: 32, color: '#1677ff' }} />, title: 'Оформите заказ', description: 'Выберите подходящие добавки и получите их с доставкой',
    },
    {
      icon: <ReloadOutlined style={{ fontSize: 32, color: '#1677ff' }} />, title: 'Отслеживайте прогресс', description: 'Корректируйте программу приема по мере изменения потребностей',
    },
  ];
  return (
    <div style={{ background: '#f6faff', padding: '56px 0' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 16 }}>Как это работает</Title>
      <Paragraph style={{ textAlign: 'center', color: '#888', marginBottom: 40 }}>
        Простой процесс подбора биологически активных добавок, адаптированных под ваши индивидуальные потребности
      </Paragraph>
      <Row gutter={[24, 24]} justify="center">
        {steps.map((step, idx) => (
          <Col xs={24} md={6} key={idx}>
            <Card bordered={false} style={{ minHeight: 220, textAlign: 'center', boxShadow: '0 2px 12px #e6f4ff' }}>
              <div style={{ marginBottom: 16 }}>{step.icon}</div>
              <Title level={4}>{step.title}</Title>
              <Paragraph style={{ color: '#666' }}>{step.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

// --- Testimonials ---
function Testimonials() {
  const testimonials = [
    {
      name: 'Елена Смирнова',
      role: 'Фитнес-тренер',
      image: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=1',
      quote: 'Благодаря персональным рекомендациям я смогла подобрать комплекс добавок, который действительно помогает моим клиентам достигать лучших результатов.'
    },
    {
      name: 'Алексей Петров',
      role: 'IT-специалист',
      image: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=2',
      quote: 'Сервис помог мне разобраться в огромном количестве БАДов и выбрать именно то, что нужно для поддержания энергии в течение рабочего дня.'
    },
    {
      name: 'Мария Иванова',
      role: 'Врач-диетолог',
      image: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=3',
      quote: 'Как специалист, я ценю научный подход к подбору добавок. Рекомендую этот сервис своим пациентам для дополнительной поддержки здоровья.'
    },
    {
      name: 'Дмитрий Козлов',
      role: 'Спортсмен',
      image: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=4',
      quote: 'Индивидуальный подход помог мне оптимизировать программу приема добавок и значительно улучшить восстановление после тренировок.'
    }
  ];
  return (
    <div style={{ padding: '56px 0', background: '#fff' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 16 }}>Отзывы пользователей</Title>
      <Paragraph style={{ textAlign: 'center', color: '#888', marginBottom: 40 }}>
        Узнайте, как наш сервис помогает людям улучшать здоровье и достигать своих целей
      </Paragraph>
      <Carousel dots autoplay style={{ maxWidth: 700, margin: '0 auto' }}>
        {testimonials.map((t, idx) => (
          <Card key={idx} style={{ minHeight: 320, textAlign: 'center', boxShadow: '0 2px 12px #e6f4ff', padding: 32 }}>
            <div style={{ marginBottom: 16 }}><LikeOutlined style={{ fontSize: 32, color: '#1677ff' }} /></div>
            <Paragraph style={{ fontSize: 20, fontStyle: 'italic', marginBottom: 24 }}>
              "{t.quote}"
            </Paragraph>
            <Avatar src={t.image} size={64} style={{ marginBottom: 8 }} />
            <Title level={4} style={{ margin: 0 }}>{t.name}</Title>
            <Text type="secondary">{t.role}</Text>
          </Card>
        ))}
      </Carousel>
    </div>
  );
}

// --- Scientific Basis ---
function ScientificBasis() {
  return (
    <div style={{ background: '#f6faff', padding: '56px 0' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 16 }}>Почему нам доверяют учёные</Title>
      <Paragraph style={{ textAlign: 'center', color: '#888', marginBottom: 40 }}>
        Наш подход к подбору биологически активных добавок основан на научных данных и современных исследованиях
      </Paragraph>
      <Row gutter={[24, 24]} justify="center" style={{ marginBottom: 32 }}>
        <Col xs={24} md={16}>
          <Card bordered={false} style={{ minHeight: 220, boxShadow: '0 2px 12px #e6f4ff' }}>
            <Title level={3}>Научно обоснованный подход</Title>
            <Paragraph>
              Наша методика подбора БАДов основана на комплексном анализе состава добавок и их влияния на организм. Мы учитываем индивидуальные особенности каждого человека: возраст, пол, образ жизни, имеющиеся заболевания и генетические предрасположенности.
            </Paragraph>
            <Paragraph>
              Алгоритм рекомендаций постоянно совершенствуется на основе новейших клинических исследований и научных публикаций. Мы сотрудничаем с ведущими специалистами в области нутрициологии, фармакологии и спортивной медицины.
            </Paragraph>
            <Paragraph>
              Каждая рекомендуемая добавка проходит многоступенчатую проверку на эффективность и безопасность. Мы отслеживаем возможные взаимодействия между компонентами и учитываем индивидуальную непереносимость.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false} style={{ minHeight: 220, background: '#1677ff', color: '#fff', boxShadow: '0 2px 12px #e6f4ff' }}>
            <Title level={3} style={{ color: '#fff' }}>Наши достижения</Title>
            <List
              itemLayout="horizontal"
              dataSource={[
                { icon: <CheckCircleOutlined />, text: 'Более 50 научных публикаций в рецензируемых журналах' },
                { icon: <CheckCircleOutlined />, text: 'Сотрудничество с 12 исследовательскими центрами' },
                { icon: <CheckCircleOutlined />, text: 'Более 100 000 успешных рекомендаций' },
                { icon: <TrophyOutlined />, text: 'Признаны лучшим сервисом 2023 года' },
              ]}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta avatar={item.icon} title={<span style={{ color: '#fff' }}>{item.text}</span>} />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} md={8}>
          <Card bordered={false} style={{ minHeight: 180, textAlign: 'center', boxShadow: '0 2px 12px #e6f4ff' }}>
            <ExperimentOutlined style={{ fontSize: 32, color: '#1677ff' }} />
            <Title level={4}>Клинические исследования</Title>
            <Paragraph>Все рекомендации основаны на результатах научных исследований</Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false} style={{ minHeight: 180, textAlign: 'center', boxShadow: '0 2px 12px #e6f4ff' }}>
            <TeamOutlined style={{ fontSize: 32, color: '#1677ff' }} />
            <Title level={4}>Сертифицированные лаборатории</Title>
            <Paragraph>Сотрудничаем только с проверенными производителями</Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false} style={{ minHeight: 180, textAlign: 'center', boxShadow: '0 2px 12px #e6f4ff' }}>
            <ShieldCheckIcon style={{ fontSize: 32, color: '#1677ff' }} />
            <Title level={4}>Независимая экспертиза</Title>
            <Paragraph>Регулярная проверка качества и эффективности добавок</Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

// --- Expert Team ---
const experts = [
  {
    name: 'Анна Соколова',
    role: 'Главный нутрициолог',
    image: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=10',
    shortBio: 'Специалист по персонализированному питанию и нутрицевтикам',
    fullBio: 'Анна имеет более 15 лет опыта в области нутрициологии и диетологии. Она специализируется на разработке индивидуальных программ питания и подборе БАДов для оптимизации здоровья и повышения качества жизни. Анна регулярно выступает на международных конференциях и является автором множества научных публикаций.',
    specialization: [
      'Персонализированное питание',
      'Нутригеномика',
      'Спортивная нутрициология',
    ],
    education: [
      'Кандидат медицинских наук, МГУ',
      'Сертифицированный нутрициолог, Американская ассоциация нутрициологов',
      'Диплом по спортивной диетологии, Международный олимпийский комитет',
    ],
  },
  {
    name: 'Михаил Волков',
    role: 'Врач-эндокринолог',
    image: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=11',
    shortBio: 'Эксперт по гормональному балансу и метаболическим процессам',
    fullBio: 'Михаил специализируется на диагностике и лечении эндокринных заболеваний, а также на коррекции гормонального баланса с помощью нутрицевтиков. Он разработал уникальную методику подбора БАДов для пациентов с нарушениями обмена веществ и гормональными дисбалансами. Михаил является членом Европейской ассоциации эндокринологов.',
    specialization: [
      'Гормональный баланс',
      'Метаболический синдром',
      'Щитовидная железа',
    ],
    education: [
      'Доктор медицинских наук, РНИМУ им. Н.И. Пирогова',
      'Специализация по эндокринологии, Первый МГМУ им. И.М. Сеченова',
      'Стажировка в клинике Мэйо, США',
    ],
  },
  {
    name: 'Екатерина Новикова',
    role: 'Фармаколог',
    image: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=12',
    shortBio: 'Специалист по фармакокинетике и взаимодействию БАДов с лекарствами',
    fullBio: 'Екатерина изучает взаимодействие биологически активных добавок с лекарственными препаратами и их влияние на организм. Она разрабатывает протоколы безопасного применения БАДов и консультирует по вопросам совместимости различных компонентов. Екатерина участвует в клинических исследованиях новых нутрицевтиков и оценке их эффективности.',
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
    image: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=13',
    shortBio: 'Эксперт по спортивному питанию и эргогенным добавкам',
    fullBio: 'Дмитрий специализируется на разработке программ питания и подборе БАДов для спортсменов различных видов спорта. Он работает с профессиональными атлетами и любителями, помогая им достигать оптимальных результатов и улучшать восстановление. Дмитрий проводит исследования в области спортивной физиологии и эргогенных средств.',
    specialization: [
      'Спортивное питание',
      'Эргогенные добавки',
      'Восстановление после тренировок',
    ],
    education: [
      'Кандидат биологических наук, РГУФКСМиТ',
      'Сертифицированный специалист по спортивному питанию, ISSN',
      'Диплом физиолога, МГУ',
    ],
  },
];

function ExpertTeam() {
  const [modal, setModal] = useState({ open: false, expert: null });
  return (
    <div style={{ padding: '56px 0', background: '#fff' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 16 }}>Команда экспертов</Title>
      <Paragraph style={{ textAlign: 'center', color: '#888', marginBottom: 40 }}>
        Наши специалисты обладают обширным опытом в области нутрициологии, фармакологии и медицины
      </Paragraph>
      <Row gutter={[24, 24]} justify="center">
        {experts.map((expert, idx) => (
          <Col xs={24} md={6} key={idx}>
            <Card
              hoverable
              style={{ minHeight: 320, textAlign: 'center', boxShadow: '0 2px 12px #e6f4ff' }}
              onClick={() => setModal({ open: true, expert })}
            >
              <Avatar src={expert.image} size={96} style={{ marginBottom: 16 }} />
              <Title level={4} style={{ margin: 0 }}>{expert.name}</Title>
              <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>{expert.role}</Text>
              <Paragraph style={{ color: '#666', minHeight: 48 }}>{expert.shortBio}</Paragraph>
              <Button type="link" onClick={e => { e.stopPropagation(); setModal({ open: true, expert }); }}>
                Подробнее
              </Button>
            </Card>
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
            <Title level={4} style={{ margin: 0 }}>{modal.expert.role}</Title>
            <Paragraph>{modal.expert.fullBio}</Paragraph>
            <Divider>Специализация</Divider>
            <ul>
              {modal.expert.specialization.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <Divider>Образование</Divider>
            <ul>
              {modal.expert.education.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
}

// --- Footer ---
function MainFooter() {
  return (
    <Footer style={{ background: '#f6faff', padding: '40px 0', marginTop: 64 }}>
      <Row gutter={[32, 32]} justify="center">
        <Col xs={24} md={6}>
          <Title level={4}>Nutriname</Title>
          <Paragraph style={{ color: '#888' }}>
            Персонализированный подбор биологически активных добавок на основе научных данных и индивидуальных потребностей.
          </Paragraph>
        </Col>
        <Col xs={24} md={6}>
          <Title level={5}>Навигация</Title>
          <ul style={{ color: '#1677ff', paddingLeft: 0, listStyle: 'none' }}>
            <li>Главная</li>
            <li>Как это работает</li>
            <li>Отзывы</li>
            <li>Научный подход</li>
            <li>Наша команда</li>
          </ul>
        </Col>
        <Col xs={24} md={6}>
          <Title level={5}>Контакты</Title>
          <Paragraph style={{ color: '#888', marginBottom: 4 }}>Москва, ул. Примерная, 123</Paragraph>
          <Paragraph style={{ color: '#888', marginBottom: 4 }}>+7 (999) 123-45-67</Paragraph>
          <Paragraph style={{ color: '#888' }}>info@supplеments-ai.ru</Paragraph>
        </Col>
      </Row>
      <Divider />
      <div style={{ textAlign: 'center', color: '#aaa' }}>
        © 2023 NutriScan. Все права защищены.
      </div>
    </Footer>
  );
}

// --- Main Page ---
export default function AntdHome() {
  return (
    <Layout style={{ background: '#fff' }}>
      <Content style={{ maxWidth: 1200, margin: '0 auto', background: '#fff' }}>
        <HeroSection />
        <HowItWorks />
        <Testimonials />
        <ScientificBasis />
        <ExpertTeam />
      </Content>
      <MainFooter />
    </Layout>
  );
}

// --- SVG иконка для независимой экспертизы ---
function ShieldCheckIcon(props: any) {
  return (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="#1677ff" strokeWidth="2" d="M12 3l7 4v5c0 5.25-3.5 9.25-7 10-3.5-.75-7-4.75-7-10V7l7-4z" />
      <path stroke="#1677ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  );
} 