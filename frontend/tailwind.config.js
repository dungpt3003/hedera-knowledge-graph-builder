/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', '*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          200: '#27A85D'
        }
      }
    },
  },
  plugins: [],
  presets: [require('@neo4j-ndl/base').tailwindConfig],
  corePlugins: {
    preflight: false,
  },
  prefix: '',
};
