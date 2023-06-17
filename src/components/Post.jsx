import React from "react";

function Post() {
  return (
    <div className="post">
      <div className="post__image">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*AQTVYeKTphXBndj11fOdrw.png"
          alt=""
        />
      </div>
      <div className="post__content">
        <h2>The most failed JavaScript interview questions</h2>
        <div className="post__info">
          <a href="" className="post__author">
            Omraj Sharma
          </a>
          <time> 4 June 2023 12:30PM </time>
        </div>
        <div className="post__summary">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit
          numquam possimus quaerat ipsam, labore eveniet repellat autem facere
          beatae ad aperiam voluptatum, eligendi repudiandae quidem? Accusamus
          excepturi delectus praesentium nisi?
        </div>
      </div>
    </div>
  );
}

export default Post;
