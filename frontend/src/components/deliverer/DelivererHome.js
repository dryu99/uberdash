import React, { useState, useEffect } from 'react';
import DelivererInfo from './DelivererInfo';
import Filter from './Filter';
import OrderList from './OrderList';
import GroupCount from './GroupCount';
import orderService from '../../services/orderInformation';

function DelivererHome({ currentUser, setCurrentUser }) {
  const [orders, setOrders] = useState([]);

  // after first rendering of this component:
  useEffect(() => {
    // fetch deliverer's order data from db
    orderService.getAllForDeliverer(currentUser.DELIVERER_PHONENUMBER)
      .then(initialOrders => {
        setOrders(initialOrders);
      });
  }, [currentUser]);

  return (
    <div>
      <h2>Deliverer Home</h2>
      <h3>Current user: {currentUser.DELIVERER_NAME}</h3>

      <DelivererInfo
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      <Filter
        setOrders={setOrders}
        currentUser={currentUser}
      />

      <OrderList
        orders={orders}
        setOrders={setOrders}
      />

      <GroupCount
        currentUser={currentUser}
      />
    </div>
  );
}

export default DelivererHome;
