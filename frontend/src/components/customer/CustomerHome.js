import React, { useState, createRef } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import customerService from '../../services/customers';
import RestaurantList from '../customer/RestaurantList';

function CustomerHome({currentUser}) {
  const [currentView, setCurrentView] = useState(null);
  const [currentViewFiltered, setCurrentViewFiltered] = useState(null);
  const [currentViewRestaurant, setCurrentViewRestaurant] = useState(false);
  const [currentViewPayment, setCurrentViewPayment] = useState(null);
  const textInputFilter = createRef(); 
  const textInputDelete = createRef();

  async function viewOrders() {
    try {
      const orders = await customerService.getAllOrders(currentUser.PHONENUMBER);
      setCurrentView(orders);
    } catch (error) {
      alert('Could not find orders!');
      console.log(error);
    }
  }

  async function viewOrdersFiltered() {
    try {
      const orders = await customerService.getAllOrders(currentUser.PHONENUMBER, textInputFilter.current.value);
      setCurrentViewFiltered(orders);
    } catch (error) {
      alert('Could not find order!');
      console.log(error);
    }
  }

  async function deleteOrder() {
    try {
      const isDeleted = await customerService.deleteOrder(currentUser.PHONENUMBER, textInputDelete.current.value);
      if (isDeleted) {
        alert(`Order has been cancelled for Order ID: ${textInputDelete.current.value}!`);
      } else {
        alert(`Order could not be cancelled! :(`);
      }
    } catch (error) {
      alert('Order could not be cancelled! :(');
      console.log(error);
    }
  }

  async function viewPayment() {
    try {
      const payment = await customerService.getPayment(currentUser.PHONENUMBER);
      setCurrentViewPayment(payment);
    } catch (error) {
      alert('Could not find payment method! :(');
      console.log(error);
    }
  }

  function restaurantListComponent() {
    setCurrentViewRestaurant(true);
  }

  return (
    <div>
      {currentViewRestaurant ?
        <RestaurantList currentUser={currentUser}></RestaurantList>
      :
        <div>
        Customer Home
        <div className="m-2">
          <Button onClick={viewOrders} variant="outline-dark" size="sm">View All Orders</Button>{' '}
        </div>
        {currentView ?
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Order Address</th>
              <th>Deliverer Phone Number</th>
              <th>Restaurant Address</th>
            </tr>
          </thead>
          <tbody>
            {currentView.map(order => (
                <tr key={order.ID}>
                  <td>{order.ID}</td>
                  <td>{order.ORDERDATE}</td>
                  <td>{order.ADDRESS}</td>
                  <td>{order.DELIVERERPHONENUMBER}</td>
                  <td>{order.RESTAURANTADDRESS}</td>
                </tr>
            ))}
          </tbody>
        </Table>
        : null
        }
        <div className="m-2">
          <InputGroup className="mb-2">
            <InputGroup.Prepend>
              <Button onClick={viewOrdersFiltered} variant="outline-dark" size="sm">View Order By ID</Button>
            </InputGroup.Prepend>
            <FormControl 
              ref={textInputFilter} 
              type="text"
              placeholder="Enter Order ID Here"
            />
          </InputGroup>
        </div>
        {currentViewFiltered ?
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Order Address</th>
              <th>Deliverer Phone Number</th>
              <th>Restaurant Address</th>
            </tr>
          </thead>
          <tbody>
            {currentViewFiltered.map(order => (
                <tr key={order.ID}>
                  <td>{order.ID}</td>
                  <td>{order.ORDERDATE}</td>
                  <td>{order.ADDRESS}</td>
                  <td>{order.DELIVERERPHONENUMBER}</td>
                  <td>{order.RESTAURANTADDRESS}</td>
                </tr>
            ))}
          </tbody>
          </Table>
        : null
        }
        <div className="m-2">
          <InputGroup className="mb-2">
            <InputGroup.Prepend>
              <Button onClick={deleteOrder} variant="outline-dark" size="sm">Cancel Order</Button>
            </InputGroup.Prepend>
            <FormControl 
              ref={textInputDelete}
              type="text"
              placeholder="Enter Order ID Here"
            />
          </InputGroup>
        </div>
        <div className="m-2">
          <Button onClick={restaurantListComponent} variant="outline-dark" size="sm">Create Order</Button>{' '}
        </div>
        <div className="m-2">
          <Button onClick={viewPayment} variant="outline-dark" size="sm">View Payment Method</Button>{' '}
        </div>
        {currentViewPayment ?
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>Credit Card Number</th>
              <th>Name</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {currentViewPayment.map(payment => (
                <tr key={payment.CREDITCARDNUMBER}>
                  <td>{payment.CREDITCARDNUMBER}</td>
                  <td>{payment.NAME}</td>
                  <td>{payment.ADDRESS}</td>
                </tr>
            ))}
          </tbody>
        </Table>
        : null
        }
      </div>
      }
    </div>
  );
}

export default CustomerHome;
