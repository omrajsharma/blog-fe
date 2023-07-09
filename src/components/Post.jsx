import React from "react";
import { Link } from "react-router-dom";

function Post({id, title, summary, author, updatedAt, cover}) {
  return (
    <Link to={'/post/' + id}>
      <div className="post">
        <div className="post__image">
          <img
            src={"http://localhost:3000/" + cover}
            alt=""
          />
        </div>
        <div className="post__content">
          <h2>{title.length > 65 ? title.slice(0, 65) + '...' : title}</h2>
          <div className="post__info">
            <a href="" className="post__author">
              {author}
            </a>
            <time> {updatedAt} </time>
          </div>
          <div className="post__summary">
            {summary.length > 200 ? summary.slice(0, 200) + '...' : summary}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
