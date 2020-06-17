import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import CustomerHome from './components/customer/CustomerHome';
import RestaurantAdminHome from './components/restaurant-admin/RestaurantAdminHome';
import DelivererHome from './components/deliverer/DelivererHome';

function App() {
  const [userType, setUserType] = useState();
  const [currentUser, setCurrentUser] = useState(null);

  // check if user data is available in cache
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      setCurrentUser(JSON.parse(loggedInUserJSON));
    }
  }, []);

  function handleLogout() {
    // remove current user data from cache
    window.localStorage.removeItem('loggedInUser');
    setCurrentUser(null);
  }

  // conditionally choose user component based on current user type
  let userComponent;
  if (userType === 'customer' || currentUser && currentUser.type === 'customer') {
    userComponent = <CustomerHome currentUser={currentUser}/>;
  } else if (userType === 'restaurantAdmin' || currentUser && currentUser.type === 'restaurantAdmin') {
    userComponent = <RestaurantAdminHome currentUser={currentUser}/>;
  } else {
    userComponent = <DelivererHome currentUser={currentUser}/>;
  }

  return (
    <div>
      <h1>UberDash</h1>
      {currentUser ?
        <div>
          <h3>Current user: {currentUser.NAME}</h3>
          {userComponent}
          <button onClick={handleLogout}>logout</button>
        </div>
        :
        <LoginForm
          userType={userType}
          setUserType={setUserType}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      }
    </div>
  );
}

export default App;
