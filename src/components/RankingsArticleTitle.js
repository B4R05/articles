import React from "react";
import { Segment } from "semantic-ui-react";
import ReactStars from "react-stars";

class RankingsArticleTitle extends React.Component {
  state = {
    rating: 0
  };

  handleRatingChange = value => {
    this.setState({ rating: value });
    this.props.rate(value, this.props.article.title);
  };

  render() {
    return (
      <Segment className="flex">
        <header>{this.props.article.title}</header>

        <section>
          <ReactStars
            value={this.state.rating}
            count={5}
            onChange={this.handleRatingChange}
            size={24}
            color2={"#ffd700"}
          />
        </section>
      </Segment>
    );
  }
}

export default RankingsArticleTitle;
