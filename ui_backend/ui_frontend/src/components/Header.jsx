import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext.jsx';
import Styles from './Header.module.css';
import { FaUserCircle } from 'react-icons/fa'; 


const Header = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext); // Access user context
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (!currentUser) {
      navigate('/login'); // Redirect to login page if not logged in
    } else {
      setShowDropdown(!showDropdown); // Toggle dropdown if logged in
    }
  };

  const handleLogout = () => {
    setCurrentUser(null); // Log out the user
    navigate('/login'); // Redirect to login page
  };

  const handleValidationClick = () => {
    if (currentUser) {
      navigate('/dataset-selection'); // Only if the user is logged in
    } else {
      navigate('/login');
    }
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  return (
    <header className={Styles.header}>
      <div className={Styles.title}>
      <h1 onClick={handleHomeClick}> Telecom Dataset Validation</h1>
      </div>

      <div className={Styles.controls}>
        <div> 
          <button onClick={handleValidationClick}>Validate</button>
        </div>
        
        <div >
          <FaUserCircle 
              className={Styles.profileIcon} // You can style this in CSS
              size={30} // Size of the icon
              onClick={handleProfileClick} // Handle profile click
            />
          {showDropdown && currentUser && (
            <div className={Styles.dropdown}>
              <button onClick={() => navigate('/user-profile')}>User Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
        
      </div>
    </header>
  );
};

export default Header;
