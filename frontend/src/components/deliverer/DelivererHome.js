import React, { useState, useEffect } from 'react';
import OrderList from './OrderList';
import orderInformationService from '../../services/orderInformation';

function DelivererHome({ currentUser }) {
  const [orders, setOrders] = useState([]);

  // after first rendering of this component, fetch deliverer's order data from db
  useEffect(() => {
    orderInformationService.getAllForDeliverer(currentUser.DELIVERER_PHONENUMBER)
      .then(initialOrders => {
        setOrders(initialOrders);
      });
  }, [currentUser]);

  return (
    <div>
      <h2>Deliverer Home</h2>
      <OrderList orders={orders} />
    </div>
  );
}

export default DelivererHome;
