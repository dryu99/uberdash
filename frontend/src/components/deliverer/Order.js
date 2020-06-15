import React from 'react';

function Order({ order }) {
  const style = {
    marginBottom: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'black',
  };

  return (
    <div style={style}>
      <div><b>Date:</b> {order.ORDERINFORMATION_ORDERDATE}</div>
      <div><b>Customer Address:</b> {order.ORDERINFORMATION_ORDERADDRESS}</div>
      <div><b>Restaurant Name:</b> {order.RESTAURANT_NAME}</div>
      <div><b>Restaurant Address:</b> {order.RESTAURANT_ADDRESS}</div>
      <div><b>Order Status:</b> {order.ORDERSTATUS_NAME}</div>
    </div>
  );
}

export default Order;
