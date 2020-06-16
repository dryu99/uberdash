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

  // callback for update status button
  async function updateDeliveryStatus(order) {
    const orderID = order.ORDERINFORMATION_ID;

    try {
      // update order status for given order in db
      await orderInformationService.updateSingleOrderStatus({
        orderInfoID: orderID,
        orderStatusID: 3
      });

      // retrieve given order from db and update frontend state
      const updatedOrder = await orderInformationService.getSingle(orderID);
      console.log(updatedOrder);
      setOrders(orders.map(o => o.ORDERINFORMATION_ID === orderID ? updatedOrder : o));

      alert(`Order No. ${orderID} status updated!`);
    } catch (error) {
      alert(`Something went wrong, ${orderID} probably doesn't exist.`);
    }
  }

  return (
    <div>
      <h2>Deliverer Home</h2>
      <OrderList
        orders={orders}
        updateDeliveryStatus={updateDeliveryStatus}
      />
    </div>
  );
}

export default DelivererHome;
