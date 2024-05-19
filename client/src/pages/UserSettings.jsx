import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserSettings = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch user's information (username) from the backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks for password change
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    // Make API call to update user's information (username and password)
    try {
      const response = await axios.put(
        'http://localhost:4000/user/settings',
        {
          username,
          password,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error updating user information');
      console.error('Error updating user information:', error);
    }
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg overflow-hidden shadow-md mb-8">
          <div className="px-6 py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <img className="h-12 w-12 rounded-full object-cover" src="profile.jpg" alt="Profile" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{username}</h2>
                <p className="text-gray-600">@{username}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Current Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">New Password:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Confirm New Password:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Save Changes
              </button>
            </form>
            {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
