import React, { useState, useEffect } from 'react';
import { fetchUsers, addUser, updateUser, deleteUser } from './Services/api';
import UserList from './Components/UserList';
import UserForm from './Components/UserForm';
import ErrorBoundary from './Components/ErrorBoundary';
import './App.css';  

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response.data);
    } catch (err) {
      setError('Failed to load users.');
    }
  };

  const handleAdd = async (user) => {
    try {
      const response = await addUser(user);
      setUsers((prev) => [...prev, response.data]);
    } catch {
      setError('Failed to add user.');
    }
  };

  const handleEdit = async (user) => {
    try {
      const response = await updateUser(user.id, user);
      setUsers((prev) => prev.map((u) => (u.id === user.id ? response.data : u)));
    } catch {
      setError('Failed to update user.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch {
      setError('Failed to delete user.');
    }
  };

  return (
    <ErrorBoundary>
      {error && <p>{error}</p>}
      {!editingUser ? (
        <>
          <button onClick={() => setEditingUser({})}>Add User</button>
          <UserList users={users} onEdit={setEditingUser} onDelete={handleDelete} />
        </>
      ) : (
        <UserForm
          user={editingUser}
          onSave={(user) => {
            editingUser.id ? handleEdit(user) : handleAdd(user);
            setEditingUser(null);
          }}
          onCancel={() => setEditingUser(null)}
        />
      )}
    </ErrorBoundary>
  );
};

export default App;
