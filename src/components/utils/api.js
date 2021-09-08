const api = "https://hacker-news.firebaseio.com/v0";
const json = ".json?print=pretty";

// // remove deleted posts
// function removeDeleted(posts) {
// posts.filter(({deleted}) => deleted === false)
// }

// function removeDead(posts) {
//   posts.filter(({dead}) => dead === false)
// }

// fetch post arcording to id
function fetchItem(id) {
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

      return ids.slice(0, 100);
    })
    .then(ids => Promise.all(ids.map(id => fetchItem(id))));
}
