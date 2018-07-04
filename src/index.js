import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";


class App extends React.Component {
  state = {
    articles: []
  };

  componentDidMount() {
    fetch("https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty")
      .then(res => res.json())
      .then(articles => {
        console.log(articles);
        articles.map(item => {
          fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)
            .then(res => res.json())
            .then(detailArticles => {
              console.log(detailArticles);
              const articles = this.state.articles.concat(detailArticles);
              this.setState({ articles });
            });
        });
      });
  }

  render() {
    return <p>{JSON.stringify(this.state.articles)}</p>;
  }
}

render(<App />, document.getElementById("root"));

