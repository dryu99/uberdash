import axios from 'axios';
import env from '../environment.json';

const baseUrl = `https://www.students.cs.ubc.ca/~${env.cwl}/uberdash/backend/api/order_information`;

async function getAllForDeliverer(delivererPhoneNumber) {
  const response = await axios.get(`${baseUrl}/getAllForDeliverer.php?DelivererPhoneNumber=${delivererPhoneNumber}`);
  return response.data;
}

async function getSingle(orderID) {
  const response = await axios.get(`${baseUrl}/getSingle.php?OrderInformation_ID=${orderID}`);
  return response.data;
}

async function updateSingleOrderStatus(newOrderData) {
  const response = await axios.post(`${baseUrl}/updateSingleOrderStatus.php`, newOrderData);
  return response.data;
}

export default { getAllForDeliverer, getSingle, updateSingleOrderStatus };