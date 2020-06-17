import axios from 'axios';
import env from '../environment.json';

const baseUrl = `https://www.students.cs.ubc.ca/~${env.cwl}/uberdash/backend/api/restaurants`;

// get data from select columns for Restaurant's Orders View
async function getOrders(rAddress, columns) {
    const response = await axios.get(`${baseUrl}/getOrdersProject.php?RestaurantAddress=${rAddress}&Columns=${columns}`);
    return response.data
}

export default { getOrders };