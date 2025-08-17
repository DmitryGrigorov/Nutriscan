import React from 'react';
import Image from 'next/image';
import { url } from 'inspector';

export const TitleHero = () => {
  return (
    <div>
      <div
        style={{
          background: `url('/assets/images/hero_bg.png') no-repeat center center`,
          backgroundSize: 'contain',
          display: 'grid',
          minHeight: 700,
          maxWidth: 1334,
          margin: '0 auto',
        }}
      >
        {/* Левый блок */}
        <div style={{}}>
          <div style={{ marginBottom: 18 }}>
            <span
              style={{
                fontFamily: 'Lato',
                fontSize: 56,
                fontWeight: 900,
                color: '#15456E',
                lineHeight: 1.18,
                display: 'block',
              }}
            >
              Персональный
              <br />
              подбор витаминов
              <br />
              <span style={{ fontWeight: 900, fontSize: 56 }}>NutriScan™</span>
            </span>
          </div>
          <div
            style={{
              fontFamily: 'Lato',
              fontSize: 24,
              color: '#3A6B8E',
              marginBottom: 22,
              maxWidth: 420,
            }}
          >
            <span style={{ fontWeight: 500 }}>
              специально для вас на основе <br />
              <span style={{ color: '#16B6BE' }}>индивидуального смарт-анализа</span>
            </span>
            <br />
            параметров вашего организма и образа жизни
          </div>
          {/* Карточка AI NutriScan */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#fff',
              borderRadius: 14,
              boxShadow: '0 2px 12px #e6f4ff',
              padding: '18px 22px',
              marginBottom: 24,
              maxWidth: 370,
              gap: 18,
            }}
          >
            <div>
              <div>
                <Image
                  src="/assets/icons/ai_circle.svg"
                  alt="AI NutriScan"
                  width={54}
                  height={54}
                  style={{ borderRadius: 8, background: '#f0f9ff' }}
                />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: '#15456E', fontSize: 16, marginBottom: 2 }}>
                Умная система <span style={{ color: '#16B6BE' }}>AI NutriScan</span>
              </div>
              <div style={{ color: '#16B6BE', fontWeight: 700, fontSize: 18, marginBottom: 2 }}>
                100+
                <span style={{ color: '#3A6B8E', fontWeight: 400, fontSize: 14, marginLeft: 6 }}>
                  параметров профилирования
                </span>
              </div>
              <a
                href="/quiz"
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(90deg, #16B6BE 0%, #0ea5e9 100%)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 15,
                  padding: '7px 18px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  marginTop: 4,
                  boxShadow: '0 1px 6px #e6f4ff',
                  border: 'none',
                  transition: 'background 0.2s, box-shadow 0.2s',
                }}
              >
                Получить рекомендации
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
