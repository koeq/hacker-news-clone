const api = "https://hacker-news.firebaseio.com/v0";
const json = ".json?print=pretty";

// removes null values form posts array -> probably deleted posts 
export function removeDeletedPosts(posts) {
  posts.forEach((post, index) => {
    if (post === null) {
      console.log(
        `A deleted post was removed from 'posts' on place ${index + 1}`
      );
      posts.splice(index, 1);
    }
  });
}

// fetch post arcording to id
export function fetchItem(id) {
  return fetch(`${api}/item/${id}/${json}`).then(res => res.json());
}
// fetch 50 posts -> kind of posts: new, top, best
export function fetchPosts(kindOf) {
  return fetch(`${api}/${kindOf}stories/${json}`)
    .then(res => res.json())
    .then(ids => {
      if (!ids) {
        throw new Error(`There was an error fetching the ${kindOf} posts`);
      }

      return ids.slice(0, 50);
    })
    .then(ids => Promise.all(ids.map(id => fetchItem(id))));
}
