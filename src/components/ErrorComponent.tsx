import * as React from 'react';

interface IProps {
}

export class ErrorComponent extends React.Component<IProps, null> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    if (Math.random() < 0.5) {
      throw new Error("render で例外");
    }
    return <h2>例外は発生しませんでした</h2>;
  }
}

export default ErrorComponent;
