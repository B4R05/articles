import React from "react";
import { Segment } from "semantic-ui-react";
import ReactStars from "react-stars";

class RankingsArticleTitle extends React.Component {
  state = {
    rating: 0
  };

  handleRatingChange = value => {
    console.log(value);
    this.setState({ rating: value });
    this.props.rate(value, this.props.article.title);
  };

  render() {
    return (
      <Segment style={{ display: "flex", justifyContent: "space-between" }}>
        {this.props.article.title}

        <ReactStars
          value={this.state.rating}
          count={5}
          onChange={this.handleRatingChange}
          size={24}
          color2={"#ffd700"}
        />
      </Segment>
    );
  }
}

export default RankingsArticleTitle;
