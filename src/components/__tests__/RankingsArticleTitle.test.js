import React from "react";
import { shallow } from "enzyme";
import { Segment } from "semantic-ui-react";
import RankingsArticleTitle from "../RankingsArticleTitle";
import ReactStars from "react-stars";

let wrapped;

let data = {
  title: "lorem ipsu"
};

beforeEach(() => {
  wrapped = shallow(<RankingsArticleTitle article={data} />);
});

describe("RankingsArticleTitle.js", () => {
  it("renders one Segment, header, section and a ReactStars component", () => {
    expect(wrapped.find(Segment).length).toEqual(1);
    expect(wrapped.find("header").length).toEqual(1);
    expect(wrapped.find("section").length).toEqual(1);
    expect(wrapped.find(ReactStars).length).toEqual(1);
  });

  it("can change the value of ReactStars", () => {
    wrapped.setState({
      rating: 3
    });

    expect(wrapped.find(ReactStars).props().value).toEqual(3);
  });
});
