import React from 'react';

function Filter({ orders, filterValue, setFilterValue, filterType, setFilterType, filterOrders }) {
  // event handler for filter type change event
  function handleFilterTypeChange(e) {
    const newFilterType = e.target.value;
    setFilterType(newFilterType);
    setFilterValue(orders[0][newFilterType]);
  }

  // dynamically generates the filter value options component based on current filter type
  function filterValueComponent(currentFilterType) {
    // projected orders only contain 1 attribute each
    const orderFilterValues = [...new Set(orders.map(o => o[currentFilterType]))];

    return <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
      {orderFilterValues.map(orderFilterValue =>
        <option
          key={orderFilterValue}
          value={orderFilterValue}
        >
          {orderFilterValue}
        </option>
      )}
    </select>;
  }

  return (
    <div>
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
        <span>={filterValueComponent(filterType)}</span>
        :
        null
      }
      <button onClick={filterOrders}>Filter</button>
    </div>
  );
}

export default Filter;
