import React from "react";
import Sub from "./sub";
import { fetchAllComments, fetchItem } from "./utils/api";

export default class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      commentIds: this.props.comments,
      comments: null,
      postId: null,
      post: null
    };
  }

  async componentDidMount() {
    const comments = await fetchAllComments(
      this.state.commentIds,
      this.props.commentNumber
    );
    // id of the original post is the parent element of the first comment
    const postId = comments[0].parent;
    fetchItem(postId).then(post => {
      this.setState({
        isLoaded: true,
        comments: comments,
        post: post
      });
    });
  }
  render() {
    const { isLoaded, post, comments } = this.state;
    const { handleUser, handleComments } = this.props;

    if (!isLoaded) {
      return (
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      );
    } else if (post) {
      return (
        <div className="content-container">
          <h3 className="text-light">{post.title}</h3>
          <Sub
            comments={post.kids}
            user={post.by}
            time={post.time}
            commentsNumber={post.kids ? post.kids.length : 0}
            handleUser={handleUser}
            handleComments={handleComments}
          />
          <ul style={{ marginTop: "20px" }} className="comment-section">
            {comments.map(comment => {
              function createMarkup() {
                return {
                  __html: comment.text
                };
              }
              return (
                <li key={comment.id} className="comment">
                  <div className="sub">
                    <span>by </span>
                    <span>{comment.by}</span>
                    <span>
                      on {new Date(post.time * 1000).toLocaleString()}
                    </span>
                  </div>
                  <p
                    className="comment-text"
                    dangerouslySetInnerHTML={createMarkup()}
                  ></p>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }
}
