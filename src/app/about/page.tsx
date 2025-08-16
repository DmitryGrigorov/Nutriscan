'use client';
import React from 'react';
import {
  Layout,
  Row,
  Col,
  Card,
  Typography,
  Space,
  Divider,
  List,
  Avatar,
  Tag,
  Statistic,
} from 'antd';
import {
  TeamOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  HeartOutlined,
  ExperimentOutlined,
  MedicineBoxOutlined,
  SafetyOutlined,
  GlobalOutlined,
  ClockCircleOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

// --- Hero Section ---
function HeroSection() {
  return (
    <Row
      gutter={[0, 48]}
      align="middle"
      style={{
        minHeight: 420,
        padding: '32px 0 24px 0',
        flexDirection: 'row',
      }}
    >
      <Col xs={24} md={12} style={{ textAlign: 'left', padding: '0 8vw' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.h1
            style={{ fontSize: 32, fontWeight: 800, marginBottom: 12, lineHeight: 1.1 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            О <span style={{ color: '#00979F' }}>NutriScan</span>
          </motion.h1>
          <motion.p
            style={{ fontSize: 18, color: '#555', marginBottom: 28 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Мы создаем будущее персонализированного питания, используя передовые технологии 
            и научные исследования для подбора оптимальных биологически активных добавок.
          </motion.p>
        </motion.div>
      </Col>
      <Col xs={24} md={12} style={{ textAlign: 'center', marginTop: 32 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 80 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'min(70vw, 260px)',
            height: 'min(70vw, 260px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #e6f4ff 60%, #fff 100%)',
            boxShadow: '0 0 64px #e6f4ff',
            position: 'relative',
            margin: '0 auto',
          }}
        >
          <TeamOutlined style={{ fontSize: 'min(18vw, 96px)', color: '#00979F' }} />
        </motion.div>
      </Col>
    </Row>
  );
}

// --- Mission Section ---
function MissionSection() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      style={{ background: '#f6faff', padding: '40px 0' }}
    >
      <Row gutter={[32, 32]} justify="center" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <Col xs={24} md={12}>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
            }}
          >
            <Title level={2} style={{ marginBottom: 24 }}>
              Наша миссия
            </Title>
            <Paragraph style={{ fontSize: 16, lineHeight: 1.6, color: '#555' }}>
              Мы стремимся сделать персонализированное питание доступным для каждого. 
              Наша платформа объединяет современные технологии искусственного интеллекта 
              с научными исследованиями в области нутрициологии, чтобы помочь людям 
              принимать обоснованные решения о своем здоровье.
            </Paragraph>
            <Paragraph style={{ fontSize: 16, lineHeight: 1.6, color: '#555' }}>
              Каждый человек уникален, и мы верим, что подход к здоровью должен быть 
              таким же индивидуальным. Наша цель — предоставить точные, научно обоснованные 
              рекомендации по приему БАДов, учитывающие ваши индивидуальные особенности.
            </Paragraph>
          </motion.div>
        </Col>
        <Col xs={24} md={12}>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.2 } },
            }}
          >
            <Card style={{ height: '100%', borderRadius: 16 }}>
              <Space direction="vertical" size={24} style={{ width: '100%' }}>
                <div>
                                     <Title level={4} style={{ color: '#00979F', marginBottom: 12 }}>
                     <CheckCircleOutlined style={{ marginRight: 8 }} />
                     Научный подход
                   </Title>
                  <Text style={{ color: '#666' }}>
                    Все рекомендации основаны на актуальных научных исследованиях и клинических данных
                  </Text>
                </div>
                <div>
                                     <Title level={4} style={{ color: '#00979F', marginBottom: 12 }}>
                     <SafetyOutlined style={{ marginRight: 8 }} />
                     Безопасность
                   </Title>
                  <Text style={{ color: '#666' }}>
                    Мы работаем только с проверенными производителями и сертифицированными продуктами
                  </Text>
                </div>
                <div>
                                     <Title level={4} style={{ color: '#00979F', marginBottom: 12 }}>
                     <HeartOutlined style={{ marginRight: 8 }} />
                     Персонализация
                   </Title>
                  <Text style={{ color: '#666' }}>
                    Индивидуальный подход к каждому пользователю с учетом его потребностей и целей
                  </Text>
                </div>
              </Space>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  );
}

// --- Statistics Section ---
function StatisticsSection() {
  const stats = [
    { icon: <TeamOutlined />, value: '50,000+', label: 'Довольных клиентов' },
    { icon: <MedicineBoxOutlined />, value: '1000+', label: 'Товаров в каталоге' },
    { icon: <ExperimentOutlined />, value: '95%', label: 'Точность рекомендаций' },
    { icon: <StarOutlined />, value: '4.8', label: 'Средний рейтинг' },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      style={{ padding: '60px 0', background: '#fff' }}
    >
      <Row gutter={[32, 32]} justify="center" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {stats.map((stat, index) => (
          <Col xs={12} md={6} key={index}>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { duration: 0.7, delay: index * 0.1 } 
                },
              }}
              style={{ textAlign: 'center' }}
            >
              <Statistic
                value={stat.value}
                suffix={stat.label}
                                 valueStyle={{ 
                   color: '#00979F', 
                   fontSize: '28px', 
                   fontWeight: 'bold' 
                 }}
                                 prefix={
                   <div style={{ 
                     fontSize: '32px', 
                     color: '#00979F', 
                     marginBottom: '8px' 
                   }}>
                     {stat.icon}
                   </div>
                 }
              />
            </motion.div>
          </Col>
        ))}
      </Row>
    </motion.div>
  );
}

// --- Team Section ---
function TeamSection() {
  const team = [
    {
      name: 'Доктор Анна Петрова',
      role: 'Главный нутрициолог',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      bio: 'Специалист с 15-летним опытом в области клинической нутрициологии. Автор более 50 научных публикаций.',
      specialization: ['Клиническая нутрициология', 'Спортивное питание', 'Детоксикация'],
    },
    {
      name: 'Михаил Соколов',
      role: 'Технический директор',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Эксперт в области машинного обучения и разработки медицинских технологий. Создатель алгоритмов персонализации.',
      specialization: ['Искусственный интеллект', 'Медицинские технологии', 'Анализ данных'],
    },
    {
      name: 'Елена Козлова',
      role: 'Руководитель отдела качества',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Специалист по контролю качества и сертификации. Обеспечивает безопасность всех продуктов в каталоге.',
      specialization: ['Контроль качества', 'Сертификация', 'Безопасность продуктов'],
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      style={{ background: '#fafafa', padding: '60px 0' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <Title level={2} style={{ marginBottom: 16 }}>
            Наша команда
          </Title>
          <Paragraph style={{ fontSize: 16, color: '#666', maxWidth: 600, margin: '0 auto' }}>
            Эксперты в области нутрициологии, технологий и качества, объединенные общей целью 
            сделать персонализированное питание доступным для каждого.
          </Paragraph>
        </motion.div>

        <Row gutter={[32, 32]} justify="center">
          {team.map((member, index) => (
            <Col xs={24} md={8} key={index}>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 0.7, delay: index * 0.2 } 
                  },
                }}
              >
                <Card style={{ textAlign: 'center', borderRadius: 16, height: '100%' }}>
                  <Avatar 
                    size={120} 
                    src={member.avatar}
                    style={{ marginBottom: 16 }}
                  />
                  <Title level={4} style={{ marginBottom: 8 }}>
                    {member.name}
                  </Title>
                  <Text type="secondary" style={{ fontSize: 16, marginBottom: 16, display: 'block' }}>
                    {member.role}
                  </Text>
                  <Paragraph style={{ color: '#666', marginBottom: 16 }}>
                    {member.bio}
                  </Paragraph>
                  <Space wrap style={{ justifyContent: 'center' }}>
                    {member.specialization.map((spec, idx) => (
                      <Tag key={idx} color="blue" style={{ margin: 2 }}>
                        {spec}
                      </Tag>
                    ))}
                  </Space>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </motion.div>
  );
}

// --- Values Section ---
function ValuesSection() {
  const values = [
    {
             icon: <SafetyOutlined style={{ fontSize: 32, color: '#00979F' }} />,
      title: 'Безопасность',
      description: 'Мы гарантируем безопасность всех продуктов в нашем каталоге, работая только с проверенными производителями.',
    },
    {
             icon: <ExperimentOutlined style={{ fontSize: 32, color: '#00979F' }} />,
      title: 'Научность',
      description: 'Все наши рекомендации основаны на актуальных научных исследованиях и клинических данных.',
    },
    {
             icon: <HeartOutlined style={{ fontSize: 32, color: '#00979F' }} />,
      title: 'Забота',
      description: 'Мы заботимся о здоровье каждого клиента, предоставляя персонализированные рекомендации.',
    },
    {
             icon: <GlobalOutlined style={{ fontSize: 32, color: '#00979F' }} />,
      title: 'Доступность',
      description: 'Делаем качественные БАДы доступными для всех, независимо от места проживания.',
    },
    {
             icon: <ClockCircleOutlined style={{ fontSize: 32, color: '#00979F' }} />,
      title: 'Поддержка',
      description: 'Обеспечиваем постоянную поддержку и сопровождение на всех этапах использования.',
    },
    {
             icon: <TrophyOutlined style={{ fontSize: 32, color: '#00979F' }} />,
      title: 'Качество',
      description: 'Непрерывно улучшаем качество наших услуг и расширяем ассортимент продукции.',
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      style={{ padding: '60px 0', background: '#fff' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <Title level={2} style={{ marginBottom: 16 }}>
            Наши ценности
          </Title>
          <Paragraph style={{ fontSize: 16, color: '#666', maxWidth: 600, margin: '0 auto' }}>
            Принципы, которые лежат в основе нашей работы и определяют подход к обслуживанию клиентов.
          </Paragraph>
        </motion.div>

        <Row gutter={[24, 24]}>
          {values.map((value, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 0.7, delay: index * 0.1 } 
                  },
                }}
              >
                <Card style={{ textAlign: 'center', borderRadius: 16, height: '100%' }}>
                  <div style={{ marginBottom: 16 }}>
                    {value.icon}
                  </div>
                  <Title level={4} style={{ marginBottom: 12 }}>
                    {value.title}
                  </Title>
                  <Paragraph style={{ color: '#666', margin: 0 }}>
                    {value.description}
                  </Paragraph>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </motion.div>
  );
}

// --- Contact Section ---
function ContactSection() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      style={{ background: '#f6faff', padding: '60px 0' }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
        >
          <Title level={2} style={{ marginBottom: 16 }}>
            Свяжитесь с нами
          </Title>
          <Paragraph style={{ fontSize: 16, color: '#666', marginBottom: 32 }}>
            У вас есть вопросы или предложения? Мы всегда готовы помочь и ответить на все ваши вопросы.
          </Paragraph>
          
          <Space direction="vertical" size={16} style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
            <Card style={{ borderRadius: 12 }}>
              <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <Text strong style={{ fontSize: 16 }}>Email</Text>
                                 <Text style={{ color: '#00979F' }}>support@nutriscan.ru</Text>
              </Space>
            </Card>
            
            <Card style={{ borderRadius: 12 }}>
              <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <Text strong style={{ fontSize: 16 }}>Телефон</Text>
                                 <Text style={{ color: '#00979F' }}>8-800-555-0123</Text>
              </Space>
            </Card>
            
            <Card style={{ borderRadius: 12 }}>
              <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <Text strong style={{ fontSize: 16 }}>Время работы</Text>
                <Text>Пн-Пт: 9:00 - 18:00</Text>
                <Text>Сб-Вс: 10:00 - 16:00</Text>
              </Space>
            </Card>
          </Space>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ maxWidth: '100%' }}>
        <HeroSection />
        <MissionSection />
        <StatisticsSection />
        <TeamSection />
        <ValuesSection />
        <ContactSection />
      </Content>
      
      <style jsx global>{`
        @media (max-width: 768px) {
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
          .ant-avatar {
            width: 80px !important;
            height: 80px !important;
            min-width: 80px !important;
            min-height: 80px !important;
          }
          .ant-statistic {
            text-align: center !important;
          }
          .ant-statistic-title {
            font-size: 12px !important;
          }
          .ant-statistic-content {
            font-size: 18px !important;
          }
        }
      `}</style>
    </Layout>
  );
}
