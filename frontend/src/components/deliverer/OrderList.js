import React from 'react';
import Order from './Order';
import orderService from '../../services/orderInformation';

function OrderList({ orders, setOrders }) {

  // callback for update status button
  async function updateDeliveryStatus(order, newOrderStatus) {
    const orderID = order.ORDERINFORMATION_ID;
    const newOrderStatusName = newOrderStatus === 2 ? '"Delivering"' : '"Completed"';

    if(window.confirm(`Are you sure you want to update order status of Order No. ${orderID} to ${newOrderStatusName}?`)) {
      try {
        // update order status for given order in db
        await orderService.updateSingleOrderStatus({
          orderInfoID: orderID,
          orderStatusID: newOrderStatus
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

  return (
    <div>
      <h3>Orders</h3>
      {orders.map(order =>
        <Order
          key={order.ORDERINFORMATION_ID}
          order={order}
          updateDeliveryStatus={updateDeliveryStatus}
        />)
      }
    </div>
  );
}

export default OrderList;
