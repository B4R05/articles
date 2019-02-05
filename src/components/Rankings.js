import React, { Component, Fragment } from "react";
import { Segment, Button, Message } from "semantic-ui-react";
import RankingsArticleTitle from "./RankingsArticleTitle";
import api from "../api/api";

class Rankings extends Component {
  state = {
    ratings: [],
    loading: false,
    error: null
  };

  rateArticleTitle = (rating, title) => {
    const { ratings } = this.state;

    const foundArticle = ratings.find(obj => obj.title === title);

    if (foundArticle) {
      //has user rated this article before? then find and update that same article.
      const arrayWithoutFound = ratings.filter(obj => obj !== foundArticle);

      this.setState({
        ratings: [...arrayWithoutFound, { rating, title }]
      });
    } else {
      //if user never rated this article, create a new object with the rating set and article's title only
      this.setState({ ratings: [...ratings, { rating, title }] });
    }
  };

  renderRankingsArticleTitles = () => {
    return this.props.readArticles.map(article => {
      return (
        <RankingsArticleTitle
          article={article}
          key={article.title}
          rate={this.rateArticleTitle}
        />
      );
    });
  };

  handleClick = () => {
    this.setState({ loading: true }, () => this.sendRatingsData());
  };

  sendRatingsData = () => {
    let data = this.state.ratings;

    api
      .post("/", data)
      .then(res => this.sendSuccess(res))
      .catch(err => this.sendError(err));
  };

  sendSuccess = res => {
    this.setState({ loading: false, error: false });
    console.log(res);
  };

  sendError = err => {
    console.log(err);
    if (!err.response) {
      // network error
      this.setState({ loading: false, error: true, errorType: "Network" });
    } else {
      // http status code
      this.setState({
        loading: false,
        error: true,
        errorType: err.response.status
      });
    }
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    const { ratings } = this.state;
    const { readArticles } = this.props;

    return (
      <Fragment>
        <Segment.Group>{this.renderRankingsArticleTitles()}</Segment.Group>
        <Button
          primary
          loading={this.state.loading}
          onClick={this.handleClick}
          content={
            ratings.length === readArticles.length
              ? "Send"
              : "Please rate all articles"
          }
          disabled={ratings.length === readArticles.length ? false : true}
        />
      </Fragment>
    );
  }
}

export default Rankings;
