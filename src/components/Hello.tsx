import * as React from "react";
import ErrorBoundary from "./ErrorBoundary";
import Nested from "./Nested";
import ErrorComponent from "./ErrorComponent";

export interface HelloProps {
  compiler: string;
  framework: string;
}

const Hello = (props: HelloProps) => {
  return <div>
    {/*<ErrorBoundary>*/}
      <h1>ErrorBoundary</h1>
      <Nested>
        <h1>Nested レベル１</h1>
        <ErrorBoundary>
        <Nested>
          <h1>Nested レベル２</h1>
          {/*<ErrorBoundary>*/}
          <Nested>
            <h1>Nested レベル３</h1>
            {/*<ErrorBoundary>*/}
              <Nested>
                <h1>Nested レベル４</h1>
                <ErrorComponent/>
              </Nested>
            {/*</ErrorBoundary>*/}
          </Nested>
          {/*</ErrorBoundary>*/}
        </Nested>
        </ErrorBoundary>
      </Nested>
    {/*</ErrorBoundary>*/}
  </div>;
};

export default Hello;
