import React from "react";
import { shallow } from "enzyme";
import { Header, Item } from "semantic-ui-react";
import ArticleContent from "../ArticleContent";

let wrapped;

let headingData = {
  model: {
    text: "Maecenas venenatis lorem ut erat dictum, sed varius est porta"
  },
  type: "heading"
};

let paragraphData = {
  model: {
    text: "Maecenas venenatis lorem ut erat dictum, sed varius est porta"
  },
  type: "paragraph"
};

let imageData = {
  model: {
    url: "https://picsum.photos/200/300/?random",
    altText: "lorem ipsum alternative text"
  },
  type: "image"
};

let listData = {
  model: {
    items: ["text1", "text2"]
  },
  type: "list"
};

describe("ArticleContent.js", () => {
  it("returns a Header if props.content.type === heading", () => {
    let wrapped = shallow(<ArticleContent content={headingData} />);
    expect(wrapped.find("Header").length).toEqual(1);
  });

  it("returns an article tag if props.content.type === paragraph", () => {
    let wrapped = shallow(<ArticleContent content={paragraphData} />);
    expect(wrapped.find("article").length).toEqual(1);
  });

  it("returns an figure tag if props.content.type === image", () => {
    let wrapped = shallow(<ArticleContent content={imageData} />);
    expect(wrapped.find("figure").length).toEqual(1);
  });

  it("returns atleast 1 Item component if props.content.type === list", () => {
    let wrapped = shallow(<ArticleContent content={listData} />);
    expect(wrapped.find("Item").length).toEqual(2);
  });
});
