import React from 'react';

function DelivererInfo({ currentUser }) {
  return (
    <div>
      <h3>User Info</h3>
      <div><b>Name:</b> {currentUser.DELIVERER_NAME}</div>
      <div><b>Phone Number:</b> {currentUser.DELIVERER_PHONENUMBER}</div>
      <div><b>Email:</b> {currentUser.DELIVERER_EMAILADDRESS}</div>
      <div><b>Vehicle License Plate #:</b> {currentUser.VEHICLE_LICENSEPLATENUMBER}</div>
    </div>
  );
}

export default DelivererInfo;
