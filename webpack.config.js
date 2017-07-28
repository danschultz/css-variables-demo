const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const postcssVariables = require('postcss-css-variables')
const postcssImport = require('postcss-import')
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: ['./src/index.js', './src/styles.css'],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: () => ([
                  postcssImport,
                  postcssVariables,
                  autoprefixer,
                ])
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
  ]
};
