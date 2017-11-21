import * as React from 'react';
import {ApplicationError} from '../erros';

// import {ApplicationError, WebApiError} from "../erros";

interface IProps {
}

export class ErrorComponent extends React.Component<IProps, null> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    if (Math.random() < 0.5) {
      // throw new Error("ネイティブエラー");
      throw new ApplicationError("アプリケーションエラー");
      // throw new WebApiError("通信に失敗しました");
    }
    return <h2>例外は発生しませんでした</h2>;
  }
}

export default ErrorComponent;
