const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

const devConfig = require('./webpack-config/dev');
const { modernConfig, legacyConfig } = require('./webpack-config/prod');

const commonConfig = {
  output: {
    path: path.resolve(__dirname, '../back', './src/main/webapp'),
    filename: 'js/[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: 'pictures/[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      $utils: path.resolve(__dirname, 'src/utils'),
      $ui: path.resolve(__dirname, 'src/ui'),
      $api: path.resolve(__dirname, 'src/api'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:8].css',
    }),
  ],
};

const clean = {
  plugins: [new CleanWebpackPlugin()],
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    return merge([commonConfig, devConfig]);
  }

  if (argv.mode === 'production') {
    return [
      merge([commonConfig, modernConfig]),
      merge([commonConfig, legacyConfig]),
    ];
  }

  return commonConfig;
};
