module.exports = (api) => {
  api.cache.never();
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            Components: './src/components',
            Constants: './src/constants',
            Navigators: './src/navigators',
            Features: 'src/features',
            Services: './src/services',
            Models: './src/models',
            Hooks: './src/hooks',
            I18n: './src/i18n',
            Utils: './src/utils',
            Styles: './src/styles'
          },
        },
      ],
    ],
  };
};