import React, { Component, Fragment } from "react";
import { Button, Container, Segment } from "semantic-ui-react";
import Article from "./Article";
import Rankings from "./Rankings";
import api from "../api/api";

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
    let randomNumber = Math.floor(Math.random() * 5) + 1;
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
      </Fragment>
    );
  };

  showButton = () => {
    let { currentArticle, nextArticle, readArticles } = this.state;
    if (Object.keys(readArticles).length === 4) {
      return (
        <Button
          content="Proceed To Rankings Page"
          onClick={this.handleShowRankings}
        />
      );
    } else {
      let isArticleDifferent = currentArticle === nextArticle ? true : false;
      return (
        <Button
          disabled={isArticleDifferent}
          loading={isArticleDifferent}
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
