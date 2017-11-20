import * as React from 'react';
import {ErrorInfo} from "react";

interface IProps {
}
interface IState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // なぜか error は空オブジェクト
    console.log(`error: ${JSON.stringify(error, null, 2)}`);
    // コンポーネントスタックは取れる
    console.log(`info: ${JSON.stringify(info, null, 2)}`);
    this.setState({hasError: true});
  }

  render() {
    if (this.state.hasError) {
      return <h1>本コンポーネント以下のどこかで例外が発生</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
