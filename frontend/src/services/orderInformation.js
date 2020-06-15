import axios from 'axios';
import env from '../environment.json';

const baseUrl = `https://www.students.cs.ubc.ca/~${env.cwl}/uberdash/backend/api/order_information`;

async function getAllForDeliverer(delivererPhoneNumber) {
  const response = await axios.get(`${baseUrl}/getAllForDeliverer.php?DelivererPhoneNumber=${delivererPhoneNumber}`);
  return response.data;
}

export default { getAllForDeliverer };