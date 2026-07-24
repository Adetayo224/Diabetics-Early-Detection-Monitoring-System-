/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#ffffff',
        blue: {
          DEFAULT: '#1565C0',
          500: '#1a56db',
          600: '#2563eb',
        },
        red: {
          DEFAULT: '#E63946',
          600: '#c1121f',
        },
        surface: {
          DEFAULT: '#ffffff',
          2: '#f1f5f9',
          3: '#e2e8f0',
        },
        muted: {
          DEFAULT: '#475569',
          2: '#64748b',
        },
        accent: {
          green: '#10b981',
          amber: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,23,42,0.06)',
      },
    },
  },
  plugins: [],
}
