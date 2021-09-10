import React from "react";
import Posts from "./posts";
import {
  fetchUser,
  fetchUserPosts,
  onlyStories,
  removeDeleted
} from "./utils/api";

export default class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      about: null,
      created: null,
      id: null,
      karma: null,
      submitted: null
    };
  }
  componentDidMount() {
    //   fetch data about the user
    fetchUser(this.props.user).then(({ created, id, karma, submitted }) => {
      this.setState({
        created: created,
        id: id,
        karma: karma,
        submitted: submitted
      });

      //   fetch users posts by using the users data
      fetchUserPosts(submitted)
        .then(arr => onlyStories(arr))
        .then(posts => {
          this.setState({
            isLoaded: true,
            userPosts: removeDeleted(posts)
          });
        });
    });
  }
  render() {
    const { user, handleUser, handleComments } = this.props;
    const { isLoaded, karma, userPosts } = this.state;
    const date = new Date(this.state.created * 1000).toLocaleString();

    if (!isLoaded) {
      return (
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      );
    } else {
      return (
        <div className="content-container">
          <div className="sub text-light">
            <h2>{user}</h2>
            <span>joined </span>
            <span>{date}</span>
            <span> has </span>
            <span>{karma} karma.</span>
          </div>
          {/*  only render if posts are loaded */}
          {isLoaded ? (
            <Posts
              posts={userPosts}
              handleUser={handleUser}
              handleComments={handleComments}
            ></Posts>
          ) : (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          )}
        </div>
      );
    }
  }
}
