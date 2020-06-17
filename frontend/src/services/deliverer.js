import axios from 'axios';
import env from '../environment.json';

const baseUrl = `https://www.students.cs.ubc.ca/~${env.cwl}/uberdash/backend/api/deliverer`;

async function getSingle(delivererPhoneNumber) {
  const response = await axios.get(`${baseUrl}/getSingle.php?DelivererPhoneNumber=${delivererPhoneNumber}`);
  return response.data;
}

async function update(delivererPhoneNumber, newData) {
  const response = await axios.post(`${baseUrl}/updateSingle.php?DelivererPhoneNumber=${delivererPhoneNumber}`, newData);
  return response.data;
}

export default { getSingle, update };