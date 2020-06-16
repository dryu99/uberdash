import React from 'react';

function Filter({ orders, filterValue, setFilterValue, filterType, setFilterType }) {
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
      <select value={filterType} onChange={handleFilterTypeChange}>
        <option value="ORDERINFORMATION_ORDERDATE">Order Date</option>
        <option value="CUSTOMER_NAME">Customer Name</option>
        <option value="ORDERINFORMATION_ORDERADDRESS">Customer Address</option>
        <option value="RESTAURANT_NAME">Restaurant Name</option>
        <option value="ORDERSTATUS_NAME">Order Status</option>
      </select>
      <span>=</span>
      {filterValueComponent(filterType)}
    </div>
  );
}

export default Filter;
