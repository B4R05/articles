import React, { Component, Fragment } from "react";
import { Button, Container, Segment, Message, Icon } from "semantic-ui-react";

import Article from "./Article";
import Rankings from "./Rankings";

import api from "../api/api";
import returnRandomNumberOnce from "../helpers/helpers";

class ArticleContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentArticle: {},
      nextArticle: {},
      readArticles: [],
      showRankings: false,
      error: false
    };

    this.randomNumbers = returnRandomNumberOnce([1, 2, 3, 4, 5]);
  }

  componentDidMount() {
    this.fetchArticle("currentArticle");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
    if (this.state.currentArticle !== prevState.currentArticle) {
      this.fetchArticle("nextArticle");
    }
  }

  fetchArticle = property => {
    let randomNumber = this.randomNumbers.next().value;

    api
      .get(`/${randomNumber}`)
      .then(res => this.handleResponse(property, res.data))
      .catch(err => this.handleError(err));
  };

  handleResponse = (property, value) => {
    this.setState({ [property]: value });
  };

  handleError = err => {
    console.log(err);
    if (!err.response) {
      // network error
      this.setState({ error: true, errorType: "Network" });
    } else {
      // http status code
      this.setState({ error: true, errorType: err.response.status });
    }
  };

  showArticleOrRankingsComponent = () => {
    if (this.state.showRankings) {
      return this.showRankingsComponent();
    }

    if (Object.keys(this.state.currentArticle).length) {
      return this.showArticleComponent();
    }

    return <Segment />;
  };

  showRankingsComponent = () => (
    <Rankings readArticles={this.state.readArticles} />
  );

  showArticleComponent = () => (
    <Fragment>
      <Article currentArticle={this.state.currentArticle} />
      {this.showButton()}
      {this.showMessage()}
    </Fragment>
  );

  showButton = () => {
    let { nextArticle, readArticles } = this.state;
    if (!Object.keys(nextArticle).length && readArticles.length >= 4) {
      return this.showButtonToRankings();
    } else {
      return this.showButtonToNextArticle();
    }
  };

  showButtonToRankings = () => {
    let buttonContent = "Proceed To Rankings Page";
    return (
      <Button
        aria-label={buttonContent}
        content={buttonContent}
        onClick={this.handleShowRankings}
      />
    );
  };

  showButtonToNextArticle = () => {
    let { currentArticle, nextArticle } = this.state;
    let sameArticles = currentArticle === nextArticle;
    let noNextArticle = !Object.keys(nextArticle).length;
    let articlesAreDifferent = sameArticles || noNextArticle ? true : false;
    let buttonContent = "Go To Next Article";

    return (
      <Button
        aria-label={buttonContent}
        disabled={articlesAreDifferent}
        loading={articlesAreDifferent}
        content={buttonContent}
        onClick={this.showNextArticle}
      />
    );
  };

  handleShowRankings = () =>
    this.setState({
      showRankings: true,
      readArticles: [...this.state.readArticles, this.state.currentArticle]
    });

  showNextArticle = () => {
    let { readArticles, currentArticle, nextArticle } = this.state;
    let isInsideOfArray = readArticles.includes(currentArticle);
    let nextArticleFetched = nextArticle !== currentArticle;

    if (!isInsideOfArray && nextArticleFetched) {
      this.setState({
        currentArticle: nextArticle,
        readArticles: [...readArticles, currentArticle]
      });
    }
  };

  showMessage = () => {
    let { errorType, error } = this.state;

    if (error) {
      return (
        <Message negative role="alert">
          <Message.Header>An error occured.</Message.Header>
          <p>
            We could not fetch the next article.
            {errorType === "Network"
              ? " It looks like you may be offline. Please check your internet connection."
              : `The error code was: ${errorType}`}
          </p>
        </Message>
      );
    }
  };

  render() {
    let noCurrentArticle = !Object.keys(this.state.currentArticle).length;

    return (
      <Container>
        <Segment loading={noCurrentArticle && true}>
          <main>{this.showArticleOrRankingsComponent()}</main>
        </Segment>
      </Container>
    );
  }
}

export default ArticleContainer;
