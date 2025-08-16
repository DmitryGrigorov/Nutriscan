import localFont from 'next/font/local';

export const lato = localFont({
  src: [
    {
      path: '../assets/fonts/Lato/Lato-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Lato/Lato-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../assets/fonts/Lato/Lato-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Lato/Lato-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../assets/fonts/Lato/Lato-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Lato/Lato-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../assets/fonts/Lato/Lato-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Lato/Lato-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../assets/fonts/Lato/Lato-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Lato/Lato-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-lato',
});

