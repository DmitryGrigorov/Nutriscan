import React from 'react';

export const FontTest = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'var(--font-lato), sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Тест шрифта Lato - Bold</h1>
      <p style={{ fontSize: '16px', fontWeight: 'normal' }}>Обычный текст шрифтом Lato - Regular</p>
      <p style={{ fontSize: '14px', fontWeight: '300' }}>Легкий текст шрифтом Lato - Light</p>
      <p style={{ fontSize: '18px', fontWeight: '900' }}>Жирный текст шрифтом Lato - Black</p>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <strong>Отладочная информация:</strong>
        <br />
        CSS переменная: var(--font-lato)
        <br />
        Примененный шрифт: {getComputedStyle(document.body).fontFamily}
      </div>
    </div>
  );
};
