export const fetchData = async (body) => {
  try {
    const fetchPosts = await fetch('https://jsonplaceholder.typicode.com/posts');
    const fetchUsers = await fetch('https://jsonplaceholder.typicode.com/users');
    const posts = await fetchPosts.json();
    var users = await fetchUsers.json();
    return [posts,users];
  } catch {
    return 'erreur...'
  }
};