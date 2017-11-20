import * as React from 'react';

interface IProps {
}

export class Nested extends React.Component<IProps, null> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return this.props.children;
  }
}

export default Nested;
