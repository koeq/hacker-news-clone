import React from "react";
import { fetchPosts } from "./utils/api";
import Sub from "./sub";

export default class Posts extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    posts: []
  };

  // new, top and best
  componentDidMount() {
    fetchPosts("top").then(posts => {
      this.setState({
        isLoaded: true,
        posts: posts
      });
    });
  }

  // format of posts -> [{by, descendants, id, kids, score, time, title, type, url}, {...}]
  render() {
    const { error, isLoaded, posts } = this.state;
    console.log(posts);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>loading...</div>;
    } else {
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
                  <Sub user={post.by} time={post.time} commentsNumber={post.kids ? post.kids.length : 0}
                   />
                </div>
              </li>
            );
          })}
        </ul>
      );
    }
  }
}
