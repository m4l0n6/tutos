/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        '0.75': '0.1875rem',  // 3px
        '1.25': '0.3125rem',  // 5px
        '1.5': '0.375rem',    // 6px
        '2.25': '0.5625rem',  // 9px
        '2.5': '0.625rem',    // 10px
        '3.5': '0.875rem',    // 14px
        '7.5': '1.875rem',    // 30px
        '8.5': '2.125rem',    // 34px
      },
    },
  },
  plugins: [],
}

export default config
