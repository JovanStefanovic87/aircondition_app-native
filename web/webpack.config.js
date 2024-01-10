const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../index.js'), // Adjust the path based on your project structure
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.js', '.js'],
  },
};
