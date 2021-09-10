import React from "react";
import Sub from "./sub";

export default class Posts extends React.Component {
  // format of posts -> [{by, descendants, id, kids, score, time, title, type, url}, {...}]
  render() {
    const { posts, handleUser, handleComments } = this.props;

    return (
      <div className="cotent-container">
        <ul>
          {posts.map(post => {
            return (
              <li className="post" key={post.id}>
                <div>
                  <h4 className="title">
                    <a href={post.url} target="_blank" rel="noreferrer">
                      {post.title}
                    </a>
                  </h4>
                  <Sub
                    comments={post.kids}
                    user={post.by}
                    time={post.time}
                    commentsNumber={post.kids ? post.kids.length : 0}
                    handleUser={handleUser}
                    handleComments={handleComments}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
