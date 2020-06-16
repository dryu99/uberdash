import React, { useState } from 'react';
import orderService from '../../services/orderInformation';

function GroupCount({ currentUser }) {
  const [countType, setCountType] = useState('ALL');
  const [groupCounts, setGroupCounts] = useState([]);

  async function countGroups() {
    const counts = await orderService.getGroupCountsForDeliverer(
      currentUser.DELIVERER_PHONENUMBER,
      { groupType: countType }
    );
    setGroupCounts(counts);
  }

  return (
    <div>
      <h3>Count</h3>
      <select value={countType} onChange={(e) => setCountType(e.target.value)}>
        <option value="ALL">All</option>
        <option value="ORDERINFORMATION_ORDERDATE">Order Date</option>
        <option value="CUSTOMER_NAME">Customer Name</option>
        <option value="ORDERINFORMATION_ORDERADDRESS">Customer Address</option>
        <option value="RESTAURANT_NAME">Restaurant Name</option>
        <option value="ORDERSTATUS_NAME">Order Status</option>
      </select>

      <button onClick={countGroups}>Count</button>
      <ul>
        {groupCounts.map((data, i) =>
          <li key={i}>
            {data.GROUPTYPE ? data.GROUPTYPE : 'Total Count'}: {data.COUNT}
          </li>
        )}
      </ul>
    </div>
  );
}

export default GroupCount;
