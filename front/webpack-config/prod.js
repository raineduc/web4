const WebpackModernBuildPlugin = require('webpack-modern-build-plugin');

const modernConfig = {
  entry: {
    modern: "./src/index.js",
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
              presets: [
                [
                  "@babel/env",
                  {
                    modules: false,
                    useBuiltIns: "usage",
                    corejs: {
                      version: 3,
                      proposals: true,
                    },
                    targets: {
                      browsers: [
                        "Chrome >= 60",
                        "Safari >= 10.1",
                        "iOS >= 10.3",
                        "Firefox >= 54",
                        "Edge >= 15",
                      ],
                    },
                  },
                ],
                "@babel/preset-react"
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WebpackModernBuildPlugin({
      mode: 'modern',
    }),
  ]
};

const legacyConfig = {
  entry: {
    legacy: "./src/index.js",
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
              presets: [
                [
                  "@babel/env",
                  {
                    modules: false,
                    useBuiltIns: "usage",
                    targets: {
                      browsers: ["> 1%", "last 2 versions", "Firefox ESR"],
                    },
                  },
                ],
                "@babel/preset-react"
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WebpackModernBuildPlugin({
      mode: 'legacy',
    }),
  ]
};

module.exports = { modernConfig, legacyConfig };
