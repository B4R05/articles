import React, { Component } from "react";
import { Segment, Header, Item } from "semantic-ui-react";

class ArticleContent extends Component {
  renderContent = () => {
    const { type, model } = this.props.content;

    if (type === "heading") {
      return <Header as="h3">{model.text}</Header>;
    }

    if (type === "paragraph") {
      return model.text;
    }

    if (type === "image") {
      return <img src={model.url} alt={model.altText} />;
    }

    if (type === "list") {
      return model.items.map(item => (
        <Item key={item}>
          <Item.Content>- {item}</Item.Content>
        </Item>
      ));
    }
  };

  render() {
    return <Item.Group>{this.renderContent()}</Item.Group>;
  }
}

export default ArticleContent;
