const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
    publicPath: "dist/"
  },
  devServer: {
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: "css-loader" },
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [autoprefixer()]
              }
            },
            {
              loader: "sass-loader",
              options: {
                includePaths: ["./node_modules"]
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [new ExtractTextPlugin("style.css"), require("autoprefixer")],
  devtool: "source-map"
};
