/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false, // 禁用Tailwind的样式重置，避免与Ant Design冲突
  },
  theme: {
    extend: {},
  },
  plugins: [],
};


