import React from 'react';
import Image from 'next/image';
import { url } from 'inspector';
import { getFontStyle } from '@/lib/fontUtils';

export const TitleHero = () => {
  return (
    <div
      style={{
        background:
          'linear-gradient(179.05deg, rgba(255, 255, 255, 0.5) -0.26%, rgba(187, 252, 255, 0.5) 62.5%, rgba(212, 218, 255, 0.5) 78.41%, rgba(219, 224, 255, 0.425) 86.76%, rgba(255, 255, 255, 0.5) 92.03%)',
        minHeight: 1233,
      }}
    >
      <div
        style={{
          ...getFontStyle('black'),
          background:
            'linear-gradient(179.95deg, rgba(90, 211, 202, 0.6) 0.04%, rgba(86, 193, 186, 0.6) 50.75%, rgba(204, 255, 252, 0.6) 178.61%)',
          borderRadius: '0 200px 0 200px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: 700,
          maxWidth: 1334,
          margin: '0 auto',
          paddingLeft: 106,
        }}
      >
        {/* Левый блок */}
        <div>
          <div style={{ marginBottom: 18 }}>
            <span
              style={{
                fontSize: 56,
                color: '#15456E',
                lineHeight: 1.18,
                display: 'block',
              }}
            >
              <span style={{ fontWeight: 'bolder' }}>Персональный</span>
              <br />
              подбор витаминов
              <br />
              <span style={{ fontSize: 56 }}>NutriScan™</span>
            </span>
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#3A6B8E',
              marginBottom: 22,
              maxWidth: 420,
            }}
          >
            <span style={{ fontWeight: 500 }}>
              специально для вас на основе <br />
              <span
                style={{
                  color: '#002E55',
                  backgroundColor: '#FFF',
                  padding: '1px 0px',
                  fontWeight: 'bolder',
                }}
              >
                индивидуального смарт-анализа
              </span>
            </span>
            <br />
            параметров вашего организма и образа жизни
          </div>
          {/* Карточка AI NutriScan */}
          <div
            style={{
              display: 'grid',
              alignItems: 'center',
              borderRadius: 14,
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.06) 100%)',
              padding: '18px 22px',
              marginBottom: 24,
              maxWidth: 370,
              gap: 18,
            }}
          >
            <div style={{ gridColumn: '1 / 2' }}>
              <div>
                <Image
                  src="/assets/icons/ai_circle.svg"
                  alt="AI NutriScan"
                  width={54}
                  height={54}
                />
              </div>
              <div style={{ fontWeight: 600, color: '#15456E', fontSize: 16, marginBottom: 2 }}>
                Умная система <span style={{ color: '#16B6BE' }}>AI NutriScan</span>
              </div>
            </div>
            <div>
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

        <div
          className="image-wrapper"
          style={{
            position: 'relative',
            display: 'block',
          }}
        >
          <div
            style={{
              bottom: 0,
              position: 'absolute',
              width: 529,
              height: 621,
              backgroundColor: '#53B5AE',
              borderRadius: '400px 400px 0 0',
            }}
            className="image-wrapper-inner"
          ></div>
          <div
            style={{
              position: 'absolute',
              width: 486,
              borderRadius: '300px 300px 0 0',
              height: 585,
              background: "url('/assets/images/w1.jpg') no-repeat center center",
              bottom: 0,
              left: 118,
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 290,
              height: 306,
              border: '8px solid #FFF',
              borderRadius: '50% 50% 0 0',
              borderBottom: 'none',
              bottom: 0,
              left: 54,
            }}
            className="image-wrapper-inner"
          />
        </div>
      </div>
    </div>
  );
};
