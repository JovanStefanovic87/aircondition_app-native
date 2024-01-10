/* eslint-disable prettier/prettier */
module.exports = {
    project: {
      ios: {},
      android: {},
    },
    assets: ['./src/assets'],
    dependencies: {
      'react-native-web': {
        platforms: {
          web: {
            npmPackageName: 'react-native-web',
          },
        },
      },
    },
  };
