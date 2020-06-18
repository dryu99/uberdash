import React, { useState } from 'react';
import orderService from '../../services/orderInformation';

function Filter({ setOrders, currentUser }) {
  const [filterType, setFilterType] = useState('ALL');
  const [filterValue, setFilterValue] = useState('');
  const [filterValueOptions, setFilterValueOptions] = useState([]);

  const style = {
    marginBottom: 20
  };

  // event handler for filter type change event
  async function handleFilterTypeChange(e) {
    const newFilterType = e.target.value;
    setFilterType(newFilterType);

    // only need to find new options if current filter type isn't ALL
    if (newFilterType !== 'ALL') {
      const newFilterValueOptions =
        await orderService.getAllForDeliverer(currentUser.DELIVERER_PHONENUMBER, newFilterType);
      setFilterValueOptions(newFilterValueOptions);
      setFilterValue(newFilterValueOptions[0] ? newFilterValueOptions[0][newFilterType] : '');
    } else {
      setFilterValueOptions([]);
      setFilterValue('');
    }
  }

  // callback for filter button
  async function filterOrders() {
    let filteredOrders = [];
    try {
      if (filterType === 'ALL') {
        // find all orders
        filteredOrders = await orderService.getAllForDeliverer(
          currentUser.DELIVERER_PHONENUMBER
        );
      } else {
        // get orders filtered to the current conditions
        filteredOrders =
          await orderService.getAllForDelivererConditional(
            currentUser.DELIVERER_PHONENUMBER,
            { filterType, filterValue }
          );
      }
    } catch (error) {
      alert('Couldn\'t filter for some reason...');
    } finally {
      setOrders(filteredOrders);
    }
  }

  return (
    <div style={style}>
      <h3>Filter</h3>
      <select value={filterType} onChange={handleFilterTypeChange}>
        <option value="ALL">All</option>
        <option value="ORDERINFORMATION_ORDERDATE">Order Date</option>
        <option value="CUSTOMER_NAME">Customer Name</option>
        <option value="ORDERINFORMATION_ORDERADDRESS">Customer Address</option>
        <option value="RESTAURANT_NAME">Restaurant Name</option>
        <option value="ORDERSTATUS_NAME">Order Status</option>
      </select>
      {filterType !== 'ALL' ?
        <React.Fragment>
          =
          <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
            {filterValueOptions.map(option =>
              <option
                key={option[filterType]}
                value={option[filterType]}
              >
                {option[filterType]}
              </option>
            )}
          </select>
        </React.Fragment>
        :
        null
      }
      <button onClick={filterOrders}>Filter</button>
    </div>
  );
}

export default Filter;
