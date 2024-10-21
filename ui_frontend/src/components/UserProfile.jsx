import React, { useContext } from 'react';
import { UserContext } from './UserContext.jsx'; 
import Styles from './UserProfile.module.css';

const UserProfile = () => {
  const { currentUser } = useContext(UserContext); // Get current user

  return (
    <div className={Styles.content}>
      <h2>Hello, {currentUser}! Thank you for helping us validate the telecom benchmark datasets crafted by us. Hope our work adds meaning to your life as well.</h2>
    </div>
  );
};

export default UserProfile;
