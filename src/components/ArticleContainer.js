import React, { Component } from "react";
import { Button, Container, Segment } from "semantic-ui-react";
import Article from "./Article";
import api from "../api/api";

class ArticleContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentArticle: {},
      nextArticle: {},
      readArticles: []
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
  };

  addNextArticleToCurrentArticle = () => {
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
    return (
      <Container>
        <Segment>
          <Article currentArticle={this.state.currentArticle} />
          <button onClick={this.addNextArticleToCurrentArticle}>
            Next Article
          </button>
        </Segment>
      </Container>
    );
  }
}

export default ArticleContainer;
