const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    contact: './src/subpages/contact/contact.js',
    products: './src/subpages/products/products.js',
  },
  mode: 'development',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
  },
  devServer: {
    open: true,
    contentBase: path.resolve(__dirname, '../', 'src'),
    port: 3002,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|png|svg|gif|jpeg)$/,
        use: 'file-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['index'],
      title: 'Webpack-subpages',
      template: './src/index.html',
      filename: 'index.html',
      favicon: './src/images/favicon.ico',
    }),
    new HtmlWebpackPlugin({
      chunks: ['contact'],
      title: 'Webpack-subpages/contact',
      template: './src/subpages/contact/contact.html',
      filename: 'contact.html',
      favicon: './src/images/favicon.ico',
    }),
    new HtmlWebpackPlugin({
      chunks: ['products'],
      title: 'Webpack-subpages/products',
      template: './src/subpages/products/products.html',
      filename: 'products.html',
      favicon: './src/images/favicon.ico',
    }),
  ],
};
