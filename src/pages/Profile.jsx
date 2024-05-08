import React, { useState } from 'react';
import Settings from './Settings';
import Admin from './admin';

function Profile({ setIsSignedIn,user, theme, setTheme }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming user is initially logged in

  const handleLogout = () => {
    // Clear auth token and user from local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('cartId');

    // Update the state to reflect the user has logged out
    setIsSignedIn(false);
  };


  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <p className="text-gray-700">{user.username}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <p className="text-gray-700">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
          <p className="text-gray-700">{user.phonenumber}</p>
        </div>
        {/* Add more user information fields as needed */}
      </div>
      <Settings theme={theme} setTheme={setTheme}></Settings>
      {user.role === 'Admin' && <Admin />}
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
        Logout
      </button>
    </div>
  );
}

export default Profile;
