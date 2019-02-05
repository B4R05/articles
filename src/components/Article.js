import React, { Component, Fragment } from "react";
import { Segment, Header } from "semantic-ui-react";

class Article extends Component {
  render() {
    return (
      <Fragment>
        <Segment vertical>
          <Header as="h2">{this.props.currentArticle.title}</Header>
        </Segment>
      </Fragment>
    );
  }
}

export default Article;
