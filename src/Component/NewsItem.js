import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      //   <div>
      //     <h3>News Item</h3>
      //   </div>
      <div className="my-3">
        <div className="card">
          <img
            src={
              imageUrl
                ? imageUrl
                : "http://www.nftitalia.com/wp-content/uploads/2017/07/news-1-1600x429.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title.length > 40 ? title.slice(0, 40) + "..." : title}
            </h5>
            <p className="card-text">
              {description.length > 80
                ? description.slice(0, 80) + "..."
                : description}
            </p>
            <a href={newsUrl} target="_blank" className="btn btn-primary">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
