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
  }

  getOrders() {

  }

  async handleFields(checkboxes) {
    // formSubmitEvent.preventDefault();
    let columns = '';

    Object.keys(checkboxes)
      .filter(checkbox => checkboxes[checkbox])
      .forEach(checkbox => {
          columns += ", " + checkbox.replace(/\s+/g, '').replace("OrderStatus", "OS.NAME")
      });
    let td = await restaurantAdmin.getOrders(this.props.currentUser.RESTAURANTADDRESS, columns).catch((error) => {
      console.log(error); 
      alert("No results found.");
    });
    this.setState({columns: columns});
    td = JSON.stringify(td);
    // td = '[' + td + ']';
    td = JSON.parse(td);
    this.setState({tableData: td});
    console.log(this.state.columns);
    // console.log(this.state.tableData);
    // console.log(td);
  }

  render() {
    return (
       <div>
    <SelectionForm handleFields = {this.handleFields}></SelectionForm>
    {this.state.tableData[0]? <OrderTable data={this.state.tableData}></OrderTable> : <span></span>}
    
      </div>
  );
}
}

export default RestaurantAdminHome;
