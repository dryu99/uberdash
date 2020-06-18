import React, { useState, Component} from 'react';
import SelectionForm from './selectionForm'
import restaurantAdmin from "../../services/restaurantAdmin"
import OrderTable from "./orderTable"

class RestaurantAdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: '',
      tableData: []
    }
    this.handleFields = this.handleFields.bind(this);
    this.handleFindBestCustomers = this.handleFindBestCustomers.bind(this);
  }

  getOrders() {

  }

  async handleFields(checkboxes) {
    // formSubmitEvent.preventDefault();
    let columns = '';

    Object.keys(checkboxes)
      .filter(checkbox => checkboxes[checkbox])
      .forEach(checkbox => {
          columns += ", " + checkbox.replace('Customer Phone Number', 'C.Customer_PhoneNumber').replace("Deliverer Phone Number", "D.Deliverer_PhoneNumber");
      });
    let td = await restaurantAdmin.getOrders(this.props.currentUser.RESTAURANTADDRESS, columns).catch((error) => {
      console.log(error); 
      alert("No results found.");
    });
    this.setState({columns: columns});
    // td = JSON.stringify(td);
    // td = '[' + td + ']';
    // td = JSON.parse(td);
    this.setState({tableData: td});
    console.log(this.state.columns);
    // console.log(this.state.tableData);
    // console.log(td);
  }

  async handleFindBestCustomers() {
    let td = await restaurantAdmin.getBestCustomer(this.props.currentUser.RESTAURANTADDRESS).catch((error) => {
      console.log(error);
      alert("No Customers have ordered all items from your restaurant :(");
    });
    this.setState({tableData:td});
  }

  render() {
    return (
       <div>
    <SelectionForm handleFields = {this.handleFields}></SelectionForm>
    <button onClick={this.handleFindBestCustomers}>Find Best Customers</button>
    {this.state.tableData[0]? <OrderTable data={this.state.tableData}></OrderTable> : <span></span>}
    
      </div>
  );
}
}

export default RestaurantAdminHome;
