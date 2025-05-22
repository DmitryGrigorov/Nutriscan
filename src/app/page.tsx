'use client';

import { Typography, Layout, Row, Col, Card, Button, Form, Input, message } from 'antd';
import { SurveyProvider } from '@/contexts/SurveyContext';
import SurveyForm from '@/components/survey/SurveyForm';
import {
  MailOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  ExperimentOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

function HeroSection() {
  return (
    <div
      style={{
        position: 'relative',
        background: 'linear-gradient(120deg, #2ec6c6 0%, #4be1ec 60%, #e0f7fa 100%)',
        borderRadius: 32,
        padding: '64px 32px 72px 32px',
        marginBottom: 48,
        textAlign: 'left',
        color: '#fff',
        boxShadow: '0 8px 32px rgba(44, 183, 183, 0.12)',
        overflow: 'hidden',
        minHeight: 340,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Декоративные круги */}
      <div
        style={{
          position: 'absolute',
          top: -40,
          right: -60,
          width: 220,
          height: 220,
          background: 'radial-gradient(circle, rgba(255,255,255,0.18) 60%, transparent 100%)',
          borderRadius: '50%',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -60,
          left: -60,
          width: 180,
          height: 180,
          background: 'radial-gradient(circle, rgba(44,198,198,0.10) 60%, transparent 100%)',
          borderRadius: '50%',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 600 }}>
        <Title
          style={{ color: '#fff', marginBottom: 8, fontSize: 44, fontWeight: 800, lineHeight: 1.1 }}
        >
          Ваша личная <span style={{ color: '#e0f7fa', fontWeight: 700 }}>формула здоровья</span>
        </Title>
        <Paragraph style={{ color: '#e0f7fa', fontSize: 22, fontWeight: 400, marginBottom: 32 }}>
          Уникальный сервис для подбора БАДов и поддержки организма на основе опроса и современных
          технологий.
        </Paragraph>
        <Button
          type="primary"
          size="large"
          style={{
            marginTop: 8,
            background: 'linear-gradient(90deg, #2ec6c6 0%, #4be1ec 100%)',
            border: 'none',
            borderRadius: 24,
            padding: '0 40px',
            fontWeight: 600,
            fontSize: 20,
            boxShadow: '0 4px 16px rgba(44,183,183,0.18)',
            transition: 'box-shadow 0.2s',
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.boxShadow = '0 8px 32px rgba(44,183,183,0.22)')
          }
          onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(44,183,183,0.18)')}
        >
          Пройти опрос
        </Button>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: 'Определяем цели и потребности',
      desc: 'Заполняем короткий опросник, чтобы определить основные цели приёма БАДов (например, укрепление иммунитета, поддержка суставов и тд)',
      stat: '98%',
      statDesc: 'довольных клиентов',
      btn: 'Пройти опрос',
      img: '/how-1.png',
    },
    {
      title: 'Анализ состояния',
      desc: 'Анализируем ваши ответы и подбираем индивидуальные рекомендации.',
      stat: '100+',
      statDesc: 'рекомендаций в базе',
      btn: 'Подробнее',
      img: '/how-2.png',
    },
    {
      title: 'Рекомендации',
      desc: 'Получаете список подходящих БАДов и советы по их применению.',
      stat: '24/7',
      statDesc: 'поддержка',
      btn: 'Получить рекомендации',
      img: '/how-3.png',
    },
    {
      title: 'Консультация',
      desc: 'Можете задать вопросы нашим экспертам и получить консультацию.',
      stat: '15+',
      statDesc: 'экспертов',
      btn: 'Задать вопрос',
      img: '/how-4.png',
    },
    {
      title: 'Поддержка',
      desc: 'Остаёмся на связи для дальнейших рекомендаций и поддержки.',
      stat: '365',
      statDesc: 'дней в году',
      btn: 'Связаться',
      img: '/how-5.png',
    },
  ];
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  // Анимация смены слайда
  const handleStep = (idx: number) => {
    if (idx === current) return;
    setFade(false);
    setTimeout(() => {
      setCurrent(idx);
      setFade(true);
    }, 250);
  };

  return (
    <div style={{ margin: '48px 0' }}>
      <Title level={2}>Как это работает</Title>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 32,
          alignItems: 'stretch',
          justifyContent: 'center',
        }}
      >
        {/* Левая часть: шаги и описание */}
        <div style={{ minWidth: 320, maxWidth: 480, flex: 1 }}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleStep(idx)}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  border: 'none',
                  background:
                    current === idx
                      ? 'linear-gradient(90deg, #2ec6c6 0%, #4be1ec 100%)'
                      : '#e0f7fa',
                  color: current === idx ? '#fff' : '#2ec6c6',
                  fontWeight: 700,
                  fontSize: 20,
                  boxShadow: current === idx ? '0 4px 16px rgba(44,183,183,0.18)' : 'none',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                aria-label={`Шаг ${idx + 1}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <div
            style={{
              background: '#fff',
              borderRadius: 24,
              boxShadow: '0 8px 32px rgba(44,183,183,0.10)',
              padding: '32px 32px 24px 32px',
              minHeight: 220,
              position: 'relative',
              transition: 'box-shadow 0.3s',
              marginBottom: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              zIndex: 2,
              opacity: fade ? 1 : 0,
              transitionProperty: 'opacity',
              transitionDuration: '0.4s',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>
              {steps[current].title}
            </div>
            <div style={{ color: '#4b6b6b', fontSize: 16, marginBottom: 16 }}>
              {steps[current].desc}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 8 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 32, color: '#2ec6c6', lineHeight: 1 }}>
                  {steps[current].stat}
                </div>
                <div style={{ color: '#4b6b6b', fontSize: 14 }}>{steps[current].statDesc}</div>
              </div>
              <Button
                type="primary"
                size="large"
                style={{
                  background: 'linear-gradient(90deg, #2ec6c6 0%, #4be1ec 100%)',
                  border: 'none',
                  borderRadius: 24,
                  fontWeight: 600,
                  fontSize: 18,
                  boxShadow: '0 2px 8px rgba(44,183,183,0.10)',
                  padding: '0 32px',
                  marginLeft: 8,
                }}
              >
                {steps[current].btn}
              </Button>
            </div>
          </div>
        </div>
        {/* Правая часть: картинка */}
        <div
          style={{
            minWidth: 260,
            maxWidth: 340,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              height: 260,
              borderRadius: 24,
              background: '#e0f7fa',
              boxShadow: '0 4px 24px rgba(44,183,183,0.10)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
              transition: 'box-shadow 0.3s',
              opacity: fade ? 1 : 0,
              transitionProperty: 'opacity',
              transitionDuration: '0.4s',
            }}
          >
            <img
              src={steps[current].img}
              alt={steps[current].title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 24,
                transition: 'opacity 0.4s',
                opacity: 1,
              }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://via.placeholder.com/340x260?text=Image';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ScienceSliderSection() {
  const slides = [
    {
      img: '/science-1.jpg',
      subtitle: 'ФУНДАМЕНТАЛЬНЫЙ ПОДХОД',
      title: 'Выбор БАДов: безопасность\nи эффективность',
      desc: 'Мы сотрудничаем с ведущими экспертами и научными центрами, чтобы гарантировать высокое качество и соответствие всем стандартам.\nУделяем особое внимание безопасности и эффективности наших продуктов: каждый БАД проходит тщательную проверку на всех этапах производства — от выбора сырья до готовой продукции.',
    },
    {
      img: '/science-2.jpg',
      subtitle: 'ПРОВЕРЕННЫЕ МЕТОДИКИ',
      title: 'Контроль качества\nна каждом этапе',
      desc: 'Вся продукция проходит лабораторные исследования и сертификацию. Мы используем только современные методы контроля и работаем с лучшими поставщиками.',
    },
    {
      img: '/science-3.jpg',
      subtitle: 'КОМАНДА ЭКСПЕРТОВ',
      title: 'Профессионализм\nи забота о клиентах',
      desc: 'Наши специалисты постоянно повышают квалификацию и следят за новейшими научными открытиями, чтобы вы получали только лучшие рекомендации.',
    },
  ];
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const handleSlide = (dir: 'prev' | 'next') => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => {
        if (dir === 'prev') return prev === 0 ? slides.length - 1 : prev - 1;
        return prev === slides.length - 1 ? 0 : prev + 1;
      });
      setFade(true);
    }, 250);
  };

  return (
    <div
      style={{
        margin: '64px 0',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 48,
      }}
    >
      {/* Картинка слева */}
      <div
        style={{ minWidth: 320, maxWidth: 420, flex: 1, display: 'flex', justifyContent: 'center' }}
      >
        <div
          style={{
            borderRadius: 32,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(44,183,183,0.10)',
            border: '4px solid #e0f7fa',
            background: '#f6fffe',
            width: '100%',
            height: 340,
            position: 'relative',
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.4s',
          }}
        >
          <img
            src={slides[current].img}
            alt={slides[current].subtitle}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 28 }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://via.placeholder.com/420x340?text=Image';
            }}
          />
        </div>
      </div>
      {/* Текст справа */}
      <div
        style={{
          minWidth: 320,
          maxWidth: 600,
          flex: 2,
          opacity: fade ? 1 : 0,
          transition: 'opacity 0.4s',
        }}
      >
        <div
          style={{
            color: '#2ec6c6',
            fontWeight: 700,
            letterSpacing: 2,
            marginBottom: 16,
            fontSize: 18,
          }}
        >
          {slides[current].subtitle}
        </div>
        <div
          style={{
            fontWeight: 800,
            fontSize: 44,
            color: '#003b3b',
            marginBottom: 24,
            lineHeight: 1.1,
            whiteSpace: 'pre-line',
          }}
        >
          {slides[current].title}
        </div>
        <div style={{ color: '#4b6b6b', fontSize: 18, marginBottom: 32, whiteSpace: 'pre-line' }}>
          {slides[current].desc}
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <button
            onClick={() => handleSlide('prev')}
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              border: '2px solid #2ec6c6',
              background: '#fff',
              color: '#2ec6c6',
              fontSize: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s, background 0.2s',
              boxShadow: '0 2px 8px rgba(44,183,183,0.08)',
            }}
            aria-label="Предыдущий слайд"
          >
            <LeftOutlined />
          </button>
          <button
            onClick={() => handleSlide('next')}
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              border: '2px solid #2ec6c6',
              background: '#fff',
              color: '#2ec6c6',
              fontSize: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s, background 0.2s',
              boxShadow: '0 2px 8px rgba(44,183,183,0.08)',
            }}
            aria-label="Следующий слайд"
          >
            <RightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
}

function TeamSection() {
  const team = [
    {
      name: 'Д-р Иванов Алексей',
      img: '/team-1.jpg',
    },
    {
      name: 'Д-р Смирнова Ольга',
      img: '/team-2.jpg',
    },
    {
      name: 'Д-р Петров Дмитрий',
      img: '/team-3.jpg',
    },
    {
      name: 'Д-р Кузнецова Анна',
      img: '/team-4.jpg',
    },
    {
      name: 'Д-р Сидоров Михаил',
      img: '/team-5.jpg',
    },
    {
      name: 'Д-р Васильева Мария',
      img: '/team-6.jpg',
    },
  ];
  const [start, setStart] = useState(0);
  const visible = 4;
  const handlePrev = () => setStart((s) => (s === 0 ? team.length - visible : s - 1));
  const handleNext = () => setStart((s) => (s + visible >= team.length ? 0 : s + 1));
  const shown =
    team.slice(start, start + visible).length === visible
      ? team.slice(start, start + visible)
      : [...team.slice(start), ...team.slice(0, visible - (team.length - start))];

  return (
    <div
      style={{
        margin: '64px 0',
        background: 'radial-gradient(circle at 80% 10%, #e0f7fa 0%, #fff 80%)',
        borderRadius: 32,
        padding: '48px 0 56px 0',
        boxShadow: '0 8px 32px rgba(44,183,183,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Title
        level={2}
        style={{ textAlign: 'center', marginBottom: 40, color: '#003b3b', fontWeight: 800 }}
      >
        Наша команда специалистов
      </Title>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <button
          onClick={handlePrev}
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            border: '2px solid #2ec6c6',
            background: '#fff',
            color: '#2ec6c6',
            fontSize: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'box-shadow 0.2s, background 0.2s',
            boxShadow: '0 2px 8px rgba(44,183,183,0.08)',
          }}
          aria-label="Назад"
        >
          <LeftOutlined />
        </button>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'nowrap' }}>
          {shown.map((member, idx) => (
            <div
              key={member.name + idx}
              style={{
                background: '#fff',
                borderRadius: '50% / 40%',
                boxShadow: '0 4px 24px rgba(44,183,183,0.10)',
                width: 200,
                height: 280,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                overflow: 'hidden',
                position: 'relative',
                transition: 'box-shadow 0.3s',
              }}
            >
              <img
                src={member.img}
                alt={member.name}
                style={{
                  width: '100%',
                  height: 220,
                  objectFit: 'cover',
                  borderRadius: '50% / 40% 40% 50% 50%',
                  marginBottom: 0,
                  transition: 'opacity 0.4s',
                }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://via.placeholder.com/200x220?text=Photo';
                }}
              />
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  color: '#003b3b',
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.92)',
                  width: '100%',
                  padding: '12px 0 10px 0',
                  borderBottomLeftRadius: 32,
                  borderBottomRightRadius: 32,
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                }}
              >
                {member.name}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            border: '2px solid #2ec6c6',
            background: '#fff',
            color: '#2ec6c6',
            fontSize: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'box-shadow 0.2s, background 0.2s',
            boxShadow: '0 2px 8px rgba(44,183,183,0.08)',
          }}
          aria-label="Вперёд"
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  );
}

function Advantages() {
  const items = [
    {
      icon: <CheckCircleOutlined style={{ fontSize: 32, color: '#2ec6c6' }} />,
      title: 'Индивидуальный подход',
      desc: 'Рекомендации под ваши цели и состояние.',
    },
    {
      icon: <ExperimentOutlined style={{ fontSize: 32, color: '#2ec6c6' }} />,
      title: 'Научная база',
      desc: 'Используем современные исследования и стандарты.',
    },
    {
      icon: <TeamOutlined style={{ fontSize: 32, color: '#2ec6c6' }} />,
      title: 'Экспертная поддержка',
      desc: 'Консультации специалистов по вопросам здоровья.',
    },
  ];
  return (
    <div style={{ margin: '48px 0' }}>
      <Title level={2}>Преимущества NutriScan</Title>
      <Row gutter={24} justify="center">
        {items.map((item, idx) => (
          <Col xs={24} sm={12} md={8} key={idx} style={{ marginBottom: 16 }}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                minHeight: 160,
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(44,183,183,0.08)',
              }}
            >
              <div style={{ marginBottom: 12 }}>{item.icon}</div>
              <Paragraph strong style={{ fontSize: 16 }}>
                {item.title}
              </Paragraph>
              <Paragraph type="secondary" style={{ fontSize: 14 }}>
                {item.desc}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

function QualityControl() {
  return (
    <div style={{ margin: '48px 0' }}>
      <Title level={2}>Контроль качества</Title>
      <Row gutter={24} justify="center">
        <Col xs={24} md={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              minHeight: 120,
              boxShadow: '0 2px 8px rgba(44,183,183,0.08)',
            }}
          >
            <Paragraph strong>Сертифицированные продукты</Paragraph>
            <Paragraph type="secondary">
              Все БАДы проходят строгий контроль качества и соответствуют стандартам GMP/ISO.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              minHeight: 120,
              boxShadow: '0 2px 8px rgba(44,183,183,0.08)',
            }}
          >
            <Paragraph strong>Проверенные поставщики</Paragraph>
            <Paragraph type="secondary">
              Сотрудничаем только с надежными производителями и лабораториями.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

function ContactForm() {
  const [form] = Form.useForm();
  const onFinish = () => {
    message.success('Ваш вопрос отправлен!');
    form.resetFields();
  };
  return (
    <div
      style={{
        margin: '48px 0',
        borderRadius: 24,
        padding: '40px 0',
        background: 'linear-gradient(120deg, #e0f7fa 0%, #f6fffe 100%)',
        boxShadow: '0 8px 32px rgba(44,183,183,0.10)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Title level={2} style={{ color: '#2ec6c6', marginBottom: 8 }}>
        Остались вопросы?
      </Title>
      <Paragraph style={{ color: '#4b6b6b', marginBottom: 32 }}>
        Заполните форму, и мы свяжемся с вами!
      </Paragraph>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{
          maxWidth: 420,
          width: '100%',
          background: '#fff',
          borderRadius: 16,
          padding: 32,
          boxShadow: '0 2px 12px rgba(44,183,183,0.08)',
        }}
      >
        <Form.Item
          name="name"
          label={<span style={{ fontWeight: 500 }}>Имя</span>}
          rules={[{ required: true, message: 'Введите имя' }]}
        >
          <Input
            size="large"
            placeholder="Ваше имя"
            prefix={<TeamOutlined style={{ color: '#2ec6c6' }} />}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label={<span style={{ fontWeight: 500 }}>Email</span>}
          rules={[{ required: true, type: 'email', message: 'Введите корректный email' }]}
        >
          <Input
            size="large"
            placeholder="Ваш email"
            prefix={<MailOutlined style={{ color: '#2ec6c6' }} />}
          />
        </Form.Item>
        <Form.Item
          name="question"
          label={<span style={{ fontWeight: 500 }}>Вопрос</span>}
          rules={[{ required: true, message: 'Введите ваш вопрос' }]}
        >
          <Input.TextArea
            rows={4}
            size="large"
            placeholder="Ваш вопрос..."
            style={{ resize: 'none' }}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={<MailOutlined />}
            style={{
              background: 'linear-gradient(90deg, #2ec6c6 0%, #4be1ec 100%)',
              border: 'none',
              borderRadius: 24,
              padding: '0 32px',
              fontWeight: 600,
              transition: 'box-shadow 0.2s',
              boxShadow: '0 2px 8px rgba(44,183,183,0.10)',
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.boxShadow = '0 4px 16px rgba(44,183,183,0.18)')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.boxShadow = '0 2px 8px rgba(44,183,183,0.10)')
            }
          >
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

function FooterSection() {
  return (
    <footer
      style={{
        background: '#11989e',
        color: '#fff',
        padding: '48px 0 32px 0',
        marginTop: 64,
        fontSize: 16,
        fontFamily: 'inherit',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 48,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        {/* Логотип и инфо */}
        <div style={{ minWidth: 220, flex: 2 }}>
          <div style={{ fontWeight: 800, fontSize: 40, marginBottom: 16, fontFamily: 'inherit' }}>
            NutriScan
          </div>
          <div style={{ fontSize: 15, marginBottom: 16, color: '#e0f7fa' }}>
            ООО "Нутрискан", ©2025
            <br />
            105203, город Москва, Первомайская ул, д. 116а, помещ. 1/1
            <br />
            9:00 - 19:00, Пн – Пт e-mail: info@NutriScan.ru
          </div>
          <div style={{ fontSize: 13, color: '#e0f7fa', marginTop: 16, lineHeight: 1.5 }}>
            Все рекомендации не носят предписательного характера. Пожалуйста, ознакомьтесь
            <br />с Пользовательским соглашением перед покупкой услуг ООО "Нутрискан"
          </div>
        </div>
        {/* Nutriscan */}
        <div style={{ minWidth: 140, flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 16 }}>Nutriscan</div>
          <div style={{ color: '#e0f7fa', marginBottom: 8, cursor: 'pointer' }}>Исследования</div>
          <div style={{ color: '#e0f7fa', marginBottom: 8, cursor: 'pointer' }}>Отзывы</div>
          <div style={{ color: '#e0f7fa', marginBottom: 8, cursor: 'pointer' }}>Эксперты</div>
        </div>
        {/* Условия */}
        <div style={{ minWidth: 180, flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 16 }}>Условия</div>
          <div style={{ color: '#e0f7fa', marginBottom: 8, cursor: 'pointer' }}>
            Пользовательское соглашение
          </div>
          <div style={{ color: '#e0f7fa', marginBottom: 8, cursor: 'pointer' }}>
            Политика конфиденциальности
          </div>
          <div style={{ color: '#e0f7fa', marginBottom: 8, cursor: 'pointer' }}>
            Условия доставки
          </div>
          <div style={{ color: '#e0f7fa', marginBottom: 8, cursor: 'pointer' }}>Методы оплаты</div>
        </div>
        {/* Контакты */}
        <div style={{ minWidth: 180, flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 16 }}>Контакты</div>
          <div style={{ color: '#e0f7fa', marginBottom: 16 }}>info@NutriScan.ru</div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#2ec6c6',
                background: '#fff',
                borderRadius: 8,
                padding: 6,
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: 28,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M23.5 5.25L4.66667 12.25C3.5 12.6667 3.5 13.4167 4.5 13.75L9.08333 15.25L20.25 8.75C20.8333 8.41667 21.3333 8.58333 20.8333 9L11.0833 17.5H11.0833L11.0833 17.5L10.75 21.25C11.25 21.25 11.5 21.0417 11.75 20.8333L14.0833 18.6667L18.5833 22.0833C19.4167 22.5833 20 22.3333 20.25 21.25L23.25 6.41667C23.5 5.5 22.9167 5.25 23.5 5.25Z"
                  fill="#2ec6c6"
                />
              </svg>
            </a>
            <a
              href="https://vk.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#2ec6c6',
                background: '#fff',
                borderRadius: 8,
                padding: 6,
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: 28,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M14 2C7.37258 2 2 7.37258 2 14C2 20.6274 7.37258 26 14 26C20.6274 26 26 20.6274 26 14C26 7.37258 20.6274 2 14 2ZM19.6667 18.3333H18.5C18.1667 18.3333 17.9167 18.1667 17.75 17.9167C17.5 17.5833 17.25 17.25 17 16.9167C16.8333 16.75 16.6667 16.75 16.5 16.9167C16.3333 17.0833 16.1667 17.25 16 17.4167C15.8333 17.5833 15.6667 17.75 15.5 17.75C15.3333 17.75 15.1667 17.5833 15 17.4167C14.8333 17.25 14.6667 17.0833 14.5 16.9167C14.3333 16.75 14.1667 16.75 14 16.9167C13.75 17.25 13.5 17.5833 13.25 17.9167C13.0833 18.1667 12.8333 18.3333 12.5 18.3333H11.3333C10.8333 18.3333 10.6667 18.0833 10.8333 17.6667C11.0833 17.0833 11.5 16.5 12.0833 15.8333C12.5 15.3333 12.5 15.0833 12.0833 14.6667C11.5 14.0833 11.0833 13.5 10.8333 12.9167C10.6667 12.5 10.8333 12.25 11.3333 12.25H12.5C12.8333 12.25 13.0833 12.4167 13.25 12.6667C13.5 13 13.75 13.3333 14 13.6667C14.25 13.3333 14.5 13 14.75 12.6667C14.9167 12.4167 15.1667 12.25 15.5 12.25H16.6667C17.1667 12.25 17.3333 12.5 17.1667 12.9167C16.9167 13.5 16.5 14.0833 15.9167 14.6667C15.5 15.0833 15.5 15.3333 15.9167 15.8333C16.5 16.5 16.9167 17.0833 17.1667 17.6667C17.3333 18.0833 17.1667 18.3333 16.6667 18.3333H19.6667Z"
                  fill="#2ec6c6"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <Content>
      <HeroSection />
      <HowItWorks />
      <ScienceSliderSection />
      <TeamSection />
      <Advantages />
      <div style={{ maxWidth: 800, margin: '48px auto' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
          Пройдите опрос
        </Title>
        <SurveyProvider>
          <SurveyForm />
        </SurveyProvider>
      </div>
      <QualityControl />
      <ContactForm />
      <FooterSection />
    </Content>
  );
}
