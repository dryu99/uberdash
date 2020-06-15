import React from 'react';
import Order from './Order';

function OrderList({ orders }) {

  return (
    <div>
      {orders.map(order =>
        <Order key={order.ORDERINFORMATION_ID} order={order}/>)
      }
    </div>
  );
}

export default OrderList;
