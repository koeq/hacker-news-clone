import React from "react";
import "./App.css";
import Posts from "./components/posts";
import { removeDeletedPosts, fetchPosts } from "./components/utils/api";

export default class App extends React.Component {
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

  render() {
    // console.log(this.state)
    const { error, isLoaded, posts } = this.state;
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>loading...</div>;
    } else {
      console.log(posts);
      // remove deleted posts from list
      removeDeletedPosts(posts);
      return (
        <div className="App">
          <Posts posts={posts} />
        </div>
      );
    }
  }
}
