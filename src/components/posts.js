import React from "react";
import { fetchPosts } from "./utils/api";

export default class Posts extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    posts: []
  };

  componentDidMount() {
    fetchPosts("top").then(posts => {
      this.setState({
        isLoaded: true,
        posts: posts
      });
    });
  }

  // format of posts -> [{...}, {...}]
  render() {
    const { error, isLoaded, posts } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>loading...</div>;
    } else {
      return (
        <ul>
          {posts.map((post, index) => {
            
            return <li className="posts" key={post.id}>{index}. {post.title}</li>;
          })}
        </ul>
      );
    }
  }
}
