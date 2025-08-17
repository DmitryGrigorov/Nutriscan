# Шрифт Lato в проекте NutriScan

## Установка

Шрифт Lato установлен в папке `src/assets/fonts/Lato/` и настроен для использования во всем проекте.

## Конфигурация

### Файлы конфигурации:

- `src/lib/fonts.ts` - основная конфигурация шрифта
- `src/lib/fontUtils.ts` - утилиты для работы с шрифтом
- `src/app/globals.css` - глобальные стили и CSS классы

### Доступные варианты начертания:

| Вес | Название | CSS класс       | Использование          |
| --- | -------- | --------------- | ---------------------- |
| 100 | Thin     | `.font-thin`    | Тонкие заголовки       |
| 300 | Light    | `.font-light`   | Подзаголовки, описания |
| 400 | Regular  | `.font-regular` | Основной текст         |
| 700 | Bold     | `.font-bold`    | Важные заголовки       |
| 900 | Black    | `.font-black`   | Главные заголовки      |

### Курсивные варианты:

- Regular Italic (400)
- Bold Italic (700)
- Light Italic (300)
- Thin Italic (100)
- Black Italic (900)

## Использование

### 1. В React компонентах с утилитами:

```tsx
import { getFontStyle } from '@/lib/fontUtils';

// Обычный текст
<div style={getFontStyle('regular')}>Обычный текст</div>

// Жирный заголовок
<h1 style={getFontStyle('bold')}>Заголовок</h1>

// Курсивный текст
<p style={getFontStyle('regular', 'italic')}>Курсивный текст</p>
```

### 2. С CSS классами:

```tsx
// В JSX
<h1 className="font-bold text-2xl">Заголовок</h1>
<p className="font-light text-base">Описание</p>
<span className="font-italic">Курсив</span>
```

### 3. В Ant Design компонентах:

```tsx
import { Typography } from 'antd';
import { getFontStyle } from '@/lib/fontUtils';

const { Title, Paragraph } = Typography;

<Title
  level={2}
  style={getFontStyle('bold')}
>
  Заголовок
</Title>

<Paragraph style={getFontStyle('regular')}>
  Обычный текст
</Paragraph>
```

### 4. В styled-components (если используется):

```tsx
import styled from 'styled-components';

const StyledTitle = styled.h1`
  font-family: var(--font-lato);
  font-weight: 700;
  font-size: 2rem;
`;

const StyledText = styled.p`
  font-family: var(--font-lato);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.6;
`;
```

## CSS переменные

Доступные CSS переменные:

- `--font-lato` - основная переменная шрифта
- `--font-family` - полный стек шрифтов с fallback

## Размеры текста

Доступные CSS классы для размеров:

- `.text-xs` - 0.75rem (12px)
- `.text-sm` - 0.875rem (14px)
- `.text-base` - 1rem (16px)
- `.text-lg` - 1.125rem (18px)
- `.text-xl` - 1.25rem (20px)
- `.text-2xl` - 1.5rem (24px)
- `.text-3xl` - 1.875rem (30px)
- `.text-4xl` - 2.25rem (36px)

## Рекомендации по использованию

### Заголовки:

- H1: `font-black` + `text-4xl`
- H2: `font-bold` + `text-3xl`
- H3: `font-bold` + `text-2xl`
- H4: `font-bold` + `text-xl`

### Основной текст:

- Параграфы: `font-regular` + `text-base`
- Описания: `font-light` + `text-sm`
- Мелкий текст: `font-regular` + `text-xs`

### Специальные случаи:

- Цитаты: `font-italic` + `text-base`
- Важные элементы: `font-bold` + `text-base`
- Подписи: `font-light` + `text-sm`

## Демонстрация

Для просмотра всех вариантов шрифта используйте компонент `FontDemo`:

```tsx
import { FontDemo } from '@/components/FontDemo';

// В вашем компоненте
<FontDemo />;
```
