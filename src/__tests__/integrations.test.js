import React from "react";
import { shallow } from "enzyme";
import ArticleContainer from "../components/ArticleContainer";
import Article from "../components/Article";
import Rankings from "../components/Rankings";
import RankingsArticleTitle from "../components/RankingsArticleTitle";

let wrapped;
let wrappedChild;
let wrappedParent;

//Pass this array to Rankings component as props
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

//function inside of Rankings component
const rateArticleTitle = (rating, title) => {
  let ratings = wrappedParent.state().ratings;
  let foundArticle = ratings.find(obj => obj.title === title);

  if (foundArticle) {
    //has user rated this article before? then 'update' that article.
    let arrayWithoutFound = ratings.filter(obj => obj !== foundArticle);

    wrappedParent.setState({
      ratings: [...arrayWithoutFound, { rating, title }]
    });
  } else {
    //if user never rated this article, create a new object with new values
    wrappedParent.setState({ ratings: [...ratings, { rating, title }] });
  }
};

beforeEach(() => {
  wrapped = shallow(<ArticleContainer />);
  wrappedParent = shallow(<Rankings readArticles={readArticles} />);
  wrappedChild = shallow(
    <RankingsArticleTitle article={readArticles[0]} rate={rateArticleTitle} />
  );
});

describe("Integration Tests: ", () => {
  describe("ArticleContainer component", () => {
    it("fetches 1 JSON object, holds it in state, then passes it as props to an Article component ", async done => {
      await wrapped.instance().componentDidMount();

      setTimeout(() => {
        wrapped.update();
        //currentArticle state is set with fetched JSON data
        expect(Object.keys(wrapped.state().currentArticle).length).toEqual(3);
        //an Article component is rendered
        expect(wrapped.find(Article).length).toEqual(1);
        //Article has currentArticle props equal to ArticleContainer's currentArticle state
        expect(wrapped.find(Article).props().currentArticle).toEqual(
          wrapped.state().currentArticle
        );
        done();
        wrapped.unmount();
      }, 3500);
    });
  });

  describe("Rankings component", () => {
    it("receives a rating value and article title from child component, then adds them in an object to 'ratings' array in state", async () => {
      await wrappedChild.instance().handleRatingChange(3);
      await wrappedParent.update();

      expect(wrappedParent.state().ratings[0]).toEqual({
        title: "Nulla arcu",
        rating: 3
      });
    });
  });
});
