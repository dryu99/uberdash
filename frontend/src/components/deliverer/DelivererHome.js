import React, { useState, useEffect } from 'react';
import OrderList from './OrderList';
import Filter from './Filter';
import GroupCount from './GroupCount';
import orderService from '../../services/orderInformation';

function DelivererHome({ currentUser }) {
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

      {/* component for user info*/}

      <Filter
        setOrders={setOrders}
        currentUser={currentUser}
      />

      <OrderList
        orders={orders}
      />

      <GroupCount
        currentUser={currentUser}
      />
    </div>
  );
}

export default DelivererHome;
