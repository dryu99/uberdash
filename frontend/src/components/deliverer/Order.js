import React from 'react';

function Order({ order }) {

  const style = {
    marginBottom: 10,


  };
  console.log(order);
  return (
    <div style={style}>
      <div>Date: {order.ORDERDATE}</div>
      <div>Customer Address: {order.ADDRESS}</div>
      <div>Restaurant Name: {order.NAME}</div>
      <div>Restaurant Address: {order.RESTAURANTADDRESS}</div>
      <div>Order Status: {order.ORDERSTATUS}</div>
    </div>
  );
}

export default Order;
