import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import styles from './Login.module.css';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [jobtitle, setJobtitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5001/register', { username, password, jobtitle })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit}>
        <div className={styles.heading}>
          <h2>Register to create your profile</h2>
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
        <input
          type="text"
          placeholder="Current Job title"
          value={jobtitle}
          onChange={(e) => setJobtitle(e.target.value)}
        />
        <button type="submit">Register</button>
        <div className={styles.bottomText}>
        <p>Already have an account? <Link to="/login">Login</Link></p> 
      </div>
      </form>
      
    </div>
  );
};

export default Register;
