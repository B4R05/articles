import React, { Component, Fragment, Suspense } from "react";
import { Button, Container, Segment } from "semantic-ui-react";

import api from "../api/api";
import returnRandomNumberOnce from "../helpers/helpers";

import Article from "./Article";
import MessageAlert from "./MessageAlert";
const Rankings = React.lazy(() => import("./Rankings"));

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
    const randomNonRepeatingNumber = this.randomNumbers.next().value;

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
    <Suspense fallback={<Segment loading />}>
      <Rankings readArticles={this.state.readArticles} />
    </Suspense>
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
    const { nextArticle, readArticles } = this.state;
    if (!Object.keys(nextArticle).length && readArticles.length >= 4) {
      return this.showButtonToRankings();
    } else {
      return this.showButtonToNextArticle();
    }
  };

  showButtonToRankings = () => {
    const buttonContent = "Proceed To Rankings Page";
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
    const { currentArticle, nextArticle } = this.state;
    const sameArticles = currentArticle === nextArticle;
    const noNextArticle = !Object.keys(nextArticle).length;
    const articlesAreDifferent = sameArticles || noNextArticle ? true : false;
    const buttonContent = "Go To Next Article";

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

  showErrorMessage = () => {
    const { errorType, error } = this.state;
    const type = "negative";
    const header = "An error occured.";
    const content = "We could not fetch the next article.";
    const extraContent =
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
    const noCurrentArticle = !Object.keys(this.state.currentArticle).length;

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
