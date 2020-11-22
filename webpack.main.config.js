'use strict';
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'ts-out/main')
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader'
    }]
  },
  resolve: {
    // specify certain file extensions to get automatically appended to imports
    // ie we can write `import 'index'` instead of `import 'index.ts'`
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js']
  },
  // tell webpack that we're building for electron
  target: 'electron-main',
  node: {
    // tell webpack that we actually want a working __dirname value
    // (ref: https://webpack.js.org/configuration/node/#node-__dirname)
    __dirname: false
  }
};
