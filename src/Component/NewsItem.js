// import React, { Component } from "react";
// import loading from "./loading.gif";

// export class Spinner extends Component {
//   render() {
//     return (
//       <div className="text-center">
//         <img src={loading} alt="loading" />
//       </div>
//     );
//   }
// }

// export default Spinner;

import React, { Component } from "react";

const NewsItem = (props) => {
  const indianTime = (isoDate) => {
    let s = new Date(isoDate).toLocaleString(undefined, {
      timeZone: "Asia/Kolkata",
    });
    return s;
  };

  let { title, description, imageUrl, newsUrl, author, isoDate } = props;
  return (
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
          <p>
            By {author ? author : "Unknow"} on {indianTime(isoDate)}
          </p>

          <a
            href={newsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
