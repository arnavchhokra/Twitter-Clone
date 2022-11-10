import React from "react";
import "./style.css";

const Post = ({ key, user, text }) => {
  return (
    <div className="post-home">
      <div className="post-container">
        <div className="post-user">
          {key}
          &nbsp;&nbsp;@{user.slice(0, 4)}...{user.slice(-4)}
        </div>
        <div className="post-text">{text}</div>
      </div>
    </div>
  );
};

export default Post;
