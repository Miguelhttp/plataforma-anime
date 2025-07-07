/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Ativa o modo escuro baseado na classe
  content: [],
  theme: {
    extend: {
      keyframes: {
        'gradient-move': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        'gradient-slow': 'gradient-move 8s ease infinite',
      },
      colors: {
        // Cores personalizadas da paleta
        primary: {
          DEFAULT: '#4B0082', // roxo escuro
          light: '#6A0DAD',   // roxo médio
          lighter: '#9B59B6', // roxo claro
        },
        background: {
          DEFAULT: '#000000', // preto puro
          dark: '#1E1E1E',    // cinza escuro
        },
        text: {
          DEFAULT: '#F5F5F5', // off-white
        },
      },
      borderRadius: {
        DEFAULT: '6px',
      },
      transitionProperty: {
        colors: 'background-color, border-color, color, fill, stroke',
      },
    },
    variants: {
      extend: {
        backgroundColor: ['hover', 'focus', 'dark'],
        textColor: ['hover', 'focus', 'dark'],
      },
    },
  },
  plugins: [],
}