import React, { Component, Fragment } from "react";
import { Button, Container, Segment } from "semantic-ui-react";

import Article from "./Article";
import Rankings from "./Rankings";
import MessageAlert from "./MessageAlert";

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
    //generate a random number from an array of numbers
    this.randomNumbers = returnRandomNumberOnce([1, 2, 3, 4, 5]);
  }

  componentDidMount() {
    this.fetchRandomArticle("currentArticle");
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentArticle !== prevState.currentArticle) {
      this.fetchRandomArticle("nextArticle");
    }
  }

  fetchRandomArticle = property => {
    let randomNonRepeatingNumber = this.randomNumbers.next().value;

    api
      .get(`/${randomNonRepeatingNumber}`)
      .then(res => this.handleResponse(property, res.data))
      .catch(err => this.handleError(err));
  };

  handleResponse = (property, value) => {
    this.setState({ [property]: value });
  };

  handleError = err => {
    console.log(err);
    if (!err.response) {
      // then a network error is present
      this.setState({ error: true, errorType: "Network" });
    } else {
      // then expect an http status code
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
      <nav>{this.showButton()}</nav>
    </Fragment>
  );

  //only allow the user the option to navigate to Rankings component if:
  //atleast 4 articles were read AND there is no nextArticle fetched
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

  //adds the 5th article read by the user to readArticles, then allows option to navigate to Rankings
  handleShowRankings = () =>
    this.setState({
      showRankings: true,
      readArticles: [...this.state.readArticles, this.state.currentArticle]
    });

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
        onClick={this.handleShowNextArticle}
      />
    );
  };

  handleShowNextArticle = () => {
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

  showErrorMessage = () => {
    let { errorType, error } = this.state;
    let type = "negative";
    let header = "An error occured.";
    let content = "We could not fetch the next article.";
    let extraContent =
      errorType === "Network"
        ? " It looks like you may be offline. Please check your internet connection."
        : `The error code was: ${errorType}`;

    if (error) {
      return (
        <MessageAlert
          header={header}
          content={content}
          extraContent={extraContent}
          type={type}
        />
      );
    }
  };

  render() {
    let noCurrentArticle = !Object.keys(this.state.currentArticle).length;

    return (
      <Container>
        <Segment loading={noCurrentArticle && true}>
          <main>{this.showArticleOrRankingsComponent()}</main>
          {this.showErrorMessage()}
        </Segment>
      </Container>
    );
  }
}

export default ArticleContainer;
