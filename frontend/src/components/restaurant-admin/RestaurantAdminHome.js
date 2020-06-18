import React, { useState, Component } from 'react';
import SelectionForm from './selectionForm';
import restaurantAdmin from '../../services/restaurantAdmin';
import OrderTable from './orderTable';

class RestaurantAdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: '',
      aggregate: '',
      tableData: [],
      orders: 1
    };
    this.handleFields = this.handleFields.bind(this);
    this.handleFindBestCustomers = this.handleFindBestCustomers.bind(this);
  }

  async handleFields(checkboxes) {
    // formSubmitEvent.preventDefault();
    let columns = '';

    Object.keys(checkboxes)
      .filter(checkbox => checkboxes[checkbox])
      .forEach(checkbox => {
        columns += ', ' + checkbox.replace('Customer Phone Number', 'C.Customer_PhoneNumber').replace('Deliverer Phone Number', 'D.Deliverer_PhoneNumber');
      });
    let td = await restaurantAdmin.getOrders(this.props.currentUser.RESTAURANT_ADDRESS, columns).catch((error) => {
      console.log(error);
      alert('No results found.');
    });
    this.setState({ columns: columns });
    // td = JSON.stringify(td);
    // td = '[' + td + ']';
    // td = JSON.parse(td);
    this.setState({ tableData: td, orders: 1 });
    console.log(this.state.columns);
    // console.log(this.state.tableData);
    // console.log(td);
  }


  async handleFindBestCustomers() {
    let td = await restaurantAdmin.getBestCustomer(this.props.currentUser.RESTAURANT_ADDRESS).catch((error) => {
      console.log(error);
      alert('No Customers have ordered all items from your restaurant :(');
    });
    this.setState({ tableData:td, orders: 0 });
  }

  render() {
    return (
      <div>
        Restaurant Admin Home
        <h3>Current user: {this.props.currentUser.RESTAURANTADMIN_NAME}</h3>
        <SelectionForm
          handleFields = {this.handleFields}
          options = {['OrderStatus_Name', 'Customer Phone Number', 'Deliverer Phone Number']}></SelectionForm>
        <button onClick={this.handleFindBestCustomers}>Find Best Customers</button>
        {this.state.orders === 1 ? <h2>Here are the orders for your restaurant.</h2> : <h2>Here are all the customers who have purchased every item from your restaurant.</h2>}
        {this.state.tableData[0]? <OrderTable data={this.state.tableData}></OrderTable> : <span></span>}

      </div>
    );
  }
}

export default RestaurantAdminHome;
