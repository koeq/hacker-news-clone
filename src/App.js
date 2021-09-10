import React from "react";
import "./App.css";
import Posts from "./components/posts";
import User from "./components/user";
import Comments from "./components/comments";
import Nav from "./components/nav";
import { removeNull, fetchPosts, removeDeleted } from "./components/utils/api";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,

      posts: null,
      user: null,
      comments: null,
      kindOfPosts: "new"
    };

    this.handleUser = this.handleUser.bind(this);
    this.handleComments = this.handleComments.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
  }

  // new, top and best
  componentDidMount() {
    fetchPosts(this.state.kindOfPosts, this.state.amount).then(posts => {
      this.setState({
        isLoaded: true,
        posts: posts
      });
    });
  }

  handleAmountChange(event) {
    this.setState({
      amount: Number(event.target.value)
    });
  }

  handleCategory(category) {
    this.setState({
      isLoaded: false
    });
    fetchPosts(category).then(posts => {
      this.setState({
        isLoaded: true,
        posts: posts,
        kindOfPosts: category
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

  handleComments(comments) {
    this.setState({
      posts: null,
      comments: comments,
      user: null
    });
  }

  renderAppContent() {
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
        <Posts
          posts={posts}
          handleUser={this.handleUser}
          handleComments={this.handleComments}
        />
      );
    } else if (user) {
      return (
        <User
          user={user}
          handleUser={this.handleUser}
          handleComments={this.handleComments}
        />
      );
    } else if (comments) {
      return (
        <Comments
          handleUser={this.handleUser}
          handleComments={this.handleComments}
          comments={comments}
        />
      );
    }
  }

  render() {
    const { kindOfPosts } = this.state;
    return (
      <div className="App">
        <Nav
          activeCategory={kindOfPosts}
          handleCategory={this.handleCategory}
          posts={this.state.posts}
          amount={this.state.amount}
        ></Nav>
        {this.renderAppContent()}
      </div>
    );
  }
}
