const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

const devConfig = require('./webpack-config/dev');
const { modernConfig, legacyConfig } = require('./webpack-config/prod');

const commonConfig = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: { 
              presets: ["@babel/env", "@babel/preset-react"],
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  resolve: { 
    extensions: ["*", ".js", ".jsx"],
    alias: {
      '$utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:8].css',
    })
  ]
}

const clean = {
  plugins: [new CleanWebpackPlugin()]
}

module.exports = (env, argv) => {
  let config;
  if (argv.mode === 'development') {
    return merge([commonConfig, devConfig, clean]);
  }
  
  if (argv.mode === 'production') {
    return [
      merge([commonConfig, modernConfig]),
      merge([commonConfig, legacyConfig]),
    ];
  }
}