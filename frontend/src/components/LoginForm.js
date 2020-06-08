import React, { useState } from 'react';

function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log('loggining in');
  }

  function printCustomers() {

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
      <button onClick={printCustomers}>Print Existing Customers</button>
    </form>
  );
}

export default LoginForm;
