import React, { useState, useEffect } from 'react';
import OrderList from './OrderList';
import Filter from './Filter';
import orderInformationService from '../../services/orderInformation';

function DelivererHome({ currentUser }) {
  const [orders, setOrders] = useState([]);
  const [filterType, setFilterType] = useState('ORDERINFORMATION_ORDERDATE');
  const [filterValue, setFilterValue] = useState(null);

  // after first rendering of this component:
  useEffect(() => {
    // fetch deliverer's order data from db
    orderInformationService.getAllForDeliverer(currentUser.DELIVERER_PHONENUMBER)
      .then(initialOrders => {
        setOrders(initialOrders);
        setFilterValue(initialOrders[0][filterType]);
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
      setOrders(orders.map(o => o.ORDERINFORMATION_ID === orderID ? updatedOrder : o));

      alert(`Order No. ${orderID} status updated!`);
    } catch (error) {
      alert(`Something went wrong, ${orderID} probably doesn't exist.`);
    }
  }

  return (
    <div>
      <h2>Deliverer Home</h2>
      <Filter
        orders={orders}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        filterType={filterType}
        setFilterType={setFilterType}
      />

      <OrderList
        orders={orders}
        updateDeliveryStatus={updateDeliveryStatus}
      />
    </div>
  );
}

export default DelivererHome;
