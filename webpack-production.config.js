/* -g でインストールされた webpack だとエラーになる
   -D でローカルインストールしておく
 */
const webpack = require('webpack');

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },

  // いろいろ選択肢があるが違いがわからない
  devtool: "source-map",

  // webpack がモジュールを探しに行く対象
  // これがないと、例えば import { Hello } from ～ で見つからないエラーになる
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // 正規表現 tsx? で ts または tsx にマッチ
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
    ]
  },

  plugins: [
    // Node.js の環境変数を production に置き換える。
    // これに応じて他のツールやスクリプトやライブラリも production 版の動作になるのが Node.js の慣例らしい
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}