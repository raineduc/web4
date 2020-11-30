const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    modern: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { 
          presets: [
            [
              "@babel/env",
              {
                modules: false,
                useBuiltIns: 'usage',
                targets: {
                  browsers: ['last 2 versions']
                }
              }
            ],
            "@babel/preset-react"
          ],
          plugins: ["react-hot-loader/babel"]  
        },
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist/"),
    port: 3000,
    publicPath: "http://localhost:3000/",
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
}