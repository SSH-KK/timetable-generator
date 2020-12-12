/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const getScopedName = require("./utils/getScopedName.js");

const isDev = process.env.NODE_ENV === "development";

const plugins = [
  new webpack.ProgressPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, "public", "index.html"),
  }),
]

if (!isDev)
{
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  )
}

module.exports = {
  entry: "./src/index.tsx",
  target: "web",
  devtool: isDev ? "inline-source-map" : undefined,
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        include: path.resolve(__dirname, "src"),
      },
      {
        test:/\.js$/,
        include: /src/,
        use:{
          loader:"babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: isDev
                ? { localIdentName: "[path]_[name]_[local]" }
                : {
                    getLocalIdent: (context, localIdentName, localName) =>
                      getScopedName(context, localIdentName, localName),
                  },
            },
          },
        ],
        include: path.resolve(__dirname, "./src/styles"),
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
        exclude: /node_modules/,
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 3000,
  },
  plugins,
  stats: {
    reasons: true,
  },
};
