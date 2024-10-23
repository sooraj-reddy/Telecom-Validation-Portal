import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import { UserProvider } from './components/UserContext.jsx';
import UserProfile from './components/UserProfile.jsx';
import CSVWindow from './components/CSVWindow.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import ValidationWindow from './components/ValidationWindow.jsx'; 
import DatasetSelection from './components/DatasetSelection.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

// const ProtectedRoute = ({ isLoggedIn, children }) => {
//   return isLoggedIn ? children : <Navigate to="/login" />;
// };

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisteredIn, setIsRegisteredIn] = useState(false);

  return (
    <UserProvider>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/login" element={<Login onLogin={setIsLoggedIn} />} /> 
          <Route path="/register" element={<Register onRegister={setIsRegisteredIn} />} /> 
          <Route path="/csv/:type" element={<CSVWindow />} />
          
          {/* <Route path="/dataset-selection" element={
            <PrivateRoute isLoggedIn={isLoggedIn}> <DatasetSelection /> </PrivateRoute> } />
          <Route path="/validate/:type" element={
            <PrivateRoute isLoggedIn={isLoggedIn}> <ValidationWindow /> </PrivateRoute>} />
          <Route path="/user-profile" element={
            <PrivateRoute isLoggedIn={isLoggedIn}> <UserProfile /> </PrivateRoute> } /> */}

          <Route path="/dataset-selection" element={<DatasetSelection />} />
          <Route path="/validate/:type" element={<ValidationWindow />} />
          <Route path="/user-profile" element={<UserProfile />} />

        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
