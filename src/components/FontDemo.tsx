'use client';

import React from 'react';
import { Card, Typography, Space, Divider } from 'antd';
import { getFontStyle } from '@/lib/fontUtils';

const { Title, Paragraph, Text } = Typography;

export const FontDemo: React.FC = () => {
  return (
    <Card title="Демонстрация шрифта Lato" style={{ margin: '20px 0' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        
        {/* Font Weights */}
        <div>
          <Title level={4}>Варианты начертания:</Title>
          <Space direction="vertical" size="small">
            <Text style={{ ...getFontStyle('thin'), fontSize: '18px' }}>
              Thin (100) - Тонкое начертание
            </Text>
            <Text style={{ ...getFontStyle('light'), fontSize: '18px' }}>
              Light (300) - Светлое начертание
            </Text>
            <Text style={{ ...getFontStyle('regular'), fontSize: '18px' }}>
              Regular (400) - Обычное начертание
            </Text>
            <Text style={{ ...getFontStyle('bold'), fontSize: '18px' }}>
              Bold (700) - Жирное начертание
            </Text>
            <Text style={{ ...getFontStyle('black'), fontSize: '18px' }}>
              Black (900) - Очень жирное начертание
            </Text>
          </Space>
        </div>

        <Divider />

        {/* Italic Styles */}
        <div>
          <Title level={4}>Курсивные варианты:</Title>
          <Space direction="vertical" size="small">
            <Text style={{ ...getFontStyle('regular', 'italic'), fontSize: '18px' }}>
              Regular Italic - Обычный курсив
            </Text>
            <Text style={{ ...getFontStyle('bold', 'italic'), fontSize: '18px' }}>
              Bold Italic - Жирный курсив
            </Text>
          </Space>
        </div>

        <Divider />

        {/* Font Sizes */}
        <div>
          <Title level={4}>Размеры шрифта:</Title>
          <Space direction="vertical" size="small">
            <Text style={{ ...getFontStyle('regular'), fontSize: '12px' }}>
              Маленький текст (12px)
            </Text>
            <Text style={{ ...getFontStyle('regular'), fontSize: '14px' }}>
              Обычный текст (14px)
            </Text>
            <Text style={{ ...getFontStyle('regular'), fontSize: '16px' }}>
              Средний текст (16px)
            </Text>
            <Text style={{ ...getFontStyle('regular'), fontSize: '18px' }}>
              Большой текст (18px)
            </Text>
            <Text style={{ ...getFontStyle('regular'), fontSize: '24px' }}>
              Заголовок (24px)
            </Text>
          </Space>
        </div>

        <Divider />

        {/* Sample Content */}
        <div>
          <Title level={4}>Пример контента:</Title>
          <Paragraph style={{ ...getFontStyle('regular'), fontSize: '16px', lineHeight: '1.6' }}>
            NutriScan - это инновационное приложение для персонализированного подбора биологически активных добавок. 
            Наша платформа использует передовые алгоритмы машинного обучения для анализа ваших индивидуальных потребностей, 
            образа жизни и целей здоровья.
          </Paragraph>
          <Paragraph style={{ ...getFontStyle('light'), fontSize: '14px', lineHeight: '1.5' }}>
            Получите персональные рекомендации по БАДам, основанные на научных исследованиях и адаптированные 
            под ваши уникальные потребности. Наша команда экспертов-нутрициологов постоянно обновляет базу данных, 
            чтобы обеспечить вас самыми актуальными и эффективными рекомендациями.
          </Paragraph>
        </div>

      </Space>
    </Card>
  );
};

