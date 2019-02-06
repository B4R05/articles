import React, { Component, Fragment } from "react";
import { Segment, Header } from "semantic-ui-react";
import ArticleContent from "./ArticleContent";

const Article = ({ currentArticle }) => {
  const renderArticleContents = () => {
    if (Object.keys(currentArticle).length) {
      return currentArticle.body.map((content, i) => (
        <ArticleContent content={content} key={i} />
      ));
    }
  };

  return (
    <article>
      <Segment vertical>
        <Header as="h2">{currentArticle.title}</Header>
      </Segment>
      {renderArticleContents()}
    </article>
  );
};

export default Article;
