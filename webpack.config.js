const path = require("path");

module.exports = {
  mode: 'production',
  entry: path.join(__dirname,'/src/App.js'),
  output: {
    path: path.join(__dirname,'/public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      'Components': path.resolve(__dirname, 'src/components')
    }
  }
};
