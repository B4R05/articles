import React, { Component } from "react";
import Article from "./Article";
import api from "../api/api";

class ArticleContainer extends Component {
  render() {
    return (
      <div>
        <Article />
      </div>
    );
  }
}

export default ArticleContainer;
