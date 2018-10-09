const path = require("path");
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
    publicPath: "dist/"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'style.css',
            },
          },
          {loader: 'extract-loader'},
          {loader: 'css-loader'},
          {loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          {
            test: /\.html$/,
            use: ['html-loader']
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules'],
            },
          }
        ]
      }
    ]
  }
};
