import React, { useState } from 'react';
import customerService from '../services/customers';

function LoginForm({ userType, setUserType }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('logging in');
    try {
      const customer = await customerService.getSingle(phoneNumber);
      console.log('login succeeded');
      console.log(customer);
    } catch (error) {
      console.log('login failed');
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
