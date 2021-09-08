import React from "react";
import Sub from "./sub";

export default class Posts extends React.Component {
  // format of posts -> [{by, descendants, id, kids, score, time, title, type, url}, {...}]
  render() {
    const { posts, handleUser } = this.props;

    return (
      <ul>
        {posts.map((post, index) => {
          return (
            <li className="post" key={post.id}>
              <span className="title-number">{index + 1}.</span>

              <div className="post-container">
                <h4 className="title">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-light"
                  >
                    {post.title}
                  </a>
                </h4>
                <Sub
                  user={post.by}
                  time={post.time}
                  commentsNumber={post.kids ? post.kids.length : 0}
                  handleUser={handleUser}
                />
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}
