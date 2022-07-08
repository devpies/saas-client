import React from "react";
import { Layout } from "../../Layout";

class NoMatch extends React.Component {
  render() {
    return (
      <Layout>
        <header>
          <h1>Page Not Found</h1>
        </header>
      </Layout>
    );
  }
}

export { NoMatch };
