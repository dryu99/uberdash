import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import CustomerHome from './components/customer/CustomerHome';
import RestaurantAdminHome from './components/restaurant-admin/RestaurantAdminHome';
import DelivererHome from './components/deliverer/DelivererHome';

function App() {
  const [userType, setUserType] = useState('customer');
  // TODO add current user state

  let userComponent;
  if (userType === 'customer') {
    userComponent = <CustomerHome/>;
  } else if (userType === 'restaurantAdmin') {
    userComponent = <RestaurantAdminHome/>;
  } else {
    userComponent = <DelivererHome/>;
  }

  return (
    <div>
      <h1>UberDash</h1>
      <LoginForm
        userType={userType}
        setUserType={setUserType}
      />
      {userComponent}
    </div>
  );
}

export default App;
