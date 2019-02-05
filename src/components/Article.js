import React, { Component, Fragment } from "react";
import { Segment, Header } from "semantic-ui-react";
import ArticleContent from "./ArticleContent";

class Article extends Component {
  renderArticleContents = () => {
    if (Object.keys(this.props.currentArticle).length > 0) {
      return this.props.currentArticle.body.map((content, i) => (
        <ArticleContent content={content} key={i} />
      ));
    }
  };

  render() {
    return (
      <Fragment>
        <Segment vertical>
          <Header as="h2">{this.props.currentArticle.title}</Header>
        </Segment>
        {this.renderArticleContents()}
      </Fragment>
    );
  }
}

export default Article;
