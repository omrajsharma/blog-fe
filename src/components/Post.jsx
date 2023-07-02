import React from "react";

function Post({title, summary, author, updatedAt, cover}) {
  return (
    <div className="post">
      <div className="post__image">
        <img
          src={"http://localhost:3000/" + cover}
          alt=""
        />
      </div>
      <div className="post__content">
        <h2>{title}</h2>
        <div className="post__info">
          <a href="" className="post__author">
            {author}
          </a>
          <time> {updatedAt} </time>
        </div>
        <div className="post__summary">
          {summary}
        </div>
      </div>
    </div>
  );
}

export default Post;
