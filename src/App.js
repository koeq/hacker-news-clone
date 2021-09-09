import React from "react";
import "./App.css";
import Posts from "./components/posts";
import User from "./components/user";
import Comments from "./components/comments";
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
    this.handleComments = this.handleComments.bind(this);
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

  handleComments() {
    this.setState({
      posts: null,
      comments: true,
      user: null
    });
  }

  render() {
    const { error, isLoaded, posts, user, comments } = this.state;

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
          <Posts
            posts={posts}
            handleUser={this.handleUser}
            handleComments={this.handleComments}
          />
        </div>
      );
    } else if (user) {
      return (
        <div className="App">
          <User
            user={user}
            handleUser={this.handleUser}
            handleComments={this.handleComments}
          />
        </div>
      );
    } else if (comments) {
      return (
        <div className="App">
          <Comments />
        </div>
      );
    }
  }
}
