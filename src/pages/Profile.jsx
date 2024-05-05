import React from 'react';
import Settings from './Settings';
import Admin from './admin';
function Profile({ user ,theme ,setTheme}) {
  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <p className="text-gray-700">{user.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <p className="text-gray-700">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
          <p className="text-gray-700">{user.address}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
          <p className="text-gray-700">{user.phoneNumber}</p>
        </div>
        {/* Add more user information fields as needed */}
      </div>
      <Settings theme={theme} setTheme={setTheme}></Settings>
     {user.role =='Admin' && <Admin/>} 
    </div>
    
  );
}

export default Profile;
