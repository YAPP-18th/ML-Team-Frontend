module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      gray: {
        1: '#FFFFFF',
        2: '#FAFAFA',
        3: '#F5F5F5',
        4: '#F0F0F0',
        5: '#D9D9D9',
        6: '#BFBFBF',
        7: '#8C8C8C',
        8: '#595959',
        9: '#434343',
        10: '#262626',
        11: '#1F1F1F',
        12: '#141414',
        13: '#000000',
        default: '#1F1F1F',
      },
      primary: {
        2: '#E9E9FF',
        3: '#D2D2FF',
        4: '#C5C4FF',
        5: '#BCBAFF',
        6: '#A7A5FF',
        7: '#9290FB',
        8: '#8280F5',
        9: '#5C5ADD',
        10: '#4745CB',
        11: '#3C39C0',
        default: '#4745CB',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
