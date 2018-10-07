const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    app: ["./js/app.js", "./scss/style.scss"]
  },
  output: {
    filename: "./js/bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "../"
  },
  devServer: {
    port: 8080,
    contentBase: "./",
    publicPath: "/dist/",
    compress: true,
    inline: true,
    stats: "errors-only"
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: { sourceMap: true }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                plugins: [
                  autoprefixer({
                    browsers: ["ie >= 8", "last 4 version"]
                  })
                ]
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                includePaths: ['./node_modules']
              }
            }
          ],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        loaders: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          },
          "img-loader"
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(svg)$/,
        loader: "svg-url-loader"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("./css/style.css"),
    new CleanWebpackPlugin(["dist"]),
    new CopyWebpackPlugin([{ from: "./img", to: "img" }], {
      ignore: [{ glob: "svg/*" }]
    })
  ]
};
