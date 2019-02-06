import React from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";

const MessageAlert = ({ type, header, content, extraContent }) => {
  return (
    <Message
      negative={type === "negative" && true}
      positive={type === "positive" && true}
      role="alert"
    >
      <section>
        <Message.Header>
          <header>{header}</header>
        </Message.Header>
        <p>
          {content}
          {extraContent}
        </p>
      </section>
    </Message>
  );
};

MessageAlert.propTypes = {
  type: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  extraContent: PropTypes.string
};

export default MessageAlert;
