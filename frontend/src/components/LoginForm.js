import React, { useState } from 'react';
import customerService from '../services/customers';

function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('logging in');
    const customer = await customerService.getSingle(phoneNumber);
    if (customer) {
      console.log('login succeeded');
      console.log(customer);
    } else {
      console.log('login failed');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <span>Phone Number</span>
        <input
          name="phonenumber"
          onChange={(e) => setPhoneNumber(e.target.value)}>
        </input>
      </div>
      <div>
        <span>Password</span>
        <input
          name="password"
          onChange={(e) => setPassword(e.target.value)}>
        </input>
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
