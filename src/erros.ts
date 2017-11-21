// 案１ Error を継承せずインターフェイスとして使用
// 参考
// TypeScriptを利用した場合の例外の基本設計
// https://qiita.com/kenju/items/b0554846a44d369cba7b
// 結果
// ・chrome コンソールでのエラー箇所表示：○(ErrorComponent.tsx:17)
// ・スローされた例外にスタックトレースが含まれるか？：×
// ・componentDidCatch の第一引数の error に正しく渡ってくるか？：○
// 所感
// 海外の例を見ても Error を継承してる例が多く、主流ではないみたい。
// また、以下は Angular の例だがフレームワーク側が Error 派生を期待していると動作しないことも。
// 参考
// Angular 4, custom ErrorHandler doesn't recognize custom Error
// https://stackoverflow.com/questions/44108285/angular-4-custom-errorhandler-doesnt-recognize-custom-error
// export class ApplicationError implements Error {
//   public name = "ApplicationError";
//
//   constructor(public message: string) {
//   }
//
//   toString() {
//     return this.name + ': ' + this.message;
//   }
// }

// 案２ 公式の回避策
// 参考
// TypeScript 2.1 Extending built-ins like Error, Array, and Map may no longer work
// https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
// 結果
// ・chrome コンソールでのエラー箇所表示：×(errors.ts:39)
// ・スローされた例外にスタックトレースが含まれるか？：△
// ・componentDidCatch の第一引数の error に正しく渡ってくるか？：×
// 所感
// まず、tsconfig にて target が es5 だと、setPrototypeOf が認識されずコンパイルエラー。(es6 や ess2015 にすれば OK)
// また、コンパイルエラーをなくしたとしても、componentDidCatch の error は空
// export class ApplicationError extends Error {
//
//   constructor(m: string) {
//     super(m);
//
//     // Set the prototype explicitly.
//     Object.setPrototypeOf(this, ApplicationError.prototype);
//   }
// }

// 案３ さらなる改善策
// 参考
// Custom Errors in TypeScript 2.1
// https://www.metachris.com/2017/01/custom-errors-in-typescript-2.1/
// 結果
// ・chrome コンソールでのエラー箇所表示：○(ErrorComponent.tsx:17)
// ・スローされた例外にスタックトレースが含まれるか？：○
// ・componentDidCatch の第一引数の error に正しく渡ってくるか？：△(name が空文字)
// 所感
// 動作的には一番マシ
// ただし、tsconfig にて noImplicitAny": true, だと、new ApplicationError で以下のエラーが出る
// 'new' expression, whose target lacks a construct signature in TypeScript
// import * as util from "util";
//
// export const ApplicationError = function(message: string) {
//   Error.captureStackTrace(this, this.constructor);
//   // this.name = this.constructor.name; // 空になる
//   this.name = "ApplicationError";
//   this.message = message;
// };
// util.inherits(ApplicationError, Error);

// 案４ さらなる改善策
// 参考
// 'new' expression, whose target lacks a construct signature in TypeScript
// https://stackoverflow.com/questions/43623461/new-expression-whose-target-lacks-a-construct-signature-in-typescript
// How to convert new SomeFunction() syntax to TypeScript?
// https://stackoverflow.com/questions/34098999/how-to-convert-new-somefunction-syntax-to-typescript
// 結果
// ・chrome コンソールでのエラー箇所表示：○(ErrorComponent.tsx:17)
// ・スローされた例外にスタックトレースが含まれるか？：○
// ・componentDidCatch の第一引数の error に正しく渡ってくるか？：○
// 所感
// 参考を読みながらいろいろ試してたら以下がよさそう。
// ただし、componentDidCatch の第一引数の error で stack が取れないのは謎。
export class ApplicationError implements Error {
  public name = "ApplicationError";

  constructor(public message: string) {
    Error.captureStackTrace(this, this.constructor);
  }
}
