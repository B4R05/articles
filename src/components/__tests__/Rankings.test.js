import React from "react";
import { shallow } from "enzyme";
import Rankings from "../Rankings";

let wrapped;

let readArticles = [
  {
    title: "Nulla arcu"
  },
  {
    title: "Luctus arcu"
  },
  {
    title: "Tincidunt luctus arcu"
  },
  {
    title: "Pharetra at ultricies"
  },
  {
    title: "Nnec, tincidunt luctus arcu"
  }
];

beforeEach(() => {
  wrapped = shallow(<Rankings readArticles={readArticles} />);
});

describe("Rankings component", () => {
  it("renders 5 RankingsArticleTitle child components", () => {
    expect(wrapped.find("RankingsArticleTitle").length).toEqual(5);
  });

  it("renders a Button", () => {
    expect(wrapped.find("Button").length).toEqual(1);
  });
});
