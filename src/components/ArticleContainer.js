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

    let { currentArticle, nextArticle, readArticles } = this.state;
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

  showArticleComponent = () => {
    let { currentArticle } = this.state;
    let noCurrentArticle = !Object.keys(currentArticle).length;

    return (
      <Fragment>
        <Article currentArticle={currentArticle} />
        {this.showButton()}
        {this.showMessage()}
      </Fragment>
    );
  };

  showButton = () => {
    let { currentArticle, nextArticle, readArticles } = this.state;
    if (Object.keys(nextArticle).length === 0 && readArticles.length >= 4) {
      return (
        <Button
          content="Proceed To Rankings Page"
          onClick={this.handleShowRankings}
        />
      );
    } else {
      let articlesAreDifferent =
        currentArticle === nextArticle || Object.keys(nextArticle).length === 0
          ? true
          : false;

      return (
        <Button
          disabled={articlesAreDifferent}
          loading={articlesAreDifferent}
          content="Go To Next Article"
          onClick={this.showNextArticle}
        />
      );
    }
  };

  handleShowRankings = () => {
    this.setState({
      showRankings: true,
      readArticles: [...this.state.readArticles, this.state.currentArticle]
    });
  };

  showNextArticle = () => {
    const { readArticles, currentArticle, nextArticle } = this.state;
    const isInsideOfArray = readArticles.includes(currentArticle);
    const nextArticleFetched = nextArticle !== currentArticle;

    if (!isInsideOfArray && nextArticleFetched) {
      this.setState({
        currentArticle: nextArticle,
        readArticles: [...readArticles, currentArticle]
      });
    }
  };

  showMessage = () => {
    let { errorType } = this.state;

    if (this.state.error) {
      return (
        <Message negative>
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
          {this.showArticleOrRankingsComponent()}
        </Segment>
      </Container>
    );
  }
}

export default ArticleContainer;
