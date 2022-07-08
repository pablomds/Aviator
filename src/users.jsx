import { createSlice } from '@reduxjs/toolkit';

const fetchData = async () => {
  const fetchUsers = await fetch('https://jsonplaceholder.typicode.com/users');
  const response = await fetchUsers.json();
  response.map((user) => {
    user.age = Math.floor(Math.random() * 50) + 18
    user.key = user.id
  })
  setUsers(response)
}
const initialState = {
  items: [
    {id: 1, name: 'iPhone10'},
    {id: 2, name: 'iPadPro'},
    {id: 3, name: 'iWatch'},
]
};