import React from 'react';
import Order from './Order';

function OrderList({ orders, updateDeliveryStatus }) {

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
