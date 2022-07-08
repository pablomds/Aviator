import React, { createContext, useState, useEffect, useMemo } from "react";

// create context
const DataContext = createContext();

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const DataContextProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const fetchPosts = await fetch('https://jsonplaceholder.typicode.com/posts');
      const fetchUsers = await fetch('https://jsonplaceholder.typicode.com/users');
      const posts = await fetchPosts.json();
      var users = await fetchUsers.json();
      users = users.map((user,i) => {
        user.key = i
        user.age =  Math.floor(Math.random() * 60) + 18;
        return user
      })
      let allPosts = posts.map((post, index) => {
        post.createdAt = randomDate(new Date(2012, 0, 1), new Date());
        post.date = randomDate(new Date(2012, 0, 1), new Date());
        post.favorites = Math.floor(Math.random() * 1000) + 100;
        post.likes = Math.floor(Math.random() * 6000) + 1000;
        post.comments = Math.floor(Math.random() * 1000) + 100;
        post.key = index;
        return post
      })
      setUsers(users)
      setPosts(allPosts)
      // setData({posts : allPosts,users})
    };
    fetchUser();
  }, []);

  return (
    users &&
    posts && (
      // the Provider gives access to the context to its children
      <DataContext.Provider value={{users, posts, setUsers, setPosts}}>
        {children}
      </DataContext.Provider>
    )
  );
};

export { DataContext, DataContextProvider };