/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f7fa',
          200: '#b3e5fc',
          300: '#81d4fa',
          400: '#4daacb',
          500: '#4daacb',
          600: '#3d8ba3',
          700: '#2e6b7a',
          800: '#1f4a52',
          900: '#0f2329',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4dcb99',
          500: '#4dcb99',
          600: '#3da37a',
          700: '#2e7a5c',
          800: '#1f523d',
          900: '#0f291f',
        },
        warning: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#cc4daa',
          500: '#cc4daa',
          600: '#a33e88',
          700: '#7a2e66',
          800: '#521f44',
          900: '#290f22',
        },
        danger: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}