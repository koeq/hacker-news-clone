import React from "react";

export default function Sub({ user, time, commentsNumber }) {
  const date = new Date(time * 1000).toLocaleString();

  return (
    <div className="sub text-light">
      <span>by</span>
      <span>{user}</span>
      <span>on</span>
      <span>{date}</span>
      <span>with</span>
      <span>{commentsNumber}</span>
      <span>comments</span>
    </div>
  );
}

// TO DO:
// handle case where posts got deleted -> value is null
