import React from "react";
import PropTypes from "prop-types";

export default function Sub({ user, time, commentsNumber, handleUser }) {
  const date = new Date(time * 1000).toLocaleString();
  return (
    <div className="sub text-light">
      <span>by</span>
      <span className="pointer" onClick={() => handleUser(user)}>
        {user}
      </span>
      <span>on</span>
      <span>{date}</span>
      <span>with</span>
      <span>{commentsNumber}</span>
      <span>comments</span>
    </div>
  );
}

Sub.propTypes = {
  user: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  commentsNumber: PropTypes.number.isRequired
};
