import React, { useState, useEffect } from 'react';
import OrderList from './OrderList';
import Filter from './Filter';
import GroupCount from './GroupCount';
import orderService from '../../services/orderInformation';

function DelivererHome({ currentUser }) {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterType, setFilterType] = useState('ALL');
  const [filterValue, setFilterValue] = useState('');

  // after first rendering of this component:
  useEffect(() => {
    // fetch deliverer's order data from db
    orderService.getAllForDeliverer(currentUser.DELIVERER_PHONENUMBER)
      .then(initialOrders => {
        setOrders(initialOrders);
        setFilteredOrders(initialOrders);
      });
  }, [currentUser]);

  // callback for update status button
  async function updateDeliveryStatus(order) {
    const orderID = order.ORDERINFORMATION_ID;
    if(window.confirm(`Are you sure you want to update delivery status of Order No. ${orderID}?`)) {
      try {
        // update order status for given order in db
        await orderService.updateSingleOrderStatus({
          orderInfoID: orderID,
          orderStatusID: 3
        });

        // retrieve given order from db and update frontend state
        const updatedOrder = await orderService.getSingle(orderID);
        setOrders(orders.map(o => o.ORDERINFORMATION_ID === orderID ? updatedOrder : o));

        alert(`Order No. ${orderID} status updated!`);
      } catch (error) {
        alert(`Something went wrong, ${orderID} probably doesn't exist.`);
      }
    }
  }

  // callback for filter button
  async function filterOrders() {
    if (filterType === 'ALL') {
      setFilteredOrders(orders);
    } else {
      try {
        const newlyFilteredOrders =
          await orderService.getAllForDelivererConditional(
            currentUser.DELIVERER_PHONENUMBER,
            { filterType, filterValue }
          );
        setFilteredOrders(newlyFilteredOrders);
      } catch (error) {
        alert('Couldn\'t filter for some reason...');
      }
    }
  }

  return (
    <div>
      <h2>Deliverer Home</h2>

      {/* component for user info*/}

      <Filter
        orders={orders}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        filterType={filterType}
        setFilterType={setFilterType}
        filterOrders={filterOrders}
      />

      <OrderList
        orders={filteredOrders} // we only want to render filtered orders
        updateDeliveryStatus={updateDeliveryStatus}
      />

      <GroupCount
        currentUser={currentUser}
      />
    </div>
  );
}

export default DelivererHome;
