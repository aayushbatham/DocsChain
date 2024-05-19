import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'animate.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserSettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userProfile, setUserProfile] = useState({ email: '', name: '' });
  const notifySuccess = () => toast.success('Password Changed');
  const notifyError = () => toast.error('Current Password is Wrong!');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user/details', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:4000/user/change-password',
        { currentPassword, newPassword, confirmPassword },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      notifySuccess();
      setMessage(response.data.message);
    } catch (error) {
      notifyError();
      console.error('Error changing password:', error.response.data.message);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className='bg-gray-100 w-full h-full flex'>
      <div className="container mx-auto p-4 max-w-lg items-center">
      <div className="bg-white shadow-md rounded-lg p-6 animate__animated animate__fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-center">User Settings</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Profile Information</h3>
          <p><strong>Email:</strong> {userProfile.email}</p>
          <p><strong>Name:</strong> {userProfile.name}</p>
        </div>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">Change Password</h3>
          <div>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Change Password
          </button>
          {message && <p className="text-center mt-4 text-red-500">{message}</p>}
        </form>
      </div>
    </div>
    <div>
      <ToastContainer/>
    </div>
    </div>
    
  );
};

export default UserSettings;
