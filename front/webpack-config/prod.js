const WebpackModernBuildPlugin = require('webpack-modern-build-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const modernConfig = {
  entry: {
    modern: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/env',
                  {
                    modules: false,
                    loose: true,
                    useBuiltIns: 'entry',
                    corejs: {
                      version: 3,
                      proposals: true,
                    },
                    targets: {
                      esmodules: true,
                    },
                    exclude: ['@babel/plugin-transform-async-to-generator', '@babel/plugin-transform-regenerator'],
                  },
                ],
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
    ],
  },
  plugins: [
    new WebpackModernBuildPlugin({
      mode: 'modern',
    }),
    new BundleAnalyzerPlugin(),
  ],
};

const legacyConfig = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/env',
                  {
                    modules: false,
                    useBuiltIns: 'entry',
                    loose: true,
                    corejs: {
                      version: 3,
                      proposals: true,
                    },
                    targets: {
                      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'],
                    },
                  },
                ],
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new WebpackModernBuildPlugin({
      mode: 'legacy',
    }),
    new BundleAnalyzerPlugin({
      analyzerPort: 8889,
    }),
  ],
};

module.exports = { modernConfig, legacyConfig };
