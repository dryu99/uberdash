import React, { useState } from 'react';
import loginService from '../services/login';

function LoginForm({ userType, setUserType, setCurrentUser }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    try {
      let user;
      if (userType === 'customer') {
        user = await loginService.customerLogin({ username: phoneNumber, password });
      } else if (userType === 'restaurantAdmin') {
        user = await loginService.restaurantAdminLogin({ username: phoneNumber, password });
      } else {
        user = await loginService.delivererLogin({ username: phoneNumber, password });
      }
      user = { ...user, type: userType };

      // cache user data in browser
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));

      setCurrentUser(user);
      setPhoneNumber('');
      setPassword('');
    } catch (error) {
      alert('Login Failed! Username or password was incorrect.');
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <select value={userType} onChange={(e) => setUserType(e.target.value)}>
        <option value="customer">Customer</option>
        <option value="restaurantAdmin">Restaurant Admin</option>
        <option value="deliverer">Deliverer</option>
      </select>
      <div>
        <span>Phone Number</span>
        <input
          value={phoneNumber}
          name="phonenumber"
          onChange={(e) => setPhoneNumber(e.target.value)}>
        </input>
      </div>
      <div>
        <span>Password</span>
        <input
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}>
        </input>
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
