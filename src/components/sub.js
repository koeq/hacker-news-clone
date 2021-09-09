import React from "react";
import PropTypes from "prop-types";

export default function Sub({
  user,
  time,
  commentsNumber,
  handleUser,
  handleComments
}) {
  const date = new Date(time * 1000).toLocaleString();
  return (
    <div className="sub text-light">
      <span>by</span>
      <span
        className="pointer"
        style={{ textDecoration: "underline" }}
        onClick={() => handleUser(user)}
      >
        {user}
      </span>
      <span>on</span>
      <span>{date}</span>
      <span>with</span>
      <span
        onClick={() => handleComments()}
        style={{ textDecoration: "underline" }}
        className="pointer"
      >
        {commentsNumber}
      </span>
      <span>comments</span>
    </div>
  );
}

Sub.propTypes = {
  handleUser: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  commentsNumber: PropTypes.number.isRequired
};
