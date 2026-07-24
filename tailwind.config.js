/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0a1628',
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
          DEFAULT: '#111827',
          2: '#1f2937',
          3: '#374151',
        },
        muted: {
          DEFAULT: '#9ca3af',
          2: '#6b7280',
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
        card: '0 1px 2px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}
