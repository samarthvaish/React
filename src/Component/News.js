// import React, { Component } from "react";
// import NewsItem from "./NewsItem";
// import { Spinner } from "./Spinner";
// import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component";

// require("dotenv").config();
// export class News extends Component {
//   newsApiKey = process.env.REACT_APP_NewsApiKey;
//   articles = [
//     {
//       source: { id: null, name: "Livemint" },
//       author: "Livemint",
//       title:
//         "After 580 yrs, longest partial lunar eclipse to occur on Nov 19, to be visible in India: Check timing here - Mint",
//       description:
//         "The last time a partial lunar eclipse of such length occurred was on February 18, 1440, and the next time a similar phenomenon can be witnessed will be on February 8, 2669",
//       url: "https://www.livemint.com/news/india/after-580-yrs-longest-partial-lunar-eclipse-to-occur-on-nov-19-check-india-visibility-timing-11636802567924.html",
//       urlToImage:
//         "https://images.livemint.com/img/2021/11/13/600x338/moon-k0kB--621x414@LiveMint_1636803636587.jpg",
//       publishedAt: "2021-11-13T11:54:26Z",
//       content:
//         "Lunar eclipse 2021: The world is set to witness the longest partial lunar eclipse in 580 years next week, on 19 November. The eclipse will also be visible from North America, South America, eastern A… [+2279 chars]",
//     },
//   ];

//   constructor(props) {
//     super(props);
//     this.state = {
//       articles: this.articles,
//       loading: false,
//       totalResults: null,
//       page: 1,
//     };
//     document.title = `${this.capitalizeFirstLetter(
//        props.category
//     )} - NewMonkey`;
//     const [scrollPosition, setSrollPosition] = useState(0);
//     const [showGoTop, setshowGoTop] = useState("goTopHidden");
//   }

//   static defaultProps = {
//     country: "in",
//     category: "general",
//     pageSize: 9,
//     page: 1,
//   };
//   static propTypes = {
//     category: PropTypes.string,
//     page: PropTypes.number,
//     country: PropTypes.string,
//   };

//   async fetchNews() {
//     let url = `https://newsapi.org/v2/top-headlines?country=${ props.country}&category=${ props.category}&apiKey=${this.newsApiKey}&page=${page}&pageSize=${ props.pageSize}`;
//     let data = await fetch(url);
//     let parseData = await data.json();
//     return parseData;
//   }
//   async componentDidMount() {
//     this.setState({ loading: true });
//     let parseData = await this.fetchNews();
//     this.setState({
//       articles: parseData.articles,
//       totalResults: parseData.totalResults,
//       loading: false,
//     });
//     // window.scrollTo(0, 0);
//   }
//   capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };

//   handlePreviousClick = async () => {
//     this.setState({
//       page: page - 1,
//       loading: true,
//     });
//     // this.setState({ });
//     let parseData = await this.fetchNews();
//     this.setState({ articles: parseData.articles, loading: false });
//     window.scrollTo(0, 0);
//   };
//   handleNextClick = async () => {
//     this.setState({
//       page: page + 1,
//       loading: true,
//     });
//     let parseData = await this.fetchNews();
//     this.setState({ articles: parseData.articles, loading: false });
//     window.scrollTo(0, 0);
//   };

//   fetchMoreData = async () => {
//     this.setState({
//       page: page + 1,
//     });
//     let parseData = await this.fetchNews();
//     this.setState({
//       articles: articles.concat(parseData.articles),
//     });
//   };

//   render() {
//     return (
//       <div className="container my-3">
//         <h1 className="text-center">
//           NewMonkey - Top {this.capitalizeFirstLetter( props.category)}{" "}
//           Headlines
//         </h1>
//         {loading && <Spinner />}
//         <InfiniteScroll
//           dataLength={articles.length}
//           next={this.fetchMoreData}
//           hasMore={articles.length < totalResults}
//           loader={<h4>Loading...</h4>}
//         >
//           <div className="row">
//             {!loading &&
//               articles.map((element) => {
//                 return (
//                   <div className="col-md-4" key={element.url}>
//                     <NewsItem
//                       title={element.title ? element.title : ""}
//                       description={
//                         element.description ? element.description : ""
//                       }
//                       imageUrl={element.urlToImage}
//                       newsUrl={element.url}
//                       author={element.author}
//                       isoDate={element.publishedAt}
//                     />
//                   </div>
//                 );
//               })}
//           </div>
//         </InfiniteScroll>
//         {/* <div className="d-flex justify-content-between">
//           <button
//             disabled={page <= 1}
//             onClick={this.handlePreviousClick}
//             type="button"
//             className="btn btn-dark"
//           >
//             &larr; Previous
//           </button>
//           <button
//             type="button"
//             disabled={
//               totalResults
//                 ? page >=
//                   Math.ceil(totalResults /  props.pageSize)
//                 : false
//             }
//             onClick={this.handleNextClick}
//             className="btn btn-dark"
//           >
//             next &rarr;
//           </button>
//         </div> */}
//       </div>
//     );
//   }
// }

// export default News;

import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

require("dotenv").config();
const News = (props) => {
  let newsApiKey = process.env.REACT_APP_NewsApiKey;
  // let articles = [
  //   {
  //     source: { id: null, name: "Livemint" },
  //     author: "Livemint",
  //     title:
  //       "After 580 yrs, longest partial lunar eclipse to occur on Nov 19, to be visible in India: Check timing here - Mint",
  //     description:
  //       "The last time a partial lunar eclipse of such length occurred was on February 18, 1440, and the next time a similar phenomenon can be witnessed will be on February 8, 2669",
  //     url: "https://www.livemint.com/news/india/after-580-yrs-longest-partial-lunar-eclipse-to-occur-on-nov-19-check-india-visibility-timing-11636802567924.html",
  //     urlToImage:
  //       "https://images.livemint.com/img/2021/11/13/600x338/moon-k0kB--621x414@LiveMint_1636803636587.jpg",
  //     publishedAt: "2021-11-13T11:54:26Z",
  //     content:
  //       "Lunar eclipse 2021: The world is set to witness the longest partial lunar eclipse in 580 years next week, on 19 November. The eclipse will also be visible from North America, South America, eastern A… [+2279 chars]",
  //   },
  // ];
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(false);
  const [totalResults, settotalResults] = useState(null);
  const [page, setpage] = useState(1);
  // document.title = `${capitalizeFirstLetter(props.category)} - NewMonkey`;

  const fetchNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${newsApiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    return parseData;
  };
  const updateNews = async () => {
    setloading(true);
    let parseData = await fetchNews();
    setarticles(parseData.articles);
    settotalResults(parseData.totalResults);
    setloading(false);
  };
  useEffect(() => {
    updateNews();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handlePreviousClick = async () => {
    setpage(page - 1);
    setloading(true);
    let parseData = await fetchNews();
    setarticles(parseData.articles);
    setloading(false);
    window.scrollTo(0, 0);
  };
  const handleNextClick = async () => {
    setpage(page + 1);
    setloading(true);
    let parseData = await fetchNews();
    setarticles(parseData.articles);
    setloading(false);
    window.scrollTo(0, 0);
  };

  const fetchMoreData = async () => {
    setpage(page + 1);
    let parseData = await fetchNews();
    setarticles(articles.concat(parseData.articles));
  };

  return (
    <div className="container my-3">
      <h1 className="text-center">
        NewMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<h4>Loading...</h4>}
      >
        <div className="row">
          {!loading &&
            articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    isoDate={element.publishedAt}
                  />
                </div>
              );
            })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  category: "general",
  pageSize: 9,
  page: 1,
};
News.propTypes = {
  category: PropTypes.string,
  page: PropTypes.number,
  country: PropTypes.string,
};

export default News;
