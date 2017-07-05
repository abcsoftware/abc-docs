const Path = require("path");
const hook = require("css-modules-require-hook");
const HtmlWebpackPlugin = require("html-webpack-plugin");

hook({
  generateScopedName: "[name]__[local]___[hash:base64:5]"
});

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  filename: "index.html",
  inject: "body",
  template: "./src/index.html"
});

module.exports = {
  devtool: "eval",
  entry: "./src/index.js",
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: "babel-loader",
        test: /\.(js|jsx)$/
      },
      {
        exclude: [ /node_modules/, /\.raw\.css$/ ],
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader?modules"
        ]
      },
      {
        exclude: /node_modules/,
        include: /\.raw\.css$/,
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        exclude: /node_modules/,
        loader: "file-loader",
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: Path.resolve("build")
  },
  plugins: [
    HtmlWebpackPluginConfig
  ]
};
