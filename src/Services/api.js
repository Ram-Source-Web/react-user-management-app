import axios from 'axios';

const API_BASE = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = () => axios.get(API_BASE);
export const addUser = (user) => axios.post(API_BASE, user);
export const updateUser = (id, user) => axios.put(`${API_BASE}/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_BASE}/${id}`);
