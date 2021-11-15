import React, { Component } from "react";
import NewsItem from "./NewsItem";
import { Spinner } from "./Spinner";
import PropTypes from "prop-types";
export class News extends Component {
  newsApiKey = process.env.REACT_APP_NewsApiKey;
  articles = [
    {
      source: { id: null, name: "Livemint" },
      author: "Livemint",
      title:
        "After 580 yrs, longest partial lunar eclipse to occur on Nov 19, to be visible in India: Check timing here - Mint",
      description:
        "The last time a partial lunar eclipse of such length occurred was on February 18, 1440, and the next time a similar phenomenon can be witnessed will be on February 8, 2669",
      url: "https://www.livemint.com/news/india/after-580-yrs-longest-partial-lunar-eclipse-to-occur-on-nov-19-check-india-visibility-timing-11636802567924.html",
      urlToImage:
        "https://images.livemint.com/img/2021/11/13/600x338/moon-k0kB--621x414@LiveMint_1636803636587.jpg",
      publishedAt: "2021-11-13T11:54:26Z",
      content:
        "Lunar eclipse 2021: The world is set to witness the longest partial lunar eclipse in 580 years next week, on 19 November. The eclipse will also be visible from North America, South America, eastern A… [+2279 chars]",
    },
  ];

  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      totalResults: null,
      page: 1,
    };
  }

  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 9,
  };
  static propTypes = {
    category: PropTypes.string,
    page: PropTypes.number,
    country: PropTypes.string,
  };
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.newsApiKey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData.articles);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }

  handlePreviousClick = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=${this.newsApiKey}&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData.articles);
    this.setState({ articles: parseData.articles, loading: false });
  };
  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
      loading: true,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=${this.newsApiKey}&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData.articles);
    this.setState({ articles: parseData.articles, loading: false });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
        </div>
        <div className="d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            onClick={this.handlePreviousClick}
            type="button"
            className="btn btn-dark"
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.totalResults
                ? this.state.page >=
                  Math.ceil(this.state.totalResults / this.props.pageSize)
                : false
            }
            onClick={this.handleNextClick}
            className="btn btn-dark"
          >
            next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
