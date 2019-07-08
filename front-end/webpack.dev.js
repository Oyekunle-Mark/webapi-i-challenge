const path = require('path');
const merge = require('webpack-merge');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    publicPath: path.resolve(__dirname, '/bundle/'),
    historyApiFallback: {
      index: './public/index.html',
    },
    compress: true,
    open: true,
    hot: true,
    port: 9000,
  },
  plugins: [new HardSourceWebpackPlugin()],
});
