import { CSSProperties } from 'react';

export const fontWeights = {
  thin: 100,
  light: 300,
  regular: 400,
  bold: 700,
  black: 900,
} as const;

export const fontStyles = {
  normal: 'normal',
  italic: 'italic',
} as const;

export type FontWeight = keyof typeof fontWeights;
export type FontStyle = keyof typeof fontStyles;

export const getFontStyle = (
  weight: FontWeight = 'regular',
  style: FontStyle = 'normal'
): CSSProperties => ({
  fontFamily: 'var(--font-lato)',
  fontWeight: fontWeights[weight],
  fontStyle: fontStyles[style],
});

export const fontClasses = {
  thin: 'font-thin',
  light: 'font-light',
  regular: 'font-regular',
  bold: 'font-bold',
  black: 'font-black',
  italic: 'font-italic',
} as const;

