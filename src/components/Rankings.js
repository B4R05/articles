import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Segment, Button } from "semantic-ui-react";

import RankingsArticleTitle from "./RankingsArticleTitle";
import MessageAlert from "./MessageAlert";

import api from "../api/api";

class Rankings extends Component {
  state = {
    ratings: [],
    loading: false,
    error: null
  };

  rateArticleTitle = (rating, title) => {
    let { ratings } = this.state;
    let foundArticleTitle = ratings.find(obj => obj.title === title);

    if (foundArticleTitle) {
      //has user rated this article before? then 'update' that article.
      let arrayWithoutFound = ratings.filter(obj => obj !== foundArticleTitle);

      this.setState({
        ratings: [...arrayWithoutFound, { rating, title }]
      });
    } else {
      //if user never rated this article, create a new object with new values
      this.setState({ ratings: [...ratings, { rating, title }] });
    }
  };

  renderRankingsArticleTitles = () => {
    return this.props.readArticles.map(article => (
      <RankingsArticleTitle
        article={article}
        key={article.title}
        rate={this.rateArticleTitle}
      />
    ));
  };

  handleClick = () => {
    this.setState({ loading: true }, () => this.sendRatingsData());
  };

  sendRatingsData = () => {
    let data = this.state.ratings;

    api
      .post("/", data)
      .then(res => this.handleResponse(res))
      .catch(err => this.handleError(err));
  };

  handleResponse = res => {
    console.log(res);
    this.setState({ loading: false, error: false });
  };

  handleError = err => {
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

  showMessage = () => {
    let { error } = this.state;

    if (error === false) {
      return this.showSuccessMessage();
    }

    if (error) {
      return this.showErrorMessage();
    }
  };

  showSuccessMessage = () => {
    let type = "positive";
    let header = "Success!";
    let content = "Thanks for submitting your rankings!";
    return <MessageAlert header={header} content={content} type={type} />;
  };

  showErrorMessage = () => {
    let { errorType } = this.state;
    let type = "negative";
    let header = "An error occured.";
    let content = "We could not post your rankings!";
    let extraContent =
      errorType === "Network"
        ? " It looks like you may be offline. Please check your internet connection."
        : `The error code was: ${errorType}`;

    return (
      <MessageAlert
        header={header}
        content={content}
        extraContent={extraContent}
        type={type}
      />
    );
  };

  render() {
    let { ratings, loading } = this.state;
    let { readArticles } = this.props;
    let allArticlesRated = ratings.length === readArticles.length;
    let buttonContent = allArticlesRated ? "Send" : "Please rate all articles";

    return (
      <Fragment>
        <Segment.Group>{this.renderRankingsArticleTitles()}</Segment.Group>
        <Button
          primary
          aria-label={buttonContent}
          loading={loading}
          onClick={this.handleClick}
          content={buttonContent}
          disabled={ratings.length === readArticles.length ? false : true}
        />
        {this.showMessage()}
      </Fragment>
    );
  }
}

Rankings.propTypes = {
  readArticles: PropTypes.array.isRequired
};

export default Rankings;
