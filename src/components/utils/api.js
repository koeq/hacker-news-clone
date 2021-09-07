import React from "react";

const api = "https://hacker-news.firebaseio.com/v0";
const json = ".json?print=pretty";

export default class Api extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    posts: []
  };

  // fetch post arcording to id
  fetchItem = id => {
    return fetch(`${api}/item/${id}/${json}`).then(res => res.json());
  };

  // fetch 50 posts -> kind of posts: new, top, best
  fetchIds = kindOf => {
    return fetch(`${api}/${kindOf}stories/${json}`)
      .then(res => res.json())
      .then(ids => {
        if (!ids) {
          throw new Error(`There was an error fetching the ${kindOf} posts`);
        }
        return ids.slice(0, 50);
      })

      .then(ids => Promise.all(ids.map(id => this.fetchItem(id))))
      .then(posts => {
        this.setState({
          isLoaded: true,
          posts: posts
        });
      });
  };

  componentDidMount() {
    this.fetchIds("top");
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
        <ol>
          {posts.map(post => {
            return <li key={post.id}>{post.title}</li>;
          })}
        </ol>
      );
    }
  }
}
