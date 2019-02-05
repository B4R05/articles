import React, { Component } from "react";
import Article from "./Article";
import api from "../api/api";

class ArticleContainer extends Component {
  componentDidMount() {
    this.fetchArticle();
  }

  fetchArticle = () => {
    let randomNumber = Math.floor(Math.random() * 5) + 1;

    api
      .get(`/${randomNumber}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Article />
      </div>
    );
  }
}

export default ArticleContainer;
