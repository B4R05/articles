import React from "react";
import { shallow } from "enzyme";

import Article from "../Article";
import ArticleContent from "../ArticleContent";

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
  wrapped = shallow(<Article currentArticle={data} />);
});

describe("Article.js", () => {
  it("shows an ArticleContent component for each object in the 'body' array", () => {
    expect(wrapped.find(ArticleContent).length).toEqual(data.body.length);
  });

  it("shows an 'article' tag", () => {
    expect(wrapped.find("article").length).toEqual(1);
  });
});
