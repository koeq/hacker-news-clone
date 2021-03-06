const api = "https://hacker-news.firebaseio.com/v0";
const json = ".json?print=pretty";

// removes null values form posts array -> probably deleted posts
export function removeNull(posts) {
  posts.forEach((post, index) => {
    if (!post) {
      console.log(
        `A deleted post was removed from 'posts' on place ${index + 1}`
      );
      posts = posts.splice(index, 1);
    }
  });
  return posts;
}

export function removeDeleted(posts) {
  return posts.filter(({ deleted }) => deleted !== true);
}

// fetch post by id
export async function fetchItem(id) {
  try {
    const response = await fetch(`${api}/item/${id}/${json}`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

// fetch user by name
export async function fetchUser(user) {
  try {
    const response = await fetch(`${api}/user/${user}/${json}`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

function limitTo( userItems, amount) {
  return userItems.slice(0, amount);
}

export async function fetchUserPosts(userItems) {
  // limit number of items
  userItems = limitTo( userItems);

  try {
    const response = userItems.map(async item => {
      const res = await fetch(`${api}/item/${item}/${json}`);
      return await res.json();
    });
    // wait for array of promises to resolve
    return await Promise.all(response);
  } catch (err) {
    console.log(err);
  }
}

export function onlyStories(arr) {
  return arr.filter(entry => {
    if (entry.type) {
      return entry.type === "story";
    }
    return false;
  });
}

// fetch 50 posts -> kind of posts: new, top, best
export function fetchPosts(kindOf,amount) {
  return fetch(`${api}/${kindOf}stories/${json}`)
    .then(res => res.json())
    .then(ids => {
      if (!ids) {
        throw new Error(`There was an error fetching the ${kindOf} posts`);
      }

      return limitTo( ids, amount)
    })
    .then(ids => Promise.all(ids.map(id => fetchItem(id))));
}

export async function fetchComment(id) {
  try {
    const response = await fetch(`${api}/item/${id}/${json}`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function fetchAllComments(commentIds) {
  commentIds = limitTo( commentIds);

  try {
    const response = commentIds.map(id => fetchComment(id));
    return await Promise.all(response);
  } catch (err) {
    console.log(err);
  }
}
