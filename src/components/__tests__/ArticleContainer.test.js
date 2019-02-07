import React from "react";
import { shallow } from "enzyme";
import { Button, Container, Segment } from "semantic-ui-react";
import ArticleContainer from "../ArticleContainer";
import MessageAlert from "../MessageAlert";

let wrapped;
let data = {
  body: [
    {
      model: {
        text: "Maecenas venenatis lorem ut erat dictum, sed varius est porta"
      },
      type: "heading"
    },
    {
      model: {
        text: "Maecenas venenatis lorem ut erat dictum, sed varius est porta"
      },
      type: "paragraph"
    },
    {
      model: {
        text: "Maecenas venenatis lorem ut erat dictum, sed varius est porta"
      },
      type: "paragraph"
    }
  ],
  title: "Nulla nibh erat, pharetra at ultricies nec, tincidunt luctus arcu"
};

beforeEach(() => {
  wrapped = shallow(<ArticleContainer />);
});

describe("ArticleContainer.js", () => {
  it("shows an error message if there is a network error", async () => {
    await wrapped.setState({ error: true, errorType: "Network" });

    expect(wrapped.find(MessageAlert).length).toEqual(1);
  });

  it("shows a button which proceeds to next article", async () => {
    await wrapped.setState({
      currentArticle: data
    });

    expect(wrapped.find(Button).props().content).toEqual("Go To Next Article");
  });

  it("shows a button which can navigate to Rankings component", async () => {
    await wrapped.setState({
      currentArticle: data,
      nextArticle: {},
      readArticles: [{}, {}, {}, {}]
    });

    expect(wrapped.find(Button).props().content).toEqual(
      "Proceed To Rankings Page"
    );
  });

  it("shows an Article component", async () => {
    await wrapped.setState({
      currentArticle: data
    });

    expect(wrapped.find("Article").length).toEqual(1);
  });

  it("shows a Rankings component", async () => {
    await wrapped.setState({
      showRankings: true
    });

    expect(wrapped.find("Rankings").length).toEqual(1);
  });

  it("shows a main tag, Container and 2 Segment components ", () => {
    expect(wrapped.find("main").length).toEqual(1);
    expect(wrapped.find(Container).length).toEqual(1);
    expect(wrapped.find(Segment).length).toEqual(2);
  });
});
