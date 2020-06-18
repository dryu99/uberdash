import React, { useState } from 'react';
import delivererService from '../../services/deliverer';

function DelivererInfo({ currentUser, setCurrentUser }) {
  const [editingState, setEditingState] = useState(false);
  const [name, setName] = useState(currentUser.DELIVERER_NAME);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.DELIVERER_PHONENUMBER);
  const [email, setEmail] = useState(currentUser.DELIVERER_EMAILADDRESS);
  const [workStatus, setWorkStatus] = useState(currentUser.WORKSTATUS);
  const [password, setPassword] = useState(currentUser.DELIVERER_PASSWORD);
  const [licensePlate, setLicensePlate] = useState(currentUser.VEHICLE_LICENSEPLATENUMBER);
  const [vehicleModel, setVehicleModel] = useState(currentUser.VEHICLE_MODEL);

  const style = {
    marginBottom: 20
  };

  function handleUpdateCancel() {
    setEditingState(false);
    setName(currentUser.DELIVERER_NAME);
    setPassword(currentUser.DELIVERER_PASSWORD);
    setEmail(currentUser.DELIVERER_EMAILADDRESS);
    setWorkStatus(currentUser.WORKSTATUS);
  }

  // callback for submit button
  async function handleSubmit(e) {
    e.preventDefault();
    if(window.confirm('Are you sure you want to update info?')) {
      try {
        await delivererService.update(
          currentUser.DELIVERER_PHONENUMBER,
          {
            name,
            phoneNumber,
            password,
            email,
            workStatus
          }
        );

        const updatedUser =
          await delivererService.getSingle(currentUser.DELIVERER_PHONENUMBER);
        updatedUser.type = 'deliverer';

        setCurrentUser(updatedUser);

        // cache new user data
        window.localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

        setEditingState(false);
      } catch (error) {
        alert('Something went wrong, I hope this doesn\'t happen during the demo');
      }
    }
  }

  return (
    <div style={style}>
      <h3>User Info</h3>
      {!editingState ?
        <div>
          <div><b>WORK STATUS:</b> {workStatus === 1 ? 'WORKING' : 'OFF THE JOB' }</div>
          <div><b>Name:</b> {name}</div>
          <div><b>Phone Number:</b> {phoneNumber}</div>
          <div><b>Password:</b> {password}</div>
          <div><b>Email:</b> {email}</div>
          <div><b>Vehicle License Plate #:</b> {licensePlate}</div>
          <div><b>Vehicle Model:</b> {vehicleModel}</div>
          <button onClick={() => setEditingState(true)}>Update Info</button>
        </div>
        :
        <form onSubmit={handleSubmit}>
          <div>
            <b>WORK STATUS: </b>
            <button type="button" onClick={() => setWorkStatus(workStatus === 1 ? 0 : 1)}>{workStatus === 1 ?  'WORKING' : 'OFF THE JOB' } </button>
          </div>
          <div>
            <b>Name: </b>
            <input value={name} onChange={({ target }) => setName(target.value)}></input>
          </div>
          <div>
            <b>Password: </b>
            <input value={password} onChange={({ target }) => setPassword(target.value)}></input>
          </div>
          <div>
            <b>Email: </b>
            <input value={email} onChange={({ target }) => setEmail(target.value)}></input>
          </div>
          <button type="submit">Submit</button>
          <button onClick={handleUpdateCancel}>Cancel</button>
        </form>
      }
    </div>
  );
}

export default DelivererInfo;
