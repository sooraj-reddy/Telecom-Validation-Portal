import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for routing
import axios from 'axios';
import Styles from './Login.module.css';
import { UserContext } from './UserContext.jsx'; // Import UserContext

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser } = useContext(UserContext); // Get the setCurrentUser function from context
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5001/login', { username, password })
      .then(result => {
        if (result.data === "Success") {
          setCurrentUser(username); // Set the current user
          navigate('/home'); // Redirect to the home page after successful login
        } else {
          alert(result.data); // Show error message
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className={Styles.login}>
      <form onSubmit={handleSubmit}>
        <div className={Styles.heading}>
          <h2>Login to your account</h2>
        </div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <div className={Styles.bottomText}>
        <p>Don't have an account? <Link to="/register">Register</Link></p> {/* Add link to the register page */}
      </div>
      </form>
      
    </div>
  );
};

export default Login;
