const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  entry: {
    index: './src/index.js',
    contact: './src/subpages/contact/contact.js',
    products: './src/subpages/products/products.js',
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../', 'build'),
    filename: 'js/[name]-[contenthash:5].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[contenthash:5].[ext]',
              outputPath: 'images',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                quality: 70,
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: '2.0.0',
              },
            ],
          ],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
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
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:5].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/images',
          to: 'images',
        },
      ],
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '50-75',
      },
    }),
  ],
};
