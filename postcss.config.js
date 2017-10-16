module.exports = {
  plugins: {
    'autoprefixer': { browsers:  ['Android >= 4', 'ChromeAndroid >= 46', 'iOS >= 8'] },
    'postcss-px2rem': {
      remUnit: 37.5, baseDpr: 1, remPrecision: 8
    },
  },
};
