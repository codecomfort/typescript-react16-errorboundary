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
  } ,

  // 開発時は bundle.js への組み込みを除外して軽くする
  // → これらについては index.html で script タグで読み込む
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
}