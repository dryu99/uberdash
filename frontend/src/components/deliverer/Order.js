import React from 'react';

function Order({ order, updateDeliveryStatus }) {
  const style = {
    marginBottom: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'black',
  };

  return (
    <div style={style}>
      <div><b>ID:</b> {order.ORDERINFORMATION_ID}</div>
      <div><b>Date:</b> {order.ORDERINFORMATION_ORDERDATE}</div>
      <div><b>Customer Name:</b> {order.CUSTOMER_NAME}</div>
      <div><b>Customer Address:</b> {order.ORDERINFORMATION_ORDERADDRESS}</div>
      <div><b>Restaurant Name:</b> {order.RESTAURANT_NAME}</div>
      <div><b>Restaurant Address:</b> {order.RESTAURANT_ADDRESS}</div>
      <div><b>Order Status:</b> {order.ORDERSTATUS_NAME}</div>
      {order.ORDERSTATUS_ID === 1 || order.ORDERSTATUS_ID === 2 ?
        <button onClick={() => updateDeliveryStatus(order, order.ORDERSTATUS_ID + 1)}>
          {order.ORDERSTATUS_ID === 1 ? 'Update Status to "Delivering"' : 'Update Status to "Completed"'}
        </button>
        :
        null
      }
    </div>
  );
}

export default Order;
