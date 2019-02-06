import React from "react";
import PropTypes from "prop-types";
import { Header, Item } from "semantic-ui-react";
import Image from "react-graceful-image";

const ArticleContent = ({ content }) => {
  const renderContent = () => {
    let { type, model } = content;

    if (type === "heading") {
      return (
        <Header as="h3">
          <header>{model.text} </header>
        </Header>
      );
    }

    if (type === "paragraph") {
      return <article>{model.text}</article>;
    }

    if (type === "image") {
      return (
        <figure>
          <Image
            src={model.url}
            alt={model.altText}
            width="100%"
            height="100%"
            placeholderColor="#b1b1b1"
          />
          <figcaption>
            <i>{model.altText}</i>
          </figcaption>
        </figure>
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

  return (
    <Item.Group>
      <section>{renderContent()}</section>
    </Item.Group>
  );
};

ArticleContent.propTypes = {
  content: PropTypes.object.isRequired
};

export default ArticleContent;
