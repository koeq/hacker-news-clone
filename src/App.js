import React from "react";
import "./App.css";
import Posts from "./components/posts";
import User from "./components/user";
import { removeNull, fetchPosts, removeDeleted } from "./components/utils/api";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: null,
      user: null,
      comments: null
    };

    this.handleUser = this.handleUser.bind(this);
  }

  // new, top and best
  componentDidMount() {
    fetchPosts("new").then(posts => {
      this.setState({
        isLoaded: true,
        posts: posts
      });
    });
  }

  handleUser(userName) {
    this.setState({
      posts: null,
      comments: null,
      user: userName
    });
  }

  render() {
    const { error, isLoaded, posts, user } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      );
    } else if (posts) {
      // remove deleted posts from list
      removeNull(posts);
      removeDeleted(posts);

      return (
        <div className="App">
          <Posts posts={posts} handleUser={this.handleUser} />
        </div>
      );
    } else if (user) {
      return (
        <div className="App">
          <User user={user} />
        </div>
      );
    }
  }
}
