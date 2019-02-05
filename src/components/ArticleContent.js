import React, { Component } from "react";
import { Segment, Header, Item } from "semantic-ui-react";
import Image from "react-graceful-image";

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
      return (
        <Image
          src={model.url}
          alt={model.altText}
          width="640"
          height="420"
          placeholderColor="#b1b1b1"
        />
      );
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
